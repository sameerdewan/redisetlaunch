"use client";
import React from "react";
import Link from "next/link";
import {URLs} from "@/lib/urls";
import Image from "next/image";
import {cn, getAbsoluteDashboardPath} from "@/lib/utils";
import {
    AppWindow, Flag, GalleryHorizontalEnd,
    LayoutDashboard, Video
} from "lucide-react";
import {usePathname} from "next/navigation";
import localFont from "next/font/local";

const cheGuevaraBarryBrown = localFont({src: './cheGuevaraBarryBrown.ttf'});

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
        label: 'Environments',
        icon: GalleryHorizontalEnd,
        href: URLs.environments,
    },
    {
        label: 'Flags',
        icon: Flag,
        href: URLs.flags,
    },
    {
        label: 'Sessions',
        icon: Video,
        href: URLs.sessions
    },
];

const Sidebar: React.FC = () => {
    // Navigation
    const pathname = usePathname();

    // Returned UI
    return (
        <div className='space-y-4 py-4 flex flex-col h-full bg-[#768cab] drop-shadow-2xl text-[#101B35]'>
            <div className='px-3 py-2 flex-1'>
                <Link href={URLs.dashboard} className='flex flex-col items-center justify-center mb-8'>
                    <div className='relative w-32 h-32 -mb-1 z-10'>
                        <Image
                            fill
                            alt='Logo'
                            src='/logo.png'
                        />
                    </div>
                    <h1 className={cn(cheGuevaraBarryBrown.className, 'z-20')}>
                        <span className='font-light text-xl text-[#101B35]'>Redi</span>
                        <span className='font-bold text-xl text-[#101B35]'>Set</span>
                        <span className='font-extrabold text-xl text-[#101B35]/60'>Launch</span>
                    </h1>
                    <h2 className={cn(cheGuevaraBarryBrown.className, 'text-sm text-[#101B35]/60 -mt-1')}>empower your
                        team</h2>
                </Link>
                <div className='space-y-1'>
                    {routes.map(route => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-zinc-800 hover:bg-[#101B35]/20 rounded-lg transition', getAbsoluteDashboardPath(pathname) === route.href ? 'bg-[#101B35]/20' : '')}
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
