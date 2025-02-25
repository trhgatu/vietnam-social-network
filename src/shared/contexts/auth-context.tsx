'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/shared/types/user";
import instance from "@/api-client/axios-client";

interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await instance.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        console.log("Not authenticated", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    try {
      const res = await instance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      router.push("/home");
    } catch (error) {
      console.log("Error fetching user after login", error);
    }
  };

  const logout = async () => {
    try {
      await instance.post("/auth/logout", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/sign-in";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
