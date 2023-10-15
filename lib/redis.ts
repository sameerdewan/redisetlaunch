import {createClient} from 'redis';
import {Repository, Schema} from "redis-om";

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
export class RedisRepositoryClient {
    repository: Repository;
    name: string;
    indexCreated: boolean = false;
    pollIntervalMs: 50 = 50;

    constructor(name: string, schema: Schema) {
        this.name = name;
        this.repository = new Repository(schema, redis);
        this.repository
            .createIndex()
            .then(() => {
                this.indexCreated = true;
            });
    }

    private async *_waitForRedisIndexCreated(): AsyncGenerator<void> {
        while (!this.indexCreated) {
            // Wait for 10ms before checking again if b is true
            await new Promise((resolve) => setTimeout(resolve, this.pollIntervalMs));
        }
        yield;
    }

    public async waitForRedisIndexCreated() {
        for await (const _ of this._waitForRedisIndexCreated()) {
            console.log('Waiting for Redis index creation for repository: ' + this.name);
        }
    }
}

export default redis;
