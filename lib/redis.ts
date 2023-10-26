import {createClient} from 'redis';
import {Entity, EntityId, FieldDefinition, Repository, Schema} from "redis-om";
import {Application, State} from "@/archived/data/types";
import {Nullable} from "@/lib/utils";

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

    public async getEntitiesAtState(state: State): Promise<Nullable<T>[]> {
        await this.waitForRedisIndexCreated();
        const applications = await this.repository
            .search()
            .where('state')
            .eq(state)
            .return
            .all() as Application[] ?? [];
        return applications.map(this.setId);
    }

    public async setEntitiesToNeutral(entities: T[]): Promise<void> {
        await this.waitForRedisIndexCreated();
        const entitiesToNeutralize = await this.repository
            .search()
            .where('id')
            .containOneOf(...entities.map(entity => entity.id))
            .return
            .all();
        const saveEntities: Promise<Entity>[] = [];
        for (const entity of entitiesToNeutralize) {
            entity.state = State.NEUTRAL;
            saveEntities.push(this.repository.save(entity));
        }
        const results = await Promise.allSettled(saveEntities);
        const errors = results.filter(r => r.status === 'rejected');
        if (errors.length) {
            console.log('Entities set to neutral errors', errors, JSON.stringify({errors}, null, 2));
        }
    }
}

export default redis;
