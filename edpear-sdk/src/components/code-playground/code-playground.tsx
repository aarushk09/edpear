import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import { Play } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { CodePlaygroundLanguage, CodePlaygroundProps } from "./code-playground.types.js";

function getExtensions(language: CodePlaygroundLanguage) {
  if (language === "python") {
    return [python()];
  }

  return [javascript({ typescript: language === "typescript" })];
}

function executeJavaScript(code: string): string {
  return [
    "Local execution is intentionally disabled for safety.",
    "Pass an `onRun` handler to execute code in your own sandbox.",
    "",
    code,
  ].join("\n");
}

export const CodePlayground = forwardRef<HTMLDivElement, CodePlaygroundProps>(
  (
    {
      language = "javascript",
      value,
      defaultValue = "console.log('Hello, EdPear!');",
      onValueChange,
      onRun,
      readOnly = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [output, setOutput] = useState("Run the snippet to see output.");
    const [running, setRunning] = useState(false);
    const currentValue = value ?? internalValue;
    const extensions = useMemo(() => getExtensions(language), [language]);

    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}
        data-slot="code-playground"
        {...props}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Code playground</h3>
            <p className="text-sm text-muted-foreground">
              Ideal for coding drills, worked examples, and interactive practice.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            disabled={running || readOnly}
            type="button"
            onClick={async () => {
              setRunning(true);
              try {
                const nextOutput =
                  (await onRun?.(currentValue)) ??
                  (language === "python"
                    ? "Python execution is not bundled. Pass `onRun` to execute remotely."
                    : executeJavaScript(currentValue));
                setOutput(nextOutput);
              } catch (error) {
                setOutput(error instanceof Error ? error.message : "Execution failed.");
              } finally {
                setRunning(false);
              }
            }}
          >
            <Play className="mr-2 h-4 w-4" />
            <span>{running ? "Running..." : "Run code"}</span>
          </button>
        </div>
        <div className="overflow-hidden rounded-md border bg-muted/50">
          <CodeMirror
            basicSetup={{
              lineNumbers: true,
            }}
            editable={!readOnly}
            extensions={extensions}
            theme="dark"
            value={currentValue}
            onChange={(nextValue) => {
              if (value === undefined) {
                setInternalValue(nextValue);
              }
              onValueChange?.(nextValue);
            }}
          />
        </div>
        <div className="rounded-md border bg-muted/50 p-4 text-sm text-foreground">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Output
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap text-sm">{output}</pre>
        </div>
      </div>
    );
  },
);

CodePlayground.displayName = "CodePlayground";
