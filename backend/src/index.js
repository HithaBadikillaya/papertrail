import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import captionRoutes from "./routes/caption.routes.js";
import letterRoutes from "./routes/letter.routes.js";
import momRoutes from "./routes/mom.routes.js";
import { validateFfprobe } from "./services/mediaProcessor.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Template backend is running");
});

app.get("/healthcheck", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/api/captions", captionRoutes);
app.use("/api/letters", letterRoutes);
app.use("/api/mom", momRoutes);

// ---------------------------------------------------------------------------
// Startup
// ---------------------------------------------------------------------------

async function start() {
  // Validate external tool availability before accepting requests
  try {
    await validateFfprobe();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Allow up to 1 hour for large file uploads / long-running requests
  server.timeout = 3600000;
  server.keepAliveTimeout = 3600000;
}

start();