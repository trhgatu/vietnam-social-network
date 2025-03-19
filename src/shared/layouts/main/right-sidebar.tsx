'use client'

import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Calendar, Gift, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function RightSidebar() {
  const { t } = useTranslation('common');

  // Mock data for suggested friends
  const suggestedFriends = [
    {
      id: '1',
      name: 'Nguyen Van A',
      username: 'nguyenvana',
      avatar: "https://avatar.iran.liara.run/public/boy",
      mutualFriends: 5
    },
    {
      id: '2',
      name: 'Tran Thi B',
      username: 'tranthib',
      avatar: "https://avatar.iran.liara.run/public/girl",
      mutualFriends: 2
    },
    {
      id: '3',
      name: 'Le Van C',
      username: 'levanc',
      avatar: "https://avatar.iran.liara.run/public/boy?v=2",
      mutualFriends: 1
    }
  ];

  // Mock data for upcoming birthdays
  const upcomingBirthdays = [
    {
      id: '1',
      name: 'Pham Thi D',
      username: 'phamthid',
      avatar: "https://avatar.iran.liara.run/public/girl?v=2",
      date: 'Today'
    },
    {
      id: '2',
      name: 'Hoang Van E',
      username: 'hoangvane',
      avatar: "https://avatar.iran.liara.run/public/boy?v=3",
      date: 'Tomorrow'
    }
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: '1',
      title: 'Tech Meetup Hanoi',
      date: 'May 15, 2024',
      attendees: 24
    },
    {
      id: '2',
      title: 'Vietnam JS Conference',
      date: 'June 10, 2024',
      attendees: 120
    }
  ];

  return (
    <div className="py-4 px-4 overflow-auto h-full flex flex-col gap-6">
      {/* Friend Requests Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">{t('friendRequests')}</h3>
          </div>
          <span className="text-xs font-medium bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded-full">3</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('pendingFriendRequests')}</p>
        <Button size="sm" className="w-full mt-2 text-sm">{t('viewAll')}</Button>
      </div>

      {/* Friend Suggestions Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">{t('peopleMightKnow')}</h3>
          <Button variant="link" size="sm" className="text-xs font-medium p-0">
            {t('general.seeAll')}
          </Button>
        </div>

        <div className="space-y-3">
          {suggestedFriends.map((friend) => (
            <div key={friend.id} className="flex items-center gap-3">
              <Link href={`/${friend.username}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <Link href={`/${friend.username}`} className="font-medium text-sm hover:underline truncate">
                    {friend.name}
                  </Link>
                  {friend.id === '1' && <BadgeCheck className="h-4 w-4 text-blue-500 ml-1 flex-shrink-0" />}
                </div>
                <p className="text-gray-500 text-xs truncate">
                  {friend.mutualFriends} {t('profile.mutualFriends')}
                </p>
              </div>
              <Button variant="secondary" size="sm" className="h-8 px-3 text-xs font-medium">
                {t('addFriend')}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Birthdays Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Gift className="h-5 w-5 text-red-500" />
          <h3 className="font-medium">{t('birthdays')}</h3>
        </div>

        <div className="space-y-3">
          {upcomingBirthdays.map((person) => (
            <div key={person.id} className="flex items-center gap-3">
              <Link href={`/${person.username}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1">
                <Link href={`/${person.username}`} className="font-medium text-sm hover:underline">
                  {person.name}
                </Link>
                <p className="text-gray-500 text-xs">{person.date}</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                {t('sendWishes')}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium">{t('events')}</h3>
        </div>

        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800">
              <h4 className="font-medium text-sm">{event.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{event.date}</p>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{event.attendees} {t('attending')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-x-2 text-xs text-gray-500">
          <Link href="/about" className="hover:underline">About</Link>
          <span>•</span>
          <Link href="/help" className="hover:underline">Help</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:underline">Terms</Link>
        </div>
        <p className="text-xs text-gray-400 mt-2">© 2024 Vietnam Social Network</p>
      </div>
    </div>
  );
}
