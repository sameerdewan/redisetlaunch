"use client";
import Heading from "@/components/Heading";
import {
    AppWindow,
    Braces,
    CalendarDaysIcon,
    Flag,
    GalleryHorizontalEnd,
    Pencil,
    PinOff,
    RefreshCw,
    Trash, Video
} from "lucide-react";
import React from "react";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import html2canvas from "html2canvas";

function FlagPage({params}: {params: {environmentId: string}}) {
    // Navigation
    const router = useRouter();

    // Returned UI
    return (
        <div className='min-h-screen'>
            <Heading
                title='flag name'
                description='flexible penguins dance rigidly down the block to watch the raindrops drop'
                icon={Flag}
                iconColor='text-green-700'
                bgColor='bg-green-300'
            />
            <div className='px-4 lg:px-8'>
                <Card className='mt-4 p-4'>
                    <div id='location'></div>
                    <div className='flex justify-between mb-8'>
                        <Button
                            onClick={() => html2canvas(document.body, {
                                x: window.scrollX,
                                y: window.scrollY,
                                width: window.innerWidth,
                                height: window.innerHeight,
                            }).then(canvas => {
                                const location = document.getElementById('location')!
                                const image = document.createElement('img');
                                image.src = canvas.toDataURL('image/jpeg');
                                image.width = 800;
                                location.appendChild(image);
                            })}
                            className='max-sm:hidden bg-white text-red-400 border-red-400 border-2 hover:bg-red-500 hover:border-red-500 hover:text-white'>
                            <Trash/>&nbsp;Delete Flag
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
                                <Button onClick={() => router.push(`/applications/1/environments/1/flags/1/edit`)}>
                                    <Pencil/>&nbsp;Edit Flag
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='max-sm:flex max-sm:flex-col-reverse'>
                        <div className='grid lg:grid-cols-3 md:grid-cols-1 gap-4 mb-8'>
                            <Card
                                onClick={() => router.push(`/applications/1`)}
                                className='bg-[#A9B7DA]/50 border-[#A9B7DA] border-2 flex flex-col justify-center items-center text-center h-40 relative overflow-clip rounded-lg hover:shadow-md transition cursor-pointer'>
                                <p className="font-bold text-2xl z-20">app</p>
                                <div className='text-xl font-bold z-20'>ID:#123123MYID</div>
                                <AppWindow
                                    className='absolute h-48 w-48 left-4 top-1 text-[#A9B7DA] z-10'/>
                            </Card>
                            <Card
                                onClick={() => router.push(`/applications/1/environments/${params.environmentId}`)}
                                className='bg-[#F0B166]/20 border-orange-200 border-2 flex flex-col justify-center items-center text-center h-40 relative overflow-clip rounded-lg hover:shadow-md transition cursor-pointer'>
                                <p className="font-bold text-2xl z-20">env</p>
                                <div className='text-xl font-bold z-20'>ID:#123123MYID</div>
                                <GalleryHorizontalEnd className='absolute h-44 w-44 left-0 top-4 text-[#F0B166]/50 z-10'/>
                            </Card>
                            <Card
                                onClick={() => router.push(`/applications/1/environments/${params.environmentId}/sessions`)}
                                className='bg-pink-200 border-pink-600 flex flex-col justify-center items-center text-center h-40 relative overflow-clip rounded-lg hover:shadow-md transition cursor-pointer'>
                                <p className="font-bold text-2xl z-20">sessions</p>
                                <div className='text-xl font-bold z-20'>42</div>
                                <Video className='absolute h-52 w-52 left-4 top-1 text-pink-400 z-10'/>
                            </Card>
                        </div>
                        <div className='max-sm:mb-8'>
                            <div className='text-md font-semibold'>Value Type</div>
                            <p className='text-muted-foreground'>
                               JSON
                            </p>
                            <div className='text-md font-semibold mt-4'>Value</div>
                            <AceEditor
                                mode='json'
                                theme='dracula'
                                onChange={() => {}}
                                name='json-editor'
                                defaultValue={JSON.stringify({
                                    "line": {
                                        "pilot": false,
                                        "gift": 781297495.5843382,
                                        "crowd": false
                                    },
                                    "bean": "pond",
                                    "all": true
                                }, null, 2)}
                                maxLines={Infinity}
                                className='max-w-full'
                                width='inherit'
                                readOnly
                            />
                            <div className='text-md font-semibold mt-4'>Description</div>
                            <p className='text-muted-foreground lowercase'>
                                Flexible penguins dance rigidly down the block to watch the raindrops drop, their
                                flippers
                                fluttering with each step, their eyes twinkling with excitement.
                            </p>
                            <div className='text-md font-semibold mt-4'>Scheduled Launch</div>
                            <p className='text-muted-foreground'>
                                January 1, 1991 5:31PM GST
                            </p>
                            <div className='text-md font-semibold mt-4'>Type</div>
                            <p className='text-muted-foreground'>
                                A/B
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
                        onClick={() => html2canvas(document.body, {
                            x: window.scrollX,
                            y: window.scrollY,
                            width: window.innerWidth,
                            height: window.innerHeight,
                        }).then(canvas => {
                            const location = document.getElementById('location')!
                            const image = document.createElement('img');
                            image.src = canvas.toDataURL('image/jpeg');
                            image.width = 800;
                            image.height = 400;
                            location.appendChild(image);
                        })}
                        className='sm:visible md:hidden bg-white text-red-400 border-red-400 border-2 hover:bg-red-500 hover:border-red-500 hover:text-white w-full my-8'>
                        <Trash/>&nbsp;Delete Application
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default FlagPage;