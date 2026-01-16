import { render, screen, fireEvent } from '@testing-library/react';
import PassageDisplay from '@/components/PassageDisplay';

describe('PassageDisplay', () => {
  const mockOnPassageSubmit = jest.fn();

  beforeEach(() => {
    mockOnPassageSubmit.mockClear();
  });

  it('renders the passage input form', () => {
    render(<PassageDisplay onPassageSubmit={mockOnPassageSubmit} />);
    
    expect(screen.getByText('Enter Reading Passage')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your reading passage here...')).toBeInTheDocument();
    expect(screen.getByText('Start Test')).toBeInTheDocument();
  });

  it('shows character count', () => {
    render(<PassageDisplay onPassageSubmit={mockOnPassageSubmit} />);
    
    const textarea = screen.getByPlaceholderText('Enter your reading passage here...');
    fireEvent.change(textarea, { target: { value: 'Test passage' } });
    
    expect(screen.getByText('12 characters')).toBeInTheDocument();
  });

  it('calls onPassageSubmit with passage text when form is submitted', () => {
    render(<PassageDisplay onPassageSubmit={mockOnPassageSubmit} />);
    
    const textarea = screen.getByPlaceholderText('Enter your reading passage here...');
    const submitButton = screen.getByText('Start Test');
    
    const testPassage = 'This is a test passage that is long enough to be valid. '.repeat(2);
    fireEvent.change(textarea, { target: { value: testPassage } });
    fireEvent.click(submitButton);
    
    expect(mockOnPassageSubmit).toHaveBeenCalledWith(testPassage.trim());
  });

  it('prevents submission if passage is too short', () => {
    render(<PassageDisplay onPassageSubmit={mockOnPassageSubmit} />);
    
    const textarea = screen.getByPlaceholderText('Enter your reading passage here...');
    const submitButton = screen.getByText('Start Test');
    
    fireEvent.change(textarea, { target: { value: 'Short' } });
    fireEvent.click(submitButton);
    
    // Should not call onPassageSubmit for short passages
    expect(mockOnPassageSubmit).not.toHaveBeenCalled();
  });
});
