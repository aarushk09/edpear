
# PronunciationScorer

Waveform-inspired scoring card with phoneme-level feedback for spoken practice.

## Installation

```bash
npx edpear add pronunciation-scorer
```

## Basic Usage

```tsx
import { PronunciationScorer } from "edpear";

<PronunciationScorer />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Pronunciation Scorer` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `phonemes` | `PronunciationPhoneme[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectPhoneme` | `(point: PronunciationPhoneme) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
