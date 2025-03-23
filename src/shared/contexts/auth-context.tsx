"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/shared/services/auth-services";
import { loginUser, logoutUser, refreshToken, fetchUser } from "@/api-client";
import { usePathname, useRouter } from "next/navigation";
import LoadingPage from "@/shared/components/loading-page/loading-page";
import { User } from "@/shared/types/user";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { },
  login: async () => false,
  logout: async () => { },
  isAuthenticated: false,
  isLoading: true,
});

const publicRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const hasRefreshToken = document.cookie.includes("refreshToken");
          if (hasRefreshToken) {
            const refreshed = await refreshToken();

            if (refreshed) {
              const userData = await fetchUser();
              if (userData) {
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
              }
            } else {
              console.warn("Refresh token không hợp lệ, đăng xuất...");
              await authService.logout();
            }

          }
        }
      } catch (error) {
        console.error("Lỗi khi khởi tạo auth:", error);
      } finally {
        setIsLoading(false);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && user && publicRoutes.includes(pathName)) {
      router.replace("/home");
    }
  }, [user, isLoading, pathName, router]);


  const login = async (email: string, password: string): Promise<boolean> => {
    const user = await loginUser(email, password);
    if (user) {
      setUser(user);
      router.push("/home");
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    await logoutUser();
    setUser(null);
    router.push("/sign-in");
  };


  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);