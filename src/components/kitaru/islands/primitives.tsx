import type { ComponentChildren } from "preact";
import { cn } from "../../../lib/utils";

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
      {/* The DESIGN.md centered container: content cap + fluid gutter. */}
      <div className="mx-auto w-full max-w-content px-gutter py-20 md:py-28">
        {children}
      </div>
    </section>
  );
}

/** Section eyebrow in the label voice (Nudica Mono, uppercase). */
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
        "inline-block font-label text-[13px] tracking-[0.05em] text-ember uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
