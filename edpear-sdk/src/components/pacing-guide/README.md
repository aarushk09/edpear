# PacingGuide

A side-by-side view of expected vs actual progress across a course timeline.

## Installation

```bash
npx edpear add pacing-guide
```

## Basic Usage

```tsx
import { PacingGuide } from "edpear";

<PacingGuide
  items={[
    {
      id: "module-1",
      title: "Module 1: Introduction",
      expectedDate: "2023-10-01",
      actualDate: "2023-09-28", // Completed ahead of time
    },
    {
      id: "module-2",
      title: "Module 2: Core Concepts",
      expectedDate: "2023-10-15", // Not yet completed, currently past due
    },
  ]}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `PacingItem[]` | required | Array of pacing items |
| `title` | `string` | `"Course Pacing Guide"` | Header title |

## Status Calculation

The component automatically calculates status:
- **On Time / Ahead / Completed Late**: If `actualDate` is provided.
- **Upcoming**: If `actualDate` is missing and `expectedDate` is in the future.
- **Late**: If `actualDate` is missing and `expectedDate` is in the past.
