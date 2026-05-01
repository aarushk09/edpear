
# BurnoutRiskIndicator

Engagement signal composite that flags overload trends before learners disengage.

## Installation

```bash
npx edpear add burnout-risk-indicator
```

## Basic Usage

```tsx
import { BurnoutRiskIndicator } from "edpear";

<BurnoutRiskIndicator />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Burnout Risk Indicator` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `signals` | `BurnoutRiskSignal[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectSignal` | `(point: BurnoutRiskSignal) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
