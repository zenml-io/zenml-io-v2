---
title: "AI-Powered Code Maintenance and Migration at Scale"
slug: "ai-powered-code-maintenance-and-migration-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "agent-based"
  - "harness-engineering"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "kubernetes"
  - "cicd"
  - "orchestration"
  - "monitoring"
  - "langchain"
  - "fastapi"
  - "docker"
  - "microservices"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "google-gcp"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify, a music streaming company with nearly 3,000 engineers and 4,500 daily deployments, faced challenges with exponential codebase growth (seven times faster than engineer headcount) and time-consuming manual migrations across thousands of components. They developed Honk, an LLM-based automated code migration tool built on Claude's Agent SDK and integrated with their Fleet Shift infrastructure, enabling them to complete complex migrations in days rather than months. The adoption of AI coding tools reached 99% of engineers, with 94% reporting increased productivity and a 76% increase in PR frequency, while their automated maintenance system has merged 2.5 million PRs to date. The company's approach emphasizes codebase standardization, strong verification tooling, and strategic use of static analysis to guide AI agents toward consistent patterns."
link: "https://www.youtube.com/watch?v=zFslvuvYifQ"
year: 2026
seo:
  title: "Spotify: AI-Powered Code Maintenance and Migration at Scale - ZenML LLMOps Database"
  description: "Spotify, a music streaming company with nearly 3,000 engineers and 4,500 daily deployments, faced challenges with exponential codebase growth (seven times faster than engineer headcount) and time-consuming manual migrations across thousands of components. They developed Honk, an LLM-based automated code migration tool built on Claude's Agent SDK and integrated with their Fleet Shift infrastructure, enabling them to complete complex migrations in days rather than months. The adoption of AI coding tools reached 99% of engineers, with 94% reporting increased productivity and a 76% increase in PR frequency, while their automated maintenance system has merged 2.5 million PRs to date. The company's approach emphasizes codebase standardization, strong verification tooling, and strategic use of static analysis to guide AI agents toward consistent patterns."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-code-maintenance-and-migration-at-scale"
  ogTitle: "Spotify: AI-Powered Code Maintenance and Migration at Scale - ZenML LLMOps Database"
  ogDescription: "Spotify, a music streaming company with nearly 3,000 engineers and 4,500 daily deployments, faced challenges with exponential codebase growth (seven times faster than engineer headcount) and time-consuming manual migrations across thousands of components. They developed Honk, an LLM-based automated code migration tool built on Claude's Agent SDK and integrated with their Fleet Shift infrastructure, enabling them to complete complex migrations in days rather than months. The adoption of AI coding tools reached 99% of engineers, with 94% reporting increased productivity and a 76% increase in PR frequency, while their automated maintenance system has merged 2.5 million PRs to date. The company's approach emphasizes codebase standardization, strong verification tooling, and strategic use of static analysis to guide AI agents toward consistent patterns."
notion:
  pageId: "366f8dff-2538-8062-aa7f-f093b94a4756"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-20T15:41:00.000Z"
  lastEditedTime: "2026-08-10T12:27:00.000Z"
  publishedAt: "2026-08-10T12:34:23Z"
---

## Overview

Spotify's AI transformation represents one of the most comprehensive LLMOps implementations in production engineering environments. The company operates at significant scale with nearly 3,000 engineers, deploying approximately 4,500 changes to production daily. Their codebase includes a 40-million-line backend monorepo alongside thousands of smaller polyrepos, creating substantial challenges around maintenance, consistency, and velocity. The central problem Spotify faced was that their production codebase was growing seven times faster than their engineering headcount, forcing developers to spend increasing amounts of time on maintenance rather than building new features. This maintenance burden, particularly around migrations and upgrades, was consistently the top frustration point for developers.

The company's journey into LLMOps builds on years of investment in automation infrastructure, particularly their Fleet Shift system for automated code changes. While this pre-AI system successfully handled simple changes like configuration updates and dependency bumps, it struggled with more complex transformations that required understanding code semantics. The arrival of LLMs provided an opportunity to address this gap, though initial experiments revealed that both the models and their approaches needed significant iteration before becoming production-viable.

## Adoption Metrics and Impact

Spotify has achieved remarkable adoption rates for AI coding tools. More than 99% of their engineers now use AI coding tools weekly, which represents an unprecedented adoption curve compared to any other developer productivity tool the company has rolled out. In their most recent engineering survey, 94% of engineers reported that AI tooling has helped them become more productive, accompanied by record-high self-assessed productivity scores.

The quantitative impact is equally striking. Spotify has observed a 76% increase in PR frequency, with this metric continuing to grow. The inflection point for this growth was clearly identifiable: it occurred around the Claude Opus 4.5 release in November of the previous year. Prior to this, PR frequency had been growing slowly over time, but the introduction of more capable models created a dramatic acceleration. Today, the vast majority of PRs shipped at Spotify are co-authored by an AI agent working with a developer, fundamentally changing the composition of work being submitted to production.

However, this productivity increase comes with tradeoffs. The 76% increase in PR frequency means 76% more PRs requiring review, and developer feedback indicates that review burden is becoming a significant challenge. This is forcing the company to rethink where human judgment should be applied, leading them to auto-approve certain categories of PRs deemed safe enough to merge without human review while focusing human attention on changes where judgment is most critical.

## Honk: Core AI-Powered Migration System

The centerpiece of Spotify's LLMOps infrastructure is Honk, a tool that evolved through numerous iterations of attempting to use LLMs for code modifications. The tool emerged from the recognition that deterministic scripts for code migrations became unmanageably complex when dealing with the enormous API surface area of real-world code. This complexity is captured by Hyrum's Law, which states that with enough users of an API, every observable behavior will be depended upon by somebody, forcing migration scripts to handle every possible corner case across millions of lines of code.

Honk uses Claude as its underlying LLM, specifically wrapping the Agent SDK inside a custom harness that runs in Kubernetes pods. This architecture allows Spotify to schedule many concurrent Honk instances in their cloud environment, enabling parallelized migrations across their vast repository landscape. The tool has access to a set of trusted tools, particularly verification tools that can run builds in Spotify's CI environment. This verification capability is critical because Spotify needs to ensure code works across multiple operating systems that their clients support.

The integration between Honk and Fleet Shift represents a sophisticated division of labor in their LLMOps architecture. Fleet Shift handles the orchestration and scheduling of changes across thousands of repositories, while Honk performs the actual code modifications. This separation allows Fleet Shift to maintain its role as the control plane for large-scale changes while delegating the semantic understanding required for code transformation to the LLM-powered Honk system.

The practical impact of Honk has been transformative. Migrations that previously required hundreds of teams working for weeks or months can now be completed by a single engineer in a few days. Their most recent Java migration, affecting their Java-based backend infrastructure, was completed in just three days using these tools. This represents at least an order of magnitude improvement in velocity for this critical category of engineering work.

Spotify has commercialized Honk by making it available as a product through their Backstage developer portal, allowing other companies to leverage the same migration automation capabilities. This commercialization also serves as validation that the approach has reached production maturity and is not merely an internal experiment.

## Honk v2 and Interactive Agent Collaboration

The evolution of Honk illustrates how LLMOps systems mature from batch automation toward more interactive collaboration patterns. Developers at Spotify quickly discovered they could invoke Honk through Slack, similar to how they might interact with Claude or other conversational AI tools. This organic usage pattern led to Slack-based invocation becoming a common way to trigger Honk for ad-hoc tasks, with developers mentioning Honk in Slack conversations and receiving PR results back.

Recognizing these emergent use cases, Spotify developed Honk v2, which was released during their Hack Week. Despite the version number suggesting only a second major release, Honk v2 is actually approximately the eighth iteration of the tool, indicating the company's willingness to iterate rapidly rather than maintain strict semantic versioning.

Honk v2 introduces several capabilities that shift the tool from pure automation toward collaborative development. It integrates with Chirp, Spotify's agent orchestration tool analogous to Claude agents or AgentDeck but with additional features tailored to their infrastructure. Chirp enables scheduling many agent sessions simultaneously and coordinating their execution, with Honk now operating as a specialized agent within this broader orchestration framework.

The most novel aspect of Honk v2 is its multiplayer features. Developers can now collaborate on shared agent sessions, similar to how Google Docs enables real-time document collaboration. Multiple developers can observe the agent's work, provide feedback, and contribute ideas within the same session. These sessions can be grouped into larger projects, allowing teams working on new features or products to maintain a shared context with multiple Honk sessions contributing to a common goal. The system is accessible from any device, supporting developers working from different locations and contexts.

These multiplayer capabilities represent a significant conceptual shift in how AI agents participate in software development. Rather than viewing agents as tools used by individual developers in isolation, Spotify is exploring how agents can facilitate team collaboration and become participants in collective engineering efforts.

## Codebase Optimization for Agent Effectiveness

A critical insight in Spotify's approach is recognizing that LLM effectiveness in production codebases is not solely a function of model capability but also of codebase characteristics. Spotify has maintained a longstanding philosophy, predating the speaker's 15-year tenure at the company, that using fewer technologies enables faster development. This philosophy rests on several premises: deep expertise in a smaller set of technologies enables building better systems; eliminating technology choices reduces decision paralysis for teams; and consistency across codebases facilitates collaboration when developers work across team boundaries or when components need to be transferred between teams.

This standardization philosophy has proven equally valuable for AI agents. When codebases exhibit high consistency in technology choices, design patterns, and code structure, LLMs perform measurably better. Spotify has empirically observed that Claude produces higher-quality code in their more standardized codebases compared to more fragmented ones, where the model struggles with the heterogeneity of patterns and approaches.

The foundation for this standardization is Backstage, Spotify's open-source developer portal. Prior to Backstage, Spotify developers navigated approximately 100 different tools for various aspects of their work, including separate interfaces for deployments, CI, A/B testing, and other functions. This fragmentation created confusion and resulted in individually poor tool experiences. Backstage consolidated these into a single pane of glass, initially starting with a software catalog to solve the basic problem of identifying component owners during incidents.

Over time, Backstage evolved into the primary interface for all developer actions related to software components. For AI agents, this centralization is equally valuable. Spotify exposes Backstage capabilities as MCPs (Model Context Protocol tools) and command-line tools that Claude can invoke. This allows agents to look up component owners, send messages to teams via Slack, and perform other organizational actions that require understanding Spotify's software landscape.

Spotify drives standardization through two key mechanisms. Their technology radar categorizes all technologies with recommendations about whether they should be adopted, maintained, or phased out. More specifically, their Golden State definitions specify recommended technologies and practices for particular component types, such as specific types of backend services or iOS views. Developers can self-assess their components against these standards through Soundcheck, a Backstage UI that presents compliance requirements like defining valid component owners.

These standards are enforced not just through documentation but through static analysis and linting integrated directly into the development workflow. When Claude writes code in Spotify's codebase, it receives immediate feedback from lint systems if it uses technologies or patterns that don't align with Spotify's standards. The speaker specifically notes observing Claude encounter these lint checks and self-correct, demonstrating that tight feedback loops enable agents to learn and conform to organizational standards within a single session.

## Verification and Testing Infrastructure

Verification is identified as absolutely critical to making agents autonomous and producing high-quality solutions. Spotify's verification infrastructure predates their AI adoption, built to support their Fleet Shift automation system, but it has become even more essential in the LLM era. The ability for agents to invoke tests and builds is what enables them to validate their own work and iterate toward correct solutions without constant human intervention.

Honk's verification tools allow it to run builds in Spotify's CI environment, which is particularly important given that Spotify's clients run on multiple operating systems. The agent can verify that code changes work correctly across this matrix of execution environments, catching platform-specific issues that might not be apparent from code inspection alone. This verification happens as part of the agent's execution loop, allowing it to detect failures and attempt corrections before presenting results to human developers.

The pre-existing investment in comprehensive testing and instrumentation has proven to be a force multiplier for AI effectiveness. Codebases with strong test coverage and clear success criteria allow agents to operate more autonomously because they have concrete signals about whether their changes are correct. This reduces the need for human oversight on every change and enables Spotify's strategy of auto-merging certain categories of PRs without human review.

## Automated Maintenance at Scale

Beyond Honk, Spotify's broader Fleet Shift infrastructure represents a mature approach to automated code maintenance. To date, the system has merged 2.5 million automated maintenance PRs, representing work that human developers did not need to perform. The vast majority of these changes have been auto-merged with no human in the loop, with automation creating the PR, validating its safety, and merging it to production entirely autonomously. This happens continuously, with thousands of these PRs shipped daily.

This scale of automation was developed primarily for simpler changes that could be handled with deterministic scripts, such as configuration changes and dependency version bumps. The addition of LLM-powered Honk extends this automation to more complex semantic changes that require understanding code context and intent, such as API replacements and refactorings that involve understanding calling patterns.

The success of this automation program represents a solution to what was previously the top developer frustration at Spotify: the burden of migrations and upgrades. By moving this work from individual teams each handling their own components to a centralized automation system, Spotify has eliminated months of developer time spent on undifferentiated maintenance work.

## Organizational and Process Adaptations

Spotify's LLMOps journey extends beyond tooling to encompass significant organizational learning and process adaptation. The company heavily instruments their developer experience, tracking metrics across their infrastructure, PRs, and development workflows. This measurement discipline enables them to quantify impact and identify emerging bottlenecks, with many of the statistics presented coming from this instrumentation infrastructure.

A key insight is that coding is increasingly less of a bottleneck in product development. Previously, implementing features was one of the main constraints on Spotify's ability to ship products, both for early-stage validation prototypes and for production features. This constraint is now loosening, though not entirely eliminated. For validation, Spotify had far more product ideas than capacity to build prototypes for testing. Prototyping required convincing developers to build something, making it expensive in time and resources.

With Claude and agent capabilities, anyone at Spotify can now prototype features in their actual production codebase. Through specialized skills and infrastructure, a non-technical employee can prompt Claude to build a feature in Spotify's client monorepo, receiving back an installable app to test on their device and share with others within the company. This has compressed prototyping timelines from days or weeks to literal minutes, with even Spotify's CEOs building prototypes for their ideas.

However, as coding constraints lift, bottlenecks shift to other aspects of product development, particularly areas requiring human decision-making. Decisions about what to ship to users and which ideas to explore were previously constrained by limited development capacity, so teams didn't need to make these decisions as frequently. With increased development velocity, the cadence and effectiveness of decision-making becomes the limiting factor.

Spotify is actively experimenting with different approaches to planning work and making product decisions in this new environment, acknowledging that they're still learning. The expectation is that within six months their product development process will look fundamentally different from historical approaches, adapted to a world where development velocity has dramatically increased.

The human review challenge is another area requiring organizational adaptation. With 76% more PRs to review, developers report being overwhelmed by review volume. Spotify is addressing this by being strategic about where human judgment is applied, auto-approving certain low-risk PR categories while focusing human attention on high-stakes changes. This represents a shift from reviewing all changes to risk-based sampling and review.

## Technical Architecture Considerations

Several architectural decisions are notable in Spotify's LLMOps implementation. Running Honk in Kubernetes pods provides scalability and resource isolation, allowing many concurrent migration jobs without interfering with each other or with production services. The use of the Agent SDK rather than raw API calls suggests a preference for higher-level abstractions that handle agent execution patterns, though Spotify wraps this in their own harness to integrate with their specific infrastructure.

The MCP integration for exposing Backstage capabilities demonstrates adoption of emerging standards for tool use by LLMs. This standardization likely simplifies the interface between their agents and organizational systems while making it easier to swap underlying models if needed.

The integration with Slack for ad-hoc agent invocation reflects an important pattern in LLMOps: meeting developers where they already work rather than requiring them to adopt entirely new interfaces. This organic usage pattern emerged from developers themselves, rather than being designed top-down, suggesting that successful LLMOps systems may benefit from flexibility that allows emergent workflows.

## Critical Assessment and Limitations

While the results Spotify reports are impressive, several aspects warrant balanced consideration. The 76% increase in PR frequency is presented as a pure productivity win, but this assumes that more PRs directly correlates with more value delivered. There's a risk that increased velocity in code changes might not translate linearly to user value if other constraints dominate or if code quality degrades.

The developer frustration around review burden is acknowledged but perhaps understated. Auto-merging certain PR categories addresses volume but introduces risk. The criteria for what can be safely auto-merged versus what requires human review is critical but not detailed in the presentation. There's an inherent tension between velocity and safety that may become more apparent as the approach scales.

The emphasis on codebase standardization as an enabler for AI effectiveness is well-founded, but it also represents a significant organizational investment that predated their AI adoption. Companies without this foundation cannot immediately replicate Spotify's results, and the presentation doesn't fully address how organizations with more heterogeneous codebases should approach the problem.

The commercial offering of Honk through Backstage raises questions about whether the tool's effectiveness is tightly coupled to Spotify's specific infrastructure and practices. Organizations that don't use Backstage or don't have similar CI infrastructure might find the tool less immediately applicable.

Finally, the organizational changes around decision-making and planning are described as ongoing experiments without clear outcomes yet. This honest acknowledgment is valuable, but it highlights that the productivity gains in coding don't automatically solve product development challenges holistically. There may be difficult organizational transformations ahead as companies adjust to AI-amplified development velocity.
