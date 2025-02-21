import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const stories = [
    { id: 1, name: "Bạn A", avatar: "https://avatar.iran.liara.run/public/1", story: "https://picsum.photos/200/300?random=1" },
    { id: 2, name: "Bạn B", avatar: "https://avatar.iran.liara.run/public/2", story: "https://picsum.photos/200/300?random=2" },
    { id: 3, name: "Bạn C", avatar: "https://avatar.iran.liara.run/public/3", story: "https://picsum.photos/200/300?random=3" },
    { id: 4, name: "Bạn D", avatar: "https://avatar.iran.liara.run/public/4", story: "https://picsum.photos/200/300?random=4" },
    { id: 5, name: "Bạn E", avatar: "https://avatar.iran.liara.run/public/5", story: "https://picsum.photos/200/300?random=5" },
    { id: 6, name: "Bạn F", avatar: "https://avatar.iran.liara.run/public/6", story: "https://picsum.photos/200/300?random=6" },
];

export function StoryCarousel() {
    return (
        <div className="relative mb-4">
            <Carousel opts={{ align: "start" }} className="relative">
                <CarouselContent>
                    {stories.map((story) => (
                        <CarouselItem key={story.id} className="ml-3 p-0 basis-1/3 md:basis-1/4 lg:basis-1/5">
                            <div className="p-1">
                                <Card className="relative group overflow-hidden rounded-xl">
                                    <CardContent className="p-0">
                                        <Image
                                            src={story.story}
                                            alt={story.name}
                                            width={120}
                                            height={200}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />

                                        <div className="absolute top-2 left-2">
                                            <Avatar>
                                                <AvatarImage src={story.avatar}>
                                                </AvatarImage>
                                                <AvatarFallback>{story.name}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                                            {story.name}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="sm:block hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white" />
                <CarouselNext className="sm:block hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white" />
            </Carousel>
        </div>
    );
}
