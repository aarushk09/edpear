# VideoLesson

Wrap a native video or YouTube embed with chapter markers and lesson framing.

## Installation

```bash
npx edpear add video-lesson
```

## Basic Usage

```tsx
import { VideoLesson } from "edpear";

<VideoLesson
  title="Fractions in Real Life"
  src="/videos/fractions.mp4"
  chapters={[
    { id: "intro", label: "Intro", time: 0 },
    { id: "example", label: "Worked example", time: 90 },
  ]}
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | required | Video title |
| `src` | `string` | `undefined` | Native video source |
| `youtubeId` | `string` | `undefined` | YouTube video id |
| `chapters` | `VideoLessonChapter[]` | `[]` | Marker list |
| `onProgressChange` | `(time) => void` | `undefined` | Native playback callback |

## Advanced Usage

```tsx
<VideoLesson
  title="Cell Transport"
  youtubeId="dQw4w9WgXcQ"
  chapters={[
    { id: "passive", label: "Passive transport", time: 30 },
    { id: "active", label: "Active transport", time: 135 },
  ]}
/>
```

## Accessibility

- Native video controls remain available when `src` is used.
- Chapter buttons are keyboard accessible.
- Includes clear heading and marker labels for non-visual context.
