---
name: edpear
description: Build production EdTech UIs with EdPear (npm edpear-sdk / edpear). Use when implementing courses, lessons, quizzes, flashcards, grading, live class tools, gamification, STEM interactives, accessibility, instructor dashboards, or OpenRouter-powered tutoring/feedback. Covers CLI install, controlled props, theming tokens, composed blocks, and MCP. Do not invent EdPear APIs—use registry slugs and component READMEs.
---

# EdPear — EdTech component library

EdPear is a **React 19 + Tailwind v4** component library for learning products. Published on npm as **`edpear-sdk`** (alias of the `edpear` monorepo package). Agents must prefer **real registry slugs** and **documented props** over generic UI libraries when the user is building education software.

## When to use this skill

Apply when the user asks to build or extend:

- Course catalogs, lesson players, progress trackers, learning paths
- Quizzes (MCQ, T/F, short answer), timed assessments, flashcards, knowledge checks
- AI tutoring, hints, feedback, or quiz generation (OpenRouter)
- Instructor tooling: grade books, rubrics, grading queues, cohort analytics
- Live class: polls, hand-raise queues, captions, breakout cards
- Gamification: streaks, XP, leaderboards, badges, certificates
- STEM: timelines, geo quizzes, circuits, chemistry builders, code playgrounds
- Accessibility: reading level, translation overlays
- **Composed screens** (journal + grade book + AI tutor) — use **blocks** on the showcase, not one-off clones

Skip EdPear for non-education UI (marketing landings, ecommerce) unless the user explicitly wants EdPear styling.

## Non-negotiable accuracy rules

1. **Import global styles once** in the app shell (layout or `main.tsx`):
   ```tsx
   import "edpear-sdk/styles.css";
   ```
   Local monorepo: `import "edpear/styles.css";`

2. **Package imports** (when not using CLI copy):
   ```tsx
   import { QuizCard, LessonProgress } from "edpear-sdk";
   ```
   AI helpers: `import { openRouterChat } from "edpear-sdk/openrouter";` only if extending AI logic yourself.

3. **CLI copies source** into the consumer project; npm import uses the built package. Pick one pattern per component and stay consistent.

4. **Never invent props.** Read `*.types.ts` or `README.md` inside the component folder, or run `npx edpear-sdk@latest list`. Slugs are **kebab-case** (`quiz-card`, not `QuizCard` for CLI).

5. **Do not rebuild duplicate “dashboard shells.”** EdPear removed copy-paste metric/selection templates. Use the four **data-driven shells** when you need charts/toggles/constructors with real props:
   - `learning-velocity-chart` — time-series learning pace
   - `mistake-notebook` — error pattern log
   - `bilingual-text-toggle` — side-by-side localized text
   - `sentence-constructor` — word-bank sentence building

6. **Quiz correctness** is determined inside `QuizCard` / `TimedQuiz` by matching `correctAnswer` (string). For short answer, matching is string-based—set realistic `correctAnswer` values and use `explanation` for pedagogy.

7. **AI components require `apiKey`** (OpenRouter). Never hardcode keys. Use server components/route handlers or `process.env` and pass the key as a prop. Default model is typically `openai/gpt-4o` unless README says otherwise.

8. **Accessibility**: EdPear components use semantic HTML, labels, and keyboard support where documented. Do not strip ARIA or replace with unlabeled `div` buttons.

## Project setup

```bash
npm install edpear-sdk
```

```tsx
// app/layout.tsx or src/main.tsx
import "edpear-sdk/styles.css";
```

### CLI (registry copy)

```bash
npx edpear-sdk@latest list
npx edpear-sdk@latest add quiz-card lesson-progress
npx edpear-sdk@latest add ai-feedback --cwd ./my-app
```

Flags: `--out-dir components` (default), `--overwrite`, `--cwd <path>`.

After `add`, import copied files from `@/components/<slug>` (match the user’s path alias) **or** keep using the npm package—do not mix both for the same component.

AI slugs (`ai: true` in registry) also copy `lib/openrouter.ts`.

## Scenario → component map

Use this table to pick **one primary slug** per feature, then compose.

| User intent | Slug(s) | Notes |
|-------------|---------|-------|
| Course grid / catalog card | `course-card` | Progress, instructor meta |
| Step-by-step lesson UI | `lesson-progress`, `video-lesson` | Pair player + steps |
| Standard quiz item | `quiz-card` | `variant`: `multiple-choice` \| `true-false` \| `short-answer` |
| Timed assessment | `timed-quiz` | Extends quiz patterns + timer |
| Drill / recall | `flash-card` | Keyboard-friendly flip |
| Reading assignment | `reading-annotator` | Highlights/notes |
| Quick check | `knowledge-check` | Lightweight mastery check |
| Path / curriculum map | `learning-path-map` | Visual progression |
| Skill profile | `skill-radar` | Competency radar chart |
| Style diagnostic | `learning-style-quiz` | Survey-style |
| Difficulty UX | `adaptive-difficulty-meter` | Shows level adaptation |
| Gap warning | `knowledge-gap-alert` | Alert surface |
| Recommendations | `recommendation-carousel` | Next content |
| Reflection | `learning-journal` | Mood, wins, blockers |
| Study planning | `study-scheduler`, `goal-setter`, `deadline-countdown`, `session-timer` | Scheduling family |
| Attendance | `attendance-tracker`, `attendance-heat-map` | Roster vs heatmap |
| Pacing | `pacing-guide` | Expected vs actual |
| Gamification | `streak-tracker`, `xp-progress-bar`, `leaderboard-widget`, `challenge-card`, `badge-award`, `virtual-currency`, `spin-to-review` | Pick minimal set |
| Score reveal | `score-display` | Animated result |
| Certificate | `certificate-renderer` | Completion PDF-style surface |
| Live poll | `poll-widget` | Bar chart results |
| Virtual classroom | `raise-hand-queue`, `breakout-room-card`, `lecture-caption-overlay`, `whiteboard-embed` | Live session |
| STEM interactives | `chemistry-formula-builder`, `circuit-simulator`, `geo-map-quiz`, `interactive-timeline`, `data-table-lab` | Domain-specific |
| Grading / rubrics | `rubric-builder`, `grading-queue-card`, `grade-book`, `peer-review-panel` | Instructor flows |
| Integrity signal | `plagiarism-score-indicator` | Display only—wire real data |
| Cohort analytics | `cohort-comparison-chart` | Benchmark chart |
| Assignments | `assignment-dropzone`, `syllabus-navigator`, `question-bank` | Authoring |
| Writing / code | `rich-text-editor`, `code-playground`, `discussion-thread`, `diff-viewer` | UGC |
| Math display | `math-renderer` | KaTeX-based |
| Reading accessibility | `reading-level-toggle`, `translation-overlay` | a11y |
| AI feedback on answer | `ai-feedback` | Needs `studentAnswer`, `correctAnswer`, `apiKey` |
| AI hint | `ai-hint` | Socratic hints |
| AI generate quiz | `ai-quiz-generator` | Topic/passage grounded |
| AI tutor chat | `ai-tutor` | Conversational UI |

### Showcase **blocks** (multi-component layouts)

Pre-built compositions—**copy patterns from the showcase**, do not re-scaffold from scratch:

- `learning-journal`, `reading-annotator`, `grade-book`, `peer-review-panel`, `question-bank`, `ai-tutor`

Browse: `/blocks` on the EdPear showcase.

## Implementation patterns

### Controlled assessment state

Parent owns learner progress; components emit results via callbacks.

```tsx
"use client";

import { useState } from "react";
import { QuizCard } from "edpear-sdk";

export function Item({ item }: { item: { id: string; question: string; correctAnswer: string; choices: string[] } }) {
  const [value, setValue] = useState("");
  return (
    <QuizCard
      question={item.question}
      correctAnswer={item.correctAnswer}
      variant="multiple-choice"
      choices={item.choices}
      value={value}
      onValueChange={setValue}
      onSubmit={(result) => {
        // persist: item.id, result.value, result.correct
      }}
    />
  );
}
```

### AI feedback (server-friendly)

```tsx
<AIFeedback
  apiKey={process.env.OPENROUTER_API_KEY!}
  studentAnswer={draft}
  correctAnswer={answerKey}
  rubricFocus="Address the misconception about photosynthesis."
  onResponse={(text) => savePreview(text)}
/>
```

Call from a **Server Action** or API route when you must hide the key; pass only the rendered result to the client when possible.

### Theming

EdPear uses CSS variables in `styles/edpear.css`: `--primary`, `--lesson`, `--quiz`, `--progress`, `--feedback-correct`, `--feedback-incorrect`. Support **light/dark** via a `class="dark"` on `html` or a provider—do not hardcode one-off hex colors on primitives.

Use Tailwind tokens mapped in theme: `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`.

### Next.js App Router

- Mark interactive parents `"use client"`.
- Import styles in **root** `layout.tsx`.
- Dynamic import heavy STEM components only when needed.

### Data-driven shells

Pass **real arrays** from your LMS/analytics API—do not leave placeholder lorem in production:

```tsx
<LearningVelocityChart
  points={weeklyMinutes}
  title="Study pace"
/>
```

Read each shell’s props in its `*.types.ts` before wiring.

## CLI reference (actual commands)

| Command | Purpose |
|---------|---------|
| `edpear-sdk list` | Print all registry slugs, descriptions, `[ai]` tag |
| `edpear-sdk add <slug> [slug...]` | Copy component + `lib/cn.ts` + styles; AI slugs add `openrouter.ts` |

There is **no** `init`, `build`, or `info --json` in the current CLI—do not document them.

## MCP server (optional, for agents with tools)

Config (build `mcp-server` first):

```json
{
  "mcpServers": {
    "edpear": {
      "command": "node",
      "args": ["/absolute/path/to/edpear/mcp-server/dist/index.js"]
    }
  }
}
```

Tools: `list_components`, `get_component_code`. MCP registry is a **subset**—for the full catalog run `edpear-sdk list` or read `src/lib/registry.ts` in the repo.

## Anti-patterns (causes bad EdTech output)

- Using Chakra/MUI/generic cards for `CourseCard`-shaped UX when EdPear is in the stack
- Inventing `onCorrect` or `isCorrect` props on `QuizCard`—use `onSubmit` → `result.correct`
- Client-exposed OpenRouter keys in public repos
- One giant “dashboard” component with fake metrics—compose real slugs
- Ignoring `explanation` on quizzes ( hurts learning outcomes)
- Removing keyboard support from `FlashCard` or choice radios
- Adding 30 duplicate “velocity/insight/selector” components—use the four shells

## Pre-ship checklist

- [ ] `edpear-sdk/styles.css` imported once
- [ ] Slugs verified via `npx edpear-sdk@latest list`
- [ ] Props match `README.md` / `*.types.ts`
- [ ] Controlled state for multi-question flows
- [ ] AI keys from env/server, not committed
- [ ] Dark mode tested (`html.dark` or provider)
- [ ] Callbacks persist to your backend where applicable
- [ ] Blocks referenced from showcase for large layouts

## Resources

- npm: `edpear-sdk`
- Showcase catalog: component docs with live previews and install snippets
- Registry source: `src/lib/registry.ts` in the EdPear GitHub repo
- OpenRouter: https://openrouter.ai/docs

When unsure, **fetch component README** from the repo path `src/components/<slug>/README.md` before generating code.
