import {Entity} from "redis-om";
import {Application, ApplicationSchema} from "@/models/Application";
import {RedisRepositoryClient} from "@/lib/redis";

class ApplicationRepositoryClient extends RedisRepositoryClient {
    constructor() {
        super('application', ApplicationSchema);
    }

    public async getApplicationsByUserId(userId: string): Promise<Application[]> {
        await this.waitForRedisIndexCreated();
        return await this.repository
            .search()
            .where('userId')
            .eq(userId)
            .return
            .all() as Application[] ?? [];
    }

    public async getApplicationByIdAndUserId(id: string, userId: string): Promise<Application> {
        await this.waitForRedisIndexCreated();
        const application = await this.repository.fetch(id) as Application;
        if (application === null) return null;
        if (application.userId !== userId) return null;
        return application;
    }

    public async saveApplication(application: Application): Promise<Application> {
        await this.waitForRedisIndexCreated();
        if (application === null) return null;
        const now = new Date();
        if (!application.createdAt) application.createdAt = now;
        application.updatedAt = now;
        return await this.repository.save(application as Entity) as Application;
    }

    public async deleteApplicationByIdAndUserId(id: string, userId: string): Promise<Application> {
        await this.waitForRedisIndexCreated();
        const application = await this.getApplicationByIdAndUserId(id, userId);
        if (application === null) return null;
        if (application.environmentIds.length) return null;
        if (application.flagIds.length) return null;
        await this.repository.remove(application[id as keyof Application]);
        return application;
    }
}

declare global {
    var applicationRepositoryClient: ApplicationRepositoryClient;
}

const applicationRepositoryClient = globalThis.applicationRepositoryClient || new ApplicationRepositoryClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.applicationRepositoryClient = applicationRepositoryClient;
}

export default applicationRepositoryClient;
