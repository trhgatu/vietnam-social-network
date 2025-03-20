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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Globe, Calendar } from "lucide-react";

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-[120px] space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">
                    {t("profile.about")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.bio && <p className="text-sm">{user.bio}</p>}

                  <div className="space-y-2.5 text-sm">
                    {user.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{user.location}</span>
                      </div>
                    )}

                    {user.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-500" />
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

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Tham gia từ tháng 5, 2023</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {t("profile.friends.friends")}
                    </CardTitle>
                    <a href={`/${user.username}/friends`} className="text-blue-600 text-sm hover:underline">
                      {t("general.seeAll")}
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {user.friendsCount || 0} {t("profile.friends.friends").toLowerCase()}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((id) => (
                      <a
                        key={id}
                        href={`/user${id}`}
                        className="block group"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                          <img
                            src={`https://i.pravatar.cc/150?img=${id + 10}`}
                            alt="Friend"
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-1 text-xs truncate">Người dùng {id}</p>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Photos Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {t("profile.photos")}
                    </CardTitle>
                    <a href={`/${user.username}/photos`} className="text-blue-600 text-sm hover:underline">
                      {t("general.seeAll")}
                    </a>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                      <div
                        key={id}
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800 cursor-pointer"
                      >
                        <img
                          src={`https://picsum.photos/200/200?random=${id}`}
                          alt="Photo"
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-3">
            {children}
          </div>

          {/* Mobile sidebar (shown at bottom) */}
          <div className="lg:hidden block col-span-1 mt-4 mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* About Card - Mobile */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">
                    {t("profile.about")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {user.bio && <p className="text-sm">{user.bio}</p>}

                  <div className="space-y-2 text-sm">
                    {user.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{user.location}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Friends Card - Mobile */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {t("profile.friends")}
                    </CardTitle>
                    <a href={`/${user.username}/friends`} className="text-blue-600 text-sm hover:underline">
                      {t("general.seeAll")}
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {user.friendsCount || 0} {t("profile.friends").toLowerCase()}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((id) => (
                      <a
                        key={id}
                        href={`/user${id}`}
                        className="block"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                          <img
                            src={`https://i.pravatar.cc/150?img=${id + 10}`}
                            alt="Friend"
                            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}