---
title: "Petabyte-Scale Data Infrastructure for Constitutional AI with Purpose-Built Security and Retention"
slug: "petabyte-scale-data-infrastructure-for-constitutional-ai-with-purpose-built-security-and-retention"
draft: false
llmopsTags:
  - "chatbot"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "databases"
  - "monitoring"
  - "scalability"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "documentation"
  - "open-source"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic built a sophisticated data infrastructure to store every interaction with Claude, their flagship large language model, at massive scale while ensuring cryptographic security and differentiated retention policies. The system handles tens of billions of rows and hundreds of petabytes of data, storing uniquely sensitive user conversations including personal financial information, health data, and business secrets. Using Google Cloud Bigtable as the foundation, Anthropic implemented a multi-layered encryption hierarchy with cell-level timestamps for automatic access revocation, purpose-based access control that enforces different retention periods for different use cases, and systematic scanning infrastructure for cleanup and migrations. The architecture enables their lean team to operate at this scale efficiently while maintaining mathematical guarantees that expired data cannot be accessed, pushing security enforcement down to the storage layer rather than relying solely on application code."
link: "https://youtu.be/UaI1ABXQ4-M"
year: 2026
seo:
  title: "Anthropic: Petabyte-Scale Data Infrastructure for Constitutional AI with Purpose-Built Security and Retention - ZenML LLMOps Database"
  description: "Anthropic built a sophisticated data infrastructure to store every interaction with Claude, their flagship large language model, at massive scale while ensuring cryptographic security and differentiated retention policies. The system handles tens of billions of rows and hundreds of petabytes of data, storing uniquely sensitive user conversations including personal financial information, health data, and business secrets. Using Google Cloud Bigtable as the foundation, Anthropic implemented a multi-layered encryption hierarchy with cell-level timestamps for automatic access revocation, purpose-based access control that enforces different retention periods for different use cases, and systematic scanning infrastructure for cleanup and migrations. The architecture enables their lean team to operate at this scale efficiently while maintaining mathematical guarantees that expired data cannot be accessed, pushing security enforcement down to the storage layer rather than relying solely on application code."
  canonical: "https://www.zenml.io/llmops-database/petabyte-scale-data-infrastructure-for-constitutional-ai-with-purpose-built-security-and-retention"
  ogTitle: "Anthropic: Petabyte-Scale Data Infrastructure for Constitutional AI with Purpose-Built Security and Retention - ZenML LLMOps Database"
  ogDescription: "Anthropic built a sophisticated data infrastructure to store every interaction with Claude, their flagship large language model, at massive scale while ensuring cryptographic security and differentiated retention policies. The system handles tens of billions of rows and hundreds of petabytes of data, storing uniquely sensitive user conversations including personal financial information, health data, and business secrets. Using Google Cloud Bigtable as the foundation, Anthropic implemented a multi-layered encryption hierarchy with cell-level timestamps for automatic access revocation, purpose-based access control that enforces different retention periods for different use cases, and systematic scanning infrastructure for cleanup and migrations. The architecture enables their lean team to operate at this scale efficiently while maintaining mathematical guarantees that expired data cannot be accessed, pushing security enforcement down to the storage layer rather than relying solely on application code."
notion:
  pageId: "398f8dff-2538-8061-abd7-f30cc34e892f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T12:35:00.000Z"
  lastEditedTime: "2026-07-09T15:19:00.000Z"
  publishedAt: "2026-07-09T15:23:21Z"
---

## Overview

Anthropic, an AI safety company, has built a comprehensive production infrastructure to support Claude, their frontier large language model family that powers consumer products, developer APIs, and code generation tools. Every prompt, completion, and conversation with Claude flows through a purpose-built data system that must balance conflicting requirements: protecting uniquely sensitive user data from external threats and internal misuse while retaining subsets of conversations for legitimate purposes like safety research, compliance, and improving AI systems. The case study reveals the technical architecture behind storing hundreds of petabytes of production LLM interaction data with cryptographic security guarantees and differentiated retention policies.

The scale is substantial. According to metrics shared from a few weeks before the presentation, the system handles tens of billions of rows of data with write throughput measured in gigabytes per second. Users share deeply personal information with Claude, including financial data, health information, and company confidential intellectual property. This necessitates protection not just from external attackers but also from potential internal misuse, creating requirements that don't fit neatly into any off-the-shelf solution. Anthropic needed cryptographic access controls rather than simple access control lists, automatic retention that application bugs cannot bypass, high write throughput for real-time inference, and all of this at cost-efficient petabyte scale.

## Core Architecture and Technology Stack

The foundation of this infrastructure is Google Cloud Bigtable, a NoSQL database that has powered some of Google's largest services for years, including ad serving and YouTube recommendations. Bigtable was selected for several key capabilities that proved essential for this use case. First, cell-level timestamps provide the ability for each individual cell to have its own time-to-live, which became central to the key expiration model. Second, the system offers massive scale without operational overhead, with autoscaling that provides tangible cost savings for workloads with diurnal patterns. Third, row-level consistency enables the atomic operations necessary for key management. Fourth, the team saw the trajectory of Bigtable feature development aligning with their evolving needs.

The architecture consists of two main Bigtable tables. The data table stores the actual content along with individual row-level encryption keys. Each row contains the compressed and encrypted prompt and completion pairs, with content stored using the current timestamp but keys future-dated to expire based on retention policies. The keys table stores rotating encryption keys that change daily. These rotating keys encrypt the row-level keys stored in the data table, creating a hierarchical encryption model. Notably, the two tables have very different characteristics: one requires extremely high write volumes for ingestion, while the other has daily writes but thousands of reads per day. Bigtable scales effortlessly across both patterns.

The ingestion pipeline works as follows: Claude's inference team writes prompt and completion pairs through an ingestion service, which compresses content using zstandard compression and then encrypts it with a unique key per item. For tens of billions of rows, each record gets its own unique encryption key. This data is then written to Bigtable along with purpose-specific access keys that enable differentiated retention.

## Encryption Hierarchy and Access Control

The encryption model represents a sophisticated approach to data security that pushes guarantees down to the storage layer. Rather than storing the content encryption key directly alongside the row, which would be vulnerable if someone gained access, Anthropic derives multiple keys based on different business purposes. These re-encrypted keys are what actually get stored alongside the content. Each purpose, such as trust and safety review, research, or customer service, has its own derived key with its own expiration timestamp.

The encryption hierarchy has multiple layers. At the bottom are the content keys unique to each row. These are never stored directly. Instead, purpose-derived keys are stored in the data table, each with cell-level timestamps set to their expiration dates. These purpose keys are themselves encrypted using daily rotating encryption keys stored in the separate keys table. Those daily encryption keys are encrypted ciphertext with the root key stored in Cloud KMS backed by a CloudHSM. This solves the chicken-and-egg problem of key storage by rooting trust in a hardened key management service that financial institutions also rely upon.

This might seem computationally expensive, but modern CPUs with hardware acceleration for cryptographic operations make the overhead negligible. More importantly, this model enables powerful capabilities for security and compliance.

## Purpose-Based Access Control and Automatic Expiration

Rather than traditional role-based access control that asks only who you are, Anthropic's system implements purpose-based access control that also asks what you're trying to do and why. This is critical because their terms of service prohibit using customer data for certain business purposes, and they cannot allow data to leak across departments. A trust and safety reviewer uses a different key than a researcher, and these keys have different expiration times for the same underlying data.

Bigtable's cell-level timestamps become incredibly powerful in this context. Each access key is a cell with its timestamp set to its expiration date. When Bigtable runs garbage collection, expired cells are automatically removed at the storage layer. No key means no decryption, so access revocation happens automatically through the database's native garbage collection rather than requiring complex application logic. While garbage collection is asynchronous, the application enforces timestamp range filters on reads to exclude cells that have expired but not yet been garbage collected.

The implications are profound. When the last access key expires for a row, all content becomes permanently undecryptable. Even though the encrypted content remains in storage, it is effectively gone because the mathematical key material no longer exists. This pushes security guarantees as deep as possible into the software stack. Cryptographic enforcement cannot be bypassed, whereas application-level code could potentially have bugs or be circumvented.

Auditing becomes straightforward with this model. The team simply emits an audit log whenever a decryption operation occurs. This makes code reviews easy without introducing new security vulnerabilities that might create unaudited access to user data. The simple invariant enables moving fast while keeping user data secure.

## Row Key Design and Hotspotting

Bigtable stores data sorted by row key and splits it into tablet servers, which act as horizontal partitions on different servers. Choosing row keys correctly is essential to unlock Bigtable's performance potential. The initial approach used content IDs that started with common prefixes, which created low-key hotspotting. When row keys cluster together, all writes hit the same tablet while others sit idle. Although Bigtable automatically splits data into smaller tablets as it grows and detects hot tablet servers to split them further, when all keys share a prefix, they land in the same key range and no amount of splitting can fix the problem.

The solution was simple but required early implementation: reverse the content IDs. Since the content IDs have high entropy toward the end, reversing them places the randomness at the start, which is exactly where Bigtable needs it. Because the system primarily does point lookups rather than range scans, this costs nothing in functionality. An alternative would be hash prefixes, which guarantee uniform distribution across the key space regardless of underlying ID patterns and which Bigtable excels at automatically splitting. The key lesson is to make this choice early, as migrating row keys across petabytes of long-lived data is a project teams want to avoid.

## Handling Large Values and Multi-Modal Content

As Claude handles multi-modal inputs including images, documents, and increasingly longer context windows, the system regularly needs to store blobs beyond Bigtable's practical size limits for individual cells. The team built a blob storage layer where small blobs under four megabytes are stored inline with the parent row, while larger blobs are split into four-megabyte chunks. Each chunk is independently compressed and encrypted and stored in a separate blob table, with the parent row holding only metadata that acts as a pointer.

However, this adds complexity. For many use cases, if single-digit millisecond retrieval is not required, storing a pointer to Google Cloud Storage in Bigtable and retrieving objects on demand is simpler to build and operate. Anthropic needed inline storage for their specific latency requirements, but the GCS pointer approach is often the right choice for other scenarios.

## Large-Scale Migrations and Systematic Scanning

Any production system that operates long enough accumulates schema drift and requires migrations. At Anthropic's scale, mutations themselves are cheap single-row operations. The hard part is finding the rows that need operation. Bigtable's data model is optimized for key-value access: give a row key, get a row back. There is no equivalent of updating rows where a condition matches, and there are no secondary indexes. If the condition isn't encoded in the row key, the only way to find matching rows is to scan the entire key space, evaluating conditions row by row and issuing mutations one at a time. At roughly 200 petabytes, a naive full table scan could take weeks or months of compute while hitting the production cluster.

What Anthropic really needed was scanning infrastructure that is systematic, restartable if workers die, and gentle on production traffic. This is exactly the same infrastructure needed for one of their most frequent operations: deleting rows when all access keys have expired. Content remains after keys expire because Bigtable has no way to automatically delete an entire row when a column family becomes empty. The encrypted content is permanently undecryptable but still incurs storage costs across tens of billions of rows.

The team developed a systematic scanning approach that evolved significantly. The first implementation used random prefix scanning, where each worker picks a random prefix, scans that range for orphan rows, then picks another. This is simple and stateless with zero coordination, but it suffers from the classic coupon collector problem. Random sampling needs roughly n log n draws to hit every prefix, and the tail is brutal. The last few prefixes can take as long as the first 90 percent. With thousands of workers scanning randomly, full keyspace coverage could take 1.6 years.

The solution introduces a deterministic multiplicative permutation. The system takes the full space of prefixes, multiplies each index by a large prime, and takes the modulo of the space size. This creates a permutation that visits every prefix exactly once in an order that is spatially spread out, so consecutive workers aren't hammering adjacent tablet servers. Every worker walks the same permutation but starts from a different offset based on the hash of its hostname. This achieves zero coordination and zero shared state while naturally partitioning the keyspace across the worker fleet. The result was a roughly 17x speedup, reducing the time from 1.6 years to 35 days with simpler code.

Row cleanup itself can be thought of as a continuously running migration. Finding orphan rows, removing deprecated columns, and backfilling new fields are all the same problem: scan, filter, and mutate at petabyte scale. Building systematic scanning infrastructure once allows every migration to ride on top of it.

## Bigtable SQL and Materialized Views

The challenge of finding orphan rows highlights why Google introduced Bigtable SQL. Bigtable SQL uses the same SQL dialect as Spanner and BigQuery, giving expanded functionality without requiring application developers to pull down keys and manipulate them in the application layer. SQL functions can be pushed to Bigtable, whether simple string parsing or sophisticated vector searches.

The SQL dialect has been extended for functionality that interacts well with the NoSQL model. For example, querying with history enabled gives access to everything in the timestamped history. Point-in-time lookups can retrieve all values between specific times, returning bundles of cell values. Functions like unpack can take the nested Bigtable model and flatten it into a more traditional one-timestamp-per-row model suitable for analytics.

For finding orphan rows, Bigtable SQL makes the query elegant. The team queries the key column family with a temporal filter so that any access keys whose timestamp has passed are filtered out. The is_empty function returns true when nothing is left, indicating that every access key has expired and the row is safe for deletion. The challenge isn't writing this query but running it across the entire key space.

Continuous materialized views, now generally available, represent a significant advancement. These incrementally update each row of data as it comes in rather than requiring full table scans. They automatically scale globally, providing eventually consistent copies across regions, and are fully managed within the Bigtable environment with autoscaling integration. Common use cases include real-time dashboards calculating store-level inventory, vehicle telemetry data for identifying outliers, and asynchronous secondary indexes for applications with multiple query patterns such as lookups by email versus user ID.

For Anthropic, continuous materialized views promise a step change in how they operate the system. Instead of scanning tens of billions of rows looking for rows ready for deletion, Bigtable maintains this view incrementally. The scan disappears, and the migration becomes a read of a pre-filtered index.

## Storage Optimization and Tiered Storage

At roughly 170 petabytes, even small per-gigabyte savings translate to significant costs. Analysis of access patterns revealed a key insight: rows are read intensively right at ingestion, but access decays exponentially. By day seven, most rows are essentially cold. They are retained for compliance reasons and remain decryptable if needed, but almost nobody reads them. The vast majority of hundreds of petabytes sits in this long tail, making SSD pricing for barely-read data the wrong trade-off.

Anthropic is moving to Bigtable's tiered storage, a per-table policy that automatically moves cells to an infrequently accessed tier. This provides the same API with no application code changes; Bigtable simply writes cold reads to cheaper storage underneath. For very cold data held only for legal or compliance reasons, the team is looking at HDD-backed storage at roughly five times cheaper per gigabyte. This fully managed data lifecycle within Bigtable helps balance the cost of storing vast amounts of data while maintaining the latency needed for active data and keeping everything accessible through a unified, consistent API for training models, analytics, or auditing.

## Application Layer Eventing and Change Data Capture

The team built an application-layer eventing system but would prefer to delete it. Every Bigtable mutation on the application side makes a paired separate event that flows into BigQuery and powers eventually consistent indexes so they can answer questions like who has access to what data without scanning Bigtable. This works but involves dual writes with two systems and two code paths, creating a consistent burden in the application layer. If the Bigtable write succeeds but the event fails, the index drifts. The team has engineered around it, but it's code they must maintain rather than a guarantee the platform provides.

What they want is for eventing to move to the storage layer. Bigtable change streams already capture every mutation at the source. Piping that into Pub/Sub would make Bigtable itself the source of truth for change notifications with no dual rights, guaranteed delivery, and the ability to remove a whole layer of application code. Google has been developing tighter integration between Pub/Sub and Bigtable, with a new subscription type in preview that enables Pub/Sub messages to write directly into Bigtable tables, simplifying real-time data ingestion into operational databases.

## Performance Enhancements and Future Directions

For applications requiring even lower latency than Bigtable's single-digit millisecond performance, Google has introduced an in-memory cache tier within Bigtable. This provides submillisecond latency on subsequent reads after data enters the system. The in-memory tier is consistent with the underlying layer, avoiding cache invalidation complexity or stale data issues. This is fully managed with a checkbox in the console, providing a full end-to-end unified experience that balances cost with performance.

The tiering model can be imagined as follows: a highly popular row, such as a celebrity profile in a social network, can automatically move into the in-memory tier and serve up to 125,000 queries per second per node with submillisecond response times. Less frequently accessed rows remain in the SSD layer with sub-two-millisecond latency. Data retained primarily for analytics, machine learning training, or unexpected access can move to infrequently accessed tiered storage where higher latency is acceptable in exchange for lower cost. All of this uses a unified API with configuration through simple settings.

## Key Takeaways and Operational Lessons

The Anthropic case study demonstrates several critical insights for operating LLMs in production at massive scale. First, cell-level timestamps are far more powerful than many teams realize, enabling entire retention and access revocation models to be implemented at the storage layer. Second, pushing security guarantees as deep as possible into the software stack provides stronger assurances. Cryptographic enforcement cannot be bypassed, while application-level code could have bugs or vulnerabilities. Third, understanding access patterns unlocks massive cost savings. Exponentially decaying reads paired with infrequently accessed storage tiers have dramatically cut storage costs.

The architecture follows a clear principle: whenever a guarantee can be pushed down to the storage layer rather than the application layer, the system becomes simpler and safer. This applies to access revocation through cell-level timestamps, retention through automatic garbage collection, and eventually to change data capture through native change streams. The team's lean size relative to the massive scale they operate demonstrates the power of leveraging managed services with the right primitives rather than building everything from scratch.

For teams building production LLM systems, this case study highlights the importance of thinking through data retention, security, and compliance requirements early in the architecture. The decisions around row key design, encryption hierarchies, and storage tiers are difficult to change after accumulating petabytes of data. The investment in systematic scanning infrastructure and purpose-based access control pays dividends across multiple operational concerns, from migrations to auditing to cost management. Finally, the willingness to adopt new platform features like continuous materialized views and tiered storage as they become available allows the system to evolve without major rewrites, keeping the codebase lean while capabilities expand.
