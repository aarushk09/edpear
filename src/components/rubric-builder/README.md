# RubricBuilder

An interactive grading matrix for assignments.

## Installation

```bash
npx edpear add rubric-builder
```

## Basic Usage

```tsx
import { RubricBuilder } from "edpear";
import { useState } from "react";

function RubricDemo() {
  const [selections, setSelections] = useState({});

  return (
    <RubricBuilder
      criteria={[
        { id: "c1", name: "Grammar & Spelling", description: "Use of standard English" }
      ]}
      levels={[
        { id: "l1", points: 10, label: "Excellent" },
        { id: "l2", points: 5, label: "Satisfactory" }
      ]}
      cells={[
        { criterionId: "c1", levelId: "l1", description: "No errors." },
        { criterionId: "c1", levelId: "l2", description: "A few minor errors." }
      ]}
      selectedCells={selections}
      onSelectCell={(cId, lId) => setSelections({ ...selections, [cId]: lId })}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `criteria` | `RubricCriterion[]` | required | Rows (e.g., Content, Grammar) |
| `levels` | `RubricLevel[]` | required | Columns (e.g., Excellent, Poor) |
| `cells` | `RubricCell[]` | required | The intersecting description data |
| `selectedCells` | `Record<string, string>` | `{}` | Map of `criterionId` -> `levelId` |
| `onSelectCell` | `(cId, lId) => void` | `undefined` | Callback fired when a cell is clicked |
| `readOnly` | `boolean` | `false` | If true, disables clicking/selection |
