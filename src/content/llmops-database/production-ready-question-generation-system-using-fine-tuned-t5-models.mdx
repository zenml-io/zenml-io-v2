---
title: "Production-Ready Question Generation System Using Fine-Tuned T5 Models"
slug: "production-ready-question-generation-system-using-fine-tuned-t5-models"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3a9f396698005999689c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:39:03.631Z"
  createdOn: "2024-11-21T13:50:23.725Z"
llmopsTags:
  - "compliance"
  - "devops"
  - "error-handling"
  - "fine-tuning"
  - "google"
  - "guardrails"
  - "human-in-the-loop"
  - "microsoft"
  - "model-optimization"
  - "monitoring"
  - "question-answering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "tensorflow"
  - "token-optimization"
industryTags: "finance"
company: "Digits"
summary: "Digits implemented a production system for generating contextual questions for accountants using fine-tuned T5 models. The system helps accountants interact with clients by automatically generating relevant questions about transactions. They addressed key challenges like hallucination and privacy through multiple validation checks, in-house fine-tuning, and comprehensive evaluation metrics. The solution successfully deployed using TensorFlow Extended on Google Cloud Vertex AI with careful attention to training-serving skew and model performance monitoring."
link: "https://digits.com/developer/posts/assisting-accountants-with-generative-machine-learning/"
year: 2023
seo:
  title: "Digits: Production-Ready Question Generation System Using Fine-Tuned T5 Models - ZenML LLMOps Database"
  description: "Digits implemented a production system for generating contextual questions for accountants using fine-tuned T5 models. The system helps accountants interact with clients by automatically generating relevant questions about transactions. They addressed key challenges like hallucination and privacy through multiple validation checks, in-house fine-tuning, and comprehensive evaluation metrics. The solution successfully deployed using TensorFlow Extended on Google Cloud Vertex AI with careful attention to training-serving skew and model performance monitoring."
  canonical: "https://www.zenml.io/llmops-database/production-ready-question-generation-system-using-fine-tuned-t5-models"
  ogTitle: "Digits: Production-Ready Question Generation System Using Fine-Tuned T5 Models - ZenML LLMOps Database"
  ogDescription: "Digits implemented a production system for generating contextual questions for accountants using fine-tuned T5 models. The system helps accountants interact with clients by automatically generating relevant questions about transactions. They addressed key challenges like hallucination and privacy through multiple validation checks, in-house fine-tuning, and comprehensive evaluation metrics. The solution successfully deployed using TensorFlow Extended on Google Cloud Vertex AI with careful attention to training-serving skew and model performance monitoring."
---

## Overview

Digits is an accounting automation company that provides AI-powered bookkeeping and financial management tools for small businesses and accounting firms. This case study, published in March 2023, details how they implemented generative machine learning to assist accountants in their day-to-day client communications. The specific use case focuses on automatically generating contextual questions about financial transactions that accountants can send to their clients for clarification.

The core problem being addressed is the repetitive nature of accountant-client interactions around transaction categorization and verification. Accountants frequently need to ask clients about ambiguous transactions, and manually typing these questions for every transaction creates significant time overhead. Digits aimed to reduce this tedium by generating suggested questions that accountants can either send with a single click or edit before sending.

It's worth noting that this article comes from Digits' own engineering blog and serves a dual purpose of technical education and marketing. While the technical details appear genuine and substantive, readers should be aware that the narrative naturally emphasizes the positive aspects of their implementation.

## Technical Architecture

### Base Model Selection and Fine-Tuning Approach

Digits uses models from the T5 (Text-to-Text Transfer Transformer) family as their base model. The T5 architecture, pre-trained by Google Brain, follows the encoder-decoder transformer pattern that has become foundational for generative text tasks. Rather than training from scratch—which would require massive computational resources (the article references that OpenAI's GPT-3 3B model required 50 petaflop/s-days of compute)—Digits fine-tunes these pre-trained models for their domain-specific accounting use case.

The fine-tuning approach allows them to maintain full control over the training data used for domain adaptation while leveraging the linguistic capabilities learned during pre-training. The team acknowledges a key limitation here: they don't have visibility into the original pre-training data used by large model providers, which introduces potential implicit biases.

### Training Data Structure

The training data is structured around two key inputs:
- **Transaction descriptions**: The raw text from financial transactions (e.g., "UNITED AIR 6786632 11/22 NY" or "SQ* COFFEESHOP ST JOHNS PORTLAND")
- **Persona**: A style indicator that allows the model to generate questions in different tones (professional/concise versus casual/wordy)

This persona-based approach is particularly interesting from a product perspective, as it allows accountants to maintain authentic communication styles with different clients while still benefiting from automation.

### Data Preprocessing Pipeline

Digits uses TensorFlow Transform for data preprocessing, which runs on Google Cloud Dataflow for scalability. A key architectural decision highlighted in the case study is the export of the preprocessing graph alongside the model. This is a best practice in MLOps that helps avoid training-serving skew—a common problem where the data processing applied during training differs from what's applied during inference.

The preprocessing code shown in the article demonstrates:
- Tokenization using FastSentencePieceTokenizer from TensorFlow Text
- Padding sequences to fixed lengths (ENCODER_MAX_LEN and DECODER_MAX_LEN)
- Creation of attention masks for both encoder and decoder inputs
- Conversion to appropriate tensor formats

By incorporating tokenization directly into the exported model using TensorFlow Text, they achieve a cleaner deployment architecture where the model accepts raw text inputs rather than requiring a separate tokenization service.

### Training Infrastructure

Model training is orchestrated through TensorFlow Extended (TFX) running on Google Cloud's Vertex AI platform. This setup provides:
- Scalable training infrastructure
- Centralized metadata storage for all training artifacts (raw data, preprocessed training data, trained models, evaluation results)
- Pipeline-based workflow for reproducibility

While the article mentions converting HuggingFace T5 models to TensorFlow ops, this is notable because it enables deployment on TensorFlow Serving without requiring a Python layer—a decision that likely improves inference performance and simplifies deployment.

### Model Serving Architecture

The serving signature shown in the code demonstrates how the trained model is packaged for production use. The model includes:
- The TensorFlow Transform layer for preprocessing
- The fine-tuned T5 model for generation
- Built-in detokenization to return human-readable text

This all-in-one approach simplifies the inference pipeline and reduces the risk of inconsistencies between training and serving environments.

## Safety and Quality Measures

### Hallucination Concerns

The article is refreshingly candid about the hallucination problem in generative models. They provide a vivid example where the model got stuck generating "fil-a" repeatedly when processing a Chick-fil-A transaction, failing to produce a stop token. This kind of failure mode is characteristic of autoregressive text generation where token-by-token generation can compound errors.

### Multi-Layer Safety System

Digits implements at least three layers of protection before generated content reaches end users:

- **Toxicity Screening**: Every generated message is automatically screened for toxicity, insults, and obscenity. Any detection triggers immediate discarding of the text and alerts to the ML team for investigation.

- **Hallucination Pattern Matching**: Generated suggestions are validated against known patterns of hallucinations. This catches outputs that may not be toxic but are confusing or out of context.

- **Human Review**: A human accountant always reviews and confirms any suggested question before it is sent to a client. This human-in-the-loop approach is essential for high-stakes business communications.

This layered approach reflects a mature understanding that generative AI outputs cannot be trusted blindly, especially in professional contexts where reputation matters.

## Evaluation Framework

### Custom TFX Evaluation Component

Digits developed a custom TFX component for model evaluation that runs as part of every training pipeline. This component:
- Checks model versions against five different metrics
- Compares new versions against the last released version
- Makes automated recommendations about whether to deploy new versions

The removal of humans from the deployment decision process (based on quantitative metrics) is an interesting approach that can help ensure consistency and reduce bias in release decisions.

### Evaluation Metrics

The evaluation framework uses a thoughtfully designed set of complementary metrics:

- **Levenshtein Distance**: Measures character-level differences between expected and generated questions. Interestingly, they want this to be high—indicating linguistic diversity rather than rote memorization of training examples.

- **Semantic Similarity**: Measures whether the generated question captures the same meaning as the human-curated reference, even if expressed differently. They want this to be high.

- **ROUGE (Recall-Oriented Understudy for Gisting Evaluation)**: A standard metric for text generation that measures overlap between generated and reference texts.

- **Must-Have and Optional Token Scoring**: A custom metric that rewards the model for including contextually relevant terms (e.g., mentioning "travel" when processing an airline transaction).

The tension between Levenshtein distance and semantic similarity is particularly clever—they want models that express the same meaning in diverse ways, not models that simply memorize training examples.

### Evaluation Dataset

They maintain a curated evaluation dataset with human-written reference questions for each transaction type. This allows for consistent comparison across model versions, though the article doesn't specify the size or diversity of this evaluation set.

## Privacy Considerations

The article emphasizes that Digits fine-tunes models in-house and never shares customer data without consent. This is an important consideration for financial services applications where transaction data is highly sensitive. By performing fine-tuning internally rather than using external APIs, they maintain tighter control over data handling.

## Limitations and Considerations

While the article presents a well-engineered system, there are some aspects worth considering:

- The article doesn't discuss model latency or throughput, which are important production concerns for real-time suggestion generation.
- The scale of deployment (number of transactions processed, volume of questions generated) is not specified.
- The effectiveness of the hallucination pattern matching is described qualitatively but not quantified.
- The human review step, while important for safety, may create a bottleneck in high-volume scenarios.

## Conclusion

This case study demonstrates a practical, production-focused approach to deploying generative AI in a domain-specific business context. The emphasis on safety measures, evaluation rigor, and infrastructure best practices reflects lessons learned from deploying ML systems at scale. The use of established tools (TFX, TensorFlow Serving, Vertex AI) rather than custom solutions suggests a pragmatic engineering culture focused on reliability over novelty.