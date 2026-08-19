---
title: "Building Scalable AI Agents for Go-to-Market Automation at Production Scale"
slug: "building-scalable-ai-agents-for-go-to-market-automation-at-production-scale"
draft: false
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "classification"
  - "structured-output"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "memory"
  - "harness-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "few-shot"
  - "evals"
  - "system-prompts"
  - "langchain"
  - "postgresql"
  - "docker"
  - "monitoring"
  - "security"
  - "cache"
  - "openai"
  - "anthropic"
  - "microsoft-azure"
industryTags: "tech"
company: "Unify"
summary: "UniFi developed an AI agent platform that automates go-to-market research and outreach for sales teams, powering $900 million in pipeline. The company evolved from running millions of asynchronous web research agents to launching a chat-based interface where sales reps interact with agents that can write TypeScript code, manipulate tabular data, and orchestrate API calls. Through aggressive cost optimization including prompt caching strategies, reducing sub-agent usage, implementing efficient tool calling patterns, and moving from expensive sub-agent architectures to smarter main agents that write code, UniFi achieved a 90-95% cost reduction. The platform now enables individual sales reps to perform research and outreach tasks that previously required entire teams, while maintaining strong data tenancy, durability, and observability across cloud-based execution environments."
link: "https://www.youtube.com/watch?v=6898VdRtKDE"
year: 2026
seo:
  title: "Unify: Building Scalable AI Agents for Go-to-Market Automation at Production Scale - ZenML LLMOps Database"
  description: "UniFi developed an AI agent platform that automates go-to-market research and outreach for sales teams, powering $900 million in pipeline. The company evolved from running millions of asynchronous web research agents to launching a chat-based interface where sales reps interact with agents that can write TypeScript code, manipulate tabular data, and orchestrate API calls. Through aggressive cost optimization including prompt caching strategies, reducing sub-agent usage, implementing efficient tool calling patterns, and moving from expensive sub-agent architectures to smarter main agents that write code, UniFi achieved a 90-95% cost reduction. The platform now enables individual sales reps to perform research and outreach tasks that previously required entire teams, while maintaining strong data tenancy, durability, and observability across cloud-based execution environments."
  canonical: "https://www.zenml.io/llmops-database/building-scalable-ai-agents-for-go-to-market-automation-at-production-scale"
  ogTitle: "Unify: Building Scalable AI Agents for Go-to-Market Automation at Production Scale - ZenML LLMOps Database"
  ogDescription: "UniFi developed an AI agent platform that automates go-to-market research and outreach for sales teams, powering $900 million in pipeline. The company evolved from running millions of asynchronous web research agents to launching a chat-based interface where sales reps interact with agents that can write TypeScript code, manipulate tabular data, and orchestrate API calls. Through aggressive cost optimization including prompt caching strategies, reducing sub-agent usage, implementing efficient tool calling patterns, and moving from expensive sub-agent architectures to smarter main agents that write code, UniFi achieved a 90-95% cost reduction. The platform now enables individual sales reps to perform research and outreach tasks that previously required entire teams, while maintaining strong data tenancy, durability, and observability across cloud-based execution environments."
notion:
  pageId: "3c1f8dff-2538-8062-890e-f03f6ba1617e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:05:00.000Z"
  lastEditedTime: "2026-08-19T09:05:00.000Z"
  publishedAt: "2026-08-19T09:15:39Z"
---

## Overview

UniFi is a company building an outbound agent platform for go-to-market automation that has powered $900 million in pipeline. Founded approximately three years ago, the company approached sales and marketing as a search problem: finding people and companies that have problems their product uniquely solves. The co-founder and CTO Connor Hegy discusses the evolution of their agentic systems from early web research agents to a sophisticated chat-based platform that gives sales representatives powerful AI capabilities.

The fundamental thesis is that great salespeople don't just persuade but rather find people whose problems are so acute they'll buy regardless of the pitch. This transforms the sales problem into one of search over massive amounts of unstructured, semantically rich data across the internet, which LLMs excel at handling. The platform evolved from automating research work that teams of 10 sales reps would do into enabling a single growth marketing person to spin off millions of agents monthly.

## Technical Architecture Evolution

The initial version of UniFi's agent system was built on top of LangSmith for tracing and started with GPT-4.0 in a reflect-tool-call loop pattern. The early web agents would take structured questions and options, perform web research, and output structured results. A canonical example was determining whether a company performs KYC compliance work by examining their terms of service, HTML content, and other web artifacts. While this seems trivial now, it was highly novel three years ago.

A major improvement came with the introduction of reasoning models like o1, which enabled a planning step at the beginning of agent runs. This planning phase would generate potential approaches for finding information and identify pitfalls, massively improving quality. The system would then run across a customer's entire total addressable market, finding relevant companies in the long tail that represented high double-digit percentages of potential customers.

The original architecture was built around async, long-running background jobs integrated into a workflow builder with nodes and edges. Users would kick off jobs on thousands or millions of records and come back later as results streamed in. This design prioritized scalability, repeatability, and observability at massive scale with minimal cost.

## Transition to Chat and Coding Agent Paradigm

The recently launched version represents a fundamental shift toward a chat interface where individual sales reps can access all the primitives previously available only to growth marketers and go-to-market engineers. Rather than automating away sales reps, the goal is giving humans more leverage by handling the busy work while they focus on conversations.

The new system operates remarkably similarly to coding agents. The key difference is that while coding agents modify codebases and file systems, UniFi's agents modify database records and generate emails. However, the agents still achieve their goals by writing code. The harness runs in the cloud rather than locally, requiring durability so jobs can restart gracefully if killed mid-execution and can run in background systems independent of server routes or UI connections.

The codebase is entirely TypeScript, so the agents write TypeScript rather than Python, which many other coding agents use. This required custom infrastructure since most agent frameworks assume Python execution environments. The system needed extremely cheap, fast-spinning environments that could scale to handle many concurrent executions while maintaining strict data tenancy to ensure customer data never touches across boundaries.

## Sandbox and Code Execution Strategy

UniFi evaluated several approaches for code execution environments. Full VMs like those from Daytona or LangChain's offerings provide complete file systems and statefulness but introduce complexity around CLIs, tenancy enforcement, networking, and service access patterns. The security concerns around arbitrary code execution and ensuring proper data isolation made this approach challenging.

Instead, UniFi adopted and modified an open source framework called Monty, originally built for Python. Monty provides a real interpreter that can execute code, but crucially allows binding functions that suspend the entire REPL when called. When the agent hits these bound functions, execution pauses, the backend receives the function name and arguments, executes the function in the proper tenancy and billing context, then resumes the REPL with the output injected back in.

UniFi rebuilt this architecture to support TypeScript instead of Python. The ripples run ephemerally within the backend worker processes themselves, accumulating state over time similar to Jupyter notebooks where variables persist across cell executions. This approach provides zero sandbox cost since execution happens within existing infrastructure, eliminates networking complexity, enables first-class tenancy enforcement at function boundaries, and maintains the statefulness needed for complex multi-step operations.

LangChain recently launched something similar using QuickJS for programmatic sub-agent calling, essentially implementing the same pattern for their dynamic workflows and RLM-style approaches.

## Tabular Data Operations

A critical requirement for UniFi's agents is native, efficient operation over tabular data, which represents the core artifact of their product. Rather than giving models direct access to raw tabular data or SQL, UniFi created a class that wraps a virtualized table stored in their PostgreSQL database. This class reimplements pandas-like functions in TypeScript, including filters, row fetching, column reordering, data type changes, and critically, row mapping operations.

The map rows function allows running code snippets over every row in tables containing thousands or hundreds of thousands of records. This is where the cost optimization story becomes crucial. Each row could potentially spawn a sub-agent execution, which even at one cent per row would quickly exhaust usage budgets. By implementing map operations that run programmatically, agents can call multiple APIs in sequence, waterfall through data enrichment steps, and only fall back to expensive sub-agent calls when absolutely necessary.

The interface deliberately doesn't strictly replicate pandas APIs, instead implementing the approximately ten operations agents commonly perform: reordering columns for user visibility, mapping functions over rows, adding/deleting rows, and filtering. This constraint provides enough functionality while maintaining simplicity and ensuring the agent uses tools appropriately. Roughly 80% or more of agent runs involve manipulating these tables in some way, as the core workflow involves identifying prospects and then engaging with them.

## Prompt Caching Strategy and Cost Optimization

UniFi achieved a dramatic 90-95% cost reduction from two weeks before launch to launch day, primarily through aggressive prompt caching optimization. Understanding and exploiting OpenAI's prompt caching behavior became critical to making the product economically viable.

OpenAI's prompt caching system hashes the first 60-70 characters to determine cache routing, but critically, it only guarantees approximately 15 requests per second will hit warm cache. Above that rate, requests route to different GPU racks that must warm their own caches. With high-volume production usage, getting 95% cache hit rates required sophisticated engineering.

The response ID from OpenAI's Responses API provides cache affinity for subsequent calls in a conversation, dramatically improving hit rates compared to the basic API. However, when forking conversations to spawn multiple sub-agents, exceeding 15-20 concurrent forks causes full cache misses on the entire context, which can be extremely expensive with models like GPT-4.5.

Between conversational turns, OpenAI by default removes thinking tokens from previous turns, causing cache misses. While this reduces token counts on average, for UniFi's use case where tool call outputs dwarf thinking token counts, retaining those tokens via a recently released API parameter dramatically improved both cache hit rates and performance, as the model can reference its previous reasoning.

For sub-agents spawned in batches of thousands, UniFi implemented a sophisticated warm-up strategy. They hash user IDs into approximately 16 buckets and combine this with random numbers between 1-30 as prompt cache keys, distributing load across roughly 480 different cache slots that align with their peak throughput patterns. This ensures caches stay warm across users throughout the day rather than causing expensive cold starts.

The prompt caching optimizations are fundamentally impossible for providers to solve because they lack the application-specific knowledge of request distributions, user patterns, and usage contexts. While providers could theoretically accept metadata to predict caching strategies, they have no economic incentive since they charge the same regardless.

## Cost Structure and Optimization Approaches

Beyond prompt caching, cost optimization focused on reducing wasted LLM operations. The original architecture ran too many sub-agents, which proved prohibitively expensive. Moving to a smarter main agent that writes code rather than spawning numerous sub-agents was transformational. The new architecture carefully reserves sub-agents for cases that genuinely require fresh context windows or parallel processing.

A robust planning step at the beginning of each agent run significantly reduced wasted operations. The agent pauses when receiving user requests, thinks through potential solution approaches, scouts out trajectories, and may ask clarifying questions before proceeding. This prevents inefficient tool calling patterns where the agent calls APIs without using the results or calls the wrong sequence of services.

Evaluation infrastructure reveals wasted tool calls as the primary metric to minimize. When agents call data vendors 500 times to return 10 companies, they're burning money without adding value. UniFi maintains dedicated QA sets of 40+ examples for specific problematic patterns, iterating with comprehensive metrics including tool call efficiency, trace efficiency, customer credit costs, and raw LLM costs.

Switching from GPT-4.5 to GPT-4.4 for appropriate use cases provided substantial savings, as did eliminating contradictions in skill files and system prompts that caused the model to make mistakes requiring retries. The team reviewed all instructional content to ensure consistency, removed prescriptive "always" and "never" statements in favor of explaining reasoning, and focused on why rather than what.

Today, LLM costs represent the dominant expense, with tool calls to third-party data vendors representing the secondary cost. The old research agent was optimized to sub-1-cent cost, at which point tool calling actually dominated. For the new agent, the goal is keeping token costs as a small percentage of the data costs being delivered to customers.

## Memory and Personalization Systems

UniFi implemented sophisticated memory systems to personalize agent behavior for individual sales reps. Memory ingestion happens through two paths: a bootstrap process that analyzes integrated Gmail mailboxes to learn writing styles, product positioning, and context-dependent messaging patterns, and an ongoing proposal system that runs approximately every third message during conversations.

The memory data structure lives in PostgreSQL with schemas defining specific types of memories: email voice, rep voice, rep attributes, company attributes, user preferences (both soft and hard), and an other category for miscellaneous learnings. The structured keys ensure reliable recall while values contain arbitrary natural language strings.

The ongoing memory system uses a generate-and-discriminate pattern where the agent overgenerates proposed memories during interactions, then a background cron process runs over proposed and historical active memories to perform maintenance operations. Rather than allowing freeform memory management, the system requires structured lineage operations: merging memory A and B to create C, dropping memory D entirely, or superseding one memory with another.

This structured approach provides crucial observability into the otherwise black-box memory system. When engineers review agent behavior months later, they can trace exactly which memories were merged, superseded, or dropped and understand the reasoning. User preferences explicitly stated with "remember" commands are always inserted as first-class hard preferences, creating a clear hierarchy.

UniFi debated exposing memory UI to end users but decided against it based on user experience intuition. Users can query what the agent remembers about them conversationally rather than viewing bullet points. The team also noted some embarrassment factor in exposing comprehensive memory stores. The exception is skill files, where engineers love writing structured runbooks but most users prefer conversational memory about company-specific processes like Salesforce configurations.

## Model Selection and Distribution Considerations

UniFi runs primarily on OpenAI models via their API, with Azure capacity for failover during incidents. OpenAI was also their first investor, providing strong partnership support. The decision came down to price-performance ratios that enable users to send 30-50 messages and get substantial value on a $20 monthly plan rather than exhausting budgets in single interactions.

The team extensively evaluated open source models, particularly during a major cost reduction effort in Q4 of the previous year. While open source models offer 10x or greater cost reductions on token prices, their tool calling efficiency proved so much worse that they weren't net cost effective. Even at 10x cheaper tokens, the additional wasted tool calls negated savings. Recent models like GLM 5.2 show promise, and the team continues monitoring the space with plans for fine-tuning and custom models.

An important architectural principle is that when using LLMs as judges or for user simulation in testing, the judge must use a different model distribution than the agent being evaluated. Running GPT agents judged by GPT models creates mode collapse analogous to groupthink in humans. UniFi uses Anthropic models for judging when running OpenAI-powered agents, ensuring adversarial rather than overlapping distributions.

Model selection evaluations use pass@k metrics, running each trace approximately five times to account for stochasticity. Recent models like Fable show promising cost-effectiveness by using fewer tokens than Sonnet 3.5, demonstrating that the token efficiency versus capability trade-off isn't straightforward and requires rigorous evaluation infrastructure to assess properly.

## Evaluation Infrastructure and Methodology

UniFi's evaluation philosophy draws heavily from self-driving car development, where the CTO previously worked at Scale AI and a small autonomous vehicle company. In self-driving, the critical gate for deploying models to vehicles wasn't purely metrics but human review of extensive video grids showing different checkpoints across training runs with the current best model for comparison.

Similarly, UniFi emphasizes watching agent traces extensively. Teams sit together reviewing 30 minutes to an hour of examples, taking notes and discussing specifics about what works and fails. There's no better evaluation than examining hundreds or thousands of examples filtered to specific distributions and issues. The system classifies every message by user intent, allowing focused review of how agents handle finding people versus sending emails versus other scenarios.

This human review feeds into regression testing through dedicated QA sets. Examples from trace review are pulled into datasets organized by coverage areas: hero use cases that must work flawlessly, adversarial cases like prompt injection attempts, edge cases like mid-conversation language switching, and problem-specific sets like specific data vendor over-calling.

The team typically iterates on one DQA set at a time, using comprehensive metrics beyond just task success. They measure tool call efficiency, trace efficiency, customer credit costs, and LLM costs. All evaluations run on LangSmith, leveraging the tracing infrastructure they've used since founding the company.

For testing actions with side effects, email sending is straightforward to mock since the agent doesn't need actual delivery confirmation. User interactions during tests are simulated with LLMs playing user roles, though this requires careful distribution management. Data API calls present trade-offs between mocking with replayed responses versus accepting cost hits for real calls. Mocking can miss cases where improved agent behavior would call APIs differently, so often they accept the marginal cost of real API calls on top of already substantial LLM evaluation costs.

## Sub-Agent Patterns: Fork vs. Child

UniFi implemented two distinct sub-agent patterns beyond the main agent: fork sub-agents and child sub-agents. Child sub-agents start with fresh context windows for completely independent tasks. Fork sub-agents take the current conversation context, create a branch, and pass the previous response ID to maintain cache affinity while working on a specific subtask.

The fork pattern excels when performing similar operations over multiple entities after extensive research. For example, after researching five founders and discovering interesting patterns, writing personalized emails to each benefits from forking rather than sequential generation. Forking provides each email generation with the full research context without lossy summarization, maintains prompt cache hits except for small deltas, and enables parallel processing without expanding the main conversation context with all email drafts.

The alternative of summarizing context and passing it to child sub-agents incurs both information loss and cache misses, while also requiring the sub-agent to parse through large summarized inputs. From a theoretical perspective, forking is elegant because the conversation has gotten the model into exactly the right point in distribution space where the next token is precisely what's needed. Forking preserves this positioning rather than trying to recreate it in a fresh context.

However, forking must be managed carefully since exceeding 15-20 concurrent forks causes cache misses. The agent now commonly maps functions over rows that might call multiple APIs in sequence, only falling back to forked sub-agents when other approaches are exhausted. This pattern appears throughout the system and fundamentally enables the economic viability of operating at scale.

## Human-in-the-Loop and Approval Workflows

For actions like sending emails, UniFi implements proposal-and-approval patterns. The right side of the interface displays artifacts similar to Claude's UI, showing tables or email sequences. Users can scroll through, review, edit, and approve emails individually before sending.

Beyond simple approval, second-order interactions proved critical. Users need to highlight sentences and request changes not just for one email but across 100 enrollments. The UI shows one email at a time with full context including recipient name, title, company, and relevant research, rather than trying to display many emails in table columns which becomes too noisy.

The design philosophy follows deep work principles: focusing on one item at a time is more effective than scanning many items simultaneously. Users can quickly move through examples one by one with hotkeys, similar to data labeling tools from Scale AI called "speed audit." By the 15th or 20th email review, users typically have provided enough feedback applying across all emails to feel comfortable sending the full batch.

Interestingly, while UniFi automates discovery and research extensively, they preserve human time for the message crafting stage because that's where sales reps provide unique value. Professional sellers care deeply about perfect personalization, M-dashes, surfing references, and human connection points that represent their competitive advantage. Some users review all thousand emails, some approve after fifteen, depending on their personal quality standards and trust level.

## Deliverability and Infrastructure Foundations

UniFi benefits from having built substantial non-AI infrastructure before the current AI wave. Their managed deliverability system and durable email sending capabilities solved hard problems like guaranteeing exactly-once delivery without double-sends or failures. This existing foundation provided reliable substrate for AI features rather than trying to build everything simultaneously.

Similarly, their workflow execution layer runs on Temporal, providing durable async execution primitives. Temporal's non-blocking sleep and await operations integrate naturally with the agent's async patterns for mapping over rows, spawning sub-agents, and managing long-running operations. This infrastructure handled tenancy, billing, observability, and durability before adding AI complexity.

The architecture separates the "brain" (agent reasoning) from the "hands" (code execution environment), running the agent in backend processes while spinning up ephemeral REPLs for code execution. This separation enables graceful failure handling, proper tenancy enforcement at execution boundaries, and scalable resource management without full VM overhead.

## Observability and Production Operations

Throughout the discussion, observability emerges as a core engineering principle alongside scalability and repeatability. The memory system's structured lineage operations exist primarily for observability. The evaluation infrastructure emphasizes human review of traces. Cost metrics track not just total spend but tool call efficiency and wasted operations.

The team uses structured logging and tracing extensively through LangSmith. When agents behave unexpectedly, engineers can examine exactly which memories were active, which skill files loaded, what tool calls executed, and what the model was thinking. This observability extends to business metrics like cost per message and credit burn rates relative to subscription tiers.

Production operations include per-seat usage limits with pooled credits for overages, similar to Claude or ChatGPT models. The team is implementing per-user guardrails since different users warrant different trust levels for spending. Some internal users spending $7,000-$8,000 monthly on LLM calls are trusted because they're extremely productive, while others might be limited to $500 until they prove value.

Accidental spend represents a real concern, particularly when spinning up thousands of sub-agents. The combination of prompt caching optimization, planning steps to prevent wasted operations, and usage monitoring helps control costs while enabling power users to accomplish substantial work.

## Future Directions and Open Questions

Several strategic questions remain open. Should UniFi implement skill file sharing where successful teams can distribute their best practices to others, or keep curation centralized? The team leans toward memory-based approaches over formal skill files since most users aren't engineers comfortable with runbooks. Company-specific knowledge like Salesforce configurations could live as memories rather than explicit skills.

The semantic linting problem for skill files and system prompts represents an important unsolved challenge. UniFi needs tools to detect contradictions within skill files, across combinations of loaded skills, ensure consistency, check for undesirable patterns like M-dashes or absolute "always/never" statements, and verify alignment with design principles about explaining why rather than what. This seems like a natural product opportunity for something like LangSmith's Context Hub.

Open source models continue improving rapidly. While tool calling efficiency currently makes them net more expensive despite token cost advantages, models like GLM 5.2 show promise. UniFi plans fine-tuning efforts and continues monitoring the space closely, as substantial cost reductions would enable more aggressive feature development.

The RLM paper on semantic merge-sort approaches fascinates the team but remains too expensive for production use. The ability to score 100 accounts by having the model essentially perform merge-sort comparisons over semantic qualities would be transformative, but current costs make it prohibitive. As model costs continue declining, such techniques may become viable.

Overall, UniFi demonstrates sophisticated LLMOps practices around cost optimization, evaluation infrastructure, memory systems, code generation, and production operations. Their evolution from simple web agents to production-scale coding agents executing TypeScript in custom sandboxes while maintaining strict tenancy and managing costs across millions of operations showcases the maturity required for successful AI products serving business-critical workflows.
