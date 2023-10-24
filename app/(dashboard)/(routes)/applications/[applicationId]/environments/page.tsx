"use client";
import {AppWindow, ArrowRight, GalleryHorizontalEnd, MoreVertical, Plus, Search} from "lucide-react";
import Heading from "@/components/Heading";
import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";

function EnvironmentsPage({params}: {params: {environmentId: string, applicationId: string}})  {
    // Navigation
    const router = useRouter();

    // Returned UI
    return (
        <div>
            <Heading
                title='Environments'
                description={'List of all of your environments for application: ' + params.applicationId}
                icon={GalleryHorizontalEnd}
                iconColor='text-orange-900'
                bgColor='bg-[#F0B166]/70'
            />
            <div className='px-4 lg:px-8'>
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
                                    <span className='w-20 text-muted-foreground text-sm pl-1 pt-1'>app name</span>
                                </div>
                                <div className='bg-[#F0B166]/70 p-2 flex justify-between'>
                                    <Button className='bg-[#F0B166]/50 hover:bg-[#F0B166]' size='sm'>
                                        <MoreVertical/>
                                    </Button>
                                    <Button
                                        onClick={() => router.push(`/applications/${params.applicationId}/environments/1`)}
                                        className='bg-[#F0B166]/60 hover:bg-[#F0B166]' size='sm'>
                                        Go to Env
                                        <ArrowRight/>
                                    </Button>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </div>
            <Button
                className='fixed top-1/2 right-5 bg-green-600 rounded-full h-[70px] w-[70px] hover:bg-green-700 bg-opacity-80'
                size='icon'
            >
                <Plus className='h-8 w-8'/>
            </Button>
        </div>
    );
}

export default EnvironmentsPage;