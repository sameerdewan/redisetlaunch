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
import {Flag as FlagIcon, AppWindow, GalleryHorizontalEnd, Video} from "lucide-react";
import {EnvironmentEntityColors, FlagEntityColors} from "@/lib/utils";
import {useRouter} from "next/navigation";

export default function Flag(props: { params: { id: string } }) {
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
                title="flag name"
                description="List of all of your flags."
                icon={FlagIcon}
                iconColor={FlagEntityColors.TEXT}
                bgColor={FlagEntityColors.BACKGROUND}
                loading={loading}
            />
            <EntityPageContent
                entityId={props.params.id}
                goToEdit={() => router.push(`/dashboard/flags/${props.params.id}/edit`)}
                type="Flag"
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
                        title="env"
                        value="ID:123123890"
                        icon={GalleryHorizontalEnd}
                        backgroundTwClass={EnvironmentEntityColors.SECONDARY_BACKGROUND}
                        borderTwClass="border-orange-300"
                        iconColorTextTwClass="text-orange-300"
                        positioningTwClasses="left-4 top-1"
                        onClick={() => router.push(`/dashboard/envs/1`)}
                    />
                    <EntityCallout
                        title="sessions"
                        value="216"
                        icon={Video}
                        backgroundTwClass="bg-pink-300"
                        borderTwClass="border-pink-500"
                        iconColorTextTwClass="text-pink-400"
                        positioningTwClasses="left-4 -top-2 h-56 w-56"
                        onClick={() => router.push(`/dashboard/sessions?flagId=${props.params.id}`)}
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
