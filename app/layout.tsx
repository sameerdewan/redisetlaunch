import React from "react";
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {cn} from "@/lib/utils";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'RediSetLaunch',
    description: 'empower your team',
}

const RootLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    // Returned UI
    return (
        <html lang="en">
        <body className={cn(inter.className, 'bg-gray-50')}>
        {children}
        <ScrollToTopButton/>
        </body>
        </html>
    );
};

export default RootLayout
