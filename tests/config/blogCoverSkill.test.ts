import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

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
      if (layout.startsWith("Image")) expect(["Mesh", "Deep"]).toContain(bg);
      if (layout === "Text") expect(bg).not.toMatch(/Deep|Photo/);
      if (layout === "Full Bleed") expect(bg).toBe("Deep");
    }
    expect(plan("--layout", "Text", "--bg", "Deep").questions).not.toEqual([]);
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
