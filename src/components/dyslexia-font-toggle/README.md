
# DyslexiaFontToggle

One-click reading preview that switches to a dyslexia-friendly font and spacing profile.

## Installation

```bash
npx edpear add dyslexia-font-toggle
```

## Basic Usage

```tsx
import { DyslexiaFontToggle } from "edpear";

<DyslexiaFontToggle />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Dyslexia Font Toggle` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `variants` | `DyslexiaFontVariant[]` | Built-in sample variants | Alternate preview states or localized content |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onVariantChange` | `(variantId: string) => void` | `undefined` | Called when the active presentation variant changes |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
