/**
 * The trace tools Kitaru imports from, shared by the homepage hero card and
 * the "how it works" steps. Each mark's box is sized so its ink, not its
 * viewBox, lands at about 12px tall: Langfuse's square viewBox carries wide
 * padding, LangSmith's solid lozenge sits a pixel shorter to match the
 * outline marks' weight.
 */
import {
  BraintrustIcon,
  LangChainIcon,
  LangfuseIcon,
  LogfireIcon,
} from "../kitaru/islands/brand-icons";

export const TRACE_SOURCES = [
  { Icon: LangfuseIcon, name: "Langfuse", class: "-mx-0.5 size-6" },
  { Icon: LangChainIcon, name: "LangSmith", class: "h-[11px] w-auto" },
  { Icon: LogfireIcon, name: "Logfire", class: "h-3 w-auto" },
  { Icon: BraintrustIcon, name: "Braintrust", class: "h-3 w-auto" },
] as const;
