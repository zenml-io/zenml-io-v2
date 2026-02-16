/**
 * Re-record ONLY the blog post B-roll clip (04-blog-post).
 *
 * Usage (from demo-video/ directory):
 *   npx tsx scripts/reshoot-blog-post.ts
 */
import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

const BASE_URL = 'https://zenml-io-v2.pages.dev';
const OUTPUT_DIR = path.resolve(__dirname, '../public/clips');
const VIEWPORT = { width: 1920, height: 1080 };

async function main() {
  const url = '/blog/the-hidden-complexity-of-ml-pipeline-schedules';
  const name = '04-blog-post';
  const duration = 35;

  console.log(`📹 Re-recording: ${name} (${duration}s)`);
  console.log(`   URL: ${BASE_URL}${url}\n`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: OUTPUT_DIR, size: VIEWPORT },
  });

  const page = await context.newPage();
  await page.goto(`${BASE_URL}${url}`, { waitUntil: 'networkidle' });

  // Dismiss cookie consent
  try {
    const btn = page.getByText('Accept all', { exact: true });
    await btn.waitFor({ state: 'visible', timeout: 5000 });
    await btn.click();
    console.log('   🍪 Cookie dismissed');
    await page.waitForTimeout(500);
  } catch {
    console.log('   🍪 No cookie banner');
  }

  // Wait for hydration
  console.log('   Waiting 2s...');
  await page.waitForTimeout(2000);

  // Scroll for 33s (35s total minus 2s wait)
  const ticks = Math.floor(33000 / 16);
  console.log(`   Scrolling for 33s...`);
  for (let i = 0; i < ticks; i++) {
    await page.evaluate(() => window.scrollBy(0, 2));
    await page.waitForTimeout(16);
  }

  const videoPath = await page.video()?.path();
  await page.close();
  await context.close();
  await browser.close();

  if (videoPath && fs.existsSync(videoPath)) {
    const webmPath = path.join(OUTPUT_DIR, `${name}.webm`);
    fs.renameSync(videoPath, webmPath);

    const mp4Path = path.join(OUTPUT_DIR, `${name}.mp4`);
    console.log('   🔄 Converting to MP4...');
    execSync(`ffmpeg -y -i "${webmPath}" -c:v libx264 -crf 18 -preset fast -an "${mp4Path}"`, { stdio: 'inherit' });
    console.log(`   ✅ Done: ${name}.mp4`);
  } else {
    console.error('   ❌ Video file not found');
  }
}

main().catch(console.error);
