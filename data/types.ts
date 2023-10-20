import {Nullable} from "@/lib/utils";

enum State {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    NEUTRAL = 'NEUTRAL'
}

type BaseDataType<T extends Object> = T & {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    state: State;
}

export type Application = BaseDataType<{
    name: string;
    description: string;
    flagIds: string[];
    environmentIds: string[];
}>

export type Environment = BaseDataType<{
    name: string;
    userId: string;
    description: string;
    applicationId: string;
    flagIds: string[];
}>;


