import { Router, type IRouter } from "express";
import { eq, gte, sql } from "drizzle-orm";
import { db, eventsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/events", async (req, res): Promise<void> => {
  const { upcoming } = req.query;
  if (upcoming === "true") {
    const events = await db.select().from(eventsTable)
      .where(gte(eventsTable.scheduledAt, new Date()))
      .orderBy(eventsTable.scheduledAt);
    res.json(events);
    return;
  }
  const events = await db.select().from(eventsTable).orderBy(sql`${eventsTable.scheduledAt} DESC`);
  res.json(events);
});

router.post("/events", async (req, res): Promise<void> => {
  const { title, description, thumbnail, type, hostName, hostAvatar, scheduledAt, durationMinutes, maxAttendees, isFree, price, meetingUrl, tags } = req.body;
  if (!title || !hostName || !scheduledAt) {
    res.status(400).json({ error: "title, hostName, and scheduledAt are required" });
    return;
  }
  const [event] = await db.insert(eventsTable).values({
    title, description, thumbnail, type: type || "webinar", hostName, hostAvatar,
    scheduledAt: new Date(scheduledAt), durationMinutes: durationMinutes || 60,
    maxAttendees, isFree: isFree ?? true, price: price || 0, meetingUrl, tags,
  }).returning();
  res.status(201).json(event);
});

router.get("/events/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [event] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));
  if (!event) {
    res.status(404).json({ error: "Event not found" });
    return;
  }
  res.json(event);
});

export default router;
