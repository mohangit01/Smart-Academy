import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, enrollmentsTable, coursesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/enrollments", async (req, res): Promise<void> => {
  const { userId } = req.query;

  if (userId && typeof userId === "string") {
    const uid = parseInt(userId, 10);
    const rows = await db.select().from(enrollmentsTable).where(eq(enrollmentsTable.userId, uid));
    res.json(rows);
    return;
  }

  const rows = await db.select().from(enrollmentsTable);
  res.json(rows);
});

router.post("/enrollments", async (req, res): Promise<void> => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    res.status(400).json({ error: "userId and courseId are required" });
    return;
  }

  const [existing] = await db.select().from(enrollmentsTable).where(
    and(eq(enrollmentsTable.userId, userId), eq(enrollmentsTable.courseId, courseId))
  );

  if (existing) {
    res.status(409).json({ error: "Already enrolled" });
    return;
  }

  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId));

  const [enrollment] = await db.insert(enrollmentsTable).values({
    userId,
    courseId,
    courseTitle: course?.title,
    courseThumbnail: course?.thumbnail,
    progress: 0,
  }).returning();

  if (course) {
    await db.update(coursesTable)
      .set({ enrollmentCount: (course.enrollmentCount || 0) + 1 })
      .where(eq(coursesTable.id, courseId));
  }

  res.status(201).json(enrollment);
});

router.patch("/enrollments/:id/progress", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const { progress } = req.body;

  const updates: Record<string, unknown> = { progress };
  if (progress >= 100) {
    updates.completedAt = new Date();
  }

  const [enrollment] = await db.update(enrollmentsTable).set(updates).where(eq(enrollmentsTable.id, id)).returning();
  if (!enrollment) {
    res.status(404).json({ error: "Enrollment not found" });
    return;
  }
  res.json(enrollment);
});

export default router;
