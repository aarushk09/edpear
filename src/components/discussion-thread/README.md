# DiscussionThread

Render nested course discussion threads with replies and lightweight moderation hooks.

## Installation

```bash
npx edpear add discussion-thread
```

## Basic Usage

```tsx
import { DiscussionThread } from "edpear";

<DiscussionThread
  comments={[
    {
      id: "1",
      author: "Ava",
      content: "I think the answer is evaporation because heat is involved.",
      timestamp: "2m ago",
    },
  ]}
/>;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `comments` | `DiscussionComment[]` | required | Comment tree |
| `onReply` | `(parentId, content) => void` | `undefined` | Reply callback |
| `onUpvote` | `(commentId) => void` | `undefined` | Upvote callback |
| `placeholder` | `string` | built-in | Reply input placeholder |

## Advanced Usage

```tsx
<DiscussionThread
  comments={thread}
  onReply={(parentId, content) => saveReply(parentId, content)}
  onUpvote={(commentId) => toggleUpvote(commentId)}
/>
```

## Accessibility

- Reply and upvote actions are native buttons.
- Nested replies preserve a readable hierarchy.
- Textareas are labeled for keyboard and screen-reader users.
