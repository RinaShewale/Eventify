// Backend/src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(cors({
  origin: [
    "https://eventify-livid.vercel.app/",
    "http://localhost:5173",
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(passport.initialize());


// ======================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/ai", aiRoutes);

// ======================
// HEALTH CHECK
// ======================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ======================
// FRONTEND SERVE (FIXED)
// ======================

const distPath = path.join(__dirname, "../../Frontend/dist");

app.use(express.static(distPath));

// ✅ IMPORTANT FIX HERE
app.get("*name", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ======================
export default app;