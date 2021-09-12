import {Router} from "express";
import categoriesRouter from "./categories.routes";
import specificationsRouter from "./specifications.routes";
import usersRouter from "./users.routes";
import authenticateRouter from "./authenticate.routes";

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);
router.use('/users', usersRouter);
router.use(authenticateRouter);

export default router;
