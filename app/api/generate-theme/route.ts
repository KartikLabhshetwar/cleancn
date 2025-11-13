import { NextResponse } from "next/server";
import { parsePrompt } from "@/lib/prompt-mapper";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    const theme = parsePrompt(prompt);

    return NextResponse.json({ theme, prompt });
  } catch (error) {
    console.error("Error generating theme:", error);
    return NextResponse.json(
      { error: "Failed to generate theme" },
      { status: 500 }
    );
  }
}

