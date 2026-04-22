# StudyScheduler

A drag-and-drop weekly planner where learners can block out study sessions.

## Installation

```bash
npx edpear add study-scheduler
```

## Basic Usage

```tsx
import { StudyScheduler } from "edpear";
import { useState } from "react";

function SchedulerDemo() {
  const [sessions, setSessions] = useState([
    {
      id: "1",
      title: "Math Homework",
      dayOfWeek: 1, // Monday
      startHour: 15, // 3 PM
      durationHours: 2,
      color: "bg-blue-500",
    },
  ]);

  return (
    <StudyScheduler
      sessions={sessions}
      startHour={8}
      endHour={20}
      onSessionMove={(id, day, hour) => {
        setSessions(sessions.map(s => 
          s.id === id ? { ...s, dayOfWeek: day, startHour: hour } : s
        ));
      }}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `sessions` | `StudySession[]` | required | Array of session objects |
| `startHour` | `number` | `8` | Start time of the calendar day (0-23) |
| `endHour` | `number` | `20` | End time of the calendar day (0-23) |
| `onSessionMove` | `(id, newDay, newHour) => void` | `undefined` | Callback when a session is dragged and dropped |
| `onSessionClick` | `(session) => void` | `undefined` | Callback when a session is clicked |

## Interactions

- Relies on HTML5 Drag and Drop API.
- Users can drag an event block to any slot on the grid.
