import * as express from "express";

import mainRoutes from "./main";

const router = express.Router();

router.use('/', mainRoutes);

export default router;