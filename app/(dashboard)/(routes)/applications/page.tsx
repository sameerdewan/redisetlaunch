"use client";
import React from "react";
import Heading from "@/components/Heading";
import {AppWindow, ArrowRight, MessageSquare} from "lucide-react";
import {useForm} from "react-hook-form";
import * as z from 'zod';
import {formSchema} from './constants';
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import OpenAI from "openai";
import ChatCompletionMessage = OpenAI.ChatCompletionMessage;
import {URLs} from "@/lib/urls";

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
                description='List of all of your current applications.'
                icon={AppWindow}
                iconColor='text-violet-500'
                bgColor='bg-violet-500/10'
            />
            <div className='px-4 lg:px-8'>

            </div>
            <div className='space-y-4 mt-4'>

            </div>
        </div>
    );
};

export default ApplicationsPage;