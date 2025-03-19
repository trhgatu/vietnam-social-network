"use client";

import Image from "next/image";
import { User } from "@/shared/types/user";
import { MessageCircle, UserPlus, Edit3, MoreHorizontal, Users, Grid, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/shared/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileHeaderProps {
  user: User | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { t } = useTranslation("common");
  const { user: currentUser } = useAuth();

  if (!user) return null;

  // Check if this is the current user's profile
  const isOwnProfile = currentUser?.id === user.id;

  // Format profile data for display
  const followerCount = 1243;
  const followingCount = 567;
  const postCount = 36;

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 pb-2 sm:pb-4 relative">
      {/* Profile Avatar - Positioned to overlap with cover photo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 md:left-6 lg:left-8 md:translate-x-0 -top-16 sm:-top-20 md:-top-24 lg:-top-28">
        <div className="relative rounded-full overflow-hidden border-4 border-white dark:border-zinc-950 shadow-md">
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={`${user.name} profile`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-800">
                <span className="text-3xl sm:text-4xl font-bold text-gray-400 dark:text-zinc-500">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Edit profile picture button - Only for own profile */}
          {isOwnProfile && (
            <button
              className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-gray-800 bg-opacity-70 p-1 sm:p-1.5 rounded-full text-white hover:bg-opacity-90 transition-all"
              aria-label="Update profile picture"
            >
              <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Profile Info & Actions - Add top margin to position below avatar */}
      <div className="mt-14 sm:mt-18 md:mt-4 md:ml-44 lg:ml-52">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
          {/* Profile Name & Basic Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
              {user.role === "admin" && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  Admin
                </span>
              )}
            </div>

            {user.nickname && (
              <h2 className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">({user.nickname})</h2>
            )}

            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">@{user.username}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center md:justify-end gap-1.5 sm:gap-2 mt-2 md:mt-0">
            {!isOwnProfile ? (
              <>
                <Button className="h-8 sm:h-9 text-xs sm:text-sm rounded-lg px-2 sm:px-4 gap-1 sm:gap-1.5">
                  <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{t("profile.addFriend")}</span>
                </Button>
                <Button variant="outline" className="h-8 sm:h-9 text-xs sm:text-sm rounded-lg px-2 sm:px-4 gap-1 sm:gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{t("profile.message")}</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg">
                      <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">Block</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Report</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">Copy Profile URL</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant="outline" className="h-8 sm:h-9 text-xs sm:text-sm rounded-lg px-3 sm:px-4 gap-1 sm:gap-1.5">
                <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Edit Profile</span>
              </Button>
            )}
          </div>
        </div>

        {/* Profile Stats */}
        <div className="mt-2 sm:mt-4 flex gap-4 sm:gap-6 text-xs sm:text-sm justify-center md:justify-start flex-wrap">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
            <span className="font-bold">{postCount}</span> {t('profile.posts')}
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
            <span className="font-bold">{followerCount}</span> {t('profile.followers')}
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="font-bold">{followingCount}</span> {t('profile.following')}
          </div>
        </div>

        {/* Bio & Additional Info */}
        {(user.bio || user.location || user.website) && (
          <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-center md:text-left max-w-2xl text-xs sm:text-sm">
            {user.bio && (
              <p>{user.bio}</p>
            )}

            <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 text-gray-600 dark:text-gray-400 justify-center md:justify-start">
              {user.location && (
                <div className="flex items-center gap-1">
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center gap-1 truncate max-w-[150px] sm:max-w-[200px]"
                >
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                <span>Joined 2023</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}