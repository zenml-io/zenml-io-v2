---
title: "Building River: A Slack-Native AI Agent on Durable Infrastructure"
slug: "building-river-a-slack-native-ai-agent-on-durable-infrastructure"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "system-prompts"
  - "human-in-the-loop"
  - "postgresql"
  - "docker"
  - "kubernetes"
  - "cicd"
  - "monitoring"
  - "orchestration"
  - "devops"
  - "microservices"
  - "open-source"
  - "documentation"
  - "anthropic"
industryTags: "e-commerce"
company: "Shopify"
summary: "Shopify built River, an AI agent that operates within their company Slack to assist with code review, testing, data queries, and pull request creation. The problem was enabling AI-assisted development at scale across a fragmented codebase with inconsistent tooling. Their solution involved consolidating to a monorepo called \"World,\" adopting Nix for reproducible environments, and building Aquifer—a platform for durable, multiplayer agent sessions. Results show that one in eight merged pull requests is now coauthored by River, with nearly 60,000 sessions across 5,170 Slack channels and 3,536 River-coauthored pull requests merged in a recent 30-day period, affecting over 7,000 employees."
link: "https://shopify.engineering/under-the-river"
year: 2026
seo:
  title: "Shopify: Building River: A Slack-Native AI Agent on Durable Infrastructure - ZenML LLMOps Database"
  description: "Shopify built River, an AI agent that operates within their company Slack to assist with code review, testing, data queries, and pull request creation. The problem was enabling AI-assisted development at scale across a fragmented codebase with inconsistent tooling. Their solution involved consolidating to a monorepo called \"World,\" adopting Nix for reproducible environments, and building Aquifer—a platform for durable, multiplayer agent sessions. Results show that one in eight merged pull requests is now coauthored by River, with nearly 60,000 sessions across 5,170 Slack channels and 3,536 River-coauthored pull requests merged in a recent 30-day period, affecting over 7,000 employees."
  canonical: "https://www.zenml.io/llmops-database/building-river-a-slack-native-ai-agent-on-durable-infrastructure"
  ogTitle: "Shopify: Building River: A Slack-Native AI Agent on Durable Infrastructure - ZenML LLMOps Database"
  ogDescription: "Shopify built River, an AI agent that operates within their company Slack to assist with code review, testing, data queries, and pull request creation. The problem was enabling AI-assisted development at scale across a fragmented codebase with inconsistent tooling. Their solution involved consolidating to a monorepo called \"World,\" adopting Nix for reproducible environments, and building Aquifer—a platform for durable, multiplayer agent sessions. Results show that one in eight merged pull requests is now coauthored by River, with nearly 60,000 sessions across 5,170 Slack channels and 3,536 River-coauthored pull requests merged in a recent 30-day period, affecting over 7,000 employees."
notion:
  pageId: "397f8dff-2538-803d-9235-c21521303d5d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:02:00.000Z"
  lastEditedTime: "2026-07-08T20:02:00.000Z"
  publishedAt: "2026-07-08T20:11:04Z"
---

## Overview and Context

Shopify developed River, a Slack-native AI coding agent that has become deeply integrated into their engineering workflow. This case study is particularly notable because it documents not just the surface-level agent interface, but the substantial infrastructure platform (called Aquifer) built underneath to support durable, multiplayer AI agent sessions at scale. The article was published in May 2026 and reflects work that began in early 2024 with foundational infrastructure decisions.

The case study reveals how Shopify made a strategic bet in early 2024: "Code is going to be increasingly written with AI, and our infrastructure needs to be the substrate for that." This bet drove two major infrastructure decisions that initially seemed unrelated to AI but proved essential: consolidating to a monorepo architecture and standardizing on Nix for reproducible environments. The article frames River as both a teaching tool and a production system, with the provocative claim that "one in eight merged pull requests across Shopify is coauthored by it."

## The Infrastructure Foundation: World and Nix

Before River could exist, Shopify had to address fundamental infrastructure challenges. They operated with many separate repositories, bespoke development environments, and slow feedback loops—friction that had become normalized over time. The company made two critical decisions in early 2024:

**Monorepo Consolidation ("World")**: Shopify consolidated all their code into a single repository called World. This was explicitly not a popular decision internally and caused significant pain. The migration broke existing CI systems, requiring them to scale by an order of magnitude almost overnight. Merge queues became critical infrastructure, the build cache became a product in itself, and test infrastructure needed rebuilding around the assumption that any change might recompile large portions of the dependency graph. The article is candid about this being "the unsexy part of the story" involving undoing "dozens of scattered team-level assumptions... one by one."

**Nix Adoption**: Alongside the monorepo, Shopify standardized on Nix for building development environments, CI pipelines, and production images. This provided reproducibility across all stages of development and deployment—the same Nix-built environments work in local development, CI, and production.

The payoff from these infrastructure changes proved essential for AI agents: agents at the root of the repo can navigate cross-zone, skills (written-down knowledge as files) can be loaded into agent sessions on demand, "ask the repo a question" becomes a viable interface, cross-Shopify navigation works seamlessly (from production log lines back to the causing commit), and everything is reproducible.

## Key Insight: Agent-Friendly Equals Human-Friendly

One of the most important observations in the case study is that "every change we made for agents was also the right thing for humans." The requirements for making a codebase legible to an agent are identical to the technical debt owed to human engineers:

- If dev environments aren't reproducible, agents can't reproduce anything either
- If the repository is fragmented, agents can't see across it
- If processes and knowledge aren't written down, neither humans nor agents can learn them

The article argues that "agents make that debt visible" and that addressing these issues results in "happier engineers." This framing positions LLMOps infrastructure work not as a separate concern but as accelerated technical debt paydown that benefits both human and AI developers.

## River's Design: Multiplayer by Default

River is designed as a Slack-based agent with one crucial constraint: it only works in public channels, never in direct messages. Users interact with River by mentioning @river in a public Slack channel. The agent can read code, run tests, open pull requests, query the data warehouse, examine production traces, and even push back on plans it considers problematic. The median session length is 19 minutes with a median of 50 tool calls per session.

The public-only design is deliberate and central to River's value proposition. Every conversation becomes a searchable public transcript. The article describes a typical successful interaction pattern:

- A person @-mentions River with a question
- River begins working: reading files, running queries, posting partial findings
- A second human, drawn by the channel link or a ping, adds constraints or redirection
- River incorporates the new context without losing conversation state and continues
- The thread becomes searchable and reproducible; the next person with a similar problem starts from this thread rather than from scratch

This design addresses what the article identifies as "the ceiling" of local agents: when every engineer has their own private agent running on their laptop, terminal, or editor, "the clever way you investigated a flaky test yesterday is a private artifact and it dies with your session." None of these private agents learn from each other. The article quotes Tobi Lütke: "If every interaction with an agent happens in a private window, the only person who learns anything is the person at the keyboard."

## Production Scale and Impact

The usage metrics provided are substantial. In a recent 30-day period:

- 59,918 River sessions occurred
- 5,170 Slack channels involved
- 7,000+ people inside the company participated (1,200 more than when initially announced)
- 3,536 River-coauthored pull requests merged

These numbers come from River's own instrumentation—River writes to a domain table called `river_sessions` after every session. The article notes these numbers are "already wrong, in the upward direction" given the ongoing rollout.

Beyond River specifically, other teams wanted similar capabilities: PR review agents, research agents, migration agents, compliance scans, performance investigations, and various other use cases. All represented "variants of the same idea: agentic workflow against the monorepo, in Slack, durable, multiplayer." This demand drove the need for a generalizable platform rather than a one-off implementation.

## The Aquifer Platform Architecture

Aquifer is Shopify's internal platform for running AI agents, providing the substrate for River and future agent products. The core design principle is simple but crucial: **the session must survive**. Processes die, sandboxes die, machines die—but the conversation doesn't. This mirrors how Slack threads outlive the servers that handled them.

The architecture decomposes into three primary components:

**Session**: This is the durable identity with an append-only event log backed by Postgres. The session is the canonical truth about what has happened in a conversation so far. It persists across all process restarts and infrastructure failures.

**Harness**: This is the agent loop that reads history, calls the model, and emits tool intents. The harness is cheap to recreate and disposable. It exists outside the sandbox and can be replaced without affecting the work in progress.

**Sandbox**: This is where code actually runs—filesystem, shell, the repo, with tools like bash, edit, build, and test available. Sandboxes are disposable, sometimes warm-started but often fresh.

The critical architectural decision is that "the harness lives outside the sandbox. The agent doesn't live where the code lives." This separation yields three essential properties that "you can't get any of them otherwise":

- **Safety**: The agent loop isn't in the same blast radius as destructive commands like `rm -rf`
- **Replaceability**: Models, runtimes, even programming languages can be swapped on the harness side without disturbing the sandbox
- **Observability**: The entire decision stream is on the harness side, visible to a single observability system

The article references Anthropic's April 2026 essay "Scaling Managed Agents" which articulated the principle "Decouple the brain from the hands." Shopify was already converging on this architecture but found the external validation helpful. They acknowledge "the shape of long-running agents is being figured out by several groups in parallel."

## Session Cells and Execution Model

When a session becomes active, Aquifer materializes a "session cell"—an ephemeral process on a host running the Go runtime and the agent harness in the same process group. If the session goes idle, the cell exits. On the next interaction, a fresh cell starts, possibly on a different host. But the session identity remains unchanged, and the conversation history is fully available because it lives in Postgres, not in memory.

This is "cattle, not pets, at the session level." Individual processes aren't nursed; they're provisioned, run, suspended, destroyed, and re-provisioned cheaply. The article notes they're often asked which orchestrator they use, but emphasizes "the answer matters less than the principle: pick the end-to-end substrate, and refuse to compromise on cattle-not-pets at the session level."

## Profiles: One Platform, Multiple Agents

River is one "profile" on top of Aquifer. A profile is data: a system prompt, a set of skills, a set of extensions, a sandbox policy, and model defaults. Profiles are built with Nix and shipped as bundles. Adding a new agent product means adding a bundle, not building a new platform. This is positioned as a key unlock: "The cost of the next River-shaped thing is no longer a new platform, it's just a profile."

Other profiles mentioned include PR review agents and "Vanilla," described as a headless "pi" agent. The same infrastructure supports three distinct usage modes:

- **Interactive Mode**: River itself—durable session, live human participant, long-lived conversations
- **Automation Mode**: PR review and similar—durable session, woken by external systems, often no human in the loop
- **Job Mode**: CI and batch processing—ephemeral sessions where you provision, run, stream results, and destroy, reusing the sandbox plane with optional session logs

All three modes use the same session model, sandbox plane, and gateway. The article notes that "every time we tried a different architecture, we found ourselves re-inventing one of these three modes," suggesting this decomposition reflects fundamental requirements rather than arbitrary choices.

## Skills and Knowledge Accumulation

World (the monorepo) contains more than just code. It also contains skills, conventions, intent documents, runbooks, `AGENTS.md` files, and written-down zone knowledge. The article describes this as "an intelligence layer, accumulating and compounding." When someone solves a problem with River, they leave behind memory: "a pebble, a skill update, an `AGENTS.md` diff, sometimes a whole new shared skill." Subsequent sessions use this accumulated knowledge.

The article frames this as River not just using World but making World "a living system"—River is "the animating spark." The substrate matters because it needs to "host that spark for many agents, workflows, and years." The corpus of public Slack threads, skills, and documentation becomes the compounding asset. They mine this corpus, feeding patterns back into River's skills, prompts, and defaults. "The agent gets smarter without requiring model retraining. The codebase teaches the agent. The agent teaches the codebase. All of this teaches us."

## Critical Assessment and Claims

The article makes strong claims, particularly the assertion that one in eight merged PRs is coauthored by River. While impressive if accurate, the case study is written in a promotional style typical of engineering blog posts. The authors acknowledge River is co-authoring the article itself ("Co-authored by River"), which raises questions about self-promotion.

Several aspects warrant balanced consideration:

**Pain Points Acknowledged**: The article is reasonably candid about the difficulty of the infrastructure migration—broken CI, order-of-magnitude scaling challenges, team-level assumption breakage. This honesty about "unsexy" infrastructure work adds credibility.

**Missing Details**: The case study doesn't discuss model selection, prompt engineering specifics, cost management, error rates, failure modes, or quality control mechanisms. There's no discussion of how they handle hallucinations, incorrect code suggestions, or security concerns beyond the sandbox safety architecture.

**Metrics Context**: While the raw numbers (60k sessions, 3.5k merged PRs in 30 days) are provided, there's no baseline for comparison. What percentage of total PRs is 3,536? How many PRs were merged before River? What's the quality differential?

**Generalizability**: Shopify's scale, resources, and specific context (e-commerce platform, large engineering organization) may not translate to other organizations. The monorepo and Nix investments required substantial resources and created "real breaks."

## Takeaways and Principles

The article concludes with three priorities for organizations building agent infrastructure:

**Decouple the brain from the hands**: The harness should not live in the sandbox. Committing to this boundary makes safety, replaceability, and observability inherent rather than trade-offs. "You will not be able to retrofit it."

**Make agents multiplayer by construction**: "A private agent has a ceiling: the person at the keyboard. A public agent teaches every session that comes after it." The corpus becomes the compounding asset; privacy is framed as a disadvantage.

**Treat the next agent as a profile, not a platform**: The cost of a new agent product should be a new bundle on the same substrate. "If your second agent forces a second platform, you haven't built the substrate yet."

The philosophical framing is notable: "Two years from now, the agent will not be the interesting part. What's underneath it will be." This positions durable agent infrastructure as foundational tooling similar to CI/CD systems—essential substrate that enables higher-level products.

## Production Considerations and LLMOps Maturity

From an LLMOps perspective, this case study represents relatively mature thinking about production AI agent systems. Key production considerations evident in the architecture:

**Durability and State Management**: Using Postgres for durable session state with append-only event logs provides auditability and recovery. The separation of ephemeral compute (harness, sandbox) from durable state (session) enables graceful degradation and recovery.

**Observability**: Centralizing the decision stream on the harness side, outside the sandbox, provides a single point for observability instrumentation. The session-level logging to `river_sessions` enables usage analytics.

**Safety and Isolation**: Sandbox isolation protects against destructive commands while allowing the agent to perform real work. The separation of brain and hands provides defense in depth.

**Scalability**: The cattle-not-pets approach to session cells, combined with the ability to cold-start sessions on any host, provides horizontal scalability. The use of an orchestration layer (details not specified) allows dynamic resource allocation.

**Reusability**: The profile-based architecture enables code reuse across different agent products without duplicating infrastructure.

**Knowledge Management**: The integration with the monorepo and explicit support for skills, `AGENTS.md` files, and documentation treats knowledge as a first-class concern, addressing the problem of context injection at scale.

What's notably absent from the discussion: model versioning strategies, A/B testing infrastructure, cost monitoring and optimization, quality metrics beyond PR merge counts, feedback loops for model improvement, and handling of model provider outages or rate limits. These may exist but aren't discussed in this article.

The case study ultimately presents a vision of AI agents as infrastructure—durable, multiplayer, observable, and composable—rather than as experimental tools or productivity helpers. Whether this vision fully delivers on its promises remains to be validated over time, but the architectural principles appear sound and the scale of adoption within Shopify suggests meaningful production value.
