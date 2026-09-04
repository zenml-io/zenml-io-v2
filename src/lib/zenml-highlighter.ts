/**
 * Cached Shiki highlighter pre-loaded with the repo's zenml-light + zenml-dark
 * themes. The ZenML-palette counterpart of kitaru-highlighter.ts, used by the
 * ZenML compare-page code components to render their code blocks server-side
 * via `highlighter.codeToHtml(...)` + `set:html`, bypassing Astro's `<Code>`.
 *
 * Themes are the existing JSON assets rather than a hand-copy, so compare-page
 * code panes match code blocks everywhere else on the site. `zenml-light` is
 * also the site-wide markdown theme (astro.config.ts), so a second definition
 * under the same name would silently shadow it.
 *
 * The `.json` caveat in kitaru-themes.ts applies to Astro's `<Code>` component,
 * not to this direct-highlighter pattern: src/pages/get-started.astro imports
 * the same JSON into createHighlighter and has shipped on CI for months.
 *
 * Why a separate highlighter from the Kitaru one rather than one shared
 * instance: each is a cached singleton created with a fixed theme list, and
 * keeping them apart means neither can quietly re-theme the other.
 *
 * Lang list is narrow on purpose — every code sample on the ten pages is
 * Python, and no page passes a `lang` prop. Add more here if one needs to.
 */
import { createHighlighter, type Highlighter } from "shiki";
import zenmlDark from "../styles/zenml-dark.json";
import zenmlLight from "../styles/zenml-light.json";

type HighlighterTheme = NonNullable<
  Parameters<typeof createHighlighter>[0]["themes"]
>[number];

export const ZENML_LANGS = ["python"] as const;
export type ZenmlLang = (typeof ZENML_LANGS)[number];

let highlighterPromise: Promise<Highlighter> | null = null;

export const getZenmlHighlighter = (): Promise<Highlighter> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [zenmlLight as HighlighterTheme, zenmlDark as HighlighterTheme],
      langs: [...ZENML_LANGS],
    });
  }
  return highlighterPromise;
};

export const renderZenmlCode = async (
  code: string,
  lang: ZenmlLang = "python",
): Promise<string> => {
  const highlighter = await getZenmlHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "zenml-light", dark: "zenml-dark" },
    defaultColor: "light",
  });
};
