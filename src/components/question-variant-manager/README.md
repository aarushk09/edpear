
# QuestionVariantManager

Variant planning surface for shuffling question pools and parameter sets per learner seat.

## Installation

```bash
npx edpear add question-variant-manager
```

## Basic Usage

```tsx
import { QuestionVariantManager } from "edpear";

<QuestionVariantManager />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Question Variant Manager` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `variants` | `QuestionVariantDraft[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSaveVariants` | `(items: QuestionVariantDraft[]) => void` | `undefined` | Called when the current draft is saved |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
