import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

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
        <div className="relative w-full max-w-md md:max-w-lg lg:max-w-2xl mb-4">
            <Carousel opts={{ align: "start" }} className="relative">
                <CarouselContent>
                    {stories.map((story) => (
                        <CarouselItem key={story.id} className="md:basis-1/4 lg:basis-1/5">
                            <div className="p-1">
                                <Card className="relative group overflow-hidden rounded-xl">
                                    <CardContent className="p-0">
                                        {/* Hình nền Story */}
                                        <Image
                                            src={story.story}
                                            alt={story.name}
                                            width={120}
                                            height={200}
                                            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute top-2 left-2">
                                            <Image
                                                src={story.avatar}
                                                alt={story.name}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full border-2 border-white"
                                            />
                                        </div>
                                        {/* Tên người đăng */}
                                        <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                                            {story.name}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white" />
            </Carousel>
        </div>
    );
}
