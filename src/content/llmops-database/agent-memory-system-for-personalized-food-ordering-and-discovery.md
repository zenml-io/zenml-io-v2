---
title: "Agent Memory System for Personalized Food Ordering and Discovery"
slug: "agent-memory-system-for-personalized-food-ordering-and-discovery"
draft: false
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "content-moderation"
  - "embeddings"
  - "vector-search"
  - "semantic-search"
  - "rag"
  - "prompt-engineering"
  - "memory"
  - "agent-based"
  - "multi-agent-systems"
  - "chunking"
  - "llama-index"
  - "langchain"
  - "pinecone"
  - "chromadb"
  - "qdrant"
  - "postgresql"
  - "redis"
  - "cache"
  - "fastapi"
  - "monitoring"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash built an agent memory system to power their Ask DoorDash conversational ordering experience, addressing the challenge of enabling AI agents to maintain persistent, structured understanding of user preferences across sessions. The solution connects their long-term memory platform with live agents through a three-layer architecture: offline memory generation that distills behavioral history into structured blocks, a distributed storage layer with vector search capabilities, and a tooling orchestration layer that handles task-aware retrieval, conversational memory extraction, and context engineering. Early production data showed grocery agent sessions backed by memory converted to checkout at ~24% higher relative rates, restaurant queries converted at ~15% higher rates, and sessions were ~33% less likely to misunderstand user intent compared to baseline sessions without computed memory."
link: "https://careersatdoordash.com/blog/building-ask-doordash-part-two-intelligence/"
year: 2026
seo:
  title: "Doordash: Agent Memory System for Personalized Food Ordering and Discovery - ZenML LLMOps Database"
  description: "DoorDash built an agent memory system to power their Ask DoorDash conversational ordering experience, addressing the challenge of enabling AI agents to maintain persistent, structured understanding of user preferences across sessions. The solution connects their long-term memory platform with live agents through a three-layer architecture: offline memory generation that distills behavioral history into structured blocks, a distributed storage layer with vector search capabilities, and a tooling orchestration layer that handles task-aware retrieval, conversational memory extraction, and context engineering. Early production data showed grocery agent sessions backed by memory converted to checkout at ~24% higher relative rates, restaurant queries converted at ~15% higher rates, and sessions were ~33% less likely to misunderstand user intent compared to baseline sessions without computed memory."
  canonical: "https://www.zenml.io/llmops-database/agent-memory-system-for-personalized-food-ordering-and-discovery"
  ogTitle: "Doordash: Agent Memory System for Personalized Food Ordering and Discovery - ZenML LLMOps Database"
  ogDescription: "DoorDash built an agent memory system to power their Ask DoorDash conversational ordering experience, addressing the challenge of enabling AI agents to maintain persistent, structured understanding of user preferences across sessions. The solution connects their long-term memory platform with live agents through a three-layer architecture: offline memory generation that distills behavioral history into structured blocks, a distributed storage layer with vector search capabilities, and a tooling orchestration layer that handles task-aware retrieval, conversational memory extraction, and context engineering. Early production data showed grocery agent sessions backed by memory converted to checkout at ~24% higher relative rates, restaurant queries converted at ~15% higher rates, and sessions were ~33% less likely to misunderstand user intent compared to baseline sessions without computed memory."
notion:
  pageId: "384f8dff-2538-8083-96df-e316833f4748"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-19T11:04:00.000Z"
  lastEditedTime: "2026-06-19T11:04:00.000Z"
  publishedAt: "2026-06-19T11:08:33Z"
---

## Overview

DoorDash's agent memory system represents a comprehensive LLMOps implementation designed to bridge the gap between offline user intelligence and live AI agent interactions. The system powers Ask DoorDash, an agentic ordering experience that helps consumers discover food, build shopping lists, and reorder groceries through natural language conversations. The fundamental insight driving this work is that memory serves as the threshold separating useful agents from merely impressive ones—agents need persistent, structured understanding of user preferences, constraints, habits, and history that adapts over time.

The business case for this investment is validated through early production metrics. Grocery agent sessions utilizing full memory profiles achieved approximately 24% higher relative checkout conversion rates compared to baseline sessions without computed memory, alongside a 17% increase in average basket size and 7% reduction in conversational turns. Restaurant assistant queries showed 15% higher relative conversion on open-ended queries. Quality evaluations revealed that sessions with memory were 33% less likely to misunderstand user intent and 24% less likely to generate egregiously irrelevant results, suggesting the system provides meaningful improvements to both transactional outcomes and user experience quality.

## Architectural Foundation

The system implements a three-layer architecture, each with distinct responsibilities. The **long-term memory layer** runs offline batch LLM pipelines that transform order history and behavioral signals into structured memory blocks. These blocks include dietary preferences, dining patterns, item brand affinities, item taxonomy patterns, store preferences, and cross-channel behavioral patterns. Each block consists of a concise header with supporting evidence formatted for LLM consumption. For users with hundreds of orders, this distills historical engagement into approximately 100+ discrete facts.

The **managed agent services layer** provides distributed SQL storage with vector search capabilities. It stores memory blocks alongside their embeddings, supports semantic search via approximate nearest neighbor (ANN) algorithms, and provides multi-tenant isolation through namespace partitioning. This persistence layer is deliberately agnostic to specific tasks or agents—it focuses solely on storage and retrieval primitives.

The **tooling orchestration layer** serves as the connective tissue between generation and persistence. On the write path, it formats and ingests memory blocks. On the read path, it handles query planning, retrieval, ranking, and context packaging for live agents. This layer also implements conversational memory extraction, transforming transient agent interactions into durable knowledge that flows back into long-term storage.

## Memory Typology and Lifecycle Management

The platform maintains three complementary memory types operating at different timescales. Long-term memory synthesizes durable preferences from behavioral history at a specified offline cadence, organized into versioned memory blocks. In-session context captures real-time signals about current intent, such as cart contents, active searches, and items viewed or rejected, with recency weighting that allows current behavior to override historical patterns. Conversational memory captures preferences users state directly during conversations, treated as immediate facts requiring explicit modification to change.

Critically, DoorDash recognizes that not all facts share the same lifecycle. Stated dietary self-descriptions like veganism or gluten-free preferences change rarely and carry no time-to-live (TTL), persisting until explicitly contradicted. Food preferences evolve slowly. Ordering patterns exhibit seasonal variation. Pantry staples get consumed and replenished on item-specific timescales. The system rejects blanket decay policies in favor of fact-specific lifecycle management—a fact's durability is a function of what it represents rather than a uniform age threshold.

## Ingestion Pipeline and Embedding Strategy

The ingestion pipeline implements two parallel paths to ensure retrieval is never blocked by embedding computation. Block content lands in storage immediately, making it available to agents with zero wait time for embedding computation. Embeddings are generated asynchronously via message queue, decoupling ingestion throughput from embedding latency. The storage service supports dynamic server-side embedding at write time, which became the primary production path.

This embedding strategy evolved significantly during development. The team initially evaluated three approaches: pre-computed static embeddings, server-side embedding at write time, and query-time embedding. While static embeddings optimize read latency, the team ultimately migrated to dynamic server-side embedding as the primary approach because it provides critical architectural flexibility. Static embeddings freeze model choices at ingestion time, forcing complete corpus reprocessing when upgrading embedding models. Server-side embedding allows transparent model swapping, makes new facts immediately searchable without separate synchronization pipelines, and significantly improves long-term maintainability. For bulk ingestion when offline pipelines process millions of users, the system accepts pre-computed embeddings to maximize throughput. For real-time writes like conversational facts or profile updates, dynamic embedding keeps the architecture simpler.

## Multi-Tenant Partitioning Strategy

Memory is partitioned along two dimensions: signal type and consumer identity. Different signal types—brand affinities, taxonomy patterns, textual profiles, conversational facts—live in strictly isolated namespaces. This guarantees independent scaling per signal type, clean access-control boundaries, and domain safety that prevents a grocery agent querying brand preferences from inadvertently surfacing restaurant data.

However, some namespaces are deliberately shared across verticals. Durable cross-vertical facts like household composition, lifestyle signals, vegetarianism, or recurring habits live in unified namespaces so facts saved during grocery order conversations become immediately available to other agents. This design creates a memory surface that feels coherent to consumers—the agent that learns a household cooks vegetarian is not the only one that remembers it.

## Task-Aware Memory Orchestration

To agents, the memory system surfaces as a set of simple, intuitive tools that abstract away the complexity of a four-stage pipeline. **Intent and scope resolution** determines exactly what to query based on the current task. Recipe requests trigger searches against brand and category preferences. Reorder requests pull from order history and replenishment signals. Restaurant discovery requests reach for cuisine tendencies, daypart preferences, and price sensitivity. The resolver manages freshness constraints, recognizing that recent order activity requires stricter recency floors than long-stated lifestyle preferences.

**Query planning** translates resolved intent into executable queries parameterized along three axes. Modality determines the search mechanism: semantic similarity over embeddings, deterministic keyword matching, or direct structured fetch when the exact data slice is known a priori. Target scopes searches to specific namespaces or memory chunks. Filter envelopes establish boundaries through top-K limits, similarity floors, fact-category constraints, and strict recency windows. Because strict post-filtering naturally drops candidates, the planner automatically over-fetches to guarantee agents receive sufficient relevant facts for reasoning.

**Retrieval and ranking** executes search queries in parallel across memory partitions with graceful degradation if individual sources fail. Results are scored by semantic similarity, then merged and deduplicated. Recency signals break ties between equally relevant facts. For certain agent surfaces, semantic search alone proves insufficient. When agents reason about shopping lists and need to look up specific brand or category preferences by name, deterministic keyword search offers lower latency and transparent scoring.

To make keyword search practical, the system exposes a Memory Bank Index—a compact directory listing which tokens actually exist in each namespace for that user, injected into the system prompt once per session. The retrieval tool's description explicitly instructs agents to anchor patterns on this index, using it as a grounding affordance that prevents wasting tokens on vocabulary guessing. For massive memory surfaces like order history or conversation logs, pulling full payloads immediately is too expensive. The memory tool exposes a scan action allowing agents to execute cheap parallel directory checks for lightweight metadata (counts, availability, summary categories) before deciding what to read at full token cost.

**Context engineering** returns structured results ready for agent use. Each result carries fact ID, category, content, timestamp, and relevance score. Agent task-specific instructions, managed through a skill-based prompt management system, determine exactly how to use results: as context for reasoning, as input to product search, or as strict exclusion criteria like "user has olive oil at home, skip it." The unified tooling interface works identically across different agents with fundamentally different needs, but receives vertical-aware behavior through different extraction rules, retrieval sources, and ranking signals.

## Conversational Memory Extraction Pipeline

Raw conversation logs do not scale as long-term memory because they are noisy, duplicative, and unstructured. A single shopping session might produce 20 turns of dialogue, most of it transient—fleeting search results, generic order confirmations, raw tool responses. Storing entire logs and running semantic searches over them later yields terrible signal-to-noise ratios. The conversational memory system bypasses this scaling trap through a three-stage asynchronous extraction pipeline.

**Signal emission** occurs immediately after user turns complete. The agent initiates a tool call to execute a memory extraction job in the background as a fire-and-forget operation, adding zero latency to the live user experience. **Extraction and classification** uses a dedicated LLM to evaluate raw conversation and isolate durable facts from ephemeral chatter. The extraction prompt serves as a strict policy gate enforcing explicit guardrails around what can be committed to long-term storage.

The system distinguishes between what to save (explicitly stated, stable facts like household composition, brand preferences, recurring habits) and what to ignore (one-off requests, casual browsing behavior, passing mentions). Durability rules adapt by vertical. In restaurant contexts, a user saying "I don't want ramen" is treated as transient unless they use explicit durability language like "always" or "never"—saving it without that signal would make the agent stop offering noodle dishes in the future based on a passing mood. In grocery contexts, the rule flips: casually stating "I prefer Oatly" is exactly the kind of durable brand signal the agent is designed to capture.

The system also distinguishes between active and passive intent. Preferences like price sensitivity are saved when consumers initiate the framing ("What's cheap at Safeway?"), not when they merely accept a cheaper store the agent volunteered. Passive acceptance is treated as transient, not durable signal. **Deduplication and consolidation** searches for existing memories about the same topic before writing new facts, preventing duplicates, merging overlapping facts, updating refined preferences in place, and resolving contradictions by removing outdated entries.

## Safe Deletion Mechanics

Forgetting data safely is significantly harder than remembering it. If a user instructs the agent to "forget that I prefer Nova's grilled cheese," naive vector similarity thresholds or loose substring matching risks over-deleting adjacent valuable memories about "Nova" or "cheese." The implementation uses a two-stage approach. First, semantic search on the deletion query gathers a candidate set. Second, a separate LLM call receives the candidates and the original natural-language deletion request with explicit instruction not to remove facts that are merely related but do not match the deletion intent. The model returns indices to delete while everything else stays. Selected deletes execute in parallel. Unlike save operations which are fire-and-forget, delete is synchronous so agents can confirm in their reply exactly what was forgotten.

## The Memory Flywheel and Compounding Loop

The conversational memory flywheel works because better memory produces better agent behavior, which produces more opportunities to capture memory. When an agent accurately captures a fact like portion size, it can proactively auto-scale recipe quantities in future sessions without prompting the user. This frictionless experience builds user trust, driving deeper engagement. Deeper engagement inherently surfaces higher-quality conversational signals, feeding more structured facts back into the long-term store and continuously accelerating the personalization loop.

## Context Budget Management and Exclusion Logic

One non-obvious lesson DoorDash highlights is that exclusion is often harder than inclusion. Users with 100+ memory blocks and finite context windows need aggressive pruning. Including irrelevant facts doesn't just waste tokens—it actively degrades model reasoning. The team observed this directly: too many competing facts injected at once caused agents to start dropping instructions. The pantry staple workflow illustrates this challenge. Instead of adding pantry items to shopping lists and letting users remove them, the agent proactively excludes items users already have at home. Getting this right required task-aware retrieval that understands which facts actually matter for the task at hand, not just pulling the most similar facts.

## Production Validation and Evaluation

DoorDash's early production validation analyzed a representative seven-day window comparing sessions backed by consumer memory against baselines with no computed memory. While these metrics reflect early rollout snapshots rather than long-term longitudinal trends, the directional data demonstrates clear improvement. For grocery agents, utilizing full memory profiles drove approximately 24% higher relative checkout conversion rates, 17% increases in average basket size, and 7% reduction in conversational turns, indicating the system surfaces correct products faster by avoiding starting from zero. Restaurant assistants achieved approximately 15% higher relative conversion rates on open-ended queries, where personalized alignment is uniquely critical.

Quality evaluations using LLM judge evals revealed that operating without this system introduces significant user friction. Baseline sessions with memory were approximately 33% less likely to misunderstand user intent and approximately 24% less likely to generate egreglessly irrelevant results. The consistent margin of improvement across both transactional and quality metrics validates the core architectural thesis that structured long-term context provides a critical technical baseline for keeping live agents accurate, efficient, and aligned with user expectations over time.

## Critical LLMOps Learnings

DoorDash emphasizes several critical lessons learned. **Memory changes the quality bar**: "Magic moments" like remembering pantry staples, auto-scaling recipes for preferred portion sizes, or surfacing the right brand without being asked provide concrete validation that long-term memory fundamentally changes the quality of agent interactions. Memory isn't a nice-to-have feature—it's the threshold separating useful agents from merely impressive ones.

**Personalization as tooling infrastructure**: When building memory layers for AI agents, it's easy to fall into the trap of designing for the first immediate use case. Treating memory as an agent-specific feature forces every subsequent team to independently solve the same fundamental problems: query planning, context budgeting, extraction, and deduplication. By treating memory as a tooling layer, DoorDash decoupled memory orchestration from specific agent runtimes, creating an infrastructure pattern that is highly generalizable across multiple agents.

The team's approach to treating memory as infrastructure rather than feature-specific functionality represents a mature LLMOps perspective that prioritizes reusability and long-term maintainability over short-term implementation speed. This architectural decision enables the same memory infrastructure to power fundamentally different agent experiences—grocery shopping, restaurant discovery, recipe assistance—without duplicating core orchestration logic.

## Balanced Assessment

While DoorDash presents compelling production metrics, several caveats warrant consideration. The reported improvements reflect a seven-day snapshot during early rollout rather than sustained long-term performance. Conversion rate improvements of 15-24% are significant but come from comparing against baselines with "no computed memory"—the incremental value over simpler personalization approaches remains unclear. The ~33% reduction in intent misunderstanding measured by LLM judge evals introduces potential evaluation bias since LLM judges may favor outputs from LLM systems using richer context.

The architectural complexity introduced—three-layer memory architecture, asynchronous extraction pipelines, multi-stage deletion workflows, task-aware query planning—represents substantial engineering investment. The case study doesn't address operational costs around embedding computation, vector search latency at scale, or the overhead of maintaining separate extraction LLM calls for every user turn. The memory lifecycle management, while theoretically sound, requires careful tuning of fact-specific durability rules that may prove brittle as user behavior evolves or new product categories emerge.

That said, DoorDash's architectural choices demonstrate production-grade thinking about real LLMOps challenges: graceful degradation when memory sources fail, over-fetching to compensate for post-filtering, explicit grounding affordances like the Memory Bank Index to reduce hallucination, and strict policy gates in extraction prompts to prevent low-quality signal from polluting long-term storage. The separation of concerns between memory generation (offline batch), storage (distributed with vector search), and orchestration (task-aware tooling) provides clear boundaries that should facilitate independent scaling and evolution of each component.
