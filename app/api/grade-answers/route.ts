import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Answer {
  questionNumber: number;
  question: string;
  answer: string;
}

/**
 * API route to grade student answers using OpenAI
 * Evaluates each answer and returns scores out of 10 for each question
 */
export async function POST(request: NextRequest) {
  try {
    const { passage, answers } = await request.json();

    if (!passage || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Passage and answers are required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    // Grade each answer individually
    const gradingPromises = answers.map(async (answerItem: Answer) => {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                'You are an expert educator grading reading comprehension answers from school students. Evaluate answers generously - focus on understanding, not perfect wording. Give partial credit for partially correct answers. Ignore minor spelling/grammar mistakes if the meaning is clear. Accept different phrasings that show the student understood the passage. Return ONLY a JSON object with "score" (number 0-10) where 10 = perfect, 7-9 = good understanding, 4-6 = partial understanding, 1-3 = minimal understanding, 0 = incorrect. Example: {"score": 8}',
            },
            {
              role: "user",
              content: `Passage: ${passage}\n\nQuestion: ${answerItem.question}\n\nStudent Answer: ${answerItem.answer}\n\nGrade this answer on a scale of 0-10. Be generous with partial credit and different phrasings. Return JSON with "score" (0-10).`,
            },
          ],
          temperature: 0.3, // Lower temperature for more consistent grading
          response_format: { type: "json_object" },
        });

        const responseContent = completion.choices[0]?.message?.content;
        if (!responseContent) {
          return { score: 0, questionNumber: answerItem.questionNumber };
        }

        const parsed = JSON.parse(responseContent);
        const score = parsed.score ?? 0;
        return {
          score: Math.max(0, Math.min(10, Math.round(score))), // Clamp between 0 and 10, round to integer
          questionNumber: answerItem.questionNumber,
        };
      } catch (error: any) {
        console.error(
          `Error grading answer ${answerItem.questionNumber}:`,
          error
        );
        return { score: 0, questionNumber: answerItem.questionNumber };
      }
    });

    // Wait for all answers to be graded
    const grades = await Promise.all(gradingPromises);

    // Calculate total score (sum of all scores out of totalQuestions * 10)
    const totalScore = grades.reduce((sum, g) => sum + g.score, 0);
    const maxPossibleScore = answers.length * 10;
    const percentage = Math.round((totalScore / maxPossibleScore) * 100);

    return NextResponse.json({
      totalScore,
      maxPossibleScore,
      percentage,
      totalQuestions: answers.length,
      detailedGrades: grades,
    });
  } catch (error: any) {
    console.error("Error grading answers:", error);
    return NextResponse.json(
      { error: "Failed to grade answers" },
      { status: 500 }
    );
  }
}
