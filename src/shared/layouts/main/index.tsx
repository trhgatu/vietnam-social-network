// MainLayout.tsx
'use client';

import { Header } from './header';
import { LayoutProps } from '@/models/common';
import { AppSidebar } from './app-sidebar';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/shared/contexts/auth-context';
import { RightSidebar } from './right-sidebar';

export function MainLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Determine if we're on a profile page to adjust layout
  const isProfilePage = user?.username && pathname.startsWith(`/${user.username}`);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Header />

      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar - Responsive */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-zinc-950 border-t dark:border-zinc-800 md:relative md:border-t-0 md:w-[70px] lg:w-[240px] md:flex-shrink-0">
          <AppSidebar />
        </div>

        {/* Main Content - Responsive */}
        <main className="flex-1 pt-[60px] transition-all duration-200 min-h-[calc(100vh-60px)] pb-16 md:pb-0">
          <div className={`
            mx-auto w-full
            ${isProfilePage
              ? 'max-w-full px-0'
              : 'px-2 sm:px-4 md:px-6 max-w-3xl lg:max-w-4xl'
            }
          `}>
            {children}
          </div>
        </main>

        {/* Right Sidebar - Only show on larger screens and not on profile pages */}
        {!isProfilePage && (
          <div className="hidden xl:block w-[300px] flex-shrink-0">
            <div className="fixed h-[calc(100vh-60px)] w-[300px] border-l dark:border-zinc-800 bg-white dark:bg-zinc-950 pt-[60px] overflow-y-auto">
              <RightSidebar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
