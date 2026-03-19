# CourseCard

Display a course summary with thumbnail, instructor, category, and learner progress.

## Installation

```bash
npx edpear add course-card
```

## Basic Usage

```tsx
import { CourseCard } from "edpear";

<CourseCard
  href="/courses/algebra-1"
  title="Algebra I Foundations"
  instructor="Maya Chen"
  progress={64}
  categoryTag="Math"
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | required | Course title |
| `instructor` | `string` | required | Instructor label |
| `progress` | `number` | `0` | Progress percent from `0-100` |
| `categoryTag` | `string` | `undefined` | Category badge |
| `thumbnailSrc` | `string` | `undefined` | Thumbnail image source |
| `ctaLabel` | `string` | `"Open course"` | Footer CTA text |

## Advanced Usage

```tsx
<CourseCard
  title="AP Biology Lab Prep"
  instructor="Jordan Ellis"
  progress={100}
  status="Completed"
  description="Prep videos, safety checks, and visual rubric walkthroughs."
/>
```

## Accessibility

- Uses an anchor root so the entire card is keyboard focusable.
- Includes visible focus styles.
- Progress is also shown as text, not color alone.
