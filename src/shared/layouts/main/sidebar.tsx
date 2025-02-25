'use client'

import Link from 'next/link';
import { Home, Users, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/shared/contexts/auth-context';

interface SidebarProps {
  className?: string
}
export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className={`${className} fixed top-[60px] left-0 h-[calc(100vh-64px)] border-r border-r-[#D9D9D9] dark:border-r-[#333333] overflow-y-auto`}>
      <div className='p-6'>
        <div className="mt-6 space-y-6">
          <Link
            href="/home"
            className={`hover:transition-all duration-200 mb-1 flex items-center gap-3 p-3 rounded-md ${pathname === "/home" ? "bg-neutral-200 dark:bg-neutral-700" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='cursor-pointer'>
                  <div className="flex items-center">
                    <Home className="h-6 w-6" />
                    <span className="ml-2">Trang chủ</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Trang chủ</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
          <Link
            href="/friends"
            className={`hover:transition-all duration-200 mb-1 flex items-center gap-3 p-3 rounded-md ${pathname === "/friends" ? "bg-neutral-200 dark:bg-neutral-700" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='cursor-pointer'>
                  <div className="flex items-center">
                    <Users className="h-6 w-6" />
                    <span className="ml-2">Bạn bè</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bạn bè</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
          <Link
            href="/profile"
            className={`hover:transition-all duration-200 mb-1 flex items-center gap-3 p-3 rounded-md ${pathname === "/profile" ? "bg-neutral-200 dark:bg-neutral-700" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='cursor-pointer'>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt="User Avatar" />
                      <AvatarFallback>{user?.name}</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 font-medium">{user?.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Xem Profile của bạn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
          <div className="p-6">
            <Button
              onClick={logout}
              className="w-full flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
            >
              <LogOut className="h-5 w-5" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
