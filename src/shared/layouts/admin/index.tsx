import { Sidebar } from './sidebar';
import { Footer } from './footer';
import { Header } from './header';
import { LayoutProps } from '@/models/common';

export function AdminLayout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <Sidebar />
            {children}
            <Footer />
        </>
    );
}