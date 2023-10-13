import React from 'react';
import Link from "next/link";
import {URLs} from "@/lib/urls";
import {Button} from "@/components/ui/button";

const LandingPage: React.FC = () => {
    // Returned UI
    return (
        <div>
            Landing Page (Unprotected)
            <div>
                <Link href={URLs.signIn}>
                    <Button>Sign In</Button>
                </Link>
                <Link href={URLs.signUp}>
                    <Button>Sign Up</Button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
