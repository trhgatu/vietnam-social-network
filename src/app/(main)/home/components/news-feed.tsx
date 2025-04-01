"use client";

import useSWR from "swr";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { fetchPosts } from "@/api-client/posts-api";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    ThumbsUp,
    MessageCircle,
    Share2,
    Bot,
    MoreHorizontal,
    Bookmark,
    Flag,
    UserMinus,
    Heart
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/shared/types/post";
import { MarkdownRenderer } from "@/shared/components/markdown-renderer";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function NewsFeed() {
    const { data: posts, error, isLoading } = useSWR(
        ['/posts', 1, 10],
        ([, page, limit]) => fetchPosts(page, limit),
        { revalidateOnFocus: false }
    );
    const { t } = useTranslation('common');
    const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

    const handleLikePost = (postId: string) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    if (error) return <div className="py-4 text-center text-gray-600 dark:text-gray-400">Failed to load posts.</div>;

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div>
            {!posts?.length ? (
                <Card className="py-8">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <p>{t('post.noPosts')}</p>
                    </div>
                </Card>
            ) : (
                posts.map((post: Post) => {
                    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
                    const isLiked = likedPosts[post._id] || false;

                    return (
                        <Card key={post._id} className="mb-4 shadow-sm border border-gray-200 dark:border-zinc-800">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={post.authorId?.avatar || "/default-avatar.png"}
                                                alt={post.authorId?.name || "User"}
                                            />
                                            <AvatarFallback>
                                                {post.authorId?.name?.charAt(0) || <Bot size={20} />}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{post.authorId?.name || "AI Assistant"}</span>
                                                {post.isAI && <Bot className="text-blue-600 h-4 w-4" />}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{timeAgo}</p>
                                        </div>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                                                <Bookmark className="h-4 w-4" />
                                                <span>{t('post.save')}</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-yellow-600">
                                                <Flag className="h-4 w-4" />
                                                <span>{t('post.report')}</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-red-600">
                                                <UserMinus className="h-4 w-4" />
                                                <span>{t('post.unfollow')}</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>

                            <CardContent className="pb-3 pt-2">
                                <div className="text-base dark:text-gray-200">
                                    <MarkdownRenderer content={post.content} />
                                </div>
                            </CardContent>

                            {post.media && post.media.length > 0 && (
                                <CardContent className="p-0 pt-1">
                                    <div className="relative w-full h-64 md:h-80">
                                        <Image
                                            src={post.media[0]}
                                            alt="Post image"
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </CardContent>
                            )}

                            {/* Like counts and reactions */}
                            <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex -space-x-1">
                                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                            <ThumbsUp className="h-3 w-3 text-white" />
                                        </div>
                                        <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                                            <Heart className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                    <span>{Math.floor(Math.random() * 50) + (isLiked ? 1 : 0)}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span>{Math.floor(Math.random() * 15)} {t('post.comments')}</span>
                                    <span>{Math.floor(Math.random() * 5)} {t('post.shares')}</span>
                                </div>
                            </div>

                            <Separator className="my-1" />

                            <CardFooter className="py-1 flex justify-between">
                                <Button
                                    variant="ghost"
                                    className={`flex-1 flex items-center justify-center gap-2 ${isLiked ? 'text-blue-600' : ''}`}
                                    onClick={() => handleLikePost(post._id)}
                                >
                                    {isLiked ? (
                                        <ThumbsUp className="h-5 w-5 fill-current" />
                                    ) : (
                                        <ThumbsUp className="h-5 w-5" />
                                    )}
                                    <span className="text-sm md:text-base">{t('post.like')}</span>
                                </Button>
                                <Button variant="ghost" className="flex-1 flex items-center justify-center gap-2">
                                    <MessageCircle className="h-5 w-5" />
                                    <span className="text-sm md:text-base">{t('post.comment')}</span>
                                </Button>
                                <Button variant="ghost" className="flex-1 flex items-center justify-center gap-2">
                                    <Share2 className="h-5 w-5" />
                                    <span className="text-sm md:text-base">{t('post.share')}</span>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })
            )}
        </div>
    );
}
