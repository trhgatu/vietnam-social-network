import { Header } from './header';
import { LayoutProps } from '@/models/common';
import { ModeToggle } from '@/components/toggle-theme';
import { Sidebar } from './sidebar';
/* import { RightSidebar } from './right-sidebar'; */

export function MainLayout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen">
            <div className="w-1/5 hidden lg:block">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1 overflow-auto px-20 pt-20">{children}</div>
            </div>

            {/* <div className="w-1/4 bg-gray-100 hidden xl:block">
                <RightSidebar />
            </div> */}
            <div className="absolute bottom-14 left-5">
                <ModeToggle />
            </div>
        </div>
    );
}
