import { LayoutProps } from '@/models/common';
import LogoTitle from '@/shared/components/logo-title';


export function AuthLayout({ children }: LayoutProps) {
    return (
        <div className='container mx-auto h-screen flex'>
            <LogoTitle/>
            {children}
        </div>
    );
}