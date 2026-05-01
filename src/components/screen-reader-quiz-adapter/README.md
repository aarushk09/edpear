
# ScreenReaderQuizAdapter

Linearized quiz presentation with clearer announcements, grouping, and assistive-tech hints.

## Installation

```bash
npx edpear add screen-reader-quiz-adapter
```

## Basic Usage

```tsx
import { ScreenReaderQuizAdapter } from "edpear";

<ScreenReaderQuizAdapter />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Screen Reader Quiz Adapter` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `variants` | `ScreenReaderQuizVariant[]` | Built-in sample variants | Alternate preview states or localized content |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onVariantChange` | `(variantId: string) => void` | `undefined` | Called when the active presentation variant changes |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
