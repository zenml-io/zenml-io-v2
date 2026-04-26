---
title: "Using AI Agents for Codebase Refactoring and Monolith Decomposition"
slug: "using-ai-agents-for-codebase-refactoring-and-monolith-decomposition"
draft: false
llmopsTags:
  - "code-generation"
  - "legacy-system-integration"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "monitoring"
  - "databases"
  - "microservices"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "postgresql"
  - "mysql"
  - "sqlite"
industryTags: "tech"
company: "1Password"
summary: "1Password applied AI agents to refactor their multi-million-line Go monolith (B5) as part of evolving their Unified Access system to support both human and agent-driven workflows. They built an agentic toolchain that combined Go SSA analysis, SQL parsing, and DataDog integration to analyze dependencies, map domain ownership, and determine extraction order for service decomposition. The agents successfully automated a 3,000+ call site migration in hours and provided useful extraction sequencing, but struggled with complex service extraction tasks that required coordination across schema evolution, deployment sequencing, and shared data contracts. The team achieved 20-30% productivity improvements on complex tasks while learning that agents work best when producing deterministic artifacts from well-specified problems, with human oversight remaining critical for sequencing constraints and system boundaries."
link: "https://1password.com/blog/what-we-learned-using-ai-agents-to-refactor-a-monolith"
year: 2026
seo:
  title: "1Password: Using AI Agents for Codebase Refactoring and Monolith Decomposition - ZenML LLMOps Database"
  description: "1Password applied AI agents to refactor their multi-million-line Go monolith (B5) as part of evolving their Unified Access system to support both human and agent-driven workflows. They built an agentic toolchain that combined Go SSA analysis, SQL parsing, and DataDog integration to analyze dependencies, map domain ownership, and determine extraction order for service decomposition. The agents successfully automated a 3,000+ call site migration in hours and provided useful extraction sequencing, but struggled with complex service extraction tasks that required coordination across schema evolution, deployment sequencing, and shared data contracts. The team achieved 20-30% productivity improvements on complex tasks while learning that agents work best when producing deterministic artifacts from well-specified problems, with human oversight remaining critical for sequencing constraints and system boundaries."
  canonical: "https://www.zenml.io/llmops-database/using-ai-agents-for-codebase-refactoring-and-monolith-decomposition"
  ogTitle: "1Password: Using AI Agents for Codebase Refactoring and Monolith Decomposition - ZenML LLMOps Database"
  ogDescription: "1Password applied AI agents to refactor their multi-million-line Go monolith (B5) as part of evolving their Unified Access system to support both human and agent-driven workflows. They built an agentic toolchain that combined Go SSA analysis, SQL parsing, and DataDog integration to analyze dependencies, map domain ownership, and determine extraction order for service decomposition. The agents successfully automated a 3,000+ call site migration in hours and provided useful extraction sequencing, but struggled with complex service extraction tasks that required coordination across schema evolution, deployment sequencing, and shared data contracts. The team achieved 20-30% productivity improvements on complex tasks while learning that agents work best when producing deterministic artifacts from well-specified problems, with human oversight remaining critical for sequencing constraints and system boundaries."
notion:
  pageId: "34ef8dff-2538-8102-8b2b-c8222e33658c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T09:58:10Z"
---

## Overview

1Password undertook an ambitious project to apply AI agents to the refactoring and decomposition of B5, their large-scale Go monolith serving as the foundation for their Unified Access product. This case study provides valuable insights into the practical realities of using agentic AI in production engineering workflows, moving beyond the typical promotional narratives to explore where agents succeed, where they fail, and what operational patterns enable safe deployment in mission-critical systems.

The motivation for this work stemmed from the need to evolve their Unified Access system to better support both human and agent-driven workflows at high request rates and low latency. The existing monolith, while performing well in production for reliability and scale, needed clearer service boundaries and more independent scaling characteristics. Rather than relying purely on traditional engineering approaches, the team decided to experiment with what they termed "agentic refactoring" – using AI agents to analyze, plan, and execute changes across their massive codebase.

## Technical Architecture and Tooling

The team built a sophisticated agentic toolchain that combined multiple data sources to create a comprehensive understanding of their system. At the core of their analysis layer were three primary components working in concert. First, they employed Go SSA (Static Single Assignment) analysis to understand code structure at a deep level, providing visibility into how different parts of the codebase related to each other. Second, they implemented SQL parsing capabilities to identify data dependencies, which proved critical for understanding how database schemas and access patterns created coupling between different parts of the system. Third, they integrated with DataDog through an MCP (Model Context Protocol) integration to incorporate runtime coupling data, bringing real-world production behavior into the analysis.

This combination of static analysis, data dependency mapping, and runtime observability produced several key artifacts: a domain ownership map that clarified which teams and components were responsible for different parts of the system, a coupling graph that visualized dependencies and relationships, and a prioritized extraction order that provided a defensible sequence for decomposing services. An important architectural decision was using agents to build deterministic tooling rather than relying on them for ongoing interpretation. The agents helped write parts of the SSA analyzer, but once built, this analyzer produced reproducible outputs that engineers could reason about as stable artifacts rather than debating what the model believed about the system.

The extraction order produced by this analysis aligned well with what experienced engineers would likely recommend, suggesting starting with Vault (which had its own API, dataset, and security boundary), followed by Billing, then AuthN and AuthZ components, with Identity remaining as the core. A valuable side benefit of this instrumentation work was improved end-to-end transaction visibility in DataDog, demonstrating how investments in AI tooling can yield operational benefits beyond the original use case.

## Execution Patterns and Multi-Agent Coordination

For scaling the actual execution of changes, 1Password employed a parallel multi-agent approach using git worktrees to maintain isolation between concurrent agent operations. This architectural pattern allowed multiple agents to work simultaneously on different parts of the codebase without creating conflicts, but the team learned that parallelism only works effectively when changes are truly independent and isolation has been structurally guaranteed. Without proper isolation, attempting to parallelize agent work merely increases the surface area for inconsistency rather than reducing execution time.

The most successful application of their agentic approach was a database transaction handling migration that required updating over 3,000 call sites. The existing code used `MustBegin` to start database transactions, which panics on failure – acceptable during early development but problematic at production scale where connection timeouts and cancelled request contexts should return clean errors rather than crashing. This task had languished in the backlog precisely because of its scale and repetitive nature.

The execution strategy for this migration demonstrated the operational patterns that proved most effective. The team generated a deterministic manifest of every call site using SSA, classified those sites into a small number of distinct patterns, and defined explicit templates for each pattern. They then wrote a detailed playbook describing exactly how agents should execute the migration, including a comprehensive list of common failure modes and clear instructions on when to stop and escalate to humans rather than attempting to guess at solutions. The actual execution took only hours, with the majority of time invested in building the tooling and writing the specification. This ratio – heavy upfront investment in specification and tooling, followed by rapid automated execution – emerged as a key success pattern.

## Challenges with Complex Service Extraction

When the team moved to more complex service extraction work, they encountered the limitations of current agentic approaches. Even for relatively small services, extraction requires coordinated changes across schema evolution, read and write paths, deployment sequencing, and shared data contracts – interdependent decisions that must happen in the correct order. The agents consistently struggled with sequencing and invariants, making errors that would introduce subtle but critical failures.

Specific examples illustrated the nature of these failures. In one case, an agent attempted to backfill UUID columns before updating the code responsible for inserting new rows, a sequence that would introduce silent data loss even if the underlying system was otherwise well-designed. In other cases, agents treated shared tables as if they were independently owned by the new service, which would have created deployment-time conflicts. These patterns persisted even when the team provided explicit instructions about ordering and constraints, suggesting fundamental limitations in how current language models handle complex dependency chains.

The team identified a recurring behavior they termed "speculation" – when agents lacked sufficient context, they filled gaps with assumptions that appeared locally reasonable but were not verified. One concrete example involved an agent inferring that a particular identifier format was a ULID and propagating that assumption through a series of changes, ultimately requiring rollback of the entire session. This behavior highlights a critical challenge in production LLMOps: non-determinism that is valuable for creative tasks becomes a source of risk when making irreversible changes to production systems.

For this class of complex, coordinated work, the productivity gains were real but modest – approximately 20-30% improvement. The agents provided value but did not eliminate the need for careful human coordination and review, particularly around correctness constraints and sequencing dependencies.

## Key Lessons and Operational Principles

The 1Password team distilled several operational principles from their experience that extend beyond code refactoring to broader questions about deploying AI agents in production systems.

**The bottleneck is not code generation.** Agents proved highly effective at reading code, analyzing structure, and drafting changes. The difficulty emerged in managing sequences of decisions with ordering constraints or changes that are difficult to reverse, such as schema changes, deployment sequencing, and shared state boundaries. System correctness depends on getting these sequences right regardless of how clean the generated code appears.

**Non-determinism requires careful containment.** The inherent non-determinism of language models, while useful for many tasks, becomes a source of risk in production migrations. The successful pattern involved using agents to build deterministic tools (analyzers, manifests, specifications) and then constraining subsequent work to those outputs, creating stable foundations even when the agents themselves are not fully predictable.

**Incomplete specifications lead to implicit ones.** When agents lack sufficient context, they inevitably fill gaps in ways that may be locally reasonable but globally incorrect. The only reliable mitigation is making specifications explicit, including invariants, ordering constraints, and clear escalation paths for anything outside defined patterns. The goal is not to have agents handle every possible case, but to have them execute confidently on well-understood patterns and escalate quickly when encountering ambiguity.

**Coverage should be intentional, not comprehensive.** Rather than attempting to achieve complete automation, teams should focus on clearly defining where automation stops and human judgment takes over. This requires being explicit about boundaries and designing for graceful escalation rather than attempting to handle edge cases through increasingly complex prompting.

## Production Implications and Organizational Impact

The work has broader implications for how 1Password thinks about AI agents as production actors. As the team notes, AI agents represent a new class of actor in systems, introducing non-determinism, persistence, and scale that traditional operational models were not designed to handle. This has consequences not just for engineering workflows but for how access and trust are managed across systems – directly relevant to 1Password's core business in credential and secrets management.

The team is rolling out agentic tooling across their engineering organization with clear understanding of where it provides leverage. They recognize that agents are most effective when problems are well-specified and that deterministic tooling provides the constraints that make safe execution possible. Engineers remain responsible for defining system boundaries, modeling dependencies, and ensuring correct sequencing – the highest leverage activities are not writing code or prompting models, but defining systems in ways that can be executed safely and predictably.

The case study is notable for its candor about limitations alongside successes. The team explicitly acknowledges that they are working on problems – decomposing production systems under live traffic, structuring multi-agent execution – that lack well-established playbooks. They are building operational patterns in real time, and this exploratory work represents where much of the interesting engineering effort is concentrated.

## Critical Assessment

From an LLMOps perspective, this case study demonstrates mature thinking about agent deployment in production contexts. Rather than treating agents as autonomous problem-solvers, 1Password frames them as tools that require careful constraint and orchestration. The emphasis on deterministic artifacts, explicit specifications, and clear escalation paths represents engineering discipline that many organizations attempting to deploy AI agents would benefit from adopting.

The honest discussion of failures and limitations is particularly valuable. The speculation behavior, sequencing errors, and the modest 20-30% productivity gains on complex tasks provide realistic expectations rather than the inflated claims common in vendor marketing. The acknowledgment that agents struggled even with explicit ordering instructions suggests current fundamental limitations in how language models handle complex dependency reasoning.

The architectural pattern of using agents to build deterministic tools that then constrain future work is especially noteworthy. This approach leverages agent capabilities for analysis and code generation while avoiding the risks of unconstrained agent decision-making in production contexts. It represents a pragmatic middle ground between full automation and purely manual work.

The integration of multiple data sources – static analysis, SQL parsing, and runtime observability through DataDog – demonstrates sophisticated systems thinking. This multi-modal approach to understanding codebases is likely more broadly applicable than the specific refactoring tasks described.

One limitation of the case study is that it does not deeply explore model selection, prompting strategies, or iteration cycles – aspects of LLMOps that many practitioners struggle with. The mention of Cursor's pattern of using larger models for planning and smaller models for execution provides a glimpse into these considerations but leaves many operational details unexplored. Similarly, while the team mentions running multiple agents in parallel, the specifics of agent orchestration, state management, and coordination mechanisms are not detailed.

The case study also touches on but does not fully explore the testing and validation strategies used to ensure agent-generated changes met correctness requirements. For a system handling sensitive data at scale, understanding how changes were validated before deployment would provide valuable operational insights.

Overall, this represents a substantive contribution to understanding practical AI agent deployment in production engineering contexts, notable for its balanced assessment and focus on operational realities rather than theoretical capabilities.
