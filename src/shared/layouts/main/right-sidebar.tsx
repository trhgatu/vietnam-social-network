'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  description: string;
}

interface RightSidebarProps {
  className?: string;
}

const friends: Friend[] = [
  { id: 1, name: 'John Doe', avatar: 'https://avatar.iran.liara.run/public/boy', description: 'Bạn có thể kết bạn với John' },
  { id: 2, name: 'Jane Doe', avatar: 'https://avatar.iran.liara.run/public/girl', description: 'Bạn có thể kết bạn với Jane' },
  { id: 3, name: 'John Doe', avatar: 'https://avatar.iran.liara.run/public/boy', description: 'Bạn có thể kết bạn với John' },
  { id: 4, name: 'John Doe', avatar: 'https://avatar.iran.liara.run/public/boy', description: 'Bạn có thể kết bạn với John' },
  { id: 5, name: 'John Doe', avatar: 'https://avatar.iran.liara.run/public/boy', description: 'Bạn có thể kết bạn với John' },
];

export function RightSidebar({ className }: RightSidebarProps) {
  return (
    <div className={`${className} fixed top-[60px] right-0 border-l dark:border-l-[#333333] border-l-[#D9D9D9] h-[calc(100vh-64px)] overflow-y-auto`}>
      <div className="py-6 px-4">
        <h2 className="font-semibold text-lg mb-4">Bạn bè</h2>
        <div className="space-y-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={friend.avatar}>
                </AvatarImage>
                <AvatarFallback>{friend.name}</AvatarFallback>
              </Avatar>
              <div>
                <span className="font-medium">{friend.name}</span>
                <p className="text-sm text-gray-500">{friend.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
