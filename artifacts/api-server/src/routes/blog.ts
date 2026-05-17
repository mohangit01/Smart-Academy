import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, blogPostsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/blog", async (req, res): Promise<void> => {
  const { category, limit } = req.query;

  let query = db.select().from(blogPostsTable).$dynamic();
  if (category && typeof category === "string") {
    query = query.where(eq(blogPostsTable.category, category));
  }
  if (limit && typeof limit === "string") {
    query = query.limit(parseInt(limit, 10));
  }
  const posts = await query;
  res.json(posts);
});

router.post("/blog", async (req, res): Promise<void> => {
  const { title, content, authorId, authorName, category, excerpt, thumbnail, authorAvatar, tags, readMinutes } = req.body;
  if (!title || !content || !authorId || !authorName) {
    res.status(400).json({ error: "title, content, authorId, and authorName are required" });
    return;
  }
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
  const [post] = await db.insert(blogPostsTable).values({
    title, slug, content, authorId, authorName, category: category || "General",
    excerpt, thumbnail, authorAvatar, tags, readMinutes: readMinutes || 5,
  }).returning();
  res.status(201).json(post);
});

router.get("/blog/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  const [post] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id));
  if (!post) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }
  await db.update(blogPostsTable).set({ viewCount: (post.viewCount || 0) + 1 }).where(eq(blogPostsTable.id, id));
  res.json({ ...post, viewCount: (post.viewCount || 0) + 1 });
});

export default router;
