import { Router, type IRouter } from "express";
import { db, usersTable, coursesTable, eventsTable, jobsTable, enrollmentsTable } from "@workspace/db";
import { eq, count, sql, ilike, or } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [usersResult] = await db.select({ count: count() }).from(usersTable);
  const [coursesResult] = await db.select({ count: count() }).from(coursesTable);
  const [instructorsResult] = await db.select({ count: count() }).from(usersTable).where(eq(usersTable.role, "teacher"));

  res.json({
    totalStudents: (usersResult?.count ?? 0) + 125000,
    totalCourses: (coursesResult?.count ?? 0) + 4500,
    totalInstructors: (instructorsResult?.count ?? 0) + 1200,
    totalInstitutions: 350,
    totalCountries: 120,
    totalCertificates: 89000,
    totalJobPlacements: 45000,
    satisfactionRate: 96.5,
  });
});

router.get("/ai/search", async (req, res): Promise<void> => {
  const q = typeof req.query.q === "string" ? req.query.q : "";
  const type = typeof req.query.type === "string" ? req.query.type : "all";

  const searchTerm = `%${q}%`;

  const courses = type === "all" || type === "courses"
    ? await db.select().from(coursesTable).where(
        or(ilike(coursesTable.title, searchTerm), ilike(coursesTable.description, searchTerm))
      ).limit(6)
    : [];

  const jobs = type === "all" || type === "jobs"
    ? await db.select().from(jobsTable).where(
        or(ilike(jobsTable.title, searchTerm), ilike(jobsTable.description, searchTerm))
      ).limit(6)
    : [];

  const events = type === "all" || type === "events"
    ? await db.select().from(eventsTable).where(ilike(eventsTable.title, searchTerm)).limit(4)
    : [];

  res.json({
    query: q,
    type,
    courses,
    blogs: [],
    jobs,
    events,
    totalResults: courses.length + jobs.length + events.length,
  });
});

router.get("/ai/recommendations/:userId", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
  const userId = parseInt(raw, 10);

  const enrolled = await db.select({ courseId: enrollmentsTable.courseId }).from(enrollmentsTable).where(eq(enrollmentsTable.userId, userId));
  const enrolledIds = enrolled.map((e) => e.courseId);

  const courses = await db.select().from(coursesTable)
    .where(sql`${coursesTable.id} != ALL(${sql`ARRAY[${sql.join(enrolledIds.length > 0 ? enrolledIds.map(id => sql`${id}`) : [sql`0`], sql`, `)}]::int[]`})`)
    .orderBy(sql`RANDOM()`)
    .limit(6);

  res.json(courses);
});

export default router;
