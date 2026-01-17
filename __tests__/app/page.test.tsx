import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the components to avoid API calls in tests
jest.mock('@/components/PassageDisplay', () => {
  return function MockPassageDisplay() {
    return <div data-testid="passage-display">Passage Display</div>;
  };
});

jest.mock('@/components/QuestionInterface', () => {
  return function MockQuestionInterface() {
    return <div data-testid="question-interface">Question Interface</div>;
  };
});

jest.mock('@/components/ResultsPage', () => {
  return function MockResultsPage() {
    return <div data-testid="results-page">Results Page</div>;
  };
});

describe('Home Page', () => {
  it('renders the main heading and initial passage display', () => {
    render(<Home />);
    expect(screen.getByText('📚 Reading Comprehension Adventure')).toBeInTheDocument();
    expect(screen.getByTestId('passage-display')).toBeInTheDocument();
  });
});
