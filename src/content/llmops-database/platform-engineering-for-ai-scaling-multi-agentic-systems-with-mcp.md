---
title: "Platform Engineering for AI: Scaling Multi-Agentic Systems with MCP"
slug: "platform-engineering-for-ai-scaling-multi-agentic-systems-with-mcp"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "structured-output"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "human-in-the-loop"
  - "evals"
  - "system-prompts"
  - "mcp"
  - "error-handling"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "cicd"
  - "orchestration"
  - "security"
  - "guardrails"
  - "documentation"
  - "open-source"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "devops"
  - "continuous-integration"
  - "continuous-deployment"
  - "reliability"
  - "scalability"
  - "compliance"
  - "microsoft-azure"
  - "anthropic"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn faced the challenge of moving AI agents from siloed proof-of-concepts to production-scale systems that could serve thousands of developers. The company developed a unified platform engineering approach that treats AI agents as a first-class execution model, comparable to microservices infrastructure. The solution involved building both \"foreground agents\" (IDE-integrated tools) and \"background agents\" (autonomous task executors) that operate within secure sandboxes, leverage the Model Context Protocol (MCP) for standardized tool calling, and generate pull requests subject to standard code review processes. This platform enables developers to tackle repetitive toil like migrations and refactoring while maintaining engineering quality, compliance, and observability at enterprise scale."
link: "https://www.infoq.com/podcasts/platform-engineering-scaling-agents/"
year: 2026
seo:
  title: "LinkedIn: Platform Engineering for AI: Scaling Multi-Agentic Systems with MCP - ZenML LLMOps Database"
  description: "LinkedIn faced the challenge of moving AI agents from siloed proof-of-concepts to production-scale systems that could serve thousands of developers. The company developed a unified platform engineering approach that treats AI agents as a first-class execution model, comparable to microservices infrastructure. The solution involved building both \"foreground agents\" (IDE-integrated tools) and \"background agents\" (autonomous task executors) that operate within secure sandboxes, leverage the Model Context Protocol (MCP) for standardized tool calling, and generate pull requests subject to standard code review processes. This platform enables developers to tackle repetitive toil like migrations and refactoring while maintaining engineering quality, compliance, and observability at enterprise scale."
  canonical: "https://www.zenml.io/llmops-database/platform-engineering-for-ai-scaling-multi-agentic-systems-with-mcp"
  ogTitle: "LinkedIn: Platform Engineering for AI: Scaling Multi-Agentic Systems with MCP - ZenML LLMOps Database"
  ogDescription: "LinkedIn faced the challenge of moving AI agents from siloed proof-of-concepts to production-scale systems that could serve thousands of developers. The company developed a unified platform engineering approach that treats AI agents as a first-class execution model, comparable to microservices infrastructure. The solution involved building both \"foreground agents\" (IDE-integrated tools) and \"background agents\" (autonomous task executors) that operate within secure sandboxes, leverage the Model Context Protocol (MCP) for standardized tool calling, and generate pull requests subject to standard code review processes. This platform enables developers to tackle repetitive toil like migrations and refactoring while maintaining engineering quality, compliance, and observability at enterprise scale."
notion:
  pageId: "34ef8dff-2538-8189-b600-da2cd33949fb"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:05:07Z"
---

## Overview

LinkedIn has undertaken a significant platform engineering initiative to operationalize AI agents at enterprise scale, moving beyond the scattered proof-of-concept phase that many organizations experience. The company recognized that developers were experimenting with AI in silos, creating one-off scripts and local tools that, while valuable, led to inconsistent implementations where teams repeatedly reinvented the same infrastructure plumbing around prompt orchestration, data access, safety evaluations, and deployment. LinkedIn's platform team, led by Karthik Ramgopal and Prince Valluri, developed a comprehensive approach that treats AI agents as a new execution model requiring the same level of infrastructure support as microservices or Kubernetes-based compute infrastructure.

The fundamental insight driving LinkedIn's approach is that modern software development has evolved beyond hermit developers coding in isolation. Engineers now spend substantial time on cross-system coordination, triaging issues, pulling data from multiple services, synthesizing insights, and triggering workflows. These are multistep, stateful tasks where agents excel. LinkedIn's solution provides a unified, open-ended platform that allows teams to focus on domain-specific problems while the platform handles system and infrastructure concerns. This approach serves thousands of developers daily and represents a mature, production-grade implementation of agentic systems in enterprise software development.

## Architectural Patterns: Foreground vs. Background Agents

A key architectural distinction in LinkedIn's platform is the separation between "foreground agents" and "background agents," each serving different developer workflows and requirements.

**Foreground agents** operate directly in the IDE, where developers remain actively involved and can observe what the agent is doing in real-time. LinkedIn doesn't build these from scratch but instead augments commercial products like GitHub Copilot with MCP tools and custom instructions that get incorporated into the system prompt. These augmentations help developers during active coding sessions by providing LinkedIn-specific context, enterprise knowledge, and tooling. Foreground agents are ideal when developers want to maintain active control, test ideas, validate approaches, and work through solutions iteratively. The high-fidelity nature of this interaction allows developers to continuously add context and refine outputs as they make progress.

**Background agents** represent a different paradigm where LinkedIn has built the orchestration system ground-up. These agents receive high-level task descriptions and execute autonomously in secure sandbox environments. Developers don't see the "sausage-making" process; they only see the resulting pull request, at which point they can provide comments and feedback. The agent then picks up those comments and addresses them, creating an iterative review cycle. Background agents excel at reducing toil—handling repetitive but essential tasks that rarely get prioritized, such as dependency migrations, refactoring large codebases, improving test coverage, and cleaning up deprecated A/B tests. These tasks increase technical debt over time but are tedious for humans to execute at scale.

## Spec-Driven Development and Task Definition

LinkedIn's approach centers on **spec-driven development**, where developers define their intent through structured specifications that serve as contracts between the developer and the agentic system. A spec translates developer intent into something agents can reliably execute, removing ambiguity from the process. Developers explicitly express what they want to change, how work should be broken down, what tools should be available, and what constitutes success through acceptance criteria and validation checks.

The granularity of these specs typically operates at the **task level**—the same level at which a developer would normally think when picking up work. This could range from creating a repository and configuring database access to implementing complete features involving multiple components. The scope is bounded by the context provided, the tools made available, and what the developer asks the agent to accomplish. This flexibility allows the platform to handle diverse use cases while maintaining a consistent mental model where developers treat the agent as a teammate receiving the same context a human would need.

An interesting pattern that emerged involves using human-generated examples to teach agents repetitive patterns. For tasks like large-scale refactoring, a developer might manually complete a few pull requests that demonstrate the desired approach, effectively teaching the agent the pattern similar to onboarding a junior developer. The agent then learns from these examples and applies the pattern across the broader codebase.

## Execution Model: Sandboxing and Security

When a developer submits a task specification, LinkedIn's platform orchestrates execution in a **remote sandbox environment** where the agent can operate safely within defined constraints. This sandbox provides the agent with freedom to manipulate the file system and execute necessary operations while maintaining strict security boundaries. Certain systems are isolated from the sandbox, authentication and authorization are limited, and agents operate with restricted permissions assigned to specific agent identities.

The platform instantiates the agent within this sandbox along with the context from the developer's spec or prompt, configures it with the appropriate tools (both native platform tools and MCP-based remote tools), and handles authentication with systems like GitHub for repository access, branch management, and pull request creation. This sandboxing approach ensures that autonomous agent behavior remains within safe operational boundaries while providing sufficient capability to accomplish meaningful work.

Critically, LinkedIn applies the principle that **agents cannot directly make code changes**—they can only propose changes. Every agent-generated change goes through the exact same code review process, testing pipelines, and ownership checks that human-generated code undergoes. Developers can replay execution traces, inspect reasoning chains, verify what the agent observed, examine the final changes, and ultimately approve or reject the work. This human-in-the-loop pattern maintains engineering judgment and quality standards while leveraging agents to increase productivity.

## Model Context Protocol (MCP) as Infrastructure

The **Model Context Protocol (MCP)** plays a central role in LinkedIn's agentic platform by standardizing tool calling across different agents, models, and services. Before MCP, AI teams had to wire tool calls differently for each model vendor's function-calling format, creating fragmentation and requiring custom adapters for every internal service. While many teams were converging on OpenAI's format, subtle differences remained that slowed adoption and increased development effort.

MCP solves this by providing a common protocol that, once implemented, allows any language, agent, tool, or model to interact seamlessly. This standardization enables LinkedIn to use the **same MCP tools across both foreground and background agents**, maximizing leverage and reducing duplication. A developer working in their IDE with an augmented GitHub Copilot can access the same enterprise tools that a background agent uses for autonomous migrations or refactoring.

LinkedIn has developed a range of MCP tools covering common developer needs: code search capabilities, static analysis execution, internal command-line tool invocation, structured impact analysis for change assessment, documentation retrieval from internal sources with semantic indexing, and observability tools that pull production metrics and telemetry data. The platform team now guides other infrastructure teams to think about exposing MCP tools for agentic interaction, similar to how they previously built UI layers for human interaction.

## Developer Experience and Platform Abstractions

LinkedIn's platform provides several layers of developer-facing abstractions to make agent adoption seamless. These include mechanisms for **prompt management**, abstractions for defining tools and spinning up MCP servers, and standard infrastructure for abstracting model inference across commercial and in-house models. The platform ensures developers aren't reinventing boilerplate infrastructure while maintaining autonomy over their specific use cases.

For foreground agents, LinkedIn generates and maintains **instruction files** (like Copilot instructions for GitHub Copilot) that are essentially Markdown files encapsulating common context. These files contain knowledge about general LinkedIn development practices, language-specific conventions, and repository-specific patterns. Background agents actually generate these instruction files for foreground agents, creating an interesting symbiosis between the two agent types. The platform provides a standard library of MCP tools and preserves context at multiple levels—enterprise-wide, language-specific, and repository-specific—similar to how human developers are trained to follow organizational conventions.

A key aspect of developer experience is **meeting developers where they are**. Agents integrate into workplace productivity suites, messaging systems like Teams, and IDEs. This contextual integration, combined with fitting into existing workflows rather than requiring process changes, drives adoption and utility. Developers maintain control through prompts they write, MCP tools they select, and built-in infrastructure hooks they configure, all without reinventing low-level plumbing.

## Context Management and RAG Architecture

One of the most challenging aspects of agentic systems is providing sufficient context for agents to make informed decisions, especially when operating autonomously across multiple steps or tools. LinkedIn addresses this through a comprehensive **RAG (Retrieval-Augmented Generation) architecture** that maintains semantic understanding of the evolving codebase.

With thousands of pull requests created and merged daily, LinkedIn's codebase and its semantic meaning constantly change. The platform maintains a queryable semantic index that allows agents to understand how systems work and how to accomplish tasks, analogous to how human developers search through wikis, Slack conversations, or ask teammates. This RAG system serves as a critical information source for agents to produce correct changes.

An innovative approach LinkedIn developed involves using AI to **describe individual pull requests** at a semantic level. For example, if a PR bumps a Gradle dependency version, the system generates a description of what actually changed. When agents need to perform similar tasks, they can query past PRs to find relevant examples—such as all PRs that bumped Gradle versions—and observe what other changes typically accompany such updates. This prevents agents from having to figure everything out from scratch and leverages the organization's historical knowledge encoded in PR history.

LinkedIn also uses its extensive PR history—tens or hundreds of thousands of pull requests with human review comments and responses—as training data for evaluation. This historical data creates a strong baseline for agents to understand what constitutes a mergeable PR versus one requiring changes, and even what specific comments should be added to bring a PR to mergeable quality.

## Evaluation, Observability, and Continuous Improvement

LinkedIn emphasizes that **evaluations are not optional or "phase two" work**—they are core to the platform. The team learned this lesson the hard way and now prioritizes understanding whether agentic systems are improving or regressing over time. Evaluations provide the measurement framework necessary for production-grade AI systems.

The platform incorporates both **qualitative and quantitative evaluation approaches**. On the quantitative side, verifiable checks include whether code builds successfully, whether tests pass, and whether changes meet static analysis requirements. On the qualitative side, LinkedIn leverages its historical PR data to train models that can assess PR quality and predict whether changes will be accepted or require revision.

**Observability** is built into the platform by default. Every step an agent takes, every tool call it makes, and every decision it reaches is audited and traceable. Developers can replay execution traces, inspect reasoning chains, and verify exactly what the agent saw and thought during execution. This transparency is essential for building trust in autonomous systems and for debugging when things go wrong.

All agents operate with **distinct identities** within LinkedIn's systems, making their work auditable and subject to the same permissions and authorization checks that apply to human developers. This identity-based approach enables comprehensive auditing trails and ensures agents cannot exceed their granted permissions.

## Security, Compliance, and Production Readiness

LinkedIn's platform incorporates security and compliance as foundational requirements rather than afterthoughts. The technology changes include the sandbox environment with restrictions on system access, limited context exposure to sensitive systems, and constrained authentication and authorization. Certain systems are simply isolated from agent access regardless of the task.

The critical **process change** LinkedIn enforces is that agents cannot autonomously merge code or make production changes. They can only propose changes through standard pull requests that undergo the same rigorous review, testing, and approval processes that human code follows. This ensures that engineering judgment remains central, code quality standards are maintained, and compliance requirements are met.

The platform treats agents as first-class infrastructure citizens requiring dedicated team support. LinkedIn has established a fully funded **agentic platform team** responsible for process changes, technology evolution, common building block development, and thoughtful adoption of emerging technologies. This mirrors how organizations support microservices infrastructure, storage systems, or machine learning platforms—recognizing that agents represent a fundamental execution model requiring professional operations and continuous improvement.

## Strategic Advice and Lessons Learned

LinkedIn's experience yields several key insights for organizations pursuing similar agentic platforms. First, **invest in solid engineering and platform abstractions** as the only way to move past hype and achieve production reliability. Second, **understand the strengths and limitations of AI** and use it appropriately—agents excel at certain tasks but aren't replacements for human judgment, and current AI capabilities don't support full autonomy everywhere.

Third, organizations must **change their processes** to accommodate AI effectively. Trying to fit AI into existing human-heavy processes with undocumented tribal knowledge won't work. Documentation, structured knowledge, and clear specifications become essential.

Fourth, **don't underestimate evaluations**. They're critical for knowing whether systems improve or regress and should be core platform components from day one, not deferred to later phases.

Finally, LinkedIn advises organizations to **solve for company-specific context** rather than recreating general-purpose tools like GitHub Copilot or Cursor. The value lies in identifying repetitive, high-friction engineering tasks unique to the organization and applying agentic solutions where the company's specific context provides competitive advantage. Generic coding assistance is commoditized; domain-specific automation leveraging proprietary knowledge and patterns is where organizations can capture unique value.

## Use Cases and Impact

LinkedIn's platform supports diverse use cases across the engineering organization. Background agents handle **toil reduction** tasks like dependency migrations across thousands of repositories, improving test coverage systematically, cleaning up deprecated A/B tests, and executing large-scale refactoring efforts. These tasks represent essential but unloved work that accumulates as technical debt when humans don't prioritize them.

Foreground agents accelerate **active development** by eliminating setup and teardown toil, providing context-aware code suggestions, and helping developers test and validate ideas more quickly. They assist with the thinking-heavy work where developers benefit from intelligent collaboration.

Beyond development, LinkedIn explores **observability agents** that monitor production metrics, analyze logs, respond to alerts, and even take safe remedial actions autonomously. These ambient agents escalate to humans when something requires attention while handling routine operational tasks independently.

The platform serves **thousands of developers daily**, indicating substantial scale and adoption. The emphasis on maintaining developer autonomy, fitting into existing workflows, and producing output (pull requests) that developers review and control has proven essential for achieving this adoption level.

LinkedIn's approach demonstrates that production-grade agentic systems require treating AI as infrastructure, not features. The combination of standardized tooling through MCP, secure execution environments, comprehensive context through RAG, rigorous evaluation, and human-in-the-loop review processes creates a foundation for safely scaling autonomous agents across enterprise software development.
