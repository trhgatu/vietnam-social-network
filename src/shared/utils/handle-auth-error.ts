import axios, { AxiosError } from "axios";
import { refreshToken } from "@/shared/services/auth-services";

export const handleAuthError = async (error: unknown): Promise<void> => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 401) {
            await refreshToken();
        } else {
            console.error("Authentication error:", axiosError.message);
        }
    } else {
        console.error("Unexpected error:", error);
    }
};
