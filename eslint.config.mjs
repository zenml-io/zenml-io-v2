import { plugin as shadcn } from "@shadcn/lint";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import astro from "eslint-plugin-astro";
import * as mdx from "eslint-plugin-mdx";

const designSystemSettings = {
  shadcn: {
    componentImports: ["^\\.{1,2}/"],
    mergeFunctions: ["cn"],
    note: "See DESIGN.md and src/pages/styleguide.astro for this project's design rules.",
  },
};

const rawColorAllow = [
  "shadow-button",
  "shadow-focus-gray",
  "shadow-focus-primary",
  "shadow-large",
  "shadow-medium",
  "shadow-subtle",
];

export default defineConfig([
  ...astro.configs["flat/base"],
  {
    name: "zenml/design-lint-astro-typescript",
    files: ["src/**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
  {
    name: "zenml/design-lint-tsx-typescript",
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    ...mdx.flat,
    name: "zenml/design-lint-comparison-mdx",
    files: ["src/content/{compare-kitaru,compare-zenml}/**/*.mdx"],
    plugins: { ...mdx.flat.plugins, shadcn },
    settings: designSystemSettings,
    rules: {
      "shadcn/no-restyle": ["error", { allow: ["layout"] }],
      "shadcn/no-raw-colors": [
        "error",
        {
          allow: rawColorAllow,
        },
      ],
    },
  },
  {
    name: "zenml/design-system-rules",
    files: ["src/**/*.{astro,tsx}"],
    plugins: { shadcn },
    settings: designSystemSettings,
    rules: {
      // Existing findings are tracked in eslint-suppressions.json. An increase
      // to any file/rule count fails without flooding routine lint output.
      "shadcn/no-restyle": ["error", { allow: ["layout"] }],
      "shadcn/no-raw-colors": [
        "error",
        {
          allow: rawColorAllow,
        },
      ],
    },
  },
  {
    name: "zenml/design-system-typescript-color-rules",
    files: ["src/**/*.ts"],
    plugins: { shadcn },
    settings: designSystemSettings,
    rules: {
      "shadcn/no-raw-colors": [
        "error",
        {
          allow: rawColorAllow,
          scanAllStrings: true,
        },
      ],
    },
  },
]);
