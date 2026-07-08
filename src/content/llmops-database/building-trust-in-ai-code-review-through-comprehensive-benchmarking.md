---
title: "Building Trust in AI Code Review Through Comprehensive Benchmarking"
slug: "building-trust-in-ai-code-review-through-comprehensive-benchmarking"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "harness-engineering"
  - "evals"
  - "human-in-the-loop"
  - "cost-optimization"
  - "documentation"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "DoorDash"
summary: "DoorDash developed DashBench, a rigorous measurement layer for evaluating their production AI code reviewer, to address the fundamental problem that convenient signals like acceptance rates and thumbs-up feedback can mask where code reviewers actually fail. The solution involved creating a benchmark that replays historical PRs, evaluates real human-actionable findings rather than just plausible comments, and triangulates across multiple flawed signals without relying on any single source as ground truth. Results showed their production reviewer (Claude Sonnet 4.6 scout + Claude Opus 4.8 reviewer) found 504 real findings with 53.6% weighted recall compared to 164 findings and 30.7% recall for a single-pass baseline, while comprehensive model-mix evaluations revealed different configurations excelled at different tradeoffs, with no single configuration dominating all metrics."
link: "https://careersatdoordash.com/blog/how-we-learned-to-trust-our-ai-code-reviewer-at-doordash/"
year: 2026
seo:
  title: "DoorDash: Building Trust in AI Code Review Through Comprehensive Benchmarking - ZenML LLMOps Database"
  description: "DoorDash developed DashBench, a rigorous measurement layer for evaluating their production AI code reviewer, to address the fundamental problem that convenient signals like acceptance rates and thumbs-up feedback can mask where code reviewers actually fail. The solution involved creating a benchmark that replays historical PRs, evaluates real human-actionable findings rather than just plausible comments, and triangulates across multiple flawed signals without relying on any single source as ground truth. Results showed their production reviewer (Claude Sonnet 4.6 scout + Claude Opus 4.8 reviewer) found 504 real findings with 53.6% weighted recall compared to 164 findings and 30.7% recall for a single-pass baseline, while comprehensive model-mix evaluations revealed different configurations excelled at different tradeoffs, with no single configuration dominating all metrics."
  canonical: "https://www.zenml.io/llmops-database/building-trust-in-ai-code-review-through-comprehensive-benchmarking"
  ogTitle: "DoorDash: Building Trust in AI Code Review Through Comprehensive Benchmarking - ZenML LLMOps Database"
  ogDescription: "DoorDash developed DashBench, a rigorous measurement layer for evaluating their production AI code reviewer, to address the fundamental problem that convenient signals like acceptance rates and thumbs-up feedback can mask where code reviewers actually fail. The solution involved creating a benchmark that replays historical PRs, evaluates real human-actionable findings rather than just plausible comments, and triangulates across multiple flawed signals without relying on any single source as ground truth. Results showed their production reviewer (Claude Sonnet 4.6 scout + Claude Opus 4.8 reviewer) found 504 real findings with 53.6% weighted recall compared to 164 findings and 30.7% recall for a single-pass baseline, while comprehensive model-mix evaluations revealed different configurations excelled at different tradeoffs, with no single configuration dominating all metrics."
notion:
  pageId: "397f8dff-2538-8026-9919-fe560e38a35e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:59:00.000Z"
  lastEditedTime: "2026-07-08T19:59:00.000Z"
  publishedAt: "2026-07-08T20:12:21Z"
---

## Overview

DoorDash's case study centers on building DashBench, a sophisticated measurement framework for their production AI code reviewer. The fundamental insight driving this work is that standard product metrics like acceptance rate, thumbs-up feedback, or single aggregate scores can make an AI reviewer appear useful while concealing critical failure modes such as missing important issues, over-indexing on trivial comments, or making precision-recall tradeoffs that product metrics don't expose. This represents a mature LLMOps approach where the team recognizes that deploying LLMs to production is only half the challenge—the harder part is understanding where systems fail, why they fail, and whether changes actually improve performance.

The production context is DoorDash's code review agent that engineers use in their daily workflow. Engineers depend on this system, which means evaluation methodology directly impacts both developer productivity and code quality. The case study is particularly valuable because it moves beyond claiming success to examining the measurement challenges inherent in evaluating complex LLM systems in production.

## The Measurement Challenge

DoorDash identifies a fundamental flaw in the obvious measurement approach: production acceptance signals only populate two cells of the confusion matrix. When an author accepts a comment, it's counted as a true positive; when they reject it, it's a false positive. This approach makes two dangerous assumptions: that humans are infallible arbiters of code quality, and that we can ignore false negatives (bugs the reviewer missed) and true negatives (clean code where silence was appropriate).

The team discovered through disagreement audits that human acceptance is a useful signal but not ground truth. Authors accept and reject comments based on workflow factors like timing, PR urgency, ownership context, fix invasiveness, or whether issues were handled elsewhere. These are valid product considerations but weak benchmark labels. In their audits, both human review and agentic verification surfaced mistakes, revealing that "was accepted" and "was real" are distinct questions.

This insight drove the creation of DashBench as a benchmark that triangulates across several imperfect signals rather than treating any single one as authoritative. The approach acknowledges that all signals—human judgment, production feedback, and agentic evaluation—are fallible and valuable in different ways.

## Architecture and Evaluation Design

DoorDash's production reviewer uses a staged architecture that separates noticing from verifying, mirroring how experienced human reviewers work. A lead scout model reads the code change and flags suspicious areas. Deep reviewer models then investigate the strongest leads, confirm whether concerns are valid, and drop claims that don't survive scrutiny. This design provides clean evaluation surfaces because the workflow is model-agnostic: every component becomes a variable that can be held fixed or changed independently.

The architecture allows systematic variation of scout models, reviewer models, context policies, tool policies, and runtime budgets while keeping the underlying cases constant. This transforms the question from "which model is best?" to "for a given architecture, context policy, and model mix, what tradeoffs between coverage, precision, cost, and latency do we actually get, and where does it fail?"

DashBench's pipeline consists of several stages: case curation from roughly 1,000 candidate PRs down to focused eval sets, label preparation that combines human annotation with agentic judging and manual resolution of disagreements, execution in controlled environments where configurations run against frozen case sets, and continuous disagreement review that feeds resolved cases back into judge calibration. The benchmark treats the LLM-based judge as a calibrated signal rather than ground truth, requiring ongoing validation.

## Dataset Construction and Labeling

The benchmark dataset was carefully curated to stress different review behaviors. It includes historical PRs with real review findings and sufficient context for faithful replay, benign PRs with near-zero real findings to measure restraint and catch false positives (recognizing that excessive noise on clean code is its own failure mode), and PRs that were later reverted or hotfixed to test whether systems catch genuine regressions before merge.

Label preparation represents one of the most rigorous aspects of the work. Rather than simply importing human feedback, DoorDash had original PR authors annotate candidate findings, then compared three sources: human annotations, original candidate findings, and an agentic judge. Human feedback proved frequently wrong—reviewers missed valid issues, accepted weak claims, or interpreted historical PR context differently than subsequent reviewers. Where sources disagreed, the team manually re-reviewed evidence and resolved it, creating calibration data for the judge.

This approach ensures ground truth doesn't rest on any single fallible source. The team explicitly acknowledges that human judgment, production feedback, and agentic evaluation each contribute valuable signals but none should be treated as infallible.

## Results and Model Comparisons

The 105-case valid report provides detailed comparisons across configurations. DoorDash's production reviewer (Claude Sonnet 4.6 high scout + Claude Opus 4.8 high reviewer) found 504 real findings with 53.6% weighted recall and 87.0% weighted precision, at $3.91 per PR. A no-scout GPT 5.5 high baseline found 164 real findings with 30.7% weighted recall and 84.1% precision at $0.75 per PR. The staged architecture clearly buys coverage at a visible cost in both dollars and latency (725 seconds vs 170 seconds per PR).

The broader model-mix evaluation reveals more nuanced tradeoffs. Kimi K2.6 scout + Claude Fable 5 reviewer led weighted recall (65.2%) and F1 (75.3%), finding 537 real issues. Composer 2.5 scout + GPT 5.5 medium reviewer achieved the highest weighted precision (92.2%) but with materially lower recall (18.0%). Single-pass baselines remained cheaper while sacrificing coverage. No configuration dominated all axes.

Severity breakdowns add another dimension. The union of real findings across the 105 cases includes 40 critical, 136 high, 271 medium, and 385 low-severity clusters. Kimi K2.6 + Fable 5 achieved 80.0% recall on critical issues, 77.9% on high, 56.8% on medium, and 46.8% on low. In contrast, the no-scout GPT 5.5 high baseline achieved 37.5% on critical, 55.9% on high, 20.3% on medium, and just 4.2% on low-severity issues. The team uses weighted metrics that assign different weights by severity (critical = 4, high = 2, medium = 1, low = 0.5) to capture that missing critical issues matters more than missing low-severity ones.

## LLMOps Lessons and Principles

The case study articulates several hard-won principles for production LLM systems. First, trust must be earned through continuous validation—no single signal provides reliable ground truth. Second, humans don't scale for labeling complex tasks, even when the labeler is the original engineer. AI judging makes evaluation tractable but only with proper constraints including calibration, audit sets, and stable rubrics.

Third, variance is a feature rather than a bug. LLM non-determinism means a single run understates an agent's real coverage, requiring multiple runs and aggregation for honest scoring. The same stochasticity applies to judges—deterministic matching is stable but misses semantic equivalence, while LLM judges reason more richly but need careful calibration. The entire measurement stack is stochastic by nature, requiring designs that embrace rather than ignore this reality.

Fourth, single metrics are misleading by construction. Weighted precision, weighted recall, weighted F1, high/critical recall, latency, and cost all move independently. A system can win on one dimension and lose on another in the same run, so "better" is meaningless without specifying better at what and for whom.

## Production Integration and Continuous Improvement

DoorDash positions DashBench not as a static leaderboard but as a feedback loop where every material change—to models, prompts, context, tool use, workflow, or runtime budget—gets tested on the same real PR-review cases before reaching engineers. The roadmap includes continuous benchmarking where new models and harnesses enter the benchmark quickly as they ship, stale PR cases retire while new cases are added continuously to track the evolving codebase, moving from a single judge to an agentic jury to mitigate individual judge model biases, and benchmarking against external code-review solutions rather than only internal variants.

The team is also extending the approach to benchmark coding agents on actual enterprise codebase tasks and features, not just review. This represents a maturing understanding that different stages of the AI software development lifecycle require different evaluation approaches.

## Critical Assessment

The case study demonstrates sophisticated thinking about evaluation in production LLM systems, but readers should note several important considerations. First, all results are reported on a 105-case valid subset from an initial pool of roughly 1,000 candidates. While the curation process is described, the characteristics of cases that didn't make it into the benchmark aren't detailed, which could affect generalizability.

Second, the label resolution process involves manual re-review when sources disagree, which doesn't fully escape the human judgment limitations the team criticizes. The approach improves on single-source labeling but still relies on human judgment at the resolution stage. The team is transparent about this, treating it as calibration data rather than absolute truth, but the limitation remains.

Third, cost comparisons are reported per-PR and per-real-finding but don't account for the development and maintenance costs of the benchmark infrastructure itself, or the cost of human label resolution. These operational costs could be significant for teams considering similar approaches.

Fourth, while the team reports weighted metrics that emphasize higher-severity issues, the weighting scheme (critical = 4, high = 2, medium = 1, low = 0.5) appears to be a design choice rather than one derived from business impact analysis. Different weightings could change which configurations appear optimal.

Finally, the case study focuses heavily on measurement methodology but provides less detail on how DashBench insights translate to actual changes in the production system. The connection between benchmark performance and real-world developer experience could be explored more thoroughly.

## Broader Implications for LLMOps

This case study makes important contributions to the field's understanding of evaluation in production LLM systems. The staged scout-then-verify architecture provides a useful pattern for complex reasoning tasks beyond code review. The multi-signal triangulation approach to ground truth construction addresses a fundamental challenge in domains where single-source labeling is unreliable. The severity-stratified reporting reveals how aggregate metrics can mask important differences in system behavior.

The work also highlights the resource requirements for rigorous LLM evaluation. DoorDash invested in curating 1,000+ candidate cases down to focused eval sets, building infrastructure for deterministic replay, implementing both deterministic and LLM-based matching, conducting manual disagreement resolution, and maintaining calibration as models and benchmarks evolve. This level of investment may not be feasible for all organizations, suggesting a need for shared benchmarks or evaluation tooling in the broader LLMOps ecosystem.

The case study's emphasis on tradeoff visibility rather than single-number optimization represents a mature perspective on production ML systems. By explicitly reporting precision, recall, F1, severity-specific performance, cost, and latency separately, DoorDash enables stakeholders to make informed decisions about which tradeoffs matter for their use case. This transparency is particularly important for agent systems where different failure modes have different business consequences.

The planned extensions to agentic juries for judging and continuous benchmark evolution suggest DoorDash views evaluation infrastructure as a first-class system requiring ongoing investment, not a one-time exercise. This perspective aligns with broader trends in MLOps where evaluation and monitoring infrastructure increasingly receives the same engineering attention as model serving infrastructure.
