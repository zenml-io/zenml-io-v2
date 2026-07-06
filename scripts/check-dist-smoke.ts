import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST_DIR = "dist";
const AGENT_SKILLS_INDEX_PATH = ".well-known/agent-skills/index.json";

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
  AGENT_SKILLS_INDEX_PATH,
  "blog/search-index.json",
  "pagefind/pagefind.js",
  "pagefind/pagefind-entry.json",
];

const REQUIRED_DIRECTORIES = ["_worker.js", "pagefind", "pagefind/index"];

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
    markers: ['data-app="kitaru"', 'id="kitaru-main"'],
    message: "dist/product/kitaru.html contains Kitaru page identity markers",
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

  console.log("\n5. Agent skills index shape:");
  totalFailures += checkAgentSkillsIndex();

  console.log("\n========== DIST SMOKE REPORT ==========");
  console.log(`Failures: ${totalFailures}`);
  console.log(totalFailures === 0 ? "✅ PASS" : "❌ FAIL");

  process.exit(totalFailures > 0 ? 1 : 0);
}

main();
