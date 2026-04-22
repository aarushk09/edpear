# AttendanceHeatMap

A GitHub-style contribution graph for visualizing learner presence or activity over time.

## Installation

```bash
npx edpear add attendance-heat-map
```

## Basic Usage

```tsx
import { AttendanceHeatMap } from "edpear";

function HeatMapDemo() {
  return (
    <AttendanceHeatMap
      data={[
        { date: "2023-10-01", count: 5 },
        { date: "2023-10-02", count: 12 },
        { date: "2023-10-05", count: 1 },
      ]}
      startDate={new Date("2023-08-01")}
      endDate={new Date("2023-10-31")}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `HeatMapData[]` | required | Array of `{ date: string, count: number }` |
| `title` | `string` | `"Activity & Presence"` | Component header title |
| `startDate` | `Date \| string \| number` | `~3 months ago` | The start date of the grid |
| `endDate` | `Date \| string \| number` | `today` | The end date of the grid |
| `maxCount` | `number` | `undefined` | Ceiling for color intensity mapping. If omitted, calculated from max in `data`. |

## Rendering

- Automatically fills in missing dates as empty blocks.
- Aligns dates to exact days of the week, starting on Sunday.
- Uses native horizontal scroll if the date range overflows the container.
