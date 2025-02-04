import { PropsWithChildren } from 'react';

import { Footer } from './footer';
import { Header } from './header';

export function MainLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />

            {children}

            <Footer />
        </>
    );
}