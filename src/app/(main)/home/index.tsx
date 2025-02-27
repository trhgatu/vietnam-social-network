import { NewsFeed } from "@/app/(main)/home/components/news-feed";
import { PostForm } from "@/app/(main)/home/components/post-form";
import { StoryCarousel } from "@/app/(main)/home/components/story-carousel";

export function HomePage() {

    return (
        <div className="w-full flex flex-col">
            <div className="md:mx-4 md:mt-4 mx-2 mt-2">
                <StoryCarousel />
                <PostForm />
                <NewsFeed />
            </div>
        </div>
    );
}
