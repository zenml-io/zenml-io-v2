/**
 * Stack — vertical layout primitive. Preact twin of `Stack.astro`; islands
 * cannot import .astro components, so this is what an island reaches for.
 * Both render through `./stack.shared` so they can't drift.
 */
import type { ComponentChildren } from "preact";
import type { ResponsiveSpace } from "./classMaps";
import { type StackAlign, stackClasses } from "./stack.shared";

interface Props {
  space?: ResponsiveSpace;
  align?: StackAlign;
  dividers?: boolean;
  class?: string;
  children?: ComponentChildren;
}

export default function Stack({
  space,
  align = "stretch",
  dividers = false,
  class: className,
  children,
}: Props) {
  const classes = stackClasses({ space, align, dividers, className });

  return <div class={classes}>{children}</div>;
}
