
# GuardianNotificationCenter

Threshold-based alert center for grades, absences, overdue work, and support follow-ups.

## Installation

```bash
npx edpear add guardian-notification-center
```

## Basic Usage

```tsx
import { GuardianNotificationCenter } from "edpear";

<GuardianNotificationCenter />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Guardian Notification Center` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `alerts` | `GuardianNotification[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onAcknowledgeAlert` | `(entry: GuardianNotification) => void` | `undefined` | Fires the primary domain action for the active card |
| `onSnoozeAlert` | `(entry: GuardianNotification) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
