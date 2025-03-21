"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser, loginUser, logoutUser, refreshToken } from "@/shared/services/auth-services";
import { getToken } from "@/shared/utils/jwt-helper";
import { usePathname, useRouter } from "next/navigation";
import LoadingPage from "@/shared/components/loading-page/loading-page";
import { User } from "@/shared/types/user";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (token: string) => Promise<boolean>;
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

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const storedToken = getToken();
        if (storedToken) {
          const refreshed = await refreshToken();
          if (refreshed) {
            const userData = await fetchUser();
            if (userData) {
              setUser(userData);
              localStorage.setItem("user", JSON.stringify(userData));
            }
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
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

  const login = async (newToken: string): Promise<boolean> => {
    const userData = await loginUser(newToken);
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/home");
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  if (isLoading || (user && publicRoutes.includes(pathName))) {
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