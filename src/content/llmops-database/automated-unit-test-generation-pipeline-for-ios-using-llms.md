---
title: "Automated Unit Test Generation Pipeline for iOS Using LLMs"
slug: "automated-unit-test-generation-pipeline-for-ios-using-llms"
draft: false
llmopsTags:
  - "code-generation"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "human-in-the-loop"
  - "harness-engineering"
  - "cicd"
  - "orchestration"
  - "anthropic"
industryTags: "education"
company: "Duolingo"
summary: "Duolingo built an automated pipeline using LLMs to generate unit tests for their iOS codebase, addressing the bottleneck where verification speed couldn't keep pace with their rapid development cycle that increasingly includes LLM-generated code. The system uses Claude Code integrated with Temporal workflows to autonomously identify untested files, generate test code, manage pull requests through their lifecycle, auto-heal CI failures, and coordinate reviewer assignment. Over 17 weeks, the pipeline merged 250 PRs containing approximately 85,000 lines of test code and 4,460 test functions, more than tripling test coverage of core MVVM components from 9% to 30%, with 76% of PRs passing CI on first attempt and minimal manual intervention required."
link: "https://blog.duolingo.com/ai-ios-unit-test-generation-pipeline/"
year: 2026
seo:
  title: "Duolingo: Automated Unit Test Generation Pipeline for iOS Using LLMs - ZenML LLMOps Database"
  description: "Duolingo built an automated pipeline using LLMs to generate unit tests for their iOS codebase, addressing the bottleneck where verification speed couldn't keep pace with their rapid development cycle that increasingly includes LLM-generated code. The system uses Claude Code integrated with Temporal workflows to autonomously identify untested files, generate test code, manage pull requests through their lifecycle, auto-heal CI failures, and coordinate reviewer assignment. Over 17 weeks, the pipeline merged 250 PRs containing approximately 85,000 lines of test code and 4,460 test functions, more than tripling test coverage of core MVVM components from 9% to 30%, with 76% of PRs passing CI on first attempt and minimal manual intervention required."
  canonical: "https://www.zenml.io/llmops-database/automated-unit-test-generation-pipeline-for-ios-using-llms"
  ogTitle: "Duolingo: Automated Unit Test Generation Pipeline for iOS Using LLMs - ZenML LLMOps Database"
  ogDescription: "Duolingo built an automated pipeline using LLMs to generate unit tests for their iOS codebase, addressing the bottleneck where verification speed couldn't keep pace with their rapid development cycle that increasingly includes LLM-generated code. The system uses Claude Code integrated with Temporal workflows to autonomously identify untested files, generate test code, manage pull requests through their lifecycle, auto-heal CI failures, and coordinate reviewer assignment. Over 17 weeks, the pipeline merged 250 PRs containing approximately 85,000 lines of test code and 4,460 test functions, more than tripling test coverage of core MVVM components from 9% to 30%, with 76% of PRs passing CI on first attempt and minimal manual intervention required."
notion:
  pageId: "389f8dff-2538-80ac-9dc6-cbb479405d86"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-24T13:56:00.000Z"
  lastEditedTime: "2026-06-24T13:56:00.000Z"
  publishedAt: "2026-06-29T15:15:20Z"
---

## Overview

Duolingo's iOS engineering team built a comprehensive LLM-powered system for automated unit test generation that operates in production at substantial scale. This case study is particularly interesting because it addresses a meta-problem in LLMOps: as LLMs increasingly generate production code, the verification and testing bottleneck becomes more critical than the code generation itself. The team's solution demonstrates sophisticated orchestration, state management, and lifecycle automation around LLM code generation agents.

The business context is that Duolingo ships iOS releases weekly with a codebase growing by tens of thousands of lines monthly, and a meaningful portion of new code is now LLM-generated. This creates a fundamental shift where verification speed, not code writing speed, becomes the limiting factor. Unit tests are positioned as the cheapest and fastest verification layer, making automated test generation a strategic priority for sustaining development velocity.

## System Architecture and Components

The system is architected around four major components that evolved over approximately 17 weeks from initial experimentation to full production deployment.

**Local Validation Phase**: The team started with manual experimentation, running Claude Code locally for several weeks to understand which files LLMs could test effectively and to identify common failure modes. This phase was critical for prompt tuning and building heuristics. The team tracked two early batches of 17 and 40 PRs respectively, achieving approximately 47-48% merge rates. This relatively modest initial success rate was valuable for identifying systematic issues that could be addressed at scale.

The failures clustered into specific categories including mock type mismatches, Swift 6 Sendable violations, mixing of SwiftTesting and XCTest APIs, access control problems, missing try/throws syntax, publisher timing issues, and Sendable compliance. Importantly, some failures revealed architectural problems in the codebase itself rather than LLM limitations. For example, repository classes were taking concrete `UserClient` instances instead of the protocol interface, making dependency injection impossible. The team migrated the entire codebase to use protocols and added linter rules to enforce this pattern going forward. They also rewrote LLM rules to be explicit about framework selection and added guidance about `@Sendable` annotations and `@preconcurrency` imports. These fixes improved CI pass rates for all engineers, not just the automated pipeline.

**Label Trigger Component**: For generating tests alongside new development, developers can add a `trigger:write-tests` label to any iOS PR. A GitHub webhook fires when the label is applied, triggering the `iOSTestGenerationForPRWorkflow` in Temporal via their Nexus gateway. The workflow fetches the PR's changed files and calls `CodingAgentWorkflow` to generate tests for all testable files in a single agent session. The result is a draft PR branched off the developer's feature branch with a comment linking back to the original PR. This allows developers to review and merge test PRs into their feature branch before the main PR lands, maintaining a tight feedback loop.

**Scheduled Backfill Workflow**: This is described as the heart of the pipeline and runs every few hours to systematically improve coverage across the existing codebase. The workflow pulls the latest Xcode coverage data from S3 (uploaded by CI on every merge to main) and scores every Swift file using a weighted system. The scoring considers file type (2.5x weight favoring clean MVVM patterns like ViewModels and Repositories, downweighting ambiguous types), coverage gap (0.5x weight for uncovered lines), size (-0.3x weight preferring smaller files), and module priority (0.5x weight with Feature and Legacy libraries scoring highest). This scoring system evolved directly from the heuristics developed during local validation.

Before generation, files pass through three filters: checking for existing open PRs on that file, checking for existing test files in the repo, and checking a cooldown period (30 days) if the lifecycle workflow previously gave up on the file. After filtering, the workflow selects the top N files (currently 5 per run) and spawns child workflows for each.

Each child `iOSTestGenerationWorkflow` calls a `CodingAgentWorkflow` that kicks off a remote Claude Code session. The agent clones the iOS repo, reads a 12-step testing process document plus patterns for mock and fake generation, analyzes the source file, and generates the test file plus any required mocks and fakes. PRs are created with the `generated-test` label for easy filtering. A significant constraint is that Temporal workers run on Linux machines, so the agent cannot build or compile the code it writes during generation. This limitation forces reliance on CI feedback rather than local validation, which becomes a key challenge discussed later.

**PR Lifecycle Manager**: Generating PRs is positioned as only half the problem; without proper lifecycle management, PRs accumulate merge conflicts, sit in review queues, or create noise rather than value. The lifecycle workflow runs on a schedule and acts as an automated project manager for every open `generated-test` PR.

The workflow evaluates a decision tree for each PR: merge conflicts trigger immediate closure without cooldown (since regenerating from clean main will likely succeed); stale PRs over 14 days are closed with a 30-day cooldown on the source file; CI-pending PRs are skipped until next cycle; green PRs without reviewers get assigned and auto-merge is enabled; green PRs with reviewers are left alone; red PRs exceeding max retries (5) are closed with failure labels and 30-day cooldown; red PRs within retry budget get the `fix-ci` label triggering another Temporal workflow to fetch CI logs and push fix commits; pre-commit failures get the `apply-pre-commit` label triggering a GitHub Action to run pre-commit and commit fixes; and rejected PRs trigger 30-day cooldowns.

## State Management and Coordination

A particularly interesting LLMOps consideration is how the team handles state coordination across multiple asynchronous workflows. The backfill and lifecycle workflows need to share state about which files are in cooldown, PR histories, retry counts, and action histories. The team considered DynamoDB but settled on a lightweight S3-based state store where each source file and PR gets its own JSON record. The backfill workflow checks these records before selecting files, and the lifecycle workflow updates them after every action. This demonstrates a pragmatic approach to state management that avoids over-engineering while maintaining necessary coordination.

## Production Results and Metrics

Over 17 weeks, the pipeline merged 250 test PRs adding approximately 85,000 lines of test code and 4,460 test functions across 233 unique classes. Overall MVVM test coverage climbed 240% from 9% to 30%. Repository coverage grew 352%, ViewModels increased 203%, and DataSources grew 192%. The pipeline went from zero to fully automated in under two months and runs autonomously generating approximately 20 test PRs per day.

Critically, every one of the 250 PRs was reviewed and approved by a human engineer before merging. The pipeline assigns reviewers using `git blame` history to ensure reviewers have appropriate context on the source file being tested. This human-in-the-loop approval is an important safeguard and quality control mechanism.

From a CI quality perspective, 76% of merged PRs passed CI on their first attempt. For the remaining 24%, the auto-healing mechanisms (pre-commit fixes, CI retry loops, and ultimately closure with cooldown) handled the failures. This 76% first-pass rate represents substantial improvement from the 47-48% merge rates during initial local validation, demonstrating the value of the prompt tuning and architectural fixes implemented during that phase.

## Challenges and Limitations

The case study candidly discusses several challenges, which provides valuable balance to the success metrics.

**SwiftLint Failures**: The most recent batch saw a 13.6% failure rate, with the vast majority caused by SwiftLint violations. Two rules alone accounted for 62% of these failures. This stems directly from the constraint that Temporal workers run on Linux and cannot compile or lint code before opening PRs. The team is upgrading workflows to run on Mac instances soon, which will enable local SwiftLint validation before PR creation. This highlights a common LLMOps tradeoff: infrastructure convenience (using existing Linux workers) versus validation completeness (needing Mac environments for iOS tooling).

**Agents Going Off-Script**: There was an incident where the CI auto-fix agent modified production source files in a test PR instead of limiting changes to test files. The team is actively adding guardrails to enforce stricter rules about what files agents can and cannot touch. This represents a critical safety consideration in production LLM systems: agents with write access to repositories need robust constraints to prevent unintended modifications. The incident demonstrates the importance of defensive guardrails even when prompts seem clear.

**Reviewer Bandwidth**: Perhaps the most important bottleneck identified is that generating tests is now the easy part, while review is the constraint. The pipeline can produce PRs faster than the existing review process can absorb them. PR quality determines velocity through the reviewer queue. The team's focus going forward is improving generated PR quality through prompt tuning and adding a second reviewer agent that verifies each generated test before reaching a human reviewer. This represents a multi-agent architecture evolution where one agent generates and another validates before human review.

## Prompt Engineering and LLM Rules

While specific prompts aren't shared, the case study indicates the team maintains a 12-step testing process document plus patterns for mock and fake generation that the agent reads before generating tests. The rules were iteratively refined based on failure analysis, becoming explicit about which testing framework to use (SwiftTesting vs XCTest), providing guidance on `@Sendable` annotations and `@preconcurrency` imports, and encoding architectural patterns learned from early failures.

This represents a classic LLMOps pattern of treating prompts and rules as code that evolves through empirical feedback from production results. The team spent weeks analyzing CI outcomes to systematically address prompt issues, demonstrating disciplined iteration rather than one-shot prompt engineering.

## Broader Implications and Future Directions

The team positions this as a generalizable pattern of "prompt → generate PR → get CI feedback → iterate" that applies beyond unit testing to refactors, migrations, and dead code cleanup. They plan to extend the system to these additional engineering workflows.

The architecture demonstrates several LLMOps best practices: using orchestration systems (Temporal) to manage complex workflows, maintaining state to coordinate across asynchronous processes, implementing automatic retry and healing mechanisms, preserving human oversight through required reviews, using empirical feedback (CI results) to improve system quality, and building incrementally from local validation through to full automation.

## Assessment and Balanced View

From a balanced perspective, the results are impressive in absolute terms—85,000 lines of test code and tripling coverage—but should be contextualized. The 76% first-pass CI success rate is good but not exceptional, indicating room for improvement. The 13.6% SwiftLint failure rate in recent batches suggests the system regressed slightly, possibly as it tackled more challenging files or as prompts drifted. The need for five retry attempts and 30-day cooldowns indicates a non-trivial failure rate even with auto-healing.

The human review requirement for all 250 PRs means this isn't fully autonomous code generation but rather LLM-assisted test generation with human validation. This is appropriate and responsible, but the reviewer bandwidth bottleneck suggests the system may have reached capacity at current quality levels. The planned addition of a reviewer agent is logical but adds complexity and latency.

The incident with agents modifying production code is concerning and highlights the risks of giving LLMs write access to repositories, even within seemingly constrained contexts. The need for additional guardrails after deployment indicates the initial safety measures were insufficient.

The architectural decision to use Linux workers despite requiring Mac tooling for proper validation created a fundamental limitation that persisted for 17 weeks and is only now being addressed. This represents a technical debt tradeoff where infrastructure convenience was prioritized over validation completeness, though the team is now correcting it.

Overall, this case study represents a sophisticated production LLMOps implementation that achieved meaningful impact while honestly acknowledging limitations and challenges. The system demonstrates mature engineering practices including empirical validation, iterative improvement, human oversight, automated lifecycle management, and candid assessment of failure modes. It provides a realistic picture of LLM-assisted code generation at scale, neither overselling capabilities nor understating the engineering required to make such systems reliable in production.
