---
title: "Building Production Data Agents with Long-Running Context and Iterative Workflows"
slug: "building-production-data-agents-with-long-running-context-and-iterative-workflows"
draft: false
llmopsTags:
  - "data-analysis"
  - "code-generation"
  - "chatbot"
  - "question-answering"
  - "structured-output"
  - "high-stakes-application"
  - "agent-based"
  - "prompt-engineering"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "few-shot"
  - "human-in-the-loop"
  - "error-handling"
  - "multi-agent-systems"
  - "evals"
  - "system-prompts"
  - "mcp"
  - "langchain"
  - "postgresql"
  - "monitoring"
  - "orchestration"
  - "databases"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Hex"
summary: "Hex, a data analytics platform, evolved from single-shot text-to-SQL features to building sophisticated multi-agent systems that operate across entire data notebooks and conversational threads. The company faced challenges with model context limitations, tool proliferation, and evaluation of iterative data work that doesn't lend itself to simple pass/fail metrics. Their solution involved building custom orchestration infrastructure on Temporal, implementing dynamic context retrieval systems, creating specialized agents (notebook agent, threads agent, semantic modeling agent, context agent) that are now converging into unified capabilities, and developing novel evaluation approaches including a 90-day simulation benchmark. Results include widespread internal adoption where users described the experience as transformative, differentiation through context accumulation over time creating a flywheel effect, and the ability to handle complex multi-step data analysis tasks that require 20+ minutes of agent work with sophisticated error detection and iterative refinement."
link: "https://www.youtube.com/watch?v=Xyh1EqcjGME"
year: 2026
seo:
  title: "Hex: Building Production Data Agents with Long-Running Context and Iterative Workflows - ZenML LLMOps Database"
  description: "Hex, a data analytics platform, evolved from single-shot text-to-SQL features to building sophisticated multi-agent systems that operate across entire data notebooks and conversational threads. The company faced challenges with model context limitations, tool proliferation, and evaluation of iterative data work that doesn't lend itself to simple pass/fail metrics. Their solution involved building custom orchestration infrastructure on Temporal, implementing dynamic context retrieval systems, creating specialized agents (notebook agent, threads agent, semantic modeling agent, context agent) that are now converging into unified capabilities, and developing novel evaluation approaches including a 90-day simulation benchmark. Results include widespread internal adoption where users described the experience as transformative, differentiation through context accumulation over time creating a flywheel effect, and the ability to handle complex multi-step data analysis tasks that require 20+ minutes of agent work with sophisticated error detection and iterative refinement."
  canonical: "https://www.zenml.io/llmops-database/building-production-data-agents-with-long-running-context-and-iterative-workflows"
  ogTitle: "Hex: Building Production Data Agents with Long-Running Context and Iterative Workflows - ZenML LLMOps Database"
  ogDescription: "Hex, a data analytics platform, evolved from single-shot text-to-SQL features to building sophisticated multi-agent systems that operate across entire data notebooks and conversational threads. The company faced challenges with model context limitations, tool proliferation, and evaluation of iterative data work that doesn't lend itself to simple pass/fail metrics. Their solution involved building custom orchestration infrastructure on Temporal, implementing dynamic context retrieval systems, creating specialized agents (notebook agent, threads agent, semantic modeling agent, context agent) that are now converging into unified capabilities, and developing novel evaluation approaches including a 90-day simulation benchmark. Results include widespread internal adoption where users described the experience as transformative, differentiation through context accumulation over time creating a flywheel effect, and the ability to handle complex multi-step data analysis tasks that require 20+ minutes of agent work with sophisticated error detection and iterative refinement."
notion:
  pageId: "33df8dff-2538-80eb-b8a5-db9a5aa440f7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-09T17:26:00.000Z"
  lastEditedTime: "2026-04-09T17:39:00.000Z"
  publishedAt: "2026-04-09T18:03:03Z"
---

## Overview

Hex is a data analytics platform built around a notebook interface that allows users to combine SQL, Python, text, and visualizations into complex analytical workflows. The company has been at the forefront of deploying production AI agents for data work, evolving from early text-to-SQL features through to sophisticated multi-agent systems that can conduct extended analysis sessions lasting 20+ minutes.

Izzy Miller, an AI engineer at Hex, provides detailed insights into how the company approached building agents for data analytics, a domain that presents unique challenges compared to coding agents. The conversation reveals extensive detail about their LLMOps practices, including custom orchestration, evaluation strategies, context management, and the evolution of their agent architecture.

## Evolution from Single-Shot to Agentic Workflows

Hex was among the first products to ship text-to-SQL features to paying customers, initially running on GPT-3.5 Turbo. The early implementation was cell-scoped, meaning AI features operated within individual notebook cells rather than across entire projects. This single-shot approach proved fundamentally mismatched to data analytics work, which is inherently iterative. Data analysts rarely get an answer and stop; they follow up, refine, pivot, and explore rabbit holes based on intermediate results.

The company recognized that models needed more context than just individual cells, but early attempts to build cross-project agents failed because the models weren't capable enough. There was a pivotal moment when the team realized model capabilities had reached a threshold where the approach would finally work. The realization came from two factors: tracking the obvious trajectory of model improvements and recognizing that their single-shot approach simply wasn't working for the iterative nature of data work.

When they released the notebook agent internally with a sidebar interface that had access to all the same tools a user could access, the response was immediate and enthusiastic. Users described it as transformative, though often struggled to articulate exactly why beyond noting that answers were better and the experience was superior to alternatives.

## Agent Architecture and Types

Hex developed multiple specialized agents that are now converging into unified capabilities:

**Notebook Agent**: Operates within the notebook environment, writing cells of SQL and Python code that become part of the permanent artifact. Designed for technical users who want to build complex reports or dive deep into analysis. The agent can work for 20+ minutes on complex queries, creating a complete analytical workflow that users can follow, modify, and repurpose.

**Threads Agent**: A more abstracted conversational interface that looks like a chat experience but generates interactive data artifacts. Designed for self-serve users who want to ask questions and get answers without seeing all the underlying code. The code is hidden but the data visualizations and insights are exposed and explorable.

**Semantic Modeling Agent**: Assists with writing YAML documentation for semantic models, both native to Hex and imported from tools like dbt. The interesting aspect isn't just the YAML generation but the sophisticated context harvesting it performs across other Hex artifacts to inform the semantic model.

**Context Agent**: Operates behind the scenes to synthesize information from across the workspace, including notebooks, threads, conversations, and admin guidance. This agent helps resolve the complex information architecture challenge of combining warehouse data, semantic models, user conversations, and administrative context.

Initially these agents were completely separate implementations, but users expected consistent capabilities across different interfaces. This led to architectural changes where capabilities are now organized into bundles that include tools, static context, prompts, and behavioral specifications like final turn behavior. The agents are converging toward having similar capability sets while maintaining different UX presentations.

## Custom Orchestration Infrastructure

Hex built its own orchestration system rather than adopting off-the-shelf frameworks. The decision was driven by the need to move rapidly in a fast-changing environment and maintain control over their specific requirements. This choice came with significant maintenance overhead but allowed them to compensate for model limitations at critical moments.

The company underwent a major infrastructure migration from their original single-shot oriented system to a Temporal-based architecture that supports proper long-running workflow orchestration. This migration required maintaining two systems simultaneously, which was described as tremendously difficult, but it was considered necessary before scaling to additional agents. The new foundation enabled the proliferation of agent types they've since built.

## Tool Management and Proliferation

The notebook agent has access to nearly 100,000 tokens worth of tools, which Izzy acknowledges is too many. Tool proliferation happened through multiple mechanisms. One was unnecessary normalization: separate create, update, and delete tools for charts when a single unified chart tool would suffice. Consolidation efforts showed that merging these reduced token counts without degrading performance.

Another source of tool expansion came from building abstractions above the command-line coding layer. While the agent runs in an IPython kernel-like environment and can execute arbitrary Python code, Hex chose to create specific tools for many operations. For example, they built a tool to check if a package is installed rather than letting the agent run code to discover this.

The rationale for specific tools over generic code execution is behavioral guidance. Specific tools allow encoding when and how to use certain capabilities. However, this creates challenges, particularly with the ephemeral SQL tool.

## Ephemeral SQL and User Experience Trade-offs

The ephemeral SQL tool represents a key design decision. It allows the agent to run investigative SQL queries that don't appear in the final notebook. This serves the iterative nature of data work: before writing a main query, the agent might need to check table schemas, data formats, join key compatibility, and other exploratory work.

The benefit is efficiency and user experience. Instead of error-driven debugging where the agent writes a query, gets an error, refines, and repeats multiple times in the visible notebook, it can investigate quietly and then write a correct query on the first visible attempt. Users see cleaner notebooks with less trial-and-error clutter.

The downside is unintended consequences. Sometimes agents, especially more recent models like GPT-5.4, will run extensive ephemeral queries to be thorough before starting real work. In some cases, particularly with wrong or complex questions, models might run 50 ephemeral SQL queries just to be certain. Other times, the agent answers a simple question via ephemeral query and the user is left wondering where the evidence is, wanting charts and proof rather than the agent's assertion.

This tension reflects a broader challenge around showing work versus efficiency. For technical users working in notebooks, there's an expectation they can follow the logic and verify results. For business stakeholders using the threads interface who don't know SQL or Python, the concept of showing work transforms into something different requiring verification through other means.

## Context Architecture

Hex breaks context into dynamic and static categories. The context harvesting pipeline is considered one of the most interesting and valuable parts of the system, more so than the basic agent loop architecture.

Static context includes things like tool definitions, system prompts, and guides (Hex's version of skills). Guides use progressive disclosure: the agent can see all available guides from a workspace and retrieve them as needed during operation.

Dynamic context involves sophisticated retrieval across the graph of artifacts within Hex: notebooks, threads, conversations, data connections, semantic models, warehouse metadata, and administrative guidance. The challenge is synthesizing these different context types that operate at different scopes (user-level, team-level, workspace-level, admin-level).

The company implemented tool search to handle the large tool surface area, allowing the agent to retrieve relevant tools rather than loading all tools into every context window.

One architectural innovation involves handling static IDs for artifacts. Earlier models would hallucinate or confuse IDs when notebooks had more than 50-60 cells. Hex built a complex reference registry system to map between short references and actual IDs. However, more recent models no longer suffer from this limitation, making the system unnecessary technical debt. This exemplifies a common pattern: sophisticated compensations for model limitations that become hobbling constraints as models improve.

## Memory and Multi-Level Context Conflicts

Memory systems introduce complex challenges around context hierarchy and conflict resolution. User-level memory (remembering individual preferences and past interactions) differs fundamentally from team-level or admin-level context. The data team sets guides and semantic models as authoritative sources, but user memory could contradict this.

For example, if a user tells the agent a metric is defined a certain way, but that definition is wrong or outdated, storing it in memory creates conflicting context layers. Evaluations showed that agents handle contradictory or dissonant information very poorly. When injected with conflicting context, Claude Sonnet 4.6 might spend 30 minutes pondering and enter a collapse mode of second-guessing itself rather than proceeding efficiently.

Currently, Hex is being thoughtful about memory rollout, keeping user memory separate from data team-driven context. The core feedback loop for improvement flows through data teams: users do work, the exhaust is surfaced to data teams through the context studio interface, and data teams improve guides, models, and warehouse context. User memories could inject clutter into this loop.

## Observability and Privacy-Preserving Analytics

Hex built custom internal observability and evaluation tools called "the shoe box," initially designed for AI engineers only. As the line between AI engineer and other engineers blurred—with most features touching AI somehow—the need arose to make evaluation accessible to all engineers.

The company is working to enable anyone to run evaluations to answer two questions: Did my change have the desired effect? Did my change have undesired side effects? This democratization of evaluation is essential as agent features proliferate across the product.

For production observability of real user data, Hex implements privacy-preserving analytics inspired by Anthropic's approach. Rather than exposing raw trace data, they use LLM-as-judge systems to identify clusters of issues, types of failures, and trends over time. This provides actionable insights to admins without compromising user privacy.

The Context Studio gives data team admins a bird's eye view of question patterns, answer quality, and potential problems. LLM judges flag cases where the agent might have been confused or where answers conflict with semantic models. This creates a human-in-the-loop system: the model does work, potentially makes mistakes, these are flagged, data teams improve context, and the loop continues.

Izzy expressed a somewhat controversial opinion that internal observability tools and customer-facing tools like Context Studio should converge. The vision is that customers should use similar tools to understand agent behavior as developers do, with the caveat that raw access to all usage data isn't appropriate for customers. The future direction is making these tools more agentic and higher-level, showing clusters and insights rather than detailed traces.

## Model Selection and API Feature Adoption

Hex tries to stay on the smartest, newest models because data analytics requires general intelligence rather than narrow domain expertise. Currently, they use Claude Opus 4.6 and GPT-5.4, which are extremely capable but have different trade-offs around speed, effort settings, and performance.

The concept of "effort" (called "juice" internally at OpenAI) is a new capability that remains poorly understood. Internal testing with effort pickers produced inconclusive results: sometimes low effort caused spirals while high effort answered quickly, making it hard to determine actual effects. Currently, they try to run at high enough effort to evaluate well without making users wait excessively for simple questions.

New API features like tool search, server-side compaction, and million-token context windows present adoption challenges. Hex uses them where they provide clear benefits. For example, the million-token window helps because it allows compaction at 300,000 tokens rather than 200,000, but filling the entire window causes the model to exhibit strange behavior at the edges.

The labs are using the concept of "in distribution" as psychological leverage to encourage use of proprietary features. The pitch is that using Claude Code agent SDK or OpenAI's stateful server-side execution means being in-distribution for what models were trained on. Izzy remains skeptical about how much this matters once custom tools are introduced, potentially taking systems out of distribution anyway. The trade-offs between being slightly more in-distribution versus being locked into proprietary systems remain unclear, especially given how capable models are at in-context learning with custom harnesses.

## Evaluation Philosophy and Approaches

Hex maintains multiple evaluation sets with different purposes. Standard evaluations use 30-50 carefully crafted examples representing specific failure modes or gotchas, with multiple repetitions rather than vast numbers of variants. The philosophy is that evaluation sets should be small enough to hold in your head, allowing deep understanding of why agents fail rather than just knowing aggregate scores.

Izzy is highly critical of existing data benchmarks, noting issues with incorrect ground truth, problematic grading, buggy deterministic scoring, and unrepresentative questions. Many benchmarks conflate SQL syntax knowledge and needle-in-haystack retrieval with actual analytical reasoning. One popular benchmark mostly tests whether agents correctly treat empty arrays as equivalent to null, which isn't meaningful evaluation of analytical capabilities.

The most interesting evaluations test decision-making during iterative analysis—the behavior where you get an intermediate answer and need to decide whether to accept it, reject it, or explore further. Most public evaluations don't test this at all.

Hex has aspirational evaluation sets where all current models perform poorly. For example, one favorite evaluation uses a real internal sales dashboard where a fan-out bug makes it appear all sales reps are at 900%+ of quota. Every tested model enthusiastically reports the amazing quarter until prompted with "that doesn't seem right," after which they catch the bug in seconds. This tests whether agents notice anomalies proactively, a capability that remains frontier-level difficult.

Another class of evaluations involves starting mid-project in a complex notebook where a user reports an unexpected number. The evaluation is crafted so there's a chain of three bugs in the data and SQL queries that the agent must unravel through thorough exploration. The current notebook state reveals the first bug but obscures the second and third, requiring genuine investigative work.

These evaluations are modeled on real internal Hex usage, acknowledging that data work is hard and even experienced teams make mistakes.

## Long-Horizon Evaluation: Metric City

The most ambitious evaluation effort is Metric City, a 90-day simulation benchmark designed to evaluate long-horizon agent performance and context accumulation. The insight is that evaluating agents on one-shot questions is unfair and unrepresentative when building a platform designed to improve over time.

The simulation starts with a realistic Snowflake warehouse for a fictional company called Shorelane Commerce. The warehouse contains carefully injected data quality problems: nulls, messed up columns, joins that don't quite work, and misleading confusing elements. Many questions are borderline impossible on day zero with available context.

Each simulated day, the clock advances, dbt models run, the warehouse shifts forward in time, new rows appear, things break, new products launch, and fraud occurs. Stakeholder tickets arrive as emails asking data questions and providing information. The agent must respond to tickets, but importantly, after replying it gets an "end turn" tool with the option to do proactive knowledge work: following up on loose threads, documenting findings, cleaning up the wiki, etc.

The agent can work as long as it wants before ending its turn. This continues for 90 days. If the agent demonstrates desired skills and behavior, by day 90 it should achieve 100% on carefully crafted questions that were impossible on day zero. Currently, Claude Sonnet 4.6 gets approximately 4% on day zero and 24% on day ninety, showing improvement but massive room for growth.

The evaluation is extremely expensive to run and remains in a prototype "mad science laboratory" state. It currently evaluates raw model behavior with simple tools rather than the full Hex agent. Part of the goal is research: understanding how models organize wikis, what information they store, how they retrieve it, what they find versus miss. These insights inform harness design.

The inspiration comes from Anthropic's Vending Bench and work by Andon Labs on long-horizon evaluation. Izzy believes one-try evaluations are uninteresting and that honest evaluation must allow agents to learn and compound over time, matching the actual value proposition of platforms like Hex.

## Data Analytics as a Uniquely Difficult Domain

Throughout the conversation, Izzy emphasizes that data analytics presents uniquely difficult challenges for AI compared to coding:

**Iterative decision points**: Unlike coding where you specify requirements and evaluate pass/fail, data work involves many intermediate decisions where you're not just judging good/bad but deciding what to explore next based on interesting findings.

**Verification difficulty**: Code can be verified by whether it runs and meets specifications. Data questions often have vague notions of truth depending on how teams define metrics, when pipelines last updated, or what assumptions are reasonable. The domain resists simple verification.

**Requiring general intelligence**: Data analytics requires understanding business context, statistical reasoning, domain knowledge, and technical execution. It's not a narrow task that benefits from specialized fine-tuning but rather needs broad general intelligence.

**Flexible output formats**: The answer might be a single number, a complex report with multiple visualizations, an interactive application, or anything in between. Evaluating whether a complex multi-chart report effectively answers a question is extraordinarily difficult and often comes down to qualitative judgments about whether it feels "better."

These characteristics make data agents a frontier challenge despite the apparent simplicity of text-to-SQL or answering business questions.

## Building for Context Accumulation as Moat

A key strategic insight is that day-zero agent performance isn't the primary competitive advantage. On day zero, Claude with a Snowflake connector might be roughly equivalent to Hex's notebook agent. The value emerges over time as the platform accumulates context through usage.

Hex is designed so every artifact—notebooks, threads, conversations, projects—becomes a potential source of information for future agent work. Combined with semantic models and admin-curated guides, this creates a flywheel where the platform gets better at an organization's specific analytical work over time. By day ninety, organizations operating within Hex are in a fundamentally different position than those starting fresh with generic tools.

This philosophy directly motivates the long-horizon evaluation approach. If the value proposition is context accumulation creating compounding improvements, then evaluation must measure performance over extended timeframes with learning and adaptation, not just point-in-time accuracy.

## Technical Debt from Model Evolution

A recurring theme is technical debt accumulated from compensating for earlier model limitations. The reference registry system for handling static IDs, originally essential to prevent hallucination with 50+ cells, is now unnecessary baggage. Similar patterns appear throughout the system: features that were critical enablers when models were less capable now constrain agent behavior.

The challenge is identifying and removing these constraints as models improve. With five such compensations, it's manageable to advance them. With five hundred, teams wake up daily discovering arbitrary limitations holding agents back, requiring archaeological investigation to understand why features exist before removing them.

This creates a tension around building custom systems. Custom harnesses enabled Hex to ship transformative agents a year ago by working around model deficiencies at a low, intimate level. But custom systems create proprietary technical debt that's hard to eliminate as models evolve, whereas standardized frameworks might evolve with ecosystem improvements.

## Organizational Evolution: From DevRel to AI Engineer

Izzy's personal trajectory illuminates how LLMOps is changing organizational structures. Originally hired for developer relations and technical marketing, Izzy spent four years building things and talking about them, operating under a philosophy that you shouldn't market anything you can't build yourself.

The transition to AI engineer happened when models—perhaps GPT-4 or around that era—became capable enough that domain expertise plus AI assistance could produce production-quality code. Izzy describes a brief window of writing code by hand, then increasingly copying from AI, and now feeling back at square one relative to coding skills—excellent at reading code but rarely writing it manually.

This reflects a shift in what makes someone valuable for building AI products. Domain expertise, user empathy, strong opinions about how things should work, and instinct for what will be useful matter more than traditional engineering skills when models can handle implementation. Hex has successfully hired from diverse backgrounds: mathematicians, data scientists, and even users who provided enough feedback that the company recruited them.

For AI engineering specifically in data agents, being or having been a data scientist or analyst provides crucial intuition. The agents are effectively playing the role of data analysts, and builders with that background can better recognize when agents are doing weird things that indicate blockers or missed opportunities.

## Visualization and Domain Expertise as Encoded Opinions

Domain expertise becomes particularly irreplaceable in areas like visualization. Hex has team members described as beyond expert level in visualization who now encode strong opinions about how agents should create charts and present data. Sometimes this means directly building capabilities into agents, sometimes it means guiding other engineers to build in more opinionated ways.

In the age of AI products where users can type requests and radically change interfaces, there's a tension between user control and encoded expertise. Hex's position is that strong domain-driven opinions, particularly around visualization and data presentation, should be codified into the product to make it delightful.

Users often struggle to articulate why Hex agents are better beyond vague "it was just better" responses. Deep investigation reveals it's often about presentation: a long report with five well-chosen charts, bullet points, and intelligent offers to explore related questions. This qualitative excellence is nearly impossible to evaluate quantitatively but represents meaningful value.

## Future Directions

The company is actively exploring several frontiers:

**Agent unification**: Continuing to merge separate agents into unified capability sets while maintaining appropriate UX differences for different user types and contexts.

**Proactive memory and suggestions**: Beyond post-hoc synthesis of learnings, exploring real-time suggestion mechanisms during conversations and better handling of multi-level context hierarchies.

**Automated context improvement**: Evolving the human-in-the-loop context studio toward more automated, AI-driven improvements to guides and semantic models based on observed issues.

**Long-horizon evaluation maturity**: Moving Metric City from prototype to production-ready evaluation that can assess the full Hex agent against the 90-day simulation benchmark.

**Faster agent speeds**: As models like GPT-5.3 Codec Spark operate at extreme speeds, UX paradigms around showing users what agents are doing may need radical rethinking. The current approach of expandable/collapsible work summaries may become untenable when agents run thousands of tool calls rapidly.

The overall arc is from single-shot features through multiple specialized agents toward unified capabilities differentiated by context accumulation, with evaluation and improvement loops becoming increasingly sophisticated and automated while maintaining human oversight where appropriate.
