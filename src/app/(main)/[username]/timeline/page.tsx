"use client";

import { useTranslation } from "react-i18next";
import { useAuth } from "@/shared/contexts/auth-context";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Image as ImageIcon,
  Smile,
  Calendar,
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
import { useState } from "react";

export default function TimelinePage() {
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const { username } = useParams();

  // Check if this is the current user's profile
  const isOwnProfile = user?.username === username;

  // State for like functionality
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({
    "post1": false,
    "post2": false
  });

  const handleLike = (postId: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Mock posts data
  const posts = [
    {
      id: "post1",
      author: {
        name: "Nguyen Van A",
        username: "nguyenvana",
        avatar: "https://avatar.iran.liara.run/public/boy"
      },
      content: "Hôm nay thời tiết thật đẹp! #vietnam #hanoi",
      image: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd",
      location: "Hà Nội",
      timeAgo: "2 giờ trước",
      likes: 42,
      comments: 12,
      shares: 3
    },
    {
      id: "post2",
      author: {
        name: "Tran Thi B",
        username: "tranthib",
        avatar: "https://avatar.iran.liara.run/public/girl"
      },
      content: "Vừa hoàn thành dự án mới! Rất vui khi được làm việc với đội ngũ tuyệt vời. 💻 #coding #developer",
      image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=2025&auto=format&fit=crop",
      location: "Hồ Chí Minh",
      timeAgo: "1 ngày trước",
      likes: 89,
      comments: 23,
      shares: 7
    }
  ];

  return (
    <div>
      {/* Create Post Section - Only show on own profile */}
      {isOwnProfile && (
        <Card className="mb-6 shadow-sm bg-white dark:bg-zinc-950">
          <CardHeader className="pb-3">
            <h2 className="text-lg font-medium">{t("post.create")}</h2>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-zinc-800 rounded-full px-4 py-2.5 flex-1 text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition duration-200">
                {t("post.whatThinking")}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3 flex justify-between flex-wrap">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 dark:text-gray-300">
              <ImageIcon className="h-5 w-5" />
              <span className="hidden sm:inline">{t("post.photoVideo")}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 dark:text-gray-300">
              <Smile className="h-5 w-5" />
              <span className="hidden sm:inline">{t("post.feeling")}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 dark:text-gray-300">
              <Calendar className="h-5 w-5" />
              <span className="hidden sm:inline">{t("post.event")}</span>
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map(post => {
          const isLiked = likedPosts[post.id];

          return (
            <Card key={post.id} className="shadow-sm overflow-hidden bg-white dark:bg-zinc-950">
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{post.timeAgo}</span>
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
                      <DropdownMenuItem className="cursor-pointer">Lưu bài viết</DropdownMenuItem>
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
                    <img
                      src={post.image}
                      alt="Post image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col p-0">
                {/* Like counter and stats */}
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
                    <span>{isLiked ? post.likes + 1 : post.likes}</span>
                  </div>
                  <div className="flex gap-3">
                    <span>{post.comments} {t("post.comments")}</span>
                    <span>{post.shares} {t("post.shares")}</span>
                  </div>
                </div>

                <Separator />

                {/* Action buttons */}
                <div className="py-1 px-2 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex-1 gap-2 ${isLiked ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => handleLike(post.id)}
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

                {/* Comments section */}
                <div className="p-4 space-y-3">
                  {/* A sample comment */}
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
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}