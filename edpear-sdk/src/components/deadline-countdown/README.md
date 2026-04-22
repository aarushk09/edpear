# DeadlineCountdown

An urgency-aware countdown that shifts color/tone as a deadline approaches (calm -> warning -> critical).

## Installation

```bash
npx edpear add deadline-countdown
```

## Basic Usage

```tsx
import { DeadlineCountdown } from "edpear";

// Set a deadline 48 hours from now
const deadline = new Date(Date.now() + 48 * 60 * 60 * 1000);

<DeadlineCountdown
  title="Assignment Due"
  targetDate={deadline}
  onExpire={() => console.log("Deadline passed!")}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `targetDate` | `Date \| string \| number` | required | The deadline date/time |
| `title` | `string` | `"Time Remaining"` | Label above the countdown |
| `onExpire` | `() => void` | `undefined` | Callback fired when the timer hits zero |

## State Colors

- **Calm**: > 3 days remaining (default border/background)
- **Warning**: < 3 days remaining (amber)
- **Critical**: < 24 hours remaining (rose, pulsing icon)
- **Expired**: 0 remaining (solid rose border/background)
