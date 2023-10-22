"use client";
import {
    AppWindow,
    ArrowRight,
    CalendarDaysIcon,
    Flag,
    GalleryHorizontalEnd,
    MoreVertical, Pencil, PinOff,
    RefreshCw,
    Trash
} from "lucide-react";
import Heading from "@/components/Heading";
import React from "react";
import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


function Page({params}: {params: {applicationId: string}}) {
    // Navigation
    const router = useRouter();

    // Returned UI
    return (
        <div className='min-h-screen'>
            <Heading
                title='app name'
                description='ID:#123123MYID'
                icon={AppWindow}
                iconColor='text-[#101B35]'
                bgColor='bg-[#A9B7DA]/50'
            />
            <div className='px-4 lg:px-8'>
                <Card className='mt-4 p-4'>
                    <div className='flex justify-between mb-8'>
                        <Button
                            className='max-sm:hidden bg-white text-red-400 border-red-400 border-2 hover:bg-red-500 hover:border-red-500 hover:text-white'>
                            <Trash/>&nbsp;Delete Application
                        </Button>
                        <div className='flex max-sm:justify-between max-sm:w-full'>
                            <Button size='icon'
                                    className='mr-2 bg-white border-2 border-black text-black hover:bg-gray-300'>
                                <RefreshCw/>
                            </Button>
                            <div className='flex mr-2'>
                                <Button size='icon'
                                        className='mr-2 bg-white border-2 border-black text-black hover:bg-gray-300'>
                                    <PinOff/>
                                </Button>
                                <Button>
                                    <Pencil/>&nbsp;Edit Application
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='max-sm:flex max-sm:flex-col-reverse'>
                        <div className='grid lg:grid-cols-3 md:grid-cols-1 gap-4 mb-8'>
                            <Card
                                onClick={() => router.push(`/applications/${params.applicationId}/environments`)}
                                className='bg-[#F0B166]/20 border-orange-200 border-2 flex flex-col justify-center items-center text-center h-40 relative overflow-clip rounded-lg hover:shadow-md transition cursor-pointer'>
                                <p className="font-bold text-2xl z-20">envs</p>
                                <div className='text-xl font-bold z-20'>7</div>
                                <GalleryHorizontalEnd
                                    className='absolute h-44 w-44 left-4 top-1 text-[#F0B166]/50 z-10'/>
                            </Card>
                            <Card
                                className='bg-green-100 border-green-300 border-2 flex flex-col justify-center items-center text-center h-40 relative overflow-clip rounded-lg hover:shadow-md transition cursor-pointer'>
                                <p className="font-bold text-2xl z-20">flags</p>
                                <div className='text-xl font-bold z-20'>42</div>
                                <Flag className='absolute h-44 w-44 left-0 top-4 text-green-300 z-10'/>
                            </Card>
                            <Card
                                className='flex flex-col justify-center items-center text-center h-40 relative overflow-clip rounded-lg'>
                                <p className="font-bold text-2xl z-20">last updated</p>
                                <div className='text-xl font-bold z-20'>02/16/2016</div>
                                <CalendarDaysIcon className='absolute h-44 w-44 left-4 top-2 text-gray-200 z-10'/>
                            </Card>
                        </div>
                        <div className='max-sm:mb-8'>
                            <div className='text-md font-semibold'>Description</div>
                            <p className='text-muted-foreground lowercase'>
                                Flexible penguins dance rigidly down the block to watch the raindrops drop, their
                                flippers
                                fluttering with each step, their eyes twinkling with excitement.
                            </p>
                            <div className='text-md font-semibold mt-4'>Created At</div>
                            <p className='text-muted-foreground'>
                                January 1, 1991 5:31PM GST
                            </p>
                            <div className='text-md font-semibold mt-4'>Created By</div>
                            <p className='text-muted-foreground'>
                                Sameer Dewan
                            </p>
                            <div className='text-md font-semibold mt-4'>Updated At</div>
                            <p className='text-muted-foreground'>
                                April 1, 2024 7:25PM GST
                            </p>
                            <div className='text-md font-semibold mt-4'>Updated By</div>
                            <p className='text-muted-foreground'>
                                Sameer Dewan
                            </p>
                        </div>
                    </div>
                    <Button
                        className='sm:visible md:hidden bg-white text-red-400 border-red-400 border-2 hover:bg-red-500 hover:border-red-500 hover:text-white w-full my-8'>
                        <Trash/>&nbsp;Delete Application
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default Page;