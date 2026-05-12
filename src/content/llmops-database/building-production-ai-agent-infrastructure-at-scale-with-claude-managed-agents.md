---
title: "Building Production AI Agent Infrastructure at Scale with Claude Managed Agents"
slug: "building-production-ai-agent-infrastructure-at-scale-with-claude-managed-agents"
draft: false
llmopsTags:
  - "poc"
  - "code-generation"
  - "document-processing"
  - "chatbot"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "harness-engineering"
  - "memory"
  - "evals"
  - "human-in-the-loop"
  - "docker"
  - "kubernetes"
  - "serverless"
  - "cicd"
  - "fastapi"
  - "databases"
  - "redis"
  - "cache"
  - "monitoring"
  - "orchestration"
  - "scaling"
  - "microservices"
  - "api-gateway"
  - "security"
  - "guardrails"
  - "anthropic"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic's platform team discusses the evolution from simple API completions to stateful, production-ready AI agent infrastructure. The conversation covers Claude Managed Agents, a platform that abstracts away infrastructure complexity for teams building autonomous agents at scale. The platform addresses the common challenge where teams prototype agents successfully but hit infrastructure walls during productionization, particularly around sandboxing, state management, and async execution. By providing opinionated primitives like file systems, skills, and memory while maintaining modularity, the platform enables both internal teams and external customers to deploy long-running agents without managing servers, credentials, or orchestration complexity."
link: "https://www.youtube.com/watch?v=lLypHkIVLqc&pp=ugUEEgJlbg%3D%3D"
year: 2026
seo:
  title: "Anthropic: Building Production AI Agent Infrastructure at Scale with Claude Managed Agents - ZenML LLMOps Database"
  description: "Anthropic's platform team discusses the evolution from simple API completions to stateful, production-ready AI agent infrastructure. The conversation covers Claude Managed Agents, a platform that abstracts away infrastructure complexity for teams building autonomous agents at scale. The platform addresses the common challenge where teams prototype agents successfully but hit infrastructure walls during productionization, particularly around sandboxing, state management, and async execution. By providing opinionated primitives like file systems, skills, and memory while maintaining modularity, the platform enables both internal teams and external customers to deploy long-running agents without managing servers, credentials, or orchestration complexity."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-agent-infrastructure-at-scale-with-claude-managed-agents"
  ogTitle: "Anthropic: Building Production AI Agent Infrastructure at Scale with Claude Managed Agents - ZenML LLMOps Database"
  ogDescription: "Anthropic's platform team discusses the evolution from simple API completions to stateful, production-ready AI agent infrastructure. The conversation covers Claude Managed Agents, a platform that abstracts away infrastructure complexity for teams building autonomous agents at scale. The platform addresses the common challenge where teams prototype agents successfully but hit infrastructure walls during productionization, particularly around sandboxing, state management, and async execution. By providing opinionated primitives like file systems, skills, and memory while maintaining modularity, the platform enables both internal teams and external customers to deploy long-running agents without managing servers, credentials, or orchestration complexity."
notion:
  pageId: "35af8dff-2538-80f9-a48c-f1f1a5517aef"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-08T20:59:00.000Z"
  lastEditedTime: "2026-05-08T20:59:00.000Z"
  publishedAt: "2026-05-10T06:01:53Z"
---

## Overview

This case study presents insights from Anthropic's platform engineering team, specifically Angela (Head of Product for Claude Platform) and Caitlin (Head of Engineering for Claude Platform), discussing the evolution and operational challenges of building production AI agent infrastructure. The conversation reveals how Anthropic approaches LLMOps challenges both internally and for external customers through Claude Managed Agents, a platform service launched to address the systematic infrastructure bottlenecks teams encounter when moving from agent prototypes to production deployments.

## Evolution of Platform Abstraction Layers

The platform team describes a clear progression in how AI platforms have evolved from simple completion endpoints to increasingly stateful and sophisticated systems. In the early GPT-3 era, platforms were essentially completion endpoints where developers sent prompts and received responses. This evolved to include tool calling and chat sessions, representing a move toward more stateful interactions. The latest iteration represented by Claude Managed Agents provides a fully managed environment with persistent memory, file systems, execution sandboxes, and orchestration capabilities.

This evolution reflects a fundamental shift in platform philosophy. Rather than providing maximally flexible low-level primitives, the team increasingly focuses on higher-order abstractions that encode best practices and optimal configurations. The driving force behind this evolution is customer feedback about getting the best outcomes from Claude, leading to platforms that progressively take on more of the complexity that teams would otherwise implement themselves.

## The Infrastructure Wall Problem

A critical insight from the case study is what the team calls "the infrastructure wall" that teams consistently hit during agent deployment. Teams typically find harness engineering—the logic for managing prompts, tool calls, and model interactions—relatively straightforward to prototype. Many teams use simple approaches like running Claude in a Python script on Mac mini servers or using the Claude command-line interface directly. However, when attempting to productionize these prototypes, teams encounter systematic infrastructure challenges around secure sandboxing, state persistence, credential management, connection reliability, and scaling to handle long-running asynchronous operations.

The platform team observed this pattern repeatedly across both internal Anthropic teams and external customers. Teams would build functional agent prototypes quickly, feel excited about the capabilities, but then struggle significantly with the operational aspects of running agents reliably at scale. This pain point directly motivated the creation of Claude Managed Agents as a platform service.

## Design Philosophy: Opinionated Primitives with Modularity

Claude Managed Agents reflects a deliberate design philosophy balancing opinionated best practices with extensibility. The team makes specific architectural choices they believe should be tightly coupled to Claude's capabilities—particularly around file system usage and "skills" as organizing primitives. These represent areas where the team has strong beliefs about optimal patterns that should be encoded into the platform.

However, the architecture maintains modularity in other dimensions, allowing teams to customize and extend functionality. The platform exposes endpoints and APIs that can be opened up for specific use cases while maintaining the benefits of managed infrastructure. This approach acknowledges that no single API configuration will solve every problem, so flexibility must be preserved even within an opinionated framework.

The team also commits to publishing blog posts and reference implementations showing how various patterns work, enabling teams who want to build custom solutions on the lower-level Messages API while still benefiting from Anthropic's architectural thinking.

## Path Dependency and Model-Specific Optimization

An important operational consideration discussed is the increasing path dependency in how models develop capabilities. The team observes that different AI labs are taking divergent approaches to model advancement, with each lab optimizing for different primitives and interaction patterns. Claude is being optimized for specific patterns like file system usage, while other models may optimize for different capabilities like extended reasoning loops.

This divergence has significant implications for production deployment strategies. The team suggests that the traditional approach of building highly generic harnesses that hot-swap models is becoming less viable. Instead, production systems increasingly need to pair harnesses tightly with specific models, optimizing the entire stack—prompt engineering, tool configuration, orchestration logic—for each model's particular strengths. This doesn't eliminate model redundancy, but pushes it to a higher level of abstraction where entire agent implementations (harness plus model) might be swapped rather than just the underlying model.

This represents a form of hill-climbing optimization where substantial performance gains come from harness engineering that exploits model-specific characteristics. The team cites memory implementation as an example where different harness approaches produced drastically different evaluation results, demonstrating the alpha available through careful integration work.

## Internal Platform Strategy: Dogfooding at Scale

A crucial aspect of Anthropic's LLMOps approach is that all first-party products build directly on the same platform APIs available externally. This creates a tight feedback loop where internal product teams act as sophisticated platform customers, driving feature development and surfacing pain points. The platform team spends significant time working with internal teams building products like Claude Code and other agent-based tools, enabling features these teams need while sharing architectural ideas.

This dogfooding strategy reduces divergence between what's available in first-party products versus platform APIs. Internal teams building production agents encounter the same challenges as external customers, ensuring the platform evolves to address real operational needs rather than hypothetical use cases.

## Production Use Cases and Patterns

The case study reveals several production agent deployment patterns emerging both internally at Anthropic and among customers:

Internal automation agents represent a major category, where teams build agents to automate processes like legal review of marketing copy. These agents typically combine multiple primitives—file access, external tool integrations via MCP servers, custom skills encoding domain knowledge—and require human-in-the-loop workflows where agents perform initial review but escalate to humans for final approval. The key requirement here is session management across multiple participants, with different people able to collaborate through a shared agent interface.

End-to-end development platforms represent another significant pattern, exemplified by companies like Stripe (with their Minions platform) and Ramp. These platforms provide engineers with comprehensive agent-based development environments that integrate with company-specific CI/CD workflows, testing infrastructure, and deployment processes. While these could theoretically be thin wrappers around managed agents, they typically require substantial customization of the development environment where agents run and verify changes.

Team-oriented agents mark an important evolution beyond individual productivity tools. While individual developers can run agents locally or in their own cloud environments, team workflows require agents that can interface with multiple team members, coordinate with other agents, and persist state independently of any individual's machine. This necessitates platform-level infrastructure that everyone can spin up, control, and collaborate through.

## Multi-Agent Orchestration and Architecture Patterns

The platform recently launched multi-agent orchestration capabilities, enabling sophisticated agent interaction patterns. Production teams are using this to implement various harness techniques and architectural strategies, each suited to different use cases:

The advisor strategy separates execution from advice, with one agent performing work while another provides guidance. Adversarial architectures have one agent generating outputs while another challenges or critiques them. Decomposition strategies split work into smaller pieces handled by different agents that recombine results. Best-of-N approaches run multiple agents in parallel and select optimal outputs.

These different architectures excel at different tasks—some are better for deep research versus wide research, others optimize for tasks like bug hunting. By providing LEGO-like primitives that compose into these higher-order architectures, the platform enables hill-climbing optimization at multiple abstraction layers.

## Agent Lifecycle Management

An operational challenge discussed is agent lifecycle management, particularly around deprecation and updates. Agents can become stale quickly when not actively maintained, especially when new model versions release or architectural patterns evolve. Teams struggle with agents that continue running but use outdated models or suboptimal implementations.

The platform addresses this partly through skills that facilitate upgrades, like automatically updating to new model versions when released. However, the more fundamental challenge is organizational—ensuring agents have human owners responsible for maintenance and updates. Without clear ownership, agents become dead infrastructure that continues consuming resources without delivering value.

The most sophisticated teams are exploring using agents to monitor other agents for staleness, but for most organizations, the answer involves better tooling to make upgrade and migration processes less painful, combined with organizational practices ensuring clear agent ownership.

## Evaluation and Success Metrics

While acknowledging that evaluation is extensively discussed elsewhere, the team emphasizes a particular philosophy around verifiable outcomes. Their principle is that everything should ultimately compress to an outcome specification and a budget, with the system figuring out how to achieve that outcome within constraints.

For coding agents, verifiable outcomes might be merged pull requests. More broadly, the vision is for humans to provide outcome specifications that Claude can interpret and self-assess against repeatedly. This moves beyond domain-specific evaluation metrics toward more general outcome-based assessment.

## Infrastructure Scaling Challenges

Looking forward, the team emphasizes that as agents become more autonomous and self-configuring, platform scaling becomes critical. In a world where agents continuously run, recreate themselves, and spawn sub-agents on-the-fly, the infrastructure must handle dramatically increased token throughput, long-running requests, and diverse request shapes.

The platform team's focus is ensuring that infrastructure capacity never becomes the limiting factor in what teams can accomplish with agents. This requires systems that scale elastically, handle async execution gracefully, manage state reliably, and maintain performance across varied workload patterns.

## The Quick Start Experience and Accessibility

The platform includes a quick-start chat experience designed to help both technical and non-technical users understand platform primitives and how they compose. While not specifically targeting non-technical users to build production agents independently, this educational layer helps anyone wrap their heads around the API structure, making the platform more accessible.

This proved effective enough that users successfully built working Slack bots by having Claude Code drive the managed agent setup process, demonstrating how AI assistance can scaffold the learning curve for complex platform capabilities.

## Vaults and Credential Management

The platform provides vaults as primitives for credential storage, addressing the operational challenge of managing authentication across multiple services and tools that agents interact with. This represents one of the "lower-level pieces" the team is solving to enable easier agent deployment, handling security concerns around credential storage and access in a systematic way that integrates with the broader platform.

## Future Vision: Outcome and Budget

The team's vision for the platform's evolution centers on radical simplification of user-facing complexity. They envision a future where users primarily specify desired outcomes and budgets, with Claude autonomously determining model selection, sub-agent orchestration, and harness architecture.

In this model, users wouldn't engage in extensive prompt engineering, tool construction, or harness architecture decisions. Claude would understand its own capabilities well enough to self-configure optimal implementations on-the-fly. While acknowledging this might not be fully realized in a year, the team believes the outcome portion is achievable with some uncertainty around budget optimization.

This represents the logical endpoint of the platform's evolution toward higher abstraction layers—eliminating not just infrastructure concerns but also architectural and configuration decisions, leaving only the essential problem specification.

## Practical Deployment Considerations

Throughout the discussion, practical deployment realities emerge. Teams worry about vendor lock-in when building on platform-specific managed services versus maintaining flexibility with generic harnesses. The team acknowledges this concern but argues that the benefits of managed infrastructure and model-specific optimization increasingly outweigh portability concerns, especially as models diverge in their optimal usage patterns.

The platform's internal dogfooding, modular design, and published reference implementations provide some hedge against lock-in while delivering the operational benefits of managed services. Teams can start with managed agents, drop down to lower-level APIs when needed, or learn from reference implementations to build custom solutions that still leverage Anthropic's architectural thinking.
