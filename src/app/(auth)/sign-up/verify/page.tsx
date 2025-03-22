"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiVerifyOTP, apiSendOTP } from "@/api-client";

export default function VerifyOTPPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { toast } = useToast();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      router.push("/sign-up");
    }
  }, [email, router]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apiVerifyOTP(email, otp);
      if (res?.success) {
        toast({ description: "OTP verified successfully!" });
        router.push(`/sign-up/register?email=${encodeURIComponent(email)}`);
      } else {
        setError(res?.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    setError(null);

    try {
      const res = await apiSendOTP(email);
      if (res?.success) {
        toast({ description: "A new OTP has been sent to your email!" });
      } else {
        setError(res?.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while resending OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-700 mb-4">
            We&apos;ve sent a verification code to <b>{email}</b>. Please enter the code below.
          </p>

          <form onSubmit={handleVerifyOTP}>
            <div className="mb-4">
              <label className="block font-medium mb-2">OTP Code</label>
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-700 text-sm">Didn&apos;t receive a code?</p>
            <Button
              variant="link"
              className="text-red-600 font-medium"
              disabled={resending}
              onClick={handleResendOTP}
            >
              {resending ? "Resending..." : "Resend OTP"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
