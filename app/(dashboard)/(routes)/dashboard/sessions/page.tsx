"use client";
import Heading from "@/components/Heading";
import {Video} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import {SessionEntityColors} from "@/lib/utils";
import PageSearch from "@/components/PageSearch";
import EntityGrid from "@/components/EntityGrid";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Page, PageContent} from "@/components/Page";

export default function Sessions() {
    // State
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Navigation
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();
    const dataUrl = params.get("dataUrl")!;

    // Refs
    const searchRef = useRef<HTMLInputElement>(null);

    // Methods
    const navigateToQuery = () => {
        if (searchRef?.current?.value && searchRef?.current?.value !== pathname) {
            router.push(`/dashboard/sessions/?dataUrl=${searchRef?.current?.value}`);
        } else if (pathname !== "/dashboard/sessions") {
            router.push("/dashboard/sessions")
        }
    }

    const query = async () => {
        setLoading(true);
        const data = await new Promise(resolve => setTimeout(() => {
            resolve(new Array(100).fill({
                id: Math.floor(Math.random()).toString(),
                name: "session name",
                description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like"
            }));
        }, 1000));
        setSessions(data as any);
        setLoading(false);
    }


    // Effects
    useEffect(() => {
        query().finally();
    }, [dataUrl]);

    // User Interface
    return (
        <Page>
            <Heading
                title="Sessions"
                description="List of all of your sessions."
                icon={Video}
                iconColor={SessionEntityColors.TEXT}
                bgColor={SessionEntityColors.BACKGROUND}
            />
            <PageContent>
                <PageSearch
                    ref={searchRef}
                    inputProps={{
                        placeholder: "Search Sessions..."
                    }}
                    onSearch={navigateToQuery}
                />
                <EntityGrid
                    loading={loading}
                    entities={sessions ?? []}
                    entityCardColors={SessionEntityColors}
                    icon={Video}
                    type="Session"
                    goToEntity={{
                        main: (id: string) => router.push(`/dashboard/sessions/${id}`),
                        edit: (id: string) => router.push(`/dashboard/sessions/${id}/edit`)
                    }}
                />
            </PageContent>
        </Page>
    );
}
