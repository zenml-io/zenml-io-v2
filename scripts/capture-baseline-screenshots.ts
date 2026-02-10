/**
 * Capture baseline screenshots of the live Webflow site.
 * These are used for visual comparison during migration (Phase 6).
 *
 * Usage: pnpm exec tsx scripts/capture-baseline-screenshots.ts
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join } from "path";

const BASE_URL = "https://www.zenml.io";
const OUTPUT_DIR = join(import.meta.dirname, "../design/screenshots/baseline");

const PAGES = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog-listing" },
  { path: "/blog/dynamic-pipelines-a-skeptics-guide", name: "blog-post" },
  { path: "/llmops-database", name: "llmops-listing" },
  { path: "/pricing", name: "pricing" },
  { path: "/company", name: "company" },
  { path: "/integrations", name: "integrations" },
  { path: "/features", name: "features" },
  { path: "/pro", name: "zenml-pro" },
  { path: "/careers", name: "careers" },
  { path: "/compare", name: "compare-hub" },
  { path: "/case-studies", name: "case-studies" },
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: "desktop" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 375, height: 812, name: "mobile" },
];

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();

    for (const { path, name } of PAGES) {
      const url = `${BASE_URL}${path}`;
      const filename = `${name}-${viewport.name}.png`;
      console.log(`Capturing ${url} @ ${viewport.name}...`);

      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        // Wait a bit for animations/lazy-loaded content
        await page.waitForTimeout(1500);
        await page.screenshot({
          path: join(OUTPUT_DIR, filename),
          fullPage: true,
        });
        console.log(`  -> ${filename}`);
      } catch (err) {
        console.error(`  !! Failed: ${err instanceof Error ? err.message : err}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nDone! Screenshots saved to ${OUTPUT_DIR}`);
}

main();
