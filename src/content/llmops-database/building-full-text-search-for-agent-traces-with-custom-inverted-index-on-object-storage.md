---
title: "Building Full-Text Search for Agent Traces with Custom Inverted Index on Object Storage"
slug: "building-full-text-search-for-agent-traces-with-custom-inverted-index-on-object-storage"
draft: false
llmopsTags:
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "langchain"
  - "databases"
  - "open-source"
  - "documentation"
  - "scalability"
industryTags: "tech"
company: "Langchain"
summary: "LangChain's SmithDB team designed a specialized inverted index for searching agent traces stored in object storage, addressing unique challenges posed by large, deeply nested JSON documents containing agent execution data. The problem was that traditional search approaches couldn't efficiently handle the massive payload sizes (often 1 MB+ and sometimes hundreds of megabytes) of agent trace inputs and outputs, which have grown larger as LLM context windows expand and agents run for longer durations. Their solution involved building a custom inverted index architecture leveraging Finite State Transducers (FSTs) and block-bitpacked delta encoding within their Vortex columnar format, optimized specifically for object storage constraints. The result is a system that achieves median query latency of 400ms for full-text search and JSON filtering over agent traces, despite working with enormous documents in object storage, enabling three query modalities: path existence, keyed value search, and full-text search across trace data."
link: "https://www.langchain.com/blog/full-text-search-in-smithdb-designing-an-inverted-index-for-object-storage"
year: 2026
seo:
  title: "Langchain: Building Full-Text Search for Agent Traces with Custom Inverted Index on Object Storage - ZenML LLMOps Database"
  description: "LangChain's SmithDB team designed a specialized inverted index for searching agent traces stored in object storage, addressing unique challenges posed by large, deeply nested JSON documents containing agent execution data. The problem was that traditional search approaches couldn't efficiently handle the massive payload sizes (often 1 MB+ and sometimes hundreds of megabytes) of agent trace inputs and outputs, which have grown larger as LLM context windows expand and agents run for longer durations. Their solution involved building a custom inverted index architecture leveraging Finite State Transducers (FSTs) and block-bitpacked delta encoding within their Vortex columnar format, optimized specifically for object storage constraints. The result is a system that achieves median query latency of 400ms for full-text search and JSON filtering over agent traces, despite working with enormous documents in object storage, enabling three query modalities: path existence, keyed value search, and full-text search across trace data."
  canonical: "https://www.zenml.io/llmops-database/building-full-text-search-for-agent-traces-with-custom-inverted-index-on-object-storage"
  ogTitle: "Langchain: Building Full-Text Search for Agent Traces with Custom Inverted Index on Object Storage - ZenML LLMOps Database"
  ogDescription: "LangChain's SmithDB team designed a specialized inverted index for searching agent traces stored in object storage, addressing unique challenges posed by large, deeply nested JSON documents containing agent execution data. The problem was that traditional search approaches couldn't efficiently handle the massive payload sizes (often 1 MB+ and sometimes hundreds of megabytes) of agent trace inputs and outputs, which have grown larger as LLM context windows expand and agents run for longer durations. Their solution involved building a custom inverted index architecture leveraging Finite State Transducers (FSTs) and block-bitpacked delta encoding within their Vortex columnar format, optimized specifically for object storage constraints. The result is a system that achieves median query latency of 400ms for full-text search and JSON filtering over agent traces, despite working with enormous documents in object storage, enabling three query modalities: path existence, keyed value search, and full-text search across trace data."
notion:
  pageId: "37cf8dff-2538-80bf-b801-d2a5dd17f4e1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T12:29:00.000Z"
  lastEditedTime: "2026-06-11T12:29:00.000Z"
  publishedAt: "2026-06-11T12:38:43Z"
---

## Overview and Context

This case study from LangChain describes the technical architecture behind SmithDB's full-text search capabilities for agent traces within their LangSmith observability platform. LangSmith serves as an agent engineering platform that helps developers debug agent decisions, evaluate changes, and deploy agents in production. The specific challenge addressed here is enabling fast, efficient search over massive agent trace data stored in object storage—a critical LLMOps requirement as organizations need to query and analyze production agent behavior at scale.

The context for this work is that agent traces in LangSmith contain deeply nested JSON documents where the `inputs` and `outputs` fields can be enormous—commonly exceeding 1 MB and sometimes reaching hundreds of megabytes uncompressed. This is a direct consequence of two LLMOps trends: LLM context windows growing larger, allowing agents to accumulate more context, and agents running for longer time horizons with more complex multi-step reasoning. As the authors note, these payload sizes have been increasing over time and represent a fundamentally different data characteristic compared to traditional log search systems.

## The Unique Challenge of Searching Agent Traces

The team identified several characteristics that make agent trace search distinct from traditional log search workloads:

**Data Characteristics**: Traditional log search engines index billions of small documents where the index size is relatively small compared to each document (typically a 1:1.25 source-to-index ratio). In contrast, SmithDB indexes billions of enormous documents where a single document can generate more index data than many small log lines. For agent traces in LangSmith, the team observed an average source-to-index ratio closer to 1:1.9. The `inputs` and `outputs` fields dwarf other metadata columns by orders of magnitude in size.

**Consequences for Search Architecture**: This inversion has three critical implications. First, content filtering without an index becomes catastrophically slow—a query like "find runs whose tool output mentions a timeout" would require scanning many gigabytes to return just a few rows. Second, term frequencies follow a Zipfian (power law) distribution where a handful of tokens like "agents", "import", "role", and "type" appear in nearly every document while the long tail of terms appear once or twice, requiring the index to stay compact and prunable across many orders of magnitude of term frequency within a single file. Third, multiple query modalities matter: users need to query by path (checking for field existence), by value (matching specific field values), and by free text (searching anywhere in the document).

**Object Storage Constraints**: SmithDB keeps all durable data in object storage so compute remains relatively stateless and the system can scale by adding nodes without managing local disks. However, this introduces specific constraints: each object store request carries tens to hundreds of milliseconds of latency, and per-request throughput is modest, so fetching large posting lists or position lists before knowing they're needed can dominate query performance. The cost of a query is roughly proportional to (requests issued to object storage) × (bytes read per request).

## Query Patterns Supported

The SmithDB inverted index supports three distinct predicate families that differ in what they match and what pattern syntax they support:

**Path Existence** (`json_key`): Determines whether a document contains a specific key. For example, `json_key(inputs, "author.name")` identifies which documents mention the `author.name` field. This predicate also supports LIKE patterns on the key path itself, such as `json_key(inputs, "author.%")` or `json_key(inputs, "%.user_id")`, allowing patterns anywhere in the path (prefix, suffix, or infix matching).

**Keyed Value Search** (`json_key_search`): Checks whether a specific key has a value matching a pattern. The canonical form is `json_key_search(inputs, "author.name", "Jane")`. Queries can be single tokens or multi-token phrases like `json_key_search(inputs, "title", "latency regression")`, where the phrase variant enforces adjacency—the words must appear consecutively, not just anywhere in the value.

**Full-Text Search** (`search`): Matches any indexed value against a query pattern. `search(error, "timeout")` searches a text column directly, while `search(inputs, "latency regression")` searches across every JSON value regardless of path.

## Inverted Index Fundamentals and Architecture

The solution leverages the classic inverted index data structure but with specialized adaptations for agent traces and object storage. An inverted index consists of three core concepts:

A **term** is the unit being indexed—a JSON path, a keyed value, or a text token. A **posting** is the sorted set of document IDs containing a term. A **position** records where in a document a term appears, enabling phrase search functionality.

The team initially considered adopting Tantivy, a Rust-based search indexing library inspired by Lucene, but found it an awkward fit for three reasons. First, Tantivy is built around memory-mapped files with microsecond access times and effectively free random I/O, whereas SmithDB operates on object storage with ~100ms round trips where layout and coalescing decisions determine query latency. Second, SmithDB queries run through Apache DataFusion over their Vortex columnar format, and they wanted search to push down through the same scan pipeline as other predicates rather than running as a parallel query stack. Third, Tantivy assigns its own segment-local doc IDs in insertion order and renumbers them on every merge, but SmithDB needs the index to point directly at row positions in the corresponding Vortex data file so doc IDs are row indices with no translation table needed.

## Vortex Columnar Format

SmithDB uses Vortex, an extensible columnar file format designed for object storage. Unlike fixed formats like Parquet, Vortex allows pluggable encodings and custom file layouts, enabling the team to tailor compression and I/O access patterns specifically for their workload without forking the file format.

Every read operation in Vortex prunes entire row groups using statistics, filters surviving rows down to a mask, and projects only the columns the query actually needs. The unit of I/O in a Vortex file is a **segment**—a contiguous physical byte range. Since object storage round-trips cost roughly 100ms, the primary lever for query latency is minimizing the number of requests. Vortex's I/O scheduler coalesces nearby segment reads into a single request, merging reads within a 1 MB gap into one up to a 16 MB window, so sequential access patterns in the index map to very few object store GET requests.

## Initial Approach and Its Limitations

The first version was a near-literal translation of the textbook inverted index design. It used two columns: `term_key` for paths and `term_value` for tokens, allowing one layout to serve all three query shapes. Path-existence queries read `term_key`, keyed search intersected postings across both columns, and full-text search intersected on `term_value` alone. Postings were stored as `List<u32>` cells and positions as `List<List<u32>>`.

The team relied on Vortex's default encodings: FSST (Fast Static Symbol Table) encoding for term columns, bitpacked encoding for postings and positions, and a zoned storage layout enabling pruning at query time. Positions alone were an order of magnitude larger than every other column, so they kept the index in a separate file from core run data, decoupling index construction and merge from the core write path.

However, three problems emerged at scale:

**No Per-Term Encoding Control**: Vortex picked the encoding for the entire column, not per term. A single common token like "agent" or "langchain" would force a larger bit width on every term in the entire chunk, leading to poor bitpacking efficiency. The rest of the column suffered with worse cache behavior and larger reads, with no mechanism to apply more aggressive bitpacking selectively to high-frequency terms.

**Fixed-Size Row Groups Blind to Term Skew**: The system batched a fixed number of terms per row group, which meant a single high-frequency term could push one row group past 100 MB compressed while another remained at a few MB. At query time this translated to one outsized object-store GET; at merge time it meant outsized in-memory decoding.

**Merge Required Reshaping Positions**: Merging two segments required decoding the full positions `List<List<u32>>`, reshuffling inner lists into the new document order, and recomputing every outer offset. Both CPU time and allocations spiked during compaction. For an index where over 70% of bytes are positions, this became the dominant compaction cost.

## Version 2 Architecture: Byte-Budgeted Row Groups

The v2 layout addresses all three v1 problems by changing the organizational unit from "N terms per row group" to a **byte-budgeted row group** and by controlling the byte layout per column rather than relying solely on Vortex defaults.

**Byte-Based Row Group Sizing**: Rather than using a fixed term count, row groups are sized with fixed independent byte budgets. They allocate 32 MB for posting bytes (bounding the worst-case object-store GET when a query reads postings for a row group) and 64 MB for raw term-string bytes (capping raw bytes per row group). Sizing in bytes rather than term count addresses the term skew problem—term count is a poor proxy for I/O size since one high-frequency term could push a v1 row group past even 500 MB compressed. The byte budgets establish an upper bound on every row group's object store fetch size and memory footprint during query execution.

Per-row-group min/max/count statistics via a zoned storage layout on the term column let the query planner skip entire row groups before touching the FST (Finite State Transducer). For path queries targeting a specific prefix, this is the single biggest performance gain, as most row groups simply don't contain anything in the predicate's range.

## Internal Row Group Structure

Each row group contains four columns (three for `term_key`, which skips positions since path existence is a document-level question):

**term column**: A binary layout whose bytes form an FST mapping each term to an ordinal (its row index inside this row group). This approach is inspired by Tantivy's use of FSTs.

**term_info column**: Contains term metadata including document count plus offsets into the `postings` and `positions` columns.

**postings column**: A binary blob where per-term lists are split into 128-document blocks of bitpacked deltas with a VInt tail for any leftover documents (fewer than 128).

**positions column**: A binary blob using the same encoding as postings. This column is only present on `term_value` since path existence queries don't need position information.

A lookup operation involves one walk through the dictionary FST, one offset table read, and one byte-range fetch. The FST resolves the term to an ordinal, which indexes into `term_info` to retrieve offsets into `postings` and (for phrase queries) `positions`. The query reads those byte ranges directly with no payload scan and no nested-list decode. Because each column uses its own chunked layout, non-phrase queries can fetch just `term` + `term_info` + `postings` without ever opening the positions column.

## Encoding Optimizations

**FST for Term Dictionary**: The team compared FST against alternatives including Vortex's default FSST string encoding, prefix-shared keep_add encoding, and plain zstd compression. On a representative row group with 2.79M term occurrences, the results varied by cardinality. For `term_key` (JSON paths with 546 unique terms), FST compressed 88.8 MiB raw data to just 3.8 KiB—four orders of magnitude smaller than raw bytes and approximately 4× smaller than zstd. For the high-cardinality `term_value` column (1.41M unique tokens), FST at 32.7 MiB was about 1.5× larger than zstd at 21.7 MiB but still beat FSST. The crucial advantage is that zstd is opaque—every lookup requires decompressing the block—whereas the FST is the index itself, supporting exact lookup, prefix and range scans, and automaton walks (LIKE, fuzzy, regex) all running directly against the compressed bytes with O(|term|) cost and no hashing.

The team also unified keyed-search and full-text query shapes into a single FST per row group by storing `term_value` entries as `{token}\0{flattened_path}`. Keyed search becomes exact FST lookup, while full-text search becomes a prefix scan on `token\0`, walking every path the token appears under.

**Block-Bitpacked Deltas**: Both postings and positions use a two-tier encoding inspired by Tantivy and Lucene. Each per-term list is split into fixed 128-element blocks plus a tail of fewer than 128 leftover elements. Within a block, the system stores deltas between successive doc IDs (not the IDs themselves) and bitpacks the block to the minimum width fitting its max delta. Dense, regular runs of IDs pack down to just a few bits each. The trailing partial block (rare for high-frequency terms, but the entire posting list for low-frequency ones) falls back to VInt encoding at approximately 1 byte per small delta, degrading gracefully on the long tail.

This encoding provides two properties the v1 `List<u32>` encoding lacked. First, it enables per-term encoding rather than per-column encoding—each term picks its own bit widths block-by-block, so a frequent term like "agent" packs at 3-4 bits per doc while a rare term stays in its VInt tail. V1 forced one width across the whole column, causing frequent terms to inflate everyone's byte counts. Second, it's opaque to Vortex—Vortex sees the encoded bytes as a single binary blob and never decodes them into Arrow on the read path. This allows queries to fetch just the byte range they need, decode blocks on demand, and skip-decode past everything the skip list rules out.

## Divergence from Tantivy

While Tantivy also leverages FSTs, it builds one FST per segment with sharded partitioning. SmithDB builds one FST per row group instead. A row-group-sized FST is small enough that the writer can stream through it without ever holding a segment-wide FST in memory, and zone-level pruning skips most row groups before any FST work happens at query time. The trade-off is that a single lookup may touch multiple FSTs per file, but pruning makes this cost rare in practice, and the surviving FSTs are small enough that the walks are computationally cheap.

## LLMOps Implications and Production Context

From an LLMOps perspective, this work addresses a critical observability requirement: the ability to efficiently search and analyze agent execution traces in production environments. As agents become more complex with longer execution horizons and larger context windows, the ability to query trace data becomes essential for debugging, performance analysis, and understanding agent behavior patterns.

The 400ms median query latency enables practical interactive debugging workflows where developers can search through production agent traces to identify issues, understand specific execution paths, or analyze patterns across many agent runs. The support for three query modalities (path existence, keyed value, and full-text search) provides the flexibility needed for different debugging and analysis scenarios.

The design's focus on object storage economics reflects the reality of operating LLM systems at scale—storing massive amounts of trace data in a cost-effective manner while maintaining query performance. The careful optimization of byte budgets, encoding strategies, and I/O patterns demonstrates the systems-level engineering required to make agent observability practical at production scale.

The case study also highlights how agent traces differ fundamentally from traditional application logs or traces. The massive payload sizes driven by growing LLM context windows represent a new category of observability data that requires specialized infrastructure solutions. As LLM applications evolve toward more complex, long-running agent architectures, the ability to efficiently store, search, and analyze these traces becomes a core operational requirement for production LLMOps.
