---
title: "OmniReader"
slug: "omnireader"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67f66f568c859106184bf513"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T08:34:18.968Z"
  lastUpdated: "2025-08-26T08:34:06.713Z"
  createdOn: "2025-04-09T13:00:06.106Z"
description: "A scalable multi-model OCR workflow framework for batch document processing and model evaluation."
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/omni-reader"
mainImageLink: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/9.jpg"
previewImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/080f28b9/67f66f558c859106184bf49b_omni-reader-blog-cover.png"
tags:
  - "ocr"
  - "computer-vision"
  - "vision-language-models"
  - "document-processing"
  - "model-evaluation"
  - "batch-processing"
  - "production-mlops"
tools:
  - "zenml"
  - "streamlit"
  - "polars"
  - "litellm"
  - "instructor"
  - "ollama"
  - "openai"
createdAt: "2025-04-09T13:00:04.601Z"
updatedAt: "2025-08-26T08:33:58.952Z"
projectId: "omni-reader"
seo:
  title: "OmniReader"
  description: "A scalable multi-model OCR workflow framework for batch document processing and model evaluation."
  canonical: "https://www.zenml.io/projects/omnireader"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/080f28b9/67f66f558c859106184bf49b_omni-reader-blog-cover.png"
  ogTitle: "OmniReader"
  ogDescription: "A scalable multi-model OCR workflow framework for batch document processing and model evaluation."
---

#### Batch OCR Pipeline

Pipeline for efficient processing of large document volumes, extracting text using selected models.

#### Evaluation Pipeline

Pipeline for comparing model outputs against ground truth data using quantitative metrics.#### Stack Components

<ul><li><strong>Orchestrator:</strong> sagemaker</li><li><strong>Artifact Store:</strong> s3</li></ul>OmniReader is a flexible, scalable multi-model OCR workflow that orchestrates document processing pipelines, integrates various vision-language models, and tracks performance metrics to ensure reliable text extraction at scale.

### What It Does

This framework provides a production-ready solution for batch OCR processing, enabling enterprises to process large volumes of unstructured documents efficiently and reliably. It supports multiple vision-language models, automatic performance evaluation, and detailed metrics tracking for model comparison.

### How It Works

<ul>
<li>Processes batches of documents using a unified interface for multiple OCR models</li>
<li>Supports cloud-based APIs (OpenAI) and locally hosted models (Ollama)</li>
<li>Evaluates model performance using metrics like Character Error Rate (CER), Word Error Rate (WER), and Levenshtein similarity</li>
<li>Generates comparative visualizations and detailed performance reports</li>
<li>Leverages ZenML for workflow orchestration, artifact tracking, and reproducibility</li>
<li>Includes an interactive Streamlit app for side-by-side model comparison and prompt experimentation</li>
</ul>