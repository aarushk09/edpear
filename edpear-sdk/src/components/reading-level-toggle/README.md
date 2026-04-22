# ReadingLevelToggle

Adjusts vocabulary density/complexity to improve accessibility and comprehension.

## Installation

```bash
npx edpear add reading-level-toggle
```

## Basic Usage

```tsx
import { ReadingLevelToggle } from "edpear";

<ReadingLevelToggle
  defaultLevel="intermediate"
  texts={{
    beginner: "Photosynthesis is how plants make their food using sunlight.",
    intermediate: "Photosynthesis is the process by which green plants transform light energy into chemical energy.",
    advanced: "Photosynthesis is a physico-chemical process by which plants, algae and photosynthetic bacteria use light energy to drive the synthesis of organic compounds."
  }}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `texts` | `Record<ReadingLevel, ReactNode>` | required | Object containing content for `beginner`, `intermediate`, `advanced` |
| `level` | `ReadingLevel` | `undefined` | Controlled value |
| `defaultLevel` | `ReadingLevel` | `"intermediate"` | Uncontrolled default value |
| `onChange` | `(level: ReadingLevel) => void` | `undefined` | Callback fired when the level changes |
| `title` | `string` | `"Reading Complexity"` | Component header title |
