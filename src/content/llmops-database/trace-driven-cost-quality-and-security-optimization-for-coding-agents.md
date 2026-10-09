---
title: "Trace-Driven Cost, Quality, and Security Optimization for Coding Agents"
slug: "trace-driven-cost-quality-and-security-optimization-for-coding-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "mcp"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "model-optimization"
  - "token-optimization"
  - "cost-optimization"
  - "error-handling"
  - "evals"
  - "api-gateway"
  - "monitoring"
  - "guardrails"
  - "security"
  - "open-source"
  - "reliability"
  - "scalability"
  - "databricks"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Databricks"
summary: "Databricks deployed Unity Gateway as a centralized AI gateway for its engineering coding agents, using it to enforce budgets and security policies, collect agent traces, and provide flexibility across proprietary and open models and agent harnesses. Databricks then analyzed those traces with Genie and built task benchmarks to identify integration errors, excessive tool outputs, inappropriate model selection, and harness inefficiencies. Reported results included finding seven MCP bugs, identifying a Jira integration issue associated with approximately $90,000 in annual token cost and 5,000 agent-hours, reducing Slack-search payloads by an estimated 60%, and lowering model spend through task-aware routing. The approach is promising but the presentation provides limited independent validation, detailed quality measurements, or security results, so the savings should be treated as organization-specific findings rather than generally guaranteed outcomes."
link: "https://www.youtube.com/watch?v=8mylEGP37bw"
year: 2026
seo:
  title: "Databricks: Trace-Driven Cost, Quality, and Security Optimization for Coding Agents - ZenML LLMOps Database"
  description: "Databricks deployed Unity Gateway as a centralized AI gateway for its engineering coding agents, using it to enforce budgets and security policies, collect agent traces, and provide flexibility across proprietary and open models and agent harnesses. Databricks then analyzed those traces with Genie and built task benchmarks to identify integration errors, excessive tool outputs, inappropriate model selection, and harness inefficiencies. Reported results included finding seven MCP bugs, identifying a Jira integration issue associated with approximately $90,000 in annual token cost and 5,000 agent-hours, reducing Slack-search payloads by an estimated 60%, and lowering model spend through task-aware routing. The approach is promising but the presentation provides limited independent validation, detailed quality measurements, or security results, so the savings should be treated as organization-specific findings rather than generally guaranteed outcomes."
  canonical: "https://www.zenml.io/llmops-database/trace-driven-cost-quality-and-security-optimization-for-coding-agents"
  ogTitle: "Databricks: Trace-Driven Cost, Quality, and Security Optimization for Coding Agents - ZenML LLMOps Database"
  ogDescription: "Databricks deployed Unity Gateway as a centralized AI gateway for its engineering coding agents, using it to enforce budgets and security policies, collect agent traces, and provide flexibility across proprietary and open models and agent harnesses. Databricks then analyzed those traces with Genie and built task benchmarks to identify integration errors, excessive tool outputs, inappropriate model selection, and harness inefficiencies. Reported results included finding seven MCP bugs, identifying a Jira integration issue associated with approximately $90,000 in annual token cost and 5,000 agent-hours, reducing Slack-search payloads by an estimated 60%, and lowering model spend through task-aware routing. The approach is promising but the presentation provides limited independent validation, detailed quality measurements, or security results, so the savings should be treated as organization-specific findings rather than generally guaranteed outcomes."
notion:
  pageId: "3f4f8dff-2538-8097-9a46-fad77e570ce2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:51:00.000Z"
  lastEditedTime: "2026-10-09T08:51:00.000Z"
  publishedAt: "2026-10-09T08:52:49Z"
---

## Overview

Databricks used a centralized production control plane, called Unity Gateway, to manage coding agents used by its engineering organization. The gateway sits between agent harnesses and the available language models and tools, providing budget controls, security policies, trace collection, and access to proprietary and open models. The stated objective was to make autonomous and long-running coding agents more economical, reliable, and governable as usage expanded across thousands of engineers and customers.

The principal operational insight was that agent traces were more valuable than simple aggregate usage or cost data. Databricks analyzed traces with its Genie data-smart agent, converted observed workloads into benchmarks, and used those benchmarks to test MCP implementations, tool-output limits, model choices, harness configurations, and multi-model workflows. The presentation reports substantial potential savings and several concrete fixes, but the results are internal claims based on Databricks workloads. It does not provide a controlled experimental design, detailed quality scores, or independently verified security outcomes, so the findings demonstrate a useful LLMOps method rather than a universally reproducible performance guarantee.

## Problem and production context

Databricks was rolling out coding agents that operate toward a goal rather than answering a single request. These agents may run for many turns, invoke tools repeatedly, create sub-agents, and consume large context windows. The organization identified three primary concerns: cost, output quality, and security. Long-running agents can continue spending tokens after a task becomes unproductive, while unattended execution increases the impact of a faulty tool call or an agent attempting to bypass an intended restriction.

The production response was to route Databricks engineering agents through Unity Gateway. In addition to centralized access to different models and harnesses, the gateway was described as supporting budgets, security policies, and trace capture. This gives the organization a point at which to apply controls and compare alternatives, rather than leaving every developer or harness with an isolated model configuration. Trace collection also creates an operational record of prompts, tool calls, failures, model choices, and agent trajectories that can be analyzed for recurring waste or unsafe behavior.

## Tool integration and MCP cost analysis

One investigation focused on MCP servers wrapping internal APIs such as Jira and Slack. A Jira issue-search tool expected a comma-separated string, but the model supplied an array of strings. The implementation then called a Python string operation equivalent to `split`, which failed for the array input. The failure caused the agent to retry and reason through the same problem repeatedly instead of completing the task.

According to the reported analysis, recovery took an average of 12 turns for affected agent runs. Approximately 30% of sessions that called the Jira tool encountered the error more than twice. Databricks estimated that this single integration problem consumed about 90,000 dollars per year in tokens and approximately 5,000 hours of agent activity. These figures are workload-specific estimates, and the presentation does not describe the accounting method, the time period used to extrapolate them, or whether the hours represent human-equivalent value. Nevertheless, the example illustrates why tool contracts and error rates should be treated as first-class LLMOps metrics.

Databricks provided the trace findings to a coding agent, which reportedly located and fixed seven bugs across the MCP implementations in less than an hour. The preferred remediation was to make the MCP accept both reasonable argument formats rather than adding more instructions or a skill to teach the model a brittle interface. That choice can reduce prompt and context overhead, although permissive interfaces also need validation and unambiguous semantics to avoid silently accepting malformed requests.

The same trace analysis exposed oversized tool responses. A Slack message-search tool was reported to send roughly 300 million tokens per week, with an average call containing about 12,000 tokens. Databricks created a benchmark set from historical traces and compared agent results while retaining different portions of each search response. The reported conclusion was that returning the top 40% of the response preserved the same result on the benchmark while making approximately 60% of the returned tokens reclaimable. The resulting MCP caps restrict response sizes based on this analysis. This is a practical form of payload optimization, but truncation quality depends on ranking, query type, and task distribution; a production implementation should monitor missed evidence and allow retrieval or pagination when the relevant result is not near the top.

## Model selection and task-aware routing

Trace analysis also showed that users were frequently starting sessions with the most expensive model even when their requests were simple. In an initial small trace sample, 82% of sessions reportedly started with a high-end model. A larger 30-day analysis classified approximately 8% of prompts as trivial, nearly 20% as low complexity, and about 12% as genuinely complex. Databricks therefore concluded that roughly a quarter of coding-agent prompts could be handled by a basic model, while the expensive model was commonly used by default. The specific percentages depend on the classification method and the sampled population, which are not detailed.

Unity Gateway was changed to support task-aware routing. Rather than selecting a model independently for every request, the system launches a session with a model judged appropriate for the initial task. Sub-agents can invoke the router again if a later subtask requires a more capable model. This design attempts to preserve cache and session efficiency while still enabling escalation. Databricks also described a possible future architecture in which a small main agent primarily delegates work to specialized sub-agents, allowing each subtask to use a suitable model. That approach may lower cost, but delegation itself introduces coordination, latency, context-transfer, and failure-management overhead.

The team used trace-derived benchmarks when evaluating new model versions. For example, a candidate model was compared with an existing model on historical tasks before a default migration decision. This is preferable to selecting a model solely from public benchmarks because coding-agent workloads are sensitive to repository structure, tools, prompt conventions, and harness behavior. A robust deployment would still need holdout tasks, regression checks, latency and reliability measurements, and safeguards against optimizing only for token cost while degrading correctness.

## Harness evaluation and multi-model workflows

Databricks evaluated different combinations of models, effort settings, and agent harnesses against pull requests and associated traces. The reported results formed a cost-quality Pareto curve: some configurations delivered higher quality at greater expense, while open-source models and open-source harnesses appeared capable of competitive results for particular tasks. The presentation attributed part of the savings to lower context-window usage by some open-source harnesses. Because no numerical quality scores or standardized task definitions were provided, the result should be interpreted as evidence that harness choice deserves measurement, not as proof that open-source alternatives are always superior.

Databricks also reported that engineers commonly use multiple coding agents. These agents traditionally do not share conversation history, memory, or controls, leading developers to copy and paste context between systems. To address this, Databricks developed a meta-harness layer called Omnigent, deployed it to its engineers, and used it in its own construction. The intended abstraction allows multiple underlying harnesses to share context, history, and controls. The organization was exploring recipes in which one model plans, another implements, and a third reviews, but the best combination remained an open research question. Such a system requires explicit provenance, context limits, permission boundaries, and evaluation of the combined workflow rather than only the individual models.

## Security and governance

Unity Gateway was also positioned as a governance and security layer. Databricks described analyzing traces for misalignment between the requested task and the agent's actual behavior, attempts to publish sensitive information, blocked actions, and efforts to work around guardrails. The longer-term goal was to use agents to help inspect or defend against other agents. These are relevant monitoring targets for autonomous systems, particularly when agents have network access, repository permissions, or production-adjacent tools.

The available results are intentionally incomplete: no security incident counts, detection rates, false-positive rates, policy definitions, or remediation outcomes were provided. Consequently, the security portion establishes a monitoring direction rather than demonstrating a measured security improvement. A production program would need least-privilege credentials, human approval for high-impact actions, immutable audit logs, secret and data-loss prevention checks, sandboxing, rate limits, and adversarial evaluations in addition to trace analysis.

## Results and tradeoffs

The case demonstrates a repeatable LLMOps feedback loop: collect traces through a gateway, identify recurring failures and expensive patterns, create representative benchmarks, test alternative tools and models, deploy targeted controls, and continue monitoring. Reported benefits included fixing seven MCP defects, an estimated 90,000 dollars of annual token waste from one Jira defect, roughly 5,000 hours of avoidable agent activity, a claimed 60% reduction in one Slack payload, and lower expected spend from routing simple tasks to smaller models.

The main tradeoff is that optimization can affect quality, reliability, and safety. Truncating tool output may hide relevant evidence; smaller models may fail on edge cases; task classifiers can route incorrectly; and multi-agent delegation can add turns and context overhead. Trace-derived benchmarks may also encode existing user behavior and miss rare but important tasks. Databricks' approach is therefore strongest as an operational discipline and architecture pattern. Its claims should be validated with organization-specific replay tests, held-out evaluations, cost and latency measurements, tool-error rates, security detection metrics, and human review before broad policy changes are made.
