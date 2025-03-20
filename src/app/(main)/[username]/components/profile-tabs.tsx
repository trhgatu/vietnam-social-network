"use client";

import { usePathname, useRouter } from "next/navigation";
import { User } from "@/shared/types/user";
import { Grid, Bookmark, Users, Star, Music4, Images } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProfileTabsProps {
  user: User;
}

export default function ProfileTabs({ user }: ProfileTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("common");

  // Get the base path for user profile (e.g., /username)
  const basePath = `/${user.username}`;

  // Define tabs
  const tabs = [
    {
      name: t('profile.tabs.timeline'),
      path: `${basePath}/timeline`,
      icon: <Grid className="w-4 h-4 md:mr-1.5" />
    },
    {
      name: t('profile.tabs.about'),
      path: `${basePath}/about`,
      icon: <Star className="w-4 h-4 md:mr-1.5" />
    },
    {
      name: t('profile.tabs.friends'),
      path: `${basePath}/friends`,
      icon: <Users className="w-4 h-4 md:mr-1.5" />
    },
    {
      name: t('profile.tabs.photos'),
      path: `${basePath}/photos`,
      icon: <Images className="w-4 h-4 md:mr-1.5" />

    },
    {
      name: t('profile.tabs.saved'),
      path: `${basePath}/saved`,
      icon: <Bookmark className="w-4 h-4 md:mr-1.5" />
    },
    {
      name: t('profile.tabs.music'),
      path: `${basePath}/music`,
      icon: <Music4 className="w-4 h-4 md:mr-1.5" />
    },
  ];

  return (
    <div className="sticky top-[60px] bg-white dark:bg-zinc-950 z-10 border-t border-b border-gray-200 dark:border-zinc-800 px-1 sm:px-2 md:px-0 w-full">
      <div className="max-w-4xl mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path ||
              (tab.path === `${basePath}/timeline` && pathname === basePath);

            return (
              <button
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className={`
                  flex items-center justify-center md:justify-start py-3 px-2.5 sm:px-3 md:px-4 relative text-sm border-b-2 transition-colors duration-150
                  ${isActive
                    ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 font-medium'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }
                `}
              >
                <div className="flex items-center">
                  {tab.icon}
                  <span className="hidden md:inline">{tab.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}