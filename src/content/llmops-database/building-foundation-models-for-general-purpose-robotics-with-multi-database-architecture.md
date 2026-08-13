---
title: "Building Foundation Models for General Purpose Robotics with Multi-Database Architecture"
slug: "building-foundation-models-for-general-purpose-robotics-with-multi-database-architecture"
draft: false
llmopsTags:
  - "multi-modality"
  - "data-analysis"
  - "question-answering"
  - "realtime-application"
  - "agent-based"
  - "prompt-engineering"
  - "embeddings"
  - "postgresql"
  - "open-source"
  - "monitoring"
  - "databases"
  - "scalability"
industryTags: "research-academia"
company: "Physical Intelligence"
summary: "Physical Intelligence, a robotics research company, developed a foundation model for general-purpose robotics that can operate across different environments, robot embodiments, and tasks. The company faced significant data infrastructure challenges managing petabyte-scale training data, transactional operational data, and billions of rows of metadata and annotations. They implemented a hybrid database architecture using Postgres for transactional workloads and ClickHouse for analytical queries, connected via ClickPipes for automatic replication. This infrastructure enabled them to build sophisticated tools like an AI-powered data exploration dashboard that allows researchers to query their massive datasets efficiently, which was critical for validating training data composition and supporting their model development workflow. The solution eliminated previous scaling bottlenecks and reduced query times from days to near real-time."
link: "https://www.youtube.com/watch?v=4CaEBYbthFc"
year: 2026
seo:
  title: "Physical Intelligence: Building Foundation Models for General Purpose Robotics with Multi-Database Architecture - ZenML LLMOps Database"
  description: "Physical Intelligence, a robotics research company, developed a foundation model for general-purpose robotics that can operate across different environments, robot embodiments, and tasks. The company faced significant data infrastructure challenges managing petabyte-scale training data, transactional operational data, and billions of rows of metadata and annotations. They implemented a hybrid database architecture using Postgres for transactional workloads and ClickHouse for analytical queries, connected via ClickPipes for automatic replication. This infrastructure enabled them to build sophisticated tools like an AI-powered data exploration dashboard that allows researchers to query their massive datasets efficiently, which was critical for validating training data composition and supporting their model development workflow. The solution eliminated previous scaling bottlenecks and reduced query times from days to near real-time."
  canonical: "https://www.zenml.io/llmops-database/building-foundation-models-for-general-purpose-robotics-with-multi-database-architecture"
  ogTitle: "Physical Intelligence: Building Foundation Models for General Purpose Robotics with Multi-Database Architecture - ZenML LLMOps Database"
  ogDescription: "Physical Intelligence, a robotics research company, developed a foundation model for general-purpose robotics that can operate across different environments, robot embodiments, and tasks. The company faced significant data infrastructure challenges managing petabyte-scale training data, transactional operational data, and billions of rows of metadata and annotations. They implemented a hybrid database architecture using Postgres for transactional workloads and ClickHouse for analytical queries, connected via ClickPipes for automatic replication. This infrastructure enabled them to build sophisticated tools like an AI-powered data exploration dashboard that allows researchers to query their massive datasets efficiently, which was critical for validating training data composition and supporting their model development workflow. The solution eliminated previous scaling bottlenecks and reduced query times from days to near real-time."
notion:
  pageId: "3b8f8dff-2538-8053-a47d-ce6fa763d35d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:10:00.000Z"
  lastEditedTime: "2026-08-10T15:10:00.000Z"
  publishedAt: "2026-08-10T15:23:09Z"
---

## Overview

Physical Intelligence is a robotics research company focused on bringing general-purpose AI into the physical world. Their mission centers on building foundation models for robotics that can generalize across three key axes: different environments (homes, factories), different robot embodiments (single-arm, multi-arm, legged, wheeled robots), and different tasks (laundry folding, making coffee, operating appliances). The company's approach treats robotics as a data and model problem similar to large language models, training what they call a "robot brain" that can process multi-modal inputs and generate physical actions.

Their latest release, Pi-0.7, demonstrates impressive capabilities including cross-embodiment transfer (performing tasks on robot types not seen in training data), visual subgoal prompting through a world model, and language-based coaching for entirely new tasks like operating an air fryer without task-specific training data. The company operates as an open-source-first organization, publishing their models and research papers publicly.

## The Data Challenge

The core LLMOps challenge at Physical Intelligence revolves around managing fundamentally different types of data at massive scale. The company identified three distinct categories of data, each with different characteristics and requirements:

**Raw Training Data** represents the actual data consumed by the foundation model during training. This is petabyte-scale data similar to what any large language model requires. The data is append-only with heavy reliance on random reads during training (when generating random seeds for batch selection). This data requires minimal post-processing and is taken largely as-is. The primary constraint is cost, as storing petabytes of data requires economical storage solutions.

**Transactional Data** covers the day-to-day operational aspects of running the company and data collection operations. This includes managing annotations, ensuring proper queuing for labeling tasks, preventing double-labeling, and other operational workflows. This category requires ACID guarantees and strong consistency, typically involves fewer than 100 million rows, and benefits from SQL-style querying. This is classic OLTP workload material.

**Metadata and Annotations** represents a middle ground used extensively in training but with different characteristics. While not petabyte-scale in terms of storage, this category involves extremely high cardinality with 10 to 100 billion rows. Eventual consistency is acceptable for this use case. The primary access pattern involves long-running filters and group-by queries as researchers actively traverse the data to understand what has been collected, what needs annotation, and what gaps exist in the training corpus.

The company collects data from diverse sources including web scraping (how-to videos, labeled images), autonomous robot operations, human demonstrations with robots, and egocentric human data captured with head-mounted cameras. All of this flows into their vision-language-action model, which architecturally resembles an LLM augmented with a vision encoder and action decoder.

## Initial Infrastructure Problems

At the start of the year (early 2026), Physical Intelligence was operating with a single RDS Postgres database handling all workloads. This monolithic approach led to a cloud cost explosion in Q1 2026 as researchers ran increasingly ambitious queries against the same database used for operational workloads. The problems were compounded by widespread use of JSONB columns as a catch-all for new annotation types, creating essentially unstructured data within a structured database that became extremely expensive to query.

The team faced a critical incident where determining whether their dataset contained air fryer data took approximately three weeks. This required writing complex multi-table joins that ran for multiple days, searching not just for specific episodes but also for any mention of related terms with various potential spellings (air fryer, air-fryer, air_fryer). This level of data exploration was effectively impossible with their existing infrastructure, yet it was essential for making scientific claims about their model's capabilities, particularly for validating that impressive demonstrations like the air fryer task truly represented zero-shot generalization rather than memorization.

## The Solution Architecture

Physical Intelligence implemented a hybrid database architecture that separates OLTP and OLAP workloads while maintaining a unified data flow. The solution leverages Postgres for transactional workloads and ClickHouse for analytical queries, with ClickPipes providing automatic replication between them.

The timing of their migration was fortuitous. They were initially planning to migrate entirely from Postgres to ClickHouse when they discovered the Postgres-to-ClickHouse integration, which prompted them to reconsider and adopt a hybrid approach instead of a complete cutover. This architectural decision proved crucial for supporting both operational reliability and analytical flexibility.

**ClickHouse Selection Rationale**: The team chose ClickHouse for several specific technical reasons. The dominant access pattern for annotations involves fast inserts with fire-and-forget semantics, followed by queries much later in the workflow. ClickHouse's columnar storage and insert optimization made it ideal for this pattern, allowing researchers to tolerate some read latency while maintaining fast write throughput. Additionally, ClickHouse's support for sparse datasets proved valuable for handling the diverse annotation schemas they needed. By expanding their previously monolithic JSONB columns into proper columnar representations, they gained both performance and type safety. The platform's native support for materialized views provided another key benefit, allowing them to pre-compute expensive aggregations and reduce database load while accelerating common query patterns.

**Migration Process**: The migration leveraged ClickPipes for automatic replication from Postgres to ClickHouse. Despite initial skepticism about the tooling, the team found it worked out of the box without significant configuration. They de-risked the migration by copying datasets, running parallel queries, and validating results before fully committing. The compute and storage separation in ClickHouse provided additional flexibility during migration and ongoing operations.

The resulting architecture creates two distinct operational worlds running on a unified platform. Operational workloads flow into Postgres with ACID guarantees, while ClickPipes automatically replicates this data into the ClickHouse data lake for analytical processing. Annotation stores, telemetry, and other analytical data all converge in ClickHouse, creating a unified analytical layer that researchers can query without impacting production operations.

## LLMOps Applications

The most significant LLMOps application enabled by this infrastructure is a tool called Go Data, an internal data exploration platform that fundamentally changed how researchers interact with their training corpus. This tool directly addresses the critical workflow of understanding what data exists, where gaps are, and whether specific capabilities in the model might be due to data contamination.

Go Data presents both a traditional SQL interface with dropdown menus for easier query construction and, more significantly, a chat-based interface powered by an AI agent. Researchers can type natural language queries like "successful folding episodes" or "give me episodes with air fryer in it" with any spelling variations, and the agent automatically determines which tables to query (Postgres or ClickHouse), how to construct the queries, and presents the results.

The agent's decision-making about whether to query Postgres or ClickHouse depending on the query type suggests sophisticated query routing logic. The system uses full-text search indexes (multiple types depending on query characteristics) to handle the fuzzy matching required for dealing with inconsistent terminology and spelling variations in natural language descriptions of robot tasks.

The materialized views in ClickHouse play a critical role in making this tool performable. Purpose-built views for specific query patterns allow the agent to access pre-computed aggregations rather than scanning billions of rows for common research questions. This transforms queries that previously took days into near-real-time responses, fundamentally changing the research workflow.

While the team noted they couldn't share deep implementation details due to proprietary concerns, the agent architecture likely involves query understanding, table schema understanding, query construction, and result synthesis stages typical of text-to-SQL systems but adapted for the complexity of multi-database routing and extremely large-scale data.

## Operational Improvements

Beyond the headline features, several operational improvements emerged from the new architecture. The separation of read and write queries in ClickHouse prevents read-heavy analytical workloads from impacting write throughput. For batch workloads, the team implemented PG Bouncer to provide connection pooling and prevent DDoS-style connection exhaustion on the main Postgres database. The migration also provided an opportunity to adopt Atlas for managed database migrations, which proved seamless to implement.

A class of issues that plagued the previous monolithic RDS setup completely disappeared after migration, though the presentation doesn't specify exactly which issues. The implication is that query timeouts, connection exhaustion, and resource contention were significantly reduced or eliminated.

## Telemetry as a Gateway Use Case

Interestingly, telemetry actually initiated Physical Intelligence's journey with ClickHouse, predating the broader data infrastructure migration. The team needed a telemetry stack compatible with Grafana, which was already widely adopted within the organization. ClickHouse's strong performance for time-series telemetry data made it an obvious choice, and this initial success with a lower-risk workload likely built confidence for the larger migration.

The fact that a single platform could support telemetry (time-series), OLAP (analytical queries), and integrate with OLTP (via replication from Postgres) created significant operational simplification. Rather than maintaining separate stacks for observability, analytics, and operations, the team converged on a coherent architecture with clear patterns for where different workload types belong.

## LLMOps Considerations and Trade-offs

This case study illustrates several important LLMOps principles that extend beyond pure model training. First, understanding your training data is as critical as the model architecture itself, particularly for foundation models making claims about generalization capabilities. The ability to quickly answer questions like "have we seen this task before?" directly impacts the scientific validity of research claims and helps distinguish true generalization from sophisticated memorization.

Second, multi-modal foundation models create fundamentally different data infrastructure requirements than text-only LLMs. Physical Intelligence deals with video data, robot telemetry, human demonstrations, trajectory information, and various annotation types, all of which must be efficiently queryable despite different access patterns and scale characteristics. The hybrid database approach acknowledges that trying to force all these workloads into a single database architecture creates unacceptable trade-offs.

Third, the investment in data exploration tooling, particularly AI-powered interfaces for researchers, represents recognition that data work is a bottleneck in the model development lifecycle. The three-week delay to answer a simple question about data composition directly impacts research velocity and model iteration speed. By building sophisticated tooling on top of the right infrastructure, Physical Intelligence transformed this from a multi-week process to an interactive one.

The case does raise questions that aren't fully addressed. The proprietary nature of the Go Data agent means we don't know details about accuracy, handling of ambiguous queries, or how they prevent hallucination in query construction. The materialized view strategy likely requires careful curation as query patterns evolve, and there's no discussion of how they identify which views to create or maintain. The cost trade-offs of running dual databases versus the operational benefits aren't quantified.

Additionally, the presentation focuses heavily on the query side but provides limited detail about the write path, data validation, schema evolution, or how they handle the challenge of maintaining consistent semantics across Postgres and ClickHouse when schemas change. For an organization collecting diverse data types at scale, data quality and validation are typically major challenges that aren't addressed in this presentation.

## Foundation Model Development Context

The broader context of Physical Intelligence's work provides important framing for their LLMOps challenges. Foundation models in robotics represent a frontier application where the paradigm from language and vision models (collecting massive diverse data and learning general capabilities through scale) is being applied to physical world interaction. This creates unique challenges around data diversity, embodiment transfer, and safety that don't exist for purely digital models.

Their Pi-0.7 model demonstrates emergent capabilities like cross-embodiment transfer (performing tasks on robot types never seen during training) and compositional skill chaining through visual subgoals generated by a world model. These capabilities depend critically on having sufficient diverse training data and being able to validate that specific capabilities aren't simply memorizing training examples.

The company's commitment to open-source research amplifies the importance of rigorous data management, as published claims need to withstand external scrutiny. The ability to definitively answer questions about training data composition isn't just operationally convenient but scientifically necessary.

## Conclusion

Physical Intelligence's case demonstrates how LLMOps extends well beyond model training infrastructure to encompass the entire data lifecycle for foundation model development. Their hybrid architecture acknowledging the fundamental differences between operational, analytical, and raw training data workloads provides a pragmatic blueprint for organizations dealing with multi-modal data at scale. The investment in AI-powered data exploration tooling built on top of the right database foundation transformed a critical research bottleneck into an interactive capability, directly impacting their ability to iterate on model development and validate research claims about generalization.
