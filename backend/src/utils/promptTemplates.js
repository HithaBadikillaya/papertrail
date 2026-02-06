export const buildPrompt = ({ platform, tone, content, analysis, template }) => {
  // Validate and normalize inputs
  const safePlatform = (platform || "Social Media").toLowerCase();
  const safeTone = (tone || "neutral").toLowerCase();

  // Basic content sanitization to prevent prompt injection
  const safeContent = content.replace(/[\${}]/g, "");

  const topics = analysis?.topics?.join(", ") || "various topics";
  const intents = analysis?.intent || "social engagement";
  const highlights = analysis?.highlights?.join("; ") || "key points";

  // If a template is provided, follow its structure
  if (template) {
    const layoutInstructions = template.layout
      .map(section => `- [${section.label}]: ${section.rules?.join(". ") || "Follow general tone"}`)
      .join("\n");

    return `
You are a expert content creator.
Generate content following this template: "${template.name}" (Type: ${template.type}).

Context Analysis:
- Topics: ${topics}
- User Intent: ${intents}
- Highlights: ${highlights}

Structure/Layout:
${layoutInstructions}

Global Rules:
${template.global_rules?.map(r => `- ${r}`).join("\n") || "No specific global rules."}

Strategic Instruction:
${template.prompt_instruction}

User Raw Content:
"${safeContent}"

Output ONLY the final content.
`;
  }

  // Default platform-based logic
  const platformInstructions = {
    instagram: "- Visual and engaging\n- Uses creative line breaks\n- Focuses on emotional connection\n- Max 2200 characters",
    twitter: "- Concise and punchy\n- Under 280 characters\n- High impact first sentence\n- Use 1-2 relevant hashtags",
    linkedin: "- Professional, career-oriented, and storytelling style\n- Focuses on value and insights\n- Thought leadership tone\n- Clear spacing between paragraphs",
    youtube: "- Hook-driven to increase watch time\n- Summarizes key value points\n- Includes a clear Call to Action",
    whatsapp: "- Conversational and direct\n- Friendly and personal\n- Easy to read and share",
  };

  const instruction = platformInstructions[safePlatform] || "- Platform appropriate length and style";

  return `
You are a world-class social media strategist and copywriter.
Your goal is to transform rough thoughts into highly personalized, platform-native captions.

Context Analysis:
- Primary Topics: ${topics}
- User Intent: ${intents}
- Key Highlights: ${highlights}

Platform: ${safePlatform}
Vibe: ${safeTone}

Strategic Instructions:
${instruction}
- BE SPECIFIC: Use the provided topics and highlights to ground the caption in reality.
- AVOID REPETITION: Don't use generic openers like "Did you know?" or "Check this out!" unless specifically appropriate.
- UNIQUE VOICE: Adapt the ${safeTone} vibe specifically to the ${intents} intent.
- NO EMOJIS (unless they add significant value to the ${safePlatform} style).
- Output ONLY the caption text.

Rough Content to Transform:
"${safeContent}"
`;
};
