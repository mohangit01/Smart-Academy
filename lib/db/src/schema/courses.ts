import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const coursesTable = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  thumbnail: text("thumbnail"),
  categoryId: integer("category_id").notNull(),
  categoryName: text("category_name"),
  instructorId: integer("instructor_id"),
  instructorName: text("instructor_name"),
  instructorAvatar: text("instructor_avatar"),
  level: text("level").notNull().default("beginner"),
  language: text("language").notNull().default("English"),
  durationHours: real("duration_hours").notNull().default(0),
  price: real("price").notNull().default(0),
  originalPrice: real("original_price"),
  rating: real("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  enrollmentCount: integer("enrollment_count").notNull().default(0),
  isFeatured: boolean("is_featured").notNull().default(false),
  isFree: boolean("is_free").notNull().default(false),
  tags: text("tags"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCourseSchema = createInsertSchema(coursesTable).omit({ id: true, createdAt: true });
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof coursesTable.$inferSelect;
