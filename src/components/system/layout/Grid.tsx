/**
 * Grid — explicit-column grid layout primitive. Preact twin of
 * `Grid.astro`; islands cannot import .astro components. Keep the two
 * emitting identical markup/classes.
 *
 * See `Grid.astro` for the `lastRow="center"` known limitation (only
 * centers a lone trailing item, not a multi-item incomplete row).
 */
import type { ComponentChildren } from "preact";
import type { Breakpoint, SpaceStep } from "../../../lib/section";
import { type GridColsProp, resolveGridCols, resolveSpace } from "./classMaps";

type LastRow = "start" | "center";

interface Props {
  cols: GridColsProp;
  space?: SpaceStep | Partial<Record<Breakpoint, SpaceStep>>;
  lastRow?: LastRow;
  class?: string;
  children?: ComponentChildren;
}

export default function Grid({
  cols,
  space,
  lastRow = "start",
  class: className,
  children,
}: Props) {
  const classes = [
    "grid",
    resolveGridCols(cols),
    resolveSpace(space, "sm"),
    lastRow === "center"
      ? "[&>*:last-child]:col-span-full [&>*:last-child]:justify-self-center"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div class={classes}>{children}</div>;
}
