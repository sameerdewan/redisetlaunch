import Heading from "@/components/Heading";
import {Flag} from "lucide-react";
import React from "react";

function EditFlag() {
    // Returned UI
    return (
        <div>
            <Heading
                title='flag name'
                description='flexible penguins dance rigidly down the block to watch the raindrops drop'
                icon={Flag}
                iconColor='text-green-700'
                bgColor='bg-green-300'
            />
        </div>
    );
}

export default EditFlag;