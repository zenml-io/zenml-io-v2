---
title: "LLM Production Case Studies: Consulting Database Search, Automotive Showroom Assistant, and Banking Development Tools"
slug: "llm-production-case-studies-consulting-database-search-automotive-showroom-assistant-and-banking-development-tools"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ba49ec4defbed05ccdc"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:39:41.902Z"
  createdOn: "2024-11-21T13:54:44.243Z"
llmopsTags:
  - "chatbot"
  - "code-generation"
  - "compliance"
  - "databases"
  - "documentation"
  - "embeddings"
  - "error-handling"
  - "fallback-strategies"
  - "fine-tuning"
  - "guardrails"
  - "high-stakes-application"
  - "microsoft-azure"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "reliability"
  - "reranking"
  - "scalability"
  - "security"
  - "semantic-search"
  - "structured-output"
industryTags: "consulting"
company: "Globant"
summary: "A collection of LLM implementation case studies detailing challenges and solutions in various industries. Key cases include: a consulting firm's semantic search implementation for financial data, requiring careful handling of proprietary data and similarity definitions; an automotive company's showroom chatbot facing challenges with data consistency and hallucination control; and a bank's attempt to create a custom code copilot, highlighting the importance of clear requirements and technical understanding in LLM projects."
link: "https://www.youtube.com/watch?v=ATYXc6mmGo0"
year: 2023
seo:
  title: "Globant: LLM Production Case Studies: Consulting Database Search, Automotive Showroom Assistant, and Banking Development Tools - ZenML LLMOps Database"
  description: "A collection of LLM implementation case studies detailing challenges and solutions in various industries. Key cases include: a consulting firm's semantic search implementation for financial data, requiring careful handling of proprietary data and similarity definitions; an automotive company's showroom chatbot facing challenges with data consistency and hallucination control; and a bank's attempt to create a custom code copilot, highlighting the importance of clear requirements and technical understanding in LLM projects."
  canonical: "https://www.zenml.io/llmops-database/llm-production-case-studies-consulting-database-search-automotive-showroom-assistant-and-banking-development-tools"
  ogTitle: "Globant: LLM Production Case Studies: Consulting Database Search, Automotive Showroom Assistant, and Banking Development Tools - ZenML LLMOps Database"
  ogDescription: "A collection of LLM implementation case studies detailing challenges and solutions in various industries. Key cases include: a consulting firm's semantic search implementation for financial data, requiring careful handling of proprietary data and similarity definitions; an automotive company's showroom chatbot facing challenges with data consistency and hallucination control; and a bank's attempt to create a custom code copilot, highlighting the importance of clear requirements and technical understanding in LLM projects."
---

## Overview

This presentation from Globant, an AI services company with over 10 years of experience and 400+ projects, provides a candid look at five real-world LLMOps case studies where projects encountered significant challenges. The presenter emphasizes that despite extensive experience, any AI project can hit unexpected roadblocks, and the goal is to share lessons learned to help others avoid similar pitfalls. The case studies span consulting, automotive, banking, and enterprise platform development, offering valuable insights into the practical challenges of deploying LLMs in production environments.

The presentation takes a refreshingly honest approach, acknowledging that the hype cycles around generative AI often lead to unrealistic expectations and that many organizations adopt AI technologies without fully understanding what they're committing to. This sets the stage for practical lessons about managing expectations, challenging assumptions, and building robust production systems.

## Case Study 1: Financial Data Semantic Search for a Consulting Firm

The first case study involves a consulting firm with a massive proprietary database containing market caps, valuations, mergers and acquisitions data, and other financial information. The goal was to build a semantic search functionality that would allow analysts to "chat with their databases" and better understand markets and trades.

### Technical Constraints

The project faced severe constraints from the outset. The data was considered so proprietary and valuable that no copies or supplementary databases could be created outside the main system. Additionally, the existing database could not be modified since it represented the company's core monetizable asset. One of the key fields containing most company information was simply unstructured text within a SQL database structure.

### Core Problems

The fundamental issue was that "similarity" proved to be an ill-defined concept for this use case. For instance, searching for an "oil company" might return energy companies that deal with renewables, or vice versa, because vector embeddings treated these as semantically similar. The business culture had an extremely low tolerance for spurious retrieval results, meaning any mismatch between user expectations and returned results would generate complaints up to the CEO level.

Performance expectations were also demanding since users were accustomed to interacting with the database through a BI interface with quick response times. They also expected deterministic behavior where the same question asked on different days by different people should return identical results—something that conflicts with the inherently non-deterministic nature of LLMs.

### Workaround Implementation

The solution involved a hybrid approach using text-to-SQL for structured analytics queries while using an LLM to generate relevant keywords for the unstructured text field. Rather than relying on vector similarity for the free-text field, the system would use the LLM to determine which keywords might be relevant for a given query and then use traditional SQL LIKE queries with those keywords. After retrieving results, a lean LLM-based post-processing step would filter and rerank results row-by-row, though this had to be extremely efficient to meet response time requirements.

### Key Lessons

The presenter emphasized that most retrieval-augmented generation (RAG) systems require creating or modifying data sources to add metadata, representations, and relevance signals for end users. The case also demonstrated that business users often conflate related but distinct concepts like similarity, belonging, and hierarchical structure—a graph database might have been more appropriate than vector databases for capturing these relationships. Most importantly, the lesson for services companies is that it's better to challenge project assumptions and establish validation points early rather than trying to back-fix forced commitments later.

## Case Study 2: Automotive Showroom Conversational Interface

The second case study involves a car manufacturer wanting to create an immersive showroom experience with virtual reality elements and a conversational interface for product information, feature comparisons across models, and general product exploration.

### Project Setup and Constraints

This project was executed in partnership with a major cloud hyperscaler whose services the client was committed to using. The source documents describing products were non-canonical, meaning documentation differed across countries with no single "true" version. There were strict restrictions on forbidden information, particularly pricing (which varies by region, taxes, and promotions) and competitor brand mentions. The chatbot needed to embody brand identity and refuse off-topic requests politely.

### Critical Problems

The initial available model was a legacy version (pre-GPT-4, pre-Gemini 1.5, pre-Llama 3) that lacked the instruction-following robustness needed to enforce restrictions effectively. More critically, the internal cloud services' file search capability became an unexpected source of hallucinations. The file search system generated summaries using an internal LLM, and these summaries would introduce information not present in the source documents—including price information that had been explicitly removed from all source documents.

The cloud provider was perceived as prioritizing adoption of their services over optimal technical solutions, creating tension with the development team's preferred approaches. To make matters worse, stakeholders compared the restricted production system against unrestricted ChatGPT custom GPTs using single documents, creating unfair benchmarking expectations.

### Solution Approach

The team implemented a multi-layer LLM approach: retrieve documents, ignore the cloud provider's auto-generated summaries, use an LLM with extensive prompt engineering (step-by-step instructions, emphasis phrases like "this is very important") to generate clean summaries, then use those for detection, filtering, and ranking. Essentially, they created metadata on-the-fly to work around the problematic cloud services while still technically using required components.

### Lessons Learned

The critical lesson was that measuring at every stage is essential for debugging and blame assignment. Discovering that hallucinations originated in the retrieval stage rather than generation took considerable time because the assumption was that document retrieval shouldn't add information. Understanding failure points across the RAG pipeline—document relevance, ranking quality, generation factuality, tone compliance, instruction following, and input filtering—requires treating each as a separate concern rather than evaluating the system holistically.

The team also learned that sometimes antagonizing clients over fundamental issues like canonical data sources is necessary. When a car model was described as an "SUV" in documents but the client insisted it was a "Town Car," producing measurable evidence showing that responses matched source documents helped reframe the problem as a shared challenge rather than a development failure.

## Case Study 3: Information and Sales Assistance Platform

This case study from early 2023 involved building a conversational interface over industry reports, success cases, and trend analyses to improve internal knowledge access and help understand projects, possibilities, and potential problems.

### Technical Challenges

The project dealt with two fundamentally different document types: technical reports (structured, text-heavy, easier to parse and retrieve) and success cases (keyword-heavy, image-rich, difficult to parse with 2023-era visual models). The success case format was not under the team's control, and determining which sources were relevant for a given query was non-trivial since queries often lacked sufficient context for source selection. Additionally, measuring "effectiveness" for helping someone understand a market proved difficult to define concretely.

### Hybrid Architecture Solution

The solution recognized that different document types required different approaches. For structured technical reports, traditional embeddings plus vector database approaches worked well. For success cases and past experiences, the team found better results with structured recovery using a SQL database, pre-structuring documents rather than relying solely on vector search.

The team also implemented what are now called "agentic workflows"—iterative processes involving back-and-forth LLM interactions, retries, corrections, and reflection mechanisms to improve response quality. The presenter notes these were implemented ad-hoc in early 2023 before frameworks formalized these patterns.

### Key Insights

The fundamental lesson is that not everything should default to "embeddings plus vector database"—the use case matters significantly. Evaluation frameworks are essential, and in most cases, the engineering work around data access, file processing, and information pipeline management represents the hardest part. LLMs can improve quality up to a point, but without solid data infrastructure, everything else will fail.

## Case Study 4: Custom Code Copilot for International Bank

An international bank wanted to build a customized code assistant, inspired by GitHub Copilot, to improve developer productivity. The project was constrained to use GPT-3.5 (GPT-4 being too expensive) and the client was fixated on fine-tuning as a keyword without understanding its implications or expected benefits.

### Fundamental Issues

Nobody had defined what a "good outcome" looked like for the POC, and productivity improvement expectations were set without established measurement frameworks. The client's awareness was at the buzzword level—knowing terms like "fine-tuning" without understanding technical requirements or realistic benefits. After two months of development, the client decided to bring in an AI expert, indicating misaligned expectations from the start.

### Resolution Approach

The workaround involved using LLMs as middleware to compensate for various process gaps, generating metadata and supplementary information to bridge capability gaps. However, the main lesson was about project management rather than technology: sometimes the reputational risk of delivering a poor outcome outweighs the relational risk of pushing back on clients. The presenter advocates for saying "no" when necessary, as accepting unrealistic commitments leads to worse outcomes than initial friction.

## Case Study 5: GenAI Accelerator Platform

The final case study involves building an internal platform to accelerate GenAI application development by connecting various data sources and enabling faster experimentation.

### Core Challenges

The main problems were organizational rather than purely technical. Teams were eager to adopt the latest technologies, leading to constant rewrites and backtracking without a clear roadmap. The presenter emphasizes a critical warning about benchmarks: they are often "fake" in the sense that they can be gamed and optimized for, and following them blindly leads to poor real-world performance. The lesson is to avoid making technology decisions based solely on benchmark numbers without understanding the specific use case requirements.

## Cross-Cutting Themes

Several themes emerge across all five case studies:

**Stage-by-Stage Evaluation**: Rather than treating RAG or LLM systems as monolithic black boxes, teams should measure and evaluate each stage independently—retrieval quality, ranking accuracy, generation factuality, tone compliance, and instruction following.

**Challenging Assumptions Early**: The presenter repeatedly emphasizes that services companies must be willing to push back on client assumptions, unrealistic constraints, and poorly defined success criteria rather than inheriting technical debt from flawed POC commitments.

**LLMs as Middleware**: A recurring pattern involves using LLMs to generate metadata, filter results, and compensate for limitations in other system components. This "LLM on LLM" approach adds latency and cost but often proves necessary for production quality.

**Data Quality as Foundation**: Multiple cases highlight that without proper data access, canonical sources, and well-structured information pipelines, LLM capabilities cannot compensate for fundamental data problems.

**Appropriate Technology Selection**: Not every problem benefits from vector databases and embeddings; SQL databases, graph structures, and traditional search may be more appropriate depending on the use case and data characteristics.

The presentation provides a valuable counterweight to the hype around generative AI, offering practical wisdom from real production deployments that encountered significant challenges and required creative solutions to deliver value.