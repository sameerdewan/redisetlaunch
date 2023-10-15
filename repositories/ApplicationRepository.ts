import {Entity, Repository} from "redis-om";
import {Application, ApplicationSchema} from "@/models/Application";
import redis, {RedisRepositoryClient} from "@/lib/redis";

export const applicationRepository = new Repository(ApplicationSchema, redis);

class ApplicationRepositoryClient implements RedisRepositoryClient {
    public static async getApplicationsByUserId(userId: string): Promise<Application[]> {
        return await applicationRepository
            .search()
            .where('userId')
            .eq(userId)
            .return
            .all() as Application[];
    }

    public static async getApplicationByIdAndUserId(id: string, userId: string): Promise<Application> {
        const application = await applicationRepository.fetch(id) as Application;
        if (application === null) return null;
        if (application.userId !== userId) return null;
        return application;
    }

    public static async saveApplication(application: Application): Promise<Application> {
        return await applicationRepository.save(application as Entity) as Application;
    }

    public static async deleteApplicationByIdAndUserId(id: string, userId: string): Promise<Application> {
        const application = await this.getApplicationByIdAndUserId(id, userId);
        if (application === null) return null;
        if (application.environmentIds.length) return null;
        if (application.flagIds.length) return null;
        await applicationRepository.remove(application[id as keyof Application]);
        return application;
    }
}

export default ApplicationRepositoryClient;
