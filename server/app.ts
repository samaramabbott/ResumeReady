import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

// Serve static client build
app.use(express.static(path.join(process.cwd(), "dist")));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Fallback to client SPA
app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

export default app;
