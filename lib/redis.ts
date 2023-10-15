import {createClient} from 'redis';

declare global {
    var clientRedis: any;
}

const redis = globalThis.clientRedis || createClient({
    url: process.env.UPSTASH_REDIS_REST_URL!
});

if (process.env.NODE_ENV !== 'production') {
    globalThis.clientRedis = redis;
}

export default redis;
