import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * API route to generate 3 comprehension questions from a reading passage
 * Uses OpenAI GPT to create questions specific to the provided text
 */
export async function POST(request: NextRequest) {
  try {
    const { passage } = await request.json();

    if (!passage || typeof passage !== "string") {
      return NextResponse.json(
        { error: "Passage is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    // Generate questions using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert educator creating reading comprehension questions. Generate exactly 3 comprehension questions based on the provided passage. Return a JSON object with a "questions" array containing exactly 3 question strings. Format: {"questions": ["Question 1?", "Question 2?", "Question 3?"]}',
        },
        {
          role: "user",
          content: `Generate 3 reading comprehension questions for this passage:\n\n${passage}`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    // Parse the response - OpenAI will return JSON with questions array
    let questions: string[] = [];
    try {
      const parsed = JSON.parse(responseContent);
      questions = parsed.questions || [];
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      throw new Error("Invalid response format from OpenAI");
    }

    // Ensure we have exactly 3 questions
    if (questions.length !== 3) {
      throw new Error(`Expected 3 questions, got ${questions.length}`);
    }

    return NextResponse.json({ questions });
  } catch (error: any) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
