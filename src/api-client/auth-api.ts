import instance from "@/api-client/axios-client";
import { AuthResponse } from "@/shared/types/auth";

export const apiLoginUser = async (email: string, password: string): Promise<AuthResponse | null> => {
  try {
    const res = await instance.post<AuthResponse>("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

export const apiFetchUser = async (): Promise<AuthResponse | null> => {
  try {
    const res = await instance.get<AuthResponse>("/auth/me", { withCredentials: true });
    return res.data;
  } catch {
    return null;
  }
};

export const apiRefreshToken = async (refreshToken: string): Promise<AuthResponse | null> => {
  try {
    const res = await instance.post<AuthResponse>("/auth/refresh", { refreshToken }, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return null;
  }
};

export const apiLogoutUser = async (): Promise<void> => {
  try {
    await instance.post("/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
