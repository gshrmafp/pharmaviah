import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Even though we are "Frontend ONLY", we define the schema here for Zod validation on the client.
// We won't actually create these tables in a database.

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization").notNull(),
  message: text("message").notNull(),
});

export const insertContactSchema = createInsertSchema(contactMessages)
  .omit({ id: true })
  .extend({
    email: z.string().email(),
  });
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
