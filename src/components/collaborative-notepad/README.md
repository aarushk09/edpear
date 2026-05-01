
# CollaborativeNotepad

Shared lesson-scoped notes surface with visible contributions and easy synthesis.

## Installation

```bash
npx edpear add collaborative-notepad
```

## Basic Usage

```tsx
import { CollaborativeNotepad } from "edpear";

<CollaborativeNotepad />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Collaborative Notepad` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `notes` | `CollaborativeNote[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSaveNotes` | `(items: CollaborativeNote[]) => void` | `undefined` | Called when the current draft is saved |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
