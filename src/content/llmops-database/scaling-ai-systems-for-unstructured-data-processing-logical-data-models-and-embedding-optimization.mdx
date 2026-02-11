---
title: "Scaling AI Systems for Unstructured Data Processing: Logical Data Models and Embedding Optimization"
slug: "scaling-ai-systems-for-unstructured-data-processing-logical-data-models-and-embedding-optimization"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ab8a6afe867c67fde73"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:40:18.030Z"
  createdOn: "2024-11-21T13:50:48.224Z"
llmopsTags:
  - "amazon-aws"
  - "cache"
  - "chunking"
  - "cost-optimization"
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "databases"
  - "devops"
  - "embeddings"
  - "latency-optimization"
  - "microsoft-azure"
  - "model-optimization"
  - "multi-modality"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "unstructured-data"
industryTags: "tech"
company: "CoActive AI"
summary: "CoActive AI addresses the challenge of processing unstructured data at scale through AI systems. They identified two key lessons: the importance of logical data models in bridging the gap between data storage and AI processing, and the strategic use of embeddings for cost-effective AI operations. Their solution involves creating data+AI hybrid teams to resolve impedance mismatches and optimizing embedding computations to reduce redundant processing, ultimately enabling more efficient and scalable AI operations."
link: "https://www.youtube.com/watch?v=uWc8BUJ5QKs"
year: 2023
seo:
  title: "CoActive AI: Scaling AI Systems for Unstructured Data Processing: Logical Data Models and Embedding Optimization - ZenML LLMOps Database"
  description: "CoActive AI addresses the challenge of processing unstructured data at scale through AI systems. They identified two key lessons: the importance of logical data models in bridging the gap between data storage and AI processing, and the strategic use of embeddings for cost-effective AI operations. Their solution involves creating data+AI hybrid teams to resolve impedance mismatches and optimizing embedding computations to reduce redundant processing, ultimately enabling more efficient and scalable AI operations."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-systems-for-unstructured-data-processing-logical-data-models-and-embedding-optimization"
  ogTitle: "CoActive AI: Scaling AI Systems for Unstructured Data Processing: Logical Data Models and Embedding Optimization - ZenML LLMOps Database"
  ogDescription: "CoActive AI addresses the challenge of processing unstructured data at scale through AI systems. They identified two key lessons: the importance of logical data models in bridging the gap between data storage and AI processing, and the strategic use of embeddings for cost-effective AI operations. Their solution involves creating data+AI hybrid teams to resolve impedance mismatches and optimizing embedding computations to reduce redundant processing, ultimately enabling more efficient and scalable AI operations."
---

## Overview

CoActive AI, presented by co-founder Will Rojas, shares insights from over three years of user research and two years of building systems designed to bring structure to unstructured data. The company focuses on building reliable, scalable, and adaptable AI systems for processing unstructured content, particularly in the visual domain (images and video). This presentation was delivered at a MLOps/AI conference and outlines key architectural lessons learned when deploying foundation models at scale.

The core thesis of the talk centers on a fundamental shift in how organizations handle data. While structured, tabular data has well-established pathways for processing and consumption, unstructured data (text, images, audio, video) represents approximately 80% of worldwide data by 2025 and lacks these clear processing pipelines. CoActive AI's mission is to unlock value from this unstructured content through AI, but the presentation focuses specifically on the operational challenges of doing this at scale.

## The State of Unstructured Data Processing

Will observes that despite significant AI hype, most organizations still do little more than archive their unstructured data. While this is changing rapidly, particularly for text-based applications, adoption lags significantly for other modalities like images, video, and audio. Organizations typically fall into several categories when handling unstructured data: they archive and ignore it, throw human labelers at it, use one-off AI-powered APIs, or attempt to build scalable AI systems. CoActive AI advocates for the latter approach but acknowledges the significant challenges involved.

## Lesson 1: Logical Data Models Matter More Than You Think

The first major insight concerns the often-overlooked importance of logical data models in AI pipelines. The presentation describes a common anti-pattern where organizations treat AI as a "monolith that generates metadata." In this pattern, data is stored in a blob store (typically as JSON with key-value pairs), fed to a foundation model owned by the AI team, and the output is consumed by product teams or BI analysts.

The critical problem is the "impedance mismatch" between how data is physically stored and how AI models need to consume it. Foundation models are highly specific about their inputs in two dimensions:

- **Data-specific requirements**: Different requirements for text, audio, images, video, etc.
- **Task-specific requirements**: Different preprocessing for sentiment analysis versus summarization versus language detection

This creates a combinatorial explosion of logical data models that need to be supported. The physical data model (a simple key-value JSON store) does not capture the complexity of what the AI systems actually need.

### Examples of Logical Data Model Transformations

For text summarization, no transformation may be needed—the raw text can be fed directly. However, for language detection, a random selection of sentences might suffice. For sentiment analysis, key phrase extraction might be more appropriate than processing the full text.

For multimodal content like social media posts containing comments, background images, songs, videos, and images, the logical model might need to represent these as a single entity containing multiple modalities rather than separate disconnected pieces.

### The Organizational Problem

The presentation identifies a key organizational dysfunction: nobody explicitly owns this transformation layer. The data engineering team builds storage systems that don't capture AI team needs, while the AI team builds ad-hoc systems to fix the mismatch. This creates bottlenecks throughout the AI pipeline.

### The Solution

CoActive AI's recommendation is to create hybrid data-plus-AI teams that explicitly own the logical data model layer. When teams recognize and address this mismatch, two things happen:

- The AI bottleneck is resolved
- Optimization opportunities become visible

A concrete example given: if three different processes are performing the same image transformation to feed into a ViT (Vision Transformer) model, that's redundant compute happening three times. When data and AI teams collaborate, they can identify that the pre-transformed, pre-computed image can be consumed directly by all three downstream processes, dramatically improving GPU utilization.

## Lesson 2: Embeddings as a Cost-Optimization Mechanism

The second lesson offers a different perspective on embeddings—not primarily as semantic representations for similarity search (the typical use case discussed in LLMOps contexts), but as a caching mechanism for computational efficiency.

### The Cost Explosion Problem

The presentation describes a common trajectory: an organization starts with one foundation model for one task. Success leads to a second task, then a third, and quickly the organization has multiple foundation models running in parallel. This causes AI costs to spiral out of control, and billing departments start asking uncomfortable questions. Cost becomes a bottleneck that throttles further foundation model applications.

### Understanding Foundation Model Architecture

The key insight is to break down the monolithic view of foundation models. When viewed as computation graphs, most of the compute happens in the feature extraction layers (the "encoder" or early layers of the model). Task-specific work typically only involves changing the final output layers.

This means that when running the same content through multiple foundation models for different tasks, the majority of the compute is duplicated—the same feature extraction is happening multiple times. This is described as "insane" from a cost perspective.

### The Embedding Caching Solution

The solution is to run data through the foundation model's feature extraction layers once and cache the resulting embeddings. These cached embeddings can then serve all downstream tasks. This approach:

- Reduces latency
- Reduces cost
- Unlocks new capacity for parallel foundation model usage
- Makes running multiple models economically viable

This reframing is significant for LLMOps practitioners who typically think of embeddings purely as semantic representations for RAG or similarity search. The caching perspective opens up new architectural patterns for cost-effective AI at scale.

## Scale Considerations: From Data Lakes to Data Oceans

The presentation uses a memorable analogy to illustrate the scale challenges of unstructured data processing. Using 10 million rows as a baseline:

- **Structured data (float32s)**: ~40 megabytes, compared to Lake Tahoe
- **Text documents**: ~40 gigabytes, compared to the Caspian Sea (the world's largest lake)
- **Video data**: Terabytes, compared to the Pacific Ocean

This orders-of-magnitude increase in data volume as you move from structured to unstructured to video data requires fundamentally different tooling approaches. The phrase "data oceans" rather than "data lakes" captures this shift.

## Critical Assessment

While the presentation offers valuable architectural insights, it's worth noting several limitations:

- **Vendor perspective**: CoActive AI is selling a platform for visual data processing, so the lessons naturally lead toward their product offering
- **Limited specifics**: The presentation is high-level and doesn't provide detailed benchmarks or quantified improvements from their approaches
- **Assumed context**: Some claims (like the 80% unstructured data by 2025 statistic) are presented without sources
- **Early-stage validation**: While they mention "three plus years of user research and two years of building," no customer case studies or production metrics are shared

The core insights about logical data models and embedding caching are sound architectural principles that apply broadly to LLMOps, regardless of whether one uses CoActive AI's specific platform. The organizational recommendation to create hybrid data-AI teams addresses a real challenge in many enterprises where these functions are siloed.

## Key Takeaways for LLMOps Practitioners

The presentation's lessons translate into actionable guidance for anyone building production AI systems:

- Explicitly design and own the transformation layer between physical storage and AI model inputs
- Consider embeddings not just for semantic similarity but as a compute-caching mechanism
- Break down foundation models conceptually to identify redundant computation
- Create cross-functional teams that span data engineering and AI/ML
- Anticipate that unstructured data, especially video, requires fundamentally different infrastructure than traditional data systems

These insights are particularly relevant as organizations move beyond initial AI experiments toward production systems that need to be cost-effective and scalable.