# SpinToReview

A randomized question picker "wheel" for warm-up review — high engagement in live class settings.

## Installation

```bash
npx edpear add spin-to-review
```

## Basic Usage

```tsx
import { SpinToReview } from "edpear";

<SpinToReview
  items={[
    { id: "1", label: "Photosynthesis" },
    { id: "2", label: "Cellular Respiration" },
    { id: "3", label: "Mitosis" },
    { id: "4", label: "Meiosis" },
    { id: "5", label: "Genetics" }
  ]}
  onSpinEnd={(item) => alert(`Reviewing: ${item.label}`)}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `SpinItem[]` | required | Array of topics to spin for |
| `onSpinEnd` | `(item: SpinItem) => void` | `undefined` | Callback fired when the wheel stops |
| `title` | `string` | `"Spin to Review"` | Header title |
| `description` | `string` | `"Spin the wheel..."` | Subtitle text |
| `spinDurationMs` | `number` | `4000` | How long the spin animation lasts |

## Styling

- Colors are assigned automatically from a beautiful predefined palette if not provided per item.
- Uses `conic-gradient` for a lightweight CSS-based wheel.
