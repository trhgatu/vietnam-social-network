import Image from 'next/image'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react"

const posts = [
    {
        id: 1,
        user: "Nguyễn Văn A",
        avatar: "https://avatar.iran.liara.run/public",
        content: "Hôm nay trời đẹp quá!",
        image: "https://picsum.photos/200/300?random=2.jpg",
    },
    {
        id: 3,
        user: "Trần Thị B",
        avatar: "https://avatar.iran.liara.run/public",
        content: "Cùng nhau đi chơi thôi!",
        image: "https://picsum.photos/200/300?random=1.jpg",
    },
];

export function NewFeeds() {
    return (
        <div>
            {posts.map((post) => (
                <Card key={post.id} className='mb-4'>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-3">
                                <Image src={post.avatar} alt={post.user} width={40} height={40} className="w-10 h-10 rounded-full" />
                                <span className="font-semibold">{post.user}</span>
                            </div>
                        </CardTitle>
                        <CardDescription>{post.content}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full h-64">
                            <Image src={post.image}
                                alt="Post image"
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-lg"
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
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
            ))}
        </div>
    );
}
