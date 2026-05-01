
# ParentProgressDigest

Weekly summary card that packages activity, effort, and scores into a family-ready digest.

## Installation

```bash
npx edpear add parent-progress-digest
```

## Basic Usage

```tsx
import { ParentProgressDigest } from "edpear";

<ParentProgressDigest />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Parent Progress Digest` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `sections` | `ParentProgressDigestSection[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectSection` | `(point: ParentProgressDigestSection) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
