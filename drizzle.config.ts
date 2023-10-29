import type {Config} from "drizzle-kit";

export default {
    schema: "./db/schema.ts",
    out: "./db/migrations",
    driver: "pg",
    dbCredentials: {
        host: process.env.SQL_DB_HOST!,
        port: Number(process.env.SQL_DB_PORT!),
        user: process.env.SQL_DB_USER!,
        password: process.env.SQL_DB_PASSWORD!,
        database: process.env.SQL_DB_DATABASE!
    }
} satisfies Config;
