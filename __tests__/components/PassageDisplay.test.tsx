import { render, screen, fireEvent } from '@testing-library/react';
import PassageDisplay from '@/components/PassageDisplay';

describe('PassageDisplay', () => {
  const mockOnPassageSubmit = jest.fn();

  beforeEach(() => {
    mockOnPassageSubmit.mockClear();
  });

  it('renders the passage input form and submits valid passage', () => {
    render(<PassageDisplay onPassageSubmit={mockOnPassageSubmit} />);
    
    expect(screen.getByText('Enter Reading Passage')).toBeInTheDocument();
    
    const textarea = screen.getByPlaceholderText('Enter your reading passage here...');
    const submitButton = screen.getByText('🚀 Start Test');
    
    const testPassage = 'This is a test passage that is long enough to be valid. '.repeat(2);
    fireEvent.change(textarea, { target: { value: testPassage } });
    fireEvent.click(submitButton);
    
    expect(mockOnPassageSubmit).toHaveBeenCalledWith(testPassage.trim());
  });
});
