---
title: "Scaling AI Applications with LLMs: Dynamic Context Injection and Few-Shot Learning for Order Processing"
slug: "scaling-ai-applications-with-llms-dynamic-context-injection-and-few-shot-learning-for-order-processing"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6853c18e5c3f5bf7fe715856"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:11:56.406Z"
  createdOn: "2025-06-19T07:51:42.052Z"
llmopsTags:
  - "document-processing"
  - "data-analysis"
  - "structured-output"
  - "unstructured-data"
  - "classification"
  - "few-shot"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "fine-tuning"
  - "system-prompts"
  - "chunking"
  - "fastapi"
  - "databases"
  - "monitoring"
  - "openai"
industryTags: "tech"
company: "Choco"
summary: "Choco built a comprehensive AI system to automate food supply chain order processing, addressing challenges with diverse order formats across text messages, PDFs, and voicemails. The company developed a production LLM system using few-shot learning with dynamically retrieved examples, semantic embedding-based retrieval, and context injection techniques to improve information extraction accuracy. Their approach prioritized prompt-based improvements over fine-tuning, enabling faster iteration and model flexibility while building towards more autonomous AI systems through continuous learning from human annotations."
link: "https://choco.com/us/stories/life-at-choco/scaling-ai-applications-with-llms-part-2"
year: 2025
seo:
  title: "Choco: Scaling AI Applications with LLMs: Dynamic Context Injection and Few-Shot Learning for Order Processing - ZenML LLMOps Database"
  description: "Choco built a comprehensive AI system to automate food supply chain order processing, addressing challenges with diverse order formats across text messages, PDFs, and voicemails. The company developed a production LLM system using few-shot learning with dynamically retrieved examples, semantic embedding-based retrieval, and context injection techniques to improve information extraction accuracy. Their approach prioritized prompt-based improvements over fine-tuning, enabling faster iteration and model flexibility while building towards more autonomous AI systems through continuous learning from human annotations."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-applications-with-llms-dynamic-context-injection-and-few-shot-learning-for-order-processing"
  ogTitle: "Choco: Scaling AI Applications with LLMs: Dynamic Context Injection and Few-Shot Learning for Order Processing - ZenML LLMOps Database"
  ogDescription: "Choco built a comprehensive AI system to automate food supply chain order processing, addressing challenges with diverse order formats across text messages, PDFs, and voicemails. The company developed a production LLM system using few-shot learning with dynamically retrieved examples, semantic embedding-based retrieval, and context injection techniques to improve information extraction accuracy. Their approach prioritized prompt-based improvements over fine-tuning, enabling faster iteration and model flexibility while building towards more autonomous AI systems through continuous learning from human annotations."
---

## Case Study Overview

Choco, a food supply chain technology company, has developed a sophisticated AI system called "Choco AI" to automate order processing in the restaurant and food distribution industry. This case study represents part two of their technical journey, focusing specifically on how they built learning capabilities into their LLM-based production system. The company processes orders that arrive in highly varied formats including text messages with shorthand and abbreviations, semi-structured PDF attachments via email, and voicemail recordings that require speech recognition processing.

The fundamental challenge Choco addressed was the heterogeneous nature of order formats across different customers and distributors. Each restaurant or customer has unique ordering patterns, abbreviations, and formatting styles, making traditional rule-based extraction systems inadequate. The company needed to build a system that could adapt to new formats dynamically while maintaining high accuracy in extracting structured information such as product names, quantities, and restaurant details from unstructured inputs.

## Technical Architecture and LLMOps Implementation

Choco's approach to production LLM deployment centers around two primary strategies for improving model performance: prompt engineering techniques with in-context learning, rather than relying heavily on fine-tuning approaches. This architectural decision reflects a deliberate LLMOps strategy prioritizing agility, predictability, and model flexibility over more traditional machine learning approaches.

Their core information extraction pipeline represents a critical production LLM component that converts diverse order formats into structured JSON output required for downstream processing. This system must handle multiple failure modes including wrong column extraction, misinterpretation of ambiguous information, and failure to recognize specific abbreviations or product identifiers. The production requirements demand high reliability since extraction errors propagate through the entire order fulfillment pipeline.

## Few-Shot Learning Implementation

The cornerstone of Choco's LLMOps strategy involves sophisticated few-shot learning implementation where custom-labeled examples are dynamically injected into prompts based on incoming order characteristics. This approach leverages LLMs' ability to learn from examples provided within the context window, similar to how humans can understand new patterns from just a few demonstrations.

For each distributor's customers, Choco maintains a repository of labeled order format examples that demonstrate the correct extraction patterns. When new orders arrive, the system retrieves relevant examples and includes them in the prompt, allowing the LLM to adapt its processing approach dynamically. This methodology addresses the core challenge of format variability without requiring separate model training for each customer or format type.

The company developed an internal labeling interface that enables their customer success teams to annotate orders directly within their order inspection tool. This creates a continuous feedback loop where new order formats or failure modes can be immediately addressed by adding new labeled examples, ensuring the system's extraction capabilities continuously improve. This represents a crucial LLMOps practice of building human-in-the-loop systems that enable non-technical team members to contribute to model improvement.

## Semantic Retrieval and Embeddings

Recognizing the limitations of simple metadata-based matching for retrieving relevant few-shot examples, Choco implemented semantic retrieval using embeddings. Their hypothesis was that order formats often share structural similarities even when content differs - for example, PDF orders from different restaurants using the same third-party ordering tool may have identical layouts, or distributors may share predefined order templates with multiple customers.

The semantic retrieval system indexes labeled examples as vector representations in a database. At inference time, the system computes embeddings for incoming orders and performs semantic search to retrieve structurally similar labeled examples. Retrieved candidates that meet a similarity threshold are used as few-shot examples in the prompt, improving the system's adaptability to new formats without requiring manual labeling for every possible variation.

This embeddings-based approach represents a sophisticated LLMOps pattern that combines traditional information retrieval techniques with modern LLM capabilities. The system maintains an embedding database that serves as a knowledge base for format recognition, enabling more intelligent example selection compared to simple rule-based matching.

## Dynamic Context Injection

Beyond retrieving relevant examples, Choco implemented dynamic context injection to provide LLMs with richer contextual information for improved extraction accuracy. This approach treats context engineering similarly to feature engineering in traditional machine learning, where enriching input data enhances model performance.

A particularly interesting application involves their voicemail transcription correction system. Using Whisper for automatic speech recognition, the system faces challenges with mistranscriptions like "heartache" versus "haddock" - phonetically similar words that create downstream processing errors. Since voicemail transcriptions are shown to users and used for order processing, there's minimal tolerance for errors.

Choco's solution involves multiple layers of context injection. Initially, they used generic LLM prompts that leveraged the model's internal knowledge for transcription correction. This approach successfully handled many phonetic mistranscriptions and eliminated Whisper's tendency to hallucinate sentences during silence gaps. However, the generic approach struggled with brand names, uncommon products, and colloquial references like "blue milk" referring to milk identified by bottle cap color.

To capture additional improvements, the system dynamically injects specific contextual information including the distributor's assortment category metadata, previously ordered products for the restaurant, and for new customers, lists of the distributor's most popular products. This contextual information helps disambiguate transcription errors by providing domain-specific knowledge that generic LLMs lack.

## Production System Design Principles

Choco's LLMOps architecture reflects several important design principles for production LLM systems. Their preference for prompt-based improvements over fine-tuning stems from practical operational considerations. Prompt-based techniques provide structured and predictable ways to improve system performance while avoiding the risks associated with fine-tuning, which can introduce unintended regressions in previously working functionality.

Dynamic context injection allows for targeted, surgical improvements while maintaining control over when, how, and what context gets added to prompts. This contrasts with base prompt modifications, which can introduce unexpected regressions in other areas - a common challenge with LLMs due to their complex behavior patterns.

The system's design also prioritizes model flexibility, enabling seamless switching between different LLMs as newer models become available. This architectural decision has proven valuable given the rapid advancement in LLM capabilities over recent years, allowing Choco to integrate state-of-the-art models without major system redesigns.

## Cost Optimization and Model Selection

An important LLMOps consideration in Choco's system involves cost optimization through strategic context provision. By providing richer contextual information, smaller and less expensive models can achieve comparable performance to larger, more costly alternatives. This approach reduces operational costs while increasing system agility, demonstrating how thoughtful prompt engineering can optimize the cost-performance tradeoff in production LLM deployments.

The context injection strategy also creates opportunities for building user-friendly interfaces for non-technical team members. Their customer success team can independently contribute to system improvements without deep machine learning expertise, representing an important operational scaling consideration for LLMOps implementations.

## Fine-Tuning Considerations and Trade-offs

While Choco primarily relies on prompt-based improvements, they acknowledge fine-tuning's complementary role in their LLMOps strategy. Their in-context learning system generates custom prompts dynamically and deterministically, while fine-tuning tends to be slower and less precise. Adding examples to training datasets doesn't guarantee correct generalization or prevent similar future mistakes, and changes in output schema require complete retraining, slowing deployment cycles.

Despite these challenges, fine-tuning remains valuable for tasks requiring deeper generalization beyond in-context learning capabilities. Choco's approach involves prioritizing prompt-based methods for faster iteration while maintaining fine-tuning as a longer-term strategy. Their avoidance of dependence on single custom LLMs provides freedom to experiment with and integrate the latest models, which has proven strategically valuable given rapid LLM advancement.

## Building Towards Autonomous Systems

Choco's vision extends beyond current capabilities toward building autonomous AI systems that can handle complexity and novelty with minimal human intervention. The labeled examples generated for few-shot learning serve multiple purposes beyond immediate application: foundations for fine-tuning, datasets for evaluating and refining LLM components, scalable methods for creating new labeled examples, and resources helping LLMs autonomously identify errors and judge outputs.

Their approach to autonomy doesn't eliminate human involvement but rather designs systems that continuously learn from human expertise while minimizing manual intervention. Every human interaction - whether through labeling, corrections, or metadata input - feeds into feedback loops that improve system performance.

As their collection of human-annotated data grows, it transforms from a tool for incremental improvements into a foundation for building truly autonomous AI systems. This represents a sophisticated LLMOps strategy that views human-AI collaboration as a pathway to eventual autonomy rather than a permanent operational requirement.

## Operational Insights and LLMOps Best Practices

Choco's experience demonstrates several important LLMOps best practices. Their emphasis on building systems that enable non-technical team members to contribute to model improvement represents crucial operational scaling. The labeling interface that allows customer success teams to annotate orders directly creates sustainable improvement cycles without requiring constant data science team involvement.

The company's architectural decisions prioritize predictability and control over raw performance optimization. By maintaining deterministic prompt generation and avoiding over-reliance on fine-tuning, they built systems that behave predictably in production environments. This approach trades some potential performance gains for operational reliability and maintainability.

Their semantic retrieval system demonstrates how traditional information retrieval techniques can enhance LLM capabilities in production environments. Rather than relying solely on LLM capabilities, they built complementary systems that improve context selection and relevance, showing how hybrid approaches can outperform pure LLM solutions.

The case study illustrates the importance of continuous learning and adaptation in production LLM systems. Choco's ability to rapidly incorporate new order formats and correction patterns through their labeling and retrieval systems enables their AI to evolve with changing business requirements without major system overhauls.