"use client";

import useSWR from "swr";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { fetcher } from "@/api-client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Divider } from "antd";
import { ThumbsUp, MessageCircle, Share2, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/shared/types/post";
import { MarkdownRenderer } from "@/shared/components/markdown-renderer";

export function NewsFeed() {
    const { data: posts, error } = useSWR<{ data: Post[] }>('/posts', fetcher);

    if (error) return <div>Failed to load posts.</div>;
    if (!posts) return <div>Loading...</div>;

    return (
        <div>
            {posts.data?.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
            ) : (
                posts.data.map((post: Post) => {
                    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

                    return (
                        <Card key={post._id} className="mb-4">
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={post.authorId?.avatar || "/default-avatar.png"}
                                                alt={post.authorId?.name || "User"}
                                                onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
                                            />
                                            <AvatarFallback>
                                                <Bot size={20} />
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <span className="flex items-center gap-2">
                                                {post.authorId?.username || "AI Assistant"}
                                                {post.isAI && <Bot className="text-blue-600" />}
                                            </span>
                                            <p className="text-sm font-medium">{timeAgo}</p>
                                        </div>
                                    </div>
                                </CardTitle>
                                <CardDescription>
                                    <div className="text-black text-base dark:text-slate-100">
                                        <MarkdownRenderer content={post.content}>

                                        </MarkdownRenderer>
                                    </div>
                                </CardDescription>
                            </CardHeader>

                            {post.media && post.media.length > 0 && (
                                <CardContent>
                                    <div className="relative w-full h-64">
                                        <Image
                                            src={post.media[0]}
                                            alt="Post image"
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className="rounded-lg"
                                        />
                                    </div>
                                </CardContent>
                            )}
                            <Divider className="!mb-2 !mt-0 !dark:text-gray-400" />
                            <CardFooter className="pb-4 flex justify-between">

                                <Button variant="ghost" className="flex items-center gap-2">
                                    <ThumbsUp size={20} /> Like
                                </Button>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <MessageCircle size={20} /> Comment
                                </Button>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <Share2 size={20} /> Share
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })
            )}
        </div>
    );
}
