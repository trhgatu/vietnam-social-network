"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ButtonGoogle from "@/components/button-google";
import ButtonApple from "@/components/button-apple";
import ButtonFacebook from "@/components/button-facebook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/shared/contexts/auth-context";

export function SignInPage() {
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const success = await login(email, password);
      if (success) {
        toast({ description: "Đăng nhập thành công!" });
        router.push("/home");
      } else {
        setError("Email hoặc mật khẩu không đúng.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold text-center">Welcome!</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium mb-2">Email address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm">Remember me</label>
              </div>
              <Link href="/forgot-password" className="text-red-500 text-sm">
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 dark:bg-black bg-white">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <ButtonGoogle />
            <ButtonApple />
            <ButtonFacebook />
          </div>

          <p className="mt-6 text-center text-gray-700 text-sm">
            <span> Don&apos;t have an account?{" "}</span>
            <Link href="/sign-up" className="text-red-600 font-medium">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
