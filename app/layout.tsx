import React from "react";
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'
import ScrollToTopButton from "@/components/ScrollToTopButton";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'reactflags',
    description: 'Feature flagging made cheap and easy',
}

const RootLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    // Returned UI
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={inter.className}>
                {children}
                <ScrollToTopButton/>
            </body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout
