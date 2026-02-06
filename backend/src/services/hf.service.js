import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

/**
 * AI Service Configuration
 * Model: meta-llama/Meta-Llama-3-8B-Instruct
 * Why: Modern, high-performance instruction-tuned model compatible with the HF Inference Router.
 */
const MODEL = "meta-llama/Meta-Llama-3-8B-Instruct";
const hf = new InferenceClient(process.env.HF_API_KEY);

if (!process.env.HF_API_KEY) {
  console.warn("D.A.S.H Warning: HF_API_KEY is missing via process.env");
}

/**
 * Generates a concise social media caption using the chatCompletion API.
 * Uses only model, messages, max_tokens, and temperature as requested.
 */
export async function generateCaption(prompt) {
  try {
    const response = await hf.chatCompletion({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are a social media copywriter. Generate only the caption text. No preamble, no hashtags."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("Invalid response from Hugging Face Inference Router");
    }

    return response.choices[0].message.content.trim();
  } catch (err) {
    if (err.httpResponse && err.httpResponse.body) {
      console.error("HF Router Detail:", JSON.stringify(err.httpResponse.body));
    }
    console.error("CAPTION_GENERATION_SERVICE_ERROR:", err.message);
    throw err;
  }
}
