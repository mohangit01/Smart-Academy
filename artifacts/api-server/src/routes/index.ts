import { Router, type IRouter } from "express";
import healthRouter from "./health";
import categoriesRouter from "./categories";
import coursesRouter from "./courses";
import enrollmentsRouter from "./enrollments";
import usersRouter from "./users";
import eventsRouter from "./events";
import jobsRouter from "./jobs";
import blogRouter from "./blog";
import communityRouter from "./community";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(categoriesRouter);
router.use(coursesRouter);
router.use(enrollmentsRouter);
router.use(usersRouter);
router.use(eventsRouter);
router.use(jobsRouter);
router.use(blogRouter);
router.use(communityRouter);

export default router;
