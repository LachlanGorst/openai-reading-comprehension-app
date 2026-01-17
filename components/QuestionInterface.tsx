'use client';

import { useState } from 'react';

interface QuestionInterfaceProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  questionType?: string;
  onAnswerSubmit: (answer: string) => void;
}

// Component for displaying questions and collecting answers
export default function QuestionInterface({
  questionNumber,
  totalQuestions,
  question,
  questionType,
  onAnswerSubmit,
}: QuestionInterfaceProps) {
  const getQuestionTypeInfo = () => {
    switch (questionType) {
      case 'easy':
        return { name: 'Quick Win', emoji: '⭐', color: 'bg-green-100 text-green-800' };
      case 'medium':
        return { name: 'Think Deep', emoji: '🧠', color: 'bg-blue-100 text-blue-800' };
      case 'challenge':
        return { name: 'Super Challenge', emoji: '🚀', color: 'bg-purple-100 text-purple-800' };
      default:
        return null;
    }
  };

  const typeInfo = getQuestionTypeInfo();
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
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Question {questionNumber}
          </h2>
          {typeInfo && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeInfo.color}`}>
              {typeInfo.emoji} {typeInfo.name}
            </span>
          )}
        </div>
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          {questionNumber === totalQuestions ? '🎯 Submit Final Answer' : '✨ Submit Answer'}
        </button>
      </form>
    </div>
  );
}
