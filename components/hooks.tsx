import {useEffect, useState} from "react";

export function useRender(): [boolean, () => void] {
    // State
    const [render, setRender] = useState<boolean>(true);

    // Methods
    const rerender = () => {
        setRender(false);
        setTimeout(() => setRender(true));
    };

    // Hook Value
    return [render, rerender];
}

export function useMounted(): boolean {
    // State
    const [mounted, setMounted] = useState<boolean>(false);

    // Effects
    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        };
    }, []);

    return mounted;
}
