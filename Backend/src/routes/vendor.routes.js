import express from "express";
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor
} from "../controllers/vendor.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createVendor);

router.get("/event/:eventId", getVendors);

router.get("/:id", getVendorById);

router.put("/:id", updateVendor);

router.delete("/:id", deleteVendor);

export default router;