
# DigitalTranscript

Verifiable course history view with completion evidence and a shareable signature surface.

## Installation

```bash
npx edpear add digital-transcript
```

## Basic Usage

```tsx
import { DigitalTranscript } from "edpear";

<DigitalTranscript />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Digital Transcript` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `courses` | `TranscriptCourseEntry[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onViewCredential` | `(entry: TranscriptCourseEntry) => void` | `undefined` | Fires the primary domain action for the active card |
| `onCopyShareLink` | `(entry: TranscriptCourseEntry) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
