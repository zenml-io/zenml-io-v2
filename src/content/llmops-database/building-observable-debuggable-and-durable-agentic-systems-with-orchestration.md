---
title: "Building Observable, Debuggable, and Durable Agentic Systems with Orchestration"
slug: "building-observable-debuggable-and-durable-agentic-systems-with-orchestration"
draft: false
llmopsTags:
  - "fraud-detection"
  - "code-generation"
  - "data-analysis"
  - "question-answering"
  - "summarization"
  - "high-stakes-application"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "rag"
  - "embeddings"
  - "fine-tuning"
  - "semantic-search"
  - "few-shot"
  - "evals"
  - "kubernetes"
  - "docker"
  - "orchestration"
  - "langchain"
  - "cache"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "serverless"
  - "devops"
  - "cicd"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "mysql"
  - "sqlite"
  - "redis"
  - "spacy"
  - "anthropic"
  - "meta"
  - "hugging-face"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "tech"
company: "Union"
summary: "Union's Chief ML Engineer shares lessons learned from productionizing agentic systems at scale, addressing the critical infrastructure challenges that arise when deploying LLM agents in production environments. The presentation introduces six design principles for building crash-proof, durable agents using the Flyte 2.0 orchestration platform, focusing on how agents can recover from multi-layer failures (infrastructure, network, logical, semantic) through proper context engineering and durability mechanisms. A key case study with Dragonfly demonstrates these principles in action, where a tiered agent architecture processes 250,000+ software products with 200+ steps and 100+ LLM calls each, achieving 2,000+ concurrent runs, 50% reduction in failure recovery time, 30% increased development velocity, and 12 hours per week saved on infrastructure maintenance."
link: "https://www.youtube.com/watch?v=H9fsxdK-NeQ"
year: 2026
seo:
  title: "Union: Building Observable, Debuggable, and Durable Agentic Systems with Orchestration - ZenML LLMOps Database"
  description: "Union's Chief ML Engineer shares lessons learned from productionizing agentic systems at scale, addressing the critical infrastructure challenges that arise when deploying LLM agents in production environments. The presentation introduces six design principles for building crash-proof, durable agents using the Flyte 2.0 orchestration platform, focusing on how agents can recover from multi-layer failures (infrastructure, network, logical, semantic) through proper context engineering and durability mechanisms. A key case study with Dragonfly demonstrates these principles in action, where a tiered agent architecture processes 250,000+ software products with 200+ steps and 100+ LLM calls each, achieving 2,000+ concurrent runs, 50% reduction in failure recovery time, 30% increased development velocity, and 12 hours per week saved on infrastructure maintenance."
  canonical: "https://www.zenml.io/llmops-database/building-observable-debuggable-and-durable-agentic-systems-with-orchestration"
  ogTitle: "Union: Building Observable, Debuggable, and Durable Agentic Systems with Orchestration - ZenML LLMOps Database"
  ogDescription: "Union's Chief ML Engineer shares lessons learned from productionizing agentic systems at scale, addressing the critical infrastructure challenges that arise when deploying LLM agents in production environments. The presentation introduces six design principles for building crash-proof, durable agents using the Flyte 2.0 orchestration platform, focusing on how agents can recover from multi-layer failures (infrastructure, network, logical, semantic) through proper context engineering and durability mechanisms. A key case study with Dragonfly demonstrates these principles in action, where a tiered agent architecture processes 250,000+ software products with 200+ steps and 100+ LLM calls each, achieving 2,000+ concurrent runs, 50% reduction in failure recovery time, 30% increased development velocity, and 12 hours per week saved on infrastructure maintenance."
notion:
  pageId: "33df8dff-2538-8015-a231-ec7b37fb189b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-09T17:53:00.000Z"
  lastEditedTime: "2026-04-09T17:53:00.000Z"
  publishedAt: "2026-04-09T18:00:29Z"
---

## Overview

This case study presents Union's approach to building production-grade agentic systems through their Flyte 2.0 orchestration platform. The presentation is delivered by Neils Bantilan, Chief ML Engineer at Union, who has spent five years building and maintaining Flyte, an open-source ML orchestration product used by companies like LinkedIn, Stripe, Spotify, and Mistral for fraud detection, recommendation systems, and LLM foundation model training. The core thesis is that while many teams focus on semantic correctness and prompt engineering for agents, infrastructure-level failures represent a critical gap that can wipe out agent context and prevent recovery. Union's solution provides durability, observability, and recovery mechanisms that allow agents to survive and recover from failures across all layers of the stack.

## The Agent Infrastructure Problem

The fundamental problem Union addresses is that agents in production often fail not because of prompt issues or semantic errors, but because infrastructure gets in the way. Several critical challenges emerge when moving from development to production. Tools and agents require secure, least-privilege access to organizational data assets, databases, and data lakes. Agents that perform machine learning tasks need variable compute resources - a single node runtime is insufficient when an agent might run on a small CPU box but needs to train a model loading several gigabytes of data. Parallelized sub-agents and tool calls create resource contention and degraded performance when running on fixed compute resources. Container failures are common, with nodes killed by schedulers and spot instances preempted, leading to agent memory loss or corruption that wipes out precious context.

The key insight is that agents fail at multiple layers of the orchestration stack: infrastructure, network, logical, semantic, tool execution, and context layers. The problem isn't that agents fail, but that recovering from failure is challenging without full context of how these layers interact. Union's approach is based on the observation that agents can actually recover reliably from all errors in this stack, including infrastructure-level ones, but only if given the right context and capabilities.

## The Context-Evaluation Gap

A critical observation is the existence of a context-evaluation gap in current agent systems. Evaluation harnesses typically test semantic correctness: Does the agent answer correctly? Is it hallucinating? Are tool call arguments formatted correctly? Agents likewise typically focus on recovering from logical and semantic failures. However, agents often don't directly handle or reason about surviving network outages, timeouts, system-level errors, or recalling state across retries. This creates a blind spot where infrastructure failures can derail otherwise well-designed agents.

Context engineering, therefore, is not just about shuffling tokens, gathering more data sources, or prompt optimization - though these remain important. Context engineering is also an infrastructure problem. If a failure wipes agent state, then all the hard-earned context implemented in the agent loop becomes worthless. This realization drives Union's approach to durability as a first-class concern in agent design.

## Core Building Blocks for Durability

Union's architecture is built on three fundamental building blocks that enable durable agent execution. The first is the replay log, a service that records the state of an agent and its subtasks at a super granular level at each step. This provides several benefits: avoiding re-execution of already-completed tasks, preventing memory and context loss, and recovering from crashes even in the root agent process. For example, if an agent executes tool call one, then subagent call one, then fails on tool call two, the replay log maintains a record of all steps and intermediary outputs. Upon crash recovery, the system knows tool call one and subagent call one are already done and doesn't recompute them - it simply picks up from tool call two. This becomes especially valuable for long-running agents with thousands of steps, providing a fine-grained micro-cache per run that survives network or system outages.

The second building block is global caching, which differs from the replay log by sharing work across all agents and all agent runs rather than just within a single run. An agent might perform a web search and database read that can be cached across multiple invocations, while disabling caching for a composer subagent that synthesizes outputs to inject creativity and entropy. This allows deterministic tool calls to be reused while regenerating creative outputs each time.

The third building block is intermediate state persistence, which ensures that outputs at each step of agent execution are automatically stored to object storage like S3. Developers don't need to write serialization and deserialization code - it's handled automatically. Every LLM call output, every tool call result, is persisted with data lineage tracked out of the box. This provides automatic checkpointing throughout agent execution.

## Six Design Principles for Production Agents

Union has distilled their learnings into six design principles for building production-grade agents. The first principle is to use plain Python, TypeScript, JavaScript, or whatever general-purpose programming language the LLM knows well. This provides access to all standard programming constructs - loops, fan-out, conditionals, try-except blocks, async and synchronous programming - without DSL surprises or new concepts to learn. Frameworks can still be used on top of these languages. Critically, exceptions in these languages become a perfect delivery mechanism for critical context about failures at all layers of the stack, allowing system-level errors like out-of-memory to bubble up into the agent's awareness.

The second principle is providing functional durability and observability hooks. These hooks make it easy to add durability to agent systems through simple decorators or annotations on functions and methods. These hooks enable tracing, checkpointing, and the persistent intermediate state serialization described earlier. In Flyte's implementation, developers define task environments specifying container images, dependencies, and resource requests. Tasks become containerized functions running on Kubernetes pods with container isolation, providing security benefits like separate IAM roles per task. Flyte's trace decorator provides a lightweight alternative for helper functions that don't require new containers but still get persistence and crash-proof guarantees.

The third principle is making failures cheap. With proper durability mechanisms in place, failed runs become training data or additional context for agents to learn from. This isn't just an out-of-band process where failures are queried from a database - agents can react to failures inline within their execution loop. Failed attempts are captured with full context, allowing both post-hoc analysis and real-time recovery strategies.

The fourth principle is providing infrastructure as context. This allows agents to see and reason about infrastructure-level errors like out-of-memory exceptions or system-level ephemeral outages. An agent can catch an out-of-memory error, provision more resources, and make adjustments sent back to the platform to allocate additional capacity for a training job, for example. This transforms infrastructure from an opaque failure source into a controllable variable the agent can manipulate.

The fifth principle is providing agent self-healing utilities through secure sandboxes. Union describes two types of sandboxes. Code mode, a concept from Anthropic, replaces the context load associated with tool definitions and formatting tool arguments. Instead, the agent is given a toolbox and writes Python code that's sandboxed - no IO, no network calls, no extra imports, just pure function calls and conditionals. The orchestrator runs this agent-generated code securely in this limited Python subset using tools like Pydantic Monty. This creates a tight error-iteration loop where the agent fixes its own orchestration code bugs without requiring out-of-band evaluation. The second type is stateless code sandboxes for cases where existing tools are insufficient for user requests. These allow additional third-party libraries, imports, limited network IO, and limited file system read-writes. The agent writes code that runs end-to-end as a pure function, producing output. Agents can even write their own unit tests in these sandboxes to validate their generated code.

The sixth principle is human-in-the-loop as ultimate recourse. For errors where prompts are poorly formatted, system prompts don't work, or the agent lacks necessary context, human intervention provides course correction. When an agent exhausts its maximum iteration budget, it can request additional context. In the UI, humans can provide text, upload files, or supply zip files containing directories of documentation. The agent then recursively calls itself with this additional context, leveraging Flyte's support for recursion to incorporate human feedback directly into the execution flow.

## Dragonfly Case Study: Scaling Agent Architecture

The presentation includes a detailed case study with Dragonfly, a company providing deep research as a SaaS product. Their use case exemplifies the scaling challenges Union's approach addresses. Dragonfly's customers might request research on alternatives to products like Jira, and Dragonfly's system performs comprehensive research to recommend appropriate technology stacks. Their challenge was building an automated solutions architect - an agent creating a living knowledge graph of approximately 250,000 software products. Each agent call involved about 200 steps, with roughly 100 LLM calls per product. These are not the agents users encounter in tight chat interfaces but agents running ambiently at regular cadences to populate production databases.

Union helped Dragonfly implement a tiered architecture to handle this scale. At the top level, an agent driver layer runs with four replicas. Below that, research coordinators operate with eight replicas. Underneath the coordinators, twelve researcher agents perform the actual investigation work. At the bottom, a tool layer with twelve replicas provides capabilities each researcher can access. This hierarchical structure allows massive parallelization while maintaining coordination.

Several key techniques enabled this architecture to function reliably. Cross-run caching using Flyte's global cache prevented duplicate LLM API calls for identical research prompts, reducing costs significantly. Dragonfly implemented semantic convergence detection, where coordinator layers periodically analyze all active research threads and group them based on semantic similarity, consolidating duplicate work before it happens. Checkpoint-based recovery, leveraging the replay log mechanisms, allowed heavy use of spot instances to reduce costs. When spot instances were preempted, they would return within seconds and resume without losing progress. Full auditability traced every single LLM call and tool call, providing complete observability into the research process.

The results were substantial. Dragonfly onboarded their local prototype agent into production in approximately one hour, primarily because the system used plain Python with simple task configurations and decorators. The production system achieved over 2,000 concurrent runs, handling the massive scale of their knowledge graph construction. Failure recovery time decreased by 50% compared to their previous approach. Development velocity increased by 30%, allowing faster iteration on agent capabilities. Infrastructure maintenance time decreased by 12 hours per week, freeing engineering resources for feature development rather than operational firefighting.

## Technical Implementation Details

The technical implementation centers on Flyte 2.0's approach to dynamic, crash-proof orchestration with infrastructure awareness. Tasks in Flyte are defined with environment specifications including container images, dependencies, and resource requests. These tasks run as containerized functions on Kubernetes pods, providing isolation, security, and independent resource allocation. The trace decorator provides lightweight durability for helper functions without the overhead of spinning up new containers while maintaining persistence guarantees.

Error handling leverages Python's native exception mechanism as a delivery vehicle for context. Infrastructure errors like out-of-memory exceptions surface to agent code, where they can be caught and handled programmatically. An agent might catch such an exception, analyze the error, and respond by requesting additional memory resources. The platform provisions these resources and retries the operation with the updated allocation. This transforms infrastructure from a black box into a controllable parameter space.

The code sandbox implementations provide secure environments for agent-generated code execution. In code mode, agents write orchestration logic using a limited subset of Python without IO, network access, or arbitrary imports. Pydantic Monty enforces these restrictions while allowing pure function composition and control flow. The tight feedback loop allows agents to see execution errors and iteratively fix bugs in their generated orchestration code. Stateless code sandboxes relax some restrictions, permitting library imports and limited IO for cases where agents need to generate more complex data processing or analysis code that existing tools don't cover.

The replay log mechanism maintains fine-grained execution state at each step. When an agent executes a sequence of operations, each completed step is recorded with its outputs persisted to object storage. If execution crashes at any point, recovery begins by consulting the replay log to determine which steps completed successfully. The agent resumes execution immediately after the last successful checkpoint, avoiding redundant computation and preserving accumulated context. For agents with hundreds or thousands of steps, this dramatically reduces the cost of failure from catastrophic to trivial.

Global caching operates across all agent runs, deduplicating work when multiple agents or multiple runs of the same agent perform identical operations. Cache keys are generated from inputs, so identical tool calls with identical arguments automatically hit cached results rather than re-executing. Developers can selectively enable or disable caching per operation, allowing deterministic operations like database queries to be cached while non-deterministic operations like LLM calls requiring creativity remain uncached. This provides fine-grained control over the tradeoff between determinism and creativity.

## Critical Assessment and Limitations

While the presentation demonstrates impressive results, several considerations warrant balanced assessment. The solution is tightly coupled to the Flyte orchestration platform and Kubernetes infrastructure, which may not suit all organizations. Smaller teams or those without Kubernetes expertise might find the operational overhead challenging. The containerized approach, while providing isolation and security, adds complexity and latency compared to simpler single-process agents. For lightweight use cases, this infrastructure might be overkill.

The Dragonfly case study, while compelling, represents a specific use case - long-running, highly parallelized batch research with tolerance for eventual completion. Real-time interactive agents with strict latency requirements might face different challenges not fully addressed by this architecture. The presentation doesn't deeply explore how the system handles agents requiring sub-second response times or how checkpoint overhead impacts interactive experiences.

The code sandbox approach, while powerful, introduces security considerations. Even with restrictions on IO and network access, allowing agents to generate and execute arbitrary code creates attack surface. The reliance on tools like Pydantic Monty for sandboxing requires confidence in those tools' security guarantees. Organizations with strict security requirements might need additional auditing and controls beyond what's described.

The emphasis on infrastructure-level recovery is valuable but represents one part of the agent reliability puzzle. Semantic errors, hallucinations, and incorrect tool usage remain challenges that durability mechanisms don't directly address. The presentation acknowledges this but focuses primarily on infrastructure concerns, potentially understating the difficulty of semantic correctness in production agents.

## Broader Implications for LLMOps

The case study highlights several important trends in LLMOps practice. First, the recognition that agent reliability requires infrastructure thinking, not just prompt engineering, represents an important maturation of the field. Early agent work focused heavily on prompt optimization and few-shot learning, but production deployment reveals infrastructure, observability, and recovery as equally critical concerns.

Second, the emphasis on making failures cheap rather than preventing failures aligns with modern distributed systems thinking. Perfect reliability is unattainable, so systems should minimize the cost of failure through fast recovery and checkpointing. This philosophy, common in database and distributed computing, applies equally to agent systems but hasn't been widely adopted in the LLM space.

Third, the tiered agent architecture demonstrated by Dragonfly shows how agent systems can scale beyond simple chatbots to power core business infrastructure. Agents running ambiently to maintain knowledge graphs or process thousands of research tasks represent a different paradigm from conversational AI. This suggests emerging patterns for agent deployment in enterprise settings.

Fourth, the integration of human-in-the-loop as a first-class mechanism rather than an afterthought demonstrates pragmatic recognition of agent limitations. Rather than positioning agents as fully autonomous, the architecture explicitly plans for human intervention when agents exceed their capabilities. This balanced view of agent autonomy may represent a more sustainable path to production deployment than fully autonomous approaches.

The presentation's timeline of agent adoption from 2022 through 2026 also illustrates the evolution of thinking in this space. Early experiments with fine-tuning and RAG gave way to framework-based development with LangChain, then to more sophisticated multi-tier orchestrated systems. This progression mirrors broader industry trends and suggests continuing evolution toward more infrastructure-aware, production-hardened agent systems.
