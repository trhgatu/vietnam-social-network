"use client";

import { User } from "@/shared/types/user";
import { SlUser } from "react-icons/sl";
import Image from "next/image";

interface ProfileHeaderProps {
  user: User | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  if (!user) return null;

  return (
    <div className="px-4 py-6 flex flex-col md:flex-row items-center md:items-end gap-6 max-w-4xl mx-auto relative">
      <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow -mt-20 md:-mt-16 bg-white">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={`Ảnh đại diện của ${user.name}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <SlUser className="text-5xl text-gray-500" />
          </div>
        )}
      </div>
      <div className="text-center md:text-left flex-1">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        {user.nickname && (
          <h2 className="text-xl text-gray-600">({user.nickname})</h2>
        )}
        <p className="text-gray-500 text-sm mt-1">@{user.username}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200">
          Kết bạn
        </button>
      </div>
    </div>
  );
}