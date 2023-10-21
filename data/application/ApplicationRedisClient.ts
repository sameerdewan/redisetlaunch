import {Entity} from "redis-om";
import {RedisRepositoryClient} from "@/lib/redis";
import {Nullable} from "@/lib/utils";
import {Application, State} from "@/data/types";
import {ApplicationParityInterface} from "@/data/application/ApplicationParityInterface";

class ApplicationRedisClient extends RedisRepositoryClient<Application> implements ApplicationParityInterface {
    constructor() {
        super('application', {
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
                description: {
                    type: 'string',
                },
                flagIds: {
                    type: 'string[]'
                },
                environmentIds: {
                    type: 'string[]'
                },
            }
        );
    }

    public async getApplicationsByUserId(userId: string): Promise<Nullable<Application>[]> {
        await this.waitForRedisIndexCreated();
        const applications = await this.repository
            .search()
            .where('userId')
            .eq(userId)
            .return
            .all() as Application[] ?? [];
        return applications.map(this.setId);
    }

    public async getApplicationByIdAndUserId(id: string, userId: string): Promise<Nullable<Application>> {
        await this.waitForRedisIndexCreated();
        const application = await this.repository.fetch(id) as Application;
        if (application === null) return null;
        if (application.userId !== userId) return null;
        return this.setId(application);
    }

    public async saveApplication(application: Application): Promise<Nullable<Application>> {
        await this.waitForRedisIndexCreated();
        if (application === null) return null;
        const now = new Date();
        if (!application.createdAt) application.createdAt = now;
        application.updatedAt = now;
        const savedApplication = await this.repository.save(application as Entity) as Application;
        return this.setId(savedApplication);
    }

    public async deleteApplicationByIdAndUserId(id: string, userId: string): Promise<Nullable<Application>> {
        await this.waitForRedisIndexCreated();
        const application = await this.getApplicationByIdAndUserId(id, userId);
        if (application === null) return null;
        if (application.environmentIds.length) return null;
        if (application.flagIds.length) return null;
        await this.repository.remove(id);
        return this.setId(application);
    }
}

declare global {
    var applicationRedisClient: ApplicationRedisClient;
}

const applicationRedisClient = globalThis.applicationRedisClient || new ApplicationRedisClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.applicationRedisClient = applicationRedisClient;
}

export default applicationRedisClient;

