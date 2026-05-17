import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const enrollmentsTable = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  courseTitle: text("course_title"),
  courseThumbnail: text("course_thumbnail"),
  progress: integer("progress").notNull().default(0),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  certificateUrl: text("certificate_url"),
  enrolledAt: timestamp("enrolled_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertEnrollmentSchema = createInsertSchema(enrollmentsTable).omit({ id: true, enrolledAt: true });
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollmentsTable.$inferSelect;
