import React from "react";
import {UserButton} from "@clerk/nextjs";
import {URLs} from "@/lib/urls";

const DashboardPage: React.FC = () => {
    // Returned UI
    return (
        <div>
            <p>Dashboard Page (Protected)</p>
            <UserButton afterSignOutUrl={URLs.landing}/>
        </div>
    );
};

export default DashboardPage;
