# LeaderboardWidget

A scoped (class, cohort, global) ranked leaderboard with delta indicators and opt-out support.

## Installation

```bash
npx edpear add leaderboard-widget
```

## Basic Usage

```tsx
import { LeaderboardWidget } from "edpear";
import { useState } from "react";

function LeaderboardDemo() {
  const [scope, setScope] = useState<"class" | "cohort" | "global">("class");

  return (
    <LeaderboardWidget
      scope={scope}
      onScopeChange={setScope}
      optOutSupport={true}
      onOptOut={() => console.log("User opted out")}
      entries={[
        { id: "u1", rank: 1, name: "Alice", score: 15400, trend: "same" },
        { id: "u2", rank: 2, name: "Bob", score: 14200, trend: "up", isCurrentUser: true },
        { id: "u3", rank: 3, name: "Charlie", score: 13900, trend: "down" },
      ]}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `entries` | `LeaderboardEntry[]` | required | Array of ranked users |
| `scope` | `"class" \| "cohort" \| "global"` | `"class"` | The current leaderboard view |
| `onScopeChange` | `(scope) => void` | `undefined` | Callback to change the scope |
| `optOutSupport` | `boolean` | `false` | Shows an opt-out button |
| `onOptOut` | `() => void` | `undefined` | Callback when opt-out is clicked |

## UI Highlights

- Auto-styles the top 3 ranks with Gold, Silver, and Bronze colors.
- Highlights the `isCurrentUser` entry.
- Displays trend arrows (up/down/same).
