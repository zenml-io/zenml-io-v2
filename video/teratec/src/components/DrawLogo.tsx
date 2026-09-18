import React from "react";
import { interpolate } from "remotion";
import { logoPaths, logoViewBox } from "../logoPaths";
import { palette } from "../brand";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
/** Outline-to-fill animation of the delivered artwork, never a replacement font. */
export function DrawLogo({
  frame,
  width = 900,
  reverse = false,
}: {
  frame: number;
  width?: number;
  reverse?: boolean;
}) {
  const time = reverse ? 84 - frame : frame;
  return (
    <svg
      viewBox={logoViewBox}
      width={width}
      style={{ overflow: "visible", display: "block" }}
      role="img"
      aria-label="ZenML Labs"
    >
      {logoPaths.map((path, index) => {
        const at = path.order * 2.4;
        const raw = interpolate(time, [at, at + 38], [0, 1], clamp);
        const draw = raw * raw * (3 - 2 * raw);
        const fill = interpolate(time, [at + 35, at + 58], [0, 1], clamp);
        return (
          <g key={index} transform={path.transform} opacity={path.opacity}>
            <path d={path.d} fill={palette.mist} fillOpacity={fill} />
            <path
              d={path.d}
              fill="none"
              stroke={palette.mist}
              strokeWidth={0.32}
              strokeLinejoin="round"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - draw}
              opacity={raw === 0 ? 0 : 1 - fill}
            />
          </g>
        );
      })}
    </svg>
  );
}
