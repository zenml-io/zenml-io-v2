/**
 * Kitaru light + dark Shiki themes — ported from the kitaru.ai site.
 *
 * Single source of truth: one palette row per scope group with both a
 * `light` and `dark` foreground. The two ThemeRegistration exports are
 * projected from it so the pair cannot drift silently.
 *
 * TypeScript module (not JSON) because CI builds on Linux/Node 22 silently
 * dropped `.json` imports from the per-component chunk graph in the
 * Cloudflare adapter's _worker.js — making <Code> fall back to Shiki's
 * default github-dark theme on production previews even though local
 * macOS/Node 25 builds bundled the JSON correctly. A .ts module bypasses
 * Vite's JSON loader entirely.
 *
 * Consumers: src/components/compare/kitaru/CodePane.astro,
 *            src/components/compare/kitaru/CodeCompare.astro.
 */
import type { ThemeRegistration } from "shiki";

type Variant = "light" | "dark";

type PaletteRow = {
  name: string;
  scope: string[];
  light: string;
  dark: string;
  italic?: true;
};

const palette: PaletteRow[] = [
  {
    name: "Comments",
    scope: ["comment", "punctuation.definition.comment"],
    light: "#8C8278",
    dark: "#9C938C",
    italic: true,
  },
  {
    name: "Strings",
    scope: ["string", "string.quoted", "string.template"],
    light: "#1F5A33",
    dark: "#6FB789",
  },
  {
    name: "String Escape",
    scope: ["constant.character.escape"],
    light: "#1F5A33",
    dark: "#6FB789",
  },
  {
    name: "F-string expressions",
    scope: ["meta.fstring", "punctuation.definition.template-expression"],
    light: "#9A3F10",
    dark: "#D38151",
  },
  {
    name: "Numbers",
    scope: ["constant.numeric"],
    light: "#9A3F10",
    dark: "#D38151",
  },
  {
    name: "Built-in Constants (True, False, None)",
    scope: ["constant.language"],
    light: "#1F5A33",
    dark: "#6FB789",
  },
  {
    name: "Keywords & Storage",
    scope: [
      "keyword",
      "storage.type",
      "storage.modifier",
      "keyword.control",
      "keyword.operator.new",
    ],
    light: "#5A4A1E",
    dark: "#C89F70",
  },
  {
    name: "Functions & Methods",
    scope: ["entity.name.function", "meta.function-call", "support.function"],
    light: "#9A3F10",
    dark: "#D38151",
  },
  {
    name: "Classes & Types",
    scope: [
      "entity.name.type",
      "entity.name.class",
      "support.type",
      "support.class",
      "entity.other.inherited-class",
    ],
    light: "#5A4A1E",
    dark: "#C89F70",
  },
  {
    name: "Decorators",
    scope: [
      "meta.decorator",
      "punctuation.definition.decorator",
      "entity.name.function.decorator",
    ],
    light: "#9A3F10",
    dark: "#D38151",
    italic: true,
  },
  {
    name: "Operators & Punctuation",
    scope: [
      "keyword.operator",
      "punctuation",
      "punctuation.definition.parameters",
      "punctuation.separator",
      "punctuation.section",
    ],
    light: "#635951",
    dark: "#AEA298",
  },
  {
    name: "Variables & Parameters",
    scope: [
      "variable",
      "variable.parameter",
      "variable.other",
      "meta.function.parameters",
    ],
    light: "#1A1310",
    dark: "#E9E4DE",
  },
  {
    name: "Properties & Attributes",
    scope: [
      "variable.other.property",
      "variable.other.object.property",
      "entity.other.attribute-name",
    ],
    light: "#3A332D",
    dark: "#E9E4DE",
  },
  {
    name: "Built-in & Self",
    scope: [
      "variable.language",
      "variable.language.self",
      "variable.language.this",
    ],
    light: "#1F5A33",
    dark: "#6FB789",
    italic: true,
  },
  {
    name: "Imports & Modules",
    scope: [
      "keyword.control.import",
      "keyword.control.from",
      "keyword.other.import",
    ],
    light: "#5A4A1E",
    dark: "#C89F70",
  },
  {
    name: "Module Names",
    scope: ["entity.name.import", "entity.name.module"],
    light: "#1F5A33",
    dark: "#6FB789",
  },
  {
    name: "Type Annotations",
    scope: [
      "meta.function.return-type",
      "punctuation.definition.type",
      "support.type.python",
    ],
    light: "#1F5A33",
    dark: "#6FB789",
  },
];

const buildTheme = (
  variant: Variant,
  background: string,
  foreground: string,
): ThemeRegistration => ({
  name: `kitaru-${variant}`,
  type: variant,
  colors: {
    "editor.background": background,
    "editor.foreground": foreground,
  },
  tokenColors: palette.map((row) => ({
    name: row.name,
    scope: row.scope,
    settings: {
      foreground: row[variant],
      ...(row.italic ? { fontStyle: "italic" } : {}),
    },
  })),
});

export const kitaruLight = buildTheme("light", "#FAF6EF", "#1A1310");
export const kitaruDark = buildTheme("dark", "#1E1B16", "#E9E4DE");
