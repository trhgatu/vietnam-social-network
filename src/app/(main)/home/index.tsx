import { NewFeeds } from "@/app/(main)/home/components/news-feed";
import { PostForm } from "@/app/(main)/home/components/post-form";
export function HomePage() {

    return (
        <div>
            <PostForm />
            <NewFeeds />
        </div>
    );
}
