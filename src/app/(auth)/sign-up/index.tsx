"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ButtonGoogle from "@/components/button-google";
import ButtonApple from "@/components/button-apple";
import ButtonFacebook from "@/components/button-facebook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiSendOTP } from "@/api-client";

export function SignUpPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apiSendOTP(email);
      if (res?.success) {
        toast({ description: res?.message || "OTP sent successfully!" });
        router.push(`/sign-up/verify?email=${encodeURIComponent(email)}`);
      } else {
        setError(res?.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold text-center">Create Account</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendOTP}>
            <div className="mb-4">
              <label className="block font-medium mb-2">Email address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Checkbox id="agree" />
              <label htmlFor="agree" className="text-sm">
                I agree to the <Link href="/terms" className="text-red-500">terms and conditions</Link>
              </label>
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
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
            Already have an account?{" "}
            <Link href="/sign-in" className="text-red-600 font-medium">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
