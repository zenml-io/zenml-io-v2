---
title: "Rebuilding a Production Search Reindexing Pipeline at Scale"
slug: "rebuilding-a-production-search-reindexing-pipeline-at-scale"
draft: false
llmopsTags:
  - "document-processing"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "latency-optimization"
  - "cost-optimization"
  - "elasticsearch"
  - "docker"
  - "kubernetes"
  - "databases"
  - "cicd"
  - "scaling"
  - "devops"
  - "orchestration"
  - "open-source"
  - "scalability"
  - "postgresql"
  - "cache"
  - "fastapi"
industryTags: "tech"
company: "Notion"
summary: "Notion's search infrastructure team rebuilt their Elasticsearch reindexing pipeline to handle the massive scale of keeping every user-created block searchable across their platform. The original system used custom ECS-based indexing that took over two weeks to complete a full rebuild, required constant manual intervention, and achieved only 90% data consistency. The team replaced it with an Apache Spark-native pipeline that uses Elasticsearch's snapshot format and native primitives, reducing full reindex time from 2+ weeks to under 2 days, catchup time from 2 days to under 1 hour, achieving 100% document consistency, eliminating external dependencies, and reducing manual intervention from weeks of engineering time to under 2 hours with zero on-call pages."
link: "https://www.notion.com/blog/rebuilding-notions-lexical-search-reindexer"
year: 2026
seo:
  title: "Notion: Rebuilding a Production Search Reindexing Pipeline at Scale - ZenML LLMOps Database"
  description: "Notion's search infrastructure team rebuilt their Elasticsearch reindexing pipeline to handle the massive scale of keeping every user-created block searchable across their platform. The original system used custom ECS-based indexing that took over two weeks to complete a full rebuild, required constant manual intervention, and achieved only 90% data consistency. The team replaced it with an Apache Spark-native pipeline that uses Elasticsearch's snapshot format and native primitives, reducing full reindex time from 2+ weeks to under 2 days, catchup time from 2 days to under 1 hour, achieving 100% document consistency, eliminating external dependencies, and reducing manual intervention from weeks of engineering time to under 2 hours with zero on-call pages."
  canonical: "https://www.zenml.io/llmops-database/rebuilding-a-production-search-reindexing-pipeline-at-scale"
  ogTitle: "Notion: Rebuilding a Production Search Reindexing Pipeline at Scale - ZenML LLMOps Database"
  ogDescription: "Notion's search infrastructure team rebuilt their Elasticsearch reindexing pipeline to handle the massive scale of keeping every user-created block searchable across their platform. The original system used custom ECS-based indexing that took over two weeks to complete a full rebuild, required constant manual intervention, and achieved only 90% data consistency. The team replaced it with an Apache Spark-native pipeline that uses Elasticsearch's snapshot format and native primitives, reducing full reindex time from 2+ weeks to under 2 days, catchup time from 2 days to under 1 hour, achieving 100% document consistency, eliminating external dependencies, and reducing manual intervention from weeks of engineering time to under 2 hours with zero on-call pages."
notion:
  pageId: "3bcf8dff-2538-802d-8aba-c3ee2b5674da"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-14T06:39:00.000Z"
  lastEditedTime: "2026-08-14T06:39:00.000Z"
  publishedAt: "2026-08-14T06:56:30Z"
---

## Overview

While this case study from Notion primarily focuses on rebuilding their lexical search infrastructure, it provides important context for understanding how search systems operate at scale in production environments that support AI-powered features. Published in August 2026, the article describes Notion's journey rebuilding their Elasticsearch reindexing pipeline—a critical foundation that enables their search capabilities, including their Custom Agents feature which relies on searchable workspace data.

The connection to LLMOps comes through several pathways. First, modern AI features like Notion's Custom Agents require reliable, consistent, and up-to-date search infrastructure to function properly. The ability to make agents "searchable across a workspace" was explicitly cited as one reason for needing to rebuild the index. Second, the engineering practices and operational discipline described—particularly around validation, versioning, data consistency, and zero-downtime deployments—mirror the challenges teams face when deploying and maintaining LLM-based systems in production. Third, the architectural decisions around moving from synchronous API-based writes to snapshot-based batch processing reflect broader patterns in how production ML/AI systems handle large-scale data operations.

## The Original System and Its Limitations

Notion's original reindexing system was built around making every block users create, edit, or delete immediately searchable. The architecture consisted of an online indexing pipeline that kept Elasticsearch updated in real-time, but periodic full rebuilds from database snapshots were necessary for several operational reasons: adding new search features (like making Custom Agents searchable), changing text analysis approaches (such as improving tokenization for non-Latin scripts), migrating to new Elasticsearch versions, or launching in new geographic regions.

The old system used Notion's data lake as its source of truth, which maintained a mirror of every block with a few hours of lag. Spark jobs would read this data and produce Apache Avro files. From there, a fleet of ECS Fargate workers running Node.js would consume these Avro files, query Snowflake for additional metadata not present in the Avro files, and write directly to Elasticsearch using its indexing API.

This architecture had several significant drawbacks that became increasingly problematic at scale. The full reindex operation took over two weeks to complete, required one to two engineers to monitor continuously, generated five to ten on-call pages per run, and achieved only approximately 90% data consistency. The Node.js workers were fundamentally ill-suited to batch processing—each worker pinned a single CPU core due to Node's single-threaded event loop, requiring horizontal scaling through more containers rather than vertical scaling with more efficient compute. Per-process memory meant every worker had to re-hydrate identical lookup state independently. Most critically, routing all writes through Elasticsearch's indexing API placed offline batch traffic on the same path as live production writes, introducing locking overhead and version-check latency.

The team recognized that code reuse alone—the ability to share TypeScript document-generation logic between online and offline indexing—wasn't sufficient justification for keeping a fundamentally batch workload off batch-processing infrastructure.

## Migration Strategy and Risk Management

Rather than attempting a complete rewrite in one step, the team adopted an incremental migration strategy with four distinct phases. This approach was driven by two key concerns. First, the document-generation logic that transforms Notion blocks into Elasticsearch documents encoded years of accumulated edge cases around per-document permission resolution, deletion semantics, and field formatting. Rewriting it all at once risked introducing silent search-quality regressions that might not surface for weeks. Second, they wanted each step to be independently verifiable with a small blast radius, recognizing that debugging a search index—which is fundamentally load-bearing infrastructure—becomes exponentially harder when multiple changes are deployed simultaneously.

This phased approach reflects production engineering best practices that are equally applicable to LLMOps scenarios where changes to model serving, feature engineering, or inference pipelines need similar careful validation and controlled rollout.

## Phase 1: Removing Snowflake as a Dependency

The first phase addressed the external dependency on Snowflake. Most Snowflake queries during reindexing weren't computing anything time-critical for document generation—they were simply retrieving relatively static metadata. The team introduced a nightly Spark job that pre-materialized flat files containing everything the ECS workers needed, storing these files in S3. Workers could then read from S3 instead of issuing live Snowflake queries.

This change had multiple benefits. Indexing throughput became independent of Snowflake warehouse availability, eliminating resource contention with Notion's data team. More importantly, removing the live external dependency meant document generation could potentially move to any runtime environment—it was no longer tightly coupled to a system with network access to Snowflake.

## Phase 2: Snapshots Instead of Live Writes

The second phase tackled the fundamental throughput ceiling. Direct writes to Elasticsearch through the indexing API plateaued around 200,000 documents per second. The team shifted from writing individual documents to producing Elasticsearch's native snapshot format—a self-contained, restore-ready representation of an index on disk.

This format consists of a per-index directory structure with one subdirectory per shard, manifest files, and a tree of Lucene segment files. By producing these files offline, they could bypass the live-write path entirely and use Elasticsearch's native snapshot and restore APIs to bootstrap the cluster atomically.

Implementing this required two new Spark jobs. The first, a shard partitioner, repartitions the document stream so each Spark partition corresponds to exactly one Elasticsearch (index, shard) pair. This job wraps the exact routing logic the live cluster uses, including both application-level index assignment (which workspace's blocks belong in which physical index) and Elasticsearch's own shard ID hashing. Documents emerge from this stage partitioned identically to where they would land via direct writes.

The second job, a snapshot writer, is where the actual snapshot files are created. Each Spark task spins up an embedded Elasticsearch node inside its JVM, configured with the real index's mappings and settings, and issues actual IndexRequests against it. The routing key (spaceId), external-version semantics (version_type: external, sourced from a pipeline docVersion), and _source handling all match the live pipeline exactly. When a task completes, the embedded node snapshots itself to local disk. A Hadoop OutputCommitter then uploads the resulting manifests and Lucene segment files to S3 in parallel, with a small manifest tracking each file's local source path, destination within the snapshot repository, and size.

The team encountered significant technical challenges during implementation. Initially, they attempted to pack multiple snapshot tasks onto the same executor, but discovered that each embedded Elasticsearch node writing to executor-local disk would compete for the same EBS volume and exhaust it. Even a single shard's snapshot bytes are substantial; two simultaneous tasks on one executor would run out of space. The fix involved using `.coalesce(1, shuffle = false)` when reading each pre-partitioned shard file to collapse it into a single Spark task, combined with sizing executors for one task each. This shifted parallelism from within shards to across shards, with the largest shard setting the wall-clock floor.

Even with one task per executor, EBS proved both too small and too slow. Some shards exceeded the provisioned EBS volume capacity, causing tasks to fail partway through. Additionally, embedded Elasticsearch performs many sequential writes during snapshot creation, and EBS sequential-write throughput became a bottleneck—they were paying for compute that spent most of its time waiting on disk I/O. Moving to instance-store NVMe executors solved both problems, making the largest shards completable and providing meaningfully higher throughput. The team implemented cleanup of local snapshot files on upload failure to prevent S3 throttling events from cascading into disk exhaustion and job failure.

The result was a self-contained snapshot in S3 that Elasticsearch could restore in hours instead of weeks of continuous writing. Because the artifact is just files, atomic deployments and trivial rollbacks became possible—if a new snapshot regressed search quality, they could simply restore from the previous day.

This phase kept the highest-risk document-generation code in TypeScript on ECS unchanged. The ECS workers simply switched from writing to Elasticsearch to writing JSONL to S3, which the Spark jobs consumed. The migration to snapshot-based loading was proven out before touching the next architectural layer.

## Phase 3: Moving Document Generation to Spark

With the snapshot pipeline validated, the team eliminated ECS entirely by porting document-generation logic from TypeScript on Node.js to Scala on Spark. The operational burden of ECS had become untenable—workers crashed with out-of-memory errors, network failures caused partial writes, and every reindex run began with manual calculation of memory budgets.

The new Spark job consolidated everything the ECS workers did: reading Avro output, loading precomputed caches, resolving per-document permissions, and formatting Elasticsearch documents. Instead of writing to Elasticsearch, it emitted JSONL that fed into the existing shard partitioner.

Some functionality didn't translate trivially between runtimes. Language detection, for example, had used a Node binding for CLD2 (Google's Compact Language Detector), which had no equivalent JVM binding. The team compiled CLD2 from source as a Linux shared library, packaged it as a tarball, shipped it to S3, and had each Spark task load it at startup. The Scala job ultimately called the same underlying C++ library, ensuring byte-for-byte identical language detection output that validators could verify.

This phase carried the highest risk because document generation bridges Notion's internal block model and the format Elasticsearch indexes. Subtle behavioral changes could manifest as search-quality regressions weeks later when users discovered they couldn't find their pages.

The team implemented extensive offline validation using two Spark jobs that ran in CI for every code change. An aggregate validator compared Spark output against existing TypeScript output at the document-count and type-distribution level, answering: "Are we producing the right number of documents of the right types?" A field-level validator performed stratified sampling of documents by block type (ensuring rare types like workflow and form always received coverage) and compared every field value-by-value, asking: "For documents that exist in both pipelines, are the field values identical?"

These validation jobs ran against sampled production data at every development checkpoint. By deployment, the team had quantified field-level parity between implementations down to a handful of acceptable differences, primarily around deterministic ordering of arrays.

After shipping, Spark handled memory management and worker coordination automatically, Airflow handled orchestration, JVM throughput on Avro processing exceeded Node.js performance, and every engineer at Notion could debug reindexing runs using standard Spark tooling.

## Phase 4: Eliminating Catchup with Elasticsearch Primitives

The final phase addressed the separate ECS pipeline that consumed Kafka changes after snapshot completion to reconcile edits that occurred during the multi-day build. This pipeline suffered the same problems as the original: OOMs, worker coordination complexity, and roughly two days to execute.

The team replaced it with native Elasticsearch primitives using a clever approach that collects changes as they happen rather than reconciling afterward. The process works as follows: they spin up the new Elasticsearch cluster early and pre-create temporary tmp-* indices, then point write aliases at these temp indices so live writes from the online indexing pipeline also land in the new cluster. The snapshot build proceeds in parallel, with Spark producing snapshot files from the data lake as before. The snapshot gets restored into the new cluster as snap-* indices alongside the live tmp-* indices. The restored indices must be separate because Elasticsearch can't accept live writes into an index during restoration—the tmp-* indices remain open for online indexing while snap-* indices come online behind them.

Once restoration completes, they atomically move write aliases from tmp-* to snap-*, so new live writes land in the restored indices. Then they run _reindex from each tmp-* index into its corresponding snap-* index using version_type: external and conflicts: proceed.

This versioning detail makes the operation both safe and retryable. The restored snap-* indices contain the baseline from the snapshot. The tmp-* indices contain the live-write history accumulated during snapshot building and restoration. Reindexing tmp into snap fills the gap: if a document in tmp is newer than the restored copy, Elasticsearch applies it; if a newer live write already landed in snap after the alias swap, _reindex hits a version conflict and preserves the newer document.

There's one caveat: _reindex only copies documents into the destination index and doesn't automatically reconcile records that moved between the alive and deleted index families. If a block moved from alive to deleted during the catchup window, the newer deleted copy can exist in snap-deleted-* while an older alive copy remains in snap-alive-*. The team handles this with a separate phantom-detection step that compares versions across alive/deleted pairs and, when enabled, explicitly cleans stale opposite-side copies.

The key invariant is that freshness derives from document versions, not from assuming snapshot and reindex windows are perfectly disjoint—a design principle that ensures correctness even when timing assumptions are violated.

## Results and Impact

The quantitative improvements are substantial. Full reindex time dropped from over two weeks to under two days. Catchup time fell from approximately two days to under one hour. Data consistency improved from approximately 90% to 100%. Manual intervention per run decreased from one to two engineers over two weeks to under two hours total. On-call pages per run went from five to ten down to zero. External dependencies during indexing (Snowflake, ECS) were eliminated entirely. The number of indexing pipelines to maintain decreased from two (Spark + ECS for initial indexing, separate ECS for catchup) to one unified Spark + Airflow pipeline.

Beyond the metrics, the cultural impact is significant. Adding a new searchable field previously required a month-long project; it's now something the search team ships in days by writing the Scala transformation, running validation jobs, and letting the next nightly run incorporate it. The team's goal is to democratize this capability to any backend engineer at Notion.

## LLMOps Relevance and Broader Lessons

While this case study focuses on traditional search infrastructure rather than LLM serving directly, it offers several lessons highly relevant to LLMOps practitioners. The engineering discipline around validation—running aggregate and field-level validators against production data at every checkpoint—mirrors the evaluation rigor required when updating embedding models, prompt templates, or RAG retrieval logic. The phased migration strategy with independent verification at each step reflects how teams should approach updating production LLM systems where silent quality regressions can be difficult to detect.

The shift from synchronous API writes to snapshot-based batch processing has parallels in LLMOps scenarios involving embedding generation or vector index construction, where batch processing large document corpora efficiently is often preferable to incremental online updates. The use of versioning and conflict resolution (version_type: external, conflicts: proceed) to ensure correctness when multiple update streams converge is directly applicable to scenarios where online and offline processes both update model artifacts or knowledge bases.

The operational transformation—from a system requiring constant engineer monitoring and generating numerous pages to one requiring minimal intervention and zero pages—demonstrates the value of choosing appropriate infrastructure for workload characteristics. In LLMOps contexts, this might translate to using purpose-built model serving infrastructure rather than trying to serve models through general-purpose application servers.

The team's explicit mention that this infrastructure now enables "searchable Custom Agents" indicates these improvements directly support Notion's AI features. The reliability, consistency, and speed improvements to the underlying search infrastructure create a more solid foundation for LLM-powered features that depend on retrieving and searching across workspace content.

## Future Directions

The new pipeline unblocks previously impossible work. The team is already using it to land searchable Custom Agents, RTL (right-to-left) tokenizers, and other previously-blocked fields, as well as healing the long tail of legacy "unmatched" blocks the old pipeline silently dropped.

Longer-term plans treat the snapshot-based architecture as a foundation rather than a destination. The roadmap includes time-based indices for write-optimizing hot data, federated indexing, and per-language analyzers now that each document's language is known during indexing—all capabilities that would have been extremely difficult to implement with the old architecture.

The case study demonstrates how infrastructure investments in reliability, consistency, and operational simplicity create compounding returns by enabling feature velocity and reducing operational burden. For teams building production LLM systems, the principles of incremental migration, extensive validation, appropriate technology selection for workload characteristics, and operational excellence apply directly to challenges around model serving, embedding generation, vector search, and knowledge base maintenance.
