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
    const [data, setData] = useState();
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
            resolve({
                randomNumber: Math.random()
            });
        }, 1000));
        setData(data as any);
        setLoading(false);
    }


    // Effects
    useEffect(() => {
        query().finally();
    }, [dataUrl]);

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
                    onSearch={navigateToQuery}
                />
                <EntityGrid loading={loading} entities={data ?? []}/>
            </div>
        </div>
    );
}
