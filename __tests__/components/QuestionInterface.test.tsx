import { render, screen, fireEvent } from '@testing-library/react';
import QuestionInterface from '@/components/QuestionInterface';

describe('QuestionInterface', () => {
  const mockOnAnswerSubmit = jest.fn();

  beforeEach(() => {
    mockOnAnswerSubmit.mockClear();
  });

  it('renders question and submits answer', () => {
    render(
      <QuestionInterface
        questionNumber={1}
        totalQuestions={3}
        question="What is the main idea?"
        onAnswerSubmit={mockOnAnswerSubmit}
      />
    );
    
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('What is the main idea?')).toBeInTheDocument();
    
    const textarea = screen.getByPlaceholderText('Type your answer here...');
    const submitButton = screen.getByText('Submit Answer');
    
    fireEvent.change(textarea, { target: { value: 'My answer' } });
    fireEvent.click(submitButton);
    
    expect(mockOnAnswerSubmit).toHaveBeenCalledWith('My answer');
  });
});
