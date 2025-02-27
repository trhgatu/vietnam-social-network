// MainLayout.tsx
'use client';

import { Header } from './header';
import { LayoutProps } from '@/models/common';
import { AppSidebar } from '@/shared/layouts/main/app-sidebar';
import { usePathname } from 'next/navigation';
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useAuth } from '@/shared/contexts/auth-context';

import { RightSidebar } from '@/shared/layouts/main/right-sidebar';

export function MainLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isProfilePage = pathname.startsWith(`/${user?.username}`);
  const containerClass = isProfilePage
  ? "xl:grid-cols-1"
  : "xl:grid-cols-[minmax(0,1fr)_var(--container-3xs)]";
  return (
    <div>
      <Header />
      <main>
        <SidebarProvider className='mt-[60px] h-[calc(100vh-60px)]" '>
          <AppSidebar className="mt-[60px] h-[calc(100vh-60px)]" />
          <SidebarInset>
            <header className="md:flex hidden fixed h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>
            <div className={`mx-auto md:pl-8 grid w-full max-w-2xl gap-10 xl:max-w-5xl ${containerClass}`}>
              {children}
              {!isProfilePage && (
                <div className='max-xl:hidden'>
                  <RightSidebar />
                </div>
              )}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </main>
    </div>
  );
}
