import redis, {RedisCacheClient, RedisCachedData} from "@/lib/redis";
import prisma from "@/lib/prisma";
import {Flag} from "@prisma/client"

class FlagsService implements RedisCacheClient {
    private static constructRedisKey(environmentId: string, userId: string): string {
        const environmentIdRedisKeyPortion: string = `[ENVIRONMENT_ID=${environmentId}]`;
        const userIdRedisKeyPortion: string = `[USER_ID=${userId}]`;
        return environmentIdRedisKeyPortion + userIdRedisKeyPortion;
    }

    public static async createFlag(
        userId: string,
        flag: Flag,
        applicationId: string,
        environmentId: string
    ): Promise<Flag> {
        const newFlag: Flag = await prisma.flag.create({
            data: {
                userId,
                name: flag.name,
                description: flag.description,
                value: flag.value!,
                applicationId,
                environmentId
            }
        });
        const redisKey: string = this.constructRedisKey(environmentId, userId);
        await redis.del(redisKey);
        return newFlag;
    }

    public static async updateFlag(
        userId: string,
        flag: Flag,
        environmentId: string
    ): Promise<Flag> {
        const updatedFlag: Flag = await prisma.flag.update({
            where: {
                userId,
                id: flag.id
            },
            data: {
                name: flag.name,
                description: flag.description,
                value: flag.value!,
            }
        });
        const redisKey: string = this.constructRedisKey(environmentId, userId);
        await redis.del(redisKey);
        return updatedFlag;
    }

    public static async deleteFlag(
        userId: string,
        flag: Flag,
        environmentId: string
    ): Promise<Flag> {
        const deletedFlag: Flag = await prisma.flag.delete({
            where: {
                userId,
                id: flag.id
            }
        });
        const redisKey: string = this.constructRedisKey(environmentId, userId);
        await redis.del(redisKey);
        return deletedFlag;
    }

    public static async getFlags(
        userId: string,
        environmentId: string,
        version: number
    ): Promise<Flag[]> {
        const redisKey: string = this.constructRedisKey(environmentId, userId);
        const redisStringCachedData: string | null = await redis.get<string>(redisKey);
        if (typeof redisStringCachedData === 'string') {
            try {
                const redisCachedData: RedisCachedData<Flag[]> = JSON.parse(redisStringCachedData);
                if (redisCachedData !== null && redisCachedData.version !== version) {
                    return redisCachedData.data;
                }
            } catch {
            }
        }
        const flags: Flag[] = await prisma.flag.findMany({
            where: {
                userId,
                environmentId
            }
        });
        const dataToCache: RedisCachedData<Flag[]> = {
            data: flags,
            type: 'json',
            version
        };
        await redis.set(redisKey, JSON.stringify(dataToCache));
        return flags;
    }
}

export default FlagsService;
