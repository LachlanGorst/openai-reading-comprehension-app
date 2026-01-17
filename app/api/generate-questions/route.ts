import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Lazy initialization of OpenAI client (only when route is called, not at build time)
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

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

    // Generate questions with types, ideal answers, and key points
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert educator creating engaging reading comprehension questions for students. Generate exactly 3 questions with different types: 1 easy literal question, 1 medium inference question, 1 challenging analysis question. For each question, provide the question text, type, ideal answer, and 2-3 key points that show understanding. Return JSON: {"questions": [{"id": 1, "type": "easy"|"medium"|"challenge", "question": "...", "idealAnswer": "...", "keyPoints": ["point1", "point2"]}, ...]}',
        },
        {
          role: "user",
          content: `Generate 3 diverse reading comprehension questions for this passage:\n\n${passage}\n\nMake them engaging and appropriate for students.`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    // Parse the response - OpenAI will return JSON with structured questions
    try {
      const parsed = JSON.parse(responseContent);
      const questions = parsed.questions || [];
      
      // Ensure we have exactly 3 questions
      if (questions.length !== 3) {
        throw new Error(`Expected 3 questions, got ${questions.length}`);
      }

      // Validate structure and add IDs if missing
      const validatedQuestions = questions.map((q: any, index: number) => ({
        id: q.id || index + 1,
        type: q.type || (index === 0 ? 'easy' : index === 1 ? 'medium' : 'challenge'),
        question: q.question || '',
        idealAnswer: q.idealAnswer || '',
        keyPoints: Array.isArray(q.keyPoints) ? q.keyPoints : [],
      }));

      return NextResponse.json({ questions: validatedQuestions });
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      throw new Error("Invalid response format from OpenAI");
    }
  } catch (error: any) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
