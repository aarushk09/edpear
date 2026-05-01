
# VocabFlashDeck

Paired vocabulary flip deck with L1/L2 cues, quick audio affordances, and picture-ready copy.

## Installation

```bash
npx edpear add vocab-flash-deck
```

## Basic Usage

```tsx
import { VocabFlashDeck } from "edpear";

<VocabFlashDeck />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Vocab Flash Deck` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `variants` | `VocabFlashVariant[]` | Built-in sample variants | Alternate preview states or localized content |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onVariantChange` | `(variantId: string) => void` | `undefined` | Called when the active presentation variant changes |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
