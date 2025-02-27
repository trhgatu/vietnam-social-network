'use client'
import { User } from "@/shared/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileTabsProps {
  user: User | null;
}

export default function ProfileTabs({ user }: ProfileTabsProps) {
  const pathname = usePathname();

  const TABS = [
    { label: "Dòng thời gian", href: `/${user?.username}/timeline` },
    { label: "Bài viết", href: `/${user?.username}/posts` },
    { label: "Giới thiệu", href: `/${user?.username}/about` },
    { label: "Bạn bè", href: `/${user?.username}/friends` },
    { label: "Ảnh", href: `/${user?.username}/photos` },
  ];

  return (
    <div className="flex gap-4 border-b mt-6">
      {TABS.map(({ label, href }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 relative ${isActive ? "border-b-2 border-red-500 font-semibold" : "hover:text-red-500"
              }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
