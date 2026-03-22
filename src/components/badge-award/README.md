# BadgeAward

Celebrate learner achievements with a polished unlocked or locked badge surface.

## Installation

```bash
npx edpear add badge-award
```

## Basic Usage

```tsx
import { BadgeAward } from "edpear";

<BadgeAward
  title="7-Day Streak"
  description="Completed at least one lesson every day for a week."
  earnedAt="today"
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | required | Badge title |
| `description` | `string` | `undefined` | Supporting copy |
| `unlocked` | `boolean` | `true` | Locked or unlocked state |
| `earnedAt` | `string` | `undefined` | Time earned label |
| `animate` | `boolean` | `true` | Enable pulse effect |

## Advanced Usage

```tsx
<BadgeAward
  title="Lab Safety Master"
  description="Passed every setup check with zero critical issues."
  unlocked={false}
/>
```

## Accessibility

- Status text communicates locked versus unlocked state.
- Decorative animation is optional.
- Visual hierarchy does not rely on animation alone.
