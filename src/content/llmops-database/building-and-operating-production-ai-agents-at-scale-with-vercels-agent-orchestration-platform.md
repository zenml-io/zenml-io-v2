---
title: "Building and Operating Production AI Agents at Scale with Vercel's Agent Orchestration Platform"
slug: "building-and-operating-production-ai-agents-at-scale-with-vercels-agent-orchestration-platform"
draft: false
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "question-answering"
  - "code-generation"
  - "chatbot"
  - "structured-output"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "fastapi"
  - "postgresql"
  - "monitoring"
  - "orchestration"
  - "serverless"
  - "scaling"
  - "cicd"
  - "microservices"
  - "api-gateway"
  - "load-balancing"
  - "devops"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "openai"
  - "anthropic"
  - "cloudflare"
industryTags: "tech"
company: "Vercel"
summary: "Vercel addresses the challenge that while AI models have democratized the building of agents and internal tools, production deployment at scale remains difficult. The company built d0, an internal analytics agent that answers hundreds of data questions daily, using their own agent orchestration platform. By leveraging Vercel's infrastructure primitives—Sandboxes for isolated execution, Fluid Compute for dynamic scaling, AI Gateway for multi-model routing, Workflows for durable orchestration, and built-in observability—one engineer built d0 in weeks using only 20% of their time. The platform now supports multiple internal agents (lead qualification, customer support handling 87% of initial questions, abuse detection, content generation) and customer-facing products (v0 code generation and Vercel Agent for PR reviews), demonstrating how purpose-built infrastructure enables rapid development and reliable operation of AI agents without requiring deep DevOps expertise."
link: "https://vercel.com/blog/anyone-can-build-agents-but-it-takes-a-platform-to-run-them"
year: 2026
seo:
  title: "Vercel: Building and Operating Production AI Agents at Scale with Vercel's Agent Orchestration Platform - ZenML LLMOps Database"
  description: "Vercel addresses the challenge that while AI models have democratized the building of agents and internal tools, production deployment at scale remains difficult. The company built d0, an internal analytics agent that answers hundreds of data questions daily, using their own agent orchestration platform. By leveraging Vercel's infrastructure primitives—Sandboxes for isolated execution, Fluid Compute for dynamic scaling, AI Gateway for multi-model routing, Workflows for durable orchestration, and built-in observability—one engineer built d0 in weeks using only 20% of their time. The platform now supports multiple internal agents (lead qualification, customer support handling 87% of initial questions, abuse detection, content generation) and customer-facing products (v0 code generation and Vercel Agent for PR reviews), demonstrating how purpose-built infrastructure enables rapid development and reliable operation of AI agents without requiring deep DevOps expertise."
  canonical: "https://www.zenml.io/llmops-database/building-and-operating-production-ai-agents-at-scale-with-vercels-agent-orchestration-platform"
  ogTitle: "Vercel: Building and Operating Production AI Agents at Scale with Vercel's Agent Orchestration Platform - ZenML LLMOps Database"
  ogDescription: "Vercel addresses the challenge that while AI models have democratized the building of agents and internal tools, production deployment at scale remains difficult. The company built d0, an internal analytics agent that answers hundreds of data questions daily, using their own agent orchestration platform. By leveraging Vercel's infrastructure primitives—Sandboxes for isolated execution, Fluid Compute for dynamic scaling, AI Gateway for multi-model routing, Workflows for durable orchestration, and built-in observability—one engineer built d0 in weeks using only 20% of their time. The platform now supports multiple internal agents (lead qualification, customer support handling 87% of initial questions, abuse detection, content generation) and customer-facing products (v0 code generation and Vercel Agent for PR reviews), demonstrating how purpose-built infrastructure enables rapid development and reliable operation of AI agents without requiring deep DevOps expertise."
notion:
  pageId: "34ef8dff-2538-8106-8766-e5c45f84cdad"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T09:58:52Z"
---

## Overview

This case study describes how Vercel built and operates multiple production AI agents using their own agent orchestration platform. The primary example is d0, an internal analytics agent that serves as a text-to-SQL engine, democratizing data access across the organization. However, this is presented within a broader context of Vercel positioning their platform as infrastructure for running production agents at scale. The document was published in February 2026 and represents Vercel's marketing perspective on the shift from "build vs. buy" to "build and run" for AI systems.

**Critical Context**: This is marketing content from Vercel promoting their platform. While the technical details about d0 appear genuine, the framing consistently positions Vercel's commercial offerings as the solution. Claims about ease of development, cost savings, and reliability should be evaluated with appropriate skepticism, as specific performance metrics, failure rates, and detailed cost comparisons are largely absent.

## The Core Problem and Business Context

Vercel identifies a fundamental shift in enterprise software development: AI models have commoditized code and agent generation, making it trivial for anyone to build sophisticated software rapidly. The text claims "Claude can scaffold a fully functional agent before your morning coffee gets cold," illustrating how prototyping has become democratized. However, this democratization creates what they call "one of the largest shadow IT problems in history" because building agents is now easy, but operating them in production remains challenging.

The traditional build vs. buy equation has changed. Historically, custom internal tools only made economic sense for large-scale companies due to high upfront engineering investment and ongoing operational costs. Now, companies of any size can create agents quickly, and customization delivers immediate ROI for specialized workflows. The new paradigm isn't about choosing whether to build or buy—it's about building and then successfully running these systems at scale with high SLAs and measurable business impact.

Vercel argues that production deployment requires expertise in security, observability, reliability, and cost optimization—skills that remain rare even as building becomes easier. They position their platform as providing an "internal AI stack as robust as external product infrastructure" to solve this operational gap.

## The d0 Analytics Agent: Architecture and Implementation

The centerpiece case study is d0, Vercel's internal data agent built on their own platform. At its core, d0 is a text-to-SQL engine, which the text acknowledges is not a novel concept. The claimed differentiator is the underlying platform infrastructure that enabled rapid development and reliable operation.

**Development Velocity**: According to Vercel, one person built d0 in "a few weeks using 20% of their time." This accelerated timeline was possible because Vercel's infrastructure primitives handled operational complexity that would normally require months of engineering scaffolding and security hardening. The agent has "completely democratized data access" previously limited to professional analysts, enabling engineers, marketers, and executives to ask natural language questions and receive immediate answers from the data warehouse.

**Agent Workflow Architecture**: The d0 workflow follows a multi-stage pipeline:

The process begins when a user asks a question in Slack, such as "What was our Enterprise ARR last quarter?" The agent receives the message and determines the appropriate data access level based on user permissions before initiating the workflow. The agent then explores a semantic layer consisting of five layers of YAML-based configurations describing the data warehouse, metrics, products, and operations. This semantic layer approach provides structure for the LLM to understand the data landscape without exposing raw database schemas.

Model interactions are handled through Vercel's AI SDK, which provides streaming responses, tool use, and structured outputs out of the box. Vercel emphasizes they didn't build custom LLM plumbing but used standard abstractions available to any developer on their platform. The orchestration of agent steps is managed by Vercel Workflows, which handles retries and state recovery automatically if steps fail due to issues like Snowflake timeouts or model hiccups.

Automated actions including file exploration, SQL generation, and query execution all occur within secure Vercel Sandboxes, which are isolated Linux VMs that prevent runaway operations from escaping. The agent can execute arbitrary Python for advanced analysis within these sandboxes. Multiple models are employed through AI Gateway to balance cost and accuracy—simple requests route to fast models while complex analysis goes to Claude Opus, all within one codebase. Finally, formatted results are delivered back to Slack, often with charts or Google Sheet links, using the AI SDK Chatbot primitive.

## Core Infrastructure Primitives for LLMOps

Vercel's agent orchestration platform consists of five key primitives designed specifically for agent workloads:

**Sandboxes** provide secure, isolated environments for executing sensitive autonomous actions. This is presented as critical for protecting core systems when agents generate and run untested code or face prompt injection attacks. Sandboxes contain potential damage within isolated Linux VMs. When agents need filesystem access for information discovery, sandboxes can dynamically mount VMs with secure access to appropriate resources. The provided code example shows a simple API for creating sandboxes and running commands with captured output, though real-world complexity around resource limits, networking, and multi-tenancy is not discussed.

**Fluid Compute** automatically handles unpredictable, long-running compute patterns that agents create. Vercel acknowledges it's easy to ignore compute costs when agents process only text, but when usage scales and workloads expand to files, images, and video, costs become problematic quickly. Fluid Compute claims to automatically scale up and down based on demand with charging only for compute time, keeping costs "low and predictable." However, the text lacks specific cost comparisons or benchmark data to validate these claims against alternatives like traditional serverless or container orchestration.

**AI Gateway** provides unified access to hundreds of models with built-in budget control, usage monitoring, and load balancing across providers. This is positioned as important for avoiding vendor lock-in and gaining instant access to the latest models. The gateway can route different query types to different models—simple requests to fast, inexpensive models and complex analysis to more capable ones. If the primary provider hits rate limits or experiences downtime, traffic automatically fails over to backup providers. The multi-model routing capability mentioned in d0's architecture is enabled by this primitive.

**Workflows** enable agents to perform complex, multi-step operations reliably through durable orchestration. For critical business processes where failures are costly, this primitive provides retry logic and error handling at every step so interruptions don't require manual intervention or complete restarts. This is standard workflow orchestration technology, similar to systems like Temporal or AWS Step Functions, adapted for agent workloads.

**Observability** reveals agent behavior beyond basic system metrics, which is essential for debugging unexpected decisions and optimizing performance. When agents consume more tokens than expected or underperform, observability shows exact prompts, model responses, and decision paths, enabling tracing issues back to specific model calls or data sources. The depth of observability capabilities and whether they include features like prompt versioning, A/B testing support, or automated anomaly detection is not detailed.

## Production Agent Portfolio

Beyond d0, Vercel runs multiple agents on the same platform infrastructure, demonstrating the reusability of their approach:

**Internal Agents** include a lead qualification agent that reportedly "helps one SDR do the work of 10," a customer support agent handling 87% of initial questions, an abuse detection agent flagging risky content, and a content agent that converts Slack threads into draft blog posts. These examples span different use cases from sales automation to content moderation to content generation.

**Customer-Facing Products** include v0, a code generation agent, and Vercel Agent, which can review pull requests, analyze incidents, and recommend actions. The fact that both internal tools and customer-facing products run on identical primitives suggests genuine platform reusability, though the operational differences between internal and external-facing systems (SLA requirements, security posture, scaling patterns) are not explored.

## LLMOps Considerations and Tradeoffs

Several LLMOps dimensions emerge from this case study, though with varying levels of detail:

**Security and Isolation**: The sandbox approach addresses real risks in autonomous agent systems, particularly around code execution and prompt injection. Isolated VMs prevent agents from accessing unauthorized resources or escaping their execution environment. However, the text doesn't address other critical security considerations like PII handling in LLM contexts, audit logging compliance, or how permissions are actually enforced in the semantic layer that d0 queries.

**Cost Management**: The combination of Fluid Compute for dynamic scaling and AI Gateway for intelligent model routing represents a coherent approach to cost optimization. Routing simple queries to cheaper models while reserving expensive models for complex analysis is a standard best practice. However, without actual cost data, it's impossible to validate the claim that AI could "architect a $5,000/month DevOps setup when the system could run efficiently at $500/month." This 10x cost difference feels like marketing hyperbole rather than validated analysis.

**Reliability and Error Handling**: Durable workflows with automatic retry logic and state recovery are essential for production agents, particularly for long-running multi-step processes. The text mentions handling "Snowflake timeouts" and "model hiccups," which are realistic failure modes. However, there's no discussion of how the system handles more complex failure scenarios like partial failures, compensating transactions, or cascading failures across dependent agents.

**Observability and Debugging**: The emphasis on tracing prompts, model responses, and decision paths addresses a critical LLMOps challenge—understanding why agents make specific decisions. This is particularly important for debugging unexpected behavior and building trust in automated systems. The lack of detail about how this observability data is actually consumed (dashboards, alerting, automated analysis) limits the practical applicability of this information.

**Model Management and Multi-Model Strategies**: Using AI Gateway to route requests to different models based on complexity represents a practical approach to balancing cost and performance. The ability to fail over between providers addresses availability risks. However, the text doesn't discuss how routing decisions are made (rule-based vs. learned), how model performance is evaluated across providers, or how prompt compatibility is managed across different model families.

**Development Velocity vs. Operational Complexity**: The claim that one person built d0 in weeks using 20% of their time is striking but lacks context. Was this a person with deep expertise in Vercel's platform? How much of the semantic layer construction time is included? What percentage of features were delivered in the initial build vs. added later? The "vibe coding" reference suggests rapid prototyping, but production systems typically require extensive testing, security review, and operational planning that aren't discussed.

**Deployment and Integration**: The Slack integration for d0 demonstrates practical enterprise system integration, which is often a significant effort in production AI systems. The use of "AI SDK Chatbot primitive" suggests Vercel provides pre-built components for common integration patterns, which could genuinely accelerate development. However, there's no discussion of how deployments are managed, how changes are tested before production, or how multiple agent versions coexist.

## Critical Assessment of Claims

Several claims warrant careful evaluation:

The "democratization of data access" through d0 is positioned as transformative, enabling non-analysts to query data independently. This is a genuine value proposition if the agent produces accurate results reliably. However, the text provides no accuracy metrics, error rates, or examples of how incorrect SQL generation is handled. Text-to-SQL systems are notoriously challenging to make reliable across diverse query types and complex schemas.

The customer support agent "handling 87% of initial questions" is a specific metric that adds credibility, though without knowing what "handling" means (fully resolving vs. providing initial response vs. routing correctly) or what the user satisfaction rate is, it's difficult to assess actual impact.

The assertion that "understanding production operations requires expertise in security, observability, reliability, and cost optimization" and that "these skills remain rare even as building becomes easier" is reasonable. However, the implication that Vercel's platform eliminates the need for this expertise is questionable. Platform abstraction can hide complexity but doesn't eliminate it—someone still needs to understand security models, configure observability appropriately, and architect for reliability.

The comparison to traditional DevOps setup costs ($5,000/month vs. $500/month) lacks supporting evidence and appears designed for marketing impact rather than technical accuracy. Real cost comparisons would need to specify workload characteristics, scale, availability requirements, and what services are included in each scenario.

## Architectural Patterns and Best Practices

Despite the marketing framing, several legitimate LLMOps patterns emerge:

The **semantic layer approach** for d0 is sound architecture. Rather than exposing LLMs directly to raw database schemas, the five-layer YAML configuration provides structured metadata about data warehouse organization, metrics definitions, product structures, and operational context. This reduces hallucination risks and makes the system more maintainable as schemas evolve.

**Multi-model routing** based on query complexity is an established best practice for managing cost-performance tradeoffs. Simple queries benefit from fast, cheap models while complex analysis justifies more expensive, capable models. The key implementation challenge—not discussed here—is reliably classifying query complexity before execution.

**Isolated execution environments** for agent actions is critical for security, particularly when agents generate and execute code. The sandbox approach prevents malicious or buggy generated code from compromising core systems, though the specific implementation details around resource limits, networking restrictions, and data access controls aren't provided.

**Durable orchestration** for multi-step agent workflows addresses a common failure mode in production AI systems. Long-running processes that span multiple LLM calls, external API interactions, and data operations need proper state management and retry logic. This is well-established technology from workflow engines, adapted for agent contexts.

## Missing Technical Details

Several critical LLMOps considerations receive little or no coverage:

**Testing and Evaluation**: There's no discussion of how agents are tested before deployment, how changes are validated, or how performance is measured over time. Do they use evaluation datasets? How do they detect regression in agent quality? What's the deployment process for agent updates?

**Prompt Engineering and Management**: While the text mentions "exact prompts" in observability, there's no discussion of how prompts are developed, versioned, or managed across different agents and use cases. Prompt engineering at scale is a significant operational challenge.

**Data Privacy and Compliance**: The analytics agent presumably handles sensitive business data, and customer support agents may process PII. How is data governance handled? Are there controls around what data can be sent to which model providers? This is particularly important given the multi-provider approach of AI Gateway.

**Human-in-the-Loop**: The text doesn't discuss when and how humans intervene in agent operations. For a customer support agent handling 87% of questions, what happens to the other 13%? How do humans review and correct agent decisions to improve future performance?

**Performance Metrics**: Beyond the single "87% of initial questions" statistic, there are no quantitative metrics around response time, accuracy, user satisfaction, cost per query, or availability. Production systems require comprehensive metrics for operational decision-making.

**Failure Scenarios and Limits**: What happens when d0 encounters a query it can't answer? How does the system communicate confidence levels? What are the known limitations and how are they communicated to users?

## Platform Lock-in Considerations

While Vercel positions AI Gateway as addressing vendor lock-in for model providers, the architecture creates dependency on Vercel's platform primitives. The tight integration between Sandboxes, Fluid Compute, Workflows, and AI Gateway means agents built on this platform would require significant rearchitecture to move to alternative infrastructure. This is a standard tradeoff with integrated platforms—convenience and integration benefits come at the cost of portability.

The use of Vercel's "AI SDK" for model interactions, while providing convenient abstractions, introduces another layer of platform dependency. Whether this SDK is genuinely portable or tightly coupled to Vercel infrastructure isn't clear from the text.

## Conclusion and Broader Implications

This case study illustrates genuine LLMOps challenges around operating production AI agents at scale and presents Vercel's integrated platform approach as a solution. The d0 analytics agent represents a real production system with meaningful business impact, and the architectural patterns around semantic layers, multi-model routing, isolated execution, and durable orchestration are sound.

However, the marketing framing requires careful interpretation. Claims about development velocity, cost savings, and operational simplicity lack supporting quantitative evidence and detailed comparisons. Critical LLMOps dimensions like testing, evaluation, prompt management, and data governance receive minimal coverage, likely because these remain challenging even with Vercel's platform.

The fundamental value proposition—that purpose-built infrastructure can accelerate agent development and improve operational reliability—is credible. The specific claim that Vercel's platform is uniquely positioned to deliver this value requires more technical validation than this marketing document provides. Organizations evaluating this approach should consider platform lock-in risks, the maturity of alternative solutions, and whether the integrated approach aligns with their existing infrastructure and operational models.

The shift from "build vs. buy" to "build and run" for AI systems is a genuine industry trend, and platforms that effectively abstract operational complexity while maintaining appropriate controls and observability will deliver significant value. Whether Vercel's specific implementation represents the optimal approach depends on organizational context, scale requirements, and technical constraints that extend well beyond this case study's scope.
