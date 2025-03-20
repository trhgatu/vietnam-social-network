"use client";

import { Users, UserMinus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/shared/contexts/auth-context";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useFriends } from "@/shared/hooks/friends/use-friends";
import instance from "@/api-client/axios-client";
import { Friend } from "@/shared/types/friend";

export default function FriendsPage() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const { t } = useTranslation("common");
  const { friends, loading, error, setFriends } = useFriends(username as string);

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await instance.delete(`/users/${currentUser?._id}/friends/${friendId}`);
      setFriends((prevFriends) => prevFriends.filter((f) => f._id !== friendId));
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  if (loading) return <FriendsSkeleton />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-gray-500" />
        <h1 className="text-2xl font-bold">{t("profile.friends.friendsTab")}</h1>
      </div>

      {friends.length === 0 ? (
        <NoFriendsMessage />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} onRemove={handleRemoveFriend} />
          ))}
        </div>
      )}
    </div>
  );
}

function FriendsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-md" />
      ))}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <div className="text-center text-red-500">{message}</div>;
}

function NoFriendsMessage() {
  return (
    <div className="text-center py-12">
      <Users className="w-8 h-8 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium">Chưa có bạn bè nào</h3>
      <p className="text-gray-500">Kết bạn với những người khác để xem họ ở đây</p>
    </div>
  );
}

function FriendCard({ friend, onRemove }: { friend: Friend; onRemove: (id: string) => void }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image src={friend.avatar || "/default-avatar.jpg"} alt={friend.name} width={64} height={64} className="rounded-full" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{friend.name}</h3>
          <p className="text-sm text-gray-500">@{friend.username}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onRemove(friend._id)}>
          <UserMinus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
