"use client";
import React from "react";
import Heading from "@/components/Heading";
import {MessageSquare} from "lucide-react";
import {useForm} from "react-hook-form";
import * as z from 'zod';
import {formSchema} from './constants';
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";
import OpenAI from "openai";
import ChatCompletionMessage = OpenAI.ChatCompletionMessage;
import {URLs} from "@/lib/urls";

const ConversationPage: React.FC = () => {
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
                title='Conversation'
                description='Our most advanced conversation model.'
                icon={MessageSquare}
                iconColor='text-violet-500'
                bgColor='bg-violet-500/10'
            />
            <div className='px-4 lg:px-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className='rounded-lg border w-full p-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                        <FormField
                            render={({field}) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input
                                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={loading}
                                            placeholder='How do I calculate the radius of a circle?'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            name='prompt'
                        />
                        <Button className='col-span-12 lg:col-span-2 w-full' disabled={loading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='space-y-4 mt-4'>
                <div className='flex flex-col-reverse gap-y-4'>
                    {messages.map(message => (
                        <div key={message.content}>
                            {message.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;