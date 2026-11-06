import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import { describe, expect, it } from "vitest";
import {
  copyProblems,
  type Measured,
} from "../../.claude/skills/figma-blog-cover/scripts/lib/cover-renderer";

import { vsHtml } from "../../.claude/skills/figma-blog-cover/scripts/lib/vs-card";

const SKILL = ".claude/skills/figma-blog-cover";
const SLUG = "unified-mlops-for-defense";
const STYLES = ["chevron", "deep", "field", "mesh", "tint"];
const PHOTOS = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

interface Plan {
  suggestions: string[];
  gate: unknown;
  logo: string;
  eyebrow: string;
  chosenLayout: string;
  chosenBg: string;
  layoutOptions: { layout: string; bg: string }[];
  showSubtitle: boolean;
  questions: string[];
}

function planFor(slug: string, ...flags: string[]): Plan {
  const run = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      join(SKILL, "scripts/find-slot.ts"),
      slug,
      "--renderer",
      "code",
      ...flags,
    ],
    {
      encoding: "utf8",
    },
  );
  return JSON.parse(run.stdout) as Plan;
}

const plan = (...flags: string[]): Plan => planFor(SLUG, ...flags);

describe("blog cover skill without Figma", () => {
  it("ships every background and logo", () => {
    const backgrounds = [
      ...["zenml", "kitaru"].flatMap((b) => STYLES.map((s) => `${b}-${s}`)),
      ...PHOTOS.map((n) => `photo-${n}`),
    ];
    for (const name of backgrounds)
      expect(
        existsSync(join(SKILL, "assets/backgrounds", `${name}.webp`)),
        name,
      ).toBe(true);
    for (const logo of ["zenml", "kitaru", "labs"]) {
      for (const tone of ["positive", "negative"])
        expect(
          existsSync(join(SKILL, "assets/logos", `${logo}-${tone}.svg`)),
          `${logo}-${tone}`,
        ).toBe(true);
    }
  });

  it("keeps one manifest row per cover", () => {
    const rows = JSON.parse(
      readFileSync(join(SKILL, "assets/cover-manifest.json"), "utf8"),
    ) as { slug: string }[];
    expect(new Set(rows.map((r) => r.slug)).size).toBe(rows.length);
  });

  it("plans a cover with no Figma account and no sibling data", () => {
    const p = plan();
    expect(p.gate).toBeNull();
    expect(p.questions).toEqual([]);
  });

  it("only offers legal background pairs", () => {
    for (const { layout, bg } of plan().layoutOptions) {
      if (layout.startsWith("Image")) expect(bg).toMatch(/^Photo/);
      if (layout === "Text") expect(bg).not.toMatch(/Deep|Photo/);
      if (layout === "Full Bleed") expect(bg).toBe("Deep");
    }
    expect(plan("--layout", "Text", "--bg", "Deep").questions).not.toEqual([]);
  });

  it("keeps photos off full covers", () => {
    expect(plan("--layout", "Text", "--bg", "Photo 03").questions).not.toEqual(
      [],
    );
    expect(
      plan("--layout", "Full Bleed", "--bg", "Photo 03").questions,
    ).not.toEqual([]);
  });

  it("keeps full backgrounds off layouts with an image area", () => {
    for (const layout of ["Image Left", "Image Right", "Panel Bottom"]) {
      expect(plan("--layout", layout).chosenBg).toMatch(/^Photo/);
      expect(plan("--layout", layout, "--bg", "Mesh").questions).not.toEqual(
        [],
      );
    }
  });

  it("keeps Photo 08 off Image Right", () => {
    const illegal = (layout: string): boolean =>
      planFor(
        "12-factors-of-reproducible-machine-learning-in-production",
        "--brand",
        "Kitaru",
        "--layout",
        layout,
        "--bg",
        "Photo 08",
      ).questions.some((q) => q.includes("is illegal with layout"));
    expect(illegal("Image Right")).toBe(true);
    expect(illegal("Image Left")).toBe(false);
  });

  it("rotates photos on half-half covers", () => {
    const siblings = JSON.stringify([
      {
        slug: "you-cant-pick-your-agents-next-model-from-a-diff",
        layout: "Image Right",
        bgStyle: "Photo 03",
      },
    ]);
    const { chosenBg } = planFor(
      "there-is-no-best-model-for-your-agent",
      "--layout",
      "Image Left",
      "--siblings",
      siblings,
    );
    expect(chosenBg).toMatch(/^Photo/);
    expect(chosenBg).not.toBe("Photo 03");
  });

  it("lets a month reuse a photo", () => {
    const siblings = JSON.stringify([
      {
        slug: "you-cant-pick-your-agents-next-model-from-a-diff",
        layout: "Image Right",
        bgStyle: "Photo 08",
      },
    ]);
    const { questions } = planFor(
      "there-is-no-best-model-for-your-agent",
      "--brand",
      "Kitaru",
      "--layout",
      "Image Left",
      "--bg",
      "Photo 08",
      "--siblings",
      siblings,
    );
    expect(questions.filter((q) => q.includes("is illegal"))).toEqual([]);
  });

  it("lets a long title repeat a neighbour's layout when nothing else holds it", () => {
    const siblings = JSON.stringify([
      {
        slug: "deep-learning-on-33-000-000-data-points-using-a-few-lines-of-yaml",
        layout: "Text",
        bgStyle: "Mesh",
      },
    ]);
    const slug =
      "predicting-the-winner-of-a-dota-2-match-using-distributed-deep-learning-pipelines";
    const { layoutOptions, questions } = planFor(slug, "--siblings", siblings);
    expect(questions).toEqual([]);
    expect(layoutOptions).toContainEqual(
      expect.objectContaining({ layout: "Text", repeatsNeighbour: true }),
    );
  });

  it("rejects copy that crowds or overflows its layout", () => {
    const fits: Measured = {
      titleLines: ["a b", "c d"],
      subtitleLines: ["e f"],
      gapAbove: 80,
      gapBelow: 80,
      orphan: false,
      overflow: false,
      wrap: "wrap",
    };
    expect(copyProblems("Panel Bottom", fits)).toEqual([]);
    expect(
      copyProblems("Panel Bottom", { ...fits, subtitleLines: ["e f", "g h"] }),
    ).not.toEqual([]);
    expect(
      copyProblems("Text", { ...fits, subtitleLines: ["e f", "g h"] }),
    ).toEqual([]);
    expect(copyProblems("Text", { ...fits, overflow: true })).not.toEqual([]);
    expect(copyProblems("Text", { ...fits, gapBelow: 10 })).not.toEqual([]);
  });

  it("records what was made, and nothing on a dry run", () => {
    const manifest = join(
      mkdtempSync(join(tmpdir(), "cover-")),
      "manifest.json",
    );
    copyFileSync(join(SKILL, "assets/cover-manifest.json"), manifest);
    const before = readFileSync(manifest, "utf8");
    const render = (...args: string[]) =>
      spawnSync(
        process.execPath,
        ["--import", "tsx", join(SKILL, "scripts/render-cover.ts"), ...args],
        {
          encoding: "utf8",
          env: { ...process.env, COVER_MANIFEST: manifest },
        },
      );
    const row = (slug: string) =>
      (JSON.parse(readFileSync(manifest, "utf8")) as { slug: string }[]).find(
        (r) => r.slug === slug,
      );

    expect(render(SLUG, "--record").status).toBe(2);
    expect(
      render(
        "databricks-alternatives",
        "--record",
        "--dry-run",
        "--comparison",
        "mlflow",
      ).status,
    ).toBe(0);
    expect(readFileSync(manifest, "utf8")).toBe(before);
    expect(
      render("databricks-alternatives", "--record", "--comparison", "mlflow")
        .status,
    ).toBe(0);
    expect(row("databricks-alternatives")).toEqual({
      slug: "databricks-alternatives",
      month: expect.any(String),
      layout: "VS",
    });
  });

  it.skipIf(!existsSync(chromium.executablePath()))(
    "measures overflow and writes nothing on a dry run in Chromium",
    () => {
      const manifest = join(
        mkdtempSync(join(tmpdir(), "cover-")),
        "manifest.json",
      );
      copyFileSync(join(SKILL, "assets/cover-manifest.json"), manifest);
      const before = readFileSync(manifest, "utf8");
      const render = (...args: string[]) =>
        spawnSync(
          process.execPath,
          [
            "--import",
            "tsx",
            join(SKILL, "scripts/render-cover.ts"),
            SLUG,
            "--dry-run",
            "--layout",
            "Text",
            "--bg",
            "Mesh",
            ...args,
          ],
          {
            encoding: "utf8",
            env: { ...process.env, COVER_MANIFEST: manifest },
          },
        );
      const png = join(".cache/covers", `${SLUG}.png`);
      rmSync(png, { force: true });

      expect(render("--title", "W".repeat(50), "--no-subtitle").status).toBe(1);
      const fits = render("--title", "A title that fits", "--no-subtitle");
      expect(fits.status).toBe(0);
      expect(JSON.parse(fits.stdout)).toMatchObject({
        png: null,
        layout: "Text",
      });
      expect(existsSync(png)).toBe(false);
      expect(readFileSync(manifest, "utf8")).toBe(before);
    },
  );

  it("gives the same answer on a re-run", () => {
    const { chosenLayout, chosenBg } = plan();
    expect(plan()).toMatchObject({ chosenLayout, chosenBg });
  });

  it("allows the Labs logo on ZenML covers only", () => {
    expect(plan("--logo", "ZenML Labs")).toMatchObject({
      logo: "ZenML Labs",
      questions: [],
    });
    expect(
      plan("--logo", "ZenML Labs", "--brand", "Kitaru").questions,
    ).not.toEqual([]);
  });

  it("never prints a subtitle that stops mid-sentence or repeats the title", () => {
    expect(
      planFor("why-deep-learning-development-in-production-is-still-broken")
        .showSubtitle,
    ).toBe(false);
    expect(
      plan("--subtitle", "Bridging Cloud, On-Premises, and Tactical Edge AI")
        .questions,
    ).not.toEqual([]);
  });

  it("takes the eyebrow from the flag", () => {
    expect(plan("--eyebrow", "deep dive").eyebrow).toBe("DEEP DIVE");
  });

  it("keeps every service logo on the 24 x 24 contract", () => {
    const dir = join(SKILL, "assets/service-logos");
    const files = readdirSync(dir);
    expect(files.length).toBeGreaterThan(200);
    for (const file of files) {
      const svg = readFileSync(join(dir, file), "utf8");
      expect(svg, file).toContain('viewBox="0 0 24 24"');
      expect(svg, file).not.toMatch(/<script|href="http/);
    }
  });

  it("resolves every reference inside a service logo", () => {
    const dir = join(SKILL, "assets/service-logos");
    for (const file of readdirSync(dir)) {
      const svg = readFileSync(join(dir, file), "utf8");
      const ids = new Set(
        [...svg.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]),
      );
      const refs = [
        ...svg.matchAll(/url\(#([^)]+)\)/g),
        ...svg.matchAll(/href="#([^"]+)"/g),
      ].map((m) => m[1]);
      expect(
        refs.filter((r) => !ids.has(r)),
        file,
      ).toEqual([]);
    }
  });

  it("draws every tile count with and without the brand tile", () => {
    const logos = Array.from({ length: 10 }, () => "langfuse");
    for (const includeBrandTile of [true, false]) {
      for (let count = 1; count <= 10; count += 1) {
        const html = vsHtml(
          {
            brand: "ZenML",
            includeBrandTile,
            logos: logos.slice(0, count),
            title: "T",
            qualifier: "Q",
          },
          [72, 60],
          "",
        );
        const tiles = html.match(/stroke-width="2"/g)?.length;
        const badges = html.match(/class="badge"/g)?.length ?? 0;
        const rows = count >= 5 ? 2 : 1;
        expect(tiles).toBe(count);
        expect(badges).toBe(includeBrandTile ? count : count - rows);
      }
    }
  });

  it("places tiles and logos in Figma's order", () => {
    const logos = [
      "langfuse",
      "mlflow",
      "wandb",
      "dbos",
      "restate",
      "n8n",
      "make",
    ];
    const html = vsHtml(
      {
        brand: "Kitaru",
        includeBrandTile: true,
        logos,
        title: "T",
        qualifier: "",
      },
      [72, 60],
      "",
    );
    const lefts = [
      ...html.matchAll(/style="left:([\d.]+)px;top:[\d.]+px" width="180"/g),
    ].map((m) => Number(m[1]));
    expect(lefts).toEqual([734, 1018, 1302, 1586, 876, 1160, 1444]);
    const drawn = [
      ...html.matchAll(
        /src="data:image\/svg\+xml;base64,([^"]+)" style="left:[\d.]+px;top:[\d.]+px;width:100px/g,
      ),
    ].map((m) => m[1]);
    expect(drawn).toEqual(
      logos.map((l) =>
        readFileSync(join(SKILL, "assets/service-logos", `${l}.svg`)).toString(
          "base64",
        ),
      ),
    );
  });

  it("checks a VS qualifier against the VS headline, not the post title", () => {
    const slug = "langsmith-alternatives";
    const flags = ["--renderer", "code", "--comparison", "langfuse,mlflow"];
    expect(
      planFor(slug, ...flags, "--subtitle", "LLM Observability").questions,
    ).toEqual([]);
    expect(
      planFor(
        slug,
        ...flags,
        "--subtitle",
        "LangSmith Alternatives",
      ).questions.join(),
    ).toContain("repeats the VS headline");
  });

  it("skips the VS repeat check when the for-line is not drawn", () => {
    const flags = [
      "--comparison",
      "langfuse,mlflow",
      "--title",
      "LLM Observability",
    ];
    const slug = "langsmith-alternatives";
    expect(
      planFor(slug, "--renderer", "code", ...flags, "--no-subtitle").questions,
    ).toEqual([]);
    expect(
      planFor(slug, "--renderer", "code", ...flags).questions.join(),
    ).toContain("repeats the VS headline");
  });

  it("only advises on a repeated VS for-line on the Figma route", () => {
    const { questions, suggestions } = planFor(
      "langsmith-alternatives",
      "--renderer",
      "figma",
      "--comparison",
      "langfuse,mlflow",
      "--title",
      "3 LangSmith Alternatives",
      "--subtitle",
      "3 LangSmith Alternatives",
    );
    expect(suggestions.join()).toContain("repeats the VS headline");
    expect(questions.join()).not.toContain("repeats the VS headline");
  });

  it("does not let neighbouring covers block a VS card", () => {
    const { orderedSlugs } = planFor(
      "everything-you-ever-wanted-to-know-about-llmops-maturity-models",
      "--renderer",
      "code",
    ) as Plan & { orderedSlugs: string[] };
    // Slot 7 in a five-column grid has a neighbour on all four sides.
    const i = 7;
    const slug = orderedSlugs[i];
    const layouts = ["Text", "Panel Bottom", "Image Right", "Image Left"];
    const around = [i - 1, i + 1, i - 5, i + 5].map((n) => orderedSlugs[n]);
    expect(around.every(Boolean)).toBe(true);
    const siblings = JSON.stringify(
      orderedSlugs
        .filter((s) => s !== slug)
        .map((s) => ({
          slug: s,
          layout: layouts[around.indexOf(s)] ?? "Text",
          bgStyle: "Tint",
        })),
    );
    const flags = ["--renderer", "code", "--siblings", siblings];
    expect(planFor(slug, ...flags).questions.join()).toContain("No layout");
    expect(
      planFor(slug, ...flags, "--comparison", "langfuse,mlflow").questions,
    ).toEqual([]);
  });

  it("asks for a logo the code route does not have", () => {
    const { questions } = planFor(
      SLUG,
      "--renderer",
      "code",
      "--comparison",
      "langfuse,not-a-real-tool",
    );
    expect(questions.join()).toContain("not-a-real-tool");
  });

  it("resolves aliases to the logo file on the code route", () => {
    const plan = planFor(
      SLUG,
      "--renderer",
      "code",
      "--comparison",
      "weave,langfuse",
    ) as Plan & { vs: { tiles: { logo: string }[] } };
    expect(plan.questions).toEqual([]);
    expect(plan.vs.tiles.map((t) => t.logo)).toEqual(["wandb", "langfuse"]);
  });

  it.skipIf(!existsSync(chromium.executablePath()))(
    "adapts VS copy to the space next to the logo",
    () => {
      const manifest = join(
        mkdtempSync(join(tmpdir(), "cover-")),
        "manifest.json",
      );
      copyFileSync(join(SKILL, "assets/cover-manifest.json"), manifest);
      const render = (...args: string[]) =>
        spawnSync(
          process.execPath,
          [
            "--import",
            "tsx",
            join(SKILL, "scripts/render-cover.ts"),
            SLUG,
            "--dry-run",
            "--comparison",
            "langfuse,mlflow",
            ...args,
          ],
          {
            encoding: "utf8",
            env: { ...process.env, COVER_MANIFEST: manifest },
          },
        );
      const out = (...args: string[]) => {
        const run = render(...args);
        expect(run.status, run.stderr).toBe(0);
        return JSON.parse(run.stdout);
      };
      const longLine =
        "Experiment Tracking and Model Registry for Regulated Teams";
      const longTitle = "Microsoft Agent Framework vs Semantic Kernel vs ZenML";

      expect(
        out("--title", "8 Comet Alternatives", "--subtitle", "Evaluation")
          .typeSizes,
      ).toEqual([72, 60]);
      expect(
        out(
          "--title",
          "A Short Title",
          "--subtitle",
          "Experiment Tracking and Model Registry Teams",
        ).typeSizes[0],
      ).toBeLessThan(72);
      expect(
        render(
          "--title",
          "8 Comet Alternatives",
          "--subtitle",
          longLine + longLine,
        ).status,
      ).toBe(1);
      const wrapped = out("--title", longTitle, "--no-subtitle");
      expect(wrapped.typeSizes).toEqual([56, 46]);
      expect(wrapped.suggestions.join()).toContain("two lines");
    },
    60_000,
  );

  it.skipIf(!existsSync(chromium.executablePath()))(
    "keeps every service logo the same size when rendered",
    async () => {
      const dir = join(SKILL, "assets/service-logos");
      const browser = await chromium.launch();
      const page = await browser.newPage();
      for (const file of readdirSync(dir)) {
        const uri = `data:image/svg+xml;base64,${readFileSync(join(dir, file)).toString("base64")}`;
        const box = await page.evaluate(async (src) => {
          const image = new Image();
          image.src = src;
          await image.decode();
          const canvas = document.createElement("canvas");
          canvas.width = canvas.height = 240;
          const context = canvas.getContext("2d") as CanvasRenderingContext2D;
          context.drawImage(image, 0, 0, 240, 240);
          const pixels = context.getImageData(0, 0, 240, 240).data;
          let left = 240;
          let right = -1;
          let top = 240;
          let bottom = -1;
          for (let y = 0; y < 240; y += 1) {
            for (let x = 0; x < 240; x += 1) {
              if (pixels[(y * 240 + x) * 4 + 3] <= 16) continue;
              left = Math.min(left, x);
              right = Math.max(right, x);
              top = Math.min(top, y);
              bottom = Math.max(bottom, y);
            }
          }
          return {
            w: (right - left + 1) / 10,
            h: (bottom - top + 1) / 10,
            cx: (left + right + 1) / 20,
            cy: (top + bottom + 1) / 20,
          };
        }, uri);
        expect(Math.abs(Math.max(box.w, box.h) - 20), file).toBeLessThanOrEqual(
          0.7,
        );
        expect(Math.abs(box.cx - 12), file).toBeLessThanOrEqual(0.5);
        expect(Math.abs(box.cy - 12), file).toBeLessThanOrEqual(0.5);
      }
      await browser.close();
    },
    60_000,
  );

  it.skipIf(!existsSync(chromium.executablePath()))(
    "writes a VS card and records it, dropping a derived for-line that cannot fit",
    () => {
      const dir = mkdtempSync(join(tmpdir(), "cover-"));
      const manifest = join(dir, "manifest.json");
      copyFileSync(join(SKILL, "assets/cover-manifest.json"), manifest);
      const render = (slug: string, ...args: string[]) => {
        const run = spawnSync(
          process.execPath,
          [
            "--import",
            "tsx",
            join(SKILL, "scripts/render-cover.ts"),
            slug,
            "--comparison",
            "langfuse,mlflow",
            ...args,
          ],
          {
            encoding: "utf8",
            env: {
              ...process.env,
              COVER_MANIFEST: manifest,
              COVER_OUT_DIR: dir,
            },
          },
        );
        expect(run.status, run.stderr).toBe(0);
        const file = readFileSync(join(dir, `${slug}.png`));
        expect([file.readUInt32BE(16), file.readUInt32BE(20)]).toEqual([
          3840, 2160,
        ]);
        const rows = JSON.parse(readFileSync(manifest, "utf8")) as {
          slug: string;
          layout: string;
        }[];
        expect(rows.find((r) => r.slug === slug)?.layout).toBe("VS");
        return JSON.parse(run.stdout);
      };
      try {
        render(
          "unified-mlops-for-defense",
          "--title",
          "8 Comet Alternatives",
          "--subtitle",
          "Evaluation",
        );
        const dropped = render(
          "8-alternatives-to-kubeflow-for-ml-workflow-orchestration-and-why-you-might-switch",
        );
        expect(dropped.forLine).toBe("");
        expect(dropped.suggestions.join()).toContain("Dropped");
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    },
    60_000,
  );
});
