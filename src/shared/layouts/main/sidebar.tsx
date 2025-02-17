'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Home, User } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from 'next/navigation';

interface SidebarProps{
  className?:string
}
export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={`${className} w-1/5 fixed top-[60px] left-0 h-[calc(100vh-64px)] border-r border-r-[#D9D9D9] dark:border-r-[#333333] overflow-y-auto`}>
      <div className='p-6'>
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/assets/logo/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="cursor-pointer"
              priority
            />
          </Link>
        </div>
        <div className="mt-6 space-y-6">
          <Link
            href="/home"
            className={`hover:transition-all duration-200 mb-1 flex items-center gap-3 p-3 rounded-md ${pathname === "/home" ? "bg-gray-300" : "hover:bg-gray-200"}`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='cursor-pointer'>
                  <div className="flex items-center">
                    <Home className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    <span className="ml-2">Trang chủ</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Trang chủ</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>

          {/* Friends Link */}
          <Link
            href="/friends"
            className={`flex items-center gap-3 p-3 rounded-md ${pathname === "/friends" ? "bg-gray-300" : "hover:bg-gray-200"}`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='cursor-pointer'>
                  <div className="flex items-center">
                    <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    <span className="ml-2">Bạn bè</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bạn bè</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
      </div>
    </div>
  );
}
