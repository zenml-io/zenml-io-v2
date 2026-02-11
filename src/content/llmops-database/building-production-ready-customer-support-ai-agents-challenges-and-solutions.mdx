---
title: "Building Production-Ready Customer Support AI Agents: Challenges and Solutions"
slug: "building-production-ready-customer-support-ai-agents-challenges-and-solutions"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "674f21027592eb49695dec37"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:46:23.510Z"
  createdOn: "2024-12-03T15:17:22.580Z"
llmopsTags:
  - "customer-support"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "realtime-application"
  - "rag"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "monitoring"
  - "databases"
  - "microservices"
  - "devops"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "redis"
  - "cache"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "tech"
company: "Gradient Labs"
summary: "Gradient Labs shares their experience building and deploying AI agents for customer support automation in production. While prototyping with LLMs is relatively straightforward, deploying agents to production introduces complex challenges around state management, knowledge integration, tool usage, and handling race conditions. The company developed a state machine-based architecture with durable execution engines to manage these challenges, successfully handling hundreds of conversations per day with high customer satisfaction."
link: "https://www.youtube.com/watch?v=xjqKwLgr_ZM"
seo:
  title: "Gradient Labs: Building Production-Ready Customer Support AI Agents: Challenges and Solutions - ZenML LLMOps Database"
  description: "Gradient Labs shares their experience building and deploying AI agents for customer support automation in production. While prototyping with LLMs is relatively straightforward, deploying agents to production introduces complex challenges around state management, knowledge integration, tool usage, and handling race conditions. The company developed a state machine-based architecture with durable execution engines to manage these challenges, successfully handling hundreds of conversations per day with high customer satisfaction."
  canonical: "https://www.zenml.io/llmops-database/building-production-ready-customer-support-ai-agents-challenges-and-solutions"
  ogTitle: "Gradient Labs: Building Production-Ready Customer Support AI Agents: Challenges and Solutions - ZenML LLMOps Database"
  ogDescription: "Gradient Labs shares their experience building and deploying AI agents for customer support automation in production. While prototyping with LLMs is relatively straightforward, deploying agents to production introduces complex challenges around state management, knowledge integration, tool usage, and handling race conditions. The company developed a state machine-based architecture with durable execution engines to manage these challenges, successfully handling hundreds of conversations per day with high customer satisfaction."
---

## Overview

Gradient Labs is a young startup based in London, UK, founded by Neil (former Director of Machine Learning at Monzo Bank) and his co-founders. The company is building an AI agent that automates complex customer support work for enterprises end-to-end. The talk, titled "The Rest of the Owl" (referencing the meme about drawing an owl by first drawing two circles and then "drawing the rest"), addresses the significant gap between prototyping with LLMs and actually running AI agents in production.

Neil emphasizes that while prototyping with LLMs is now easier than ever before, the age-old MLOps challenge of getting prototypes into production remains hard—and with AI agents, it's a "new kind of beast." The company has launched their AI agent and is running it live with several enterprise customers who care about precise, high-quality outcomes.

## The Evolution of Production ML Challenges

Neil presents a tiered view of production ML systems and their evolving complexity:

- **Traditional MLOps systems** (model registries, feature stores): The key question is "does it work well?" — are features up to date, are models being served in real-time?
- **Traditional ML systems** (e.g., fraud detection): Beyond working well, teams must consider "is it generally making good decisions?"
- **AI Agents today**: All of the above plus "what are all the million ways it can go wrong?"

This framing is valuable because it acknowledges that AI agents represent a qualitative shift in operational complexity, not just an incremental step up from traditional ML systems.

## Problem Space Architecture

The talk breaks down the AI agents production problem space into four major areas:

### 1. Interface Layer (External World Interaction)

Unlike traditional ML systems that passively wait for requests and return results, AI agents must handle a more complex interaction pattern. In customer support, the agent must:

- Pick up conversations when they start and begin replying
- Stop work when conditions change (e.g., a customer sends a new message while the agent is mid-computation, invalidating previous work)
- Initiate work based on absence of signals (e.g., reaching out when a customer abandons a chat)

The key insight here is handling "fast and slow race conditions" between the AI agent and whatever is on the other side. Since even a basic agentic workflow making two or three LLM calls is much slower than a typical database API call, this latency creates numerous race condition scenarios that must be managed explicitly.

### 2. LLM Layer

While it might seem like the LLM layer is "just another API call," production systems require deeper consideration:

- **LLM calls that "fail successfully"**: A successfully completed API call doesn't mean the completion itself is good or correct. This creates a new class of failure that's harder to detect than traditional API errors.
- **Differentiating request priorities**: Customer support agents need to distinguish between time-sensitive requests (answering customers) and delay-tolerant requests (validating knowledge bases, processing new documentation asynchronously).
- **Rate limit management**: Especially challenging for startups working within provider constraints.
- **The prompt-model coupling problem**: The performance of a prompt is strongly tied to specific models being invoked, making abstraction difficult. Neil compares this to the previous generation of deep learning where hardware and model were hard to separate—here, it's hard to separate the LLM call from the prompt calling it.

### 3. Knowledge Layer

Neil emphasizes that simply throwing documentation into a vector database is "almost a guaranteed way to reach a bad outcome." The challenges include:

- **Documentation not written for AI agents**: Internal company documents make assumptions (like knowing what the company is) and don't differentiate between public/disclosable information and private information.
- **Missing information problem**: Most information inside a company resides in people's heads and never makes it to documentation. This is described as an even larger problem than trusting company documentation, requiring entirely different approaches.
- **Approximate Nearest Neighbors (ANN) limitations**: While ANN is popular for scaling vector databases, approximate results are "notoriously insufficient" when high-quality outcomes are required.
- **Point-in-time knowledge references**: Similar to feature stores in traditional ML, the ability to understand what knowledge the agent had at a specific point in the past is critical for debugging. A knowledge base that only stores live knowledge makes it impossible to debug outcomes from days ago if knowledge has changed.

### 4. Tool Invocation

AI agent demos often show impressive tool use (Google searches, code amendments, opening issues), but production enterprise scenarios introduce new challenges:

- **Evaluation without real tool access**: When an AI agent works with private or sensitive company APIs, you often cannot allow it to make real calls during evaluation. This creates the challenge of evaluating tool-using agents without actual tool access.
- **Reasoning about returned data validity**: Unlike demos that retrieve relatively static public data, enterprise tool calls return data that may change between retrieval and use. Neil gives the example of retrieving a customer's fraud status, where the status might change based on subsequent customer actions.

## Architectural Approach: State Machines

Gradient Labs architects their AI agents as state machines. Neil presents a simplified example of a conversation as a state machine: one party talks (other enters listening state), they finish (roles swap), and this continues until conversation completes. In practice, their production agent has many more states, some deterministic and some agentic.

The state machine approach allows them to:
- Control flow between states based on external inputs, timers, and signals
- Separate concerns so that engineers working at the state level don't need to worry about lower-level implementation details

## Code Organization and Developer Experience

Neil shares a screenshot from their production codebase showing a simple example where the AI agent classifies a customer conversation for clarity and responds to ask for clarification if needed. Key decisions in their approach:

- **No LLM framework adoption yet**: They felt it was too early given how much "deep surgery" they wanted to do, though this implies they're not dogmatically opposed to frameworks in the future.
- **Behavioral-level code**: When writing the "agentic in-between" layer, engineers think at a behavioral level of what the agent is doing—not at the state level, not at the LLM call level, but somewhere in the middle where code remains readable and understandable.
- **Event-driven architecture**: Every decision returns events for observability.
- **Durable execution with Temporal**: All LLM calls are executed with Temporal for durable execution, so AI engineers don't need to think about low-level concerns like retrying failed operations.
- **Provider abstraction**: They balance enabling the agent to use different models across different providers (Bedrock, Azure, direct providers) while allowing engineers to simply say "I want to use this model" without caring about the source.
- **Comprehensive logging**: Everything is logged for tracking completions and costs.

## Testing and Evaluation

When asked about testing agents before deployment, Neil explains that traditional approaches like A/B rollouts and shadow deployments are very feasible for traditional ML but AI agent testing is "multifaceted." Their approach involves:

- **Production-grade simulations**: Running simulations of what the agent would do in different scenarios using live production traffic
- **PR-based evaluation**: Spinning up a PR version of their agent, running thousands of simulations, then evaluating those simulations manually or automatically
- **Direct-to-production testing**: Unlike traditional engineering's path from local dev to staging to production, their approach goes "straight into production in an isolated evaluation environment" rather than a live production environment

## Non-Functional Requirements in Enterprise Settings

Different enterprise customers have varying requirements that must be explicitly designed for:

- **Language constraints**: If the agent can only hand off to human agents who speak certain languages, it must be constrained to only communicate in those languages
- **Conversation handling policies**: Different companies have different rules about closing conversations, response timing, channel support
- **Intent-based restrictions**: Especially in regulated industries like banking, companies may want the AI agent to handle some topics but not others (e.g., allowing general inquiries but not fraud-related conversations)

The framework must support control at both the functional level (setting timers, configuring values) and the behavioral level (topic restrictions).

## Results and Current State

Gradient Labs is now live with several partners, processing hundreds of conversations per day. Their metric of success includes customers who find the experience so positive that they thank the AI agent for its service. While specific quantitative metrics aren't shared, Neil notes that for the largest enterprises they work with, a simple RAG-based agent would only address about 10% or less of what their human agents actually handle—highlighting the complexity of real enterprise customer support automation.

## Critical Assessment

It's worth noting that this talk comes from the CTO of a startup actively selling their AI agent product, so claims should be considered in that context. The lack of specific quantitative metrics (resolution rates, accuracy percentages, cost savings) is notable. However, the technical depth of the discussion about production challenges appears genuine and aligns with broader industry experience. The admission that RAG alone only addresses a small fraction of enterprise needs is refreshingly honest for a company that could easily oversell their solution.

The architectural insights about state machines, durable execution, and the importance of point-in-time knowledge references represent practical wisdom that would be valuable to others building similar systems, regardless of whether one uses Gradient Labs' specific product.