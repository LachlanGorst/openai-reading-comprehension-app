import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the components to avoid API calls in tests
jest.mock('@/components/PassageDisplay', () => {
  return function MockPassageDisplay({ onPassageSubmit }: any) {
    return (
      <div data-testid="passage-display">
        <button onClick={() => onPassageSubmit('Test passage')}>Submit</button>
      </div>
    );
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
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByText('Reading Comprehension Test')).toBeInTheDocument();
  });

  it('initially shows the passage display', () => {
    render(<Home />);
    expect(screen.getByTestId('passage-display')).toBeInTheDocument();
  });
});
