import { render, screen, fireEvent } from '@testing-library/react';
import ResultsPage from '@/components/ResultsPage';

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

describe('ResultsPage', () => {
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnReset.mockClear();
  });

  it('displays grade and percentage', () => {
    render(
      <ResultsPage
        grade={8}
        totalQuestions={10}
        answers={mockAnswers}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('You scored 8 out of 10 questions correctly.')).toBeInTheDocument();
  });

  it('displays appropriate grade message for high scores', () => {
    render(
      <ResultsPage
        grade={9}
        totalQuestions={10}
        answers={mockAnswers}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });

  it('displays all answers', () => {
    render(
      <ResultsPage
        grade={2}
        totalQuestions={10}
        answers={mockAnswers}
        onReset={mockOnReset}
      />
    );
    
    expect(screen.getByText(/Question 1: What is the main idea?/)).toBeInTheDocument();
    expect(screen.getByText(/Question 2: Who is the author?/)).toBeInTheDocument();
  });

  it('calls onReset when reset button is clicked', () => {
    render(
      <ResultsPage
        grade={5}
        totalQuestions={10}
        answers={mockAnswers}
        onReset={mockOnReset}
      />
    );
    
    const resetButton = screen.getByText('Take Another Test');
    fireEvent.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalled();
  });
});
