import {Schema} from "redis-om";

const Flag = new Schema('flag', {
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

export default Flag;
