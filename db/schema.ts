import {
    pgTable,
    varchar,
    timestamp,
    primaryKey,
    integer,
    boolean,
    uniqueIndex,
    index,
    pgEnum
} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

/*******************************************************************/
/*                              ENUMS                              */
/*******************************************************************/
export const authEnum = pgEnum("auth", [
   "email",
]);

/*******************************************************************/
/*                         ORGANIZATIONS                           */
/*******************************************************************/
const organizations = pgTable("organizations", {
    subscriptionId: varchar("id", {length: 12}).unique(),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}).notNull(),
    description: varchar("description", {length: 240}),
    createdBy: varchar("created_by").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
}, (table) => {
    return {
        subscriptionIdx: uniqueIndex("subscription_idx").on(table.subscriptionId),
        nameIdx: index("name_idx").on(table.name),
        createdByIdx: index("created_by_idx").on(table.createdBy),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedByIdx: index("updated_by_idx").on(table.updatedBy),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt)
    };
});

export const organizationsRelations = relations(organizations, ({many, one}) => ({
    users: many(users),
    applications: many(applications),
    environments: many(environments),
    flags: many(flags),
    sessions: many(sessions),
    subscription: one(subscriptions, {
        fields: [organizations.subscriptionId],
        references: [subscriptions.id]
    }),
    roles: many(roles)
}));

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;

/*******************************************************************/
/*                         SUBSCRIPTIONS                           */
/*******************************************************************/
export const subscriptions = pgTable("subscriptions", {
    organizationId: varchar("organization_id", {length: 12}).unique().notNull(),
    stripeCustomerId: varchar("stripe_customer_id").unique(),
    stripeSubscriptionId: varchar("stripe_subscription_id").unique(),
    planId: varchar("plan_id", {length: 12}).notNull(),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}).notNull(),
    currentMonthApiCalls: integer("current_month_api_calls").default(0),
    description: varchar("description", {length: 240}),
    createdBy: varchar("created_by").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
}, (table) => {
    return {
        organizationIdx: uniqueIndex("organization_idx").on(table.organizationId),
        planIdx: index("plan_idx").on(table.planId),
        nameIdx: index("name_idx").on(table.name),
        createdByIdx: index("created_by_idx").on(table.createdBy),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedByIdx: index("updated_by_idx").on(table.updatedBy),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt)
    };
});

export const subscriptionsRelations = relations(subscriptions, ({one}) => ({
    organization: one(organizations, {
        fields: [subscriptions.organizationId],
        references: [organizations.id]
    }),
    plan: one(plans, {
        fields: [subscriptions.planId],
        references: [plans.id]
    })
}));

export type Subscription = typeof subscriptions.$inferInsert;
export type NewSubscription = typeof subscriptions.$inferInsert;

/*******************************************************************/
/*                              PLANS                              */
/*******************************************************************/
export const plans = pgTable("plans", {
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}).unique().notNull(),
    description: varchar("description", {length: 240}),
    monthlyApiCalls: integer("monthly_api_calls").default(0),
    seats: integer("seats").default(0),
    flags: integer("flags").default(0),
    environments: integer("environments").default(0),
    applications: integer("applications").default(0),
    sessions: integer("sessions").default(0),
    roles: integer("roles").default(0),
    scheduling: boolean("scheduling").default(false),
    approvals: boolean("approvals").default(false),
    createdBy: varchar("created_by").default("system"),
    createdAt: timestamp("created_At").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
}, (table) => {
    return {
        nameIdx: uniqueIndex("name_idx").on(table.name),
        createdByIdx: index("created_by_idx").on(table.createdBy),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedByIdx: index("updated_by_idx").on(table.updatedBy),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt)
    };
});

export const plansRelations = relations(plans, ({many}) => ({
    subscriptions: many(subscriptions)
}));

export type Plan = typeof plans.$inferInsert;
export type NewPlan = typeof plans.$inferInsert;

/*******************************************************************/
/*                              ROLES                              */
/*******************************************************************/
export const roles = pgTable("roles", {
    organizationId: varchar("organization_id", {length: 12}).notNull(),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}).notNull(),
    description: varchar("description", {length: 240}),
    createdBy: varchar("created_by").default("system"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
}, (table) => {
    return {
        organizationIdx: index("organization_idx").on(table.organizationId),
        nameIdx: index("name_idx").on(table.name),
        descriptionIdx: index("description_idx").on(table.description),
        createdByIdx: index("created_by_idx").on(table.createdBy),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedByIdx: index("updated_by_idx").on(table.updatedBy),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt)
    };
});

export const rolesRelations = relations(roles, ({one, many}) => ({
    organization: one(organizations, {
        fields: [roles.organizationId],
        references: [organizations.id]
    }),
    permissions: many(permissions)
}));

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;

/*******************************************************************/
/*                          PERMISSIONS                            */
/*******************************************************************/
export const permissions = pgTable("permissions", {
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}).notNull(),
    description: varchar("description", {length: 240}),
    createdBy: varchar("created_by").default("system"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
});

export const permissionsRelations = relations(permissions, ({many}) => ({
    roles: many(roles)
}));

export type Permission = typeof permissions.$inferSelect;
export type NewPermission = typeof permissions.$inferInsert;

/*******************************************************************/
/*               ROLES / PERMISSIONS JUNCTION                      */
/*******************************************************************/
export const rolesToPermissions = pgTable("roles_to_permissions", {
    roleId: varchar("role_id", {length: 12}).notNull().references(() => roles.id),
    permissionId: varchar("permission_id", {length: 12}).notNull().references(() => permissions.id)
}, junction => ({
    pk: primaryKey(junction.roleId, junction.permissionId)
}));

export const rolesToPermissionsRelations = relations(rolesToPermissions, ({one}) => ({
    role: one(roles, {
        fields: [rolesToPermissions.roleId],
        references: [roles.id]
    }),
    permission: one(permissions, {
        fields: [rolesToPermissions.permissionId],
        references: [permissions.id]
    })
}));

/*******************************************************************/
/*                              USERS                              */
/*******************************************************************/
export const users = pgTable("users", {
    organizationId: varchar("organization_id", {length: 12}),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    username: varchar("name", {length: 18}).notNull(),
    password: varchar("password").notNull(),
    auth: authEnum("auth").notNull(),
    description: varchar("description", {length: 240}),
    createdBy: varchar("created_by").default("system"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
}, (table) => {
    return {
        usernameIdx: index("username_idx").on(table.username),
        authIdx: index("auth_idx").on(table.auth),
        organizationIdx: index("organization_idx").on(table.organizationId),
        createdBy: varchar("created_by").default("system"),
        createdAt: timestamp("created_at").defaultNow(),
        updatedBy: varchar("updated_by"),
        updatedAt: timestamp("updated_at")
    };
});

export const usersRelations = relations(users, ({one, many}) => ({
    organization: one(organizations, {
        fields: [users.organizationId],
        references: [organizations.id]
    }),
    accessibleApplications: many(applications),
    roles: many(roles)
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/*******************************************************************/
/*                          APPLICATIONS                           */
/*******************************************************************/
export const applications = pgTable("applications", {
    organizationId: varchar("organization_id", {length: 12}).notNull(),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}).notNull(),
    description: varchar("description", {length: 240}),
    createdBy: varchar("created_by").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
}, (table) => {
    return {
        organizationIdx: index("organization_idx").on(table.organizationId),
        nameIdx: index("name_idx").on(table.name),
        descriptionIdx: index("description_idx").on(table.description),
        createdByIdx: index("created_by_idx").on(table.createdBy),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedByIdx: index("updated_by_idx").on(table.updatedBy),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt)
    };
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
    usersWithAccess: many(users),
    environments: many(environments),
    flags: many(flags),
    sessions: many(sessions)
}));

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof  applications.$inferInsert;

/*******************************************************************/
/*              USERS / APPLICATIONS JUNCTION                      */
/*******************************************************************/
export const usersToApplications = pgTable("users_to_applications", {
    userId: varchar("user_id", {length: 12}).notNull().references(() => users.id),
    applicationId: varchar("application_id", {length: 12}).notNull().references(() => applications.id)
}, junction => ({
    pk: primaryKey(junction.userId, junction.applicationId)
}));

export const usersToApplicationsRelations = relations(usersToApplications, ({one}) => ({
    user: one(users, {
        fields: [usersToApplications.userId],
        references: [users.id]
    }),
    application: one(applications, {
        fields: [usersToApplications.applicationId],
        references: [applications.id]
    })
}));

/*******************************************************************/
/*                          ENVIRONMENTS                           */
/*******************************************************************/
export const environments = pgTable("environments", {
    organizationId: varchar("organization_id", {length: 12}).notNull(),
    applicationId: varchar("application_id", {length: 12}).notNull(),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}).notNull(),
    description: varchar("description", {length: 240}),
    createdBy: varchar("created_by").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
}, (table) => {
    return {
        organizationIdx: index("organization_idx").on(table.organizationId),
        applicationIdx: index("application_idx").on(table.applicationId),
        nameIdx: index("name_idx").on(table.name),
        descriptionIdx: index("description_idx").on(table.description),
        createdByIdx: index("created_by_idx").on(table.createdBy),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedByIdx: index("updated_by_idx").on(table.updatedBy),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt)
    };
});

export const environmentsRelations = relations(environments, ({one, many}) => ({
    organization: one(organizations, {
        fields: [environments.organizationId],
        references: [organizations.id]
    }),
    user: one(users, {
        fields: [environments.createdBy, environments.updatedBy],
        references: [users.id, users.id]
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
    organizationId: varchar("organization_id", {length: 12}).notNull(),
    applicationId: varchar("application_id", {length: 12}).notNull(),
    environmentId: varchar("environment_id", {length: 12}).notNull(),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}).notNull(),
    description: varchar("description", {length: 240}),
    createdBy: varchar("created_by").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
}, (table) => {
    return {
        organizationIdx: index("organization_idx").on(table.organizationId),
        applicationIdx: index("application_idx").on(table.applicationId),
        environmentIdx: index("environment_idx").on(table.environmentId),
        nameIdx: index("name_idx").on(table.name),
        descriptionIdx: index("description_idx").on(table.description),
        createdByIdx: index("created_by_idx").on(table.createdBy),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedByIdx: index("updated_by_idx").on(table.updatedBy),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt)
    };
});

export const flagsRelations = relations(flags, ({one, many}) => ({
    organization: one(organizations, {
        fields: [flags.organizationId],
        references: [organizations.id]
    }),
    user: one(users, {
        fields: [flags.createdBy, flags.updatedBy],
        references: [users.id, users.id]
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
    organizationId: varchar("organization_id", {length: 12}).notNull(),
    applicationId: varchar("application_id", {length: 12}).notNull(),
    environmentId: varchar("environment_id", {length: 12}).notNull(),
    id: varchar("id", {length: 12}).unique().primaryKey(),
    name: varchar("name", {length: 18}).notNull(),
    description: varchar("description", {length: 240}),
    createdBy: varchar("created_by").default("system"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedBy: varchar("updated_by"),
    updatedAt: timestamp("updated_at")
}, (table) => {
    return {
        organizationIdx: index("organization_idx").on(table.organizationId),
        applicationIdx: index("application_idx").on(table.applicationId),
        environmentIdx: index("environment_idx").on(table.environmentId),
        nameIdx: index("name_idx").on(table.name),
        descriptionIdx: index("description_idx").on(table.description),
        createdAtIdx: index("created_at_idx").on(table.createdAt),
        updatedAtIdx: index("updated_at_idx").on(table.updatedAt)
    };
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

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

/*******************************************************************/
/*                  FLAGS / SESSIONS JUNCTION                      */
/*******************************************************************/
export const flagsToSessions = pgTable("flags_to_sessions", {
    flagId: varchar("flag_id", {length: 12}).notNull().references(() => flags.id),
    sessionId: varchar("session_id", {length: 12}).notNull().references(() => sessions.id)
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
