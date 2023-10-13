import React from "react";
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Genius',
    description: 'AI Platform',
}

function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    )
}

export default RootLayout
