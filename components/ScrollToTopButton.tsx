"use client"

import React from "react"
import {ChevronUp} from "lucide-react"
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

const ScrollToTopButton = () => {
    // State
    const [isVisible, setIsVisible] = React.useState<boolean>(false)

    // Effects
    React.useEffect(() => {
        const toggleVisibility = () => {
            window.scrollY > 1 ? setIsVisible(true) : setIsVisible(false)
        }
        window.addEventListener("scroll", toggleVisibility)

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, []);

    // Returned UI
    return (
        <Button
            className={cn(
                'fixed bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200',
                isVisible ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => {
                isVisible &&
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            }}>
            <ChevronUp/>
        </Button>
    )
}

export default ScrollToTopButton