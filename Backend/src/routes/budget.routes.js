import express from "express";
import {
  createBudget,
  getBudget,
  updateBudget,
  deleteBudget
} from "../controllers/budget.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createBudget);

router.get("/:eventId", getBudget);

router.put("/:id", updateBudget);

router.delete("/:id", deleteBudget);

export default router;