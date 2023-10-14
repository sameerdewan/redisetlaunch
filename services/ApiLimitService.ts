import prisma from "@/lib/prisma";
import {UserApiLimit} from "@prisma/client"

class ApiLimitService {
    public static apiLimit: number = Number(process.env.API_LIMIT);

    public static async getApiLimit(userId: string): Promise<UserApiLimit | null> {
        return await prisma.userApiLimit.findUnique({
            where: {userId}
        });
    }

    public static async checkApiLimit(userId: string): Promise<boolean> {
        const userApiLimit = await this.getApiLimit(userId);
        return !userApiLimit || userApiLimit.count < this.apiLimit;
    }

    public static async increaseLimit(userId: string) {
        const userApiLimit = await this.getApiLimit(userId);
        if (userApiLimit) {
            await prisma.userApiLimit.update({
                where: {userId},
                data: {
                    count: {
                        increment: 1
                    }
                }
            });
        } else {
            await prisma.userApiLimit.create({
                data: {
                    userId,
                    count: 1
                }
            });
        }
    }
}

export default ApiLimitService;
