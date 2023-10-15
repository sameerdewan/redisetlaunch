import {Schema} from "redis-om";
import {Nullable} from "@/lib/utils";

export enum FlagType {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    JSON = 'json'
}

export type Flag = Nullable<{
    id: string;
    userId: string;
    name: string;
    description?: string;
    value: string;
    valueType: FlagType;
    applicationId: string;
    environmentId: string;
    createdAt: Date;
    updatedAt: Date;
}>

export const FlagSchema = new Schema('flag', {
    userId: {
        type: 'string'
    },
    name: {
        type: 'string',
        indexed: true
    },
    description: {
        type: 'string'
    },
    value: {
        type: 'string'
    },
    valueType: {
        type: 'string'
    },
    applicationId: {
        type: 'string'
    },
    environmentId: {
        type: 'string'
    },
    createdAt: {
        type: 'date',
        sortable: true
    },
    updatedAt: {
        type: 'date',
        sortable: true
    }
}, {
    dataStructure: 'JSON',
    indexName: 'flag-index',
    indexHashName: 'flag-index-hash'
});
