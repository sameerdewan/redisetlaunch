"use client";
import Heading from "@/components/Heading";
import {
    AppWindow,
    ArrowRight,
    Braces,
    Clock,
    Flag,
    GalleryHorizontalEnd,
    MoreVertical,
    Plus,
    Search, Split
} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";
import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {useRouter} from 'next/navigation';

function Flags() {
    // Navigation
    const router = useRouter();

    // Returned UI
    return (
        <div>
            <Heading
                title='Flags'
                description='List of all of your flags for environment: 1, application: 1'
                icon={Flag}
                iconColor='text-green-700'
                bgColor='bg-green-300'
            />
            <section className='px-4 lg:px-8'>
                <div className='border-gray-200 bg-white border-b-2 rounded-xl mb-4 p-3 flex'>
                    <input className='bg-white focus-visible:outline-none flex-1'
                           placeholder='Search Flags...'/>
                    <Search className='text-gray-400'/>
                </div>
                <div className='grid xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-4 sm:grid-cols-2 gap-4'>
                    {
                        new Array(100).fill(null).map((obj) => (
                            <Card key={obj}
                                  className='flex flex-col justify-between'>
                                <div className="flex items-center space-x-4 p-4">
                                    <div className='relative z-40'>
                                        <Avatar className='bg-green-100'>
                                            <AvatarFallback className='bg-green-300 text-green-600'>
                                                <Flag/>
                                            </AvatarFallback>
                                        </Avatar>
                                        {/*<div className='h-3 w-3 bg-red-400 absolute -top-0 right-0 z-10 rounded-full' />*/}
                                        <Clock className='h-4 w-4 bg-gray-200 absolute -top-0 -right-1 z-0 rounded-full'/>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold">flag name</p>
                                        <p className="text-muted-foreground text-sm">
                                            flexible penguins dance rigidly down the block to watch the
                                            raindrops drop
                                        </p>
                                    </div>
                                </div>
                                <div className='h-7 flex pr-5 mb-3 justify-end'>
                                    <Avatar className='bg-[#A9B7DA]/50 h-7 w-7'>
                                        <AvatarFallback className='bg-[#A9B7DA]/50 text-[#101B35]'>
                                            <AppWindow className='h-4 w-4'/>
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className='w-20 text-muted-foreground text-sm pl-1 pt-1'>app name</span>
                                </div>
                                <div className='h-7 flex pr-5 mb-3 justify-end'>
                                    <Avatar className='bg-[#F0B166]/70 h-7 w-7'>
                                        <AvatarFallback className='bg-[#F0B166]/70 text-orange-900'>
                                            <GalleryHorizontalEnd className='h-4 w-4'/>
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className='w-20 text-muted-foreground text-sm pl-1 pt-1'>env name</span>
                                </div>
                                <div className='h-7 flex pr-5 mb-3 justify-end'>
                                    <Avatar className='bg-gray-300 h-7 w-7'>
                                        <AvatarFallback className='bg-gray-300 text-zinc-800'>
                                            <Braces className='h-4 w-4'/>
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className='w-20 text-muted-foreground text-sm pl-1 pt-1'>JSON</span>
                                </div>
                                <div className='h-7 flex pr-5 mb-3 justify-end'>
                                    <Avatar className='bg-cyan-400 h-7 w-7'>
                                        <AvatarFallback className='bg-cyan-400 text-cyan-800'>
                                            <Split className='h-4 w-4'/>
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className='w-20 text-muted-foreground text-sm pl-1 pt-1'>A/B</span>
                                </div>
                                <div className='bg-green-300 p-2 flex justify-between'>
                                    <Button className='bg-green-400 hover:bg-green-500' size='sm'>
                                        <MoreVertical/>
                                    </Button>
                                    <Button onClick={() => router.push(`/applications/1/environments/1/flags/1`)}
                                            className='bg-green-500 hover:bg-green-600' size='sm'>
                                        Go to Flag
                                        <ArrowRight/>
                                    </Button>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </section>
            <Button
                className='fixed top-1/2 right-5 bg-green-600 rounded-full h-[70px] w-[70px] hover:bg-green-700 bg-opacity-80'
                size='icon'
            >
                <Plus className='h-8 w-8'/>
            </Button>
        </div>
    );
}

export default Flags;
