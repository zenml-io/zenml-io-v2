---
title: "Scaling Multi-Tenant Legal Retrieval with Object-Storage-Native Search"
slug: "scaling-multi-tenant-legal-retrieval-with-object-storage-native-search"
draft: false
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "unstructured-data"
  - "high-stakes-application"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "latency-optimization"
  - "cost-optimization"
  - "postgresql"
  - "elasticsearch"
  - "databases"
  - "cache"
  - "amazon-aws"
  - "google-gcp"
  - "microsoft-azure"
industryTags: "legal"
company: "Legora"
summary: "Legora, a collaborative AI platform for legal work, needed retrieval infrastructure capable of searching anything from tens of documents to billions of legal records while meeting strict data-residency, tenant-isolation, and customer-managed-encryption requirements. After moving from a shared Elasticsearch deployment to region-specific clusters and then to a heavily partitioned PostgreSQL/pgvector system, Legora adopted Turbopuffer with one namespace per project or jurisdiction. The object-storage-native design provided BM25 and vector retrieval, better handling of hot and cold datasets, simpler multi-tenant operations, and substantially lower reported latency and cost, although the presentation provides limited independent evaluation methodology and does not describe the downstream LLM or answer-quality metrics."
link: "https://www.youtube.com/watch?v=V-isu4eTHgw"
year: 2026
seo:
  title: "Legora: Scaling Multi-Tenant Legal Retrieval with Object-Storage-Native Search - ZenML LLMOps Database"
  description: "Legora, a collaborative AI platform for legal work, needed retrieval infrastructure capable of searching anything from tens of documents to billions of legal records while meeting strict data-residency, tenant-isolation, and customer-managed-encryption requirements. After moving from a shared Elasticsearch deployment to region-specific clusters and then to a heavily partitioned PostgreSQL/pgvector system, Legora adopted Turbopuffer with one namespace per project or jurisdiction. The object-storage-native design provided BM25 and vector retrieval, better handling of hot and cold datasets, simpler multi-tenant operations, and substantially lower reported latency and cost, although the presentation provides limited independent evaluation methodology and does not describe the downstream LLM or answer-quality metrics."
  canonical: "https://www.zenml.io/llmops-database/scaling-multi-tenant-legal-retrieval-with-object-storage-native-search"
  ogTitle: "Legora: Scaling Multi-Tenant Legal Retrieval with Object-Storage-Native Search - ZenML LLMOps Database"
  ogDescription: "Legora, a collaborative AI platform for legal work, needed retrieval infrastructure capable of searching anything from tens of documents to billions of legal records while meeting strict data-residency, tenant-isolation, and customer-managed-encryption requirements. After moving from a shared Elasticsearch deployment to region-specific clusters and then to a heavily partitioned PostgreSQL/pgvector system, Legora adopted Turbopuffer with one namespace per project or jurisdiction. The object-storage-native design provided BM25 and vector retrieval, better handling of hot and cold datasets, simpler multi-tenant operations, and substantially lower reported latency and cost, although the presentation provides limited independent evaluation methodology and does not describe the downstream LLM or answer-quality metrics."
notion:
  pageId: "3f4f8dff-2538-80e4-8bc9-f5e491c125e7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:25:00.000Z"
  lastEditedTime: "2026-10-09T08:25:00.000Z"
  publishedAt: "2026-10-09T08:54:28Z"
---

## Overview

Legora provides a collaborative AI platform for law firms and in-house legal teams. Its production workloads include contract review, document analysis, contract creation, legal research, and collaboration over large collections of legal material. Retrieval is a foundational part of these workflows: project search helps users investigate documents associated with a transaction or other matter, while legal research searches laws, regulations, prior decisions, and related material to support answers and litigation work. The case study is therefore primarily an LLMOps retrieval-infrastructure story. The search system supplies the evidence and context that can be used by downstream generative-AI features, but the presentation does not specify the language models, prompting strategy, generation pipeline, grounding method, or answer-quality evaluation.

Legora's central challenge was to scale search from tens of documents to collections approaching billions of documents and, for legal research, toward 10 billion vectors. At the same time, customers required regional processing and storage, physical or dedicated data isolation, and customer-managed encryption keys. Legora ultimately used Turbopuffer with a namespace-per-project model for project search and namespace-per-jurisdiction model for legal research. The reported benefits were materially better latency than the previous PostgreSQL implementation, access to BM25 text relevance alongside vector retrieval, lower operational overhead, and a cost model that suited a long tail of infrequently accessed data. These results are company-reported and are not accompanied by a controlled benchmark, detailed traffic profile, or retrieval-quality measurements.

## Problem and Workloads

Legora supports two distinct retrieval patterns. Project search operates within a matter such as an acquisition, where a legal team may upload and search employment agreements, supplier contracts, and other transaction documents. A project can contain from tens of documents to millions, and projects have highly uneven activity: some are actively queried while others are closed and rarely accessed.

Legal research is broader and more demanding. It searches large collections of laws, cases, and regulations and may fan a request out into many searches. Results must be filtered and interpreted according to jurisdictional hierarchy, temporal validity, and relationships such as an overriding decision, an exemption, or a special case. The workload combines semantic retrieval with exact or lexical search and substantial metadata filtering. The search layer must also tolerate query spikes generated by this fan-out behavior. In a retrieval-augmented generation setting, these characteristics affect both the quality of the context supplied to an LLM and the cost and latency of producing an answer.

## Evolution of the Search Architecture

Legora initially used a single Elasticsearch cluster and shared blob storage for tenants. This was operationally simple and supported indexing and search, but geographic requirements forced a move to multiple deployments for the European Union, United States, and Asia-Pacific. Regional separation addressed residency requirements, but multiplied operational overhead.

Large banks and major law firms introduced stricter isolation requirements. They wanted their own database or equivalent physical separation and customer-managed encryption keys. With customer-managed keys, a customer can revoke Legora's access to the key used to decrypt data, providing an additional control over data at rest. Legora moved search into PostgreSQL because it already used PostgreSQL for online transactional workloads and could reuse its existing approach to separating databases and blob storage. The search implementation used pgvector, disk-based approximate nearest-neighbor search, and PostgreSQL text-search capabilities rather than BM25.

The PostgreSQL design partitioned document chunks aggressively—approximately 4,000 partitions—and assigned projects to partitions using a project key. This worked initially, but it combined hot and cold projects in ways that produced very large partitions. PostgreSQL had to load partitions into memory during queries, and cache churn increased as the system grew. Legora reports that search and ingestion P99 latency rose from roughly 100 milliseconds to as much as 20 seconds at scale. The presentation attributes this degradation to partition and cache thrashing rather than to an inherent limitation of PostgreSQL for every search workload.

## Turbopuffer Architecture and Tenant Isolation

At approximately 400 million documents, Legora moved project search to Turbopuffer. It created one namespace per project, treating a namespace as an isolated logical table or directory. This mapped naturally to the application's tenancy boundary and avoided placing active and inactive projects in the same PostgreSQL partitions. The system regained BM25 retrieval, retained vector retrieval, and allowed cold projects to remain in object storage without requiring all of their data to occupy hot database cache.

Turbopuffer writes directly to object storage, described in the presentation as S3-compatible storage, rather than relying on conventional disk replication and consensus mechanisms for the primary persistence path. A write-ahead log is used, and background processing builds vector, text, and columnar indexes. At query time, the system checks a memory cache, an NVMe SSD cache where permitted, and then object storage. Nodes use affinity to favor the node most likely to have the namespace cached. The design emphasizes completing queries with few object-storage round trips because object storage has substantially higher individual-request latency than memory or local storage.

The namespace boundary also supports isolation controls. Namespaces can be placed in different buckets, configured with different encryption keys, or arranged so that data is stored in a customer's cloud environment. For workloads where Legora could not accept unencrypted data in the SSD cache, the disk cache was disabled. The presentation says memory-only caching still produced sufficient performance for those workloads. This is a useful example of a production tradeoff: stronger isolation and encryption semantics were favored over one caching tier, with the impact assessed operationally rather than assumed away.

## Retrieval for Legal Research

For legal research, Legora uses namespaces to represent jurisdictions or other logical portions of the corpus. Frequently queried material, such as European Union law in the example, can remain hot, while less frequently queried material can stay cold in object storage. Because the workload is described as deep-research-like and can tolerate roughly 500 milliseconds for a cold fetch, the system can trade some latency for lower storage and caching cost on the long tail.

The vector index is described as a hierarchical clustering structure. Higher-level centroids are accessed frequently and are more likely to remain in memory, while leaves containing the underlying cases or documents can reside on SSD or object storage. This arrangement is intended to reduce random access and the number of remote round trips compared with graph-based approaches that repeatedly navigate pointers through slower storage. The design is particularly relevant to large corpora, but the case study does not provide recall, precision, nDCG, or other retrieval-quality results, so the performance claims should not be interpreted as proof that the new index is more accurate for legal research.

Text retrieval uses an inverted-index model: terms map to sets of document identifiers, matching sets are intersected, and BM25-style scoring favors terms that are more discriminative. Legora emphasizes that full-text search can be more computationally demanding than vector search at web scale. Combining BM25 with embeddings is important for legal use cases because exact legal terminology, citations, names, and phrases may be poorly served by semantic similarity alone, while vector search can help discover conceptually related material.

## Results and Tradeoffs

Legora reports an order-of-magnitude improvement in median latency after moving from the PostgreSQL search implementation to Turbopuffer, with P99 latency described as improving even more. The earlier comparison is based on the reported transition from approximately 100-millisecond P99 behavior to peaks around 20 seconds under the problematic PostgreSQL scaling regime; the talk does not state a complete before-and-after benchmark, workload mix, query volume, or percentile table. Legora also reports lower cost and simpler operations, especially as the tenant count grew beyond 70 and toward 100 or 200 tenants. A single service with namespace-level separation was considered easier to manage than maintaining separate Elasticsearch systems for every tenant or region.

The architecture is not universally optimal. Direct object-storage persistence introduces higher write latency, which is acceptable for document indexing and search but would be unsuitable for highly transactional workloads such as inventory reservation. Cold reads also incur additional latency, and disabling SSD caching can reduce performance for some access patterns. Namespace design, encryption-key management, bucket placement, regional controls, and deletion or retention policies become important operational responsibilities. The system's effectiveness depends on having a workload with a meaningful hot/cold distribution and on being able to tolerate slower access to rarely queried material.

## LLMOps Assessment

The most important LLMOps lesson is that production legal AI depends on retrieval reliability before generation quality can be assessed. Legora's system addresses scale, tenant isolation, residency, encryption, lexical and semantic retrieval, and uneven access patterns—the infrastructure conditions needed to supply an LLM with appropriately scoped legal context. However, the available case study does not establish whether generated answers became more accurate, better cited, safer, or less prone to hallucination. A complete production evaluation would separately measure retrieval recall and ranking quality, citation correctness, jurisdiction and temporal filtering, end-to-end answer quality, latency across warm and cold namespaces, and the behavior of fan-out queries under peak load. It would also need controls ensuring that a query cannot retrieve documents from another project, tenant, region, or encryption boundary. Within the evidence provided, the strongest demonstrated outcome is an infrastructure improvement in reported latency, cost, and operational simplicity—not a quantified improvement in the legal reasoning capabilities of the downstream LLM.
