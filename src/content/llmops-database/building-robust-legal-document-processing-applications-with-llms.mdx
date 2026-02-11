---
title: "Building Robust Legal Document Processing Applications with LLMs"
slug: "building-robust-legal-document-processing-applications-with-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bb6cde8495fec106562"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:44:36.633Z"
  createdOn: "2024-11-21T13:55:02.391Z"
llmopsTags:
  - "chunking"
  - "classification"
  - "compliance"
  - "document-processing"
  - "documentation"
  - "error-handling"
  - "fine-tuning"
  - "guardrails"
  - "high-stakes-application"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "structured-output"
  - "system-prompts"
industryTags: "insurance"
company: "Anzen"
summary: "The case study explores how Anzen builds robust LLM applications for processing insurance documents in environments where accuracy is critical. They employ a multi-model approach combining specialized models like LayoutLM for document structure analysis with LLMs for content understanding, implement comprehensive monitoring and feedback systems, and use fine-tuned classification models for initial document sorting. Their approach demonstrates how to effectively handle LLM hallucinations and build production-grade systems with high accuracy (99.9% for document classification)."
link: "https://www.youtube.com/watch?v=CJKth2WROVY"
year: 2023
seo:
  title: "Anzen: Building Robust Legal Document Processing Applications with LLMs - ZenML LLMOps Database"
  description: "The case study explores how Anzen builds robust LLM applications for processing insurance documents in environments where accuracy is critical. They employ a multi-model approach combining specialized models like LayoutLM for document structure analysis with LLMs for content understanding, implement comprehensive monitoring and feedback systems, and use fine-tuned classification models for initial document sorting. Their approach demonstrates how to effectively handle LLM hallucinations and build production-grade systems with high accuracy (99.9% for document classification)."
  canonical: "https://www.zenml.io/llmops-database/building-robust-legal-document-processing-applications-with-llms"
  ogTitle: "Anzen: Building Robust Legal Document Processing Applications with LLMs - ZenML LLMOps Database"
  ogDescription: "The case study explores how Anzen builds robust LLM applications for processing insurance documents in environments where accuracy is critical. They employ a multi-model approach combining specialized models like LayoutLM for document structure analysis with LLMs for content understanding, implement comprehensive monitoring and feedback systems, and use fine-tuned classification models for initial document sorting. Their approach demonstrates how to effectively handle LLM hallucinations and build production-grade systems with high accuracy (99.9% for document classification)."
---

## Overview

This presentation by Cam Featstra from Anzen provides a comprehensive practitioner's guide to building robust production applications using generative AI models, particularly in domains where correctness is paramount. Anzen operates in the insurance industry, processing insurance applications at scale, making accuracy a non-negotiable requirement. The talk acknowledges both the promise and limitations of current LLM technology, offering practical strategies for deploying these models in production while mitigating the well-known hallucination problem.

The presentation opens with a humorous reference to lawyers who were fined for using ChatGPT-generated legal citations that turned out to be fabricated—a cautionary tale that underscores the central challenge the talk addresses. While creative writing applications can tolerate some degree of model "creativity," insurance document processing and similar high-stakes domains require a much more rigorous approach.

## Understanding the Hallucination Problem

The speaker emphasizes that hallucination is not a new problem, referencing a 2018 paper titled "Actively Avoiding Nonsense in Generative Models." Much of what we call hallucination stems from out-of-distribution queries—asking models for information that wasn't in their training data. This is fundamentally similar to challenges with any predictive model, including simple linear regression, though quantifying what's "out of distribution" for language models is considerably more complex since the same semantic content can be expressed in countless ways.

Beyond pure hallucination (making things up entirely), the presentation notes that LLMs can be "wrong" in other ways due to how they process tokens. The example given is ChatGPT incorrectly stating that "mustard" contains two letter "n"s when it contains none—a quirk of tokenization rather than lack of knowledge.

An important operational consideration highlighted is that third-party models like those from OpenAI are constantly changing under the hood. The speaker references research showing GPT-4's performance on certain math questions dropped dramatically over a few months while GPT-3.5 improved significantly during the same period. This model drift creates significant challenges for production systems, as software that performs well at deployment may suddenly degrade without any changes to the application code.

## Practical Strategies for Production LLM Systems

### Structured Outputs with Function Calls

One of the most actionable recommendations is the use of function calls (or similar structured output mechanisms) to constrain model responses. The presentation demonstrates this with a recipe generation example. When simply asking ChatGPT to output JSON for a recipe, the model complies but uses an arbitrary schema. Adding detailed prompt instructions for specific fields is tedious and unreliable.

Function calls solve this elegantly by defining the exact schema expected. The model then returns data conforming precisely to that structure. This is both more reliable and requires less prompt engineering than trying to specify format requirements in natural language. For production applications that need to parse and process LLM outputs programmatically, this is essential.

### Retrieval-Augmented Generation and Context Management

The presentation addresses the fundamental issue that many hallucinations occur when models lack the necessary information to answer correctly. The solution is to provide relevant context as part of the prompt. However, this introduces new challenges around context length limits and token costs.

Several strategies are discussed for managing context efficiently:

- **Search-based retrieval**: For applications like "chat with PDF," embedding passages from the document and the user query allows filtering to the most relevant sections before sending to the LLM. This reduces token usage while focusing the model's attention on pertinent information.

- **Multi-step processing pipelines**: Rather than asking multiple questions about the same large document set, a more efficient approach is to process documents once to extract specific structured fields, then use that condensed information for higher-level reasoning and judgment tasks.

- **Format optimization**: The speaker notes that ChatGPT performs particularly well with Markdown-formatted content, making it a good intermediate format when preparing data for model consumption.

### Document Preprocessing: The Anzen Example

A concrete example from Anzen's production system illustrates the importance of data quality. When processing insurance applications (which typically contain complex layouts with checkboxes, tables, and varied formatting), naive OCR produces poor results that lose the structural relationships between questions and answers.

Anzen's solution employs LayoutLM, a specialized model for understanding document layouts, to first identify which parts of a document are questions versus answers. This semantic understanding is combined with OCR results to reconstruct a text representation that preserves the logical structure of the original document. Only this cleaned, structured representation is then provided to the LLM for further processing.

This exemplifies the broader principle of "garbage in, garbage out"—investing significant effort in data preparation before engaging the LLM pays dividends in output quality. The speaker emphasizes this is not a new concept but remains critically important.

### Strategic Use of Fine-Tuned Classification Models

A key architectural recommendation is to use generative models only for tasks that truly require generative capabilities. For classification tasks, fine-tuned smaller models trained on curated datasets often outperform general-purpose LLMs while being faster and cheaper.

At Anzen, rather than asking an LLM to both identify document types and extract information, a dedicated classification model first determines whether a document is an insurance application. Only confirmed insurance applications proceed to the more expensive LLM processing step. This separation of concerns constrains the problem space for the LLM and has achieved 99.9% accuracy across multiple document types, according to the speaker.

The presentation notes that effective fine-tuned classifiers don't require massive datasets—a few hundred examples can yield good performance, and a few thousand can produce excellent results.

## System Architecture for Production Reliability

### Feedback Mechanisms

The speaker stresses that any production AI system must incorporate feedback mechanisms. Given that third-party models can change behavior without notice and input data distributions evolve over time, detecting performance degradation quickly is essential.

The ideal implementation is a first-class product feature allowing users to report incorrect results. This feeds into dashboards and alerting systems that enable engineering teams to identify and respond to problems rapidly. Usage metrics can serve as a rough proxy, but explicit feedback about correctness is far more valuable.

Beyond immediate issue detection, feedback data becomes a valuable asset for continuous improvement. It can be used to fine-tune models, identify specific failure modes, and create a positive feedback loop where the system improves over time.

### Comprehensive Monitoring

Beyond user feedback, robust production systems require comprehensive monitoring infrastructure:

- Saving all inputs and outputs to enable debugging and analysis
- Performance metrics and latency tracking
- Dashboards showing trends over time
- The ability to correlate performance changes with model updates or code changes

This monitoring enables rapid response when issues arise, including the ability to roll back changes if necessary.

## Honest Assessment of Current Limitations

The presentation maintains a realistic perspective on the current state of LLM technology. The speaker explicitly notes that open-source models at the time of the presentation didn't meaningfully compete with OpenAI's offerings for production use cases. While acknowledging that models continue to improve rapidly, the core message is that "throwing a bunch of information at ChatGPT" isn't sufficient for production applications, especially in domains requiring correctness.

The speaker acknowledges the rapidly evolving landscape, noting that even in the weeks between preparing the presentation and delivering it, content needed updating. This underscores the importance of robust architectures and monitoring—techniques and capabilities that work today may need adjustment as the underlying technology evolves.

## Key Takeaways

The fundamental principle articulated is that while you cannot solve hallucination at the model level, you can build reliable applications by:

- Using structured outputs (function calls) to constrain model responses
- Providing clean, relevant context through retrieval and preprocessing
- Reserving LLMs for tasks that truly require generative capabilities
- Building robust feedback and monitoring systems
- Designing for continuous improvement and rapid issue detection

The Anzen case study demonstrates these principles in action within the insurance industry, where the combination of specialized document processing (LayoutLM, OCR), fine-tuned classifiers, and carefully architected LLM pipelines achieves production-grade reliability on complex document understanding tasks.