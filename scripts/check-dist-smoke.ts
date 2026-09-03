import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  checkRenderedSnapshots,
  DIST_DIR,
  logResult,
} from "./check-dist-snapshots";
import { checkOgGolden } from "./check-og-golden";

const AGENT_SKILLS_INDEX_PATH = ".well-known/agent-skills/index.json";

const REQUIRED_FILES = [
  "index.html",
  "product/kitaru.html",
  "product/kitaru.md",
  "product/zenml.html",
  "compare.html",
  "blog.html",
  "llmops-database.html",
  "mlops-database.html",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "_headers",
  "_redirects",
  ".assetsignore",
  "robots.txt",
  "llms.txt",
  AGENT_SKILLS_INDEX_PATH,
  "blog/search-index.json",
  "pagefind/pagefind.js",
  "pagefind/pagefind-entry.json",
];

const REQUIRED_DIRECTORIES = ["pagefind", "pagefind/index"];

type SearchIndexEntry = Record<string, unknown>;

type AgentSkillEntry = {
  name: string;
  type: "skill-md";
  description: string;
  url: string;
  digest: string;
};

type AgentSkillsIndex = {
  $schema: string;
  skills: unknown[];
};

const AGENT_SKILLS_SCHEMA =
  "https://schemas.agentskills.io/discovery/0.2.0/schema.json";
const AGENT_SKILL_DIGEST_PATTERN = /^sha256:[a-f0-9]{64}$/;
const AGENT_SKILL_URL_PATTERN =
  /^https:\/\/raw\.githubusercontent\.com\/zenml-io\/(skills|kitaru-skills)\/[a-f0-9]{40}\/.+\/SKILL\.md$/;
const REQUIRED_ZENML_SKILLS = [
  "airflow-to-zenml-migration",
  "argo-to-zenml-migration",
  "azureml-to-zenml-migration",
  "dagster-to-zenml-migration",
  "databricks-to-zenml-migration",
  "flyte-to-zenml-migration",
  "kedro-to-zenml-migration",
  "metaflow-to-zenml-migration",
  "prefect-to-zenml-migration",
  "sagemaker-to-zenml-migration",
  "vertexai-to-zenml-migration",
  "zenml-pipeline-authoring",
  "zenml-quick-wins",
  "zenml-scoping",
];

const REQUIRED_KITARU_SKILLS = [
  "kitaru-authoring",
  "kitaru-claude-agent-sdk-migration",
  "kitaru-gemini-interactions-migration",
  "kitaru-langgraph-migration",
  "kitaru-openai-agents-migration",
  "kitaru-pydantic-ai-migration",
  "kitaru-quickstart",
  "kitaru-replay-lab",
  "kitaru-scoping",
];

function distPath(relativePath: string) {
  return join(DIST_DIR, relativePath);
}

function fileExists(relativePath: string) {
  const path = distPath(relativePath);
  return existsSync(path) && statSync(path).isFile();
}

function nonEmptyDirectoryExists(relativePath: string) {
  const path = distPath(relativePath);

  if (!existsSync(path) || !statSync(path).isDirectory()) {
    return false;
  }

  return readdirSync(path).length > 0;
}

function readDistFile(relativePath: string) {
  return readFileSync(distPath(relativePath), "utf-8");
}

function checkRequiredFiles() {
  let failures = 0;

  for (const file of REQUIRED_FILES) {
    const ok = fileExists(file);
    logResult(ok, ok ? file : `Missing required file: ${distPath(file)}`);
    if (!ok) {
      failures += 1;
    }
  }

  return failures;
}

function checkRequiredDirectories() {
  let failures = 0;

  for (const directory of REQUIRED_DIRECTORIES) {
    const ok = nonEmptyDirectoryExists(directory);
    logResult(
      ok,
      ok
        ? directory
        : `Missing or empty required directory: ${distPath(directory)}`,
    );
    if (!ok) {
      failures += 1;
    }
  }

  return failures;
}

type ContentMarkerCheck = {
  file: string;
  markers: string[];
  message: string;
};

const CONTENT_MARKER_CHECKS: ContentMarkerCheck[] = [
  {
    file: "index.html",
    markers: ["<html"],
    message: "dist/index.html contains an HTML document marker",
  },
  {
    file: "product/kitaru.html",
    markers: [
      'data-app="kitaru"',
      'id="kitaru-main"',
      "kitaru session import ./traces.jsonl",
      // Prefix only: the experiment name after `start` is hero copy and may
      // change; the command itself proves the CLI showcase rendered.
      "kitaru experiment run start",
    ],
    message: "dist/product/kitaru.html contains current Kitaru code markers",
  },
  {
    file: "product/kitaru.md",
    markers: ["curl -fsSL https://kitaru.ai/install | bash"],
    message: "dist/product/kitaru.md contains the page-local install command",
  },
  {
    file: "product/zenml.html",
    markers: ["https://www.zenml.io/product/zenml", "Copy install command"],
    message: "dist/product/zenml.html contains ZenML product page markers",
  },
  {
    file: "sitemap-index.xml",
    markers: ["sitemap-0.xml"],
    message: "dist/sitemap-index.xml references sitemap-0.xml",
  },
  {
    file: "robots.txt",
    markers: ["https://www.zenml.io/sitemap-index.xml"],
    message: "dist/robots.txt references the sitemap index",
  },
  {
    file: "_redirects",
    markers: ["/sitemap.xml /sitemap-index.xml 301"],
    message: "dist/_redirects preserves the sitemap redirect",
  },
  {
    file: "_headers",
    markers: [
      "X-Content-Type-Options: nosniff",
      "Content-Security-Policy-Report-Only: default-src 'self'",
      "/product/zenml",
      '</product/zenml.md>; rel="alternate"; type="text/markdown"',
      "/product/kitaru",
      '</product/kitaru.md>; rel="alternate"; type="text/markdown"',
    ],
    message: "dist/_headers contains security and product markdown headers",
  },
];

function checkContentMarkers() {
  let failures = 0;

  for (const check of CONTENT_MARKER_CHECKS) {
    if (!fileExists(check.file)) {
      logResult(false, `Missing marker file: ${distPath(check.file)}`);
      failures += 1;
      continue;
    }

    const content = readDistFile(check.file);
    const missingMarkers = check.markers.filter(
      (marker) => !content.includes(marker),
    );
    const ok = missingMarkers.length === 0;
    logResult(
      ok,
      ok
        ? check.message
        : `${distPath(check.file)} is missing marker(s): ${missingMarkers.join(", ")}`,
    );
    if (!ok) {
      failures += missingMarkers.length;
    }
  }

  return failures;
}

function hasRequiredSearchIndexFields(entry: SearchIndexEntry) {
  return ["title", "slug", "excerpt", "date", "category"].every(
    (field) => typeof entry[field] === "string",
  );
}

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.length > 0;
}

function hasRequiredAgentSkillFields(entry: unknown): entry is AgentSkillEntry {
  if (typeof entry !== "object" || entry === null) {
    return false;
  }

  const skill = entry as Record<string, unknown>;
  return (
    isNonEmptyString(skill.name) &&
    skill.type === "skill-md" &&
    isNonEmptyString(skill.description) &&
    typeof skill.url === "string" &&
    AGENT_SKILL_URL_PATTERN.test(skill.url) &&
    typeof skill.digest === "string" &&
    AGENT_SKILL_DIGEST_PATTERN.test(skill.digest)
  );
}

function isAgentSkillsIndex(value: unknown): value is AgentSkillsIndex {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    candidate.$schema === AGENT_SKILLS_SCHEMA && Array.isArray(candidate.skills)
  );
}

function checkAgentSkillsIndex() {
  try {
    const parsed = JSON.parse(readDistFile(AGENT_SKILLS_INDEX_PATH)) as unknown;

    if (!isAgentSkillsIndex(parsed)) {
      logResult(
        false,
        `dist/${AGENT_SKILLS_INDEX_PATH} must contain the Agent Skills Discovery v0.2.0 schema URL and a skills array`,
      );
      return 1;
    }

    const skills = parsed.skills;
    const validSkills = skills.filter(hasRequiredAgentSkillFields);
    const invalidSkills = skills.filter(
      (skill) => !hasRequiredAgentSkillFields(skill),
    );
    const skillNames = validSkills.map((skill) => skill.name);
    const uniqueSkillNames = new Set(skillNames);
    const missingZenmlSkills = REQUIRED_ZENML_SKILLS.filter(
      (name) => !uniqueSkillNames.has(name),
    );
    const missingKitaruSkills = REQUIRED_KITARU_SKILLS.filter(
      (name) => !uniqueSkillNames.has(name),
    );
    const ok =
      skills.length > 0 &&
      uniqueSkillNames.size === skillNames.length &&
      invalidSkills.length === 0 &&
      missingZenmlSkills.length === 0 &&
      missingKitaruSkills.length === 0;

    logResult(
      ok,
      ok
        ? `dist/${AGENT_SKILLS_INDEX_PATH} is a valid Agent Skills Discovery index`
        : `dist/${AGENT_SKILLS_INDEX_PATH} must have non-empty unique skill-md entries with raw GitHub URLs, sha256 digests, and all required ZenML and Kitaru skills`,
    );

    if (!ok) {
      if (skills.length === 0) {
        logResult(false, "Agent skills index has no skills");
      }
      if (uniqueSkillNames.size !== skillNames.length) {
        logResult(false, "Agent skills index has duplicate skill names");
      }
      if (invalidSkills.length > 0) {
        logResult(
          false,
          `Agent skills index has invalid entries: ${invalidSkills
            .map((skill) =>
              typeof skill === "object" && skill !== null && "name" in skill
                ? String(skill.name)
                : "<unnamed>",
            )
            .join(", ")}`,
        );
      }
      if (missingZenmlSkills.length > 0) {
        logResult(
          false,
          `Agent skills index is missing ZenML skills: ${missingZenmlSkills.join(", ")}`,
        );
      }
      if (missingKitaruSkills.length > 0) {
        logResult(
          false,
          `Agent skills index is missing Kitaru skills: ${missingKitaruSkills.join(", ")}`,
        );
      }
    }

    return ok ? 0 : 1;
  } catch (error) {
    logResult(
      false,
      `Could not parse ${distPath(AGENT_SKILLS_INDEX_PATH)} as JSON: ${(error as Error).message}`,
    );
    return 1;
  }
}

function checkBlogSearchIndex() {
  const searchIndexPath = "blog/search-index.json";

  try {
    const parsed = JSON.parse(readDistFile(searchIndexPath)) as unknown;
    const ok =
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      hasRequiredSearchIndexFields(parsed[0] as SearchIndexEntry);

    logResult(
      ok,
      ok
        ? "dist/blog/search-index.json is a non-empty array with the expected entry fields"
        : "dist/blog/search-index.json must be a non-empty array whose first item has string title, slug, excerpt, date, and category fields",
    );

    return ok ? 0 : 1;
  } catch (error) {
    logResult(
      false,
      `Could not parse ${distPath(searchIndexPath)} as JSON: ${(error as Error).message}`,
    );
    return 1;
  }
}

/**
 * /blog must ship real server-rendered post cards. The BlogIndex island gets
 * its items as props (not via a client fetch) precisely so the crawlable
 * HTML of this high-volume SEO surface never depends on JavaScript or on
 * /blog/search-index.json loading — this assertion is the contract's guard:
 * blog.html must contain at least one anchor to a post slug that actually
 * exists in the search index.
 */
function checkBlogSsrCards() {
  try {
    const html = readDistFile("blog.html");
    const index = JSON.parse(
      readDistFile("blog/search-index.json"),
    ) as SearchIndexEntry[];
    const slugs = new Set(
      (Array.isArray(index) ? index : []).map((entry) => entry.slug),
    );

    const linked = [...html.matchAll(/href="\/blog\/([^"/?#]+)"/g)].some(
      ([, slug]) => slugs.has(slug),
    );

    logResult(
      linked,
      linked
        ? "dist/blog.html server-renders at least one real /blog/<slug> post link"
        : "dist/blog.html must contain a server-rendered link to a post slug present in blog/search-index.json — the BlogIndex island may have regressed to fetch-only rendering",
    );

    return linked ? 0 : 1;
  } catch (error) {
    logResult(
      false,
      `Could not check blog.html SSR cards: ${(error as Error).message}`,
    );
    return 1;
  }
}

/**
 * Every client:* Preact island, and the page(s) that are expected to mount it.
 *
 * This is the browser-free half of the hydration story. It proves an island is
 * still (a) mounted on the page that owns it and (b) pointing at a component
 * bundle that actually exists on disk. That catches the most likely regression:
 * an island quietly falling out of a page during an .astro refactor, or an
 * integration upgrade that stops emitting islands altogether.
 *
 * It cannot prove the island actually *runs* — an island can ship perfect markup
 * and still be inert. `pnpm check:islands` covers that in a real browser.
 *
 * This manifest is hand-written, so it could silently go stale — someone adds an
 * island, never adds it here, and both hydration checks pass while the new island
 * has zero coverage. That is the exact drift this feature exists to prevent, so
 * checkIslandMounts() also asserts the manifest is COMPLETE against the real source
 * of truth (src/components/islands/*.tsx). Adding an island without listing it in
 * the manifest below fails the build.
 */
const ISLANDS_DIR = "src/components/islands";
const KITARU_ISLANDS_DIR = "src/components/kitaru/islands";

/**
 * Modules in KITARU_ISLANDS_DIR that never mount as an <astro-island> of their
 * own — they are imported *by* the islands (shared primitives, icon sets, the
 * Reveal wrapper). Listed explicitly so the completeness check can demand
 * manifest coverage for every real island in that directory without
 * false-flagging these. Adding a helper module there means adding it here.
 */
const KITARU_ISLAND_HELPERS = new Set([
  "Reveal",
  "brand-icons",
  "code-tokens",
  "icons",
  "primitives",
]);

const ISLAND_MOUNTS: { island: string; pages: string[] }[] = [
  {
    island: "CookieConsent",
    pages: ["index.html", "pricing.html", "blog.html"],
  },
  {
    island: "FeatureTabsSlider",
    pages: ["index.html", "product/zenml.html"],
  },
  { island: "RoiCalculator", pages: ["roi-calculator.html"] },
  {
    island: "ContactForm",
    pages: [
      "signup-for-demo.html",
      "book-a-demo.html",
      "brick-manual.html",
      "startups-and-academics.html",
      "whitepaper-architecting-an-enterprise-grade-mlops-platform.html",
    ],
  },
  {
    island: "DemoRequestForm",
    pages: ["book-your-demo.html", "book-your-demo/kitaru.html"],
  },
  { island: "LlmopsIndex", pages: ["llmops-database.html"] },
  { island: "MlopsIndex", pages: ["mlops-database.html"] },
  { island: "IntegrationsIndex", pages: ["integrations.html"] },
  { island: "BlogIndex", pages: ["blog.html"] },
  { island: "ProTestimonialCarousel", pages: ["pro.html"] },
  // BlogSearch lives inside CategoryBar's hub/back-link modes, not its
  // breadcrumb mode — so it was never on blog.html specifically, but it WAS
  // reachable via CategoryBar there before the blog index migrated onto
  // FilterIndex and retired CategoryBar (#249). category/[slug].astro still
  // renders CategoryBar in back-link mode, so it's still covered.
  { island: "BlogSearch", pages: ["category/llmops.html"] },
  // The Kitaru landing sections (KitaruGrain doubles as a plain subcomponent
  // inside the other islands, but the static Cta.astro and the _HighlightPanel
  // shells rendered by Features.astro also mount it as its own island for
  // their shader backdrops).
  { island: "Hero", pages: ["product/kitaru.html"] },
  { island: "ScenarioStrip", pages: ["product/kitaru.html"] },
  { island: "TwoDoors", pages: ["product/kitaru.html"] },
  { island: "KitaruGrain", pages: ["product/kitaru.html"] },
];

/**
 * Fail if an island exists in src/ but is missing from ISLAND_MOUNTS. Without
 * this, adding an island and forgetting the manifest would leave it with zero
 * coverage in BOTH hydration checks, silently — which is precisely the drift
 * they exist to catch.
 *
 * The KITARU_ISLAND_HELPERS exclusion is guarded in the reverse direction
 * too: if a listed helper ever gains a `client:` mount (i.e. becomes a real
 * island), the check fails instead of silently excluding it forever.
 */
function findClientMountedHelpers(): string[] {
  const sources: string[] = [];

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(astro|tsx|mdx)$/.test(entry)) sources.push(path);
    }
  };
  walk("src");

  const contents = sources.map((path) => readFileSync(path, "utf8"));
  const mounted: string[] = [];

  for (const helper of KITARU_ISLAND_HELPERS) {
    // A helper module usually exports components under names unrelated to its
    // filename (primitives.tsx → CopyCommand, brand-icons.tsx → PydanticIcon,
    // …), so the guard must match on the export names, not the filename.
    const helperSource = readFileSync(
      join(KITARU_ISLANDS_DIR, `${helper}.tsx`),
      "utf8",
    );
    const exportNames = [
      ...helperSource.matchAll(/export (?:function|const) (\w+)/g),
    ].map((match) => match[1]);

    for (const name of exportNames) {
      // `[^>]*?` spans newlines, so multi-line mounts are caught too.
      const mountPattern = new RegExp(`<${name}\\b[^>]*?client:`, "s");
      if (contents.some((source) => mountPattern.test(source))) {
        mounted.push(`${helper} (as <${name}>)`);
        break;
      }
    }
  }

  return mounted;
}

function checkIslandManifestIsComplete() {
  let failures = 0;

  for (const helper of findClientMountedHelpers()) {
    logResult(
      false,
      `${helper} is in KITARU_ISLAND_HELPERS but is mounted with a client: directive — it is an island now; move it into ISLAND_MOUNTS`,
    );
    failures += 1;
  }

  const declared = new Set([...ISLAND_MOUNTS.map(({ island }) => island)]);

  const onDisk = [ISLANDS_DIR, KITARU_ISLANDS_DIR].flatMap((dir) =>
    readdirSync(dir)
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => ({ dir, island: file.replace(/\.tsx$/, "") }))
      .filter(
        ({ island }) =>
          dir !== KITARU_ISLANDS_DIR || !KITARU_ISLAND_HELPERS.has(island),
      ),
  );

  const undeclared = onDisk.filter(({ island }) => !declared.has(island));

  for (const { dir, island } of undeclared) {
    logResult(
      false,
      `${dir}/${island}.tsx is not in ISLAND_MOUNTS — add it with the page(s) it mounts on`,
    );
  }
  failures += undeclared.length;

  if (failures === 0) {
    logResult(
      true,
      `Manifest covers all ${onDisk.length} islands in ${ISLANDS_DIR} and ${KITARU_ISLANDS_DIR}`,
    );
  }
  return failures;
}

function checkIslandMounts() {
  let failures = checkIslandManifestIsComplete();

  for (const { island, pages } of ISLAND_MOUNTS) {
    // Bundle hashes change on every build, so match the stable name prefix. The
    // pattern depends only on the island, not the page.
    const mountPattern = new RegExp(
      `component-url="(/_astro/${island}\\.[^"]+\\.js)"`,
    );

    for (const page of pages) {
      if (!fileExists(page)) {
        logResult(false, `Missing island host page: ${distPath(page)}`);
        failures += 1;
        continue;
      }

      const match = readDistFile(page).match(mountPattern);

      if (!match) {
        logResult(
          false,
          `${distPath(page)} no longer mounts the ${island} island`,
        );
        failures += 1;
        continue;
      }

      const bundle = match[1].replace(/^\//, "");

      if (!fileExists(bundle)) {
        logResult(
          false,
          `${island} on ${page} points at a missing bundle: ${distPath(bundle)}`,
        );
        failures += 1;
        continue;
      }

      logResult(true, `${island} mounted on ${page}`);
    }
  }

  return failures;
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error(
      `ERROR: ${DIST_DIR}/ not found. Run pnpm build before pnpm smoke:dist.`,
    );
    process.exit(1);
  }

  let totalFailures = 0;

  console.log(`Checking generated site output in ${DIST_DIR}/`);
  console.log("---");

  console.log("\n1. Required files:");
  totalFailures += checkRequiredFiles();

  console.log("\n2. Required directories:");
  totalFailures += checkRequiredDirectories();

  console.log("\n3. Durable content markers:");
  totalFailures += checkContentMarkers();

  console.log("\n4. Blog search index shape:");
  totalFailures += checkBlogSearchIndex();

  console.log("\n5. Blog SSR post cards:");
  totalFailures += checkBlogSsrCards();

  console.log("\n6. Agent skills index shape:");
  totalFailures += checkAgentSkillsIndex();

  console.log("\n7. Island mounts:");
  totalFailures += checkIslandMounts();

  console.log("\n8. Rendered content snapshots:");
  totalFailures += checkRenderedSnapshots();

  console.log("\n9. Open Graph card golden:");
  totalFailures += await checkOgGolden();

  console.log("\n========== DIST SMOKE REPORT ==========");
  console.log(`Failures: ${totalFailures}`);
  console.log(totalFailures === 0 ? "✅ PASS" : "❌ FAIL");

  process.exit(totalFailures > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
