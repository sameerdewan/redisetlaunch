"use client";
import Heading from "@/components/Heading";
import {AppWindow} from "lucide-react";
import React, {Suspense, useCallback, useEffect, useRef, useState} from "react";
import {ApplicationEntityColors} from "@/lib/utils";
import PageSearch from "@/components/PageSearch";
import EntityGrid from "@/components/EntityGrid";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function Applications() {
    // State
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Navigation
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();
    const dataUrl = params.get("dataUrl")!;

    // Refs
    const searchRef = useRef<HTMLInputElement>(null);

    // Methods
    const fetchAndNavigate = async (url: string) => {
        setLoading(true);
        if (url && url !== pathname) {
            router.push(`/dashboard/apps?dataUrl=${url}`);
        } else if (pathname !== "/dashboard/apps") {
            router.push("/dashboard/apps");
        }
        const res = await fetch(url ?? "https://dummyjson.com/products/1");
        const fetchedData = await res.json();
        setData(fetchedData);
        setLoading(false);
    };

    const search = async () => {
        const url = searchRef?.current?.value!;
        await fetchAndNavigate(url);
    };

    // Effects
    useEffect(() => {
        fetchAndNavigate(dataUrl).finally();
    }, [dataUrl, pathname, router]); // eslint-disable-line

    // User Interface
    return (
        <div>
            <Heading
                title="Applications"
                description="List of all of your applications."
                icon={AppWindow}
                iconColor={ApplicationEntityColors.TEXT}
                bgColor={ApplicationEntityColors.BACKGROUND}
            />
            <div className="px-4 lg:px-8">
                <PageSearch
                    ref={searchRef}
                    inputProps={{
                        placeholder: "Search Applications..."
                    }}
                    onSearch={search}
                />
                <EntityGrid loading={loading} entities={data ?? []}/>
            </div>
        </div>
    );
}
