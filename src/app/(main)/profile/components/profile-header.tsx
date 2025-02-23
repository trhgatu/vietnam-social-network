import { User } from "@/shared/types/user";
import { SlUser } from "react-icons/sl";
import Image from "next/image";

interface ProfileHeaderProps {
  user: User | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center px-4 sm:px-6 relative -mt-16 sm:-mt-20 text-center sm:text-left">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white flex items-center justify-center bg-gray-200">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="Avatar"
            width={128}
            height={128}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <SlUser className="text-gray-500 text-6xl sm:text-8xl" />
          </div>
        )}
      </div>

      <div className="mt-4 sm:mt-18 sm:ml-4">
        <h1 className="text-xl sm:text-2xl font-bold">{user?.name} <span>({user?.nickname})</span></h1>
        <p className="text-gray-500 text-sm sm:text-base">Lập trình viên & Nhà sáng tạo nội dung</p>
      </div>
    </div>
  );
}
