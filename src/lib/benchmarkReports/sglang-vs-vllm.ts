/**
 * SGLang vs vLLM benchmark report: the same recorded coding-agent traffic
 * replayed against two serving engines on one H100. Reads the whitelisted
 * public export in src/data/benchmarks/sglang-vs-vllm.json. One run per
 * setting, so the report reports what happened here and nothing wider.
 */

import data from "../../data/benchmarks/sglang-vs-vllm.json";
import { longDate, pct } from "./format";
import type { BenchmarkReport, ReportTable } from "./types";

type Setting = (typeof data.settings)[number];

const num = (x: number) => x.toLocaleString("en-US");
const fixed = (x: number, digits: number) => x.toFixed(digits);
const ratio = (x: number) => `${x.toFixed(2)}×`;

export function buildSglangVsVllm(): BenchmarkReport {
  const settings = data.settings;
  const byName = (name: string) =>
    settings.find((s) => s.name === name) as Setting;
  const vllm = byName("stock vLLM");
  const sglang = byName("stock SGLang");
  const sglangTuned = settings.filter((s) => s.name.startsWith("SGLang,"));
  const bestSglang = [...sglangTuned, sglang].sort(
    (a, b) => b.requests_completed - a.requests_completed,
  )[0];
  const { limits, traffic } = data;
  const runShape = `one ${limits.gpu}, ${limits.concurrency} concurrent replayed sessions, a ${limits.gapS} s gap between turns and a ${limits.windowS} s replay window`;
  const isVllm = (s: Setting) => s.name === vllm.name;

  const setupTable: ReportTable = {
    title: "Engines and settings",
    caption: `Every setting ran the same traffic on ${runShape}.`,
    columns: [
      { label: "Setting" },
      { label: "Engine" },
      { label: "Extra flags" },
    ],
    rows: settings.map((s) => ({
      cells: [
        { text: s.name },
        { text: s.engine },
        { text: s.flags, muted: true },
      ],
    })),
  };

  const throughputTable: ReportTable = {
    title: "Throughput",
    caption: `Requests and tokens served in one run per setting. Throughput divides by the measured window, which runs past ${limits.windowS} s while in-flight requests finish.`,
    columns: [
      { label: "Setting" },
      { label: "Requests sent", align: "right" },
      { label: "Completed", align: "right" },
      { label: "Errored", align: "right" },
      { label: `Sessions reached (of ${traffic.sessions})`, align: "right" },
      { label: "Measured window", align: "right" },
      { label: "Generated tokens per second", align: "right" },
      { label: "Completed vs. stock vLLM", align: "right" },
      { label: "Tokens per second vs. stock vLLM", align: "right" },
    ],
    rows: settings.map((s) => ({
      highlight: isVllm(s),
      cells: [
        { text: s.name },
        { text: num(s.n) },
        { text: num(s.requests_completed) },
        s.requests_errored
          ? { text: num(s.requests_errored) }
          : { text: "0", muted: true },
        { text: num(s.sessions_touched) },
        { text: `${fixed(s.measured_window_s, 1)} s` },
        { text: fixed(s.generated_tokens_per_s, 2) },
        { text: ratio(s.requests_completed_vs_vllm) },
        { text: ratio(s.generated_tokens_per_s_vs_vllm) },
      ],
    })),
  };

  const latencyTable: ReportTable = {
    title: "Latency",
    caption:
      "Over completed requests. Time to first token includes time spent queued; time per output token is the generation speed once a request runs.",
    columns: [
      { label: "Setting" },
      { label: "Median request", align: "right" },
      { label: "90th percentile request", align: "right" },
      { label: "Median time to first token", align: "right" },
      { label: "Median time per output token", align: "right" },
    ],
    rows: settings.map((s) => ({
      highlight: isVllm(s),
      cells: [
        { text: s.name },
        { text: `${fixed(s.request_latency_p50_s, 2)} s` },
        { text: `${fixed(s.request_latency_p90_s, 2)} s` },
        { text: `${fixed(s.ttft_p50_s, 2)} s` },
        { text: `${fixed(s.time_per_output_token_p50_ms, 2)} ms` },
      ],
    })),
  };

  const concurrencyTable: ReportTable = {
    title: "Concurrency and memory",
    caption: `Engine gauges scraped every 10 s. ${limits.concurrency} sessions were always asking; requests the engine could not run waited in its queue.`,
    columns: [
      { label: "Setting" },
      { label: "Peak running requests", align: "right" },
      { label: "Peak waiting requests", align: "right" },
      { label: "Peak cache usage (each engine's own gauge)", align: "right" },
      { label: "Prefix cache hit (client side)", align: "right" },
      { label: "Server startup", align: "right" },
    ],
    rows: settings.map((s) => ({
      highlight: isVllm(s),
      cells: [
        { text: s.name },
        { text: num(s.running_requests_peak) },
        { text: num(s.waiting_requests_peak) },
        { text: pct(s.kv_or_token_usage_peak) },
        { text: pct(s.client_prefix_cache_hit) },
        { text: `${fixed(s.server_startup_s, 1)} s` },
      ],
    })),
  };

  const errorTable: ReportTable = {
    title: "Errors",
    caption:
      "Errored requests are left out of throughput and latency. Only one setting had any.",
    columns: [
      { label: "Setting" },
      { label: "Errored requests", align: "right" },
      { label: "Error", align: "right" },
    ],
    rows: settings.map((s) => ({
      cells: [
        { text: s.name },
        s.requests_errored
          ? { text: num(s.requests_errored) }
          : { text: "0", muted: true },
        s.error_types.length
          ? { text: s.error_types.join(", ") }
          : { text: "none", muted: true },
      ],
    })),
    footnote: `${data.failure.category}: ${data.failure.definition} ${data.failure.example}`,
  };

  return {
    slug: "sglang-vs-vllm",
    name: "SGLang vs vLLM",
    tags: ["Serving", "Self-hosting", "GPUs"],
    group: "infrastructure",
    date: data.meta.runDate,
    card: {
      headline: {
        value: `${num(vllm.requests_completed)} vs ${num(sglang.requests_completed)}`,
        label: "requests completed, vLLM vs SGLang",
      },
      domain: "LLM serving",
      data: "Replayed coding-agent traffic",
      finding: `On one ${limits.gpu} replaying the same coding-agent traffic, stock SGLang completed ${num(sglang.requests_completed)} requests to stock vLLM's ${num(vllm.requests_completed)}. It ran at most ${num(sglang.running_requests_peak)} requests at once for this hybrid-attention model, so the rest queued.`,
      stats: [
        {
          value: num(vllm.requests_completed),
          label: "requests completed, stock vLLM",
        },
        {
          value: num(sglang.requests_completed),
          label: "requests completed, stock SGLang",
        },
        { value: num(settings.length), label: "engine settings, one run each" },
      ],
    },
    title: "Does the serving engine change what one GPU serves?",
    eyebrow: "Benchmark · SGLang vs vLLM",
    deck: `We replayed the same recorded coding-agent traffic against stock vLLM and SGLang, and two tuned SGLang settings, serving ${data.model.name} on one ${limits.gpu}. One run per setting: this is what happened for this model and this traffic, not a general verdict on either engine.`,
    seoTitle:
      "SGLang vs vLLM on replayed coding-agent traffic: one H100, Qwen3.8-27B",
    seoDescription: `Same H100, same replayed coding-agent traffic: stock vLLM completed ${num(vllm.requests_completed)} requests, stock SGLang ${num(sglang.requests_completed)}. Throughput, latency, concurrency and errors for four engine settings.`,
    facts: [
      { label: "Status", value: "Complete" },
      { label: "Run", value: longDate(data.meta.runDate) },
      { label: "Model", value: `${data.model.name} (open weights)` },
      { label: "Hardware", value: `One ${limits.gpu}` },
      {
        label: "Traffic",
        value: `${num(traffic.sessions)} sessions, ${num(traffic.turns)} turns`,
      },
      { label: "Settings", value: `${settings.length}, one run each` },
    ],
    findings: [
      `Stock SGLang completed ${num(sglang.requests_completed)} requests to stock vLLM's ${num(vllm.requests_completed)} on the same traffic and GPU, and generated ${fixed(sglang.generated_tokens_per_s, 2)} tokens per second to vLLM's ${fixed(vllm.generated_tokens_per_s, 2)} (${ratio(sglang.generated_tokens_per_s_vs_vllm)}).`,
      `Stock SGLang ran at most ${num(sglang.running_requests_peak)} requests at once for this hybrid-attention model, against vLLM's ${num(vllm.running_requests_peak)}, with up to ${num(sglang.waiting_requests_peak)} waiting.`,
      `Once a request ran, stock SGLang generated faster: a median ${fixed(sglang.time_per_output_token_p50_ms, 2)} ms per output token against vLLM's ${fixed(vllm.time_per_output_token_p50_ms, 2)} ms. The time went to waiting: median time to first token was ${fixed(sglang.ttft_p50_s, 2)} s against ${fixed(vllm.ttft_p50_s, 2)} s, and median request time ${fixed(sglang.request_latency_p50_s, 2)} s against ${fixed(vllm.request_latency_p50_s, 2)} s.`,
      `The best SGLang setting we tried, ${bestSglang.name.replace("SGLang, ", "")}, reached ${ratio(bestSglang.requests_completed_vs_vllm)} stock vLLM's completed requests and ${ratio(bestSglang.generated_tokens_per_s_vs_vllm)} its tokens per second${bestSglang.requests_errored ? `, with ${num(bestSglang.requests_errored)} requests reset by the server` : ""}.`,
      `Each setting ran once, on one model, one GPU type and one workload, and we did not measure run-to-run variation. Read these as what happened here, not as a general ranking of the engines.`,
    ],
    sections: [
      {
        id: "results",
        title: "Results",
        intro:
          "Stock vLLM is highlighted as the reference. Read throughput and concurrency together: the engines differ less in generation speed than in how many requests they run at once.",
        tables: [setupTable, throughputTable, latencyTable, concurrencyTable],
      },
      {
        id: "errors",
        title: "Errors",
        tables: [errorTable],
      },
    ],
    method: [
      {
        term: "Traffic",
        detail: `${traffic.source}: ${num(traffic.sessions)} sessions and ${num(traffic.turns)} model turns. Turns whose recorded prompt exceeded ${num(traffic.maxPromptTokens)} tokens were cut. The recordings are not published.`,
      },
      {
        term: "Replay",
        detail: `No agent runs and no tools execute. ${data.replay} Each run replays sessions in a fixed order on ${runShape}, so runs reach different numbers of sessions.`,
      },
      {
        term: "Engines",
        detail: `${vllm.engine} with the agent study's default flags, and ${sglang.engine} with the equivalent common flags, plus two non-default SGLang settings from its cookbook. Model: ${data.model.name} (${data.model.description}), ${data.model.weights} weights, self-hosted.`,
      },
      ...data.metrics.map((metric) => ({
        term: metric.name.replace(/_/g, " "),
        detail:
          metric.definition.charAt(0).toUpperCase() +
          metric.definition.slice(1),
      })),
      {
        term: "Noise",
        detail:
          "One run per setting, with no repeats, so there is no run-to-run noise estimate and no confidence intervals.",
      },
    ],
    limitations: data.limitations,
    datasets: [],
    sources: [
      { label: "vLLM", href: "https://github.com/vllm-project/vllm" },
      { label: "SGLang", href: "https://github.com/sgl-project/sglang" },
    ],
  };
}
