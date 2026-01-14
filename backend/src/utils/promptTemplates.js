export const buildPrompt = ({ platform, tone, content }) => {
  return `
You are an expert social media copywriter.

Generate a ${tone} caption for ${platform}.

Rules:
- Platform appropriate length
- No emojis unless natural
- Clear and engaging
- No hashtags unless platform supports it
- Output ONLY the caption text

User content:
"${content}"
`;
};
