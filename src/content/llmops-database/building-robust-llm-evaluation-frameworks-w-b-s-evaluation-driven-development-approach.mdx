---
title: "Building Robust LLM Evaluation Frameworks: W&B's Evaluation-Driven Development Approach"
slug: "building-robust-llm-evaluation-frameworks-w-b-s-evaluation-driven-development-approach"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f414b8602e2457898f817"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:37:39.770Z"
  createdOn: "2024-11-21T14:18:51.700Z"
llmopsTags:
  - "argilla"
  - "cohere"
  - "document-processing"
  - "documentation"
  - "embeddings"
  - "few-shot"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "reliability"
  - "reranking"
  - "semantic-search"
  - "wandb"
industryTags: "tech"
company: "Weights & Biases"
summary: "Weights & Biases details their evaluation-driven development approach in upgrading Wandbot to version 1.1, showcasing how systematic evaluation can guide LLM application improvements. The case study describes the development of a sophisticated auto-evaluation framework aligned with human annotations, implementing comprehensive metrics across response quality and context assessment. Key improvements include enhanced data ingestion with better MarkdownX parsing, a query enhancement system using Cohere for language detection and intent classification, and a hybrid retrieval system combining FAISS, BM25, and web knowledge integration. The new version demonstrated significant improvements across multiple metrics, with GPT-4-1106-preview-v1.1 showing superior performance in answer correctness, relevancy, and context recall compared to previous versions."
link: "https://wandb.ai/wandbot/wandbot_public/reports/Evaluation-Driven-Development-Improving-WandBot-our-LLM-Powered-Documentation-App--Vmlldzo2NTY1MDI0"
year: 2024
seo:
  title: "Weights & Biases: Building Robust LLM Evaluation Frameworks: W&B's Evaluation-Driven Development Approach - ZenML LLMOps Database"
  description: "Weights & Biases details their evaluation-driven development approach in upgrading Wandbot to version 1.1, showcasing how systematic evaluation can guide LLM application improvements. The case study describes the development of a sophisticated auto-evaluation framework aligned with human annotations, implementing comprehensive metrics across response quality and context assessment. Key improvements include enhanced data ingestion with better MarkdownX parsing, a query enhancement system using Cohere for language detection and intent classification, and a hybrid retrieval system combining FAISS, BM25, and web knowledge integration. The new version demonstrated significant improvements across multiple metrics, with GPT-4-1106-preview-v1.1 showing superior performance in answer correctness, relevancy, and context recall compared to previous versions."
  canonical: "https://www.zenml.io/llmops-database/building-robust-llm-evaluation-frameworks-w-b-s-evaluation-driven-development-approach"
  ogTitle: "Weights & Biases: Building Robust LLM Evaluation Frameworks: W&B's Evaluation-Driven Development Approach - ZenML LLMOps Database"
  ogDescription: "Weights & Biases details their evaluation-driven development approach in upgrading Wandbot to version 1.1, showcasing how systematic evaluation can guide LLM application improvements. The case study describes the development of a sophisticated auto-evaluation framework aligned with human annotations, implementing comprehensive metrics across response quality and context assessment. Key improvements include enhanced data ingestion with better MarkdownX parsing, a query enhancement system using Cohere for language detection and intent classification, and a hybrid retrieval system combining FAISS, BM25, and web knowledge integration. The new version demonstrated significant improvements across multiple metrics, with GPT-4-1106-preview-v1.1 showing superior performance in answer correctness, relevancy, and context recall compared to previous versions."
---

## Overview

Weights & Biases (W&B) developed Wandbot, an LLM-powered documentation assistant designed to help users answer questions about the W&B platform, ranging from documentation queries to debugging code issues. This case study documents the journey from Wandbot v1.0 to v1.1, emphasizing an evaluation-driven development approach that prioritized rigorous testing and measurement to guide improvements in their RAG (Retrieval-Augmented Generation) pipeline.

The team had previously brought Wandbot into production and documented their initial learnings. However, they recognized that continuous improvement required a systematic approach to evaluation that could scale beyond manual annotation efforts. The core challenge was creating an automated evaluation framework that aligned with human judgment while enabling rapid iteration on pipeline components.

## The Evaluation Challenge

A fundamental problem the team encountered was the misalignment between automated evaluations and manual human annotations. Initially, they relied on default prompts for evaluating Correctness, Faithfulness, and Relevance, but these did not correlate well with human assessments. Manual evaluations, while more accurate, were time-consuming and tedious, making them impractical for iterative development cycles.

The team needed a way to bridge this gap—creating an auto-evaluation system that could provide reliable feedback without requiring repeated manual assessments for every change to the pipeline.

## Building the Auto-Evaluation Framework

The solution involved constructing a GPT-4 powered evaluation framework that was carefully aligned with human annotations. The process began with cleaning up existing manual evaluation datasets using Argilla, an open-source data annotation platform. This allowed them to curate and refine their ground truth data.

The team created a custom evaluation prompt that instructed GPT-4 to act as a W&B support expert, evaluating answers for correctness, relevance, and faithfulness to the source documents. The prompt explicitly required the model to validate code snippets and ensure they would run without errors—a crucial consideration for a technical documentation assistant.

To improve alignment with human judgment, the team implemented few-shot prompting by sampling correct and incorrect examples from their annotated datasets. These examples were incorporated into the evaluation prompts to guide GPT-4's scoring behavior. The annotations were ingested into Argilla with both user annotations and GPT-4 annotations (as suggestions), enabling the team to identify and eliminate ambiguities and inaccuracies.

The resulting evaluation dataset contained 98 Question-Answer pairs that served as reference answers for the auto-evaluation system. This careful curation process ensured that the automated evaluations would be meaningful and actionable.

## Evaluation Metrics

The framework evaluated responses across multiple dimensions, divided into response-level and context-level metrics:

Response metrics included Answer Correctness (whether the generated answer is correct compared to reference and thoroughly answers the query), Answer Factfulness (whether the answer is factually consistent with the context document), and Answer Similarity (semantic resemblance between generated and ground truth answers).

Context metrics included Context Precision (whether ground-truth relevant items are ranked higher in retrieved contexts) and Context Recall (how well retrieved context aligns with the annotated answer).

The team sub-classed and customized the CorrectnessEvaluator class from LlamaIndex to compute Answer Correctness, Relevancy, and Factfulness. They also used RAGAS (Retrieval Augmented Generation Assessment) for computing additional metrics like Answer Similarity, Context Precision, and Recall. This multi-framework approach provided comprehensive coverage of the pipeline's performance.

The scoring system used an ordinal scale where 1 indicated incorrect/unfaithful/irrelevant, 2 indicated ambiguous, and 3 indicated correct/faithful/relevant. This ordinal approach allowed for nuanced assessment while maintaining interpretability.

## Pipeline Enhancements

### Data Ingestion Improvements

During manual annotation, the team discovered issues with retrieved contexts stemming from incorrect data parsing. The default MarkdownNodeParser in LlamaIndex did not handle Docusaurus-specific MarkdownX features well, including JavaScript components, plugins, Tabs, Frontmatter, and Admonitions. This resulted in context chunks that were either too short or too long for effective retrieval.

The team fixed these parsing issues by handling these artifacts before passing documents to the parser, ensuring more consistent and appropriately-sized chunks for the vector store.

Additionally, the team identified queries during annotation that Wandbot could have answered correctly if the relevant documents had been included in the index. For example, a query about logging named entity recognition values couldn't be answered properly, even though a Fully Connected report existed that addressed exactly this topic. This prompted an expansion of the knowledge base to include Fully Connected Reports, Weave Examples, and W&B SDK Tests, providing more diverse sources for retrieval.

### Query Enhancement Stage

A significant addition to the RAG pipeline was a Query Enhancement Stage designed to make queries more concise, contextually relevant, and free from extraneous information.

The enhancer first uses string manipulation and regex to remove bot and user mentions. Cohere's language detection API was incorporated to detect query language and enable multilingual support. The team also fine-tuned a Cohere classification model to classify queries and detect user intent through multi-label classification.

The Instructor library was used to identify user intent and enhance queries with keywords and sub-queries. These enhancements were injected into the system prompt and used during retrieval to provide hints to the model during response synthesis. This structured approach to query understanding represents a sophisticated pre-processing layer that significantly improves the quality of downstream retrieval and generation.

### Hybrid Retriever Architecture

The team observed during annotation that retrieval performance was suboptimal and had room for improvement. They also noticed that some queries, particularly those related to code troubleshooting and sales, required knowledge from outside their documentation knowledge base.

To address this, they incorporated the you.com API to retrieve AI snippets from the web. A custom retriever was built that fetched relevant snippets from you.com's web-search API and added them to retrieval results alongside the internal knowledge base.

The team also added a BM25Retriever from LlamaIndex that uses BM25Okapi for keyword-based retrieval, leveraging keywords generated during the query enhancement stage.

The final hybrid retriever combined three retrieval strategies: FAISS Vectorstore for semantic similarity search, BM25 for keyword-based retrieval, and you.com for web search. A metadata filtering post-processor was added to further refine results. The retrieval-related implementations were modularized into a separate retriever module to improve maintainability and code quality.

## Comparative Analysis and Results

The team conducted comparative evaluations across four model configurations: gpt-3.5-turbo-16k-0613, gpt-4-0613, gpt-4-1106-preview, and gpt-4-1106-preview-v1.1 (the new pipeline version).

The v1.1 pipeline with gpt-4-1106-preview generally outperformed other configurations across most metrics. Notably, gpt-3.5-turbo-16k-0613 lagged behind, particularly in Answer Correctness and Answer Relevancy, highlighting the performance gap between GPT-3.5 and GPT-4 class models for this use case.

The metric analysis revealed that the v1.1 version excelled in Answer Correctness, which the team identified as critical for practical utility. Interestingly, Answer Faithfulness showed tighter grouping across models, suggesting that even earlier models like gpt-3.5-turbo could perform comparably in ensuring answers aligned with provided context.

For context understanding, the v1.1 pipeline showed superiority in Context Recall, indicating improved ability to retrieve relevant contexts for answering queries. This improvement was attributed to the hybrid retrieval approach and expanded knowledge base.

## Key LLMOps Takeaways

This case study demonstrates several important LLMOps practices. First, the emphasis on evaluation-driven development shows how rigorous testing frameworks can guide design decisions and validate improvements. The alignment of automated evaluations with human judgment through few-shot prompting and careful dataset curation is a practical approach that other teams can adopt.

Second, the hybrid retrieval architecture illustrates the value of combining multiple retrieval strategies (semantic, keyword-based, and web search) to handle diverse query types. This is particularly relevant for production systems that must handle real-world query variety.

Third, the attention to data quality—both in terms of parsing improvements and knowledge base expansion—highlights that RAG performance is often constrained by the underlying data as much as by the model architecture.

Finally, the modularization of pipeline components (query enhancement, retrieval, evaluation) demonstrates good software engineering practices that facilitate iterative improvement and maintenance of production LLM systems.

It's worth noting that while the results show clear improvements, the evaluation was conducted on a relatively small dataset of 98 Question-Answer pairs. Broader production validation would be needed to confirm these improvements generalize across the full range of user queries.