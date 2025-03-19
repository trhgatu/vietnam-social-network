'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ModeToggle } from '@/components/toggle-theme';
import { LanguageSwitcher } from '@/components/toggle-translate';
import { Search, Bell, MessageSquare, Menu, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAuth } from '@/shared/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { removeToken } from '@/shared/utils/jwt-helper';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const { t } = useTranslation('common');
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    router.push('/sign-in');
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-[60px] border-b bg-white dark:bg-zinc-950 z-50 flex items-center px-3 md:px-6 shadow-sm">
      <div className="flex w-full justify-between items-center max-w-7xl mx-auto gap-2">
        {/* Left side - Logo and mobile menu toggle */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo/logo.svg"
              alt="Logo"
              width={36}
              height={36}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              priority
            />
            <span className="hidden sm:block text-lg font-bold">Vietnam Social</span>
          </Link>
        </div>

        {/* Middle - Search bar */}
        <div className="hidden md:flex relative flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder={t('general.search')}
              className="pl-10 pr-4 h-10 bg-gray-100 dark:bg-zinc-800 border-none focus-visible:ring-blue-500 w-full"
            />
          </div>
        </div>

        {/* Right side - Icons and user profile */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Mobile search button */}
          <Button className="md:hidden" size="icon" variant="ghost">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notification icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 flex h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>{t('notifications')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[400px] overflow-auto py-1">
                <div className="text-center text-sm text-gray-500 py-4">
                  {t('general.loading')}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Messages icon */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/messages">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-0 right-0 flex h-2 w-2 rounded-full bg-red-500"></span>
            </Link>
          </Button>

          <LanguageSwitcher />
          <ModeToggle />

          {/* User menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-zinc-800">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href={`/${user.username}`} className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-gray-500">@{user.username}</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/${user.username}`}>{t('profile.about')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">{t('auth.settings')}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  {t('auth.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" asChild>
                <Link href="/sign-in">{t('auth.login')}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">{t('auth.register')}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
