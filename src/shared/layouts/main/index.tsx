/* import { Footer } from './footer'; */
import { Header } from './header';
import { LayoutProps } from '@/models/common';
import { ModeToggle } from '@/components/toggle-theme';


export function MainLayout({ children }: LayoutProps) {
    return (
        <div className='relative h-screen'>
            <Header />
            {children}
            <div className='absolute bottom-14 left-5'>
                <ModeToggle />
            </div>
        </div>
    );
}