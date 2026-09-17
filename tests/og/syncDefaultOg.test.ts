import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { syncDefaultOg } from "../../scripts/og/sync-default-og";
import { missingDatabaseOgWarning } from "../../scripts/phase2/default-og-warning";
import type { OgCard } from "../../src/lib/ogCards";

const roots: string[] = [];
const card = (key: string): OgCard => ({
  key,
  title: "Authored title",
  subtitle: "Copy",
  eyebrow: "Page",
});
async function fixture(files: Record<string, string> = {}) {
  const root = await mkdtemp(join(tmpdir(), "og-sync-"));
  roots.push(root);
  for (const dir of [
    "src/content/llmops-database",
    "src/content/mlops-database",
    "src/content/case-studies",
    "src/content/projects",
    "src/pages",
    "src/lib",
    "src/data",
  ]) {
    await mkdir(join(root, dir), { recursive: true });
  }
  const contents = {
    "src/data/og-cards.json": JSON.stringify({
      llmops: ["existing"],
      mlops: [],
      pages: [],
    }),
    ...files,
  };
  for (const [file, content] of Object.entries(contents)) {
    await mkdir(dirname(join(root, file)), { recursive: true });
    await writeFile(join(root, file), content);
  }
  return root;
}
afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe("default OG sync", () => {
  it("reports missing cards across every family without rendering or changing the manifest", async () => {
    const root = await fixture({
      "src/content/llmops-database/existing.md": "---\ntitle: Existing\n---",
      "src/content/llmops-database/file.md":
        "---\ntitle: New\nslug: actual-slug\n---",
      "src/content/llmops-database/draft.md":
        "---\ntitle: Draft\ndraft: true\n---",
      "src/content/mlops-database/new.md": "---\ntitle: ML\n---",
      "src/pages/index.astro": "---\n---",
    });
    const before = await readFile(join(root, "src/data/og-cards.json"), "utf8");
    const log = vi.fn();
    const generate = vi.fn();
    expect(
      await syncDefaultOg({ root, cards: [card("home")], log, generate }),
    ).toBe(0);
    expect(log).toHaveBeenCalledWith("  llmops/actual-slug");
    expect(log).toHaveBeenCalledWith("  mlops/new");
    expect(log).toHaveBeenCalledWith("  pages/home");
    expect(log).not.toHaveBeenCalledWith("  llmops/existing");
    expect(log).not.toHaveBeenCalledWith("  llmops/draft");
    expect(generate).not.toHaveBeenCalled();
    expect(await readFile(join(root, "src/data/og-cards.json"), "utf8")).toBe(
      before,
    );
  });

  it("blocks all writes for missing authored case-study, project and static page keys", async () => {
    const root = await fixture({
      "src/content/case-studies/customer.md":
        "---\ntitle: Not card copy\nslug: customer-slug\n---",
      "src/content/projects/project.md": "---\ntitle: Project\n---",
      "src/pages/product/new.astro":
        '---\nconst image = defaultOgImage("pages", "product-new");\n---',
      "src/lib/new.ts": 'const image = defaultOgUrl("pages", "custom-key");',
      "src/pages/tags/[slug].astro": "---\n---",
    });
    const log = vi.fn();
    const generate = vi.fn();
    expect(
      await syncDefaultOg({ root, cards: [], write: true, log, generate }),
    ).toBe(1);
    for (const key of [
      "case-study-customer-slug",
      "project-project",
      "product-new",
      "custom-key",
    ]) {
      expect(log).toHaveBeenCalledWith(
        expect.stringContaining(`Missing OG_CARDS entry: ${key}.`),
      );
    }
    expect(generate).not.toHaveBeenCalled();
  });

  it("uses the existing missing-only generator only with explicit write", async () => {
    const root = await fixture();
    const generate = vi.fn().mockResolvedValue(undefined);
    expect(
      await syncDefaultOg({
        root,
        cards: [card("home")],
        write: true,
        generate,
        log: vi.fn(),
      }),
    ).toBe(0);
    expect(generate).toHaveBeenCalledExactlyOnceWith(["--missing", "--write"]);
  });

  it("succeeds without invoking the generator when nothing is missing", async () => {
    const root = await fixture({
      "src/data/og-cards.json": JSON.stringify({ pages: ["home"] }),
    });
    const generate = vi.fn();
    expect(
      await syncDefaultOg({
        root,
        cards: [card("home")],
        write: true,
        generate,
        log: vi.fn(),
      }),
    ).toBe(0);
    expect(generate).not.toHaveBeenCalled();
  });

  it("skips draft content and bespoke content images", async () => {
    const root = await fixture({
      "src/content/projects/custom.md":
        "---\nseo:\n  ogImage: https://example.com/custom.jpg\n---",
      "src/content/case-studies/draft.md": "---\ndraft: true\n---",
    });
    expect(await syncDefaultOg({ root, cards: [], log: vi.fn() })).toBe(0);
  });
});

describe("database OG warnings", () => {
  const manifest = { llmops: ["present"], mlops: [] };
  it.each(["llmops-database", "mlops-database"])(
    "names missing %s entries and the sync command",
    (collection) => {
      expect(
        missingDatabaseOgWarning(collection, "new-slug", false, manifest),
      ).toContain("new-slug");
      expect(
        missingDatabaseOgWarning(collection, "new-slug", false, manifest),
      ).toContain("pnpm og:sync --write");
    },
  );
  it("does not warn for covered, draft or unrelated entries", () => {
    expect(
      missingDatabaseOgWarning("llmops-database", "present", false, manifest),
    ).toBeUndefined();
    expect(
      missingDatabaseOgWarning("mlops-database", "draft", true, manifest),
    ).toBeUndefined();
    expect(
      missingDatabaseOgWarning("blog", "new", false, manifest),
    ).toBeUndefined();
  });
});
