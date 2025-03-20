"use client";

import { User } from "../types/user";
import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, refreshToken, setAuthToken } from "@/shared/services/auth-services";
import { getToken, setToken } from "@/shared/utils/jwt-helper";
import { usePathname, useRouter } from "next/navigation";
import LoadingPage from "@/shared/components/loading-page/loading-page";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (token: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { },
  login: async () => false,
  logout: async () => { },
  isAuthenticated: false,
  isLoading: true,
  token: null,
});
const publicRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setTokenState] = useState<string | null>(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const storedToken = getToken();

        if (storedToken) {
          setAuthToken(storedToken);
          setTokenState(storedToken);
          const response = await refreshToken();

          if (response && response.user) {
            setUser(response.user);
          } else {
            const userData = await loginUser(storedToken);
            if (userData && userData.user) {
              setUser(userData.user);
            } else {
              localStorage.removeItem('token');
              setAuthToken(null);
              setTokenState(null);
            }
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem('token');
        setAuthToken(null);
        setTokenState(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      if (user && publicRoutes.includes(pathName)) {
        router.replace("/home");
      }
    }
  }, [user, isLoading, pathName, router]);
  const login = async (newToken: string): Promise<boolean> => {
    try {
      setToken(newToken);
      setTokenState(newToken);
      const response = await loginUser(newToken);

      if (response && response.user) {
        setUser(response.user);
        router.push("/home");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setTokenState(null);
      localStorage.removeItem('token');
      setAuthToken(null);
      router.push("/sign-in");
    }
  };

  if (isLoading || (user && publicRoutes.includes(pathName))) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        token,
      }}
    >
      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);