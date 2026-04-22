# RecommendationCarousel

An "Up next for you" horizontally scrolling card rail driven by completion and interest signals.

## Installation

```bash
npx edpear add recommendation-carousel
```

## Basic Usage

```tsx
import { RecommendationCarousel } from "edpear";

<RecommendationCarousel
  items={[
    {
      id: "1",
      title: "Advanced React Patterns",
      type: "course",
      matchScore: 95,
      duration: "2h 30m"
    },
    {
      id: "2",
      title: "Understanding Hooks",
      type: "video",
      matchScore: 88,
      duration: "15m"
    }
  ]}
  onItemClick={(item) => console.log("Navigating to", item.id)}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `RecommendationItem[]` | required | Array of recommended items |
| `title` | `string` | `"Up Next For You"` | Carousel header title |
| `onItemClick` | `(item: RecommendationItem) => void` | `undefined` | Callback fired when a card is clicked |

## Accessibility

- Left/Right scroll buttons are accessible via keyboard.
- Carousel uses CSS snap points for smooth native scrolling.
- Cards are interactive buttons.
