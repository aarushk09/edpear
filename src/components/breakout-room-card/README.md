# BreakoutRoomCard

Displays assigned breakout group, members, topic, and a rejoin/return timer.

## Installation

```bash
npx edpear add breakout-room-card
```

## Basic Usage

```tsx
import { BreakoutRoomCard } from "edpear";

<BreakoutRoomCard
  roomName="Group Alpha"
  topic="Discuss the implications of AI in education"
  members={[
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Charlie Brown" },
  ]}
  status="assigned"
  onJoin={() => console.log("Joining room")}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `roomName` | `string` | required | Name of the breakout room |
| `topic` | `string` | `undefined` | Discussion topic or instructions |
| `members` | `BreakoutMember[]` | required | List of students in the room |
| `status` | `"assigned" \| "in-progress" \| "ending"` | required | Controls the UI state and visible buttons |
| `expiresAt` | `Date \| string \| number` | `undefined` | When the breakout room ends |
| `onJoin` | `() => void` | `undefined` | Action handler to join the room |
| `onReturnToMain` | `() => void` | `undefined` | Action handler to return to the main session |

## State Behavior

- `"assigned"`: Shows "Join Room" button.
- `"in-progress"`: Shows countdown timer.
- `"ending"`: Auto-triggers when `expiresAt` is < 60 seconds away. UI pulses red.
