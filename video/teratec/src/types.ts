export type ThemeName = "dark" | "light" | "kitaru";

export type TextStyle = "headline" | "subhead" | "body" | "kicker" | "caption";
export type TextTone = "accent" | "muted";

export type Coverage =
  | "objectives"
  | "perimeter"
  | "location"
  | "organisation"
  | "drivers"
  | "customers"
  | "success";

export interface TextLine {
  text: string;
  style: TextStyle;
  atFrame: number;
  tone?: TextTone;
  emphasise?: string[];
}

export interface TimedText {
  text: string;
  style: TextStyle;
  atFrame: number;
  tone?: TextTone;
}

interface SceneBase {
  id: string;
  label: string;
  durationInFrames: number;
  theme: ThemeName;
  covers?: Coverage[];
  note?: string;
}

export type LogoVariant = "symbol" | "horizontal";
export type LogoEntrance = "draw";

export interface LogoScene extends SceneBase {
  kind: "logo";
  logo: LogoVariant;
  entrance: LogoEntrance;
  tagline?: TimedText;
}

export interface StatementScene extends SceneBase {
  kind: "statement";
  rule?: boolean;
  lines: TextLine[];
}

export type PipelineIcon = "code" | "pipeline" | "server" | "check";

export interface PipelineStage {
  label: string;
  detail: string;
  atFrame: number;
  icon: PipelineIcon;
}

export interface PipelineScene extends SceneBase {
  kind: "pipeline";
  heading: TimedText;
  stages: PipelineStage[];
  footer?: TimedText;
}

export type AttributeGlyph = "lock" | "shield" | "server" | "check" | "code";

export interface AttributeItem {
  label: string;
  detail: string;
  atFrame: number;
  glyph: AttributeGlyph;
}

export interface AttributeGridScene extends SceneBase {
  kind: "attributeGrid";
  columns: number;
  heading: TimedText;
  items: AttributeItem[];
}

export interface Stat {
  value: string;
  label: string;
  atFrame: number;
  countFrom?: number;
  countTo?: number;
  countFrames?: number;
}

export interface StatsScene extends SceneBase {
  kind: "stats";
  heading?: TimedText;
  stats: Stat[];
  source?: TimedText;
}

export type CustomerLogo =
  | "safran"
  | "airbus-defence-and-space"
  | "aecom"
  | "rivian"
  | "axa"
  | "vodafone"
  | "ikea"
  | "leroy-merlin"
  | "adeo"
  | "stepstone"
  | "jetbrains"
  | "brevo"
  | "rohlik"
  | "knuspr"
  | "gema"
  | "neara"
  | "veridas"
  | "maven-robotics";

export interface LogoWave {
  atFrame: number;
  logos: CustomerLogo[];
}

export interface LogoWallScene extends SceneBase {
  kind: "logoWall";
  heading: TimedText;
  waves: LogoWave[];
  footer?: TimedText;
}

export interface ComparisonRow {
  metric: string;
  before: string;
  after: string;
  atFrame: number;
}

export interface ComparisonScene extends SceneBase {
  kind: "comparison";
  heading: TimedText;
  rows: ComparisonRow[];
  source?: TimedText;
}

export interface CtaScene extends SceneBase {
  kind: "cta";
  logo: LogoVariant;
  lines: TextLine[];
  standLine: string;
  url: string;
}

export type VideoScene =
  | LogoScene
  | StatementScene
  | PipelineScene
  | AttributeGridScene
  | StatsScene
  | LogoWallScene
  | ComparisonScene
  | CtaScene;

export interface VideoMeta {
  title: string;
  locale: string;
  fps: 30;
  width: 1920;
  height: 1080;
  totalFrames: number;
  loopSafe: boolean;
  silent: boolean;
}

export interface VideoScript {
  meta: VideoMeta;
  scenes: VideoScene[];
}
