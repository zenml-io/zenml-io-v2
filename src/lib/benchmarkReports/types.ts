/**
 * Shapes shared by every /benchmarks/<slug> report and its hub card. Each
 * report module (one per benchmark, beside this file) reads its own public
 * export in src/data/benchmarks/ and returns a `BenchmarkReport` with every
 * table already formatted, so the page and the card only render.
 */

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

/** Which hub section a benchmark is listed under. */
export type BenchmarkGroup = "agents" | "infrastructure";

export interface BenchmarkCardContent {
  domain: string;
  /** Where the cases came from, e.g. "Public data · Snorkel AI". */
  data: string;
  /** The headline result in one or two sentences. */
  finding: string;
  stats: readonly [BenchmarkStat, BenchmarkStat, BenchmarkStat];
}

/** A dataset a benchmark ran on, linked at its source. */
export interface ReportDataset {
  name: string;
  href: string;
  license?: string;
  description?: string;
  /**
   * Hugging Face dataset id (e.g. "snorkelai/Multi-Turn-Insurance-Underwriting").
   * When present, the report offers Hugging Face's hosted dataset viewer.
   */
  huggingFace?: string;
}

export interface BenchmarkReport {
  slug: string;
  group: BenchmarkGroup;
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
  method: { term: string; detail: string }[];
  limitations: string[];
  /** Public datasets, each linked at its source; absent when the cases are not public. */
  datasets: ReportDataset[];
  sources: { label: string; href: string }[];
}
