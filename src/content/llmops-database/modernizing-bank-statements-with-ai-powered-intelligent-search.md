---
title: "Modernizing Bank Statements with AI-Powered Intelligent Search"
slug: "modernizing-bank-statements-with-ai-powered-intelligent-search"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "question-answering"
  - "realtime-application"
  - "regulatory-compliance"
  - "legacy-system-integration"
  - "prompt-engineering"
  - "semantic-search"
  - "embeddings"
  - "elasticsearch"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "scalability"
  - "monitoring"
  - "devops"
  - "cicd"
  - "continuous-deployment"
  - "serverless"
  - "orchestration"
  - "cache"
  - "reliability"
  - "security"
  - "compliance"
  - "amazon-aws"
industryTags: "finance"
company: "Itaú"
summary: "Itaú, one of Latin America's largest private banks with over 70 million customers, faced significant challenges with their legacy monolithic bank statement system, including high latency, limited historical data access of only 3 months, and inability to perform complex filtering or aggregations. The bank undertook a comprehensive modernization journey by migrating to AWS, implementing a cell-based architecture using Amazon OpenSearch as the primary data layer, and developing an intelligent search feature powered by Amazon Bedrock. The solution enabled natural language queries for bank statements, reducing search errors by 80%, improving response times from 2 seconds to 200 milliseconds, extending data access to 5 years, and achieving over 8 million monthly requests. The modernization also resulted in a 90% reduction in mainframe MIPS consumption, 53% faster deployment cycles, and significant improvements in customer satisfaction scores, particularly for corporate accounts."
link: "https://www.youtube.com/watch?v=ZxE9nh0wkGI"
year: 2025
seo:
  title: "Itaú: Modernizing Bank Statements with AI-Powered Intelligent Search - ZenML LLMOps Database"
  description: "Itaú, one of Latin America's largest private banks with over 70 million customers, faced significant challenges with their legacy monolithic bank statement system, including high latency, limited historical data access of only 3 months, and inability to perform complex filtering or aggregations. The bank undertook a comprehensive modernization journey by migrating to AWS, implementing a cell-based architecture using Amazon OpenSearch as the primary data layer, and developing an intelligent search feature powered by Amazon Bedrock. The solution enabled natural language queries for bank statements, reducing search errors by 80%, improving response times from 2 seconds to 200 milliseconds, extending data access to 5 years, and achieving over 8 million monthly requests. The modernization also resulted in a 90% reduction in mainframe MIPS consumption, 53% faster deployment cycles, and significant improvements in customer satisfaction scores, particularly for corporate accounts."
  canonical: "https://www.zenml.io/llmops-database/modernizing-bank-statements-with-ai-powered-intelligent-search"
  ogTitle: "Itaú: Modernizing Bank Statements with AI-Powered Intelligent Search - ZenML LLMOps Database"
  ogDescription: "Itaú, one of Latin America's largest private banks with over 70 million customers, faced significant challenges with their legacy monolithic bank statement system, including high latency, limited historical data access of only 3 months, and inability to perform complex filtering or aggregations. The bank undertook a comprehensive modernization journey by migrating to AWS, implementing a cell-based architecture using Amazon OpenSearch as the primary data layer, and developing an intelligent search feature powered by Amazon Bedrock. The solution enabled natural language queries for bank statements, reducing search errors by 80%, improving response times from 2 seconds to 200 milliseconds, extending data access to 5 years, and achieving over 8 million monthly requests. The modernization also resulted in a 90% reduction in mainframe MIPS consumption, 53% faster deployment cycles, and significant improvements in customer satisfaction scores, particularly for corporate accounts."
notion:
  pageId: "397f8dff-2538-80a0-9b9b-dd3c21aea71c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:04:00.000Z"
  lastEditedTime: "2026-07-08T20:04:00.000Z"
  publishedAt: "2026-07-08T20:08:31Z"
---

## Overview

Itaú, a major Latin American financial institution with 100 years of history, 93,000 employees including 17,000 in technology, and over 70 million customers across 18 countries, embarked on a comprehensive modernization of their bank statement platform. This case study represents a significant LLMOps implementation where the bank transformed a legacy monolithic system into a modern, AI-powered platform built on AWS, with a particular focus on deploying large language models in production to enable intelligent search capabilities through natural language processing.

The modernization was driven by changing customer habits demanding speed, personalization, and seamless experiences. The bank recognized that new technologies required them to reorganize their services end-to-end with a customer-centric approach, focusing on four key pillars: design, technology, products, and data. This transformation built upon their existing Itaú Intelligence initiative, which already used AI to improve and personalize customer interactions.

## Initial Challenges and Context

The legacy architecture presented multiple critical issues that necessitated modernization. The monolithic system struggled with latency as demand increased, causing performance degradation and higher response times that negatively affected the mobile app experience. Customers were severely limited in data access, with only approximately 3 months of historical data available through online channels. The system lacked capabilities for long-period data searches and complex filtering, and the gap between individual and corporate account features was particularly pronounced. Corporate accounts notably lacked data aggregation capabilities for reconciling transactions and balances, forcing companies to rely on traditional Swift files that were only available at end-of-day, preventing real-time financial operations.

The bank organized their modernization focus around three main areas: customer-centric improvements, platform infrastructure enhancements, and time-to-market acceleration to increase agility for their engineering teams.

## Architecture Modernization and Foundation

The modernization established a clear vision: create a unified platform serving all channels with both individual and corporate accounts in the same infrastructure. The architecture was driven by five technical principles: resilience for mission-critical service availability, scalability to support over 70 million daily customers with controlled costs, and security, governance, and compliance appropriate for the highly regulated financial services industry. Critically, the goal was to create a strong foundational platform capable of supporting new AI-powered features and experiences.

The high-level architecture consists of multiple layers. The exposition and channels layer allows various channels to call platform APIs to request bank statements. The processing layer handles orchestration between services, including customer identification, complex filtering, and aggregations. Most notably, the data layer eschews traditional relational or NoSQL databases in favor of Amazon OpenSearch Service as the primary data store. This architectural choice was deliberate, selecting the right tool for complex search patterns and leveraging OpenSearch's distributed nature for horizontal scalability.

The ingestion layer decouples the platform from the financial ledger, implementing both streaming and batch workflows. For online transactions, streaming captures events in real-time with processing that not only consumes transactions but enriches them by creating better descriptions, categorizing them, and preparing them for storage. The platform separates OpenSearch clusters by account type, with dedicated clusters for individual versus corporate accounts. Additionally, a big data pipeline backed by AWS Glue handles batch ingestion for reconciliation transactions throughout the day.

## Advanced Resilience Patterns

The search workflow implements two sophisticated resilience techniques that are particularly noteworthy from an operational perspective. The first is shuffle sharding, which goes beyond simple data partitioning by replicating customer data across multiple shards in a carefully designed pattern. Each customer's data exists on different shard combinations, so if one customer's data lives on shards 1 and 3, another customer's data might be on shards 2 and 4. This reduces the blast radius of any single shard failure, as no two customers share identical shard assignments. When a shard experiences issues, only a subset of customers is affected, and their data remains accessible through replica shards.

The second technique is hedging, which works in conjunction with shuffle sharding. The system makes simultaneous requests to multiple shards containing the same customer's data and accepts the first response received. This approach not only provides high availability by ensuring alternative data sources when one shard is unavailable, but also optimizes response times by naturally selecting the fastest-responding shard at any given moment. These patterns work together to achieve both the resilience and performance requirements of a mission-critical banking service.

## LLM Integration and Intelligent Search

The intelligent search feature represents the core LLMOps implementation in this modernization. The system enables customers to use natural language queries to search their bank statements, asking questions like "How many Pixes did I do last month?" or "Did I pay my gym membership last month?" or "Was my salary deposited last month?" The architecture implements a natural language query processor that routes requests to an NLP layer designed to understand the query, identify context, determine intent, and recognize the transaction types the user is seeking.

Amazon Bedrock serves as the LLM platform that translates natural language queries into optimized OpenSearch queries. The technical architecture maintains relative simplicity: channels call platform APIs with semantic search requests, a routing layer directs requests to the NLP processing layer, multiple treatment layers identify context and user intent regarding filtering and transaction selection, and then the system invokes the LLM through Amazon Bedrock to generate the appropriate OpenSearch query. Importantly, the system doesn't create new data or hallucinate information; it strictly understands natural language input and translates it into precise database queries that execute against the existing data layer, filtering and delivering results to customers.

This approach has already demonstrated an 80% reduction in search errors within the channel when users attempt to search bank statements or filter transactions. The LLM acts as an intermediary that bridges the gap between how customers naturally think about their financial data and how that data is structured and indexed in the database. From an LLMOps perspective, this is a well-scoped use case: the LLM performs query translation rather than generation, meaning the output is constrained and verifiable against the database schema, reducing risks associated with hallucination or incorrect outputs.

## Operational Results and Impact

The modernization achieved substantial measurable improvements across multiple dimensions. Feature lead time decreased dramatically from 90 days pre-modernization to 30 days post-modernization, representing a significant acceleration in development velocity. Historical data access expanded from 3 months to over 5 years available through online channels, enabling complex filtering, long-period searches, and aggregation for corporate accounts. Customer engagement metrics showed the impact, with monthly requests increasing from 2 million to over 8 million, demonstrating increased search adoption.

A concrete example of improvement relates to transaction descriptions. Prior to modernization, approximately 40% of customer feedback dissatisfaction concerned unclear transaction descriptions, a limitation of the legacy architecture with fixed-position character constraints. The modernized system prioritizes key information in a structured three-line format: the action, the recipient or counterparty, and the amount. This change alone contributed to a 5% increase in satisfaction scores and a 5% decrease in detractor scores.

Corporate accounts saw particularly dramatic improvements. Previously, companies relied exclusively on Swift files for reconciliation, requiring them to wait until end-of-day. The new platform provides an API enabling near-real-time transaction and balance reconciliation. This capability drove a 5% satisfaction increase, a 4% increase in share of funds as customers consolidated banking activities at Itaú from other banks, and a remarkable 30% increase in product banking, enabling more targeted and relevant product offerings.

Platform performance metrics demonstrated the technical success. The migration moved from legacy and modern coexisting systems in October to full cloud deployment by November, strategically timed for Black Friday when customer behavior drives massive traffic spikes as customers check balances after online purchases. Response times improved from approximately 2 seconds to 200 milliseconds, across 94 billion requests processed in 2025. Mainframe MIPS consumption decreased from 20,000 in 2022 to 3,000 in 2025, representing a 90% reduction in one of the most expensive infrastructure costs in banking. Deployment agility increased with production changes rising from 200 to over 300, a 53% increase, while business feature delivery accelerated by 45%.

## Data Scale and Cost Management

The platform manages extraordinary data volumes. In just three years, the system accumulated over 216 petabytes of stored data. Brazilian financial regulations require maintaining 10 years of data after account closure, creating significant long-term storage cost implications. The architecture addresses this through Amazon OpenSearch combined with S3 lifecycle policies, implementing tiered storage across hot, ultra-warm, and cold tiers to optimize costs based on data access patterns and age. The system processes over 80 million search requests on the cloud infrastructure, with over 30 dedicated clusters isolating different customer types and use cases.

## LLMOps Considerations and Assessment

From an LLMOps perspective, this implementation represents a measured and pragmatic approach to incorporating LLMs into production banking systems. The use case is well-bounded: translating natural language to structured queries rather than generating free-form responses or making decisions. This constraint significantly reduces the risk profile compared to more open-ended generative AI applications in banking.

The architecture leverages Amazon Bedrock, which provides several operational advantages for enterprise LLM deployments: managed infrastructure reducing operational burden, security and compliance features appropriate for financial services, and the ability to access multiple model options through a single API. However, the presentation does not detail several critical LLMOps considerations that would be essential for a complete evaluation. There is no discussion of prompt engineering strategies, how prompts are versioned and managed, or what testing and evaluation frameworks validate query translation accuracy. The claim of 80% error reduction is impressive but lacks context about how errors are defined, measured, and monitored in production.

Model selection criteria are not discussed—which Bedrock models are used, why they were chosen, and whether multiple models were evaluated. There is no mention of fallback strategies when the LLM fails to produce a valid query or how the system handles ambiguous queries. Monitoring and observability for the LLM component are not addressed: how do they track model performance degradation, latency, or translation accuracy over time? Cost management for LLM inference at scale with millions of monthly requests represents a significant operational consideration not covered in the presentation.

The integration pattern appears to be synchronous, with the LLM invoked in the request path, which could introduce latency and availability concerns. The hedging and shuffle sharding patterns apply to the OpenSearch layer but it's unclear whether similar resilience patterns protect the LLM invocation. Additionally, there is no discussion of data privacy considerations: what customer data is sent to the LLM, how is it sanitized, and what audit trails exist?

Despite these gaps in the presentation, the fundamental approach is sound. Using LLMs for query translation to structured databases is a well-established pattern with relatively low risk compared to generative use cases. The strong foundational architecture with cell-based design, advanced resilience patterns, and OpenSearch as a flexible search layer provides a robust platform for the AI features. The fact that the system validates LLM outputs by executing them against a database creates an inherent safety mechanism—invalid queries will fail safely rather than producing incorrect results.

## Future Direction

The bank is actively working toward a conversational banking experience, recognizing that customer habits continue evolving. Building on Itaú Intelligence and the intelligent search foundation, they are developing natural dialogue and voice command capabilities as the next frontier. They are currently rolling out intelligent search to all customers and building conversational dialogue capabilities within bank statements. The complete mainframe migration is targeted for completion by the following year.

The progression is logical: traditional search to complex filtering with OpenSearch, to intelligent search with natural language processing, to conversational banking with multi-turn dialogue. Each phase builds on the previous infrastructure while expanding AI capabilities. This staged approach allows the bank to learn operational lessons at each level before adding complexity.

## Lessons Learned and Critical Success Factors

The presenters emphasized that modernization is a journey, not a one-time event, requiring continuous evolution of performance optimization, scalability improvements, security strengthening, and new feature development. The strong architectural foundation with cell-based design and resilience patterns proved crucial for enabling simple implementation of innovative features like intelligent search. Cross-functional governance with alignment between business stakeholders, architecture teams, and engineering teams was identified as crucial for project success.

From an LLMOps maturity perspective, Itaú appears to be in a relatively early stage of their AI journey, focusing on well-defined, lower-risk use cases before expanding to more complex applications. The intelligent search represents a pragmatic entry point for LLMs in production banking, delivering measurable value while maintaining appropriate risk controls. As they move toward conversational banking, the LLMOps challenges will increase significantly, requiring more sophisticated approaches to prompt management, evaluation, safety controls, and monitoring. The strong platform foundation positions them well for this evolution, but success will depend on developing the operational practices and tooling to manage more complex LLM applications at scale.
