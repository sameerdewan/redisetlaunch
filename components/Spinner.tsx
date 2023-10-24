import {Loader} from "lucide-react";
import React from "react";

export default function Spinner() {
    return (
        <div className='flex justify-center relative'>
            <Loader className='align-middle absolute top-[20vh] h-16 w-16 motion-safe:animate-spin'/>
        </div>
    )
}
