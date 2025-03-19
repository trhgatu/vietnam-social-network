"use client";

import { User } from "@/shared/types/user";
import Image from "next/image";


interface CoverPhotoProps {
  user: User | null;
}

export default function CoverPhoto({ user }: CoverPhotoProps) {
  if (!user) return null;

  return (
    <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-b-3xl shadow-lg">
      {user.coverPhoto ? (
        <Image
          src={user.coverPhoto}
          alt={`Ảnh bìa của ${user.name}`}
          fill
          priority
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  );
}
