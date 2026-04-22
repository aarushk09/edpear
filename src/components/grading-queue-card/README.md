# GradingQueueCard

A "To Review" workflow widget for instructors, surfacing pending submissions.

## Installation

```bash
npx edpear add grading-queue-card
```

## Basic Usage

```tsx
import { GradingQueueCard } from "edpear";

<GradingQueueCard
  tasks={[
    {
      id: "t1",
      studentName: "Alice Johnson",
      assignmentTitle: "Essay: The Roaring Twenties",
      submittedAt: Date.now() - 3600000, // 1 hr ago
      status: "pending",
    },
    {
      id: "t2",
      studentName: "Bob Smith",
      assignmentTitle: "Math Worksheet 4",
      submittedAt: Date.now() - 86400000, // 1 day ago
      status: "in-progress",
    }
  ]}
  onGradeTask={(id) => console.log("Open grading view for", id)}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tasks` | `GradingTask[]` | required | Array of submission tasks |
| `title` | `string` | `"To Review"` | Component header title |
| `onGradeTask` | `(taskId: string) => void` | `undefined` | Callback fired when a task is clicked |

## Features

- Auto-sorts pending tasks by submission date (oldest first).
- Filters out tasks with status `"graded"`.
- Displays relative time (e.g., "Just now", "2h ago").
- Highlights `"in-progress"` tasks with an amber draft tag.
