import instance from "@/api-client/axios-client";
import { AuthResponse } from "../types/auth";

export const setAuthToken = (token: string | null) => {
    if (token) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common["Authorization"];
    }
};
export const clearAuthToken = () => {
    delete instance.defaults.headers.common["Authorization"];
};

export const fetchUser = async (): Promise<AuthResponse | null> => {
    try {
        const res = await instance.get<AuthResponse>("/auth/me");
        return res.data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
};


export const refreshToken = async (): Promise<AuthResponse | null> => {
    try {
        const res = await instance.post<AuthResponse>("/auth/refresh", {});
        if (res.data.token) {
            setAuthToken(res.data.token);
            localStorage.setItem("token", res.data.token);
        }
        return res.data;
    } catch (error) {
        console.error("Refresh token failed", error);
        return null;
    }
};


export const loginUser = async (token: string): Promise<AuthResponse | null> => {
    try {
        const res = await instance.get<AuthResponse>("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
};
export const logoutUser = async (): Promise<void> => {
    try {
        await instance.post("/auth/logout");
    } catch (error) {
        console.error("Logout failed:", error);
    } finally {
        clearAuthToken();
        localStorage.removeItem("token");
    }
};

