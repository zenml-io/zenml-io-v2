/**
 * Grid — explicit-column grid layout primitive. Preact twin of
 * `Grid.astro`; islands cannot import .astro components. Keep the two
 * emitting identical markup/classes.
 *
 * See `Grid.astro` for why there is no `lastRow`/incomplete-row prop.
 */
import type { ComponentChildren } from "preact";
import type { Breakpoint, SpaceStep } from "../../../lib/section";
import { type GridColsProp, resolveGridCols, resolveSpace } from "./classMaps";

interface Props {
  cols: GridColsProp;
  space?: SpaceStep | Partial<Record<Breakpoint, SpaceStep>>;
  class?: string;
  children?: ComponentChildren;
}

export default function Grid({
  cols,
  space,
  class: className,
  children,
}: Props) {
  const classes = [
    "grid",
    resolveGridCols(cols),
    resolveSpace(space, "sm"),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div class={classes}>{children}</div>;
}
