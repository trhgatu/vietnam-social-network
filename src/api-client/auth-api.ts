import { authService } from "@/shared/services/auth-services";
import { User, UserResponse } from "@/shared/types";

export const fetchUser = async (): Promise<User | null> => {
  const response = await authService.fetchUser();
  return response?.user || null;
};


export const refreshToken = async (): Promise<{ accessToken: string } | null> => {
  try {
    const res = await authService.refreshToken();
    if (res?.success && res?.accessToken) {
      console.info("✅ Token refreshed!");
      return { accessToken: res.accessToken };
    }
  } catch (error) {
    console.error("❌ Error refreshing token:", error);
  }
  await logoutUser();
  return null;
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


export const registerUser = async (email: string, name: string, password: string): Promise<UserResponse | null> => {
  try {
    const response = await authService.register(email, name, password);
    if (response?.success) {
      return {
        user: response.user,
        success: true,
        message: "Đăng ký thành công"
      };
    } else {
      console.error("Đăng ký thất bại:", response?.message || "Không có thông báo");
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    return null;
  }
};




export const sendOTPForRegistration = async (email: string): Promise<{ success: boolean; message: string } | null> => {
  return await authService.sendOTP(email);
};


export const verifyOTPForRegistration = async (email: string, otp: string): Promise<{ success: boolean; message: string } | null> => {
  return await authService.verifyOTP(email, otp);
};


export const changeUserPassword = async (oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string } | null> => {
  return await authService.changePassword(oldPassword, newPassword);
};

export const resetUserPassword = async (email: string, otp: string, newPassword: string): Promise<{ success: boolean; message: string } | null> => {
  return await authService.resetPassword(email, otp, newPassword);
};
