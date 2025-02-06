import { Footer } from './footer';
import { Header } from './header';
import { LayoutProps } from '@/models/common';

export function MainLayout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}