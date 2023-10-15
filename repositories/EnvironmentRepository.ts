import {Entity} from "redis-om";
import {Environment, EnvironmentSchema} from "@/models/Environment";
import {RedisRepositoryClient} from "@/lib/redis";

class EnvironmentRepositoryClient extends RedisRepositoryClient {
    constructor() {
        super('environment', EnvironmentSchema);
    }

    public async getEnvironmentsByApplicationIdAndUserId(applicationId: string, userId: string): Promise<Environment[]> {
        await this.waitForRedisIndexCreated();
        return await this.repository
            .search()
            .where('applicationId')
            .eq(applicationId)
            .and('userId')
            .eq(userId)
            .return
            .all() as Environment[] ?? [];
    }

    public async getEnvironmentByIdAndUserId(id: string, userId: string): Promise<Environment> {
        await this.waitForRedisIndexCreated();
        const environment = await this.repository.fetch(id) as Environment;
        if (environment === null) return null;
        if (environment.userId !== userId) return null;
        return environment;
    }

    public async saveEnvironment(environment: Environment): Promise<Environment> {
        await this.waitForRedisIndexCreated();
        return await this.repository.save(environment as Entity) as Environment;
    }

    public async deleteEnvironmentByIdAndUserId(id: string, userId: string): Promise<Environment> {
        await this.waitForRedisIndexCreated();
        const environment = await this.getEnvironmentByIdAndUserId(id, userId);
        if (environment === null) return null;
        if (environment.flagIds.length) return null;
        await this.repository.remove(environment[id as keyof Environment]);
        return environment;
    }
}

declare global {
    var environmentRepositoryClient: EnvironmentRepositoryClient;
}

const environmentRepositoryClient = globalThis.environmentRepositoryClient || new EnvironmentRepositoryClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.environmentRepositoryClient = environmentRepositoryClient;
}

export default environmentRepositoryClient;

