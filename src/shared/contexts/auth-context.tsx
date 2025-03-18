"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchUser, loginUser, logoutUser } from "@/api-client/auth-api";
import { AuthContextType, User } from "@/shared/types";
import LoadingPage from "@/shared/components/loading-page/loading-page";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const publicRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

    useEffect(() => {
        const initializeUser = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (token) {
                const data = await fetchUser();
                setUser(data?.user ?? null);
            }
            setLoading(false);
        };
        initializeUser();
    }, []);


    useEffect(() => {
        if (!loading) {
            if (!user && !publicRoutes.includes(pathname)) {
                router.push("/sign-in");
            }

            if (user && publicRoutes.includes(pathname)) {
                router.push("/home");
            }
        }
    }, [user, pathname, router, loading, publicRoutes]);

    const login = async (token: string): Promise<void> => {
        const data = await loginUser(token);
        if (data) {
            setUser(data.user);
            router.push("/home");
        }
    };

    const logout = async (): Promise<void> => {
        await logoutUser();
        setUser(null);
        router.push("/sign-in");
    };

    if (loading || (!user && !publicRoutes.includes(pathname))) {
        return <LoadingPage />;
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
