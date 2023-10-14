import {PrismaClient} from "@prisma/client";

declare global {
    // noinspection ES6ConvertVarToLetConst
    var prismaClient: PrismaClient | undefined;
}

const prisma = globalThis.prismaClient ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prismaClient = prisma;
}

export default prisma;
