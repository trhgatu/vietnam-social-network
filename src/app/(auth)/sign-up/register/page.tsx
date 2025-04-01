"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/api-client";
import Link from "next/link";

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const { toast } = useToast();
    const router = useRouter();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!email) {
            router.push("/sign-up");
        }
    }, [email, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!name.trim()) {
            setError("Please enter your name.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const res = await registerUser(email, name, password);
            if (res?.success) {
                toast({ description: "Account created successfully! Please sign in." });
                router.push("/sign-in");
            } else {
                setError(res?.message || "Registration failed.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred during registration.");
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
                    <p className="text-center text-gray-700 mb-4">
                        Sign up with email: <b>{email}</b>
                    </p>

                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Full Name</label>
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium mb-2">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium mb-2">Confirm Password</label>
                            <Input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <Button
                            type="submit"
                            className="w-full bg-red-600 text-white hover:bg-red-700"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-gray-700 text-sm">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-red-600 font-medium">
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
