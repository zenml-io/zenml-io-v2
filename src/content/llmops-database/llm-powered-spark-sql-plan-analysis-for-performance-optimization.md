---
title: "LLM-Powered Spark SQL Plan Analysis for Performance Optimization"
slug: "llm-powered-spark-sql-plan-analysis-for-performance-optimization"
draft: false
llmopsTags:
  - "data-analysis"
  - "code-interpretation"
  - "prompt-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "mcp"
  - "open-source"
  - "documentation"
industryTags: "tech"
company: "Expedia"
summary: "Expedia Group developed an automated, LLM-powered workflow to analyze Apache Spark SQL execution plans and identify performance bottlenecks in long-running data processing jobs. The system uses structured prompting with an open-source Spark MCP server to detect specific anti-patterns such as missing broadcast joins, skewed partitions, oversized broadcasts, and full table scans. By moving from free-form prompting to pattern-guided detection with enforced traceability (requiring stage IDs, node IDs, and concrete metrics), the team achieved consistent and actionable results. Real-world deployments showed runtime reductions of 40-95% and compute cost reductions of 50-90% across multiple workloads, with specific jobs improving from 1 hour to 30 minutes, 3+ hours to expected runtimes, and 20 minutes to 1 minute after implementing LLM-surfaced recommendations."
link: "https://medium.com/expedia-group-tech/using-llms-to-analyze-spark-sql-plans-a-practical-approach-to-debugging-long-running-jobs-35eace7eeec4"
year: 2026
seo:
  title: "Expedia: LLM-Powered Spark SQL Plan Analysis for Performance Optimization - ZenML LLMOps Database"
  description: "Expedia Group developed an automated, LLM-powered workflow to analyze Apache Spark SQL execution plans and identify performance bottlenecks in long-running data processing jobs. The system uses structured prompting with an open-source Spark MCP server to detect specific anti-patterns such as missing broadcast joins, skewed partitions, oversized broadcasts, and full table scans. By moving from free-form prompting to pattern-guided detection with enforced traceability (requiring stage IDs, node IDs, and concrete metrics), the team achieved consistent and actionable results. Real-world deployments showed runtime reductions of 40-95% and compute cost reductions of 50-90% across multiple workloads, with specific jobs improving from 1 hour to 30 minutes, 3+ hours to expected runtimes, and 20 minutes to 1 minute after implementing LLM-surfaced recommendations."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-spark-sql-plan-analysis-for-performance-optimization"
  ogTitle: "Expedia: LLM-Powered Spark SQL Plan Analysis for Performance Optimization - ZenML LLMOps Database"
  ogDescription: "Expedia Group developed an automated, LLM-powered workflow to analyze Apache Spark SQL execution plans and identify performance bottlenecks in long-running data processing jobs. The system uses structured prompting with an open-source Spark MCP server to detect specific anti-patterns such as missing broadcast joins, skewed partitions, oversized broadcasts, and full table scans. By moving from free-form prompting to pattern-guided detection with enforced traceability (requiring stage IDs, node IDs, and concrete metrics), the team achieved consistent and actionable results. Real-world deployments showed runtime reductions of 40-95% and compute cost reductions of 50-90% across multiple workloads, with specific jobs improving from 1 hour to 30 minutes, 3+ hours to expected runtimes, and 20 minutes to 1 minute after implementing LLM-surfaced recommendations."
notion:
  pageId: "395f8dff-2538-8068-8fa6-c49c3211b820"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-06T07:06:00.000Z"
  lastEditedTime: "2026-07-06T07:06:00.000Z"
  publishedAt: "2026-07-06T07:19:36Z"
---

## Overview

Expedia Group built a production LLM system to automatically analyze Apache Spark SQL execution plans and identify performance bottlenecks that cause jobs to run slowly or fail at scale. The use case emerged from persistent operational pain points: slow or failing jobs requiring deep Spark expertise to debug, SQL queries that behaved unexpectedly at scale, and hidden issues like data skew and partition problems that were difficult to detect manually. The company faced scenarios where queries that ran fine initially would slow dramatically as data grew, causing jobs that should take minutes to take hours and driving up infrastructure costs.

The system represents a practical application of LLMs in production for operational intelligence and debugging automation. Rather than replacing Spark engineers, the solution provides leverage by automating the repetitive triage work that previously required deep knowledge of Spark internals, allowing engineers to focus on implementing fixes rather than hunting for root causes.

## Technical Architecture and Data Pipeline

The foundation of the system is an open-source Spark MCP (Model Context Protocol) server that exposes structured data about Spark job execution. This server provides clean, programmatic access to SQL execution metadata, final and physical plans, stage and task metrics, and critical performance indicators like shuffle statistics, spill volumes, and I/O metrics. The team specifically references using the GitHub kubeflow/mcp-apache-spark-history-server project and its `list_slowest_sql_queries` functionality.

The MCP server acts as the bridge between Spark's execution telemetry and the LLM analysis layer. It provides the structured context necessary for the LLM to reason about performance issues, transforming complex execution plans and metrics into a format the model can process. This approach is notable because it demonstrates how to integrate LLMs with existing observability infrastructure rather than building custom data pipelines from scratch.

## Prompt Engineering Evolution

The case study provides valuable insight into the prompt engineering evolution that made the system production-ready. The team's initial approach failed—they started with generic, free-form prompts like "Analyze the SQL plan and suggest optimizations." This vague instruction produced inconsistent results, hallucinated insights that weren't grounded in actual metrics, and frequently missed real issues that domain experts could spot.

The breakthrough came from replacing free-form chat with pattern-guided prompting. Rather than asking the LLM to broadly "optimize," the team defined clear, rule-driven anti-patterns with strict detection criteria. The model's job became narrowly scoped: detect only these specific patterns based on concrete evidence, nothing else. This constraint-based approach made the analysis consistent and grounded in real metrics rather than speculative suggestions.

The prompting strategy that ultimately worked includes several key principles. The LLM is instructed to analyze only the slowest SQL statements in each application (focusing effort where it matters most), cross-check evidence before reporting findings (reducing false positives), ground every observation with specific identifiers like stage IDs, task IDs, node IDs, operator names, and table references, and output only structured JSON with validated detections that downstream systems can consume programmatically.

The team shared their actual prompt in a GitHub Gist, demonstrating a commitment to reproducibility. The prompt architecture emphasizes traceability—every finding must point to actual evidence in the execution plan or metrics. This design decision was critical for production adoption because it allows engineers to verify LLM findings against ground truth and builds trust in the system's recommendations.

## Pattern Detection Capabilities

The system detects several high-impact Spark SQL execution anti-patterns, each defined with specific, measurable criteria. This is not a general-purpose optimization assistant but rather a focused detector for known performance killers in Spark workloads.

**Missed Broadcast Joins** occur when one side of a join is small enough to broadcast (typically under 10MB to a few hundred MB depending on configuration) but Spark chooses a shuffle-heavy SortMergeJoin instead. The LLM identifies cases where the join input size would fit within broadcast thresholds but Adaptive Query Execution (AQE) or other heuristics led to a suboptimal strategy choice. In one specific example, the system detected a join where the right side was approximately 96 MB—small enough to broadcast—yet Spark executed a SortMergeJoin. The LLM output included the stage ID (10.0), the table name (destination_attribute), the actual size (96.6 MiB), the chosen strategy (SortMergeJoin), the expected strategy (BroadcastHashJoin), and contextual notes suggesting the broadcast threshold was likely too low or AQE skew handling favored the merge join. After increasing the broadcast threshold based on this finding, runtime dropped from approximately 1 hour to 30 minutes with zero query rewrites.

**Skewed Partitions** are detected when the model identifies extreme imbalances in data distribution across partitions. The system doesn't just flag that skew exists—it quantifies severity using partition size statistics. In one case, the LLM reported median partition size of 0 B but maximum partition size of approximately 280 GB across only 16 partitions in stage 35, which contained a SortMergeJoin with skew handling enabled. The detection included the node type, partition count, and size distribution metrics. Investigation revealed the root cause: a left join with null-heavy keys was funneling almost all data into a single partition. The job had been technically "succeeding" but running for over three hours with long-tail straggler tasks. After fixing the join logic to handle null keys correctly, the job returned to expected runtime.

**Full Table Scans from Missing Filters** represent especially costly but easy-to-miss issues. The LLM flagged a case where a table scan was reading 23.5 TB of data with no partition or date filters applied. The detection included the full table name (lodging_content_vrbo_room_type_profile_history), input size (23.5 TiB), empty arrays for partition_filters and pushed_filters, and a clear issue description. The physical plan confirmed a full scan of a massive Iceberg table triggered by a missing predicate pushdown. Adding the correct partition predicates reduced runtime from approximately 20 minutes to 1 minute—a 95% improvement from a simple predicate addition.

**Oversized Broadcasts** occur when broadcast joins involve tables that are too large, creating driver memory pressure and network overhead. While broadcast joins are generally beneficial for small tables, multi-GB broadcasts can destabilize execution. The system detected multiple broadcasts exceeding 2 GB in a single query: one broadcasting 2.7 GiB from supply.lodging_profile_vrbo feeding into node 13, and another broadcasting 2.2 GiB from supply.lodging_profile_eg feeding into node 24. The detection noted that multiple large broadcasts in the same query amplify driver and network overhead. The Spark UI confirmed long broadcast build times and elevated driver memory usage. Reworking the join strategy to avoid broadcasting large datasets dropped runtime from approximately 20 minutes to 1 minute while improving stability.

Additional patterns include **Aggressive Coalesce Operations** where AQE coalescing creates excessively large shuffle partitions (over 2 GB or 10× the advisory size) while overall parallelism drops below available executor cores, leading to underutilized clusters and long-running stragglers. **High Spill Volumes** are detected when total spill exceeds 1 GB, spills account for 20%+ of input data, or spills occur across most tasks in a stage, with higher severity assigned when volumes exceed 5 GB indicating sustained memory pressure. **Data Explosion due to Joins** identifies joins where output rows grow disproportionately (2× or more than the largest input), often caused by duplicate keys, missing predicates, or incorrect join grain that silently inflate data volumes and downstream shuffle costs.

## Output Format and Integration

The system outputs structured JSON with strict schema enforcement. Each detection includes concrete identifiers (stage_id, node_id, table names), quantitative metrics (sizes in human-readable and raw formats, partition counts, spill volumes), categorization (pattern name, severity level), and contextual explanation (likely causes, expected vs. actual behavior). This structured format enables programmatic consumption by downstream systems—the findings can feed into dashboards, alerting systems, automated tuning workflows, or incident reports without manual parsing.

The JSON output examples in the case study show consistent structure across different pattern types, making it straightforward to build tooling around the system. For example, the missed broadcast join detection includes nested objects for join_details with left and right side information, size metrics, chosen vs. expected strategies, and explanatory notes. This level of detail provides both human-readable context and machine-parseable data.

## Validation and Impact Measurement

A critical aspect of the LLMOps implementation is the validation workflow. For each LLM-surfaced finding, engineers validated against the actual physical plan and Spark UI metrics before implementing changes. The case study includes screenshots showing how the physical plans confirmed LLM predictions—demonstrating both the accuracy of the detections and the team's methodical approach to verification. This validation loop is essential for building trust in LLM-generated insights and catching any hallucinations or false positives.

Impact measurement shows concrete, quantifiable improvements. Across multiple Spark workloads, the system consistently identified the specified patterns and enabled targeted optimizations. Specific examples include the 1-hour job reduced to 30 minutes (50% improvement) by adjusting broadcast thresholds, the 3+ hour job with severe skew brought back to expected runtime by fixing join logic, and two different 20-minute jobs reduced to 1 minute (95% improvement) by adding partition filters and reworking broadcast strategies respectively.

The team reports overall patterns of 40-95% runtime reduction on long-running jobs and 50-90% compute cost reduction per job, with the disclaimer that exact numbers vary by workload. Beyond the direct performance gains, the system saves hours of manual debugging per incident by automating the initial triage that previously required Spark experts to manually trace through execution plans.

## Production Considerations and Balanced Assessment

From an LLMOps perspective, this implementation demonstrates several production-ready practices. The system is narrowly scoped to specific, well-defined patterns rather than attempting general-purpose optimization, which reduces the risk of hallucinations and makes validation tractable. The requirement for evidence-based findings with traceable identifiers creates an audit trail and enables verification. The structured output format supports integration with existing operational workflows rather than requiring manual interpretation of free-form text.

However, the case study is written by the team that built the system and naturally presents it in a positive light. Several considerations deserve balanced assessment. The effectiveness depends heavily on the quality and completeness of the pattern definitions—the system only detects what it's explicitly programmed to look for, meaning novel or uncommon performance issues may be missed. The validation workflow still requires human expertise to interpret findings and implement fixes, so this is assistance rather than full automation. The cost of running LLM inference on every slow query is not discussed—depending on the volume of jobs and choice of model, the analysis overhead could be non-trivial.

The pattern-guided approach that made this system successful also limits its flexibility. Adding new patterns requires careful definition of detection criteria and potentially prompt updates, making it more like rule-based expert systems augmented with LLM reasoning rather than truly open-ended analysis. The team acknowledges this implicitly by positioning it as "giving experts leverage" rather than replacing them.

The reliance on the Spark MCP server means the system is coupled to that specific tooling—teams without access to similar structured telemetry would need to build equivalent data pipelines before implementing this approach. The case study doesn't discuss failure modes, such as what happens when execution plans are especially large or complex, whether token limits become a constraint, or how the system handles ambiguous cases where multiple patterns might apply.

## Extension Opportunities and Future Directions

The team outlines several extension opportunities that suggest the system's current scope is deliberately limited but expandable. They mention adding new rules as more performance issues are observed (incremental pattern library growth), introducing Delta Lake or Apache Iceberg-specific checks (format-aware optimizations), mapping slow stages to individual plan nodes with greater granularity, adjusting thresholds for skew, spills, and broadcasts based on workload characteristics, and feeding detections into dashboards or alerts for proactive tuning rather than reactive debugging.

These extensions suggest the architecture is designed for evolution. Once the structured context pipeline exists, extending detection capabilities becomes a matter of defining new patterns and updating prompts rather than rebuilding infrastructure. This extensibility is a key advantage of the LLM-based approach compared to hard-coded rule engines.

The case study positions this as "a genuinely useful addition to your toolbox" for teams operating large-scale Spark workloads, which is a appropriately modest framing. It's not a silver bullet but rather a practical automation of a specific, high-value debugging workflow that previously required scarce expertise.

## Key Takeaways for LLMOps Practitioners

This case study offers several valuable lessons for LLMOps practitioners. The evolution from generic prompts to pattern-guided, evidence-based detection shows how constraint and specificity often improve LLM reliability in production more than sophistication or flexibility. The requirement for structured output with traceability is essential for building trust and enabling downstream integration. Integration with existing observability infrastructure (the MCP server) is more practical than building custom data pipelines, making this approach accessible to teams with mature monitoring.

The narrow scope—detecting specific known anti-patterns rather than general optimization—makes validation tractable and reduces hallucination risk, which is critical for production adoption. The validation workflow that checks LLM findings against ground truth before implementation provides necessary safety rails. The focus on operational impact (runtime and cost reduction) rather than model metrics demonstrates production-oriented evaluation.

This represents a mature LLMOps implementation in the sense that it solves a real operational problem, integrates with existing workflows, produces verifiable and actionable outputs, and measures business impact rather than just technical metrics. The transparency about prompt engineering failures and the iterative refinement process provides valuable guidance for practitioners building similar systems.
