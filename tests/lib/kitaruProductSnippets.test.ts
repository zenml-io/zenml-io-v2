import { describe, expect, it } from "vitest";
import { HERO_CODE_LINES } from "../../src/components/kitaru/islands/HeroVideo";
import { KITARU_INSTALL_CMD } from "../../src/lib/kitaru-landing";
import { KITARU_ADAPTERS, KITARU_IMPORTERS } from "../../src/lib/productKitaru";
import { GET as getKitaruMarkdown } from "../../src/pages/product/kitaru.md";

describe("Kitaru product-page snippets", () => {
  it("points at the one-line installer served by kitaru.ai", () => {
    expect(KITARU_INSTALL_CMD).toBe(
      "curl -fsSL https://zenml.io/install-kitaru | bash",
    );
  });

  it("uses the same page-local install command in the markdown alternate", async () => {
    const markdown = await getKitaruMarkdown().text();
    expect(
      markdown.match(/curl -fsSL https:\/\/zenml\.io\/install-kitaru \| bash/g),
    ).toHaveLength(1);
    expect(markdown).not.toContain("`uv add kitaru`");
    for (const tool of [...KITARU_IMPORTERS, ...KITARU_ADAPTERS]) {
      expect(markdown).toContain(tool);
    }
  });

  it("renders the complete current CLI workflow", () => {
    const hero = HERO_CODE_LINES.map((line) => line.text).join("\n");

    expect(hero).toMatchInlineSnapshot(`
      "# 1 · the traces you already have
      kitaru session import ./traces.jsonl

      # 2 · insights across every session
      --analyzer kitaru/post-import-insights

      # 3 · turn a finding into a check
      new evaluator · runs on every session

      # 4 · replay a fix
      kitaru experiment run start fix"
    `);
  });
});
