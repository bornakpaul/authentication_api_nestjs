import { sql } from "drizzle-orm";
import { pgTable, serial, text, pgEnum } from "drizzle-orm/pg-core";

// Define an enum for user roles
export const userRole = pgEnum('user_role', ['admin', 'user']);

export const users = pgTable('users', {
     id: serial('id').primaryKey(),
     email: text('email').unique(),
     password: text('password').notNull(),
     role: text('role').array().notNull().default(sql`ARRAY['user']::user_role[]`)
});