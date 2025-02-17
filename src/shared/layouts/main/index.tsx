import { Header } from './header';
import { LayoutProps } from '@/models/common';
import { Sidebar } from './sidebar';
import { RightSidebar } from './right-sidebar';

export function MainLayout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col h-screen">

            <Header />

            <div className="flex flex-1 pt-[64px]">
                <div className="w-1/5 hidden lg:block fixed top-[64px] left-0 h-[calc(100vh-64px)] overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-auto px-20 pt-10 lg:ml-[20%] lg:mr-[20%]">{children}</div>
                <div className="w-1/5 hidden lg:block fixed top-[64px] right-0 h-[calc(100vh-64px)] overflow-y-auto">
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
}


