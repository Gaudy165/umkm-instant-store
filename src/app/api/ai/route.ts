import { NextResponse } from "next/server";
import { AI_PROMPTS } from "@/prompts/aiPrompts";
import { generateAIContent } from "@/lib/aiService";
import { AIRequestBody } from "@/types/ai";

export async function POST(req: Request) {
  try {
    const { prompt, type }: AIRequestBody = await req.json();

    const systemPrompt = AI_PROMPTS[type];

    if (!systemPrompt) {
      return NextResponse.json(
        { error: "Invalid AI request type" },
        { status: 400 }
      );
    }

    const data = await generateAIContent(prompt, systemPrompt);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("AI Generation Error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
