/**
 * Extract VS category page content from Webflow HTML snapshots → .md files.
 *
 * Reads the 3 extracted HTML files + SEO baseline.json and generates
 * structured frontmatter .md files for the vs-pages content collection.
 *
 * VS pages are block-driven: hero → optional intro → value blocks →
 * testimonial → relatedCompare → CTA02.
 *
 * Usage: pnpm exec tsx scripts/phase3/extract-vs-pages.ts [--dry-run]
 */

import * as cheerio from "cheerio";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const HTML_DIR = join(ROOT, "design/webflow-export/extracted/vs");
const SEO_FILE = join(ROOT, "design/migration/phase1/runs/2026-02-11T0626Z/seo/baseline.json");
const OUTPUT_DIR = join(ROOT, "src/content/vs-pages");
const DRY_RUN = process.argv.includes("--dry-run");

const WEBFLOW_CDN = "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30";

interface VsPageConfig {
  slug: string;
  compareCategory: string;
}

const VS_PAGES: VsPageConfig[] = [
  { slug: "zenml-vs-orchestrators", compareCategory: "orchestrators" },
  { slug: "zenml-vs-experiment-trackers", compareCategory: "experiment-trackers" },
  { slug: "zenml-vs-e2e-platforms", compareCategory: "e2e-platforms" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveImageUrl(src: string): string {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  const filename = src.replace(/^\.\.\/images\//, "").replace(/^images\//, "");
  return `${WEBFLOW_CDN}/${filename}`;
}

function resolveLink(href: string): string {
  if (!href) return href;
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return href;
  let resolved = href.replace(/^\.\.\//, "/").replace(/^\.\//, "/");
  resolved = resolved.replace(/\.html$/, "");
  if (!resolved.startsWith("/")) resolved = `/${resolved}`;
  return resolved;
}

function yamlString(s: string): string {
  if (!s) return '""';
  if (s.includes('"') || s.includes(":") || s.includes("#") || s.includes("\n") || s.includes("'")) {
    return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
  }
  return `"${s}"`;
}

// ---------------------------------------------------------------------------
// SEO baseline
// ---------------------------------------------------------------------------

interface SeoEntry {
  title?: string;
  metaDescription?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

function loadSeoData(): Map<string, SeoEntry> {
  const raw = JSON.parse(readFileSync(SEO_FILE, "utf-8"));
  const entries: any[] = raw.results ?? raw;
  const map = new Map<string, SeoEntry>();
  for (const e of entries) {
    if (!e.url) continue;
    const path = new URL(e.url).pathname.replace(/\/$/, "");
    map.set(path, {
      title: e.title || undefined,
      metaDescription: e.metaDescription || undefined,
      canonical: e.canonical || undefined,
      ogTitle: e.ogTitle || undefined,
      ogDescription: e.ogDescription || undefined,
      ogImage: e.ogImage || undefined,
    });
  }
  return map;
}

// ---------------------------------------------------------------------------
// Block types
// ---------------------------------------------------------------------------

interface IntroBlock {
  kind: "intro";
  body: string;
}

interface ValueBlock {
  kind: "value";
  title: string;
  bullets: string[];
  image?: { url: string; alt: string };
  imageSide: "left" | "right";
}

interface TestimonialBlock {
  kind: "testimonial";
  quote: string;
  name: string;
  title?: string;
  avatar?: { url: string; alt: string };
  companyLogo?: { url: string; alt: string };
}

interface RelatedCompareBlock {
  kind: "relatedCompare";
  eyebrow?: string;
  headline?: string;
}

interface Cta02Block {
  kind: "cta02";
  headline: string;
  bullets: string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { url: string; alt: string };
}

type Block = IntroBlock | ValueBlock | TestimonialBlock | RelatedCompareBlock | Cta02Block;

// ---------------------------------------------------------------------------
// VS page extraction
// ---------------------------------------------------------------------------

interface VsPageExtract {
  slug: string;
  title: string;
  hero: {
    eyebrow?: string;
    headline: string;
    deck?: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    compareCategory: string;
  };
  blocks: Block[];
  seo: SeoEntry;
}

function extractVsPage(config: VsPageConfig, seoMap: Map<string, SeoEntry>): VsPageExtract {
  const htmlPath = join(HTML_DIR, `${config.slug}.html`);
  if (!existsSync(htmlPath)) throw new Error(`Missing HTML: ${htmlPath}`);

  const html = readFileSync(htmlPath, "utf-8");
  const $ = cheerio.load(html);

  // --- Hero ---
  const eyebrow = $(".zen-heading-with-bg").first().text().trim() || undefined;
  const headline = $("h1.uui-heading-large").first().text().trim().replace(/\s+/g, " ");

  // Deck: first .uui-text-size-xlarge in the hero container (before comparison-logos)
  const heroContainer = $(".uui-container-small").first();
  const deck = heroContainer.find(".uui-text-size-xlarge").first().text().trim().replace(/\s+/g, " ") || undefined;

  // CTAs
  const primaryCtaEl = heroContainer.find("a.uui-button").first();
  const secondaryCtaEl = heroContainer.find("a.uui-button-secondary-gray").first();
  const primaryCta = {
    label: primaryCtaEl.text().trim(),
    href: resolveLink(primaryCtaEl.attr("href") || "/book-your-demo"),
  };
  const secondaryCta = secondaryCtaEl.length ? {
    label: secondaryCtaEl.text().trim(),
    href: resolveLink(secondaryCtaEl.attr("href") || "/get-started"),
  } : undefined;

  // --- Blocks ---
  const blocks: Block[] = [];

  // Process sections in DOM order
  $("section, .uui-section_layout08").each((_i, section) => {
    const $s = $(section);
    const classList = $s.attr("class") || "";

    // Intro text (inside the first layout08 section, before the grid)
    // The orchestrators page has a standalone paragraph before the value blocks
    if (classList.includes("uui-section_layout08") && blocks.length === 0) {
      const introText = $s.find(".uui-container-medium .uui-text-size-xlarge").first().text().trim();
      if (introText && introText.length > 50) {
        blocks.push({ kind: "intro", body: introText });
      }
    }

    // Value blocks (layout08 with grid)
    if (classList.includes("uui-section_layout08")) {
      const gridEl = $s.find(".uui-layout08_component");
      if (!gridEl.length) return;

      const titleEl = $s.find("h2.uui-heading-medium").first();
      const title = titleEl.text().trim().replace(/\s+/g, " ");
      if (!title) return;

      const bullets: string[] = [];
      $s.find(".uui-layout08_item-text-wrapper .uui-text-size-large").each((_j, el) => {
        const text = $(el).text().trim().replace(/\s+/g, " ");
        if (text) bullets.push(text);
      });

      const imgEl = $s.find(".uui-layout08_image-wrapper img").first();
      const image = imgEl.length ? {
        url: resolveImageUrl(imgEl.attr("src") || ""),
        alt: imgEl.attr("alt") || "Dashboard mockup",
      } : undefined;

      // Determine image side by DOM order
      const firstChild = gridEl.children().first();
      const imageSide: "left" | "right" = firstChild.hasClass("uui-layout08_image-wrapper") ? "left" : "right";

      blocks.push({ kind: "value", title, bullets, image, imageSide });
    }

    // Testimonial
    if (classList.includes("uui-section_testimonial02")) {
      const quote = $s.find("h3.uui-heading-small").text().trim()
        .replace(/^"/, "").replace(/"\.?$/, "").replace(/^&quot;/, "").replace(/&quot;\.?$/, "");
      const name = $s.find(".uui-heading-tiny").first().text().trim();
      const title = $s.find(".testimonial-person .uui-text-size-medium").first().text().trim() || undefined;
      const avatarImg = $s.find(".uui-client-image-wrapper img, .uui-testimonial02_client-image-large").first();
      const avatar = avatarImg.length ? {
        url: resolveImageUrl(avatarImg.attr("src") || ""),
        alt: avatarImg.attr("alt") || name,
      } : undefined;
      const logoImg = $s.find("img.uui-testimonial02_logo").first();
      const companyLogo = logoImg.length ? {
        url: resolveImageUrl(logoImg.attr("src") || ""),
        alt: logoImg.attr("alt") || "Company logo",
      } : undefined;

      if (quote && name) {
        blocks.push({ kind: "testimonial", quote, name, title, avatar, companyLogo });
      }
    }

    // Related compare section
    if (classList.includes("uui-section_layout76-2")) {
      const relEyebrow = $s.find(".uui-heading-subheading").first().text().trim() || undefined;
      const relHeadline = $s.find(".uui-heading-medium").first().text().trim() || undefined;
      blocks.push({ kind: "relatedCompare", eyebrow: relEyebrow, headline: relHeadline });
    }

    // CTA02
    if (classList.includes("uui-section_cta02")) {
      const ctaHeadline = $s.find(".uui-cta02_content h2").text().trim();
      const ctaBullets: string[] = [];
      $s.find(".uui-cta02_item-text-wrapper .uui-text-size-large").each((_j, el) => {
        ctaBullets.push($(el).text().trim());
      });
      const ctaPrimary = $s.find(".uui-button").first();
      const ctaSecondary = $s.find(".uui-button-secondary-gray").first();
      const ctaImage = $s.find(".uui-cta02_image-wrapper img").first();

      blocks.push({
        kind: "cta02",
        headline: ctaHeadline,
        bullets: ctaBullets,
        primaryCta: {
          label: ctaPrimary.text().trim(),
          href: resolveLink(ctaPrimary.attr("href") || "/book-your-demo"),
        },
        secondaryCta: ctaSecondary.length ? {
          label: ctaSecondary.text().trim(),
          href: resolveLink(ctaSecondary.attr("href") || "/get-started"),
        } : undefined,
        image: ctaImage.length ? {
          url: resolveImageUrl(ctaImage.attr("src") || ""),
          alt: ctaImage.attr("alt") || "ZenML dashboard",
        } : undefined,
      });
    }
  });

  const seo = seoMap.get(`/vs/${config.slug}`) || {};

  return {
    slug: config.slug,
    title: headline || config.slug,
    hero: { eyebrow, headline, deck, primaryCta, secondaryCta, compareCategory: config.compareCategory },
    blocks,
    seo,
  };
}

// ---------------------------------------------------------------------------
// YAML generation
// ---------------------------------------------------------------------------

function imageToYaml(img: { url: string; alt: string }, indent: string): string {
  return `${indent}url: ${yamlString(img.url)}\n${indent}alt: ${yamlString(img.alt)}`;
}

function toMarkdown(vs: VsPageExtract): string {
  const lines: string[] = ["---"];

  lines.push(`title: ${yamlString(vs.title)}`);
  lines.push(`slug: ${yamlString(vs.slug)}`);
  lines.push("draft: false");
  lines.push("");

  // Hero
  lines.push("hero:");
  if (vs.hero.eyebrow) lines.push(`  eyebrow: ${yamlString(vs.hero.eyebrow)}`);
  lines.push(`  headline: ${yamlString(vs.hero.headline)}`);
  if (vs.hero.deck) lines.push(`  deck: ${yamlString(vs.hero.deck)}`);
  lines.push("  primaryCta:");
  lines.push(`    label: ${yamlString(vs.hero.primaryCta.label)}`);
  lines.push(`    href: ${yamlString(vs.hero.primaryCta.href)}`);
  if (vs.hero.secondaryCta) {
    lines.push("  secondaryCta:");
    lines.push(`    label: ${yamlString(vs.hero.secondaryCta.label)}`);
    lines.push(`    href: ${yamlString(vs.hero.secondaryCta.href)}`);
  }
  lines.push(`  compareCategory: ${yamlString(vs.hero.compareCategory)}`);
  lines.push("");

  // Blocks
  lines.push("blocks:");
  for (const block of vs.blocks) {
    if (block.kind === "intro") {
      lines.push("  - kind: intro");
      lines.push(`    body: ${yamlString(block.body)}`);
    } else if (block.kind === "value") {
      lines.push("  - kind: value");
      lines.push(`    title: ${yamlString(block.title)}`);
      if (block.bullets.length) {
        lines.push("    bullets:");
        for (const b of block.bullets) lines.push(`      - ${yamlString(b)}`);
      }
      if (block.image) {
        lines.push("    image:");
        lines.push(`      url: ${yamlString(block.image.url)}`);
        lines.push(`      alt: ${yamlString(block.image.alt)}`);
      }
      lines.push(`    imageSide: ${block.imageSide}`);
    } else if (block.kind === "testimonial") {
      lines.push("  - kind: testimonial");
      lines.push(`    quote: ${yamlString(block.quote)}`);
      lines.push(`    name: ${yamlString(block.name)}`);
      if (block.title) lines.push(`    title: ${yamlString(block.title)}`);
      if (block.avatar) {
        lines.push("    avatar:");
        lines.push(`      url: ${yamlString(block.avatar.url)}`);
        lines.push(`      alt: ${yamlString(block.avatar.alt)}`);
      }
      if (block.companyLogo) {
        lines.push("    companyLogo:");
        lines.push(`      url: ${yamlString(block.companyLogo.url)}`);
        lines.push(`      alt: ${yamlString(block.companyLogo.alt)}`);
      }
    } else if (block.kind === "relatedCompare") {
      lines.push("  - kind: relatedCompare");
      if (block.eyebrow) lines.push(`    eyebrow: ${yamlString(block.eyebrow)}`);
      if (block.headline) lines.push(`    headline: ${yamlString(block.headline)}`);
    } else if (block.kind === "cta02") {
      lines.push("  - kind: cta02");
      lines.push(`    headline: ${yamlString(block.headline)}`);
      if (block.bullets.length) {
        lines.push("    bullets:");
        for (const b of block.bullets) lines.push(`      - ${yamlString(b)}`);
      }
      lines.push("    primaryCta:");
      lines.push(`      label: ${yamlString(block.primaryCta.label)}`);
      lines.push(`      href: ${yamlString(block.primaryCta.href)}`);
      if (block.secondaryCta) {
        lines.push("    secondaryCta:");
        lines.push(`      label: ${yamlString(block.secondaryCta.label)}`);
        lines.push(`      href: ${yamlString(block.secondaryCta.href)}`);
      }
      if (block.image) {
        lines.push("    image:");
        lines.push(`      url: ${yamlString(block.image.url)}`);
        lines.push(`      alt: ${yamlString(block.image.alt)}`);
      }
    }
  }
  lines.push("");

  // SEO
  if (vs.seo.title || vs.seo.metaDescription) {
    lines.push("seo:");
    if (vs.seo.title) lines.push(`  title: ${yamlString(vs.seo.title)}`);
    if (vs.seo.metaDescription) lines.push(`  description: ${yamlString(vs.seo.metaDescription)}`);
    if (vs.seo.ogTitle) lines.push(`  ogTitle: ${yamlString(vs.seo.ogTitle)}`);
    if (vs.seo.ogDescription) lines.push(`  ogDescription: ${yamlString(vs.seo.ogDescription)}`);
    if (vs.seo.ogImage) lines.push(`  ogImage: ${yamlString(vs.seo.ogImage)}`);
    lines.push("");
  }

  // Webflow metadata (synthetic)
  lines.push("webflow:");
  lines.push(`  siteId: "64a817a2e7e2208272d1ce30"`);
  lines.push(`  itemId: "static-page:vs/${vs.slug}"`);
  lines.push(`  exportedAt: "2026-02-11T06:26:00.000Z"`);
  lines.push("  source: live");

  lines.push("---");
  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log(`\n🔧 Extracting VS category pages (${DRY_RUN ? "DRY RUN" : "WRITE"})...\n`);

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const seoMap = loadSeoData();
  let success = 0;
  let errors = 0;

  for (const config of VS_PAGES) {
    try {
      const vs = extractVsPage(config, seoMap);
      const md = toMarkdown(vs);
      const outPath = join(OUTPUT_DIR, `${config.slug}.md`);

      if (DRY_RUN) {
        console.log(`📝 [DRY] ${vs.slug}`);
        console.log(`   Hero: "${vs.hero.headline}" | eyebrow: ${vs.hero.eyebrow || "(none)"}`);
        console.log(`   Blocks: ${vs.blocks.length} — ${vs.blocks.map(b => b.kind).join(", ")}`);
        console.log(`   Compare category: ${vs.hero.compareCategory}`);
      } else {
        writeFileSync(outPath, md, "utf-8");
        console.log(`✅ ${vs.slug} — ${vs.blocks.length} blocks (${Math.round(md.length / 1024)}KB)`);
      }
      success++;
    } catch (err) {
      console.error(`❌ ${config.slug}: ${err}`);
      errors++;
    }
  }

  console.log(`\n📊 Done: ${success} extracted, ${errors} errors\n`);
}

main();
