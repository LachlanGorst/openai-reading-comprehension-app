'use client';

import { useState } from 'react';

interface QuestionInterfaceProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  onAnswerSubmit: (answer: string) => void;
}

// Component for displaying questions and collecting answers
export default function QuestionInterface({
  questionNumber,
  totalQuestions,
  question,
  onAnswerSubmit,
}: QuestionInterfaceProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().length === 0) {
      alert('Please enter an answer before submitting.');
      return;
    }
    onAnswerSubmit(answer.trim());
    setAnswer(''); // Clear answer for next question
  };

  // Progress bar calculation
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question display */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Question {questionNumber}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {question}
        </p>
      </div>

      {/* Answer input form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
          Your Answer:
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {questionNumber === totalQuestions ? 'Submit Final Answer' : 'Submit Answer'}
        </button>
      </form>
    </div>
  );
}
