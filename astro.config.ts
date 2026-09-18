import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { unified } from "@astrojs/markdown-remark";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { STALE_RAY_SUMMIT_REDIRECT_PATHS } from "./src/lib/mlopsRaySummitRedirects";
import { remarkDefaultLang } from "./src/lib/remark-default-lang";
import { rehypeBlogRawHtml } from "./src/lib/rehypeBlogRawHtml";
import { rehypeCodePane } from "./src/lib/rehypeCodePane";
import { rehypeTableScroll } from "./src/lib/rehypeTableScroll";
import labsLight from "./src/styles/labs-light.json";

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
  "/styleguide",
  ...STALE_RAY_SUMMIT_REDIRECT_PATHS,
]);

// The content datastore outgrew the Cloudflare dev isolate — with the adapter
// active, every dev-server page 500s inside getCollection. DEV_NODE=1 (the
// `pnpm dev:node` script) drops the adapter so dev runs in plain Node with hot
// reload. Dev-only: builds and API routes still require the adapter.
const devWithoutAdapter =
  process.env.DEV_NODE === "1" && process.argv.includes("dev");

export default defineConfig({
  site: "https://www.zenml.io",
  output: "static",
  session: {
    // The site does not use Astro sessions. Defining the null driver prevents
    // the Cloudflare adapter from auto-provisioning an unused SESSION KV.
    driver: { entrypoint: "unstorage/drivers/null" },
  },
  adapter: devWithoutAdapter
    ? undefined
    : cloudflare({
        imageService: "compile",
      }),
  trailingSlash: "never",
  build: {
    format: "file",
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDefaultLang()],
      rehypePlugins: [rehypeBlogRawHtml, rehypeCodePane, rehypeTableScroll],
    }),
    shikiConfig: {
      // One theme for every Markdown collection: the blog's dark sage pane
      // (`labs-light.json`, a dark theme by contents) is the site's code look
      // since the blog cutover (2026-09-09 ruling), not a blog-only skin.
      theme: labsLight as any,
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
        return (
          !sitemapExcludePaths.has(url.pathname) &&
          !url.pathname.startsWith("/team/")
        );
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
