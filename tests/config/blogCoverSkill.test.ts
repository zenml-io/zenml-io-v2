import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  copyProblems,
  type Measured,
} from "../../.claude/skills/figma-blog-cover/scripts/lib/cover-renderer";

const SKILL = ".claude/skills/figma-blog-cover";
const SLUG = "unified-mlops-for-defense";
const STYLES = ["chevron", "deep", "field", "mesh", "tint"];
const PHOTOS = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

interface Plan {
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
    const { questions } = planFor(
      "there-is-no-best-model-for-your-agent",
      "--brand",
      "Kitaru",
      "--layout",
      "Image Left",
      "--bg",
      "Photo 08",
    );
    expect(questions.filter((q) => q.includes("is illegal"))).toEqual([]);
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
});
