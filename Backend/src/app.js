import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const distPath = path.join(__dirname, "../../Frontend/dist");
const frontendPath = path.join(distPath, "index.html");
const frontendOrigins = [
  "http://localhost:5173",
].filter(Boolean);

// ======================
// MIDDLEWARES
// ======================
app.use(cors({
  origin: frontendOrigins,
  credentials: true,
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
const healthCheck = (req, res) => {
  const frontendAvailable = existsSync(frontendPath);
  res.status(frontendAvailable ? 200 : 503).json({
    success: frontendAvailable,
    status: frontendAvailable ? "ok" : "unavailable",
    message: frontendAvailable
      ? "Eventify is ready"
      : "Frontend build is missing. Build Frontend/dist before starting the server.",
    timestamp: new Date().toISOString(),
  });
};

app.get("/health", healthCheck);
app.get("/api/health", healthCheck);

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ======================
// FRONTEND SERVE
// ======================
app.use(express.static(distPath));

app.get("/{*path}", (req, res, next) => {
  if (!req.accepts("html")) {
    return next();
  }

  res.sendFile(frontendPath, (error) => {
    if (error) next(error);
  });
});

export default app;
