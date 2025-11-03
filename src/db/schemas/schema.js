import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});


export const haikusTable = sqliteTable("haikus", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  text: text("text").notNull(),
  author_id: integer("author_id"), // lien avec users.id
  icon: text("icon").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});


export const commentsTable = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  haiku_id: integer('haiku_id').notNull(),   // lien vers le haïku
  author_id: integer('author_id').notNull(), // lien vers l'utilisateur
  text: text('text').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});