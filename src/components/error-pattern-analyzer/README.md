
# ErrorPatternAnalyzer

Clusters repeated wrong answers into misconception groups that teams can address.

## Installation

```bash
npx edpear add error-pattern-analyzer
```

## Basic Usage

```tsx
import { ErrorPatternAnalyzer } from "edpear";

<ErrorPatternAnalyzer />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Error Pattern Analyzer` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `clusters` | `ErrorPatternCluster[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onOpenCluster` | `(entry: ErrorPatternCluster) => void` | `undefined` | Fires the primary domain action for the active card |
| `onAssignIntervention` | `(entry: ErrorPatternCluster) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
