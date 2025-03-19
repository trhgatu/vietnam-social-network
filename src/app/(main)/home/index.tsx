import { NewsFeed } from "@/app/(main)/home/components/news-feed";
import { PostForm } from "@/app/(main)/home/components/post-form";
import { StoryCarousel } from "@/app/(main)/home/components/story-carousel";

export function HomePage() {
    return (
        <div className="w-full flex flex-col">
            <div className="space-y-4 w-full max-w-full sm:max-w-lg md:max-w-2xl mx-auto">
                <StoryCarousel />
                <PostForm />
                <NewsFeed />
            </div>
        </div>
    );
}