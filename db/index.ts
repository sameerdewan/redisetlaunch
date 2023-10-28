
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@/db/schema";
import {Client} from "pg";

const client = new Client({
    host: process.env.SQL_DB_HOST,
    port: Number(process.env.SQL_DB_PORT),
    user: process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_DATABASE
});

await client.connect();

const db = drizzle(client, {schema});

export default db;
