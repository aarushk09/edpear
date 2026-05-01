
# AnnouncementScheduler

Rich-text announcement composer with timezone-aware scheduling and send-window visibility.

## Installation

```bash
npx edpear add announcement-scheduler
```

## Basic Usage

```tsx
import { AnnouncementScheduler } from "edpear";

<AnnouncementScheduler />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Announcement Scheduler` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `announcements` | `ScheduledAnnouncementDraft[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSaveAnnouncements` | `(items: ScheduledAnnouncementDraft[]) => void` | `undefined` | Called when the current draft is saved |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
