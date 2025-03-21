import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { customAnswers } from "@/db/schema";

export async function POST(req: Request) {
  const { userId, challengeId, answerText } = await req.json();

  try {
    await db.insert(customAnswers).values({
      userId,
      challengeId,
      answerText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to add custom answer" },
      { status: 500 }
    );
  }
}
