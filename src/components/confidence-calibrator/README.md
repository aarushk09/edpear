
# ConfidenceCalibrator

Pre/post quiz self-rating surface that exposes confidence gaps before review.

## Installation

```bash
npx edpear add confidence-calibrator
```

## Basic Usage

```tsx
import { ConfidenceCalibrator } from "edpear";

<ConfidenceCalibrator />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Confidence Calibrator` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `checkpoints` | `ConfidenceCheckpoint[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectCheckpoint` | `(point: ConfidenceCheckpoint) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
