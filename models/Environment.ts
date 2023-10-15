import {Schema} from "redis-om";

const Environment = new Schema('environment', {
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

export default Environment;
