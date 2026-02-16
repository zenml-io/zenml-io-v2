/**
 * Record B-roll clips for the demo video using Playwright.
 *
 * Usage (run from demo-video/ directory):
 *   npx tsx scripts/record-broll.ts
 *
 * Records each page as a separate clip at native 1920×1080.
 * - Dismisses cookie consent banner before recording
 * - Scrolls at per-clip speeds to fill the target duration
 * - Auto-renames output files and converts to MP4
 */
import { chromium, type Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

const BASE_URL = 'https://zenml-io-v2.pages.dev';
const OUTPUT_DIR = path.resolve(__dirname, '../public/clips');
const VIEWPORT = { width: 1920, height: 1080 };

interface ClipConfig {
  name: string;
  url: string;
  /** Total recording duration in seconds */
  duration: number;
  /** Seconds to wait before starting scroll (page hydrate + linger) */
  waitBefore?: number;
  /** Pixels to scroll per tick (lower = slower scroll) */
  scrollStep?: number;
  /** Ms between scroll ticks */
  scrollInterval?: number;
  /** Extra wait after cookie dismissal (e.g. LLMOps spinner) */
  extraWait?: number;
}

const CLIPS: ClipConfig[] = [
  // ── Homepage ──────────────────────────────────────────────
  {
    name: '01-homepage-scroll',
    url: '/',
    duration: 35,
    waitBefore: 2,
    scrollStep: 2,
    scrollInterval: 16, // ~125 px/s — leisurely
  },

  // ── Blog listing ─────────────────────────────────────────
  // Only visible as clip 2 in Verification section (~15s window).
  // Slower scroll to avoid hitting the bottom of a 12-card page.
  {
    name: '02-blog-listing',
    url: '/blog',
    duration: 20,
    waitBefore: 2,
    scrollStep: 1,         // gentle — the card grid doesn't need fast scrolling
    scrollInterval: 16,
  },

  // ── LLMOps database listing ──────────────────────────────
  // Faster scroll so we don't reach the bottom.
  // Used as first B-roll clip for Planning section (~14s visible).
  {
    name: '03-llmops-database',
    url: '/llmops-database',
    duration: 20,
    waitBefore: 2,
    scrollStep: 3,        // faster than default
    scrollInterval: 16,
    extraWait: 5,          // spinner load time
  },

  // ── LLMOps individual entry ──────────────────────────────
  // Linger at the top (it's mostly text), then scroll gently.
  // Crossfades in as second clip for Planning section (~16s visible).
  {
    name: '03b-llmops-entry',
    url: '/llmops-database/building-production-agentic-systems-with-platform-level-llmops-features',
    duration: 20,
    waitBefore: 5,         // linger — let viewer read the title/intro
    scrollStep: 1,         // very slow scroll — text-heavy page
    scrollInterval: 20,
  },

  // ── Blog post ────────────────────────────────────────────
  {
    name: '04-blog-post',
    url: '/blog/the-hidden-complexity-of-ml-pipeline-schedules',
    duration: 35,
    waitBefore: 2,
    scrollStep: 2,
    scrollInterval: 16,
  },

  // ── Case study ───────────────────────────────────────────
  {
    name: '05-case-study',
    url: '/case-study/jetbrains',
    duration: 25,
    waitBefore: 2,
    scrollStep: 2,
    scrollInterval: 16,
  },
];

async function smoothScroll(page: Page, durationMs: number, step: number, interval: number) {
  const ticks = Math.floor(durationMs / interval);
  for (let i = 0; i < ticks; i++) {
    await page.evaluate((s) => window.scrollBy(0, s), step);
    await page.waitForTimeout(interval);
  }
}

async function dismissCookieConsent(page: Page) {
  try {
    const acceptBtn = page.getByText('Accept all', { exact: true });
    await acceptBtn.waitFor({ state: 'visible', timeout: 5000 });
    await acceptBtn.click();
    console.log('   🍪 Cookie consent dismissed');
    await page.waitForTimeout(500);
  } catch {
    console.log('   🍪 No cookie banner found (already dismissed or not shown)');
  }
}

async function recordClip(config: ClipConfig) {
  console.log(`\n📹 Recording: ${config.name} (${config.duration}s)`);
  console.log(`   URL: ${BASE_URL}${config.url}`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: {
      dir: OUTPUT_DIR,
      size: VIEWPORT,
    },
  });

  const page = await context.newPage();

  // Navigate and wait for full load
  await page.goto(`${BASE_URL}${config.url}`, { waitUntil: 'networkidle' });

  // Dismiss cookie consent banner
  await dismissCookieConsent(page);

  // Extra wait for async content (e.g. LLMOps database loading spinner)
  if (config.extraWait) {
    console.log(`   ⏳ Extra wait ${config.extraWait}s for async content...`);
    await page.waitForTimeout(config.extraWait * 1000);
  }

  // Pre-scroll wait (hydration + linger time)
  const waitSec = config.waitBefore ?? 2;
  console.log(`   Waiting ${waitSec}s before scrolling...`);
  await page.waitForTimeout(waitSec * 1000);

  // Calculate scroll duration (total recording minus all pre-scroll time)
  const preScrollTime = waitSec + (config.extraWait ?? 0);
  const scrollDuration = Math.max(0, (config.duration - preScrollTime)) * 1000;
  const step = config.scrollStep ?? 2;
  const interval = config.scrollInterval ?? 16;
  console.log(`   Scrolling for ${scrollDuration / 1000}s (${step}px every ${interval}ms)...`);
  await smoothScroll(page, scrollDuration, step, interval);

  // Get the video path before closing
  const videoPath = await page.video()?.path();

  // Close to finalize the video file
  await page.close();
  await context.close();
  await browser.close();

  // Rename and convert
  if (videoPath && fs.existsSync(videoPath)) {
    const webmPath = path.join(OUTPUT_DIR, `${config.name}.webm`);
    fs.renameSync(videoPath, webmPath);
    console.log(`   ✅ WebM saved: ${config.name}.webm`);

    const mp4Path = path.join(OUTPUT_DIR, `${config.name}.mp4`);
    console.log(`   🔄 Converting to MP4...`);
    execSync(
      `ffmpeg -y -i "${webmPath}" -c:v libx264 -crf 18 -preset fast -an "${mp4Path}"`,
      { stdio: 'inherit' }
    );
    console.log(`   ✅ MP4 ready: ${config.name}.mp4`);
  } else {
    console.error(`   ❌ Video file not found at expected path`);
  }
}

async function main() {
  console.log('🎬 B-roll Recording Script');
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`   Base URL: ${BASE_URL}`);
  console.log(`   Resolution: ${VIEWPORT.width}×${VIEWPORT.height}`);
  console.log(`   Clips to record: ${CLIPS.length}\n`);

  for (const clip of CLIPS) {
    await recordClip(clip);
  }

  console.log('\n🎉 All clips recorded and converted!');
  console.log('MP4 versions are ready for use in Remotion.');
}

main().catch(console.error);
