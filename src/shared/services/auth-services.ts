import { apiFetchUser, apiRefreshToken, apiLogoutUser } from "@/api-client";
import { User } from "@/shared/types";
import { setToken, removeToken } from "@/shared/utils/jwt-helper";

export const fetchUser = async (): Promise<User | null> => {
  const response = await apiFetchUser();
  return response?.user || null;
};

export const refreshToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  try {
    const res = await apiRefreshToken(refreshToken);
    if (res?.accessToken) {
      setToken(res.accessToken);
      return true;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }

  await logoutUser();
  return false;
};

export const removeRefreshToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("refreshToken");
  }
};

export const removeUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};


export const loginUser = async (token: string): Promise<User | null> => {
  setToken(token);
  const user = await fetchUser();
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  return user;
};


export const logoutUser = async (): Promise<void> => {
  try {
    await apiLogoutUser();
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    removeToken();
    removeUser();
    removeRefreshToken();
  }
};

