
# ProctorModeOverlay

Fullscreen assessment shell that surfaces focus loss, blur events, and live integrity status.

## Installation

```bash
npx edpear add proctor-mode-overlay
```

## Basic Usage

```tsx
import { ProctorModeOverlay } from "edpear";

<ProctorModeOverlay />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Proctor Mode Overlay` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `signals` | `ProctorSignal[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSelectSignal` | `(point: ProctorSignal) => void` | `undefined` | Called when a metric row is inspected |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
