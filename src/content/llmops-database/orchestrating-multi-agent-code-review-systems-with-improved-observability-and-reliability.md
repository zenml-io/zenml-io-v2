---
title: "Orchestrating Multi-Agent Code Review Systems with Improved Observability and Reliability"
slug: "orchestrating-multi-agent-code-review-systems-with-improved-observability-and-reliability"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "error-handling"
  - "latency-optimization"
  - "system-prompts"
  - "serverless"
  - "orchestration"
  - "monitoring"
  - "cicd"
  - "devops"
  - "fastapi"
industryTags: "tech"
company: "Cubic"
summary: "Cubic, an AI-powered code review platform, faced significant challenges when scaling their AI agent system to production, including limited observability, unexpected failures, and a high rate of false positives (low-value comments). By adopting Inngest as their orchestration layer, they transitioned from a single monolithic agent to a specialized multi-agent architecture with dedicated planner, security, duplication, and filtering agents. This architectural shift, enabled by Inngest's step orchestration, parallel execution, event-driven patterns, and comprehensive tracing capabilities, resulted in a 51% reduction in false positives and 4x faster pull request merges for their customers, while providing the observability needed to debug and iterate on agent reasoning in production."
link: "https://www.inngest.com/customers/cubic"
year: 2026
seo:
  title: "Cubic: Orchestrating Multi-Agent Code Review Systems with Improved Observability and Reliability - ZenML LLMOps Database"
  description: "Cubic, an AI-powered code review platform, faced significant challenges when scaling their AI agent system to production, including limited observability, unexpected failures, and a high rate of false positives (low-value comments). By adopting Inngest as their orchestration layer, they transitioned from a single monolithic agent to a specialized multi-agent architecture with dedicated planner, security, duplication, and filtering agents. This architectural shift, enabled by Inngest's step orchestration, parallel execution, event-driven patterns, and comprehensive tracing capabilities, resulted in a 51% reduction in false positives and 4x faster pull request merges for their customers, while providing the observability needed to debug and iterate on agent reasoning in production."
  canonical: "https://www.zenml.io/llmops-database/orchestrating-multi-agent-code-review-systems-with-improved-observability-and-reliability"
  ogTitle: "Cubic: Orchestrating Multi-Agent Code Review Systems with Improved Observability and Reliability - ZenML LLMOps Database"
  ogDescription: "Cubic, an AI-powered code review platform, faced significant challenges when scaling their AI agent system to production, including limited observability, unexpected failures, and a high rate of false positives (low-value comments). By adopting Inngest as their orchestration layer, they transitioned from a single monolithic agent to a specialized multi-agent architecture with dedicated planner, security, duplication, and filtering agents. This architectural shift, enabled by Inngest's step orchestration, parallel execution, event-driven patterns, and comprehensive tracing capabilities, resulted in a 51% reduction in false positives and 4x faster pull request merges for their customers, while providing the observability needed to debug and iterate on agent reasoning in production."
notion:
  pageId: "34ef8dff-2538-810e-862d-de1bdaa89542"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T09:59:28Z"
---

## Overview

Cubic is an AI-powered code review platform that deploys specialized AI agents to identify bugs, suggest fixes, and generate architectural diagrams, integrating with GitHub to help development teams accelerate their pull request review process. The company emerged from Y Combinator and serves customers including Granola, n8n, and Browser Use. This case study, presented by Inngest (an orchestration platform vendor), describes how Cubic evolved from a proof-of-concept to a production-ready multi-agent system by addressing critical LLMOps challenges around observability, reliability, and accuracy.

While this case study comes from a vendor perspective and makes various performance claims, it provides valuable insights into the practical challenges of operating multi-agent systems in production environments, particularly around observability, orchestration complexity, and the architectural patterns that can improve agent accuracy. As with any vendor-provided case study, the specific numerical improvements should be considered within the context of Cubic's particular use case and may not generalize to all multi-agent scenarios.

## The Production Challenges of Multi-Agent Systems

Cubic's initial production deployment revealed several critical challenges common to LLM-based systems at scale. The company built their first version as a proof-of-concept and quickly released it to customers, which is a common pattern for AI startups seeking rapid market validation. However, when their system encountered larger, more complex codebases, they discovered edge cases that caused their multi-step agentic workflows to fail or become stuck without clear explanations.

The observability problem was particularly acute. Before adopting dedicated orchestration infrastructure, Cubic's approach to tracing and debugging involved manually tagging everything with trace IDs and using grep-based log searching to understand what was happening in their system. This manual approach proved inadequate for understanding the complex execution patterns of multi-agent systems, where numerous nested and parallel steps can execute in response to a single triggering event (in this case, a GitHub pull request).

Additionally, the team faced infrastructure constraints typical of serverless deployments, including timeout issues when processing large or complex pull requests. They needed a solution that could handle asynchronous queuing while integrating with their existing observability stack, all while maintaining a smooth developer experience and supporting the orchestration of long-running, multi-step processes.

## Architectural Evolution: From Monolithic to Multi-Agent Design

According to the case study, one of Cubic's most significant architectural decisions involved transitioning from what they called a "Single, Do-Everything Agent" to a specialized multi-agent system. The initial monolithic agent approach reportedly led to pull requests filled with low-value comments, minor nitpicks, and numerous false positives—a common challenge when a single LLM is asked to perform too many diverse tasks simultaneously.

The redesigned architecture splits responsibilities across four specialized agents, each with a focused domain of expertise:

- **Planner Agent**: Performs initial assessment of code changes and determines which specialized checks are necessary, acting as a routing and coordination layer
- **Security Agent**: Focuses specifically on identifying security vulnerabilities such as injection attacks or insecure authentication patterns
- **Duplication Agent**: Detects repeated or copied code that might indicate refactoring opportunities
- **Filtering Agent**: Serves as a quality gate to reduce false positives by validating issues identified by other agents

This architectural pattern reflects a broader trend in production LLM systems toward specialization and separation of concerns. Rather than expecting a single prompt or agent to handle all scenarios effectively, breaking down complex tasks into focused sub-tasks can improve both accuracy and debuggability. The reported 51% reduction in false positives suggests this approach had measurable impact, though we should note this metric comes from the vendor's presentation of the case study and the baseline methodology isn't fully detailed.

## Orchestration Infrastructure for Complex Agent Workflows

The case study emphasizes that moving to a multi-agent architecture introduced new orchestration challenges. Cubic needed infrastructure that could handle several specific requirements:

**Parallel Execution and Coordination**: With multiple specialized agents analyzing the same pull request simultaneously, the system needed to coordinate parallel execution while avoiding race conditions. The case study indicates they addressed this through idempotency features, ensuring that even if multiple agents tried to update the same resources, the system would maintain consistency.

**Event-Driven Communication**: Rather than tightly coupling agents together, Cubic adopted an event-driven pattern where agents communicate through events. This approach provides flexibility for adding new specialized agents without requiring changes to existing ones, and supports the kind of reactive workflows common in code review scenarios where different triggers (new commits, comments, approvals) require different agent responses.

**Timeout Handling**: For serverless deployments with strict execution time limits, the system needed graceful timeout handling through what the case study calls "timeout callbacks," allowing long-running agent operations to continue across multiple execution contexts rather than failing when hitting platform limits.

**Flow Control**: The case study mentions several flow control capabilities including rate limiting, debouncing, and task prioritization. These become critical when agents interact with external APIs (GitHub, code analysis tools, sandbox environments) that have their own rate limits and capacity constraints.

## Observability and Tracing for Production Agent Systems

A significant portion of the case study focuses on observability improvements, which represents one of the most challenging aspects of operating LLM-based systems in production. The transition from manual log tagging and grep-based searching to structured traces with searchable metadata illustrates a common maturity progression for AI systems.

The observability approach described includes several key capabilities:

**Run-Level Tracing**: The ability to search for all agent runs related to a specific pull request or customer, with filtering based on custom metadata such as token usage. This connects user-facing interactions (pull requests) to backend agent executions, bridging a gap that often exists in production LLM systems where it's difficult to trace from user complaints back to specific model invocations.

**Step-Level Inspection**: Detailed traces showing the individual steps within an agent run, including inputs, outputs, and intermediate actions. This granularity proves essential for debugging complex multi-step agent reasoning, where failures or incorrect outputs might occur several steps into a workflow.

**Development-to-Production Consistency**: The case study emphasizes that tracing capabilities work consistently from local development through deployed applications. This consistency reduces the friction in reproducing and debugging production issues, a common pain point in LLM systems where non-deterministic behavior can make issues difficult to replicate.

The CEO's quote about the dashboard being critical for operations suggests that human-in-the-loop monitoring remains important even for automated agent systems. The ability to quickly find and inspect specific runs based on customer identifiers or pull request numbers indicates that customer support and debugging workflows still require manual investigation capabilities.

## Context Management Strategy: Push vs. Pull

An interesting technical detail mentioned in the case study involves Cubic's shift from "context-pushing" to "context-pulling" when providing information to agents. In the context-pushing approach, the system would provide large amounts of context upfront to agents, likely including extensive code snippets, file histories, and related information. This approach can lead to oversized prompts, increased token costs, and potentially reduced agent focus.

The context-pulling approach instead equips agents with tools that allow them to retrieve context on demand. When an agent determines it needs additional information—such as the implementation of a particular function, the history of a specific file, or the results of running code in a sandbox—it can invoke the appropriate tool to fetch that information. This pattern aligns with broader trends in LLM system design toward agentic workflows with tool use, reducing upfront context while giving models more control over their information gathering.

However, this approach introduces new infrastructure requirements. Tools need to interact with third-party APIs and sandbox environments, which come with constraints around provisioning time, rate limits, and availability. The case study mentions using flow control features to ensure tools remain reliable despite these external constraints, including handling rate limits, load distribution through debouncing, and task prioritization to ensure critical operations complete first.

## Iterative Improvement Through Production Logging

The case study describes an iterative improvement process where detailed logging of agent outputs helped the team understand which tools were effective and clarified the overall decision-making process. This represents a crucial pattern in production LLM operations: the ability to observe not just final outputs but intermediate reasoning steps and tool invocations.

By examining traces in production, the Cubic team could identify "flawed reasoning patterns"—situations where agents made incorrect decisions, used inappropriate tools, or followed unproductive paths. This observability enabled them to diagnose root causes and make targeted improvements to either the agent prompts, the available tools, or the orchestration logic.

This iterative refinement based on production observation reflects the reality that LLM-based systems rarely work perfectly from the start. Unlike traditional software where logic is explicit and deterministic, agent systems require ongoing observation and tuning based on real-world behavior. The infrastructure that supports this observability becomes as important as the agents themselves.

## Critical Assessment and Broader Implications

Several aspects of this case study warrant careful consideration when evaluating its broader applicability:

**Vendor Perspective**: This case study comes from Inngest, the orchestration platform provider, which naturally emphasizes the benefits their platform provided. The 51% reduction in false positives and 4x faster merge times are attributed to the architectural changes Cubic made, but the case study doesn't provide detailed baseline methodologies, statistical significance, or control for other factors that might have contributed to these improvements.

**Specific Context**: Cubic operates in a relatively well-defined domain (code review) with structured inputs (GitHub pull requests) and clear evaluation criteria (bugs found, false positives). This context may be more amenable to multi-agent approaches than less structured domains. The results may not generalize to all agent applications.

**Infrastructure Trade-offs**: While the case study emphasizes benefits of using managed orchestration infrastructure, it doesn't discuss potential trade-offs such as vendor lock-in, cost implications, learning curves for team members, or limitations of the abstraction. Teams evaluating similar solutions should consider these factors.

**Complexity Management**: The transition to a multi-agent architecture with specialized roles, event-driven communication, and complex orchestration patterns represents significant added complexity compared to simpler approaches. While this complexity appears justified by the results in Cubic's case, teams should carefully evaluate whether their use case requires this level of sophistication.

That said, the case study does highlight several patterns that appear broadly relevant to production LLM systems:

The importance of comprehensive observability cannot be overstated for agent systems. The ability to trace from user interactions to agent executions, inspect intermediate steps, and search runs based on metadata represents table stakes for operating these systems reliably. Teams building similar systems should invest early in structured logging, tracing, and search capabilities.

The architectural pattern of specialized agents with focused responsibilities offers a promising alternative to monolithic agents trying to handle too many tasks. This aligns with software engineering principles around separation of concerns and single responsibility, adapted to the LLM context.

Infrastructure challenges around orchestration, timeout handling, rate limiting, and parallel execution are real concerns when deploying agent systems at scale, particularly in serverless environments. Whether teams use dedicated orchestration platforms or build custom solutions, they need to address these operational concerns.

The context-pulling pattern with tool use represents a more sophisticated approach than simple prompt engineering, though it introduces dependencies on reliable tool infrastructure. This evolution from static prompts to dynamic, tool-augmented agents reflects the maturation of LLM applications.

## Conclusion

Cubic's journey from proof-of-concept to production-ready multi-agent system illustrates several key challenges in LLMOps: the need for comprehensive observability across complex agent workflows, the orchestration complexity introduced by parallel and event-driven execution patterns, and the architectural evolution from monolithic to specialized agent designs. While presented through a vendor lens with performance claims that should be evaluated critically, the case study provides valuable insights into the infrastructure and architectural patterns that can support production agent systems. The emphasis on tracing, iterative improvement based on production observation, and managing the operational complexities of multi-agent systems reflects the reality that successful LLM applications require not just good models and prompts, but robust operational infrastructure and ongoing refinement based on real-world behavior.
