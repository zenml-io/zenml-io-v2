/**
 * Extract feature page content from Webflow HTML snapshots → .md files.
 *
 * Reads the 12 extracted HTML files + SEO baseline.json and generates
 * structured frontmatter .md files for the feature-pages content collection.
 *
 * Usage: pnpm exec tsx scripts/phase3/extract-feature-pages.ts [--dry-run]
 */

import * as cheerio from "cheerio";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const HTML_DIR = join(ROOT, "design/webflow-export/extracted/features");
const SEO_FILE = join(ROOT, "design/migration/phase1/runs/2026-02-11T0626Z/seo/baseline.json");
const HUB_HTML = join(ROOT, "design/webflow-export/extracted/features.html");
const OUTPUT_DIR = join(ROOT, "src/content/feature-pages");
const DRY_RUN = process.argv.includes("--dry-run");

const WEBFLOW_CDN = "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30";
const WEBFLOW_SITE_ID = "64a817a2e7e2208272d1ce30";

const SLUGS = [
  "iterate-at-warp-speed",
  "auto-track-everything",
  "shared-ml-building-blocks",
  "backend-flexibility-zero-lock-in",
  "limitless-scaling",
  "streamline-cloud-expenses",
  "security-guardrails-always",
  "centralized-model-control-plane",
  "organize-assets-into-projects",
  "streamlined-pipeline-management",
  "role-based-access-control-and-permissions",
  "enterprise-grade-support-and-onboarding",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert relative Webflow image path to CDN URL */
function resolveImageUrl(relPath: string): string {
  // ../images/66c74b8f_iterate00-min.png → full CDN URL
  const filename = relPath.replace(/^\.\.\/images\//, "").replace(/^\.\/images\//, "");
  return `${WEBFLOW_CDN}/${filename}`;
}

/** Clean text: strip trailing <br>, trim whitespace */
function cleanText(text: string): string {
  return text.replace(/<br\s*\/?>/gi, "").replace(/\s+/g, " ").trim();
}

/** Escape YAML string (wrap in quotes if needed) */
function yamlStr(s: string): string {
  if (s.includes('"') && s.includes("'")) {
    return `"${s.replace(/"/g, '\\"')}"`;
  }
  if (s.includes(":") || s.includes("#") || s.includes('"') || s.includes("'") || s.includes("{") || s.includes("}") || s.includes("[") || s.includes("]") || s.includes("&") || s.includes("*") || s.includes("!") || s.includes("|") || s.includes(">") || s.includes("%") || s.includes("@") || s.includes("`")) {
    return `"${s.replace(/"/g, '\\"')}"`;
  }
  return s;
}

/** Load SEO data from baseline.json */
function loadSeoData(): Map<string, any> {
  const raw = JSON.parse(readFileSync(SEO_FILE, "utf-8"));
  const entries: any[] = raw.results ?? raw;
  const map = new Map<string, any>();
  for (const entry of entries) {
    const url = entry.url as string;
    map.set(url, entry);
  }
  return map;
}

/** Extract hub card data from features.html */
function loadHubCards(): Map<string, { title: string; summary: string; category: string; badge?: string }> {
  const html = readFileSync(HUB_HTML, "utf-8");
  const $ = cheerio.load(html);
  const cards = new Map<string, { title: string; summary: string; category: string; badge?: string }>();

  // The hub page has a card grid with links to each feature
  $("a[href*='features/']").each((_, el) => {
    const $a = $(el);
    const href = $a.attr("href") || "";
    const slug = href.replace(/.*features\//, "").replace(/\.html$/, "").replace(/\/$/, "");
    if (!slug || !SLUGS.includes(slug)) return;

    // Try to find card content within the link
    const title = cleanText($a.find("h3, .uui-text-style-link-02, .uui-heading-xxsmall").first().text());
    const summary = cleanText($a.find("p, .uui-text-size-medium").first().text());
    const category = cleanText($a.find(".uui-badge-small-text, .uui-heading-subheading").first().text());
    const hasBadge = $a.find(".uui-badge-small-text-2, .badge-pro").length > 0 || $a.text().includes("PRO");

    if (title) {
      cards.set(slug, { title, summary, category, badge: hasBadge ? "PRO" : undefined });
    }
  });

  return cards;
}

// ---------------------------------------------------------------------------
// Main extraction
// ---------------------------------------------------------------------------

interface ValueBlock {
  kind: "value";
  title: string;
  body: string;
  bullets: string[];
  imageUrl: string;
  imageAlt: string;
  imageSide: "left" | "right";
}

interface ComplianceBlock {
  kind: "complianceBanner";
  eyebrow: string;
  headline: string;
  body: string;
  badges: { url: string; alt: string }[];
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
  avatarAlt: string;
  companyLogoUrl: string;
  companyLogoAlt: string;
}

interface FeaturePageData {
  slug: string;
  title: string; // h1
  category: string;
  deck: string;
  heroImageUrl: string;
  heroImageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; external: boolean };
  blocks: (ValueBlock | ComplianceBlock)[];
  testimonial: Testimonial | null;
  hub: { title: string; summary: string; category: string; badge?: string; order: number };
  seo: { title: string; description: string; ogTitle: string; ogDescription: string; ogImage: string };
}

function extractPage(slug: string, seoMap: Map<string, any>, hubCards: Map<string, any>): FeaturePageData {
  const htmlPath = join(HTML_DIR, `${slug}.html`);
  const html = readFileSync(htmlPath, "utf-8");
  const $ = cheerio.load(html);

  // --- Hero ---
  const category = cleanText($(".uui-heading-subheading").first().text());
  const title = cleanText($("h1.uui-heading-large").first().text());
  const deck = cleanText($(".uui-page-padding-top .uui-text-size-xlarge").first().text());

  const heroImg = $("img.feature-img").first();
  const heroImageUrl = heroImg.attr("src") ? resolveImageUrl(heroImg.attr("src")!) : "";
  const heroImageAlt = heroImg.attr("alt") || title;

  // CTAs
  const primaryCtaEl = $(".uui-page-padding-top a.uui-button").first();
  const secondaryCtaEl = $(".uui-page-padding-top a.uui-button-link").first();

  const primaryCta = {
    label: cleanText(primaryCtaEl.text()) || "Book a demo",
    href: "/book-your-demo",
  };
  const secondaryCta = {
    label: cleanText(secondaryCtaEl.find("div").first().text()) || "Read the documentation",
    href: secondaryCtaEl.attr("href") || "https://docs.zenml.io",
    external: (secondaryCtaEl.attr("target") || "") === "_blank",
  };

  // --- Value blocks (layout08 sections) ---
  const blocks: (ValueBlock | ComplianceBlock)[] = [];
  $("section.uui-section_layout08").each((_, section) => {
    const $s = $(section);

    // Check if this is a compliance banner section
    const complianceBanner = $s.find(".compliance_banner");
    if (complianceBanner.length > 0) {
      const eyebrow = cleanText($s.find(".uui-heading-subheading").text());
      const headline = cleanText($s.find("h3").first().text());
      const body = cleanText($s.find(".uui-text-size-medium").first().text());
      const badges: { url: string; alt: string }[] = [];
      $s.find(".soc2_logo, .iso_logo").each((_, img) => {
        const src = $(img).attr("src");
        if (src) badges.push({ url: resolveImageUrl(src), alt: $(img).attr("alt") || "" });
      });
      blocks.push({ kind: "complianceBanner", eyebrow, headline, body, badges });
      return;
    }

    // Standard value block
    const $grid = $s.find(".uui-layout08_component").first();
    const $content = $grid.find(".uui-layout08_content").first();
    const $imgWrapper = $grid.find(".uui-layout08_image-wrapper").first();

    const blockTitle = cleanText($content.find("h2").first().text());
    const bodyText = cleanText($content.find(".uui-text-size-xlarge").first().text());
    const bullets: string[] = [];
    $content.find("li").each((_, li) => { bullets.push(cleanText($(li).text())); });

    const img = $imgWrapper.find("img").first();
    const imageUrl = img.attr("src") ? resolveImageUrl(img.attr("src")!) : "";
    const imageAlt = img.attr("alt") || blockTitle;

    // Determine image side: if image-wrapper comes before content in DOM, image is on left
    const contentIndex = $grid.children().index($content);
    const imageIndex = $grid.children().index($imgWrapper);
    const imageSide: "left" | "right" = imageIndex < contentIndex ? "left" : "right";

    blocks.push({ kind: "value", title: blockTitle, body: bodyText, bullets, imageUrl, imageAlt, imageSide });
  });

  // --- Testimonial ---
  let testimonial: Testimonial | null = null;
  const $testimonial = $("section.uui-section_testimonial02-2").first();
  if ($testimonial.length) {
    const quote = cleanText($testimonial.find(".uui-heading-small, .text-weight-medium").first().text());
    const name = cleanText($testimonial.find(".uui-heading-tiny").first().text());
    const tTitle = cleanText($testimonial.find(".uui-text-size-medium").first().text());
    const avatarImg = $testimonial.find(".avatar-negative img, .uui-testimonial02_client-image-2").first();
    const logoImg = $testimonial.find(".testimonial-logo-absolute img").first();

    testimonial = {
      quote,
      name,
      title: tTitle,
      avatarUrl: avatarImg.attr("src") ? resolveImageUrl(avatarImg.attr("src")!) : "",
      avatarAlt: name,
      companyLogoUrl: logoImg.attr("src") ? resolveImageUrl(logoImg.attr("src")!) : "",
      companyLogoAlt: logoImg.attr("alt") || "",
    };
  }

  // --- SEO ---
  const seoEntry = seoMap.get(`https://www.zenml.io/features/${slug}`) || {};
  const seo = {
    title: seoEntry.title || `ZenML Features - ${title}`,
    description: seoEntry.metaDescription || deck,
    ogTitle: seoEntry.ogTitle || seoEntry.title || title,
    ogDescription: seoEntry.ogDescription || seoEntry.metaDescription || deck,
    ogImage: seoEntry.ogImage || heroImageUrl,
  };

  // --- Hub card ---
  const hubCard = hubCards.get(slug);
  const hubData = {
    title: hubCard?.title || title,
    summary: hubCard?.summary || deck,
    category: hubCard?.category || category,
    badge: hubCard?.badge,
    order: SLUGS.indexOf(slug) + 1,
  };

  return { slug, title, category, deck, heroImageUrl, heroImageAlt, primaryCta, secondaryCta, blocks, testimonial, hub: hubData, seo };
}

// ---------------------------------------------------------------------------
// YAML generation
// ---------------------------------------------------------------------------

function toMarkdown(data: FeaturePageData): string {
  const lines: string[] = ["---"];

  lines.push(`title: ${yamlStr(data.title)}`);
  lines.push(`slug: ${data.slug}`);
  lines.push(`draft: false`);
  lines.push("");

  // Hub
  lines.push("hub:");
  lines.push(`  title: ${yamlStr(data.hub.title)}`);
  if (data.hub.summary) lines.push(`  summary: ${yamlStr(data.hub.summary)}`);
  lines.push(`  category: ${yamlStr(data.hub.category)}`);
  if (data.hub.badge) lines.push(`  badge: ${data.hub.badge}`);
  lines.push(`  order: ${data.hub.order}`);
  lines.push("");

  // Hero
  lines.push("hero:");
  lines.push(`  deck: ${yamlStr(data.deck)}`);
  if (data.heroImageUrl) {
    lines.push("  image:");
    lines.push(`    url: ${yamlStr(data.heroImageUrl)}`);
    lines.push(`    alt: ${yamlStr(data.heroImageAlt)}`);
  }
  lines.push("  primaryCta:");
  lines.push(`    label: ${yamlStr(data.primaryCta.label)}`);
  lines.push(`    href: ${data.primaryCta.href}`);
  if (data.secondaryCta) {
    lines.push("  secondaryCta:");
    lines.push(`    label: ${yamlStr(data.secondaryCta.label)}`);
    lines.push(`    href: ${data.secondaryCta.href}`);
    if (data.secondaryCta.external) lines.push("    external: true");
  }
  lines.push("");

  // Blocks
  lines.push("blocks:");
  for (const block of data.blocks) {
    if (block.kind === "value") {
      lines.push("  - kind: value");
      lines.push(`    title: ${yamlStr(block.title)}`);
      if (block.body) lines.push(`    body: ${yamlStr(block.body)}`);
      if (block.bullets.length > 0) {
        lines.push("    bullets:");
        for (const b of block.bullets) {
          lines.push(`      - ${yamlStr(b)}`);
        }
      }
      if (block.imageUrl) {
        lines.push("    image:");
        lines.push(`      url: ${yamlStr(block.imageUrl)}`);
        lines.push(`      alt: ${yamlStr(block.imageAlt)}`);
      }
      lines.push(`    imageSide: ${block.imageSide}`);
    } else if (block.kind === "complianceBanner") {
      lines.push("  - kind: complianceBanner");
      if (block.eyebrow) lines.push(`    eyebrow: ${yamlStr(block.eyebrow)}`);
      if (block.headline) lines.push(`    headline: ${yamlStr(block.headline)}`);
      if (block.body) lines.push(`    body: ${yamlStr(block.body)}`);
      if (block.badges.length > 0) {
        lines.push("    badges:");
        for (const badge of block.badges) {
          lines.push(`      - url: ${yamlStr(badge.url)}`);
          lines.push(`        alt: ${yamlStr(badge.alt)}`);
        }
      }
    }
  }
  lines.push("");

  // Testimonial
  if (data.testimonial) {
    lines.push("testimonial:");
    lines.push(`  quote: ${yamlStr(data.testimonial.quote)}`);
    lines.push(`  name: ${yamlStr(data.testimonial.name)}`);
    if (data.testimonial.title) lines.push(`  title: ${yamlStr(data.testimonial.title)}`);
    if (data.testimonial.avatarUrl) {
      lines.push("  avatar:");
      lines.push(`    url: ${yamlStr(data.testimonial.avatarUrl)}`);
      lines.push(`    alt: ${yamlStr(data.testimonial.avatarAlt)}`);
    }
    if (data.testimonial.companyLogoUrl) {
      lines.push("  companyLogo:");
      lines.push(`    url: ${yamlStr(data.testimonial.companyLogoUrl)}`);
      lines.push(`    alt: ${yamlStr(data.testimonial.companyLogoAlt)}`);
    }
    lines.push("");
  }

  // SEO
  lines.push("seo:");
  lines.push(`  title: ${yamlStr(data.seo.title)}`);
  lines.push(`  description: ${yamlStr(data.seo.description)}`);
  lines.push(`  ogTitle: ${yamlStr(data.seo.ogTitle)}`);
  lines.push(`  ogDescription: ${yamlStr(data.seo.ogDescription)}`);
  if (data.seo.ogImage) lines.push(`  ogImage: ${data.seo.ogImage}`);
  lines.push("");

  // Webflow metadata (traceability)
  lines.push("webflow:");
  lines.push(`  siteId: ${WEBFLOW_SITE_ID}`);
  lines.push(`  itemId: "static-page:features/${data.slug}"`);
  lines.push(`  exportedAt: "2026-02-11T06:26:00.000Z"`);
  lines.push(`  source: live`);

  lines.push("---");
  lines.push("");
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log(`\n📄 Feature Page Extraction`);
  console.log(`   Source: ${HTML_DIR}`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log(`   Mode: ${DRY_RUN ? "DRY RUN" : "WRITE"}\n`);

  // Load supporting data
  const seoMap = loadSeoData();
  console.log(`   Loaded ${seoMap.size} SEO entries`);

  const hubCards = loadHubCards();
  console.log(`   Loaded ${hubCards.size} hub card entries\n`);

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let successCount = 0;
  const errors: string[] = [];

  for (const slug of SLUGS) {
    try {
      const data = extractPage(slug, seoMap, hubCards);
      const md = toMarkdown(data);
      const outPath = join(OUTPUT_DIR, `${slug}.md`);

      if (DRY_RUN) {
        console.log(`✅ ${slug}`);
        console.log(`   Title: ${data.title}`);
        console.log(`   Category: ${data.category}`);
        console.log(`   Blocks: ${data.blocks.length} (${data.blocks.map(b => b.kind).join(", ")})`);
        console.log(`   Testimonial: ${data.testimonial ? "yes" : "no"}`);
        console.log(`   SEO title: ${data.seo.title}\n`);
      } else {
        writeFileSync(outPath, md, "utf-8");
        console.log(`✅ ${slug} → ${outPath}`);
      }
      successCount++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ ${slug}: ${msg}`);
      errors.push(slug);
    }
  }

  console.log(`\n📊 Results: ${successCount}/${SLUGS.length} success, ${errors.length} errors`);
  if (errors.length > 0) {
    console.log(`   Failed: ${errors.join(", ")}`);
    process.exit(1);
  }
}

main();
