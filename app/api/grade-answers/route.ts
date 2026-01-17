import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Lazy initialization of OpenAI client (only when route is called, not at build time)
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

interface Answer {
  questionNumber: number;
  question: string;
  answer: string;
}

interface Question {
  id: number;
  type: string;
  question: string;
  idealAnswer: string;
  keyPoints: string[];
}

/**
 * API route to grade student answers using OpenAI
 * Evaluates each answer and returns scores out of 10 for each question
 */
export async function POST(request: NextRequest) {
  try {
    const { passage, questions, answers } = await request.json();

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

    // Grade each answer individually with structured feedback
    const gradingPromises = answers.map(async (answerItem: Answer) => {
      try {
        // Find the corresponding question with key points
        const questionData =
          questions?.find(
            (q: Question) =>
              q.id === answerItem.questionNumber ||
              (typeof q === "object" && q.question === answerItem.question)
          ) || null;

        // Sanitize student answer to prevent prompt injection
        const sanitizedAnswer = answerItem.answer
          .replace(/```/g, "")
          .replace(/\[INST\]/g, "")
          .replace(/\[\/INST\]/g, "")
          .trim();

        const openai = getOpenAIClient();
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                'You are a warm, encouraging reading comprehension coach focused on student learning, not grading. Your feedback should help students understand their thinking, not make them feel bad. Score based on comprehension demonstrated, not wording. IMPORTANT: If the student answers exactly what the text directly says, score 10/10 - they understand. Only deduct if the answer is wrong or misses key required information. Provide constructive, encouraging feedback that explains WHY the answer is correct or how to improve it. Return JSON: {"score": 0-10, "feedback": "encouraging, learning-focused feedback", "whatWasBad": "what missed (only if score < 10)", "howToImprove": "how to think about this next time", "evidenceFound": true/false}',
            },
            {
              role: "user",
              content: `Passage: ${passage}\n\nQuestion: ${
                answerItem.question
              }\n\n${
                questionData
                  ? `What good answers show: ${questionData.keyPoints.join(
                      ", "
                    )}\nExample answer: ${questionData.idealAnswer}\n\n`
                  : ""
              }Student Answer: ${sanitizedAnswer}\n\nGrade this answer (0-10) in a way that helps the student LEARN. If correct, tell them why their thinking is good. If not, gently explain what they missed and how to think about it. Focus on understanding, not punishment. Be encouraging!`,
            },
          ],
          temperature: 0.3,
          response_format: { type: "json_object" },
        });

        const responseContent = completion.choices[0]?.message?.content;
        if (!responseContent) {
          return { score: 0, questionNumber: answerItem.questionNumber };
        }

        const parsed = JSON.parse(responseContent);
        const score = parsed.score ?? 0;
        return {
          score: Math.max(0, Math.min(10, Math.round(score))),
          questionNumber: answerItem.questionNumber,
          feedback: parsed.feedback || "",
          whatWasBad: parsed.whatWasBad || "",
          howToImprove: parsed.howToImprove || "",
          evidenceFound: parsed.evidenceFound ?? false,
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
