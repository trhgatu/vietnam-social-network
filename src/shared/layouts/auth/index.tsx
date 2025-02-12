import { ModeToggle } from '@/components/toggle-theme';
import { LayoutProps } from '@/models/common';
import LogoTitle from '@/shared/components/logo-title';


export function AuthLayout({ children }: LayoutProps) {
    return (
        <div className='relative container mx-auto h-screen flex'>
            <LogoTitle/>
            {children}
            <div className='absolute bottom-14 left-5'>
                 <ModeToggle/>
            </div>
        </div>
    );
}