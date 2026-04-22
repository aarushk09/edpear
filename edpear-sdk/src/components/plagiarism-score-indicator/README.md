# PlagiarismScoreIndicator

A warning gauge for academic integrity matching.

## Installation

```bash
npx edpear add plagiarism-score-indicator
```

## Basic Usage

```tsx
import { PlagiarismScoreIndicator } from "edpear";

function OriginalityDemo() {
  return (
    <PlagiarismScoreIndicator
      score={34}
      sources={[
        { id: "1", name: "Wikipedia: The French Revolution", url: "https://en.wikipedia.org...", matchPercentage: 20 },
        { id: "2", name: "Student Paper (2021)", matchPercentage: 14 }
      ]}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `score` | `number` | required | Value from 0 to 100 representing % matched |
| `sources` | `PlagiarismSource[]` | `[]` | Array of sources where text matched |
| `status` | `PlagiarismStatus` | `undefined` | `"scanning"`, `"clear"`, `"warning"`, or `"danger"`. If omitted, auto-calculates based on `score`. |
| `title` | `string` | `"Originality Report"` | Component header title |

## Visuals

- Uses a circular SVG gauge.
- Background and text colors adapt to the severity (Emerald for clear, Amber for warning, Rose for danger).
