import instance from "@/api-client/axios-client";
import { AuthResponse } from "@/shared/types/auth";

class AuthService {
  private baseUrl = "/auth";

  async login(email: string, password: string): Promise<AuthResponse | null> {
    try {
      const response = await instance.post<AuthResponse>(`${this.baseUrl}/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await instance.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  async fetchUser(): Promise<AuthResponse | null> {
    try {
      const response = await instance.get<AuthResponse>(`${this.baseUrl}/me`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Fetch user failed:", error);
      return null;
    }
  }
  async getAccessToken(): Promise<string | null> {
    try {
      const response = await instance.get<AuthResponse>(`${this.baseUrl}/auth/token`, { withCredentials: true });
      return response.data.accessToken || null;
    } catch (error) {
      console.warn("⚠ Không thể lấy accessToken:", error);
      return null;
    }
  }

  async refreshToken(): Promise<AuthResponse | null> {
    try {
      const response = await instance.post<AuthResponse>(`${this.baseUrl}/refresh-token`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Refresh token failed:", error);
      return null;
    }
  }

  async register(email: string, name: string, password: string): Promise<AuthResponse | null> {
    try {
      const response = await instance.post<AuthResponse>(`${this.baseUrl}/register`, { email, name, password });
      return response.data;
    } catch (error) {
      console.error("Register failed:", error);
      return null;
    }
  }

  async sendOTP(email: string): Promise<{ success: boolean; message: string } | null> {
    try {
      const response = await instance.post(`${this.baseUrl}/register/send-otp`, { email });
      return response.data;
    } catch (error) {
      console.error("Send OTP failed:", error);
      return null;
    }
  }

  async verifyOTP(email: string, otp: string): Promise<{ success: boolean; message: string } | null> {
    try {
      const response = await instance.post(`${this.baseUrl}/register/verify-otp`, { email, otp });
      return response.data;
    } catch (error) {
      console.error("Verify OTP failed:", error);
      return null;
    }
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string } | null> {
    try {
      const response = await instance.post(`${this.baseUrl}/change-password`, { oldPassword, newPassword }, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Change password failed:", error);
      return null;
    }
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<{ success: boolean; message: string } | null> {
    try {
      const response = await instance.post(`${this.baseUrl}/reset-password`, { email, otp, newPassword });
      return response.data;
    } catch (error) {
      console.error("Reset password failed:", error);
      return null;
    }
  }
}

export const authService = new AuthService();
