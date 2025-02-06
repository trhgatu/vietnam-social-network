'use client'

import Link from "next/link";
import { useEffect } from "react";
import axiosClient from "@/api/axios-client";

export function HomePage() {
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axiosClient.get("http://localhost:3001/api/v1/posts");
            console.log("data: - ", response);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <Link href={'/about'}>About</Link>
        </div>
    );
}