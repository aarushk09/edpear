
# ContentReadabilityMeter

Flesch-Kincaid inspired readability surface for previewing text difficulty before publishing.

## Installation

```bash
npx edpear add content-readability-meter
```

## Basic Usage

```tsx
import { ContentReadabilityMeter } from "edpear";

<ContentReadabilityMeter />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Content Readability Meter` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `passages` | `ReadabilitySample[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectPassage` | `(point: ReadabilitySample) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
