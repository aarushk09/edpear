# ChemistryFormulaBuilder

A click-to-assemble element/compound builder with validity feedback — ideal for chemistry courses.

## Installation

```bash
npx edpear add chemistry-formula-builder
```

## Basic Usage

```tsx
import { ChemistryFormulaBuilder } from "edpear";

<ChemistryFormulaBuilder
  targetFormula="H2O"
  onChange={(formula, isValid) => {
    console.log("Current formula:", formula);
    if (isValid) console.log("Correct!");
  }}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `availableElements` | `ChemicalElement[]` | `[H, C, N, O, Na, Cl]` | Elements available in the palette |
| `targetFormula` | `string` | `undefined` | The string formula to validate against (e.g., `"CO2"`) |
| `title` | `string` | `"Formula Builder"` | Card header title |
| `onChange` | `(formula: string, isValid: boolean) => void` | `undefined` | Callback fired on any edit |

## Features

- **Element Blocks**: Click an element in the palette to add it to the workspace.
- **Subscript Controls**: Built-in up/down arrows to adjust the quantity (subscript) of each element block.
- **Auto-Validation**: Automatically compares the resulting formula string to `targetFormula`.
