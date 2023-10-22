"use client";
import React from "react";
import Heading from "@/components/Heading";
import {AppWindow, ArrowRight, MoreVertical, Plus, Search} from "lucide-react";
import {useForm} from "react-hook-form";
import * as z from 'zod';
import {formSchema} from './constants';
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import OpenAI from "openai";
import ChatCompletionMessage = OpenAI.ChatCompletionMessage;
import {URLs} from "@/lib/urls";
import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

const ApplicationsPage: React.FC = () => {
    // Navigation
    const router = useRouter();

    // State
    const [messages, setMessages] = React.useState<ChatCompletionMessage[]>([]);

    // Form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });
    const loading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessage = {
                role: 'user',
                content: values.prompt
            };
            const newMessages = [...messages, userMessage];
            const response = await axios.post(URLs.api.conversation, {messages: newMessages});
            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();
        } catch (error: any) {
            // Todo: Open Pro Model
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    // Returned UI
    return (
        <div>
            <Heading
                title='Applications'
                description='List of all of your applications.'
                icon={AppWindow}
                iconColor='text-[#101B35]'
                bgColor='bg-[#A9B7DA]/50'
            />
            <div className='px-4 lg:px-8'>
                <div className='border-gray-200 bg-white border-b-2 rounded-xl mb-4 p-3 flex'>
                    <input className='bg-white focus-visible:outline-none flex-1'
                           placeholder='Search Applications...'/>
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
                                    <Button onClick={() => router.push('/applications/1')} className='bg-[#101B35]/50 hover:bg-[#101B35]/75' size='sm'>
                                        Go to App
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
};

export default ApplicationsPage;