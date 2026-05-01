
# CompetencyMatrix

Skills-by-proficiency matrix with evidence drill-down for each competency.

## Installation

```bash
npx edpear add competency-matrix
```

## Basic Usage

```tsx
import { CompetencyMatrix } from "edpear";

<CompetencyMatrix />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Competency Matrix` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `competencies` | `CompetencyMatrixEntry[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onViewEvidence` | `(entry: CompetencyMatrixEntry) => void` | `undefined` | Fires the primary domain action for the active card |
| `onPlanNextStep` | `(entry: CompetencyMatrixEntry) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
