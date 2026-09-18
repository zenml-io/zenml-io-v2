import React from "react";
export type GlyphName =
  | "code"
  | "pipeline"
  | "server"
  | "check"
  | "lock"
  | "shield"
  | "replay"
  | "trace";
const paths: Record<GlyphName, string[]> = {
  code: ["M8 6 2 12 8 18", "M16 6 22 12 16 18", "M14 3 10 21"],
  pipeline: ["M3 4h6v6H3z", "M15 14h6v6h-6z", "M9 7h9v7", "M6 10v7h9"],
  server: [
    "M3 3h18v7H3z",
    "M3 14h18v7H3z",
    "M6 6h2",
    "M6 17h2",
    "M15 6h3",
    "M15 17h3",
  ],
  check: ["M4 12 9 17 20 6"],
  lock: ["M5 10h14v11H5z", "M8 10V7a4 4 0 0 1 8 0v3", "M12 14v3"],
  shield: ["M12 2 21 6v6c0 5-9 10-9 10S3 17 3 12V6z", "M8 12l3 3 5-6"],
  replay: ["M3 10a9 9 0 1 1 1 7", "M3 3v7h7", "M10 8l6 4-6 4z"],
  trace: ["M3 4h5v5H3z", "M16 15h5v5h-5z", "M8 6h6v11h2"],
};
export function Glyph({
  name,
  size = 64,
  color = "currentColor",
}: {
  name: GlyphName;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
