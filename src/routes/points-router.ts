import { Router } from "express";
import PointsController from "../controllers/pointsController";

const router = Router();

const pointsController = new PointsController();

router.post("/points", pointsController.create);
router.get("/points", pointsController.index);
router.get("/points/:id", pointsController.show);

export default router;
