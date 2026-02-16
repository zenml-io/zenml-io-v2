/**
 * Screenshot the thumbnail HTML at exactly 1280×720.
 *
 * The template lives in templates/thumbnail.html (committed to git).
 * It references alex-frame.jpg and zenml-logo.svg via relative paths,
 * so we copy the template into out/ where those assets already exist.
 *
 * Usage: npx tsx scripts/screenshot-thumbnail.ts
 */
import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

async function main() {
  const templatePath = path.resolve(__dirname, '../templates/thumbnail.html');
  const outDir = path.resolve(__dirname, '../out');
  const htmlPath = path.join(outDir, 'thumbnail.html');
  const outPath = path.join(outDir, 'thumbnail.png');

  // Copy template into out/ so relative asset paths (alex-frame.jpg, zenml-logo.svg) resolve
  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(templatePath, htmlPath);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: outPath,
    type: 'png',
    clip: { x: 0, y: 0, width: 1280, height: 720 },
  });

  await browser.close();
  console.log(`✅ Thumbnail saved: ${outPath}`);
}

main().catch(console.error);
