---
title: "Scaling Order Processing Automation Using Modular LLM Architecture"
slug: "scaling-order-processing-automation-using-modular-llm-architecture"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67bc382bec284de7d8408199"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:01:32.916Z"
  createdOn: "2025-02-24T09:13:15.732Z"
llmopsTags:
  - "speech-recognition"
  - "unstructured-data"
  - "data-integration"
  - "structured-output"
  - "realtime-application"
  - "few-shot"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "error-handling"
  - "chunking"
  - "fallback-strategies"
  - "monitoring"
  - "documentation"
  - "reliability"
  - "guardrails"
  - "databases"
  - "openai"
industryTags: "e-commerce"
company: "Choco"
summary: "Choco developed an AI system to automate the order intake process for food and beverage distributors, handling unstructured orders from various channels (email, voicemail, SMS, WhatsApp). By implementing a modular LLM architecture with specialized components for transcription, information extraction, and product matching, along with comprehensive evaluation pipelines and human feedback loops, they achieved over 95% prediction accuracy. One customer reported 60% reduction in manual order entry time and 50% increase in daily order processing capacity without additional staffing."
link: "https://choco.com/us/stories/life-at-choco/scaling-ai-applications-with-llms"
year: 2025
seo:
  title: "Choco: Scaling Order Processing Automation Using Modular LLM Architecture - ZenML LLMOps Database"
  description: "Choco developed an AI system to automate the order intake process for food and beverage distributors, handling unstructured orders from various channels (email, voicemail, SMS, WhatsApp). By implementing a modular LLM architecture with specialized components for transcription, information extraction, and product matching, along with comprehensive evaluation pipelines and human feedback loops, they achieved over 95% prediction accuracy. One customer reported 60% reduction in manual order entry time and 50% increase in daily order processing capacity without additional staffing."
  canonical: "https://www.zenml.io/llmops-database/scaling-order-processing-automation-using-modular-llm-architecture"
  ogTitle: "Choco: Scaling Order Processing Automation Using Modular LLM Architecture - ZenML LLMOps Database"
  ogDescription: "Choco developed an AI system to automate the order intake process for food and beverage distributors, handling unstructured orders from various channels (email, voicemail, SMS, WhatsApp). By implementing a modular LLM architecture with specialized components for transcription, information extraction, and product matching, along with comprehensive evaluation pipelines and human feedback loops, they achieved over 95% prediction accuracy. One customer reported 60% reduction in manual order entry time and 50% increase in daily order processing capacity without additional staffing."
---

## Overview

Choco is a company focused on the food and beverage distribution space that embarked on an AI transformation journey following the release of OpenAI's ChatGPT and its API models. After an internal hackathon, they developed "Choco AI," a production system designed to digitize and automate the order intake process for food and beverage distributors. The system has been live for over a year and became the main driver of their new revenue growth, scaling to hundreds of customers while continuously improving quality.

The core problem Choco AI addresses is the highly manual and fragmented nature of order processing in food distribution. Restaurants send orders through various channels—SMS, WhatsApp, voicemail, email, and even fax—in unstructured formats. Employees at distribution companies traditionally had to manually interpret these orders and enter them into ERP systems, often juggling multiple devices and formats. Choco AI consolidates this into a unified interface where incoming orders are displayed alongside the system's predicted order details, allowing quick review and one-click acceptance to sync with ERP systems.

## Technical Architecture and LLMOps Principles

### Modular Design with Single Responsibility Principle

One of the most significant architectural decisions Choco made was to treat their AI system as a software system first. They explicitly rejected the temptation to use a single LLM call to handle complex workflows, despite early hackathon experiments showing this could work for proof-of-concept scenarios. Instead, they adhered to established software engineering principles like modularity and single responsibility.

The system is described as a "composite AI system" that integrates multiple LLMs and ML models, each tailored for specific tasks. For example, processing a voicemail order is broken down into distinct model calls with specific, testable responsibilities: transcription, correction, and information extraction. This separation allows each component to be independently optimized, tested, and maintained.

The article explicitly warns against overloading single prompts with multiple tasks, noting that while this approach can work in hackathons or POCs, it is not scalable for production systems. The modular approach makes it easier to track how each component contributes to overall output, simplifying debugging and allowing for targeted improvements.

### The Role of Custom ML Models Alongside LLMs

An interesting aspect of Choco's architecture is that they don't rely solely on LLMs. While LLMs handle text extraction from diverse order formats and identify relevant details, custom ML models perform the product matching task—cross-referencing extracted information with the distributor's catalog. This hybrid approach of combining foundation models with purpose-built ML models reflects a mature understanding that LLMs aren't always the optimal solution for every sub-task.

The product matching challenge is particularly complex because distributors may have extensive catalogs (e.g., 40 different tomato varieties) and must identify the exact product a customer expects based on often ambiguous input. The system achieves this by leveraging personalized data and contextual understanding, similar to how experienced human employees develop intuitive knowledge of customer preferences.

## Evaluation as a Core Competency

### Comprehensive Evaluation Pipelines

Choco emphasizes that thorough evaluation is "the cornerstone of a successful AI system deployment." They maintain robust test datasets for each AI or ML task, with rigorous evaluation metrics providing detailed insights into how individual components and the overall system perform under production-like conditions.

For the voicemail transcription task specifically, they use metrics like word error rate (WER) to assess performance. Their evaluation pipeline tests models both in isolation on specific tasks and on downstream tasks that depend on those outputs. This layered evaluation approach ensures that improvements to one component don't inadvertently degrade overall system reliability.

### Speed of Innovation Through Evaluation Infrastructure

The evaluation infrastructure directly enables rapid iteration and deployment of new models. When GPT-4o was released, Choco had it running in production within a week. They identified a specific use case around handling very large orders, spent two days testing it with anecdotal examples and running evaluations against their test dataset, and confirmed the improvement through end-to-end tests.

This rapid model adoption capability is a direct result of their investment in evaluation infrastructure. They can seamlessly evaluate new speech-to-text models using large datasets composed of diverse audio samples covering different speakers, languages, accents, background noise, and durations. The ability to quickly validate new models against established baselines empowers AI engineers to deploy changes confidently.

## Human Labeling and Ground Truth Data

### Investment in Domain Expertise

Choco identifies reliable ground truth data as fundamental to AI model quality, particularly for tasks requiring human-level reasoning. They initially outsourced labeling to an external agency but found that lack of domain expertise led to unreliable results, especially for complexities like ambiguous speech, regional accents, and colloquial phrases.

Today, they rely on internal Customer Success teams who work directly with customers and understand their specific operations and needs. This close collaboration helps resolve ambiguities that outsourced labelers couldn't handle effectively.

### Internal Tooling for Labeling

Choco invested significantly in developing user-friendly internal tools to streamline the labeling process. For example, AI engineers can add audio samples to a transcription tool, and completed transcripts are stored in a database for easy retrieval during evaluations. They built a simple transcription UI in Retool to facilitate this workflow.

Over time, they've manually labeled tens of thousands of examples for different tasks while maintaining strict data privacy practices. This high volume is essential for creating robust evaluation datasets and training models to handle edge cases.

### Cautious Approach to LLM-Based Labeling

Notably, Choco has refrained from using LLMs to replace human judgment in their labeling processes. They acknowledge that while automation might seem appealing, LLM-based labeling systems themselves require careful oversight, maintenance, and evaluations with labeled data. They recommend focusing on making the primary AI system perform well before expanding toward machine learning flywheels through complex automations like synthetic data generation or LLM-as-judge approaches.

## Continuous Learning and Feedback Mechanisms

### Product-Driven Learning

Choco designed their product so that user interactions naturally generate training data. The human review interface teaches Choco AI which products customers expect when the system makes incorrect predictions. If the system predicts the wrong tomato variety, the customer can make corrections in the UI, and Choco AI automatically learns from these corrections to improve future predictions.

This approach aligns with their framework of tracking "Day-0 performance" (baseline accuracy upon deployment) versus the "learning curve" (how effectively the system adapts based on feedback). They are transparent with customers that the system may produce errors initially but will learn and improve through corrections over time.

### Internal Correction Mechanisms

Not all errors can be corrected through user-facing interfaces. For example, voicemail transcription errors involving ambiguous words (like mishearing "haddock" as "heartache") are internal to the system and not directly exposed to users. For these cases, Choco built internal tools for flagging errors, allowing human operators to identify problems, provide corrections, and teach the AI how to improve.

### Self-Service Error Resolution at Scale

Having multiple improvement mechanisms—through users, Customer Success teams, and internal tooling—proved crucial as Choco scaled to onboarding new distributors weekly. Without these systems, each failure could have become a support ticket for the AI Engineering team. By building productized feedback systems, internal labeling interfaces, and thorough observability, they created "self-service" error resolution and improvement mechanisms that minimized disruptions.

## In-Context Learning Over Fine-Tuning

While the article mentions this will be covered in more detail in a future post, Choco notes they mainly rely on various in-context learning approaches rather than fine-tuning. Their system is designed around the concept of dynamically providing LLMs with personalized context and memory to perform or improve upon tasks. This approach likely reduces the operational complexity of managing fine-tuned models while still enabling personalization at the customer level.

## Results and Impact

The case study claims impressive results, though these should be viewed with the understanding that this is a first-party account. Reported outcomes include:

- Over 95% correct predictions in the production system
- One distributor reduced manual order entry time by 60%
- The same distributor processed 50% more orders daily without additional staffing
- Scaled to hundreds of customers while continuously improving quality
- New model deployments (like GPT-4o) achieved within a week of release

The system has been live for over a year as of February 2025, and Choco AI became the main driver of their new revenue growth within six months of launch.

## Key Takeaways for LLMOps Practitioners

The Choco case study offers several actionable insights for teams building production LLM systems:

- **Treat AI systems as software systems**: Apply traditional software engineering principles like modularity and single responsibility, even when using powerful LLMs that could theoretically handle complex tasks in a single call.

- **Break down problems into the smallest components**: This simplifies assessment, maintenance, and scalability while making it easier to reason about potential solutions and evaluate whether an LLM is even the right tool.

- **Invest heavily in evaluation infrastructure early**: Comprehensive evaluation pipelines accelerate innovation by enabling rapid testing of new models and approaches with confidence.

- **Prioritize domain expertise in labeling**: External labeling agencies may lack the context needed for high-quality ground truth data in specialized domains.

- **Design products that generate training data**: User interactions should naturally contribute to system improvement, but also build internal mechanisms for correcting errors that users don't directly see.

- **Be cautious about LLM-as-judge patterns**: Focus on making the primary system perform well before introducing complex automation in the labeling or evaluation pipeline.

The case study represents a mature approach to LLMOps that balances the capabilities of large language models with practical considerations around maintainability, testability, and continuous improvement in production environments.