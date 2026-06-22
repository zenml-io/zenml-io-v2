---
title: "Harness Engineering: Structuring Context and Guardrails for AI Coding Agents in Production"
slug: "harness-engineering-structuring-context-and-guardrails-for-ai-coding-agents-in-production"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "harness-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "cicd"
  - "documentation"
  - "guardrails"
  - "open-source"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "Ryan Leiulo from OpenAI presents the concept of \"harness engineering,\" a novel approach to productionizing AI coding agents by systematically structuring context, guardrails, and feedback loops. The core problem addressed is that while modern LLMs have reached capabilities enabling significant parts of the software engineering lifecycle, they lack the durable memory and cultural osmosis that human engineers possess. The solution involves creating explicit, written documentation of non-functional requirements, implementing just-in-time context injection through tool calls and tests, and establishing reviewer agents with persona-based guardrails. Results demonstrate that teams can achieve headless operation with minimal human intervention by shifting quality controls rightward in the development process, enabling agents to self-correct through static guardrails, exhaustive tests, and automated review processes that continuously improve through systematic capture of all human feedback and failed builds."
link: "https://www.youtube.com/watch?v=c8bE0cj7vHY"
year: 2026
seo:
  title: "OpenAI: Harness Engineering: Structuring Context and Guardrails for AI Coding Agents in Production - ZenML LLMOps Database"
  description: "Ryan Leiulo from OpenAI presents the concept of \"harness engineering,\" a novel approach to productionizing AI coding agents by systematically structuring context, guardrails, and feedback loops. The core problem addressed is that while modern LLMs have reached capabilities enabling significant parts of the software engineering lifecycle, they lack the durable memory and cultural osmosis that human engineers possess. The solution involves creating explicit, written documentation of non-functional requirements, implementing just-in-time context injection through tool calls and tests, and establishing reviewer agents with persona-based guardrails. Results demonstrate that teams can achieve headless operation with minimal human intervention by shifting quality controls rightward in the development process, enabling agents to self-correct through static guardrails, exhaustive tests, and automated review processes that continuously improve through systematic capture of all human feedback and failed builds."
  canonical: "https://www.zenml.io/llmops-database/harness-engineering-structuring-context-and-guardrails-for-ai-coding-agents-in-production"
  ogTitle: "OpenAI: Harness Engineering: Structuring Context and Guardrails for AI Coding Agents in Production - ZenML LLMOps Database"
  ogDescription: "Ryan Leiulo from OpenAI presents the concept of \"harness engineering,\" a novel approach to productionizing AI coding agents by systematically structuring context, guardrails, and feedback loops. The core problem addressed is that while modern LLMs have reached capabilities enabling significant parts of the software engineering lifecycle, they lack the durable memory and cultural osmosis that human engineers possess. The solution involves creating explicit, written documentation of non-functional requirements, implementing just-in-time context injection through tool calls and tests, and establishing reviewer agents with persona-based guardrails. Results demonstrate that teams can achieve headless operation with minimal human intervention by shifting quality controls rightward in the development process, enabling agents to self-correct through static guardrails, exhaustive tests, and automated review processes that continuously improve through systematic capture of all human feedback and failed builds."
notion:
  pageId: "384f8dff-2538-8016-bdd5-d6f35598185d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-19T16:11:00.000Z"
  lastEditedTime: "2026-06-19T16:11:00.000Z"
  publishedAt: "2026-06-22T14:48:21Z"
---

## Overview

Ryan Leiulo from OpenAI introduces the concept of "harness engineering" at AI Native DevCon, describing a comprehensive approach to integrating AI coding agents into production software development workflows. The talk originates from his personal experience starting in June of the previous year when he began using early reasoning models and the Codex CLI coding agent to automate his own engineering work. Initially attempting to have the agent read Slack alerts and triage pages, he evolved into presenting himself as a tool to the model, gradually building up powerful tooling and context structures that enabled the agent to solve problems, write code, and manage issues on his behalf.

The fundamental thesis is that software development has undergone a singularity-level disruption comparable to the introduction of cloud computing, but compressed into a much shorter timeframe. With the introduction of GPT 5.2 and Claude Opus 4.5 in December, code production capabilities reached a level where traditional software engineering constraints no longer apply. This requires teams to completely retool their stacks with every point release of models, constantly re-evaluating what's possible.

## Core Constraints in the Agent-Driven World

Leiulo identifies three foundational limits that remain when teams of humans and agents produce software together:

**Human time** is the fundamentally scarce resource. He notes that he personally maxes out at about three concurrent sessions on his laptop. To achieve higher throughput and parallelism, teams must remove their own synchronous attention from the process. This represents a shift from the old world where code production was the expensive bottleneck.

**Human and model attention** remain limited. Due to the architecture of LLMs where attention must sum to one, thrashing agents with conflicting and overbearing requirements will degrade performance. Teams need to structure work to be more parallel, accept many more PRs of varying sizes, and let agents explore the solution space.

**Model context windows**, while growing larger over time, remain a scarce resource requiring protection. Leiulo shares that with GPT series models, auto-compaction is fantastic and he can let tasks run for 6, 12, even 36 hours while still getting good results. However, the context window being obliterated and rebuilt during these auto-compactions is something teams must actively contend with by continually resurfacing context to the model.

## The Core Problem: Making Quality Legible to Agents

A critical insight is that agents lack the cultural osmosis and durable memory that human engineers accumulate through standup meetings, code reviews, and accumulated battle scars. Teams must articulate what constitutes "doing a good job" and write it down explicitly. Since LLMs are driven by text, defining quality in written form becomes a net new function for software engineering teams in 2026.

However, writing things down is insufficient. The text must be pulled into context at the right time in ways that don't thrash the agent while still allowing it to be creative and reason effectively. For example, telling an agent to "write reliable network code by making sure retries and timeouts are consistently applied" is useless if that text never makes it into the agent's context during implementation.

## The Harness Engineering Approach

Harness engineering is fundamentally about making context around quality legible and surfacing it just-in-time to the agent during its execution trajectories. This steers and refines output to ensure every PR adheres to what the team considers acceptable, high-quality, aligned software.

Interestingly, Leiulo advocates for the opposite of traditional DevOps "shift left" practices. Rather than pushing interventions as early as possible in the development process, he pushes interventions as far right as possible to minimize synchronous human time. The hierarchy of interventions from right to left includes:

- Trashing a bad PR and changing the prompt
- Writing down requirements in documentation
- Empowering a reviewer agent to judge every diff
- Creating static lints and guardrails
- Implementing tests that fail on violations

The key is progressively making mistakes impossible rather than just unlikely. He never wants to give the same review feedback twice.

## Three Phases of Context Delivery

Leiulo structures the agent workflow into three distinct phases, each requiring different context delivery strategies:

**Phase 1: Planning and Grounding**

The most important artifact is an `agents.md` file containing a numbered set of steps the model should follow during every rollout and session. The agent first grounds itself in documentation, the knowledge base, and the ticket. It spiders through the history of Architecture Decision Records (ADRs) and design docs to understand impacts on other features. It reviews critical user journeys to determine what screens and user surfaces are affected, keeping the QA plan in mind throughout execution. Some amount of slowness is expected and welcome during this phase because the agent is paging in all necessary context about how this feature slots into the broader system.

**Phase 2: The Messy Middle of Implementation**

During code writing, test running, and codebase exploration, the system exploits the fact that agents call many tools and run many tests by using these interactions for just-in-time prompt injection. Tests and lints written for agents are fundamentally different from those written for humans. They recognize that agents will truncate tool call outputs, they respond well to descriptive error messages pointing to runbooks for remediation, and they can be fiddly and numerous in ways that would be burdensome for human developers.

A concrete example Leiulo provides is the common failure mode of missing timeouts and retries on cross-service network calls. While there's no standard ESLint plugin for this, with cheap code production teams can "vibe up" guardrails with 100% code coverage and exhaustive table-driven tests, migrate the entire codebase, and surface failures just-in-time whenever the model writes another fetch call. Because tool call outputs receive less weight during auto-compaction, this just-in-time correction doesn't pollute the context window while still allowing complex work.

**Phase 3: Review and Merge**

After implementation, the task becomes determining whether the code and diff are aligned. Static guardrails and multiple LLM-as-judge evaluators examine the code through various lenses: reliability, performance, adherence to team standards. Because LLMs crave text, these reviewer agents can collaborate with the implementation agent over the PR thread, providing detailed feedback that realigns the diff back to baseline.

## Key Implementation Patterns

**Agents.md as the Central Hub**: This file doesn't contain prescriptive guardrails but rather points to a curated set of review personas that are essentially bulleted lists of guardrails. This structure allows teams to cheaply refine agent output by having Slack conversations about performance regressions or bugs, then mentioning the agent to yoink the conversation and create a PR adding it to the static guardrails.

**Review Personas**: These persona-based guardrail files can be applied not just to code quality but also to product features, critical user journeys, and the fundamental user problems the application solves. All this context grounds the agent in what the team is trying to accomplish and how they think about working, producing more aligned output.

**Structural Tests**: Blunt hammers like file line count limits or requiring snapshot tests can be powerful. For example, requiring that every React component has a snapshot test with 100% branch coverage naturally causes the agent to decompose components, make them pure where possible, avoid prop drilling, and place hooks close to where data is used—all because it makes it easier to satisfy the snapshot test requirement.

**Static Type Requirements**: To combat type-shaped probing that results in scattered `any` or `unknown` types, Leiulo uses ESLint to statically disallow any function with these types except in route handlers or database parsing code. Combined with 100% code coverage requirements, this makes bad type probing behavior impossible because unknown types can't exist and therefore functions can't be exercised.

**All Code is Prompting**: Since agents crave text, every bit of text fed to them informs token prediction and thus the produced code. This means all code in the repository, outside of documentation, is also prompting. Standardizing the entire stack on a single observability framework (like OpenTelemetry) means the model can translate context from one part of the repository to another without loss of quality. Having six different observability stacks forces the model to spend significantly more attention figuring out which to use and whether code has been migrated.

## Treating Agents as Team Members

Leiulo emphasizes treating agents like human teammates who need to convince you to merge their code. Just as you don't shoulder-surf teammates in their editors, you trust their attestation that they tested the code. When unsure, you might ask for logs from staging deploys or screenshots of exercising features. Agents should be required to do the same.

With computer use and browser use capabilities now available (he highly recommends the Codex app), agents can provide visual confirmation. Even without those tools, vibing up an XC-connected headless display in a Docker container and wiring FFmpeg to the stream to record reproduction videos is within reach, especially since the code quality doesn't matter for these throwaway test harnesses and Codex excels at FFmpeg manipulation.

The review process should assume benefit of the doubt and bias toward merge. What are the P2-and-above issues necessary to accept this code? Use reviewer agents to surface those, get the coding agent to address them, verify the reviewers are satisfied, and ship. Observing which review feedback regularly surfaces provides signals about which guardrails need to be shifted left in the process.

## Systematic Capture of Feedback Loops

Every review comment, agent interruption, failed build, and production exception represents a signal that context was missing. The agent didn't consider the full end-to-end consequences of its code. Teams should systematically capture all this human feedback and "slurp it up" to have sub-agents dream over it nightly, distilling whether humans can improve their prompting, whether missing guardrails should exist, and how to achieve more headless operation with less human interruption while enabling agents to handle increasingly complex tasks.

## Vibe Coding as a Philosophy

Leiulo advocates for "vibe coding"—writing guardrails and tooling that only affect local development and can be gross in implementation because it brings into possibility the idea that you don't need to care about parts of the software production function. This enables operating like a group tech lead or org lead without visibility into every engineer's keyboard activity. What matters are invariants, interfaces, and whether components do what they claim with high reliability.

## Production Experience and Results

Leiulo shares concrete experience from his work maintaining open-source Rust crates, particularly the Artichoke Ruby interpreter project. He specifically mentions exploiting automations in the Codex app to take his hands off the wheel for maintenance tasks on projects like `artichoke-randmt`, a Mersenne Twister implementation. While he hasn't yet implemented the full review agent layer in these projects, the patterns are being actively deployed.

The overall result is a development process where:

- Human time becomes the only truly scarce resource, not code production
- Teams can fork many more parallel tasks with minimal synchronous human attention
- Context is systematically structured and surfaced at the right moments
- Quality gates shift rightward to minimize human interruption while maintaining standards
- Every mistake becomes progressively impossible through systematically encoded guardrails
- Agents continuously improve through captured feedback loops

## Critical Considerations and Balanced Assessment

While Leiulo's presentation is compelling and clearly comes from real production experience, several considerations warrant attention:

The approach requires significant upfront investment in creating the harness infrastructure—the agents.md files, review personas, structural tests, and feedback capture systems. Teams need to assess whether their development velocity and scale justify this investment versus simpler prompt engineering approaches.

The reliance on auto-compaction and long-running agent sessions (6-36 hours) assumes access to cutting-edge models with these capabilities. Teams using different models or with tighter latency requirements may need to adapt these patterns significantly.

The "shift right" philosophy directly contradicts decades of DevOps wisdom about catching issues early when they're cheapest to fix. While Leiulo's reasoning is sound for the specific context of AI agents with cheap code production, teams need to carefully evaluate whether this applies to their specific circumstances or whether some hybrid approach better suits their needs.

The treatment of agents as teammates who deserve trust assumes a level of model capability and reliability that may not hold across all tasks and domains. Critical systems may require more extensive human oversight regardless of how well-structured the harness becomes.

Finally, the continuous refinement process of capturing all feedback and "dreaming over it" nightly requires significant automation infrastructure and likely substantial compute resources. The ROI of this investment depends heavily on team size, development velocity, and the repetitiveness of the work being automated.

Nevertheless, the harness engineering framework represents a sophisticated and thoughtful approach to productionizing AI coding agents, grounded in real experience and offering concrete patterns that teams can adopt incrementally as they scale their use of AI in software development.
