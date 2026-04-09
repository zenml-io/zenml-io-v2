---
title: "Extreme Harness Engineering: Building Production Software with Zero Human-Written Code"
slug: "extreme-harness-engineering-building-production-software-with-zero-human-written-code"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "data-analysis"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
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
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "elasticsearch"
  - "guardrails"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI's Frontier Product Exploration team conducted a five-month experiment building an internal beta product with zero manually written code, generating over 1 million lines of code across thousands of PRs while processing approximately 1 billion tokens per day. The team developed \"Symphony,\" an Elixir-based orchestration system that manages multiple Codex agents autonomously, removing humans from the code review and merge loop entirely. By shifting focus from prompt engineering to \"harness engineering\"—building systems, observability, and context that enable agents to work independently—the team achieved 5-10 PRs per engineer per day and established a new paradigm where software is optimized for agent legibility rather than human readability."
link: "https://www.latent.space/p/harness-eng"
year: 2026
seo:
  title: "OpenAI: Extreme Harness Engineering: Building Production Software with Zero Human-Written Code - ZenML LLMOps Database"
  description: "OpenAI's Frontier Product Exploration team conducted a five-month experiment building an internal beta product with zero manually written code, generating over 1 million lines of code across thousands of PRs while processing approximately 1 billion tokens per day. The team developed \"Symphony,\" an Elixir-based orchestration system that manages multiple Codex agents autonomously, removing humans from the code review and merge loop entirely. By shifting focus from prompt engineering to \"harness engineering\"—building systems, observability, and context that enable agents to work independently—the team achieved 5-10 PRs per engineer per day and established a new paradigm where software is optimized for agent legibility rather than human readability."
  canonical: "https://www.zenml.io/llmops-database/extreme-harness-engineering-building-production-software-with-zero-human-written-code"
  ogTitle: "OpenAI: Extreme Harness Engineering: Building Production Software with Zero Human-Written Code - ZenML LLMOps Database"
  ogDescription: "OpenAI's Frontier Product Exploration team conducted a five-month experiment building an internal beta product with zero manually written code, generating over 1 million lines of code across thousands of PRs while processing approximately 1 billion tokens per day. The team developed \"Symphony,\" an Elixir-based orchestration system that manages multiple Codex agents autonomously, removing humans from the code review and merge loop entirely. By shifting focus from prompt engineering to \"harness engineering\"—building systems, observability, and context that enable agents to work independently—the team achieved 5-10 PRs per engineer per day and established a new paradigm where software is optimized for agent legibility rather than human readability."
notion:
  pageId: "33bf8dff-2538-80e5-bc99-fa89b44730ba"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-07T19:46:00.000Z"
  lastEditedTime: "2026-04-09T17:42:00.000Z"
  publishedAt: "2026-04-09T18:02:42Z"
---

## Overview

Ryan Lopopolo of OpenAI's Frontier Product Exploration team presented a groundbreaking case study in extreme LLMOps practices, centered around what he terms "harness engineering." The team conducted a five-month experiment building an internal beta product (an Electron-based application) with a radical constraint: zero lines of human-written code. The result was over 1 million lines of code in the repository, thousands of pull requests across multiple Codex model generations, and a fundamentally new approach to production AI engineering that challenges conventional software development practices.

The central insight driving this work is that when organizations optimize for AI agents rather than human developers, the bottleneck shifts from token availability to human attention. With OpenAI's internal rate limits removed and models rapidly improving, the team found that humans reviewing code became the constraint rather than the agents writing it. This led to a complete reimagining of the software development lifecycle, where code becomes disposable, systems thinking replaces line-by-line review, and observability infrastructure enables autonomous agent operation.

## The Harness Engineering Paradigm

The concept of "harness engineering" represents a philosophical and practical shift from traditional prompt engineering. Rather than focusing on how to prompt models better or asking them to "try harder," harness engineering asks: "What capability, context, or structure is missing that prevents the agent from succeeding autonomously?" This mindset led the team to build extensive scaffolding—not to constrain agents, but to provide them with the tools, observability, and context needed to operate independently.

The team's approach evolved through several Codex model generations (from early Codex Mini through GPT-5.1, 5.2, 5.3, and 5.4), each requiring adaptations to the harness. A particularly illustrative example involved the transition from Codex 5.2 to 5.3: the introduction of background shells meant the model became less patient with blocking scripts. Rather than accepting slower builds, the team retooled their entire build system within a week, migrating from bespoke Makefiles to Bazel, then Turbo, and finally to Nx—ultimately achieving sub-one-minute build times. This radical restructuring would be nearly impossible in a human-driven codebase with entrenched opinions, but became trivial when optimizing purely for agent productivity.

## Model Evolution and Adaptation Strategies

The team's experience across multiple model generations provides valuable insights into LLMOps at scale. Early Codex models were "painfully slow," often requiring the team to decompose tasks and build smaller building blocks that could be reassembled into broader objectives. The first month and a half was reportedly 10 times slower than human development. However, by paying this upfront cost to build proper abstractions and tooling, the team eventually achieved productivity far exceeding any individual engineer.

Each model upgrade brought both opportunities and challenges. The team learned to adapt workflows as models changed their "working styles." For instance, they observed that newer reasoning models (5.3+) perform better without rigid predefined scaffolds, preferring instead to have the harness itself be "the whole box" with options for how to proceed. This represents a fundamental architectural shift from earlier agent systems that relied on state machines and predefined workflows.

The release of Codex 5.4 marked another inflection point, being the first model to merge "top tier coding" with general reasoning capabilities, computer use, and vision—all in a single model with 1 million token context. This eliminated the need to context-switch between specialized models for different tasks and significantly reduced the frequency of context compaction, allowing agents to work on longer-horizon tasks without losing critical information.

## Symphony: Multi-Agent Orchestration at Scale

Symphony represents the team's solution to scaling from individual human-agent interactions to fully autonomous multi-agent workflows. Built in Elixir (chosen by the model itself for its process supervision capabilities via the BEAM runtime), Symphony removes humans from the terminal entirely. The system orchestrates large numbers of coding agents across tickets and repositories, handling the complete PR lifecycle from code authorship through review, CI management, merge conflict resolution, and final merge to main.

The architecture reflects a deep understanding of production LLMOps requirements. Symphony maintains separate "gen servers" (Elixir processes) for every task in execution, leveraging BEAM's native supervision trees for fault tolerance and orchestration. When a PR is proposed and escalated to a human for review, the review decision is binary: mergeable or not. If not mergeable, the entire worktree and PR are trashed and the ticket moves to a "rework" state, where the system starts from scratch—but critically, with analysis of what went wrong to prevent repeating the same mistakes.

By late December, before Symphony existed, the team was already producing 3-5 PRs per engineer per day. After the New Year with the release of Codex 5.2 and no other repository changes, this jumped to 5-10 PRs per day. The cognitive load of constantly context-switching between terminal panes became the limiting factor, motivating Symphony's development to remove humans from the synchronous loop entirely.

## Observability as First-Class Infrastructure

A critical component of the team's harness engineering approach is comprehensive observability built from day one. The team deployed a complete local development stack including Vector for log aggregation, VictoriaMetrics for metrics storage, Grafana for visualization, and distributed tracing—all booted automatically by Codex agents using high-level developer tools like Mèa for binary management.

The observability infrastructure serves multiple purposes beyond traditional monitoring. First, it provides agents with the context needed to diagnose and fix issues autonomously. When a page fires due to a missing timeout, the agent can be mentioned in Slack to both fix the immediate issue and update the team's reliability documentation to require timeouts on all future network calls. This creates a durable encoding of engineering knowledge that future agent work automatically incorporates.

Second, observability enables post-merge code review rather than pre-merge, fundamentally changing the human role. Instead of humans reviewing every line of code before merge, they review representative samples after deployment, using observability data to identify patterns of mistakes and missing non-functional requirements. These insights are then encoded back into documentation, tests, and review agents, creating a continuous improvement loop.

The team also leverages observability for agent self-improvement. Codex session logs are aggregated to blob storage and processed daily by agent loops that identify where the team collectively can improve. Similarly, PR comments and failed builds are treated as signals that the agent lacked necessary context, prompting updates to skills, documentation, or architectural guardrails.

## Agent-Legible Software Architecture

The codebase is structured for agent comprehension rather than human preference, following what Ryan describes as "10,000 engineer level architecture" for a seven-person team. The repository contains approximately 500 NPM packages with deep decomposition, strict interface boundaries, and extensive sharding—architecture that would seem excessive for a small human team but makes perfect sense when each person effectively has 10-50 agents working in parallel.

Code organization follows strict conventions. The repository maintains a well-defined documentation structure in markdown: agent.md provides high-level context about what agents can and should do, spec.md contains detailed technical specifications, core-beliefs.md documents team composition, product vision, customer segments, and the 12-month roadmap, tech-tracker.md maintains a markdown table used as a hook for Codex to review business logic against documented guardrails, and quality-score.md allows agents to assess alignment with requirements and propose follow-up work.

These documentation artifacts serve dual purposes: they're simultaneously human-readable knowledge bases and prompt context for agents. When an agent makes a mistake that violates a non-functional requirement (like missing error handling or inadequate observability), the team's response is to encode that requirement in documentation rather than manually fixing all instances. Subsequent agent work automatically incorporates these guidelines.

## Skills and Agent Capabilities

The team makes extensive use of Codex "skills"—reusable capability bundles that encode engineering taste and common workflows. Remarkably, the entire codebase operates with only six skills, with the team biasing toward encoding new behaviors into existing skills rather than proliferating new ones. This constraint ensures that changes to agent behavior can be made cheaply by updating skills rather than retraining humans or rewriting extensive scaffolding.

Skills serve as the mechanism for encoding tacit engineering knowledge that would traditionally be communicated through mentorship or code review. For example, when the team identified that network calls needed timeouts for reliability, this became encoded as a skill that future work automatically applies. Similarly, skills encode preferences around testing patterns, architectural decomposition, observability instrumentation, and non-functional requirements like performance and security.

The team also developed specialized skills for specific workflows. A "$land" skill, for instance, coaches Codex through the complete PR lifecycle: push the PR, wait for human and agent reviewers, wait for CI to be green, fix flakes if any occur, merge upstream, handle conflicts if they arise, wait for all checks to pass again, put the PR in the merge queue, and deal with any final flakes until successfully merged to main. This represents true delegation—the human opens their laptop twice a day to make yes/no decisions rather than managing the mechanical work of getting code into production.

## Code Review Agents and Autonomous Merging

The team has moved beyond human code review to autonomous agent-driven review and merge processes. When Codex locally writes a change and pushes a PR, a review agent automatically fires on PR synchronization and posts feedback. The code authoring agent is instructed to at least acknowledge and respond to review feedback, but critically, both reviewers and authors have agency to push back.

Early iterations revealed problems with this dynamic: review agents would "bully" code authors into non-convergent cycles of changes. The team addressed this by adding optionality to prompts on both sides. Review agents are instructed to bias toward merging and not surface anything greater than P2 priority (where P0 would "nuke the code base"). Code authoring agents gained the flexibility to defer feedback to follow-up work or push back when review comments would unreasonably expand scope.

This autonomous review process extends to the entire merge workflow. Code review agents, like humans, often notice tangential improvements that could be made but shouldn't block the current PR. By giving agents the same social contract humans follow—file it to the backlog, pick it up later—the team avoided the trap of agents mechanically implementing every piece of feedback regardless of scope or priority.

Critically, the team has moved to zero human code review before merge. Human review happens post-merge on representative samples, focused on identifying systemic issues rather than line-by-line corrections. This is only possible because of extensive automated testing, comprehensive observability, and the confidence that comes from agents operating within well-defined guardrails encoded in documentation and skills.

## Build Systems and Performance Optimization

The team maintains an obsessive focus on fast build times, establishing one minute as the upper bound for the inner loop. This constraint stems from observations of how model behavior changes with reasoning models—background shells made models less patient with blocking operations, so builds needed to complete quickly enough for the model to stay engaged productively.

Achieving sub-minute builds required multiple iterations of the build system architecture. The team migrated from bespoke Makefiles to Bazel, then to Turbo, and finally settled on Nx when builds became consistently fast. This kind of aggressive retooling would be organizationally difficult in human-centric development where engineers have strong opinions about tooling. But when optimizing purely for agent productivity, the team could make radical changes in a week without social friction.

The team also developed agent-friendly CLI output patterns. Standard tools often produce "walls of build output" that are token-inefficient for agents to process. The team wrapped commands like PNPM with custom scripts that suppress passing test output and only surface failures, dramatically reducing token consumption while maintaining the signal agents need to take corrective action.

This principle extends to other CLIs. The team uses tools like the GitHub CLI (gh) extensively because they're token-efficient and agent-friendly by default. When tools produce verbose output agents don't need (like prettier's confirmation that every file was already formatted), the team adds a --silent flag or wraps the command to suppress unnecessary information.

## Ghost Libraries and Spec-Driven Distribution

One of the most innovative concepts to emerge from this work is "ghost libraries"—software distributed as high-fidelity specifications rather than source code. The team developed Symphony this way: they took scaffolding from their proprietary repository, spawned a new repo, and instructed Codex to write a specification using the original as reference.

The workflow for spec generation involves multiple agent loops: one Codex instance writes the spec, another implements it in a disconnected environment, and a third reviews the implementation against the original upstream code and updates the spec to reduce divergence. This process repeats iteratively until a spec emerges that can reproduce the system with high fidelity.

This distribution model has profound implications. Sharing software becomes dramatically cheaper—you define a spec with enough detail for a coding agent to reassemble the system locally, without sharing source code or dealing with dependency management. Brett Taylor (OpenAI's chairman) responded to this concept by suggesting that "software dependencies are going away"—that agents can simply internalize and vendor dependencies rather than managing external packages.

The team reports that internalizing dependencies up to "low-medium" complexity (roughly a few thousand lines of code) is already feasible and can be done "in an afternoon." Critically, when you internalize dependencies, you only implement what you actually need, stripping away generic interfaces and features irrelevant to your use case. This reduces bloat and makes the code more maintainable, though it does mean losing the benefit of community security auditing and scale testing that comes with widely-used open source packages.

## Enterprise Deployment: OpenAI Frontier

The broader context for this work is OpenAI Frontier, the enterprise platform for deploying agents safely at scale with proper governance. The Frontier Product Exploration team serves as a sprint-ahead group, experimenting with novel deployment patterns that inform product development for Codex and Frontier.

Frontier addresses the core requirements enterprises have for AI deployment: observable agents with comprehensive instrumentation, governable agents with proper controls and compliance hooks, collaboration with existing IAM stacks and security tooling, and integration with workspace tools employees already use. The platform provides dashboards for different stakeholders—employees using agents productively, IT and GRC teams ensuring safe deployment, security teams monitoring for risks, and AI innovation offices tracking adoption and ROI.

A key capability is the GPT-O-S-S safeguard model, which ships with the ability to interface with enterprise-specific safety specs. These specs encode bespoke concerns around data exfiltration, internal code names, regulatory requirements, and customer attestations. Providing hooks for customization while maintaining a "works by default" experience represents the platform's design philosophy.

The team has also developed internal products using Frontier technology, including a data agent that makes OpenAI's data ontology accessible to agents. This tackles the perennial enterprise challenge of defining canonical metrics—what is revenue, what is an active user, how do different teams attribute business outcomes? By encoding semantic layers and business logic in ways agents can understand, the platform enables agents to operate across business functions beyond just coding.

## Current Limitations and Future Directions

Despite extraordinary progress, Ryan identifies clear limitations in current models. Zero-to-one product development—going from a new product idea to a working prototype in a single shot—still requires significant human steering and iteration. Similarly, "gnarly refactorings" where the proper interface boundaries aren't yet clear remain difficult for agents to execute autonomously.

However, these limitations are rapidly shrinking. The team reports that over the course of a month, capabilities expanded from low-complexity tasks to "low complexity and big tasks" in both directions. This trajectory leads Ryan to emphasize not "betting against the model"—the systems and processes built should be robust to continued capability improvements, allowing humans to progressively spend their time on higher-value work.

The team has also learned that while reasoning models like Codex 5.3 and 5.4 are exceptional at complex tasks, there's still an open question about when to use faster, smaller models like Spark. Ryan reports that Spark works well for quick prototyping and documentation updates but can struggle with the same tasks he'd give to full reasoning models, often "blowing through three compactions before writing a line of code." The team continues to explore the right task routing between model tiers.

Looking forward, the vision extends beyond coding agents to agents that understand how businesses operate. This requires context not just about code architecture but about customer segments, revenue definitions, product roadmaps, and even company culture. The team encodes this in core-beliefs.md, including who's on the team, who the customers are, and what the vision is—all context that informs how an agent should build software for that specific organization.

## Cultural and Organizational Implications

The experiment has profound implications for software engineering culture and organization. Ryan describes his role as analogous to a "group tech lead for a 500-person organization"—it's not appropriate to be in the weeds on every PR, but rather to use representative samples to infer where teams struggle and where they need help.

This creates a fundamentally different relationship with code. Ryan reports having "close to zero investment in the actual authorship experience" and being able to "throw away" bad code without emotional attachment. Code becomes disposable in a way it never has been in human-driven development, where individual engineers often feel ownership over the code they write.

The team maintains a 45-minute daily standup—remarkably long for a small team—because they need to synchronize understanding of the current repository state. With agents potentially making dramatic changes overnight without human awareness, this knowledge sharing becomes essential. One engineer discovered a playwright daemon with MCPM CCPs had been replaced with a local daemon exposing a shim CLI—a significant architecture change they had "zero idea" had occurred.

The team even developed skills for generating "deep fried memes" and company culture in Slack, teaching agents to participate in the social aspects of engineering teams. This attention to culture isn't frivolous—it reflects the understanding that agents deployed in enterprises need to understand not just technical requirements but social norms, communication patterns, and organizational dynamics.

## Token Economics and Resource Allocation

The team operates with approximately 1 billion tokens per day in usage, representing roughly $2-3k in daily spend based on market rates and caching assumptions. Ryan characterizes not using at least this volume as "borderline negligent" for teams serious about AI-native development, reflecting a fundamental reframing of resource constraints.

With no internal rate limits at OpenAI, the actual constraint becomes human attention rather than compute resources. This leads to aggressive parallelization—when faced with a problem, the team will "just shoot off four" instances rather than carefully monitoring a single run. Code is so cheap that careful optimization of individual agent runs becomes counterproductive compared to massive parallelization with post-hoc filtering.

This economics also drives the internalization of dependencies. When code generation is essentially free, the cost of maintaining a vendored copy of a library becomes trivial compared to the friction of managing external dependencies, waiting for upstream patches, and ensuring compatibility across transitive dependencies.

## Production Readiness and Real-World Impact

This work represents production LLMOps in the fullest sense—the team is building a real product that will ship to real customers, not a research prototype or demo. The product is an Electron-based application with a cloud-hosted backend, complete with proper release processes including human-approved smoke tests before cutting release branches.

The team maintains production-grade observability and reliability practices. When pages fire, agents can autonomously diagnose issues, implement fixes, and update documentation—all within the same workflow loop. The local development stack mirrors production architecture, giving agents the same tools they'd need to debug and fix issues in live systems.

The autonomous merge process demonstrates production readiness at scale: agents manage thousands of PRs across multiple model generations, handle merge conflicts, retry on flaky tests, and navigate the complete complexity of modern CI/CD pipelines without human intervention. The fact that this works reliably enough for zero pre-merge human review represents a major milestone in LLMOps maturity.

This case study ultimately demonstrates that the future of software engineering may look radically different from today's practices—not because humans become unnecessary, but because their role shifts from writing and reviewing code to building systems, defining requirements, and encoding taste in ways agents can leverage to operate autonomously at unprecedented scale.
