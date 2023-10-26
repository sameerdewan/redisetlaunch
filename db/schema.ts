import {pgTable, varchar, timestamp} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

/*******************************************************************/
/*                         ORGANIZATIONS                           */
/*******************************************************************/
const organizations = pgTable("organizations", {
    id: varchar("id", {length: 12}).unique().primaryKey()
});

export const organizationsRelations = relations(organizations, ({many}) => ({
    users: many(users),
    applications: many(applications),
    environments: many(environments)
}));

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;


/*******************************************************************/
/*                              USERS                              */
/*******************************************************************/
export const users = pgTable("users", {
    organizationId: varchar("id", {length: 12}),
    id: varchar("id", {length: 12}).unique().primaryKey(),
});

export const usersRelations = relations(users, ({one, many}) => ({
    organization: one(organizations, {
        fields: [users.organizationId],
        references: [organizations.id]
    }),
    applications: many(applications)
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/*******************************************************************/
/*                          APPLICATIONS                           */
/*******************************************************************/
export const applications = pgTable("applications", {
    organizationId: varchar("id", {length: 12}),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}),
    description: varchar("description", {length: 240}),
    createdBy: varchar("createdBy"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedBy: varchar("updatedBy"),
    updatedAt: timestamp("updatedAt")
});

export const applicationsRelations = relations(applications, ({one, many}) => ({
    organization: one(organizations, {
        fields: [applications.organizationId],
        references: [organizations.id]
    }),
    user: one(users, {
        fields: [applications.createdBy, applications.updatedBy],
        references: [users.id, users.id]
    }),
    environments: many(environments)
}));

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof  applications.$inferInsert;

/*******************************************************************/
/*                          ENVIRONMENTS                           */
/*******************************************************************/
export const environments = pgTable("environments", {
    organizationId: varchar("id", {length: 12}),
    applicationId: varchar("id", {length: 12}),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}),
    description: varchar("description", {length: 240}),
    createdBy: varchar("createdBy"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedBy: varchar("updatedBy"),
    updatedAt: timestamp("updatedAt")
});

export const environmentsRelations = relations(environments, ({one}) => ({
    organization: one(organizations, {
        fields: [environments.organizationId],
        references: [organizations.id]
    }),
    application: one(applications, {
        fields: [environments.applicationId],
        references: [applications.id]
    })
}));

export type Environment = typeof environments.$inferSelect;
export type NewEnvironment = typeof environments.$inferInsert;

/*******************************************************************/
/*                              FLAGS                              */
/*******************************************************************/

/*******************************************************************/
/*                            SESSIONS                             */
/*******************************************************************/

/*******************************************************************/
/*                         SUBSCRIPTIONS                           */
/*******************************************************************/


