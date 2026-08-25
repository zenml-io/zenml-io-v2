---
title: "Multi-Agent Automation for Feature-Flag Cleanup"
slug: "multi-agent-automation-for-feature-flag-cleanup"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "structured-output"
  - "realtime-application"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "mcp"
  - "error-handling"
  - "fallback-strategies"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "orchestration"
  - "scalability"
  - "reliability"
  - "guardrails"
  - "cicd"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "DoorDash"
summary: "DoorDash built a two-phase, human-in-the-loop multi-agent LLM system to remove stale feature flags, or dynamic values, from repositories and produce merge-ready pull requests. The system combines Jira intake, live rollout-state queries through MCP, repository-wide semantic code analysis, isolated parallel git worktrees, and deterministic build, test, coverage, and lint gates. In an evaluation of 50 recent stale flags, it generated usable PRs for 45, with an average reported cost of $4.79 and 13.8 minutes per flag, compared with an estimated one to two hours of manual engineering work. The reported failures involved incomplete cleanup in deep call chains rather than introduced bugs or regressions, although the results come from a relatively small, company-specific sample and still retain an engineer checkpoint for target-value confirmation and PR landing."
link: "https://careersatdoordash.com/blog/automating-feature-flag-cleanup-at-scale-with-a-multi-agent-llm-system/"
year: 2026
seo:
  title: "DoorDash: Multi-Agent Automation for Feature-Flag Cleanup - ZenML LLMOps Database"
  description: "DoorDash built a two-phase, human-in-the-loop multi-agent LLM system to remove stale feature flags, or dynamic values, from repositories and produce merge-ready pull requests. The system combines Jira intake, live rollout-state queries through MCP, repository-wide semantic code analysis, isolated parallel git worktrees, and deterministic build, test, coverage, and lint gates. In an evaluation of 50 recent stale flags, it generated usable PRs for 45, with an average reported cost of $4.79 and 13.8 minutes per flag, compared with an estimated one to two hours of manual engineering work. The reported failures involved incomplete cleanup in deep call chains rather than introduced bugs or regressions, although the results come from a relatively small, company-specific sample and still retain an engineer checkpoint for target-value confirmation and PR landing."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-automation-for-feature-flag-cleanup"
  ogTitle: "DoorDash: Multi-Agent Automation for Feature-Flag Cleanup - ZenML LLMOps Database"
  ogDescription: "DoorDash built a two-phase, human-in-the-loop multi-agent LLM system to remove stale feature flags, or dynamic values, from repositories and produce merge-ready pull requests. The system combines Jira intake, live rollout-state queries through MCP, repository-wide semantic code analysis, isolated parallel git worktrees, and deterministic build, test, coverage, and lint gates. In an evaluation of 50 recent stale flags, it generated usable PRs for 45, with an average reported cost of $4.79 and 13.8 minutes per flag, compared with an estimated one to two hours of manual engineering work. The reported failures involved incomplete cleanup in deep call chains rather than introduced bugs or regressions, although the results come from a relatively small, company-specific sample and still retain an engineer checkpoint for target-value confirmation and PR landing."
notion:
  pageId: "3c7f8dff-2538-8095-a70a-df764625fb55"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-25T08:42:00.000Z"
  lastEditedTime: "2026-08-25T08:42:00.000Z"
  publishedAt: "2026-08-25T08:56:09Z"
---

## Overview

DoorDash applied LLMs to a large, repetitive software-maintenance problem: removing stale feature flags from production code. Its experimentation platform manages more than 60,000 dynamic values across approximately 623 repositories, while the company reported more than 1,000 stale flags and about 2,300 new flags being created each month. A manual cleanup can take an engineer one to two hours because the flag definition, dependency-injected wrapper, call sites, and tests may span many files. DoorDash therefore built a multi-agent system that starts from a Jira ticket and ends with a proposed pull request, while preserving a human checkpoint for confirming the flag's target value.

The system is an example of production-oriented LLMOps rather than a simple code-generation prompt. An orchestrator agent uses Jira, the experimentation platform, and repository search to create a structured cleanup plan. After an engineer confirms the plan, specialized removal agents edit code in isolated git worktrees, update tests, run builds and validation, and open a PR only if the local gates pass. In DoorDash's reported evaluation of 50 recent stale dynamic values, 45 produced usable PRs, at an average cost of $4.79 and 13.8 minutes per cleanup. The authors report no bugs or regressions in the changed code, but the evaluation also shows an important limitation: the system is more likely to leave incomplete dead-code removal in complex call chains than to make an unsafe semantic change.

## Problem and operational context

DoorDash calls its feature flags dynamic values, or DVs. A DV is classified as stale when it has not been modified for 90 days, remains referenced in code, is not archived or retired, and is not on an exclusion list. A daily cron job identifies such values, creates a STALEDV Jira ticket, and assigns it to the DV's creator. This provides a queue and an operational trigger for the automation system.

Stale flags create maintenance and operational risks. Their branches increase the amount of code engineers must understand, preserve dormant behavior, and can become especially confusing during incidents. DoorDash cites prior research and an industry example to illustrate the potential risk, but those external observations are motivation rather than evidence that this particular system prevents such incidents. The company's core scaling challenge is that cleanup demand grows faster than available engineering capacity, making an automated background process attractive.

## Why conventional automation was insufficient

AST-based tools such as Piranha work well when a feature flag is accessed through a direct, recognizable API pattern. DoorDash's code instead uses a three-layer, dependency-injected design. A string constant defines the DV name, a wrapper class calls the dynamic-values client, and business logic receives the wrapper through dependency injection. A Boolean check may therefore look conceptually like `featureFlags.shouldEnableX(userId)` in one class, while the DV name and client call reside in separate files.

The relationships between these elements are semantic and depend on method calls, interfaces, and dependency injection. Pattern matching over an individual syntax tree cannot reliably infer the full call chain or determine which branch should remain after cleanup. The cleanup can also affect five to 20 files, including definitions, wrappers, callers, parameter threading, and tests. This is why DoorDash selected agents capable of inspecting broader repository context rather than relying only on deterministic rewrite rules.

A source-code-only solution would also lack the information needed to choose the replacement value safely. DVs may be Boolean, integer, string, or JSON values, and the correct constant is determined by live state in the experimentation platform. A feature can be only partially rolled out, such as 60 percent, or an experiment can have been abandoned at zero percent. Hardcoding a value inferred from a default in source code could silently change behavior. The production integration therefore needs access to current rollout metadata, not merely repository contents.

## Architecture and workflow

The implementation uses Google's Agent Development Kit. It is divided into two phases with one human checkpoint between analysis and code modification.

During Phase 1, an orchestrator agent, reported as Claude Sonnet, retrieves stale-DV Jira tickets through the Atlassian command-line interface, queries DoorDash's experimentation platform through the Model Context Protocol, discovers the relevant repository, and searches for code references. The platform lookup supplies metadata including the DV UUID, rollout percentage, and target value. The orchestrator then produces a structured report proposing the replacement value and identifying affected files.

MCP is important here as an integration boundary. It gives the model a controlled way to retrieve live application or experimentation context that is not present in the repository. For example, a DV at zero percent rollout can lead to removal using the baseline value, while a partial or ambiguous rollout can be held for human review. The text does not describe the detailed authentication, authorization, audit logging, or failure behavior of the MCP service, so those would remain important implementation questions for a broader deployment.

At the human checkpoint, an engineer reviews the report and confirms each target value before any code edits occur. This is not merely a review of generated code; it is a decision point about intended production behavior. For a partially rolled-out or abandoned experiment, the engineer may first complete or roll back the rollout, skip cleanup, or approve the proposed value. The design consequently limits autonomous action at the riskiest semantic boundary.

In Phase 2, the orchestrator starts one removal agent per confirmed DV. The agents use Claude Opus for deeper code reasoning and operate in separate git worktrees, with up to four running concurrently per repository. Each agent searches for the constant, wrapper, call sites, and related tests; chooses a strategy based on the DV type and usage; replaces wrapper calls with the confirmed target value; simplifies constant conditionals; removes now-unused definitions and parameters; and updates or deletes obsolete tests. It then runs the build, tests, JaCoCo patch-coverage validation, and Detekt static analysis. A PR is not opened until these checks pass.

## Guardrails and reliability design

Isolation is a central operational control. A dedicated worktree prevents concurrent agents from editing the same checkout and makes a failed attempt disposable. DoorDash reports that early experiments without worktree isolation produced race conditions and corrupted diffs. Gradle is run with `--no-daemon` to reduce cross-worktree state pollution. Each agent also has a one-hour hard timeout, which limits runaway sessions and bounds resource consumption.

The validation gates are deterministic checks around a probabilistic editing process. Changed lines must achieve at least 95 percent patch coverage through JaCoCo, and Detekt checks static-analysis and style conditions. Builds and tests must pass before a PR is created. These controls do not prove full semantic correctness, particularly for code paths that are weakly exercised or for behavior affected by external rollout state, but they reduce the chance that an incomplete or syntactically invalid patch reaches review.

The stated reliability boundary is completeness rather than correctness. When an agent fails, the desired outcome is an unmerged or incomplete cleanup, not a breaking code change. This is supported by worktree disposal, validation gates, and human-controlled PR landing. That boundary should be interpreted carefully: passing tests and coverage are evidence, not a formal guarantee that no regression exists, and the no-regression result is the company's observation over the evaluated sample rather than an independently reproduced benchmark.

## Evaluation and reported results

DoorDash evaluated 50 of the most recent stale DVs across several Kotlin repositories. The sample contained 41 Boolean values, six string values, and three integer or long values. By complexity, six were simple single-check cleanups affecting one or two files, 18 were medium cases spanning three to five files with some test changes, and 26 were complex cases involving nested conditionals, cross-file dependencies, non-Boolean types, or substantial test refactoring.

Thirty-one of the 50 cleanups were merged in the first shot, 14 required one minor revision, and five required engineer intervention. The reported rates were 100 percent first-pass cleanup for simple DVs, 94 percent for medium DVs, and 85 percent for complex DVs. The 14 revisions were attributed to six patch-coverage failures and eight incomplete removals, such as a leftover variable or reference in a deeper call chain; the post states that these were fixed after one additional LLM prompt. All five intervention cases were associated with call-chain depth and cross-interface parameter threading.

Average time and cost increased with complexity. Simple cases averaged 7.5 minutes and $2.69, medium cases 10.4 minutes and $3.46, and complex cases 17.7 minutes and $6.20. Some complex outliers approached 40 minutes and $19. Across the sample, the aggregate average was 13.8 minutes and $4.79. These figures are useful operational indicators, but they are not necessarily transferable to other languages, repositories, model prices, codebase architectures, or validation environments. The comparison with manual work is also based on DoorDash's estimate of one to two hours per cleanup, not a controlled time-and-motion study.

## Tradeoffs and lessons

Using Sonnet for orchestration and Opus for code modification reflects a cost-versus-capability allocation: a less expensive model handles metadata gathering and planning, while the more capable or expensive model is reserved for call-chain reasoning and edits. This can reduce cost, but it introduces model-specific routing, prompt, and regression-management concerns. The source does not provide token volumes, model configurations, retry counts, or a comparison against a single-model design, so the precise savings from specialization cannot be independently assessed.

The strongest design choice appears to be the live experimentation lookup. Without it, an agent could produce a clean-looking patch that preserves the wrong behavior. The other prerequisites identified by DoorDash are isolated execution environments and deterministic gates before PR creation. Together, these make the system a controlled developer tool rather than an unrestricted autonomous coding agent.

The remaining work includes a Phase 1 confidence score that could automatically approve low-risk cases, such as a fully rolled-out Boolean DV whose production value already matches the code default. That direction could reduce human workload, but it also raises the threshold for confidence calibration, auditability, and handling stale or inconsistent rollout metadata. DoorDash also plans a post-cleanup code-quality pass to detect names or abstractions that no longer make semantic sense after a flag is removed. Overall, the case demonstrates a pragmatic production pattern: use LLMs for repository-scale semantic reasoning, keep external state retrieval explicit, isolate side effects, and require conventional engineering validation before changes enter the normal review and deployment process.
