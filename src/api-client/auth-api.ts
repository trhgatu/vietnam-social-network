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

export const apiSendOTP = async (email: string): Promise<{ success: boolean; message: string } | null> => {
  try {
    const res = await instance.post("/auth/register/send-otp", { email });
    return res.data;
  } catch (error) {
    console.error("Send OTP failed:", error);
    return null;
  }
};

export const apiVerifyOTP = async (email: string, otp: string): Promise<{ success: boolean; message: string } | null> => {
  try {
    const res = await instance.post("/auth/register/verify-otp", { email, otp });
    return res.data;
  } catch (error) {
    console.error("Verify OTP failed:", error);
    return null;
  }
};

export const apiChangePassword = async (oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string } | null> => {
  try {
    const res = await instance.post("/auth/change-password", { oldPassword, newPassword }, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Change password failed:", error);
    return null;
  }
};

export const apiRequestPasswordReset = async (email: string): Promise<{ success: boolean; message: string } | null> => {
  try {
    const res = await instance.post("/auth/reset-password/request", { email });
    return res.data;
  } catch (error) {
    console.error("Request password reset failed:", error);
    return null;
  }
};

export const apiResetPassword = async (email: string, otp: string, newPassword: string): Promise<{ success: boolean; message: string } | null> => {
  try {
    const res = await instance.post("/auth/reset-password", { email, otp, newPassword });
    return res.data;
  } catch (error) {
    console.error("Reset password failed:", error);
    return null;
  }
};

export const apiRegisterUser = async (email: string, name: string, password: string): Promise<AuthResponse | null> => {
  try {
    const res = await instance.post<AuthResponse>("/auth/register", { email, name, password });
    return res.data;
  } catch (error) {
    console.error("Register failed:", error);
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
