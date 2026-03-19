# ScoreDisplay

Reveal assessment outcomes with animated score, grade, and pass/fail feedback.

## Installation

```bash
npx edpear add score-display
```

## Basic Usage

```tsx
import { ScoreDisplay } from "edpear";

<ScoreDisplay score={82} maxScore={100} />;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `score` | `number` | required | Earned score |
| `maxScore` | `number` | required | Maximum score |
| `passingScore` | `number` | `60% of max` | Threshold for pass/fail |
| `animated` | `boolean` | `true` | Animate reveal |
| `revealDuration` | `number` | `900` | Reveal timing in ms |
| `showGrade` | `boolean` | `true` | Show letter grade pill |

## Advanced Usage

```tsx
<ScoreDisplay
  score={14}
  maxScore={20}
  passingScore={16}
  revealDuration={1400}
/>
```

## Accessibility

- Result is expressed in numbers, text, and visual segments.
- State is available via `data-state`.
- Animated reveal can be disabled.
