"use client";

import { useAuth } from "@/shared/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Users,
  Bell,
  MessageSquare,
  Bookmark,
  Settings,
  Moon,
  Sun,
  LogOut,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('common');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const isDarkMode = theme === "dark";

  const navItems = [
    {
      icon: Home,
      label: t('nav.home'),
      path: "/home",
      showMobile: true,
    },
    {
      icon: Users,
      label: t('nav.friends'),
      path: "/friends",
      notification: 5,
      showMobile: true,
    },
    {
      icon: Bell,
      label: t('nav.notifications'),
      path: "/notifications",
      notification: 3,
      showMobile: true,
    },
    {
      icon: MessageSquare,
      label: t('nav.messages'),
      path: "/messages",
      notification: 2,
      showMobile: true,
    },
    {
      icon: Bookmark,
      label: t('nav.saved'),
      path: "/saved",
      showMobile: false,
    },
    {
      icon: Settings,
      label: t('nav.settings'),
      path: "/settings",
      showMobile: false,
    },
  ];

  return (
    <div className="fixed top-[60px] md:top-[60px] w-full h-16 md:h-[calc(100vh-60px)] md:w-[70px] lg:w-[240px] bg-white dark:bg-zinc-950 border-t md:border-t-0 md:border-r border-gray-200 dark:border-zinc-800 z-30">
      <div className="flex md:flex-col h-full">
        <div className="hidden md:flex flex-col p-3 lg:p-4 lg:pb-2">
          <Link
            href={user ? `/${user.username}` : "/sign-in"}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
          >
            {user ? (
              <>
                <Avatar className="h-8 w-8 border border-gray-200 dark:border-zinc-700">
                  <AvatarImage src={user.avatar || undefined} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block overflow-hidden">
                  <p className="font-medium text-sm truncate max-w-[150px]">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">@{user.username}</p>
                </div>
              </>
            ) : (
              <>
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-800">
                  <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div className="hidden lg:block">
                  <p className="font-medium text-sm">{t('nav.signIn')}</p>
                </div>
              </>
            )}
          </Link>
          <Separator className="hidden lg:block my-2" />
        </div>

        <div className="flex md:flex-col justify-around md:justify-start md:flex-1 md:overflow-y-auto w-full">
          <nav className="flex md:flex-col justify-around w-full">
            {navItems.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(item.path);
              if (isMobile && !item.showMobile) {
                return null;
              }

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    relative flex flex-col md:flex-row items-center justify-center md:justify-start
                    py-2 md:py-3 px-3 md:px-3 lg:px-4 gap-1 md:gap-3
                    text-xs md:text-sm font-medium
                    transition-colors
                    ${isActive
                      ? 'text-red-600 dark:text-red-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900'
                    }
                    ${isActive && 'md:bg-gray-100 md:dark:bg-zinc-900'}
                    md:rounded-lg
                  `}
                >
                  <div className="relative">
                    <item.icon className="h-6 w-6 md:h-5 md:w-5" />
                    {item.notification && (
                      <div
                        className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 text-white rounded-full p-0 flex items-center justify-center text-[10px] font-bold"
                      >
                        {item.notification}
                      </div>
                    )}
                  </div>
                  <span className="md:hidden hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}

            {/* Theme toggle - Desktop only */}
            <button
              className="hidden md:flex items-center justify-center lg:justify-start py-3 px-3 lg:px-4 gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors rounded-lg md:mt-1"
              onClick={() => setTheme(isDarkMode ? "light" : "dark")}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="hidden lg:inline">{isDarkMode ? t('nav.lightMode') : t('nav.darkMode')}</span>
            </button>

            {/* Logout Button - Desktop only */}
            {user && (
              <button
                className="hidden md:flex items-center justify-center lg:justify-start py-3 px-3 lg:px-4 gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors rounded-lg"
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden lg:inline">{t('nav.logout')}</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}