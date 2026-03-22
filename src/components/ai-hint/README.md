# AIHint

Provide a Socratic hint that nudges a learner forward without revealing the full answer.

## Installation

```bash
npx edpear add ai-hint
```

## Basic Usage

```tsx
import { AIHint } from "edpear";

<AIHint
  apiKey={process.env.NEXT_PUBLIC_OPENROUTER_KEY!}
  prompt="Solve for x: 3x + 9 = 18"
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `prompt` | `string` | required | Learner problem |
| `studentAttempt` | `string` | `undefined` | Optional learner work |
| `apiKey` | `string` | required | OpenRouter key |
| `model` | `string` | `"openai/gpt-4o"` | Optional model override |
| `onResponse` | `(hint) => void` | `undefined` | Hint callback |

## Advanced Usage

```tsx
<AIHint
  apiKey={apiKey}
  prompt={problemText}
  studentAttempt={workSoFar}
  onResponse={(hint) => trackHintExposure(hint)}
/>
```

## Accessibility

- Uses a visible loading skeleton.
- Error states render readable copy instead of silent failure.
- Action remains a standard button with keyboard support.
