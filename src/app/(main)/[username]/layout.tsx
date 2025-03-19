"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchUserByUsername } from "@/api-client/user-api";
import { User } from "@/shared/types/user";
import CoverPhoto from "./components/cover-photo";
import ProfileHeader from "./components/profile-header";
import ProfileTabs from "./components/profile-tabs";
import ProfileSkeleton from "./components/profile-skeleton";
import { useTranslation } from "react-i18next";
import Image from "next/image";
export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("common");

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const fetchedUser = await fetchUserByUsername(username as string);
        setUser(fetchedUser);
        console.log(fetchedUser)
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
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-60px)] pt-[60px] bg-gray-50 dark:bg-zinc-900">
        <div className="text-xl font-medium p-6 rounded-lg shadow-md bg-white dark:bg-zinc-800">
          {t("profile.userNotFound")}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-6 sm:pb-10 bg-gray-50 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-950 shadow-sm w-full">
        <div className="w-full max-w-7xl mx-auto">
          <CoverPhoto user={user} />
          <ProfileHeader user={user} />
        </div>
        <ProfileTabs user={user} />
      </div>
      <div className="w-full max-w-7xl mx-auto mt-4 px-2 sm:px-3 md:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-[120px]">
              <div className="bg-white dark:bg-zinc-950 rounded-lg shadow p-3 sm:p-4">
                <h3 className="font-medium text-lg mb-2 sm:mb-3">Giới thiệu</h3>
                {user.bio && <p className="text-sm mb-2 sm:mb-3">{user.bio}</p>}
                <div className="space-y-2 text-sm">
                  {user.location && (
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>Sống tại {user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center">
                      <span className="mr-2">🔗</span>
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate max-w-[180px]"
                      >
                        {user.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="mr-2">🎂</span>
                    <span>Tham gia vào tháng 5, 2023</span>
                  </div>
                </div>
              </div>
              <div>


              </div>
              <div className="bg-white dark:bg-zinc-950 rounded-lg shadow p-3 sm:p-4 mt-3 sm:mt-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="font-medium text-lg">Bạn bè</h3>
                  <a href="#" className="text-blue-600 text-sm hover:underline">Xem tất cả</a>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  128 người bạn
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="aspect-square rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                      <img
                        src={`https://avatar.iran.liara.run/public/${item % 2 === 0 ? 'boy' : 'girl'}?v=${item}`}
                        alt="Friend"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-3">
            {children}
          </div>

          {/* Bottom Sidebar for Mobile - Show only on small screens */}
          <div className="lg:hidden block col-span-1 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Bio Card */}
              <div className="bg-white dark:bg-zinc-950 rounded-lg shadow p-3 sm:p-4">
                <h3 className="font-medium text-lg mb-2">Giới thiệu</h3>
                {user.bio && <p className="text-sm mb-2">{user.bio}</p>}

                <div className="space-y-2 text-sm">
                  {user.location && (
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>Sống tại {user.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Friends Card */}
              <div className="bg-white dark:bg-zinc-950 rounded-lg shadow p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-lg">Bạn bè</h3>
                  <a href="#" className="text-blue-600 text-sm hover:underline">Xem tất cả</a>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  128 người bạn
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="aspect-square rounded-lg bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                      <Image
                        width={200}
                        height={200}
                        src={`https://avatar.iran.liara.run/public/${item % 2 === 0 ? 'boy' : 'girl'}?v=${item}`}
                        alt="Friend"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}