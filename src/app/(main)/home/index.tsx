import { NewFeeds } from "@/app/(main)/home/components/news-feed";
import { PostForm } from "@/app/(main)/home/components/post-form";
import { StoryCarousel } from "@/app/(main)/home/components/story-carousel";
export function HomePage() {

    return (
        <div>
            <PostForm />
            <StoryCarousel/>
            <NewFeeds />
        </div>
    );
}
