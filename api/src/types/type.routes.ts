import { Router } from "express";

import { TypeController } from "./type.controller";
import { TypeRepository } from "./type.repository";

const router = Router();

const controller = new TypeController(
    new TypeRepository()
);
/* routes to manage Types table */
router.get("/t-data",controller.download.bind(controller));
router.get("/types",controller.list.bind(controller));

export default router;