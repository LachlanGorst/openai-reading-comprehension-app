"use client";

import { useState, useEffect } from "react";
import QuestionInterface from "@/components/QuestionInterface";
import ResultsPage from "@/components/ResultsPage";

// Main application state types
type TestState = "loading" | "questions" | "results";

interface Answer {
  questionNumber: number;
  question: string;
  answer: string;
}

interface PassageData {
  passage: {
    id: string;
    title: string;
    content: string;
  };
}

export default function Home() {
  // Application state management
  const [testState, setTestState] = useState<TestState>("loading");
  const [passage, setPassage] = useState<string>("");
  const [passageTitle, setPassageTitle] = useState<string>("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [grade, setGrade] = useState<number | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [detailedGrades, setDetailedGrades] = useState<any[]>([]);
  const [percentage, setPercentage] = useState<number | null>(null);

  // Load the fixed passage on mount
  useEffect(() => {
    const loadPassage = async () => {
      try {
        const response = await fetch("/data/passages.json");
        const data: PassageData = await response.json();
        setPassage(data.passage.content);
        setPassageTitle(data.passage.title);

        // Generate questions using the loaded passage
        const questionsResponse = await fetch("/api/generate-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passage: data.passage.content }),
        });

        const questionsData = await questionsResponse.json();
        if (questionsData.questions && Array.isArray(questionsData.questions)) {
          setQuestions(questionsData.questions);
          setTestState("questions");
        } else {
          throw new Error("Failed to generate questions");
        }
      } catch (error) {
        console.error("Error loading passage or generating questions:", error);
        alert(
          "Failed to load passage or generate questions. Please refresh the page."
        );
      }
    };

    loadPassage();
  }, []);

  // Handle answer submission for current question
  const handleAnswerSubmit = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswer: Answer = {
      questionNumber: currentQuestionIndex + 1,
      question:
        typeof currentQuestion === "string"
          ? currentQuestion
          : currentQuestion.question,
      answer: answer,
    };

    setAnswers([...answers, newAnswer]);

    // Move to next question or finish test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, grade the test
      gradeTest([...answers, newAnswer]);
    }
  };

  // Grade all answers using OpenAI API
  const gradeTest = async (allAnswers: Answer[]) => {
    setIsGrading(true);
    try {
      const response = await fetch("/api/grade-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passage,
          questions: questions, // Send full question objects with key points
          answers: allAnswers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API errors
        const errorMessage =
          data.message || data.error || "Failed to grade test";
        alert(`Error: ${errorMessage}`);
        setIsGrading(false);
        return;
      }

      if (data.percentage !== undefined && data.detailedGrades) {
        setPercentage(data.percentage);
        setGrade(data.totalScore); // Store total score for display
        setDetailedGrades(data.detailedGrades);
        setTestState("results");
      } else {
        alert("Unexpected response from grading service. Please try again.");
      }
    } catch (error) {
      console.error("Error grading test:", error);
      alert(
        "Failed to grade test. Please check your connection and try again."
      );
    } finally {
      setIsGrading(false);
    }
  };

  // Reset test to start over
  const handleReset = () => {
    setTestState("loading");
    setPassage("");
    setPassageTitle("");
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setGrade(null);
    setIsGrading(false);
    setDetailedGrades([]);
    setPercentage(null);

    // Reload the passage and questions
    window.location.reload();
  };

  // Render appropriate component based on test state
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📚 Reading Comprehension Adventure
        </h1>

        {testState === "loading" && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center max-w-2xl mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-700">
              Loading your passage and generating questions...
            </p>
          </div>
        )}

        {testState === "questions" && questions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Passage Display - Sticky on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4 max-h-[calc(100vh-100px)] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  📖 Passage
                </h2>
                <h3 className="text-lg font-medium text-blue-600 mb-4">
                  {passageTitle}
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                  {passage}
                </p>
              </div>
            </div>

            {/* Question Interface */}
            <div className="lg:col-span-2">
              {isGrading && (
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-lg text-gray-700">
                    Grading your answers...
                  </p>
                </div>
              )}
              {!isGrading && (
                <QuestionInterface
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                  question={
                    typeof questions[currentQuestionIndex] === "string"
                      ? questions[currentQuestionIndex]
                      : questions[currentQuestionIndex].question
                  }
                  questionType={
                    typeof questions[currentQuestionIndex] === "object"
                      ? questions[currentQuestionIndex].type
                      : undefined
                  }
                  onAnswerSubmit={handleAnswerSubmit}
                />
              )}
            </div>
          </div>
        )}

        {testState === "results" && grade !== null && percentage !== null && (
          <ResultsPage
            percentage={percentage}
            totalScore={grade}
            maxPossibleScore={questions.length * 10}
            totalQuestions={questions.length}
            answers={answers}
            detailedGrades={detailedGrades}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
