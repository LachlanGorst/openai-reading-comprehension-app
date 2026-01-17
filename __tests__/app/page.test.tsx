import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";

// Mock the components to avoid API calls in tests
jest.mock("@/components/QuestionInterface", () => {
  return function MockQuestionInterface() {
    return <div data-testid="question-interface">Question Interface</div>;
  };
});

jest.mock("@/components/ResultsPage", () => {
  return function MockResultsPage() {
    return <div data-testid="results-page">Results Page</div>;
  };
});

// Mock fetch for data loading
global.fetch = jest.fn();

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the main heading and loads with loading state", () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves to keep loading state
    );

    render(<Home />);
    expect(
      screen.getByText("📚 Reading Comprehension Adventure")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Loading your passage and generating questions...")
    ).toBeInTheDocument();
  });

  it("loads passage and questions on mount", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          passage: {
            id: "passage-1",
            title: "Test Passage",
            content: "This is a test passage content.",
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          questions: [
            {
              id: 1,
              type: "easy",
              question: "Question 1?",
              idealAnswer: "Answer 1",
              keyPoints: ["point1"],
            },
            {
              id: 2,
              type: "medium",
              question: "Question 2?",
              idealAnswer: "Answer 2",
              keyPoints: ["point2"],
            },
            {
              id: 3,
              type: "challenge",
              question: "Question 3?",
              idealAnswer: "Answer 3",
              keyPoints: ["point3"],
            },
          ],
        }),
      });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Test Passage")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test passage content.")
      ).toBeInTheDocument();
      expect(screen.getByTestId("question-interface")).toBeInTheDocument();
    });
  });
});
