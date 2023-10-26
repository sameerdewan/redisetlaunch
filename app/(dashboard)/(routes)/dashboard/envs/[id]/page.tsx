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
import {GalleryHorizontalEndIcon, CalendarDaysIcon, Flag, AppWindow, GalleryHorizontalEnd, Video} from "lucide-react";
import {ApplicationEntityColors, EnvironmentEntityColors} from "@/lib/utils";
import {useRouter} from "next/navigation";

export default function Environment(props: { params: { id: string } }) {
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
                title="env name"
                description="List of all of your environments."
                icon={GalleryHorizontalEnd}
                iconColor={EnvironmentEntityColors.TEXT}
                bgColor={EnvironmentEntityColors.BACKGROUND}
                loading={loading}
            />
            <EntityPageContent
                entityId={props.params.id}
                goToEdit={() => router.push(`/dashboard/envs/${props.params.id}/edit`)}
                type="Environment"
                loading={loading}
            >
                <EntityCalloutContainer>
                    <EntityCallout
                        title="app"
                        value="ID:123123890"
                        icon={AppWindow}
                        backgroundTwClass="bg-[#A9B7DA]/50"
                        borderTwClass="border-[#A9B7DA]"
                        iconColorTextTwClass="text-[#A9B7DA]"
                        positioningTwClasses="left-4 top-1"
                        onClick={() => router.push(`/dashboard/apps/1`)}
                    />
                    <EntityCallout
                        title="flags"
                        value="42"
                        icon={Flag}
                        backgroundTwClass="bg-green-300"
                        borderTwClass="border-green-400"
                        iconColorTextTwClass="text-green-400"
                        positioningTwClasses="left-4 top-1"
                        onClick={() => router.push(`/dashboard/flags?envId=${props.params.id}`)}
                    />
                    <EntityCallout
                        title="sessions"
                        value="216"
                        icon={Video}
                        backgroundTwClass="bg-pink-300"
                        borderTwClass="border-pink-500"
                        iconColorTextTwClass="text-pink-400"
                        positioningTwClasses="left-4 -top-2 h-56 w-56"
                        onClick={() => router.push(`/dashboard/sessions?envId=${props.params.id}`)}
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
