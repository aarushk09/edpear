
# StudyGroupFinder

Learner matching surface that organizes study partners by topic, timezone, and availability.

## Installation

```bash
npx edpear add study-group-finder
```

## Basic Usage

```tsx
import { StudyGroupFinder } from "edpear";

<StudyGroupFinder />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Study Group Finder` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `groups` | `StudyGroupMatch[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onJoinGroup` | `(entry: StudyGroupMatch) => void` | `undefined` | Fires the primary domain action for the active card |
| `onSaveGroup` | `(entry: StudyGroupMatch) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
