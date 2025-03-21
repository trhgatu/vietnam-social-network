'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ModeToggle } from '@/components/toggle-theme';
import { LanguageSwitcher } from '@/components/toggle-translate';
import { Search, Bell, MessageSquare, ChevronDown, Home, Users2, User, MoreHorizontal, PanelLeft } from 'lucide-react';
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
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { logoutUser } from '@/shared/services/auth-services';

export function Header() {
  const { t } = useTranslation('common');
  const { user, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setUser(null)
    router.push('/sign-in');
  };

  const mobileNavItems = [
    { icon: <Home className="h-6 w-6" />, label: t('navigation.home'), href: '/', active: pathname === '/' },
    { icon: <Users2 className="h-6 w-6" />, label: t('navigation.friends'), href: '/friends', active: pathname === '/friends' },
    { icon: <MessageSquare className="h-6 w-6" />, label: t('navigation.messages'), href: '/messages', active: pathname === '/messages' },
    { icon: <Bell className="h-6 w-6" />, label: t('navigation.notifications'), href: '#', isDropdown: true,
      hasNotification: true, notification: 3 },
    { icon: <PanelLeft className="h-6 w-6" />, label: t('navigation.menu'), href: '#', isSheet: true }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full h-[60px] border-b bg-white dark:bg-zinc-950 z-50 flex items-center px-3 md:px-6 shadow-sm">
        <div className="flex w-full justify-between items-center max-w-7xl mx-auto gap-2">
          {/* Left side - Logo and search */}
          <div className="flex items-center gap-2">
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

            {/* Desktop search bar */}
            <div className="hidden md:flex relative flex-1 ml-4">
              <div className="relative w-full max-w-xs">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t('general.search')}
                  className="pl-10 pr-4 h-10 bg-gray-100 dark:bg-zinc-800 border-none focus-visible:ring-blue-500 w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile search button */}
            <Button
              className="md:hidden"
              size="icon"
              variant="ghost"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme and language toggles - desktop only */}
            <div className="hidden md:flex items-center gap-1">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
            {user ? (
              <DropdownMenu modal>
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

      {/* Mobile bottom navigation - like Facebook */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-zinc-950 border-t dark:border-zinc-800 h-14 z-50">
          <div className="grid grid-cols-5 h-full">
            {mobileNavItems.map((item, index) => (
              <div key={index} className="flex justify-center">
                {item.isDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-full w-full relative flex flex-col items-center justify-center rounded-none">
                        {item.icon}
                        {item.hasNotification && (
                          <Badge className="absolute top-1 right-6 h-5 w-5 p-0 flex items-center justify-center bg-red-500">{item.notification}</Badge>
                        )}
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
                ) : item.isSheet ? (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" className="h-full w-full flex flex-col items-center justify-center rounded-none">
                        {item.icon}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                      </SheetHeader>
                      <div className="py-4">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-gray-500">@{user.username}</p>
                            </div>
                          </div>

                          <Link href={`/${user.username}`} className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md">
                            <User className="h-5 w-5 text-gray-500" />
                            <span>{t('profile.about')}</span>
                          </Link>

                          <Link href="/settings" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md">
                            <MoreHorizontal className="h-5 w-5 text-gray-500" />
                            <span>{t('auth.settings')}</span>
                          </Link>

                          <div className="flex justify-between p-2">
                            <LanguageSwitcher />
                            <ModeToggle />
                          </div>

                          <Button variant="outline" className="w-full" onClick={handleLogout}>
                            {t('auth.logout')}
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                ) : (
                  <Button
                    variant="ghost"
                    className={`h-full w-full flex flex-col items-center justify-center rounded-none ${item.active ? 'text-primary' : ''}`}
                    asChild
                  >
                    <Link href={item.href}>
                      {item.icon}
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white dark:bg-zinc-950 z-[60] p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
              <ChevronDown className="h-5 w-5 -rotate-90" />
            </Button>
            <div className="flex-1 ml-2">
              <div className="relative w-full">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t('general.search')}
                  className="pl-10 pr-4 h-10 bg-gray-100 dark:bg-zinc-800 border-none focus-visible:ring-blue-500 w-full"
                  autoFocus
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">{t('general.recent_searches')}</h3>
            <div className="mt-2 space-y-2">
              <div className="text-center text-sm text-gray-500 py-4">
                {t('general.no_recent_searches')}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
