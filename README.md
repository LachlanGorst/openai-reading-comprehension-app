# OpenAI Reading Comprehension App

A next-generation reading comprehension interface built with Next.js and OpenAI, designed to make learning engaging instead of feel like a test.

## Developed in conjunction with - Cursor (Auto Agent Router)

## Author Thoughts

1. Crazy how easy it is to setup API to OpenAI backend and begin to use such insane technology
2. AI agent code generation has taken a massive leap since just one year ago

## What would be next

1. Question quality from AI
2. feedback quality from AI
3. design being gamified to make more fun for students (take ideas from video games)

# Theme reference used

![Mission Control Dark Cosmic Theme](./screenshot.png)

## The Problem

Students were disengaged. Multiple-choice formats were too easy to game. Comprehension wasn't sticking. And when they got answers wrong, the feedback didn't actually help them learn—it just told them they were wrong.

Real feedback from students:

- _"It's annoying seeing the entire passage all at once. Is it possible to break it apart?"_
- _"Multiple choice is too easy, I can just guess the answer. Can you make it so we have to type?"_
- _"I finish the questions and immediately forget what I read. There's no reason to actually understand the passage."_
- _"When I get an answer wrong, I don't really learn why."_
- _"It feels like a test, not like learning. I dread doing these."_

## The Solution

This app reimagines reading comprehension as a **learning experience**, not a test. Built in one day with modern AI tools, it demonstrates how far we've come—what would have taken weeks to build five years ago is now achievable rapidly with the right tools and approach.

### Key Improvements

1. **Better Questions**

   - AI-generated questions that test genuine comprehension, not surface-level recall
   - Multiple difficulty levels: Recall (literal), Think Deeper (inference), Critical Thinking (analysis)
   - Hints available for every question to encourage re-reading and deeper engagement

2. **Learning-Focused Feedback**

   - Feedback frames comprehension as a skill being developed, not a grade being assigned
   - Explains what students understood well AND actionable paths forward
   - Growth-mindset messaging throughout ("you're learning" not "you failed")

3. **Modern, Engaging Design**

   - Dark cosmic theme inspired by Mission Control—sleek, motivating, not clinical
   - Passage broken into clickable sections with arrow navigation (addresses "annoying to see it all at once")
   - Free-text answers required (addresses "too easy to guess")
   - Smooth interactions and visual feedback at every step

4. **Thoughtful UX Decisions**
   - Passage always accessible while answering questions
   - Progress bar shows reading completion percentage
   - Hints encourage active re-reading instead of passive skimming
   - Results page emphasizes learning summary over test score

## Technical Approach

### AI Question Generation (OpenAI)

Questions are generated on-demand using OpenAI's GPT-4. The prompt explicitly asks for:

- Varied question types (literal recall, inference, critical analysis)
- Comprehension-testing questions, not trivia
- Hints that guide thinking without giving away answers
- Age-appropriate language and difficulty

**Why on-demand?** It's simple to set up, fast enough for students, and allows future personalization by reading level or topic focus.

### Grading Philosophy

The grading system prioritizes **correct comprehension over perfect prose**:

- Direct text answers that are factually correct → **full credit (10/10)**
- No penalty for simplicity or lack of "extra details"
- Deductions only for incorrect or missing critical information
- All feedback is pedagogical, not punitive

### Design Decisions

| Decision                        | Why                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| **Dark cosmic theme**           | Removes the "clinical test" feel. Makes learning feel premium and engaging.                  |
| **Arrow navigation**            | Addresses student feedback about passage overwhelm. One section at a time focuses attention. |
| **Free-text answers**           | Removes guessing. Forces engagement with the text.                                           |
| **Hints as re-reading prompts** | Encourages active reading. Hints guide _where_ to look, not _what_ to think.                 |
| **Growth-mindset messaging**    | Reframes errors as learning opportunities, not failures.                                     |
| **Passage always visible**      | Students can verify answers. Promotes confidence and actual learning over memorization.      |

## What Surprised Me

Building this in 2025 with AI coding assistants felt genuinely different from five years ago. The speed of iteration was striking—I could describe a feature, get working code, and move to the next problem in minutes. OpenAI integration was trivial to set up. What took real thought was _what_ to build, not _how_ to build it. The hard problems were pedagogical (how do we grade fairly? how do we make feedback stick?) and UX (how do we make this feel less like a test?), not technical.

That said, the biggest gaps remain **AI result consistency** and **full gamification**. Those are next.

## Running the App

```bash
# Install
npm install

# Development
npm run dev

# Build
npm run build

# Tests
npm test

# Lint
npm run lint
```

### Environment Variables

Create a `.env.local` file:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Project Structure

```
/components
  - PassageReader.tsx       # Arrow navigation through passage sections
  - QuestionInterface.tsx   # Question display, free-text input, hints
  - ResultsPage.tsx         # Learning summary and feedback
  - LoadingSpinner.tsx      # Animated loading state

/app
  - page.tsx                # Main layout
  - api/generate-questions  # OpenAI integration

/public/data
  - passages.json           # Passage content (can be extended)

/__tests__
  - sanity.test.ts          # Validates passage data exists
```

## Future Work

- **Better AI control**: Temperature tuning, prompt engineering for consistency, question type weighting
- **Gamification**: Points, streaks, leaderboards, unlockable difficulty levels
- **Accessibility**: WCAG 2.1 AA compliance, screen reader testing
- **Question types**: Multiple choice alongside free-text, cloze questions, matching
- **Student profiles**: Track progress over time, adaptive difficulty
- **Analytics**: Which questions trip up students? Where do comprehension gaps emerge?

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI**: OpenAI GPT-4
- **Styling**: Tailwind CSS (dark cosmic theme)
- **Testing**: Jest
- **Language**: TypeScript

## Time Spent

**1 day** (from concept to working app)

## License

MIT

## Author

**Lachlan Gorst**

---
