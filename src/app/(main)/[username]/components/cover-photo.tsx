import { User } from "@/shared/types/user";
import Image from "next/image";

interface CoverPhotoProps {
  user: User | null;
}

export default function CoverPhoto({ user }: CoverPhotoProps) {
  return (
    <div className="relative w-full h-64 bg-gray-300">
      {user?.coverPhoto && (
        <Image
          src={user.coverPhoto}
          alt="Cover"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      )}
    </div>
  );
}
