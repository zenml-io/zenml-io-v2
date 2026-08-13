import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../../lib/utils";
import { Check, Copy } from "./icons";

export function Section({
  id,
  children,
  className,
  tone = "paper",
}: {
  id?: string;
  children: ComponentChildren;
  className?: string;
  tone?: "paper" | "surface" | "night";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        tone === "surface" && "bg-surface",
        tone === "night" && "bg-night text-night-text",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 py-24 md:py-36">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[11px] tracking-[0.22em] text-ember uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-balance text-3xl leading-[1.1] font-medium tracking-[-0.02em] md:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lede({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CopyCommand({
  cmd,
  tone = "light",
}: {
  cmd: string;
  tone?: "light" | "dark";
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border px-4 py-3 font-mono text-sm",
        tone === "dark"
          ? "border-white/15 bg-white/5 text-night-text"
          : "border-border bg-surface text-ink",
      )}
    >
      <span className="text-ember select-none">$</span>
      <code className="tracking-tight">{cmd}</code>
      <button
        type="button"
        aria-label="Copy install command"
        onClick={() => {
          void navigator.clipboard?.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
        className={cn(
          "ml-2 rounded p-1.5 transition-colors cursor-pointer",
          tone === "dark" ? "hover:bg-white/10" : "hover:bg-muted",
        )}
      >
        {copied ? (
          <Check class="size-3.5 text-success" />
        ) : (
          <Copy class="size-3.5 opacity-60" />
        )}
      </button>
    </div>
  );
}

export function CodeBlock({
  code,
  filename,
  label,
  accent = false,
  className,
}: {
  code: ComponentChildren;
  filename?: string;
  label?: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-night",
        accent ? "border-ember/40" : "border-white/10",
        className,
      )}
    >
      {(filename || label) && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <span
            className={cn(
              "font-mono text-[11px] tracking-[0.12em] uppercase",
              accent ? "text-ember" : "text-night-text/50",
            )}
          >
            {label}
          </span>
          <span className="font-mono text-[11px] text-night-text/40">
            {filename}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.7] text-night-text/85 code-syntax">
        <code>{code}</code>
      </pre>
    </div>
  );
}
