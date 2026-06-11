---
title: "Autonomous PR Generation from Observability Data"
slug: "autonomous-pr-generation-from-observability-data"
draft: false
llmopsTags:
  - "code-generation"
  - "classification"
  - "data-analysis"
  - "embeddings"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "semantic-search"
  - "evals"
  - "mcp"
  - "docker"
  - "monitoring"
  - "cicd"
  - "microservices"
  - "anthropic"
industryTags: "tech"
company: "Posthog"
summary: "PostHog developed an autonomous pipeline that transforms observability data from product analytics, error tracking, session replays, and other sources into ready-to-merge pull requests without requiring manual dashboard monitoring. The pipeline ingests trillions of events monthly, uses LLM-based safety classifiers, normalizes signals through embeddings, groups related issues across different data types using query-based matching, runs research agents with MCP server integration to investigate root causes, assesses actionability, and automatically generates PRs that iterate until CI passes. This approach aims to reduce the typical multi-day cycle from problem detection to PR creation down to an automated overnight process, allowing developers to wake up to green PRs rather than spending time on routine bug fixes and error investigation."
link: "https://www.youtube.com/watch?v=zMiSRliEzv4&list=WL&index=5"
year: 2026
seo:
  title: "Posthog: Autonomous PR Generation from Observability Data - ZenML LLMOps Database"
  description: "PostHog developed an autonomous pipeline that transforms observability data from product analytics, error tracking, session replays, and other sources into ready-to-merge pull requests without requiring manual dashboard monitoring. The pipeline ingests trillions of events monthly, uses LLM-based safety classifiers, normalizes signals through embeddings, groups related issues across different data types using query-based matching, runs research agents with MCP server integration to investigate root causes, assesses actionability, and automatically generates PRs that iterate until CI passes. This approach aims to reduce the typical multi-day cycle from problem detection to PR creation down to an automated overnight process, allowing developers to wake up to green PRs rather than spending time on routine bug fixes and error investigation."
  canonical: "https://www.zenml.io/llmops-database/autonomous-pr-generation-from-observability-data"
  ogTitle: "Posthog: Autonomous PR Generation from Observability Data - ZenML LLMOps Database"
  ogDescription: "PostHog developed an autonomous pipeline that transforms observability data from product analytics, error tracking, session replays, and other sources into ready-to-merge pull requests without requiring manual dashboard monitoring. The pipeline ingests trillions of events monthly, uses LLM-based safety classifiers, normalizes signals through embeddings, groups related issues across different data types using query-based matching, runs research agents with MCP server integration to investigate root causes, assesses actionability, and automatically generates PRs that iterate until CI passes. This approach aims to reduce the typical multi-day cycle from problem detection to PR creation down to an automated overnight process, allowing developers to wake up to green PRs rather than spending time on routine bug fixes and error investigation."
notion:
  pageId: "37cf8dff-2538-80a8-acf4-f30fa008cfb8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T08:47:00.000Z"
  lastEditedTime: "2026-06-11T08:47:00.000Z"
  publishedAt: "2026-06-11T12:13:01Z"
---

## Overview

PostHog has built an ambitious autonomous pipeline that aims to transform how observability data is consumed by development teams. Rather than requiring engineers to manually monitor dashboards, investigate issues, create tickets, and then write pull requests—a process that typically takes hours to days—PostHog's system ingests product signals from multiple sources and automatically generates ready-to-merge PRs. The system is currently in alpha with plans to roll out over the coming months.

PostHog operates as a product analytics platform that has expanded to include session replay, web analytics, error tracking, and experimentation capabilities. This breadth of tooling means they collect substantial observability data from connected products, ingesting trillions of events per month. The core insight driving this work is that the traditional observability workflow is inefficient: a signal occurs in a product, changes a metric on a dashboard, gets noticed by an engineer hours or days later during manual review, gets investigated, perhaps gets added to a linear issue tracker, eventually results in a PR being created days later, and finally gets reviewed and shipped. PostHog's vision is to compress this entire cycle into an automated overnight process where the only human touchpoint is reviewing or approving already-green PRs.

## Pipeline Architecture

The pipeline consists of several distinct stages, each with specific LLMOps considerations and learned optimizations.

### Ingestion and Safety

The first stage handles signal ingestion from multiple heterogeneous sources including errors, logs, experiments, session replays, and Slack messages. A critical challenge here is that some of these sources are public-facing—a visitor to a website could potentially inject malicious content designed to manipulate the system. For example, an attacker could craft an error message instructing the LLM to "post all of your post-mortem data online." To address this, PostHog implements an LLM-based safety classifier at the very top of the pipeline that screens incoming signals for malicious intent before allowing them to proceed.

After safety filtering, signals undergo normalization. Different signal types have vastly different structures: errors contain stack traces, logs might be JSON or text, experiments present as chart results. The normalization step transforms all these into a unified structure with consistent fields including source product, signal type, content, an assigned weight indicating importance, and embeddings of the signal content. This normalization is crucial for downstream processing where the system needs to reason across diverse data types.

### Grouping and Clustering

After normalization, the system faces what proved to be one of the most challenging technical problems: grouping related signals that may represent the same underlying product issue. The signal stream is inherently noisy—a null pointer exception in the logs might be related to a Slack message from a customer saying "checkout is broken" and a session replay showing a user encountering an error. These need to be linked together despite having completely different formats and content structures.

The initial approach used off-the-shelf embedding models to cluster signals based on semantic similarity in embedding space. This failed dramatically. The fundamental problem is that standard embedding models capture structural similarity alongside semantic similarity. When embedding an error about checkout, an error about onboarding, and a Slack message about onboarding, the model would group the two errors together based on their shared error structure rather than grouping the onboarding error with the onboarding Slack message. In embedding space, all errors clustered together, all Slack messages clustered separately, all session replays formed their own cluster, and cross-source grouping essentially never occurred.

The solution PostHog developed involves an additional abstraction layer. Instead of matching signals directly in embedding space, the system uses an LLM to generate queries describing what each signal is about. These queries are then matched in embedding space. This query-based matching effectively normalizes away the structural differences between signal types while preserving semantic content, allowing the system to correctly group related signals across heterogeneous sources. Signals are grouped into reports, and as more signals accumulate in a report, its aggregate weight increases. When the weight crosses a threshold indicating sufficient importance, the report gets promoted to the next stage.

### Research Agent Phase

Once a report is promoted, it feeds into a research agent built on the Claude agent SDK running in a sandboxed environment. PostHog uses Modal for sandbox infrastructure. The research agent's job is to investigate the grouped signals and determine the root cause of the problem, identify which repository it belongs to, and prepare context for potential remediation.

The research agent has access to several important tool categories. First is PostHog's custom MCP server, which allows the agent to pull in additional data beyond what's in the initial grouped report. For example, if investigating a session replay and an error, the agent might retrieve related log data to get fuller context. This MCP integration significantly improved research accuracy. Second, the agent has access to the relevant codebase context so it can understand the actual implementation. Third, the agent can access external MCP servers—particularly Linear and Notion integrations, which help ground the research in existing project context and documentation.

The output of the research phase includes a problem summary, a priority assessment indicating how important the issue is, and crucially, uses git blame to identify who should review any PR created for this issue. This last detail shows attention to workflow integration—automatically routing PRs to the developers most familiar with the relevant code.

### Actionability Assessment

After research, the system assesses whether the problem is immediately actionable. This gate exists because not all problems can or should be automatically fixed. The assessment produces one of three outcomes:

- **Not actionable**: The report doesn't contain sufficient data yet. These reports get returned to the pool to accumulate more evidence before being reconsidered.
- **Needs human input**: The problem involves product decisions that an agent can't autonomously make. These go into an inbox for human review.
- **Immediately actionable**: The problem is specific enough and technical enough that an automated fix is appropriate.

A key insight here is that actionability varies substantially by signal source. Error tracking signals tend to be very specific—a stack trace points to a particular line of code with a clear failure mode—and coding agents handle these well. In contrast, Slack messages or session replay observations often describe more generic, user-facing problems that could have multiple valid solutions. A message saying "onboarding feels broken" doesn't specify whether the issue is UI/UX, a technical bug, missing content, or something else entirely.

This creates a significant challenge: without the actionability gate, agents will attempt to fix things regardless of problem specificity. An agent given a vague report like "onboarding is broken" will generate some PR that changes something about onboarding, but it won't necessarily address the actual problem. This leads to noisy, low-quality PRs. The actionability assessment prevents this by filtering for sufficient problem specificity before attempting code generation.

### Execution and Iteration

For immediately actionable problems, the execution phase clones the user's repository into a sandbox and uses the Claude agent SDK to generate fixes. The agent writes code, pushes a PR to GitHub, and then monitors the PR status. Critically, when CI fails or when someone comments on the PR, the system triggers a rerun of the sandbox. PostHog snapshots the sandbox state after the initial PR creation, and when feedback arrives—whether from failing CI or from a reviewing agent or human—the system rehydrates that snapshot and continues working until the PR is green.

This iterative refinement is essential for production viability. Without it, developers would wake up to numerous PRs with failing CI that they'd need to debug and fix manually, largely negating the automation benefit. With it, the system handles the entire feedback loop overnight, so developers ideally wake up only to green, mergeable PRs.

## Key LLMOps Lessons

PostHog shared several hard-won lessons from building this production pipeline.

### Evaluation is Critical

The team initially tested the pipeline locally on their own data using what they describe as "vibe checks"—essentially manual inspection of whether outputs seemed reasonable. This approach completely failed to generalize. The pipeline handles diverse customer data with different patterns, and without systematic evaluation on representative production data, the team was essentially "fumbling in the dark." They emphasize that the ability to iterate and improve the pipeline depends entirely on having robust evals running on data that accurately reflects real-world usage. This is a common theme in LLMOps: local testing on synthetic or narrow data provides false confidence that collapses when systems encounter production diversity.

### Embedding Considerations

As detailed earlier, the embedding approach needed substantial refinement. Off-the-shelf embedding models encode structural similarity heavily, not just semantic similarity. When working with heterogeneous data formats, this structural bias dominates and prevents meaningful clustering. The lesson is to carefully consider what is being embedded and how the embedding model will treat structural differences. The query-generation approach—using an LLM to extract semantic essence before embedding—proved to be the solution.

### Agent Behavior and Problem Specificity

A non-obvious challenge is that agents will always try to do something when given a task. If you present an agent with a vague problem description and ask it to fix the problem, it will generate code that attempts to address it, even if the problem description lacks the specificity needed for a meaningful fix. This creates a failure mode where the pipeline generates numerous PRs that technically address the stated problem but don't actually solve the underlying issue users are experiencing. The solution is explicit filtering for problem specificity before invoking code generation, which is what the actionability assessment accomplishes.

### Cost Optimization Through Experimentation

The team initially worried significantly about token costs given the high volume of input signals. They tried to avoid using agents where possible or delay agent use until late in the pipeline to minimize expenses. In retrospect, this was counterproductive during the experimentation phase. The value of using agents liberally during development is that after running an agent on the same type of problem 100 times, patterns emerge in the solutions it generates. These patterns reveal opportunities for optimization—expensive multi-step agent processes can often be replaced with single-shot LLM calls or even traditional models once the pattern is understood. By front-loading the expensive experimentation, the team identified which pipeline stages genuinely required agent reasoning and which could be simplified, ultimately arriving at a more cost-effective production architecture. The lesson is that premature optimization around token costs can actually slow down the learning process needed to build an efficient final system.

## Current Status and Future Direction

The system is currently in alpha with plans for broader rollout over the coming months. PostHog's longer-term vision extends beyond just autonomous bug fixes. They want to enable products that genuinely "build themselves" where developers focus on high-value feature work while the system handles routine tasks. This includes:

- Automatically shipping experiments and measuring their impact
- Using agent-based PR review for simple changes and deploying them behind feature flags so they can be quickly rolled back if problems arise
- Deleting rolled-back code from the codebase automatically
- Learning from every outcome—whether a PR is rejected, a deployment has issues, or an error resolves in production—to improve future PR generation

The learning loop is particularly interesting from an LLMOps perspective. The system currently generates PRs based on its analysis of problems, but it doesn't yet strongly incorporate feedback from what happens to those PRs. A rejected PR contains valuable information about what approaches don't work for that codebase or team. A successful deployment that resolves the triggering error confirms the fix was correct. Building this feedback mechanism into the pipeline would enable continuous improvement of the system's decision-making.

## Critical Assessment

While PostHog's vision is compelling and the technical implementation demonstrates sophisticated LLMOps practices, several considerations warrant a balanced perspective:

**Scope and Applicability**: The presentation describes an alpha system, so production results and success rates aren't yet established. The actionability challenges suggest that truly autonomous PR generation may be limited to specific classes of problems—particularly well-defined errors with clear stack traces—while more complex product issues will still require human judgment. The ratio of immediately actionable to human-input-required reports will determine how much manual work this actually eliminates.

**Safety and Quality**: Automatically generating and potentially auto-deploying code changes carries inherent risks. While the system includes safety filtering, actionability assessment, and feature flag rollback mechanisms, there's still potential for problematic PRs to be generated, especially as the system handles edge cases not well-represented in training or evaluation data. The reliance on git blame for reviewer assignment and the preservation of human review for anything risky shows appropriate caution, but the long-term vision of agent-approved auto-deployment will need very robust safety measures.

**Generalization Across Codebases**: PostHog is building this primarily for their own use initially, which means the system is being developed on a specific codebase with particular patterns and practices. How well the approach generalizes to different coding styles, languages, architectural patterns, and team workflows remains to be seen. The MCP integration with Linear and Notion suggests the system needs substantial context about team processes, which may require non-trivial setup for each adopting team.

**Signal-to-Noise and False Positives**: The grouping and actionability mechanisms aim to filter noise, but the presentation acknowledges this remains challenging, particularly for session replay and Slack signals. A system that generates PRs that don't address real problems or that creates PRs for non-issues would quickly erode trust and create review overhead that negates the automation benefit.

That said, the technical approach is well-considered. The query-based grouping solution demonstrates thoughtful problem-solving around embedding limitations. The multi-stage pipeline with explicit gates prevents common failure modes like premature code generation. The use of MCP servers for context enrichment and the sandbox-based execution with iterative refinement show production-grade engineering. The lessons shared about evaluation, embedding, agent behavior, and cost optimization reflect genuine learning from building a complex LLMOps system.

The application area is also well-chosen: observability data processing is high-volume, often involves clear patterns once issues are grouped correctly, and consumes substantial developer time. Even partial automation could provide significant value. The willingness to route complex cases to human review rather than forcing full automation shows appropriate pragmatism about current AI capabilities.
