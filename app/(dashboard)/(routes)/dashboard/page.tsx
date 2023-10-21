"use client";
import React from "react";
import {AppWindow, ArrowRight, Flag, GalleryHorizontalEnd, MoreVertical, Pin} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Heading from "@/components/Heading";
import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

const DashboardPage: React.FC = () => {
    // Returned UI
    return (
        <div>
            <Heading
                title='Pinned'
                description='List of all of your pinned pages.'
                icon={Pin}
                iconColor='text-[#101B35]'
                bgColor='bg-[#A9B7DA]/50'
            />
            <div className='px-4 lg:px-8'>
                <Tabs defaultValue="applications">
                    <TabsList>
                        <TabsTrigger value="applications">Applications</TabsTrigger>
                        <TabsTrigger value="environments">Environments</TabsTrigger>
                        <TabsTrigger value="flags">Flags</TabsTrigger>
                    </TabsList>
                    <TabsContent value="applications">
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
                                            <Button className='bg-[#101B35]/50 hover:bg-[#101B35]/75' size='sm'>
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
                        <div className='grid xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-4 sm:grid-cols-2 gap-4'>
                            {
                                new Array(100).fill(null).map((obj) => (
                                    <Card key={obj}
                                          className='flex flex-col justify-between'>
                                        <div className="flex items-center space-x-4 p-4">
                                            <Avatar className='bg-green-100'>
                                                <AvatarFallback className='bg-green-300 text-green-600'>
                                                    <Flag/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-grow">
                                                <p className="font-bold">flag name</p>
                                                <p className="text-muted-foreground text-sm">
                                                    flexible penguins dance rigidly down the block to watch the
                                                    raindrops drop
                                                </p>
                                            </div>
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
                </Tabs>
            </div>
        </div>
    );
};

export default DashboardPage;
