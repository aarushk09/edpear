# StreakTracker

Show habit momentum with a Duolingo-style daily streak component.

## Installation

```bash
npx edpear add streak-tracker
```

## Basic Usage

```tsx
import { StreakTracker } from "edpear";

<StreakTracker streak={5} />;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `streak` | `number` | required | Current streak count |
| `goal` | `number` | `7` | Goal threshold |
| `days` | `StreakDay[]` | built-in sample | Seven-day completion history |
| `className` | `string` | `undefined` | Root style override |

## Advanced Usage

```tsx
<StreakTracker
  streak={12}
  goal={14}
  days={[
    { label: "Mon", completed: true },
    { label: "Tue", completed: true },
    { label: "Wed", completed: false },
    { label: "Thu", completed: true },
    { label: "Fri", completed: true },
    { label: "Sat", completed: true },
    { label: "Sun", completed: true },
  ]}
/>
```

## Accessibility

- Goal progress is shown in text and segmented progress.
- Day markers use consistent ordering and labels.
- `data-state` exposes milestone status for styling hooks.
