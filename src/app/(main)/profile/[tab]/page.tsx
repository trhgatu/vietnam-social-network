import { notFound } from "next/navigation";
import ProfilePosts from "@/app/(main)/profile/components/profile-posts";
import ProfileInfo from "@/app/(main)/profile/components/profile-info";
import ProfileFriends from "@/app/(main)/profile/components/profile-friends";
import ProfilePhotos from "@/app/(main)/profile/components/profile-photos";

const TABS: Record<string, React.FC> = {
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
