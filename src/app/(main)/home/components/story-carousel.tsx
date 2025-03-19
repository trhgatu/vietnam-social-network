"use client";

import { useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/shared/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const stories = [
    { id: 1, name: "Quỳnh Anh", avatar: "https://avatar.iran.liara.run/public/girl", story: "https://picsum.photos/id/237/400/800", hasUnread: true },
    { id: 2, name: "Minh Tuấn", avatar: "https://avatar.iran.liara.run/public/boy", story: "https://picsum.photos/id/238/400/800", hasUnread: true },
    { id: 3, name: "Thu Hà", avatar: "https://avatar.iran.liara.run/public/girl", story: "https://picsum.photos/id/239/400/800", hasUnread: true },
    { id: 4, name: "Văn Đức", avatar: "https://avatar.iran.liara.run/public/boy", story: "https://picsum.photos/id/240/400/800", hasUnread: false },
    { id: 5, name: "Thúy Nga", avatar: "https://avatar.iran.liara.run/public/girl", story: "https://picsum.photos/id/241/400/800", hasUnread: false },
    { id: 6, name: "Anh Tú", avatar: "https://avatar.iran.liara.run/public/boy", story: "https://picsum.photos/id/242/400/800", hasUnread: false },
    { id: 7, name: "Hà My", avatar: "https://avatar.iran.liara.run/public/girl", story: "https://picsum.photos/id/243/400/800", hasUnread: false },
    { id: 8, name: "Đức Anh", avatar: "https://avatar.iran.liara.run/public/boy", story: "https://picsum.photos/id/244/400/800", hasUnread: false },
];

export function StoryCarousel() {
    const { user } = useAuth();
    const carouselRef = useRef(null);
    const { t } = useTranslation('common');

    return (
        <div className="relative mb-4">
            <Carousel opts={{ align: "start" }} className="relative" ref={carouselRef}>
                <CarouselContent>
                    {/* Add Story Item (first item) */}
                    {user && (
                        <CarouselItem key="add-story" className="basis-[110px] pl-4 md:basis-[130px] lg:basis-[150px]">
                            <div className="h-full">
                                <Card className="relative rounded-xl overflow-hidden border-0 h-48 md:h-56">
                                    <CardContent className="p-0 h-full">
                                        <div className="relative h-full w-full bg-gradient-to-br from-gray-200 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 flex flex-col items-center justify-center">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <div className="w-12 h-12 md:w-14 md:h-14 relative">
                                                    <Avatar className="h-full w-full border-2 border-white dark:border-zinc-800">
                                                        <AvatarImage src={user?.avatar} alt={user?.name} />
                                                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <PlusCircle className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-800 text-blue-500 rounded-full w-6 h-6" />
                                                </div>
                                                <span className="text-xs md:text-sm font-medium mt-3 text-center px-1">{t('story.createStory')}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    )}

                    {/* Story Items */}
                    {stories.map((story) => (
                        <CarouselItem key={story.id} className="basis-[110px] pl-1 md:pl-2 md:basis-[130px] lg:basis-[150px]">
                            <Button
                                variant="ghost"
                                className="p-0 h-auto w-full block"
                                onClick={() => console.log(`Viewing story ${story.id}`)}
                            >
                                <Card className="relative rounded-xl overflow-hidden border-0 h-48 md:h-56">
                                    <CardContent className="p-0 h-full">
                                        <div className="absolute inset-0">
                                            <Image
                                                src={story.story}
                                                alt={story.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
                                        </div>

                                        <div className="absolute top-2 left-0 right-0 flex justify-center">
                                            <div className={cn(
                                                "p-[2px] rounded-full",
                                                story.hasUnread
                                                    ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500"
                                                    : "bg-transparent"
                                            )}>
                                                <Avatar className="h-9 w-9 md:h-11 md:w-11 border-2 border-white">
                                                    <AvatarImage src={story.avatar} alt={story.name} />
                                                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-2 left-0 right-0 text-center">
                                            <p className="text-white text-xs md:text-sm font-medium truncate px-2">
                                                {story.name}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 shadow-md rounded-full hidden md:flex">
                    <CarouselPrevious className="relative left-0 right-0 translate-x-0 translate-y-0 h-9 w-9 rounded-full border-0" />
                </div>

                <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 shadow-md rounded-full hidden md:flex">
                    <CarouselNext className="relative left-0 right-0 translate-x-0 translate-y-0 h-9 w-9 rounded-full border-0" />
                </div>
            </Carousel>
        </div>
    );
}
