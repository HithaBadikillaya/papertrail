import express from "express";
import { buildPrompt } from "../utils/promptTemplates.js";
import { generateCaption } from "../services/hf.service.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { platform, tone, content } = req.body;

    if (!platform || !tone || !content) {
      return res.status(400).json({
        success: false,
        message: "platform, tone, and content are required",
      });
    }

    const prompt = buildPrompt({ platform, tone, content });
    const caption = await generateCaption(prompt);

    res.json({
      success: true,
      caption,
    });
  } catch (error) {
    console.error("Caption Error:", error.message);
    res.status(500).json({
      success: false,
      message: `Caption generation failed: ${error.message}`,
    });
  }
});

export default router;
