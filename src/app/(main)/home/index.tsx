"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/api/axios-client";

interface Post {
  _id: string;
  title: string;
}

export function HomePage() {
    const { data: posts, error, isLoading } = useSWR<Post[]>("/posts", fetcher);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading posts</p>;

    return (
        <div>
            <h1>Home</h1>
            <Link href={"/about"}>About</Link>
            <ul>
                {posts?.map((post) => (
                    <li key={post._id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}
