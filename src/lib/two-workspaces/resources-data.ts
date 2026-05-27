/**
 * Data for the ResourcesLayout — TwoWorkspaces v2 · ZenML · artboard A3N.
 *
 * Transcribed verbatim from the Paper artboard "v2-Resources (ZenML — new)".
 * The selected pool is `production-gpu-pool` — all right-pane data reflects
 * that pool's live state at the snapshot shown in the artboard.
 */

// ── Load-status pills ──────────────────────────────────────────────────────

export type ResourcePoolStatus =
  | "HIGH LOAD" // orange bg #FFF4EC / border #FED7AA / text #C2410C
  | "queued" // amber  bg #FEF3C7 / border #FDE68A / text #92400E
  | "active" // green  bg #ECFDF3 / border #ABEFC6 / text #15803D  (with dot)
  | "idle"; // gray   bg #F2F4F7 / border #E4E7EC / text #667085

// ── Resource Pools (left pane) ─────────────────────────────────────────────

export type ResourcePool = {
  /** Single uppercase letter badge shown in the row icon. */
  letter: string;
  id: string;
  /** Row label — pool name. */
  name: string;
  /** Sub-line: GPUs/cores + utilization info (mono). */
  subtitle: string;
  status: ResourcePoolStatus;
  /** Whether the green animated dot is shown alongside the status label. */
  statusHasDot: boolean;
  /** Whether this is the currently selected pool (drives selected-row CSS). */
  selected: boolean;
};

export const RESOURCE_POOLS: ReadonlyArray<ResourcePool> = [
  {
    letter: "P",
    id: "production-gpu-pool",
    name: "production-gpu-pool",
    subtitle: "8 GPUs · 6 in use · 75%",
    status: "HIGH LOAD",
    statusHasDot: false,
    selected: true,
  },
  {
    letter: "T",
    id: "training-pool-a100",
    name: "training-pool-a100",
    subtitle: "4 GPUs · 4 in use · 2 queued",
    status: "queued",
    statusHasDot: false,
    selected: false,
  },
  {
    letter: "I",
    id: "inference-fleet",
    name: "inference-fleet",
    subtitle: "4 GPUs · 3 in use · 75%",
    status: "active",
    statusHasDot: true,
    selected: false,
  },
  {
    letter: "C",
    id: "cpu-pool-burst",
    name: "cpu-pool-burst",
    subtitle: "16 cores · 2 in use",
    status: "idle",
    statusHasDot: false,
    selected: false,
  },
  {
    letter: "D",
    id: "dev-shared",
    name: "dev-shared",
    subtitle: "2 GPUs · 0 in use",
    status: "idle",
    statusHasDot: false,
    selected: false,
  },
];

// ── Metric Tiles (right pane, selected pool) ───────────────────────────────

/**
 * Progress-bar fill color:
 *   "amber"  — #FB923C  (75% utilization)
 *   "red"    — #EF4444  (100% / critical)
 *   "purple" — #7F56D9  (moderate utilization)
 *   "green"  — #16A34A  (healthy / low)
 */
export type MetricBarColor = "amber" | "red" | "purple" | "green";

/**
 * Percentage-label color matches the bar color in the artboard:
 *   amber → #C2410C  (orange-700)
 *   red   → #B91C1C  (red-700)
 *   purple→ #7F56D9  (zenml-500 / purple)
 */
export type MetricTile = {
  label: string;
  value: string;
  denominator: string;
  percentage: string;
  percentageColorClass: string;
  barColor: MetricBarColor;
  barWidthPct: number;
};

export const METRIC_TILES: ReadonlyArray<MetricTile> = [
  {
    label: "GPUs",
    value: "6",
    denominator: "/ 8",
    percentage: "75%",
    percentageColorClass: "text-[#C2410C]",
    barColor: "amber",
    barWidthPct: 75,
  },
  {
    label: "CPU (Cores)",
    value: "18",
    denominator: "/ 24",
    percentage: "75%",
    percentageColorClass: "text-[#C2410C]",
    barColor: "amber",
    barWidthPct: 75,
  },
  {
    label: "Memory (GB)",
    value: "48",
    denominator: "/ 64",
    percentage: "75%",
    percentageColorClass: "text-[#C2410C]",
    barColor: "amber",
    barWidthPct: 75,
  },
  {
    label: "Parallel Pipelines",
    value: "21",
    denominator: "/ 21",
    percentage: "100%",
    percentageColorClass: "text-[#B91C1C]",
    barColor: "red",
    barWidthPct: 100,
  },
  {
    label: "Parallel Steps",
    value: "68",
    denominator: "/ 100",
    percentage: "68%",
    percentageColorClass: "text-zenml-500",
    barColor: "purple",
    barWidthPct: 68,
  },
  {
    label: "A100",
    value: "4",
    denominator: "/ 8",
    percentage: "50%",
    percentageColorClass: "text-zenml-500",
    barColor: "purple",
    barWidthPct: 50,
  },
];

// ── Active Jobs (right pane, selected pool) ────────────────────────────────

/**
 * Priority badge:
 *   CRITICAL → red   bg #FEF2F2 / border #FECACA / text #B91C1C
 *   HIGH     → orange bg #FFF4EC / border #FED7AA / text #C2410C
 *   MEDIUM   → amber  bg #FEF3C7 / border #FDE68A / text #92400E
 */
export type JobPriority = "CRITICAL" | "HIGH" | "MEDIUM";

export type ActiveJob = {
  stepId: string;
  /** Short hex pool-instance id shown below the step id (mono). */
  instanceId: string;
  /** Pipeline chip label, e.g. "pipeline_032 #0045" */
  pipelineLabel: string;
  /** Resource allocation string, e.g. "2 GPUs · 4 CPU · +1" */
  allocation: string;
  /** Elapsed time, e.g. "19s" */
  elapsed: string;
  priority: JobPriority;
};

export const ACTIVE_JOBS: ReadonlyArray<ActiveJob> = [
  {
    stepId: "step_032",
    instanceId: "1f42d62d",
    pipelineLabel: "pipeline_032 #0045",
    allocation: "2 GPUs · 4 CPU · +1",
    elapsed: "19s",
    priority: "CRITICAL",
  },
  {
    stepId: "step_033",
    instanceId: "4e7a34bc",
    pipelineLabel: "pipeline_032",
    allocation: "4 GPUs · 8 CPU · +1",
    elapsed: "45s",
    priority: "HIGH",
  },
  {
    stepId: "step_034",
    instanceId: "8c5e1abc",
    pipelineLabel: "pipeline_032",
    allocation: "1 GPU · 16 GB · +1",
    elapsed: "59s",
    priority: "MEDIUM",
  },
];

// ── Connections (footer strip, selected pool) ──────────────────────────────

export const CONNECTIONS: ReadonlyArray<string> = [
  "kubernetes",
  "docker",
  "aws_ec2",
  "google_cloud",
  "azure",
];

export const CONNECTIONS_ACTIVE_COUNT = 5;

// ── Selected pool header ───────────────────────────────────────────────────

export const SELECTED_POOL = {
  hexId: "1f42d62d",
  name: "production-gpu-pool",
  status: "HIGH LOAD" as const,
} as const;

// ── Left pane header ───────────────────────────────────────────────────────

export const LEFT_HEADER = {
  eyebrow: "RESOURCE POOLS",
  title: "Share GPUs across pipelines.",
  countLabel: "5 pools · 18 GPUs",
} as const;
