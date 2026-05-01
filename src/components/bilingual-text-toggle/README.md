
# BilingualTextToggle

Paragraph-level language switch that supports scaffolded reading across two texts.

## Installation

```bash
npx edpear add bilingual-text-toggle
```

## Basic Usage

```tsx
import { BilingualTextToggle } from "edpear";

<BilingualTextToggle />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Bilingual Text Toggle` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `variants` | `BilingualParagraphVariant[]` | Built-in sample variants | Alternate preview states or localized content |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onVariantChange` | `(variantId: string) => void` | `undefined` | Called when the active presentation variant changes |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
