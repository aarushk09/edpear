# GeoMapQuiz

A click-to-label map component supporting world, country, or custom SVG maps.

## Installation

```bash
npx edpear add geo-map-quiz
```

## Basic Usage

```tsx
import { GeoMapQuiz } from "edpear";

<GeoMapQuiz
  viewBox="0 0 100 100"
  targetRegionId="france"
  regions={[
    {
      id: "spain",
      name: "Spain",
      d: "M 20 80 L 40 80 L 40 60 L 20 60 Z" // Example SVG path
    },
    {
      id: "france",
      name: "France",
      d: "M 40 60 L 60 60 L 60 40 L 40 40 Z" // Example SVG path
    }
  ]}
  onRegionClick={(id, isCorrect) => console.log(id, isCorrect)}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `regions` | `GeoMapRegion[]` | required | Array of regions with SVG `d` paths |
| `targetRegionId` | `string` | `undefined` | The ID of the correct region to click |
| `onRegionClick` | `(id, isCorrect) => void` | `undefined` | Callback fired when a region is clicked |
| `title` | `string` | `"Map Quiz"` | Component header title |
| `instruction` | `string` | `undefined` | Subtitle text |
| `viewBox` | `string` | `"0 0 1000 600"` | SVG viewBox attribute |

## Usage Note

You must supply the SVG path data (`d` attribute) for each region. You can obtain path data from open-source map SVGs (like SimpleMaps or Wikipedia).
