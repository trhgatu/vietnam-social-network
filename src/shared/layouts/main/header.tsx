'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import { Search, Home, Users, Bell, MessageSquare, User } from "lucide-react";

const messages = [
  {
    id: 1,
    name: "Alice Johnson",
    message: "Hey! How's it going?",
    avatar: "https://avatar.iran.liara.run/public/girl",
  },
  {
    id: 2,
    name: "Bob Williams",
    message: "Are you free this weekend?",
    avatar: "https://avatar.iran.liara.run/public/boy",
  },
  {
    id: 3,
    name: "Charlie Smith",
    message: "Let's catch up soon!",
    avatar: "https://avatar.iran.liara.run/public/boy",
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="pt-2 shadow-sm dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Image src="/assets/logo/logo.svg" alt="Logo" width={40} height={40} className="cursor-pointer" />
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-hidden pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Middle Section - Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`p-4 px-10 rounded ${pathname === "/home" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                      }`}
                  >
                    <Home className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Trang chủ</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
          <Link href="/friends">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`p-4 px-10 rounded ${pathname === "/friends" ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                      }`}
                  >
                    <Users className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bạn bè</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </nav>

        {/* Right Section - Icons & User */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full">
            <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full">
                <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 mr-10">
              <DropdownMenuLabel>Tin nhắn</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-60 overflow-y-auto">
                {messages.map((msg) => (
                  <DropdownMenuItem key={msg.id} className="flex items-center space-x-3 p-2">
                    <Image src={msg.avatar} alt={msg.name} width={40} height={40} className="rounded-full" />
                    <div className="flex flex-col">
                      <span className="font-medium">{msg.name}</span>
                      <span className="text-sm text-gray-500">{msg.message}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center">
                Xem tất cả
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full">
            <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
