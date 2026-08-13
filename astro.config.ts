import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { unified } from "@astrojs/markdown-remark";
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
  session: {
    // The site does not use Astro sessions. Defining the null driver prevents
    // the Cloudflare adapter from auto-provisioning an unused SESSION KV.
    driver: { entrypoint: "unstorage/drivers/null" },
  },
  adapter: cloudflare({
    imageService: "compile",
  }),
  trailingSlash: "never",
  build: {
    format: "file",
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDefaultLang()],
    }),
    shikiConfig: {
      theme: zenmlLight as any,
    },
  },
  integrations: [
    // compat aliases react → preact/compat for third-party React packages
    // (the GrainGradient shader from @paper-design/shaders-react); first-party
    // islands import from preact directly.
    preact({ compat: true }),
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
