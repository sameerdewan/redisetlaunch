import {Schema} from "redis-om";

const Application = new Schema('application', {
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

export default Application;
