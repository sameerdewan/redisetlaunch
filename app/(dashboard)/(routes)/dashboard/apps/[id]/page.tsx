"use client";
import React, {useEffect, useState} from "react";
import {
    EntityCallout,
    EntityCalloutContainer,
    EntityPageContent,
    EntityPageDetails,
    EntityField,
    EntityValue,
    Page
} from "@/components/Page";
import Heading from "@/components/Heading";
import {AppWindow, CalendarDaysIcon, Flag, GalleryHorizontalEnd} from "lucide-react";
import {ApplicationEntityColors, EnvironmentEntityColors, FlagEntityColors} from "@/lib/utils";
import {useRouter} from "next/navigation";

export default function Application(props: { params: { id: string } }) {
    // State
    const [loading, setLoading] = useState(true);

    // Navigation
    const router = useRouter();

    // Effects
    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // User Interface
    return (
        <Page>
            <Heading
                title="app name"
                description="List of all of your applications."
                icon={AppWindow}
                iconColor={ApplicationEntityColors.TEXT}
                bgColor={ApplicationEntityColors.BACKGROUND}
                loading={loading}
            />
            <EntityPageContent
                entityId={props.params.id}
                goToEdit={() => router.push(`/dashboard/apps/${props.params.id}/edit`)}
                type="Application"
                loading={loading}
            >
                <EntityCalloutContainer>
                    <EntityCallout
                        title="envs"
                        value="7"
                        icon={GalleryHorizontalEnd}
                        backgroundTwClass={EnvironmentEntityColors.SECONDARY_BACKGROUND}
                        borderTwClass="border-orange-300"
                        iconColorTextTwClass="text-orange-300"
                        positioningTwClasses="left-4 top-1"
                        onClick={() => {}}
                    />
                    <EntityCallout
                        title="flags"
                        value="42"
                        icon={Flag}
                        backgroundTwClass="bg-green-300"
                        borderTwClass="border-green-400"
                        iconColorTextTwClass="text-green-400"
                        positioningTwClasses="left-4 top-1"
                        onClick={() => {}}
                    />
                    <EntityCallout
                        title="last updated"
                        value="02/16/2016"
                        icon={CalendarDaysIcon}
                        backgroundTwClass=""
                        borderTwClass="border-gray-200"
                        iconColorTextTwClass="text-gray-200"
                        positioningTwClasses="left-4 top-1"
                    />
                </EntityCalloutContainer>
                <EntityPageDetails>
                    <EntityField name="Description" />
                    <EntityValue value="flexible penguins dance rigidly down the block to watch the raindrops drop, their flippers fluttering with each step, their eyes twinkling with excitement."/>

                    <EntityField name="Created At" />
                    <EntityValue value="January 1, 1991 5:31PM GST"/>

                    <EntityField name="Created By" />
                    <EntityValue value="Sameer Dewan"/>

                    <EntityField name="Updated At" />
                    <EntityValue value="January 1, 1991 5:31PM GST"/>

                    <EntityField name="Updated By" />
                    <EntityValue value="Sameer Dewan"/>
                </EntityPageDetails>
            </EntityPageContent>
        </Page>
    );
}
