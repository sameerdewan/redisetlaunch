import {Nullable} from "@/lib/utils";

export enum State {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    NEUTRAL = 'NEUTRAL'
}

export type BaseDataType<T extends Object> = T & {
    id: string;
    name: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type BaseEntity = {
    organizationId: string;
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    createdByName: string;
    createdById: string;
    updatedAt: Date;
    updatedByName?: string;
    updatedById?: string;
    pinned: boolean;
}

export interface BaseParityInterface<T> {
    getEntitiesAtState(state: State): Promise<Nullable<T>[]>;

    setEntitiesToNeutral(entities: T[]): Promise<void>;
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


