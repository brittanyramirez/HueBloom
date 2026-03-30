import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());
app.use ("/api/moods", moodRoutes);
app.use("/api/ai", aiRoutes);
// basic test route
app.get("/", (req, res) => {
  res.json({ message: "HueBloom backend is running" });
});

// health check route
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// database test route
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS test");
    res.json({
      ok: true,
      db: rows,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      ok: false,
      message: "Database connection failed",
    });
  }
});

// auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});