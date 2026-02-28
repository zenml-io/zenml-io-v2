import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import zenmlLight from "./src/styles/zenml-light.json";
import { remarkDefaultLang } from "./src/lib/remark-default-lang";

export default defineConfig({
  site: "https://www.zenml.io",
  output: "static",
  adapter: cloudflare(),
  trailingSlash: "never",
  build: {
    format: "file",
  },
  markdown: {
    remarkPlugins: [remarkDefaultLang()],
    shikiConfig: {
      theme: zenmlLight as any,
    },
  },
  integrations: [
    preact(),
    sitemap({
      filter: (page) => {
        // Exclude non-indexable pages from the sitemap
        const excludePaths = [
          "/llmops-index.json",
          "/blog/rss.xml",
          "/llmops-database/rss.xml",
          "/book-success",
          "/booked",
          "/book-a-demo-success",
          "/newsletter-success",
          "/success-calendar",
          "/404",
        ];
        const url = new URL(page);
        return !excludePaths.includes(url.pathname);
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
