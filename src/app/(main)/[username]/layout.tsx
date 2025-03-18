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
      try {
        setLoading(true);
        const fetchedUser = await fetchUserByUsername(username as string);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      getUserData();
    }
  }, [username]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-medium rounded-lg shadow">
          Không tìm thấy người dùng
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen pb-8">
      <CoverPhoto user={user} />
      <ProfileHeader user={user} />
      <ProfileTabs user={user} />
      <div className="max-w-4xl mx-auto px-4 py-4">
        {children}
      </div>
    </div>
  );
}