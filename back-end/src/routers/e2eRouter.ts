import { Router } from "express";
import { e2eController } from "../controllers/e2eController.js";

const e2eRouter = Router();

e2eRouter.post("/reset", e2eController.reset);
e2eRouter.post("/:id/update", e2eController.update);
e2eRouter.post("/populate", e2eController.populate);

export default e2eRouter;
