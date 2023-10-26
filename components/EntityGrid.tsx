import React from "react";
import Spinner from "@/components/Spinner";
import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {AlarmClock, ArrowRight, EditIcon, LucideIcon, MoreVertical, Pin} from "lucide-react";
import {Button} from "@/components/ui/button";
import {BaseEntity} from "@/archived/data/types";
import {EntityAttribute, EntityCardColors, truncate} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

type EntityGridProps = {
    entities: BaseEntity[];
    goToEntity: {
        main: (id: string) => any;
        edit: (id: string) => any;
    };
    icon: LucideIcon;
    entityCardColors: EntityCardColors;
    entityAttributes?: EntityAttribute[];
    loading: boolean;
    type: string;
}

export default function EntityGrid(props: EntityGridProps) {
    // User Interface
    if (props.loading) {
        return <Spinner/>;
    }
    return (
        <div className="grid xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-4 sm:grid-cols-1 xs:grid-cols-2 gap-4">
            {
                props.entities.map((entity) => (
                    <Card key={Math.random()}
                          className='flex flex-col'
                    >
                        <div className="flex items-center space-x-4 p-4">
                            <Avatar className={props.entityCardColors.BACKGROUND}>
                                <AvatarFallback
                                    className={`${props.entityCardColors.BACKGROUND} ${props.entityCardColors.TEXT}`}>
                                    {<props.icon/>}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-bold">{truncate(entity.name, 21)}</p>
                                <p className="text-muted-foreground text-sm h-14 max-h-14 min-h-14">
                                    {truncate(entity.description, 74)}
                                </p>
                            </div>
                        </div>
                        <section className="grid grid-cols-2 pl-5">
                            {props.entityAttributes?.map((entityAttribute, i) => (
                                <div key={entityAttribute.value} className="flex w-full">
                                    <div className="self-center h-7 flex mb-3 items-center">
                                        <Avatar className={`${entityAttribute.bgTwClass} h-7 w-7`}>
                                            <AvatarFallback
                                                className={`${entityAttribute.bgTwClass} ${entityAttribute.textTwClass}`}>
                                                <entityAttribute.icon className='h-4 w-4'/>
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="w-24 text-muted-foreground text-sm pl-1 pt-1">
                                            {truncate(entityAttribute.value, 10)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <div className={`${props.entityCardColors.BACKGROUND} p-2 flex justify-between`}>
                            <DropdownMenu dir="rtl">
                                <DropdownMenuTrigger>
                                    <Button
                                        className={`${props.entityCardColors.SECONDARY_BACKGROUND} hover:${props.entityCardColors.PRIMARY_BACKGROUND}`}
                                        size='sm'>
                                        <MoreVertical/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => props.goToEntity.edit(entity.id)}>
                                        <EditIcon className="h-4"/>Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Pin className="h-4"/>Pin
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button onClick={() => props.goToEntity.main(entity.id)}
                                    className={`${props.entityCardColors.PRIMARY_BACKGROUND} hover:${props.entityCardColors.PRIMARY_BACKGROUND_HOVER}`}
                                    size='sm'>
                                Go to {props.type}
                                <ArrowRight/>
                            </Button>
                        </div>
                    </Card>
                ))
            }
        </div>
    );
}
