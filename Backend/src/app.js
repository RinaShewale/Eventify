import express from "express";
import cors from "cors";
import morgan from "morgan";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();
const frontendDistPath = resolve(dirname(fileURLToPath(import.meta.url)), "../../Frontend/dist");
const frontendIndexPath = resolve(frontendDistPath, "index.html");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());

app.get("/health", (req, res) => {
  const frontendAvailable = existsSync(frontendIndexPath);
  res.status(frontendAvailable ? 200 : 503).json({
    success: frontendAvailable,
    message: frontendAvailable
      ? "Eventify is ready"
      : "Frontend build is missing. Build Frontend/dist before starting the server.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/ai", aiRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

app.use(express.static(frontendDistPath));

app.use((req, res, next) => {
  if (req.method !== "GET" || !req.accepts("html")) {
    return next();
  }

  res.sendFile(frontendIndexPath, (error) => {
    if (error) next(error);
  });
});

export default app;