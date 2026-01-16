# Reading Comprehension Test Application

An AI-powered reading comprehension testing application for school students built with Next.js 14+, TypeScript, Tailwind CSS, and OpenAI API.

## Features

- **AI-Generated Questions**: Automatically generates 10 comprehension questions based on any reading passage
- **Interactive Testing**: Students answer questions one at a time with a clean, user-friendly interface
- **AI-Powered Grading**: Automatically grades student answers using OpenAI's GPT models
- **Progress Tracking**: Visual progress bar shows test completion status
- **Results Display**: Comprehensive results page showing grade, percentage, and all answers

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-4o-mini)
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (ready)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd reading-comprehension-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your `OPENAI_API_KEY` as an environment variable in Vercel
4. Deploy!

The application is configured for Vercel deployment and will work automatically.

## Project Structure

```
reading-comprehension-app/
├── app/
│   ├── api/
│   │   ├── generate-questions/    # API route for question generation
│   │   └── grade-answers/         # API route for answer grading
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main application page
├── components/
│   ├── PassageDisplay.tsx         # Passage input component
│   ├── QuestionInterface.tsx     # Question/answer interface
│   └── ResultsPage.tsx           # Results display component
├── __tests__/                     # Jest test files
└── .github/workflows/             # GitHub Actions CI
```

## How It Works

1. **Passage Input**: Student enters or pastes a reading passage
2. **Question Generation**: AI generates 10 comprehension questions specific to the passage
3. **Answer Collection**: Student answers each question one at a time
4. **Grading**: AI evaluates each answer and calculates a final grade
5. **Results**: Student sees their grade, percentage, and all their answers

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## License

MIT
