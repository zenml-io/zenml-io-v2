---
title: "Building Custom Agents at Scale: Notion's Multi-Year Journey to Production-Ready Agentic Workflows"
slug: "building-custom-agents-at-scale-notions-multi-year-journey-to-production-ready-agentic-workflows"
draft: false
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "summarization"
  - "document-processing"
  - "code-generation"
  - "classification"
  - "data-analysis"
  - "customer-support"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "few-shot"
  - "rag"
  - "embeddings"
  - "fine-tuning"
  - "evals"
  - "reranking"
  - "semantic-search"
  - "vector-search"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "system-prompts"
  - "mcp"
  - "chunking"
  - "error-handling"
  - "a2a"
  - "langchain"
  - "postgresql"
  - "sqlite"
  - "elasticsearch"
  - "fastapi"
  - "docker"
  - "kubernetes"
  - "cicd"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "cache"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "meta"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "tech"
company: "Notion"
summary: "Notion, a knowledge work platform serving enterprise customers, spent multiple years (2022-2026) iterating through four to five complete rebuilds of their agent infrastructure before shipping Custom Agents to production. The core problem was enabling users to automate complex workflows across their workspaces while maintaining enterprise-grade reliability, security, and cost efficiency. Their solution involved building a sophisticated agent harness with progressive tool disclosure, SQL-like database abstractions, markdown-based interfaces optimized for LLM consumption, and a comprehensive evaluation framework. The result was a production system handling over 100 tools, serving majority-agent traffic for search, and enabling workflows like automated bug triaging, email processing, and meeting notes capture that fundamentally changed how their company and customers operate."
link: "https://www.latent.space/p/notion"
year: 2026
seo:
  title: "Notion: Building Custom Agents at Scale: Notion's Multi-Year Journey to Production-Ready Agentic Workflows - ZenML LLMOps Database"
  description: "Notion, a knowledge work platform serving enterprise customers, spent multiple years (2022-2026) iterating through four to five complete rebuilds of their agent infrastructure before shipping Custom Agents to production. The core problem was enabling users to automate complex workflows across their workspaces while maintaining enterprise-grade reliability, security, and cost efficiency. Their solution involved building a sophisticated agent harness with progressive tool disclosure, SQL-like database abstractions, markdown-based interfaces optimized for LLM consumption, and a comprehensive evaluation framework. The result was a production system handling over 100 tools, serving majority-agent traffic for search, and enabling workflows like automated bug triaging, email processing, and meeting notes capture that fundamentally changed how their company and customers operate."
  canonical: "https://www.zenml.io/llmops-database/building-custom-agents-at-scale-notions-multi-year-journey-to-production-ready-agentic-workflows"
  ogTitle: "Notion: Building Custom Agents at Scale: Notion's Multi-Year Journey to Production-Ready Agentic Workflows - ZenML LLMOps Database"
  ogDescription: "Notion, a knowledge work platform serving enterprise customers, spent multiple years (2022-2026) iterating through four to five complete rebuilds of their agent infrastructure before shipping Custom Agents to production. The core problem was enabling users to automate complex workflows across their workspaces while maintaining enterprise-grade reliability, security, and cost efficiency. Their solution involved building a sophisticated agent harness with progressive tool disclosure, SQL-like database abstractions, markdown-based interfaces optimized for LLM consumption, and a comprehensive evaluation framework. The result was a production system handling over 100 tools, serving majority-agent traffic for search, and enabling workflows like automated bug triaging, email processing, and meeting notes capture that fundamentally changed how their company and customers operate."
notion:
  pageId: "344f8dff-2538-80e3-abbc-dc474116da41"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-16T06:52:00.000Z"
  lastEditedTime: "2026-04-16T06:52:00.000Z"
  publishedAt: "2026-04-20T06:54:19Z"
---

## Overview

Notion's journey to production-ready custom agents represents one of the most detailed public case studies in building enterprise-grade agentic systems at scale. Simon Last (cofounder) and Sarah Sachs (head of AI) reveal a multi-year effort that began in late 2022 and involved numerous complete rebuilds before reaching production quality in 2026. This case study is particularly valuable because it candidly discusses failures, architectural pivots, and the organizational structures required to ship complex AI products.

## Early Experimentation and Failures (2022-2023)

Notion began experimenting with agents immediately upon gaining access to GPT-4 in late 2022, well before the term "agent" was widely used (they initially called them "assistants"). The early attempts failed for multiple fundamental reasons that characterize the difference between prototype and production:

**Model capability limitations**: The models were simply "too dumb" and context windows were "way too short" for multi-turn agentic workflows. This led to a critical realization about "swimming upstream" - the team learned to distinguish between fundamental model limitations versus solvable engineering problems.

**Lack of tooling standards**: Function calling didn't exist yet, so Notion had to design their own tool-calling framework and attempted fine-tuning with both Anthropic and OpenAI to make models work with their custom format. This proved unsustainable as they couldn't iterate quickly enough.

**Wrong abstractions**: A major early mistake was designing their tool interfaces around what made sense for Notion's internal data model rather than what models naturally understood. For example, they created a lossless XML format that mapped perfectly to Notion blocks but required extensive prompting and the models struggled with it. The breakthrough came when they realized "give the models what they want" - switching to markdown (which models know well) and SQL-like queries (which models excel at) rather than forcing models to learn Notion-specific formats.

The first production-quality unlock came with Claude Sonnet 3.5 or 3.6 in early 2025, when model capabilities finally caught up to their ambitions.

## Agent Harness Evolution

Notion rebuilt their agent harness approximately 4-5 times, with each iteration representing fundamental architectural shifts:

**Version 1 - Coding agents (late 2022)**: Rather than building explicit tools, they gave agents JavaScript APIs and had them write code. This failed because models weren't good enough at coding yet.

**Version 2 - Custom XML tooling**: They created a comprehensive XML representation that could losslessly map to Notion blocks and designed mutation operations for pages. This failed because models didn't naturally understand the XML format and it required too much prompting overhead.

**Version 3 - Markdown and SQL**: A major pivot to model-friendly formats. They created "Notion-flavored markdown" that was simple markdown at core with minimal enhancements, and mapped all database queries to SQLite syntax (even though their backend is Postgres). This significantly improved quality because models are trained extensively on both markdown and SQL.

**Version 4 - Few-shot to tool definitions**: They moved from few-shot prompting to declarative tool definitions. This was critical for organizational scaling - with few-shot prompting, only 5-6 people could safely edit the prompts and there were ordering effects where prompt position mattered. With tool definitions, they could distribute tool ownership across teams. However, this created new problems when they accidentally had duplicate tool names - interestingly, Claude couldn't handle this but GPT-4 could figure it out.

**Version 5 - Progressive disclosure**: As they approached 100+ tools, they hit quality and performance bottlenecks. The solution was progressive tool disclosure - rather than showing all tools upfront, they implemented tool search capabilities. This dramatically shortened the system prompt (they now "fight to keep it as short as possible"), improved quality by preventing models from calling niche tools inappropriately, and enabled individual teams to add tools without breaking the overall system.

## Evaluation Infrastructure

Notion treats evaluation as a first-class engineering discipline with dedicated roles and infrastructure. They employ a three-tiered evaluation strategy:

**Regression tests**: These live in CI and must pass within stochastic error margins. They function like unit tests for agent behavior.

**Launch-quality evals**: Before shipping features, they have report cards covering user journeys that must achieve 80-90% pass rates across categories. These determine production readiness.

**Frontier/headroom evals**: Critically, they maintain "Notion's Last Exam" - evaluations intentionally designed to only pass ~30% of the time. This serves multiple purposes: it prevents eval saturation (where everything passes and you can't measure progress), provides meaningful feedback to model providers about capability gaps, and helps them understand "where the stream is flowing" to inform roadmap decisions.

They've invested heavily in treating the eval system itself as an agent harness. Coding agents can end-to-end download datasets, run evals, iterate on failures, debug issues, and implement fixes. This meta-capability dramatically improves their velocity.

## Model Behavior Engineering

Notion created a distinct function called "Model Behavior Engineer" (MBE) that sits between traditional software engineering and data science. The role started as "data specialists" who manually inspected model outputs in Google Sheets but evolved significantly with coding agents.

Simon Last notably spent time teaching early MBEs how to use GitHub, but the role has transformed with accessible coding tools. MBEs now build agents that write their own evals and create LLM judges, focusing on qualitative understanding of model capabilities rather than just quantitative metrics.

This specialization reflects Notion's conviction that eval writing, failure analysis, and model understanding require distinct skills from software engineering. They "welcome the misfits" and explicitly don't require engineering backgrounds for these roles. The function includes data scientists, MBEs, and full-time eval engineers dedicated to frontier evals.

## Organization and Culture

Notion's AI organization comprises approximately 50 people in core AI capabilities and infrastructure, another 30-40 in product packaging teams, plus distributed ownership across product engineering. A critical architectural decision is that every product team owns the tool interface their surface exposes to agents - the offline mode team handles concurrent agent edits, the SQL engine team handles performant agent queries, etc.

Sarah Sachs describes several cultural elements essential to their velocity:

**Low ego and comfort with deletion**: Teams regularly throw away their own work when requirements change. The agent harness has been rebuilt 4-5 times and tools change daily. This requires hiring people comfortable with impermanence.

**The "Simon Vortex"**: Senior engineers rotate in and out of rapid prototyping work with Simon Last, where direction changes daily and velocity is extremely high. This functions like a research lab within the company. Management boundaries are intentionally loose - "you report to him but work for her right now."

**Objective-setting over idea ownership**: Leadership focuses on clearly communicating objectives and helping prioritize rather than being the source of technical ideas. Most of their best ideas come from prototypes built by engineers who see user problems.

**Demos over memos**: A design principle where internal prototypes are fully functional feature-flagged implementations rather than mockups. Since everyone at Notion uses Notion extensively for their own work, they can dogfood aggressively. Designers create full prototypes in a special GitHub repo with helper components rather than static mocks.

**Security involvement early**: Contrary to typical patterns where security reviews happen late and cause friction, Notion brings security in at the beginning. This comes from scar tissue (Sachs worked at Robinhood previously) and the recognition that enterprise customers require HIPAA compliance, SOC 2, and other certifications that can't be bolted on later.

## Tool Architecture and Composition

The current production system exposes over 100 tools across the Notion API surface. Key architectural decisions include:

**Tool discovery via progressive disclosure**: Rather than sending all 100+ tool definitions in every request, they implemented tool search capabilities so agents can discover relevant tools on-demand. This dramatically reduced token costs and improved reliability.

**Memory as pages and databases**: Notion has no built-in memory abstraction. Instead, agents simply get edit access to pages or databases that serve as memory. This composability through primitives extends to agent coordination - agents communicate by writing to shared databases or calling webhooks to invoke other agents.

**Agent composition patterns**: Users can create "manager agents" that oversee dozens of specialized agents. One internal user built 30+ agents for go-to-market workflows and was getting 70+ notifications daily. The solution was a manager agent with access to invoke all subordinate agents, creating an abstraction layer that reduced notifications to ~5 per day. The manager agent can help debug and fix problems with its subordinate agents.

**Setup agents**: Custom agents can configure themselves through special setup tools. When users describe what they want, the agent writes its own system prompt, creates database schemas, and configures permissions. The agent can also inspect its own failures and modify its instructions, though permission changes require human confirmation for security reasons.

## CLI vs MCP Integration Strategy

Notion has thoughtful perspectives on the trade-offs between CLI-based tools and Model Context Protocol:

**CLI advantages**: Simon Last is particularly bullish on CLI tools because they offer progressive disclosure (you don't see all tools at once, just the CLI wrapper with help commands), self-debugging capabilities (if a tool breaks, the agent can fix it in the same environment), and bootstrapping (agents can create new tools by wrapping APIs). The most compelling example: an agent can build itself a browser from scratch in 100 lines of code and debug it if it breaks. With MCP, if the transport breaks, the agent has no way to fix itself.

**MCP advantages**: MCP excels for narrow, lightweight agents where you want tight permissioning - all the agent can do is call specific tools. This is simpler and safer than giving an agent a full compute environment with file system access. MCP also has cleaner determinism for tasks that don't require language model reasoning.

**Notion's hybrid approach**: They offer both their own MCP server (for long-tail integrations users want to add themselves) and custom-built integrations (like Slack, Gmail, where they fine-tune the tools extensively). They also consider the pricing alignment - requiring an LLM to repeatedly interface with an MCP adds token costs that aren't necessary for deterministic operations that could be handled by code calling a CLI.

## Pricing and Cost Management

Notion implemented usage-based pricing for Custom Agents because certain features would "bankrupt the company" if offered with unlimited usage. For example, if every database autofill action triggered an Opus-level agent, the token costs would be billions of dollars.

They use "credits" as an abstraction over tokens because pricing actually depends on multiple factors: token throughput, model type (which model tier), serving tier (priority vs asynchronous), web search costs, and future sandbox costs. Credits allow them to handle this complexity while still tying back to underlying resource consumption.

A critical insight is that not all knowledge work tasks require frontier models. They observe that most custom agent workflows don't actually saturate model capabilities. The challenge is that frontier labs cluster their offerings - you get very capable but expensive models or cheaper but less capable models, without much middle ground. Notion invests in open source models and partners like MiniMax to fill this gap.

The "auto" model selection tries to match task to appropriate model tier, though they acknowledge it's not perfect. They actively nudge users in the UI when they're using expensive models unnecessarily, both through hover tooltips and in-product warnings. Interestingly, users don't care about speed for asynchronous custom agents, so the normal incentive to use faster models doesn't apply.

## Retrieval and Ranking

A fascinating development is that the majority of search traffic on Notion's AI-enabled plans now comes from agents rather than humans. This fundamentally changes retrieval requirements:

**Different ranking functions**: Positional ranking matters less (being #1 vs #6 in results), but top-K retrieval matters more (being in top 100). Human click-through rate optimization doesn't apply. The slope of relevance by position is just different.

**Query structure differences**: Agents write queries differently than humans, requiring different retrieval optimization.

**Indexing challenges**: New content types like agent setup instructions and meeting notes "break their block model entirely" where all blocks are nested. They're rethinking indexing strategies specifically for agentic access patterns.

**Vector embeddings de-emphasized**: In a surprising finding, they discovered that optimizing which vector embedding they use is no longer the right lever. They've moved focus to query generation diversity and parallel exhaustive search.

**Ranking as core investment**: They're actively hiring ranking/recommendation system engineers, treating retrieval as a critical differentiator as more traffic comes from agents.

## Meeting Notes as Data Capture

Meeting Notes became one of Notion's strongest growth loops, not just for transcription but as "data capture" that feeds the entire system. Sarah Sachs uses meeting notes for everything - when doing performance reviews, she has an agent summarize all one-on-one conversations with her manager, since anything not discussed there likely wasn't relevant.

The technical implementation uses agentic summarization that goes beyond simple transcription:
- It @ mentions people referenced in meetings by resolving identity (using people-to-people similarity caches to determine which "Simon" was mentioned)
- It creates action items and files them to task databases
- It sends Slack follow-ups based on meeting decisions  
- It generates pre-reads before meetings by searching Slack and GitHub

One workflow example: before standup, a custom agent creates a summary from Slack and GitHub, files it as a meeting note, everyone does the pre-read, they have the meeting "hands off keyboard focused on the root of the problem not bookkeeping," and then another agent files tasks and sends follow-ups.

Meeting notes also created significant infrastructure challenges around search and agent context handling due to the explosion of long-form content, driving improvements in compaction and context management.

## Software Factory Vision

Simon Last articulates a vision of "software factories" - highly automated workflows where multiple agents collaborate to spec, code, test, debug, review, and maintain codebases together with minimal human intervention. Key elements include:

**Specification layer**: Markdown files or Notion pages that are human-readable and versionable serve as specs that agents work from.

**Self-verification loops**: Extremely good testing is critical. Agents must verify their own work through comprehensive test suites before human review.

**Bug workflows**: When issues arise, they flow into the system, potentially handled by sub-agents, creating PRs that get reviewed before merging.

**Coding agents as AGI kernel**: The team believes "coding agents are the kernel of AGI" - everything becomes a coding agent problem because agents can bootstrap their own software and capabilities, then debug and maintain them.

Simon personally runs coding agents overnight, ensuring before sleep that agents have enough queued work to run until morning. He had a single coding agent thread running continuously for 17 days (hitting context limits multiple times through compaction) before discovering it was a harness bug.

## Model Provider Relationships and Fine-tuning

Notion maintains close partnerships with frontier labs, receiving early access to model snapshots and providing detailed feedback. They've had labs ship different model versions than Notion wanted based on their enterprise-focused feedback, since their eval focus differs from typical coding-agent benchmarks.

They notice quality differences across providers even for supposedly identical models (e.g., first-party vs Bedrock vs Azure), though this relates to quantization rather than intentional degradation. They do observe flakiness and slower performance during peak hours with some providers.

Regarding fine-tuning, Notion has actively decided against training foundation models. The reasoning is multifaceted:
- Their core competency is understanding how people collaborate, not training models
- Their tools change daily, making fine-tuned tool-calling models obsolete quickly  
- The time lag to train and ship a fine-tuned model hasn't been favorable versus frontier capabilities improving
- For most use cases, it's better to fix bugs in tools than to train models around tool quirks

Where they do invest in model optimization is retrieval/ranking (as discussed above), where agent access patterns differ fundamentally from human patterns and they have unique data. They also do some fine-tuning and reinforcement learning for specific capabilities, but on limited data rather than user data.

## Production Maturity and Launch Process

The journey from alpha to production involved significant product iteration beyond model capabilities:

**Permissions system**: Getting permissioning right took multiple attempts - understanding that an agent shared in a Slack channel with group X accessing documents surfaced to group Y creates complex permission intersections that administrators must understand.

**Flippy redesign**: A launch-blocking month-long delay came from reconceptualizing the setup UX. Rather than having separate "settings" and "testing" views, they made everything a chat interface where the agent can configure itself, test itself, and run workflows all in one conversational flow. Early adopters were already used to the old way, creating change management challenges, but the team unanimously agreed the new approach was "obviously" better.

**Self-healing capabilities**: Agents have a "fix" button that allows them to inspect failures and update their instructions, though changing permissions requires explicit user approval for security reasons.

**Enterprise readiness**: HIPAA compliance, SOC 2, zero data retention offerings for enterprises, and proper contracting with vendors were all table stakes for enterprise adoption.

The alpha-to-production launch was their "most successful launch in terms of free trials and converting people," partly because the three-month free trial helped and partly because users now broadly understand AI agents whereas two years ago extensive education was required.

## Key Learnings and Philosophy

Several philosophical principles emerge from Notion's journey:

**Don't swim upstream**: Quickly recognizing when you're fighting model limitations versus having solvable engineering problems is a critical skill. The team prides themselves on this intuition.

**Build ahead of the curve, but not too far**: They balance shipping immediately useful things with building for where capabilities are going. The trick is starting early enough that products are ready when models catch up, without wasting time on things that won't work for years.

**The Agent Lab thesis**: They frequently reference the "Agent Lab" framing - it's not just wrapping a model, but understanding how people collaborate and building the right product system around frontier capabilities. This is their core expertise.

**Cater to the model**: Give models what they naturally understand (markdown, SQL) rather than forcing them to learn your internal formats (custom XML, proprietary query languages).

**Teach the top of the class**: Build for sophisticated power users rather than abstracting away capability to serve everyone. The more you simplify for accessibility, the more you "diminish capabilities."

**Platform over center of excellence**: Moving from centralized prompt engineering (5-6 people editing one file) to distributed tool ownership with strong eval infrastructure was critical for scaling velocity.

This case study demonstrates that production-grade agentic systems require not just model capabilities but thoughtful infrastructure, organizational design, evaluation rigor, and product iteration - often over multiple years. Notion's transparency about failures and rebuilds makes this an invaluable reference for anyone building similar systems.
