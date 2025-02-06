import { LayoutProps } from '@/models/common';

export function AuthLayout({ children }: LayoutProps) {
    return (
        <>
            Auth Background
            {children}
        </>
    );
}