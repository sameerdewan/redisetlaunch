import React from "react";
import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";

interface Props {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

const Heading: React.FC<Props> = (props) => {
    // Returned UI
    return (
        <div className='px-4 lg:px-8 flex items-center gap-x-3 mb-4'>
            <div className={cn('p-2 w-fit rounded-md', props.bgColor)}>
                <props.icon className={cn('w-10 h-10', props.iconColor)}/>
            </div>
            <div>
                <h2 className='text-3xl font-bold'>{props.title}</h2>
                <p className='text-sm text-muted-foreground'>{props.description}</p>
            </div>
        </div>
    );
};

export default Heading;