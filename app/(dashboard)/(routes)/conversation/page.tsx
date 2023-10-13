import React from "react";
import Heading from "@/components/Heading";
import {MessageSquare} from "lucide-react";

const ConversationPage: React.FC = () => {
    // Returned UI
    return (
        <div>
            <Heading
                title='Conversation'
                description='Our most advanced conversation model.'
                icon={MessageSquare}
                iconColor='text-violet-500'
                bgColor='bg-violet-500/10'
            />
            <div className='px-4 lg:px-8'>

            </div>
        </div>
    );
};

export default ConversationPage;