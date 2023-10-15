import {Entity} from "redis-om";
import {Flag, FlagSchema} from "@/models/Flag";
import {RedisRepositoryClient} from "@/lib/redis";

class FlagRepositoryClient extends RedisRepositoryClient {
    constructor() {
        super('flag', FlagSchema);
    }

    public async getFlagsByEnvironmentIdAndUserId(environmentId: string, userId: string): Promise<Flag[]> {
        await this.waitForRedisIndexCreated();
        return await this.repository
            .search()
            .where('environmentId')
            .eq(environmentId)
            .and('userId')
            .eq(userId)
            .return
            .all() as Flag[] ?? [];
    }

    public async getFlagByIdAndUserId(id: string, userId: string): Promise<Flag> {
        await this.waitForRedisIndexCreated();
        const flag = await this.repository.fetch(id) as Flag;
        if (flag === null) return null;
        if (flag.userId !== userId) return null;
        return flag;
    }

    public async saveFlag(flag: Flag): Promise<Flag> {
        await this.waitForRedisIndexCreated();
        return await this.repository.save(flag as Entity) as Flag;
    }

    public async deleteFlagByIdAndUserId(id: string, userId: string): Promise<Flag> {
        await this.waitForRedisIndexCreated();
        const flag = await this.getFlagByIdAndUserId(id, userId);
        if (flag === null) return null;
        await this.repository.remove(flag[id as keyof Flag]);
        return flag;
    }
}

declare global {
    var flagRepositoryClient: FlagRepositoryClient;
}

const flagRepositoryClient = globalThis.flagRepositoryClient || new FlagRepositoryClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.flagRepositoryClient = flagRepositoryClient;
}

export default flagRepositoryClient;
