import React from "react";
import {UserButton} from "@clerk/nextjs";
import {URLs} from "@/lib/urls";

const DashboardPage: React.FC = () => {
    // Returned UI
    return (
        <div>
            <p>Dashboard Page (Protected)</p>
        </div>
    );
};

export default DashboardPage;
