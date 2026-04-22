# CohortComparisonChart

Benchmarking visualization comparing class average vs specific cohort or student.

## Installation

```bash
npx edpear add cohort-comparison-chart
```

## Basic Usage

```tsx
import { CohortComparisonChart } from "edpear";

<CohortComparisonChart
  data={[
    { label: "Quiz 1", studentScore: 85, cohortAverage: 72 },
    { label: "Midterm", studentScore: 92, cohortAverage: 78 },
    { label: "Participation", studentScore: 100, cohortAverage: 85 },
  ]}
  studentLabel="Alice"
  cohortLabel="Class Avg"
  maxScore={100}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `ComparisonDataPoint[]` | required | Array of metrics |
| `studentLabel` | `string` | `"Student"` | Legend label for the primary score |
| `cohortLabel` | `string` | `"Class Average"` | Legend label for the secondary score |
| `title` | `string` | `"Performance Comparison"` | Component header title |
| `maxScore` | `number` | `100` | Maximum possible score to calculate bar percentages |
