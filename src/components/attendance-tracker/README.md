# AttendanceTracker

An instructor-side grid for marking presence, absence, or tardiness across sessions.

## Installation

```bash
npx edpear add attendance-tracker
```

## Basic Usage

```tsx
import { AttendanceTracker } from "edpear";
import { useState } from "react";

function AttendanceDemo() {
  const [records, setRecords] = useState([
    { studentId: "s1", sessionId: "session1", status: "present" }
  ]);

  return (
    <AttendanceTracker
      students={[
        { id: "s1", name: "Alice Johnson" },
        { id: "s2", name: "Bob Smith" }
      ]}
      sessions={[
        { id: "session1", date: "2023-10-01", title: "Intro" },
        { id: "session2", date: "2023-10-08", title: "React Basics" }
      ]}
      records={records}
      onChange={(newRecord) => {
        setRecords(prev => {
          const filtered = prev.filter(r => !(r.studentId === newRecord.studentId && r.sessionId === newRecord.sessionId));
          return [...filtered, newRecord];
        });
      }}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `students` | `AttendanceStudent[]` | required | Array of students |
| `sessions` | `AttendanceSession[]` | required | Array of sessions |
| `records` | `AttendanceRecord[]` | required | Array of current attendance records |
| `onChange` | `(record) => void` | `undefined` | Callback fired when a cell is clicked |
| `onExport` | `() => void` | `undefined` | Callback fired when the export button is clicked |

## Interactions

- Clicking a cell cycles through the states: Unmarked -> Present -> Absent -> Late -> Excused -> Unmarked.
