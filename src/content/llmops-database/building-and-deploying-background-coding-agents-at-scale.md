---
title: "Building and Deploying Background Coding Agents at Scale"
slug: "building-and-deploying-background-coding-agents-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "poc"
  - "realtime-application"
  - "agent-based"
  - "prompt-engineering"
  - "memory"
  - "harness-engineering"
  - "human-in-the-loop"
  - "evals"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "multi-agent-systems"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "microservices"
  - "cicd"
  - "orchestration"
  - "devops"
  - "security"
  - "guardrails"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "anthropic"
  - "openai"
  - "meta"
  - "databricks"
  - "cloudflare"
industryTags: "tech"
company: "Cognition"
summary: "Cognition, the company behind Devon, discusses their journey building production-ready autonomous coding agents that operate in cloud environments. The conversation with Walden Yan (Co-founder, CPO at Cognition) and Cole Murray (creator of Open Inspect) explores the architectural decisions, infrastructure challenges, and production considerations for deploying AI agents that can autonomously write, test, and merge code. They discuss the shift from local IDE-based AI assistants to background agents that work autonomously in cloud environments, the technical infrastructure required to support this paradigm (including VM management, sandbox security, and state management), and real-world use cases like automated incident response, customer support triage, and continuous security scanning. The discussion covers how Devon now contributes 80% of commits on Cognition's repositories (up from 16% in January), representing a fundamental shift in how engineering teams work with AI."
link: "https://www.youtube.com/watch?v=0fgJPhYcbVk"
year: 2026
seo:
  title: "Cognition: Building and Deploying Background Coding Agents at Scale - ZenML LLMOps Database"
  description: "Cognition, the company behind Devon, discusses their journey building production-ready autonomous coding agents that operate in cloud environments. The conversation with Walden Yan (Co-founder, CPO at Cognition) and Cole Murray (creator of Open Inspect) explores the architectural decisions, infrastructure challenges, and production considerations for deploying AI agents that can autonomously write, test, and merge code. They discuss the shift from local IDE-based AI assistants to background agents that work autonomously in cloud environments, the technical infrastructure required to support this paradigm (including VM management, sandbox security, and state management), and real-world use cases like automated incident response, customer support triage, and continuous security scanning. The discussion covers how Devon now contributes 80% of commits on Cognition's repositories (up from 16% in January), representing a fundamental shift in how engineering teams work with AI."
  canonical: "https://www.zenml.io/llmops-database/building-and-deploying-background-coding-agents-at-scale"
  ogTitle: "Cognition: Building and Deploying Background Coding Agents at Scale - ZenML LLMOps Database"
  ogDescription: "Cognition, the company behind Devon, discusses their journey building production-ready autonomous coding agents that operate in cloud environments. The conversation with Walden Yan (Co-founder, CPO at Cognition) and Cole Murray (creator of Open Inspect) explores the architectural decisions, infrastructure challenges, and production considerations for deploying AI agents that can autonomously write, test, and merge code. They discuss the shift from local IDE-based AI assistants to background agents that work autonomously in cloud environments, the technical infrastructure required to support this paradigm (including VM management, sandbox security, and state management), and real-world use cases like automated incident response, customer support triage, and continuous security scanning. The discussion covers how Devon now contributes 80% of commits on Cognition's repositories (up from 16% in January), representing a fundamental shift in how engineering teams work with AI."
notion:
  pageId: "377f8dff-2538-80ff-b336-cdf3845509e1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-06T05:30:00.000Z"
  lastEditedTime: "2026-06-06T05:30:00.000Z"
  publishedAt: "2026-06-06T05:39:16Z"
---

## Overview

This case study provides an in-depth look at Cognition's approach to building and deploying Devon, a production-grade autonomous coding agent, alongside insights from Cole Murray's work on Open Inspect, an open-source alternative for background agent systems. The discussion centers on the architectural, infrastructure, and operational considerations required to run AI coding agents at scale in production environments.

The conversation highlights a pivotal shift that occurred around December 2025, when frontier models like Opus 4.5 and GPT 5.2 reached a capability threshold that enabled true autonomous operation. Prior to this, models required significant handholding. After this threshold, agents could move from specification to completed pull request with minimal human intervention, opening up the paradigm of background agents that work independently in cloud environments rather than requiring constant oversight in local IDEs.

A particularly striking metric shared is that Devon's contribution to Cognition's own repositories grew from 16% of commits in January 2026 to 80% in March 2026, with only a 10% increase in engineering headcount during the same period. This represents a fundamental transformation in how the engineering organization operates, with AI agents becoming the primary code contributors.

## Architectural Decisions: Agent Harness Placement

One of the core architectural decisions discussed is whether to run the agent "in the box" or "out of the box" - that is, whether the AI agent itself runs inside the sandbox environment alongside the code it's working on, or whether it runs in a separate control plane that orchestrates actions within the sandbox.

Running the agent **in the box** means all state is localized and simpler to manage, as everything the agent needs lives in one place. However, this approach presents significant security concerns because all secrets and credentials must also reside in that environment, creating exfiltration risks given the unpredictable nature of AI systems.

Running the agent **out of the box** - Cognition's chosen architecture - involves greater complexity with state management across systems, but provides critical security boundaries. The agent's "brain" runs in a separate control plane and makes tool calls into the sandbox environment, which acts as the "hands." This separation means secrets can be scoped specifically to what's needed in the sandbox, with the most sensitive components of the system (the agent orchestration layer) remaining isolated from the execution environment. This also allows reuse of existing developer infrastructure without modification, as the sandbox can be any standard development environment without needing to accommodate the agent runtime itself.

Anthropic's managed agents and OpenAI's Codex both follow variations of this out-of-the-box pattern, though the implementation details vary. The consensus among practitioners is that despite the added complexity, the security and operational benefits make this the superior architecture for production systems.

## Infrastructure Challenges and Solutions

The infrastructure layer for background coding agents presents numerous technical challenges that aren't immediately obvious when building simpler agent prototypes. Cognition had to solve these problems years before the ecosystem matured, building custom solutions that are now becoming table stakes for production agent deployments.

### VM Management and State Persistence

A fundamental challenge is making virtual machines boot up and shut down quickly while preserving state. Early versions of Devon using raw EC2 instances experienced 10-minute cold start times when bringing machines back up after they'd been shut down, which is unacceptable for interactive use cases. The team developed a custom block-diff file storage format that incrementally builds on top of previous states, so that saving and restoring a VM only requires work proportional to the actual changes made, not the entire disk size. This optimization dramatically reduced boot times and made the experience of background agents practical.

### File System Performance

A subtle but critical issue discovered was that many virtual machines use network file systems backed by S3 rather than true local filesystems. This meant that simple operations like grep were making network calls for every file access, causing severe performance degradation. The team had to swap out the network file system with alternatives optimized for local access patterns. This kind of deep infrastructure knowledge - knowing to investigate the filesystem implementation rather than just trying to build a custom faster grep - proved essential. Multiple teams building their own agents ran into this same issue and attempted to solve it by building custom GPU indexes, when the root cause was actually the filesystem layer.

### Nested Virtualization and Platform Support

Supporting different development platforms presents additional complexity. Cognition runs VMs using Firecracker instances, but supporting Android development required nested virtualization to run Android emulators inside these VMs, which introduces performance issues that required careful tuning. Supporting macOS and Windows specific environments adds further complexity, as different VM service offerings have varying capabilities. These considerations become important as teams build applications that target specific platforms.

### Docker Versus VM Trade-offs

Many teams initially consider using Docker containers as the abstraction layer for their agents, as they're lighter weight and more familiar. However, Docker containers aren't true security boundaries, and more importantly, many real applications use Docker themselves, creating a problematic Docker-in-Docker situation. Full VMs proved necessary to handle the full range of real-world development scenarios, especially once agents needed to actually run applications, interact with them visually via computer use, and send back screen recordings of their testing.

## Repository Setup and Developer Environment Management

One of the most underestimated challenges in production agent deployment is repository setup - ensuring that the agent's working environment stays synchronized with changing dependencies, has the right credentials, and can actually build and run applications. Cognition calls this the "repo setup" problem, and it's been a persistent challenge since the company's founding.

Many engineering organizations lack robust developer environment setup processes. The informal approach of "go talk to Bob to get the secrets" doesn't translate to automated agent workflows. Teams deploying background agents often need to formalize their setup procedures, typically using Docker Compose or similar orchestration tools to define reproducible environments.

Open Inspect provides hooks for running setup scripts that pre-install dependencies and can snapshot pre-configured environments for instant startup. It also supports restoration hooks to bring microservices back to running state when a session resumes. The key insight is that if the local developer experience is well-defined and reproducible, the agent environment naturally becomes easier to set up as well.

An important best practice that emerged is that code bases should be architected so agents can do full end-to-end testing locally without requiring access to production credentials or live services. This means having local database setups, Docker Compose configurations for dependent services, and the ability to run the full stack locally. Legacy codebases that predate Docker and weren't built with this paradigm in mind face significant migration challenges when adopting agent workflows.

## Testing Beyond Computer Use

The discussion draws an important distinction between "computer use" (the ability to click coordinates on a screen) and true "testing" as a problem-solving challenge. While computer use capabilities have improved dramatically with recent vision models, the harder problem is the reasoning and orchestration required to actually test changes.

For a change that spans frontend and backend, or involves deeply nested services, the agent must reason through how to run applications with the right versions, how to orchestrate multiple services together, how to trigger specific features (which might require admin privileges, feature flags, specific user states, or complex multi-session scenarios), and how to verify the behavior. This requires deep codebase context and sophisticated orchestration that no single frontier model can handle end-to-end in all cases. Cognition has found they sometimes need to orchestrate multiple different frontier models together to solve the full testing problem.

The testing workflow in Devon results in annotated screen recordings that show what's being tested at each step, with labeled actions that make it clear to reviewers what behavior is being validated. This presentation proved critical for building trust - engineers reported they often don't need to review the actual code changes because the testing video provides sufficient confidence to merge directly from Slack without visiting GitHub.

## Integration and GitHub Experience

Making the agent experience feel natural within existing developer workflows required substantial polish that goes beyond core agent capabilities. Cognition invested heavily in making Devon work seamlessly on GitHub, allowing engineers to comment on PRs and have Devon respond to those comments directly, updating the code accordingly.

This creates a complex interaction space: Devon Review (the code review agent) posts comments on Devon's PRs, which Devon then needs to address without infinite looping. The system must distinguish between comments that require action versus comments where pushing back is appropriate (Devon sometimes tells reviewers "you're wrong" when it has good reason). This behavior represents a maturity in agent communication that makes multi-agent collaboration more feasible than it was a year ago.

The team found that getting these GitHub interactions right made a significant difference in how quickly code actually gets merged. Small details like making sure engineers can interact with Devon entirely from Slack without needing to visit GitHub for simple merge confirmations became important for adoption.

## Memory and Knowledge Management

Memory systems for production agents remain an unsolved problem despite their critical importance. Cognition's approach evolved through several iterations. Their current "Knowledge" system focuses on automatically capturing learnings over time rather than requiring users to proactively document things. When a user corrects Devon's approach, Devon asks if they want to remember this for the future. About 95% of memories are generated through these automatic captures rather than explicit documentation.

The key challenges are memory generation (ensuring memories capture generalizable patterns rather than one-off preferences) and memory retrieval (ensuring thousands of memories don't create noise while still surfacing relevant context). Both require careful evaluation as new models are deployed to ensure reliability.

An insight that emerged is that modern agents have become very good at navigating anything that resembles a file system. This has led to experimentation with rebuilding the memory system to feel more like a file system that agents can naturally explore. There's also consideration of skills-based approaches and integration with tools that maintain structured memory like OpenClaw's daily memory journals.

For specialized persistent agents (like a Devon that acts as a permanent PM for specific product areas), the approach shifts to having a memory document (like memory.md) that the agent maintains for itself, tracking priorities, ownership, and context. This enables use cases where agents run continuously rather than being invoked for discrete tasks.

## Use Cases in Production

The primary use cases for background agents in production span several categories:

**Incident Response and Site Reliability**: The most common use case is automated first response to production alerts from systems like Sentry, DataDog, or PagerDuty. The agent doesn't necessarily resolve every issue autonomously, but it triages by collecting context from production logs, databases, and historical playbooks before human engineers get involved. The goal is to have a full trajectory of diagnosis and often a PR ready by the time an engineer looks at the alert. Open Inspect supports triggering from Sentry and generic webhooks to enable this workflow.

**Customer Support Escalation**: When customers report issues, support teams can tag agents in Slack to investigate, providing engineering with full context about the issue without the back-and-forth of gathering more information from customers. This dramatically shortens the loop from bug report to diagnosis.

**Non-Engineer Code Contribution**: Product managers and marketing teams are increasingly prompting agents directly through Slack for quick bug fixes rather than creating tickets. This represents a shift in who contributes code within organizations, with agents democratizing the ability to make simple changes.

**Continuous Security Scanning**: Organizations use background agents for ongoing security review and scanning, continuously analyzing code for vulnerabilities and compliance issues.

The economic framework discussed suggests budgets of $1,000 to $5,000 per engineer per month are common, though some teams with high leverage use cases spend significantly more. The calculation depends on the value delivered - how many issues get triaged, how much faster customer problems get resolved, and how much non-engineering staff can accomplish without engineering bottlenecks.

## Model Selection and Smart Routing

The discussion touches on an important trend for 2026: hybrid frontier and sub-frontier systems. As frontier models become very expensive and very capable, there's increasing interest in using faster, cheaper sub-frontier models for routine work while routing to frontier models only when necessary. Cognition pioneered "Smart Friend" (a play on Anthropic's model naming), which mixes models to optimize the latency-cost-quality tradeoff.

This approach becomes critical as organizations scale their agent usage, as unlimited frontier model usage would be prohibitively expensive. The key is identifying which parts of workflows can be handled by sub-frontier models (which are increasingly "good enough" for many tasks) and reserving expensive frontier calls for the most complex reasoning.

## Agent Code Quality and Linting

An important operational consideration is that AI-generated code exhibits distinctive patterns that can degrade codebase quality. Common issues include:

- Excessive defensive programming: Models use patterns like hasattr() and getattr() in Python even when attributes are known to exist, as a form of "reward hacking" to avoid errors
- Overzealous backwards compatibility: GPT models particularly tend to create complex import/export structures to avoid modifying module names
- Untyped data structures: Models default to permissive types like Dict[str, Any] and untyped tuples
- Verbose commenting: Opus 4.7 writes paragraph-long PRD-style comments on every function explaining reasoning and alternatives

Organizations address these patterns through linting rules that enforce standards (like failing PRs that use getattr unnecessarily) and through Semgrep rules to catch problematic patterns. The key insight is that "your codebase regresses to your worst engineer" when that engineer uses AI extensively without auditing output, as their patterns become examples that future AI contributions follow.

## Code Review and Merge Hygiene

There's active debate about whether engineers should continue reviewing AI-generated code or can move to a "don't look at code" paradigm. The Cognition team found that completely hands-off vibe coding on a codebase with auto-merge and no code review lasted about two weeks before quality degradation became problematic. Issues like the same button being implemented 10 different ways in slightly different colors emerge when there's no oversight.

The recommended approach is strict boundaries between modules with clear contracts that require human approval to modify, while allowing agents flexibility within bounded subsystems. Regular "garbage collection" to consolidate duplicated helpers and patterns helps prevent sprawl. Some duplication is acceptable, but needs periodic cleanup.

Scheduled cleanup sessions - whether by humans or systems designed to identify duplication - help maintain codebase health. The testing capabilities where agents actually run and validate changes provide another quality gate beyond just code review.

## Infrastructure as Product

A theme throughout the discussion is that selling AI agents requires selling both the agent and the infrastructure. Cognition doesn't just provide Devon's intelligence; they provide the complete compute infrastructure, VM management, security boundaries, and deployment support including VPC, on-premises, and FedRAMP-compliant government cloud deployments. This end-to-end ownership allows them to optimize the full stack and deploy in any customer environment without depending on third-party infrastructure providers to support every deployment model.

For Open Inspect, the open-source model allows organizations to fork and customize for their specific needs, treating it as critical infrastructure they want to control. Cole Murray deliberately chose not to monetize it as a $20/seat SaaS product because he sees it as infrastructure that companies will want to own and customize, with value captured at other layers (sandbox providers like Modal, Daytona, E2B, and the model layer itself).

## Transition from Local to Background Agents

Windsurf 2.0 represents Cognition's vision for seamless transitions between local and background agent work. The idea is that sometimes work needs to be pulled local for hands-on testing or debugging, while other times it should run in the background. The challenge is that local and background agents have different ideal behaviors - local agents should be faster and let users make calls, while background agents should be exhaustive and autonomous. Cognition shares as much logic as possible between these modes while using different prompts to guide behavior appropriately for each context.

The goal is a unified command center where engineers can see all their agents (background and local), pull work down when hands-on attention is needed, approve and dispatch background work, and never need to leave the development environment. This represents the next evolution beyond just having an AI coding assistant to having a fleet of agents that require management and orchestration.

## Evaluation and Reliability

While not extensively detailed in the discussion, there are references to the extensive evaluation work required to keep systems reliable as models change. Memory retrieval and generation both require evals to ensure new models maintain quality. Testing capabilities require evals to validate that agents correctly identify what to test and how. The relatively quick iteration cycles of models mean that teams must continuously validate that new versions don't regress critical behaviors.

The discussion also touches on the long tail of small details that matter for end-to-end metrics like merge velocity - everything from how comments are displayed on GitHub to how annotations appear on test videos contributes to user confidence and willingness to merge AI-generated code quickly.

## Future Directions

The conversation points to several emerging areas:

- Multi-agent systems are becoming more practical as models develop the ability to push back and have real disagreements based on different information, rather than just being yes-men. However, the practical architecture remains manager-worker hierarchies rather than swarms
- Agents spawning sub-agents for parallel work is an active area of exploration, though it requires careful design to avoid chaos and merge conflicts
- The shift toward JavaScript for greenfield applications (versus Python's dominance in ML tooling) creates friction with Python-native infrastructure like Modal
- Git itself may eventually be replaced with systems better suited to agent workflows, though this remains speculative
- Context engineering is emerging as a more thoughtful framing than prompt engineering for how to build robust agent systems

The overall picture is of a maturing ecosystem where the fundamental shift from IDE-based assistants to autonomous background agents is well underway, with Cognition's 80% agent contribution rate serving as proof that this model works at scale, but with substantial infrastructure, security, and operational challenges that must be addressed to make it production-ready for enterprise deployment.
