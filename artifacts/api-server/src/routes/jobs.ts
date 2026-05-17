import { Router, type IRouter } from "express";
import { eq, ilike, and, or } from "drizzle-orm";
import { db, jobsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/jobs", async (req, res): Promise<void> => {
  const { search, type } = req.query;
  const conditions = [];

  if (search && typeof search === "string") {
    conditions.push(or(ilike(jobsTable.title, `%${search}%`), ilike(jobsTable.company, `%${search}%`)));
  }
  if (type && typeof type === "string") {
    conditions.push(eq(jobsTable.type, type));
  }

  let query = db.select().from(jobsTable).$dynamic();
  if (conditions.length > 0) query = query.where(and(...conditions));
  const jobs = await query;
  res.json(jobs);
});

router.post("/jobs", async (req, res): Promise<void> => {
  const { title, company, location, type, description, category, companyLogo, salaryMin, salaryMax, currency, requirements, skills, experienceYears, isRemote, expiresAt } = req.body;
  if (!title || !company || !description) {
    res.status(400).json({ error: "title, company, and description are required" });
    return;
  }
  const [job] = await db.insert(jobsTable).values({
    title, company, location: location || "Remote", type: type || "full-time",
    description, category: category || "Technology", companyLogo, salaryMin, salaryMax,
    currency: currency || "USD", requirements, skills, experienceYears: experienceYears || 0,
    isRemote: isRemote || false, expiresAt: expiresAt ? new Date(expiresAt) : undefined,
  }).returning();
  res.status(201).json(job);
});

router.get("/jobs/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, id));
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(job);
});

export default router;
