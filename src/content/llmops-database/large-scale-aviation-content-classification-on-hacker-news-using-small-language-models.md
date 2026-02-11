---
title: "Large-Scale Aviation Content Classification on Hacker News Using Small Language Models"
slug: "large-scale-aviation-content-classification-on-hacker-news-using-small-language-models"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67f393d2bd6c6e23ab7d7bfb"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:05:38.318Z"
  createdOn: "2025-04-07T08:58:58.028Z"
llmopsTags:
  - "classification"
  - "structured-output"
  - "data-analysis"
  - "data-cleaning"
  - "prompt-engineering"
  - "semantic-search"
  - "token-optimization"
  - "chunking"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cloudflare"
  - "amazon-aws"
industryTags: "tech"
company: "Skysight"
summary: "Skysight conducted a large-scale analysis of Hacker News content using small language models (SLMs) to classify aviation-related posts. The project processed 42 million items (10.7B input tokens) using a parallelized pipeline and cloud infrastructure. Through careful prompt engineering and model selection, they achieved efficient classification at scale, revealing that 0.62% of all posts and 1.13% of stories were aviation-related, with notable temporal trends in aviation content frequency."
link: "https://www.skysight.inc/blog/hacker-news-aviation"
year: 2025
seo:
  title: "Skysight: Large-Scale Aviation Content Classification on Hacker News Using Small Language Models - ZenML LLMOps Database"
  description: "Skysight conducted a large-scale analysis of Hacker News content using small language models (SLMs) to classify aviation-related posts. The project processed 42 million items (10.7B input tokens) using a parallelized pipeline and cloud infrastructure. Through careful prompt engineering and model selection, they achieved efficient classification at scale, revealing that 0.62% of all posts and 1.13% of stories were aviation-related, with notable temporal trends in aviation content frequency."
  canonical: "https://www.zenml.io/llmops-database/large-scale-aviation-content-classification-on-hacker-news-using-small-language-models"
  ogTitle: "Skysight: Large-Scale Aviation Content Classification on Hacker News Using Small Language Models - ZenML LLMOps Database"
  ogDescription: "Skysight conducted a large-scale analysis of Hacker News content using small language models (SLMs) to classify aviation-related posts. The project processed 42 million items (10.7B input tokens) using a parallelized pipeline and cloud infrastructure. Through careful prompt engineering and model selection, they achieved efficient classification at scale, revealing that 0.62% of all posts and 1.13% of stories were aviation-related, with notable temporal trends in aviation content frequency."
---

## Overview

Skysight, an infrastructure company focused on large-scale inference workloads, conducted an analysis project to classify the entire corpus of Hacker News posts (approximately 42 million items) to determine the proportion of aviation-related content. This case study serves as both a demonstration of their tooling capabilities and an interesting data analysis exercise. The project highlights the practical application of small language models (SLMs) for batch inference tasks at scale, showcasing how modern pre-trained models can perform nuanced classification without the need for labeled training data or custom model development.

The author, Seth Kimmel, describes himself as an engineer and private pilot who noticed a seemingly high volume of aviation content on Hacker News. The project originated as a curiosity around 2023 when LLMs became popular, but at that time the larger models were too expensive and tooling was inadequate for offline data processing tasks. This case study represents the culmination of Skysight's work over the past year to build optimized end-to-end tooling for data-and-compute-intensive problems.

## Technical Architecture and Pipeline

### Data Collection and Storage

The pipeline begins with data gathering from Hacker News's free public API. The team highly parallelized the fetching of historical posts and stored the data in a Cloudflare R2 bucket (an S3-compatible object storage service) distributed across more than 900 Parquet files. This resulted in approximately 42 million items in total. The use of Parquet format is notable as it provides efficient columnar storage and compression, which is well-suited for analytical workloads.

### Data Preprocessing

The preprocessing stage involved filtering and transforming the raw data to make it maximally useful for the language model. The team used Polars (a fast DataFrame library for Python) to process the data. Key preprocessing steps included:

- Filtering out posts that have neither a title nor text content
- Concatenating each post's title and text fields into a single input string
- Creating a structured prompt format with clear field labels ("Title:" and "Text:")

The team deliberately chose to limit context to just the title and text, avoiding potential information overload from additional metadata such as comments, ancestor posts, user profiles, or other user activity. This represents a practical tradeoff between providing sufficient context for accurate classification and managing input token costs and complexity.

### Model Selection and Prompt Engineering

The project employed Llama 3.1 8B, a relatively small pre-trained language model, for the classification task. This choice reflects a key insight in the case study: smaller models are becoming increasingly performant and customizable, while compute costs continue to decrease. The author argues that inference cost viability is no longer the primary concern—appropriate tooling is.

For prompt engineering, the team developed a system prompt that provides clear classification criteria with explicit examples. The prompt instructs the model to determine whether a post is "explicitly, directly related to aviation" and includes both positive and negative examples to anchor the model's understanding. The prompt requests both a boolean classification and a justification for the answer, which aids in debugging and quality assessment.

The structured output is enforced using a JSON schema that specifies the expected response format with two required fields: `is_aviation_related` (boolean) and `justification` (string). This structured decoding approach ensures consistent, parseable outputs across millions of inferences.

### Rapid Prototyping Workflow

A notable aspect of the LLMOps approach described is the emphasis on fast, cost-effective prototyping. The team used the first 10,000 rows of data to iterate on model selection, prompt engineering, and output schema decisions. Each iteration cycle reportedly took only about a minute and cost several cents to run. Rather than implementing formal evaluation frameworks, the team relied on manual inspection of results to steer toward a "good-enough" solution—a pragmatic approach that trades statistical rigor for speed of iteration.

The manual inspection process involved filtering for positive classifications and reviewing both the outputs and inputs. The team identified examples of true positives (Wright Brothers articles, drone racing, NASA content, Concorde successors) as well as false positives (a spider-drone robot, a comment about detachable car engines). This qualitative assessment informed their confidence in the solution before scaling up.

### Scaling to Production

Once satisfied with the prototype results, the team scaled the pipeline to process the full dataset. After filtering for non-null stories, approximately 40.5 million posts were processed, totaling 10.7 billion input tokens. The system completed inference in a couple of hours and generated 1.9 billion output tokens, all structured as JSON strings for easy parsing.

This scale of batch inference—processing over 10 billion tokens in hours—demonstrates the capability of modern inference infrastructure to handle massive workloads cost-effectively. The structured JSON output format facilitated downstream aggregation and analysis.

## Results and Analysis

The classification found that 249,847 posts (approximately 0.62% of all items) were aviation-related. However, when filtering to just posts (excluding comments and other story types), the percentage rises to 1.13%. The author calculates that this translates to roughly a 29% chance of the Hacker News top stories containing an aviation-related post at any given time.

Temporal analysis revealed interesting patterns. Two major spikes in aviation content corresponded to significant real-world events: the March 2019 second 737 MAX crash and the January 2024 Alaska Airlines door blowout incident. More notably, the overall percentage of aviation-related posts has increased over time, from around 0.5% between 2007-2012 to approximately 1.5% in recent years.

## Limitations and Honest Assessment

The author is transparent about the limitations of this analysis, describing it as "relatively hand-wavy" due to the lack of statistical evaluation and rigor. Key acknowledged blindspots include:

- No formal evaluation metrics or ground truth comparison
- Discounting of false positives in aggregate statistics
- No accounting for false negative rates
- Manual inspection rather than systematic validation

The author promises future posts covering more rigorous evaluation methods for batch inference, as well as techniques like ensemble modeling, distillation, and adversarial approaches to improve effectiveness.

## LLMOps Insights and Takeaways

This case study provides several valuable insights for LLMOps practitioners:

**Small Models for Batch Tasks**: The project demonstrates that smaller, pre-trained models like Llama 3.1 8B can perform nuanced classification tasks effectively when cost and scale are primary concerns. The tradeoff between model capability and inference cost is particularly relevant for batch processing millions of items.

**Structured Output Enforcement**: Using JSON schemas to enforce structured outputs is crucial for large-scale batch inference where consistent, parseable results enable automated downstream processing.

**Pragmatic Prototyping**: The approach of manual inspection on a subset before scaling up represents a practical pattern for exploratory data analysis with LLMs, though it comes with acknowledged limitations around statistical validity.

**Infrastructure as Differentiator**: The case study implicitly positions appropriate tooling and infrastructure as the key enabler for these workloads, rather than model capability or raw compute cost. Skysight is clearly using this analysis as a demonstration of their infrastructure capabilities.

**Data Engineering Matters**: The pipeline's success depends heavily on traditional data engineering practices—efficient storage formats (Parquet), parallel data fetching, appropriate preprocessing, and structured storage (R2 buckets). LLMOps in practice requires integration with the broader data stack.

It's worth noting that this case study comes from a company selling infrastructure for exactly these use cases, so the emphasis on tooling and the ease of their system should be taken with appropriate consideration. The technical approach is sound, but the lack of formal evaluation means the accuracy claims should be viewed as indicative rather than definitive.