<div align="center">

<br />

<!-- Logo / Hero -->
<img src="https://img.shields.io/badge/EdPear-v2.0.0-4f46e5?style=for-the-badge&logoColor=white" alt="EdPear" height="40" />

<br /><br />

### The UI component library for edtech teams that ship.

**Quiz flows. Course dashboards. AI tutors. Lesson players. All in one system.**

<br />

[![npm version](https://img.shields.io/npm/v/edpear-sdk?color=4f46e5&label=npm&style=flat-square)](https://www.npmjs.com/package/edpear-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-f59e0b?style=flat-square)](./CONTRIBUTING.md)

<br />

[**Docs**](https://edpear.dev/docs) · [**Components**](https://edpear.dev/components) · [**Playground**](https://edpear.dev/playground) · [**Changelog**](./CHANGELOG.md)

<br />

</div>

---

## Why EdPear?

Most UI libraries are general-purpose. **EdPear is not.**

It's built specifically for the problems edtech teams hit every week — rendering quizzes with instant feedback, tracking learner streaks, gating content behind enrollment, generating AI hints without building your own pipeline. Every component ships with the opinionated defaults you'd eventually arrive at anyway, so you spend time on your product, not your design system.

```bash
npm install edpear
```

```tsx
import "edpear/styles.css";
import { QuizCard } from "edpear";

export function Demo() {
  return (
    <QuizCard
      question="What is the powerhouse of the cell?"
      correctAnswer="The mitochondria"
      variant="short-answer"
    />
  );
}
```

> Zero config. Drop it in, style it later.

---

## Features

|  | Feature |
|---|---|
| 🧩 | **35+ purpose-built components** — from `FlashCard` to `GradeBook` to `LearningPathMap` |
| 🤖 | **Optional AI helpers** — `AITutor`, `AIFeedback`, `AIHint`, `AIQuizGenerator`, powered by OpenRouter |
| 🎨 | **Tailwind-first theming** — edtech-specific CSS tokens (`--lesson`, `--quiz`, `--progress`, `--feedback-correct`) |
| 🔷 | **Strict TypeScript** — every prop typed, every callback typed, no `any` surprises |
| ♿ | **Accessible by default** — keyboard navigation, ARIA roles, and focus management built in |
| 📦 | **shadcn-style CLI** — copy components directly into your codebase, own the source |
| 🌗 | **Dark mode ready** — all tokens expose light and dark variants |
| ⚡ | **Controlled & uncontrolled APIs** — integrate with React Hook Form, Zustand, or plain `useState` |

---

## Installation

**Option 1 — npm package** *(fast, great for prototypes)*

```bash
npm install edpear
# or
pnpm add edpear
# or
yarn add edpear
# or
bun add edpear
```

**Option 2 — CLI** *(recommended for production; you own the source)*

```bash
npx edpear@latest add quiz-card lesson-progress score-display
```

```bash
# Works with all package managers
pnpm dlx edpear@latest add ai-tutor
yarn dlx edpear@latest add flash-card   # Yarn 2+
bunx edpear@latest add timed-quiz
```

The CLI copies component source files into your project alongside shared utilities (`lib/cn.ts`, `lib/openrouter.ts`) so you can read, fork, and extend everything.

---

## Components

### 📚 Learning & Course Flow

| Component | Description |
|---|---|
| [`CourseCard`](./src/components/course-card/README.md) | Thumbnail, metadata, and enroll CTA for course listings |
| [`CourseDashboard`](./src/components/course-dashboard/README.md) | Full learner dashboard with progress rings and module lists |
| [`LessonProgress`](./src/components/lesson-progress/README.md) | Step-by-step lesson progress bar with completion states |
| [`LearningPathMap`](./src/components/learning-path-map/README.md) | Visual node-graph map of a learning curriculum |
| [`SyllabusNavigator`](./src/components/syllabus-navigator/README.md) | Collapsible sidebar navigator for course syllabi |
| [`VideoLesson`](./src/components/video-lesson/README.md) | Video player with chapter markers and transcript panel |
| [`EnrollmentGate`](./src/components/enrollment-gate/README.md) | Lock content behind enrollment or payment status |
| [`OnboardingChecklist`](./src/components/onboarding-checklist/README.md) | Guided first-session checklist for new learners |

### 📝 Quizzing & Assessment

| Component | Description |
|---|---|
| [`QuizCard`](./src/components/quiz-card/README.md) | Multiple choice, short answer, or true/false quiz card |
| [`TimedQuiz`](./src/components/timed-quiz/README.md) | Full quiz flow with countdown timer and auto-submit |
| [`FlashCard`](./src/components/flash-card/README.md) | Flip-to-reveal flash card with spaced repetition hooks |
| [`KnowledgeCheck`](./src/components/knowledge-check/README.md) | Inline comprehension check for mid-lesson use |
| [`QuestionBank`](./src/components/question-bank/README.md) | Browsable, searchable question library |
| [`SessionTimer`](./src/components/session-timer/README.md) | Countdown / count-up timer with pause and alert callbacks |
| [`MathRenderer`](./src/components/math-renderer/README.md) | LaTeX and MathML expression rendering |

### 📊 Progress & Gamification

| Component | Description |
|---|---|
| [`ScoreDisplay`](./src/components/score-display/README.md) | Animated score reveal with grade breakdown |
| [`GradeBook`](./src/components/grade-book/README.md) | Instructor-side grade table with filter and export |
| [`StreakTracker`](./src/components/streak-tracker/README.md) | Daily streak calendar with milestone rewards |
| [`BadgeAward`](./src/components/badge-award/README.md) | Achievement badge with animated unlock ceremony |
| [`CertificateRenderer`](./src/components/certificate-renderer/README.md) | Printable / downloadable completion certificate |
| [`ActivityFeed`](./src/components/activity-feed/README.md) | Timeline feed of learner actions and achievements |
| [`StudentProfileCard`](./src/components/student-profile-card/README.md) | Avatar, bio, stats, and badge display for learners |

### 💬 Feedback & Collaboration

| Component | Description |
|---|---|
| [`FeedbackSlider`](./src/components/feedback-slider/README.md) | Emoji-anchored sentiment slider for quick reactions |
| [`PeerReviewPanel`](./src/components/peer-review-panel/README.md) | Structured rubric panel for peer assessment flows |
| [`DiscussionThread`](./src/components/discussion-thread/README.md) | Threaded comment system for lesson discussions |
| [`AssignmentDropzone`](./src/components/assignment-dropzone/README.md) | File upload zone with type validation and status tracking |
| [`ReadingAnnotator`](./src/components/reading-annotator/README.md) | Highlight and annotate passages in reading content |
| [`RichTextEditor`](./src/components/rich-text-editor/README.md) | WYSIWYG editor optimized for student submissions |

### 🤖 AI-Powered Helpers

> AI components are **fully optional**. They require an [OpenRouter](https://openrouter.ai/) API key and default to `openai/gpt-4o`. Swap any model via the `model` prop.

| Component | Description |
|---|---|
| [`AITutor`](./src/components/ai-tutor/README.md) | Conversational AI tutor scoped to lesson context |
| [`AIFeedback`](./src/components/ai-feedback/README.md) | Auto-grades open-ended answers with rubric-aware feedback |
| [`AIHint`](./src/components/ai-hint/README.md) | Progressive hint generator — reveals clues without spoiling |
| [`AIQuizGenerator`](./src/components/ai-quiz-generator/README.md) | Generates quiz questions from a topic or pasted content |

### 🛠 Utilities

| Component | Description |
|---|---|
| [`CodePlayground`](./src/components/code-playground/README.md) | In-browser code editor with live preview |
| [`DiffViewer`](./src/components/diff-viewer/README.md) | Side-by-side or inline code diff for code review exercises |
| [`LiveClassBanner`](./src/components/live-class-banner/README.md) | Sticky banner for live session countdowns and join links |

---

## AI Setup

AI components are plug-and-play once you have an OpenRouter key.

```tsx
import { AIFeedback } from "edpear";

<AIFeedback
  apiKey={process.env.NEXT_PUBLIC_OPENROUTER_KEY!}
  studentAnswer="Photosynthesis happens in the roots."
  correctAnswer="Photosynthesis happens primarily in the leaves."
  onFeedback={(result) => console.log(result.score, result.explanation)}
/>
```

**Override the model** for any component:

```tsx
<AITutor
  apiKey={key}
  lessonContext={lessonMarkdown}
  model="anthropic/claude-3.5-sonnet"
/>
```

All AI components expose `loading`, `error`, and result callback states — no wrappers needed.

---

## Theming

Import the stylesheet once at your app root:

```tsx
// app/layout.tsx or _app.tsx
import "edpear/styles.css";
```

EdPear follows **shadcn-style CSS variables**. Override any token to match your brand:

```css
/* globals.css */
:root {
  --lesson:            263 85% 64%;
  --quiz:              28 96% 55%;
  --progress:          153 71% 40%;
  --feedback-correct:  142 76% 36%;
  --feedback-incorrect: 0 84% 60%;
}

.dark {
  --lesson:  263 90% 72%;
  --quiz:    30 95% 60%;
}
```

| Token | Default Usage |
|---|---|
| `--lesson` | Lesson headers, video borders, navigator highlights |
| `--quiz` | Quiz card accents, timer rings |
| `--progress` | Progress bars, streak calendars |
| `--feedback-correct` | Correct answer highlights, badge accents |
| `--feedback-incorrect` | Wrong answer states, retry prompts |

---

## Package Exports

```ts
import { QuizCard, FlashCard, ... }  from "edpear";           // components
import { createOpenRouterClient }    from "edpear/openrouter"; // AI client util
import                                    "edpear/styles.css"; // base styles
```

---

## Roadmap

- [ ] `CanvasAnnotator` — freehand drawing on diagrams
- [ ] `PronunciationChecker` — Web Speech API + AI scoring
- [ ] `AdaptiveQuiz` — difficulty curve that adjusts per learner
- [ ] Storybook docs site
- [ ] Figma component kit
- [ ] `edpear init` scaffolder for Next.js and Vite

Have a component idea? [Open a discussion →](https://github.com/your-org/edpear/discussions)

---

## Contributing

Contributions are welcome and encouraged. EdPear follows a straightforward process:

1. **Fork** the repo and create a branch: `git checkout -b feat/my-component`
2. **Build** your component under `src/components/<name>/`
3. **Add** a `README.md` and export from `src/index.ts`
4. **Open a PR** — fill in the template and tag `@maintainers`

Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for coding conventions, component API standards, and the review checklist.

---

## License

MIT © [EdPear Contributors](./LICENSE)

---

<div align="center">

**Built for the teams making learning better.**

If EdPear saves you time, consider leaving a ⭐ — it helps others find the project.

</div>