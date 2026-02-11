---
title: "Multi-Model LLM Orchestration with Rate Limit Management"
slug: "multi-model-llm-orchestration-with-rate-limit-management"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ab888cdb4d609c640cc"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:37:34.267Z"
  createdOn: "2024-11-21T13:50:48.927Z"
llmopsTags:
  - "anthropic"
  - "code-generation"
  - "code-interpretation"
  - "cost-optimization"
  - "embeddings"
  - "error-handling"
  - "fallback-strategies"
  - "guardrails"
  - "latency-optimization"
  - "load-balancing"
  - "openai"
  - "orchestration"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "semantic-search"
industryTags: "tech"
company: "Bito"
summary: "Bito, an AI coding assistant startup, faced challenges with API rate limits while scaling their LLM-powered service. They developed a sophisticated load balancing system across multiple LLM providers (OpenAI, Anthropic, Azure) and accounts to handle rate limits and ensure high availability. Their solution includes intelligent model selection based on context size, cost, and performance requirements, while maintaining strict guardrails through prompt engineering."
link: "https://www.youtube.com/watch?v=IafvCmYZ0eA"
year: 2023
seo:
  title: "Bito: Multi-Model LLM Orchestration with Rate Limit Management - ZenML LLMOps Database"
  description: "Bito, an AI coding assistant startup, faced challenges with API rate limits while scaling their LLM-powered service. They developed a sophisticated load balancing system across multiple LLM providers (OpenAI, Anthropic, Azure) and accounts to handle rate limits and ensure high availability. Their solution includes intelligent model selection based on context size, cost, and performance requirements, while maintaining strict guardrails through prompt engineering."
  canonical: "https://www.zenml.io/llmops-database/multi-model-llm-orchestration-with-rate-limit-management"
  ogTitle: "Bito: Multi-Model LLM Orchestration with Rate Limit Management - ZenML LLMOps Database"
  ogDescription: "Bito, an AI coding assistant startup, faced challenges with API rate limits while scaling their LLM-powered service. They developed a sophisticated load balancing system across multiple LLM providers (OpenAI, Anthropic, Azure) and accounts to handle rate limits and ensure high availability. Their solution includes intelligent model selection based on context size, cost, and performance requirements, while maintaining strict guardrails through prompt engineering."
---

## Overview

Bito is an AI coding assistant startup founded by Anas (CTO) and his co-founder Amar, both experienced tech entrepreneurs with backgrounds in large-scale systems. The company pivoted from a developer collaboration tool to an AI-powered coding assistant after recognizing the potential of GPT-3.5's reasoning capabilities. Their product operates as IDE extensions for Visual Studio Code and JetBrains, providing features like code explanation, code generation, test case generation, and AI-powered code understanding.

This case study, shared through a podcast interview with Anas, offers a transparent look at the operational challenges of running LLM-powered applications at scale, particularly around rate limiting, multi-model orchestration, prompt management, and evaluation.

## The Scale Problem: Rate Limits and Multi-Model Architecture

One of the most significant operational challenges Bito faced was hitting TPM (tokens per minute) and RPM (requests per minute) limits across LLM providers. Starting with a single OpenAI account, they quickly encountered rate limiting issues as usage grew. Even after requesting limit increases from OpenAI, they found themselves at maximum allocations that still couldn't handle their traffic.

Their solution was to build a custom multiplexer and load balancer that routes requests across multiple providers and accounts:

- **Multiple OpenAI accounts**: Managing different TPM/RPM limits across accounts
- **Azure OpenAI**: Provides OpenAI models within Azure's infrastructure
- **Anthropic**: Both Claude Instant (faster, cheaper) and Claude 2 (slower, more accurate)
- **GPT-4**: For complex reasoning tasks

The load balancer makes routing decisions based on several factors:

- **Available capacity**: Before sending a request, the system checks if there's sufficient TPM/RPM headroom on a given account
- **Context size**: Requests fitting within 4K tokens can use GPT-3.5; larger contexts require GPT-4 or Claude (which supports much larger context windows)
- **Request type**: Some operations require GPT-4's superior reasoning capabilities
- **Cost management**: While not the primary factor, cost influences fallback decisions
- **Model health**: Real-time monitoring of model availability for failover

## Graceful Degradation Strategy

Bito implemented a sophisticated degradation strategy for when primary options are unavailable:

- If GPT-4 limits are hit, fall back to GPT-3.5
- If both OpenAI direct and Azure OpenAI are unavailable, switch to Anthropic
- When falling back to models with smaller context windows, reduce the provided context while still attempting to answer the question
- The priority ordering for degradation is primarily based on cost, treating it as "the lowest common denominator"

Anas emphasized that model availability is unpredictable—latency can vary from 1 second to 15+ seconds depending on platform load, and occasional timeouts occur. Having multiple fallback options ensures users get answers even when individual providers experience issues.

## Prompt Engineering Across Multiple Models

A key operational insight from Bito's experience is that **prompts are not portable across models**. What works on GPT-3.5 may not work on GPT-4, and neither will work identically on Anthropic's models. This leads to maintaining what Anas calls a "prompt repository" with model-specific variations.

Specific observations on model behavior:

- **GPT-4** excels at structured prompting and can follow JSON/YAML-formatted rules precisely. It provides cleaner outputs when instructed to avoid explanatory text.
- **GPT-3.5** tends to add unwanted explanatory "blurb" to outputs. Sometimes it's easier to add markers in prompts and post-process outputs with hardcoded logic than to perfect the prompt.
- **Anthropic Claude** requires different prompting strategies; GPT-4 prompts don't transfer directly.

This creates significant operational overhead when adding new models—each addition requires developing and testing new prompts, understanding model-specific behaviors, and maintaining separate prompt versions. Anas's advice for teams not yet at scale: stick with one model until you absolutely must expand.

## Testing and Evaluation Approach

Bito's evaluation strategy relies heavily on human feedback and manually curated test cases:

- **Thumbs up/down feedback**: Users can indicate when responses are helpful or problematic, providing signals about model performance
- **Human-in-the-loop review**: When hallucinations are flagged, team members manually investigate the context, prompt, and output to understand failure modes
- **Pre-crafted test scenarios**: Rather than relying on LLMs to evaluate LLM outputs (which Anas notes can lead to self-reinforcing errors), they maintain human-verified test cases with known correct answers
- **Periodic regression testing**: Running prompts against test suites, especially after model updates

Anas was candid that hallucinations remain a challenge and their system isn't "100% there." He views hallucinations as a "necessary evil" in some contexts—for generative use cases like API design, creative suggestions may be valuable, but for answering questions about existing code, hallucinations are problematic.

The team explored open-source evaluation tools but found gaps in the verification piece—how do you automatically verify an answer when you don't know what's correct? This is especially challenging with technical questions where even human reviewers may lack domain expertise (e.g., Rust questions being reviewed by Java developers).

## Guardrails Through Prompt Design

Rather than using external guardrail tools, Bito implements guardrails primarily through prompt engineering:

- Providing maximum relevant context to reduce hallucinations
- Adding explicit rules and instructions in prompts
- For deterministic tasks (like security scanning), using traditional tools first and then feeding their output to LLMs for explanation/remediation rather than relying solely on LLM analysis

This hybrid approach—combining deterministic tools with LLM interpretation—was highlighted as a best practice for reducing hallucinations in scenarios where ground truth exists.

## Local-First Vector Database for Code Understanding

Bito's "AI that understands your code" feature indexes user codebases for retrieval-augmented generation. A key design constraint was privacy—they wanted user code to never leave the user's machine.

Their current implementation:

- **Homegrown in-memory vector store**: Built on top of basic map structures, implementing upsert/query operations similar to Pinecone
- **Runs within IDE extension**: Subject to memory constraints (52MB limit in web views)
- **Repository size limits**: Currently supports repositories up to ~120MB
- **Embeddings from open-source models**: Used for generating vectors locally

The index files can grow to 3x the size of the original code, creating storage considerations. They're evaluating purpose-built vector databases that can be installed locally as libraries for future scaling.

For enterprise/server-side deployments, they're considering hosted vector databases (Pinecone, etc.) that can scale horizontally while supporting local hosting for security-conscious customers.

## Build vs. Buy: The GPU Question

Anas provided a thoughtful analysis of why Bito uses API providers rather than hosting their own models:

- **Current scale economics**: At their current volume, dedicated GPU infrastructure would be over-provisioned, and they'd pay for unused capacity
- **High availability costs**: Self-hosted infrastructure requires additional GPUs for redundancy, plus DevOps/infrastructure team time for management
- **Opportunity cost**: Engineering resources spent on infrastructure aren't building product features
- **Blame and responsibility**: With APIs, you can fail over when providers have issues; with self-hosted, you own all the problems

A rough cost estimate: A good GPU machine on AWS (4 GPU cards, 64GB RAM) runs approximately $340/day, before considering clustering, high availability, and operational overhead.

Anas noted this calculus changes with scale and requirements. Enterprise customers with strict security requirements may demand on-premises deployment from day one, inverting the build-vs-buy decision.

## Advice for Developers Using AI Coding Assistants

Drawing from extensive experience building and using AI coding tools, Anas shared practical debugging tips:

- **Context is everything**: The more relevant information you provide (exception traces, surrounding code, runtime conditions), the better the responses
- **Don't assume omniscience**: LLMs have generic knowledge but don't know your specific codebase or runtime environment
- **Experienced developers get better results**: Those who understand what information is relevant can craft better queries—the claim that non-programmers can become programmers through AI tools has limits for complex scenarios

## Key Takeaways for LLMOps Practitioners

- Multi-model architectures are often necessary at scale, but add significant operational complexity
- Prompts require per-model tuning and should be treated as configuration artifacts requiring testing and version control
- Human feedback loops remain essential for evaluation; fully automated LLM-evaluating-LLM approaches have significant risks
- Hybrid approaches (traditional tools + LLM interpretation) can reduce hallucinations for structured tasks
- Build vs. buy decisions for GPU infrastructure depend heavily on scale, security requirements, and team focus
- Privacy-conscious architectures may require local-first approaches for sensitive data like source code