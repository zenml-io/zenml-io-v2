/**
 * Inline — horizontal layout primitive. Preact twin of `Inline.astro`;
 * islands cannot import .astro components, so this is what an island
 * reaches for. Keep the two emitting identical markup/classes.
 */
import type { ComponentChildren } from "preact";
import type { Breakpoint, SpaceStep } from "../../../lib/section";
import { CHILDREN_AUTO_WIDTH_AT, FLEX_ROW_AT, resolveSpace } from "./classMaps";

type AlignY = "top" | "center" | "bottom";
type Align = "start" | "center" | "end" | "between";

interface Props {
  space?: SpaceStep | Partial<Record<Breakpoint, SpaceStep>>;
  alignY?: AlignY;
  align?: Align;
  wrap?: boolean;
  collapseBelow?: Breakpoint;
  class?: string;
  children?: ComponentChildren;
}

const ALIGN_Y_CLASS: Record<AlignY, string> = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
};

const ALIGN_CLASS: Record<Align, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export default function Inline({
  space,
  alignY = "center",
  align = "start",
  wrap = true,
  collapseBelow,
  class: className,
  children,
}: Props) {
  const classes = [
    "flex",
    collapseBelow ? "flex-col" : "flex-row",
    resolveSpace(space, "xs"),
    ALIGN_Y_CLASS[alignY],
    ALIGN_CLASS[align],
    wrap ? "flex-wrap" : "flex-nowrap",
    collapseBelow ? "[&>*]:w-full" : "",
    collapseBelow ? FLEX_ROW_AT[collapseBelow] : "",
    collapseBelow ? CHILDREN_AUTO_WIDTH_AT[collapseBelow] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div class={classes}>{children}</div>;
}
