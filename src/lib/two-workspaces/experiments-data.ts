/**
 * Data for the Experiments subtab — TwoWorkspaces v2 · Kitaru.
 *
 * An experiment is pure configuration: model, system prompt, tool policy.
 * Swap one line and you have stated a different hypothesis. Nothing in an
 * experiment says what happened — that is a run, and a run is
 * config + cohort + version.
 *
 * Shape:
 *   - `EXPERIMENTS_LIST` — 3 left-pane rows (letter badge, name, subtitle,
 *     and a pill naming the one thing that experiment moves). First row is
 *     selected (cheap-model).
 *   - `CONFIG_KEYS`      — the three dimensions an experiment is made of,
 *     rendered as the pill row under the title.
 *   - `CONFIG_CARD`      — the selected experiment's literal config.
 *   - `RUNS`             — the runs made from that config, each naming its
 *     cohort and version, with a Compare affordance.
 *   - `RIGHT_HEADER` / `FOOTER_META` — static right-pane chrome.
 *
 * Config values are frozen against the landing CodeShowcase (`model =
 * "glm-5.4"`, `tool_policy = History(scope="cohort", on_miss="fail")`).
 */

/** The single dimension an experiment moves — shown as the row pill. */
export type ExperimentSwaps = "MODEL" | "PROMPT" | "TOOL POLICY";

export type ExperimentRow = {
  /** Single uppercase letter for the letter badge. */
  letter: string;
  /** Experiment name, as passed to `kitaru experiment create`. */
  name: string;
  /** Subtitle shown beneath the name: the moved value · run count. */
  subtitle: string;
  /** What this experiment swaps. */
  swaps: ExperimentSwaps;
  /** Whether this is the pre-selected row. */
  selected: boolean;
};

/** One line of the selected experiment's config card. */
export type ConfigLine = {
  /** Config key — e.g. "model". */
  key: string;
  /** Config value, rendered mono — e.g. `"glm-5.4"`. */
  value: string;
  /** Whether this is the line the experiment moved (the hypothesis). */
  moved: boolean;
  /** Short note on the right — e.g. "the hypothesis" / "unchanged". */
  note: string;
};

/** One run made from the selected experiment's config. */
export type ExperimentRun = {
  /** Run label — e.g. "run 1". */
  label: string;
  /** The cohort this run was made over. */
  cohort: string;
  /** The code version that ran. */
  version: string;
  /** What the evaluator counted — never a verdict, only the count. */
  result: string;
  /** Whether this run is the one currently open in the Compare tab. */
  current: boolean;
};

/* ------------------------------------------------------------------ */
/* Left-pane experiment list                                            */
/* ------------------------------------------------------------------ */

export const EXPERIMENTS_LIST: ReadonlyArray<ExperimentRow> = [
  {
    letter: "C",
    name: "cheap-model",
    subtitle: "glm-5.4 · 1 run",
    swaps: "MODEL",
    selected: true,
  },
  {
    letter: "F",
    name: "fix-validation",
    subtitle: "prompt rev 8 · 2 runs",
    swaps: "PROMPT",
    selected: false,
  },
  {
    letter: "T",
    name: "tone-guard",
    subtitle: 'on_miss="skip" · 1 run',
    swaps: "TOOL POLICY",
    selected: false,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Right-pane header                                                    */
/* ------------------------------------------------------------------ */

export const RIGHT_HEADER = {
  eyebrow: "PURE CONFIGURATION",
  title:
    "Model, prompt, tool policy. Swap one and you have stated a new hypothesis.",
  /** Top-right context chip. */
  contextChip: "cheap-model · 1 run",
} as const;

/* ------------------------------------------------------------------ */
/* Config-dimension pills                                               */
/* ------------------------------------------------------------------ */

export const CONFIG_KEYS: ReadonlyArray<string> = [
  "model",
  "system_prompt",
  "tool_policy",
] as const;

/* ------------------------------------------------------------------ */
/* The selected experiment's config                                     */
/* ------------------------------------------------------------------ */

export const CONFIG_CARD = {
  label: "EXPERIMENT CONFIG",
  filename: "cheap-model",
  lines: [
    {
      key: "model",
      value: '"glm-5.4"',
      moved: true,
      note: "the hypothesis",
    },
    {
      key: "system_prompt",
      value: "rev 7",
      moved: false,
      note: "unchanged",
    },
    {
      key: "tool_policy",
      value: 'History(scope="cohort", on_miss="fail")',
      moved: false,
      note: "unchanged",
    },
  ] as ReadonlyArray<ConfigLine>,
} as const;

/* ------------------------------------------------------------------ */
/* Runs made from that config                                           */
/* ------------------------------------------------------------------ */

export const RUNS_BLOCK = {
  label: "RUNS",
  /** The definition, stated once above the rows. */
  definition: "a run is config + cohort + version",
  /* Exactly one run — the model swap over checkout-flow. Runs 2 and 3
   * (v1 → pr-311) belong to fix-validation; attributing them here would
   * contradict compare-examples.ts, which owns that pairing. */
  runs: [
    {
      label: "run 1",
      cohort: "checkout-flow",
      version: "v1",
      result: "84 / 90 outputs identical · $0.05 / run",
      current: false,
    },
  ] as ReadonlyArray<ExperimentRun>,
  /** Demo affordance — routes the narrative to the Compare tab. */
  compareLabel: "Compare",
} as const;

/* ------------------------------------------------------------------ */
/* Footer meta strip                                                    */
/* ------------------------------------------------------------------ */

export const FOOTER_META = {
  left: "3 experiments · 4 runs · cohort checkout-flow",
  rightLabel: "config only",
} as const;
