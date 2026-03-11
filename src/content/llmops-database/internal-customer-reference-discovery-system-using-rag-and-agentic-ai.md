---
title: "Building an Internal AI-Powered Customer Reference Discovery Platform"
slug: "internal-customer-reference-discovery-system-using-rag-and-agentic-ai"
draft: false
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "document-processing"
  - "data-analysis"
  - "summarization"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "reranking"
  - "vector-search"
  - "semantic-search"
  - "agent-based"
  - "token-optimization"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "fastapi"
  - "docker"
  - "cicd"
  - "orchestration"
  - "databases"
  - "monitoring"
  - "documentation"
  - "scaling"
  - "microservices"
  - "api-gateway"
  - "postgresql"
  - "langchain"
  - "databricks"
  - "google-gcp"
industryTags: "tech"
company: "Databricks"
summary: "Databricks faced a significant challenge in helping sales and marketing teams discover and utilize their vast collection of over 2,400 customer stories scattered across multiple platforms including YouTube, LinkedIn, internal documents, and their website. The tribal knowledge problem meant that finding the right customer reference at the right time was difficult, leading to overused references, missed opportunities, and inefficient manual searching. To solve this, they built Reffy—a full-stack agentic application using RAG (Retrieval-Augmented Generation), Vector Search, AI Functions, and Lakebase on the Databricks platform. Since its launch in December 2025, over 1,800 employees have executed more than 7,500 queries, resulting in faster campaign execution, more relevant storytelling, and democratized access to customer proof points that were previously siloed in tribal knowledge."
link: "https://www.databricks.com/blog/tribal-knowledge-instant-answers-building-reffy-databricks"
year: 2026
seo:
  title: "Databricks: Building an Internal AI-Powered Customer Reference Discovery Platform - ZenML LLMOps Database"
  description: "Databricks faced a significant challenge in helping sales and marketing teams discover and utilize their vast collection of over 2,400 customer stories scattered across multiple platforms including YouTube, LinkedIn, internal documents, and their website. The tribal knowledge problem meant that finding the right customer reference at the right time was difficult, leading to overused references, missed opportunities, and inefficient manual searching. To solve this, they built Reffy—a full-stack agentic application using RAG (Retrieval-Augmented Generation), Vector Search, AI Functions, and Lakebase on the Databricks platform. Since its launch in December 2025, over 1,800 employees have executed more than 7,500 queries, resulting in faster campaign execution, more relevant storytelling, and democratized access to customer proof points that were previously siloed in tribal knowledge."
  canonical: "https://www.zenml.io/llmops-database/internal-customer-reference-discovery-system-using-rag-and-agentic-ai"
  ogTitle: "Databricks: Building an Internal AI-Powered Customer Reference Discovery Platform - ZenML LLMOps Database"
  ogDescription: "Databricks faced a significant challenge in helping sales and marketing teams discover and utilize their vast collection of over 2,400 customer stories scattered across multiple platforms including YouTube, LinkedIn, internal documents, and their website. The tribal knowledge problem meant that finding the right customer reference at the right time was difficult, leading to overused references, missed opportunities, and inefficient manual searching. To solve this, they built Reffy—a full-stack agentic application using RAG (Retrieval-Augmented Generation), Vector Search, AI Functions, and Lakebase on the Databricks platform. Since its launch in December 2025, over 1,800 employees have executed more than 7,500 queries, resulting in faster campaign execution, more relevant storytelling, and democratized access to customer proof points that were previously siloed in tribal knowledge."
notion:
  pageId: "320f8dff-2538-8010-97d2-cc4f6942cfdc"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-03-11T13:59:00.000Z"
  lastEditedTime: "2026-03-11T14:10:00.000Z"
  publishedAt: "2026-03-11T14:14:54Z"
---

## Overview

Databricks built Reffy, an internal agentic application designed to solve a persistent organizational challenge: democratizing access to customer references and stories. The company had accumulated over 2,400 customer stories across disparate sources—YouTube transcripts, LinkedIn articles, Medium posts, internal Google Slides and Docs, and published case studies on their website. However, these valuable assets were effectively trapped in silos, discoverable only through institutional knowledge, manual searching, or direct inquiries to the marketing team. This created inefficiencies where high-value references became overused, newer use cases or industries were overlooked, and marketing effectiveness was limited by who you knew rather than what existed.

The solution represents a comprehensive LLMOps implementation spanning data engineering, ML infrastructure, agent development, application development, and operational monitoring—all built on Databricks' own platform. Published in March 2026 and launched in December 2025, Reffy demonstrates real production adoption with over 1,800 internal users executing upwards of 7,500 queries in its first two months.

## Technical Architecture and Data Pipeline

The foundation of Reffy's LLMOps implementation begins with a robust ETL pipeline orchestrated through Lakeflow Jobs. The data engineering component is critical—as the team notes, while many groups gravitated toward the exciting AI layer, getting the ETL right proved just as essential as the agent itself.

The pipeline follows a medallion architecture pattern using Delta Lake tables governed by Unity Catalog. At the Bronze layer, the system consolidates text from multiple heterogeneous sources using standard Python web scraping libraries to gather YouTube transcripts, LinkedIn and Medium articles, and public customer stories from databricks.com. For internal content, they developed Google Apps scripts to extract text from hundreds of internal presentations and documents, consolidating them into a single Google Sheet for ingestion. All sources are processed with basic metadata and persisted to a Bronze Delta table.

The Silver layer introduces a sophisticated quality scoring mechanism that goes beyond simple text aggregation. Rather than treating all customer stories equally, Databricks applies a rigorous 31-point scoring system developed by their Value team. This classification is implemented using AI Functions, which prompt Gemini 2.5 to evaluate each story across multiple dimensions: identification of the business challenge, description of the solution, credibility of reported outcomes, and why Databricks was uniquely positioned to deliver value. This LLM-based evaluation also performs metadata extraction, identifying country, industry, products used, competitive context, and notable quotes. Additionally, stories are tagged to indicate whether they are publicly shareable or internal-only—a critical governance consideration for customer data.

This quality scoring serves multiple purposes in the LLMOps workflow. First, it enables filtering of low-quality stories that might dilute retrieval results. Second, it provides rich metadata that can be used for faceted search and analytics. Third, it creates a feedback loop where gaps in high-quality stories across industries or use cases can be identified and addressed. The enriched dataset is saved to a Silver table in Unity Catalog.

The Gold layer represents the final production-ready dataset. Low-scoring stories are filtered out, and a crucial transformation creates a 'summary' column that concatenates essential story components. This design decision reflects an important RAG optimization: by creating a purpose-built summary field containing all information an LLM would need to match stories to queries, they optimize both retrieval quality and inference efficiency. This Gold table is synchronized to a Databricks Vector Search index, with the summary column serving as the embedded content.

## Agent Development and RAG Implementation

The agentic component of Reffy leverages the DSPy framework, a choice the team explicitly advocates for based on their development experience. DSPy enabled rapid iteration in Databricks notebooks without requiring redeployment to Model Serving endpoints with each change, significantly accelerating the development cycle. The framework's intuitive syntax and built-in prompt optimization components made it preferable to other popular agent frameworks.

The agent architecture implements a tool-calling pattern that interfaces with Databricks Vector Search using hybrid keyword and semantic search. An important UX consideration shaped the design: the system supports both lightning-fast pure keyword searches (returning results in under two seconds) and longer-form LLM-powered responses with reasoning. This dual-mode operation accommodates different user needs—quick lookups versus analytical queries requiring synthesis across multiple sources.

The system also incorporates the Databricks re-ranker for Vector Search to improve retrieval quality beyond the initial similarity search. This two-stage retrieval pattern—initial retrieval followed by re-ranking—is a common production RAG optimization that balances recall and precision.

Prompt engineering plays a central role in ensuring response quality. The system prompt emphasizes providing balanced, professional responses with proper attribution. While the specific prompt text isn't fully detailed in the case study, the team mentions designing it to deliver "carefully thought-out answers with sources" for question-based queries.

The agent is logged using MLflow, demonstrating integration with ML experiment tracking and model versioning infrastructure. Deployment occurs through Databricks Model Serving using their Agent Framework. An interesting cost optimization: since most processing happens on the model provider's side (Gemini 2.5), they deploy to small CPU instances rather than expensive GPU infrastructure, significantly reducing operational costs.

## Application Layer and User Interface

The frontend implementation uses React with a FastAPI Python backend, deployed through Databricks Apps. This technology choice reflects modern web development practices—React provides responsive, streamlined user experiences with support for streaming output from the Model Serving endpoint, while FastAPI enables high-performance API development in Python.

A key architectural advantage comes from the Databricks Python SDK, which provides unified authentication across development and production environments. The same environment variables used for local authentication work seamlessly when deploying to Databricks Apps, eliminating code changes between environments. The SDK also offers comprehensive API coverage, allowing the application to call Model Serving endpoints, execute SQL queries, and access other Workspace resources through a single consistent interface.

Reffy functions primarily as a chat application, with conversational state managed through Lakebase—Databricks' solution for fast transactional reads and writes. All conversation history, logs, and user identities are persisted to Lakebase, serving multiple purposes: enabling conversational context across sessions, supporting quality assurance reviews, and facilitating thoughtful product improvements as users return or start new conversations.

The development workflow leverages modern tooling while maintaining CI/CD best practices. Most development occurs in Cursor with unified CLI authentication simplifying the development loop: sign in once via CLI, author code locally, test in the local environment, sync to the Workspace, deploy the app, and test in Databricks Apps. For production deployment, the team uses Databricks Asset Bundles to package all code and resources into a single deployable unit, with GitHub Actions handling CI/CD deployment to the target production Workspace.

## Monitoring, Metrics, and Continuous Improvement

The operational monitoring layer demonstrates mature LLMOps practices beyond initial deployment. Logs captured from Lakebase are processed in a separate Lakeflow Job to surface key operational metrics including Daily Active Users and average response times, displayed in an AI/BI Dashboard.

Beyond basic operational metrics, the monitoring infrastructure enables product intelligence. Recent inputs and responses are surfaced for review, and another AI Function is applied to summarize inputs and responses into thematic analysis and gap identification. This creates a valuable feedback loop: understanding which customer stories are popular reveals both usage patterns and content gaps. For instance, they discovered particularly high interest in stories about Agent Bricks and Lakebase—two of Databricks' newest products—indicating areas where additional reference collection would be valuable.

The dashboard also includes static analysis of story quality across industries and content types, enabling stakeholders to understand the distribution and strength of their reference portfolio. This kind of metadata-driven analytics represents an often-overlooked aspect of production LLM systems: using application data to drive business intelligence and content strategy.

## LLMOps Learnings and Organizational Insights

Several key LLMOps insights emerge from the case study. First, the team explicitly notes that while multiple groups had independently solved pieces of the problem by focusing on the AI layer, data engineering remained core to success. Proper ETL design, quality scoring, and data structuring for effective retrieval proved just as critical as the agent itself. This reflects a common pattern in production LLM systems: the "boring" data work often determines success or failure more than algorithmic sophistication.

Second, organizational collaboration proved essential. Customer stories touch Sales, Marketing, Field Engineering, and PR—building partnerships with these stakeholders shaped both the product design and the data that powers it. This cross-functional dimension is characteristic of successful enterprise LLMOps initiatives, where technical excellence must align with diverse organizational needs.

Third, the team's technology choices reflect pragmatic engineering: DSPy for faster iteration, CPU-based deployment for cost efficiency, hybrid search for performance and accuracy, React for modern UX with streaming support. These decisions balance developer productivity, user experience, and operational cost—key dimensions of sustainable LLMOps at scale.

## Future Directions and Platform Integration

Looking forward, Databricks plans to evolve Reffy from a standalone application to a platform capability. They intend to expose an API and MCP (Model Context Protocol) server, enabling other teams to access customer intelligence directly within their existing workflows and tools. This evolution from application to service represents a maturation pattern common in successful internal LLM initiatives.

The large-scale usage data collected through Lakebase creates opportunities for continuous refinement based on real user behavior patterns across thousands of users over time. This data-driven improvement cycle—where production usage informs model and system refinement—exemplifies mature LLMOps practice.

The case study positions Reffy as both a solution to Databricks' internal challenge and a reference architecture for other teams building agentic applications. The comprehensive stack—from ETL through deployment and monitoring—provides a template spanning data engineering (Lakeflow Jobs), governance (Unity Catalog), storage (Delta Lake), retrieval (Vector Search with re-ranking), agent serving (Model Serving with Agent Framework), transactional data (Lakebase), and application delivery (Databricks Apps).

## Critical Assessment

While the case study demonstrates impressive technical breadth and real adoption metrics (1,800 users, 7,500 queries), it originates from Databricks' own marketing and naturally emphasizes their platform capabilities. Several areas warrant balanced consideration:

The 31-point quality scoring system using Gemini 2.5 represents a significant operational cost and potential failure mode. LLM-based evaluation at scale can be expensive, and quality/consistency of scoring across 2,400+ stories depends on prompt robustness and model behavior. The case study doesn't discuss accuracy validation of these quality scores or human-in-the-loop verification.

The hybrid search approach and re-ranking are mentioned but not detailed. Production RAG systems often require extensive tuning of retrieval parameters, chunking strategies, and re-ranking thresholds. The case study doesn't address how these were optimized or evaluated.

User satisfaction and accuracy metrics are notably absent. While DAU and query counts indicate adoption, they don't measure whether users find the right stories or whether the agent's responses are accurate and helpful. Production LLMOps typically requires evaluation frameworks for relevance, accuracy, and user satisfaction.

The system's reliance on multiple Databricks-specific services (Unity Catalog, Vector Search, Lakebase, Databricks Apps) creates platform lock-in. While this is reasonable for an internal tool, it limits generalizability of the architecture.

Cost metrics beyond infrastructure (CPU vs GPU) aren't discussed. The operational cost of running Gemini 2.5 for both quality scoring and query serving at scale with 1,800 users could be substantial.

That said, the case study demonstrates genuine production deployment with real adoption and thoughtful engineering across the full LLMOps lifecycle—from data quality to deployment to monitoring. The emphasis on data engineering, the pragmatic technology choices, and the continuous improvement mindset reflect mature practices worth learning from.
