import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST_DIR = "dist";

const REQUIRED_FILES = [
  "index.html",
  "product/kitaru.html",
  "product/zenml.html",
  "compare.html",
  "blog.html",
  "llmops-database.html",
  "mlops-database.html",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "_headers",
  "_redirects",
  "robots.txt",
  "llms.txt",
  "blog/search-index.json",
  "pagefind/pagefind.js",
  "pagefind/pagefind-entry.json",
];

const REQUIRED_DIRECTORIES = ["_worker.js", "pagefind", "pagefind/index"];

type SearchIndexEntry = Record<string, unknown>;

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

function logResult(ok: boolean, message: string) {
  console.log(`   ${ok ? "✅" : "❌"} ${message}`);
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

function checkContentMarkers() {
  const checks = [
    {
      file: "index.html",
      marker: "<html",
      message: "dist/index.html contains an HTML document marker",
    },
    {
      file: "sitemap-index.xml",
      marker: "sitemap-0.xml",
      message: "dist/sitemap-index.xml references sitemap-0.xml",
    },
    {
      file: "robots.txt",
      marker: "https://www.zenml.io/sitemap-index.xml",
      message: "dist/robots.txt references the sitemap index",
    },
    {
      file: "_redirects",
      marker: "/sitemap.xml /sitemap-index.xml 301",
      message: "dist/_redirects preserves the sitemap redirect",
    },
  ];

  let failures = 0;

  for (const check of checks) {
    if (!fileExists(check.file)) {
      logResult(false, `Missing marker file: ${distPath(check.file)}`);
      failures += 1;
      continue;
    }

    const content = readDistFile(check.file);
    const ok = content.includes(check.marker);
    logResult(
      ok,
      ok
        ? check.message
        : `${distPath(check.file)} is missing marker: ${check.marker}`,
    );
    if (!ok) {
      failures += 1;
    }
  }

  return failures;
}

function hasRequiredSearchIndexFields(entry: SearchIndexEntry) {
  return ["title", "slug", "excerpt", "date", "category"].every(
    (field) => typeof entry[field] === "string",
  );
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

function main() {
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

  console.log("\n========== DIST SMOKE REPORT ==========");
  console.log(`Failures: ${totalFailures}`);
  console.log(totalFailures === 0 ? "✅ PASS" : "❌ FAIL");

  process.exit(totalFailures > 0 ? 1 : 0);
}

main();
