'use client';

interface Answer {
  questionNumber: number;
  question: string;
  answer: string;
}

interface DetailedGrade {
  score: number;
  questionNumber: number;
  feedback?: string;
  praise?: string;
  improvement?: string;
  evidenceFound?: boolean;
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
    if (percentage >= 90) return { text: '🌟 Excellent!', emoji: '🎉', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 80) return { text: '✨ Great Job!', emoji: '👏', color: 'text-green-500', bg: 'bg-green-50' };
    if (percentage >= 70) return { text: '👍 Good Work!', emoji: '💪', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { text: '📚 Not Bad!', emoji: '🎯', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { text: '💡 Keep Practicing!', emoji: '🌱', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const gradeMessage = getGradeMessage();

  // Helper function to get grade for a specific question
  const getQuestionGrade = (questionNumber: number): DetailedGrade | null => {
    return detailedGrades.find((g) => g.questionNumber === questionNumber) || null;
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
        <div className={`mb-6 p-6 rounded-lg ${gradeMessage.bg} border-2 border-current`}>
          <div className="text-6xl font-bold text-blue-600 mb-2 animate-pulse">
            {percentage}%
          </div>
          <div className={`text-2xl font-semibold ${gradeMessage.color} mb-2`}>
            {gradeMessage.emoji} {gradeMessage.text}
          </div>
          <p className="text-gray-700 mt-2 text-lg">
            You scored <span className="font-bold">{totalScore}</span> out of <span className="font-bold">{maxPossibleScore}</span> points!
          </p>
        </div>

        {/* Answers summary */}
        <div className="mt-8 text-left">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Your Answers:
          </h3>
          <div className="space-y-4">
            {answers.map((item) => {
              const grade = getQuestionGrade(item.questionNumber);
              const questionScore = grade?.score ?? 0;
              const hasFeedback = grade?.feedback || grade?.praise || grade?.improvement;
              
              return (
                <div
                  key={item.questionNumber}
                  className="border-2 border-gray-200 rounded-lg p-5 bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-semibold text-gray-800 text-lg">
                      Question {item.questionNumber}: {item.question}
                    </p>
                    <div className={`text-2xl font-bold ${getScoreColor(questionScore)} ml-4 flex items-center gap-1`}>
                      {questionScore >= 8 ? '⭐' : questionScore >= 6 ? '👍' : ''}
                      {questionScore}/10
                    </div>
                  </div>
                  
                  <div className="mb-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-gray-700 font-medium">Your Answer:</p>
                    <p className="text-gray-600 mt-1">{item.answer}</p>
                  </div>

                  {hasFeedback && (
                    <div className="mt-3 space-y-2">
                      {grade.praise && (
                        <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                          <p className="text-sm font-semibold text-green-800 mb-1">💚 What You Did Well:</p>
                          <p className="text-green-700 text-sm">{grade.praise}</p>
                        </div>
                      )}
                      {grade.improvement && (
                        <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                          <p className="text-sm font-semibold text-yellow-800 mb-1">💡 Tip for Next Time:</p>
                          <p className="text-yellow-700 text-sm">{grade.improvement}</p>
                        </div>
                      )}
                      {grade.feedback && (
                        <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                          <p className="text-sm font-semibold text-blue-800 mb-1">📝 Feedback:</p>
                          <p className="text-blue-700 text-sm">{grade.feedback}</p>
                        </div>
                      )}
                      {grade.evidenceFound && (
                        <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                          ✅ Evidence Found!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          🎮 Take Another Test
        </button>
      </div>
    </div>
  );
}
