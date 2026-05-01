
# MoodCheckIn

Session-start emotional check-in that logs learner mood and surfaces support needs early.

## Installation

```bash
npx edpear add mood-check-in
```

## Basic Usage

```tsx
import { MoodCheckIn } from "edpear";

<MoodCheckIn />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Mood Check In` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `entries` | `MoodCheckInEntry[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onLogMood` | `(entry: MoodCheckInEntry) => void` | `undefined` | Fires the primary domain action for the active card |
| `onShareSupportTip` | `(entry: MoodCheckInEntry) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
