---
title: "Building a Full-Context Background Coding Agent with Sandboxed Development Environments"
slug: "building-a-full-context-background-coding-agent-with-sandboxed-development-environments"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "latency-optimization"
  - "cost-optimization"
  - "docker"
  - "kubernetes"
  - "postgresql"
  - "redis"
  - "cicd"
  - "continuous-integration"
  - "orchestration"
  - "monitoring"
  - "devops"
  - "microservices"
  - "scaling"
  - "serverless"
  - "open-source"
  - "meta"
  - "openai"
industryTags: "finance"
company: "Ramp"
summary: "Ramp developed Ramp Inspect, an internal background coding agent that now generates over half of all merged pull requests at the company. The challenge was to create a coding agent that matched local development speed while being accessible to all team members regardless of technical expertise, and that could deeply integrate with Ramp's entire technology stack including observability and deployment tools. The solution leveraged Modal's infrastructure, particularly Modal Sandboxes, to spin up complete development environments in seconds containing all necessary services (Postgres, Redis, Temporal, RabbitMQ), with filesystem snapshots ensuring near-instant startup times. The system supports multiplayer collaboration, runs hundreds of concurrent sessions, and is accessible via Slack, web interface, and Chrome extension, enabling not just engineers but also product managers and designers to ship code directly."
link: "https://modal.com/blog/how-ramp-built-a-full-context-background-coding-agent-on-modal"
year: 2026
seo:
  title: "Ramp: Building a Full-Context Background Coding Agent with Sandboxed Development Environments - ZenML LLMOps Database"
  description: "Ramp developed Ramp Inspect, an internal background coding agent that now generates over half of all merged pull requests at the company. The challenge was to create a coding agent that matched local development speed while being accessible to all team members regardless of technical expertise, and that could deeply integrate with Ramp's entire technology stack including observability and deployment tools. The solution leveraged Modal's infrastructure, particularly Modal Sandboxes, to spin up complete development environments in seconds containing all necessary services (Postgres, Redis, Temporal, RabbitMQ), with filesystem snapshots ensuring near-instant startup times. The system supports multiplayer collaboration, runs hundreds of concurrent sessions, and is accessible via Slack, web interface, and Chrome extension, enabling not just engineers but also product managers and designers to ship code directly."
  canonical: "https://www.zenml.io/llmops-database/building-a-full-context-background-coding-agent-with-sandboxed-development-environments"
  ogTitle: "Ramp: Building a Full-Context Background Coding Agent with Sandboxed Development Environments - ZenML LLMOps Database"
  ogDescription: "Ramp developed Ramp Inspect, an internal background coding agent that now generates over half of all merged pull requests at the company. The challenge was to create a coding agent that matched local development speed while being accessible to all team members regardless of technical expertise, and that could deeply integrate with Ramp's entire technology stack including observability and deployment tools. The solution leveraged Modal's infrastructure, particularly Modal Sandboxes, to spin up complete development environments in seconds containing all necessary services (Postgres, Redis, Temporal, RabbitMQ), with filesystem snapshots ensuring near-instant startup times. The system supports multiplayer collaboration, runs hundreds of concurrent sessions, and is accessible via Slack, web interface, and Chrome extension, enabling not just engineers but also product managers and designers to ship code directly."
notion:
  pageId: "34ef8dff-2538-818d-8e43-f99af25e44e1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:05:11Z"
---

## Overview and Context

Ramp, a financial technology company, built Ramp Inspect, an internal background coding agent that represents a sophisticated production deployment of LLM-powered development tooling. The case study provides detailed insights into how the company architected a system that now generates over half of all merged pull requests across their codebase. Notably, over 80% of Inspect itself is now written by Inspect, demonstrating a recursive improvement cycle that's both impressive and indicative of the agent's capabilities. However, this being a Modal customer story, we should view the quantitative claims with appropriate skepticism while still recognizing the architectural patterns and LLMOps practices described.

The core challenge Ramp faced was creating a coding agent that could match or exceed the performance of local development while being accessible to non-engineers. This required solving several fundamental LLMOps problems: environment provisioning speed, deep integration with enterprise tooling, parallel session management, and zero-setup user experience. The solution needed to support not just engineers but also product managers and designers, democratizing code generation across the organization.

## Technical Architecture and Infrastructure

The architecture of Ramp Inspect is built on Modal's infrastructure primitives, with Modal Sandboxes serving as the foundation for isolated development environments. Each Inspect session runs in its own Modal Sandbox containing a complete full-stack development environment that mirrors what an engineer would have locally. This includes database systems (Postgres, Redis), orchestration tools (Temporal), message queues (RabbitMQ), and every service that Ramp's engineers use in local development.

The sandboxed environment approach solves a critical LLMOps challenge: providing the AI agent with the same low-latency access to services, files, and tools that a human developer would have. By keeping everything within a single sandbox, the system eliminates network latency between the agent and test suites, avoids remote filesystem synchronization issues, and ensures consistent execution environments. This architectural decision reflects a deep understanding of how coding agents need to interact with development infrastructure to be effective.

Inside each sandbox, OpenCode operates as the actual coding agent. The environment also includes a VS Code server for manual edits when needed, a web terminal for command-line operations, and notably, a VNC stack with Chromium for visual verification of frontend changes. This visual verification capability allows the agent to take before-and-after screenshots, navigate the application in a real browser, and confirm its work visually—mimicking human quality assurance processes. This multi-modal verification approach represents an important LLMOps pattern for agents working on user-facing applications.

## Distributed Coordination and Scaling

Beyond the sandbox environments themselves, Ramp built a distributed coordination layer using Modal's primitives. Modal Functions run on a cron schedule every 30 minutes to clone repositories, install dependencies, and build fresh filesystem snapshots. This periodic refresh ensures sandboxes always start from a near-current state of the codebase. Modal Dicts manage session locks and store image metadata, providing the shared coordination layer that enables multiplayer sessions where multiple users can collaborate on the same code changes. Modal Queues route prompts from various clients (Slack, web interface, Chrome extension) into the appropriate session, decoupling input from execution so multiple interfaces can feed into one session without conflicts.

This separation of concerns between the sandbox execution environment and the distributed coordination layer represents mature LLMOps architecture. By leveraging managed infrastructure primitives rather than building custom distributed systems, Ramp's team could focus on the agent experience itself—the tooling, integrations, and user experience—rather than solving infrastructure problems. The case study notes that this allowed a prototype built in days to scale to hundreds of concurrent sessions without requiring a rewrite, though we should note that this rapid scaling claim comes from marketing material and may represent an idealized timeline.

## Performance Optimization Through Filesystem Snapshots

A critical LLMOps challenge for background coding agents is startup latency. If an agent takes several minutes to spin up an environment, it becomes unusable for iterative development workflows. Ramp solved this through Modal's filesystem snapshot feature, which represents an important pattern for optimizing LLM agent deployment.

The system works by having a cron job clone repositories, install dependencies, run initial builds, and save snapshots of the sandbox filesystem every 30 minutes. Because filesystem snapshots are stored as diffs from the base image, only modified files are persisted, keeping snapshots fast and lightweight. When a builder starts a new session, Inspect creates a sandbox from the latest snapshot. Since snapshots are at most 30 minutes old, syncing with the head of the repository is nearly instant, enabling sessions to start working on prompts within seconds.

This approach demonstrates sophisticated thinking about the full lifecycle of LLM-powered tools in production. The trade-off between snapshot freshness and startup speed is explicitly managed through the 30-minute refresh cadence. While the case study doesn't discuss how Ramp handles situations where the codebase has changed significantly in the last 30 minutes, or how they manage snapshot storage costs at scale, the general pattern of pre-warming environments with periodic snapshots is applicable beyond this specific use case.

## Integration with Enterprise Tooling

One of the most significant LLMOps aspects of Ramp Inspect is its deep integration with Ramp's existing technology stack. The system connects with GitHub for version control, Slack for communication, Buildkite for continuous integration, and observability tools including Sentry and Datadog. Additionally, the agent can interact with LaunchDarkly (feature flags) and Temporal (workflow orchestration).

These integrations are crucial for a production coding agent because they allow the AI to verify its own work end-to-end within the actual deployment and monitoring infrastructure. Rather than just generating code in isolation, the agent can trigger builds, monitor for errors in Sentry, check metrics in Datadog, and ensure that code changes behave correctly within the broader system. This "verification loop" where the agent can observe the consequences of its changes in production-like environments represents a mature approach to LLM deployment that goes beyond simple code generation.

The case study emphasizes that this integration depth was essential for adoption—a background agent that was slower or less capable than working locally would never be used. This highlights an important LLMOps principle: production AI systems need to meet or exceed existing workflows, not just provide novelty. The integration with observability tools in particular suggests that Ramp is thinking carefully about how to monitor and debug AI-generated code, though the case study doesn't provide details on how they handle attribution, quality metrics, or incident response when agent-generated code causes issues.

## Multi-Modal Access and Collaboration

Ramp designed Inspect to be accessible through multiple interfaces: Slack, a web interface with hosted VS Code editor and streamed desktop view, and a Chrome extension that lets non-engineers visually select UI elements to change. All clients sync to the same session state, and every session supports multiplayer collaboration so colleagues can work together in real time.

This multi-interface approach addresses a key LLMOps challenge: how do you make AI tooling accessible to users with different technical skills and workflows? By meeting users where they already work—in Slack for quick requests, in a web IDE for detailed editing, or through a Chrome extension for visual changes—Ramp removed barriers to adoption. The fact that all these interfaces connect to the same underlying session demonstrates careful state management and synchronization, which are non-trivial distributed systems challenges.

The multiplayer capability is particularly interesting from an LLMOps perspective. It suggests that Ramp views the coding agent not as a replacement for human developers but as a collaborative tool that can work alongside multiple team members simultaneously. The technical implementation of multiplayer sessions at scale (hundreds of concurrent sessions, each potentially with multiple collaborators) requires careful management of session state, conflict resolution, and synchronization—areas where the case study provides limited detail but which would be critical for teams considering similar implementations.

## Scalability and Resource Management

The case study emphasizes that because each session runs in its own isolated Modal Sandbox, there's no contention between sessions and no load on developers' laptops. A builder can kick off multiple variations of the same prompt, try different models (suggesting the system supports model selection), or let Inspect spawn child sessions to parallelize work across repositories—all running concurrently in the cloud.

This architecture enables what the head of Applied AI describes as "effectively hundreds of computers that they can work on simultaneously" for every builder. From an LLMOps perspective, this raises important questions about resource management, cost control, and scheduling that the case study doesn't deeply address. Running hundreds of full-stack development environments with databases, browsers, and all supporting services simultaneously could be extremely resource-intensive. The case study doesn't discuss how Ramp manages costs, whether they implement any session timeouts or resource limits, or how they handle priority when many users are requesting agents simultaneously.

The ability to spawn child sessions for parallel work across repositories is an interesting architectural pattern that suggests the agent has some level of autonomous task decomposition and parallel execution planning. However, without more detail on how this works, how progress is aggregated, and how consistency is maintained across parallel changes, it's difficult to assess the sophistication of this capability.

## Adoption Metrics and Impact

The case study claims that within a couple of months, roughly half of all merged pull requests across Ramp's frontend and backend repositories are started by Inspect. This is presented as organic adoption—Ramp didn't mandate the tool but let the product speak for itself. If accurate, this represents remarkable adoption for an internal AI tool and suggests genuine value creation.

However, we should interpret these metrics carefully. "Started by Inspect" could mean various things: the agent might write a first draft that humans extensively revise, or it might produce nearly production-ready code with minimal changes. The case study doesn't provide detail on what percentage of agent-started PRs are merged without modification, how much engineer time is spent reviewing and fixing agent code, or whether code quality metrics (bug rates, test coverage, performance) differ between agent-generated and human-written code.

The claim that over 80% of Inspect itself is now written by Inspect is particularly interesting. This recursive self-improvement suggests the agent can handle complex codebases and architectural patterns, at least within its own domain. However, this could also indicate that the Inspect codebase is particularly well-suited to agent-generated code, and may not be representative of all software development tasks.

The impact on non-engineering roles—product managers adding features directly, designers implementing UI changes—is presented as a major benefit. From an LLMOps perspective, this democratization of code generation creates new challenges around code review, quality assurance, and knowledge transfer that the case study doesn't address. How does Ramp ensure that code written by non-engineers maintains architectural consistency, security standards, and performance characteristics?

## LLMOps Maturity and Lessons

The Ramp Inspect case study demonstrates several hallmarks of mature LLMOps practice. The system is built on managed infrastructure rather than custom solutions, allowing focus on the agent experience. It integrates deeply with existing tooling rather than requiring workflow changes. It provides multiple access patterns for different user personas. It handles distributed coordination, session management, and parallel execution. And it includes verification mechanisms (visual testing, observability integration) that go beyond simple code generation.

However, the case study also reveals gaps typical of vendor-provided case studies. There's limited discussion of failure modes, cost management, quality assurance for agent-generated code, or the human oversight required to maintain the system. The timeline claims (prototype in days, production in months) may be accurate but likely gloss over significant engineering effort in integration, testing, and refinement.

The architectural patterns are nonetheless valuable for teams building similar systems. The use of sandboxed environments for isolation, filesystem snapshots for performance, distributed coordination primitives for scaling, and multi-modal access for adoption are all applicable beyond this specific use case. The emphasis on matching or exceeding local development performance as a prerequisite for adoption is an important insight that teams should internalize.

The case study also illustrates the importance of infrastructure choice in LLMOps. By building on Modal's primitives rather than managing their own infrastructure, Ramp could iterate quickly and scale without infrastructure rewrites. However, this also creates vendor lock-in and dependency on Modal's roadmap and pricing, trade-offs that aren't discussed but would be relevant for teams evaluating similar approaches.

## Critical Assessment

While the case study presents an impressive technical achievement, readers should maintain appropriate skepticism about some claims. The "half of all merged PRs" metric is striking but lacks context about code complexity, review overhead, or quality impacts. The rapid development timeline ("first version only took me a few days") is likely accurate for a minimal prototype but doesn't reflect the full engineering effort to reach production scale. The accessibility claims (product managers shipping features, designers implementing changes) are compelling but raise questions about code quality governance that aren't addressed.

The case study is ultimately marketing material for Modal, which means it emphasizes successes and architectural decisions that showcase Modal's infrastructure while downplaying challenges, costs, and limitations. The technical architecture described is credible and sophisticated, but teams considering similar implementations should expect to encounter significant additional complexity in areas like quality assurance, security, cost management, and organizational change management that aren't covered in depth here.

Despite these caveats, the case study provides valuable insights into production deployment of coding agents at scale, demonstrating patterns for environment management, integration with enterprise tooling, multi-user access, and performance optimization that are applicable across LLMOps implementations.
