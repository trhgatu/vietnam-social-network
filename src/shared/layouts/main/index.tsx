// MainLayout.tsx
import { Header } from './header';
import { LayoutProps } from '@/models/common';
import { Sidebar } from './sidebar';
/* import { RightSidebar } from './right-sidebar'; */

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar className="lg:w-1/5 lg:block hidden" />
        <main className="flex-1 ml-0 lg:ml-[20%] mr-0 lg:mr-[20%] overflow-y-auto mt-[60px]">
          {children}
        </main>
        {/* <RightSidebar className="lg:w-1/5 lg:block hidden" /> */}
      </div>
    </div>
  );
}
