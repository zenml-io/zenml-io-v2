---
title: "Harness Engineering: Building Software Where Humans Steer and Agents Execute"
slug: "harness-engineering-building-software-where-humans-steer-and-agents-execute"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "evals"
  - "latency-optimization"
  - "cost-optimization"
  - "cicd"
  - "documentation"
  - "guardrails"
  - "fastapi"
  - "postgresql"
  - "elasticsearch"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "devops"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "open-source"
  - "security"
  - "reliability"
  - "scalability"
  - "openai"
  - "harness-engineering"
industryTags: "tech"
company: "OpenAI"
summary: "Ryan Leopo, a member of technical staff at OpenAI, describes his team's approach to building software exclusively with AI coding agents over a nine-month period, where human engineers were banned from directly editing code. The problem was how to productively deploy abundant AI coding capacity while shifting engineering roles toward systems thinking, delegation, and defining what constitutes good code. Their solution involved creating a comprehensive harness engineering approach with skills, documentation, automated review agents, linting, and testing frameworks that provide just-in-time context to agents, enabling them to write, test, and deploy production code autonomously. The results included dramatically increased velocity with 3-5 PRs per engineer per day, reduced merge conflicts, automated code reviews, and the ability to complete large-scale migrations and maintain high code quality standards while human engineers focused on higher-leverage activities like architecture, delegation, and defining system requirements."
link: "https://www.youtube.com/watch?v=am_oeAoUhew"
year: 2025
seo:
  title: "OpenAI: Harness Engineering: Building Software Where Humans Steer and Agents Execute - ZenML LLMOps Database"
  description: "Ryan Leopo, a member of technical staff at OpenAI, describes his team's approach to building software exclusively with AI coding agents over a nine-month period, where human engineers were banned from directly editing code. The problem was how to productively deploy abundant AI coding capacity while shifting engineering roles toward systems thinking, delegation, and defining what constitutes good code. Their solution involved creating a comprehensive harness engineering approach with skills, documentation, automated review agents, linting, and testing frameworks that provide just-in-time context to agents, enabling them to write, test, and deploy production code autonomously. The results included dramatically increased velocity with 3-5 PRs per engineer per day, reduced merge conflicts, automated code reviews, and the ability to complete large-scale migrations and maintain high code quality standards while human engineers focused on higher-leverage activities like architecture, delegation, and defining system requirements."
  canonical: "https://www.zenml.io/llmops-database/harness-engineering-building-software-where-humans-steer-and-agents-execute"
  ogTitle: "OpenAI: Harness Engineering: Building Software Where Humans Steer and Agents Execute - ZenML LLMOps Database"
  ogDescription: "Ryan Leopo, a member of technical staff at OpenAI, describes his team's approach to building software exclusively with AI coding agents over a nine-month period, where human engineers were banned from directly editing code. The problem was how to productively deploy abundant AI coding capacity while shifting engineering roles toward systems thinking, delegation, and defining what constitutes good code. Their solution involved creating a comprehensive harness engineering approach with skills, documentation, automated review agents, linting, and testing frameworks that provide just-in-time context to agents, enabling them to write, test, and deploy production code autonomously. The results included dramatically increased velocity with 3-5 PRs per engineer per day, reduced merge conflicts, automated code reviews, and the ability to complete large-scale migrations and maintain high code quality standards while human engineers focused on higher-leverage activities like architecture, delegation, and defining system requirements."
notion:
  pageId: "345f8dff-2538-8001-bce0-ff0380f62692"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-17T10:32:00.000Z"
  lastEditedTime: "2026-04-17T10:32:00.000Z"
  publishedAt: "2026-04-20T06:51:58Z"
---

## Overview

Ryan Leopo from OpenAI presents a radical approach to software engineering where a team spent nine months building software exclusively through AI coding agents, with team members banned from directly touching their code editors. The core thesis is that with sufficiently capable models like GPT-5.2 released in late 2025, implementation is no longer the scarce resource in software engineering. Instead, the scarce resources are human time, human and model attention, and model context windows. This case study provides deep insights into how to operationalize LLMs in production software development workflows through what Leopo calls "harness engineering."

## Philosophical Foundation and Context

The fundamental shift described in this case study is that "code is free" - meaning AI agents can now produce virtually unlimited amounts of code given sufficient GPU capacity and token budgets. Leopo claims to be a "token billionaire," spending over a billion output tokens per day (approximately $1,000+ in costs). The key inflection point occurred in late 2025 with the release of GPT-5.2, which Leopo describes as capable of doing "the full job of a software engineer" and being "isomorphic" to human engineers in terms of ability to produce high-quality code in real codebases.

This abundance of coding capacity means that traditional prioritization (P0s vs P2s vs P3s) changes fundamentally. Previously unaddressable P3 tasks can now be kicked off immediately, sometimes with 4x parallelization, with the best solution being selected. The vision is that every engineer becomes a staff engineer with as many team members as they can drive concurrently and have tokens to support.

## Technical Architecture and Workflow

The team's workflow starts with tickets representing chunks of work. These tickets are given to agents along with skills that enable manipulation of their applications. Critically, the entry point to development is Codex (the coding agent), not a development environment built around it. This represents an "outside-in" approach where Codex is treated as the primary interface.

The agents are equipped with skills that teach them how to launch applications, spin up local observability stacks for logging and telemetry, boot up Chrome DevTools, and attach to applications with local CLI tools via daemons. The entire repository and local development tools are structured for Codex to invoke them first, rather than creating a shell environment where the app and Codex get spawned into.

## Harness Engineering Principles

The core of harness engineering is providing models with the right text (instructions, context, requirements) at the right time. The fundamental insight is that models are trained to follow instructions, so harnesses should surface instructions to models at appropriate moments rather than front-loading all context. This respects the scarcity of context windows while ensuring critical requirements are surfaced when needed.

For example, requirements about React component decomposition for snapshot testing don't need to be loaded upfront. Instead, agents can prototype and experiment with UI, and then at lint or test time receive instructions to break components apart into smaller, more stateless pieces with local hook dependencies rather than prop drilling. This just-in-time context delivery allows agents to first understand what they're trying to accomplish and then refine their approach based on specific constraints.

## Skills and Context Management

Initially, the team experimented with creating thousands of skills but ultimately consolidated to 5-10 core skills. This decision was driven by the recognition that infrastructure and local developer tools change frequently, and maintaining hundreds of skills would create excessive overhead. By centralizing leverage around fewer, better-maintained skills, complexity is hidden beneath the interface that humans invoke while agents figure out the details.

This approach proved resilient to infrastructure changes. Leopo describes not knowing for three weeks that the team had moved from using Chrome DevTools Protocol directly to using a daemon-based approach, because Codex successfully adapted using available documentation without requiring human intervention or skill updates.

The team deliberately structures their codebase to optimize for agent success and minimize human tracking of high-churn areas. They avoid going wide on skills, preferring to make existing skills better, because the rapid infrastructure changes make it difficult for humans to maintain awareness of all the details.

## Prompt Injection Mechanisms

A critical insight is that nearly every aspect of the development toolchain becomes a mechanism for prompt injection. The presentation identifies multiple prompt injection points:

- Direct prompts to the model
- Powers (advanced capabilities)
- Prompts rules files
- Skills
- Lint error messages
- Review agent comments on PRs that must be addressed before merge
- Agent SDKs embedded in tests
- Documentation and ADRs (Architecture Decision Records)

Lint error messages in particular become sophisticated prompt delivery mechanisms. Rather than simply stating that there's an unknown type or an await in a loop, error messages provide remediation steps and context about coding standards. For example, a lint failure might explain that unknowns shouldn't exist at a particular location because the team follows a "parse, don't validate" philosophy at edges, and that types can be derived from Zod schemas.

The team even meta-prompts by using agents to write prompts. Leopo describes pointing Codex at OpenAI's prompting cookbooks and asking it to synthesize a skill for writing prompts, then using that agent-generated skill to write prompts for local code improvements.

## Code Review and Quality Assurance

One of the most sophisticated aspects of the system is the automated code review pipeline. The team identified that with 3-5 PRs per engineer per day, human code review became the primary bottleneck causing merge conflicts due to long-open PRs. To address this, they instituted "garbage collection day" every Friday, where the entire team's job was to identify slop observed during the week and categorically eliminate it through harness improvements.

Review agents are organized by persona (front-end architect, reliability engineer, scalability expert, etc.) and triggered on every push. These agents evaluate whether code is acceptable based on documentation describing what good looks like for their particular concern, surfacing P2 or higher issues that would block merging.

The team uses a combination of:

- Custom ESLint rules wired into every PNPM package in their workspace
- Higher-level wholesome tests asserting code structure (not just syntax or behavior)
- Package privacy and dependency edge enforcement between stack layers
- Deduplication checks for things like Zod schemas
- Verification that shared utilities are used rather than local reimplementations

A specific example: the team observed that agents sometimes optimize for local package coherence rather than using shared utilities, so they built pseudo-linter source code verification tools to catch this behavior automatically, preventing humans from getting distracted by it in reviews.

## Testing and Reliability

Security and reliability review agents run continuously as part of every push and CI. These agents check for specific non-functional requirements. A concrete example is network code: the team created lints that verify every fetch call has appropriate retries and timeouts, since this is a common source of production outages that humans inconsistently remember to implement.

The philosophy is that humans are unreliable reviewers and authors for many non-functional requirements, so encoding these requirements in automated checks that run on every change creates durable solutions. Because code is free (agents can refactor anything), the team can completely migrate the entire codebase to solve problems durably rather than accepting inconsistent adherence to best practices.

Tests themselves become context delivery mechanisms through agent SDKs embedded in test code that review the codebase for acceptability. The team also writes tests about source code structure, such as limiting files to 350 lines to ensure context efficiency and maximize model capability utilization.

## Documentation and Knowledge Capture

Documentation serves multiple purposes in this system. The team maintains persona-oriented documentation describing what a good job looks like for different engineering concerns. When a product-minded engineer documented how to write good QA plans, this required documenting all features, critical user journeys, and how users engage with applications, web apps, APIs, and services.

With expectations that all user-facing work includes a QA plan, review agents can assert requirements around proving features work effectively. QA plans indicate what media should be attached to PRs for humans and agents to verify work quality. This creates a virtuous cycle: better documentation leads to better agent output, which builds trust and allows more delegation, which removes humans from the loop and enables more work to be delegated to agents.

The documentation approach emphasizes breadcrumbs, ADRs, persona-oriented guidance, and historical logs of tickets and code reviews. These artifacts represent the process that got the team to their current code and products, and they're essential for agents to follow similar processes.

## Repository Architecture

To support agent effectiveness at scale, the team structured their repository to facilitate progressive disclosure as the codebase grows. Starting from a blank repository with a single package Create Electron app, they evolved to a heavily architected structure with 750 packages in a PNPM workspace.

Packages are isolated by business logic domain or layer of the stack, with individual small utility packages encapsulating reusable functionality that's linted to ensure usage. The architecture mirrors what might be expected in a 10,000-engineer organization, even for a small team, because it helps agents scope work to appropriate directory subtrees.

The philosophy is that code in the file system is text, which means it's effectively prompts given to coding agents. Making code as uniform as possible across the repository creates transferable context regardless of where agents are working. The team enforces:

- One way to implement bounded concurrency helpers
- One way to construct observable, instrumented side-effectful commands
- One ORM
- One programming language
- One way of writing CI scripts
- One way of adding additional lint rules

This uniformity makes tokens the model needs to produce easier to predict and more consistently predicted. Large-scale refactoring to achieve uniformity is free with agent-driven development, so migrations that would traditionally hang open for months can be completed by firing off 15 agents to drive work to completion.

## Context Window Optimization

The team explicitly designs for limited context windows. With autocompletion improvements in GPT-5.4 and subsequent models, Leopo reports essentially never having to write slash-new commands anymore. However, this creates the challenge that context gets paged out over time.

To address this, the system continually refreshes context as agents work through tasks. Review agents look at code along the way through the lens of success criteria. File size limits (350 lines) ensure code remains digestible within context windows. Documentation and requirement specifications are surfaced just-in-time rather than all upfront.

The team structures their harness to defer or just-in-time surface instructions, recognizing that overwhelming agents with upfront context reduces effectiveness. Instead, agents are allowed to prototype and experiment, then receive targeted feedback through lints, test failures, and review comments that prompt refinement.

## Token Budget Distribution

Leopo estimates his billion-plus daily output tokens split roughly evenly (about one-third each) between:

- Planning, ticket curation, and documentation
- Implementation
- CI/CD processes including automated reviews and tests

Notably, the team does not heavily use plan mode, preferring to drop tickets in and have agents execute without diverting through explicit planning. Leopo's reasoning is that if plans aren't carefully reviewed, approving them encodes potentially bad instructions. If teams do use plans, he recommends pushing them as single PRs with just the plan, requiring human review of every line and blocking on human approval before merge and execution.

## Cost Considerations and Resource Optimization

For teams with limited token budgets (like those on $200/month pro plans), Leopo recommends focusing on maximizing cache hits and being strategic about context usage. However, his broader recommendation is to start by using coding agents to improve confidence in existing code through comprehensive testing, since agents excel at examining code with usage context and writing tests that assert correct behavior.

The other approach is analyzing where human time is spent (staring at editors writing code, waiting for tests, waiting for reviews, dealing with slow or flaky CI) and using agents to incrementally automate the parts consuming the most time. This aligns with the high-leverage aspects of engineering: defining work, prioritizing and scheduling it, and effectively empowering team members to execute.

## Challenges and Failure Modes

The team encountered several challenges during their journey. Merge conflicts were initially severe with 3-5 PRs per engineer per day and engineers working on the same codebase areas. Solutions included:

- Restructuring code to minimize conflicts
- Reducing PR open time through automated reviews
- Removing humans as review bottlenecks

The team also had to develop capability in areas that started from zero as they progressed through prototyping to various alpha and beta stages. QA and smoke testing on built artifacts before promotion to distribution was initially weak because there were no docs or tools for agents to download artifacts, launch them, and validate critical user journeys.

Slop (low-quality code not meeting standards) was a persistent challenge addressed through garbage collection days and iterative harness improvements. The solution was observing slop, categorizing it, writing documentation about acceptable approaches, and creating automated checks to prevent recurrence.

## Future Vision

Leopo's vision is to take a token budget and a quarter, half, or year's worth of work, provide human input to rank importance with success and reliability metrics, and have machines continually work and advance products forward without explicit human control.

As the team has progressed through various stages, new parts of the software engineering process have emerged requiring capability building. Beyond writing code, this includes triaging user feedback and pages, ensuring no PII leaks in production logs, maintaining good public perception, supporting user operations staff with well-written runbooks for high-volume issue triage, and moving solutions into code to prevent issues from recurring.

The meta-programming job becomes writing down processes and acceptance criteria across all these activities, not just code production. Engineering shifts from hands-on implementation to defining what good looks like across the entire software lifecycle and creating systems that enable agents to meet those standards autonomously.

## Production Deployment Practices

The team optimizes for throughput rather than perfection, allowing both agents and humans to contribute to PRs without blocking on contributions. Implementation agents can acknowledge, defer, or reject feedback, and the system biases toward code being accepted rather than perfect or drowning in minutiae. This prevents catastrophic failure modes where coding agents get bullied by reviewers when the goal should be shipping functional code.

The team uses GitHub and markdown files in repositories as their primary collaboration platform, treating PRs as broadcast domains where agents and humans collaborate asynchronously. This mirrors the Google Docs workflow of opening documents, writing, requesting feedback, getting comments, and applying suggestions, but applied to code changes.

## Measuring Success

Success metrics shifted from traditional velocity measures to higher-order concerns. Key indicators include:

- Reduction in time spent on synchronous human code review
- Decrease in merge conflict frequency and resolution time
- Ability to complete previously intractable migrations
- Coverage of non-functional requirements through automated checks
- Ratio of human time spent on strategic vs. tactical activities
- Token efficiency and productive utilization of agent capacity

The team measures progress by observing where human attention is required and systematically automating or delegating those touch points, with the goal of removing humans from the loop entirely for routine implementation and quality assurance tasks.

## Key Takeaways for LLMOps

This case study demonstrates several crucial LLMOps principles for production deployment of coding agents:

The harness is everything - the quality of agent output depends on the context management, documentation, testing, and feedback systems surrounding the agents, not just the model weights. Success requires treating every aspect of the development toolchain as a prompt injection opportunity.

Just-in-time context delivery respects context window limitations while ensuring agents receive critical requirements when needed. Front-loading all instructions overwhelms agents, while deferred, targeted guidance allows prototyping followed by refinement.

Automation stacks multiplicatively - each improvement to documentation, testing, linting, or review processes compounds with others to create increasingly autonomous systems. The team's approach of dedicating regular time to observing failures and systematically eliminating them creates continuous improvement.

Code uniformity dramatically improves agent effectiveness by making required tokens more predictable regardless of where in a codebase agents work. Large-scale refactoring to achieve uniformity is practical because agent-driven code changes are essentially free.

The role of human engineers fundamentally shifts from implementation to systems thinking, delegation, and defining what good looks like across all aspects of software development. This requires developing new skills around documentation, requirement specification, and empowering agents rather than direct coding.
