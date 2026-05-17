import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnail: text("thumbnail"),
  type: text("type").notNull().default("webinar"),
  hostName: text("host_name").notNull(),
  hostAvatar: text("host_avatar"),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(60),
  registrationCount: integer("registration_count").notNull().default(0),
  maxAttendees: integer("max_attendees"),
  isLive: boolean("is_live").notNull().default(false),
  isFree: boolean("is_free").notNull().default(true),
  price: real("price").notNull().default(0),
  meetingUrl: text("meeting_url"),
  tags: text("tags"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(eventsTable).omit({ id: true, createdAt: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof eventsTable.$inferSelect;
