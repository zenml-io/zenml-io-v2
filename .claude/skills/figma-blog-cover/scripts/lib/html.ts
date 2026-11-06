/** Helpers shared by the cover and VS page builders. */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const SKILL_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const REPO = resolve(SKILL_DIR, "../../..");

export const base64 = (path: string): string => readFileSync(path).toString("base64");
export const escapeHtml = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export const svgUri = (path: string): string => `data:image/svg+xml;base64,${base64(path)}`;

export function fontFace(family: string, file: string, weight: number | string, ascent: number, descent: number): string {
  const format = file.endsWith("woff2") ? "woff2" : "woff";
  const src = `data:font/${format};base64,${base64(join(REPO, "public/fonts", file))}`;
  return `@font-face{font-family:'${family}';font-weight:${weight};ascent-override:${ascent}%;descent-override:${descent}%;line-gap-override:0%;src:url(${src}) format('${format}')}`;
}
