# AIQuizGenerator

Generate grounded quiz questions from a topic or source passage using OpenRouter.

## Installation

```bash
npx edpear add ai-quiz-generator
```

## Basic Usage

```tsx
import { AIQuizGenerator } from "edpear";

<AIQuizGenerator
  apiKey={process.env.NEXT_PUBLIC_OPENROUTER_KEY!}
  topic="The water cycle"
  count={4}
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `topic` | `string` | `undefined` | Topic or objective |
| `sourceText` | `string` | `undefined` | Grounding passage |
| `count` | `number` | `3` | Question count |
| `apiKey` | `string` | required | OpenRouter key |
| `model` | `string` | `"openai/gpt-4o"` | Optional model override |
| `onResponse` | `(questions) => void` | `undefined` | Result callback |

## Advanced Usage

```tsx
<AIQuizGenerator
  apiKey={apiKey}
  sourceText={lessonTranscript}
  count={5}
  onResponse={(questions) => setDraftQuiz(questions)}
/>
```

## Accessibility

- Loading state shows a skeleton instead of empty space.
- Error state is visible and readable.
- Generated content is rendered as plain structured blocks for downstream styling.
