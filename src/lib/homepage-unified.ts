/**
 * Copy for the *future* unified zenml.io homepage (Phase 9).
 *
 * This file is NOT WIRED into a route yet. The current homepage lives at
 * `/` and reads from `src/lib/homepage.ts`. This file is a copy doc you
 * can iterate on without breaking live traffic; once the copy lands,
 * the plan is to:
 *
 *   1. Move the current `/` content to `/product/zenml` (already exists
 *      as a baseline; can absorb the old hero + sections here).
 *   2. Rebuild `/` to consume this file.
 *
 * Hooks back to MERGE_PLAN.md Phase 9, D14, and Appendix A (Focus Lab
 * brand strategy — USP, value prop, elevator pitch).
 *
 * Style notes (intentional choices, push back if wrong):
 *   - Headline uses "unified layer" — matches the Variant C Paper
 *     artboard and reads cleaner against the "one platform, two
 *     workspaces" framing than Focus Lab's "single layer" draft.
 *   - Two-workspace explainer sits high (between hero and trust bar)
 *     because it's the structural thing that's new vs the old homepage.
 *     If a visitor leaves after seeing only Hero + this, they should
 *     understand that ZenML and Kitaru are sub-products under one
 *     product family.
 *   - "Open source, always" is its own promise card — Focus Lab framed
 *     this almost as a manifesto, so it deserves its own panel rather
 *     than being a single bullet under value props.
 */

import type { Surface } from "./analytics";

export const HOMEPAGE_UNIFIED_SEO = {
  title: "ZenML — The unified layer for ML and AI",
  description:
    "Open-source infrastructure for teams shipping ML pipelines and AI agents on their own stack. Modular, vendor-neutral, runs anywhere — always.",
  surface: "unified" satisfies Surface,
} as const;

/* ---------------------------------------------------------------------- */
/* Hero                                                                    */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_HERO = {
  headlinePrefix: "The unified layer for ",
  headlineAccent: "ML and AI",
  headlineSuffix: "",
  /**
   * Lead phrase + body. Focus Lab's USP language transposed into hero
   * copy. Keep it specific to "your stack" so the message lands for
   * the buyer who's worried about vendor lock-in.
   */
  subtitleLead: "Built for engineers, ready for enterprise.",
  subtitle:
    "ZenML is open source infrastructure for production ML/AI. Orchestrate training pipelines and durable AI agents on the tools, clouds, and environments you already use — without rewriting your stack.",
  primaryCta: { label: "Get started", href: "/get-started" },
  secondaryCta: { label: "Book a demo", href: "/book-your-demo" },
} as const;

/* ---------------------------------------------------------------------- */
/* Announcement banner (Variant C — dark band above the nav)               */
/*   Thin ink band, Kitaru-amber NEW eyebrow, single line of body copy,    */
/*   underlined "Read the docs →" link. Lives only on the unified `/`      */
/*   surface; the site-wide AnnouncementBanner is unchanged.               */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_ANNOUNCEMENT = {
  eyebrow: "NEW",
  body: "Build an agent factory with Kitaru — our durable runtime for production AI agents.",
  linkText: "Read the docs",
  linkHref: "https://kitaru.ai/docs",
} as const;

/* ---------------------------------------------------------------------- */
/* Workspace widget — ElevenLabs-pattern tabbed demo                       */
/*   ZenML tab shows reproducible ML pipelines; Kitaru tab shows durable   */
/*   agent flows. The widget is the centerpiece of the unified `/`.        */
/* ---------------------------------------------------------------------- */

/**
 * Each subtab declares its `layout` (list-code | cards-grid | timeline) plus
 * the data fields that layout consumes. Three reusable layouts cover the
 * 10 subtab views so we get variety without writing 10 bespoke templates.
 *
 * - list-code  → Pipelines, Flows. The original "definition + recent runs"
 *                view. Selected row gets a play button (execution affordance).
 * - cards-grid → Artifacts, Models, Integrations × 2, Deployments. A 5-card
 *                grid showing items with type glyphs and small status tags.
 * - timeline   → Stacks, Checkpoints, Replay. Vertical step view — natural
 *                for "layered composition" (Stacks) and "execution trace"
 *                (Checkpoints, Replay).
 *
 * Real data sources:
 *   - ZenML rows/code: src/content/integrations/, src/content/case-studies/,
 *     src/content/blog/, official ZenML quickstart conventions
 *   - Kitaru rows/code: src/components/kitaru/CodeShowcase.astro (canonical),
 *     Architecture.astro, OneImport.astro, Deploy.astro, blog/kitaru-launch.md
 */
export const HOMEPAGE_UNIFIED_WIDGET = {
  tabs: [
    {
      id: "zenml" as const,
      label: "ML",
      sublabel: "ZenML",
      subtabs: [
        {
          id: "pipelines" as const,
          label: "Pipelines",
          layout: "pipelines" as const,
          surfaceTitle: "Pipelines",
          surfaceSubtitle:
            "Reproducible ML pipelines, from your laptop to production.",
          title: "Recent pipelines",
          subheader: "Last 24h · 5 runs",
          countLabel: "200 total",
          rows: [
            { initial: "C", status: "success" as const, name: "churn_training", meta: "4m 12s", target: "Kubernetes", selected: true },
            { initial: "F", status: "success" as const, name: "fraud_detection", meta: "11m 04s", target: "Kubeflow" },
            { initial: "S", status: "success" as const, name: "sentiment_classifier", meta: "47m 21s", target: "Vertex AI" },
            { initial: "I", status: "failed" as const, name: "image_segmentation", meta: "4m 18s", target: "SageMaker" },
            { initial: "R", status: "success" as const, name: "recsys_nightly", meta: "3h 12m", target: "Airflow" },
          ],
          fileName: "churn_training.py",
          rightSubhead: "Same code. Local, Kubernetes, or Vertex.",
          steps: [
            { name: "load_data", duration: "7s" },
            { name: "train_model", duration: "4m 5s" },
          ] as const,
          inputs: [
            { name: "features", type: "ndarray" },
            { name: "labels", type: "ndarray" },
          ] as const,
          output: { name: "churn_predictor", type: "sklearn · v18" },
        },
        {
          id: "artifacts" as const,
          label: "Artifacts",
          layout: "artifact-detail" as const,
          surfaceTitle: "Artifacts",
          surfaceSubtitle: "Versioned data, models, and metrics from every run",
          listFooter: "Browse all artifacts",
          versionsCount: 4,
          versions: [
            { index: 4, hash: "c5160dd0", timestamp: "Feb 15, 2024 · 14:02" },
            { index: 3, hash: "bcbdd201", timestamp: "Feb 15, 2024 · 12:14", selected: true },
            { index: 2, hash: "0db5aae1", timestamp: "Feb 12, 2024 · 18:05" },
            { index: 1, hash: "b2acb7fd", timestamp: "Feb 12, 2024 · 17:12" },
          ],
          chartTitle: "Value distribution",
          chartSubtitle: "Bimodal · 47,392 samples · range 0.00 – 1.00",
          chartFile: "describe.csv",
          chartFileMeta: "2,077 bytes · numpy.float64",
          mean: "0.538",
          std: "0.502",
          minLabel: "0.000",
          maxLabel: "1.000",
          evolutionPoints: [
            { v: 1, label: "v1" },
            { v: 2, label: "v2" },
            { v: 3, label: "v3", active: true },
            { v: 4, label: "v4" },
          ],
          evolutionNote: "μ shifted +0.04 since v1",
          metaFields: [
            { label: "dtype", value: "numpy.float64" },
            { label: "max", value: "0.9999052286148071" },
            { label: "mean", value: "0.5384075400091076", highlight: true },
            { label: "min", value: "0.0003337458474561572" },
            { label: "std", value: "0.5017927221865839" },
            { label: "storage_size", value: "2,077 B" },
            { label: "shape", value: "[47392, 1]" },
          ],
          lineageStep: "predict_on_endpoint",
          lineageDetail: "Produced by step `predict_on_endpoint`.",
        },
        {
          id: "stacks" as const,
          label: "Stacks",
          layout: "stacks-table" as const,
          surfaceTitle: "Stacks",
          surfaceSubtitle: "Swap orchestrator, store, tracker — same pipeline code.",
          /** Sidecar header copy for the left panel. */
          title: "Registered stacks",
          subtitle: "12 stacks · one pipeline definition.",
          countLabel: "12 total",
          columns: ["Stack", "Orchestrator", "Store", "Tracker", "Registry"] as const,
          rows: [
            { initial: "L", name: "local-dev", orchestrator: "default", store: "local", tracker: "—", registry: "—" },
            { initial: "K", name: "kubernetes-prod", orchestrator: "kubeflow", store: "s3", tracker: "mlflow", registry: "mlflow", selected: true },
            { initial: "V", name: "vertex-gcp", orchestrator: "vertex", store: "gcs", tracker: "neptune", registry: "vertex" },
            { initial: "S", name: "sagemaker-aws", orchestrator: "sagemaker", store: "s3", tracker: "w&b", registry: "sagemaker" },
          ],
          cliLabel: "Switch active stack",
          cliCommand: "$ zenml stack set kubernetes-prod",
          /** Code panel matches the Pipelines subtab so the right-hand
              column reads as identical to /pipelines — the point of the
              Stacks story being "same code, different stack." */
          codeTitle: "Pipeline definition",
          codeFile: "breast_cancer_classifier.py",
          code: [
            "import pandas as pd",
            "from zenml import pipeline, step",
            "from sklearn.ensemble import RandomForestClassifier",
            "",
            "@step",
            "def load_data() -> pd.DataFrame:",
            "    return pd.read_csv(\"data/breast_cancer.csv\")",
            "",
            "@step(enable_cache=True)",
            "def train(df: pd.DataFrame) -> RandomForestClassifier:",
            "    return RandomForestClassifier().fit(df.drop(\"y\", axis=1), df.y)",
            "",
            "@pipeline",
            "def breast_cancer_classifier():",
            "    train(load_data())",
          ].join("\n"),
          footerMeta: "Pipeline code is stack-agnostic · zero changes when you switch",
        },
        {
          id: "models" as const,
          label: "Models",
          layout: "models" as const,
          surfaceTitle: "Models",
          surfaceSubtitle: "One registry. Every environment your models run in.",
          title: "Registered models",
          subheader: "7 active · across 3 envs",
          countLabel: "42 total",
          rows: [
            { initial: "C", initialTone: "purple" as const, name: "churn_predictor", meta: "v18 · sklearn · 2.4 MB", envTag: "PROD" as const, selected: true },
            { initial: "F", initialTone: "purple" as const, name: "fraud_scorer", meta: "v32 · xgboost · 8.1 MB", envTag: "STAGE" as const },
            { initial: "S", initialTone: "purple-300" as const, name: "sentiment_v2", meta: "v07 · transformers · 412 MB", envTag: "STAGE" as const },
            { initial: "R", initialTone: "dark" as const, name: "recsys_recall", meta: "v44 · lightgbm · 14 MB", envTag: "DEV" as const },
            { initial: "A", initialTone: "purple-300" as const, name: "churn_v17_archive", meta: "v17 · sklearn · archived", envTag: "ARCH" as const },
          ],
          modelName: "churn_predictor",
          versionBadge: "v18 of 18",
          modelMeta: "sha · 6c5e0a14 · sklearn 1.4 · 2.4 MB",
          evolutionEyebrow: "Version evolution",
          evolutionSubhead: "18 versions · accuracy +4.2pt since v1",
          envStripEyebrow: "Where it runs · across environments",
          envStripSubhead: "3 envs · 4 endpoints",
          envs: [
            { label: "PROD" as const, version: "v18", detail: "vertex · 99.97% uptime", tone: "dark" as const, dot: "success" as const },
            { label: "STAGE" as const, version: "v18", detail: "k8s · shadow traffic", tone: "white" as const, dot: "warning" as const },
            { label: "CANARY" as const, version: "v18·rc2", detail: "vertex · 5% rollout", tone: "purple-tint" as const, dot: "zenml" as const },
          ],
          footerMeta: "Registry: 42 models · last promoted 3h ago",
        },
        {
          id: "integrations" as const,
          label: "Integrations",
          layout: "integrations-ml" as const,
          surfaceTitle: "Integrations",
          surfaceSubtitle: "Plug in any orchestrator, store, tracker, or alerter.",
          title: "Installed",
          subheader: "5 active",
          countLabel: "60+ available",
          rows: [
            { initial: "G", tone: "purple" as const, name: "Google Cloud", meta: "orchestrator · store · registry", selected: true },
            { initial: "A", tone: "neutral" as const, name: "AWS", meta: "store · secrets · image registry" },
            { initial: "M", tone: "neutral" as const, name: "MLflow", meta: "experiment tracker" },
            { initial: "S", tone: "neutral" as const, name: "Slack", meta: "alerter · run notifications" },
            { initial: "W", tone: "neutral" as const, name: "Weights & Biases", meta: "experiment tracker · sweeps" },
          ],
          rightEyebrow: "Fits the stack you already have.",
          rightSubhead: "60+ integrations. Bring your own; we'll meet them.",
          satellites: [
            { initial: "G", initialColor: "#4285f4", name: "Google Cloud", left: "50%", top: "40px", selected: true },
            { initial: "A", initialColor: "#ff9900", name: "AWS", left: "65%", top: "100px" },
            { initial: "S", initialColor: "#569a31", name: "S3 · GCS", left: "70%", top: "230px" },
            { initial: "M", initialColor: "#0194e2", name: "MLflow", left: "50%", top: "320px" },
            { initial: "S", initialColor: "#4a154b", name: "Slack", left: "30%", top: "230px" },
            { initial: "W", initialColor: "#ffbe00", name: "W&B", left: "35%", top: "100px" },
          ],
        },
      ],
    },
    {
      id: "kitaru" as const,
      label: "Agents",
      sublabel: "Kitaru",
      subtabs: [
        {
          id: "flows" as const,
          label: "Flows",
          layout: "flows" as const,
          surfaceTitle: "Flows",
          surfaceSubtitle: "Two decorators — wrap any agent, keep your inner loop",
          title: "Agent flows",
          subheader: "5 active · 12 paused",
          countLabel: "2 decorators · @flow + @checkpoint",
          rows: [
            { initial: "R", initialTone: "orange" as const, name: "report_agent", meta: "6 checkpoints · 2m 14s · ✓ running", selected: true },
            { initial: "L", initialTone: "dark" as const, name: "lead_qualifier", meta: "4 checkpoints · 38s · paused" },
            { initial: "D", initialTone: "yellow" as const, name: "doc_summarizer", meta: "3 checkpoints · 11m 19s" },
            { initial: "I", initialTone: "orange-faded" as const, name: "invoice_router", meta: "2 checkpoints · 6m 51s" },
            { initial: "O", initialTone: "dark" as const, name: "onboarding_bot", meta: "5 checkpoints · 2m 18s" },
          ],
          fileName: "report_agent.py",
          rightEyebrow: "Two decorators · that's the whole API",
          rightSubhead: "Wrap any agent. Keep your inner loop.",
          code: [
            "from kitaru import flow, checkpoint",
            "from openai import OpenAI",
            "",
            "@checkpoint",
            "def gather(topic):",
            "    return search(topic)",
            "",
            "@checkpoint",
            "def draft(notes):",
            "    return llm.write(notes)",
            "",
            "@flow",
            "def report_agent(topic):",
            "    notes = gather(topic)",
            "    return draft(notes)",
          ].join("\n"),
          flowNodes: [
            { kind: "flow" as const, name: "report_agent" },
            { kind: "checkpoint" as const, name: "gather", status: "running" as const },
            { kind: "checkpoint" as const, name: "draft", status: "done" as const },
          ],
        },
        {
          id: "checkpoints" as const,
          label: "Checkpoints",
          layout: "checkpoints" as const,
          surfaceTitle: "Checkpoints",
          surfaceSubtitle: "Resume from any checkpoint after a crash, rate-limit, or eviction.",
          title: "Recent runs",
          subheader: "Last 24h · 2 needed resume",
          countLabel: "312 total",
          rows: [
            {
              initial: "R", initialTone: "orange" as const, name: "report_agent", runId: "#a3f9",
              meta: "resumed from ckpt 4",
              statusPill: { label: "RESUMED", tone: "warning" as const },
              progress: { done: 6, total: 8 }, statusDot: "warning" as const, selected: true,
            },
            {
              initial: "D", initialTone: "dark" as const, name: "doc_summarizer", runId: "#b21c",
              meta: "completed",
              progress: { done: 9, total: 9 }, statusDot: "success" as const,
            },
            {
              initial: "I", initialTone: "yellow" as const, name: "invoice_router", runId: "#c0d4",
              meta: "waiting on human",
              progress: { done: 3, total: 5 }, statusDot: "warning" as const,
            },
            {
              initial: "L", initialTone: "orange" as const, name: "lead_qualifier", runId: "#d710",
              meta: "rate-limit · auto-resume",
              progress: { done: 4, total: 4 }, statusDot: "success" as const,
            },
          ],
          rightEyebrow: "Run trace · report_agent #a3f9",
          rightSubhead: "A crash, eviction, or rate-limit doesn't send the run back to zero.",
          recoveredPill: "RECOVERED · 11s",
          marks: [
            { kind: "done" as const, index: 1 },
            { kind: "done" as const, index: 2 },
            { kind: "done" as const, index: 3 },
            { kind: "failed" as const, label: "rate-limit", index: 4 },
            { kind: "resume" as const, label: "resume", index: 5 },
            { kind: "done" as const, index: 6 },
            { kind: "done" as const, index: 7 },
            { kind: "pending" as const, index: 8 },
          ],
          failureCard: {
            eyebrow: "CKPT 4 · FAILED",
            timestamp: "14:02:48",
            message: "openai 429 · rate limited",
            subtext: "last persisted state · classify(3) · 1.2 KB",
          },
          resumeCard: {
            eyebrow: "CKPT 5 · RESUMED",
            timestamp: "14:02:59",
            message: "Replayed from ckpt 4. No reruns of 1–3.",
            subtext: "recovered in 11s · saved 2m 03s · saved $0.42",
            cliPrefix: "$ kitaru replay report_agent",
            cliArgs: "--from-checkpoint 4 --run a3f9",
          },
          footerMeta: "ex_8a2f · 6 checkpoints · 38m 12s",
        },
        {
          id: "replay" as const,
          label: "Replay",
          layout: "replay" as const,
          surfaceTitle: "Replay",
          surfaceSubtitle: "Re-run frozen production traffic against a new prompt or model.",
          title: "Frozen packs",
          subheader: "Real production runs · replayable",
          countLabel: "8 packs",
          packs: [
            { name: "sept_prod_400", pillLabel: "REPLAYING", pillTone: "active" as const, summary: "400 runs · Sept 1–30 · prod", detail: "checkpointed · 142 MB · frozen", selected: true },
            { name: "friday_spike", pillLabel: "FROZEN", pillTone: "frozen" as const, summary: "120 runs · failed under load", detail: "checkpointed · 48 MB · frozen" },
            { name: "long_tail_50", pillLabel: "FROZEN", pillTone: "frozen" as const, summary: "50 runs · edge cases · curated", detail: "checkpointed · 22 MB · frozen" },
            { name: "last_quarter_top", pillLabel: "FROZEN", pillTone: "frozen" as const, summary: "1,200 runs · q3 customers", detail: "checkpointed · 380 MB · frozen" },
          ],
          subhead: "Rerun September traffic against v18·rc2 before promoting.",
          winsPill: "CANDIDATE WINS · 4 / 4",
          baseline: {
            eyebrow: "BASELINE", filename: "v17 · prompts/v17.yaml",
            model: "claude-3-opus", runs: "400 runs", cost: "$32.80", duration: "7m 21s",
          },
          candidate: {
            eyebrow: "CANDIDATE", filename: "v18·rc2 · prompts/v18·rc2.yaml",
            model: "claude-sonnet-4-6", runs: "same 400 runs", cost: "$21.60", duration: "4m 38s",
          },
          deltaChips: [
            { label: "cost", delta: "−34%", tone: "success" as const },
            { label: "duration", delta: "−37%", tone: "success" as const },
            { label: "tool calls", delta: "−44%", tone: "success" as const },
            { label: "completion", delta: "+8.7pt", tone: "success" as const },
          ],
          steps: [
            { name: "llm:outline", baseline: { dur: "1.8s", cost: "$0.012", tokens: "1.6K" }, candidate: { dur: "0.9s", cost: "$0.004", tokens: "1.4K" }, deltas: { dur: "−50%", cost: "−67%", tokens: "−13%" } },
            { name: "llm:write", baseline: { dur: "4.2s", cost: "$0.034", tokens: "4.2K" }, candidate: { dur: "2.4s", cost: "$0.018", tokens: "2.8K" }, deltas: { dur: "−43%", cost: "−47%", tokens: "−33%" } },
          ],
          verdictEyebrow: "DECISION · 400 runs",
          verdictHeadline: "Ship v18·rc2. The numbers picked.",
          promoteLabel: "Promote to PROD",
        },
        {
          id: "deployments" as const,
          label: "Deployments",
          layout: "deployments" as const,
          surfaceTitle: "Deployments",
          surfaceSubtitle: "One runtime. Your substrate.",
          title: "Deploy targets",
          subheader: "4 active · 99.97% uptime",
          countLabel: "$ kitaru deploy",
          rows: [
            { initial: "K", initialColor: "#326ce5", name: "kubernetes-prod", meta: "12 pods · eu-west-1 · auto-scale", statusLabel: "LIVE" as const, selected: true },
            { initial: "M", initialColor: "#7b3ef4", name: "modal-prod", meta: "serverless · cold-start 380ms", statusLabel: "LIVE" as const },
            { initial: "A", initialColor: "#ff9900", name: "aws-lambda", meta: "burst · us-east-1 · 4 fn", statusLabel: "LIVE" as const },
            { initial: "S", initialColor: "#0F0F12", name: "self-hosted", meta: "on-prem · air-gapped · 1 instance", statusLabel: "WARM" as const },
            { initial: "F", initialColor: "#7b3ef4", name: "fly-machines", meta: "preview · staged on PR", statusLabel: "IDLE" as const },
          ],
          rightEyebrow: "kubernetes-prod · 12 pods",
          inboundLabel: "INBOUND",
          inboundMeta: "408 rps",
          runtimePills: [
            "checkpoint · persist",
            "replay · resume",
            "wait · release compute",
            "fan-out · join",
          ],
          substrateName: "kubernetes-prod",
          substrateRegion: "eu-west-1",
          podsActive: 12,
          podsTotal: 16,
          footerMeta: "12 of 16 pods active · eu-west-1 · auto-scale",
        },
        {
          id: "integrations" as const,
          label: "Frameworks",
          layout: "integrations-agents" as const,
          surfaceTitle: "Frameworks",
          surfaceSubtitle: "Wrap any inner loop — keep your SDK; Kitaru owns what happens around it.",
          title: "Frameworks",
          subheader: "Anthropic · OpenAI · PydanticAI · LangGraph · custom",
          countLabel: "5 frameworks",
          rows: [
            { initial: "A", initialColor: "#d97706", name: "Anthropic SDK", meta: "claude-3.5-sonnet · tools · streaming", active: true, selected: true },
            { initial: "O", initialColor: "#0F0F12", name: "OpenAI SDK", meta: "gpt-4o · tools · assistants" },
            { initial: "P", initialColor: "#e11d48", name: "PydanticAI", meta: "type-safe agents · deps" },
            { initial: "L", initialColor: "#0284c7", name: "LangGraph", meta: "graph state · cycles · tools" },
            { initial: "+", initialColor: "#9ca3af", name: "Your custom loop", meta: "bring any Python control flow" },
          ],
          rightEyebrow: "Wrap once · swap the SDK underneath.",
          rightSubhead: "The model can own the loop. Kitaru owns what happens around it.",
          wrapEyebrow: "@flow report_agent",
          wrapMeta: "Kitaru wraps here",
          wrapRight: "",
          activeFrameworkName: "Anthropic SDK",
          activeFrameworkInitial: "A",
          activeFrameworkColor: "#d97706",
          code: [
            "from anthropic import Anthropic",
            "client = Anthropic()",
            "",
            "@checkpoint",
            "def think(prompt):",
            "    return client.messages.create(",
            "        model=\"claude-sonnet-4-6\",",
            "        messages=[{\"role\": \"user\",",
            "                   \"content\": prompt}],",
            "    ).content[0].text",
          ].join("\n"),
          swapChips: [
            { initial: "O", initialColor: "#0F0F12", name: "OpenAI SDK" },
            { initial: "P", initialColor: "#e11d48", name: "PydanticAI" },
            { initial: "L", initialColor: "#0284c7", name: "LangGraph" },
            { initial: "+", initialColor: "#9ca3af", name: "your custom loop", dashed: true },
          ],
        },
      ],
    },
  ],
} as const;

/* ---------------------------------------------------------------------- */
/* Two-workspace explainer                                                 */
/*   The load-bearing structural element of this rewrite. ZenML and        */
/*   Kitaru both surface at the top so visitors immediately understand     */
/*   the two-sub-product framing.                                          */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_WORKSPACES = {
  eyebrow: "Two workspaces, one platform",
  headline: "Pick your workload. Same infrastructure underneath.",
  items: [
    {
      name: "ZenML workspace",
      tagline: "ML pipelines",
      body: "Reproducible training, evaluation, batch inference, and deployment. Pipeline DAGs with typed step interfaces, versioned artifacts, and a composable stack abstraction.",
      bullets: [
        "Runs on Kubernetes, Vertex, SageMaker, AzureML, Airflow",
        "Artifact store + model registry + experiment tracker",
        "Local-to-remote without code changes",
      ],
      cta: { label: "Explore ZenML", href: "/product/zenml" },
    },
    {
      name: "Kitaru workspace",
      tagline: "AI agents",
      body: "Durable execution for long-running Python agents. Checkpoints, replay, and wait/resume — without rewriting your control flow.",
      bullets: [
        "Two decorators: @flow and @checkpoint",
        "Resume from any checkpoint after a crash or rate-limit",
        "MCP, CLI, and typed-client ops surfaces",
      ],
      cta: { label: "Explore Kitaru", href: "/product/kitaru" },
    },
  ],
  /** Subtle note under the cards — clarifies the commercial framing. */
  note: "Same plans, same control plane. Pro covers both workspaces.",
} as const;

/* ---------------------------------------------------------------------- */
/* Why this approach (Focus Lab value prop, broken into three cards)       */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_VALUES = {
  eyebrow: "What stays true across both workspaces",
  headline: "Own your infrastructure. Build it the way you want. Keep pace as you evolve.",
  items: [
    {
      name: "Your stack, your data",
      body: "Run in your VPC, point at your object store, train on your clusters. Metadata is the only thing ZenML touches — your artifacts, prompts, and code stay inside your infrastructure end-to-end.",
    },
    {
      name: "Modular, not monolithic",
      body: "Swap any component in your stack — orchestrator, artifact store, experiment tracker, model registry — without rewriting your pipelines or flows. Build with the tools you already trust.",
    },
    {
      name: "Open source, always",
      body: "Apache 2.0 from day one, with thousands of teams running it in production. Self-host forever. Adopt the managed control plane only when you need governance, SSO, and an SLA.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------- */
/* Pricing teaser                                                          */
/*   Replaces the homepage's old "what we cost is what we cost" implicit   */
/*   signal with an explicit, unified message.                             */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_PRICING_TEASER = {
  headline: "Unified pricing. Pick ML, Agent, or both.",
  body: "Same tiers across both workspaces, billed on executions (ZenML pipeline runs and Kitaru flow executions share one quota). Start on the open-source SDK; upgrade when you need the control plane.",
  primaryCta: { label: "See pricing", href: "/pricing" },
  secondaryCta: { label: "Compare OSS vs Pro", href: "/open-source-vs-pro" },
} as const;

/* ---------------------------------------------------------------------- */
/* Final CTA                                                               */
/* ---------------------------------------------------------------------- */

export const HOMEPAGE_UNIFIED_FINAL_CTA = {
  headline: "Pick your workspace and start shipping.",
  body: "Open source for as long as you want. Managed when you're ready.",
  primaryCta: { label: "Get started", href: "/get-started" },
  secondaryCta: { label: "Book a demo", href: "/book-your-demo" },
} as const;

/* ---------------------------------------------------------------------- */
/* Section order — proposed layout                                         */
/*                                                                         */
/*   1. Hero                                                               */
/*   2. Two-workspace explainer  (NEW — Phase 9 differentiator)            */
/*   3. LogoCloud                (reused from current homepage)            */
/*   4. Why this approach        (3 value cards, Focus Lab USP)            */
/*   5. CustomerStories          (reused from current homepage)            */
/*   6. FeatureTabs OR a new     (reused; pivots tabs to ML + Agent        */
/*      "what you can build"      examples instead of pure ML examples)     */
/*   7. Pricing teaser           (NEW)                                     */
/*   8. ComplianceSection        (reused — SOC2/etc, enterprise signal)    */
/*   9. NewsletterSignup         (reused — Brevo)                          */
/*  10. FAQAccordion             (reused; some items need Kitaru variants) */
/*  11. Final CTA                                                          */
/*                                                                         */
/* Removed vs current homepage:                                            */
/*   - NewsSection (low-signal; ships in /blog)                            */
/*   - WhitepaperCTA (replaced by pricing teaser)                          */
/*   - IntegrationsMarquee (moved to /product/zenml where it belongs)      */
/*                                                                         */
/* The current homepage Hero + ValueProps copy gets archived into          */
/* /product/zenml (or its components do, replacing the current             */
/* baseline). Nothing breaks during the swap because /product/zenml        */
/* already exists.                                                         */
/* ---------------------------------------------------------------------- */
