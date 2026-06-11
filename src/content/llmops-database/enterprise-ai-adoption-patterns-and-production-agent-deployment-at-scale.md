---
title: "Enterprise AI Adoption Patterns and Production Agent Deployment at Scale"
slug: "enterprise-ai-adoption-patterns-and-production-agent-deployment-at-scale"
draft: false
llmopsTags:
  - "customer-support"
  - "fraud-detection"
  - "code-generation"
  - "unstructured-data"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "rag"
  - "embeddings"
  - "vector-search"
  - "semantic-search"
  - "agent-based"
  - "multi-agent-systems"
  - "memory"
  - "human-in-the-loop"
  - "cost-optimization"
  - "latency-optimization"
  - "prompt-engineering"
  - "langchain"
  - "databases"
  - "open-source"
  - "documentation"
  - "monitoring"
  - "guardrails"
  - "compliance"
  - "security"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "tech"
company: "MongoDB"
summary: "MongoDB's CEO shares insights from conversations with over 10 customers weekly across frontier labs, AI-native startups, and large enterprises, revealing different AI adoption patterns and production deployment challenges. While frontier labs use MongoDB for training data and inference layers, and AI-native companies like ElevenLabs achieve rapid scale with 40 million production agents on MongoDB, large enterprises struggle to move beyond employee-facing agents to customer-facing production deployments due to technology stack uncertainty, regulatory requirements, and evaluation challenges. The discussion highlights the integration between MongoDB and LangChain for vector search, hybrid search, and memory layers, while exploring broader trends around coding agent costs, SaaS disruption, and the evolution from UI-based software to agent-based systems with context and memory layers becoming critical infrastructure."
link: "https://www.youtube.com/watch?v=k4l-rtwezVg"
year: 2026
seo:
  title: "MongoDB: Enterprise AI Adoption Patterns and Production Agent Deployment at Scale - ZenML LLMOps Database"
  description: "MongoDB's CEO shares insights from conversations with over 10 customers weekly across frontier labs, AI-native startups, and large enterprises, revealing different AI adoption patterns and production deployment challenges. While frontier labs use MongoDB for training data and inference layers, and AI-native companies like ElevenLabs achieve rapid scale with 40 million production agents on MongoDB, large enterprises struggle to move beyond employee-facing agents to customer-facing production deployments due to technology stack uncertainty, regulatory requirements, and evaluation challenges. The discussion highlights the integration between MongoDB and LangChain for vector search, hybrid search, and memory layers, while exploring broader trends around coding agent costs, SaaS disruption, and the evolution from UI-based software to agent-based systems with context and memory layers becoming critical infrastructure."
  canonical: "https://www.zenml.io/llmops-database/enterprise-ai-adoption-patterns-and-production-agent-deployment-at-scale"
  ogTitle: "MongoDB: Enterprise AI Adoption Patterns and Production Agent Deployment at Scale - ZenML LLMOps Database"
  ogDescription: "MongoDB's CEO shares insights from conversations with over 10 customers weekly across frontier labs, AI-native startups, and large enterprises, revealing different AI adoption patterns and production deployment challenges. While frontier labs use MongoDB for training data and inference layers, and AI-native companies like ElevenLabs achieve rapid scale with 40 million production agents on MongoDB, large enterprises struggle to move beyond employee-facing agents to customer-facing production deployments due to technology stack uncertainty, regulatory requirements, and evaluation challenges. The discussion highlights the integration between MongoDB and LangChain for vector search, hybrid search, and memory layers, while exploring broader trends around coding agent costs, SaaS disruption, and the evolution from UI-based software to agent-based systems with context and memory layers becoming critical infrastructure."
notion:
  pageId: "379f8dff-2538-806a-9eae-f1ea7f5f4ca8"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-08T12:12:00.000Z"
  lastEditedTime: "2026-06-08T12:12:00.000Z"
  publishedAt: "2026-06-11T12:15:19Z"
---

## Overview

This case study emerges from a fireside chat between Harrison Chase (CEO of LangChain) and CJ Prasad (CEO of MongoDB), offering a comprehensive view of how different categories of organizations are deploying LLMs in production. The conversation provides rare insight into enterprise AI adoption patterns based on CJ's practice of speaking with at least 10 customers weekly, giving him visibility into what's working and what's not working across frontier model labs, AI-native startups, and large enterprises. The discussion centers on MongoDB's role as a data layer for AI workloads and its integration with LangChain's orchestration capabilities, while exploring broader challenges around production agent deployment, cost management, and the evolving technology stack.

## MongoDB's AI-Ready Architecture

MongoDB's suitability for AI workloads appears somewhat serendipitous rather than intentionally designed. The database was founded in 2007 with three core principles that turned out to be highly relevant for AI: a document model that doesn't constrain developers to rows and columns (enabling agility), commodity hardware with scale-out architecture designed for cloud deployment, and being optimized for unstructured data. Since AI workloads are fundamentally about unstructured data, whether images, PDFs, voice, or other modalities, MongoDB found itself well-positioned for the AI era.

To enhance its AI capabilities, MongoDB added several features specifically for AI workloads. Native search and vector search capabilities were implemented, including hybrid search that combines traditional search with vector-based retrieval. Embeddings functionality was added through a team recruited from Stanford. These additions enable efficient retrieval patterns critical for RAG applications and other AI use cases. The integration with LangChain for vector search, hybrid search, long-term memory storage, and graph RAG emerged organically from developer demand rather than top-down partnership decisions, reflecting how builders naturally gravitated toward combining these technologies.

## Three Tiers of AI Adoption

The case study reveals three distinct categories of MongoDB customers with different AI usage patterns:

**Frontier Labs:** These companies, which can be counted on one hand, use MongoDB in two primary ways. First, for research workloads involving training data composed of unstructured data like PDFs and voice files before shipping their next model versions. Second, for the inference layer, storing chat conversations, long-term memory, and search data that accumulates during model usage.

**AI-Native Companies:** ElevenLabs serves as the primary example, a text-to-speech and speech-to-text company founded post-ChatGPT using small language models focused on voice as a modality. After initially making what CJ characterizes as a mistake by using a first-party database from their hyperscaler that didn't scale, ElevenLabs migrated to MongoDB and now runs 40 million production agents. The company achieved $500 million in annual recurring revenue through rapid growth focused on customer support and sales use cases across 74 languages. Their platform approach centers on voice as the common thread, building multiple agent types at fractional cost once the foundational voice model is established.

**Large Enterprises:** This category includes major banks running mission-critical payment systems, technology companies, and Adobe using MongoDB for products involving significant unstructured data. These enterprises are building agents using LangChain for orchestration and LangGraph for agent development, but face unique challenges in moving to production.

## The Agent Deployment Reality Gap

A critical insight from the case study concerns the gap between employee-facing agents and customer-facing agents at scale. CJ systematically asks enterprise customers whether they've created customer-facing agents at scale, categorizing agent deployments into three buckets: employee-facing (productivity copilots accessing multiple data sources), partner-facing (for working with business partners), and customer-facing (serving end customers).

The reality is that large enterprises have largely failed to deploy customer-facing agents at scale. A major insurance company example illustrates the challenges. Despite building numerous employee-facing agents, they haven't deployed customer-facing agents for their 50+ million customers. The blockers are multiple:

**Technology Stack Uncertainty:** Organizations face paralysis around what agentic stack to build on given the rapid pace of change. They're locked into particular hyperscalers across multiple regions and face opinionated frameworks from those providers, creating tension around whether to commit to specific approaches or maintain optionality through solutions like LangChain. There's uncertainty about whether to commit to particular frontier models or use different models for different sub-agents.

**Regulatory and Governance Requirements:** Highly regulated industries like insurance and banking need comprehensive audit capabilities. They must be able to replay agent interactions to verify non-discrimination in decisions like insurance rate quotes. They need robust governance and security frameworks. If an agent crashes mid-interaction, there must be clear handoff protocols for human takeover, including decisions about whether to escalate to voice calls or different agent types.

**Evaluation and Confidence:** Before rolling out functionality to millions of customers for critical decisions like insurance claim processing, organizations need rock-solid evaluation frameworks. When agents are making decisions about approving claims, adding dependents or drivers to policies, or changing claim details, the stakes are much higher than employee productivity gains.

The enterprise perspective is that 2025 was anticipated to be the year for agents at scale for customer-facing applications, but that didn't materialize. One customer reported that the number of agent rebuilds or "agent washing" was extreme in 2025, with one executive stating they "swap out agents more than they do laundry." However, 2026 is seen as more stable, with technologies around observability and orchestration maturing to the point where engineering teams can commit to specific approaches, iterate rapidly, and roll out to production with more confidence.

## The Three-Legged Stool Architecture

The integration between MongoDB and LangChain is framed around a "three legs of a stool" architecture: the LLM layer, the data layer, and the harness layer. This architecture emphasizes openness and avoiding lock-in at any layer.

The data layer (MongoDB) stores the context and memory that agents need to make real-time decisions. The harness layer (LangChain/LangGraph) provides orchestration across models and infrastructure. The LLM layer provides the intelligence but should remain swappable. The key principle is that the harness layer should work across any models and any hyperscalers, while the data layer remains consistent.

MongoDB developed Atlas hybrid search specifically for integration with LangChain, making it seamless for developers to perform retrievals using MongoDB as the data store. The partnership aims to make the integration work so smoothly that, as one Adobe senior software engineer reported, "the LLM is the bottleneck, not the harness or the data layer." This quote encapsulates the goal: removing friction from the orchestration and data layers so that model inference becomes the limiting factor for agent performance.

The open ecosystem philosophy is presented as critical because both model labs and hyperscalers attempt to lock customers into opinionated frameworks covering the entire stack from harness to data. MongoDB's belief is that multicloud is increasingly real due to capacity constraints, citing the example of Anthropic using on-premises facilities from xAI. This reinforces the need for a data layer that works consistently across different infrastructure choices.

## Context and Memory as Critical Infrastructure

An emerging theme is that the context and memory layer represents a new category of infrastructure that will grow significantly larger than currently anticipated. This is framed around the concept of "system of intelligence" as distinct from traditional systems of record or systems of action. With agents functioning as systems of intelligence, the data layer and harness become super-critical beyond just the LLM selection.

The context and memory layer needs to provide the right information in real time so agents can make immediate decisions. This is explicitly contrasted with data warehouses, which were designed with 15-30 minute lag times for business intelligence queries. Customer-facing agents in airlines, banks, and other contexts need to make decisions fast, requiring a fundamentally different architecture.

Every enterprise building agents faces the challenge that required data comes from numerous different sources. Building a comprehensive context and memory layer that aggregates this data in a way that enables real-time agent decision-making is described as both a technical challenge and a growing opportunity.

The Open Memory partnership announcement is mentioned as an effort to standardize what memory for agents should look like, with the emphasis that this standard needs to be open rather than proprietary to any vendor.

## Production Cost Economics: The Coding Agent Reality Check

The case study provides concrete data on the economics of deploying coding agents at production scale across MongoDB's nearly 2,000 engineers. The results reveal important tensions:

In the most recent week discussed, 70% of code checked in was written by coding assistants. This represents a dramatic shift in how software is produced. However, the economic implications are complex. Analysis of MongoDB's distributed systems engineers showed that actual coding time represents only 20-25% of their work week, with the remainder spent on code review, team meetings, design discussions, and ensuring subsystems work well together.

While coding assistants have compressed the coding time window within that 20-25%, producing 30-35% more code, the token costs have increased significantly. This creates a complex calculation: engineers are producing more features and products (which can potentially drive more revenue), but at a higher cost per engineer due to token consumption.

The question of whether token budgets per engineer need to be implemented is raised but not definitively answered. Instead, the framework becomes: should MongoDB hire 30% more engineers if current engineers are 30% more productive? The economics shift from human cost versus token cost, with the evaluation centered on whether the additional features and products justify both the token spend and potentially reduced hiring.

There's acknowledgment that prompt engineering quality may affect token consumption, with questions about whether engineers are writing prompts optimally. However, the overall stance is pragmatic: if token costs enable 35% more code production that translates to meaningful new capabilities, it's acceptable even if expensive, but the economics must be sustainable and the innovation gains must materialize.

## Enterprise Software Transformation and SaaS Disruption

The conversation reveals how MongoDB as a customer is fundamentally changing its approach to enterprise software procurement in the AI era:

**One-Year Contracts Only:** MongoDB now only signs one-year contracts with SaaS vendors rather than multi-year commitments. This reflects uncertainty about future headcount needs given AI productivity gains and the obsolescence of seat-based pricing models.

**Aggressive Vendor Reduction:** The directive to MongoDB's CIO is to cut the number of SaaS vendors in half across finance, CRM, and other functions. The rationale is that with the right context layer, orchestration capabilities, and data layer (MongoDB), many functions can be built internally rather than purchased.

**Build vs. Buy Shift:** There's a fundamental shift toward building internally rather than buying, enabled by agent technology and the ability to access and orchestrate existing data.

From the vendor perspective, CJ offers a framework for which SaaS companies might survive this shift:

**Defensible Positions:** Vertical SaaS with deep domain expertise built for specific industries like life sciences or insurance has a defensible moat. Vertical functional SaaS built for specific departments like legal also has advantages. However, horizontal SaaS companies whose primary value proposition is a well-designed UI are at highest disruption risk.

**Proprietary Data as Moat:** Companies that own proprietary data in a system of record specific to their domain have more defensibility than those primarily offering interface layers.

## Startup Moats in the AI Era

When evaluating AI-native startups, CJ asks a direct question: "What is your real moat on top of the foundation model?" Many startups answer that they have industry knowledge built into their product via RAG and forward-deployed engineering teams that deliver value in days or weeks rather than months. This is characterized as "OK but not great" because of concern that frontier model companies might move up the stack for particular use cases.

The recommended strategy for building a defensible moat is developing a platform mindset with multiple use cases that work together synergistically. Rather than a single use case providing 20% productivity improvement, a startup should offer multiple use cases where combining them creates multiplicative value where one plus one is more than two. This platform approach should work across the customer's needs, with ElevenLabs cited as an example where voice as the modality becomes the common thread enabling building the next agent at fractional cost.

The observation is that most current offerings remain single-use-case focused, and the platform evolution hasn't happened as quickly in the AI era as might be expected, representing an opportunity for startups that can execute on this vision.

## The Shift from UI-Based to Agent-Based Software

A fundamental architectural shift is described where the era of software built around user interfaces is ending. The new paradigm is agent-based systems with robust context layers, eliminating the need for traditional UI-mediated interactions. This shift underpins the discussion of headless APIs, with Salesforce mentioned as an example of this trend.

The implication is that software will increasingly be consumed through agent interfaces rather than through traditional UI-based workflows, with the context and memory layer becoming the primary interface point. This architectural shift has profound implications for how software is built, sold, and consumed across the industry.

## Real-World Implementation: Adobe Case Study

Adobe represents a concrete example of the MongoDB-LangChain integration in production. Adobe has extensive unstructured data and has built many products on MongoDB, including Adobe Experience Manager and other components of their Experience Cloud digital experience platform. When building agents using multiple LangChain technologies, Adobe's requirement was ensuring super-fast retrieval performance.

The reported outcome from Adobe's senior software engineer is that after implementing the integrated stack, the LLM became the bottleneck rather than the harness or data layer. This demonstrates the successful execution of the architecture where infrastructure concerns are removed as limiting factors, allowing the focus to shift to model performance and accuracy.

## Evaluation as a Gating Function

While evaluation frameworks are mentioned as maturing and becoming a key enabler for 2026 being more stable than 2025, the case study is relatively light on specific evaluation methodologies or tools. The emphasis is on evaluation needing to be "rock solid" before enterprises roll out customer-facing agents at scale, particularly for high-stakes decisions in regulated industries.

The requirement for audit and replay capabilities suggests that evaluation includes not just pre-deployment testing but ongoing monitoring and the ability to forensically examine agent decisions. The ability to answer questions about discrimination, fairness, and decision quality in regulated contexts drives requirements beyond traditional software testing.

## Multi-Cloud and Infrastructure Portability

The mention of Anthropic using on-premises facilities from xAI is cited as evidence that multi-cloud strategies are very real, driven by capacity constraints in the AI era. This reinforces MongoDB's philosophy of providing a consistent data layer that works across different hyperscalers and infrastructure choices, avoiding lock-in to any single provider's opinionated framework.

This portability becomes increasingly important as organizations experiment with different models, face capacity constraints, and need to optimize for cost, performance, and regulatory requirements across different deployment contexts.
