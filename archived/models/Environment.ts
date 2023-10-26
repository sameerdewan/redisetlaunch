import {Schema} from "redis-om";
import {Nullable} from "@/lib/utils";

export type Environment = Nullable<{
    id: string;
    name: string;
    userId: string;
    description: string;
    applicationId: string;
    flagIds: string[];
    createdAt: Date;
    updatedAt: Date;
}>;

export const EnvironmentSchema = new Schema('environment', {
    name: {
        type: 'string',
        indexed: true
    },
    userId: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    applicationId: {
        type: 'string'
    },
    flagIds: {
        type: 'string[]'
    },
    createdAt: {
        type: 'date'
    },
    updatedAt: {
        type: 'date'
    }
}, {
    dataStructure: 'JSON',
    indexName: 'environment-index',
    indexHashName: 'environment-hash-index'
});
