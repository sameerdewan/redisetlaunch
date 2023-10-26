import {Entity} from "redis-om";
import {RedisRepositoryClient} from "@/lib/redis";
import {Nullable} from "@/lib/utils";
import {Environment} from "@/archived/data/types";

class EnvironmentRedisClient extends RedisRepositoryClient<Environment> {
    constructor() {
        super('environment', {
            id: {
                type: 'string',
                indexed: true,
            },
            userId: {
                type: 'string'
            },
            createdAt: {
                type: 'date',
                sortable: true,
            },
            updatedAt: {
                type: 'date',
                sortable: true
            },
            state: {
                type: 'string',
                indexed: true
            },
            name: {
                type: 'string',
                indexed: true
            },
            applicationId: {
                type: 'string',
                indexed: true
            },
            description: {
                type: 'string'
            },
            flagIds: {
                type: 'string[]',
            }
        });
    }

    public async getEnvironmentsByApplicationIdAndUserId(applicationId: string, userId: string): Promise<Nullable<Environment>[]> {
        await this.waitForRedisIndexCreated();
        const environments = await this.repository
            .search()
            .where('applicationId')
            .eq(applicationId)
            .and('userId')
            .eq(userId)
            .return
            .all() as Environment[] ?? [];
        return environments.map(this.setId);
    }
}
