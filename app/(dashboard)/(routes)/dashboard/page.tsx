"use client";
import React from "react";
import {AppWindow, ArrowRight, Code, LifeBuoy, ScrollText, Wallet} from "lucide-react";
import {URLs} from "@/lib/urls";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";

const tools = [
    {
        label: 'Applications',
        icon: AppWindow,
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
        href: URLs.conversation
    },
    {
        label: 'Documentation',
        icon: ScrollText,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        href: URLs.music
    },
    {
        label: 'Billing',
        icon: Wallet,
        color: 'text-pink-700',
        bgColor: 'bg-pink-700/10',
        href: URLs.image
    },
    {
        label: 'Support',
        icon: LifeBuoy,
        color: 'text-orange-700',
        bgColor: 'bg-orange-700/10',
        href: URLs.video
    },
    {
        label: 'Settings',
        icon: Code,
        color: 'text-zinc-700',
        bgColor: 'bg-zinc-700/10',
        href: URLs.code
    }
];

const DashboardPage: React.FC = () => {
    // Navigation
    const router = useRouter();

    // Returned UI
    return (
        <div>
            <div className='mb-8 space-y-4'>
                <h2 className='text-2xl md:text-3xl font-bold text-center'>
                    Cost-Efficient Feature Flagging & Configuration
                </h2>
                <div className='text-muted-foreground font-light text-md md:text-md text-center'>
                    <span className='leading-loose block'>
                        Tailored API options, cloud deployment, and on-premises solutions.
                    </span>
                    <span className='leading-loose block'>
                        Versatile solutions, budget-friendly pricing.
                    </span>
                </div>
            </div>
            <div className='px-4 md:px-20 lg:px-32 space-y-4'>
                {tools.map(tool => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className='p-4 border-black-5 flex items-center justify-between hover:shadow-md transition cursor-pointer'
                    >
                        <div className='flex items-center gap-x-4'>
                            <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                                <tool.icon className={cn('w-8 h-8', tool.color)}/>
                            </div>
                            <div className='font-semibold'>{tool.label}</div>
                        </div>
                        <ArrowRight className='w-5 h-5'/>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
