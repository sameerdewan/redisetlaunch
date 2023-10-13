import React from "react";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {UserButton} from "@clerk/nextjs";
import {URLs} from "@/lib/urls";

const Navbar: React.FC = () => {
    // Returned UI
    return (
        <div className='flex items-center p-4'>
            <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu/>
            </Button>
            <div className='flex w-full justify-end'>
                <UserButton afterSignOutUrl={URLs.landing}/>
            </div>
        </div>
    );
};

export default Navbar;
