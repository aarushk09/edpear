# CircuitSimulator

A lightweight logic gate builder and simulator. Allows users to add inputs, gates, and outputs, wire them together, and toggle inputs to see the resulting logic evaluated in real time.

## Installation

```bash
npx edpear add circuit-simulator
```

## Basic Usage

```tsx
import { CircuitSimulator } from "edpear";

function CircuitDemo() {
  return (
    <CircuitSimulator
      initialNodes={[
        { id: "in1", type: "INPUT", value: 1, x: 50, y: 100 },
        { id: "in2", type: "INPUT", value: 0, x: 50, y: 200 },
        { id: "and1", type: "AND", x: 200, y: 150 },
        { id: "out1", type: "OUTPUT", x: 350, y: 150 }
      ]}
      initialConnections={[
        { id: "c1", fromId: "in1", toId: "and1" },
        { id: "c2", fromId: "in2", toId: "and1" },
        { id: "c3", fromId: "and1", toId: "out1" }
      ]}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `initialNodes` | `CircuitNode[]` | `[]` | Starting nodes on the canvas |
| `initialConnections` | `CircuitConnection[]` | `[]` | Starting connections |
| `title` | `string` | `"Logic Gate Simulator"` | Header text |
| `onChange` | `(nodes, connections) => void` | `undefined` | Callback fired on edits or evaluations |

## Building Circuits

- Click the toolbar buttons to add components.
- Click one node, then another, to wire them together.
- Click an `INPUT` node to toggle its value (0 or 1).
- Green connection lines represent a `High (1)` signal; gray lines represent `Low (0)`.
