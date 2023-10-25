"use client";
import React from "react";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {LucideIcon, Pencil, PinOff, RefreshCw, Trash} from "lucide-react";
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

export function EntityCalloutContainer(props: React.PropsWithChildren) {
    // User Interface
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-1 gap-4 mb-8'>{props.children}</div>
    );
}

export function EntityCallout(props: {
    backgroundTwClass: string;
    borderTwClass: string;
    iconColorTextTwClass: string;
    icon: LucideIcon;
    positioningTwClasses: string;
    onClick?: (...args: any) => any;
    title: string;
    value: string;
}) {
    // User Interface
    return (
        <Card
            className={`${props.backgroundTwClass} ${props.borderTwClass} border-2 flex flex-col justify-center items-center text-center h-40 relative overflow-clip rounded-lg ${typeof props.onClick === "function" ? "cursor-pointer hover:shadow-md transition" : ""}`}>
            <p className="font-bold text-2xl z-20">{props.title}</p>
            <div className='text-xl font-bold z-20'>{props.value}</div>
            <props.icon className={`absolute h-44 w-44 ${props.positioningTwClasses} ${props.iconColorTextTwClass} z-10`}/>
        </Card>
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
                <section className='max-sm:flex max-sm:flex-col-reverse'>{props.children}</section>
                <Button
                    className='sm:visible md:hidden bg-white text-red-400 border-red-400 border-2 hover:bg-red-500 hover:border-red-500 hover:text-white w-full my-8'
                >
                    <Trash/>&nbsp;Delete Application
                </Button>
            </Card>
        </PageContent>
    );
}

export function EntityPageDetails(props: React.PropsWithChildren) {
    // User Interface
    return (
        <div className='max-sm:mb-8'>{props.children}</div>
    );
}

export function EntityField(props: {name: string}) {
    // User Interface
    return (
        <div className='text-md font-semibold mt-4'>{props.name}</div>
    );
}

export function EntityValue(props: {value: any}) {
    // User Interface
    return (
        <p className="text-muted-foreground">{props.value}</p>
    );
}
