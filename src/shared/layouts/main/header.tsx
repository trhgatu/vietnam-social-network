import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link'

import { Bell, MessageSquare } from "lucide-react";
import { ModeToggle } from "@/components/toggle-theme";

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
  return (
    <header className="h-[60px] fixed top-0 left-0 right-0 w-full border-b border-b-[#D9D9D9] dark:border-b-[#333333] dark:bg-black bg-white z-50 flex items-center">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex justify-center">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/assets/logo/logo.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  priority
                />
                <span className="ml-2 text-xl font-bold">Vietnam Social.</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full">
            <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <DropdownMenu modal={false}>
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
                    <Image src={msg.avatar}
                      alt={msg.name}
                      width={40} height={40}
                      className="rounded-full"
                      priority
                    />
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
        </div>
      </div>
    </header>
  );
}
