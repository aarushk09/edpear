
# LearningObjectiveEditor

Structured planning surface for writing SMART objectives and aligning success criteria.

## Installation

```bash
npx edpear add learning-objective-editor
```

## Basic Usage

```tsx
import { LearningObjectiveEditor } from "edpear";

<LearningObjectiveEditor />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Learning Objective Editor` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `objectives` | `LearningObjectiveDraft[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSaveObjectives` | `(items: LearningObjectiveDraft[]) => void` | `undefined` | Called when the current draft is saved |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
