---
title: "Building a Production AI Code Review Agent with High Engineer Acceptance"
slug: "building-a-production-ai-code-review-agent-with-high-engineer-acceptance"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "cost-optimization"
  - "evals"
  - "fastapi"
  - "monitoring"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Doordash"
summary: "DoorDash built an AI code review agent to catch critical issues that humans systematically miss during pull request reviews, such as dangerous deletions, cross-boundary drift, and silent behavior changes. The system evolved through three major versions to arrive at a three-agent architecture: a \"lead scout\" that identifies suspicious areas in code changes, followed by two deep reviewers that verify specific concerns. By optimizing for precision over recall and using domain-specific review profiles mined from historical PRs, Slack decisions, and incident history, DoorDash achieved a 60.2% acceptance rate on high and critical findings across 10,000+ weekly PR reviews covering 56 repositories, with reviews costing approximately $3 each and completing in about 7 minutes."
link: "https://careersatdoordash.com/blog/doordash-built-an-ai-code-reviewer-engineers-actually-listen-to/"
year: 2026
seo:
  title: "Doordash: Building a Production AI Code Review Agent with High Engineer Acceptance - ZenML LLMOps Database"
  description: "DoorDash built an AI code review agent to catch critical issues that humans systematically miss during pull request reviews, such as dangerous deletions, cross-boundary drift, and silent behavior changes. The system evolved through three major versions to arrive at a three-agent architecture: a \"lead scout\" that identifies suspicious areas in code changes, followed by two deep reviewers that verify specific concerns. By optimizing for precision over recall and using domain-specific review profiles mined from historical PRs, Slack decisions, and incident history, DoorDash achieved a 60.2% acceptance rate on high and critical findings across 10,000+ weekly PR reviews covering 56 repositories, with reviews costing approximately $3 each and completing in about 7 minutes."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-ai-code-review-agent-with-high-engineer-acceptance"
  ogTitle: "Doordash: Building a Production AI Code Review Agent with High Engineer Acceptance - ZenML LLMOps Database"
  ogDescription: "DoorDash built an AI code review agent to catch critical issues that humans systematically miss during pull request reviews, such as dangerous deletions, cross-boundary drift, and silent behavior changes. The system evolved through three major versions to arrive at a three-agent architecture: a \"lead scout\" that identifies suspicious areas in code changes, followed by two deep reviewers that verify specific concerns. By optimizing for precision over recall and using domain-specific review profiles mined from historical PRs, Slack decisions, and incident history, DoorDash achieved a 60.2% acceptance rate on high and critical findings across 10,000+ weekly PR reviews covering 56 repositories, with reviews costing approximately $3 each and completing in about 7 minutes."
notion:
  pageId: "35df8dff-2538-80b5-b731-e6d42986306b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:35:00.000Z"
  lastEditedTime: "2026-05-11T20:35:00.000Z"
  publishedAt: "2026-05-11T20:41:47Z"
---

## Overview

DoorDash developed and deployed an AI-powered code review agent across their engineering organization to address a fundamental challenge in software development: catching critical issues that human reviewers systematically miss during pull request reviews. The system represents a sophisticated LLMOps implementation that processes over 10,000 pull requests weekly across 56 diverse repositories spanning Go backends, iOS and Android applications, web frontends, infrastructure code, and data pipelines. This case study is particularly valuable for its honest discussion of iteration cycles, failures, and the evolution toward a production-ready system that engineers actually trust.

The core business problem DoorDash aimed to solve was not simply "finding bugs" but rather catching specific classes of issues that slip through human review despite being potentially severe: dangerous deletions that remove behavioral guarantees, cross-boundary inconsistencies where one side of an interface is updated but siblings are not, and silent behavior changes that maintain type signatures while altering runtime semantics. The company's success metric was deliberately chosen to reflect real-world utility: do engineers actually change their code when the agent comments, and do teams keep it enabled voluntarily rather than muting it?

## System Architecture Evolution

The current production system represents the third major architectural iteration, with each version teaching lessons that could not have been predicted from the previous design. This evolution is particularly instructive for understanding how LLMOps systems mature in production environments.

Version 1 employed a fan-out architecture with multiple specialized agents, each responsible for a narrow domain such as security, testing, performance, or code quality. Each specialist worked from a specific checklist tailored to its domain. While this approach proved effective at catching mechanical bugs like missing nil checks, unhandled errors, and obvious test gaps, it consistently missed architectural issues. The fundamental limitation was that no single specialist agent had visibility into the bigger picture—refactors that quietly changed contracts, new abstractions that didn't fit existing patterns, or deletions that broke dependencies three repositories away all fell through the cracks because they required cross-cutting reasoning that no specialist possessed.

Version 2 introduced two parallel general-purpose reviewers that each received the complete change context. This architectural shift improved detection of architectural and cross-boundary issues because the reviewers could reason about how different pieces fit together. However, a new problem emerged: each reviewer had too much responsibility within a single session. They needed to read the full diff, evaluate it against all applicable rules, trace callers, check sibling implementations, and verify every potential concern. This diffusion of attention meant that critical issues sometimes got lost not because the reviewers couldn't catch them theoretically, but because the system hadn't made explicit decisions about what deserved deep investigation versus surface-level scanning.

Version 3 introduced the critical innovation that made the system production-worthy: a "lead scout" agent positioned ahead of the deep reviewers. The scout's singular responsibility is noticing things that feel suspicious without attempting to verify them. It identifies investigation leads such as "this deletion looks suspicious," "this enum case isn't handled in the sibling file," or "this error path is silently swallowing failures." The two deep reviewers then take this curated list of leads and perform thorough verification, dropping false leads and confirming legitimate issues.

This architectural pattern accomplishes two objectives simultaneously. The obvious benefit is producing a focused list of suspect areas in the diff. The subtler but equally important benefit is what it filters out: the vast majority of code changes that don't warrant scrutiny. By the time deep reviewers execute, they're not attempting to exhaustively evaluate every line—they're focused on a handful of specific concerns with the remainder of the change serving as supporting context. This focused attention enables the depth necessary to catch architectural issues that Version 2 missed despite having access to the same information.

DoorDash explicitly notes that this architecture mirrors how senior engineers actually perform code reviews. Experienced reviewers don't exhaustively verify every line; instead, they notice hunches or recognize patterns they've seen fail before, then dig deeply into areas that warrant attention. Separating the noticing phase from the verification phase allowed the system to achieve depth on important issues without squandering attention on routine changes.

## Domain-Specific Review Profiles

A major differentiator in DoorDash's approach is their rejection of the standard "dump all available context into the prompt" strategy. They discovered that generic AGENTS.md and CLAUDE.md files, while useful for engineers authoring code, contain too much noise for effective code review. These documents mix architectural guidance, setup instructions, coding patterns, and style notes into unified documents optimized for a different task.

Instead, DoorDash built a layer of domain-specific review profiles that capture exclusively review-relevant knowledge. Each profile is mined from four distinct sources: AGENTS.md files (scanned for invariants and conventions but filtered to exclude setup and build instructions), historical pull request reviews (especially patterns that senior engineers flag repeatedly), Slack decisions (including design decisions, "don't do X" threads, and incident post-mortems that never made it into formal documentation), and incident history (specific patterns that have caused production outages).

Every candidate rule must survive a deliberate filter before inclusion in a review profile. If continuous integration would already catch the issue, it's dropped. If the LLM would know it from general training data, it's dropped. If there's no concrete file-and-line evidence from the codebase, it's dropped. The residual set represents genuinely DoorDash-specific review knowledge—the tacit expertise that senior engineers on specific teams would catch but that wouldn't be obvious to someone unfamiliar with that domain.

The review profiles are then dynamically routed based on what code is touched. When a pull request modifies the payment-service-provider gateway, the agent loads PSP rules, payment core rules, and monetary-security rules while ignoring everything else. A PR touching the consumer feed receives a completely different rule set. This means the agent reviewing a fraud-detection change is effectively a different reviewer than one examining a pricing change, because it's consulting different domain-specific doctrine.

This routing mechanism explains why acceptance rates remain consistent across 56 vastly different repositories. The system isn't applying one universal standard but rather the specific standards that matter for each particular change. This represents a sophisticated approach to context management that goes beyond simple retrieval-augmented generation by pre-curating domain-specific knowledge bases and routing intelligently based on code changes.

## Precision Over Recall Philosophy

The single most important design decision DoorDash made was refusing to optimize for comprehensive coverage. The common industry approach surfaces every possible concern, ranks them, and leaves filtering to human reviewers. DoorDash recognized that this approach predictably leads to pull request spam, muted notifications, and ignored comments—a code reviewer that gets muted catches nothing.

DoorDash inverted this priority, optimizing for precision even at the cost of recall. Before any comment is posted publicly, it must survive a "disprove-it" pass—an explicit verification step where the system attempts to falsify its own finding. Claims that cannot withstand scrutiny are dropped entirely. This leads to fewer comments than a naive approach would generate, but the comments that do get posted are anchored to specific lines with quoted evidence from the actual code.

The consequences of this design philosophy are visible in the metrics. The 60.2% acceptance rate on high and critical findings represents the output of this precision-focused tradeoff, up from 46% with their previous third-party agent. Notably, webhook-triggered findings (which represent automatic, non-cherry-picked reviews on real PRs) maintain a 59.0% acceptance rate, demonstrating that the quality signal holds even when the agent cannot choose which PRs to review.

DoorDash's articulation of this tradeoff is worth noting: the issues they care most about are rarely impossible for humans to understand in isolation. They're hard because they require the right context at the right moment—knowing which deletion changes a contract, which enum has sibling mappings, which domain rule isn't enforced in CI, and which plausible concern is actually harmless. The system's role is making these judgments consistently across thousands of unrelated PRs without flooding authors with speculative guesses.

## Full Repository Access and Remote Execution

Unlike many code review tools that operate solely on diff hunks, DoorDash's agent runs on remote virtual machines with full repository clones. This architectural decision enables capabilities that mirror human reviewer workflows: tracing callers across the monorepo, finding sibling implementations in related files, reading tests that cover the changed code, and pulling context from anywhere in the codebase. The system can also execute modern coding-agent harnesses with full filesystem and tooling access.

This comprehensive access is critical because, as DoorDash notes, most bugs worth catching don't live in the diff itself—they live in how the diff interacts with its dependencies and dependents. A deletion might look innocuous in isolation but break a contract that ten other services depend on. An enum case addition might be perfectly implemented in the changed file but inconsistent with how siblings handle similar cases. These issues only become visible with repository-wide context.

The remote execution environment also enables the integrated "fixer" capability. When the agent posts a finding or when human reviewers leave comments, anyone can reply by tagging the agent and requesting a change. The fixer runs in a remote VM with full repository checkout and original review context (the PR diff, the finding, surrounding code, and suggested direction). It makes changes there and pushes them back to the PR as normal commits subject to CI and human review.

This addresses a practical LLMOps challenge: useful review comments still create work, often requiring context switching that disrupts engineering flow. The fixer eliminates the mechanical handoff between "the review found something" and "someone needs to stop what they're doing to patch it" without removing engineer ownership—the output remains a reviewable commit in the normal workflow.

## Cost and Performance Characteristics

DoorDash provides unusually transparent cost data for a production LLMOps system. The current average review cost is approximately $3, comparing favorably to publicly priced similar products (deep, agentic code review with remote execution and repository access) that range from $5 to $20 per review depending on change size. Reviews complete in an average of 7 minutes from PR opening, typically before the first human reviewer examines the diff.

The cost structure is deliberately tunable because the workflow is staged. DoorDash can use cheaper models for simpler steps, reserve stronger models for verification-heavy steps, and skip expensive passes on low-risk PRs. Critically, they use production acceptance data and evaluation sets to ensure cost reductions don't quietly degrade quality—a key LLMOps practice for maintaining service level objectives while optimizing spend.

An important operational lesson: the cheapest model is not always the cheapest review. For stages producing structured JSON, weaker models sometimes generated invalid output and retried multiple times, while stronger models produced valid output on the first attempt. The relevant unit of measurement is cost per successful review, not token price. This represents a mature understanding of total cost of ownership in LLMOps systems.

## Engineering Robustness and Failure Modes

DoorDash shares several operationally valuable lessons that only became apparent in production. One early failure mode involved expensive infinite loops where the same model request repeated without making progress. Maximum turn counters failed to catch these cases because the loop wasn't advancing the turn counter. Their solution involved layered timeouts: a soft timeout that interrupts the agent and asks it to stop investigating, drop speculative findings, and return only verified results; and a hard timeout as a final kill switch. This transforms an expensive stuck run into a bounded result that may still provide value rather than wasting all completed work.

Another production lesson: correct findings can still be bad comments. Broad summary notes, weak "consider checking" language, and duplicate comments across re-reviews all erode trust even when the underlying concern is legitimate. Comments that maintain trust are anchored to changed files and lines, explain concrete behavior at risk, and tell the author where to start. If the system cannot identify that action point, it keeps the concern out of the inline review or drops it entirely.

The final GitHub comment posting represents another quality gate. DoorDash added guardrails preventing false-clean reviews when analysis found issues, reconciling stale findings when PRs change during review, and collapsing old comments during re-review so authors see current state rather than accumulating outdated bot feedback. These represent the unglamorous but essential reliability engineering practices that separate prototype demonstrations from production services.

## Evaluation Strategy and Continuous Improvement

DoorDash employs a two-tier measurement strategy. Production acceptance rate serves as the ultimate signal of whether engineers trust comments enough to act on them, but it's a lagging indicator requiring real PRs, real reviews, and settled outcomes. For day-to-day development, they maintain a smaller evaluation set built from actual review misses and high-severity incidents—not synthetic coding puzzles but real PRs where they know what a strong reviewer should have caught.

This eval set enables rapid iteration on prompts, retrieval strategies, model choices, and review profiles before production deployment. Production acceptance data then validates whether those changes helped in actual usage. The company is building a continuous evaluation harness to measure every change against a growing corpus of real past incidents and review misses automatically, with the goal of a system that provably improves over time.

This evaluation philosophy reflects mature LLMOps practice: using production metrics as the north star while maintaining fast iteration cycles with representative evaluation sets, then closing the loop by feeding production failures back into the eval corpus.

## Vendor Flexibility and Build-vs-Buy Decision

DoorDash explicitly addresses why they built this system rather than adopting an off-the-shelf solution. The decision centered on deep customization needs: encoding repo-specific doctrine, incident history, and tacit knowledge that senior engineers carry; maintaining full codebase access for cross-repository analysis; retaining vendor flexibility as the model landscape evolves; and controlling costs in a tunable way.

The architecture is deliberately model-agnostic, allowing them to swap underlying models across OpenAI, Anthropic, open-source alternatives, and future providers. Each can be evaluated against the same incident eval set used to assess their own changes. This represents a pragmatic approach to the rapidly evolving foundation model landscape: build infrastructure that can leverage improvements from any provider rather than coupling tightly to a specific model family.

## Issues the System Catches Effectively

DoorDash identifies several patterns where the agent demonstrably outperforms human reviewers. Deletions represent a major category—humans skim deleted code because additions look dangerous while deletions look like cleanup. However, removing struct fields, config flags, default behaviors, or interface methods can silently change runtime behavior while code compiles and tests pass. The agent treats every deletion as a prompt to investigate dependencies.

Cross-boundary drift represents another strength. When a PR updates one side of a boundary (one brand's adapter, one of two producers, one handler of an enum), the agent looks for siblings that weren't updated. These bugs don't surface in CI because each side compiles independently, but they cause runtime inconsistencies.

Silent behavior changes—API changes that don't break signatures, error handling that quietly swallows more cases, cache misses treated as errors or vice versa—require reading surrounding code beyond the diff hunks and asking what changed that the diff doesn't make obvious. This plays to the agent's strength of patient, repetitive attention applied consistently across thousands of PRs.

## Critical Assessment

While DoorDash's results are impressive, several aspects warrant balanced consideration. The 60.2% acceptance rate, while substantially better than their previous 46%, still means nearly 40% of high and critical findings are not acted upon. This could represent false positives the system hasn't eliminated, or it could represent valid findings that engineers choose not to address for legitimate reasons (technical debt tradeoffs, planned future refactors, acceptable risk). The case study doesn't distinguish between these scenarios.

The comparison to "$5 to $20 per review" for similar products should be taken with appropriate context—DoorDash benefits from engineering resources that built and maintain this system, which represents significant ongoing investment not reflected in the per-review cost. Organizations considering similar builds should account for total cost of ownership including development, maintenance, and operational overhead.

The case study presents the system in a highly positive light, which is natural for a company blog post but means some challenges may be understated. The multiple architecture revisions (v1, v2, v3) suggest substantial iteration was required, and the discussion of failure modes (infinite loops, invalid JSON, stuck agents) hints at operational complexity that required sophisticated engineering to resolve.

That said, the technical depth, honest discussion of iteration cycles, transparent metrics, and specific architectural decisions make this an unusually valuable LLMOps case study. The precision-over-recall philosophy, domain-specific review profiles, and three-agent architecture with separated noticing and verification represent genuine innovations in production LLM systems that other organizations can learn from.
