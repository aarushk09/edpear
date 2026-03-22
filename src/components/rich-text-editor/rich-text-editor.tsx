import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { Bold, Italic, List, ListOrdered, Quote } from "lucide-react";
import { forwardRef, useEffect } from "react";

import { cn } from "../../lib/cn.js";
import type { RichTextEditorProps } from "./rich-text-editor.types.js";

const toolbarButtonClassName =
  "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ value, defaultValue, onValueChange, placeholder = "Capture notes, reflections, or a draft answer", className, ...props }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder,
        }),
      ],
      content: value ?? defaultValue ?? "",
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class:
            "min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&_p.is-editor-empty:first-child::before]:pointer-events-none [&_p.is-editor-empty:first-child::before]:float-left [&_p.is-editor-empty:first-child::before]:h-0 [&_p.is-editor-empty:first-child::before]:text-muted-foreground [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
        },
      },
      onUpdate: ({ editor: currentEditor }) => {
        onValueChange?.(currentEditor.getHTML());
      },
    });

    useEffect(() => {
      if (!editor || value === undefined) {
        return;
      }

      if (editor.getHTML() !== value) {
        editor.commands.setContent(value, false);
      }
    }, [editor, value]);

    return (
      <div
        ref={ref}
        className={cn("rounded-xl border bg-card p-4 text-card-foreground shadow-sm", className)}
        data-slot="rich-text-editor"
        {...props}
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            aria-label="Bold"
            className={toolbarButtonClassName}
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            aria-label="Italic"
            className={toolbarButtonClassName}
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            aria-label="Bullet list"
            className={toolbarButtonClassName}
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            aria-label="Ordered list"
            className={toolbarButtonClassName}
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            aria-label="Blockquote"
            className={toolbarButtonClassName}
            type="button"
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";
