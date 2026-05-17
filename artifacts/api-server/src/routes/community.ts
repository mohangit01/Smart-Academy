import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, communityPostsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/community", async (_req, res): Promise<void> => {
  const posts = await db.select().from(communityPostsTable)
    .orderBy(sql`${communityPostsTable.createdAt} DESC`);
  res.json(posts);
});

router.post("/community", async (req, res): Promise<void> => {
  const { content, authorId, authorName, authorAvatar, authorRole, topic } = req.body;
  if (!content || !authorId || !authorName) {
    res.status(400).json({ error: "content, authorId, and authorName are required" });
    return;
  }
  const [post] = await db.insert(communityPostsTable).values({
    content, authorId, authorName, authorAvatar,
    authorRole: authorRole || "student", topic,
  }).returning();
  res.status(201).json(post);
});

router.post("/community/:id/like", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  const [post] = await db.select().from(communityPostsTable).where(eq(communityPostsTable.id, id));
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  const [updated] = await db.update(communityPostsTable)
    .set({ likeCount: (post.likeCount || 0) + 1 })
    .where(eq(communityPostsTable.id, id))
    .returning();
  res.json(updated);
});

export default router;
