"use client";
import React from "react";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Pencil, PinOff, RefreshCw, Trash} from "lucide-react";
import Spinner from "@/components/Spinner";

export function Page(props: React.PropsWithChildren) {
    // User Interface
    return (
        <div className="min-h-screen">{props.children}</div>
    );
}

export function PageContent(props: React.PropsWithChildren) {
    // User Interface
    return (
        <div className="px-4 lg:px-8 pb-16">{props.children}</div>
    );
}

export function EntityPageContent(
    props: React.PropsWithChildren & {
        type: string;
        entityId: string;
        goToEdit: () => void;
        loading: boolean;
    }
) {
    // User Interface
    if (props.loading) {
        return <Spinner/>;
    }
    return (
        <PageContent>
            <Card className="mt-4 p-4">
                <section className='flex justify-between mb-8'>
                    <Button
                        className='max-sm:hidden bg-white text-red-400 border-red-400 border-2 hover:bg-red-500 hover:border-red-500 hover:text-white'
                    >
                        <Trash/>&nbsp;Delete {props.type}
                    </Button>
                    <article className='flex max-sm:justify-between max-sm:w-full'>
                        <Button
                            size='icon'
                            className='mr-2 bg-white border-2 border-black text-black hover:bg-gray-300'
                        >
                            <RefreshCw/>
                        </Button>
                        <div className='flex mr-2'>
                            <Button
                                size='icon'
                                className='mr-2 bg-white border-2 border-black text-black hover:bg-gray-300'
                            >
                                <PinOff/>
                            </Button>
                            <Button onClick={props.goToEdit}>
                                <Pencil/>&nbsp;Edit {props.type}
                            </Button>
                        </div>
                    </article>
                </section>
                {props.children}
                <Button
                    className='sm:visible md:hidden bg-white text-red-400 border-red-400 border-2 hover:bg-red-500 hover:border-red-500 hover:text-white w-full my-8'
                >
                    <Trash/>&nbsp;Delete Application
                </Button>
            </Card>
        </PageContent>
    );
}
