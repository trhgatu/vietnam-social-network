"use client";

import { User } from "@/shared/types/user";
import Image from "next/image";

interface CoverPhotoProps {
  user: User | null;
}

export default function CoverPhoto({ user }: CoverPhotoProps) {
  if (!user) return null;

  return (
    <div className="relative h-60 md:h-80 w-full overflow-hidden">
      {user.coverPhoto ? (
        <Image
          src={user.coverPhoto}
          alt={`Ảnh bìa của ${user.name}`}
          fill
          priority
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
      )}
    </div>
  );
}