'use client'

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import { useAuth } from "@/shared/contexts/auth-context";
import { useRouter } from "next/navigation";
import instance from "@/api-client/axios-client";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await instance.post("/auth/forgot-password", { email });
            if (response.data.success) {
                login(response.data.user)
                toast({
                    description: `${response?.data.message}`
                })
                router.push('/home');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.log(err)
            setError("Email hoặc mật khẩu không đúng.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="text-2xl font-bold text-center">Forgot Password?</h2>
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
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <Button
                            type="submit"
                            className="w-full bg-red-600 text-white hover:bg-red-700"
                            disabled={loading}
                        >
                            Reset Password
                        </Button>
                    </form>
                    <p className="mt-6 text-center text-gray-700 text-sm">
                        <div className="flex items-center space-x-4">
                            <MoveLeft className="text-red-600" />
                            <Link href="/sign-in" className="text-red-600 font-medium">Back to Sign-in</Link>
                        </div>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
