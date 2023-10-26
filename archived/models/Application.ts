import {Schema} from "redis-om";
import {Nullable} from "@/lib/utils";

export type Application = Nullable<{
    id: string;
    userId: string;
    name: string;
    description: string;
    flagIds: string[];
    environmentIds: string[];
    createdAt: Date;
    updatedAt: Date;
}>

export const ApplicationSchema = new Schema('application', {
    userId: {
        type: 'string'
    },
    name: {
        type:'string',
        indexed: true
    },
    description: {
        type: 'string'
    },
    flagIds: {
        type: 'string[]'
    },
    environmentIds: {
        type: 'string[]'
    },
    createdAt: {
        type: 'date',
        sortable: true,
    },
    updatedAt: {
        type: 'date',
        sortable: true
    }
}, {
    dataStructure: 'JSON',
    indexName: 'application-index',
    indexHashName: 'application-index-hash'
});
