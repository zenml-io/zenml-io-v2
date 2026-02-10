import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.zenml.io",
  output: "static",
  adapter: cloudflare(),
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [preact(), sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
