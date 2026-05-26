/**
 * Cached Shiki highlighter pre-loaded with the kitaru-light + kitaru-dark
 * themes. Used by the Kitaru compare-page code components to render their
 * code blocks server-side via `highlighter.codeToHtml(...)` + `set:html`,
 * bypassing Astro's `<Code>` component entirely.
 *
 * Why bypass `<Code>`: in the Cloudflare worker SSR bundle that ships the
 * Kitaru-vs-X compare pages, `<Code>`'s `themes={{light, dark}}` prop was
 * evaluating such that Shiki silently fell back to its built-in
 * `github-dark` default (#24292e bg, #79B8FF / #B392F0 / #F97583 tokens).
 * Two previous attempts (`8604e4c`, `c4cb615`) tried to fix this by
 * massaging the JSON → TS import path; neither worked in production. The
 * direct-highlighter pattern (see `src/pages/get-started.astro`) has
 * shipped reliably on CI for months, so we adopt it here.
 *
 * Lang list is narrow on purpose — only what the `compare-kitaru` MDX
 * pages actually use today. Add more here if a new compare page needs them.
 */
import { createHighlighter, type Highlighter } from "shiki";
import { kitaruLight, kitaruDark } from "../styles/kitaru-themes";

export const KITARU_LANGS = ["python", "typescript", "bash"] as const;
export type KitaruLang = (typeof KITARU_LANGS)[number];

let highlighterPromise: Promise<Highlighter> | null = null;

export const getKitaruHighlighter = (): Promise<Highlighter> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [kitaruLight, kitaruDark],
      langs: [...KITARU_LANGS],
    });
  }
  return highlighterPromise;
};

export const renderKitaruCode = async (
  code: string,
  lang: KitaruLang = "python",
): Promise<string> => {
  const highlighter = await getKitaruHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "kitaru-light", dark: "kitaru-dark" },
    defaultColor: "light",
  });
};
