---
title: "Optimizing Production LLM Chatbot Performance Through Multi-Model Classification"
slug: "optimizing-production-llm-chatbot-performance-through-multi-model-classification"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67c4564c82ff7a682f53d7c5"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:01:56.893Z"
  createdOn: "2025-03-02T12:59:56.629Z"
llmopsTags:
  - "chatbot"
  - "classification"
  - "translation"
  - "document-processing"
  - "embeddings"
  - "rag"
  - "semantic-search"
  - "prompt-engineering"
  - "error-handling"
  - "langchain"
  - "tensorflow"
  - "pytorch"
  - "fastapi"
  - "redis"
  - "amazon-aws"
  - "cohere"
  - "anthropic"
industryTags: "automotive"
company: "IDIADA"
summary: "IDIADA developed AIDA, an intelligent chatbot powered by Amazon Bedrock, to assist their workforce with various tasks. To optimize performance, they implemented specialized classification pipelines using different approaches including LLMs, k-NN, SVM, and ANN with embeddings from Amazon Titan and Cohere models. The optimized system achieved 95% accuracy in request routing and drove a 20% increase in team productivity, handling over 1,000 interactions daily."
link: "https://aws.amazon.com/blogs/machine-learning/how-idiada-optimized-its-intelligent-chatbot-with-amazon-bedrock?tag=soumet-20"
year: 2025
seo:
  title: "IDIADA: Optimizing Production LLM Chatbot Performance Through Multi-Model Classification - ZenML LLMOps Database"
  description: "IDIADA developed AIDA, an intelligent chatbot powered by Amazon Bedrock, to assist their workforce with various tasks. To optimize performance, they implemented specialized classification pipelines using different approaches including LLMs, k-NN, SVM, and ANN with embeddings from Amazon Titan and Cohere models. The optimized system achieved 95% accuracy in request routing and drove a 20% increase in team productivity, handling over 1,000 interactions daily."
  canonical: "https://www.zenml.io/llmops-database/optimizing-production-llm-chatbot-performance-through-multi-model-classification"
  ogTitle: "IDIADA: Optimizing Production LLM Chatbot Performance Through Multi-Model Classification - ZenML LLMOps Database"
  ogDescription: "IDIADA developed AIDA, an intelligent chatbot powered by Amazon Bedrock, to assist their workforce with various tasks. To optimize performance, they implemented specialized classification pipelines using different approaches including LLMs, k-NN, SVM, and ANN with embeddings from Amazon Titan and Cohere models. The optimized system achieved 95% accuracy in request routing and drove a 20% increase in team productivity, handling over 1,000 interactions daily."
---

## Overview

IDIADA (Applus+ IDIADA) is a global partner to the automotive industry with over 30 years of experience in product development, design, engineering, testing, and homologation services. In 2021, they established a Digital Solutions department to drive innovation through digital tools. Within this context, they developed AIDA (Applus Idiada Digital Assistant), an intelligent chatbot powered by Amazon Bedrock that serves as a virtual assistant for IDIADA's workforce.

This case study focuses on a specific LLMOps challenge: how to efficiently classify and route incoming user requests to appropriate processing pipelines. As AIDA's usage grew, the diversity of requests expanded from simple queries to complex tasks including document translations, internal service inquiries, and file uploads. The team needed to categorize these interactions to route them to specialized pipelines for more efficient handling.

## The Classification Challenge

The core production challenge was developing a robust classifier that could categorize user interactions into three main groups: Conversation (general inquiries), Services (specific functionality requests), and Document_Translation (text translation needs). The goal was to improve response efficiency, accuracy, and resource allocation by having dedicated processing pipelines for each category.

The team worked with a dataset of 1,668 pre-classified human interactions, split 40/60 between training (666 examples) and testing (1,002 examples). This deliberate emphasis on the test set indicates a focus on generalization performance, which is crucial for production deployment.

## Technical Approaches Evaluated

### LLM-Based Simple Prompt Classifier

The first approach used Anthropic's Claude 3 Sonnet model through Amazon Bedrock with a carefully crafted prompt. The implementation used LangChain for integration, Boto3 for AWS connectivity, and structured output parsing to extract classifications in JSON format.

Key implementation details include setting `max_tokens` to 50 and `temperature` to 0.0 for deterministic output. The prompt included class definitions and a hierarchical classification approach, prioritizing the Conversation class first (since 99% of interactions are simple questions) before considering other classes. The code included error handling that defaulted to 'Conversation' if parsing failed, which is a pragmatic production consideration.

### LLM-Based Example Augmented Inference (RAG)

The second approach enhanced the simple prompt with examples for each class, following RAG principles. Instead of relying solely on compressed definitions, the model received quasi-definitions by extension through diverse examples.

The implementation faced significant scalability challenges. The Conversation class had 500 examples (limited due to infrastructure constraints), Services had 26 examples, and Document_Translation had 140 examples. The team noted that while more examples could improve performance, they hit bottlenecks including quota issues with Amazon Bedrock, high delays, throttling, and connection shutouts. This resulted in unacceptable response times of approximately 18 seconds per classification, compared to 1.2 seconds for the simple prompt approach.

### K-NN-Based Classifier with Embeddings

Recognizing that many interactions share similar patterns, the team shifted to distance-based classification using embeddings. They tested two embedding models through Amazon Bedrock:

**Amazon Titan Text Embeddings G1**: Generates 1,536-dimensional vectors with multilingual support. The k-NN classifier with k=3 performed optimally based on F1 score analysis across different k values.

**Cohere Multilingual Embeddings Model**: Generates 1,024-dimensional vectors with strong multilingual capabilities. The optimal k value was 11. Notably, Cohere's model has a 1,500 character limit for input text, which required truncating longer interactions.

The team performed dimensionality reduction to visualize the embedding spaces in 2D, finding that both models produced similar but rotated vector spaces with distinct class clusters, making them well-suited for distance-based classification.

### SVM-Based Classifier

Building on the geometric structure revealed by the embeddings, the team implemented SVM classifiers using scikit-learn. They performed grid search with 10-fold cross-validation using weighted F1 score as the evaluation metric.

The optimal parameters for both embedding models were: C=1 (indicating balanced model complexity), class_weight=None (suggesting minor classes don't significantly impact the decision boundary), and kernel='linear' (indicating categories are linearly separable in the high-dimensional space).

### ANN-Based Classifier

The team also evaluated a simple neural network approach with a three-layer architecture (16 neurons → 8 neurons → 3 neurons), using ReLU activations and softmax output. Min/max normalization was applied to input vectors. Training included early stopping based on categorical accuracy (patience=25), and one-hot encoding was used for outputs to avoid ordinal assumptions.

The training process used a multi-threaded approach with 20 repetitions to find optimal weights, running for up to 500 epochs with batch size 64 and learning rate 0.01.

## Results and Production Implications

The comprehensive evaluation revealed striking differences in both performance and efficiency:

| Approach | Conversation F1 | Services F1 | Doc Translation F1 | Runtime |
|----------|-----------------|-------------|-------------------|---------|
| Simple LLM | 0.81 | 0.22 | 0.46 | 1.2s |
| LLM with examples | 0.86 | 0.13 | 0.68 | 18s |
| k-NN + Titan | 0.98 | 0.57 | 0.88 | 0.35s |
| k-NN + Cohere | 0.96 | 0.72 | 0.72 | 0.35s |
| SVM + Titan | 0.98 | 0.69 | 0.82 | 0.3s |
| SVM + Cohere | 0.99 | 0.80 | 0.93 | 0.3s |
| ANN + Titan | 0.98 | 0.60 | 0.87 | 0.15s |
| ANN + Cohere | 0.99 | 0.77 | 0.96 | 0.15s |

The classical ML approaches with embeddings dramatically outperformed the pure LLM-based classifiers across all metrics. The SVM and ANN approaches with Cohere embeddings achieved the best balance of performance and efficiency, with the ANN being the fastest at 0.15 seconds per inference.

Interestingly, adding examples to the LLM actually hurt performance on the Services class (dropping from 0.22 to 0.13) while significantly increasing latency from 1.2s to 18s. This demonstrates that naive RAG approaches don't always improve outcomes and can introduce production-breaking latency issues.

## Production Deployment Outcomes

The optimized AIDA system now handles over 1,000 interactions per day with a claimed 95% accuracy rate in routing requests to appropriate pipelines. IDIADA reports a 20% increase in team productivity, though it's worth noting these figures come from the company itself and should be interpreted with appropriate context.

## Key LLMOps Insights

This case study provides several valuable insights for LLMOps practitioners:

**Embedding + Classical ML can outperform LLM inference for classification**: The combination of pre-trained embeddings with simple classifiers achieved better accuracy and 4-60x faster inference than direct LLM classification. This pattern is worth considering when the task is well-defined classification rather than open-ended generation.

**RAG approaches have scalability limits**: The example-augmented approach hit infrastructure constraints including API quotas, throttling, and latency issues that made it impractical for production use, despite potential accuracy improvements with more examples.

**Multilingual considerations matter**: Cohere's multilingual model outperformed Amazon Titan for this multilingual use case, though it came with input length limitations that required handling.

**Model evaluation methodology**: The team's use of 40/60 train/test splits, 10-fold cross-validation for hyperparameter tuning, and multi-threaded training repetitions demonstrates production-grade evaluation practices.

**Pipeline architecture**: The classification layer enables routing to specialized downstream pipelines (conversation handling, service orchestration, translation), showing how LLMOps often involves orchestrating multiple components rather than single model deployment.

Looking forward, IDIADA plans to offer AIDA as an integrated product for customer environments, which would require additional considerations around multi-tenancy, customization, and deployment flexibility that are common in productized AI solutions.