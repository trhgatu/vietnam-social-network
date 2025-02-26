import { notFound } from "next/navigation";
import ProfilePosts from "@/app/(main)/[username]/components/profile-posts";
import ProfileInfo from "@/app/(main)/[username]/components/profile-info";
import ProfileFriends from "@/app/(main)/[username]/components/profile-friends";
import ProfilePhotos from "@/app/(main)/[username]/components/profile-photos";
import { TimelinePage } from "@/app/(main)/[username]";

const TABS: Record<string, React.FC> = {
  timeline: TimelinePage,
  posts: ProfilePosts,
  about: ProfileInfo,
  friends: ProfileFriends,
  photos: ProfilePhotos,
};

export default async function ProfileTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;

  if (!tab || !TABS[tab]) return notFound();

  const TabComponent = TABS[tab];

  return (
    <div>
      <TabComponent />
    </div>
  );
}
