"use client";
import React from "react";
import Link from "next/link";
import {URLs} from "@/lib/urls";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Montserrat} from "next/font/google";
import {
    AppWindow,
    LayoutDashboard, LifeBuoy,
    ScrollText,
    Settings,
    Wallet
} from "lucide-react";
import {usePathname} from "next/navigation";

const montserrat = Montserrat({
    weight: "600",
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
        <div className='space-y-4 py-4 flex flex-col h-full bg-gray-100 drop-shadow-xl text-zinc-800'>
            <div className='px-3 py-2 flex-1'>
                <Link href={URLs.dashboard} className='flex items-center pl-3 mb-14'>
                    <div className='relative w-12 h-12 mr-1'>
                        <Image
                            fill
                            alt='Logo'
                            src='/reactflags.svg'
                        />
                    </div>
                    <h1 className={cn('text-2xl font-bold', montserrat.className)}>
                        reactflags
                    </h1>
                </Link>
                <div className='space-y-1'>
                    {routes.map(route => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn('text-zinc-800 text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-zinc-800 hover:bg-zinc-800/10 rounded-lg transition', pathname === route.href ? 'bg-zinc-800/10' : '')}
                        >
                            <div className='flex items-center flex-1'>
                                <route.icon className='h-5 w-5 mr-3 text-zinc-800'/>
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
