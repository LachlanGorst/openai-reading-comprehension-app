"use client";

import { useState } from "react";

interface QuestionInterfaceProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  questionType?: string;
  hint?: string;
  onAnswerSubmit: (answer: string) => void;
}

// Component for displaying questions and collecting answers
export default function QuestionInterface({
  questionNumber,
  totalQuestions,
  question,
  questionType,
  hint,
  onAnswerSubmit,
}: QuestionInterfaceProps) {
  const getQuestionTypeInfo = () => {
    switch (questionType) {
      case "easy":
        return {
          name: "Recall",
          color:
            "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        };
      case "medium":
        return {
          name: "Think Deeper",
          color: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
        };
      case "challenge":
        return {
          name: "Critical Thinking",
          color: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
        };
      default:
        return null;
    }
  };

  const typeInfo = getQuestionTypeInfo();
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().length === 0) {
      alert("Please enter an answer before submitting.");
      return;
    }
    onAnswerSubmit(answer.trim());
    setAnswer(""); // Clear answer for next question
  };

  // Progress bar calculation
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div
      className="bg-[#0f1629] rounded-lg shadow-lg p-6 md:p-8 border border-purple-500/20"
      style={{
        boxShadow: "inset 0 0 20px rgba(210, 0, 255, 0.05)",
      }}
    >
      {/* Motivational header */}
      <div className="mb-6 pb-4 border-b border-purple-500/20">
        <p className="text-sm text-purple-300 font-medium mb-2">
          Deepen your understanding
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-purple-200">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-purple-200">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="w-full bg-purple-900/30 rounded-full h-2.5 mt-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-orange-400 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question display */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Question {questionNumber}
          </h2>
          {typeInfo && (
            <span
              className={`px-3 py-1 rounded-lg text-sm font-medium ${typeInfo.color}`}
            >
              {typeInfo.name}
            </span>
          )}
        </div>
        <p className="text-lg text-white/90 leading-relaxed">{question}</p>
      </div>

      {/* Hint section */}
      {hint && (
        <div className="mb-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-sm font-semibold text-orange-300 hover:text-orange-200 flex items-center gap-2"
          >
            {showHint ? "Hide hint" : "Show hint"}
          </button>
          {showHint && (
            <p className="mt-3 text-sm text-orange-200/80 italic">{hint}</p>
          )}
        </div>
      )}

      {/* Answer input form */}
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="answer"
          className="block text-sm font-medium text-white mb-2"
        >
          Your Answer:
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Use the passage to support your thinking..."
          className="w-full h-32 p-4 border border-purple-500/20 rounded-lg bg-[#1a1f3a] text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          style={{ boxShadow: "0 0 20px rgba(210, 0, 255, 0.3)" }}
        >
          {questionNumber === totalQuestions
            ? "Submit Final Answer"
            : "Next Question"}
        </button>
      </form>
    </div>
  );
}
