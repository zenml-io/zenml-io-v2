---
title: "Extreme Harness Engineering: Building Production Systems with Zero Human-Written Code"
slug: "extreme-harness-engineering-building-production-systems-with-zero-human-written-code"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "structured-output"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "evals"
  - "docker"
  - "monitoring"
  - "cicd"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "elasticsearch"
  - "langchain"
  - "openai"
  - "anthropic"
  - "meta"
  - "google-gcp"
  - "harness-engineering"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI's Frontier Product Exploration team conducted a five-month experiment building an internal Electron application with zero lines of human-written code, generating over one million lines of code across thousands of pull requests. The team developed \"harness engineering\" principles and Symphony, an Elixir-based orchestration system, to manage multiple coding agents at scale. By removing humans from the code authorship loop and focusing on building infrastructure, observability, and context for agents to operate autonomously, the team achieved 5-10 PRs per engineer per day with agents handling the full PR lifecycle including review, merge conflict resolution, and deployment, ultimately demonstrating that software can be built and maintained entirely by AI agents when proper systems and guardrails are in place."
link: "https://www.latent.space/p/harness-eng"
year: 2026
seo:
  title: "OpenAI: Extreme Harness Engineering: Building Production Systems with Zero Human-Written Code - ZenML LLMOps Database"
  description: "OpenAI's Frontier Product Exploration team conducted a five-month experiment building an internal Electron application with zero lines of human-written code, generating over one million lines of code across thousands of pull requests. The team developed \"harness engineering\" principles and Symphony, an Elixir-based orchestration system, to manage multiple coding agents at scale. By removing humans from the code authorship loop and focusing on building infrastructure, observability, and context for agents to operate autonomously, the team achieved 5-10 PRs per engineer per day with agents handling the full PR lifecycle including review, merge conflict resolution, and deployment, ultimately demonstrating that software can be built and maintained entirely by AI agents when proper systems and guardrails are in place."
  canonical: "https://www.zenml.io/llmops-database/extreme-harness-engineering-building-production-systems-with-zero-human-written-code"
  ogTitle: "OpenAI: Extreme Harness Engineering: Building Production Systems with Zero Human-Written Code - ZenML LLMOps Database"
  ogDescription: "OpenAI's Frontier Product Exploration team conducted a five-month experiment building an internal Electron application with zero lines of human-written code, generating over one million lines of code across thousands of pull requests. The team developed \"harness engineering\" principles and Symphony, an Elixir-based orchestration system, to manage multiple coding agents at scale. By removing humans from the code authorship loop and focusing on building infrastructure, observability, and context for agents to operate autonomously, the team achieved 5-10 PRs per engineer per day with agents handling the full PR lifecycle including review, merge conflict resolution, and deployment, ultimately demonstrating that software can be built and maintained entirely by AI agents when proper systems and guardrails are in place."
notion:
  pageId: "341f8dff-2538-80be-9fcb-f33488c83fca"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-13T07:02:00.000Z"
  lastEditedTime: "2026-04-13T07:02:00.000Z"
  publishedAt: "2026-04-14T08:59:10Z"
---

## Overview

This case study documents an ambitious experiment by OpenAI's Frontier Product Exploration team, led by Ryan Lopopolo, to build production software entirely with AI coding agents. Over five months starting in late 2025, the team built an internal Electron-based application with a strict constraint: zero lines of human-written code. The codebase grew to over one million lines of code across more than 1,500 pull requests, all authored, reviewed, and merged by AI agents. This work introduced the concept of "harness engineering" - the discipline of building infrastructure and context that enables coding agents to operate autonomously at scale.

The experiment wasn't just about demonstrating that agents could write code, but rather about fundamentally rethinking the software development lifecycle when humans are no longer the primary code authors. Ryan's team discovered that the real bottleneck wasn't token cost or model capability, but rather human attention and the need to build systems that could operate without constant human supervision. The result was Symphony, an Elixir-based multi-agent orchestration platform that manages the full lifecycle of software development tasks.

## Core Philosophy and Constraints

The experiment began with a deliberate constraint: Ryan refused to write any code himself, forcing the team to build everything through agents. This wasn't just a thought experiment - they were building a real product for internal use at OpenAI. The philosophy was simple: if OpenAI wants to deploy agents that can do economically valuable work in enterprises, those agents need to be capable of doing everything a human engineer does, end to end.

Starting with early versions of Codex CLI and the Codex Mini model, the first month and a half was "10 times slower" than human development. However, by paying that upfront cost and building the right abstractions, tools, and infrastructure, the team eventually became far more productive than any individual human engineer could be. The key insight was treating agent failures not as prompt engineering problems, but as missing capabilities, context, or structure that needed to be systematically addressed.

## Evolution Through Model Generations

The team progressed through multiple Codex model generations (GPT-5.1, 5.2, 5.3, 5.4), and each required adaptation of their approach. A particularly interesting case was the introduction of background shells in Codex 5.3. Previous versions would block on long-running scripts, but 5.3 became "less patient" and would spawn commands in the background while continuing other work. This forced the team to completely retool their build system to ensure builds completed in under one minute.

The one-minute build constraint became a critical invariant. The team migrated through multiple build systems - from bespoke Makefiles to Bazel to Turbo to nx - all in pursuit of keeping the inner development loop fast enough for agents to stay productive. Unlike human-led projects where build times slowly degrade until a team dedicates weeks to optimization, the team used cheap tokens and massive parallelism to constantly maintain these invariants through continuous "gardening" of the codebase.

## Symphony: Multi-Agent Orchestration

By late December 2025, the team was producing 3.5 PRs per engineer per day. When GPT-5.2 launched in early January 2026, that jumped to 5-10 PRs per day with no other changes. The human bottleneck became obvious - engineers were spending all their time context-switching between tmux panes to babysit different agent sessions.

This led to the creation of Symphony, an Elixir-based orchestration platform that removes humans from the terminal entirely. Elixir was chosen (by the model itself, interestingly) because its process supervision model and GenServer primitives naturally map to the problem of orchestrating large numbers of concurrent coding tasks. Symphony manages the full lifecycle: spawning Codex agents in isolated worktrees, driving them through task completion, coordinating PR reviews, handling merge conflicts, managing rework when PRs aren't mergeable, and ultimately getting code merged to main.

The system architecture has six layers: policy (encoding rules and requirements), configuration (environment and tool setup), coordination (task assignment and agent lifecycle), execution (actual coding work), integration (CI/CD and merging), and observability (metrics, logs, traces). A critical design choice was making the entire stack "CLI-first" - everything from the app itself to the local development environment to observability tools is controllable via command-line interfaces, which makes it maximally token-efficient and agent-legible.

## Observability and Context Architecture

One of the most sophisticated aspects of the system is its observability stack. The team runs a full local observability platform including Vector for log aggregation, VictoriaMetrics for metrics, Grafana for dashboards, and distributed tracing. Critically, the agents themselves author the Grafana dashboard JSON definitions, configure the alerts, and respond to pages when things go wrong. This creates a closed loop where an agent that gets paged for a missing timeout can both fix the immediate issue and durably update the reliability documentation to require timeouts on all future network calls.

The team invested heavily in making everything "agent-legible." This means structuring information as text that can be easily consumed in context windows. The repository contains several key markdown files: a spec.md that defines the overall product vision, an agent.md with a table of contents guiding agent behavior, core-beliefs.md encoding team values and practices, and a tech-tracker.md that serves as a markdown-based task list before the team adopted proper ticketing systems.

Skills became a central abstraction for encoding engineering knowledge. These are reusable prompts and scripts that teach agents how to perform common tasks. The team deliberately kept the number of skills small (around six) and focused on making them comprehensive rather than creating many narrow skills. When agents made mistakes, the first response was to update an existing skill to cover that case, making the fix durable for all future work.

## Autonomous Code Review and Merging

Perhaps the most radical aspect of the system is autonomous merging with zero human code review before merge. Human review happens post-merge as a sampling mechanism to identify systemic issues. The team built code review agents that run automatically on PR synchronization. These agents are instructed to bias toward merging, to not surface anything greater than P2 priority, and to provide feedback that the authoring agent can choose to accept, defer, or push back against.

The authoring agents are given flexibility in how they respond to review feedback, preventing thrashing where review agents and authoring agents end up in unproductive loops. The system also includes quality score tracking - a markdown table that serves as a hook for Codex to periodically review all business logic against documented guardrails and propose follow-up work for itself.

The merge flow uses the "$land" skill, which coaches Codex to push the PR, wait for human and agent reviewers, wait for CI to be green, fix any flaky tests, merge upstream if conflicts arise, handle the merge queue, and deal with any flakes until the code is in main. The entire process runs autonomously, with humans only needing to keep their laptops open.

## Build System and Development Environment

The development environment is fully self-contained and agent-managed. Rather than setting up an environment and then spawning agents into it, the team inverts this: Codex is the entry point, and it has skills and scripts to boot the entire local development stack if needed. This includes the Electron app itself, backend services, and the full observability stack.

The team uses worktrees extensively to enable massive parallelism - multiple agents can work on different features simultaneously in isolated worktrees. While this creates merge conflicts, the models have proven "really great at resolving merge conflicts," and since code is disposable, the overhead is acceptable. The build system went through multiple iterations specifically to serve agent needs, not human preferences.

An interesting optimization was making CLI outputs extremely token-efficient. For example, they patched prettier to run in silent mode because agents don't care that every file was already formatted - they only need to know if formatting succeeded or failed. Similarly, their PNPM distributed test runner was wrapped to suppress passing test output and only show failures, dramatically reducing token consumption.

## Ghost Libraries and Spec-Driven Distribution

The team developed an innovative approach to distributing software they call "ghost libraries." Rather than sharing source code, they create high-fidelity specifications that coding agents can use to reproduce the system from scratch. The workflow is remarkable: spawn a Codex instance with the proprietary repo as reference, ask it to write a spec, spawn a second disconnected Codex to implement the spec, spawn a third to review the implementation against the original, update the spec to reduce divergence, and loop until the spec can reproduce the system with high fidelity.

This approach has profound implications. If software can be distributed as specifications rather than code, it becomes much cheaper to share knowledge, easier to adapt systems to different environments, and natural to maintain multiple implementations. It also means that internalized dependencies become practical - rather than managing complex dependency graphs, teams can inline dependencies and have agents maintain them, making it easier to customize and secure the code.

## Human Role and Team Dynamics

In this model, humans shift from code authors to systems architects. Ryan describes the role as similar to being a group tech lead for a 500-person organization - it's not appropriate to be in the weeds on every PR. Instead, humans focus on building infrastructure, observability, and context that enables agents to work autonomously. They spend time identifying where agents struggle, where humans are spending attention, and how to build systems to eliminate those bottlenecks.

The team maintains very rigid architecture - the codebase contains around 500 NPM packages, which would be excessive for a seven-person team but makes sense when each human is effectively managing 10-50 agents. This decomposition creates clear boundaries that prevent agents (and humans) from trampling on each other's work.

Daily standups are 45 minutes long because the team needs significant synchronous time to share knowledge about the current state of the system. With so much happening autonomously, it's easy to lose track of what the codebase actually looks like. Ryan recounts being surprised to discover that someone had replaced the MCPCC Playwright integration with a custom local daemon exposing a minimal CLI - a change that happened entirely through agent work without his knowledge.

## Skills and Knowledge Distillation

The team developed sophisticated approaches to learning from agent trajectories. They collect all Codex session logs for the entire team into blob storage and run agent loops over them daily to identify patterns and opportunities for improvement. The insights get fed back into the repository as updated skills, documentation, or tests, creating a virtuous cycle where everybody benefits from everybody else's experience.

Similarly, PR comments and failed builds are treated as signals that the agent was missing context. The team has processes to "slurp up" this feedback and integrate it back into the repository. When an agent gets paged for a production issue, it can update documentation to ensure similar issues are prevented in the future. This creates a self-improving system where the collective knowledge of the team accumulates in agent-accessible form.

The team also encoded non-functional requirements into docs, tests, review agents, and skills. Everything from timeout requirements on network calls to the company's meme culture and Slack communication style is documented in a form that can be prompt-injected into agent context. One particularly amusing example: they have skills for generating "deep fried memes" and maintaining company culture in Slack, which GPT-5.4 proved quite capable at.

## Production Deployment and Enterprise Context

While the codebase is managed entirely by agents, there's still a human in the loop for cutting release branches and approving smoke tests before promoting to distribution. This is a native application rather than a continuously deployed service, which provides natural checkpoints for human oversight.

The team also built an internal data agent using Frontier technology to make OpenAI's internal data ontology accessible. This required encoding semantic layer information - definitions of what revenue means, what constitutes an active user, and other business-critical metrics that even humans often disagree on. The agent needs to understand not just the technical structure of data warehouses but the business context of how the company operates.

Interestingly, the team includes context about the product vision, customer segments, pilot customers, and 12-month goals in their core-beliefs.md. This business context informs how agents build software, just as it would for human engineers. The team even documents who's on the team and what their roles are, creating a comprehensive context that enables agents to make informed decisions.

## Current Limitations and Future Directions

Despite the remarkable success, Ryan identifies clear limitations in current models. They struggle with pure white space zero-to-one product development, where there's no existing codebase to reference and the vision exists only in someone's head. The gnarliest refactorings - those requiring deep rethinking of interface boundaries - also still require significant human involvement.

However, Ryan is explicitly "not betting against the model" - he expects these capabilities to improve with each release. The strategy is to build infrastructure and processes that are robust to model improvements, allowing humans to continuously move higher up the stack as models handle increasingly complex tasks.

The Frontier platform represents the productization of these learnings for enterprise customers. It provides highly observable, safe, controlled agent deployment with integration into existing IAM stacks, security tooling, and workspace tools. The platform includes the Agents SDK as a "works by default" harness that incorporates all the best practices discovered through this experiment, from the shell tool to Codex harness to file attachments and containers.

## Token Economics and Scale

The team runs at extreme scale: over one billion tokens per day, roughly $2-3k in daily token spend based on market rates and caching assumptions. Ryan is "admirably evangelical" about this, calling it borderline "negligent" if enterprises aren't using this level of token volume. The philosophy is that tokens are fundamentally cheap and parallelizable, while human attention is fundamentally scarce and serial.

This creates a different optimization function. Rather than minimizing token usage, the team optimizes for minimizing human attention. They'll happily spend tokens on continuous build optimization, comprehensive observability, redundant agent runs, and extensive context injection if it means humans can focus on higher-level problems.

## Technical Stack and Tool Choices

The application is built with Electron, using a sophisticated architecture that separates main and render processes with MVC-style decomposition. The backend is hosted in the cloud, but local development includes the full stack. The team uses Mia extensively for dependency management, allowing them to easily pull down Go-written VictoriaMetrics binaries and other observability components.

Tool choices are explicitly agent-driven. When the team needed an orchestration layer, they gave the model context and let it choose Elixir for its process supervision capabilities. This decision makes sense from the model's perspective even if the humans on the team don't have Elixir expertise - the code is disposable and the model will maintain it.

The GitHub CLI (gh) is extensively used and praised for being "fantastic" and "super industry standard." The team rarely interacts with GitHub's web UI, instead using commands like "gh pr view --web" to quickly verify something before merging. This CLI-first approach extends to every aspect of the system.

## Broader Implications

This work represents a fundamental rethinking of software development. Traditional practices like careful PR review, human-legible code organization, and collaborative coding are being replaced with agent-legible architecture, autonomous merging, and systems thinking. The role of software engineers is shifting from crafting code to crafting the context and infrastructure that enables agents to craft code.

The experiment also demonstrates that the "Dark Factory" concept - fully automated manufacturing with no humans in the loop - is achievable for software development today with current models. While there are still limitations, the trajectory is clear: as models improve, the range of tasks that can be fully automated will expand, allowing humans to focus on progressively higher-level challenges.

The work has significant implications for enterprise software development. If a small team can achieve this level of automation and productivity with current tools, large enterprises that adopt similar practices could see massive productivity gains. The Frontier platform aims to make this accessible by providing the infrastructure, observability, and governance layers needed to deploy agents safely at scale.

Perhaps most importantly, this case study demonstrates that realizing the full potential of coding agents requires rethinking the entire software development lifecycle, not just adopting better prompting techniques. It's about building systems where agents can operate autonomously, making mistakes that get automatically caught and corrected, learning from experience, and continuously improving without constant human oversight. This is what "harness engineering" means in practice - and it represents a new discipline that will be critical as AI agents become capable of increasingly complex and valuable work.
