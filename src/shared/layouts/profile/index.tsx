// MainLayout.tsx
import { Header } from '@/shared/layouts/main/header';
import { LayoutProps } from '@/models/common';

export function ProfileLayout({ children }: LayoutProps) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
        </div>
    );
}
