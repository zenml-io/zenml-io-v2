---
title: "Production-Scale Document Parsing with Vision-Language Models and Specialized OCR"
slug: "production-scale-document-parsing-with-vision-language-models-and-specialized-ocr"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "697393c1fa5600c3f6659b63"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-01-23T16:05:47.118Z"
  createdOn: "2026-01-23T15:29:05.688Z"
llmopsTags:
  - "document-processing"
  - "healthcare"
  - "fraud-detection"
  - "regulatory-compliance"
  - "structured-output"
  - "fine-tuning"
  - "prompt-engineering"
  - "model-optimization"
  - "human-in-the-loop"
  - "agent-based"
  - "evals"
  - "few-shot"
  - "embeddings"
  - "rag"
  - "chunking"
  - "pytorch"
  - "tensorflow"
  - "open-source"
  - "documentation"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "fastapi"
  - "google-gcp"
  - "amazon-aws"
  - "microsoft-azure"
  - "hugging-face"
  - "openai"
industryTags: "tech"
company: "Reducto"
summary: "Reducto has built a production document parsing system that processes over 1 billion documents by combining specialized vision-language models, traditional OCR, and layout detection models in a hybrid pipeline. The system addresses critical challenges in document parsing including hallucinations from frontier models, dense tables, handwritten forms, and complex charts. Their approach uses a divide-and-conquer strategy where different models are routed to different document regions based on complexity, achieving higher accuracy than AWS Textract, Microsoft Azure Document Intelligence, and Google Cloud OCR on their internal benchmarks. The company has expanded beyond parsing to offer extraction with pixel-level citations and an edit endpoint for automated form filling."
link: "https://www.youtube.com/watch?v=ybzR4LBY0Lo"
year: 2025
seo:
  title: "Reducto: Production-Scale Document Parsing with Vision-Language Models and Specialized OCR - ZenML LLMOps Database"
  description: "Reducto has built a production document parsing system that processes over 1 billion documents by combining specialized vision-language models, traditional OCR, and layout detection models in a hybrid pipeline. The system addresses critical challenges in document parsing including hallucinations from frontier models, dense tables, handwritten forms, and complex charts. Their approach uses a divide-and-conquer strategy where different models are routed to different document regions based on complexity, achieving higher accuracy than AWS Textract, Microsoft Azure Document Intelligence, and Google Cloud OCR on their internal benchmarks. The company has expanded beyond parsing to offer extraction with pixel-level citations and an edit endpoint for automated form filling."
  canonical: "https://www.zenml.io/llmops-database/production-scale-document-parsing-with-vision-language-models-and-specialized-ocr"
  ogTitle: "Reducto: Production-Scale Document Parsing with Vision-Language Models and Specialized OCR - ZenML LLMOps Database"
  ogDescription: "Reducto has built a production document parsing system that processes over 1 billion documents by combining specialized vision-language models, traditional OCR, and layout detection models in a hybrid pipeline. The system addresses critical challenges in document parsing including hallucinations from frontier models, dense tables, handwritten forms, and complex charts. Their approach uses a divide-and-conquer strategy where different models are routed to different document regions based on complexity, achieving higher accuracy than AWS Textract, Microsoft Azure Document Intelligence, and Google Cloud OCR on their internal benchmarks. The company has expanded beyond parsing to offer extraction with pixel-level citations and an edit endpoint for automated form filling."
---

Reducto represents a comprehensive production system for document parsing that exemplifies several key LLMOps challenges: model selection and routing, handling edge cases at scale, balancing accuracy with cost, and building reliable citations for downstream applications. The company announced their Series B funding and reported processing over 1 billion documents, with most of that volume occurring in recent months, demonstrating rapid scaling of their production infrastructure.

The core technical insight driving Reducto's approach is that end-to-end large language models, while powerful, suffer from systematic failures when applied to document parsing tasks. The team demonstrates this through multiple examples including frontier models hallucinating data in dense financial tables, repetition problems when models encounter patterns like sequences of dots, and temperature tradeoffs where higher temperatures reduce repetition but increase hallucinations. These production challenges motivated their hybrid architecture that combines multiple specialized models rather than relying on a single vision-language model.

Their production pipeline implements a sophisticated divide-and-conquer strategy that begins with layout detection models identifying different regions in a document. For each region, they route to the appropriate model based on complexity: simple text regions use traditional OCR models optimized for high precision and recall, while complex regions with handwritten text, stamps, watermarks, or vertical text are handled by in-house trained vision-language models. This routing decision is critical for production performance, balancing cost, latency, and accuracy across diverse document types.

One particularly innovative aspect of their production system is the use of autoregressive models for layout detection on text-dense pages. Rather than using traditional object detection models like YOLO, they trained autoregressive models that can output hundreds of bounding box tokens with high fidelity and no hallucinations. This represents a novel application of autoregressive architectures to structured prediction tasks, leveraging their high-quality in-house labeled data. The team acknowledges these autoregressive models are expensive to run and slower than alternatives, so they reserve them for the most challenging cases, demonstrating production-minded optimization of the inference pipeline.

The company maintains an internal benchmark called RD-forcebench focused on information extraction from challenging scanned forms with handwritten text, stamps, watermarks, and checkboxes. Their ablation studies on this benchmark reveal that better document parsing quality directly improves downstream task accuracy, whether for RAG, information extraction, chatbots, or other applications. This finding motivated their focus on parsing quality as a foundational capability, with one study showing that switching layout detection models improved extraction accuracy significantly by correctly grouping regions and preserving tags that were previously cut off.

For table parsing specifically, Reducto developed RD-table-bench, a publicly available benchmark on Hugging Face that compares their approach against AWS Textract, Microsoft Azure Document Intelligence, and Google Cloud OCR. The benchmark includes dense financial tables with hundreds of rows and columns where frontier models regularly hallucinate extra data points or miss existing ones. Their specialized table parsing models outperform these general-purpose services, demonstrating the value of focused iteration on specific document types. They support multiple output formats including HTML, markdown, JSON, and XML, giving users control over representation based on table complexity.

A major production challenge the team addresses is grounding and citation. Unlike generic OCR services or vision-language models that output text without location information, Reducto maintains a pixel-level map of every element from the parsing stage onward. This grounding capability is built into their models from the beginning rather than patched on at the end through prompting. They developed specialized models hand-tuned for citation tasks that provide word-level or character-level citations with confidence scores. Their citation model can even identify when information is missing from a document and cite the location where it determined the information was absent, a capability that frontier models currently lack. This grounding infrastructure powers their extract endpoint and provides trustworthy references for downstream applications.

Reducto has pioneered novel chart extraction capabilities that will reach general availability in the coming weeks. Rather than using a single vision-language model that patches the input uniformly, they developed an agentic approach using a mixture of strong and weak vision-language models. The pipeline takes a blended approach to figures, using different models to extract individual components like lines, spikes, and axes. The result is near pixel-perfect accuracy in reproducing complex charts as structured data tables, with all extractions 100% grounded in the original image. The team invested approximately two months iterating on this capability and trained primarily on real charts rather than synthetic data, working creatively with their in-house labeling team. This represents a production-ready solution to a problem that has historically required extensive custom engineering.

The edit endpoint represents an expansion from reading documents to writing back into them, particularly for automated form filling. The core technical challenges include detecting form fields on PDFs that are often just images without structured metadata, and describing what data should fill each field. Their detection pipeline uses in-house trained models to identify text boxes and checkboxes, but they discovered through production use that many forms lack clear visual features like lines. This required additional data collection and training on forms with only words, ambiguous layouts, and varied formats like questionnaires converted from Word documents. Their description pipeline uses a mix of vision-language models and components from their parsing and extraction pipelines, leveraging PDF metadata when available and accounting for cross-page context like headers multiple pages back.

The iteration process for the edit endpoint exemplifies production LLMOps methodology: they continuously improve models, run error analysis, iterate with users, and discover new edge cases in production. They introduced form schemas that describe all form fields and their expected data, which users can modify in their studio interface with full control over descriptions, bounding boxes, and specific fill values. This human-in-the-loop capability addresses use cases where customers repeatedly fill the same forms, such as immigration startups processing standard government forms for multiple clients. The form schema is computed once and then reused, optimizing for production efficiency.

Evaluation and benchmarking are central to Reducto's production operations. They built an internal framework called autoeeval that performs automatic evaluation across the wide heterogeneity of document types they encounter in production. Rather than making model deployment decisions based on a handful of labeled samples, they evaluate across their full production distribution to ensure new models produce superior results at scale. This addresses a common mistake in building AI applications where developers benchmark on too few examples and fail to account for the heterogeneity that production systems will encounter. They are developing RD-arena, a service where users can submit document batches and get parses from multiple providers including Reducto, Textract, and others, then judge outputs in an A/B fashion to get high-confidence estimates of the best provider for their specific use case.

The production pipeline makes intelligent use of metadata when available, implementing a hybrid extraction mode that evaluates whether PDF metadata is accurate enough to use. For digitally-native documents like financial brokerage reports, metadata extraction can be significantly faster and more accurate than vision-based parsing. This pragmatic approach reflects their philosophy of using the best tool for each subproblem rather than adhering to a single technique.

Reducto has also contributed to the open source community, with team member Ephe releasing Rome OCR, an open source OCR model built through collaboration with researchers from Quinn and AI2. The model and RD-table-bench dataset are available on Hugging Face, and the Hugging Face team used Rome OCR to build new PDF extraction datasets. This demonstrates how the company balances proprietary innovation with community contribution.

The system handles several production-specific challenges that pure research systems often overlook. For long documents with dependencies across page boundaries, such as tables with headers many pages before the table content, they recommend parsing the entire document first and then working with the parsed text rather than sending hundreds of images to a model. Their internal testing shows extraction models can handle 100+ page documents with 100+ fields in a single shot when given text input, but hallucinations proliferate with image inputs at that scale. For RAG applications, they support large chunks to maintain context or summarization techniques to attach context to embedded chunks.

The company now offers a pay-as-you-go pricing model with 15,000 free credits for new users, removing barriers to trying the service. Their studio product provides a web interface for testing parsing, extraction, and edit capabilities with full visibility into bounding boxes, confidence scores, and output formats. They recently released capabilities for handling redlined legal documents with tracked changes, demonstrating continued expansion into domain-specific document types.

Throughout their production journey, Reducto has maintained focus on accuracy over convenience, specialized models over general-purpose solutions, and comprehensive evaluation over spot checks. Their approach of combining traditional computer vision, specialized vision-language models, and large language models in a carefully orchestrated pipeline represents a mature production architecture for document understanding. The system processes over a billion documents with mechanisms for continuous improvement through production feedback, automated evaluation, and rapid iteration on new capabilities like chart extraction and form editing. This represents a sophisticated LLMOps operation that goes well beyond deploying a single model, instead orchestrating an entire ecosystem of specialized models with routing logic, grounding mechanisms, and production monitoring at scale.