// RightSidebar.tsx
'use client'

import Image from 'next/image';
interface RightSidebarProps {
  className?: string
}
export function RightSidebar({ className }: RightSidebarProps) {
  return (
    <div className={`${className} w-1/5 fixed top-[64px] right-0 h-[calc(100vh-64px)] shadow-md overflow-y-auto`}>
      <div className="py-6 px-4">
        <h2 className="font-semibold text-lg mb-4">Đề xuất kết bạn</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Image
              src="https://avatar.iran.liara.run/public/boy"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <span className="font-medium">John Doe</span>
              <p className="text-sm text-gray-500">Bạn có thể kết bạn với John</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Image
              src="https://avatar.iran.liara.run/public/girl"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <span className="font-medium">Jane Doe</span>
              <p className="text-sm text-gray-500">Bạn có thể kết bạn với Jane</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
