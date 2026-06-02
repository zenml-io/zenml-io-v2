---
title: "Orchestrating Fleet-Scale AI Coding Agents with Temporal Workflows"
slug: "orchestrating-fleet-scale-ai-coding-agents-with-temporal-workflows"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "docker"
  - "kubernetes"
  - "cicd"
  - "orchestration"
  - "monitoring"
  - "devops"
  - "microservices"
  - "postgresql"
  - "redis"
  - "fastapi"
  - "pytorch"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Macroscope"
summary: "Macroscope, a software development intelligence platform founded by former Twitter executives, built two production LLM systems powered by Temporal workflows: their core code understanding and review platform, and Murmur, a fleet orchestration system for AI coding agents. The core Macroscope product uses LLMs to automatically understand code changes, answer natural language questions about development progress, and perform high-signal code review with custom AI agents. Their Murmur tool addresses the limitations of managing multiple AI coding sessions by orchestrating fleets of sandboxed coding agents running in cloud VMs, each capable of self-verification through CI integration, code review feedback, and automated screenshot verification. Early internal metrics showed 32x productivity multipliers, with 40% of customer PRs automatically approved through their AI review system."
link: "https://www.youtube.com/watch?v=iv3kfcXFS7w"
year: 2026
seo:
  title: "Macroscope: Orchestrating Fleet-Scale AI Coding Agents with Temporal Workflows - ZenML LLMOps Database"
  description: "Macroscope, a software development intelligence platform founded by former Twitter executives, built two production LLM systems powered by Temporal workflows: their core code understanding and review platform, and Murmur, a fleet orchestration system for AI coding agents. The core Macroscope product uses LLMs to automatically understand code changes, answer natural language questions about development progress, and perform high-signal code review with custom AI agents. Their Murmur tool addresses the limitations of managing multiple AI coding sessions by orchestrating fleets of sandboxed coding agents running in cloud VMs, each capable of self-verification through CI integration, code review feedback, and automated screenshot verification. Early internal metrics showed 32x productivity multipliers, with 40% of customer PRs automatically approved through their AI review system."
  canonical: "https://www.zenml.io/llmops-database/orchestrating-fleet-scale-ai-coding-agents-with-temporal-workflows"
  ogTitle: "Macroscope: Orchestrating Fleet-Scale AI Coding Agents with Temporal Workflows - ZenML LLMOps Database"
  ogDescription: "Macroscope, a software development intelligence platform founded by former Twitter executives, built two production LLM systems powered by Temporal workflows: their core code understanding and review platform, and Murmur, a fleet orchestration system for AI coding agents. The core Macroscope product uses LLMs to automatically understand code changes, answer natural language questions about development progress, and perform high-signal code review with custom AI agents. Their Murmur tool addresses the limitations of managing multiple AI coding sessions by orchestrating fleets of sandboxed coding agents running in cloud VMs, each capable of self-verification through CI integration, code review feedback, and automated screenshot verification. Early internal metrics showed 32x productivity multipliers, with 40% of customer PRs automatically approved through their AI review system."
notion:
  pageId: "373f8dff-2538-806b-a472-d4688b06377e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:20:00.000Z"
  lastEditedTime: "2026-06-02T07:20:00.000Z"
  publishedAt: "2026-06-02T07:37:23Z"
---

## Overview

Macroscope is a software development intelligence platform founded by Keyvon Beykpour and Aaron Wasserman, who previously built Periscope and worked at Twitter for 8-9 years. The company has developed two interconnected LLM-powered production systems: their core Macroscope product for code understanding and review, and Murmur, a fleet orchestration platform for managing multiple AI coding agents at scale. Both systems are heavily built on Temporal workflows for orchestration, durability, and state management.

The case study provides detailed insights into how a production-grade LLMOps infrastructure can be architected to support complex, long-running AI agent workflows with strict reliability and security requirements. The presentation emphasizes the practical engineering decisions around workflow orchestration, VM lifecycle management, security boundaries, and integration with existing development tools.

## Core Macroscope Product: Code Understanding and Review

### Problem Statement and Architecture

The core Macroscope product addresses two fundamental challenges in software development: understanding what's happening in the development process and performing high-quality code review. Traditional approaches rely on manual processes, meetings, project management tools like Jira or Linear, and extensive Slack conversations. Macroscope positions the code base itself as the single source of truth and uses LLMs to extract semantic understanding from code changes.

The platform provides both observability dashboards showing engineering output by team, person, and semantic product area, as well as natural language query capabilities through Slack integration or API. This allows stakeholders to ask questions like "What did we get done this week?" and receive answers grounded in actual code changes rather than project management artifacts.

### Code Review Capabilities

Macroscope differentiates its code review offering through three key features:

**High Signal-to-Noise Ratio**: The team emphasizes that many AI code review tools generate excessive noise, leading to abandonment. They conducted internal benchmarking against competitors including Code Rabbit, Cursor, Greptile, and Graphite, showing the highest bug detection rate on their own benchmark. Independent validation from Martian showed Macroscope scoring highest on F1 score (combining precision and recall) among the same competitors. While self-reported benchmarks should be viewed with appropriate skepticism, the focus on this metric indicates a production-oriented approach prioritizing actionable findings over comprehensive but noisy results.

**Custom Review Agents Framework**: Beyond out-of-the-box correctness and approvability checks, Macroscope provides a framework for customers to build custom review agents. These can enforce organization-specific workflows like drawing architecture diagrams, checking dependency issues, or validating database migration workflows. The agents have access to bespoke tools and integrations with providers including Linear, Jira, Sentry, and GCP logs. This extensibility suggests a plugin architecture allowing customers to customize the LLM review pipeline for domain-specific requirements.

**Approvability Feature**: The most distinctive capability is automatic PR approval for low-risk changes. The system identifies PRs without correctness issues, assesses blast radius, and applies organization-specific criteria to automatically approve approximately 40% of PRs for customers who enable this feature. This represents a shift from AI as an advisory tool to AI as an autonomous decision-maker in the development workflow, though presumably with appropriate guardrails and human oversight mechanisms.

### Temporal-Powered Architecture

According to Aaron Wasserman, everything in Macroscope is implemented as a Temporal workflow, providing durability, debuggability, and observability across all features:

**Check Runs**: Each custom check run on a PR gets its own discrete state machine through Temporal. This ensures durability across deployments and failures, with full visibility into execution state for debugging.

**Agent Harness**: Natural language questions through Slack trigger a system of workflows representing the agent harness. This allows inspection of all tool calls the agent makes when answering questions, providing crucial observability for debugging and optimization.

**Fan-Out for Large PRs**: Large pull requests with hundreds of function changes are processed through independent child workflows that each run the code review pipeline. This architecture enables partial results reporting - if a bug is found in one function while others are still being reviewed, that finding can be surfaced immediately rather than waiting for complete analysis. The use of child workflows provides natural parallelism and fault isolation.

**GitHub Webhook Processing**: All state updates in response to GitHub webhooks (PR opens, commits, review comments, CI failures) trigger workflows that update Macroscope's internal state. This is explicitly designed to avoid GitHub API rate limits by maintaining a local state representation synchronized through event-driven workflows rather than polling.

**Scheduled Automations**: Customers can configure scheduled workflows for regular tasks. An internal example involves nightly analysis of GCS logs from the past 24 hours, with an agent identifying trends, creating Linear tickets, and posting Slack messages to potentially responsible engineers.

## Murmur: Fleet Orchestration for AI Coding Agents

### Motivation and Problem Definition

Murmur emerged from internal pain points the Macroscope team experienced while using AI coding assistants like Claude. They found themselves managing multiple Claude sessions across different tabs and worktrees, trying to shepherd three to five concurrent projects - describing it as "both magical and painful at the same time." The fundamental limitation they identified was that coding agents lack proper environments for self-verification, causing them to go off the rails or fail to complete complex tasks end-to-end.

The core insight was that the intelligence available from frontier LLMs far exceeds the ergonomic constraints of typical chat-based interfaces. Complex tasks require agents capable of self-verifying their work through actual execution, testing, and integration with the full development pipeline including CI and code review.

### Architecture and Design Principles

Murmur orchestrates fleets of coding agents, with each agent running in an isolated sandbox environment:

**Cloud VM Sandboxes**: Every agent spawns in a dedicated cloud VM, either in Murmur's GCP-based cloud environment or in the customer's own VPC. This allows connection to microservices behind customer VPNs while maintaining isolation between concurrent agents.

**Bring Your Own Agent and Keys**: Customers can use any coding agent (the examples mention Claude Code and Codex) with their own API keys, maintaining control over model selection and billing.

**Self-Driving Lifecycle Management**: Unlike traditional coding assistants that require continuous human steering, Murmur agents are connected to lifecycle events from source control systems. They can create plans, write code, open PRs, listen for PR comments from humans or review bots, respond to CI failures, and iterate until producing merge-ready code. The stated workflow is: "We open a task, we go away. We go to sleep, we go work on another task, we come back and the plan is not just done, the code isn't just written, but all the findings from the review bots are solved."

**MCP Integration**: Beyond the web UI, Murmur integrates with the Model Context Protocol, allowing engineers to use a local Claude session as an orchestration layer for the entire remote fleet. This enables natural fan-out (spawning multiple parallel tasks) and fan-in (aggregating results, merging PRs) patterns through conversational interaction.

### Live Demonstration Workflows

The presentation included live demonstrations showing several workflow patterns:

**Simple UI-Based Task Creation**: Creating a task to change UI copy in the header. The system spawns a VM, starts the coding agent, and begins working on the task with a visual status indicator.

**Self-Verification with Screenshots**: A design improvement task showed the agent creating multiple turns of work. The agent used Playwright CLI to take before/after screenshots of its changes, then reflected on those screenshots to verify task completion. This visual verification loop represents a sophisticated self-evaluation mechanism beyond simple code execution.

**Multi-Turn PR Refinement**: The Notion integration task showed 20 turns of agent activity - the first building the integration, and 19 subsequent turns responding to CI failures, Macroscope code review findings, and Cursor-generated bug reports. The engineer reported providing only the initial prompt and returning to a merge-ready PR with multiple commits and bug fixes.

**Event-Driven Iteration**: Demonstration of leaving a PR comment requesting better code documentation, which appeared as an event in Murmur's UI, woke up the VM, and triggered another agent turn to address the feedback.

**MCP-Based Fan-Out**: Using a local Claude session, the engineer pasted a task description with four independent features (Figma integration, Notion integration, UI dismiss button, coding time view). The local Claude instance used Murmur's MCP integration to spawn four parallel tasks, each with its own VM, code checkout, and full environment including the team's 25 microservices, web app, Go backend, Temporal, and Tilt setup.

### Temporal Orchestration for Murmur

The Temporal architecture for Murmur addresses unique challenges compared to the core Macroscope product:

**VM Pool Management**: A long-running workflow manages the pool of available VMs, keeping some warm to reduce spin-up latency when new tasks are spawned.

**Decoupled VM and Agent Lifecycles**: VM lifecycle workflows are intentionally separated from agent workflows. When an agent is idle (waiting for PR review or CI completion), the VM can be shut down to save costs, then restarted when new events arrive. This decoupling is critical for managing costs with potentially dozens or hundreds of concurrent agents.

**Security Architecture and Trust Boundaries**: The VM layer is explicitly treated as untrusted since it executes arbitrary customer code. A Temporal Proxy sits between Temporal Cloud and the VMs. From Temporal Cloud's perspective, all traffic appears trusted. VMs make GRPC calls with minted JWTs that only grant access to the specific worker and task queue provisioned for that VM, providing strong isolation between concurrent agents.

**Long-Running Workflow Management**: Unlike Macroscope workflows that typically run minutes to hours, Murmur workflows can run for many hours or even days (examples include long-running benchmarks for model testing). To avoid technical debt from workflow versioning and backwards compatibility, Murmur uses workflow version pinning combined with Temporal's worker controller system. This allows the team to move the product forward without maintaining backwards compatibility for long-running workflows.

## Production Metrics and Impact

The team reports significant measured productivity improvements from internal use:

**32x Productivity Multiplier**: Using Macroscope's own code output measurement system, they measured their CTO's engineering output while using Murmur extensively compared to colleagues still onboarding. The metric is normalized for work weeks, showing output equivalent to 32 work weeks in a single week. This dramatic claim should be viewed with appropriate skepticism - it likely reflects selective measurement during peak agent effectiveness on suitable tasks rather than sustained productivity across all work types. However, even accounting for measurement bias, it suggests substantial productivity gains are achievable with proper orchestration infrastructure.

**40% Auto-Approval Rate**: Customers using the approvability feature, including Fortune 500 public companies, see approximately 40% of PRs automatically approved by Macroscope. This represents significant time savings on routine code review, allowing human reviewers to focus on complex, high-blast-radius changes.

## LLMOps Engineering Insights

Several production engineering patterns emerge from this case study:

**Workflow Orchestration as Foundation**: The consistent use of Temporal workflows across both products provides durability, observability, and debuggability. Every major feature maps to one or more workflow types, suggesting that workflow engines are first-class infrastructure for LLMOps just as they are for traditional backend systems.

**Event-Driven Agent Architecture**: Rather than purely reactive chatbot patterns, both products integrate deeply with external event sources (GitHub webhooks, CI systems, code review tools). This enables truly autonomous operation where agents can be "walked away from" and complete complex multi-step tasks.

**Sandboxing and Isolation**: The VM-per-agent architecture in Murmur provides strong isolation for executing untrusted code while enabling rich environmental setup (full microservice stacks, development tools, browsers for visual verification). This suggests that production AI coding systems require substantial infrastructure investment beyond LLM API access.

**Self-Verification Mechanisms**: Multiple verification strategies are employed: execution in live environments, screenshot-based visual verification, integration with CI systems, and code review by other AI agents. This layered approach addresses the fundamental problem of LLM hallucination and unreliability.

**Cost Management Through Lifecycle Decoupling**: Explicitly managing VM lifecycle separately from agent/workflow lifecycle demonstrates awareness of infrastructure costs at scale. With dozens or hundreds of concurrent agents, naive "always-on" approaches would be prohibitively expensive.

**Security Through Architecture**: The trust boundary between Temporal Cloud and untrusted VMs, enforced through proxy infrastructure and JWT-based authentication, shows production-grade security thinking. This is particularly important when customers may run agents in their own VPCs accessing sensitive internal systems.

## Critical Assessment

While the case study demonstrates sophisticated engineering and compelling capabilities, several considerations deserve attention:

**Benchmark Validity**: The self-reported benchmarks showing superiority over competitors should be interpreted cautiously. The independent Martian benchmark provides some external validation, but comprehensive evaluation of code review quality remains challenging and domain-dependent.

**Productivity Claims**: The 32x productivity multiplier is extraordinary and likely reflects measurement during optimal conditions on suitable tasks. Real-world sustained productivity gains would likely be lower and vary significantly by task type, engineer skill, and codebase characteristics.

**Approval Automation Risks**: Automatically approving 40% of PRs represents significant delegation of judgment to AI systems. While the blast radius assessment and correctness checking provide guardrails, there remain risks around subtle bugs, security issues, or architectural misalignments that automated review might miss.

**Cost and Complexity**: The infrastructure required - fleet of VMs, Temporal Cloud, proxy infrastructure, integration with multiple external services - represents substantial operational overhead. Organizations considering similar approaches must weigh productivity gains against infrastructure costs and engineering investment.

**Generalization Limits**: The demonstrated use cases focus heavily on web application development with modern tooling (GitHub, Slack, Linear, etc.). Effectiveness may vary significantly for embedded systems, data engineering, scientific computing, or other domains with different toolchains and verification requirements.

## Conclusion

This case study illustrates a mature, production-oriented approach to LLMOps that goes well beyond simple LLM API integration. By investing in robust workflow orchestration, sandboxed execution environments, event-driven architectures, and multiple verification mechanisms, Macroscope has built systems that can operate autonomously over extended periods while maintaining safety and reliability. The use of Temporal workflows as a foundational abstraction provides the durability and observability essential for debugging and operating complex AI systems in production. While extraordinary productivity claims warrant skepticism, the architectural patterns and engineering practices demonstrated offer valuable lessons for organizations building production LLM systems at scale.
