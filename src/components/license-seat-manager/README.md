
# LicenseSeatManager

Org-level seat dashboard that compares allocation, usage, and remaining capacity at a glance.

## Installation

```bash
npx edpear add license-seat-manager
```

## Basic Usage

```tsx
import { LicenseSeatManager } from "edpear";

<LicenseSeatManager />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `License Seat Manager` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `plans` | `LicenseSeatPlan[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectPlan` | `(point: LicenseSeatPlan) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
