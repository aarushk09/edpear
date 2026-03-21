"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useReducer, useRef, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { SessionLogEntry, SessionPhase, SessionTimerProps } from "./session-timer.types.js";

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type S = {
  phase: SessionPhase;
  remaining: number;
  log: SessionLogEntry[];
  focusWorkSec: number;
};

type A = { type: "tick" } | { type: "reset"; work: number };

function reducer(state: S, action: A, workDurationSec: number, breakDurationSec: number): S {
  if (action.type === "reset") {
    return {
      phase: "work",
      remaining: action.work,
      log: [],
      focusWorkSec: 0,
    };
  }
  if (action.type === "tick") {
    if (state.remaining > 1) {
      return { ...state, remaining: state.remaining - 1 };
    }
    const ended = new Date().toISOString();
    const duration = state.phase === "work" ? workDurationSec : breakDurationSec;
    const entry: SessionLogEntry = {
      id: `${ended}-${state.phase}`,
      phase: state.phase,
      durationSec: duration,
      endedAt: ended,
    };
    if (state.phase === "work") {
      return {
        phase: "break",
        remaining: breakDurationSec,
        log: [...state.log, entry],
        focusWorkSec: state.focusWorkSec + workDurationSec,
      };
    }
    return {
      phase: "work",
      remaining: workDurationSec,
      log: [...state.log, entry],
      focusWorkSec: state.focusWorkSec,
    };
  }
  return state;
}

export function SessionTimer({
  workDurationSec = 25 * 60,
  breakDurationSec = 5 * 60,
  onSessionComplete,
  className,
}: SessionTimerProps) {
  const dur = useRef({ work: workDurationSec, br: breakDurationSec });
  dur.current = { work: workDurationSec, br: breakDurationSec };

  const [state, dispatch] = useReducer(
    (s: S, a: A) => reducer(s, a, dur.current.work, dur.current.br),
    {
      phase: "work" as SessionPhase,
      remaining: workDurationSec,
      log: [] as SessionLogEntry[],
      focusWorkSec: 0,
    },
  );

  const [running, setRunning] = useState(false);

  useEffect(() => {
    dispatch({ type: "reset", work: workDurationSec });
  }, [workDurationSec, breakDurationSec]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const focusScore = Math.min(100, Math.round((state.focusWorkSec / (workDurationSec * 4)) * 100));

  return (
    <div
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="session-timer"
      data-phase={state.phase}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold">Focus session</h3>
          <p className="text-xs text-muted-foreground">Pomodoro-style work / break cycles</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRunning(!running)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-muted"
            aria-label={running ? "Pause" : "Start"}
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              dispatch({ type: "reset", work: workDurationSec });
            }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-muted"
            aria-label="Reset session"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {state.phase === "work" ? "Focus" : "Break"}
        </p>
        <p className="mt-2 font-mono text-5xl font-bold tabular-nums tracking-tight">
          {fmt(state.remaining)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Focus score: <span className="font-semibold text-foreground">{focusScore}</span> / 100
        </p>
        <button
          type="button"
          className="mt-4 text-xs text-primary underline"
          onClick={() => onSessionComplete?.({ focusScore, log: state.log })}
        >
          Log session (callback)
        </button>
      </div>
      {state.log.length > 0 ? (
        <div className="border-t border-border px-4 py-3">
          <p className="text-xs font-semibold uppercase text-muted-foreground">History</p>
          <ul className="mt-2 max-h-32 space-y-1 overflow-y-auto text-xs text-muted-foreground">
            {state.log
              .slice()
              .reverse()
              .map((e) => (
                <li key={e.id}>
                  {e.phase} · {fmt(e.durationSec)} · {new Date(e.endedAt).toLocaleTimeString()}
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
