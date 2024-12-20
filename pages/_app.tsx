'use client';

import type { AppProps } from 'next/app';
import { Metadata } from 'next';
import '../app/globals.css';

import { UserProvider } from '@/context/userContext';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
    title: 'Rozz',
    description: '',
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session}>
                <UserProvider>
                    <Component {...pageProps} />
                    <Toaster />
                </UserProvider>
            </SessionProvider>
        </>
    )
}

export default MyApp
