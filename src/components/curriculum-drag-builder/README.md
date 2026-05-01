
# CurriculumDragBuilder

Sequencing surface for arranging modules and lessons into a coherent learning arc.

## Installation

```bash
npx edpear add curriculum-drag-builder
```

## Basic Usage

```tsx
import { CurriculumDragBuilder } from "edpear";

<CurriculumDragBuilder />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Curriculum Drag Builder` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `modules` | `CurriculumSequenceItem[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSaveModules` | `(items: CurriculumSequenceItem[]) => void` | `undefined` | Called when the current draft is saved |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
