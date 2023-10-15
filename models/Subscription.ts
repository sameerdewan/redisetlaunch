import {Schema} from "redis-om";

const Subscription = new Schema('subscription', {
    userId: {
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

export default Subscription;
