# WhiteboardEmbed

An embeddable collaborative whiteboard frame with tool controls and snapshot export.

## Installation

```bash
npx edpear add whiteboard-embed
```

## Basic Usage

```tsx
import { WhiteboardEmbed } from "edpear";

function WhiteboardDemo() {
  return (
    <WhiteboardEmbed
      roomName="Math Problem #4"
      collaboratorCount={3}
      onSnapshot={() => alert("Snapshot requested")}
      onClear={() => alert("Clear requested")}
    >
      {/* Mount an iframe or canvas here */}
      <iframe src="https://excalidraw.com/" className="w-full h-full border-0" />
    </WhiteboardEmbed>
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `undefined` | The actual canvas or iframe |
| `roomName` | `string` | `"Collaborative Whiteboard"` | Title of the room |
| `collaboratorCount` | `number` | `1` | Number of users currently in the room |
| `isReadOnly` | `boolean` | `false` | Disables tool buttons |
| `onSnapshot` | `() => void` | `undefined` | Callback fired when the camera icon is clicked |
| `onClear` | `() => void` | `undefined` | Callback fired when the trash icon is clicked |

## UI Features

- Provides a standardized wrapper for third-party tools like Excalidraw or tldraw.
- Manages local UI state for the active tool selection.
