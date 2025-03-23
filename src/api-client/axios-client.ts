import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { authService } from "@/shared/services/auth-services";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let isRefreshing = false;
type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (token) {
      resolve(instance(config)); // Gửi lại request nếu refresh thành công
    } else {
      reject(error); // Báo lỗi nếu refresh thất bại
    }
  });

  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.warn("⚠ Token expired. Attempting refresh...");
        const refreshed = await authService.refreshToken();

        if (refreshed?.refreshToken) {
          console.info("✅ Token refreshed. Retrying failed requests...");
          processQueue(null, refreshed.refreshToken);
          return instance(originalRequest);
        } else {
          console.error("❌ Refresh token failed. Logging out...");
          processQueue(error, null);
          await authService.logout();
        }
      } catch (refreshError) {
        console.error("❌ Refresh request error:", refreshError);
        processQueue(refreshError as AxiosError, null);
        await authService.logout();
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const fetcher = (url: string) => instance.get(url).then((res) => res.data);
export default instance;
