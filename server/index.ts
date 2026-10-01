import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { contactRouter } from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: "*", // Allows local dev frontend at localhost:5173
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Uptime & Status Endpoint
const startTime = Date.now();
app.get("/api/status", (_req: Request, res: Response) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  res.status(200).json({
    status: "operational",
    system: "Portfolio Engine",
    version: "1.0.0",
    uptimeSeconds,
    timestamp: new Date().toISOString(),
  });
});

// Contact Route
app.use("/api/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
