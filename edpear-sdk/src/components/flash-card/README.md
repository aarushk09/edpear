# FlashCard

Flip-based retrieval practice card with click, keyboard, and swipe support.

## Installation

```bash
npx edpear add flash-card
```

## Basic Usage

```tsx
import { FlashCard } from "edpear";

<FlashCard
  front="What is the capital of France?"
  back="Paris"
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `front` | `ReactNode` | required | Front face content |
| `back` | `ReactNode` | required | Back face content |
| `flipped` | `boolean` | uncontrolled | Controlled flip state |
| `defaultFlipped` | `boolean` | `false` | Initial flip state |
| `onFlippedChange` | `(flipped) => void` | `undefined` | Flip callback |
| `swipeable` | `boolean` | `true` | Enable pointer swipe flipping |

## Advanced Usage

```tsx
<FlashCard
  front={<div><strong>Term</strong><p>Mitosis</p></div>}
  back={<div><strong>Definition</strong><p>Cell division that creates two identical daughter cells.</p></div>}
/>
```

## Accessibility

- Uses a button so the card is keyboard focusable by default.
- Supports `ArrowLeft` and `ArrowRight` to flip.
- Uses `data-state` for custom focus and animation hooks.
