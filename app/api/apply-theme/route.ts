import { NextResponse } from "next/server";
import { ThemeConfig } from "@/lib/tokens";

export async function POST(request: Request) {
  try {
    const { theme } = await request.json();

    if (!theme || typeof theme !== "object") {
      return NextResponse.json(
        { error: "Theme configuration is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Theme validated successfully",
      theme: theme as ThemeConfig,
    });
  } catch (error) {
    console.error("Error applying theme:", error);
    return NextResponse.json(
      { error: "Failed to apply theme" },
      { status: 500 }
    );
  }
}

