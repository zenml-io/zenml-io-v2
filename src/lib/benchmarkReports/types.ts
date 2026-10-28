/**
 * Shapes shared by every /benchmarks/<slug> report and its hub card. Each
 * report module (one per benchmark, beside this file) reads its own public
 * export in src/data/benchmarks/ and returns a `BenchmarkReport` with every
 * table already formatted, so the page and the card only render.
 */

import type { ModelMark } from "../labs-home";

interface ChartRow {
  label: string;
  value: number;
  display: string;
  /** The row the benchmark's finding points at. */
  emphasis?: boolean;
  /** The model's mark, on rows that name a model. */
  mark?: ModelMark;
  /** A reference row (a baseline), drawn below a rule in a muted bar. */
  reference?: boolean;
}

export interface TableCell {
  text: string;
  /** Heat level for single-hue sage cells (0 = no tint). */
  level?: 0 | 1 | 2 | 3;
  muted?: boolean;
}

export interface ReportTable {
  title: string;
  caption?: string;
  columns: { label: string; align?: "right" }[];
  rows: { cells: TableCell[]; highlight?: boolean }[];
  footnote?: string;
}

export interface ReportFact {
  label: string;
  value: string;
}

export interface ReportSection {
  id: string;
  title: string;
  intro?: string;
  tables: ReportTable[];
}

export interface BenchmarkStat {
  value: string;
  label: string;
}

/** The industry a benchmark's work comes from: its hub section. */
export type BenchmarkIndustry =
  | "insurance"
  | "customer-service"
  | "infrastructure";

export interface BenchmarkCardContent {
  domain: string;
  /** Where the cases came from, e.g. "Public data · Snorkel AI". */
  data: string;
  /** The headline result in one or two sentences. */
  finding: string;
  stats: readonly [BenchmarkStat, BenchmarkStat, BenchmarkStat];
  /** The one number the hub row leads with; the third stat when absent. */
  headline?: BenchmarkStat;
}

/** The small bar chart a benchmark shows on the hub. */
export interface BenchmarkPreview {
  /** What the bars measure, in a few words. */
  metric: string;
  better: "higher" | "lower";
  /** The setup behind the bars, shown under the chart on the report only. */
  context?: string;
  /** The value a full-width bar stands for; the largest row's value when absent. */
  max?: number;
  rows: ChartRow[];
  /** The fuller set the report draws; the card's `rows` when absent. */
  reportRows?: ChartRow[];
}

/**
 * Paired differences against a baseline with their 95% intervals, over a
 * shaded band for the unchanged rerun's interval (the run-to-run noise).
 */
export interface IntervalChart {
  /** What the axis measures, in a few words. */
  metric: string;
  better: "higher" | "lower";
  band: { label: string; low: number; high: number };
  rows: {
    label: string;
    mark?: ModelMark;
    value: number;
    low: number;
    high: number;
    display: string;
    /** Whether the interval clears zero: clearly ahead, clearly behind, or within noise. */
    verdict: "ahead" | "behind" | "tie";
  }[];
}

/** A dataset a benchmark ran on, linked at its source. */
export interface ReportDataset {
  name: string;
  href: string;
  license?: string;
  description?: string;
  /**
   * Hugging Face dataset id (e.g. "snorkelai/Multi-Turn-Insurance-Underwriting").
   * When present, the report links to the dataset on Hugging Face.
   */
  huggingFace?: string;
}

export interface BenchmarkReport {
  slug: string;
  /** Short benchmark name: the card title and the report's eyebrow. */
  name: string;
  /** Topic tags shown as chips on the card and the report. */
  tags: readonly string[];
  industry: BenchmarkIndustry;
  /** Last run date (ISO), shown on the card; the hub lists newest first. */
  date: string;
  card: BenchmarkCardContent;
  /** Slug of a companion blog post, linked only once it is published. */
  postSlug?: string;
  title: string;
  eyebrow: string;
  deck: string;
  seoTitle: string;
  seoDescription: string;
  facts: ReportFact[];
  findings: string[];
  sections: ReportSection[];
  /** Drawn above the main section's first table, when the benchmark has one. */
  intervals?: IntervalChart;
  method: { term: string; detail: string }[];
  limitations: string[];
  /** Public datasets, each linked at its source; absent when the cases are not public. */
  datasets: ReportDataset[];
  sources: { label: string; href: string }[];
}
