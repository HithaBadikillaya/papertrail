import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import captionRoutes from "./routes/caption.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/healthcheck", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/api/captions", captionRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
