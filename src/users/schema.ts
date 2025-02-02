import { relations, sql } from "drizzle-orm";
import { pgTable, serial, text, pgEnum } from "drizzle-orm/pg-core";
import { posts } from "src/posts/schema";

// Define an enum for user roles
export const userRole = pgEnum('user_role', ['admin', 'user']);

export const users = pgTable('users', {
     id: serial('id').primaryKey(),
     email: text('email').unique(),
     password: text('password').notNull(),
     role: text('role').array().notNull().default(sql`ARRAY['user']::user_role[]`)
});

// single user will be connecte to multiple post (one to many relationship sql)
export const userRelations = relations(users, ({ many }) => ({
     posts: many(posts),
}));