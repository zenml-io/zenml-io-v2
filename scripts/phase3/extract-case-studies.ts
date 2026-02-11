/**
 * Extract case study content from Webflow HTML snapshots → .md files.
 *
 * Reads the 5 extracted HTML files + hub page + SEO baseline.json and generates
 * structured frontmatter .md files for the case-studies content collection.
 *
 * Case studies are body-driven: the narrative lives in the markdown body,
 * with structured frontmatter for hero, sidebar, and hub card chrome.
 *
 * Usage: pnpm exec tsx scripts/phase3/extract-case-studies.ts [--dry-run]
 */

import * as cheerio from "cheerio";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const HTML_DIR = join(ROOT, "design/webflow-export/extracted/case-study");
const HUB_HTML = join(ROOT, "design/webflow-export/extracted/case-studies.html");
const SEO_FILE = join(ROOT, "design/migration/phase1/runs/2026-02-11T0626Z/seo/baseline.json");
const OUTPUT_DIR = join(ROOT, "src/content/case-studies");
const DRY_RUN = process.argv.includes("--dry-run");

const WEBFLOW_CDN = "https://cdn.prod.website-files.com/64a817a2e7e2208272d1ce30";

const SLUGS = [
  "jetbrains",
  "adeo-leroy-merlin",
  "cross-screen-media",
  "brevo",
  "zuiver",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveImageUrl(src: string): string {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  // Relative paths like "../images/foo.png" or "images/foo.png"
  const filename = src.replace(/^\.\.\/images\//, "").replace(/^images\//, "");
  return `${WEBFLOW_CDN}/${filename}`;
}

function resolveInternalLink(href: string): string {
  if (!href) return href;
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return href;
  // Convert relative links: "../book-your-demo.html" → "/book-your-demo"
  let resolved = href.replace(/^\.\.\//, "/").replace(/^\.\//, "/");
  // Remove .html extension
  resolved = resolved.replace(/\.html$/, "");
  // Ensure leading slash
  if (!resolved.startsWith("/")) resolved = `/${resolved}`;
  return resolved;
}

function yamlString(s: string): string {
  if (!s) return '""';
  // Escape for YAML: use double quotes if it contains special chars
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
// Hub card data extraction
// ---------------------------------------------------------------------------

interface HubCard {
  order: number;
  cardTitle: string;
  logos: { url: string; alt: string }[];
}

function loadHubCards(): Map<string, HubCard> {
  const map = new Map<string, HubCard>();
  if (!existsSync(HUB_HTML)) {
    console.warn("⚠ Hub HTML not found, hub card data will be minimal");
    return map;
  }
  const html = readFileSync(HUB_HTML, "utf-8");
  const $ = cheerio.load(html);

  let order = 0;
  // Find all case study card links in the hub
  $(".uui-layout47_content").each((_i, el) => {
    order++;
    const $el = $(el);
    // Get the link to determine slug
    const linkEl = $el.find("a[href*='case-study/']").first();
    const href = linkEl.attr("href") || "";
    const slug = href.replace(/.*case-study\//, "").replace(/\.html$/, "");
    if (!slug) return;

    // Get card title
    const cardTitle = $el.find(".uui-heading-xsmall").first().text().trim().replace(/\s+/g, " ");

    // Get logos
    const logos: { url: string; alt: string }[] = [];
    $el.find(".uui-case-study-logo img").each((_j, img) => {
      const src = $(img).attr("src") || "";
      const alt = $(img).attr("alt") || "";
      if (src) logos.push({ url: resolveImageUrl(src), alt });
    });

    map.set(slug, { order, cardTitle, logos });
  });

  console.log(`✓ Extracted ${map.size} hub cards`);
  return map;
}

// ---------------------------------------------------------------------------
// Case study detail extraction
// ---------------------------------------------------------------------------

interface CaseStudyExtract {
  slug: string;
  title: string;
  hero: { logos: { url: string; alt: string }[] };
  sidebar: {
    company: string;
    website?: { label: string; href: string };
    mlTeamSize?: string;
    cloudProvider?: string;
    industry?: string;
    useCases: string[];
    pdfDownload?: { label: string; href: string };
  };
  hub: HubCard;
  seo: SeoEntry;
  bodyHtml: string;
}

function extractCaseStudy(
  slug: string,
  seoMap: Map<string, SeoEntry>,
  hubCards: Map<string, HubCard>,
): CaseStudyExtract {
  const htmlPath = join(HTML_DIR, `${slug}.html`);
  if (!existsSync(htmlPath)) throw new Error(`Missing HTML: ${htmlPath}`);

  const html = readFileSync(htmlPath, "utf-8");
  const $ = cheerio.load(html);

  // --- Title ---
  const rawTitle = $("h1.uui-heading-small.compact").first().text().trim().replace(/\s+/g, " ");
  const title = rawTitle || slug;

  // --- Hero logos ---
  const heroLogos: { url: string; alt: string }[] = [];
  $(".case-study-logo-container img").each((_i, img) => {
    const src = $(img).attr("src") || "";
    const alt = $(img).attr("alt") || "";
    if (src) heroLogos.push({ url: resolveImageUrl(src), alt });
  });

  // --- Sidebar ---
  const sidebarEl = $(".uui-case-study_content-left").first();
  const sidebar: CaseStudyExtract["sidebar"] = {
    company: "",
    useCases: [],
  };

  // PDF download (only some pages have this)
  const pdfLink = sidebarEl.find("a[target='_blank'] .text-block-7").first();
  if (pdfLink.length) {
    const pdfHref = pdfLink.closest("a").attr("href") || "";
    sidebar.pdfDownload = {
      label: pdfLink.text().trim(),
      href: resolveInternalLink(pdfHref),
    };
  }

  // Parse sidebar data blocks by heading
  sidebarEl.find(".uui-case-study_data").each((_i, dataBlock) => {
    const $block = $(dataBlock);
    const heading = $block.find(".uui-blogpost05_sidebar-heading").text().trim().replace(/\u00A0/g, " ").toLowerCase();

    if (heading === "company") {
      sidebar.company = $block.find(".uui-text-size-small.text-color-dark").text().trim();
    } else if (heading === "website") {
      const linkEl = $block.find("a.uui-text-color-primary, a.uui-text-size-small");
      if (linkEl.length) {
        sidebar.website = {
          label: linkEl.text().trim(),
          href: linkEl.attr("href") || "",
        };
      }
    } else if (heading === "ml team size") {
      sidebar.mlTeamSize = $block.find(".uui-text-size-small.text-color-dark").text().trim();
    } else if (heading === "cloud provider") {
      sidebar.cloudProvider = $block.find(".uui-text-size-small.text-color-dark").text().trim();
    } else if (heading === "industry") {
      sidebar.industry = $block.find(".uui-text-size-small.text-color-dark").text().trim();
    } else if (heading === "use cases") {
      $block.find(".uui-badge.is-primary").each((_j, badge) => {
        sidebar.useCases.push($(badge).text().trim());
      });
    }
  });

  // --- Body content ---
  const contentEl = $(".uui-blogpost05_content").first();
  let bodyHtml = "";
  if (contentEl.length) {
    // Process the content: rewrite image URLs and internal links
    contentEl.find("img").each((_i, img) => {
      const src = $(img).attr("src");
      if (src) $(img).attr("src", resolveImageUrl(src));
    });
    contentEl.find("a").each((_i, a) => {
      const href = $(a).attr("href");
      if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto:")) {
        $(a).attr("href", resolveInternalLink(href));
      }
    });
    bodyHtml = contentEl.html()?.trim() || "";
    // Clean up: remove empty paragraphs with just ‍ (zero-width joiner)
    bodyHtml = bodyHtml.replace(/<p>\s*‍?\s*<\/p>/g, "");
  }

  // --- SEO ---
  const seo = seoMap.get(`/case-study/${slug}`) || {};

  // --- Hub ---
  const hub = hubCards.get(slug) || {
    order: SLUGS.indexOf(slug) + 1,
    cardTitle: title,
    logos: heroLogos,
  };

  return { slug, title, hero: { logos: heroLogos }, sidebar, hub, seo, bodyHtml };
}

// ---------------------------------------------------------------------------
// Markdown generation
// ---------------------------------------------------------------------------

function toMarkdown(cs: CaseStudyExtract): string {
  const lines: string[] = ["---"];

  lines.push(`title: ${yamlString(cs.title)}`);
  lines.push(`slug: ${yamlString(cs.slug)}`);
  lines.push("draft: false");
  lines.push("");

  // Hub
  lines.push("hub:");
  lines.push(`  cardTitle: ${yamlString(cs.hub.cardTitle)}`);
  lines.push(`  order: ${cs.hub.order}`);
  if (cs.hub.logos.length) {
    lines.push("  logos:");
    for (const logo of cs.hub.logos) {
      lines.push(`    - url: ${yamlString(logo.url)}`);
      lines.push(`      alt: ${yamlString(logo.alt)}`);
    }
  }
  lines.push("");

  // Hero
  lines.push("hero:");
  if (cs.hero.logos.length) {
    lines.push("  logos:");
    for (const logo of cs.hero.logos) {
      lines.push(`    - url: ${yamlString(logo.url)}`);
      lines.push(`      alt: ${yamlString(logo.alt)}`);
    }
  }
  lines.push("");

  // Sidebar
  lines.push("sidebar:");
  lines.push(`  company: ${yamlString(cs.sidebar.company)}`);
  if (cs.sidebar.website) {
    lines.push("  website:");
    lines.push(`    label: ${yamlString(cs.sidebar.website.label)}`);
    lines.push(`    href: ${yamlString(cs.sidebar.website.href)}`);
  }
  if (cs.sidebar.mlTeamSize) {
    lines.push(`  mlTeamSize: ${yamlString(cs.sidebar.mlTeamSize)}`);
  }
  if (cs.sidebar.cloudProvider) {
    lines.push(`  cloudProvider: ${yamlString(cs.sidebar.cloudProvider)}`);
  }
  if (cs.sidebar.industry) {
    lines.push(`  industry: ${yamlString(cs.sidebar.industry)}`);
  }
  if (cs.sidebar.useCases.length) {
    lines.push("  useCases:");
    for (const uc of cs.sidebar.useCases) {
      lines.push(`    - ${yamlString(uc)}`);
    }
  }
  if (cs.sidebar.pdfDownload) {
    lines.push("  pdfDownload:");
    lines.push(`    label: ${yamlString(cs.sidebar.pdfDownload.label)}`);
    lines.push(`    href: ${yamlString(cs.sidebar.pdfDownload.href)}`);
  }
  lines.push("");

  // SEO
  if (cs.seo.title || cs.seo.metaDescription || cs.seo.ogTitle) {
    lines.push("seo:");
    if (cs.seo.title) lines.push(`  title: ${yamlString(cs.seo.title)}`);
    if (cs.seo.metaDescription) lines.push(`  description: ${yamlString(cs.seo.metaDescription)}`);
    if (cs.seo.ogTitle) lines.push(`  ogTitle: ${yamlString(cs.seo.ogTitle)}`);
    if (cs.seo.ogDescription) lines.push(`  ogDescription: ${yamlString(cs.seo.ogDescription)}`);
    if (cs.seo.ogImage) lines.push(`  ogImage: ${yamlString(cs.seo.ogImage)}`);
    lines.push("");
  }

  // Webflow metadata (synthetic)
  lines.push("webflow:");
  lines.push(`  siteId: "64a817a2e7e2208272d1ce30"`);
  lines.push(`  itemId: "static-page:case-study/${cs.slug}"`);
  lines.push(`  exportedAt: "2026-02-11T06:26:00.000Z"`);
  lines.push("  source: live");

  lines.push("---");
  lines.push("");

  // Body
  if (cs.bodyHtml) {
    lines.push(cs.bodyHtml);
    lines.push("");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log(`\n🔧 Extracting case study pages (${DRY_RUN ? "DRY RUN" : "WRITE"})...\n`);

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const seoMap = loadSeoData();
  const hubCards = loadHubCards();

  let success = 0;
  let errors = 0;

  for (const slug of SLUGS) {
    try {
      const cs = extractCaseStudy(slug, seoMap, hubCards);
      const md = toMarkdown(cs);
      const outPath = join(OUTPUT_DIR, `${slug}.md`);

      if (DRY_RUN) {
        console.log(`📝 [DRY] ${slug} — ${cs.title}`);
        console.log(`   Hero logos: ${cs.hero.logos.length}, Sidebar company: ${cs.sidebar.company}`);
        console.log(`   Body length: ${cs.bodyHtml.length} chars`);
        console.log(`   Hub card: order=${cs.hub.order}, title="${cs.hub.cardTitle}"`);
      } else {
        writeFileSync(outPath, md, "utf-8");
        console.log(`✅ ${slug} — ${cs.title} (${Math.round(md.length / 1024)}KB)`);
      }
      success++;
    } catch (err) {
      console.error(`❌ ${slug}: ${err}`);
      errors++;
    }
  }

  console.log(`\n📊 Done: ${success} extracted, ${errors} errors\n`);
}

main();
