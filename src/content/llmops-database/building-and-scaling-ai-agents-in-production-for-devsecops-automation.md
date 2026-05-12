---
title: "Building and Scaling AI Agents in Production for DevSecOps Automation"
slug: "building-and-scaling-ai-agents-in-production-for-devsecops-automation"
draft: false
llmopsTags:
  - "customer-support"
  - "code-generation"
  - "fraud-detection"
  - "content-moderation"
  - "realtime-application"
  - "regulatory-compliance"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "mcp"
  - "a2a"
  - "evals"
  - "memory"
  - "harness-engineering"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "devops"
  - "orchestration"
  - "cicd"
  - "microservices"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "fastapi"
  - "anthropic"
  - "openai"
  - "amazon-aws"
industryTags: "tech"
company: "Datadog"
summary: "Datadog, an observability platform company, has deployed over a hundred AI agents in production to automate DevSecOps tasks, with plans to scale to thousands more. The agents include an SRE agent for autonomous alert investigation, a Dev agent for code generation and error fixes, and a Security Analyst agent for security investigations. The presentation shares lessons learned from building these production agents, emphasizing the importance of agent-first API design, proactive background operations over reactive chat interfaces, comprehensive evaluation systems, framework and model agnosticism, and treating agents as first-class users of systems and APIs. The agents leverage durable execution frameworks like Temporal and are designed to run autonomously in containerized environments."
link: "https://www.youtube.com/watch?v=C3y3M_03Vco"
year: 2026
seo:
  title: "Datadog: Building and Scaling AI Agents in Production for DevSecOps Automation - ZenML LLMOps Database"
  description: "Datadog, an observability platform company, has deployed over a hundred AI agents in production to automate DevSecOps tasks, with plans to scale to thousands more. The agents include an SRE agent for autonomous alert investigation, a Dev agent for code generation and error fixes, and a Security Analyst agent for security investigations. The presentation shares lessons learned from building these production agents, emphasizing the importance of agent-first API design, proactive background operations over reactive chat interfaces, comprehensive evaluation systems, framework and model agnosticism, and treating agents as first-class users of systems and APIs. The agents leverage durable execution frameworks like Temporal and are designed to run autonomously in containerized environments."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-ai-agents-in-production-for-devsecops-automation"
  ogTitle: "Datadog: Building and Scaling AI Agents in Production for DevSecOps Automation - ZenML LLMOps Database"
  ogDescription: "Datadog, an observability platform company, has deployed over a hundred AI agents in production to automate DevSecOps tasks, with plans to scale to thousands more. The agents include an SRE agent for autonomous alert investigation, a Dev agent for code generation and error fixes, and a Security Analyst agent for security investigations. The presentation shares lessons learned from building these production agents, emphasizing the importance of agent-first API design, proactive background operations over reactive chat interfaces, comprehensive evaluation systems, framework and model agnosticism, and treating agents as first-class users of systems and APIs. The agents leverage durable execution frameworks like Temporal and are designed to run autonomously in containerized environments."
notion:
  pageId: "35df8dff-2538-807f-8209-c9c9b8388139"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:31:00.000Z"
  lastEditedTime: "2026-05-11T20:31:00.000Z"
  publishedAt: "2026-05-11T20:41:02Z"
---

## Overview

Datadog has been building and deploying AI agents at scale to automate DevSecOps tasks within their observability platform. The presentation focuses on practical lessons learned from deploying the first hundred or so agents and preparing to scale to the next thousand. This case study is particularly valuable as it comes from a production observability company that is both building AI agents for their customers and observing how AI systems operate in real-world environments.

The company has organized their AI strategy around three focus areas: AI agents for Datadog, Datadog for AI and AI agents, and AI agent infrastructure. This demonstrates a comprehensive approach to both product development and internal tooling around LLMs in production.

## Production Agents Currently Deployed

Datadog has three major AI agents currently in general availability and running in production environments:

**Bits AI SRE** was positioned as one of the first automated SRE agents on the market. This agent autonomously investigates alerts with the explicit goal of preventing engineers from being woken up at 2 AM to handle incidents. The system works to investigate issues as they occur and ideally has already diagnosed the problem by the time engineers arrive at their computers in the morning. This represents a significant shift from traditional reactive monitoring to autonomous incident response.

**Bits AI Dev** focuses on code generation specifically targeted at operational improvements. The agent analyzes errors coming through services, examines latency issues, and identifies opportunities for code improvements that developers would typically handle manually. The value proposition centers on allowing developers to see proposed code fixes directly within Datadog without needing to open an IDE, streamlining the feedback loop from observation to remediation.

**Security Analyst agent** automates security investigations that traditionally required significant human time. The agent handles the checklist-driven investigation work that security analysts perform when concerning alerts appear. This automation targets one of the most time-intensive and critical areas of operations where consistent, thorough investigation is essential.

## Core LLMOps Principles and Lessons Learned

### Agent-First API Design

A central theme is the concept of designing systems to be agent-native from the ground up. The presentation draws an explicit parallel to the Bezos API mandate at Amazon, which enforced strict API-first design principles that enabled Amazon to become a platform company. The proposed equivalent for the AI era involves several key principles:

All interfaces should be agent-friendly by design, not as an afterthought. This means avoiding situations where critical functionality can only be accessed through human-oriented UIs. Companies should proactively work to automate tasks that both internal employees and customers perform, using agents themselves rather than waiting for others to build automations. The technology used for agent interaction should remain flexible, whether MCP, API skills, or agent-to-agent protocols, but the commitment to agent accessibility should be non-negotiable.

Importantly, the presentation emphasizes that UX and design teams must be involved in thinking about agents as users. The observation was made that development teams are often trying to make agents work while design teams haven't considered agents in their design process at all. This represents a significant organizational challenge in building agent-native systems.

Datadog has implemented an MCP server to serve as an entry point for agents to be customers of their platform directly. Beyond this, they emphasize that agents should be able to read documentation, referencing standards like LLMs.txt and markdown support.

### Proactive Over Reactive Architecture

While chat interfaces have dominated early agent experiences, the presentation argues that the agents that will succeed are those that can run autonomously in the background for extended periods. This requires several architectural considerations:

Background long-running agents should be event-driven rather than continuously polling or requiring constant user interaction. The agents need to be durable, capable of surviving restarts and maintaining state across interruptions. Datadog specifically calls out Temporal as a framework they use extensively for this purpose, highlighting the importance of workflow orchestration for agent reliability.

For safety and isolation, agents should run in containers and sandboxes rather than on local machines, with appropriate storage and file systems that allow agents to be swapped out or upgraded. This containerized approach provides both security boundaries and operational flexibility.

The shift from reactive chat to proactive background agents represents a fundamental architectural difference in how agent systems are designed and deployed.

### Comprehensive Evaluation Systems

The presentation takes a strong stance on evaluation, stating that if you're launching an agent without knowing how you'll do evaluation, you shouldn't launch that agent. This reflects the reality that initial agent implementations won't work for everything and need systematic improvement processes.

The evaluation strategy should include three components working together: offline evaluation for testing before deployment, online evaluation for monitoring production performance, and a living, breathing evaluation system that evolves as conditions change. This acknowledges that data drift and changing conditions are inevitable in production systems.

An interesting meta-level recommendation is to make the evaluation system itself accessible to agents, potentially through an MCP server or similar interface. This enables an agent to think about the improvement loop and potentially automate aspects of the evaluation and refinement process. This represents a sophisticated approach where the operations tooling itself becomes agent-accessible.

### Model and Framework Agnosticism

The presentation emphasizes maintaining flexibility across both models and frameworks, cautioning against building systems tightly coupled to any particular provider. The rationale is that model leadership changes rapidly, with the example given that Anthropic was considered less competitive by some just before a major release, and then became viewed as leading again shortly after.

To maintain agnosticism while still capturing organizational learning, the recommendation is to build robust memory systems that can preserve what agents have learned regardless of which model is being used. This allows the organizational knowledge to persist even as the underlying model infrastructure changes.

The agent harness or orchestration layer should be kept simple and built with the expectation of rewriting it. This reflects a pragmatic acceptance that best practices are still emerging and flexibility is more valuable than premature optimization.

### Multiplayer Dynamics

The concept of multiplayer interactions has expanded beyond the traditional notion of multiple humans collaborating in the same interface. In the agent era, multiplayer encompasses three interaction patterns: human-to-human, human-to-agent, and agent-to-agent. Communication systems need to appropriately support all three patterns.

This represents a significant expansion of how systems need to handle collaboration, identity, permissions, and coordination. Agents aren't just tools used by individuals but participants in complex multi-party workflows.

### Observability and Monitoring

As an observability company building agents, Datadog brings a particular perspective on the importance of monitoring agent behavior. The "who watches the watchmen" problem is explicitly acknowledged: when you deploy an agent, does another agent watch it, and if so, who watches that agent?

The solution involves comprehensive monitoring of agent behavior, which ties back to the evaluation systems discussed earlier. The company's core competency in observability presumably informs how they instrument and monitor their agent systems, though specific monitoring approaches aren't detailed in the presentation.

## Technical Infrastructure Choices

Several specific technical decisions are mentioned that inform Datadog's LLMOps approach:

**Temporal** is used extensively for durable agent execution, providing workflow orchestration that allows agents to run for extended periods, survive failures, and maintain state.

**Containerization and sandboxing** are emphasized for agent isolation and security, moving away from agents running on local development machines toward production-grade deployment environments.

**MCP servers** are used as one interface for allowing agents to interact with Datadog's platform, demonstrating adoption of emerging standards for agent-system communication.

The emphasis on event-driven architectures suggests integration with message queues or event streaming platforms, though specific technologies aren't named.

## Forward-Looking Considerations

The presentation concludes with expectations for how agent capabilities will evolve:

Agents will increasingly learn on the job, improving within specific organizational contexts and tasks. This suggests that fine-tuning, few-shot learning, or memory systems will become more sophisticated.

Agents will become longer-running and more independent, requiring less human supervision over time. This trend reinforces the architectural emphasis on durable execution and comprehensive monitoring.

Multimodal capabilities will become more important, with computer use and visual understanding becoming practical capabilities rather than experimental features. This suggests that agents will move beyond text-only interactions to understanding and manipulating graphical interfaces.

## Critical Assessment and Considerations

While the presentation offers valuable insights from production experience, several considerations warrant mention:

The case study represents the perspective of a company selling agent-related products, so claims about agent capabilities and readiness should be evaluated in that context. The agents described automate important but well-scoped tasks like alert investigation and code suggestions, which may have more deterministic evaluation criteria than some other agent applications.

The emphasis on "agent-first" design is compelling but represents significant organizational change that extends beyond engineering to design, product, and business strategy. The practicality of this transformation will vary significantly across organizations.

The recommendation to stay framework and model agnostic is sound but potentially in tension with taking advantage of specific capabilities that particular models or frameworks offer. The abstraction layer required for true agnosticism may limit access to cutting-edge capabilities.

The security and safety considerations for autonomous agents running in production environments are mentioned primarily through containerization, but the full complexity of agent security, including prompt injection, unintended actions, and data access controls, isn't deeply explored.

The evaluation systems described are positioned as essential, but the practical challenge of defining good evaluation metrics for complex agent behaviors isn't addressed. Many agent tasks involve judgment calls and contextual considerations that resist simple metrics.

## Additional Product and Tooling

The presentation mentions a new product called dispatch.agents.ai that encodes some of these learnings, though details are limited. This appears to be an experimental product focused on agent orchestration and management.

Overall, this case study provides valuable practical insights from a company actively deploying multiple production agents at scale, with particular emphasis on infrastructure, evaluation, and architectural patterns that support autonomous agent operations in production environments.
