'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, MessageSquare } from 'lucide-react';
import { ModeToggle } from '@/components/toggle-theme';

const messages = [
  { id: 1, name: 'Alice Johnson', message: "Hey! How's it going?", avatar: 'https://avatar.iran.liara.run/public/girl' },
  { id: 2, name: 'Bob Williams', message: 'Are you free this weekend?', avatar: 'https://avatar.iran.liara.run/public/boy' },
  { id: 3, name: 'Charlie Smith', message: "Let's catch up soon!", avatar: 'https://avatar.iran.liara.run/public/boy' },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-[60px] border-b bg-white dark:bg-black z-50 flex items-center px-4 md:px-6">
      <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo/logo.svg" alt="Logo" width={40} height={40} className="cursor-pointer hover:opacity-80 transition-opacity" priority />
          <span className="hidden sm:block text-xl font-bold">Vietnam Social.</span>
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
            <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 mr-4 md:mr-10">
              <DropdownMenuLabel>Tin nhắn</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-60 overflow-y-auto">
                {messages.map((msg) => (
                  <DropdownMenuItem key={msg.id} className="flex items-center space-x-3 p-2">
                    <Image src={msg.avatar} alt={msg.name} width={40} height={40} className="rounded-full" priority />
                    <div className="flex flex-col">
                      <span className="font-medium">{msg.name}</span>
                      <span className="text-sm text-gray-500">{msg.message}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center">
                <Link href="/messages">Xem tất cả</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
