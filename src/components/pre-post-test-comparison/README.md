
# PrePostTestComparison

Side-by-side unit view that compares knowledge before instruction and after mastery work.

## Installation

```bash
npx edpear add pre-post-test-comparison
```

## Basic Usage

```tsx
import { PrePostTestComparison } from "edpear";

<PrePostTestComparison />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Pre Post Test Comparison` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `comparisons` | `PrePostComparisonPoint[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectComparison` | `(point: PrePostComparisonPoint) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
