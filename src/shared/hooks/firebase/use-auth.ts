'use client'

import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import instance from "@/api-client/axios-client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/contexts/auth-context";

const googleProvider = new GoogleAuthProvider();

export const useAuthActions = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      if (window.location.pathname === "/sign-in") {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const idToken = await currentUser.getIdToken();
        const res = await instance.post("/auth/firebase-login", { idToken });

        if (res.data.success) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
      } catch (error) {
        console.error("Firebase login failed:", error);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);




  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await instance.post("/auth/firebase-login", {}, {
        headers: { Authorization: `Bearer ${idToken}` }
      });

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push('/home');
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    router.push('/sign-in');
  };

  return { loading, loginWithGoogle, logout };
};