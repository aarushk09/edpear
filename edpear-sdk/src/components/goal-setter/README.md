# GoalSetter

A structured goal creation flow with milestones, check-in cadence, and completion criteria.

## Installation

```bash
npx edpear add goal-setter
```

## Basic Usage

```tsx
import { GoalSetter } from "edpear";

<GoalSetter
  onSave={(goal) => {
    console.log("New Goal:", goal.title);
    console.log("Cadence:", goal.checkInCadence);
    console.log("Milestones:", goal.milestones);
  }}
  onCancel={() => console.log("Cancelled")}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `onSave` | `(goal: GoalData) => void` | `undefined` | Callback fired when a valid goal is saved |
| `onCancel` | `() => void` | `undefined` | Callback fired if cancel is clicked |
