---
title: "RAG-Based System for Climate Finance Document Analysis"
slug: "rag-based-system-for-climate-finance-document-analysis"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68091e3e60a8bf554d56cdd0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:06:34.079Z"
  createdOn: "2025-04-23T17:07:10.748Z"
llmopsTags:
  - "document-processing"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "structured-output"
  - "rag"
  - "fine-tuning"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "human-in-the-loop"
  - "few-shot"
  - "error-handling"
  - "chunking"
  - "postgresql"
  - "fastapi"
  - "monitoring"
  - "databases"
  - "openai"
  - "microsoft-azure"
industryTags: "finance"
company: "ClimateAligned"
summary: "ClimateAligned, an early-stage startup, developed a RAG-based system to analyze climate-related financial documents and assess their \"greenness.\" Starting with a small team of 2-3 engineers, they built a solution that combines LLMs, hybrid search, and human-in-the-loop processes to achieve 99% accuracy in document analysis. The system reduced analysis time from 2 hours to 20 minutes per company, even with human verification, and successfully evolved from a proof-of-concept to serving their first users while maintaining high accuracy standards."
link: "https://www.infoq.com/presentations/rag-llm/"
year: 2023
seo:
  title: "ClimateAligned: RAG-Based System for Climate Finance Document Analysis - ZenML LLMOps Database"
  description: "ClimateAligned, an early-stage startup, developed a RAG-based system to analyze climate-related financial documents and assess their \"greenness.\" Starting with a small team of 2-3 engineers, they built a solution that combines LLMs, hybrid search, and human-in-the-loop processes to achieve 99% accuracy in document analysis. The system reduced analysis time from 2 hours to 20 minutes per company, even with human verification, and successfully evolved from a proof-of-concept to serving their first users while maintaining high accuracy standards."
  canonical: "https://www.zenml.io/llmops-database/rag-based-system-for-climate-finance-document-analysis"
  ogTitle: "ClimateAligned: RAG-Based System for Climate Finance Document Analysis - ZenML LLMOps Database"
  ogDescription: "ClimateAligned, an early-stage startup, developed a RAG-based system to analyze climate-related financial documents and assess their \"greenness.\" Starting with a small team of 2-3 engineers, they built a solution that combines LLMs, hybrid search, and human-in-the-loop processes to achieve 99% accuracy in document analysis. The system reduced analysis time from 2 hours to 20 minutes per company, even with human verification, and successfully evolved from a proof-of-concept to serving their first users while maintaining high accuracy standards."
---

## Overview

ClimateAligned is an early-stage startup focused on climate finance, specifically helping large financial institutions determine whether investment opportunities align with climate goals. The speaker, Leo Browning, was the first engineering hire and describes approximately nine months to a year of technical development with a very small team—growing from himself to three engineers total within a 10-person company. The core challenge they address is answering the question "how green is green?" for financial instruments, a task traditionally performed manually by expert analysts requiring approximately 2 hours per company assessment.

The case study is particularly valuable for understanding how to build production LLM systems with limited resources, emphasizing that successful LLMOps doesn't necessarily require large teams, massive compute budgets, or enormous datasets from the outset.

## Problem Context and Constraints

The startup operates in a highly constrained environment with approximately 18 months of runway to prove initial value while demonstrating scalability. Their target customers are major financial institutions managing significant portions of global capital—organizations that need to direct "GDP scale money" toward climate initiatives but require credible information to make sound investment decisions.

The core technical problem involves processing unstructured corporate documentation (primarily PDFs) to answer structured sets of questions about companies' climate-related financial activities. These documents vary wildly in format across companies and even within the same company year-over-year, making traditional structured data approaches impractical. The scale of the problem is substantial—approximately 60,000 companies produce relevant data multiple times per year.

Given the financial context, accuracy and auditability are paramount concerns. Users need not only correct answers but also verifiable sources, making RAG (Retrieval Augmented Generation) an ideal technical approach because source attribution is inherent to the methodology.

## Technical Architecture and Initial Approach

The system runs on a Python stack using PostgreSQL for data storage and initially relied entirely on OpenAI's GPT-4 for LLM capabilities. The RAG implementation uses hybrid search combining vector similarity search with BM25 keyword search, with results combined using Reciprocal Rank Fusion (RRF) for reranking. This hybrid approach proved to be the single largest contributor to accuracy improvements, taking them from the 30-60% accuracy range typical of out-of-the-box RAG systems to 85% accuracy.

The speaker emphasizes that improving search quality should be the first optimization focus for anyone building RAG systems, particularly when domain knowledge can be injected to narrow the search space. When you understand your problem domain, you can add heuristics and rules that dramatically improve retrieval quality before the LLM ever sees the sources.

The document consumption and management pipeline is handled in-house, though not discussed in detail. The output is presented in a structured hierarchical format showing questions, answers, and—critically—the source citations that support each answer.

## Human-in-the-Loop as a Core Strategy

One of the most valuable aspects of this case study is the thoughtful approach to human-in-the-loop systems. Rather than viewing human review as a temporary crutch to be eliminated as quickly as possible, ClimateAligned treats it as a strategic advantage, particularly during the early stages of development.

Their domain expert analyst (Prashant) achieves approximately 99% accuracy on these assessments—a benchmark that reflects both the difficulty of the problem (some questions involve genuine gray areas) and the level of trust users have in human judgment. Even with the underlying model achieving only 85% accuracy, placing human review between model outputs and production means the actual product maintains that 99% accuracy standard.

The productivity gain is substantial even with full human review: assessment time dropped from 2 hours to approximately 20 minutes per company. The analyst receives proposed answers with sources already identified, so most of the time is spent confirming correct answers rather than hunting for information.

This approach also creates a data flywheel. Every reviewed answer becomes part of a labeled dataset of correct and incorrect examples. The speaker identifies key dataset size thresholds: around 500 examples enables validation testing and few-shot learning experiments, while 10,000 examples (their current scale) opens the door to model fine-tuning.

## Scaling Beyond Full Human Review

With sufficient labeled data, ClimateAligned built a classifier to flag which model outputs require human review and which can proceed directly to production. This isn't improving the core LLM's accuracy (still 85%) but rather adding a layer that routes only uncertain or potentially incorrect outputs to human reviewers. This achieved roughly another order of magnitude improvement in throughput while maintaining production accuracy standards.

The key insight here is that the overall system accuracy and the core model accuracy are different metrics. You can build a highly accurate production system around a moderately accurate model by adding appropriate review, validation, and routing mechanisms.

## Challenges and Current Work

The speaker is transparent about ongoing challenges and areas for improvement. Document context remains a significant issue—when chunking documents into approximately half-page segments for retrieval, important contextual information about where that chunk appears in the document structure is lost. A chunk discussing how one *might* assess a company looks linguistically similar to a chunk describing how a company *is actually* assessed. Without knowing the surrounding context (e.g., "this appears in a methodology section describing hypothetical scenarios"), the model can be misled.

Topic-based ranking is being developed to address this, using the labeled dataset to train classifiers that can identify what topics each document chunk relates to. Early results show promise but also highlight the context problem—the model correctly identifies relevant language but may not recognize when that language is being used in an irrelevant context (like methodology descriptions rather than actual assessments).

## Moving Away from GPT-4

A significant focus of current and future work involves reducing dependence on OpenAI's GPT-4 API. The speaker candidly describes these APIs as "the slowest and most unreliable" compared to typical API services, acknowledging this isn't a criticism of OpenAI specifically but rather reflects the enormous technical challenge of serving such large models at scale.

The phrase "GPT-4 is king, but you don't get the king to do the dishes" captures the philosophy: general-purpose frontier models are excellent for proving initial value and handling complex tasks, but as understanding of the specific problem domain deepens, there are opportunities to use smaller, potentially fine-tuned models for specific sub-tasks.

The team is exploring topic or document-type-based model splitting, where different models (potentially fine-tuned on specific document types or question categories) handle different aspects of the pipeline. The analogy to code-specific fine-tuning is apt—while general models can process code, models fine-tuned on specific programming languages or domains consistently outperform them on those narrow tasks.

Open-source models are explicitly mentioned as a path forward, offering higher control despite increased engineering setup costs. The speaker sees this as an appropriate trade-off once past the initial validation stage.

## Broader LLMOps Lessons

Several generalizable lessons emerge from this case study:

The importance of starting with the best available tools (GPT-4) to validate that a problem is tractable before investing in custom solutions. "You don't want to over-engineer yourself into building a lot of in-house custom models right out the gate."

The value of domain expertise as a competitive moat. General-purpose RAG solutions exist, but they consistently underperform compared to domain-specific implementations that encode expert knowledge into search heuristics, document processing logic, and evaluation criteria.

The flywheel between human review and automated systems—human review generates labeled data, labeled data enables classifiers and fine-tuning, improved automation frees humans to review edge cases and generate more high-quality labels.

The distinction between model accuracy and system accuracy. A production system can maintain high accuracy with a moderately accurate core model through appropriate validation, routing, and review mechanisms.

The speaker's concluding note about open-sourcing is pragmatic: core domain-specific heuristics are unlikely to be released given their competitive value, but contributions to general-purpose components and potentially fine-tuned models are more likely paths for community engagement.

## Results and Current State

After approximately one year of development, ClimateAligned has a first user on their platform with aspirations for significant growth. Key metrics include:

- Core RAG model accuracy: 85%
- Production data accuracy: 99% (maintained through human-in-the-loop)
- Assessment time reduction: From 2 hours to 20 minutes per company (with full human review)
- Further throughput gains: Approximately 10x improvement from automated review flagging
- Dataset scale: 10,000 labeled examples enabling fine-tuning experiments
- Team size: 3 technical staff within a 10-person company

The system handles structured question-answering across hierarchical question sets for assessing climate finance instruments, with plans to expand across historical data, different financial instrument types, and various industries.