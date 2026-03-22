# QuizCard

Accessible assessment card for multiple-choice, true/false, and short-answer questions.

## Installation

```bash
npx edpear add quiz-card
```

## Basic Usage

```tsx
import { QuizCard } from "edpear";

<QuizCard
  question="What planet is known as the red planet?"
  correctAnswer="Mars"
  variant="multiple-choice"
  choices={["Venus", "Mars", "Jupiter", "Saturn"]}
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `question` | `string` | required | Question stem |
| `correctAnswer` | `string` | required | Expected answer |
| `variant` | `"multiple-choice" \| "true-false" \| "short-answer"` | `"multiple-choice"` | Input style |
| `choices` | `string[]` | `[]` | Choice list for choice variants |
| `value` | `string` | uncontrolled | Controlled response |
| `defaultValue` | `string` | `""` | Initial uncontrolled response |
| `onSubmit` | `(result) => void` | `undefined` | Submission callback |

## Advanced Usage

```tsx
<QuizCard
  question="State Newton's second law."
  correctAnswer="Force equals mass times acceleration"
  variant="short-answer"
  explanation="F = m × a describes how force, mass, and acceleration relate."
  onSubmit={(result) => console.log(result)}
/>
```

## Accessibility

- Uses native radio inputs for choice variants.
- Short-answer mode uses a labeled text input.
- Submission feedback is announced via `aria-live`.
