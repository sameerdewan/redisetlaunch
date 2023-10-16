import {Schema} from "redis-om";
import {Nullable} from "@/lib/utils";

export type Subscription = Nullable<{
    id: string;
    userId: string;
    subscriptionKey: string;
    reads: number;
    maxReads: number;
    writes: number;
    maxWrites: number;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    stripePriceId?: string;
    stripeCurrentPeriodEnd?: string;
    createdAt: Date;
    updatedAt: Date;
}>

export const SubscriptionSchema = new Schema('subscription', {
    userId: {
        type: 'string',
        indexed: true
    },
    subscriptionKey: {
        type: 'string',
        indexed: true
    },
    reads: {
        type: 'number'
    },
    maxReads: {
        type: 'number'
    },
    writes: {
        type: 'number'
    },
    maxWrites: {
        type: 'number'
    },
    stripeCustomerId: {
        type: 'string',
        indexed: true
    },
    stripeSubscriptionId: {
        type: 'string',
        indexed: true
    },
    stripePriceId: {
        type: 'string',
        indexed: true
    },
    stripeCurrentPeriodEnd: {
        type: 'string',
        indexed: true
    },
    createdAt: {
        type: 'date'
    },
    updatedAt: {
        type: 'date'
    }
}, {
    dataStructure: 'JSON',
    indexName: 'subscription-index',
    indexHashName: 'subscription-index-hash'
});
