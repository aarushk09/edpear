# LessonProgress

Render a step-based lesson flow with active, complete, and upcoming states.

## Installation

```bash
npx edpear add lesson-progress
```

## Basic Usage

```tsx
import { LessonProgress } from "edpear";

<LessonProgress
  currentStep={1}
  steps={[
    { id: "intro", label: "Intro" },
    { id: "practice", label: "Practice" },
    { id: "review", label: "Review" },
  ]}
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | `LessonProgressStep[]` | required | Ordered lesson steps |
| `currentStep` | `number` | `0` | Zero-based active step |
| `showLabels` | `boolean` | `true` | Show labels and descriptions |
| `className` | `string` | `undefined` | Root style override |

## Advanced Usage

```tsx
<LessonProgress
  currentStep={2}
  steps={[
    { id: "watch", label: "Watch", description: "7 min explainer" },
    { id: "check", label: "Check", description: "Quick concept check" },
    { id: "apply", label: "Apply", description: "Independent practice" },
  ]}
/>
```

## Accessibility

- Uses ordered list semantics for the lesson sequence.
- Active state is exposed through `data-state`.
- Completion is shown with icon and text positioning, not color alone.
