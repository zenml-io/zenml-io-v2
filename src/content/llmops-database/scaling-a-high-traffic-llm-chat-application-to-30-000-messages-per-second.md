---
title: "Scaling a High-Traffic LLM Chat Application to 30,000 Messages Per Second"
slug: "scaling-a-high-traffic-llm-chat-application-to-30-000-messages-per-second"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67725dfe80d73b7cde0d8a89"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:50:41.845Z"
  createdOn: "2024-12-30T08:46:54.796Z"
llmopsTags:
  - "chatbot"
  - "realtime-application"
  - "prompt-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "chunking"
  - "system-prompts"
  - "error-handling"
  - "postgresql"
  - "cache"
  - "monitoring"
  - "scaling"
  - "microservices"
  - "databases"
  - "google-gcp"
  - "openai"
  - "meta"
industryTags: "tech"
company: "Character.ai"
summary: "Character.ai scaled their open-domain conversational AI platform from 300 to over 30,000 generations per second within 18 months, becoming the third most-used generative AI application globally. They tackled unique engineering challenges around data volume, cost optimization, and connection management while maintaining performance. Their solution involved custom model architectures, efficient GPU caching strategies, and innovative prompt management tools, all while balancing performance, latency, and cost considerations at scale."
link: "https://www.youtube.com/watch?v=mNil_htP-bk"
year: 2023
seo:
  title: "Character.ai: Scaling a High-Traffic LLM Chat Application to 30,000 Messages Per Second - ZenML LLMOps Database"
  description: "Character.ai scaled their open-domain conversational AI platform from 300 to over 30,000 generations per second within 18 months, becoming the third most-used generative AI application globally. They tackled unique engineering challenges around data volume, cost optimization, and connection management while maintaining performance. Their solution involved custom model architectures, efficient GPU caching strategies, and innovative prompt management tools, all while balancing performance, latency, and cost considerations at scale."
  canonical: "https://www.zenml.io/llmops-database/scaling-a-high-traffic-llm-chat-application-to-30-000-messages-per-second"
  ogTitle: "Character.ai: Scaling a High-Traffic LLM Chat Application to 30,000 Messages Per Second - ZenML LLMOps Database"
  ogDescription: "Character.ai scaled their open-domain conversational AI platform from 300 to over 30,000 generations per second within 18 months, becoming the third most-used generative AI application globally. They tackled unique engineering challenges around data volume, cost optimization, and connection management while maintaining performance. Their solution involved custom model architectures, efficient GPU caching strategies, and innovative prompt management tools, all while balancing performance, latency, and cost considerations at scale."
---

## Overview

This case study comes from a conversation between Harrison Chase (co-founder and CEO of LangChain) and James from Character.ai at an event. Character.ai is a consumer-facing conversational AI platform that allows users to interact with over 200 million community-created characters, which are essentially user-generated content (UGC) prompts. The platform launched in October 2022, approximately a month before ChatGPT, and has grown to become what James describes as approximately the third most-used generative AI application globally, behind Meta and OpenAI.

The company's origins trace back to Google, where co-founders Noam Shazeer (one of the primary authors of the attention paper in 2017) and Daniel de Freitas had been working on open-domain dialogue agents. They left Google in 2020-2021 to bring this technology directly to consumers. The founding team included researchers who had built Lambda (and its predecessor Mina) at Google.

## Scaling Journey and Core Challenges

Character.ai's scaling story represents one of the most dramatic growth trajectories in the LLM application space. They went from approximately 300 generations per second to over 30,000 messages per second in roughly 18 months. James characterizes this as "two orders of magnitude" of growth. This scale brought unique challenges that differentiated their experience from traditional consumer applications of the 2010s era.

### Three Key Differences from Traditional App Scaling

**Data Volume**: The volume of data per second that needs to be processed is orders of magnitude higher than previous generation social companies. The reason is that for every message generation (the most heavily used user path), the entire chat history needs to be pulled and piped through networking layers. James notes that their network handles 7-8 gigabytes per second just on this hot path for generation. This is a fundamental difference from traditional apps where write operations might be much smaller.

**Cost of Serving**: Serving 30,000 messages per second requires significant GPU spend. There's a direct trade-off between cost and latency - over-provisioning GPUs lowers latency but dramatically increases costs. This economic pressure forced architectural decisions that traditional consumer apps don't face.

**Long-lived Connections**: The total response time for generating a message is approximately 12.5 seconds at P50 (down from about 25 seconds previously), with the first chunk appearing in about 5 seconds. Multiplying this duration by QPS results in approximately 400,000 open connections across all machines at any given time. This creates pressure on pods, connection management, Redis cache layers, and networking infrastructure that differs substantially from request-response patterns in traditional web applications.

## Building Custom Foundation Models

Unlike most companies building in the LLM space who use existing models or fine-tune, Character.ai built their own foundation models from day zero. This was made possible by the founding team's deep expertise in model pre-training. Until a recent deal with Google (where Google licensed their research and hired 32 researchers including the entire pre-training team), they had their own complete pre-training through post-training stack.

This control over the entire stack enabled architectural decisions that wouldn't be possible when using third-party models. A key example is multi-query attention (MQA), which they implemented upstream in the pre-training process after determining it didn't hurt engagement significantly despite the architectural trade-offs.

## GPU Caching and Inference Optimization

One of the most critical optimizations for Character.ai was their GPU caching strategy. For every message generation, they cache the results of computation at each layer of the model. The result of computation is dependent on the prompt up until that point. 

Given Character.ai's use case, the N+1 generation (each successive message in a chat) looks almost identical to the previous one, with only the new user message added. By leveraging GPU caching, they can pick up 95% of the computation from cache and only compute the final 5% representing the new user message. James states directly that without this caching strategy "we would be bankrupt like tomorrow."

Multi-query attention provided a 5x reduction in GPU cache requirements, effectively giving them 5x more cache capacity per GPU. This architectural decision, made upstream in pre-training, had cascading benefits throughout their inference infrastructure.

## The Prompt Templating Challenge and Prompt Poets

As Character.ai scaled from a monolith to a services architecture through database sharding, they encountered significant challenges with prompt construction. The prompt was being constructed across three different components, with string concatenation and slicing happening at each step via gRPC/protobuf. This made it nearly impossible to make significant prompt changes without introducing bugs.

A concrete example: when launching group chat (which required multiple character definitions instead of just one), the team spent two weeks making what should have been a simple change and still introduced 3-4 bugs in the process.

To solve this, they built an internal tool called "Hermies" (named after the Greek god who communicates with the gods - in this case, the LLMs). They later open-sourced a lightweight version called Prompt Poets.

The tool uses YAML and Jinja templating, where:
- Jinja interpolates runtime variables and handles control flow (conditionals, loops)
- YAML provides structure for smart truncation when context overflow occurs
- Truncation priorities can be assigned to each part of the YAML, ensuring critical content (like character definitions) is never removed while less important content is truncated first

This was crucial because they don't have infinite context windows, and they need smart truncation that doesn't blow their 95% cache hit ratio on successive messages.

## War Stories and Debugging at Scale

### The Grilled Cheeses Bug

A particularly catastrophic bug involved their PostgreSQL database layer. The team woke up one morning to find the site going down repeatedly. By 11 AM, they discovered that a bug in core PostgreSQL (triggered by their specific query volume and characteristics, combined with Google Cloud's wrapping of PostgreSQL) was causing transaction IDs (XIDs) not to be properly released during garbage collection.

The trigger was a "posts" feature where users could share chat snippets. Each page view issued a DML transaction to update view counts, requiring an XID. The corruption happened to be on a post featuring a character called "Grilled Cheeses" (a mix between a grilled cheese and Jesus). By 1 PM, they realized they had only 16 hours before the entire XID space would be exhausted, requiring a 7-day database offline period for a full vacuum.

The resolution came at 1 AM when they successfully ran a partial vacuum on a backup, then applied the same fix to production with 30-40 minutes of downtime.

### The Caching Bug

Perhaps more illustrative of LLM-specific challenges was a bug in how they indexed computation results in GPU cache. After rewriting their serving pods, they found that new models (which should have been significantly better based on token budget, data quality, and architecture) were testing neutral to negative in A/B tests.

The bug: when indexing cache results, they accidentally missed indexing user messages. This meant on successive generations, when they picked up the 95% cached computation, the model was effectively seeing "character message, character message, character message" - talking to itself without any user input. All contract tests passed because messages came in and responses came out coherently.

The fix was a three-line change, found after three months of frustration. The lesson: at this scale, vibe checks and qualitative feedback from engineers like Sam Scha proved valuable even when all tests passed.

## Trade-offs and Decision Making

James notes that nothing was "particularly scientific" in managing trade-offs between performance, latency, and cost. They were "building the plane as it was taking off." 

When they made latency improvements, they could either:
- Hold QPS per GPU constant and reduce overall latency
- Serve the same demand on fewer machines

The biggest trade-off driver was research demands. When kicking off major training runs (potentially 3 months long), they would increase consumer-facing latency to free up machines for research. This highlights a unique tension in companies that both pre-train models and serve consumer applications.

## Organizational Evolution

Following the deal with Google (where Google licensed core research and hired the pre-training team), Character.ai shifted from "aspirational AGI research lab" to being 100% focused on product and users. They retained a strong post-training team that fine-tunes models on preference data collected from the product.

Their current resource allocation:
- 60% on new formats and "big bets" - exploring experiences beyond chat/messaging, multimodal experiences, generating artifacts from chat transcripts, potentially building a feed
- 20-30% on core product improvements, tightening existing user experiences
- 10% on monetization, acknowledging the high costs of serving at their scale

## Key Lessons for LLMOps Practitioners

This case study illustrates several important lessons. First, the unique scaling challenges of LLM applications differ fundamentally from traditional consumer apps in data volume, cost structure, and connection patterns. Second, controlling the full model stack (when possible) enables optimizations that aren't available to those using third-party APIs. Third, infrastructure for prompt management becomes critical at scale - string concatenation doesn't scale. Fourth, traditional testing may not catch LLM-specific bugs, making qualitative feedback and "vibe checks" surprisingly important. Finally, the economics of GPU serving create constant pressure to optimize, and architectural decisions made upstream in pre-training can have massive downstream cost implications.