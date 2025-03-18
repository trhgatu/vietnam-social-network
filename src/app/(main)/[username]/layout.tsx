"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchUserByUsername } from "@/api-client/user-api";
import { User } from "@/shared/types/user";
import CoverPhoto from "./components/cover-photo";
import ProfileHeader from "./components/profile-header";
import ProfileTabs from "./components/profile-tabs";
import LoadingPage from "@/shared/components/loading-page/loading-page";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const fetchedUser = await fetchUserByUsername(username as string);
      setUser(fetchedUser);
      setLoading(false);
    };

    if (username) getUserData();
  }, [username]);

  if (loading) return <LoadingPage />;
  if (!user) return <p className="text-center text-gray-500 mt-6">User not found</p>;

  return (
    <div>
      <CoverPhoto user={user} />
      <ProfileHeader user={user} />
      <ProfileTabs user={user} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
