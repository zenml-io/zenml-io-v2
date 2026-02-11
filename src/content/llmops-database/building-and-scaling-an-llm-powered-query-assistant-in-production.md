---
title: "Building and Scaling an LLM-Powered Query Assistant in Production"
slug: "building-and-scaling-an-llm-powered-query-assistant-in-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d0e2f8ec153a0b2b35b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:37:37.740Z"
  createdOn: "2024-11-21T14:00:46.504Z"
llmopsTags:
  - "cache"
  - "cost-optimization"
  - "data-analysis"
  - "embeddings"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "redis"
  - "reliability"
  - "scalability"
  - "semantic-search"
industryTags: "tech"
company: "Honeycomb"
summary: "Honeycomb implemented a Query Assistant powered by LLMs to help users better understand and utilize their observability platform's querying capabilities. The feature was developed rapidly with a \"ship to learn\" mindset, using GPT-3.5 Turbo and text embeddings. While the initial adoption varied across pricing tiers (82% Enterprise/Pro, 75% Self-Serve, 39% Free) and some metrics didn't meet expectations, it achieved significant successes: teams using Query Assistant showed 26.5% retention in manual querying vs 4.5% for non-users, higher complex query creation (33% vs 15.7%), and increased board creation (11% vs 3.6%). Notably, the implementation proved extremely cost-effective at around $30/month in OpenAI costs, demonstrated strong integration with existing workflows, and revealed unexpected user behaviors like handling DSL expressions and trace IDs. The project validated Honeycomb's approach to AI integration while providing valuable insights for future AI features."
link: "https://www.honeycomb.io/blog/we-shipped-ai-product"
year: 2023
seo:
  title: "Honeycomb: Building and Scaling an LLM-Powered Query Assistant in Production - ZenML LLMOps Database"
  description: "Honeycomb implemented a Query Assistant powered by LLMs to help users better understand and utilize their observability platform's querying capabilities. The feature was developed rapidly with a \"ship to learn\" mindset, using GPT-3.5 Turbo and text embeddings. While the initial adoption varied across pricing tiers (82% Enterprise/Pro, 75% Self-Serve, 39% Free) and some metrics didn't meet expectations, it achieved significant successes: teams using Query Assistant showed 26.5% retention in manual querying vs 4.5% for non-users, higher complex query creation (33% vs 15.7%), and increased board creation (11% vs 3.6%). Notably, the implementation proved extremely cost-effective at around $30/month in OpenAI costs, demonstrated strong integration with existing workflows, and revealed unexpected user behaviors like handling DSL expressions and trace IDs. The project validated Honeycomb's approach to AI integration while providing valuable insights for future AI features."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-an-llm-powered-query-assistant-in-production"
  ogTitle: "Honeycomb: Building and Scaling an LLM-Powered Query Assistant in Production - ZenML LLMOps Database"
  ogDescription: "Honeycomb implemented a Query Assistant powered by LLMs to help users better understand and utilize their observability platform's querying capabilities. The feature was developed rapidly with a \"ship to learn\" mindset, using GPT-3.5 Turbo and text embeddings. While the initial adoption varied across pricing tiers (82% Enterprise/Pro, 75% Self-Serve, 39% Free) and some metrics didn't meet expectations, it achieved significant successes: teams using Query Assistant showed 26.5% retention in manual querying vs 4.5% for non-users, higher complex query creation (33% vs 15.7%), and increased board creation (11% vs 3.6%). Notably, the implementation proved extremely cost-effective at around $30/month in OpenAI costs, demonstrated strong integration with existing workflows, and revealed unexpected user behaviors like handling DSL expressions and trace IDs. The project validated Honeycomb's approach to AI integration while providing valuable insights for future AI features."
---

## Overview

Honeycomb, an observability platform company, developed Query Assistant, an LLM-powered feature that translates natural language into structured Honeycomb queries. This case study provides an unusually transparent look at the entire lifecycle of shipping an AI product feature, from initial development through production iteration, measuring real business impact, and managing operational costs. The case study is notable for its honest assessment of both successes and areas where the feature fell short of expectations.

## Problem Statement

Honeycomb's core business value proposition depends on users actively querying their data. However, the platform has a notable learning curve, particularly for users without prior experience with observability or monitoring tools. Users often struggle to map their mental model of their data and questions into Honeycomb's query interface. This learning curve directly impacts business metrics, as active querying correlates with users upgrading to paid pricing tiers and instrumenting more services.

## Solution Architecture

The Query Assistant translates natural language inputs into Honeycomb Query objects. The technical stack includes:

- **GPT-3.5-turbo**: The primary language model for query generation, chosen over GPT-4 for cost efficiency after extensive prompt engineering
- **text-embedding-ada-002**: Used for embedding operations, likely for schema matching and context retrieval
- **Redis cluster on AWS**: Stores embedding vectors for dataset schemas, with each node costing approximately $100/month

The team invested significant effort in prompt engineering to reduce token usage. Each GPT-3.5 request uses approximately 1,800 input tokens and 100 response tokens, while embedding requests use at most 100 tokens.

## Development Philosophy: Ship to Learn

One of the most valuable insights from this case study is Honeycomb's approach to LLM development. The team explicitly rejects the notion that traditional software development practices apply to LLM-powered features:

- **LLMs cannot be debugged or unit tested** in the traditional sense because they are nondeterministic black boxes
- The variety of natural language inputs users provide is unpredictable
- The LLM's responses to those inputs combined with each user's unique contextual data are equally unpredictable

Their solution was to adopt a "ship to learn" mindset, deploying rapidly and iterating based on production data. At times, they shipped updates daily. This approach required:

- Capturing user inputs and LLM outputs along with important metadata about interactions
- Systematically analyzing this data to understand user behavior and model responses
- Using Service Level Objectives (SLOs) to monitor changes over time

The use of SLOs is particularly interesting. Since regression tests cannot be written for nondeterministic systems, SLOs serve as a proxy for ensuring that improvements don't degrade previously working behavior. This represents a shift from deterministic pass/fail testing to probabilistic monitoring of system behavior over time.

## Production Metrics and Business Impact

The case study provides remarkably detailed metrics on Query Assistant's effectiveness:

**Adoption by Pricing Tier:**
- 82% of Enterprise and Pro Plus teams used the feature
- 75% of Self Serve tier teams used the feature
- 39% of Free tier teams used the feature (lower than hoped)

**Manual Query Retention (Week 6):**
- Teams using Query Assistant: 26.5% still running manual queries
- Teams not using Query Assistant: 4.5% still running manual queries

This 6x difference in retention is one of the strongest signals reported and suggests the feature successfully "graduates" users to manual querying rather than creating dependency.

**Complex Query Creation:**
- Teams using Query Assistant: 33% created complex queries
- Teams not using Query Assistant: 15.7% created complex queries

The team intentionally designed Query Assistant to emit more complex queries with multiple WHERE and GROUP BY clauses to demonstrate the interface's flexibility.

**Board Creation (Strong Activation Signal):**
- Teams using Query Assistant: 11% created a Board
- Teams not using Query Assistant: 3.6% created a Board

**Trigger Creation (Strongest Activation Signal):**
- Teams using Query Assistant: 5.8% created a Trigger
- Teams not using Query Assistant: 3.6% created a Trigger

The trigger correlation was notably weaker and inconsistent across measurement windows, suggesting Query Assistant doesn't significantly impact alerting decisions.

## Cost Analysis

The operational costs are remarkably low, which is a key finding for organizations considering LLM integration:

- **Monthly OpenAI API costs: ~$30**
- **Redis cluster storage: ~$100 per node**
- **Total monthly operational cost: A few hundred dollars**

The low cost is attributed to several factors:
- Using GPT-3.5-turbo instead of GPT-4 (an order of magnitude cheaper)
- Limited output generation (query objects rather than verbose text)
- Aggressive prompt size reduction driven initially by OpenAI's 90k tokens/minute rate limits at launch

The team provides practical advice: use GPT-4 for prototyping but invest in prompt engineering to make GPT-3.5-turbo work reliably for production.

## Latency Improvements

At launch in May 2023, latency was problematic:
- Average request: ~5 seconds
- P99: 30+ seconds, often causing timeouts

By October 2023, OpenAI had substantially improved their infrastructure:
- Average request duration halved
- P99 reduced several times over

This highlights a dependency risk for LLM-powered features: performance depends partly on the model provider's infrastructure improvements.

## Emergent Behaviors in Production

The case study documents unexpected user behaviors that the team never anticipated or tested for:

**DSL Expression Parsing:** Users pasted Derived Column expressions (a completely different DSL from another part of the product) into Query Assistant, and it successfully generated runnable queries. Users even marked results as helpful. This demonstrates GPT-3.5-turbo's ability to generalize beyond the specific use case it was prompted for.

**Trace ID Recognition:** Users pasted 16-byte hex-encoded trace IDs with no other context, and Query Assistant correctly inferred they wanted to filter by that trace ID. The team believes this works because GPT-3.5-turbo's training data includes enough tracing context to recognize the pattern.

**Query Modification:** Users frequently use Query Assistant to modify existing queries rather than building from scratch. The team includes the existing query as context in the prompt, and the model reliably distinguishes between modification requests and new query requests. This feature was added within 30 minutes of launch based on immediate user feedback.

## Customer Feedback Loop

The team incorporated detailed customer feedback into their iteration process. Intercom provided particularly detailed feedback about query types and where Query Assistant fell short. This feedback directly influenced a feature allowing team-defined Suggested Queries to guide the model toward better accuracy for schemas with custom field names.

Sales team feedback indicated Query Assistant helps shorten the introductory phase of enterprise sales cycles by quickly demonstrating "time to value," even though it doesn't automatically close deals.

## Limitations and Honest Assessment

The case study is notably honest about where the feature underperformed:

- Free tier adoption (39%) was below hopes, partly due to discoverability issues
- The placement below the Query Builder was intended to balance new user discoverability with staying out of the way for existing users, but many users didn't notice it
- Trigger creation correlation was weak and inconsistent
- Query Assistant usage drops significantly after the first week, suggesting users graduate to manual querying

## Key Takeaways for LLMOps Practitioners

The case study offers several actionable insights:

- Ship early and iterate based on production data rather than trying to perfect the feature before launch
- Use SLOs to monitor behavior changes since traditional regression testing doesn't work for nondeterministic systems
- Invest in prompt engineering to reduce costs and work within rate limits
- Limit output token generation where possible—structure matters more than verbosity
- Consider GPT-3.5-turbo over GPT-4 if prompt engineering can achieve reliable behavior
- Capture and analyze user inputs, model outputs, and metadata systematically
- Be prepared for emergent behaviors that you never anticipated or tested for
- User feedback, especially detailed feedback from power users, is invaluable for iteration