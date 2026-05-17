import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable, enrollmentsTable, coursesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/users", async (req, res): Promise<void> => {
  const { role } = req.query;
  if (role && typeof role === "string") {
    const users = await db.select().from(usersTable).where(eq(usersTable.role, role));
    res.json(users);
    return;
  }
  const users = await db.select().from(usersTable);
  res.json(users);
});

router.post("/users", async (req, res): Promise<void> => {
  const { name, email, role, avatar, bio, skills, institution, country } = req.body;
  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }
  const [user] = await db.insert(usersTable).values({
    name, email, role: role || "student", avatar, bio, skills, institution, country,
  }).returning();
  res.status(201).json(user);
});

router.get("/users/dashboard/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const enrollments = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.userId, id));
  const completedCourses = enrollments.filter((e) => e.progress >= 100).length;
  const certificates = enrollments.filter((e) => e.completedAt !== null).length;
  const totalHoursLearned = enrollments.reduce((acc, e) => acc + (e.progress / 100) * 10, 0);

  const recommendedCourses = await db.select().from(coursesTable)
    .where(eq(coursesTable.isFeatured, true))
    .limit(4);

  res.json({
    userId: id,
    enrolledCourses: enrollments.length,
    completedCourses,
    totalHoursLearned: Math.round(totalHoursLearned * 10) / 10,
    certificates,
    currentStreak: Math.floor(Math.random() * 14) + 1,
    skillBadges: completedCourses * 2,
    recentEnrollments: enrollments.slice(0, 5),
    recommendedCourses,
  });
});

router.get("/users/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

export default router;
