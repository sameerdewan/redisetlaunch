import React from "react";
import {LucideIcon, XCircle} from "lucide-react";
import {Badge} from "@/components/ui/badge";

type Props = {
    icon: LucideIcon;
    label: string;
    onRemove: (...args: any[]) => any;
    textTwClass: string;
    bgTwClass: string;
    hoverBgTwClass: string;
}

export default function Tag(props: Props) {
    // User Interface
    return (
        <Badge className={`m-1 ${props.bgTwClass} ${props.textTwClass} hover:${props.bgTwClass} p-0`}>
            <section className="flex p-1">
                <props.icon className="h-4 w-4 mr-1"/>
                <span className="font-medium">{props.label}</span>
            </section>
            <XCircle className={`cursor-pointer hover:${props.hoverBgTwClass} rounded-full transition`} />
        </Badge>
    );
}
