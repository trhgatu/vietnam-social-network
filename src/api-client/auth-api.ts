import { authService } from "@/shared/services/auth-services";
import { User } from "@/shared/types";

export const fetchUser = async (): Promise<User | null> => {
  const response = await authService.fetchUser();
  return response?.user || null;
};

export const refreshToken = async (): Promise<boolean> => {
  try {
    const res = await authService.refreshToken();
    if (res?.success) {
      return true;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
  await logoutUser();
  return false;
};

export const removeUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

export const loginUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await authService.login(email, password);
    if (response?.success) {
      localStorage.setItem("user", JSON.stringify(response.user));
      return response.user;
    }
    return null;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await authService.logout();
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("user");
  }
};
