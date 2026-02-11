---
title: "Multimodal RAG Architecture Optimization for Production"
slug: "multimodal-rag-architecture-optimization-for-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67d81d25583579f0637876e5"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:03:27.924Z"
  createdOn: "2025-03-17T13:01:25.632Z"
llmopsTags:
  - "multi-modality"
  - "unstructured-data"
  - "structured-output"
  - "question-answering"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "embeddings"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "fastapi"
  - "chromadb"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "documentation"
  - "microsoft-azure"
  - "openai"
industryTags: "tech"
company: "Microsoft"
summary: "Microsoft explored optimizing a production Retrieval-Augmented Generation (RAG) system that incorporates both text and image content to answer domain-specific queries. The team conducted extensive experiments on various aspects of the system including prompt engineering, metadata inclusion, chunk structure, image enrichment strategies, and model selection. Key improvements came from using separate image chunks, implementing a classifier for image relevance, and utilizing GPT-4V for enrichment while using GPT-4o for inference. The resulting system achieved better search precision and more relevant LLM-generated responses while maintaining cost efficiency."
link: "https://devblogs.microsoft.com/ise/multimodal-rag-with-vision/"
year: 2024
seo:
  title: "Microsoft: Multimodal RAG Architecture Optimization for Production - ZenML LLMOps Database"
  description: "Microsoft explored optimizing a production Retrieval-Augmented Generation (RAG) system that incorporates both text and image content to answer domain-specific queries. The team conducted extensive experiments on various aspects of the system including prompt engineering, metadata inclusion, chunk structure, image enrichment strategies, and model selection. Key improvements came from using separate image chunks, implementing a classifier for image relevance, and utilizing GPT-4V for enrichment while using GPT-4o for inference. The resulting system achieved better search precision and more relevant LLM-generated responses while maintaining cost efficiency."
  canonical: "https://www.zenml.io/llmops-database/multimodal-rag-architecture-optimization-for-production"
  ogTitle: "Microsoft: Multimodal RAG Architecture Optimization for Production - ZenML LLMOps Database"
  ogDescription: "Microsoft explored optimizing a production Retrieval-Augmented Generation (RAG) system that incorporates both text and image content to answer domain-specific queries. The team conducted extensive experiments on various aspects of the system including prompt engineering, metadata inclusion, chunk structure, image enrichment strategies, and model selection. Key improvements came from using separate image chunks, implementing a classifier for image relevance, and utilizing GPT-4V for enrichment while using GPT-4o for inference. The resulting system achieved better search precision and more relevant LLM-generated responses while maintaining cost efficiency."
---

## Overview

This case study from Microsoft's ISE (Industry Solutions Engineering) team documents a comprehensive exploration of multimodal Retrieval-Augmented Generation (RAG) pipelines, specifically focusing on how to effectively handle enterprise documents that contain both textual and image content. The work was conducted as part of a customer engagement where the goal was to enable technicians to query a document store containing technical documentation with photographs, diagrams, and screenshots, and receive accurate, grounded answers from an LLM.

The fundamental challenge addressed is that traditional RAG pipelines are designed for text-only retrieval, but many enterprise documents contain critical information embedded in images. The team's approach was to use multimodal LLMs (specifically GPT-4V and GPT-4o) to transform image content into detailed textual descriptions during the ingestion phase, enabling unified storage and retrieval of both text and image-derived content in Azure AI Search.

## Architecture and Pipeline Design

The solution architecture consists of three main flows: ingestion, enrichment (as a sub-process of ingestion), and inference.

### Ingestion Flow

The ingestion pipeline extracts both text and image data from source documents using a custom loader. The team explicitly chose not to use multimodal embeddings like CLIP due to their limitations in capturing detailed visual information—most CLIP models have a maximum of 70-77 words and provide only generic insights about objects and shapes rather than detailed explanations. Instead, they opted to leverage multimodal LLMs to generate comprehensive textual descriptions of images, which are then embedded using the same text embedding approach as the document content.

### Enrichment Flow

The enrichment service is a configurable subcomponent that processes images extracted from documents. A key optimization involves using Azure Computer Vision Image Analysis for image tagging to filter out irrelevant images before sending them to the expensive multimodal LLM for description generation. Images classified as logos (based on configurable confidence thresholds) or containing no text are excluded from detailed description generation—only the image URL reference is retained. This classification logic was specifically tailored to the customer's document types and typical image patterns, demonstrating the importance of domain-specific customization in production LLMOps.

The team also implemented a caching mechanism to reduce redundant API calls and improve cost efficiency during batch ingestion.

### Inference Flow

During inference, user queries are processed through Azure AI Search to retrieve relevant chunks, which can optionally undergo semantic reranking. The retrieved chunks, containing both original text and image descriptions, are passed as context to an Azure OpenAI LLM to generate grounded responses with citations.

## Experimentation Methodology

A particularly valuable aspect of this case study is the rigorous experimentation framework the team developed. They followed a systematic approach of testing different configurations by adjusting one variable at a time against a predefined baseline, using both retrieval metrics and generative metrics for evaluation.

### Evaluation Dataset Design

The team curated a diverse Q&A evaluation dataset with balanced coverage across three query types: text-only questions, image-only questions, and questions requiring both text and image information. They performed Exploratory Data Analysis (EDA) to extract features such as article length, table characteristics, image type, resolution, and counts, then distributed evaluation questions across these features to achieve comprehensive representation.

### Metrics Framework

The evaluation framework includes detailed retrieval metrics (source recall@k, image recall@k, image precision@k, search latency) and generative metrics (cited image recall/precision/F1, GPT correctness scores, token usage, end-to-end response time). This separation allows the team to understand the impact of changes on each component independently—a best practice for production LLMOps.

## Key Experimental Findings

### Prompt Engineering

The team developed specialized prompts for both ingestion and inference. The image enrichment prompt was tailored based on thorough analysis of source image categories, with specific instructions for handling bubble tips, equipment diagrams, tables, device images, screenshots, and general images. This domain-specific prompt engineering significantly improved the quality and relevance of generated descriptions.

For inference, they developed prompts that instruct the LLM to return responses in JSON format with explicit image citations, enabling systematic measurement of citation accuracy. They noted challenges with consistent JSON parsing, which could be addressed using OpenAI's Structured Outputs feature.

### Metadata Integration

Experiments demonstrated that including document-level metadata (titles, authors, dates, summaries, keywords) in the search index resulted in statistically significant improvements in source recall performance. This metadata was incorporated into Azure AI Search's semantic ranking configuration to further enhance retrieval relevance.

### Chunk Structure: Inline vs. Separate Image Chunks

A critical architectural decision was whether to store image descriptions inline within text chunks or as separate chunks with only URL references in the main text. Experiments showed that separate chunks for image annotations resulted in notable statistical improvements in both source document and image retrieval metrics, particularly for vision-related queries. There was no degradation in search latency. The team also tested storing image annotations as chunk metadata, but this did not yield statistically significant improvements.

### Classifier Threshold Optimization

The image classification layer significantly optimized the ingestion process. By filtering out less informative images (logos, abstract visuals), the team achieved statistically similar retrieval results while reducing ingestion time by 30-50%. At a confidence threshold of 0.8, the classifier effectively filtered non-essential images without compromising recall—a practical balance between cost/latency and quality.

### Surrounding Text Context

The team explored whether including surrounding document text (text before and after an image) in the enrichment prompt would improve image descriptions and subsequently retrieval quality. While the quality of descriptions improved (e.g., correctly identifying application names from context), the impact on retrieval metrics was limited due to content redundancy—the surrounding text often repeated information already visible in images. This finding highlights the importance of evaluating improvements against actual retrieval and generation metrics rather than relying solely on qualitative assessment.

### Inference-Time Multimodal Processing

The team compared enrichment at ingestion time versus enrichment at inference time (sending raw image bytes to a multimodal LLM during query processing). Skipping ingestion-time enrichment resulted in declined retrieval metrics, confirming that pre-processing images into descriptions is essential for effective retrieval. Combining both approaches showed improved correctness scores but added approximately 6 seconds of latency, which was deemed unjustified when valid images were already being retrieved through the enriched pipeline.

### Model Selection

Extensive experiments compared different GPT models for both enrichment and inference:

**For Inference:** GPT-4 (32K context) significantly outperformed GPT-3.5 (16K context) in image citation accuracy and correctness scores. GPT-4o (128K context) further improved image citation recall and correctness while reducing costs by over 6x compared to GPT-4-32k and improving latency. GPT-4o provided more detailed responses with inline URL references, sometimes with more citations than strictly necessary.

**For Enrichment:** GPT-4V (vision-preview) outperformed GPT-4o for generating image summaries, resulting in better recall metrics. The team's final recommendation was to use GPT-4V for enrichment and GPT-4o for inference, leveraging the respective strengths of each model.

## Production Considerations

The case study highlights several important LLMOps practices for production systems:

- **Configurable experimentation framework:** The team built infrastructure to run experiments and persist results for shared analysis, enabling systematic optimization.
- **Domain-specific customization:** Prompts, classifiers, and chunk structures were tailored to the specific document types and user query patterns of the customer.
- **Cost-latency-quality tradeoffs:** Multiple decisions (classifier thresholds, model selection, caching) explicitly balanced these three dimensions.
- **Iterative improvement:** The team emphasizes that production solutions require ongoing refinement based on real user feedback and evolving technologies.

## Limitations and Caveats

The authors appropriately note that their conclusions are based on a setup tailored to a specific customer scenario and encourage readers to conduct their own experiments. The offline pre-processing approach relies solely on prompt instructions and cannot anticipate every detail a user might ask about—sometimes real-time, context-aware image processing may be necessary. The evaluation dataset was relatively small, though diverse with edge cases. These honest acknowledgments of limitations add credibility to the case study.

## Resources and Reproducibility

The team published a GitHub repository (Azure-Samples) with starter code and evaluation flows for similar vision-based RAG use cases, demonstrating a commitment to enabling reproducibility and community learning. The repository includes an application framework for Python-based RAG pipelines that can utilize both textual and image content from MHTML documents.