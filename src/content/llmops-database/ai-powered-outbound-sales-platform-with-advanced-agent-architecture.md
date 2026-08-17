---
title: "AI-Powered Outbound Sales Platform with Advanced Agent Architecture"
slug: "ai-powered-outbound-sales-platform-with-advanced-agent-architecture"
draft: false
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "structured-output"
  - "unstructured-data"
  - "chatbot"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "cost-optimization"
  - "latency-optimization"
  - "memory"
  - "harness-engineering"
  - "evals"
  - "semantic-search"
  - "human-in-the-loop"
  - "langchain"
  - "postgresql"
  - "docker"
  - "monitoring"
  - "security"
  - "scalability"
  - "cache"
  - "open-source"
  - "openai"
  - "anthropic"
  - "microsoft-azure"
industryTags: "tech"
company: "Unify"
summary: "Unifi developed an AI agent platform for go-to-market teams that evolved from async web research agents to an interactive chat-based system powering $900 million in sales pipeline. The company addressed the challenge of making sales teams more effective by automating research, data enrichment, and email personalization tasks. Through extensive engineering work on agent harnesses, prompt caching optimization, memory systems, and evaluation frameworks, Unifi achieved 90-95% cost reduction from pre-launch to launch day while enabling sales representatives to leverage thousands of parallel agents for tasks that previously required large teams."
link: "https://www.youtube.com/watch?v=6898VdRtKDE"
year: 2026
seo:
  title: "Unify: AI-Powered Outbound Sales Platform with Advanced Agent Architecture - ZenML LLMOps Database"
  description: "Unifi developed an AI agent platform for go-to-market teams that evolved from async web research agents to an interactive chat-based system powering $900 million in sales pipeline. The company addressed the challenge of making sales teams more effective by automating research, data enrichment, and email personalization tasks. Through extensive engineering work on agent harnesses, prompt caching optimization, memory systems, and evaluation frameworks, Unifi achieved 90-95% cost reduction from pre-launch to launch day while enabling sales representatives to leverage thousands of parallel agents for tasks that previously required large teams."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-outbound-sales-platform-with-advanced-agent-architecture"
  ogTitle: "Unify: AI-Powered Outbound Sales Platform with Advanced Agent Architecture - ZenML LLMOps Database"
  ogDescription: "Unifi developed an AI agent platform for go-to-market teams that evolved from async web research agents to an interactive chat-based system powering $900 million in sales pipeline. The company addressed the challenge of making sales teams more effective by automating research, data enrichment, and email personalization tasks. Through extensive engineering work on agent harnesses, prompt caching optimization, memory systems, and evaluation frameworks, Unifi achieved 90-95% cost reduction from pre-launch to launch day while enabling sales representatives to leverage thousands of parallel agents for tasks that previously required large teams."
notion:
  pageId: "3bbf8dff-2538-80da-b6d8-f4ffe1db2011"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-13T14:24:00.000Z"
  lastEditedTime: "2026-08-13T14:24:00.000Z"
  publishedAt: "2026-08-14T06:57:32Z"
---

## Overview

Unifi is a company that has been building agentic systems for sales and go-to-market teams for nearly three years. Founded on the principle that go-to-market is fundamentally a search problem, Unifi's platform enables sales representatives to find companies and people who have problems their products can solve. The platform has evolved from async background web research agents to an interactive chat-based system that gives sales representatives what the founders describe as "an engineer in their back pocket." The system reportedly powers $900 million in pipeline.

The core thesis is about providing leverage to humans rather than replacing them. Before Unifi, a team of 10 sales representatives might manually research companies and prospects. With Unifi's platform, a single growth marketing person can deploy millions of agents per month to perform this work more scalably, cost-effectively, and quickly.

## Early Agent Architecture and Evolution

Unifi's first system was built using LangSmith for tracing and observability. The initial version used GPT-4 in a reflect-tool-call loop pattern that allowed web agents to answer structured questions about companies. For example, if selling a KYC tool, the agent would research whether a target company performs KYC by examining terms of service, HTML content, and other publicly available information. This was novel three years ago but has become more commonplace.

A major improvement came with the introduction of reasoning models like OpenAI's o1. The team added a planning step where the reasoning model would generate potential approaches for finding information and anticipate pitfalls before the agent began execution. This planning step massively improved quality despite the high cost and slow speed of early reasoning models.

The original system operated as an async, long-running background process. Users would configure workflows using a nodes-and-edges drag-and-drop builder, kick off execution on thousands or millions of records, and return later to see streaming results. The optimization focus was on minimizing costs to enable high-scale execution.

## Transition to Chat-Based Agent with Code Execution

Unifi recently launched a new version that brings their agentic primitives into a chat interface for individual sales representatives. This represents a shift from batch background processing to interactive assistance while maintaining the scalability, repeatability, and observability principles the team values.

A key insight driving this evolution is that frontier models have become excellent at engineering tasks. Rather than running millions of individual web research agents, the new system intelligently chains API calls programmatically, similar to how an engineer would approach pulling data for a million companies. The agent writes code to orchestrate these API calls efficiently.

## Agent Harness and Code Execution Environment

The team designed their agent harness with specific criteria in mind:

The harness runs in the cloud rather than on local machines, which is essential for sales representatives who don't want local execution. This cloud execution requirement drove several design decisions around durability, quick spin-up and spin-down of environments, and low cost for running many parallel agents.

The entire codebase is TypeScript, so they needed the agent to write TypeScript rather than Python. They needed strong multi-tenancy guarantees where data between customers can never touch, which must be provably impossible rather than just deterministically encoded.

For the execution environment, they evaluated full VM approaches but found them too complex for their needs, particularly around networking, CLI wrapping, and tenancy enforcement. Instead, they adopted and modified an open-source framework called Monty, originally designed for Python. They rebuilt it to support TypeScript execution in ephemeral REPLs that run within their backend process.

The key innovation in their approach is host function injection. When the agent's code execution hits certain functions, the REPL suspends and breaks out to the host process. The backend receives the function name and arguments, executes it within the proper tenancy and billing context, then resumes the REPL with the results. This pattern is similar to QuickJS approaches used elsewhere.

This architecture means sandbox costs are essentially zero since they're running TypeScript in lightweight REPLs rather than spinning up full VMs.

## Tabular Data Operations

A critical capability is operating over tabular data, which represents most of Unifi's customer workflows. The team implemented a virtualized table abstraction backed by their PostgreSQL database, then re-implemented pandas-like functions in TypeScript on top of this class. Key functions include filters, fetching rows, adding/removing rows, reordering columns, changing data types, and mapping functions over rows.

The map function is particularly important because it enables running sub-agents over individual rows. In their architecture, a sub-agent is simply a function call that can receive parameters including prompts, model selection, and reasoning budget. The agent can kick off these jobs asynchronously, receive handles to running jobs by ID, and await or poll them.

The team intentionally didn't strictly replicate the pandas API, debating this extensively. They also considered giving direct SQL access but were concerned about security and tenancy enforcement. They ultimately chose a curated set of operations that cover the 10-12 most common patterns agents need.

A clever optimization is that when the agent writes code to map over rows, it can waterfall through cheaper API calls before falling back to expensive sub-agent calls. For instance, with a thousand rows at one cent per sub-agent call, that's $10 against a $20 base plan. By structuring operations programmatically, the agent first tries cheaper data APIs and only uses sub-agents as a fallback for difficult cases.

## Prompt Caching Strategy

Prompt caching proved critical for Unifi's economics. The team reports a 95% cache hit rate, which they describe as essential for their product to be viable. They invested heavily in understanding and optimizing OpenAI's prompt caching behavior.

Key learnings about prompt caching include:

OpenAI hashes the first approximately 60-70 characters to create a cache key and routes based on that hash. The cache key is limited to roughly 15 requests per second. If you send 100 requests matching the same prefix in one second, only about 15 will hit the cache initially. The other 85 route to different GPU racks that warm their own caches, improving subsequent hit rates.

After the first message, OpenAI uses the response ID for routing when using the Responses API, which everyone should use according to the team because it retains thinking traces between calls and improves quality by 20-30%.

Forking to multiple sub-agents can cause cache misses if you exceed certain thresholds. Spinning up 10-15 forks is probably fine, but 20+ likely causes full cache misses on the entire context window.

By default, OpenAI removes thinking tokens from previous turns when processing the next message, causing cache misses. OpenAI recently released an API parameter to retain these tokens, which immediately increased cache hit amounts significantly. This also helped with speed and cost since tool call outputs are much larger than thinking tokens.

For sub-agents running in parallel, Unifi uses a sophisticated distribution strategy. They hash user IDs into 16 buckets and add a random number between 1-30, creating approximately 480 possible cache keys. This distributes the warm cache across users throughout the day based on their peak throughput patterns. This approach works because Unifi has knowledge about their request distribution that the model provider doesn't have. The team believes this optimization cannot be built into providers because they lack context about user tenancy, sub-agent batches, and usage patterns.

## Sub-Agent Patterns: Child vs Fork

Unifi implements two types of sub-agents:

Child sub-agents start with a fresh context window for completely independent tasks. Fork sub-agents take the current conversation state and fork it, passing the previous response ID to maintain context while pursuing a specific task.

The fork pattern is valuable when researching multiple entities and then wanting to perform parallel operations on each. For example, after researching five founders and finding similarities, the agent can fork five sub-agents to write personalized emails to each, all executing in parallel with the full research context available.

The team argues against summarizing context for sub-agents. Summaries are lossy, or if not lossy, they're large enough to cause prompt cache misses. Additionally, when the main agent has gotten the conversation into the right semantic space through interaction, forking preserves that distribution while a fresh sub-agent with summarized context would be starting from a different point in the language model's distribution.

## Memory System Architecture

Unifi implements a sophisticated memory system for personalization. When users integrate their Gmail mailbox, the system analyzes their entire inbox to learn not just general tone but specifically how they talk about their product to different types of people.

The memory system has two modes of operation. There's an upfront bootstrap process that extracts initial knowledge from sources like email history. Then there's an ongoing system that runs approximately every three messages during conversations.

The ongoing system operates in a proposal-and-approval pattern. It over-generates proposed memories from conversations, marking them as draft memories. A background cron job then processes these drafts alongside active memories through a justification step. The system must explicitly choose operations like merging two memories, deprecating a memory, or promoting a draft to active status.

Importantly, the system maintains structured lineage. When processing memories, the agent can't simply decide what to do with all current and new memories at once. It must explicitly state operations like "merge memory A and memory B into new memory C" or "drop memory D completely," and each memory is marked with its status and history.

Memory types are structured with fixed keys but arbitrary string values. The schema includes categories like email voice, rep voice, attributes about the rep, attributes about the company, user preferences, soft user preferences, hard user preferences, and an "other" bucket. The team chose not to allow arbitrary keys because every added dimension of complexity is multiplicative rather than additive in agent systems.

The hardest part of the memory system is getting the LLM to decide what to remember, not the data structure itself. By enforcing a fixed structure focused on what matters for sales representatives, Unifi applies their domain knowledge as an inductive bias.

Direct user preferences, where someone explicitly says "remember to always X," are stored as a top-level first-class concept that always gets priority. The team notes that many users ask the agent to "talk like a pirate" or "talk like a dude bro," which adds delight to the product.

Memory is stored in PostgreSQL and is not currently exposed in a structured UI, though users can ask the agent what it remembers. The team debates whether to show memories more explicitly, with the CTO noting he doesn't personally want to see bullet points about himself and feels somewhat embarrassed about what the agent knows.

## Evaluation Framework

Unifi's evaluation philosophy draws heavily from the CTO's experience in self-driving car development. At that self-driving company, the gate for deploying a model wasn't just metrics but a DQA video review process. The team would watch 1.5-2 hours of video showing 7-second clips in a grid comparing different model runs and checkpoints against the current best model. They would sit as a team, take notes, and discuss what worked and what didn't.

Unifi applies this principle by looking at hundreds or thousands of examples, often filtered to specific distributions of user intents. They classify every message by intent categories like "trying to find people" or "trying to send emails" and review many examples within each category to understand how the agent harness is performing.

For regression testing and iterative improvement, they pull traces into datasets called DQA sets that cover specific usage distributions. These might include hero use cases that should work perfectly, adversarial cases like prompt injection attempts, or edge cases like mid-conversation language switching.

They typically iterate on one DQA set at a time. For example, when one data vendor was being called excessively, they pulled 40 examples of this failure mode into a dataset and iterated with metrics including tool call count, trace efficiency, customer credit cost, and LLM cost.

All evaluations use LangSmith for execution. They run with pass@k evaluations, typically five runs of each trace, to account for variability.

For testing services that cost money or take actions, they mock email sending since the agent doesn't need real results. For user interaction, they use another LLM to play the user, but they enforce a critical rule: the judge or user simulation LLM must never be the same model as the primary agent. If running GPT on the agent, they use Anthropic for judging. This prevents mode collapse and groupthink-like behavior that occurs when agents interact with distributions too similar to their own.

For API calls to data vendors, they have two modes: mocking with replayed responses for speed, or taking the actual cost hit and running real calls. They often choose the latter because mocked responses might not reflect new, more efficient API usage patterns. Since they're already spending significantly on LLM costs for evaluations, the data API costs are marginal.

The team emphasizes that observability is critical in LLM engineering because so much is a black box. They impose structure to make systems observable, for example requiring explicit lineage in memory operations so that three months later when reviewing a decision, they can understand why the agent merged certain memories.

## Cost Optimization Journey

Unifi achieved a 90-95% cost reduction from two weeks before launch to launch day. Pre-optimization, users would have exhausted a $20 monthly plan on a single message, making the product economically nonviable.

Major optimization efforts included:

Moving from many sub-agents to a smarter main agent that writes code has been the single biggest impact. Reducing wasted tool calls to vendors became a primary evaluation metric, particularly ensuring the agent only calls functions whose results it will actually use.

Adding a robust planning step at the beginning where the agent pauses to think about potential approaches and asks clarifying questions before execution proved highly valuable. During planning, the agent scouts out multiple potential trajectories and selects the most efficient path.

Systematically reviewing skill files and system prompts to eliminate contradictions. Every contradiction led to messed-up tool calls and inefficiencies.

Moving from GPT-4 to more cost-effective models where possible and optimizing the mix of model choices across different parts of the system.

The team also considered what they call semantic linters for skill files, similar to code linters. These would check for self-consistency within a skill file, consistency across all combinations of loaded skill files, and semantic issues. They want both programmatic rules (no em dashes if they have a style guide against them) and semantic understanding (not using language like "always do this" or "never do that" because models should understand the why rather than following rigid rules).

## Model Selection and Evaluation

Unifi primarily uses OpenAI models through the OpenAI API, with some capacity on Azure for failover during incidents. OpenAI was also their first investor and they describe the partnership as strong.

The decision was straightforward based on price-performance ratio. For a $20 monthly plan, they want users to send 30-50 messages and get substantial value rather than exhausting credits on one message. Keeping token costs as a small percentage of the data value they provide is a key principle.

They evaluated open-source models extensively during a Q4 cost reduction effort where they brought their research agent cost below one cent per execution. However, they found that open-source models were so much less tool-efficient that even if they were 10x cheaper on tokens (which they weren't), the tool inefficiency made them net more expensive.

They continue monitoring open-source model progress, noting interest in GLM-5.2 and planning to fine-tune their own models soon. Recent models like Claude Sonnet 3.5 and newer releases require re-evaluation because the trade-offs keep changing. Sonnet 3.5 used too many tokens, making it expensive, while newer models might be more cost-effective.

The team emphasizes that rigorous evaluation with pass@k runs across multiple model variants is the only way to make informed model choices. They run each trace five times to account for variability when comparing models.

## Human-in-the-Loop for Email Sending

For email sending workflows, Unifi implements a proposal-and-approval system. The agent creates emails that appear in an artifact view similar to Claude's interface, showing a full or near-full screen view on the right side.

For single emails, users can scroll, read, edit, and approve. For batch operations involving hundreds or thousands of emails, the UX becomes more sophisticated. The team experimented with showing full emails in table columns but found it too noisy.

Instead, they adopted a one-at-a-time review pattern inspired by an internal tool at Scale AI called "speed audit." Users queue up work and use hotkeys to rapidly review items sequentially. This leverages deep work principles where focused sequential attention is more effective than trying to parse many items simultaneously.

Each email view shows the full message plus all relevant context: who they're reaching out to, job title, company, and other information needed for judgment. While reviewing one email at a time, users can provide modifications that apply across the entire batch.

In practice, users typically review the first 15-20 emails out of a thousand, provide feedback that applies broadly, and then approve the entire batch. Sales representatives want to spend time on this part of the process because the personalized message is their "secret sauce," not the research that led them to the prospect.

## Personalization at Scale

Unifi's personalization goes beyond tone matching. When users integrate Gmail, the system learns how they talk about their product to different personas, not just generic writing style. This understanding is pushed into the memory system for recall during email generation.

The system distinguishes between explicit "remember this" instructions from users, which become hard preferences, and learned preferences from observing behavior. For example, if a user asks to make one email funny, that doesn't mean all emails should be funny—it might be a one-off for a friend. The system needs to distinguish between durable preferences and situational requests.

## Infrastructure and Durability

The backend uses Temporal extensively for durable workflow execution. Non-blocking sleeps and awaits are first-class requirements because cloud execution can't rely on blocking operations that might outlive server route timeouts.

All async operations, including sub-agent execution and row mapping functions, return job handles that can be awaited or polled. This enables the agent to kick off parallel work and manage it programmatically.

The team architected for strong observability throughout, treating it as a core requirement alongside scalability and repeatability. This observability extends from memory lineage to tool call tracking to cost attribution.

## Team and Market Context

The company has been building for three and a half years, starting before the current AI wave, which the CTO views as fortunate because it forced them to build strong foundational engineering. They had robust deliverability systems, durable email sending (guaranteeing exactly-once delivery), and workflow infrastructure before adding AI capabilities.

They observe that AI adoption in sales is still early. Everyone is using AI somehow, but teams haven't standardized on best practices. Sales leaders frequently ask how to identify the most effective AI usage patterns and get their teams to adopt them consistently.

The team's thesis has always been augmentation rather than replacement. Many companies tried to automate sales representatives away with mixed success. Unifi believes humans won't be replaced in sales—the CTO notes he certainly doesn't want to buy from an AI agent. The goal is giving sales representatives leverage by automating the engineering-like support work while preserving human relationship building.

## Technical Philosophy and Trade-offs

Several themes emerge from Unifi's technical approach:

They heavily favor observability and explicit structure over black-box behavior, even when it adds engineering complexity. Memory lineage, tool call tracking, and structured operations all serve this principle.

They apply domain knowledge as inductive bias wherever possible, from memory schemas focused on sales to optimization strategies based on their usage patterns.

They carefully balance cost, quality, and speed across the stack, recognizing that cost optimization directly enables product value at their price points.

They invest heavily in evaluation infrastructure, drawing on lessons from ML and self-driving domains where model deployment requires more than just metric thresholds.

They make architectural choices that favor their specific constraints (cloud execution, multi-tenancy, TypeScript codebase) rather than following generic patterns, even when it means building custom solutions like their TypeScript REPL environment.

The company represents a mature approach to production LLM systems, having evolved through multiple architectural generations while maintaining focus on customer value, cost efficiency, and operational reliability.
