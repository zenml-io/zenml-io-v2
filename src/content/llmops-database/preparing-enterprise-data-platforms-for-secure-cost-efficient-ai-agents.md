---
title: "Preparing Enterprise Data Platforms for Secure, Cost-Efficient AI Agents"
slug: "preparing-enterprise-data-platforms-for-secure-cost-efficient-ai-agents"
draft: false
llmopsTags:
  - "question-answering"
  - "data-integration"
  - "realtime-application"
  - "legacy-system-integration"
  - "rag"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "mcp"
  - "human-in-the-loop"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "postgresql"
  - "security"
  - "reliability"
  - "scalability"
  - "google-gcp"
industryTags: "tech"
company: "Totvs"
summary: "Totvs, a Brazilian enterprise software provider whose systems support a substantial share of the country’s economic activity, is adapting its data architecture for production AI agents. The central challenge is that transactional systems and conventional data lakes were designed for applications, analysts, and dashboards rather than token-hungry, latency-sensitive agents making unpredictable queries. Totvs combines transactional databases with a multi-layer data platform, governed data products, semantic-web ontologies, low-latency PostgreSQL services, parameterized MCP tools, OAuth-based identity propagation, and dynamic tool search. The approach is intended to improve precision, security, freshness, and token economics, although the presentation reports limited production metrics and acknowledges tradeoffs involving stale data, reduced flexibility, ontology maintenance, and the probabilistic nature of LLM responses."
link: "https://www.infoq.com/presentations/enterprise-data-architecture-ai-agents/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering-presentations"
year: 2026
seo:
  title: "Totvs: Preparing Enterprise Data Platforms for Secure, Cost-Efficient AI Agents - ZenML LLMOps Database"
  description: "Totvs, a Brazilian enterprise software provider whose systems support a substantial share of the country’s economic activity, is adapting its data architecture for production AI agents. The central challenge is that transactional systems and conventional data lakes were designed for applications, analysts, and dashboards rather than token-hungry, latency-sensitive agents making unpredictable queries. Totvs combines transactional databases with a multi-layer data platform, governed data products, semantic-web ontologies, low-latency PostgreSQL services, parameterized MCP tools, OAuth-based identity propagation, and dynamic tool search. The approach is intended to improve precision, security, freshness, and token economics, although the presentation reports limited production metrics and acknowledges tradeoffs involving stale data, reduced flexibility, ontology maintenance, and the probabilistic nature of LLM responses."
  canonical: "https://www.zenml.io/llmops-database/preparing-enterprise-data-platforms-for-secure-cost-efficient-ai-agents"
  ogTitle: "Totvs: Preparing Enterprise Data Platforms for Secure, Cost-Efficient AI Agents - ZenML LLMOps Database"
  ogDescription: "Totvs, a Brazilian enterprise software provider whose systems support a substantial share of the country’s economic activity, is adapting its data architecture for production AI agents. The central challenge is that transactional systems and conventional data lakes were designed for applications, analysts, and dashboards rather than token-hungry, latency-sensitive agents making unpredictable queries. Totvs combines transactional databases with a multi-layer data platform, governed data products, semantic-web ontologies, low-latency PostgreSQL services, parameterized MCP tools, OAuth-based identity propagation, and dynamic tool search. The approach is intended to improve precision, security, freshness, and token economics, although the presentation reports limited production metrics and acknowledges tradeoffs involving stale data, reduced flexibility, ontology maintenance, and the probabilistic nature of LLM responses."
notion:
  pageId: "3e9f8dff-2538-80c3-a5cb-f8c8bc53cde7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:19:00.000Z"
  lastEditedTime: "2026-09-28T08:19:00.000Z"
  publishedAt: "2026-09-28T08:24:15Z"
---

## Overview

Totvs is a Brazilian enterprise technology company that has operated SaaS, on-premises, and hybrid enterprise systems for approximately 40 years. Its systems include transactional applications such as ERP and CRM platforms, and the company is now building enterprise-grade AI agents that need to retrieve and sometimes update business data. The core LLMOps problem is not a lack of information but an excess of data that was designed for deterministic applications, reporting, or analytics rather than for probabilistic agents that may issue many unpredictable queries in a short period.

The proposed solution is an agent-oriented data platform that deliberately separates deterministic responsibilities from non-deterministic LLM responsibilities. Deterministic services handle data quality, business rules, authorization, stable interfaces, and transactional writes, while the LLM handles natural-language interpretation, reasoning over context, and tool selection. Totvs connects governed data products to parameterized MCP tools, adds semantic metadata through RDF and ontologies, serves data through different latency tiers, and uses dynamic tool discovery to limit the context presented to each agent. These design patterns are presented as ways to improve precision, security, and cost, but the material does not provide a comprehensive production evaluation or independently verified business outcomes.

## Problem and Architectural Principle

Totvs distinguishes between conventional deterministic computation and the non-deterministic computation introduced by LLMs. Enterprise applications often require very high precision, predictable authorization, and durable state changes, whereas an LLM can misunderstand a request, select an inappropriate tool, or produce an incorrect answer. The design principle is therefore not to replace deterministic systems with an LLM. Instead, each part of the workflow should be assigned to the computational model that best fits its requirements. The presentation frames this decision around precision, security, and cost.

This distinction is particularly important for enterprise agents. A data lake may be suitable for historical analysis but too stale or slow for a workflow requiring current account information. Conversely, a transactional database may contain the freshest data and business rules but may not be able to absorb large volumes of exploratory queries, perform historical processing, or support semantic search efficiently. The agent architecture consequently uses both sources rather than treating either the transactional system or the data platform as universally authoritative.

## Data Access and Data Products

Totvs recommends accessing transactional systems when an agent must write data, retrieve information that must be current, or invoke business rules implemented in the operational application. Writes are not routed through an analytical copy and then synchronized back to the system of record. The data platform is preferred when stale data is acceptable, when historical processing or enrichment is needed, or when semantic and vector search capabilities are required. This split introduces a freshness tradeoff: replicated data is easier to prepare for retrieval but is delayed relative to the transactional source.

The data platform follows data-mesh ideas in which business domains own and prepare their data while using shared platform capabilities. A data product is treated as a governed interface to data. It has an owner responsible for quality, a stable contract, documentation, discoverability, and quality service-level expectations. Totvs applies the same model to MCP tools: each tool is associated with a data product and inherits the need for ownership, documentation, a stable interface, and operational visibility. This is intended to prevent a large enterprise tool catalog from becoming unmanaged, while allowing teams to reuse tools across agents and domains.

Rather than exposing generic tools such as a schema reader and arbitrary query generator, the design favors business-specific retrieval tools. These tools encode domain knowledge and predefined access patterns, which can improve predictability and reduce the amount of schema and query-generation work delegated to the LLM. The tradeoff is lower flexibility: an agent can only retrieve data for which an appropriate tool has been explicitly created and authorized.

## Semantic Context and Retrieval Precision

A major challenge is semantic ambiguity. Terms such as “active customer” or “churn” may have different meanings in marketing, finance, and other domains. Humans can often resolve this ambiguity from organizational context, but an LLM needs the relevant definitions represented explicitly. Totvs proposes using Semantic Web techniques, including RDF identifiers and ontologies, to distinguish concepts that share a name and to represent relationships among concepts.

In the described example, an LLM initially classifies a purchased server as hardware based on general knowledge. When an ontology identifies that particular server concept as a subclass of a cloud service, the model changes its answer. The ontology therefore supplies domain-specific semantics that can constrain or clarify the model’s interpretation. Totvs reports that one cited 2024 study found a 40% improvement in response precision from an ontology-based semantic layer, while also noting that results depend on data formatting and domain. This is an example reported in the presentation, not an independently validated Totvs benchmark.

The architecture does not send an entire enterprise ontology with every request. An MCP tool associated with a data product can return only the semantic fragment relevant to that product. This reduces context size and limits irrelevant concepts. Domain ownership can also reduce, though not eliminate, duplication and conflicting identifiers. Ontology construction is described as easier when documentation is available and LLMs assist with generating the initial representation, but governance remains necessary because different domains may still model similar concepts differently.

## Latency-Tiered Data Platform

The platform uses different processing and serving tiers. A high-latency layer based on Apache Spark and Parquet is intended for large-scale, lower-cost batch processing. A medium-latency layer uses BigQuery for large-volume analytical workloads with potentially higher cost. A low-latency serving layer uses PostgreSQL and DuckDB for smaller, faster-access workloads and supports semantic search through vector capabilities in PostgreSQL. A unified processing interface abstracts these engines so that users can create pipelines without needing to manage every underlying implementation detail.

The low-latency requirement has two dimensions. Data must become available quickly after ingestion, and agent queries must be answered quickly once the data is prepared. Totvs describes using PostgreSQL triggers and stored procedures so that ingestion into a raw table immediately starts a transformation sequence within a transaction. Depending on the workload, this pipeline may complete in milliseconds or seconds. More complex processing can still run in Spark or other engines, after which the prepared result is made available through the low-latency serving layer.

This design uses mature database mechanisms rather than relying exclusively on newer AI infrastructure. Atomic transactional processing can help maintain consistency at the end of a transformation pipeline, while PostgreSQL provides a relatively portable and cost-conscious foundation. However, the presentation does not report service-level measurements, throughput limits, failure-recovery procedures, or comparative latency results, so the operational suitability of the design will depend on workload and implementation details.

## Security and Authorization

Totvs identifies arbitrary SQL generation as a security risk. A generic schema-inspection tool that allows an LLM to generate queries is flexible but expands the attack surface for prompt injection, unintended data access, and unsafe query behavior. The preferred pattern is to expose parameterized, predefined tools whose access logic is implemented in code rather than generated by the model. Business and row-level filtering can therefore be applied outside the prompt.

Authorization is enforced through identity propagation. The agent authenticates a user through the company identity provider, obtains an OAuth token containing the logged-in identity, and passes that identity to the MCP server and downstream tools. A tool can then filter results according to the user’s relationship to the data—for example, returning only employees managed by that user. This creates a link between the human identity, the agent invocation, and the data-access policy.

Parameterized tools reduce flexibility and do not by themselves solve every security concern. The design still requires correct tool implementation, protection of the identity-propagation path, careful OAuth configuration, auditing, and controls around tool composition. The source describes the architectural pattern but does not provide penetration-test results, incident data, or a formal comparison with alternative authorization approaches.

## MCP Fabric and Token Economics

Tool descriptions and tool responses consume context and therefore affect both latency and model cost. Totvs created an “MCP Fabric” pattern in which a single service hosts multiple virtual MCP servers, represented by different URLs, rather than requiring a separately deployed service for every MCP server. This makes it inexpensive to create many logical tool collections and avoids provisioning a dedicated deployment for tools that may rarely be used. The implementation is described as using Spring AI.

The platform applies layered tool selection. Each agent can receive a virtual MCP server containing only the subset of tools relevant to that agent. If that subset is still large, the agent initially receives a search tool rather than all tool definitions. A separate service indexes the available tool descriptions and returns a smaller candidate set—illustrated as approximately five tools from a larger catalog—using semantic search, Lucene, or regular expressions. Those selected tools are then injected into the agent’s context. This is a form of dynamic tool discovery that reduces context pollution and limits the number of irrelevant tool definitions the model must interpret.

Totvs reports a benchmark comparing dynamic tool search with placing 10, 25, 50, and 100 tools directly in context, and states that the dynamic approach saved substantial token volume. The source does not include the underlying values, experimental design, model, workload, or quality impact, so the result should be treated as directional rather than a generally established performance guarantee. Tool search also introduces another retrieval step and can fail if descriptions are incomplete or the search service selects the wrong candidates.

Tool response serialization is another cost lever. JSON is described as easy for models to interpret and suitable for nested structures, but verbose. For flat data, CSV may reduce token usage by up to 50% according to the presentation. Totvs is also experimenting with TOON, which is reported to save roughly 30% to 60% of tokens for some tabular and mixed structures. The stated concern is that TOON is newer and models may interpret it with less consistency than JSON or CSV. Any production adoption therefore requires evaluation of answer correctness, parsing reliability, and failure behavior alongside token savings.

## Results and Tradeoffs

The case demonstrates an LLMOps architecture for making enterprise data consumable by agents rather than a single model-training project. Its principal reported benefits are governed tool ownership, more explicit semantics, better separation of fresh and analytical data, lower-latency serving, stronger control over query generation, user-aware authorization, and reduced context and token overhead. The use of data products and a unified platform also provides a potential organizational model for maintaining tools as reusable production interfaces.

The principal tradeoffs are equally important. Replicated data can be stale; direct transactional access can threaten operational capacity; predefined tools limit open-ended exploration; ontologies require ongoing domain governance; dynamic tool search can select incorrectly; and compact serialization may reduce model comprehension. Most importantly, deterministic safeguards can constrain the LLM but cannot make an agent equivalent to a transactional system in precision. A production rollout should therefore evaluate retrieval correctness, authorization outcomes, tool-selection accuracy, freshness, latency, token cost, failure recovery, and user-visible answer quality by workflow. The material offers a coherent set of architectural practices and selected illustrative measurements, but it does not establish that the complete platform achieves a particular enterprise-grade accuracy or cost target across Totvs’s production workloads.
