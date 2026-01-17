"use client";

interface Answer {
  questionNumber: number;
  question: string;
  answer: string;
}

interface DetailedGrade {
  score: number;
  questionNumber: number;
  feedback?: string;
  whatWasBad?: string;
  howToImprove?: string;
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
    if (percentage >= 90)
      return {
        text: "You really understand this!",
        color: "text-emerald-300",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        message:
          "Excellent comprehension - you captured the key details and deeper meaning!",
      };
    if (percentage >= 80)
      return {
        text: "Strong understanding!",
        color: "text-emerald-300",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        message: "You demonstrated solid comprehension of the passage.",
      };
    if (percentage >= 70)
      return {
        text: "Good effort!",
        color: "text-blue-300",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        message:
          "You understood the main ideas. Review the feedback to deepen your skills.",
      };
    if (percentage >= 60)
      return {
        text: "You're learning!",
        color: "text-orange-300",
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        message:
          "You got some key points. Use the feedback to improve next time.",
      };
    return {
      text: "Keep practicing!",
      color: "text-orange-300",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      message:
        "Every practice builds your comprehension skills. Check the feedback to see what to focus on.",
    };
  };

  const gradeMessage = getGradeMessage();

  // Helper function to get grade for a specific question
  const getQuestionGrade = (questionNumber: number): DetailedGrade | null => {
    return (
      detailedGrades.find((g) => g.questionNumber === questionNumber) || null
    );
  };

  // Helper function to get score color
  const getScoreColor = (score: number): string => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-blue-600";
    if (score >= 4) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div
      className="bg-[#0a0e27] rounded-lg shadow-lg p-6 md:p-8 border border-purple-500/20"
      style={{
        boxShadow: "inset 0 0 20px rgba(210, 0, 255, 0.05)",
      }}
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Your Learning Summary
        </h2>

        {/* Grade display */}
        <div
          className={`mb-6 p-8 rounded-xl ${gradeMessage.bg} border-2 ${gradeMessage.border}`}
        >
          <div className="text-7xl font-bold text-purple-400 mb-3">
            {percentage}%
          </div>
          <div className={`text-3xl font-semibold ${gradeMessage.color} mb-3`}>
            {gradeMessage.text}
          </div>
          <p className="text-white/80 mb-4 text-base leading-relaxed">
            {gradeMessage.message}
          </p>
          <p className="text-white/60 text-lg">
            You scored{" "}
            <span className="font-bold text-white">{totalScore}</span> out of{" "}
            <span className="font-bold text-white">{maxPossibleScore}</span>{" "}
            points
          </p>
        </div>

        {/* Answers summary */}
        <div className="mt-8 text-left">
          <h3 className="text-2xl font-semibold mb-6 text-white">
            Detailed Feedback
          </h3>
          <div className="space-y-5">
            {answers.map((item) => {
              const grade = getQuestionGrade(item.questionNumber);
              const questionScore = grade?.score ?? 0;
              const hasFeedback =
                grade?.feedback || grade?.whatWasBad || grade?.howToImprove;

              return (
                <div
                  key={item.questionNumber}
                  className="border border-purple-500/20 rounded-lg p-5 bg-[#0f1629] hover:shadow-lg transition-shadow"
                  style={{
                    boxShadow: "inset 0 0 15px rgba(210, 0, 255, 0.03)",
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-semibold text-white text-lg">
                      Question {item.questionNumber}: {item.question}
                    </p>
                    <div className={`text-2xl font-bold ml-4`}>
                      <span
                        className={
                          questionScore >= 8
                            ? "text-emerald-400"
                            : questionScore >= 6
                            ? "text-blue-400"
                            : "text-orange-400"
                        }
                      >
                        {questionScore}/10
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 p-3 bg-purple-500/10 rounded border border-purple-500/20">
                    <p className="text-purple-300 font-medium text-sm">
                      Your Answer
                    </p>
                    <p className="text-white/80 mt-2 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>

                  {hasFeedback && (
                    <div className="mt-4 space-y-3">
                      {grade.feedback && (
                        <div className="p-3 bg-emerald-500/10 rounded border-l-4 border-emerald-500/40">
                          <p className="text-sm font-semibold text-emerald-300 mb-1">
                            Nice Work
                          </p>
                          <p className="text-emerald-200/80 text-sm leading-relaxed">
                            {grade.feedback}
                          </p>
                        </div>
                      )}
                      {grade.whatWasBad && (
                        <div className="p-3 bg-orange-500/10 rounded border-l-4 border-orange-500/40">
                          <p className="text-sm font-semibold text-orange-300 mb-1">
                            What to Reconsider
                          </p>
                          <p className="text-orange-200/80 text-sm leading-relaxed">
                            {grade.whatWasBad}
                          </p>
                        </div>
                      )}
                      {grade.howToImprove && (
                        <div className="p-3 bg-blue-500/10 rounded border-l-4 border-blue-500/40">
                          <p className="text-sm font-semibold text-blue-300 mb-1">
                            Next Time, Try This
                          </p>
                          <p className="text-blue-200/80 text-sm leading-relaxed">
                            {grade.howToImprove}
                          </p>
                        </div>
                      )}
                      {grade.evidenceFound && (
                        <div className="inline-block px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs font-semibold border border-purple-500/30">
                          Great evidence from the passage!
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
          className="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          style={{ boxShadow: "0 0 20px rgba(210, 0, 255, 0.3)" }}
        >
          Start Another Passage
        </button>
      </div>
    </div>
  );
}
