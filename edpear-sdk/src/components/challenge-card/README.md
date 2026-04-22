# ChallengeCard

A time-boxed bonus challenge with reward preview, accept/decline, and countdown.

## Installation

```bash
npx edpear add challenge-card
```

## Basic Usage

```tsx
import { ChallengeCard } from "edpear";
import { useState } from "react";

function ChallengeDemo() {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">("pending");

  return (
    <ChallengeCard
      title="Speed Reader Bonus"
      description="Read the next 3 chapters without using hints to earn bonus XP."
      expiresAt={new Date(Date.now() + 2 * 60 * 60 * 1000)} // 2 hours from now
      reward={{ type: "xp", amount: 500, label: "XP" }}
      status={status}
      onAccept={() => setStatus("accepted")}
      onDecline={() => setStatus("declined")}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | required | Challenge title |
| `description` | `string` | required | Description of what to do |
| `expiresAt` | `Date \| string \| number` | required | Expiration timestamp |
| `reward` | `ChallengeReward` | required | Reward config (amount, type: `xp`, `currency`, `badge`, `custom`) |
| `status` | `ChallengeStatus` | `"pending"` | Current state: `"pending"`, `"accepted"`, `"declined"`, `"completed"`, `"expired"` |
| `onAccept` | `() => void` | `undefined` | Accept action handler |
| `onDecline` | `() => void` | `undefined` | Decline action handler |

## Accessibility

- Actions are accessible via keyboard.
- Expiration is dynamically computed but static enough to avoid aggressive screen-reader announcements until necessary.
