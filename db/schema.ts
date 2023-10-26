import {pgTable, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const users = pgTable(
    "users",
    {
        id: varchar("id", {length: 12}).unique().primaryKey()
    },
    (users) => {
        return {
        };
    }
);

export const usersRelations = relations(users, ({many}) => ({
    applications: many(applications)
}));

export const applications = pgTable(
    "applications",
    {
        organizationId: varchar("id", {length: 12}),
        id: varchar("id", {length: 12}).unique().primaryKey(),
        name: varchar("name", {length: 18}),
        description: varchar("description", {length: 240}),
        createdBy: varchar("createdBy")
    },
    (applications) => {
        return {

        };
    }
);

export const applicationsRelations = relations(applications, ({one}) => ({
    user: one(users, {
        fields: [applications.createdBy],
        references: [users.id]
    })
}));
