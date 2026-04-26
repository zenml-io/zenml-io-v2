---
title: "Simplifying Text-to-SQL Agents by Removing 80% of Tools"
slug: "simplifying-text-to-sql-agents-by-removing-80-of-tools"
draft: false
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "chatbot"
  - "prompt-engineering"
  - "agent-based"
  - "semantic-search"
  - "error-handling"
  - "latency-optimization"
  - "token-optimization"
  - "cost-optimization"
  - "fastapi"
  - "docker"
  - "serverless"
  - "monitoring"
  - "api-gateway"
  - "databases"
  - "orchestration"
  - "documentation"
  - "anthropic"
  - "cloudflare"
industryTags: "tech"
company: "Vercel"
summary: "Vercel built an internal text-to-SQL agent called d0 to democratize data access across the company, initially using a complex architecture with 18 specialized tools, heavy prompt engineering, and careful context management that achieved only 80% success rate. They radically simplified the system by reducing it to a single \"execute bash commands\" tool that gives Claude Opus 4.5 direct file system access to browse their Cube semantic layer using standard Unix utilities. The new file system agent approach achieved 100% success rate, ran 3.5x faster, used 37% fewer tokens, and required 42% fewer steps, demonstrating that simpler architectures can outperform complex ones when models are given appropriate raw context."
link: "https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools"
year: 2025
seo:
  title: "Vercel: Simplifying Text-to-SQL Agents by Removing 80% of Tools - ZenML LLMOps Database"
  description: "Vercel built an internal text-to-SQL agent called d0 to democratize data access across the company, initially using a complex architecture with 18 specialized tools, heavy prompt engineering, and careful context management that achieved only 80% success rate. They radically simplified the system by reducing it to a single \"execute bash commands\" tool that gives Claude Opus 4.5 direct file system access to browse their Cube semantic layer using standard Unix utilities. The new file system agent approach achieved 100% success rate, ran 3.5x faster, used 37% fewer tokens, and required 42% fewer steps, demonstrating that simpler architectures can outperform complex ones when models are given appropriate raw context."
  canonical: "https://www.zenml.io/llmops-database/simplifying-text-to-sql-agents-by-removing-80-of-tools"
  ogTitle: "Vercel: Simplifying Text-to-SQL Agents by Removing 80% of Tools - ZenML LLMOps Database"
  ogDescription: "Vercel built an internal text-to-SQL agent called d0 to democratize data access across the company, initially using a complex architecture with 18 specialized tools, heavy prompt engineering, and careful context management that achieved only 80% success rate. They radically simplified the system by reducing it to a single \"execute bash commands\" tool that gives Claude Opus 4.5 direct file system access to browse their Cube semantic layer using standard Unix utilities. The new file system agent approach achieved 100% success rate, ran 3.5x faster, used 37% fewer tokens, and required 42% fewer steps, demonstrating that simpler architectures can outperform complex ones when models are given appropriate raw context."
notion:
  pageId: "34ef8dff-2538-81ce-941b-de3a078ed9f8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:07:09Z"
---

## Overview

Vercel's case study describes their journey building and evolving d0, an internal text-to-SQL agent designed to democratize data access across the company. The agent translates natural language questions into SQL queries against their analytics infrastructure, allowing any team member to get data-driven answers without writing code or depending on data analysts. This is a production LLMOps case study focused on agent architecture evolution, demonstrating a counterintuitive finding: that removing complexity and giving models more direct access to raw context can dramatically improve performance.

The case presents a before-and-after comparison of two distinct architectural approaches. The initial version was built with assumptions about model limitations that led to extensive scaffolding and tooling. The revised version stripped away most of this complexity, relying instead on the improved capabilities of Claude Opus 4.5 and simple file system access patterns. This represents an important lesson in LLMOps about matching architecture complexity to actual model capabilities rather than anticipated limitations.

## Initial Architecture: Complex Tool-Based Approach

The original d0 implementation embodied what the team retrospectively describes as "fighting gravity" - building extensive tooling to work around perceived model weaknesses. The system utilized the AI SDK's ToolLoopAgent pattern with 18 specialized tools, including GetEntityJoins, LoadCatalog, RecallContext, LoadEntityDetails, SearchCatalog, ClarifyIntent, SearchSchema, GenerateAnalysisPlan, FinalizeQueryPlan, FinalizeNoData, JoinPathFinder, SyntaxValidator, FinalizeBuild, ExecuteSQL, FormatResults, VisualizeData, and ExplainResults.

This architecture reflected several assumptions about model behavior. The team believed the model would get lost in complex database schemas, make poor join decisions, or hallucinate table names. To prevent these anticipated failures, they built guardrails at multiple levels. They pre-filtered context before presenting it to the model, constrained the model's reasoning options through heavy prompt engineering, implemented careful context management to avoid overwhelming the model with information, and wrote hand-coded retrieval systems to surface "relevant" schema information and dimensional attributes.

The result was a system that worked "kind of" but was fragile, slow, and required constant maintenance. Each edge case required another patch, and every model update meant re-calibrating the constraints. The team found themselves spending more time maintaining the scaffolding than actually improving the agent's capabilities. Performance metrics showed an 80% success rate (4 out of 5 benchmark queries succeeded), with an average execution time of 274.8 seconds, approximately 102,000 tokens used per query, and around 12 steps per query on average. The worst case scenario took 724 seconds, 100 steps, and 145,463 tokens before ultimately failing.

## Architectural Revolution: The File System Agent

The fundamental insight that drove the redesign was recognizing that they were "constraining the model's reasoning" and "summarizing information that it could read on its own." The team hypothesized that with improving model capabilities (specifically Claude Opus 4.5) and expanding context windows, perhaps the best agent architecture was "almost no architecture at all." They coined the concept of a "file system agent" - one that browses the semantic layer the way a human analyst would, using standard Unix tools.

The new technical stack is notably simpler while still leveraging Vercel's production infrastructure:

- **Model**: Claude Opus 4.5 accessed via the AI SDK
- **Execution environment**: Vercel Sandbox for isolated context exploration
- **Routing layer**: Vercel Gateway for request handling and observability
- **Server infrastructure**: Next.js API route using Vercel Slack Bolt for Slack integration
- **Data layer**: Cube semantic layer represented as a directory of YAML, Markdown, and JSON files

The new implementation uses the AI SDK's ToolLoopAgent but with only two tools instead of 18: ExecuteCommand (which wraps bash command execution in a Vercel Sandbox) and ExecuteSQL. The ExecuteCommand tool gives Claude direct access to grep, cat, find, ls, and other standard Unix utilities to explore the semantic layer files. The code example shows how they create a Sandbox instance, write the semantic catalog files to it, and then define a simple tool that executes commands and returns results.

This approach works because Vercel's semantic layer was already well-documented. The files contain dimension definitions, measure calculations, and join relationships in a human-readable format. The team realized they had been building tools to summarize what was already legible - Claude just needed direct access to read it. The agent now explores the data catalog by reading files, grepping for patterns, building mental models of the schema, and writing SQL using the same approaches a human data analyst would use.

## Performance Improvements and Benchmarking

The quantitative improvements from the architectural simplification are striking. Testing across 5 representative queries showed the file system approach achieving 100% success rate (5/5 queries) compared to 80% (4/5) for the old architecture. Average execution time dropped from 274.8 seconds to 77.4 seconds - a 3.5x speedup. Token usage decreased by 37%, from approximately 102,000 to 61,000 tokens per query. The number of steps required dropped by 42%, from around 12 to around 7 steps per query.

The worst-case scenario comparison is particularly revealing. Where the old architecture took 724 seconds, 100 steps, and 145,463 tokens before failing, the new file system agent completed the same query successfully in 141 seconds with 19 steps and 67,483 tokens. This represents not just incremental improvement but a qualitative shift in reliability and efficiency.

The team emphasizes that the qualitative improvements matter as much as the metrics. The agent now catches edge cases they never anticipated during development and explains its reasoning in ways that are easier for humans to follow and validate. This improved transparency is crucial for maintaining trust in a production system where business decisions depend on the accuracy of the results.

## LLMOps Implications and Critical Dependencies

This case study offers several important lessons for LLMOps practitioners building production agent systems. The counterintuitive finding that simpler architectures can outperform complex ones challenges common assumptions about agent design. However, the team is explicit about critical dependencies that make this approach viable.

The file system agent approach "only worked because our semantic layer was already good documentation." The YAML files are well-structured with consistent naming conventions and clear definitions. The team warns that if your data layer consists of legacy naming conventions and undocumented joins, giving Claude raw file access won't magically solve your problems - you'll just get faster bad queries. This highlights an important LLMOps principle: invest in high-quality documentation and well-structured data as a foundation for AI systems.

The team's recommendation to "build for the model that you'll have in six months, not for the one that you have today" reflects the rapid pace of model capability improvement. Architectures that compensate for current model limitations may become liabilities as models improve. This creates a tension in production LLMOps between building for current capabilities and avoiding over-engineering that will quickly become obsolete.

The observability infrastructure provided by Vercel Gateway plays an implicit but important role in this system. While not detailed in the case study, having request handling and observability built into the routing layer enables the team to monitor agent performance, debug failures, and validate the improvements they're claiming. This kind of observability is essential for maintaining production agent systems where behavior can be non-deterministic.

## Integration and User Experience

The integration with Slack through Vercel Slack Bolt positions d0 as a conversational interface for data access. Users can ask questions in natural language and receive SQL-generated answers without leaving their communication tool. This integration pattern is important from an LLMOps perspective because it places the AI capability directly in the workflow where decisions are made, reducing friction in adoption.

The stakes for reliability are high in this context. When d0 works well, it democratizes data access across the company and reduces load on data teams. When it breaks, people lose trust and revert to pinging analysts in Slack - creating both productivity loss and regression to the previous bottleneck. This makes the improvement from 80% to 100% success rate particularly significant from a business value perspective.

## Architectural Philosophy and Design Principles

The case study articulates a clear philosophy of "addition by subtraction" - that the best agents might be the ones with the fewest tools. Every tool represents a choice the developer makes for the model, potentially constraining the model's ability to reason about the problem space. The recommendation to "start with the simplest possible architecture" (model + file system + goal) and only add complexity when proven necessary runs counter to the impulse to account for every possibility upfront.

This philosophy relies on trusting model capabilities while providing appropriate context. The file system abstraction is described as "an incredibly powerful abstraction" that has proven its utility for 50 years (grep being the cited example). Rather than building custom tools for semantic layer exploration, they leveraged existing, battle-tested Unix utilities that Claude already understands how to use.

The team's observation that they were "doing the model's thinking for it" gets at a fundamental tension in agent design. Pre-filtering context, constraining reasoning options, and building validation layers all represent attempts to guide the model toward correct behavior. But with sufficiently capable models, these interventions can actually degrade performance by preventing the model from applying its own reasoning capabilities to the full problem space.

## Critical Assessment and Balanced Perspective

While the results are impressive, it's important to maintain a balanced perspective on the claims and their generalizability. The case study is published by Vercel on their blog, which serves marketing purposes for their AI SDK, Sandbox, and Gateway products. The dramatic performance improvements make for a compelling narrative that positions their tooling favorably.

Several factors specific to Vercel's situation may not generalize to all text-to-SQL use cases. Their semantic layer was already well-documented with clear structure - a prerequisite they explicitly acknowledge. Organizations with poorly documented, inconsistent, or legacy data infrastructure may not see similar results from simply giving models file system access. The move from Claude Opus (presumably an earlier version) to Claude Opus 4.5 represents a significant model capability upgrade that may account for some portion of the improvements attributed to architectural simplification.

The benchmark of only 5 queries, while representative, is relatively small for drawing strong conclusions about production reliability. The jump from 4/5 (80%) to 5/5 (100%) success rate is statistically significant but represents a single additional successful query. Longer-term production metrics across hundreds or thousands of diverse queries would provide more confidence in the reliability claims.

The case study doesn't address several important production considerations in detail. Error handling and recovery strategies are not discussed - what happens when bash commands fail or return unexpected output? How does the system handle ambiguous user queries that might map to multiple valid SQL interpretations? What guardrails exist to prevent malicious or accidental execution of destructive queries? These are critical LLMOps concerns for production systems.

The security model of giving an LLM "direct access" to execute arbitrary bash commands in a sandbox requires careful consideration. Vercel Sandbox presumably provides isolation guarantees, but the case study doesn't detail what constraints exist on command execution or how they prevent potential security issues. In production LLMOps, the security implications of tool access are paramount.

## Broader LLMOps Lessons

Despite these caveats, the case study offers valuable insights for production LLMOps practitioners. The evolution from complex to simple architecture demonstrates the importance of continuously re-evaluating assumptions about model capabilities as the field advances. What required extensive scaffolding with earlier models may become unnecessary overhead with newer, more capable versions.

The emphasis on documentation quality as a prerequisite for effective agent performance reinforces that LLMOps extends beyond model selection and prompt engineering to encompass data quality and information architecture. Well-structured, clearly documented data enables models to reason more effectively, potentially reducing the need for complex retrieval and summarization systems.

The use of standard, well-understood abstractions (file systems, Unix utilities) rather than custom-built tools where possible is a practical principle that improves maintainability and leverages existing model knowledge. Models trained on vast amounts of text data likely have strong priors about how grep, cat, and ls work, making these tools immediately usable without extensive prompting.

The integration of multiple Vercel products (AI SDK, Sandbox, Gateway, Slack Bolt) demonstrates how production LLMOps often requires coordinating several infrastructure components: model access APIs, isolated execution environments, observability and routing layers, and user interface integrations. The case implicitly argues for integrated toolchains that handle these concerns cohesively.

The lesson about building for future model capabilities rather than current limitations is particularly relevant in the rapidly evolving LLM landscape. Architectures that too closely compensate for current model weaknesses may require significant rework as models improve. This suggests favoring flexible, minimal architectures that can scale with model capabilities rather than rigid, complex systems that may become obsolete.
