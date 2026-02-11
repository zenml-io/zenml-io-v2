---
title: "Building a Financial Data RAG System: Lessons from Search-First Architecture"
slug: "building-a-financial-data-rag-system-lessons-from-search-first-architecture"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3fd563391a0790c5f21e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:45:07.787Z"
  createdOn: "2024-11-21T14:12:37.895Z"
llmopsTags:
  - "cache"
  - "chatbot"
  - "chunking"
  - "compliance"
  - "data-analysis"
  - "databases"
  - "devops"
  - "embeddings"
  - "microsoft-azure"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "semantic-search"
  - "serverless"
  - "structured-output"
  - "system-prompts"
  - "vector-search"
industryTags: "finance"
company: "Unspecified client"
summary: "A case study of implementing a RAG-based chatbot for financial executives and analysts to access company data across SEC filings, earnings calls, and analyst reports. The team initially faced challenges with context preservation, search accuracy, and response quality using standard RAG approaches. They ultimately succeeded by reimagining the search architecture to focus on GPT-4 generated summaries as the primary search target, along with custom scoring profiles and sophisticated prompt engineering techniques."
link: "https://www.linkedin.com/pulse/my-first-rag-use-case-key-insights-lessons-learned-dan-giannone-sa7ne/"
year: 2024
seo:
  title: "Unspecified client: Building a Financial Data RAG System: Lessons from Search-First Architecture - ZenML LLMOps Database"
  description: "A case study of implementing a RAG-based chatbot for financial executives and analysts to access company data across SEC filings, earnings calls, and analyst reports. The team initially faced challenges with context preservation, search accuracy, and response quality using standard RAG approaches. They ultimately succeeded by reimagining the search architecture to focus on GPT-4 generated summaries as the primary search target, along with custom scoring profiles and sophisticated prompt engineering techniques."
  canonical: "https://www.zenml.io/llmops-database/building-a-financial-data-rag-system-lessons-from-search-first-architecture"
  ogTitle: "Unspecified client: Building a Financial Data RAG System: Lessons from Search-First Architecture - ZenML LLMOps Database"
  ogDescription: "A case study of implementing a RAG-based chatbot for financial executives and analysts to access company data across SEC filings, earnings calls, and analyst reports. The team initially faced challenges with context preservation, search accuracy, and response quality using standard RAG approaches. They ultimately succeeded by reimagining the search architecture to focus on GPT-4 generated summaries as the primary search target, along with custom scoring profiles and sophisticated prompt engineering techniques."
---

## Overview

This case study documents a significant RAG (Retrieval Augmented Generation) implementation for a major financial services client, focusing on building a generative AI chatbot for executives, finance teams, and investor relations departments. The project offers valuable lessons about the operational challenges of deploying LLMs in production environments, particularly around search optimization, document processing, and iterative improvement.

The chatbot was designed to answer two main categories of questions: strategic macro-level questions about company performance, market sentiment, and competitor analysis, and detailed financial inquiries about specific metrics like revenue, margins, and EPS. The goal was to transform a laborious manual process—where investor relations teams would spend days preparing briefings for executive meetings—into a self-service solution delivering answers in seconds.

## Technical Architecture

The solution was built on Microsoft Azure's cloud infrastructure using the Azure Search OpenAI Demo Accelerator as a starting point. The core technology stack included:

- **Azure AI Search** (formerly Azure Cognitive Search): Serving as the intelligent search engine and vector data store
- **Azure OpenAI**: Hosting GPT-4-32k, GPT-4-Turbo, and text-embedding-ada-02 for embeddings
- **Azure App Service**: Running the Python-based backend and web interface

The data sources encompassed SEC filings, earnings call transcripts, analyst reports, and internal financial documents—a diverse corpus requiring sophisticated retrieval strategies.

The initial implementation used hybrid search, combining vector search (semantic similarity) with traditional keyword search. Documents were chunked into approximately 1000-word segments following common best practices for RAG systems.

## Production Challenges Encountered

The accelerator approach allowed rapid deployment and an initial "wow" moment for the client, but production usage quickly revealed critical issues that highlight common LLMOps pitfalls.

### Context Attribution Errors

One of the most significant problems was incorrect context attribution. When users asked questions like "What is Contoso Equity Research's latest commentary on us?", the system would sometimes attribute statements from one analyst firm to another. Investigation revealed that document chunking was breaking pages at arbitrary points, causing chunks to lose critical header information that identified the source. A chunk might contain analyst commentary but lack the header identifying which firm authored it. When passed to GPT-4 for synthesis, the model would incorrectly assume the source based on the question context.

Similarly, keyword search was matching documents based on footer text (disclaimers, distribution notices) rather than meaningful content, causing reports about one company to appear in searches about another company simply because both names appeared in boilerplate text.

### Financial Table Retrieval Failures

For specific financial metric questions like "What is our total FY2023 revenue?", the system frequently returned incorrect values. Tables were being split across chunks, with the bottom portion (containing totals) separated from column headers. The chunk containing row data without headers had poor semantic similarity to the query and often wasn't retrieved, or when retrieved, GPT-4 couldn't correctly interpret which values corresponded to which metrics.

### Search Algorithm Limitations

Both vector and keyword search showed fundamental limitations for this use case. Keyword search was biased toward pages with high term frequency in irrelevant contexts—legal disclaimers and analyst certifications often contained the most instances of company names and thus ranked highest despite having no substantive content.

Vector search struggled because the semantic representation of a user's question (a natural language query) was fundamentally different from the content being searched (tables, financial data, analyst prose). The vector space distance between "What is FY2023 revenue?" and the actual table containing that data was too large for reliable retrieval.

### Temporal Understanding

The system had no native understanding of time or fiscal calendars. Users asking to "focus on the latest data" received no preferential treatment for recent documents. Attempts to provide fiscal calendar context in prompts failed because GPT-4 performed poorly at date-to-fiscal-quarter calculations.

### Multi-Entity Queries

Questions about multiple companies simultaneously (e.g., "What are these 10 analysts saying about our company?") exposed a fundamental architecture limitation. The default retrieval of 5 top chunks couldn't possibly cover 10 different entities, and increasing chunk count risked hitting context window limits.

## Solution Iterations and LLMOps Practices

The project exemplifies iterative LLMOps development, with multiple solution attempts before arriving at an effective architecture.

### First Iteration: Page-Based Chunking

Shifting from arbitrary word-count chunks to page-based chunking immediately improved context preservation. Tables were no longer split, and header/footer information providing attribution context was maintained within each chunk. However, this exacerbated some problems: legal disclaimer pages now ranked even higher in keyword search, and vector search became essentially useless because full-page vectors were too semantically distant from short queries.

### Failed Approach: Content Chunk Validation

The team implemented a secondary GPT-4 call to validate search results before passing them to the main synthesis step. The validation prompt asked the model to assess whether each chunk was relevant and attributable (could the source be verified). Interestingly, simple valid/invalid outputs performed poorly—chain-of-thought reasoning was required for acceptable accuracy. This approach added 15-20 seconds of latency and was ultimately abandoned as a "band-aid" masking poor search quality.

### Breakthrough: Summary-Based Indexing

The key innovation was using GPT-4 to generate structured summaries of each page during indexing, then searching on summaries rather than content. The summarization prompt instructed the model to create brief, search-optimized descriptions like "Contoso commentary XXX Q3 FY2024. price target and downside risk" rather than prose descriptions.

The insight was that vector representations of natural language queries would closely match vector representations of search-optimized summaries, even when they wouldn't match the underlying content. This dramatically improved retrieval quality.

Additional refinements included:
- Adding filters to exclude chunks where "disclaimer" appeared in the summary field
- Passing filename context to the summarization function (critical for documents like earnings transcripts where company names don't appear on every page)
- Including filename, summary, and content in the final GPT-4 synthesis step to provide maximum context for disambiguation

### Context vs. Content Agent

A decision agent was introduced to determine whether a query was context-focused (who said what about whom) or content-focused (specific metrics from tables). Context queries searched the summary field; content queries searched the content field. This hybrid approach recognized that different query types required different retrieval strategies.

### Temporal Scoring

Rather than relying on GPT-4 to understand dates, the solution implemented a custom Azure AI Search scoring profile that boosted results based on document creation date freshness. A boost factor of 2 was applied, prioritizing recent documents while still allowing relevant older content to surface.

### Query Decomposition for Multi-Entity Questions

For questions about multiple companies, another agent was added to decompose the query into separate sub-queries, each processed independently through the full RAG pipeline. Results were concatenated rather than re-synthesized to avoid additional latency. The team noted this approach worked well for multi-company queries but actually degraded quality for multi-metric queries where all information typically existed on a single page.

## Key LLMOps Lessons

Several operational lessons emerged from this engagement that are broadly applicable to production LLM deployments.

**RAG is fundamentally a search problem.** The author explicitly states that "RAG is more of a search exercise than it is an AI exercise." Given correct content, GPT-4 reliably produces quality answers. The challenge is retrieval, and the project would have benefited from deeper Azure AI Search expertise from the outset.

**Default configurations rarely suffice.** The commonly accepted 512-token chunking with 25% overlap, while performing well on benchmarks, was inappropriate for this use case. Production RAG systems require custom chunking strategies aligned with document structure and query patterns.

**LLM calls introduce cost, latency, and error.** Each additional GPT-4 call (validation, agents, summarization) adds latency, token costs, and a new failure point. The team emphasizes that increased value must clearly outweigh these drawbacks.

**Iterative development with user feedback is essential.** Success came through rapid experimentation and quick abandonment of unsuccessful approaches (preprocessing, validation steps) combined with engaged stakeholders providing business-context feedback.

**Testing infrastructure matters.** The case study recommends creating representative test subsets to avoid costly full re-indexing during development, and notes the lack of formal evaluation frameworks as a gap to address for production readiness.

## Future Considerations

The author outlines several areas for continued development that represent common LLMOps maturity milestones:

- **LLMOps tooling**: Establishing baseline accuracy metrics and automated testing frameworks to measure impact of changes
- **Latency optimization**: Considering Provisioned Throughput Units (PTU), response streaming, and caching for frequently asked questions
- **Observability**: Implementing Azure API Management for resilience, scaling, and monitoring
- **Data freshness**: Automating ingestion and indexing pipelines to reduce manual effort
- **Security**: Implementing access controls to ensure users only see sources they're authorized to access
- **Multimodal capabilities**: Exploring GPT-4 Vision for charts and graphs, and potentially Power BI integration
- **Database connectivity**: Connecting directly to source databases for financial data rather than relying on PDF extraction

## Assessment

This case study provides an unusually detailed and candid account of RAG implementation challenges. The iterative approach—deploying quickly, identifying failures, and systematically addressing them—represents sound LLMOps practice. The key insight about summary-based indexing is particularly valuable, demonstrating that effective retrieval sometimes requires preprocessing data into more query-compatible representations.

However, it's worth noting that the project was time-pressured and some solutions (like the query decomposition approach) had known limitations that were accepted for pragmatic reasons. The author acknowledges that a better design phase would have smoothed the process, suggesting the "accelerator" approach of rapid deployment followed by remediation may not always be optimal.

The emphasis on search optimization over prompt engineering aligns with broader industry experience: LLM quality is increasingly commoditized, but retrieval quality remains a differentiator in RAG applications.