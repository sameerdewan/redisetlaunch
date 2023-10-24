import React from "react";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {preventDefault} from "@/lib/utils";

type Props = {
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    onSearch: () => void;
}

const PageSearch = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    // User Interface
    return (
        <section className="border-gray-200 bg-white border-b-2 rounded-xl mb-4 p-3">
            <form className="flex" onSubmit={preventDefault(props.onSearch)}>
                <input className="bg-white focus-visible:outline-none flex-1" {...props.inputProps} ref={ref}/>
                <Button className="flex-3" type="submit">
                    <Search/>
                </Button>
            </form>
        </section>
    );
});

PageSearch.displayName = "PageSearch";

export default PageSearch;