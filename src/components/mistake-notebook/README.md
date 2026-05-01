
# MistakeNotebook

Personal error log that resurfaces wrong answers for re-study and coaching.

## Installation

```bash
npx edpear add mistake-notebook
```

## Basic Usage

```tsx
import { MistakeNotebook } from "edpear";

<MistakeNotebook />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Mistake Notebook` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `entries` | `MistakeNotebookEntry[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onResurfaceEntry` | `(entry: MistakeNotebookEntry) => void` | `undefined` | Fires the primary domain action for the active card |
| `onArchiveEntry` | `(entry: MistakeNotebookEntry) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
