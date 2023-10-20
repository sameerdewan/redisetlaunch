import {BaseDataType} from "@/data/types";

export type Application = BaseDataType<{
    name: string;
    description: string;
    flagIds: string[];
    environmentIds: string[];
}>
