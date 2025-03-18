"use client";

import { User } from "@/shared/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileTabsProps {
  user: User | null;
}

export default function ProfileTabs({ user }: ProfileTabsProps) {
  const pathname = usePathname();

  if (!user) return null;

  const TABS = [
    { label: "Dòng thời gian", href: `/${user.username}/timeline` },
    { label: "Bài viết", href: `/${user.username}/posts` },
    { label: "Giới thiệu", href: `/${user.username}/about` },
    { label: "Bạn bè", href: `/${user.username}/friends` },
    { label: "Ảnh", href: `/${user.username}/photos` },
  ];

  return (
    <nav className="flex overflow-x-auto border-b border-gray-300 sticky top-0 bg-white z-10 max-w-4xl mx-auto">
      {TABS.map(({ label, href }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`
              px-4 py-3 whitespace-nowrap transition-colors duration-200
              ${isActive
                ? 'border-b-2 border-blue-500 font-medium text-blue-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}