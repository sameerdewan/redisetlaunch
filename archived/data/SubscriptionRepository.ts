import {Entity} from "redis-om";
import {Subscription, SubscriptionSchema} from "@/archived/models/Subscription";
import {RedisRepositoryClient} from "@/lib/redis";

class SubscriptionRepositoryClient extends RedisRepositoryClient {
    constructor() {
        super('subscription', SubscriptionSchema);
    }

    public async getSubscriptionByUserId(userId: string): Promise<Subscription> {
        await this.waitForRedisIndexCreated();
        return await this.repository
            .search()
            .where('userId')
            .eq(userId)
            .first() as Subscription;
    }

    public async getSubscriptionBySubscriptionKey(subscriptionKey: string): Promise<Subscription> {
        await this.waitForRedisIndexCreated();
        return await this.repository
            .search()
            .where('subscriptionKey')
            .eq(subscriptionKey)
            .first() as Subscription;
    }
}

declare global {
    var subscriptionRepositoryClient: SubscriptionRepositoryClient;
}

const subscriptionRepositoryClient = globalThis.subscriptionRepositoryClient || new SubscriptionRepositoryClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.subscriptionRepositoryClient = subscriptionRepositoryClient;
}

export default subscriptionRepositoryClient;

