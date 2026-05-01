
# FocusTimer

Pomodoro-style work and break planner with quick visibility into distractions and recovery.

## Installation

```bash
npx edpear add focus-timer
```

## Basic Usage

```tsx
import { FocusTimer } from "edpear";

<FocusTimer />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Focus Timer` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `cycles` | `FocusTimerCycle[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectCycle` | `(point: FocusTimerCycle) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
