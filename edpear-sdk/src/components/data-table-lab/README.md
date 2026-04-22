# DataTableLab

A spreadsheet-like table designed for science experiments and data collection. Includes built-in CSV export.

## Installation

```bash
npx edpear add data-table-lab
```

## Basic Usage

```tsx
import { DataTableLab } from "edpear";
import { useState } from "react";

function LabDemo() {
  return (
    <DataTableLab
      columns={[
        { id: "trial", label: "Trial #", type: "number", width: 100 },
        { id: "mass", label: "Mass (g)", type: "number" },
        { id: "velocity", label: "Velocity (m/s)", type: "number" },
        { id: "notes", label: "Observations", type: "text" },
      ]}
      initialData={[
        { id: "1", trial: 1, mass: 50, velocity: 2.4, notes: "Smooth run" }
      ]}
      onChange={(data) => console.log("Data updated:", data)}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `DataColumn[]` | required | Array defining table structure |
| `initialData` | `DataRow[]` | `[]` | Initial rows of data |
| `onChange` | `(data) => void` | `undefined` | Callback fired when data is modified |
| `title` | `string` | `"Data Table Lab"` | Component header title |
| `readOnly` | `boolean` | `false` | Disables editing and adding/removing rows |

## Built-in Features

- Allows adding, editing, and deleting rows dynamically.
- Built-in "Export CSV" functionality that downloads the user's data as `lab_data.csv`.
