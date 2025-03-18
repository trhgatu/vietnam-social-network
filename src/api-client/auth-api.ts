import instance from "./axios-client";
import { AuthResponse } from "@/shared/types/auth";

export const setAuthToken = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete instance.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

export const fetchUser = async (): Promise<AuthResponse | null> => {
  try {
    const res = await instance.get<AuthResponse>("/auth/me");
    return res.data;
  } catch {
    return null;
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const res = await instance.post<AuthResponse>("/auth/refresh");
    if (res.data.token) {
      setAuthToken(res.data.token);
    }
    return res.data.token ?? null;
  } catch {
    setAuthToken(null);
    return null;
  }
};

export const loginUser = async (token: string): Promise<AuthResponse | null> => {
  setAuthToken(token);
  return fetchUser();
};

export const logoutUser = async (): Promise<void> => {
  try {
    await instance.post("/auth/logout");
  } finally {
    setAuthToken(null);
  }
};
