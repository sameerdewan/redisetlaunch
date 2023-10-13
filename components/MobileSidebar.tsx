"use client";
import React from "react";
import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";

const MobileSidebar: React.FC = () => {
    // State
    const [mounted, setMounted] = React.useState<boolean>(false);

    // Effects
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Returned UI
    if (!mounted) return <React.Fragment/>;

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant='ghost' size='icon' className='md:hidden'>
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <Sidebar/>
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
