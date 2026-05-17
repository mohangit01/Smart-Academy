import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const jobsTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  companyLogo: text("company_logo"),
  location: text("location").notNull(),
  type: text("type").notNull().default("full-time"),
  salaryMin: real("salary_min"),
  salaryMax: real("salary_max"),
  currency: text("currency").notNull().default("USD"),
  description: text("description").notNull(),
  requirements: text("requirements"),
  skills: text("skills"),
  experienceYears: integer("experience_years").notNull().default(0),
  category: text("category").notNull(),
  applicationCount: integer("application_count").notNull().default(0),
  isRemote: boolean("is_remote").notNull().default(false),
  postedAt: timestamp("posted_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

export const insertJobSchema = createInsertSchema(jobsTable).omit({ id: true, postedAt: true });
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobsTable.$inferSelect;
