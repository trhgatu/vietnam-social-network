import Cookies from "js-cookie";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { refreshToken } from "@/api-client/auth-api";
import { logoutUser } from "@/api-client/auth-api";

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
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      resolve(instance(config));
    } else {
      reject(error);
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
        const refreshed = await refreshToken();

        if (refreshed?.accessToken) {
          Cookies.set('accessToken', refreshed.accessToken, { expires: 1 });
          processQueue(null, refreshed.accessToken);
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${refreshed.accessToken}`,
          };

          return instance(originalRequest);
        } else {
          console.error("Refresh token failed. Logging out...");
          processQueue(error, null);
          await logoutUser();
        }
      } catch (refreshError) {
        console.error("Refresh request error:", refreshError);
        processQueue(refreshError as AxiosError, null);
        await logoutUser();
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const fetcher = (url: string) => instance.get(url).then((res) => res.data);
export default instance;
