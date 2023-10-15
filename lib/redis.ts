import {Redis} from "@upstash/redis";

declare global {
    var redisClient: Redis | undefined;
}

const redis = globalThis.redisClient || new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

if (process.env.NODE_ENV !== 'production') {
    globalThis.redisClient = redis;
}

export type RedisCachedData<T> = {
    data: T;
    type: 'string' | 'number' | 'boolean' | 'json';
    version: number;
} | null;

export default redis;

export abstract class RedisCacheClient {
    private static constructRedisKey: (environmentId: string, userId: string) => string;
}
