# LectureCaptionOverlay

Renders live or synced captions over a video embed with speaker labels and a searchable transcript side panel.

## Installation

```bash
npx edpear add lecture-caption-overlay
```

## Basic Usage

```tsx
import { LectureCaptionOverlay } from "edpear";
import { useState } from "react";

function LectureDemo() {
  const [currentTime, setCurrentTime] = useState(15); // e.g. driven by video player onTimeUpdate

  return (
    <LectureCaptionOverlay
      currentTime={currentTime}
      onSeek={(time) => console.log("Seek video to", time)}
      captions={[
        { id: "1", startTime: 0, endTime: 5, text: "Welcome to the lecture.", speakerName: "Prof. Smith" },
        { id: "2", startTime: 6, endTime: 15, text: "Today we will discuss...", speakerName: "Prof. Smith" }
      ]}
      className="h-[500px]"
    >
      {/* Your Video Player Here */}
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white">
        [Video Element]
      </div>
    </LectureCaptionOverlay>
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | The video player to overlay captions onto |
| `captions` | `CaptionSegment[]` | required | Array of caption segments with start/end times |
| `currentTime` | `number` | required | Current video playback time in seconds |
| `onSeek` | `(time) => void` | `undefined` | Callback fired when a transcript item is clicked |
| `showTranscriptPanel` | `boolean` | `true` | Shows/hides the searchable side panel |
| `isLive` | `boolean` | `false` | Shows a "LIVE" badge and pulsing text in the empty transcript |
