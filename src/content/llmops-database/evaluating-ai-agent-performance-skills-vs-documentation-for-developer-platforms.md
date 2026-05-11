---
title: "Evaluating AI Agent Performance: Skills vs Documentation for Developer Platforms"
slug: "evaluating-ai-agent-performance-skills-vs-documentation-for-developer-platforms"
draft: false
llmopsTags:
  - "code-generation"
  - "prompt-engineering"
  - "token-optimization"
  - "evals"
  - "agent-based"
  - "documentation"
  - "fastapi"
industryTags: "tech"
company: "Wix"
summary: "Wix Engineering conducted 250 controlled evaluations to compare how AI agents perform developer tasks using standard documentation, AI-optimized documentation, and purpose-built \"skills\" (curated guides). The study examined CLI extension development and REST API scripting tasks, with each condition run three times to account for variance. The results revealed that agent-optimized documentation achieved higher task completion rates (87%) than skills alone (78%) while using fewer tokens and running faster, primarily because small mistakes in skills eroded their advantages. However, well-aligned skills provided 30-50% token reductions for specific tasks. The findings led Wix to position agent-optimized docs as the backbone of their AI-native developer experience, with skills serving as a \"caching layer\" for common tasks, maintained through regular automated evaluations to prevent drift."
link: "https://www.wix.engineering/post/we-ran-250-ai-agent-evals-to-find-out-if-skills-beat-docs-the-answer-is-more-complicated-than-we-ex"
year: 2026
seo:
  title: "Wix: Evaluating AI Agent Performance: Skills vs Documentation for Developer Platforms - ZenML LLMOps Database"
  description: "Wix Engineering conducted 250 controlled evaluations to compare how AI agents perform developer tasks using standard documentation, AI-optimized documentation, and purpose-built \"skills\" (curated guides). The study examined CLI extension development and REST API scripting tasks, with each condition run three times to account for variance. The results revealed that agent-optimized documentation achieved higher task completion rates (87%) than skills alone (78%) while using fewer tokens and running faster, primarily because small mistakes in skills eroded their advantages. However, well-aligned skills provided 30-50% token reductions for specific tasks. The findings led Wix to position agent-optimized docs as the backbone of their AI-native developer experience, with skills serving as a \"caching layer\" for common tasks, maintained through regular automated evaluations to prevent drift."
  canonical: "https://www.zenml.io/llmops-database/evaluating-ai-agent-performance-skills-vs-documentation-for-developer-platforms"
  ogTitle: "Wix: Evaluating AI Agent Performance: Skills vs Documentation for Developer Platforms - ZenML LLMOps Database"
  ogDescription: "Wix Engineering conducted 250 controlled evaluations to compare how AI agents perform developer tasks using standard documentation, AI-optimized documentation, and purpose-built \"skills\" (curated guides). The study examined CLI extension development and REST API scripting tasks, with each condition run three times to account for variance. The results revealed that agent-optimized documentation achieved higher task completion rates (87%) than skills alone (78%) while using fewer tokens and running faster, primarily because small mistakes in skills eroded their advantages. However, well-aligned skills provided 30-50% token reductions for specific tasks. The findings led Wix to position agent-optimized docs as the backbone of their AI-native developer experience, with skills serving as a \"caching layer\" for common tasks, maintained through regular automated evaluations to prevent drift."
notion:
  pageId: "35df8dff-2538-80f8-ba6e-c4ef76a7cd50"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:30:00.000Z"
  lastEditedTime: "2026-05-11T20:30:00.000Z"
  publishedAt: "2026-05-11T20:41:45Z"
---

## Overview

Wix Engineering undertook a rigorous evaluation project to address a critical question in the evolving landscape of AI-native developer experiences: whether purpose-built "skills" (condensed, curated guides for AI agents) actually outperform traditional documentation when AI agents interact with developer platforms. This case study represents a mature approach to LLMOps, focusing on systematic evaluation, measurement-driven decision-making, and the operational challenges of maintaining multiple information sources for AI consumption in production environments.

The context for this work is particularly relevant to LLMOps practitioners. As AI agents increasingly become the primary consumers of developer documentation, Wix observed a proliferation of independently-maintained "skills" across their organization—condensed guides teaching agents how to perform specific developer tasks on the Wix platform. These skills were derived from documentation but maintained separately, creating a parallel documentation layer that risked drift whenever underlying products, APIs, or scaffolds changed. The technical writing team at Wix, responsible for maintaining developer documentation for the Wix platform, recognized both a maintenance liability and an unexamined assumption: that skills inherently perform better than documentation for AI agents.

## Experimental Design and Methodology

The evaluation methodology demonstrates production-grade LLMOps practices. Wix designed a quantitative evaluation across 250 runs covering two distinct task families: CLI extensions (building Wix CLI app extensions including dashboard pages, backend APIs, site widgets, event handlers, embedded scripts, modals, and plugins) and REST API scripting (querying products, creating content, managing contacts, and multi-step workflows). This task diversity is important because it tests different types of agent interactions—from code generation and project scaffolding to API orchestration and multi-step reasoning.

For each task, Wix ran sandboxed AI agents under three experimental conditions, with each condition executed three times per task to account for inherent variance in LLM outputs. The baseline condition gave agents access to Wix's documentation portal via an llms.txt service through web-fetch, representing the standard way agents might discover and consume documentation. The optimized condition used the same documentation but with targeted improvements identified through analysis of agent failures—surgical changes like adding missing method calls to API code samples, fixing field name inconsistencies, and adding dependency installation steps that agents frequently missed. Wix built infrastructure to substitute these improved docs when agents requested them via web-fetch, demonstrating sophisticated testing infrastructure. The curated content condition restricted agents to either skills or the Wix MCP (Model Context Protocol implementation) with its packaged skills.

The evaluation framework itself reflects mature LLMOps thinking. After each agent completed its development work, Wix employed a self-evaluation approach where the agent assessed its own work: Did it complete the task? If not, why? What issues with the product and documentation caused problems? This qualitative feedback was supplemented with deterministic quantitative metrics including token count, turn count (number of back-and-forth interactions), and wall-clock time. This multi-dimensional evaluation captures both effectiveness (task completion) and efficiency (resource consumption and latency), which are critical operational concerns in production LLM systems.

## Key Findings and LLMOps Implications

The first major finding validates the importance of documentation optimization for AI consumption. For CLI tasks, documentation optimization alone improved task completion from 67% to 87%—a 20 percentage point improvement—while simultaneously reducing average token usage by 35% and wall-clock time by 9%. This represents a high-ROI intervention available to platform documentation teams and challenges the assumption that entirely new artifacts (skills) are necessary. The optimizations were relatively straightforward: ensuring navigable structure, maintaining consistent field names, and providing explicit dependency requirements. From an LLMOps perspective, this suggests that investing in agent-optimized documentation provides substantial returns before considering more complex solutions.

The second finding reveals critical production concerns about skills maintenance. Docs-optimized runs achieved 85% completion versus 78% for skills-only runs while using 10% fewer tokens, running 8% faster, and requiring 14% fewer turns. This counterintuitive result—that curated, condensed skills underperformed—stems from small mistakes that completely erode efficiency advantages. Wix identified several error patterns with significant operational implications:

**Misalignment with project scaffolding** proved particularly costly. In one case, a skill instructed agents to build a widget using a popular React-based library, but the CLI project scaffolding configured the project to use a proprietary Wix solution. The agent following the skill built the React version, encountered the mismatch, and rebuilt from scratch, burning 94% more tokens than the docs-optimized approach. This illustrates a key LLMOps challenge: skills must remain synchronized not just with API documentation but with the entire development environment, including tooling, scaffolding, and project templates.

**Errors in code snippets** created cascading failures. One skill contained code snippets missing an export declaration, causing build failures. The agent tried multiple export patterns until finding one that worked, resulting in 39% more token usage compared to docs-based runs. This highlights the brittleness of curated content—a single mistake can trigger expensive trial-and-error loops.

**Best-practice bloat** introduced unexpected tradeoffs. One skill included best practice guidelines that resulted in significantly more code, increasing token usage by 52%. While this likely produced better applications, many users may not want the additional functionality or cost. This raises questions about what should be included in skills: minimal working solutions or production-ready patterns?

Importantly, Wix also observed tasks where skills-only runs were clear winners, achieving 30-50% reductions in tokens and 30% reductions in time compared to docs runs. These were cases where skills were properly aligned with both the underlying product and CLI scaffolding. This suggests that skills provide genuine value when they're accurate and maintained, but the maintenance burden is significant.

The third finding reveals subtle tradeoffs between different efficiency metrics. For REST API tasks, docs-optimized and skill-based runs achieved identical 80% completion rates, suggesting neither approach has an inherent advantage for task success in API scripting scenarios. However, the efficiency picture was split: docs-optimized runs completed 31% faster with 33% fewer turns, while skills used 29% fewer tokens.

This seemingly paradoxical result—skills are slower despite using fewer tokens—stems from architectural differences in how information is delivered. The Model Context Protocol (MCP) fragments information across multiple sequential tool calls, where each call retrieves a small piece of information (method description, request schema, response schema, parameters, code examples). In contrast, a single web-fetch call to retrieve documentation returns a complete markdown page with all this information in one round-trip. More tool calls mean more LLM inference latency and more interaction turns, even though each individual call returns a smaller payload.

This finding has important implications for LLMOps architecture decisions. Token usage and wall-clock time are both operational concerns but optimize for different objectives. Token usage directly impacts API costs, while wall-clock time affects user experience and throughput. The MCP approach optimizes for token efficiency at the expense of latency, which may be appropriate for batch workflows but problematic for interactive use cases. For multi-step workflows, skills did save significant tokens by providing condensed guidance that avoided reading multiple large reference pages, but the latency tradeoff persists.

The fourth finding introduces a behavioral consideration that's easy to overlook: skills can constrain agent creativity and problem-solving. When agents receive official guidelines in a skill for how to perform a task, they follow them closely and become less likely to improvise or explore simpler solutions when encountering edge cases. Several docs-optimized agents found more straightforward routes to task completion precisely because they weren't anchored to a prescribed approach. The skill's authority became a constraint rather than an advantage.

This has implications for how to think about skill design. A skill optimizes for a specific use case and prescribed workflow, but it narrows the solution space in ways that can hurt performance on tasks that don't perfectly match the skill's assumptions. This suggests that skills should be used judiciously for well-defined, common tasks where the prescribed approach is genuinely optimal, rather than attempting to create skills for every conceivable task.

## Operational Framework and Best Practices

Based on their findings, Wix developed a framework for how documentation and skills should relate in an AI-native developer platform. This framework reflects mature LLMOps thinking about layered information architecture and continuous validation.

**Agent-optimized documentation serves as the backbone.** Agents should be able to use documentation to accomplish any conceivable task with the platform. Documentation must be structured for machine consumption with clear llms.txt entry points, consistent naming conventions, and explicit dependency and setup requirements. This represents the foundation layer that must be comprehensive and reliable.

**Skills function as a caching layer.** They exist to make common, well-defined tasks faster and cheaper—distilled shortcuts for high-priority use cases, derived from documentation rather than independent of it. This architectural positioning is important: skills are optimization layers, not replacements for documentation. They should be viewed as derived artifacts that must stay synchronized with their source of truth.

**Regular automated evaluations maintain skill freshness.** Continuous evaluation should compare skill performance against docs-optimized performance across a range of tasks. Any time a skill underperforms documentation, it signals drift or inherent problems. Automated evaluations can catch discrepancies as they emerge, preventing the accumulation of errors that erode skill value.

This framework addresses the core LLMOps challenge that motivated the study: how to maintain multiple information sources for AI consumption without allowing drift and degradation. By establishing documentation as the authoritative source and treating skills as derived optimizations subject to continuous validation, Wix creates a sustainable operational model.

## Production LLMOps Practices Demonstrated

This case study exemplifies several production LLMOps best practices worth highlighting. First, the emphasis on measurement and evidence over assumptions. The industry was hyping skills, but Wix questioned whether they actually delivered value and designed rigorous experiments to find out. This data-driven approach is fundamental to mature LLMOps.

Second, the multi-dimensional evaluation framework captures multiple aspects of performance—task completion, token usage, turn count, wall-clock time, and qualitative failure analysis. Production LLM systems must optimize for multiple objectives simultaneously, and evaluation frameworks should reflect this complexity.

Third, the recognition that small mistakes cascade into significant operational costs. A missing export statement or misaligned scaffold assumption can double token usage. This underscores the importance of continuous validation and the brittleness of curated content that isn't kept synchronized with underlying systems.

Fourth, the infrastructure for substituting improved documentation during agent requests demonstrates sophisticated testing capabilities. Being able to A/B test different documentation versions while controlling for other variables requires thoughtful engineering.

Fifth, the architectural thinking about information layering—documentation as backbone, skills as caching—reflects systems thinking about how to structure information for AI consumption at scale.

## Critical Assessment

While this case study provides valuable insights, it's important to maintain critical perspective. The evaluation used Wix's own platform, documentation, and tasks, which may limit generalizability. Different platforms with different API complexity, documentation quality, or task types might see different results. The study also doesn't specify which AI agent or LLM was used, which could significantly impact results—different models have different capabilities for document parsing, reasoning, and error recovery.

The self-evaluation approach, where agents assess their own work, introduces potential biases. Agents might not accurately identify their own failures or might be overly critical. Human evaluation or automated testing against expected outputs would provide additional validation.

The sample size of three runs per condition per task provides some statistical foundation but may not fully capture the variance in LLM behavior, particularly for complex tasks where different reasoning paths might emerge. Larger sample sizes or explicit uncertainty quantification would strengthen the conclusions.

The study also doesn't address the cost of maintaining agent-optimized documentation versus skills. While skills showed maintenance problems, documentation optimization also requires ongoing investment. A complete operational analysis would compare total cost of ownership for both approaches.

Despite these limitations, the study represents valuable production LLMOps work that challenges prevailing assumptions and demonstrates the importance of measurement-driven decision-making in AI engineering.
