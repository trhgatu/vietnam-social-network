'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Bài viết", href: "/profile/posts" },
  { label: "Giới thiệu", href: "/profile/about" },
  { label: "Bạn bè", href: "/profile/friends" },
  { label: "Ảnh", href: "/profile/photos" },
];

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4 border-b pb-2 mt-6">
      {TABS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`px-4 py-2 rounded-md ${
            pathname === href ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
