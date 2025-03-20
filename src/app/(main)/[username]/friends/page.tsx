"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Users, UserMinus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/shared/contexts/auth-context";
import instance from "@/api-client/axios-client";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { Friend } from "@/shared/types/friend";

export default function FriendsPage() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const { t } = useTranslation("common");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(`/friends/${username}`);
        setFriends(data.data || []);
      } catch (err) {
        setError("Không thể tải danh sách bạn bè");
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [username]);

  /* const handleAddFriend = async (friendId: string) => {
    try {
      await instance.post(`/users/${currentUser?._id}/friends`, {
        friendId,
      });
      // Refresh friends list
      const response = await instance.get(`/friends`);
      setFriends(response.data.friends);
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  }; */

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await instance.delete(`/users/${currentUser?._id}/friends/${friendId}`);
      const response = await instance.get(`/friends`);
      setFriends(response.data.friends);
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-6 h-6 text-gray-500" />
          <h1 className="text-2xl font-bold">{t("profile.friends.friendsTab")}</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-zinc-800">
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-gray-500" />
          <h1 className="text-2xl font-bold">{t("profile.friends.friendsTab")}</h1>
        </div>
        {/* <div className="text-sm text-gray-500">
          {friends.length} {friends.length === 1 ? "bạn bè" : "bạn bè"}
        </div> */}
      </div>

      {friends.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Chưa có bạn bè nào
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Kết bạn với những người khác để xem họ ở đây
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends?.map((friend) => (
            <div
              key={friend._id}
              className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-zinc-800 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    {friend.avatar ? (
                      <Image
                        src={friend.avatar}
                        alt={friend.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-400 dark:text-zinc-500">
                          {friend.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  {friend.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {friend.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    @{friend.username}
                  </p>
                </div>
                {currentUser?._id !== friend._id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleRemoveFriend(friend._id)}
                  >
                    <UserMinus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}