---
title: "Automating Video Ad Classification with GenAI"
slug: "automating-video-ad-classification-with-genai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b1b5fc6f3d079f63cb792"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:49:32.380Z"
  createdOn: "2024-12-12T17:20:31.106Z"
llmopsTags:
  - "classification"
  - "content-moderation"
  - "speech-recognition"
  - "multi-modality"
  - "realtime-application"
  - "model-optimization"
  - "semantic-search"
  - "latency-optimization"
  - "cost-optimization"
  - "fastapi"
  - "monitoring"
  - "scaling"
  - "redis"
  - "cache"
  - "microsoft-azure"
  - "openai"
  - "databricks"
industryTags: "media-entertainment"
company: "MediaRadar | Vivvix"
summary: "MediaRadar | Vivvix faced challenges with manual video ad classification and fragmented workflows that couldn't keep up with growing ad volumes. They implemented a solution using Databricks Mosaic AI and Apache Spark Structured Streaming to automate ad classification, combining GenAI models with their own classification systems. This transformation enabled them to process 2,000 ads per hour (up from 800), reduced experimentation time from 2 days to 4 hours, and significantly improved the accuracy of insights delivered to customers."
link: "https://www.databricks.com/customers/mediaradar-vivvix"
year: 2024
seo:
  title: "MediaRadar | Vivvix: Automating Video Ad Classification with GenAI - ZenML LLMOps Database"
  description: "MediaRadar | Vivvix faced challenges with manual video ad classification and fragmented workflows that couldn't keep up with growing ad volumes. They implemented a solution using Databricks Mosaic AI and Apache Spark Structured Streaming to automate ad classification, combining GenAI models with their own classification systems. This transformation enabled them to process 2,000 ads per hour (up from 800), reduced experimentation time from 2 days to 4 hours, and significantly improved the accuracy of insights delivered to customers."
  canonical: "https://www.zenml.io/llmops-database/automating-video-ad-classification-with-genai"
  ogTitle: "MediaRadar | Vivvix: Automating Video Ad Classification with GenAI - ZenML LLMOps Database"
  ogDescription: "MediaRadar | Vivvix faced challenges with manual video ad classification and fragmented workflows that couldn't keep up with growing ad volumes. They implemented a solution using Databricks Mosaic AI and Apache Spark Structured Streaming to automate ad classification, combining GenAI models with their own classification systems. This transformation enabled them to process 2,000 ads per hour (up from 800), reduced experimentation time from 2 days to 4 hours, and significantly improved the accuracy of insights delivered to customers."
---

## Overview

MediaRadar | Vivvix is an advertising intelligence company that helps brand marketers and advertising agencies understand their competitive landscape and optimize media spend decisions. Their core mission involves identifying "what, where and when" for their clients—essentially classifying advertisements to determine brand, products, and notable details like featured celebrities. This case study documents their transition from a manual, fragmented data processing approach to an automated GenAI-powered classification system using Databricks' platform.

The case study is presented by Databricks as a customer success story, which means it naturally emphasizes positive outcomes. However, the technical details provided offer genuine insight into how LLMs can be operationalized for large-scale classification tasks in the advertising domain.

## The Problem: Scale and Manual Limitations

MediaRadar | Vivvix faced what they describe as "an extreme classification problem"—classifying ads across over 6 million unique products. Their previous infrastructure relied on Amazon Simple Queue Service (SQS) with significant limitations: manual polling for data and a constraint of only 10 messages at a time. This setup made it difficult to meet service level agreements (SLAs).

The company's Senior ML Engineer, Dong-Hwi Kim, noted that existing ML models were inadequate due to the sheer scale and diversity of products. Even their fine-tuned in-house ML model couldn't handle the millions of products because they lacked sufficient training data to support such a broad classification scheme. The pre-existing process relied heavily on manual labor—hundreds of operators watching ads and recording detailed information about their elements. This approach was not sustainable given that overall ad spend by companies had almost doubled in recent years, making it unfeasible to proportionally increase human resources.

Additionally, their infrastructure suffered from fragmentation. Principal Software Engineer Thierry Steenberghs described a "nightmare" scenario with multiple pods running different components, requiring separate Azure logins to monitor operations. The workflow involved building models, exporting them, and then importing them elsewhere—a process that wasted significant engineering time.

## The Solution Architecture

MediaRadar | Vivvix implemented a multi-layered approach using Databricks' platform, combining several technologies to automate their ad classification pipeline:

### Data Ingestion and Streaming

The adoption of Apache Spark Structured Streaming enabled continuous, real-time data ingestion without manual intervention. This replaced the previous SQS-based approach that required manual polling. The streaming architecture allowed them to process video ad data as it arrived, eliminating concerns about meeting SLAs and enabling efficient processing of thousands of ads per hour.

### Preprocessing Pipeline

Before classification, the team developed robust preprocessing pipelines with several components:

- **Fingerprinting**: Identifying duplicate ads to reduce redundant processing and maintain database cleanliness
- **Transcription using Whisper**: Extracting audio content from video ads using OpenAI's Whisper model
- **Translation**: Converting non-English content for consistent processing
- **Optical Character Recognition (OCR)**: Extracting textual information displayed within the ads

These preprocessing steps were critical for preparing data for the GenAI classification stage and maintaining a clean, deduplicated database.

### Dual-Layer GenAI Classification Approach

The core innovation was a dual-layer classification strategy that combined GenAI capabilities with MediaRadar | Vivvix's proprietary classification models:

- **Layer 1 - GenAI Product Identification**: Uses generative AI (specifically OpenAI's GPT-3.5) to identify products appearing in advertisements
- **Layer 2 - Hybrid Matching**: Compares GenAI results against MediaRadar | Vivvix's own classification models to select the best matches
- **Final Selection**: The Databricks Platform is used again to select the optimal match from combined predictions, refining results and improving overall accuracy

This approach leverages the generalization capabilities of large language models while grounding predictions against domain-specific models trained on their proprietary taxonomy, resulting in higher accuracy for identifying correct products.

### Infrastructure and Scaling with Ray on Databricks

The team utilized Ray clusters on Databricks to optimize video processing and scale classification across millions of categories. Ray provides distributed computing capabilities that allow horizontal scaling of the video processing and classification workloads. This was essential for handling the volume of ads that needed processing.

### Model Serving and Cost Management

Initial experimentation was conducted using the Mosaic AI Model Serving environment, which facilitated rapid prototyping and testing of various machine learning models. This environment provided a sandbox for quickly iterating on different approaches.

A notable production consideration was cost management. The team chose OpenAI's GPT-3.5 model rather than more expensive alternatives like GPT-4, explicitly balancing performance against expense. This decision allowed them to process thousands of creative assets daily without incurring prohibitive costs—a practical consideration often overlooked in case studies but critical for sustainable LLM operations at scale.

### Unified Platform Benefits

One of the significant operational improvements came from consolidating their workflow onto a single platform. Steenberghs emphasized that moving everything into Databricks eliminated data silos. The team can now:

- Monitor data ingestion from all sources (including external vendors) in one place
- Observe data transformations in real-time
- Track model training progress
- Measure model performance

This unified view replaced the previous fragmented monitoring across multiple systems and Azure instances.

## Results and Performance Improvements

The case study reports several quantitative improvements:

- **Throughput increase**: From approximately 800 creatives per hour to about 2,000 per hour—a 150% improvement
- **Experimentation time reduction**: Model experimentation and testing reduced from two days to approximately four hours (half a day)

These improvements enabled MediaRadar | Vivvix to keep pace with the rapidly growing volume of advertisements in the market without proportionally increasing human resources.

## Future Directions

The company expressed plans to implement Databricks Unity Catalog for enhanced data management and security. This is particularly important for an advertising intelligence company handling data from multiple brands, as it enables fine-grained access control—allowing open access while restricting who can see specific data. This addresses a current challenge where enforcing security is difficult in their existing setup.

## Critical Assessment

While this case study presents compelling results, a few considerations are worth noting:

- The 150% throughput improvement and time savings are self-reported metrics from a vendor success story, so independent verification is not available
- The case study focuses primarily on classification accuracy improvements in aggregate but doesn't provide specific precision/recall metrics or error rates
- The cost comparison between manual operators and the GPT-3.5 based solution is not quantified, though the decision to use GPT-3.5 over more expensive models suggests cost sensitivity was a real factor
- The dual-layer approach (GenAI + proprietary models) is an interesting pattern that acknowledges LLMs alone may not be sufficient for domain-specific classification tasks

Overall, this case study demonstrates a practical approach to scaling classification tasks using LLMs, with attention to production concerns like cost management, preprocessing quality, and monitoring. The hybrid approach of combining GenAI with domain-specific models is a pattern worth noting for organizations facing similar extreme classification challenges.