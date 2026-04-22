# PollWidget

Instructor-launched live poll with real-time bar chart result reveal.

## Installation

```bash
npx edpear add poll-widget
```

## Basic Usage

```tsx
import { PollWidget } from "edpear";
import { useState } from "react";

function PollDemo() {
  const [status, setStatus] = useState<"open" | "closed" | "results">("open");
  const [vote, setVote] = useState<string | undefined>();

  return (
    <PollWidget
      question="What framework are you most excited to learn?"
      options={[
        { id: "1", label: "React", votes: 45 },
        { id: "2", label: "Vue", votes: 20 },
        { id: "3", label: "Svelte", votes: 35 },
      ]}
      status={status}
      userVoteId={vote}
      onVote={setVote}
      isInstructor={true}
      onClosePoll={() => setStatus("closed")}
      onShowResults={() => setStatus("results")}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `question` | `string` | required | The poll question |
| `options` | `PollOption[]` | required | The options to vote on |
| `status` | `"open" \| "closed" \| "results"` | required | Controls voting access and UI mode |
| `userVoteId` | `string` | `undefined` | ID of the option the current user selected |
| `onVote` | `(id) => void` | `undefined` | Callback fired when a user selects an option |
| `isInstructor` | `boolean` | `false` | Shows instructor controls |
| `onClosePoll` | `() => void` | `undefined` | Callback for "Close Poll" action |
| `onShowResults` | `() => void` | `undefined` | Callback for "Reveal Results" action |
