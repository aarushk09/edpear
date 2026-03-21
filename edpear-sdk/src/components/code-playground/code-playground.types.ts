import type { HTMLAttributes } from "react";

export type CodePlaygroundLanguage = "javascript" | "typescript" | "python" | "json";

/**
 * Props for the CodePlayground component.
 */
export interface CodePlaygroundProps extends HTMLAttributes<HTMLDivElement> {
  /** Editor language mode. */
  language?: CodePlaygroundLanguage;
  /** Controlled editor value. */
  value?: string;
  /** Uncontrolled initial editor value. */
  defaultValue?: string;
  /** Called whenever the editor content changes. */
  onValueChange?: (value: string) => void;
  /** Optional custom run handler. */
  onRun?: (code: string) => Promise<string> | string;
  /** Disables editing. */
  readOnly?: boolean;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
