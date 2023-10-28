import React from "react";
import {URLs} from "@/lib/urls";
import MobileSidebar from "@/components/MobileSidebar";

const Navbar: React.FC = () => {
    // Returned UI
    return (
        <div className='flex items-center p-4'>
            <MobileSidebar/>
        </div>
    );
};

export default Navbar;
