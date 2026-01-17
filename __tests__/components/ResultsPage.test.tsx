import { render, screen, fireEvent } from '@testing-library/react';
import ResultsPage from '@/components/ResultsPage';
import '@testing-library/jest-dom';

const mockAnswers = [
  {
    questionNumber: 1,
    question: 'What is the main idea?',
    answer: 'The main idea is...',
  },
  {
    questionNumber: 2,
    question: 'Who is the author?',
    answer: 'The author is...',
  },
];

const mockDetailedGrades = [
  { score: 8, questionNumber: 1 },
  { score: 7, questionNumber: 2 },
];

describe('ResultsPage', () => {
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnReset.mockClear();
  });

  it('displays results and resets when button clicked', () => {
    const { container } = render(
      <ResultsPage
        percentage={75}
        totalScore={15}
        maxPossibleScore={20}
        totalQuestions={2}
        answers={mockAnswers}
        detailedGrades={mockDetailedGrades}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByText('75%')).toBeInTheDocument();
    // Check for score text (text is split across elements with spans)
    expect(container.textContent).toContain('You scored 15 out of 20 points!');
    expect(screen.getByText(/Question 1: What is the main idea?/)).toBeInTheDocument();
    
    const resetButton = screen.getByText('🎮 Take Another Test');
    fireEvent.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalled();
  });
});
