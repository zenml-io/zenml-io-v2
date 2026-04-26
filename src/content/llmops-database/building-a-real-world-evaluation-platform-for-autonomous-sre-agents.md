---
title: "Building a Real-World Evaluation Platform for Autonomous SRE Agents"
slug: "building-a-real-world-evaluation-platform-for-autonomous-sre-agents"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "code-interpretation"
  - "evals"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "error-handling"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "anthropic"
industryTags: "tech"
company: "Datadog"
summary: "Datadog's Bits AI SRE team built a comprehensive evaluation platform to address subtle regressions in their autonomous Site Reliability Engineering agent that investigates production incidents. The problem was that feature improvements in one area would quietly degrade performance in others, with no systematic way to detect these changes before customer impact. Their solution involved building a replayable evaluation platform with two key components: a curated label set of representative investigations derived from real production incidents and user feedback, and an orchestration system that executes and scores the agent against these labels at scale. The platform evolved from manual label creation to an automated pipeline that uses Bits itself to generate and validate labels from customer feedback, reducing validation time by over 95% while dramatically increasing label creation rates. This infrastructure now enables the team to catch regressions, segment performance by domain, track quality over time, and evaluate new models against tens of thousands of real-world scenarios weekly."
link: "https://www.datadoghq.com/blog/engineering/bits-ai-eval-platform/"
year: 2026
seo:
  title: "Datadog: Building a Real-World Evaluation Platform for Autonomous SRE Agents - ZenML LLMOps Database"
  description: "Datadog's Bits AI SRE team built a comprehensive evaluation platform to address subtle regressions in their autonomous Site Reliability Engineering agent that investigates production incidents. The problem was that feature improvements in one area would quietly degrade performance in others, with no systematic way to detect these changes before customer impact. Their solution involved building a replayable evaluation platform with two key components: a curated label set of representative investigations derived from real production incidents and user feedback, and an orchestration system that executes and scores the agent against these labels at scale. The platform evolved from manual label creation to an automated pipeline that uses Bits itself to generate and validate labels from customer feedback, reducing validation time by over 95% while dramatically increasing label creation rates. This infrastructure now enables the team to catch regressions, segment performance by domain, track quality over time, and evaluate new models against tens of thousands of real-world scenarios weekly."
  canonical: "https://www.zenml.io/llmops-database/building-a-real-world-evaluation-platform-for-autonomous-sre-agents"
  ogTitle: "Datadog: Building a Real-World Evaluation Platform for Autonomous SRE Agents - ZenML LLMOps Database"
  ogDescription: "Datadog's Bits AI SRE team built a comprehensive evaluation platform to address subtle regressions in their autonomous Site Reliability Engineering agent that investigates production incidents. The problem was that feature improvements in one area would quietly degrade performance in others, with no systematic way to detect these changes before customer impact. Their solution involved building a replayable evaluation platform with two key components: a curated label set of representative investigations derived from real production incidents and user feedback, and an orchestration system that executes and scores the agent against these labels at scale. The platform evolved from manual label creation to an automated pipeline that uses Bits itself to generate and validate labels from customer feedback, reducing validation time by over 95% while dramatically increasing label creation rates. This infrastructure now enables the team to catch regressions, segment performance by domain, track quality over time, and evaluate new models against tens of thousands of real-world scenarios weekly."
notion:
  pageId: "34ef8dff-2538-8154-b810-e3c19190495c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:01:59Z"
---

## Overview

This case study describes how Datadog's engineering team built a sophisticated evaluation platform for Bits AI SRE, their autonomous agent designed to investigate production incidents across complex distributed systems. The agent reasons across multiple signal types including metrics, logs, traces, infrastructure metadata, network telemetry, and monitor configurations to determine, triage, and remediate root causes of production issues.

The core challenge that drove this work was subtle and systemic: feature improvements would pass initial tests but introduce unexpected regressions in other scenarios. The team describes a specific example where adding service name extraction to the agent's initial context improved targeted test cases but degraded investigation quality elsewhere by pulling in irrelevant signals that confused the agent's reasoning. Without representative evaluation coverage, these issues remained invisible until customers reported problems.

## The Evaluation Challenge

Early testing approaches proved insufficient for evaluating an autonomous agent operating in production environments. The team tried several strategies before building their comprehensive platform:

**Tool-level testing in isolation** seemed logical initially—if each individual tool behaved correctly, the agent should behave correctly. However, this assumption broke down because Bits' value derives from chaining tools together and reasoning across their outputs. Failures often emerged from interactions between steps rather than individual tool calls. For instance, the agent might retrieve valid signals from multiple tools but combine them incorrectly, leading to misattribution of issues to wrong components.

**Live replay of investigations** as online evaluation also failed to scale. Results couldn't be aggregated, environments changed during investigation execution, and investigations became unreplayable once underlying telemetry signals expired due to time-to-live (TTL) constraints.

Off-the-shelf evaluation frameworks assumed clean inputs and static test sets, which fundamentally breaks down when evaluating an agent that reasons across live production telemetry in complex, noisy environments. This led the team to build custom infrastructure tailored to their specific needs.

## Architecture: Labels and Orchestration

The evaluation platform consists of two interconnected components working in tandem:

**The Label System** represents individual investigation scenarios Bits would encounter in production. Each label contains two critical parts:

- **Ground truth**: Defines the actual root cause of the issue
- **World snapshot**: Captures the signals that were available when the issue occurred

Critically, the agent never sees the root cause directly during evaluation—it only accesses the signals that existed when the issue occurred, mirroring production constraints. Labels must preserve telemetry queries the agent would need (such as where to find memory metrics, container logs, deployment events) rather than storing raw data.

The label set must also reflect real-world diversity spanning Kubernetes pod failures, Kafka lag, deployment issues, and complex multi-service business logic side effects across various technologies, failure modes, and complexity levels. A narrow or overly clean dataset would inflate performance metrics and hide actual weaknesses.

**The Orchestration Platform** runs Bits against the label set, scores results, and tracks performance over time. The team needed to understand whether improvements for specific investigation types (like Kafka lag) accidentally broke other scenarios (like Kubernetes issues). This required running investigations at scale across different model and configuration variants while comparing results across runs.

The high-level architecture includes a shared label set feeding into an orchestration layer that executes agent investigations and produces reporting with historical tracking capabilities. This enables segmentation of the label set by relevant dimensions, scaled investigation execution, temporal result tracking, and easy cross-version performance comparison.

## Label Collection Evolution

The label collection process evolved through three distinct phases:

**Manual Internal Labeling Campaign**: Initial efforts involved hand-crafted labels from Datadog's own alerts across various scenarios. While this provided a starting point, it consumed engineering hours faster than it produced labels, and the resulting set still wasn't representative of real-world diversity.

**Embedded Label Creation**: To scale, the team embedded label creation directly into Bits AI SRE itself. When customers provide feedback on investigations, that signal combines with investigation metadata to construct ground truth root cause analysis and world snapshot queries. Every user interaction became a potential evaluation label, transforming label collection from manual effort into an automated pipeline that grows with product usage. This shift increased label creation rates by an order of magnitude.

**Agentic Validation**: As label ingestion rates grew, manual human review became a bottleneck risking loss of valuable feedback signals. The team addressed this by using Bits itself to assist before human review. Grounded in customer feedback and investigation telemetry, Bits aggregates related signals, derives relevant relationships, and resolves ambiguous references in feedback—for example, converting "it was slow" into precise statements about elevated latency in specific services.

Since Bits knows the true root cause from this process, it builds complete causal chains starting with problem statements (monitor firings or user-initiated investigations) and ending with underlying root causes. This agentic derivation required careful scoring and alignment work, but the results were dramatic: **validation time per label dropped by more than 95% in a single week**.

Human involvement shifted from manually assembling root cause analyses from raw signals to validating and refining Bits' outputs. Each generated label receives confidence scores across dimensions including thoroughness, specificity, and accuracy, with anything below defined thresholds flagged for human review.

The team observed approximately 30% improvement in label quality—specifically, root causes that would hold up under "5 Whys" analysis in postmortems. Higher-quality labels enabled more robust evaluation beyond just scoring final conclusions, allowing evaluation of the agent's trajectory: how close it got to correct answers, whether it investigated deeply enough, and whether it surfaced valuable telemetry.

## Signal Reconstruction and Environmental Noise

A counterintuitive but critical discovery was that simulated evaluation environments need to be messy to be predictive. With labels containing ground truth and associated signals, but telemetry having limited TTL, the team reconstructs investigation context by capturing structure and relationships across signals as snapshots of the world at issue occurrence.

They build simulated environments mirroring original investigation contexts, then run Bits inside them with full data-layer isolation so investigation context from one label doesn't affect others. This allows Bits to face the same constraints it would encounter in production, scoped to single environments.

The key insight was that **these simulated worlds need to be noisy**. Snapshotting only signals directly tied to root causes proved insufficient. In production, Bits operates in environments full of unrelated services, background errors, and tangential signals. To reflect this reality, they capture more than minimal signals needed to explain issues, expanding snapshots by discovering related components based on root cause chains—even components not directly involved in failures. Components might be included because they belong to the same platform, team, monitor, or have similar names.

This approach provides cost-effective mechanisms for injecting real-world noise into evaluation, mirroring how SREs must sift through red herrings during investigations. Without this noise, evaluation results looked deceptively good—essentially giving the agent an open-book exam with only relevant pages. The agent appeared more accurate in simplified environments than in real investigations.

When the team realized early labels were too narrow, they had to discard many and regenerate with broader signal reconstruction scope. Short-term metrics looked terrible—pass rates dropped roughly 11% and label counts decreased 35%—but long-term, this made evaluations predictive of production behavior. This highlighted that snapshotting telemetry is a one-way door: once telemetry expires, its structure and signals cannot be reconstructed.

## Scoring, Segmentation, and Regression Detection

The platform enables segmentation of label sets across multiple dimensions including technology, problem type, monitor type, and investigation difficulty. This segmentation allows development to scale across teams, with engineers focusing on specific agent components and evaluating changes against most relevant scenarios without interfering with other workstreams.

For reporting, the system stores scores for every scenario across every run, tracking results in Datadog dashboards and Datadog LLM Observability to compare performance across agent versions. An internal labeling application provides centralized observability and metadata management of labels.

Historical visibility helps spot behavioral shifts. Previously failing scenarios starting to pass (or vice versa) provide important signals. This historical score tracking, combined with linking to agent metadata, helps understand agent success evolution over time, identifies strength and weakness areas, and tracks label attributes like consistently passing/failing patterns and metrics like pass@k (given k independent attempts for a scenario, does the agent succeed on at least one).

Beyond targeted runs, the team executes full evaluation sets weekly to catch regressions that may have slipped through. A recent example involved internally dogfooding a new tool reasoning strategy that looked great on small evaluation subsets but showed immediate regressions when run against the full set. Results flow into dashboards and Slack notifications with alerts on significant overall performance deviations.

## Model Evaluation and Rapid Assessment

The evaluation platform fundamentally changed how the team responds to new models. New models don't just offer incremental improvements—they can unlock new workflows and capabilities while potentially breaking existing ones. When new models become available, the team runs them against full label sets to measure impact across domains, understanding improvements and regressions upfront rather than discovering them in production.

When Claude Opus 4.5 became available, they ran it against their full label set within days, identifying which investigation types improved and critically, which ones regressed. This kind of rapid, systematic evaluation of new models would have been impossible a year earlier, demonstrating the platform's value in enabling agile response to the evolving LLM landscape.

## Key Lessons and Principles

The team identified several critical lessons from building this platform:

**Invest in label collection and processing early**: Manual collection doesn't scale linearly while evaluation needs grow exponentially as agents expand into new domains. Using Bits itself to perform quality checks and fill gaps in labels removed the biggest blocker to scaling the system.

**Build for extensibility from the start**: Bits evolved faster than expected, as did underlying models. If adding new label types, integrating with new data sources, or modifying models requires significant rework, the evaluation system becomes a bottleneck. The platform's extensibility enabled developing a new agent architecture and capability set for v2 release within weeks of releasing the original Bits AI SRE Agent.

**Use evaluation data to steer product direction**: Segmenting results by domain reveals where agents perform well and struggle. When weak areas are identified, the team expands label sets in those domains, actively seeking the hardest scenarios by mining negative feedback and exploring frontier areas where the agent is least proven. The most valuable labels aren't ones Bits passes—they're ones it fails. In some cases, they create labels for capabilities the agent doesn't yet support, building evaluation suites alongside new features rather than retrofitting later.

## Organizational Impact and Cross-Platform Extension

The evaluation platform's impact now extends beyond Bits to other agents across Datadog. Label collection from human signals has become fuel for additional products. Other agents across Datadog are personalizing their reasoning loops based on evaluation information from users, enabling high agentic precision and reliability organization-wide.

The agentic label collection has widened to everyday workflows of software engineers at Datadog. Internal incidents, issues, and alerts transform into coherent evaluation labels, bootstrapping teams like APM and Database Monitoring as they build and refine their own agentic features. Any team building an agent now has access to large, representative label sets and evaluation infrastructure from day one.

This creates a feedback loop where agents operate in production, generate labels from user feedback, and improve over time through evaluation, deployment, and internal dogfooding—a cycle of continuous improvement grounded in real-world usage.

## Production Deployment and Scale

The platform runs Bits against tens of thousands of scenarios drawn from real incidents weekly. The team emphasizes that every week, something surprises them—which is precisely the point. They didn't set out to build an evaluation platform; they set out to build an agent that could investigate production incidents. The evaluation platform is what it took to trust it.

This comprehensive evaluation infrastructure represents a mature LLMOps practice specifically tailored to autonomous agents operating in complex, multi-signal production environments. The approach demonstrates how evaluation systems for production AI agents must go beyond traditional ML evaluation to account for environmental complexity, signal diversity, temporal constraints, and the emergent behaviors that arise from tool chaining and multi-step reasoning processes.
