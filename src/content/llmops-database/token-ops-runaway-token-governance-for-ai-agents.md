---
title: "Token Ops: Runaway Token Governance for AI Agents"
slug: "token-ops-runaway-token-governance-for-ai-agents"
draft: false
llmopsTags:
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "rag"
  - "cost-optimization"
  - "token-optimization"
  - "system-prompts"
  - "evals"
  - "langchain"
  - "open-source"
  - "monitoring"
  - "orchestration"
  - "openai"
  - "anthropic"
  - "meta"
  - "cloudflare"
industryTags: "tech"
company: "Microsoft"
summary: "This presentation addresses the challenge of uncontrolled token consumption in AI agent systems, where organizations struggle to trace and manage escalating costs from model calls. The speakers introduce Token Ops, an out-of-band governance platform that manages costs at the agent run level rather than just at the model gateway level. The solution employs instrumentation, accounting, and enforcement layers with policy-based steering mechanisms that can modify agent behavior in real-time (such as context compaction and output reduction) rather than simply halting execution. Benchmarks on open-source repositories like Browser Use and MetaGPT demonstrated a 78% reduction in average spend while improving completion rates from 67% to 96% compared to simple throttling approaches."
link: "https://www.youtube.com/watch?v=GJX19pNhmSw"
year: 2026
seo:
  title: "Microsoft: Token Ops: Runaway Token Governance for AI Agents - ZenML LLMOps Database"
  description: "This presentation addresses the challenge of uncontrolled token consumption in AI agent systems, where organizations struggle to trace and manage escalating costs from model calls. The speakers introduce Token Ops, an out-of-band governance platform that manages costs at the agent run level rather than just at the model gateway level. The solution employs instrumentation, accounting, and enforcement layers with policy-based steering mechanisms that can modify agent behavior in real-time (such as context compaction and output reduction) rather than simply halting execution. Benchmarks on open-source repositories like Browser Use and MetaGPT demonstrated a 78% reduction in average spend while improving completion rates from 67% to 96% compared to simple throttling approaches."
  canonical: "https://www.zenml.io/llmops-database/token-ops-runaway-token-governance-for-ai-agents"
  ogTitle: "Microsoft: Token Ops: Runaway Token Governance for AI Agents - ZenML LLMOps Database"
  ogDescription: "This presentation addresses the challenge of uncontrolled token consumption in AI agent systems, where organizations struggle to trace and manage escalating costs from model calls. The speakers introduce Token Ops, an out-of-band governance platform that manages costs at the agent run level rather than just at the model gateway level. The solution employs instrumentation, accounting, and enforcement layers with policy-based steering mechanisms that can modify agent behavior in real-time (such as context compaction and output reduction) rather than simply halting execution. Benchmarks on open-source repositories like Browser Use and MetaGPT demonstrated a 78% reduction in average spend while improving completion rates from 67% to 96% compared to simple throttling approaches."
notion:
  pageId: "3c6f8dff-2538-809b-b2a3-ddbd6caf13f6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T08:59:00.000Z"
  lastEditedTime: "2026-08-24T08:59:00.000Z"
  publishedAt: "2026-08-24T09:18:00Z"
---

## Overview

This presentation by Tisha and Sushim introduces Token Ops, a governance framework designed to address what they call "the most expensive question in AI today": who spent all the tokens, and was there value associated with that spending? The core thesis is that the AI industry is currently in a "token maxing" phase where organizations are spending heavily on exploration and experimentation without proper cost attribution or control mechanisms. The presenters argue for a shift toward "value maxing" through systematic token governance at the agent execution level.

The presentation draws parallels to previous software evolution eras to contextualize the problem. In the SaaS era, control was exercised through usage caps, seat limits, and tier-based policies at the UI interface level. In the cloud era, the pay-as-you-go model introduced controls through autoprovisioning and autoscaling policies. Now in what they term the "agentic era," costs are calculated in terms of model calls, but the speakers observe a critical gap: while control planes exist at model gateways for hard caps and model routing, there is no proper control plane where the code actually calls the model. This gap has led to numerous instances of unbounded consumption, with examples cited including Uber exhausting their AI budget within four months and companies running into hundreds of millions of dollars in costs within days or months due to runaway loops.

## First Principles of Token Governance

The presenters establish four foundational principles for effective token governance in production LLM systems:

**Token as the Unit of Cost and Value**: Since organizations are charged in terms of tokens, value must also be measured and tracked in terms of tokens. This creates a consistent framework for understanding both expenditure and return on investment.

**Cost Creation at Model Call Boundaries**: The fundamental point where costs are incurred is at the LLM model call boundary, making this the critical point for tracking and intervention. Traditional monitoring approaches that focus solely on request-level metrics miss the complexity of agent-driven architectures.

**Attribution as Essential Infrastructure**: Without proper attribution of which agent run made which particular call, organizations cannot effectively control costs. They may see broad patterns indicating something went wrong but cannot trace issues back to specific components or narrow down the root causes. Attribution enables accountability and targeted optimization.

**Policy-Based Steering Before Halting**: Rather than immediately stopping execution when budgets are approached, systems should have policies in place to modify behavior. For example, if a loop is running excessively or context is growing out of range, in-place policies should attempt to address these issues. Budget caps and hard halts should only occur as a last resort after all steering mechanisms have been exhausted.

## Architectural Design

Token Ops is designed as an out-of-band control plane that does not interfere with application code. The architecture consists of three primary modules:

**Instrumentation Layer**: This provides a common observability foundation using OpenTelemetry for basic telemetry. It tracks cost in microns (presumably micro-units for fine-grained tracking) and includes an enrichment layer for additional context. Critically, it provides attribution data that indicates what caused each particular run, creating the foundation for all downstream governance activities.

**Accounting Module**: This accumulates run data in a ledger-like structure, tracking total runs and associated costs. The ledger maintains comprehensive records of all agent executions, their token consumption, and relevant metadata for analysis and policy enforcement.

**Enforcement Layer**: This has two primary functions. First, it provides steering capabilities through defined policies that can modify agent behavior in real-time. Second, it provides halt mechanisms as a final safeguard when budgets are truly exhausted and steering is insufficient.

The presenters emphasize that this approach differs fundamentally from existing tools in the landscape. Solutions like LiteLLM, Portkey, and Cloudflare operate at the request level, implementing halting and routing at the model layer. While these tools provide value, they cannot control costs at the agent run layer where the complexity of agentic systems manifests. Token Ops fills this missing piece by operating at the agent run layer rather than the model request layer.

## Implementation Details: The Bridge Layer

The implementation includes what the presenters call a "bridge layer" that shuttles data between the agent runtime and the control plane. This bridge has four key components:

**Attribution Component**: Every agent run is attributed to user dimensions, ensuring that all agent activity is accounted to some measure of usability or usage. This attribution data flows to the control plane and becomes the basis for segmentation and policy application.

**Boundary Annotation**: Described as the heart and soul of the system, boundary annotation is a decorator that can be applied to any method regardless of framework (LangChain, LangGraph, or others). The annotation performs two critical functions. First, it tracks input and output data and transmits this to the control plane, where it's recorded as a ledger entry annotated with the agent run ID and other attributes. Second, it acts as a bidirectional channel through which the control plane can push actions down to the agent. This enables the intelligence of the control plane to actively modify agent behavior rather than just passively monitoring.

**Governor Component**: The governor receives actions from the control plane and executes them in a non-destructive manner. Critically, the governor only knows what actions are allowed on an agent based on developer-specified configurations. This prevents the control plane from arbitrarily modifying agent behavior in ways the developer hasn't explicitly permitted. For example, if a RAG retrieval tool generates 20 chunks per retrieval but the LLM only uses the first five, the control plane can observe this pattern and push down an action to limit output to five chunks. The boundary annotation receives this action, and the governor executes it according to the allowed action set.

**Wrap Complete Helper**: Since most model providers expose objects rather than methods for their LLMs, wrap complete provides an alternative way to apply boundary annotations to objects rather than methods, ensuring comprehensive coverage of model interactions.

## Control Plane Components

The control plane comprises five interconnected components that work together to implement intelligent governance:

**Segments**: These leverage the attribution dimensions floated from the bridge layer. Developers can create cohorts of users or runs based on any dimension. For example, if an agent is shared with conference attendees and floats a dimension indicating the cohort is AI Engineering 2026, a segment can be created for this cohort and budgets applied at this level. This enables both fine-grained and coarse-grained control, with the flexibility to manage costs at the agent level, run level, user level, or any custom dimension.

**Ledger**: The ledger maintains comprehensive records of agent runs, consolidating all traces for a single run in one place. This provides the data foundation for all analysis, policy evaluation, and enforcement decisions.

**Budgets**: These are static thresholds that operate across defined time windows against particular segments or agent runs. Budgets provide the target constraints that the system works to maintain.

**Actions**: Actions come in two flavors that represent fundamentally different philosophies. Halt-type actions simply kill the agent when budgets are exceeded, representing a circuit breaker approach. Steer-type actions represent the value proposition of Token Ops, attempting to modify agent or component behavior to fit runs within allocated budgets rather than killing execution.

**Policies**: Policies bring together budgets, actions, and segments into executable governance rules. They define what happens when certain conditions are met for specific segments or runs, creating the operational governance framework.

## Demo and Test Scenarios

The demonstration used a straightforward two-agent workflow to illustrate Token Ops capabilities. A research agent with access to a search tool accepts a question and can look up information on the web as many times as needed. Once it determines it has sufficient data, it passes findings to a summarizer agent that creates a research report. This pattern is representative of many production agentic workflows.

**Preview Mode**: In the first scenario, Token Ops ran in preview mode where policies execute but enforcement is disabled. The run completed successfully, and the dashboard showed which policies would have triggered without actually taking action. This preview capability is critical for production adoption, allowing teams to test guardrails, tweak thresholds, and finalize policies without risking disruption to existing workloads.

**Halt Behavior**: With governance enabled, the demonstration showed a pre-call cost cap being exceeded. The agent was allocated a specific budget, exceeded it, and was immediately killed. This represents the traditional circuit breaker approach that many teams implement today.

**Steer Behavior**: The third scenario demonstrated the steering capabilities that differentiate Token Ops. The agent was given a slightly higher budget but still insufficient to complete normally. Instead of halting, a "cost guard" policy activated. This policy considers two factors: how much of the allocated budget has been consumed, and the velocity at which tokens are being consumed. Based on these inputs, if the system predicts the agent will exceed its budget, it injects guidance into the system instructions. This might be as simple as instructing the LLM to produce more succinct or summarized outputs, reducing token consumption while allowing the run to complete.

## Benchmark Results

The presenters benchmarked Token Ops on open-source repositories including Browser Use and MetaGPT across multiple iterations spanning stress tests, simple scenarios, and hard scenarios. The results demonstrated significant improvements:

**Cost Reduction**: Average spend decreased by approximately 78% with Token Ops enabled using their full policy suite. This dramatic reduction comes from intelligent steering that prevents wasteful token consumption without necessarily halting execution.

**Completion Rate Improvement**: Simple throttling approaches that kill agent runs indiscriminately achieved only a 67% completion rate. Token Ops improved this to approximately 96%, representing a substantial increase in successful run completions. This metric captures the key value proposition: reducing costs while maintaining or improving successful outcomes.

## Policy Catalog

The presenters developed their policy catalog by researching common failure modes in production agentic systems. The catalog covers several categories:

**Spend Management**: Policies that directly track and limit expenditure based on various thresholds and time windows.

**Context Management**: Policies including context compaction and tool output reduction that address the common problem of growing context windows consuming excessive tokens. These policies can dynamically adjust context size based on observed usage patterns.

**Loop Detection**: Policies that identify when agents enter repetitive patterns that consume tokens without producing value, a common failure mode in agentic systems.

**Progress Detection**: Policies that monitor whether agents are making meaningful progress toward their goals, potentially intervening when agents appear stuck or inefficient.

The action types fall into two categories: halt actions that simply kill execution, and steer actions that allow, mutate, or inject modifications to guide behavior. This steering capability through mutations and injections represents the core innovation that distinguishes Token Ops from simpler throttling approaches.

## Future Vision: Self-Learning Governance

The presenters outlined a vision for evolving Token Ops beyond static policies toward self-learning governance. Since the system maintains a comprehensive ledger continuously updated with execution data, they envision a self-learning module within the control plane that can analyze this data and ask: "Why or what is the failure mode that I'm still not able to catch?"

Based on this analysis, the system could take two evolutionary paths. First, it could generate new policies on the fly based on observed runaway costs that existing policies fail to catch. This would enable the governance framework to adapt to novel failure modes without requiring manual policy development. Second, it could refine existing policy parameters to manage runaway costs more effectively based on observed patterns. This creates a feedback loop where the system continuously improves its governance capabilities based on real production data.

## Critical Analysis and Considerations

While the presentation makes compelling claims about cost reduction and completion rates, several considerations warrant attention:

**Benchmark Limitations**: The benchmarks were conducted on specific open-source repositories (Browser Use and MetaGPT) with the presenters' own policy configurations. Real-world results would likely vary based on workload characteristics, policy tuning, and specific use cases. The 78% cost reduction is impressive but should be understood as representing potential rather than guaranteed outcomes.

**Complexity Trade-offs**: The Token Ops architecture introduces additional complexity through instrumentation, attribution tracking, and policy management. Organizations must evaluate whether this complexity is justified by the cost savings and improved completion rates, particularly for smaller-scale deployments.

**Policy Development Overhead**: While the system provides powerful steering capabilities, developing effective policies requires understanding agent behavior patterns and failure modes. The preview mode helps, but there's still a learning curve and ongoing tuning requirement.

**Framework Dependencies**: The boundary annotation approach requires modifying code to add decorators, and the governor requires configuration specifying allowed actions. While described as "out of band," there is still integration work required that may create friction in some development workflows.

**Performance Overhead**: The instrumentation, telemetry collection, and bidirectional communication between agents and the control plane introduces latency and computational overhead not quantified in the presentation.

Despite these considerations, Token Ops represents a thoughtful approach to a genuine production challenge. The shift from request-level to run-level governance addresses real gaps in existing tooling, and the emphasis on steering rather than simple halting offers potential for maintaining service quality while controlling costs. The architectural decision to keep the control plane in the customer's own tenant addresses data privacy concerns that might otherwise limit adoption. The preview mode provides a path to production that reduces risk, and the vision for self-learning governance points toward long-term evolution that could reduce the policy development burden over time.
