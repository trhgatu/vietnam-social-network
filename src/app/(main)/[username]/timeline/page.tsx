"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/shared/contexts/auth-context";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MoreHorizontal,
  MapPin,
  ThumbsUp,
  MessageSquare,
  Share2,
  Heart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { PostForm } from "@/app/(main)/home/components/post-form";
import { fetchPostsByUsername, deletePost } from "@/api-client/posts-api";
import { Post } from "@/shared/types";
import { timeAgo } from "@/shared/utils/timeAgo";

export default function TimelinePage() {
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const { username } = useParams();
  const isOwnProfile = user?.username === username;
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (username) {
        try {
          setLoading(true);
          const fetchedPosts = await fetchPostsByUsername(username as string);
          setPosts(fetchedPosts);
          console.log(fetchedPosts)
        } catch (error) {
          console.error("Lỗi khi tải bài viết", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadPosts();
  }, [username]);

  const handleLike = (postId: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };
  const handleDeletePost = async (postId: string) => {
    await deletePost(postId);
    setPosts(prev => prev.filter(post => post._id !== postId));
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {isOwnProfile && (
        <PostForm />
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map(post => {
          const isLiked = likedPosts[post._id];

          return (
            <Card key={post._id} className="shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      {post.authorId && (
                        <AvatarImage src={post.authorId.avatar} alt={post.authorId.name} />
                      )}
                      <AvatarFallback>{post.authorId?.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.authorId?.name}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{timeAgo(post.createdAt)}</span>
                        {post.location && (
                          <>
                            <span className="mx-1">•</span>
                            <MapPin className="h-3 w-3 mr-0.5" />
                            <span>{post.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleDeletePost(post._id)}
                      >Xóa bài viết
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Sao chép liên kết</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-600">
                        Báo cáo bài viết
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="pb-3">
                <p className="mb-4 whitespace-pre-line">{post.content}</p>

                {post.image && (
                  <div className="relative aspect-video rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-800">
                    <Image
                      width={800}
                      height={800}
                      src={post.image}
                      alt="Post image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </CardContent>

              <div className="flex flex-col p-0">
                <div className="px-4 py-2 flex justify-between items-center text-gray-500 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1">
                      <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <ThumbsUp className="h-3 w-3 text-white" />
                      </div>
                      <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                        <Heart className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <span>{isLiked ? (Array.isArray(post.likes) ? post.likes.length + 1 : (post.likes ?? 0) + 1) : (Array.isArray(post.likes) ? post.likes.length : post.likes ?? 0)}</span>
                  </div>
                  <div className="flex gap-3">
                    <span>{post.comments} {t("post.comments")}</span>
                    <span>{post.shares} {t("post.shares")}</span>
                  </div>
                </div>

                <Separator />
                <div className="py-1 px-2 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex-1 gap-2 ${isLiked ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => handleLike(post._id)}
                  >
                    <ThumbsUp className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="hidden xs:inline">{t("post.like")}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 gap-2 text-gray-600 dark:text-gray-300">
                    <MessageSquare className="h-5 w-5" />
                    <span className="hidden xs:inline">{t("post.comment")}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 gap-2 text-gray-600 dark:text-gray-300">
                    <Share2 className="h-5 w-5" />
                    <span className="hidden xs:inline">{t("post.share")}</span>
                  </Button>
                </div>

                <Separator />

                <div className="p-4 space-y-3">
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://avatar.iran.liara.run/public/girl?v=3" alt="User" />
                      <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-2xl px-3 py-2">
                      <p className="font-medium text-sm">Pham Thi D</p>
                      <p className="text-sm">Ảnh đẹp quá! 😍</p>
                    </div>
                  </div>

                  <div className="flex items-center pl-10 text-sm">
                    <Button variant="link" size="sm" className="h-auto p-0 text-gray-500">Thích</Button>
                    <span className="mx-2">•</span>
                    <Button variant="link" size="sm" className="h-auto p-0 text-gray-500">Phản hồi</Button>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500 text-xs">30 phút trước</span>
                  </div>

                  {/* Add comment box */}
                  <div className="flex items-center gap-2 mt-3 pt-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                      Viết bình luận...
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}