# EdPear

EdPear is an edtech-focused React component library for teams building quizzes, course flows, video lessons, practice experiences, and learner feedback loops. It combines production-ready Tailwind components with a small set of optional OpenRouter-powered teaching helpers so product teams can ship faster without inventing their own design system from scratch.

## Who It's For

EdPear is built for edtech product builders: startup teams, internal learning platforms, curriculum tools, tutoring products, coding practice apps, and course marketplaces that need opinionated but flexible UI primitives.

## Quick Start

```tsx
import "edpear/styles.css";
import { QuizCard } from "edpear";

export function Demo() {
  return <QuizCard question="2 + 2 = ?" correctAnswer="4" variant="short-answer" />;
}
```

## Installation

```bash
npm install edpear
```

## CLI Usage

```bash
npx edpear add quiz-card lesson-progress
```

The CLI copies source files into your app, including shared utilities like `lib/cn.ts` and `lib/openrouter.ts` when needed.

## Component Index

- [`QuizCard`](./src/components/quiz-card/README.md)
- [`LessonProgress`](./src/components/lesson-progress/README.md)
- [`FlashCard`](./src/components/flash-card/README.md)
- [`VideoLesson`](./src/components/video-lesson/README.md)
- [`CourseCard`](./src/components/course-card/README.md)
- [`BadgeAward`](./src/components/badge-award/README.md)
- [`TimedQuiz`](./src/components/timed-quiz/README.md)
- [`RichTextEditor`](./src/components/rich-text-editor/README.md)
- [`CodePlayground`](./src/components/code-playground/README.md)
- [`StreakTracker`](./src/components/streak-tracker/README.md)
- [`ScoreDisplay`](./src/components/score-display/README.md)
- [`DiscussionThread`](./src/components/discussion-thread/README.md)
- [`AIFeedback`](./src/components/ai-feedback/README.md)
- [`AIQuizGenerator`](./src/components/ai-quiz-generator/README.md)
- [`AIHint`](./src/components/ai-hint/README.md)

## Theming Guide

Import `edpear/styles.css` once and layer it into your Tailwind app shell. EdPear follows shadcn-style CSS variables and ships these additional edtech tokens:

- `--lesson`
- `--quiz`
- `--progress`
- `--feedback-correct`
- `--feedback-incorrect`

Example theme override:

```css
:root {
  --lesson: 263 85% 64%;
  --quiz: 28 96% 55%;
  --progress: 153 71% 40%;
}

.dark {
  --lesson: 263 90% 72%;
  --quiz: 30 95% 60%;
}
```

## AI Setup

AI components are optional and use OpenRouter only.

1. Create an OpenRouter key.
2. Pass it into the component via the `apiKey` prop.
3. Optionally override the model with `model`, otherwise EdPear defaults to `openai/gpt-4o`.

```tsx
import { AIFeedback } from "edpear";

<AIFeedback
  apiKey={process.env.NEXT_PUBLIC_OPENROUTER_KEY!}
  studentAnswer="Photosynthesis happens in the roots."
  correctAnswer="Photosynthesis happens primarily in the leaves."
/>;
```

## Package Exports

- `edpear`
- `edpear/openrouter`
- `edpear/styles.css`

## Quality Bar

- Full TypeScript
- Tailwind-first styling
- Controlled and uncontrolled APIs where relevant
- Keyboard-accessible interactive primitives
- AI helpers with loading, error, and callback states