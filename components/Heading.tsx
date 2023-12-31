import React from "react";
import {Clock, LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

interface Props {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
    flagHeading?: 'live' | 'scheduled' | undefined;
    loading?: boolean;
}

const Heading: React.FC<Props> = (props) => {
    // Returned UI
    if (props.loading) {
        return (
            <div className='px-4 lg:px-8 flex items-center gap-x-3 mb-4'>
                <div className="flex items-center space-x-4">
                    <div className={cn('p-2 w-fit rounded-md relative', props.bgColor)}>
                        <props.icon className={cn('w-10 h-10', props.iconColor)}/>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-[250px] bg-zinc-300" />
                        <Skeleton className="h-5 w-[200px] bg-zinc-300" />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='px-4 lg:px-8 flex items-center gap-x-3 mb-4'>
            <div className={cn('p-2 w-fit rounded-md relative', props.bgColor)}>
                <props.icon className={cn('w-10 h-10', props.iconColor)}/>
                {/*<div className='h-5 w-5 bg-red-500 absolute rounded-full -top-2 -right-2'/>*/}
                {/*<Clock className='h-5 w-5 bg-gray-200 absolute rounded-full -top-2 -right-2'/>*/}
            </div>
            <div>
                <h2 className='text-3xl font-bold'>{props.title}</h2>
                <p className='text-sm text-muted-foreground'>{props.description}</p>
            </div>
        </div>
    );
};

export default Heading;