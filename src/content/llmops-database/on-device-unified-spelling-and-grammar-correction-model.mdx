---
title: "On-Device Unified Spelling and Grammar Correction Model"
slug: "on-device-unified-spelling-and-grammar-correction-model"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694add4dbf2b322a9dbadeee"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:46.504Z"
  createdOn: "2025-12-23T18:19:57.705Z"
llmopsTags:
  - "content-moderation"
  - "document-processing"
  - "realtime-application"
  - "fine-tuning"
  - "model-optimization"
  - "token-optimization"
  - "latency-optimization"
  - "error-handling"
  - "pytorch"
  - "fastapi"
  - "meta"
  - "microsoft-azure"
industryTags: "tech"
company: "Grammarly"
summary: "Grammarly developed a compact 1B-parameter on-device LLM to provide offline spelling and grammar correction capabilities, addressing the challenge of maintaining writing assistance functionality without internet connectivity. The team selected Llama as the base model, created comprehensive synthetic training data covering diverse writing styles and error types, and applied extensive optimizations including Grouped Query Attention, MLX framework integration for Apple silicon, and 4-bit quantization. The resulting model achieves 210 tokens/second on M2 Mac hardware while maintaining correction quality, demonstrating that multiple specialized models can be consolidated into a single efficient on-device solution that preserves user voice and delivers real-time feedback."
link: "https://www.grammarly.com/blog/engineering/efficient-on-device-writing-assistance/"
year: 2025
seo:
  title: "Grammarly: On-Device Unified Spelling and Grammar Correction Model - ZenML LLMOps Database"
  description: "Grammarly developed a compact 1B-parameter on-device LLM to provide offline spelling and grammar correction capabilities, addressing the challenge of maintaining writing assistance functionality without internet connectivity. The team selected Llama as the base model, created comprehensive synthetic training data covering diverse writing styles and error types, and applied extensive optimizations including Grouped Query Attention, MLX framework integration for Apple silicon, and 4-bit quantization. The resulting model achieves 210 tokens/second on M2 Mac hardware while maintaining correction quality, demonstrating that multiple specialized models can be consolidated into a single efficient on-device solution that preserves user voice and delivers real-time feedback."
  canonical: "https://www.zenml.io/llmops-database/on-device-unified-spelling-and-grammar-correction-model"
  ogTitle: "Grammarly: On-Device Unified Spelling and Grammar Correction Model - ZenML LLMOps Database"
  ogDescription: "Grammarly developed a compact 1B-parameter on-device LLM to provide offline spelling and grammar correction capabilities, addressing the challenge of maintaining writing assistance functionality without internet connectivity. The team selected Llama as the base model, created comprehensive synthetic training data covering diverse writing styles and error types, and applied extensive optimizations including Grouped Query Attention, MLX framework integration for Apple silicon, and 4-bit quantization. The resulting model achieves 210 tokens/second on M2 Mac hardware while maintaining correction quality, demonstrating that multiple specialized models can be consolidated into a single efficient on-device solution that preserves user voice and delivers real-time feedback."
---

## Overview

Grammarly's case study describes their journey to build an on-device writing assistance model that can operate entirely offline, addressing a fundamental production challenge: maintaining service availability when internet connectivity is unreliable or unavailable. The company consolidated multiple specialized models for spelling and grammar correction into a single compact 1B-parameter LLM that runs locally on user devices. This represents a significant LLMOps challenge involving model selection, training data synthesis, performance optimization, and deployment to resource-constrained edge devices.

The initiative was driven by real-world user pain points—spotty Wi-Fi at coffee shops or unavailable internet on planes—that disrupted productive writing flows. While Grammarly's existing cloud-based system used multiple large models for even basic corrections, running these on-device was impractical given limited memory and processing capabilities. The team's hypothesis was that a single, well-designed smaller model could match the performance of multiple larger models while meeting strict latency, quality, and user experience requirements.

## Production Requirements and Constraints

The team established three critical production requirements that guided all technical decisions. First, the model needed to deliver quality suggestions by identifying and appropriately correcting common spelling and grammar mistakes with good coverage of error types. Second, it had to preserve the user's voice, respecting individual writing style and tone rather than imposing standardized corrections—a key differentiator from traditional grammar checkers. Third, the model required instantaneous feedback with real-time performance as users type, which is particularly challenging on devices with limited computational resources running multiple applications simultaneously.

For this initial deployment, they focused on Apple desktop users with Mx GPUs, which enable faster AI model inference through hardware acceleration. This strategic scoping allowed them to leverage specific hardware capabilities while validating the approach before broader rollout. The latency requirement was quantified as processing at least 50 tokens per second to deliver continuous corrections, establishing a clear performance threshold for the production system.

## Model Selection and Architecture Decisions

The base model selection process reveals important LLMOps considerations for production deployments. The team evaluated T5 (encoder-decoder architecture) and Llama (decoder-only architecture) as candidate foundation models. This comparison wasn't merely academic—it had direct implications for production performance, tokenization quality, and the ability to handle diverse real-world inputs.

Llama emerged as the superior choice for several production-relevant reasons. The model's tokenizer effectively handled special characters including emoji, Unicode, and non-English characters that frequently appear in informal writing contexts like social media posts and casual messaging. This is a critical production consideration since real users don't constrain their writing to clean, formal English. The tokenization behavior also proved superior in preserving distinctions between different space character types (users employ over 10 different types of space characters), which T5 failed by normalizing all non-standard spaces to regular spaces (U+0020). Such normalization can significantly alter text meaning in production scenarios.

Beyond tokenization quality, Llama's decoder-only architecture provided performance advantages when running on Apple's MLX machine learning framework. The architectural compatibility resulted in faster runtime performance, which directly impacts the user experience of real-time correction suggestions. This highlights an important LLMOps principle: model selection must consider not just accuracy metrics but also the specific deployment environment, hardware acceleration capabilities, and framework optimizations.

## Training Data Strategy and Synthesis

Creating appropriate training data for this production model required addressing two dimensions: writing style coverage and error coverage. The team couldn't rely solely on naturally occurring data because certain error types appear infrequently or inconsistently in available corpora. Their solution involved combining publicly available sources with synthetic data generation, demonstrating a practical approach to data engineering for LLMOps.

For writing style coverage, they used copyright-free books, articles, and large-scale corpora like C4 (internet data) to capture diverse contexts ranging from academic papers to social media posts to casual messages. This breadth ensures the production model can recognize and process the various writing scenarios users encounter, rather than optimizing for a narrow distribution that wouldn't generalize.

The error coverage strategy required more sophisticated data synthesis. For grammar corrections, they built a separate T5-based model trained on a subset of the C4_200M dataset specifically to inject grammatical errors into clean text. This error injection model introduced common mistakes like incorrect verb tenses, creating training data that mimics real-world linguistic inaccuracies. This approach reflects a practical LLMOps pattern: using models to generate training data for other models, especially when naturally occurring examples are insufficient.

For spelling corrections, the team identified that while their real-world dataset captured common errors like typos ("teh" for "the") and phonetic misinterpretations ("their" instead of "there"), it systematically missed critical errors involving white space and punctuation (like "some where" or "som ewhere" for "somewhere"). To address this gap, they created synthetic data by injecting white space errors into longer and less commonly used words, mirroring the real-world distribution showing that longer, less frequent words are disproportionately susceptible to these mistakes. This targeted synthetic data generation addresses specific weaknesses in the training distribution, demonstrating thoughtful data engineering for production model quality.

## Performance Optimization for Production Deployment

Meeting the real-time latency requirements for on-device inference required systematic optimization across multiple layers of the stack. The team exceeded their 50 tokens/second threshold through architectural optimizations, hardware-aware acceleration, and model compression techniques that together enabled production deployment on resource-constrained devices.

The architectural optimizations included implementing Grouped Query Attention (GQA), which shares specific calculations across the model to reduce computational overhead without compromising accuracy. This represents a deliberate trade-off in model architecture to prioritize inference efficiency—a key consideration for production LLMOps where latency directly impacts user experience.

Hardware-aware acceleration leveraged Apple's MLX framework, designed explicitly for M-series chips. This integration allowed the model to utilize the Mac operating system's unified memory architecture, eliminating CPU-to-GPU data transfers that would otherwise add latency. The choice to target specific hardware platforms (Apple silicon) reflects a pragmatic LLMOps approach: rather than attempting universal deployment, focus on environments where you can achieve the best performance, then expand. This also demonstrates the importance of framework selection in production deployments—using MLX rather than generic frameworks provided measurable performance advantages.

Model quantization proved critical for meeting memory and latency constraints. The team applied quantization techniques to convert the model's numerical weights from 16-bit floating-point numbers to 4-bit integers, reducing the model's memory footprint by 70%. This dramatic compression significantly improved runtime performance while maintaining correction quality, as validated through their evaluation process. The successful application of 4-bit quantization without quality degradation suggests careful attention to quantization-aware training or post-training quantization calibration, though the case study doesn't detail the specific techniques used.

The combined optimizations resulted in final processing speed of approximately 210 tokens/second on an M2 Mac, exceeding the 50 tokens/second threshold by more than 4x. This performance margin provides headroom for the model to maintain responsiveness even when the device is under load from other applications—an important production consideration for software running in unrestricted user environments rather than dedicated inference servers.

## Evaluation Methodology and Results

The evaluation approach combined publicly available datasets with human annotators, providing both quantitative benchmarks and qualitative assessments of correction quality. This multi-faceted evaluation strategy is appropriate for production LLMOps where model behavior must satisfy both objective accuracy metrics and subjective user experience criteria.

The model demonstrated several strengths in production scenarios. It excelled at correcting misspellings by replacing lower-frequency words (often misspellings) with their higher-frequency correct alternatives, which improves overall text quality. The model preserved text meaning and voice when suggesting corrections, demonstrating high precision by only suggesting corrections when confident an error exists—avoiding the frustrating false positives that would erode user trust. In most cases, the model maintained tense consistency across sentences in paragraphs, showing appropriate context understanding.

However, the evaluation also revealed three specific limitations. The model sometimes incorrectly standardizes uncommon spellings of proper nouns, especially names with multiple valid spelling variations—a challenging problem since the training data would show both variants. It occasionally struggles with proper article placement, which the team notes is a common challenge even for fluent English speakers, suggesting this limitation may be inherent to the task difficulty rather than fixable through simple model improvements. Finally, the model sometimes prematurely applies tense corrections, particularly with stand-alone sentences lacking broader context, indicating potential over-correction when context is limited.

The team attributes these limitations to biases in the training data, which included internet content containing errors and stylistic variations. The casual language common in social media and blogs introduces patterns that don't align with formal English standards, including slang and non-American English dialects. This represents an honest assessment of production model limitations tied to training data characteristics—the diversity that helps the model handle various writing styles also introduces ambiguity and non-standard patterns that can lead to inappropriate corrections.

## Deployment Strategy and Future Directions

The deployment approach reflects prudent LLMOps practices for introducing models with potential quality concerns. Rather than immediately rolling out to all users, they plan to deploy to a small set of users to gather feedback and continue iterating on the experience. This staged rollout allows them to monitor real-world performance, identify edge cases not captured in their evaluation datasets, and refine the model based on actual user interactions before broader deployment.

The team is also working to refine their training data with more targeted examples and implement selective filtering mechanisms to address the identified limitations. This iterative improvement cycle—deploy, monitor, identify weaknesses, refine data, retrain—represents mature LLMOps practices for production model development.

Looking forward, they're exploring how to condense other models, like complex rewrites, into streamlined versions that can run locally on devices. This suggests an expanding vision for on-device AI capabilities, applying the lessons learned from this spelling and grammar correction model to more sophisticated language tasks. The success of consolidating multiple specialized models into a single 1B-parameter model that meets strict quality and latency requirements provides evidence that this approach can scale to additional use cases.

## Critical Assessment and LLMOps Lessons

While the case study presents an impressive technical achievement, readers should consider several nuances. The focus on Apple silicon with MLX framework represents a platform-specific optimization rather than a general solution—results may differ significantly on other hardware platforms or operating systems. The team doesn't discuss what portion of their user base this deployment covers or how they'll extend to other platforms, which would be important for understanding the business impact.

The evaluation methodology, while combining datasets and human annotation, doesn't provide specific metrics (accuracy, precision, recall, F1 scores) or comparison baselines showing how the 1B-parameter model compares quantitatively to their existing multi-model system. The claim that it performs "as effectively as the larger models" is qualitative rather than quantitatively demonstrated. The identified limitations around proper nouns, article placement, and premature tense corrections could represent significant user experience issues depending on how frequently they occur in practice.

The synthetic data generation approach, while creative, introduces its own potential biases. The T5-based error injection model and rule-based white space error insertion may not fully capture the distribution of errors real users make, potentially leading to models that handle synthetic errors well but struggle with real-world error patterns. The reliance on internet data (C4) for training also means the model inherits whatever biases, errors, and stylistic quirks exist in that corpus.

Despite these considerations, the case study demonstrates several valuable LLMOps principles: the importance of clear production requirements (quality, voice preservation, latency) guiding technical decisions; careful base model selection considering tokenization, architecture, and framework compatibility; creative data engineering to address coverage gaps; systematic optimization across architectural, hardware, and compression dimensions; multi-faceted evaluation combining quantitative and qualitative assessments; and staged deployment with plans for iterative improvement. The successful consolidation of multiple specialized models into a single on-device model represents meaningful progress toward offline AI capabilities that can enhance user experience without requiring constant connectivity.