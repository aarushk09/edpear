"use client";

import { Download, Printer } from "lucide-react";
import { useCallback } from "react";

import { cn } from "../../lib/cn.js";
import type { CertificateData, CertificateRendererProps } from "./certificate-renderer.types.js";

function formatDate(d: string | Date): string {
  const x = typeof d === "string" ? new Date(d) : d;
  return x.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function drawCertificateCanvas(data: CertificateData, org?: string): HTMLCanvasElement {
  const w = 1120;
  const h = 800;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.fillStyle = "#fafaf9";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "#c4b5a0";
  ctx.lineWidth = 6;
  ctx.strokeRect(32, 32, w - 64, h - 64);
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, w - 96, h - 96);

  ctx.fillStyle = "#1c1917";
  ctx.font = "500 28px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("Certificate of Completion", w / 2, 140);

  if (org) {
    ctx.fillStyle = "#57534e";
    ctx.font = "400 18px system-ui, sans-serif";
    ctx.fillText(org, w / 2, 175);
  }

  ctx.fillStyle = "#78716c";
  ctx.font = "400 16px system-ui, sans-serif";
  ctx.fillText("This certifies that", w / 2, 240);

  ctx.fillStyle = "#0c0a09";
  ctx.font = "600 42px Georgia, serif";
  ctx.fillText(data.studentName, w / 2, 310);

  ctx.fillStyle = "#57534e";
  ctx.font = "400 18px system-ui, sans-serif";
  ctx.fillText("has successfully completed", w / 2, 360);

  ctx.fillStyle = "#1c1917";
  ctx.font = "600 26px Georgia, serif";
  const courseLines = wrapText(ctx, data.courseName, 720);
  let y = 420;
  for (const line of courseLines) {
    ctx.fillText(line, w / 2, y);
    y += 34;
  }

  if (data.subtitle) {
    ctx.fillStyle = "#78716c";
    ctx.font = "italic 16px Georgia, serif";
    ctx.fillText(data.subtitle, w / 2, y + 10);
    y += 40;
  }

  ctx.fillStyle = "#57534e";
  ctx.font = "400 15px system-ui, sans-serif";
  ctx.fillText(`Completed ${formatDate(data.completedAt)}`, w / 2, Math.max(y + 30, 520));

  ctx.textAlign = "left";
  ctx.fillText(data.instructorName, 180, 640);
  ctx.strokeStyle = "#a8a29e";
  ctx.beginPath();
  ctx.moveTo(180, 655);
  ctx.lineTo(420, 655);
  ctx.stroke();
  ctx.fillStyle = "#78716c";
  ctx.font = "400 13px system-ui, sans-serif";
  ctx.fillText("Instructor", 180, 678);

  return canvas;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [text];
}

function certificatePrintHtml(data: CertificateData, org?: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Certificate</title>
<style>
@page { size: landscape; margin: 12mm; }
body { font-family: Georgia, serif; background: #fafaf9; color: #1c1917; margin: 0; padding: 24px; }
.frame { border: 6px double #c4b5a0; padding: 48px; max-width: 900px; margin: 0 auto; text-align: center; min-height: 520px; box-sizing: border-box; }
h1 { font-weight: 500; font-size: 28px; margin: 0 0 8px; }
.org { color: #57534e; font-size: 18px; font-family: system-ui, sans-serif; margin-bottom: 32px; }
.muted { color: #78716c; font-size: 16px; font-family: system-ui, sans-serif; }
.name { font-size: 42px; font-weight: 600; margin: 16px 0; }
.course { font-size: 26px; font-weight: 600; margin: 16px 0; }
.sub { color: #78716c; font-style: italic; font-size: 16px; }
.date { margin-top: 40px; color: #57534e; font-family: system-ui, sans-serif; font-size: 15px; }
.sig { margin-top: 64px; text-align: left; max-width: 280px; margin-left: auto; margin-right: auto; }
.line { border-top: 1px solid #a8a29e; margin-top: 8px; padding-top: 4px; color: #78716c; font-size: 13px; font-family: system-ui, sans-serif; }
</style></head><body><div class="frame">
<h1>Certificate of Completion</h1>
${org ? `<p class="org">${esc(org)}</p>` : ""}
<p class="muted">This certifies that</p>
<p class="name">${esc(data.studentName)}</p>
<p class="muted">has successfully completed</p>
<p class="course">${esc(data.courseName)}</p>
${data.subtitle ? `<p class="sub">${esc(data.subtitle)}</p>` : ""}
<p class="date">Completed ${esc(formatDate(data.completedAt))}</p>
<div class="sig"><div>${esc(data.instructorName)}</div><div class="line">Instructor</div></div>
</div><script>window.onload=function(){window.print();window.onafterprint=function(){window.close();}};<\/script></body></html>`;
}

export function CertificateRenderer({ data, organizationName, className }: CertificateRendererProps) {
  const downloadPng = useCallback(() => {
    const canvas = drawCertificateCanvas(data, organizationName);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `certificate-${data.studentName.replace(/\s+/g, "-").toLowerCase()}.png`;
    a.click();
  }, [data, organizationName]);

  const downloadPdf = useCallback(() => {
    const html = certificatePrintHtml(data, organizationName);
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
  }, [data, organizationName]);

  return (
    <div
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="certificate-renderer"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">Certificate preview</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadPng}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            <Download className="h-3.5 w-3.5" />
            PNG
          </button>
          <button
            type="button"
            onClick={downloadPdf}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Printer className="h-3.5 w-3.5" />
            PDF (print)
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mx-auto max-w-2xl border-[6px] border-double border-[#c4b5a0] bg-[#fafaf9] px-10 py-12 text-center text-stone-900">
          <h4 className="font-serif text-2xl font-medium">Certificate of Completion</h4>
          {organizationName ? (
            <p className="mt-1 font-sans text-lg text-stone-600">{organizationName}</p>
          ) : null}
          <p className="mt-8 font-sans text-sm text-stone-500">This certifies that</p>
          <p className="mt-2 font-serif text-3xl font-semibold">{data.studentName}</p>
          <p className="mt-4 font-sans text-sm text-stone-500">has successfully completed</p>
          <p className="mt-2 font-serif text-xl font-semibold">{data.courseName}</p>
          {data.subtitle ? (
            <p className="mt-2 font-serif text-sm italic text-stone-500">{data.subtitle}</p>
          ) : null}
          <p className="mt-10 font-sans text-sm text-stone-600">
            Completed {formatDate(data.completedAt)}
          </p>
          <div className="mx-auto mt-12 max-w-xs text-left">
            <p className="font-serif">{data.instructorName}</p>
            <div className="mt-1 border-t border-stone-400 pt-1 font-sans text-xs text-stone-500">
              Instructor
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          PDF opens a print dialog—choose “Save as PDF” where supported.
        </p>
      </div>
    </div>
  );
}
