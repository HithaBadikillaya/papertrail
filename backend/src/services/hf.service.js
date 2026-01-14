import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const HF_MODEL = "Qwen/Qwen2.5-7B-Instruct";

export async function generateCaption(prompt) {
  console.log("HF_API_KEY exists:", !!process.env.HF_API_KEY);
  const hf = new HfInference(process.env.HF_API_KEY);

  try {
    const response = await hf.chatCompletion({
      model: HF_MODEL,
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 120,
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("HF Service Error:", err);
    throw err;
  }
}
