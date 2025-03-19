'use client'

import instance from "@/api-client/axios-client";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/shared/contexts/auth-context";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Image, SmilePlus, MapPin, Globe, Users, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const audiences = [
    {
        id: 1,
        name: "Public",
        nameTrans: "post.public",
        message: "post.publicDesc",
        icon: <Globe className="w-4 h-4" />,
    },
    {
        id: 2,
        name: "Friends",
        nameTrans: "post.friends",
        message: "post.friendsDesc",
        icon: <Users className="w-4 h-4" />,
    },
    {
        id: 3,
        name: "Only me",
        nameTrans: "post.private",
        message: "post.privateDesc",
        icon: <Lock className="w-4 h-4" />,
    },
];

export function PostForm() {
    const { toast } = useToast();
    const { mutate } = useSWRConfig();
    const { user } = useAuth();
    const { t } = useTranslation('common');
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedAudience, setSelectedAudience] = useState(audiences[0]);
    const [isOpen, setIsOpen] = useState(false);

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
                    description: response.data.message
                });
                setContent("");
                setIsOpen(false);
                mutate('/posts');
            } else {
                toast({
                    description: response.data.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                description: t('post.error'),
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="mb-4">
            <Card className="shadow-sm border border-gray-200 dark:border-zinc-800">
                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger className="flex-1">
                                <div className="flex-1 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer transition-colors duration-200 rounded-full p-2.5 md:p-3 text-left px-4">
                                    <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                                        {t('post.whatThinking')}
                                    </span>
                                </div>
                            </DialogTrigger>

                            <DialogContent className="w-full max-w-md sm:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle className="text-center text-lg font-semibold">
                                        {t('post.create')}
                                    </DialogTitle>
                                </DialogHeader>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm md:text-base">{user.name}</span>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                                        {selectedAudience.icon}
                                                        <span>{t(selectedAudience.nameTrans)}</span>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        {audiences.map((audience) => (
                                                            <DropdownMenuItem
                                                                key={audience.id}
                                                                className="flex items-center gap-2 p-2"
                                                                onClick={() => setSelectedAudience(audience)}
                                                            >
                                                                {audience.icon}
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-sm">{t(audience.nameTrans)}</span>
                                                                    <span className="text-xs text-gray-500">{t(audience.message)}</span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Textarea
                                    className="min-h-24 resize-none bg-transparent border-none focus-visible:ring-0 p-0"
                                    placeholder={t('post.whatThinking')}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />

                                <div className="rounded-lg border border-gray-200 dark:border-zinc-800 p-2 flex items-center justify-between">
                                    <span className="text-sm font-medium">{t('post.addToPost')}</span>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                            <Image className="h-5 w-5 text-green-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                            <SmilePlus className="h-5 w-5 text-yellow-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                            <MapPin className="h-5 w-5 text-red-500" />
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    className="w-full font-medium"
                                    disabled={!content.trim() || loading}
                                    onClick={handleCreatePost}
                                >
                                    {loading ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : null}
                                    {t('post.post')}
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>

                <Separator className="my-1" />

                <CardContent className="p-2 md:p-4 flex flex-wrap justify-between">
                    <Button variant="ghost" className="flex-1 flex items-center justify-center gap-2">
                        <Image className="h-5 w-5 text-green-500" />
                        <span className="text-sm md:text-base">{t('post.photoVideo')}</span>
                    </Button>

                    <Button variant="ghost" className="flex-1 flex items-center justify-center gap-2">
                        <SmilePlus className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm md:text-base">{t('post.feeling')}</span>
                    </Button>

                    <Button variant="ghost" className="flex-1 flex items-center justify-center gap-2">
                        <MapPin className="h-5 w-5 text-red-500" />
                        <span className="text-sm md:text-base">{t('post.location')}</span>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
