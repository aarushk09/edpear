
# SkillEndorsementCard

Instructor-signed competency card for showcasing validated skills on learner profiles.

## Installation

```bash
npx edpear add skill-endorsement-card
```

## Basic Usage

```tsx
import { SkillEndorsementCard } from "edpear";

<SkillEndorsementCard />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Skill Endorsement Card` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `endorsements` | `SkillEndorsement[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onShareEndorsement` | `(entry: SkillEndorsement) => void` | `undefined` | Fires the primary domain action for the active card |
| `onRequestRevision` | `(entry: SkillEndorsement) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
