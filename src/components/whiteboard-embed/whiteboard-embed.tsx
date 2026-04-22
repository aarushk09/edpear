import { Camera, Circle, Eraser, MousePointer2, Pen, Square, Trash2, Type, Users } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { WhiteboardEmbedProps } from "./whiteboard-embed.types.js";

type ToolType = "select" | "pen" | "eraser" | "square" | "circle" | "text";

export const WhiteboardEmbed = forwardRef<HTMLDivElement, WhiteboardEmbedProps>((props, ref) => {
  const {
    roomName = "Collaborative Whiteboard",
    isReadOnly = false,
    onSnapshot,
    onClear,
    collaboratorCount = 1,
    children,
    className,
    ...rest
  } = props;

  const [activeTool, setActiveTool] = useState<ToolType>("pen");

  const ToolButton = ({ type, icon: Icon }: { type: ToolType; icon: React.ElementType }) => (
    <button
      disabled={isReadOnly}
      onClick={() => setActiveTool(type)}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
        activeTool === type
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        isReadOnly && "opacity-50 cursor-not-allowed"
      )}
      title={`Tool: ${type}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden h-[600px] w-full", className)}
      data-slot="whiteboard-embed"
      {...rest}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b bg-muted/20 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Pen className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-sm font-semibold tracking-tight">{roomName}</h3>
          
          {isReadOnly && (
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Read Only
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{collaboratorCount} {collaboratorCount === 1 ? "User" : "Users"}</span>
          </div>
          
          <div className="flex items-center gap-2 border-l pl-4">
            <button
              onClick={onSnapshot}
              className="inline-flex h-7 items-center justify-center gap-1.5 rounded-md bg-primary/10 px-2.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <Camera className="h-3.5 w-3.5" />
              Snapshot
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 overflow-hidden">
        {/* Tool Palette */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-1 rounded-lg border bg-background p-1.5 shadow-md">
          <ToolButton type="select" icon={MousePointer2} />
          <ToolButton type="pen" icon={Pen} />
          <ToolButton type="eraser" icon={Eraser} />
          
          <div className="my-1 h-px w-full bg-border" />
          
          <ToolButton type="square" icon={Square} />
          <ToolButton type="circle" icon={Circle} />
          <ToolButton type="text" icon={Type} />
          
          <div className="my-1 h-px w-full bg-border" />
          
          <button
            disabled={isReadOnly}
            onClick={onClear}
            className="flex h-9 w-9 items-center justify-center rounded-md text-rose-500 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Clear canvas"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
          {/* Dot Grid Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />
          
          {children ? (
            children
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground flex-col gap-2">
              <Pen className="h-8 w-8 opacity-20 mb-2" />
              <p>Mount an iframe (e.g. Excalidraw, tldraw) or a standard canvas here via `children`.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

WhiteboardEmbed.displayName = "WhiteboardEmbed";
