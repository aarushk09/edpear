# KnowledgeGapAlert

An inline callout that surfaces prerequisite gaps before a learner enters a lesson. It helps learners patch missing knowledge without blocking them completely.

## Installation

```bash
npx edpear add knowledge-gap-alert
```

## Basic Usage

```tsx
import { KnowledgeGapAlert } from "edpear";

<KnowledgeGapAlert
  gaps={[
    {
      id: "algebra-101",
      topic: "Basic Algebra",
      description: "Solving for x in linear equations is required.",
      remedyUrl: "/courses/algebra-101/linear-equations"
    },
    {
      id: "fractions",
      topic: "Fractions",
      remedyLabel: "Take Quiz",
      remedyUrl: "/quizzes/fractions"
    }
  ]}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `gaps` | `KnowledgeGap[]` | required | Array of identified gaps |
| `title` | `string` | `"Prerequisite Gaps Detected"` | Alert title |
| `onRemedyClick` | `(gap: KnowledgeGap) => void` | `undefined` | Custom handler for remedy clicks (overrides remedyUrl behavior) |
| `onDismiss` | `() => void` | `undefined` | Callback fired when the alert is dismissed |
