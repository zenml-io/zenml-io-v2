import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import type { ThemeName } from "./types";

// Values mirrored from src/styles/global.css, September 2026 Labs rebrand.
export const palette = {
  ink: "#151E19",
  sage: "#9AAD82",
  sageDark: "#3C4C38",
  mist: "#F6F9F1",
  cream: "#EEE8DC",
  creamInk: "#413D37",
};
export const themes = {
  dark: {
    bg: palette.ink,
    fg: palette.mist,
    muted: palette.sage,
    accent: palette.cream,
    line: "#3C4C38",
  },
  light: {
    bg: palette.mist,
    fg: palette.ink,
    muted: palette.sageDark,
    accent: palette.sageDark,
    line: "#BECAA6",
  },
  kitaru: {
    bg: palette.cream,
    fg: palette.ink,
    muted: palette.sageDark,
    accent: palette.sageDark,
    line: "#BECAA6",
  },
} satisfies Record<
  ThemeName,
  { bg: string; fg: string; muted: string; accent: string; line: string }
>;
// Exact website faces, requested for this local video iteration.
export const fonts = {
  display: "Borna",
  body: "Rethink Sans",
  label: "Nudica Mono",
};
loadFont({
  family: fonts.display,
  url: staticFile("fonts/borna-medium.woff2"),
  weight: "500",
});
loadFont({
  family: fonts.body,
  url: staticFile("fonts/rethink-sans-variable.woff2"),
  weight: "100 900",
});
loadFont({
  family: fonts.label,
  url: staticFile("fonts/nudica-mono-medium.woff2"),
  weight: "500",
});
