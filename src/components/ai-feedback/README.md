# AIFeedback

Generate constructive learner feedback grounded in a student answer and a correct answer.

## Installation

```bash
npx edpear add ai-feedback
```

## Basic Usage
tes
```tsx
import { AIFeedback } from "edpear";

<AIFeedback
  apiKey={process.env.NEXT_PUBLIC_OPENROUTER_KEY!}
  studentAnswer="Plants absorb oxygen to make food."
  correctAnswer="Plants primarily use carbon dioxide in photosynthesis."
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `studentAnswer` | `string` | required | Learner answer |
| `correctAnswer` | `string` | required | Reference answer |
| `apiKey` | `string` | required | OpenRouter key |
| `model` | `string` | `"openai/gpt-4o"` | Optional model override |
| `rubricFocus` | `string` | `undefined` | Additional guidance |
| `onResponse` | `(feedback) => void` | `undefined` | Feedback callback |

## Advanced Usage

```tsx
<AIFeedback
  apiKey={apiKey}
  studentAnswer={draft}
  correctAnswer={answerKey}
  rubricFocus="Focus on scientific vocabulary and misconception correction."
  onResponse={(feedback) => saveTeacherPreview(feedback)}
/>
```

## Accessibility

- Loading state uses a visible skeleton.
- Failure state renders readable fallback text.
- Result content is plain text, easy to announce and style.
