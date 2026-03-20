"use client";

import { Bot, Send } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "../../lib/cn.js";
import { openRouterChat } from "../../lib/openrouter.js";
import type { OpenRouterMessage } from "../../lib/openrouter.js";
import type { AITutorProps } from "./ai-tutor.types.js";

const TUTOR_SYSTEM = `You are a Socratic tutor for a single lesson. Use the lesson context below to stay accurate.
Rules:
- Guide with questions and hints; do not dump full solutions unless the learner explicitly asks for the answer after trying.
- Reference ideas from the lesson when helpful.
- Keep replies concise (under 120 words unless the learner asks for detail).
- If the question is outside the lesson scope, say so briefly and relate back to the lesson when possible.

--- LESSON CONTEXT ---
`;

export function AITutor({
  lessonContent,
  apiKey,
  model = "openai/gpt-4o-mini",
  title = "Lesson tutor",
  className,
}: AITutorProps) {
  const inputId = useId();
  const [messages, setMessages] = useState<OpenRouterMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError("");
    const userMsg: OpenRouterMessage = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);
    try {
      const systemContent = `${TUTOR_SYSTEM}${lessonContent}`;
      const res = await openRouterChat({
        apiKey,
        model,
        maxTokens: 600,
        messages: [{ role: "system", content: systemContent }, ...next],
      });
      const assistant = res.choices[0]?.message.content?.trim() ?? "";
      if (!assistant) throw new Error("Empty response");
      setMessages([...next, { role: "assistant", content: assistant }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn("flex h-[min(560px,70vh)] flex-col rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="ai-tutor"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Bot className="h-5 w-5 text-primary" aria-hidden />
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">Socratic help scoped to this lesson</p>
        </div>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ask a question about the lesson. The tutor only sees this session plus the lesson text you passed in.
          </p>
        ) : null}
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[95%] rounded-lg px-3 py-2 text-sm",
              m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-muted",
            )}
          >
            {m.content}
          </div>
        ))}
        {loading ? <p className="text-xs text-muted-foreground">Thinking…</p> : null}
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
      </div>
      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <label htmlFor={inputId} className="sr-only">
            Message
          </label>
          <input
            id={inputId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), void send())}
            disabled={loading || !apiKey.trim()}
            placeholder={apiKey.trim() ? "Ask the tutor…" : "Set apiKey to chat"}
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={loading || !apiKey.trim()}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
