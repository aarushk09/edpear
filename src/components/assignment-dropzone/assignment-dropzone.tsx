"use client";

import { AlertCircle, CheckCircle2, Clock, Upload } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { AssignmentDropzoneProps, AssignmentDropzoneState } from "./assignment-dropzone.types.js";

function formatRemaining(ms: number): string {
  if (ms <= 0) return "Past due";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h left`;
  if (h > 0) return `${h}h ${m}m left`;
  return `${m}m left`;
}

export function AssignmentDropzone({
  deadline,
  accept,
  maxBytes,
  state: controlledState,
  onFileSelect,
  onSubmit,
  assignmentTitle = "Assignment submission",
  className,
}: AssignmentDropzoneProps) {
  const inputId = useId();
  const [internal, setInternal] = useState<AssignmentDropzoneState>({ status: "idle" });
  const state = controlledState ?? internal;

  const deadlineMs = useMemo(
    () => (typeof deadline === "string" ? new Date(deadline).getTime() : deadline.getTime()),
    [deadline],
  );

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = deadlineMs - now;
  const overdue = remaining <= 0;

  const setState = useCallback(
    (next: AssignmentDropzoneState) => {
      if (controlledState === undefined) setInternal(next);
    },
    [controlledState],
  );

  const handleFile = async (file: File | undefined) => {
    if (!file || overdue) return;
    if (maxBytes != null && file.size > maxBytes) {
      return;
    }
    onFileSelect?.(file);
    if (onSubmit) {
      setState({ status: "uploading", fileName: file.name });
      try {
        await onSubmit(file);
        setState({
          status: "submitted",
          fileName: file.name,
          submittedAt: new Date().toISOString(),
        });
      } catch {
        setState({ status: "idle" });
      }
    } else {
      setState({
        status: "submitted",
        fileName: file.name,
        submittedAt: new Date().toISOString(),
      });
    }
  };

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    void handleFile(f);
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        className,
      )}
      data-slot="assignment-dropzone"
      data-state={state.status}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{assignmentTitle}</h3>
          <p className="text-sm text-muted-foreground">Upload your file before the deadline.</p>
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium",
            overdue
              ? "border-destructive/40 bg-destructive/10 text-destructive"
              : "border-border bg-muted/50 text-foreground",
          )}
        >
          <Clock className="h-4 w-4 shrink-0" aria-hidden />
          <span>{formatRemaining(remaining)}</span>
        </div>
      </div>

      {state.status === "submitted" ? (
        <div className="flex items-start gap-3 rounded-lg border border-feedback-correct/40 bg-feedback-correct/10 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-feedback-correct" aria-hidden />
          <div>
            <p className="font-medium text-feedback-correct">Submission received</p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{state.fileName}</span>
              {" · "}
              {new Date(state.submittedAt).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(e) => e.preventDefault()}
          onDrop={drop}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-12 text-center transition hover:border-primary/50 hover:bg-muted/50",
            overdue && "pointer-events-none opacity-50",
            state.status === "uploading" && "pointer-events-none opacity-70",
          )}
        >
          <Upload className="h-10 w-10 text-muted-foreground" aria-hidden />
          <div>
            <span className="text-sm font-medium text-primary">Choose a file</span>
            <span className="text-sm text-muted-foreground"> or drag and drop</span>
          </div>
          <p className="text-xs text-muted-foreground">Accepted: {accept}</p>
          {maxBytes != null ? (
            <p className="text-xs text-muted-foreground">
              Max size {(maxBytes / (1024 * 1024)).toFixed(1)} MB
            </p>
          ) : null}
          {state.status === "uploading" ? (
            <p className="text-sm font-medium text-foreground">Uploading {state.fileName}…</p>
          ) : null}
          <input
            id={inputId}
            type="file"
            accept={accept}
            className="sr-only"
            disabled={overdue || state.status === "uploading"}
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
        </label>
      )}

      {overdue && state.status !== "submitted" ? (
        <div className="mt-3 flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          Submissions are closed for this assignment.
        </div>
      ) : null}
    </div>
  );
}
