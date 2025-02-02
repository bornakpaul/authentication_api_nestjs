import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, } from "drizzle-orm/pg-core";
import { users } from "src/users/schema";

export const posts = pgTable('posts',{
     id: serial('id').primaryKey(),
     content: text('content'),
     published: boolean('published').default(false),
     timestamp: timestamp('timestamp').defaultNow(),
     userId: integer('userId').references(()=> users.id),
});

// many post will be connected to a single users (one to many relationship sql)
export const postRelations = relations(posts, ({one}) => ({
     user: one(users,{
          fields: [posts.userId],
          references: [users.id],
     }),
}));