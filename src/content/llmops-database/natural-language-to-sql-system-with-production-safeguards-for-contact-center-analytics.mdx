---
title: "Natural Language to SQL System with Production Safeguards for Contact Center Analytics"
slug: "natural-language-to-sql-system-with-production-safeguards-for-contact-center-analytics"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3e5761994fb7f8036fe6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:39:05.715Z"
  createdOn: "2024-11-21T14:06:15.864Z"
llmopsTags:
  - "cache"
  - "compliance"
  - "customer-support"
  - "data-analysis"
  - "databases"
  - "error-handling"
  - "guardrails"
  - "microsoft-azure"
  - "prompt-engineering"
  - "reliability"
  - "security"
  - "semantic-search"
  - "structured-output"
  - "system-prompts"
  - "visualization"
industryTags: "telecommunications"
company: "NICE"
summary: "NICE implemented a system that allows users to query contact center metadata using natural language, which gets translated to SQL queries. The solution achieves 86% accuracy and includes critical production safeguards like tenant isolation, default time frames, data visualization, and context management for follow-up questions. The system also provides detailed explanations of query interpretations and results to users."
link: "https://www.youtube.com/watch?v=Qb3GIIq-qGs"
year: 2024
seo:
  title: "NICE: Natural Language to SQL System with Production Safeguards for Contact Center Analytics - ZenML LLMOps Database"
  description: "NICE implemented a system that allows users to query contact center metadata using natural language, which gets translated to SQL queries. The solution achieves 86% accuracy and includes critical production safeguards like tenant isolation, default time frames, data visualization, and context management for follow-up questions. The system also provides detailed explanations of query interpretations and results to users."
  canonical: "https://www.zenml.io/llmops-database/natural-language-to-sql-system-with-production-safeguards-for-contact-center-analytics"
  ogTitle: "NICE: Natural Language to SQL System with Production Safeguards for Contact Center Analytics - ZenML LLMOps Database"
  ogDescription: "NICE implemented a system that allows users to query contact center metadata using natural language, which gets translated to SQL queries. The solution achieves 86% accuracy and includes critical production safeguards like tenant isolation, default time frames, data visualization, and context management for follow-up questions. The system also provides detailed explanations of query interpretations and results to users."
---

## Overview

This case study presents a talk by Peter Lipshitz, a software architect at NICE, describing how the company implemented a text-to-SQL system for querying contact center metadata databases. The presentation focuses heavily on the practical production challenges that emerge when moving beyond simple demos to real-world deployments of LLM-based SQL generation systems.

NICE has a database containing metadata about contact center conversations, and the goal is to allow users to query this database using natural language rather than requiring SQL knowledge. While the speaker acknowledges that text-to-SQL is not a new problem—referencing public benchmarks with 10,000 questions across 200 databases showing around 86% accuracy for various models—the focus of this talk is on the additional considerations required for production systems that go far beyond what a demo might show.

## Basic Architecture vs. Production Reality

The speaker describes the basic architecture as seemingly trivial: you provide the schema to an LLM, give it a user question, and it generates SQL that runs against the database to return results. However, he emphasizes this is what he calls a "demo" solution—it works in controlled scenarios but fails to address numerous production concerns.

The core message is that moving from proof-of-concept to production requires addressing multiple layers of complexity that aren't apparent in benchmark scenarios. The speaker walks through these challenges systematically, drawing from NICE's actual implementation experience.

## Translation Layer and Schema Management

One key component NICE implemented is a translation module between the LLM and the database. This serves multiple purposes:

The translation table maps column names and provides explanations to help the LLM understand what each field represents. This is important because database column names often use abbreviations or internal naming conventions that aren't self-explanatory. Beyond simple name mapping, this layer also handles semantic nuances in the data.

A particularly interesting example the speaker provides involves behavioral scores in their database. Most behavioral metrics in their system are positively oriented (higher is better), but one specific metric works inversely—the higher the score, the worse the behavior. This kind of domain-specific knowledge must be explicitly communicated to the LLM to ensure accurate query generation and interpretation.

## Multi-Tenant Security Considerations

Security represents one of the most critical production concerns, and the speaker is emphatic that tenant separation is too important to rely on the LLM itself. Their database is organized with a tenant_id column, and allowing the LLM to potentially access data from other tenants represents an unacceptable risk.

NICE's solution is elegant in its simplicity: the LLM is completely unaware of the tenant concept. Tenant filtering is applied as a post-processing step after receiving the SQL from the LLM. This approach provides a hard security boundary that doesn't depend on prompt engineering or model behavior. The speaker explicitly notes that regardless of what safeguards you implement at the prompt level, there will likely be edge cases or exploits, so the architectural decision to handle tenant filtering outside the LLM is crucial.

The speaker also mentions role-based access control (RBAC) as an additional concern, though he notes this is out of scope for the 10-minute talk, suggesting it's an active area of work or consideration.

## Handling Incomplete or Ambiguous Queries

A significant challenge in production text-to-SQL systems is that users who are newly empowered to query databases through natural language often don't know how to ask precise questions. The speaker gives the example: "my best agents by number of calls handled" - which sounds reasonable but lacks crucial details like how many agents to return and what time period to consider.

NICE addressed this by implementing intelligent defaults rather than always forcing clarification from users. They configured:

- A default number of records (e.g., 50 or 5) when the user doesn't specify
- A default maximum time frame (e.g., last 3 months) when no date range is provided

The implementation approach differs based on what's being defaulted. For the number of records, it's relatively straightforward to add a LIMIT clause to the generated SQL post-hoc. However, for time frame defaults, the problem is more complex—especially when queries involve multiple tables and joins. For time filtering, NICE actually goes back to the LLM: they instruct it to include time filtering, check the generated SQL for time constraints, and if none are found, they prompt the LLM again to add appropriate date filters.

## Relevancy and Query Guardrails

The speaker touches on the challenge of ensuring queries remain relevant to the database and use case. Obviously, questions like "give me five reasons to vote for [politician]" should be rejected as irrelevant to contact center data. These are relatively easy to filter.

However, more subtle cases present ongoing challenges. The speaker gives the example of a user asking for "most diligent agents"—the LLM might interpret this as agents who spent the most time, which isn't necessarily what "diligent" means in a contact center context. NICE decided not to block these ambiguous queries but instead relies heavily on transparency through their textual description feature (explained below).

## Visualization and Result Presentation

Once data is retrieved, NICE doesn't just display a raw table. They recognize that returned data can vary dramatically in structure—from single values to tables with 17 columns—and that their users prefer visual representations.

Their solution involves a second LLM call: after obtaining the data, they send it back to the LLM and ask for the best visualization approach given their UI's supported chart types. The system then renders both a chart and a text description for the user.

## Textual Descriptions as a Core Feature

The speaker emphasizes that textual descriptions accompanying results serve multiple critical functions:

First, they provide a natural language answer to the question. If someone asks "what are my busiest groups," the system explicitly lists them: "The groups are A, B, C, D..."

Second—and perhaps more importantly—they explain any interpretations or defaults that were applied. If the system defaulted to showing three months of data, the textual description explicitly states this, allowing users to refine their query if needed.

Third, for ambiguous queries like "most diligent agents," the description clarifies what the system actually returned: "Here are the agents who spent the most time on their work." This transparency helps users understand and validate results.

Fourth, the system can also surface interesting patterns in the data, such as noting when one group is significantly more loaded than others, helping users interpret the results more effectively.

## Follow-up Questions and Conversation Context

Production natural language interfaces inevitably encounter follow-up questions. A user might ask "what are my busiest groups" and then follow up with "and now the least busy"—a query that's meaningless without context.

NICE had to decide what context to provide for follow-up queries: the previous question only, the previous SQL, or the actual returned data. They chose to include the previous question and SQL but not the returned data. This approach works well for refinement queries like "actually I meant the last year" or "now show me the opposite."

However, the speaker acknowledges limitations: users cannot ask questions about the data itself (like "what's the average of column X in these results") since the LLM doesn't have the data context. This is described as a different problem domain.

An interesting observation the speaker shares: if you ask the same question twice in a conversation, the LLM tends to assume something was wrong with the first answer and attempts to modify it, often resulting in a worse response. This behavioral quirk needs to be accounted for in production systems.

## Query Caching and Data Refresh

For recurring queries like "what are my busiest groups this week," NICE implemented query caching. Rather than regenerating SQL each time (which risks variations or errors), they store the SQL and re-execute it when users return to the same question. This is described as both a performance optimization and a reliability improvement—there's no need to "risk an error" by going back to the LLM when you already have working SQL for a known question pattern.

## Production Lessons and Trade-offs

Throughout the talk, several key LLMOps principles emerge:

The speaker emphasizes that what works in demos often fails in production. The 86% accuracy reported in benchmarks doesn't account for security, usability, and trust requirements of real systems.

Security-critical operations (like tenant filtering) should be handled outside the LLM's purview entirely, using deterministic post-processing rather than relying on prompt-based controls.

Transparency with users is crucial—explaining defaults, interpretations, and what the system actually did helps build trust and enables users to refine their queries effectively.

Not every problem needs to be solved by the LLM. NICE uses a hybrid approach where some operations (like adding record limits) happen in post-processing, while others (like adding time filters) require going back to the LLM.

The system represents a thoughtful production implementation that acknowledges both the power and limitations of LLM-based SQL generation, implementing appropriate guardrails and user experience enhancements to make the technology viable for real-world contact center operations.