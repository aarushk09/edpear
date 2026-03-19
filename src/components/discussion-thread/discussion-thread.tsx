import { MessageSquareReply, ThumbsUp } from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { DiscussionComment, DiscussionThreadProps } from "./discussion-thread.types.js";

interface CommentItemProps {
  comment: DiscussionComment;
  level: number;
  placeholder: string;
  onReply?: (parentId: string | null, content: string) => void;
  onUpvote?: (commentId: string) => void;
}

function CommentItem({ comment, level, placeholder, onReply, onUpvote }: CommentItemProps) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyValue, setReplyValue] = useState("");

  return (
    <div className="space-y-3">
      <article
        className={cn(
          "rounded-2xl border bg-background p-4 shadow-sm",
          level > 0 && "border-dashed",
        )}
        data-slot="discussion-comment"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{comment.author}</span>
              {comment.role ? (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {comment.role}
                </span>
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-muted"
            type="button"
            onClick={() => onUpvote?.(comment.id)}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{comment.upvotes ?? 0}</span>
          </button>
        </div>
        <p className="mt-3 text-sm leading-6">{comment.content}</p>
        <div className="mt-4 flex gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
            type="button"
            onClick={() => setReplyOpen((current) => !current)}
          >
            <MessageSquareReply className="h-4 w-4" />
            <span>Reply</span>
          </button>
        </div>
        {replyOpen ? (
          <div className="mt-4 space-y-3">
            <label className="sr-only" htmlFor={`reply-${comment.id}`}>
              Reply to {comment.author}
            </label>
            <textarea
              id={`reply-${comment.id}`}
              className="min-h-24 w-full rounded-2xl border bg-card px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder={placeholder}
              value={replyValue}
              onChange={(event) => setReplyValue(event.target.value)}
            />
            <div className="flex gap-2">
              <button
                className="rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                type="button"
                onClick={() => {
                  if (!replyValue.trim()) return;
                  onReply?.(comment.id, replyValue.trim());
                  setReplyValue("");
                  setReplyOpen(false);
                }}
              >
                Post reply
              </button>
              <button
                className="rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-muted"
                type="button"
                onClick={() => setReplyOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </article>
      {comment.replies?.length ? (
        <div className="ml-4 space-y-3 border-l border-dashed pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              level={level + 1}
              placeholder={placeholder}
              onReply={onReply}
              onUpvote={onUpvote}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export const DiscussionThread = forwardRef<HTMLDivElement, DiscussionThreadProps>(
  ({ comments, onReply, onUpvote, placeholder = "Add a thoughtful reply", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-4 rounded-3xl border bg-card p-5 text-card-foreground shadow-sm", className)}
      data-slot="discussion-thread"
      {...props}
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Discussion</h3>
        <p className="text-sm text-muted-foreground">
          Encourage learners to explain their thinking and respond to peers.
        </p>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            level={0}
            placeholder={placeholder}
            onReply={onReply}
            onUpvote={onUpvote}
          />
        ))}
      </div>
    </div>
  ),
);

DiscussionThread.displayName = "DiscussionThread";
