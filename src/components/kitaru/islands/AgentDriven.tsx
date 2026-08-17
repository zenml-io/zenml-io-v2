import { AGENTS } from "../../../lib/kitaru-landing";
import {
  AnthropicIcon,
  CursorIcon,
  GeminiIcon,
  OpenAIIcon,
} from "./brand-icons";
import { Eyebrow, Section } from "./primitives";
import { Reveal } from "./Reveal";

const agentIcons: Record<string, typeof AnthropicIcon> = {
  "Claude Code": AnthropicIcon,
  Codex: OpenAIIcon,
  Cursor: CursorIcon,
  "Gemini CLI": GeminiIcon,
};

export const AGENT_TRANSCRIPT = [
  {
    text: "kitaru_workflow_start({",
    kind: "agent",
  },
  {
    text: '"operation": "experiment_run",',
    kind: "agent",
  },
  {
    text: '"experiment_id": "$EXPERIMENT_ID", "cohort_version_id": "$COHORT_VERSION_ID",',
    kind: "agent",
  },
  {
    text: '"agent_version_id": "$V1_AGENT_VERSION_ID"',
    kind: "agent",
  },
  { text: "})", kind: "agent" },
  { text: "90 sessions · cited-superseded-doc true 90 · false 0", kind: "out" },
  {
    text: "kitaru_workflow_start({",
    kind: "agent",
  },
  {
    text: '"operation": "experiment_run",',
    kind: "agent",
  },
  {
    text: '"experiment_id": "$EXPERIMENT_ID", "cohort_version_id": "$COHORT_VERSION_ID",',
    kind: "agent",
  },
  {
    text: '"agent_version_id": "$CANDIDATE_AGENT_VERSION_ID"',
    kind: "agent",
  },
  { text: "})", kind: "agent" },
  { text: "cited-superseded-doc true 4 · false 86", kind: "good" },
  { text: "4 still failing — opening these for you to read", kind: "bad" },
] as const;

export function AgentDriven() {
  return (
    <Section id="agent-driven">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <Reveal>
          <Eyebrow>Agent-driven experimentation</Eyebrow>
          <h2 className="mt-5 text-balance text-3xl leading-[1.08] font-medium tracking-[-0.025em] md:text-[2.75rem]">
            Your agent does the driving.
            <br />
            You do the deciding.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            Kitaru speaks MCP. Your coding agent does the tedious parts —
            import, group, run, read back. It cannot decide what good means, and
            Kitaru is built to stop it trying.
          </p>

          <div className="mt-10">
            <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              Drive it from
            </span>
            <div className="mt-4 flex flex-wrap gap-2">
              {AGENTS.map((a) => {
                const Icon = agentIcons[a];
                return (
                  <span
                    key={a}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] text-ink-soft"
                  >
                    {Icon ? <Icon className="size-3.5 shrink-0" /> : null}
                    {a}
                  </span>
                );
              })}
              <span className="rounded-full border border-dashed border-border px-3.5 py-1.5 text-[13px] text-muted-foreground">
                or any harness that speaks MCP
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal variant="right" delay={120}>
          <div className="overflow-hidden rounded-xl border border-border bg-night">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
              </span>
              <span className="font-mono text-[11px] text-night-text/45">
                agent · kitaru mcp
              </span>
            </div>
            <div className="flex flex-col gap-2.5 px-5 py-6 font-mono text-[12.5px] leading-relaxed">
              {AGENT_TRANSCRIPT.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.kind === "agent"
                      ? "text-night-text/85"
                      : l.kind === "good"
                        ? "text-success"
                        : l.kind === "bad"
                          ? "text-warn"
                          : "text-night-text/50"
                  }
                >
                  <span className="mr-2 text-ember/70">
                    {l.kind === "agent" ? "›" : "·"}
                  </span>
                  {l.text}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
            The agent ran it and laid out the rows. Whether four remaining
            failures is shippable is not its call.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
