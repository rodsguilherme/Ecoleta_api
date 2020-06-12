import { Router } from "express";
import ItemsController from "../controllers/itemsController";

const router = Router();

const itemController = new ItemsController();

router.get("/items", itemController.index);

export default router;
