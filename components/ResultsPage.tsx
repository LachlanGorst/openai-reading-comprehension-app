'use client';

interface Answer {
  questionNumber: number;
  question: string;
  answer: string;
}

interface DetailedGrade {
  score: number;
  questionNumber: number;
}

interface ResultsPageProps {
  percentage: number;
  totalScore: number;
  maxPossibleScore: number;
  totalQuestions: number;
  answers: Answer[];
  detailedGrades: DetailedGrade[];
  onReset: () => void;
}

// Component for displaying test results and grade
export default function ResultsPage({
  percentage,
  totalScore,
  maxPossibleScore,
  totalQuestions,
  answers,
  detailedGrades,
  onReset,
}: ResultsPageProps) {
  const getGradeMessage = () => {
    if (percentage >= 90) return { text: 'Excellent!', color: 'text-green-600' };
    if (percentage >= 80) return { text: 'Great Job!', color: 'text-green-500' };
    if (percentage >= 70) return { text: 'Good Work!', color: 'text-blue-600' };
    if (percentage >= 60) return { text: 'Not Bad!', color: 'text-yellow-600' };
    return { text: 'Keep Practicing!', color: 'text-orange-600' };
  };

  const gradeMessage = getGradeMessage();

  // Helper function to get score for a specific question
  const getQuestionScore = (questionNumber: number): number => {
    const grade = detailedGrades.find((g) => g.questionNumber === questionNumber);
    return grade?.score ?? 0;
  };

  // Helper function to get score color
  const getScoreColor = (score: number): string => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Test Results</h2>
        
        {/* Grade display */}
        <div className="mb-6">
          <div className="text-6xl font-bold text-blue-600 mb-2">
            {percentage}%
          </div>
          <div className={`text-2xl font-semibold ${gradeMessage.color}`}>
            {gradeMessage.text}
          </div>
          <p className="text-gray-600 mt-2">
            You scored {totalScore} out of {maxPossibleScore} points.
          </p>
        </div>

        {/* Answers summary */}
        <div className="mt-8 text-left">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Your Answers:
          </h3>
          <div className="space-y-4">
            {answers.map((item) => {
              const questionScore = getQuestionScore(item.questionNumber);
              return (
                <div
                  key={item.questionNumber}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-800">
                      Question {item.questionNumber}: {item.question}
                    </p>
                    <div className={`text-xl font-bold ${getScoreColor(questionScore)} ml-4`}>
                      {questionScore}/10
                    </div>
                  </div>
                  <p className="text-gray-600 pl-4 border-l-4 border-blue-500">
                    {item.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Take Another Test
        </button>
      </div>
    </div>
  );
}
