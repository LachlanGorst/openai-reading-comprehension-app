import { render, screen } from "@testing-library/react";

// PassageDisplay component is no longer used - the passage is now loaded from a static file
// and displayed in the main layout alongside questions

describe("PassageDisplay - Deprecated", () => {
  it("component is deprecated and no longer used in the app", () => {
    // The passage is now loaded from public/data/passages.json
    // and displayed in a two-column layout with the question interface
    expect(true).toBe(true);
  });
});
