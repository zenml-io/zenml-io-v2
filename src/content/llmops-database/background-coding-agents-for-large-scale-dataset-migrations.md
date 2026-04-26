---
title: "Background Coding Agents for Large-Scale Dataset Migrations"
slug: "background-coding-agents-for-large-scale-dataset-migrations"
draft: false
llmopsTags:
  - "code-generation"
  - "data-cleaning"
  - "data-integration"
  - "legacy-system-integration"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "human-in-the-loop"
  - "cicd"
  - "continuous-integration"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "anthropic"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify faced the challenge of migrating approximately 1,800 direct downstream data pipelines across multiple frameworks to accommodate deprecated user datasets—work that would have required an estimated 10 engineering weeks manually. The company deployed their internal background coding agent \"Honk\" (built on Claude) in conjunction with their Backstage developer platform and Fleet Management tools to automate the migration process. The solution successfully generated 240 automated migration pull requests, particularly for standardized frameworks like BigQuery Runner and dbt, though it encountered challenges with less standardized frameworks like Scio and revealed the importance of comprehensive context engineering and automated testing infrastructure for successful agent-driven migrations."
link: "https://engineering.atspotify.com/2026/4/background-coding-agents-dataset-migrations-honk-part-4"
year: 2026
seo:
  title: "Spotify: Background Coding Agents for Large-Scale Dataset Migrations - ZenML LLMOps Database"
  description: "Spotify faced the challenge of migrating approximately 1,800 direct downstream data pipelines across multiple frameworks to accommodate deprecated user datasets—work that would have required an estimated 10 engineering weeks manually. The company deployed their internal background coding agent \"Honk\" (built on Claude) in conjunction with their Backstage developer platform and Fleet Management tools to automate the migration process. The solution successfully generated 240 automated migration pull requests, particularly for standardized frameworks like BigQuery Runner and dbt, though it encountered challenges with less standardized frameworks like Scio and revealed the importance of comprehensive context engineering and automated testing infrastructure for successful agent-driven migrations."
  canonical: "https://www.zenml.io/llmops-database/background-coding-agents-for-large-scale-dataset-migrations"
  ogTitle: "Spotify: Background Coding Agents for Large-Scale Dataset Migrations - ZenML LLMOps Database"
  ogDescription: "Spotify faced the challenge of migrating approximately 1,800 direct downstream data pipelines across multiple frameworks to accommodate deprecated user datasets—work that would have required an estimated 10 engineering weeks manually. The company deployed their internal background coding agent \"Honk\" (built on Claude) in conjunction with their Backstage developer platform and Fleet Management tools to automate the migration process. The solution successfully generated 240 automated migration pull requests, particularly for standardized frameworks like BigQuery Runner and dbt, though it encountered challenges with less standardized frameworks like Scio and revealed the importance of comprehensive context engineering and automated testing infrastructure for successful agent-driven migrations."
notion:
  pageId: "34ef8dff-2538-8164-b76a-fa4246074f34"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:02:13Z"
---

## Overview

This case study examines Spotify's deployment of "Honk," their internal background coding agent built on Claude (from Anthropic), to automate large-scale dataset migrations across their data infrastructure. As part 4 in Spotify's series on background coding agents, this piece focuses specifically on how LLMs in production were used to handle the deprecation of two heavily-used user datasets affecting approximately 1,800 direct downstream data pipelines and several thousand more indirectly. The migration needed to be completed within six months and would have consumed an estimated 10 engineering weeks of manual effort.

The deployment represents a practical application of LLMs in production for software maintenance at enterprise scale, integrating agent-based code generation with existing developer tooling (Backstage, Fleet Management) to tackle repetitive engineering work. However, the case study is also notably transparent about limitations encountered and lessons learned, particularly around the importance of standardization and testing infrastructure for successful agent deployment.

## Technical Architecture and Integration

Honk operates as a background coding agent that integrates with Spotify's existing developer platform infrastructure. The system works in conjunction with Backstage (Spotify's open-source developer portal) and their Fleet Management tools, particularly the Fleetshift plugin designed for orchestrating migrations across multiple repositories.

The workflow begins with Backstage's endpoint lineage and Codesearch plugins, which provided visibility into dataset dependencies across Spotify's GitHub Enterprise landscape. The endpoint lineage feature displayed all downstream consumers of deprecated datasets, giving immediate insight into migration scope. Codesearch enabled query-based identification of target repositories that would need code changes. The Fleetshift plugin then orchestrated the actual migration process across the identified repositories, providing a centralized UI for monitoring progress, viewing automated pull requests, and facilitating communication with repository owners.

At the time of these migrations, Honk had intentional design constraints: it did not have access to Claude skills (like Model Context Protocol/MCP tools) or custom configurability during execution. This was a deliberate guardrailing decision to establish boundaries around possible outcomes during migrations. The agent could not, for instance, dynamically fetch dataset schemas or read external documentation beyond what was provided in its context. This placed significant emphasis on upfront context engineering.

## Context Engineering as a Critical LLMOps Challenge

The case study identifies context engineering as "the part of the build that took the most time and iteration to get right, and also where we learnt the most." This represents a key LLMOps insight: the quality and comprehensiveness of context provided to LLM agents directly determines their effectiveness in production scenarios.

Spotify faced the challenge of handling three different data pipeline frameworks with varying degrees of standardization:

- **BigQuery Runner**: SQL-based, reasonably consistent across the company
- **dbt**: SQL-based, reasonably consistent across the company  
- **Scio**: Scala-based, highly variable between teams due to framework flexibility

The initial approach attempted to use Claude to repurpose human-written migration guides into agent context. This proved insufficient—Honk made incorrect assumptions about field mappings when context was not comprehensive enough. The team learned that without access to external skills or tools, the prompt and context had to be exhaustively detailed.

For the more standardized frameworks (BigQuery Runner and dbt), success came from creating fine-grained instructions using tables to explicitly map field transformations, removing ambiguity about how to migrate from one dataset to another. The context also included explicit instructions about when *not* to attempt automated migration—for cases requiring use-case-specific judgment, Honk was instructed to leave fields unchanged but add comments with links to human migration guides, effectively creating a hybrid automation approach.

For Scio pipelines, the lack of standardization combined with Honk's inability to access external context made comprehensive prompts "very unwieldy." Rather than force a suboptimal solution, the team made the pragmatic decision to exclude Scio migrations from the automated approach at that time. This represents sound LLMOps judgment: recognizing when agent limitations make human intervention more appropriate.

## Verification and Testing Limitations

A significant LLMOps challenge emerged around automated verification. Honk includes built-in capability to verify its work and adjust based on results—a critical feature for production LLM systems to ensure quality and correctness. However, this feature depends on the existence of build-time unit tests in target repositories.

Unlike Scio pipelines, the BigQuery Runner and dbt repositories across Spotify rarely implemented build-time unit testing. This meant Honk's self-verification capability was unavailable, forcing reliance on downstream teams to perform manual testing before merging automated pull requests. This limitation highlights an important LLMOps principle: the effectiveness of autonomous coding agents depends heavily on existing engineering infrastructure and practices.

The case study identifies this as a lesson for the future—Spotify recognizes the need to "enforce requirements for testing and validation across repositories so that agents like Honk can verify their work in an automated fashion." This represents mature thinking about LLMOps deployment: successful agent adoption requires organizational investment in complementary infrastructure, not just the agent itself.

## Results and Operational Impact

Despite the limitations, the deployment successfully generated 240 automated migration pull requests using Fleetshift. While the text doesn't provide detailed merge rates or quality metrics (which would strengthen claims about effectiveness), the system demonstrably reduced manual effort from an estimated 10 engineering weeks.

The Backstage and Fleetshift integration proved particularly valuable for operational management. The Fleetshift plugin provided a centralized overview UI showing migration progress across all repositories, with easy navigation to individual automated PRs. The case study emphasizes this was "invaluable for troubleshooting, progress monitoring, and facilitating communication with the owning teams"—highlighting that LLMOps success requires not just generation capability but also tooling for monitoring, management, and human oversight.

## Strategic Insights and Future Direction

The case study articulates clear strategic insights about what's needed for background coding agents to succeed at scale:

**Standardization requirements**: The stark difference in success between standardized frameworks (BigQuery Runner, dbt) and variable frameworks (Scio) demonstrates that LLM agent effectiveness in production depends significantly on underlying codebase consistency. Spotify identifies "the strategic push to consolidate and standardise our data landscape" as critical for future agent success.

**Testing infrastructure**: The inability to use Honk's self-verification features due to lack of unit tests reveals that autonomous agent deployment requires investment in automated testing infrastructure across the organization.

**Agent capability evolution**: The Honk roadmap includes features for agents to gather their own context (reading JIRA tickets, documentation) before making code changes, reducing the burden of comprehensive upfront context engineering. This represents evolution toward more autonomous LLM systems that can navigate information environments more independently.

The case study mentions underlying improvements in "Claude Code capabilities" over time, acknowledging that LLMOps effectiveness will improve as foundation models themselves improve—a factor somewhat outside Spotify's direct control but important to account for in long-term planning.

## Critical Assessment and Balanced Perspective

While this case study comes from Spotify and includes promotional elements (mentioning available Fleetshift product and webinars), it demonstrates notable technical honesty about limitations:

- Explicit acknowledgment that Scio migrations didn't work well enough to continue
- Clear discussion of context engineering challenges and initial failures
- Transparency about the lack of verification capability due to missing test infrastructure
- Realistic framing about the importance of standardization rather than claiming the agent works universally

The estimated "10 engineering weeks" saved should be viewed as approximate—the text doesn't provide methodology for this calculation or account for time spent on context engineering, prompt iteration, PR review overhead, or fixing failed migrations. The 240 automated PRs represent a subset of the 1,800 total pipelines needing migration, suggesting significant manual work likely remained.

The case study represents a maturing LLMOps practice that recognizes coding agents as tools requiring careful deployment within appropriate contexts, rather than universal solutions. The emphasis on organizational changes (standardization, testing requirements) alongside agent improvements reflects sophisticated understanding that successful LLMOps requires sociotechnical system design, not just deploying powerful models.

## LLMOps Lessons and Patterns

This case study exemplifies several important LLMOps patterns for production deployment:

**Context engineering as a discipline**: The significant time investment in creating comprehensive context files, the iteration required to get them right, and the explicit use of structured formats (tables) to reduce ambiguity all point to context engineering as a specialized skill for LLMOps practitioners.

**Guardrails and constraints**: The deliberate choice to limit Honk's capabilities (no external tools/skills) during migration represents a risk management approach—constraining agent behavior to predictable patterns even if it reduces flexibility.

**Hybrid automation**: Rather than attempting full automation everywhere, the approach of having Honk add helpful comments and links for human engineers in complex cases represents pragmatic human-agent collaboration.

**Infrastructure dependencies**: The case clearly demonstrates that LLM agent success depends on surrounding infrastructure—lineage tracking, code search, testing frameworks, monitoring UIs, and standardized codebases all contribute to effectiveness.

**Knowing when not to automate**: The decision to exclude Scio migrations represents mature judgment about agent limitations and appropriate use cases.

The integration with Backstage and Fleet Management also demonstrates the importance of connecting LLM capabilities with existing developer workflows rather than creating isolated agent systems. The ability to monitor progress, view PRs, and communicate with teams through familiar tooling likely contributed significantly to adoption and trust.
