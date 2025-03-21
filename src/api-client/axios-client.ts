import axios from "axios";
import { refreshToken } from "@/shared/services/auth-services";
import { getToken } from "@/shared/utils/jwt-helper";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    let token = getToken();

    if (!token) {
      const refreshed = await refreshToken();
      if (refreshed) {
        token = getToken();
      }
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("⚠ No valid token available.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn("⚠ Token expired. Attempting refresh...");
      originalRequest._retry = true;

      const refreshed = await refreshToken();
      if (refreshed) {
        const newToken = getToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export const fetcher = (url: string) => instance.get(url).then((res) => res.data);
export default instance;
