import { useState, useEffect } from "react";
import instance from "@/api-client/axios-client";
import { Friend } from "@/shared/types/friend";

export function useFriends(username: string) {
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

  return { friends, loading, error, setFriends };
}
