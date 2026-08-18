import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { cn } from "../../../lib/utils";
import { copyToClipboard } from "../../../scripts/kitaru/clipboard";
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
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:py-28">
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
          copyToClipboard(cmd)
            .then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            })
            .catch(() => {
              // Copy failed — leave the icon as-is rather than show a false success.
            });
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
