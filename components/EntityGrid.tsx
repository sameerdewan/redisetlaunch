import React from "react";
import Spinner from "@/components/Spinner";

type EntityGridProps = {
    entities: any[];
    loading: boolean;
}

export default function EntityGrid(props: EntityGridProps) {
    // User Interface
    if (props.loading) {
        return <Spinner/>;
    }
    return (
        <div className="grid xl:grid-cols-3 xl:gap-6 lg:grid-cols-2 lg:gap-4 sm:grid-cols-2 gap-4">
            <div className="overflow-x-clip">
                {JSON.stringify(props.entities ?? {}, null, 2)}
            </div>
        </div>
    );
}
