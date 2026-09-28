---
title: "Operating a Cloud-Based Software Factory for Agentic Development"
slug: "operating-a-cloud-based-software-factory-for-agentic-development"
draft: false
llmopsTags:
  - "code-generation"
  - "classification"
  - "data-analysis"
  - "code-interpretation"
  - "mcp"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "model-optimization"
  - "cost-optimization"
  - "human-in-the-loop"
  - "harness-engineering"
  - "monitoring"
  - "orchestration"
  - "scalability"
  - "reliability"
industryTags: "tech"
company: "Warp"
summary: "Warp has organized AI-assisted software development into a centralized, cloud-executed “software factory” that turns requests from Slack, Linear, GitHub, and external systems into tracked implementation workflows. Factory agents triage work, create issues, modify code, open pull requests, perform QA with computer-use verification, and produce artifacts such as videos. Warp also records agent runs, costs, human interactions, and evaluation scores, then uses aggregate LLM-as-a-judge assessments and observer agents to identify recurring failures and propose updates to the factory configuration. The approach improves automation visibility and reportedly reduces model-related costs after configuration changes, but human review remains a significant bottleneck: implementation can reach a pull request in roughly 35 minutes while first human review takes about three and a half hours. The system therefore demonstrates both the operational value and the unresolved governance, quality, and trust tradeoffs of deploying coding agents at scale."
link: "https://www.youtube.com/watch?v=4_SHhSMHzNo"
year: 2026
seo:
  title: "Warp: Operating a Cloud-Based Software Factory for Agentic Development - ZenML LLMOps Database"
  description: "Warp has organized AI-assisted software development into a centralized, cloud-executed “software factory” that turns requests from Slack, Linear, GitHub, and external systems into tracked implementation workflows. Factory agents triage work, create issues, modify code, open pull requests, perform QA with computer-use verification, and produce artifacts such as videos. Warp also records agent runs, costs, human interactions, and evaluation scores, then uses aggregate LLM-as-a-judge assessments and observer agents to identify recurring failures and propose updates to the factory configuration. The approach improves automation visibility and reportedly reduces model-related costs after configuration changes, but human review remains a significant bottleneck: implementation can reach a pull request in roughly 35 minutes while first human review takes about three and a half hours. The system therefore demonstrates both the operational value and the unresolved governance, quality, and trust tradeoffs of deploying coding agents at scale."
  canonical: "https://www.zenml.io/llmops-database/operating-a-cloud-based-software-factory-for-agentic-development"
  ogTitle: "Warp: Operating a Cloud-Based Software Factory for Agentic Development - ZenML LLMOps Database"
  ogDescription: "Warp has organized AI-assisted software development into a centralized, cloud-executed “software factory” that turns requests from Slack, Linear, GitHub, and external systems into tracked implementation workflows. Factory agents triage work, create issues, modify code, open pull requests, perform QA with computer-use verification, and produce artifacts such as videos. Warp also records agent runs, costs, human interactions, and evaluation scores, then uses aggregate LLM-as-a-judge assessments and observer agents to identify recurring failures and propose updates to the factory configuration. The approach improves automation visibility and reportedly reduces model-related costs after configuration changes, but human review remains a significant bottleneck: implementation can reach a pull request in roughly 35 minutes while first human review takes about three and a half hours. The system therefore demonstrates both the operational value and the unresolved governance, quality, and trust tradeoffs of deploying coding agents at scale."
notion:
  pageId: "3e2f8dff-2538-8029-ab7a-c8a673f0204d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-21T15:31:00.000Z"
  lastEditedTime: "2026-09-21T15:31:00.000Z"
  publishedAt: "2026-09-28T08:26:45Z"
---

## Overview

Warp presents a software factory as a production system for coordinating coding agents rather than as a single coding copilot. The factory is a cloud-based, code-defined collection of repositories, MCP servers, configuration, agents, and automations. It accepts work from public collaboration channels and connected engineering systems, executes a broader workflow than “prompt to code,” and provides centralized measurement for engineering leaders. In the described setup, a request can move from Slack or another tool through triage, issue creation, implementation, pull-request creation, QA, computer-use verification, and human review.

The main operational motivation is scale. Warp reports processing more than 2,000 pull requests in a month, with an example showing approximately 35 minutes from task kickoff to pull request creation but about three and a half hours from pull request creation to first human review. This contrast is important: agentic implementation can shorten production time while shifting the constraint to review, validation, and organizational decision-making. The factory improves visibility and repeatability, but the evidence presented does not establish that it eliminates bottlenecks or that its generated software can safely bypass human review.

## Problem and operating model

Individual developers using local coding agents can generate code quickly, but local sessions make it difficult for managers to understand what agents are doing, how much they cost, which failure modes recur, and whether the organization is improving. Warp addresses this by moving execution and telemetry into a shared cloud environment. Work is initiated in public Slack channels by tagging an agent, but it can also originate in Linear, GitHub, or external operational systems. This makes the workflow visible to other contributors and allows multiple people to inspect or participate in the same task rather than leaving the work inside an individual developer’s local environment.

The factory distinguishes between the builder experience and the management or platform experience. For a builder, the interaction still resembles using an interactive coding agent: provide an idea, context, and perhaps an image or design requirement. For the organization, however, the request is treated as an input to a predefined production pipeline. The system records the task, coordinates the stages, and exposes aggregate data across runs. This separation is a useful LLMOps pattern because it preserves a relatively simple user interface while adding governance and operational controls around execution.

## Workflow and architecture

A representative request begins in Slack. A user tags the factory agent, supplies a feature request, and may attach an image or request computer use. The factory first triages the request and creates a Linear issue so the work has a durable project-management record. It then performs the implementation, integrates with GitHub to create a pull request, and runs QA. For interface changes, computer-use verification can exercise the completed feature and generate a video showing the interaction and keystrokes. The resulting package includes more than source code: it includes the issue, implementation, pull request, review context, and verification evidence.

The architecture is described as being defined in code. A factory includes repositories, MCP integrations, configuration, agent definitions, code-review agents, design-oriented agents, and automations. Code-defined configuration provides versioning and enables the team to freeze a factory state, compare alternative configurations, and replay work under different settings. It also creates a surface that coding agents can modify, allowing an observer agent to propose changes to the factory itself. In simplified form, the conceptual configuration resembles:

```text
factory = {
  repos: [...],
  mcp_servers: [...],
  agents: [triage, implementation, review, qa],
  automations: [...],
  scorers: [...]
}
```

The transcript does not provide an implementation specification for isolation, permissions, secrets management, rollback, or deployment approvals. Those controls would be material in a production deployment, particularly because the agents can access source code, issue trackers, collaboration tools, design files, email, calendars, and potentially customer-related information.

## Triggers and integrations

The system supports both human-initiated and system-initiated work. In addition to Slack requests, crash reports from Sentry can feed tasks into the factory for attempted automatic remediation. The described integrations include Slack for collaboration, Linear for issue tracking, GitHub for pull requests, Sentry for operational signals, and MCP servers for tool access. The same general approach is also applied outside core engineering: a coding agent can use a Figma MCP server to duplicate and modify a slide, a Granola MCP integration to analyze recent sales meetings, and a GOG CLI workflow to search email and calendar data for potential enterprise leads and create a Google Sheet.

These non-engineering examples show the breadth of the orchestration model, but they also broaden the risk boundary. Meeting analysis and lead discovery involve potentially sensitive business and personal data. The workflow includes an instruction not to print specific customer names or email addresses in the public thread, which is a useful data-minimization practice, but an instruction in a prompt is not equivalent to enforced access control or a complete data-loss-prevention policy. Production use would benefit from scoped credentials, tool-level authorization, audit logs, redaction, retention controls, and explicit approval for outbound or externally visible actions.

## Evaluation and feedback loops

Warp describes scoring across all agent runs rather than evaluating only isolated sessions. A scorer can inspect completed tasks for dimensions such as redundant tests or other known failure modes. One example uses an LLM as a judge to assess whether an implementation generated surplus tests. The judge model is selected with cost in mind, and the scoring system can apply a sampling rate rather than evaluating every run. This creates an aggregate view of behavior over time and makes recurring quality problems measurable.

The evaluation approach has two loops. The first is the measurement loop: collect runs, apply scorers, and review the resulting evidence. The second is a proposed self-improvement loop: after a sufficiently large sample of failed runs—described as roughly 20 to 25 examples—the observer agent identifies a recurring failure mode and suggests a change to the factory’s agent instructions or skills. The use of a meaningful sample size is a sound safeguard against overcorrecting from one anomalous task. However, LLM-as-a-judge assessments remain proxies. They can be inconsistent, biased toward stylistic patterns, or unable to determine whether a test is genuinely valuable. Important dimensions should be supplemented with deterministic checks, test outcomes, static analysis, human review, and task-specific acceptance criteria.

Because the factory is code-defined, configurations can be compared by replaying historical tasks with alternative models or prompts. Warp describes using past internal tasks in a manner analogous to public coding benchmarks, then comparing cost and quality under different model configurations. This supports evidence-based model routing—for example, selecting less expensive or faster models for task categories where quality remains acceptable. The stated quality comparison relies primarily on the same scoring infrastructure, although human or algorithmic judges could also be used. Replay evaluation is useful, but it can be limited by stale tasks, judge error, non-determinism, and the risk that historical workloads do not represent future work.

## Observability, metrics, and results

The management view includes automation levels, velocity, shipping time, agent cost, scoring results, and the number of human interactions associated with a pull request. “Human interactions” is a broad proxy that can include Slack reprompts, Linear comments, code-review corrections, and other steering activity. Lower interaction counts may indicate a more autonomous workflow, but they do not necessarily indicate better software: a difficult task may appropriately require extensive clarification, while a low-interaction task may have been accepted without sufficient scrutiny. The metric should therefore be paired with defect rates, rework, escaped incidents, review findings, delivery outcomes, and user impact.

Warp reports that agent cost was high several weeks earlier and declined after changes to model configuration. The company attributes model choice as the largest cost lever, with context management as a secondary factor. These are plausible operational levers, but the described results are directional rather than a controlled benchmark: the text does not quantify the before-and-after cost, identify all configuration changes, or separate model spend from infrastructure and human labor. The system’s centralized view nevertheless enables the organization to make those costs visible and to test tradeoffs between quality, latency, and spend.

Human review remains mandatory for all pull requests in the described workflow. Warp has changed its process so the person who prompted the agent may review its code, rather than requiring a different person to review every agent-generated change. The discussion suggests a future risk-based model in which low-risk changes can receive automated approval while medium- and high-risk changes require human review. That design could address the observed review queue, but it requires calibrated risk scoring, strong safeguards against missed issues, and monitoring for false approvals. The current system should therefore be understood as human-in-the-loop automation, not autonomous software delivery.

## Results and tradeoffs

The reported benefits are a more complete end-to-end workflow, centralized telemetry, public collaboration, lower agent cost after model changes, and the ability to evaluate and replay factory configurations. The approach also lets managers inspect how teams use agents and lets experienced users demonstrate effective practices to less experienced users. At the same time, the core performance claim is mixed: faster agent execution has not removed the human review delay, and the organization still relies on conventional product practices such as user interviews, design sessions, dogfooding, and human judgment about which problems are worth solving.

The principal LLMOps lesson is that production coding agents need more than prompts. They require event-driven orchestration, tool integrations, versioned configuration, durable artifacts, session-level telemetry, cost accounting, evaluation, replay testing, and controlled feedback loops. The factory concept provides a coherent framework for those capabilities. Its effectiveness depends on the quality of the evaluation signals, the safety of connected tools, the reliability of generated changes, and whether management metrics reward useful outcomes rather than merely more automation. Warp’s experience supports the value of centralizing these concerns, while the remaining review latency and reliance on proxy evaluation show why deployment should proceed incrementally with explicit risk controls.
