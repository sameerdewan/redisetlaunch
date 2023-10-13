import React from "react";
import {UserButton} from "@clerk/nextjs";
import {URLs} from "@/lib/urls";
import MobileSidebar from "@/components/MobileSidebar";

const Navbar: React.FC = () => {
    // Returned UI
    return (
        <div className='flex items-center p-4'>
            <MobileSidebar/>
            <div className='flex w-full justify-end'>
                <UserButton afterSignOutUrl={URLs.landing}/>
            </div>
        </div>
    );
};

export default Navbar;
