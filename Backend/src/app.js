import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Eventify AI Backend is running 🚀"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/ai", aiRoutes);

export default app;