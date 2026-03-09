import { geminiClient } from "./geminiClient";

export async function generateAIContent(
  prompt: string,
  systemPrompt: string
) {
  const result = await geminiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
    },
  });

  const text = result.text ?? "";

  if (!text) {
    throw new Error("AI returned empty response");
  }

  return JSON.parse(text);
}
