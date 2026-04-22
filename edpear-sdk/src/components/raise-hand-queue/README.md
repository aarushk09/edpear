# RaiseHandQueue

Live class queue where learners raise a virtual hand and instructors call on them in order.

## Installation

```bash
npx edpear add raise-hand-queue
```

## Basic Usage

### Student View

```tsx
import { RaiseHandQueue } from "edpear";

<RaiseHandQueue
  queue={[]} // Provide queue from your live state
  isInstructor={false}
  isHandRaised={false}
  onRaiseHand={() => console.log("Raising hand...")}
/>
```

### Instructor View

```tsx
import { RaiseHandQueue } from "edpear";

<RaiseHandQueue
  queue={[
    { id: "s1", name: "Alice", raisedAt: Date.now() - 60000 },
    { id: "s2", name: "Bob", raisedAt: Date.now() - 120000 }
  ]}
  isInstructor={true}
  onCallOnStudent={(id) => console.log("Calling on", id)}
  onLowerStudentHand={(id) => console.log("Lowering hand for", id)}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `queue` | `QueuedStudent[]` | required | Array of students with raised hands |
| `isInstructor` | `boolean` | `false` | Shows instructor controls instead of self-raise buttons |
| `isHandRaised` | `boolean` | `false` | If the current user has their hand raised (student view) |
| `onRaiseHand` | `() => void` | `undefined` | Callback to raise hand |
| `onLowerHand` | `() => void` | `undefined` | Callback to lower own hand |
| `onCallOnStudent` | `(id: string) => void` | `undefined` | Callback when instructor calls on a student |
| `onLowerStudentHand` | `(id: string) => void` | `undefined` | Callback when instructor lowers a student's hand |
