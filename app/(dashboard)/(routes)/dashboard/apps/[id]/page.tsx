"use client";
import React, {useEffect, useState} from "react";
import {EntityPageContent, Page} from "@/components/Page";
import Heading from "@/components/Heading";
import {AppWindow} from "lucide-react";
import {ApplicationEntityColors} from "@/lib/utils";
import {useRouter} from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Application(props: { params: { id: string } }) {
    // State
    const [loading, setLoading] = useState(true);

    // Navigation
    const router = useRouter();

    // Effects
    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 5000);
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

            </EntityPageContent>
        </Page>
    );
}
