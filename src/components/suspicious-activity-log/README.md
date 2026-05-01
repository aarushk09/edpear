
# SuspiciousActivityLog

Timestamped audit trail for paste events, focus losses, idle gaps, and integrity review notes.

## Installation

```bash
npx edpear add suspicious-activity-log
```

## Basic Usage

```tsx
import { SuspiciousActivityLog } from "edpear";

<SuspiciousActivityLog />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Suspicious Activity Log` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `events` | `SuspiciousActivityEvent[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onReviewEvent` | `(entry: SuspiciousActivityEvent) => void` | `undefined` | Fires the primary domain action for the active card |
| `onResolveEvent` | `(entry: SuspiciousActivityEvent) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
