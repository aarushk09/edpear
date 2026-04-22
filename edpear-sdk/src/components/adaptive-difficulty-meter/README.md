# AdaptiveDifficultyMeter

A real-time difficulty gauge that adjusts based on response accuracy. Ideal for pairing with quiz flows to give learners feedback on the current challenge level.

## Installation

```bash
npx edpear add adaptive-difficulty-meter
```

## Basic Usage

```tsx
import { AdaptiveDifficultyMeter } from "edpear";

<AdaptiveDifficultyMeter
  value={65}
  trend="increasing"
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | required | Difficulty score from `0` to `100` |
| `trend` | `"increasing" \| "decreasing" \| "stable"` | `"stable"` | Displays a trend indicator |
| `label` | `string` | `"Current Difficulty"` | Text label above the progress bar |
| `showTrend` | `boolean` | `true` | Whether to show the trend icon/text |
