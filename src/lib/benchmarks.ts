/**
 * /benchmarks hub copy: the method every benchmark follows and the closing
 * band. The benchmarks themselves, and their cards, come from
 * src/lib/benchmarkReports/.
 */

import { LABS_CLOSE, type LabsBandContent } from "./labs-home";
import { KITARU_LINKS } from "./productKitaru";

/** What every benchmark has to show before we publish it. */
export const BENCHMARK_METHOD = [
  {
    title: "The whole agent, not the model",
    body: "A model's score depends on the prompt, effort setting and tools around it. We compare models under the best prompt we can write, not the first one.",
  },
  {
    title: "Cost per correct answer",
    body: "Token price is not what you pay. A cheap model that takes 11 calls a case, or fails half the time, costs more per correct answer.",
  },
  {
    title: "Full runs decide",
    body: "Checking single steps is a cheap way to rule models out. The verdict comes from running whole tasks end to end.",
  },
  {
    title: "Measured noise",
    body: "We run the same agent twice to see how far a score moves by chance. Anything inside that gap is a tie, and we call it one.",
  },
  {
    title: "Checked grading",
    body: "LLM judges are checked against human labels, and prompt changes are scored on held-out cases they were never tuned on.",
  },
  {
    title: "Caveats in the open",
    body: "Each write-up says what the test can't show: one domain, synthetic users, single runs, list prices. Results that don't flatter anyone stay in.",
  },
] as const;

export const BENCHMARKS_CLOSE: LabsBandContent = {
  ...LABS_CLOSE,
  headlineLines: ["Run it on", "your own agent"],
  deck: "Kitaru turns your agent's traces into test cases and replays them against any model, prompt or setting, so you can see what a change does before it ships.",
  cta: {
    label: "Start free",
    href: KITARU_LINKS.signup.href,
    analytics: "Benchmarks-Close-Signup",
  },
};
