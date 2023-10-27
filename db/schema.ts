import {pgTable, varchar, timestamp, primaryKey} from "drizzle-orm/pg-core";
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
    environments: many(environments),
    flags: many(flags),
    sessions: many(sessions)
}));

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;

/*******************************************************************/
/*                         SUBSCRIPTIONS                           */
/*******************************************************************/

/*******************************************************************/
/*                              ROLES                              */
/*******************************************************************/

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
    environments: many(environments),
    flags: many(flags),
    sessions: many(sessions)
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

export const environmentsRelations = relations(environments, ({one, many}) => ({
    organization: one(organizations, {
        fields: [environments.organizationId],
        references: [organizations.id]
    }),
    application: one(applications, {
        fields: [environments.applicationId],
        references: [applications.id]
    }),
    flags: many(flags),
    sessions: many(sessions)
}));

export type Environment = typeof environments.$inferSelect;
export type NewEnvironment = typeof environments.$inferInsert;

/*******************************************************************/
/*                              FLAGS                              */
/*******************************************************************/
export const flags = pgTable("flags", {
    organizationId: varchar("id", {length: 12}),
    applicationId: varchar("id", {length: 12}),
    environmentId: varchar("id", {length: 12}),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}),
    description: varchar("description", {length: 240}),
    createdBy: varchar("createdBy"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedBy: varchar("updatedBy"),
    updatedAt: timestamp("updatedAt")
});

export const flagsRelations = relations(flags, ({one, many}) => ({
    organization: one(organizations, {
        fields: [flags.organizationId],
        references: [organizations.id]
    }),
    application: one(applications, {
        fields: [flags.applicationId],
        references: [applications.id]
    }),
    environment: one(environments, {
        fields: [flags.environmentId],
        references: [environments.id]
    }),
    sessions: many(sessions)
}));

export type Flag = typeof flags.$inferSelect;
export type NewFlag = typeof flags.$inferInsert;

/*******************************************************************/
/*                            SESSIONS                             */
/*******************************************************************/

export const sessions = pgTable("sessions", {
    organizationId: varchar("id", {length: 12}),
    applicationId: varchar("id", {length: 12}),
    environmentId: varchar("id", {length: 12}),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}),
    description: varchar("description", {length: 240}),
    createdBy: varchar("createdBy"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedBy: varchar("updatedBy"),
    updatedAt: timestamp("updatedAt")
});

export const sessionsRelations = relations(sessions, ({one, many}) => ({
    organization: one(organizations, {
        fields: [sessions.organizationId],
        references: [organizations.id]
    }),
    application: one(applications, {
        fields: [sessions.applicationId],
        references: [applications.id]
    }),
    environment: one(environments, {
        fields: [sessions.environmentId],
        references: [environments.id]
    }),
    flags: many(flags)
}));

/*******************************************************************/
/*                  FLAGS / SESSIONS JUNCTION                      */
/*******************************************************************/

export const flagsToSessions = pgTable("flagsToSessions", {
    flagId: varchar("flagId", {length: 12}).notNull().references(() => flags.id),
    sessionId: varchar("sessionId", {length: 12}).notNull().references(() => sessions.id)
}, junction => ({
    pk: primaryKey(junction.flagId, junction.sessionId)
}));

export const flagsToSessionsRelations = relations(flagsToSessions, ({one}) => ({
    flag: one(flags, {
        fields: [flagsToSessions.flagId],
        references: [flags.id]
    }),
    session: one(sessions, {
        fields: [flagsToSessions.sessionId],
        references: [sessions.id]
    })
}));
