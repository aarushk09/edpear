import type { HTMLAttributes } from "react";

/**
 * Props for the RichTextEditor component.
 */
export interface RichTextEditorProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled HTML content value. */
  value?: string;
  /** Uncontrolled initial HTML content. */
  defaultValue?: string;
  /** Called whenever the document changes. */
  onValueChange?: (value: string) => void;
  /** Placeholder text shown in an empty editor. */
  placeholder?: string;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
