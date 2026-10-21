import express from "express";
import passport from "passport";
import {
  googleCallback,
  getMe,
  logout
} from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  googleCallback
);

router.get("/me", protect, getMe);

router.post("/logout", protect, logout);

export default router;