'use client'

import instance from "@/api-client/axios-client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Divider } from "antd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Earth, FileImage, Tag, Laugh } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
const audiences = [
    {
        id: 1,
        name: "Công khai",
        message: "Bất kỳ ai cũng có thể xem bài viết này.",
        icon: <Earth className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
        id: 2,
        name: "Tùy chỉnh",
        message: "Chỉ những người bạn chọn mới có thể xem bài viết này.",
        icon: <Tag className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
        id: 3,
        name: "Bạn bè",
        message: "Chỉ bạn bè của bạn mới có thể xem bài viết này.",
        icon: <Laugh className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
];

export function PostForm() {
    const { toast } = useToast();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedAudience, setSelectedAudience] = useState(audiences[0]);

    const handleCreatePost = async () => {
        if (!content.trim()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await instance.post(
                "/posts/create",
                { content },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.data.success) {
                toast({
                    description: `${response.data.message}`
                });
                setContent("");
            } else {
                toast({ description: response.data.message, variant: "destructive" });
            }
        } catch (error) {
            console.log(error);
            toast({ description: "Đã có lỗi xảy ra!", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            <Card>
                <CardHeader className="p-4">
                    <CardTitle>
                        <div className="flex items-center">
                            <Avatar>
                                <AvatarImage src="https://avatar.iran.liara.run/public" />
                                <AvatarFallback>Anh Tu</AvatarFallback>
                            </Avatar>

                            <Dialog>
                                <DialogTrigger className="flex-1">
                                    <div className="flex-1 ml-2 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 cursor-pointer transition-all duration-200 rounded-full p-2">
                                        <span className="font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                                            Bạn đang nghĩ gì, Tú?
                                        </span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="w-full max-w-md sm:max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-lg font-semibold text-gray-800 dark:text-gray-100">
                                            Tạo bài viết
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <Avatar>
                                                    <AvatarImage src="https://avatar.iran.liara.run/public/boy" />
                                                </Avatar>
                                                <span className="ml-2 text-sm sm:text-base">Anh Tú</span>
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <div className="flex items-center cursor-pointer">
                                                        {selectedAudience.icon}
                                                        <span className="ml-2 text-sm sm:text-base">
                                                            {selectedAudience.name}
                                                        </span>
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <div className="max-h-60 overflow-y-auto">
                                                        {audiences.map((msg) => (
                                                            <DropdownMenuItem
                                                                key={msg.id}
                                                                className="flex items-center space-x-3 p-2"
                                                                onClick={() => setSelectedAudience(msg)}
                                                            >
                                                                {msg.icon}
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium">{msg.name}</span>
                                                                    <span className="text-sm text-gray-500">{msg.message}</span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </div>
                                                    <DropdownMenuSeparator />
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                    <Textarea
                                        className="w-full resize-none bg-transparent border-none focus:ring-0 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                                        placeholder="Bạn đang nghĩ gì, Tú?"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    <Button
                                        className="w-full mt-3 rounded-lg py-2 text-sm sm:text-base"
                                        onClick={handleCreatePost}
                                        disabled={loading}
                                    >
                                        {loading ? "Đang đăng..." : "Đăng"}
                                    </Button>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardTitle>
                </CardHeader>
                <Divider className="!m-0 hidden sm:block" />
                <CardContent className="px-4 py-2 hidden sm:block">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center flex-1 gap-2 sm:gap-6">
                            <div className="flex items-center cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all duration-200 py-1 px-2 rounded-full text-sm sm:text-base">
                                <p>Ảnh</p>
                                <FileImage className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="flex items-center cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all duration-200 py-1 px-2 rounded-full text-sm sm:text-base">
                                <p>Cảm xúc</p>
                                <Laugh className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="flex items-center cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all duration-200 py-1 px-2 rounded-full text-sm sm:text-base">
                                <p>Gắn thẻ</p>
                                <Tag className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                        </div>
                        <div className="flex items-center text-sm sm:text-base">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger>
                                    <div className="flex items-center ml-1 py-1 px-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-full cursor-pointer transition-all duration-200">
                                        {selectedAudience.icon}
                                        <p className="ml-1">{selectedAudience.name}</p>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <div className="max-h-60 overflow-y-auto">
                                        {audiences.map((msg) => (
                                            <DropdownMenuItem
                                                key={msg.id}
                                                className="flex items-center space-x-3 p-2"
                                                onClick={() => setSelectedAudience(msg)}
                                            >
                                                {msg.icon}
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{msg.name}</span>
                                                    <span className="text-sm text-gray-500">{msg.message}</span>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
