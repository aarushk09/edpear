
# KudosBoard

Recognition wall where classmates can celebrate helpful actions, persistence, and wins.

## Installation

```bash
npx edpear add kudos-board
```

## Basic Usage

```tsx
import { KudosBoard } from "edpear";

<KudosBoard />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Kudos Board` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `recognitions` | `KudosEntry[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onBoostKudos` | `(entry: KudosEntry) => void` | `undefined` | Fires the primary domain action for the active card |
| `onPinKudos` | `(entry: KudosEntry) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
