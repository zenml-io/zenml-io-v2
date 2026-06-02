---
title: "Building Production AI Agents with Temporal-Based Workflow Orchestration"
slug: "building-production-ai-agents-with-temporal-based-workflow-orchestration"
draft: false
llmopsTags:
  - "data-integration"
  - "high-stakes-application"
  - "code-generation"
  - "human-in-the-loop"
  - "agent-based"
  - "harness-engineering"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "devops"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Retool"
summary: "Retool transformed their existing Temporal-based workflow engine into a full agent orchestration platform to address the challenges of running production AI agents at enterprise scale. The company recognized that key agent challenges—durable execution for long-running processes, context management, unreliable tool calls, human-in-the-loop approval, and observability—mapped directly to capabilities they had already built for Retool Workflows on Temporal. By leveraging Temporal's primitives including workflows for state transitions, activities for LLM and tool calls, signals for human approval, and event history for audit trails, they were able to build and launch Retool Agents in weeks rather than months. The solution processes over 10 million workflow runs per day for thousands of customers, with architectural optimizations that reduced costs by an estimated $9 million annually while achieving 8x faster execution through intelligent activity grouping and parallel execution."
link: "https://www.youtube.com/watch?v=zBliFZMJYyY"
year: 2025
seo:
  title: "Retool: Building Production AI Agents with Temporal-Based Workflow Orchestration - ZenML LLMOps Database"
  description: "Retool transformed their existing Temporal-based workflow engine into a full agent orchestration platform to address the challenges of running production AI agents at enterprise scale. The company recognized that key agent challenges—durable execution for long-running processes, context management, unreliable tool calls, human-in-the-loop approval, and observability—mapped directly to capabilities they had already built for Retool Workflows on Temporal. By leveraging Temporal's primitives including workflows for state transitions, activities for LLM and tool calls, signals for human approval, and event history for audit trails, they were able to build and launch Retool Agents in weeks rather than months. The solution processes over 10 million workflow runs per day for thousands of customers, with architectural optimizations that reduced costs by an estimated $9 million annually while achieving 8x faster execution through intelligent activity grouping and parallel execution."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-agents-with-temporal-based-workflow-orchestration"
  ogTitle: "Retool: Building Production AI Agents with Temporal-Based Workflow Orchestration - ZenML LLMOps Database"
  ogDescription: "Retool transformed their existing Temporal-based workflow engine into a full agent orchestration platform to address the challenges of running production AI agents at enterprise scale. The company recognized that key agent challenges—durable execution for long-running processes, context management, unreliable tool calls, human-in-the-loop approval, and observability—mapped directly to capabilities they had already built for Retool Workflows on Temporal. By leveraging Temporal's primitives including workflows for state transitions, activities for LLM and tool calls, signals for human approval, and event history for audit trails, they were able to build and launch Retool Agents in weeks rather than months. The solution processes over 10 million workflow runs per day for thousands of customers, with architectural optimizations that reduced costs by an estimated $9 million annually while achieving 8x faster execution through intelligent activity grouping and parallel execution."
notion:
  pageId: "373f8dff-2538-8069-b2a1-ee33a20f8ee0"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:21:00.000Z"
  lastEditedTime: "2026-06-02T07:21:00.000Z"
  publishedAt: "2026-06-02T07:35:29Z"
---

## Overview

Retool, a developer-first platform for building enterprise applications, successfully transformed their existing Temporal-based workflow infrastructure into a full production AI agent orchestration platform. The case study provides detailed insights into how they evolved their workflow engine architecture through three major iterations and ultimately realized that the infrastructure they had built for business process automation was ideally suited for running production AI agents at scale. The presentation, delivered by software engineer Lam Tran, outlines both the technical architecture and the business considerations that enabled Retool to launch their Agents product rapidly in early-to-mid 2025.

## The AI Agent Problem Space

Retool defines an AI agent as an autonomous system comprising four core capabilities: reasoning using an LLM to decide next actions, calling tools to execute user desires, requesting human approval for dangerous actions, and looping until task completion. While these architectural patterns may vary between reason-and-act versus plan-and-execute approaches, the fundamental components remain consistent across implementations.

The company identified five critical challenges that make production AI agents difficult to implement at enterprise scale. First, long-running agents require durable execution since they can run for minutes to hours and may crash unexpectedly mid-process. Second, context management remains challenging even as context windows expand, particularly around accurately capturing user intent while managing limited context. Third, unreliable tools present constant challenges as API calls fail, databases timeout, and rate limits are hit. Fourth, dangerous actions requiring human approval create the need for workflows that can pause indefinitely while awaiting human response. Finally, comprehensive observability is essential when agents make incorrect decisions, requiring detailed understanding of what went wrong and why.

The presentation provides a vivid example of these challenges: imagine an agent 10 steps into processing a refund, having already made three database queries and sent three Slack messages, when the worker crashes. All context is lost and the user must start over, highlighting the critical importance of durable execution and state persistence.

## Retool Workflows Foundation on Temporal

To understand how Retool built their agent platform, it's essential to understand the foundation they established with Retool Workflows. This product provides visual workflow automation with drag-and-drop blocks, branching logic, configurable triggers, and one-click deployment, all integrated with enterprise security and governance. Popular use cases include process automation, monitoring and alerting, data integration, and backend services.

The team that built Workflows operated as a startup within a startup with only two to three engineers approximately 4-5 years ago. They recognized customer needs beyond the front-end app builder, specifically for business process automation with enterprise guarantees including durable execution, fault tolerance, horizontal scalability, and state persistence. Their initial attempt involved building an in-house solution using PG Boss and AWS Lambda, but this quickly hit scaling problems, with executions limited to about 15 minutes compared to the weeks-long executions possible with Temporal.

The decision to adopt Temporal was driven by two primary concerns: operational burden and go-to-market velocity. Temporal provided out-of-the-box solutions for durable execution, timeouts, retry logic, error handling, concurrency across distributed systems, and state persistence—all the enterprise guarantees customers expected. This allowed the small team to focus on product development rather than building infrastructure from scratch.

## Workflow Engine Architecture Evolution

The high-level architecture of Retool Workflows on Temporal follows a familiar pattern: clients create workflows triggered by webhooks or schedules, requests flow through the Retool backend to a Temporal cluster for orchestration, which then executes block logic and customer-sensitive code within sandbox code executors. However, the internal execution engine underwent three major iterations to optimize for cost and latency at scale.

The architecture relies on two Temporal primitives: workflows execute the edges of the directed acyclic graph, handling deterministic logic including conditional branching and signal handlers for human-in-the-loop, while activities execute the nodes, handling non-deterministic code with side effects including user code execution, workflow status updates, and peripheral operations like audit logging and billing.

### Version 1: Naive Implementation

The initial engine implementation took a straightforward approach: perform a topological sort of the workflow graph and execute each block sequentially, with each block running in its own activity. While functional, this approach encountered two significant problems at scale. First, Temporal overhead of 50-100 milliseconds per activity accumulated rapidly—a 10-block workflow could incur nearly a second of overhead just from activity transitions. Second, at Retool's scale of over 10 million workflow runs per day for thousands of customers, the per-action charges from Temporal became prohibitively expensive.

### Version 2: Eager Engine

The second iteration introduced intelligent activity grouping by asking whether multiple blocks could run within the same activity. The answer was "not always," leading to the identification of three key conditions requiring dedicated activities: start blocks that initiate workflows, blocks with custom retry policies (since different operations like database queries versus API calls need different retry behavior), and asynchronous queries following Temporal's async completion pattern.

The V2 "eager engine" performed topological sorting and iterated through blocks, creating new activities when required by the conditions above and grouping subsequent blocks that didn't require their own activities together. In an example with eight nodes where some required dedicated activities due to retry policies or async patterns, V2 reduced the activity count from eight to four, improving both latency and cost.

However, this approach revealed a critical limitation: runtime grouping could block branches during human-in-the-loop approvals, preventing parallel execution of independent workflow paths.

### Version 3: Static DAG Pre-Planning

The current production architecture leverages a key insight: since workflows are static directed acyclic graphs, activity allocation can be pre-planned rather than determined at runtime. The V3 algorithm performs topological sorting with the same conditions for dedicated activities, but checks parent nodes to make allocation decisions. If a parent requires its own activity, a new one is created. For child nodes, if all parents belong to the same activity, the child is added to that activity; otherwise, new activities are created.

This approach enables parallel execution of independent branches. In the same eight-node example, V3 creates four parallelizable activity nodes in the static DAG, allowing execution to continue on independent branches even when human-in-the-loop blocks pause other branches.

In a contrived 30-block workflow example, the improvements are substantial: from 30 activities in V1 to just 6 in V3, representing a 5x reduction in activities, approximately 8x faster execution, and 5x cost reduction at Temporal's pricing. At Retool's scale, this translates to over $9 million in annual savings and, in aggregate across all customers, 735 years of saved latency (though this figure is acknowledged as somewhat contrived).

## Building Agents on Workflow Infrastructure

After establishing this workflow foundation, Retool faced the question of how to build production AI agents. The crucial realization was that every agent challenge they had identified mapped directly to capabilities already built into Retool Workflows on Temporal:

- Long-running loops requiring durable execution: Temporal provides this out of the box
- Context management: Child workflows can spawn independent sub-agents without polluting parent context
- Unreliable tools: Activity retries with configurable backoff handle API failures automatically
- Human approval: Temporal signals enable workflows to pause indefinitely with zero resource consumption and resume when approved
- Observability: Temporal's event history provides complete audit trails of every agent decision

The profound insight was that agents are essentially workflows under the hood. The four-step agent loop—LLM call, human approval check, tool execution, and loop continuation—maps directly to workflow primitives. While Retool does use a dedicated "agent execution block" in their implementation, when unraveled, it uses the same concepts: LLM calls and tool execution are blocks/activities, while state transitions between them are workflows/edges.

An important technical distinction exists between static workflows and dynamic agents. While V3 workflows use static DAGs that can be pre-planned for activity optimization, agent execution follows dynamic state machines that could theoretically continue indefinitely until task completion. Consequently, agent execution is closer to the V2 architecture, with each agent iteration of tool calls grouped into one activity. However, the core architecture remains fundamentally the same.

The architecture for agents mirrors the workflow architecture: clients spin up agents that kick off workflow runs, which are passed to the Temporal queue for agent workers to pick up using the four-step state machine. When workflows complete, human-readable responses are returned to the agent chat interface.

## Human-in-the-Loop Implementation

The human-in-the-loop capability is critical for production agents that can perform dangerous actions like deleting records, sending emails, modifying production configurations, transferring money, or deploying code. Traditional implementations from scratch typically require polling services, webhook handlers, state databases, timeout managers, crash recovery systems, and concurrent approval handling—potentially weeks of engineering work.

Retool implemented this functionality in approximately 50 lines of code using Temporal Signals. At workflow edges, they register signal handlers. When tools are being called between activities and human approval is needed, the workflow handles that state by sending a workflow condition with a promise race. This race checks for the human approval signal while also including a sleep timer—typically 2 minutes, but theoretically configurable to weeks, months, or even years. Users can resume execution anytime by triggering the signal and providing approval from any device.

## Infrastructure and Deployment Considerations

Retool maintains dedicated infrastructure for agents, separating Temporal namespaces, task queues, and DataDog monitors to ensure agent workflows don't compete with regular Retool workflow workloads. This separation enables independent scaling of agent workers without affecting workflows and accommodates different execution profiles, as agents often require longer execution windows and different timeout policies than standard workflows.

The company processes over 10 million workflow runs per day for thousands of customers. The launch timeline is particularly noteworthy: Retool began work on agents in early 2025 and launched Retool Agents in mid-2025, before major competitors like OpenAI and Anthropic released competing products. This rapid go-to-market was enabled entirely by the reuse of existing infrastructure.

## Reusable Patterns for Building Agents

The presentation provides several practical patterns that can be applied when building agent systems on Temporal or similar workflow orchestration platforms:

**Agent Loop Structure**: The agent loop is fundamentally composed of workflows and activities, with activities comprising the actual blocks of logic (LLM calls, tool execution) and workflows comprising the edges (state transitions in the loop).

**Human Approval**: Signals and workflow conditions enable workflows to pause indefinitely awaiting approval, resuming when the signal is triggered.

**Observability**: Event history provides a complete trace of agent execution, tracking which tools were called, what results were returned, and when things went wrong.

**Sub-Agents**: Child workflows prevent polluting parent context by giving each sub-agent its own fresh event history, timeout policies, and retry policies, significantly simplifying context management.

**Scheduled Agents**: Retool uses `workflow.continue_as_new` to sleep and restart workflows with fresh event history, though Temporal Schedules are now available as an alternative approach.

**Real-Time Updates**: Queries enable pulling status for human-in-the-loop scenarios, though the team acknowledges server-sent events would be preferable and are being developed.

## Strategic Considerations and Future Vision

Retool has developed several convictions about the future of AI agents based on their experience building production systems. First, trust must scale beyond the current paradigm of humans reviewing dangerous actions one-by-one. In a future where AI agents may outnumber humans on the internet, handling hundreds of thousands of tasks and decisions, one-at-a-time supervision is not feasible. Human-in-the-loop is viewed as a transitional phase, evolving toward humans-on-the-loop or eventually humans-out-of-the-loop, necessitating systems designed with robust guardrails, failure handling, and retry mechanisms from day one.

Second, while the cost of building software approaches zero—exemplified by the ability of anyone with a device and access to LLMs to build applications in human-readable language—execution reliability becomes the new bottleneck. However, an important nuance is that while building is cheap, building secure software with enterprise governance guarantees is becoming more expensive. The ability to provide security and governance that enterprises require differentiates production systems from demos, especially as AI systems potentially discover and exploit vulnerabilities in legacy software.

The presentation argues that Temporal's primitives, while not originally built for AI agents, may represent one of the best infrastructure foundations for an agentic future. The capabilities for durable execution, state management, retry logic, and observability that Temporal provides align naturally with the requirements of production agent systems.

## Critical Assessment

The case study presents compelling evidence that workflow orchestration platforms like Temporal provide excellent foundations for production AI agents. The architectural evolution demonstrates thoughtful optimization for cost and latency at scale, and the successful reuse of existing infrastructure enabled rapid go-to-market that provided competitive advantage.

However, several considerations warrant balanced assessment. The cost savings of $9 million annually and the "735 years of saved latency" should be understood in context—these figures represent optimizations of their own infrastructure costs rather than direct customer value, and the latency figure is acknowledged as contrived in aggregate. The presentation is promotional in nature for both Retool's products and Temporal's platform, so claims about being "one of the fastest workflow engines on the market" should be evaluated with appropriate skepticism absent independent benchmarks.

The agent-as-workflow abstraction is powerful but may have limitations. The shift from static DAGs in V3 workflows to dynamic state machines in agents represents a significant architectural difference that required falling back to V2-style execution. This suggests that perfect reuse may not be achievable and that agent-specific optimizations may be needed as complexity scales.

The human-in-the-loop implementation using Temporal Signals is elegant, but the acknowledgment that server-sent events would be preferable for real-time updates suggests there are areas where Temporal's primitives don't perfectly align with agent requirements. Additionally, the dedicated infrastructure for agents (separate namespaces, task queues, monitoring) indicates that true infrastructure reuse requires careful isolation and tuning.

The presentation's vision of trust scaling and humans moving out-of-the-loop raises important questions about when and how that transition should occur. While the technical infrastructure may enable long-running autonomous agents, the governance, compliance, and risk management considerations for enterprises may evolve more slowly than the technology.

Despite these considerations, the case study provides valuable technical insights into production agent architecture, particularly around leveraging workflow orchestration for durable execution, using child workflows for context isolation, and implementing approval workflows with signals. The architectural evolution from V1 to V3 demonstrates sophisticated thinking about optimizing distributed systems at scale, and the ability to launch a competitive agent product in weeks by reusing existing infrastructure represents a significant achievement in LLMOps practice.
