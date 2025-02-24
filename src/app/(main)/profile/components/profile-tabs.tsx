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
    <div className="flex gap-4 border-b mt-6">
      {TABS.map(({ label, href }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 relative ${
              isActive ? "border-b-2 border-red-500 font-semibold" : "hover:text-red-500"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
