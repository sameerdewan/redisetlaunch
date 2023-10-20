import {createClient} from 'redis';
import {EntityId, FieldDefinition, Repository, Schema} from "redis-om";

declare global {
    var clientRedis: any;
}

const redis = globalThis.clientRedis || createClient({
    url: process.env.UPSTASH_REDIS_REST_URL!
});

if (process.env.NODE_ENV !== 'production') {
    globalThis.clientRedis = redis;
}

type TypedSchemaDefinition<T> = Record<keyof T, FieldDefinition>;

/*
* Every RedisRepositoryClient must implement its own methods
* that ensure data stability as Redis does not enforce relationships.
* Prior to returning a redis retrieved object, return it using this.setId
* which assigns 'id' on the object to equal the string at the [EntityID].
* */
export class RedisRepositoryClient<T> {
    repository: Repository;
    name: string;
    schema: Schema;
    indexCreated: boolean = false;
    pollIntervalMs: 50 = 50;

    constructor(name: string, schemaDefinition: TypedSchemaDefinition<T>) {
        this.name = name;
        this.schema = new Schema(this.name, schemaDefinition, {
            dataStructure: 'JSON',
            indexName: `${this.name}-index`,
            indexHashName: `${this.name}-index-hash`
        })
        this.repository = new Repository(this.schema, redis);
        this.repository
            .createIndex()
            .then(() => {
                this.indexCreated = true;
            });
    }

    private async *_waitForRedisIndexCreated(): AsyncGenerator<void> {
        while (!this.indexCreated) {
            // Wait for ms before checking again if indexCreated is true
            await new Promise((resolve) => setTimeout(resolve, this.pollIntervalMs));
        }
        yield;
    }

    public async waitForRedisIndexCreated() {
        for await (const _ of this._waitForRedisIndexCreated()) {
            console.log('Waiting for Redis index creation for repository: ' + this.name);
        }
    }

    public setId(obj: T): T {
        // @ts-ignore
        obj.id = obj[EntityId];
        return obj;
    }
}

export default redis;
