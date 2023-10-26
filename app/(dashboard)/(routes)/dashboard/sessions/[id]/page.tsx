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
import {AppWindow, GalleryHorizontalEnd, Video, Flag} from "lucide-react";
import {EnvironmentEntityColors, FlagEntityColors, SessionEntityColors} from "@/lib/utils";
import {useRouter} from "next/navigation";

export default function Session(props: { params: { id: string } }) {
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
                title="session name"
                description="List of all of your sessions."
                icon={Video}
                iconColor={SessionEntityColors.TEXT}
                bgColor={SessionEntityColors.BACKGROUND}
                loading={loading}
            />
            <EntityPageContent
                entityId={props.params.id}
                goToEdit={() => router.push(`/dashboard/sessions/${props.params.id}/edit`)}
                type="Session"
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
                        title="flags"
                        value="42"
                        icon={Flag}
                        backgroundTwClass="bg-green-300"
                        borderTwClass="border-green-400"
                        iconColorTextTwClass="text-green-400"
                        positioningTwClasses="left-4 top-1"
                        onClick={() => router.push(`/dashboard/flags?sessionId=${props.params.id}`)}
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
