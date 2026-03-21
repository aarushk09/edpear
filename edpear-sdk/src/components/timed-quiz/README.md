# TimedQuiz

Wrap a `QuizCard` interaction with a countdown timer for assessment flows.

## Installation

```bash
npx edpear add timed-quiz
```

## Basic Usage

```tsx
import { TimedQuiz } from "edpear";

<TimedQuiz
  duration={30}
  question="2 + 2 = ?"
  correctAnswer="4"
  variant="short-answer"
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | `number` | required | Countdown in seconds |
| `autoStart` | `boolean` | `true` | Start timer on mount |
| `onTimeout` | `(value) => void` | `undefined` | Called at `0s` |
| `onSubmit` | `(result) => void` | `undefined` | Called on manual submit |
| `question` | `string` | required | Forwarded to `QuizCard` |

## Advanced Usage

```tsx
<TimedQuiz
  duration={90}
  variant="multiple-choice"
  question="Which gas do plants absorb?"
  correctAnswer="Carbon dioxide"
  choices={["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"]}
  onTimeout={(value) => console.log("expired with", value)}
/>
```

## Accessibility

- Timer updates are announced via `aria-live`.
- Underlying quiz interaction remains keyboard accessible.
- Disables the quiz cleanly after expiration.
