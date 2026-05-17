import { Router, type IRouter } from "express";
import { eq, ilike, and, sql } from "drizzle-orm";
import { db, coursesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/courses", async (req, res): Promise<void> => {
  const { category, search, level, featured, limit } = req.query;

  let query = db.select().from(coursesTable).$dynamic();
  const conditions = [];

  if (category && typeof category === "string") {
    conditions.push(ilike(coursesTable.categoryName, `%${category}%`));
  }
  if (search && typeof search === "string") {
    conditions.push(ilike(coursesTable.title, `%${search}%`));
  }
  if (level && typeof level === "string") {
    conditions.push(eq(coursesTable.level, level));
  }
  if (featured === "true") {
    conditions.push(eq(coursesTable.isFeatured, true));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  if (limit && typeof limit === "string") {
    query = query.limit(parseInt(limit, 10));
  }

  const courses = await query;
  res.json(courses);
});

router.post("/courses", async (req, res): Promise<void> => {
  const { title, description, shortDescription, thumbnail, categoryId, instructorId, instructorName, instructorAvatar, level, language, durationHours, price, originalPrice, isFeatured, isFree, tags, categoryName } = req.body;

  if (!title || !description || !categoryId) {
    res.status(400).json({ error: "title, description and categoryId are required" });
    return;
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

  const [course] = await db.insert(coursesTable).values({
    title, description, shortDescription, thumbnail, categoryId, categoryName,
    instructorId, instructorName, instructorAvatar, level: level || "beginner",
    language: language || "English", durationHours: durationHours || 0,
    price: price || 0, originalPrice, isFeatured: isFeatured || false,
    isFree: isFree || false, tags, slug,
  }).returning();

  res.status(201).json(course);
});

router.get("/courses/featured", async (_req, res): Promise<void> => {
  const courses = await db.select().from(coursesTable).where(eq(coursesTable.isFeatured, true)).limit(8);
  res.json(courses);
});

router.get("/courses/trending", async (_req, res): Promise<void> => {
  const courses = await db.select().from(coursesTable)
    .orderBy(sql`${coursesTable.enrollmentCount} DESC`)
    .limit(8);
  res.json(courses);
});

router.get("/courses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, id));
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json(course);
});

router.patch("/courses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const [course] = await db.update(coursesTable).set(req.body).where(eq(coursesTable.id, id)).returning();
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json(course);
});

router.delete("/courses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const [course] = await db.delete(coursesTable).where(eq(coursesTable.id, id)).returning();
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
