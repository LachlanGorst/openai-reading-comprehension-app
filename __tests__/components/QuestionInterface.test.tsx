import { render, screen, fireEvent } from '@testing-library/react';
import QuestionInterface from '@/components/QuestionInterface';

describe('QuestionInterface', () => {
  const mockOnAnswerSubmit = jest.fn();

  beforeEach(() => {
    mockOnAnswerSubmit.mockClear();
  });

  it('renders question and answer form', () => {
    render(
      <QuestionInterface
        questionNumber={1}
        totalQuestions={10}
        question="What is the main idea?"
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    expect(screen.getByText('Question 1 of 10')).toBeInTheDocument();
    expect(screen.getByText('What is the main idea?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your answer here...')).toBeInTheDocument();
  });

  it('displays correct progress percentage', () => {
    render(
      <QuestionInterface
        questionNumber={5}
        totalQuestions={10}
        question="Test question"
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('calls onAnswerSubmit with answer when form is submitted', () => {
    render(
      <QuestionInterface
        questionNumber={1}
        totalQuestions={10}
        question="Test question"
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    const textarea = screen.getByPlaceholderText('Type your answer here...');
    const submitButton = screen.getByText('Submit Answer');
    
    fireEvent.change(textarea, { target: { value: 'My answer' } });
    fireEvent.click(submitButton);
    
    expect(mockOnAnswerSubmit).toHaveBeenCalledWith('My answer');
  });

  it('shows "Submit Final Answer" for last question', () => {
    render(
      <QuestionInterface
        questionNumber={10}
        totalQuestions={10}
        question="Last question"
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    expect(screen.getByText('Submit Final Answer')).toBeInTheDocument();
  });
});
