
# LearningVelocityChart

Time-series view of how quickly concepts are being acquired across a course.

## Installation

```bash
npx edpear add learning-velocity-chart
```

## Basic Usage

```tsx
import { LearningVelocityChart } from "edpear";

<LearningVelocityChart />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Learning Velocity Chart` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `points` | `LearningVelocityPoint[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectPoint` | `(point: LearningVelocityPoint) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
