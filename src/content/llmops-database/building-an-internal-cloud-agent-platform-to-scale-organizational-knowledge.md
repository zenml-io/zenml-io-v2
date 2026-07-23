---
title: "Building an Internal Cloud Agent Platform to Scale Organizational Knowledge"
slug: "building-an-internal-cloud-agent-platform-to-scale-organizational-knowledge"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "cost-optimization"
  - "harness-engineering"
  - "agent-based"
  - "system-prompts"
  - "kubernetes"
  - "redis"
  - "monitoring"
  - "cicd"
  - "docker"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "devops"
  - "scaling"
  - "security"
  - "documentation"
  - "openai"
  - "anthropic"
  - "meta"
industryTags: "tech"
company: "Sierra"
summary: "Sierra built Pinecone, an internal cloud-based agent platform, to capture and scale the accumulated wisdom of its workforce across all departments. The problem was that productivity improvements and better workflows typically remained siloed with individual employees or teams, with no practical way to capture and distribute them company-wide. Pinecone enables every employee to create, organize, and automate agents that live in the cloud, with features like durable sessions, multiplayer collaboration, automated PR management, reusable skills, and intent-based routing. The results have been transformative: in the last month, 600 employees created over 75,000 sessions, 96% of engineering now uses Pinecone, 70% of PRs were opened through Pinecone, usage tripled monthly since April while costs fell, and the platform fundamentally changed how the company works."
link: "https://sierra.ai/blog/pinecone-harnessing-the-wisdom-of-the-workforce"
year: 2026
seo:
  title: "Sierra: Building an Internal Cloud Agent Platform to Scale Organizational Knowledge - ZenML LLMOps Database"
  description: "Sierra built Pinecone, an internal cloud-based agent platform, to capture and scale the accumulated wisdom of its workforce across all departments. The problem was that productivity improvements and better workflows typically remained siloed with individual employees or teams, with no practical way to capture and distribute them company-wide. Pinecone enables every employee to create, organize, and automate agents that live in the cloud, with features like durable sessions, multiplayer collaboration, automated PR management, reusable skills, and intent-based routing. The results have been transformative: in the last month, 600 employees created over 75,000 sessions, 96% of engineering now uses Pinecone, 70% of PRs were opened through Pinecone, usage tripled monthly since April while costs fell, and the platform fundamentally changed how the company works."
  canonical: "https://www.zenml.io/llmops-database/building-an-internal-cloud-agent-platform-to-scale-organizational-knowledge"
  ogTitle: "Sierra: Building an Internal Cloud Agent Platform to Scale Organizational Knowledge - ZenML LLMOps Database"
  ogDescription: "Sierra built Pinecone, an internal cloud-based agent platform, to capture and scale the accumulated wisdom of its workforce across all departments. The problem was that productivity improvements and better workflows typically remained siloed with individual employees or teams, with no practical way to capture and distribute them company-wide. Pinecone enables every employee to create, organize, and automate agents that live in the cloud, with features like durable sessions, multiplayer collaboration, automated PR management, reusable skills, and intent-based routing. The results have been transformative: in the last month, 600 employees created over 75,000 sessions, 96% of engineering now uses Pinecone, 70% of PRs were opened through Pinecone, usage tripled monthly since April while costs fell, and the platform fundamentally changed how the company works."
notion:
  pageId: "3a6f8dff-2538-80da-91e7-f00667d3a2e8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T09:00:00.000Z"
  lastEditedTime: "2026-07-23T09:00:00.000Z"
  publishedAt: "2026-07-23T09:03:34Z"
---

## Overview

Sierra, a company that builds AI agent platforms for customer service, created Pinecone—an internal cloud-based agent platform designed to make every employee more effective while capturing and scaling organizational knowledge. The case study presents a comprehensive view of building and operating a production-scale LLM platform for internal use across an entire organization. Published in July 2026, this represents one of the more detailed public accounts of enterprise LLMOps infrastructure, though readers should note that this is a self-published case study from Sierra's blog and may present an optimistic view of the platform's capabilities and adoption.

The core insight driving Pinecone's development was that employees constantly discover better ways of working, but these improvements typically remain isolated because organizations lack practical mechanisms to capture and scale them. Sierra positioned Pinecone not just as a productivity tool but as an "operating system for the company" where every employee improvement makes the platform better, which in turn makes the company better. The platform handles everything from engineering tasks to HR, sales, product, design, and data science work through a single unified agent interface.

## Initial Context and Motivation

By January 2026, every Sierra engineer already had access to commercial tools like Codex, Claude Code, and Cursor on their laptops, and these were working well. The obvious decision would have been to simply embed these workflows more deeply and stop there. However, Sierra observed three critical limitations as usage increased: first, running agents on individual laptops wouldn't scale; second, people wanted to share more than just chat sessions (demos, prototypes, artifacts, entire workspaces); and third, valuable discoveries about debugging techniques, better prompts, reusable automations, and smarter workflows were "marooned on hundreds of laptops across the company" with no way to propagate them organizationally.

This observation led to the fundamental design decision that drove everything else: moving to a cloud-based agent platform that could be shared, observed, automated, and improved. The rationale was that sessions could become reusable, successful workflows could become "skills," and the best ideas, tools, and techniques could spread organically without depending on documentation, training, or Slack conversations. Most critically, the organization and Pinecone itself could learn from work happening across the company, not just from the individual doing it.

## Architecture and Core Components

Pinecone's architecture consists of three major components that handle different aspects of the LLMOps challenge:

The **app server** provides the product surface: the frontend, API, persistence, integrations, and the stream that sends agent output to every open tab. It records each turn, hands it to Agency, and subscribes to the runner's stream as it executes. This layer handles all the user-facing aspects and integrations with other tools.

**Agency** manages isolated, recoverable runner environments. It reconciles each runner into a Kubernetes pod, uses Redis Streams for live communication, and stores durable events and checkpoints separately for recovery. This middle layer handles the orchestration and lifecycle management of agent sessions, which is critical for reliability at scale.

The **runner** contains the agent and its environment. A Go process supervises Codex or Claude Code (the underlying agent harnesses from OpenAI and Anthropic), manages the development services, and brokers privileged operations. This design decision to wrap existing commercial harnesses rather than building proprietary agent logic from scratch represents a pragmatic approach to leveraging ongoing research and investment from frontier model providers.

## Session Model and Durability

The primary unit of work in Pinecone is a **session**. A session starts with a prompt describing the task (like "identify a UX performance degradation" or "fix this flaky test"), and Pinecone provisions an isolated pod with a checked-out repository, warm build cache, running sidecars, hot-reloading dev servers, and an appropriate harness. The entire setup reportedly takes about one second, which suggests significant engineering investment in environment provisioning and caching strategies.

The session then streams its work back to the user: text, tool calls, diffs, screenshots, files, and more. Users can watch, interrupt, redirect, or even close the tab—the session continues running in the cloud. This represents a significant shift from the typical local development model where closing your laptop stops all work.

One of the more sophisticated LLMOps challenges Pinecone addresses is **durable execution**. Sessions are designed to be durable even though the sandboxes they run in are not. Harnesses crash, pods fail, nodes go down—typical Kubernetes operational realities. Agency continuously records each session's state so a replacement runner can resume exactly where the previous one left off, enabling sessions that can last hours or even days without losing conversations or uncommitted work. This durability mechanism also enables branching: users can fork an entire session with their own authorization credentials and continue independently, facilitating experimentation and comparison of different approaches.

## Security and Privileged Operations

Pinecone implements a security model where the agent harness runs in an environment with limited access to the network and filesystem. When the harness needs to reach an inference provider, GitHub, or anything else requiring authentication, a network proxy intercepts the request, approves or rejects it, swaps in the appropriate credentials, and forwards the request. This means the agent never has direct access to real credentials—a critical security boundary for production LLM systems.

The approach follows the principle of "let the agent assume it can do everything, yet trust nothing," which is pragmatic for agentic environments where overly restrictive permissions might confuse the model but unrestricted access creates unacceptable security risks. The proxy-based credential brokering represents a middle ground that maintains security while providing a smooth experience for the agent.

## Multiplayer and Collaboration Features

Pinecone was designed to be "inherently shareable" from the ground up. When someone uses Pinecone to build a new feature, fix a bug, or overhaul part of the product, every part of the journey can be shared. The entire development and preview environment runs in the sandbox, and because the full application state lives in the cloud, multiple users can view and interact with the same session.

Coding sessions expose live development previews with shareable URLs. As feedback is incorporated during discussions, prototypes hot-reload in real time, and everyone in the discussion can see the changing application in their browser. Sierra has also built plugins that enable point-and-click interaction in previews, where users can describe exact UI changes they want and watch the agent implement them immediately. This represents a sophisticated approach to reducing the communication overhead between technical and non-technical stakeholders.

## Automated PR Management and CI Integration

One feature that emerged from observing actual usage patterns is **automated PR monitoring**. When a Pinecone session opens a pull request, it doesn't just hand off to humans—it watches its own checks, answers machine-review comments, automatically fixes failing tests, and only pings humans in Slack when a decision requires judgment. This addresses a common pain point where automated code review tools generate routine feedback that engineers must manually address. By having the agent monitor and respond to its own PRs, Sierra reduces the human interruption overhead while still maintaining human oversight for substantive decisions.

The system handles rebasing in case of merge conflicts and can run for extended periods managing the PR lifecycle. This represents a practical application of long-running agent workflows in production, though the case study doesn't detail how the system handles edge cases or what percentage of PRs require human intervention.

## Skills and Knowledge Capture

One of the more innovative LLMOps aspects of Pinecone is the **skills** system, which addresses the core problem of capturing and scaling organizational knowledge. Skills are reusable playbooks that can be private, shareable, or default-on for all users. They range from specific workflows like "prepare a customer meeting brief" to technical procedures like "stabilize this flaky CI job."

The value proposition is that one person creates a skill for a particular workflow, and every future user benefits automatically. This creates a mechanism for bottom-up knowledge sharing that doesn't depend on someone writing documentation, creating training materials, or broadcasting in Slack. The best practices literally become embedded in the platform that everyone uses daily.

The case study doesn't provide extensive detail on how skills are created, versioned, or improved over time, or how the system handles conflicts between different skills. It also doesn't address quality control—whether there's a review process for skills that become default-on for all users, or how the platform prevents low-quality or outdated skills from degrading the user experience.

## Multi-Agent Projects

For more complex problems, Pinecone supports **projects** where multiple sessions can be grouped together. These sessions coordinate through shared, searchable context, send each other messages, read each other's public sessions, and can generate new Pinecone sessions. This reflects the reality that significant work often starts with one simple question but naturally evolves into analysis, bug fixing, feature development, and post-deploy verification.

This multi-agent coordination represents a more advanced LLMOps pattern than simple single-agent workflows. The ability for agents to read each other's public sessions and coordinate through shared context suggests some level of inter-agent communication protocol, though the implementation details aren't provided. The case study also doesn't address potential challenges like circular dependencies, coordinating competing changes, or determining when to split work versus keep it in a single session.

## Intent-Based Routing and Model Selection

Rather than requiring users to select personas, toolsets, sandbox profiles, or data scopes from dropdowns, Pinecone implements **intent-based routing**. A classifier reads the prompt and selects the appropriate repository, environment, harness, model, and reasoning budget. This emerged from watching non-technical users struggle with infrastructure decisions they couldn't reasonably make, like whether a task needed 8 CPUs or 0.1 CPU.

The routing classifier represents a practical application of using smaller, faster models to orchestrate calls to larger, more expensive models—a common LLMOps pattern for cost optimization. The system also adapts mid-session: if a data analysis task about LLM spend discovers a bug in logging, the agent can naturally provision a coding environment to fix it. If a sales engineer preparing a demo identifies production discrepancies, the agent can open a pull request.

This flexibility mirrors how Sierra hires: looking for people who move between disciplines. The philosophy is that an agent should be at least as flexible as the people it works alongside. The case study mentions using patterns like "plan with Fable, execute with 5.6 Terra," which suggests model-specific routing strategies based on task characteristics, though these model names aren't explained (they may be internal codenames or future model releases).

## Automation and Proactive Work

Beyond interactive sessions, Pinecone supports **automations** that can observe Slack channels, Linear tickets, and other integrations. Automations can answer questions, fix bugs, open PRs, or proactively scan email, Slack, and other connections each morning to provide a list of action items. They can be triggered through webhooks or on schedules.

This represents a significant expansion beyond the typical "chat with an agent" paradigm into background automation that runs continuously. The case study mentions incident management workflows getting a "first-pass investigation before a human joins," which suggests Pinecone can participate in on-call rotations. However, the details of how these automations are configured, monitored, and prevented from taking undesired actions aren't provided.

## Integration and Platform Extensibility

Pinecone is described as a platform that's "pluggable with all other internal tools at Sierra." Internal systems can create Pinecone sessions programmatically, enabling integration with incident management workflows, code review assistance, internal Q&A bots, and more. This API-first approach allows Pinecone to become infrastructure rather than just an application.

The case study mentions integration points with GitHub, Linear, Slack, email, and browsers, with access "from your phone—anywhere you work." The breadth of integration suggests significant investment in building connectors and maintaining compatibility as these external services evolve.

## Leveraging Commercial Harnesses

A key strategic decision was to "stand on the shoulders of giants" by installing Codex and Claude Code in every sandbox, wrapped in an adapter that speaks a common protocol based on "AG-UI" (the case study doesn't define this acronym, but it's likely an internal abstraction layer). This provides several benefits: optionality for routing traffic between providers, employee choice over models and harnesses, and automatic improvement as the commercial harnesses improve.

This design decision reflects a pragmatic approach to LLMOps: rather than building proprietary agent logic that must compete with the massive R&D investments from OpenAI and Anthropic, Sierra focuses on infrastructure, security, integration, and organizational knowledge capture—areas where they have unique requirements and competitive advantage. The abstraction layer allows them to swap models and harnesses as the landscape evolves without rewriting core functionality.

## Cost Management and Optimization

Sierra deliberately chose not to publish a leaderboard of token usage, instead centralizing visibility and accountability for costs with a small team that manages it at scale. The philosophy is that employees should think about what they can do with AI, not their token usage. The centralized team eliminates waste, sets proper defaults, and builds efficiency features like model routing.

This approach reflects a mature understanding of organizational dynamics: individual cost awareness can lead to under-utilization and lost productivity, while centralized optimization can deliver better overall economics. The case study reports that usage has tripled every month since April yet costs have fallen, which suggests successful optimization strategies, though no specific numbers are provided. Potential techniques include model routing (using cheaper models for simpler tasks), caching, prompt optimization, and early stopping for unproductive sessions.

## Iteration and Learning from Usage

Several of Pinecone's features emerged directly from observing company usage rather than upfront design. Beyond the intent-based routing and PR monitoring examples mentioned earlier, the case study emphasizes building "primitives, not workflows." Early on, Sierra found that specific workflows didn't last long: models got too smart, workflows had to be rewritten, and people had to be retrained.

Instead, they focused on opinionated primitives: better context, environments, and company-specific tools. These proved far more durable and let people compose their own workflows as models improved. This represents an important LLMOps lesson: in a rapidly evolving foundation model landscape, building too much specificity into workflows creates technical debt, while focusing on robust primitives provides flexibility.

The strategy of meeting people where they already were—ChatGPT and Claude interfaces, Linear, GitHub—rather than designing grand new workflows helped scale adoption much more quickly and unlocked more creativity across the company.

## Adoption and Impact

The case study reports impressive adoption numbers: in the last month before publication (June 2026), 600 people created more than 75,000 sessions, with usage accelerating week-over-week. The majority of the company now works in Pinecone daily, with 96% of engineering using the platform. In the last month, 70% of PRs were opened through Pinecone.

These numbers suggest Pinecone has become core infrastructure rather than an optional tool. The shift is described as fundamental: engineers "describe outcomes and review apps instead of writing every line of code," incidents receive first-pass investigation before human involvement, and account teams receive morning digests to prepare for their day.

The platform team notably uses Pinecone to build Pinecone itself, creating a tight feedback loop where improvements are immediately experienced by the harshest power users (the builders) and then by the entire company. This dogfooding approach is mentioned as intentional and beneficial.

## Broader Strategic Implications

Sierra positions Pinecone within a broader thesis about competitive moats in the age of frontier models. As these models become available to every business, Sierra argues that what will remain unique is a company's context—particularly the accumulated knowledge, judgment, and experience of their workforce. Companies that can best capture, share, and compound that wisdom will build the deepest moats.

This framing connects Pinecone to Sierra's customer-facing products. The case study mentions that building Pinecone's infrastructure had "the added benefit that we could leverage the same infrastructure for Ghostwriter—our customer facing agent for building agents." As Sierra employees use Pinecone and improve its reliability, performance, and quality, those wins get shared with Ghostwriter, Sierra's commercial product.

## Critical Assessment

While the case study provides extensive detail about Pinecone's architecture and capabilities, readers should note several caveats. This is a self-published blog post from Sierra's marketing site, likely serving both to share technical insights and to build credibility for Sierra's commercial agent platform products. The adoption numbers are impressive but lack important context: what percentage of the company are the 600 users? How do usage patterns differ across departments? What percentage of the 75,000 sessions were successful versus abandoned?

The case study presents mostly positive outcomes and learnings without discussing significant failures, abandoned approaches, or ongoing challenges. For instance, it doesn't address: how the platform handles agent errors that affect production systems, what percentage of sessions require human intervention, how skill quality is maintained, how costs compare to previous workflows, or what types of tasks Pinecone handles poorly.

The reported cost decreases despite tripling usage are presented without numbers, making it impossible to assess the magnitude or sustainability of these improvements. Similarly, the claim that "70% of PRs were opened through Pinecone" is striking but lacks context about PR quality, review time, or merge rates compared to human-authored PRs.

The technical architecture descriptions are high-level, omitting implementation details that would be valuable for others building similar systems: how prompts are structured, how the classifier for intent-based routing is trained and evaluated, how session state is checkpointed for durability, or how the platform handles version mismatches between skills and the current codebase.

That said, the case study provides a valuable window into one company's approach to production LLMOps at organizational scale, with enough architectural detail to inform others building similar systems while remaining accessible to non-technical audiences.
