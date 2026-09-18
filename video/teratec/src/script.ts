// Supplied Forum Teratec 2026 scene manifest; English, silent, 165 seconds.
import type { VideoScript } from "./types";

const suppliedScript: VideoScript = {
  meta: {
    title: "ZenML — Forum Teratec 2026 (institutional)",
    locale: "en",
    fps: 30,
    width: 1920,
    height: 1080,
    totalFrames: 4950, // 2 min 45 s — inside Infora's 2'30"–3'00" window
    loopSafe: true,
    silent: true,
  },

  scenes: [
    // ─── 1 ──────────────────────────────────────────────── 0 → 180 · 6.0s ───
    {
      id: "s01-logo-in",
      kind: "logo",
      label: "01 · Open — mark",
      durationInFrames: 180,
      theme: "dark",
      logo: "horizontal",
      entrance: "draw",
      tagline: {
        text: "Ship AI you can trust",
        style: "subhead",
        atFrame: 70,
      },
    },

    // ─── 2 ──────────────────────────────────────────────── 180 → 540 · 12s ───
    {
      id: "s02-hook",
      kind: "statement",
      label: "02 · Hook — the real problem",
      durationInFrames: 360,
      theme: "dark",
      covers: ["objectives"],
      rule: true,
      lines: [
        {
          text: "Training is the start",
          style: "headline",
          atFrame: 15,
        },
        {
          text: "Run AI on infrastructure you control",
          style: "headline",
          atFrame: 95,
          tone: "accent",
          emphasise: ["infrastructure you control"],
        },
      ],
    },

    // ─── 3 ──────────────────────────────────────────────── 540 → 900 · 12s ───
    {
      id: "s03-who",
      kind: "statement",
      label: "03 · Who we are",
      durationInFrames: 360,
      theme: "light",
      covers: ["location", "organisation"],
      lines: [
        { text: "Who we are", style: "kicker", atFrame: 10, tone: "muted" },
        {
          text: "An open-source company from Munich",
          style: "headline",
          atFrame: 30,
        },
        {
          text: "Founded by Adam Probst and Hamza Tahir. 15 people. Customers across Europe and North America.",
          style: "body",
          atFrame: 105,
          tone: "muted",
        },
      ],
    },

    // ─── 4 ─────────────────────────────────────────────── 900 → 1530 · 21s ───
    {
      id: "s04-pipeline",
      kind: "pipeline",
      label: "04 · What we do",
      durationInFrames: 630,
      theme: "light",
      covers: ["objectives", "perimeter"],
      heading: {
        text: "ZenML orchestrates AI on infrastructure you own",
        style: "subhead",
        atFrame: 10,
      },
      stages: [
        {
          label: "Code",
          detail: "Python · PyTorch · LangGraph",
          atFrame: 70,
          icon: "code",
        },
        {
          label: "ZenML pipeline",
          detail: "Versioned · reproducible · portable",
          atFrame: 150,
          icon: "pipeline",
        },
        {
          label: "Compute",
          detail: "Kubernetes · Slurm · cloud · on-prem",
          atFrame: 230,
          icon: "server",
        },
        {
          label: "Production",
          detail: "Models, pipelines and agents in production",
          atFrame: 310,
          icon: "check",
        },
      ],
      footer: {
        text: "One workflow definition. Any compute underneath",
        style: "subhead",
        atFrame: 410,
        tone: "accent",
      },
    },

    // ─── 5 ────────────────────────────────────────────── 1530 → 2220 · 23s ───
    {
      id: "s05-sovereignty",
      kind: "attributeGrid",
      label: "05 · Drivers — sovereignty and control",
      durationInFrames: 690,
      theme: "dark",
      covers: ["drivers", "perimeter", "location"],
      columns: 3,
      heading: {
        text: "Your data. Your infrastructure",
        style: "headline",
        atFrame: 15,
      },
      items: [
        {
          label: "Runs in your VPC",
          detail: "Data, artifacts and compute stay in your VPC",
          atFrame: 130,
          glyph: "lock",
        },
        {
          label: "Air-gapped deployment",
          detail: "No outbound connection",
          atFrame: 165,
          glyph: "shield",
        },
        {
          label: "Self-hosted",
          detail: "Or choose the managed control plane",
          atFrame: 200,
          glyph: "server",
        },
        {
          label: "SOC 2 Type II",
          detail: "Certified",
          atFrame: 265,
          glyph: "check",
        },
        {
          label: "ISO/IEC 27001",
          detail: "Certified",
          atFrame: 300,
          glyph: "check",
        },
        {
          label: "Apache 2.0",
          detail: "The core framework stays open source",
          atFrame: 335,
          glyph: "code",
        },
      ],
    },

    // ─── 6 ────────────────────────────────────────────── 2220 → 2610 · 13s ───
    {
      id: "s06-open-source",
      kind: "stats",
      label: "06 · Open source in the open",
      durationInFrames: 390,
      theme: "light",
      covers: ["organisation"],
      heading: {
        text: "Open source. Used in the open",
        style: "subhead",
        atFrame: 10,
      },
      stats: [
        {
          value: "5,600+",
          countFrom: 0,
          countTo: 5600,
          countFrames: 70,
          label: "GitHub stars · zenml-io/zenml",
          atFrame: 60,
        },
        {
          value: "2,900",
          countFrom: 0,
          countTo: 2900,
          countFrames: 70,
          label: "ZenML community engineers",
          atFrame: 95,
        },
        {
          value: "60+",
          countFrom: 0,
          countTo: 60,
          countFrames: 70,
          label: "AI ecosystem integrations",
          atFrame: 130,
        },
      ],
      source: {
        text: "CNCF Silver Member",
        style: "caption",
        atFrame: 240,
        tone: "muted",
      },
    },

    // ─── 7 ────────────────────────────────────────────── 2610 → 3180 · 19s ───
    {
      id: "s07-customers",
      kind: "logoWall",
      label: "07 · Customers",
      durationInFrames: 570,
      theme: "light",
      covers: ["customers"],
      heading: {
        text: "Trusted in production",
        style: "headline",
        atFrame: 10,
      },
      waves: [
        {
          atFrame: 70,
          logos: ["safran", "airbus-defence-and-space", "aecom", "rivian"],
        },
        {
          atFrame: 150,
          logos: [
            "axa",
            "vodafone",
            "ikea",
            "leroy-merlin",
            "adeo",
            "stepstone",
          ],
        },
        {
          atFrame: 230,
          logos: [
            "jetbrains",
            "brevo",
            "rohlik",
            "knuspr",
            "gema",
            "neara",
            "veridas",
            "maven-robotics",
          ],
        },
      ],
      footer: {
        text: "Aerospace · Insurance · Retail · Automotive · Developer tools",
        style: "caption",
        atFrame: 330,
        tone: "muted",
      },
    },

    // ─── 8 ────────────────────────────────────────────── 3180 → 3780 · 20s ───
    {
      id: "s08-results",
      kind: "comparison",
      label: "08 · Success — one platform team",
      durationInFrames: 600,
      theme: "dark",
      covers: ["success"],
      heading: {
        text: "Inside one platform team",
        style: "headline",
        atFrame: 15,
      },
      rows: [
        {
          metric: "Active users",
          before: "8",
          after: "44",
          atFrame: 110,
        },
        {
          metric: "Production pipelines",
          before: "3",
          after: "49",
          atFrame: 175,
        },
        {
          metric: "Monthly pipeline runs",
          before: "150",
          after: "2,765",
          atFrame: 240,
        },
      ],
      source: {
        text: "Published case study · zenml.io/case-study/jetbrains",
        style: "caption",
        atFrame: 360,
        tone: "muted",
      },
    },

    // ─── 9 ────────────────────────────────────────────── 3780 → 4110 · 11s ───
    {
      id: "s09-platform-stats",
      kind: "stats",
      label: "09 · Success — platform advantage",
      durationInFrames: 330,
      theme: "dark",
      covers: ["success"],
      stats: [
        { value: "78%", label: "faster time-to-market", atFrame: 30 },
        { value: "65%", label: "less engineering overhead", atFrame: 70 },
        { value: "3×", label: "more workflows in production", atFrame: 110 },
      ],
    },

    // ─── 10 ───────────────────────────────────────────── 4110 → 4590 · 16s ───
    {
      id: "s10-kitaru",
      kind: "statement",
      label: "10 · The horizon — Kitaru",
      durationInFrames: 480,
      theme: "kitaru",
      covers: ["objectives"],
      lines: [
        { text: "What's next", style: "kicker", atFrame: 10, tone: "muted" },
        {
          text: "Replay your agents on production data",
          style: "headline",
          atFrame: 35,
        },
        {
          text: "Catch regressions before release.",
          style: "body",
          atFrame: 130,
        },
        {
          text: "Open source · github.com/zenml-io/kitaru",
          style: "caption",
          atFrame: 280,
          tone: "muted",
        },
      ],
    },

    // ─── 11 ───────────────────────────────────────────── 4590 → 4950 · 12s ───
    {
      id: "s11-cta",
      kind: "cta",
      label: "11 · Close — come to the counter",
      durationInFrames: 360,
      theme: "dark",
      logo: "horizontal",
      lines: [
        { text: "Come and talk to us", style: "headline", atFrame: 20 },
        {
          text: "Find us at Safran's aeronautics application space, both days.",
          style: "body",
          atFrame: 95,
          tone: "muted",
        },
      ],
      standLine: "Forum Teratec · 20–21 October 2026 · Paris Convention Centre",
      url: "zenml.io",
    },
  ],
};

// Keep the restored visual treatment and remove 15 seconds of excess holds.
// Omit the unsourced platform statistics; retain the attributed case study.
const durations: Record<string, number> = {
  "s02-hook": 11 * 30,
  "s05-sovereignty": 20 * 30,
  "s07-customers": 16 * 30,
  "s08-results": 23 * 30,
};
export const script: VideoScript = {
  ...suppliedScript,
  meta: { ...suppliedScript.meta, totalFrames: 4500 },
  scenes: suppliedScript.scenes
    .filter(scene => scene.id !== "s09-platform-stats")
    .map(scene => ({ ...scene, durationInFrames: durations[scene.id] ?? scene.durationInFrames })),
};
export default script;
