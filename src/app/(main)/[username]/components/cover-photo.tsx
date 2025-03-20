"use client";

import { User } from "@/shared/types/user";
import { Edit2 } from "lucide-react";
import { useAuth } from "@/shared/contexts/auth-context";

interface CoverPhotoProps {
  user: User | null;
}

export default function CoverPhoto({ user }: CoverPhotoProps) {
  const { user: currentUser } = useAuth();

  if (!user) return null;

  // Check if this is the current user's profile
  const isOwnProfile = currentUser?._id === user._id;

  return (
    <div className="relative group">
      <div className="w-full h-[170px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] overflow-hidden bg-gradient-to-r from-gray-300 to-gray-200 dark:from-zinc-800 dark:to-zinc-700">
        {user?.coverPhoto ? (
          <img
            src={user.coverPhoto}
            alt={`${user.name}'s cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-zinc-500">
            <span className="text-sm sm:text-base">No cover photo</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {isOwnProfile && (
        <button
          className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 bg-gray-800 bg-opacity-70 text-white p-1.5 sm:p-2 rounded-full z-10
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          sm:hover:bg-opacity-90"
          aria-label="Update cover photo"
        >
          <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      )}
    </div>
  );
}
