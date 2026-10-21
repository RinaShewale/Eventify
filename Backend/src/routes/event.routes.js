import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  getEventChecklist,
  updateEvent,
  updateEventChecklist,
  deleteEvent
} from "../controllers/event.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createEvent);

router.get("/", getEvents);

router.get("/:id/checklist", getEventChecklist);

router.put("/:id/checklist", updateEventChecklist);

router.get("/:id", getEventById);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;