---
title: "Optimizing LLM Token Usage with Production Monitoring in Natural Language to SQL System"
slug: "optimizing-llm-token-usage-with-production-monitoring-in-natural-language-to-sql-system"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6793465fa718a7e29bd2567d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:58:27.352Z"
  createdOn: "2025-01-24T07:50:55.641Z"
llmopsTags:
  - "question-answering"
  - "data-analysis"
  - "structured-output"
  - "rag"
  - "few-shot"
  - "cost-optimization"
  - "semantic-search"
  - "token-optimization"
  - "langchain"
  - "monitoring"
  - "databases"
  - "postgresql"
  - "wandb"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "Dataherald"
summary: "Dataherald, an open-source natural language-to-SQL engine, faced challenges with high token usage costs when using GPT-4-32K for SQL generation. By implementing LangSmith monitoring in production, they discovered and fixed issues with their few-shot retriever system that was causing unconstrained token growth. This optimization resulted in an 83% reduction in token usage, dropping from 150,000 to 25,500 tokens per query, while maintaining the accuracy of their system."
link: "https://medium.com/dataherald/cutting-llm-costs-by-83-with-langsmith-e44bb63af2a8"
year: 2023
seo:
  title: "Dataherald: Optimizing LLM Token Usage with Production Monitoring in Natural Language to SQL System - ZenML LLMOps Database"
  description: "Dataherald, an open-source natural language-to-SQL engine, faced challenges with high token usage costs when using GPT-4-32K for SQL generation. By implementing LangSmith monitoring in production, they discovered and fixed issues with their few-shot retriever system that was causing unconstrained token growth. This optimization resulted in an 83% reduction in token usage, dropping from 150,000 to 25,500 tokens per query, while maintaining the accuracy of their system."
  canonical: "https://www.zenml.io/llmops-database/optimizing-llm-token-usage-with-production-monitoring-in-natural-language-to-sql-system"
  ogTitle: "Dataherald: Optimizing LLM Token Usage with Production Monitoring in Natural Language to SQL System - ZenML LLMOps Database"
  ogDescription: "Dataherald, an open-source natural language-to-SQL engine, faced challenges with high token usage costs when using GPT-4-32K for SQL generation. By implementing LangSmith monitoring in production, they discovered and fixed issues with their few-shot retriever system that was causing unconstrained token growth. This optimization resulted in an 83% reduction in token usage, dropping from 150,000 to 25,500 tokens per query, while maintaining the accuracy of their system."
---

## Overview

Dataherald is a company that has built an open-source natural language-to-SQL engine, enabling users to set up APIs that answer plain English questions from relational databases. The company's mission is to make data accessible for non-technical users, allowing them to embed natural language interfaces into SaaS applications and empowering non-technical teams to self-serve from data warehouses. This case study documents their journey from manual, inadequate production monitoring to implementing LangSmith, which enabled them to identify and fix a critical token usage bug that was dramatically inflating their LLM costs.

## Technical Architecture

At its core, the Dataherald NL-to-SQL engine is implemented as a RAG (Retrieval-Augmented Generation) agent using LangChain. The architecture involves several key components working together:

- **LLM Reasoning Layer**: The system uses the LLM for reasoning about how to translate natural language queries into SQL statements
- **Few-Shot Sample Storage**: Examples are stored in a vector database and retrieved to provide context for SQL generation
- **Automated Schema Scans**: Complex schema analysis tools help the agent understand database structure
- **Semantic Database Instructions**: Business context and instructions are stored in the engine and retrieved during query processing

The team specifically mentions using GPT-4-32K as their primary model, driven by the challenging nature of natural language-to-SQL tasks. According to their benchmarks, open-source models like Llama2 and Mistral could not match GPT-4's accuracy for this use case. The combination of large schema sizes, extensive data context, and multiple reasoning steps made context window length a significant constraint, further necessitating the use of the expensive 32K token model.

## The Cost Management Challenge

Cost efficiency in LLM applications is a critical LLMOps concern, and Dataherald's experience illustrates this perfectly. The team notes that their engine becomes far less viable if generating a single answer costs $10. This economic reality places token usage optimization as a top priority alongside accuracy and speed.

Before implementing LangSmith, Dataherald tracked token usage through two mechanisms:

- **TikToken Library**: Used for token counting at the application level
- **LangChain Callback Handlers**: Utilized to capture usage metrics during agent execution

These metrics were written to MongoDB (their application storage layer), and team members would use MongoDB Compass to manually extract and aggregate costs across date ranges or specific databases. This approach had several critical limitations that are common in early-stage LLMOps practices:

- The process was entirely manual and time-consuming
- There was no granular visibility into which specific tools or components within the agent were driving costs
- The team made assumptions about token usage patterns without proper validation
- The approach couldn't scale as the application grew

## The Hidden Bug

The manual monitoring approach led to a significant oversight. The team assumed that token usage would be primarily dictated by database schema size, so after testing a few samples on a given database, they believed costs would remain relatively stable for subsequent queries. However, they failed to notice that their few-shot retriever was built in a way that caused its token usage to grow practically uncapped over time.

This is a particularly insightful example of how LLM applications can exhibit unexpected behavior in production. The bug wasn't apparent during initial testing or even short-term monitoring—it only manifested after weeks of operation as the few-shot retriever accumulated more examples or context. By the time they discovered the issue, they were consuming approximately 150,000 tokens per query, which represented a massive and unsustainable cost burden.

## LangSmith Implementation

LangSmith is positioned as a platform designed to bridge the gap between prototyping and production for LLM-powered applications. The tool provides monitoring, debugging, testing, and evaluation capabilities specifically tailored for LLM applications. Dataherald adopted LangSmith during its beta period, recognizing that their prototype built with LangChain was now in production and required proper observability tooling.

The implementation was notably straightforward—the team reports that LangSmith can be configured by defining just four environmental variables. The platform provides an interface for monitoring agent execution processes with key metrics including:

- Token usage broken down by each tool within the agent
- Latency metrics for individual components
- Execution traces that can be shared via links

## Results and Operational Impact

Within hours of setting up LangSmith, the team identified the runaway token usage in their few-shot sample retriever. They pushed a hotfix immediately and identified additional optimizations on the same day. The results were dramatic:

- **Before**: Approximately 150,000 tokens per query
- **After**: Approximately 25,500 tokens per query
- **Cost Reduction**: 83%

Beyond the immediate cost savings, LangSmith fundamentally changed the team's operational workflow. The article notes that team members now regularly share LangSmith execution run links via Slack, enabling faster collaboration on issues. Instead of attempting to reproduce problems in development or staging environments, engineers can simply attach a link to a Jira ticket pointing directly to the problematic execution trace in production. This represents a significant improvement in debugging velocity and team coordination.

## Broader LLMOps Considerations

The case study touches on several important LLMOps themes that extend beyond cost monitoring:

**Observability as a Foundation**: The Dataherald experience demonstrates that LLM applications require purpose-built observability tooling. Traditional application monitoring approaches—even when adapted with token counting libraries—proved insufficient for understanding the complex behavior of agent-based systems.

**Agent Complexity**: RAG agents with multiple tools present particular monitoring challenges. Token usage can vary significantly based on which tools are invoked, how much context is retrieved, and how many reasoning steps the agent takes. Per-tool breakdowns are essential for understanding cost drivers.

**Regression Testing Challenges**: The team acknowledges that evaluation and regression testing remain challenging areas. They note that LLM models are auto-regressive, meaning even slight prompt modifications can alter the probability distribution of subsequently generated tokens. A fix for one use case can unintentionally degrade performance on previously well-handled scenarios. Dataherald has invested in building in-house regression testing tools but is exploring LangSmith's evaluation features as a potential replacement or augmentation.

**Model Selection Trade-offs**: The team's choice to use GPT-4-32K despite its cost reflects a common LLMOps trade-off. Open-source alternatives couldn't match accuracy requirements, making cost optimization at the application level (efficient token usage, proper retrieval strategies) even more critical.

## Critical Assessment

While the case study presents compelling results, it's worth noting several caveats. First, this is essentially a company blog post promoting both their product and LangSmith, so the narrative may emphasize successes over challenges. The 83% cost reduction, while impressive, largely reflects fixing a bug that should arguably have been caught earlier with any reasonable monitoring approach.

The article also doesn't provide details on LangSmith's costs or limitations, which would be relevant for teams considering adoption. Additionally, the claimed ease of setup (four environment variables) applies to the monitoring features; the evaluation and testing capabilities mentioned as future explorations likely require more substantial integration work.

That said, the core insight—that LLM applications require dedicated observability tooling, and that tools like LangSmith can dramatically accelerate debugging and cost optimization—is well-supported by the specific example provided. The case study serves as a useful reminder that production LLMOps requires the same attention to monitoring and debugging that any production system demands, with additional considerations for the unique characteristics of LLM workloads.