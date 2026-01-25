import express from "express";
import cors from "cors";
//import dotenv from "dotenv";
import templateRoutes from "./routes/templateRoutes.js";

//dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Template backend is running");
});


app.use("/api/templates", templateRoutes);

app.get("/healthcheck", (_, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
