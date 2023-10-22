"use client";
import React from "react";
import Link from "next/link";
import {URLs} from "@/lib/urls";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {
    AppWindow,
    LayoutDashboard, LifeBuoy,
    ScrollText,
    Settings,
    Wallet
} from "lucide-react";
import {usePathname} from "next/navigation";
import {Montserrat} from 'next/font/google';

const montserrat = Montserrat({
    subsets: ["latin"]
});

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: URLs.dashboard,
    },
    {
        label: 'Applications',
        icon: AppWindow,
        href: URLs.applications,
    },
    {
        label: 'Documentation',
        icon: ScrollText,
        href: URLs.documentation,
    },
    {
        label: 'Billing',
        icon: Wallet,
        href: URLs.billing,
    },
    {
        label: 'Support',
        icon: LifeBuoy,
        href: URLs.support
    },
    {
        label: 'Settings',
        icon: Settings,
        href: URLs.settings,
    }
];

const Sidebar: React.FC = () => {
    // Navigation
    const pathname = usePathname();

    // Returned UI
    return (
        <div className='space-y-4 py-4 flex flex-col h-full bg-[#ECECEE] drop-shadow-xl text-[#101B35]'>
            <div className='px-3 py-2 flex-1'>
                <Link href={URLs.dashboard} className='flex flex-col items-center justify-center mb-8'>
                    <div className='relative w-40 h-40 -mb-9 z-10'>
                        <Image
                            fill
                            alt='Logo'
                            src='/logo.png'
                        />
                    </div>
                    <h1 className={cn(montserrat.className, 'z-20')}>
                        <span className='font-light text-xl text-[#101B35]'>redi</span>
                        <span className='font-bold text-xl text-[#101B35]'>set</span>
                        <span className='font-extrabold text-xl text-[#F0B166]'>launch</span>
                    </h1>
                </Link>
                <div className='space-y-1'>
                    {routes.map(route => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-zinc-800 hover:bg-[#A9B7DA]/50 rounded-lg transition', pathname.includes(route.href) ? 'bg-[#A9B7DA]/50' : '')}
                        >
                            <div className='flex items-center flex-1 text-[#101B35]'>
                                <route.icon className='h-5 w-5 mr-3'/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
