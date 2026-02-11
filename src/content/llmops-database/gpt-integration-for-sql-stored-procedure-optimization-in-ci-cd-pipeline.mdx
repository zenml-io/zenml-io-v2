---
title: "GPT Integration for SQL Stored Procedure Optimization in CI/CD Pipeline"
slug: "gpt-integration-for-sql-stored-procedure-optimization-in-ci-cd-pipeline"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68091eff14c1d2d4a1c1ba2e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:06:12.679Z"
  createdOn: "2025-04-23T17:10:23.264Z"
llmopsTags:
  - "data-analysis"
  - "data-cleaning"
  - "legacy-system-integration"
  - "prompt-engineering"
  - "model-optimization"
  - "error-handling"
  - "cicd"
  - "postgresql"
  - "monitoring"
  - "devops"
  - "openai"
industryTags: "e-commerce"
company: "Agoda"
summary: "Agoda integrated GPT into their CI/CD pipeline to automate SQL stored procedure optimization, addressing a significant operational bottleneck where database developers were spending 366 man-days annually on manual optimization tasks. The system provides automated analysis and suggestions for query improvements, index recommendations, and performance optimizations, leading to reduced manual review time and improved merge request processing. While achieving approximately 25% accuracy, the solution demonstrates practical benefits in streamlining database development workflows despite some limitations in handling complex stored procedures."
link: "https://medium.com/agoda-engineering/how-agoda-uses-gpt-to-optimize-sql-stored-procedures-in-ci-cd-29caf730c46c"
year: 2024
seo:
  title: "Agoda: GPT Integration for SQL Stored Procedure Optimization in CI/CD Pipeline - ZenML LLMOps Database"
  description: "Agoda integrated GPT into their CI/CD pipeline to automate SQL stored procedure optimization, addressing a significant operational bottleneck where database developers were spending 366 man-days annually on manual optimization tasks. The system provides automated analysis and suggestions for query improvements, index recommendations, and performance optimizations, leading to reduced manual review time and improved merge request processing. While achieving approximately 25% accuracy, the solution demonstrates practical benefits in streamlining database development workflows despite some limitations in handling complex stored procedures."
  canonical: "https://www.zenml.io/llmops-database/gpt-integration-for-sql-stored-procedure-optimization-in-ci-cd-pipeline"
  ogTitle: "Agoda: GPT Integration for SQL Stored Procedure Optimization in CI/CD Pipeline - ZenML LLMOps Database"
  ogDescription: "Agoda integrated GPT into their CI/CD pipeline to automate SQL stored procedure optimization, addressing a significant operational bottleneck where database developers were spending 366 man-days annually on manual optimization tasks. The system provides automated analysis and suggestions for query improvements, index recommendations, and performance optimizations, leading to reduced manual review time and improved merge request processing. While achieving approximately 25% accuracy, the solution demonstrates practical benefits in streamlining database development workflows despite some limitations in handling complex stored procedures."
---

## Overview

Agoda, a major online travel booking platform, has implemented GPT-based automation to optimize SQL stored procedures (SPs) within their CI/CD pipeline. This case study represents an interesting application of large language models to a specialized domain: database query optimization. The implementation aims to reduce the significant manual effort required by database developers (dbdevs) to analyze and optimize stored procedures that fail performance tests during the merge request process.

The scale of the problem is notable: Agoda's database development team was spending approximately 366 man-days annually on SP optimization, with 320 of those days specifically devoted to handling performance test failures. Merge request approval times had grown to 4.1 hours at the 90th percentile, creating bottlenecks in the development workflow.

## Technical Architecture and Integration

The GPT-based optimization system is integrated directly into Agoda's CI/CD pipeline, specifically at the merge request (MR) stage. When a developer submits a new stored procedure via an MR, the system automatically triggers performance tests. If these tests fail—or potentially as a proactive measure—the GPT optimization process is invoked.

### Context Preparation (Input Engineering)

The system provides GPT with three key pieces of contextual information to enable accurate analysis:

- **SP Code**: The complete SQL code of the stored procedure requiring optimization
- **Table Structures and Indexes**: Database schema information including table definitions and existing index configurations
- **Performance Test Report**: Results highlighting execution times, bottlenecks, and identified inefficiencies

This multi-faceted context is crucial for the model to understand not just the code itself, but how it interacts with the underlying data structures and where actual performance problems manifest. This represents a form of structured prompt engineering where domain-specific context is systematically assembled before model invocation.

### GPT Processing and Output Generation

The model performs analysis across three key areas:

**Performance Analysis**: GPT interprets the performance test report to identify specific issues such as full table scans, inefficient joins, or query execution bottlenecks. This allows the model to connect symptom (slow performance) with potential cause (query anti-patterns).

**Query Refinement**: The model suggests optimized versions of the SP code, potentially rewriting queries to reduce complexity. Examples include replacing deeply nested subqueries with joins or common table expressions (CTEs).

**Indexing Suggestions**: Based on query patterns, GPT recommends new indexes or modifications to existing indexes, including composite indexes for multi-column filtering and sorting scenarios.

The outputs are twofold: an optimized version of the stored procedure and a set of suggested indexes. These are presented to developers through GitLab MR comments with a performance comparison between the original and optimized versions.

### Developer Experience and Workflow Integration

A notable aspect of this implementation is the attention to developer experience. The optimization results are surfaced directly within the GitLab merge request interface, with a "click-to-apply" feature that allows developers to commit the GPT-suggested changes with minimal friction. The side-by-side performance comparison helps developers make informed decisions about whether to accept the recommendations.

The case study provides an example where GPT identified an opportunity to optimize a stored procedure by replacing an OR condition with an IF-ELSE structure, resulting in measurable reductions in database resource usage.

## Results and Accuracy Assessment

The case study reports that accuracy has reached "around 25%," which represents the proportion of GPT suggestions that developers found actionable and correct. This is a notably honest disclosure—many vendor case studies would avoid reporting such metrics. From an LLMOps perspective, this 25% accuracy rate warrants careful interpretation:

- It suggests the system is useful but not a replacement for human expertise
- It indicates that 75% of suggestions are either incorrect, inapplicable, or not beneficial
- The value proposition depends heavily on the cost of generating and reviewing suggestions versus the benefit of the 25% that prove useful

This accuracy rate aligns with realistic expectations for LLM-based code generation in specialized domains. Database optimization is a nuanced field where correctness depends on understanding data distributions, query patterns, and workload characteristics that may not be fully captured in the provided context.

## Limitations and Ongoing Challenges

The case study acknowledges several limitations:

**Variable Revision Scope**: GPT's modifications range from minimal, targeted changes (like indexing suggestions) to complete rewrites of SP logic. This variability creates verification challenges—more extensive changes carry higher risk of introducing logical errors.

**Logic Verification Gap**: When GPT significantly rewrites SP logic, there's no guarantee that the new code produces semantically equivalent results. The team is actively developing automated logic verification tools to compare outputs of original and optimized SPs across test cases.

**Accuracy Limitations**: The 25% accuracy rate indicates that most suggestions are not directly usable, placing burden on developers to evaluate and filter recommendations.

## Future Development Plans

Agoda is pursuing several enhancements:

- **Standalone Assistant**: Development of a tool that integrates directly with Agoda's database environment, allowing developers to access GPT capabilities without initiating a merge request
- **Enhanced Testing Framework**: Making it easier for dbdevs to add test cases and fine-tune prompts to improve accuracy
- **Production Workload Analysis**: Plans to identify high-CPU stored procedures from production systems and evaluate GPT's optimization impact on real-world performance

## LLMOps Considerations

This case study illustrates several important LLMOps patterns:

**Domain-Specific Context Engineering**: The careful assembly of SP code, schema information, and performance data represents structured context preparation that goes beyond simple prompting.

**CI/CD Integration**: Embedding LLM capabilities within existing development workflows reduces adoption friction and makes AI assistance feel like a natural part of the development process rather than a separate tool.

**Human-in-the-Loop Design**: The click-to-apply model preserves human judgment while reducing friction. Developers must actively choose to accept suggestions, maintaining oversight over code changes.

**Honest Metrics**: The reported 25% accuracy rate provides a realistic baseline for expectations. Organizations considering similar implementations should calibrate their expectations accordingly.

**Iterative Improvement**: The acknowledgment of ongoing work on logic verification and prompt fine-tuning reflects the reality that LLM-based systems require continuous refinement based on production feedback.

## Critical Assessment

While this case study presents a genuinely innovative application of GPT to database optimization, several points warrant balanced consideration:

- The 25% accuracy rate, while honestly disclosed, suggests that the majority of GPU compute spent on generating suggestions does not result in usable output
- The actual reduction in man-days and MR approval times is not quantified post-implementation—only the pre-implementation baseline is provided
- The example provided (OR to IF-ELSE transformation) is a relatively straightforward optimization pattern that could potentially be detected by rule-based static analysis

That said, the integration approach—particularly the GitLab MR integration and click-to-apply functionality—represents thoughtful UX design for LLM-assisted development tools. The transparency about limitations and the roadmap for automated verification demonstrate mature thinking about the challenges of deploying LLMs in code-critical applications.