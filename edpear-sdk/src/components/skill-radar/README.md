# SkillRadar

A spider/radar chart component to visualize multi-dimensional mastery or skill profiles. It uses a lightweight, dependency-free SVG implementation.

## Installation

```bash
npx edpear add skill-radar
```

## Basic Usage

```tsx
import { SkillRadar } from "edpear";

<SkillRadar
  title="Student Profile"
  description="Competency distribution across core subjects"
  data={[
    { name: "Math", value: 80 },
    { name: "Science", value: 65 },
    { name: "History", value: 90 },
    { name: "Art", value: 50 },
    { name: "Literature", value: 85 },
  ]}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `SkillRadarDimension[]` | required | Array of dimensions with `name` and `value` |
| `title` | `string` | `undefined` | Optional title |
| `description` | `string` | `undefined` | Optional subtitle/description |
| `fillColor` | `string` | `"hsl(var(--primary))"` | Color of the data polygon |
| `strokeColor` | `string` | `"hsl(var(--primary))"` | Color of the data border |
| `gridLevels` | `number` | `5` | Number of concentric grid polygons |

## Accessibility

- Renders as a standard semantic HTML structure containing an SVG.
- Ensure you provide a title and description for context.
