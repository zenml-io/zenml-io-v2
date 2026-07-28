import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { STALE_RAY_SUMMIT_REDIRECT_PATHS } from "./src/lib/mlopsRaySummitRedirects";
import { remarkDefaultLang } from "./src/lib/remark-default-lang";
import zenmlLight from "./src/styles/zenml-light.json";

const sitemapExcludePaths = new Set([
  "/llmops-index.json",
  "/mlops-index.json",
  "/blog/rss.xml",
  "/llmops-database/rss.xml",
  "/mlops-database/rss.xml",
  "/index.md",
  "/pricing.md",
  "/product/zenml.md",
  "/product/kitaru.md",
  "/compare.md",
  "/book-success",
  "/booked",
  "/book-a-demo-success",
  "/newsletter-success",
  "/success-calendar",
  "/404",
  ...STALE_RAY_SUMMIT_REDIRECT_PATHS,
]);

export default defineConfig({
  site: "https://www.zenml.io",
  output: "static",
  adapter: cloudflare({
    // Vitest loads this config to build its Vite environment. Starting the
    // Cloudflare dev proxy there would create a second workerd process and try
    // to register the Worker globally. Runtime parity is exercised separately
    // through the checked-in Wrangler configuration.
    platformProxy: { enabled: process.env.NODE_ENV !== "test" },
  }),
  trailingSlash: "never",
  build: {
    format: "file",
  },
  markdown: {
    remarkPlugins: [remarkDefaultLang() as any],
    shikiConfig: {
      theme: zenmlLight as any,
    },
  },
  integrations: [
    preact(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        return !sitemapExcludePaths.has(url.pathname);
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
