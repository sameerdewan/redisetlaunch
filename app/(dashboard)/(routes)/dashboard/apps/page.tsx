"use client";
import Heading from "@/components/Heading";
import {AlarmClock, AppWindow, Braces, Flag, GalleryHorizontalEnd, Video} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import {ApplicationEntityColors, EnvironmentEntityColors, FlagEntityColors, SessionEntityColors} from "@/lib/utils";
import PageSearch from "@/components/PageSearch";
import EntityGrid from "@/components/EntityGrid";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {EntityAddButton, Page, PageContent} from "@/components/Page";
import Tag from "@/components/Tag";

export default function Applications() {
    // State
    const [apps, setApps] = useState([]);
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
            router.push(`/dashboard/apps/?dataUrl=${searchRef?.current?.value}`);
        } else if (pathname !== "/dashboard/apps") {
            router.push("/dashboard/apps")
        }
    }

    const query = async () => {
        setLoading(true);
        const data = await new Promise(resolve => setTimeout(() => {
            resolve(new Array(100).fill({
                id: Math.floor(Math.random()).toString(),
                name: "app name",
                description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like"
            }));
        }, 1000));
        setApps(data as any);
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
                title="Applications"
                description="List of all of your applications."
                icon={AppWindow}
                iconColor={ApplicationEntityColors.TEXT}
                bgColor={ApplicationEntityColors.BACKGROUND}
            />
            <PageContent>
                <section className="mb-3 flex flex-wrap">
                    <Tag
                        icon={AppWindow}
                        label="ID#13213123131"
                        onRemove={() => {
                        }}
                        textTwClass={ApplicationEntityColors.TEXT}
                        bgTwClass={ApplicationEntityColors.BACKGROUND}
                        hoverBgTwClass={ApplicationEntityColors.SECONDARY_BACKGROUND_HOVER}
                    />
                    <Tag
                        icon={GalleryHorizontalEnd}
                        label="ID#13213123131"
                        onRemove={() => {
                        }}
                        textTwClass={EnvironmentEntityColors.TEXT}
                        bgTwClass={EnvironmentEntityColors.SECONDARY_BACKGROUND}
                        hoverBgTwClass={EnvironmentEntityColors.SECONDARY_BACKGROUND_HOVER}
                    />
                    <Tag
                        icon={Flag}
                        label="ID#13213123131"
                        onRemove={() => {
                        }}
                        textTwClass="text-green-900"
                        bgTwClass={FlagEntityColors.BACKGROUND}
                        hoverBgTwClass={FlagEntityColors.SECONDARY_BACKGROUND_HOVER}
                    />
                    <Tag
                        icon={Video}
                        label="ID#13213123131"
                        onRemove={() => {
                        }}
                        textTwClass={SessionEntityColors.TEXT}
                        bgTwClass="bg-pink-200"
                        hoverBgTwClass={SessionEntityColors.SECONDARY_BACKGROUND_HOVER}
                    />
                </section>
                <PageSearch
                    ref={searchRef}
                    inputProps={{
                        placeholder: "Search Applications..."
                    }}
                    onSearch={navigateToQuery}
                />
                <EntityGrid
                    loading={loading}
                    entities={apps ?? []}
                    entityCardColors={ApplicationEntityColors}
                    icon={AppWindow}
                    type="App"
                    goToEntity={{
                        main: (id: string) => router.push(`/dashboard/apps/${id}`),
                        edit: (id: string) => router.push(`/dashboard/apps/${id}/edit`)
                    }}
                    entityAttributes={[
                        {
                            icon: AppWindow,
                            value: "dsadadasdadsadasda",
                            textTwClass: ApplicationEntityColors.TEXT,
                            bgTwClass: ApplicationEntityColors.BACKGROUND,
                        },
                        {
                            icon: GalleryHorizontalEnd,
                            value: "dsadadasdadsadasda",
                            textTwClass: EnvironmentEntityColors.TEXT,
                            bgTwClass: EnvironmentEntityColors.BACKGROUND,
                        },
                        {
                            icon: Flag,
                            value: "dsadadasdadsadasda",
                            textTwClass: "text-green-900",
                            bgTwClass: FlagEntityColors.BACKGROUND,
                        },
                        {
                            icon: Video,
                            value: "dsadadasdadsadasda",
                            textTwClass: SessionEntityColors.TEXT,
                            bgTwClass: SessionEntityColors.BACKGROUND,
                        },
                        {
                            icon: AlarmClock,
                            value: "dsadadasdadsadasda",
                            textTwClass: "text-cyan-800",
                            bgTwClass: "bg-cyan-300",
                        },
                        {
                            icon: Braces,
                            value: "dsadadasdadsadasda",
                            textTwClass: "text-zinc-700",
                            bgTwClass: "bg-zinc-200",
                        }
                    ]}
                />
            </PageContent>
            <EntityAddButton />
        </Page>
    );
}
