# InteractiveTimeline

A zoomable/scrollable horizontal timeline for history/event-based curricula with media attachments per node.

## Installation

```bash
npx edpear add interactive-timeline
```

## Basic Usage

```tsx
import { InteractiveTimeline } from "edpear";

<InteractiveTimeline
  nodes={[
    {
      id: "event-1",
      title: "Declaration of Independence",
      dateLabel: "1776",
      description: "The Second Continental Congress adopted the Declaration of Independence.",
    },
    {
      id: "event-2",
      title: "Constitution Ratified",
      dateLabel: "1788",
      description: "The US Constitution was officially ratified by the required 9 states.",
    }
  ]}
  onNodeClick={(node) => console.log("Clicked:", node.title)}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `nodes` | `TimelineNode[]` | required | Array of events/nodes to display |
| `title` | `string` | `"Interactive Timeline"` | Component header title |
| `onNodeClick` | `(node) => void` | `undefined` | Callback fired when the node dot is clicked |

## Visuals

- Nodes are rendered in an alternating top/bottom pattern along a horizontal track.
- The track uses native CSS horizontal scrolling and snap points.
- Images render in 16:9 ratio.
