---
title: "Building a Guardrail System for LLM-based Menu Transcription"
slug: "building-a-guardrail-system-for-llm-based-menu-transcription"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67e419fa7810f5ac1f7042ef"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:04:25.305Z"
  createdOn: "2025-03-26T15:15:06.666Z"
llmopsTags:
  - "document-processing"
  - "multi-modality"
  - "structured-output"
  - "error-handling"
  - "prompt-engineering"
  - "fine-tuning"
  - "human-in-the-loop"
  - "fallback-strategies"
  - "pytorch"
  - "tensorflow"
  - "monitoring"
  - "guardrails"
  - "openai"
industryTags: "e-commerce"
company: "Doordash"
summary: "Doordash developed a system to automatically transcribe restaurant menu photos using LLMs, addressing the challenge of maintaining accurate menu information on their delivery platform. Instead of relying solely on LLMs, they created an innovative guardrail framework using traditional machine learning to evaluate transcription quality and determine whether AI or human processing should be used. This hybrid approach allowed them to achieve high accuracy while maintaining efficiency and adaptability to new AI models."
link: "https://careersatdoordash.com/blog/doordash-llm-transcribe-menu/"
year: 2025
seo:
  title: "Doordash: Building a Guardrail System for LLM-based Menu Transcription - ZenML LLMOps Database"
  description: "Doordash developed a system to automatically transcribe restaurant menu photos using LLMs, addressing the challenge of maintaining accurate menu information on their delivery platform. Instead of relying solely on LLMs, they created an innovative guardrail framework using traditional machine learning to evaluate transcription quality and determine whether AI or human processing should be used. This hybrid approach allowed them to achieve high accuracy while maintaining efficiency and adaptability to new AI models."
  canonical: "https://www.zenml.io/llmops-database/building-a-guardrail-system-for-llm-based-menu-transcription"
  ogTitle: "Doordash: Building a Guardrail System for LLM-based Menu Transcription - ZenML LLMOps Database"
  ogDescription: "Doordash developed a system to automatically transcribe restaurant menu photos using LLMs, addressing the challenge of maintaining accurate menu information on their delivery platform. Instead of relying solely on LLMs, they created an innovative guardrail framework using traditional machine learning to evaluate transcription quality and determine whether AI or human processing should be used. This hybrid approach allowed them to achieve high accuracy while maintaining efficiency and adaptability to new AI models."
---

## Overview

Doordash, the food delivery platform, undertook a project to automate the transcription of restaurant menu photos into structured data. Previously, this process was entirely manual, requiring human operators to review menu images and transcribe item names, prices, categories, and other attributes. This was both costly and time-consuming, creating friction for restaurant partners who need to keep their menus updated on the platform. The emergence of capable LLMs presented an opportunity to automate this workflow, but significant challenges around accuracy and reliability had to be addressed before moving to production.

The case study is notable for its pragmatic approach to LLM deployment: rather than waiting for LLMs to achieve perfect accuracy, the team built a sophisticated guardrail system using traditional ML techniques that allows them to confidently deploy LLM-based transcription at scale while maintaining quality standards.

## The Initial Prototype

The team rapidly built an initial minimum viable product (MVP) leveraging the fast prototyping capabilities that LLMs enable. The basic pipeline consisted of two stages: first, optical character recognition (OCR) extracts raw text from a menu image, then an LLM processes this text to perform item-level information extraction and summarization, outputting a structured data format. This approach demonstrates a common pattern in LLM applications where OCR handles the visual-to-text conversion and the LLM provides the semantic understanding and organization capabilities.

The text notes that "LLMs have greatly accelerated how quickly we can develop an initial minimum viable product, completely changing the way we discover possibilities." This speaks to a broader trend in LLMOps where teams can quickly validate ideas before investing in full production systems.

## Challenges Encountered

Through human evaluation of a large number of menu photos, the team identified that a "reasonable proportion" of menus resulted in transcription errors. This is a critical observation for anyone deploying LLMs in production: evaluation and testing against real-world data is essential before launch. The team conducted a thorough investigation and identified three primary categories of problematic inputs:

- **Inconsistent menu structure**: Menus with unconventional layouts led to confusing OCR output where text wasn't read in logical order. This made it difficult for the LLM to correctly associate items with their prices and attributes.

- **Incomplete menus**: Photos showing partial menus caused the LLM to struggle with correctly linking items to their attributes, as some information was simply not visible in the image.

- **Low photographic quality**: Issues like poor lighting, glare, small fonts, or cluttered foregrounds/backgrounds degraded both OCR and LLM performance.

The team notes they made "intensive effort" to improve LLM performance directly, but given their high accuracy standards, this would require "a tremendous amount of time and investment." This is an honest acknowledgment that LLMs, while powerful, often cannot meet production accuracy requirements out of the box, and that prompt engineering or fine-tuning may not be sufficient or cost-effective solutions in all cases.

## The Guardrail Framework

Rather than continuing to push for LLM improvements, the team took a different approach: building a guardrail layer that predicts whether a given transcription will be accurate enough for production use. This represents a key architectural decision in LLMOps—treating the LLM as one component in a larger system rather than a standalone solution.

The guardrail model is a traditional ML classifier that takes features from three sources:

- **Menu photo features**: Direct image features that capture photo quality, layout complexity, and other visual characteristics.

- **OCR output features**: Characteristics of the raw text extracted by OCR, which can reveal issues like inconsistent ordering or fragmented text.

- **LLM summarization features**: Properties of the LLM's output itself, which might include confidence signals or structural patterns.

The key insight was that predicting transcription quality requires understanding the interactions between all three stages of the pipeline. For example, an inconsistent menu structure manifests as illogical ordering in the OCR output, which then causes LLM errors in attribute linkage.

## Model Architecture and Selection

The team explored several model architectures for the guardrail, including:

- LightGBM (gradient boosting on tabular features)
- Neural networks with CNN-based image encoders (VGG16, ResNet)
- Neural networks with Transformer-based image encoders (ViT, DiT)

Interestingly, the simplest model—LightGBM—outperformed all the neural network variants while also being the fastest. The neural network with ResNet followed closely, while Vision Transformer (ViT) performed worst. The team attributes this to limited labeled data, which made it difficult to leverage more complex model designs. This is an important lesson for practitioners: sophisticated architectures are not always the answer, especially when training data is scarce. The team's three-component neural network design that concatenates image features with tabular features through fully connected layers represents a reasonable approach for multimodal inputs, but in this case the simpler approach won.

The performance was evaluated on two metrics: average transcription accuracy across all test menu photos, and percentage of transcriptions meeting accuracy requirements. This dual-metric approach reflects the practical needs of the system—both overall quality and the reliability of individual predictions matter.

## Production Pipeline: Partial Automation

The production deployment follows a "partial automation" pattern that is common in LLMOps when full automation isn't yet reliable enough. The pipeline works as follows:

- All validated menu photos are processed by the LLM transcription model
- The guardrail model evaluates each transcription's predicted quality
- Transcriptions that pass the accuracy threshold are automatically accepted
- Transcriptions that fail are routed to human reviewers for manual processing

This hybrid human-AI system represents a pragmatic approach to production deployment. It allows the team to capture value from automation on the "easy" cases while maintaining quality by keeping humans in the loop for challenging inputs. The text describes this as "our first step toward improving efficiency in the manual human processes without sacrificing quality."

## Adaptation to New Models

One of the most operationally valuable aspects of the guardrail framework is its flexibility in adapting to new AI models. The team notes that during the six months following their initial deployment, there was "rapid evolution in the generative AI world, including the development of multimodality models."

They continued exploring new transcription models, finding that each generation had unique trade-offs. For example, multimodal models (which process images directly rather than relying on separate OCR) were better at context understanding but more prone to errors on poor-quality photos. OCR+LLM approaches maintained more stable performance but underperformed on context understanding.

The guardrail framework allowed the team to "leverage newly released state-of-the-art AI models quickly" while "balancing the pros and cons of different models." This is a significant operational advantage—rather than being locked into a single model, the system can incorporate improvements as the field advances. The updated pipeline described includes both multimodality GenAI models and the guardrail model working together.

## Future Directions

The team identifies several areas for continued development:

- **Fine-tuning custom models**: As they accumulate more manually transcribed data, they could use it to fine-tune LLMs or multimodal models specifically for restaurant menu understanding. Current models are trained on general datasets without domain expertise.

- **Improving input quality**: One of the biggest challenges remains poor-quality menu photos. Implementing processes to ensure better photo quality at submission time could significantly improve downstream transcription accuracy.

## Key LLMOps Lessons

This case study illustrates several important principles for deploying LLMs in production:

The concept of "guardrails" as a pattern for LLM deployment is central to this work. Rather than relying solely on the LLM to achieve production-quality results, the team built a supervision layer that filters outputs based on predicted quality. This allows them to move to production faster while maintaining quality standards.

The hybrid human-AI system demonstrates that full automation isn't always the goal. By automating the easier cases and routing difficult ones to humans, the team captures value immediately while continuing to improve the automated portion over time.

The choice of simple ML models (LightGBM) over complex neural networks for the guardrail is a reminder that model complexity should match data availability and problem requirements. The fastest and most accurate solution was also the simplest.

The framework's ability to adapt to new models is operationally valuable in a fast-moving field. By abstracting the transcription model from the quality prediction layer, the team can upgrade components independently.

Finally, the importance of thorough evaluation before deployment is emphasized. The team's human evaluation of a large number of menu photos was essential for understanding failure modes and designing appropriate solutions.