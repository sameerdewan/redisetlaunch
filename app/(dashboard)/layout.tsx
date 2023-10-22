import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout: React.FC<React.PropsWithChildren> = ({children}) => {
    // Returned UI
    return (
        <div className='h-full relative bg-gray-50'>
            <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md-inset-y-0 z-[80]'>
                <Sidebar/>
            </div>
            <main className='md:pl-72'>
                <Navbar/>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
