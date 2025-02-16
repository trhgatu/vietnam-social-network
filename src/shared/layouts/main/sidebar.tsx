'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from 'next/navigation';
export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="p-4">
            <div className='flex justify-center'>
                <Link href="/">
                    <Image src="/assets/logo/logo.svg" alt="Logo"
                        width={40} height={40}
                        className="cursor-pointer"
                        priority
                    />
                </Link>
            </div>
            <div className='mt-6'>
                <Link href='/home' className={`flex items-center gap-3 p-2 rounded ${pathname === "/home" ? "bg-gray-300" : "hover:bg-gray-200"
                    }`}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className='cursor-pointer'>
                                <div className='flex items-center '>
                                    <Home className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                    <span className='ml-2'>Trang chủ</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Trang chủ</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Link>
                <Link href='/friends' className={`flex items-center gap-3 p-2 rounded ${pathname === "/friends" ? "bg-gray-300" : "hover:bg-gray-200"}`}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className='cursor-pointer'>
                                <div className='flex items-center '>
                                    <Home className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                    <span className='ml-2'>Bạn bè</span>
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
    );
};
