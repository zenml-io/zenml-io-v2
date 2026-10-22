/**
 * Build-time Shiki highlighter for the pages that highlight code themselves
 * rather than through Astro's Markdown pipeline (`/get-started` and
 * `/integrations/<slug>`): the `labs-light` theme with Python and Bash.
 *
 * It runs on Shiki's JavaScript regex engine, not the default Oniguruma one.
 * Oniguruma compiles WebAssembly at runtime, which the Cloudflare prerender
 * runtime forbids; when the lockfile once held two `shiki` copies, that
 * crashed the build on these pages (#388). Every pattern in the Python and
 * Bash grammars compiles under the JavaScript engine, so it needs no
 * `forgiving` mode. Astro evaluates this module once per build, so all pages
 * share one highlighter.
 */
import { createHighlighterCore, type ThemeRegistration } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import labsLight from "../styles/labs-light.json";

export const LABS_CODE_THEME = labsLight.name;

export const labsHighlighter = await createHighlighterCore({
  themes: [labsLight as ThemeRegistration],
  langs: [import("shiki/langs/python.mjs"), import("shiki/langs/bash.mjs")],
  engine: createJavaScriptRegexEngine(),
});
