type CaptionRequest = {
  platform: string;
  tone: string;
  content: string;
};

export async function generateCaption(payload: CaptionRequest): Promise<string> {
  const response = await fetch(
    "http://localhost:5000/api/captions/generate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error("Caption generation failed");
  }

  return data.caption;
}
