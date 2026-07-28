---
title: "Provenance and Lineage Tracking in LLM-Powered Agent Memory Systems"
slug: "provenance-and-lineage-tracking-in-llm-powered-agent-memory-systems"
draft: false
llmopsTags:
  - "healthcare"
  - "regulatory-compliance"
  - "memory"
  - "agent-based"
  - "multi-agent-systems"
  - "semantic-search"
  - "vector-search"
  - "prompt-engineering"
  - "error-handling"
  - "open-source"
  - "documentation"
  - "compliance"
  - "guardrails"
industryTags: "tech"
company: "Zep AI"
summary: "Zep AI addresses the challenge of provenance tracking in LLM-based agent memory systems, where non-deterministic synthesis of facts from multiple sources destroys the paper trail of how outputs originated. The company developed Graffiti, an open-source temporal graph framework, and Zep, an enterprise agent memory infrastructure built on Graffiti, to model lineage as graph relationships between facts and their sources. Their solution enables compliance, veracity verification, debugging, and selective deletion by maintaining explicit connections between derived artifacts and source data, even as the knowledge graph evolves through entity merging, fact mutation, and data invalidation. This architecture is particularly critical for healthcare and other regulated industries where understanding fact provenance can have life-or-death implications."
link: "https://www.youtube.com/watch?v=H7puB0RwJMM"
year: 2026
seo:
  title: "Zep AI: Provenance and Lineage Tracking in LLM-Powered Agent Memory Systems - ZenML LLMOps Database"
  description: "Zep AI addresses the challenge of provenance tracking in LLM-based agent memory systems, where non-deterministic synthesis of facts from multiple sources destroys the paper trail of how outputs originated. The company developed Graffiti, an open-source temporal graph framework, and Zep, an enterprise agent memory infrastructure built on Graffiti, to model lineage as graph relationships between facts and their sources. Their solution enables compliance, veracity verification, debugging, and selective deletion by maintaining explicit connections between derived artifacts and source data, even as the knowledge graph evolves through entity merging, fact mutation, and data invalidation. This architecture is particularly critical for healthcare and other regulated industries where understanding fact provenance can have life-or-death implications."
  canonical: "https://www.zenml.io/llmops-database/provenance-and-lineage-tracking-in-llm-powered-agent-memory-systems"
  ogTitle: "Zep AI: Provenance and Lineage Tracking in LLM-Powered Agent Memory Systems - ZenML LLMOps Database"
  ogDescription: "Zep AI addresses the challenge of provenance tracking in LLM-based agent memory systems, where non-deterministic synthesis of facts from multiple sources destroys the paper trail of how outputs originated. The company developed Graffiti, an open-source temporal graph framework, and Zep, an enterprise agent memory infrastructure built on Graffiti, to model lineage as graph relationships between facts and their sources. Their solution enables compliance, veracity verification, debugging, and selective deletion by maintaining explicit connections between derived artifacts and source data, even as the knowledge graph evolves through entity merging, fact mutation, and data invalidation. This architecture is particularly critical for healthcare and other regulated industries where understanding fact provenance can have life-or-death implications."
notion:
  pageId: "3aaf8dff-2538-800a-9125-cfdde2fa5433"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T11:54:00.000Z"
  lastEditedTime: "2026-07-27T11:54:00.000Z"
  publishedAt: "2026-07-27T12:07:19Z"
---

## Overview

Zep AI has developed a sophisticated approach to one of the most challenging problems in production LLM systems: provenance tracking in agent memory infrastructure. The company created Graffiti, an open-source temporal graph framework, and Zep, their enterprise agent memory solution built on top of Graffiti. The core problem they address stems from the non-deterministic nature of LLMs, which synthesize and interpret data from multiple sources to generate summaries, extracted facts, and structured records. This synthesis process inherently destroys the paper trail of how outputs were originated, creating significant challenges for legal compliance, debugging, trust evaluation, and data management.

The use case is particularly relevant for agent applications that derive context from multiple user touchpoints including chat interactions, voice transcripts, email, and business data. Their customers have consistently struggled with fundamental questions about provenance: Where did this fact come from? What is the veracity of this fact? These questions become critical in regulated industries like healthcare, where the company provides a compelling example of a potential failure mode involving patient allergy information.

## The Core Problem and Its Complexity

The presentation illustrates the challenge through a healthcare scenario where an agent retrieves context stating that a patient has a penicillin allergy. This fact was synthesized from three distinct sources: a lengthy electronic health record, a PDF lab report, and text the patient entered into an AI intake chat. If the agent presents this fact to a doctor without clearly indicating that one source came from the patient themselves rather than verified clinical records, it could mislead medical decision-making.

While storing a simple source ID on each fact might seem like an obvious solution, and indeed works well in structured data warehouses where pipeline outputs are copied or mutated deterministically, this approach breaks down fundamentally with LLM-driven context pipelines. The breakdown occurs in several ways: an LLM is prompted with multiple sources simultaneously, many facts are each synthesized from one or more of those sources, entities are merged during processing, facts are derived from disparate locations, and new data continuously invalidates old facts. The underlying store keeps changing, making append-only logs difficult to manage at scale due to the volume of changes. Lineage therefore needs to be an evolving set that survives mutation.

## The Graph-Based Solution Architecture

Zep's solution models provenance as a knowledge graph where sets of links between facts and their sources are represented as relationships. In their architecture, source data exists as episodes, which are nodes in the temporal graph. Entities are extracted from episodes, and edges connect entities. A graph triple consisting of two entities and an edge can be hydrated as a fact. For example, the patient entity, the penicillin entity, and the edge between them together represent the fact that the patient has a penicillin allergy.

Tracing a fact to its source becomes a straightforward graph traversal operation. However, the real engineering challenge lies in keeping these relationships correct as the graph evolves. When two entities merge, the merged entity must retain all source links from both original entities to avoid silently dropping sources and losing lineage. When new data contradicts existing data, this lineage must also be captured. Graffiti handles this by adding invalid dates to mutated edges and noting which source episodes resulted in the edge mutation.

## Metadata Projection and Veracity Tagging

Beyond basic lineage tracking, Graffiti supports metadata projection to model classifications that span many episodes and facts derived from them. In the healthcare scenario, episodes originating from an electronic health record are tagged with an EHR tag at ingestion. All subsequent entities and facts derived from that episode inherit the tag. This enables agents to filter for facts from verified clinical sources by simply filtering for the appropriate tag during graph traversal. One tagging action at ingestion thus supports ongoing evaluation of fact veracity.

The system becomes more nuanced when facts have three or more parent sources with varying verification status. The presentation illustrates this with two scenarios: an allergy flag where missing the fact from any verified source could be deadly, versus a consent-on-file scenario where operating on unverified consent is the critical mistake. These structurally similar facts with three parent episodes require opposite policies. Graffiti exposes which episodes have particular tags, but deliberately leaves the application of business rules to the agent layer rather than baking policies into the graph structure itself, recognizing that these decisions are situational and domain-specific.

## Data Deletion and Compliance

Privacy compliance and data retention policies create another challenging scenario for provenance tracking. When source data must be deleted due to retention policies or right-to-be-forgotten requests, the system needs to understand which derived facts should also be deleted. Graffiti's lineage model makes this tractable by explicitly mapping which facts are derived from which source data.

The framework applies a rule: a fact is only deleted if no remaining episodes support it. In an example where intake chat data must be deleted, an allergy fact that was derived from three sources including the intake chat survives deletion because two parent episodes still support it. However, a contact preference fact derived solely from the deleted source data is removed. This granular approach to cascading deletion would be nearly impossible to implement correctly without explicit lineage tracking in the data structure itself.

## Production Pipeline Architecture

The ingestion pipeline when adding episodes to Graffiti is complex and represents significant production engineering. When an episode is added, a structured extraction process runs that extracts entities, relationships between them, and candidate facts. Facts are structured as subject-predicate-object triples. Following extraction, a deduplication and deconfliction process runs to deduplicate entities and deconflict facts against existing graph contents.

The system handles temporal fact mutation through this deconfliction process. For example, if the graph contains a fact that Daniel loves Adidas shoes, and three months later new data indicates Daniel returned the shoes and was unhappy, the system must invalidate the original positive sentiment fact and create new facts reflecting the return and negative sentiment. This temporal reasoning is core to maintaining accurate agent memory over time.

Notably, while Zep uses LLMs for extraction, the team has deliberately chosen not to rely solely on LLMs throughout the pipeline. Where traditional information retrieval techniques, traditional NLP approaches, entropy analysis, simhash, and other deterministic methods can be applied for deduplication and other tasks, they use those instead. This design choice optimizes for cost, speed, and determinism compared to an all-LLM approach. The extraction process has been optimized to a single-shot extraction that extracts entities, relationships, and facts together, making it more cost-effective. A reflection step ensures extracted information is accurate and enriches lineage with information about why changes occurred, not just that they are related.

## Cost and Performance Considerations

The presentation acknowledges that lineage and provenance tracking is expensive, and graph construction in the manner Graffiti performs it is particularly costly. The team has invested significant effort into reducing both cost and latency of generating graph artifacts, though the specific optimizations were not detailed in the main presentation. This represents an important tradeoff in production LLM systems: the value of provenance and compliance capabilities must be weighed against the additional computational and financial costs.

## Search and Agent Integration

Graffiti provides multiple search modalities for agents to interact with the graph. Agents can perform vector similarity search against textual artifacts, full-text search, and graph relational operations like breadth-first search. The specific capabilities depend on the underlying graph database used. From anywhere an agent lands in the graph through search, it can then understand the provenance of that particular artifact. Some provenance capabilities, particularly around tracking weight changes and relevancy across many edges, are implemented in Zep using separate data structures outside the core graph when that approach is more efficient.

## Multi-Agent and Multi-User Scalability

The architecture is explicitly designed for multi-agent, multi-user, and multi-source scenarios. The presentation contrasts this with file-based memory approaches that have become popular, including markdown-based systems, wikis, and knowledge bases. While acknowledging these work well for desktop usage and single-user, single-agent scenarios, the Zep team argues they break down at enterprise scale, particularly for provenance tracking. When mutating lines in a file, understanding the lineage or provenance of why changes occurred becomes very difficult without the explicit graph structure that Graffiti provides.

## Benefits and Tradeoffs

The primary benefits of the Graffiti approach include compliance capabilities that satisfy legal and regulatory requirements, veracity verification that helps determine which facts to trust based on their sources, debugging support to understand how facts were generated, and intelligent deletion policies that preserve valid derived facts while removing those solely dependent on deleted source data.

However, these benefits come with real engineering costs. The graph construction and maintenance overhead is significant, requiring optimization work to make the system practical. The complexity of managing temporal mutations, entity merging, and multi-source synthesis in a graph structure is considerably higher than simpler append-only or file-based approaches. For use cases that do not require strict provenance tracking or compliance guarantees, simpler memory architectures may be more appropriate.

The presentation represents a balanced view of production LLM challenges, explicitly acknowledging that the sophisticated approach Zep has built addresses specific enterprise and regulated-industry requirements rather than claiming universal superiority. The decision to open-source Graffiti suggests confidence in the technical approach and potentially a strategy to build ecosystem adoption while monetizing the enterprise Zep layer that provides additional capabilities and support. Overall, this case study illustrates how production LLM systems in regulated domains must go significantly beyond basic retrieval-augmented generation to provide the transparency and accountability that enterprise customers require.
