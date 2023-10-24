"use client";
import React from "react";
import {
    AlarmClock,
    AppWindow,
    ArrowDown,
    ArrowRight,
    Braces,
    Flag,
    GalleryHorizontalEnd,
    MoreVertical,
    Pin,
    Search, Video
} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Heading from "@/components/Heading";
import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const DashboardPage: React.FC = () => {
    // Navigation
    const router = useRouter();

    // Returned UI
    return (
        <div>
            <Heading
                title='Pinned'
                description='List of all of your pinned pages.'
                icon={Pin}
                iconColor='text-zinc-800'
                bgColor='bg-gray-200'
            />
            <div className='px-4 lg:px-8'>
                <Tabs defaultValue="applications">
                    <TabsList>
                        <TabsTrigger value="applications">
                            <span className='max-sm:hidden'>Applications</span>
                            <span className='sm:hidden'>Apps</span>
                        </TabsTrigger>
                        <TabsTrigger value="environments">
                            <span className='max-sm:hidden'>Environments</span>
                            <span className='sm:hidden'>Envs</span>
                        </TabsTrigger>
                        <TabsTrigger value="flags">Flags</TabsTrigger>
                        <TabsTrigger value="sessions">Sessions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="applications">
                        <div className='border-gray-200 bg-white border-b-2 rounded-xl mb-4 p-3 flex'>
                            <input className='bg-white focus-visible:outline-none flex-1'
                                   placeholder='PageSearch Applications...'/>
                            <Search className='text-gray-400'/>
                        </div>
                        <div className='grid xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-4 sm:grid-cols-2 gap-4'>
                            {
                                new Array(100).fill(null).map((obj) => (
                                    <Card key={obj}
                                          className='flex flex-col justify-between'>
                                        <div className="flex items-center space-x-4 p-4">
                                            <Avatar className='bg-[#A9B7DA]/50'>
                                                <AvatarFallback className='bg-[#A9B7DA]/50 text-[#101B35]'>
                                                    <AppWindow/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow">
                                                <p className="font-bold">app name</p>
                                                <p className="text-muted-foreground text-sm">
                                                    flexible penguins dance rigidly down the block to watch the
                                                    raindrops drop
                                                </p>
                                            </div>
                                        </div>
                                        <div className='bg-[#A9B7DA]/50 p-2 flex justify-between'>
                                            <Button className='bg-[#A9B7DA] hover:bg-[#101B35]/50' size='sm'>
                                                <MoreVertical/>
                                            </Button>
                                            <Button onClick={() => router.push('/applications/1')}
                                                    className='bg-[#101B35]/50 hover:bg-[#101B35]/75' size='sm'>
                                                Go to App
                                                <ArrowRight/>
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="environments">
                        <div className='border-gray-200 bg-white border-b-2 rounded-xl mb-4 p-3 flex'>
                            <input className='bg-white focus-visible:outline-none flex-1'
                                   placeholder='PageSearch Environments...'/>
                            <Search className='text-gray-400'/>
                        </div>
                        <div className='grid xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-4 sm:grid-cols-2 gap-4'>
                            {
                                new Array(100).fill(null).map((obj) => (
                                    <Card key={obj}
                                          className='flex flex-col justify-between'>
                                        <div className="flex items-center space-x-4 p-4">
                                            <Avatar className='bg-[#F0B166]/70'>
                                                <AvatarFallback className='bg-[#F0B166]/70 text-orange-900'>
                                                    <GalleryHorizontalEnd/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow">
                                                <p className="font-bold">env name</p>
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
                                            <span
                                                className='w-20 text-muted-foreground text-sm pl-1 pt-1'>app name</span>
                                        </div>
                                        <div className='bg-[#F0B166]/70 p-2 flex justify-between'>
                                            <Button className='bg-[#F0B166]/50 hover:bg-[#F0B166]' size='sm'>
                                                <MoreVertical/>
                                            </Button>
                                            <Button className='bg-[#F0B166]/60 hover:bg-[#F0B166]' size='sm'>
                                                Go to Env
                                                <ArrowRight/>
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="flags">
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
                                                <div
                                                    className='h-3 w-3 bg-red-500 absolute -top-0 right-0 z-10 rounded-full'/>
                                                <div
                                                    className='animate-ping h-3 w-3 bg-red-500 absolute -top-0 right-0 z-10 rounded-full'/>
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
                                            <span
                                                className='w-20 text-muted-foreground text-sm pl-1 pt-1'>app name</span>
                                        </div>
                                        <div className='h-7 flex pr-5 mb-3 justify-end'>
                                            <Avatar className='bg-[#F0B166]/70 h-7 w-7'>
                                                <AvatarFallback className='bg-[#F0B166]/70 text-orange-900'>
                                                    <GalleryHorizontalEnd className='h-4 w-4'/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <span
                                                className='w-20 text-muted-foreground text-sm pl-1 pt-1'>env name</span>
                                        </div>
                                        <div className='h-7 flex pr-5 mb-3 justify-end'>
                                            <Avatar className='bg-gray-300 h-7 w-7'>
                                                <AvatarFallback className='bg-gray-300 text-zinc-800'>
                                                    <Braces className='h-4 w-4'/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className='w-20 text-muted-foreground text-sm pl-1 pt-1'>JSON</span>
                                        </div>
                                        <div className='bg-green-300 p-2 flex justify-between'>
                                            <Button className='bg-green-400 hover:bg-green-500' size='sm'>
                                                <MoreVertical/>
                                            </Button>
                                            <Button className='bg-green-500 hover:bg-green-600' size='sm'>
                                                Go to Flag
                                                <ArrowRight/>
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="sessions">
                        <div className='border-gray-200 bg-white border-b-2 rounded-xl mb-4 p-3 flex'>
                            <input className='bg-white focus-visible:outline-none flex-1'
                                   placeholder='PageSearch Sessions...'/>
                            <Search className='text-gray-400'/>
                        </div>
                        <div className='grid xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-4 sm:grid-cols-2 gap-4'>
                            {
                                new Array(100).fill(null).map((obj) => (
                                    <Card key={obj}
                                          className='flex flex-col justify-between'>
                                        <div className="flex items-center space-x-4 p-4">
                                            <div className='z-40'>
                                                <Avatar className='bg-pink-300'>
                                                    <AvatarFallback className='bg-pink-300 text-pink-700'>
                                                        <Video/>
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-bold">session name</p>
                                                <p className="text-muted-foreground text-sm">
                                                    Session recorded 11/01/23 1:23PM EST
                                                </p>
                                            </div>
                                        </div>
                                        <div className='h-7 flex pr-5 mb-3 justify-end'>
                                            <Avatar className='bg-[#A9B7DA]/50 h-7 w-7'>
                                                <AvatarFallback className='bg-[#A9B7DA]/50 text-[#101B35]'>
                                                    <AppWindow className='h-4 w-4'/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <span
                                                className='w-20 text-muted-foreground text-sm pl-1 pt-1'>app name</span>
                                        </div>
                                        <div className='h-7 flex pr-5 mb-3 justify-end'>
                                            <Avatar className='bg-[#F0B166]/70 h-7 w-7'>
                                                <AvatarFallback className='bg-[#F0B166]/70 text-orange-900'>
                                                    <GalleryHorizontalEnd className='h-4 w-4'/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <span
                                                className='w-20 text-muted-foreground text-sm pl-1 pt-1'>env name</span>
                                        </div>
                                        <div className='h-7 flex pr-5 mb-3 justify-end'>
                                            <Avatar className='bg-green-300 h-7 w-7'>
                                                <AvatarFallback className='bg-green-300 text-green-800'>
                                                    <Flag className='h-4 w-4'/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className='w-20 text-muted-foreground text-sm pl-1 pt-1'>8</span>
                                        </div>
                                        <div className='h-7 flex pr-5 mb-3 justify-end'>
                                            <Avatar className='bg-cyan-500 h-7 w-7'>
                                                <AvatarFallback className='bg-cyan-500 text-cyan-950'>
                                                    <AlarmClock className='h-4 w-4'/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className='w-20 text-muted-foreground text-sm pl-1 pt-1'>3:42</span>
                                        </div>
                                        <div className='bg-pink-300 p-2 flex justify-between'>
                                            <Button className='bg-pink-400 hover:bg-pink-500' size='sm'>
                                                <MoreVertical/>
                                            </Button>
                                            <Button className='bg-pink-500 hover:bg-pink-600' size='sm'>
                                                Go to Session
                                                <ArrowRight/>
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            }
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default DashboardPage;
