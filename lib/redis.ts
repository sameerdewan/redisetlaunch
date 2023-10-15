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

/*
* Every RedisRepositoryClient must implement its own methods
* that ensure data stability as Redis does not enforce relationships.
* */
export interface RedisRepositoryClient {}

export default redis;
