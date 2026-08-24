/**
 * Stack — shared classes (issue #248). See `Stack.astro` for the contract.
 */
import { cn } from "../../../lib/utils";
import { type ResponsiveSpace, resolveSpace } from "./classMaps";

export type StackAlign = "start" | "center" | "end" | "stretch";

const ALIGN_CLASS: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export interface StackOptions {
  space?: ResponsiveSpace;
  align: StackAlign;
  dividers: boolean;
  className?: string;
}

export function stackClasses(opts: StackOptions): string {
  return cn(
    "flex flex-col",
    resolveSpace(opts.space, "sm"),
    ALIGN_CLASS[opts.align],
    // Hairline lives in the gap the flow already reserves; tone-correct via
    // --section-border rather than a fixed gray literal.
    opts.dividers && "divide-y divide-[color:var(--section-border)]",
    opts.className,
  );
}
