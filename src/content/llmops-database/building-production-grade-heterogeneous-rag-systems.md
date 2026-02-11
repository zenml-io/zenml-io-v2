---
title: "Building Production-Grade Heterogeneous RAG Systems"
slug: "building-production-grade-heterogeneous-rag-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ab8ed978765d2cefb2e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:43:53.906Z"
  createdOn: "2024-11-21T13:50:48.909Z"
llmopsTags:
  - "amazon-aws"
  - "anthropic"
  - "caption-generation"
  - "code-generation"
  - "databases"
  - "elasticsearch"
  - "embeddings"
  - "monitoring"
  - "multi-agent-systems"
  - "multi-modality"
  - "prompt-engineering"
  - "rag"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "structured-output"
  - "system-prompts"
  - "unstructured-data"
  - "vector-search"
industryTags: "tech"
company: "AWS GenAIIC"
summary: "AWS GenAIIC shares practical insights from implementing RAG systems with heterogeneous data formats in production. The case study explores using routers for managing diverse data sources, leveraging LLMs' code generation capabilities for structured data analysis, and implementing multimodal RAG solutions that combine text and image data. The solutions include modular components for intent detection, data processing, and retrieval across different data types with examples from multiple industries."
link: "https://aws.amazon.com/blogs/machine-learning/from-rag-to-fabric-lessons-learned-from-building-real-world-rags-at-genaiic-part-2?tag=soumet-20"
year: 2024
seo:
  title: "AWS GenAIIC: Building Production-Grade Heterogeneous RAG Systems - ZenML LLMOps Database"
  description: "AWS GenAIIC shares practical insights from implementing RAG systems with heterogeneous data formats in production. The case study explores using routers for managing diverse data sources, leveraging LLMs' code generation capabilities for structured data analysis, and implementing multimodal RAG solutions that combine text and image data. The solutions include modular components for intent detection, data processing, and retrieval across different data types with examples from multiple industries."
  canonical: "https://www.zenml.io/llmops-database/building-production-grade-heterogeneous-rag-systems"
  ogTitle: "AWS GenAIIC: Building Production-Grade Heterogeneous RAG Systems - ZenML LLMOps Database"
  ogDescription: "AWS GenAIIC shares practical insights from implementing RAG systems with heterogeneous data formats in production. The case study explores using routers for managing diverse data sources, leveraging LLMs' code generation capabilities for structured data analysis, and implementing multimodal RAG solutions that combine text and image data. The solutions include modular components for intent detection, data processing, and retrieval across different data types with examples from multiple industries."
---

## Overview

This case study from AWS GenAIIC (Generative AI Innovation Center) provides an in-depth technical guide on building Retrieval Augmented Generation (RAG) systems that can handle heterogeneous data formats in production environments. As a Part 2 of a series, this article moves beyond text-only RAG to address the operational challenges of working with mixed data sources including structured tables, unstructured text, and images. The content is primarily educational and prescriptive, drawing from hands-on experience with customer implementations across multiple industries.

The article describes several real-world use cases that the GenAIIC team has worked on, including technical assistance systems for field engineers, oil and gas data analysis platforms, financial data analysis systems, industrial maintenance solutions, and ecommerce product search capabilities. While these are presented as customer implementations, specific company names and quantitative results are not disclosed, which limits the ability to verify claims independently.

## Production Architecture Patterns

### Query Routing for Heterogeneous Data Sources

One of the key LLMOps patterns introduced is the use of a router component to direct incoming queries to appropriate processing pipelines based on the query's nature and required data type. This is crucial in production systems where different data types require distinct retrieval and processing strategies.

The router accomplishes intent detection through an initial LLM call. The article recommends using a smaller, faster model like Anthropic's Claude Haiku on Amazon Bedrock to minimize latency in the routing step. This is a practical consideration for production deployments where response time matters.

The router prompt template provided demonstrates several best practices for production LLM systems:
- Clear definition of available data sources with descriptions
- Use of XML tags following Anthropic's Claude best practices for structured input and output
- Few-shot examples to guide the model's behavior
- Explicit handling of out-of-scope queries

The article provides actual code for parsing the router's response using regex patterns to extract the selected data source from XML tags. This approach of using structured output formats is essential for reliable production systems where LLM responses need to be programmatically processed.

An important production consideration mentioned is handling ambiguous queries. The article suggests adding a "Clarifications" category as a pseudo-data source that allows the system to ask users for more information when needed, improving user experience and reducing incorrect routing decisions.

The article also mentions that an alternative to prompt-based routing is using the native tool use capability (function calling) available in the Bedrock Converse API, where each data source is defined as a tool. This provides another production-ready pattern for implementing routing logic.

### LLM Code Generation for Structured Data Analysis

A significant portion of the article addresses the challenge of analyzing tabular data with LLMs. The key insight is that LLMs do not perform well at analyzing raw tabular data passed directly in prompts, but they excel at code generation. The recommended approach is to leverage LLM code generation capabilities to write Python or SQL code that performs the required analysis.

The article notes that LLMs like Anthropic's Claude Sonnet 3.5 have 92% accuracy on the HumanEval code benchmark, making code generation a reliable approach for production systems. The workflow involves:
- Prompting the LLM to write Python (for CSV, Excel, or Parquet files) or SQL (for SQL databases) code
- Parsing and executing the generated code
- Optionally sending the output back to the LLM for a final natural language response

The article mentions that while libraries like LlamaIndex and LangChain offer out-of-the-box text-to-SQL and text-to-Pandas pipelines for quick prototyping, writing custom pipelines provides better control over prompts, code execution, and outputs in production systems.

Several production considerations are highlighted:
- For large output dataframes, directly returning results to the UI is more efficient than sending through another LLM call, which could cause high latency and hallucination risks
- Custom pipelines allow for sanity checks on generated code to prevent issues like modifying existing files or databases
- Using a scratchpad in the prompt helps the LLM think through the problem before generating code

The complete code example demonstrates the full pipeline using boto3 to call Amazon Bedrock, including parsing code from XML tags, executing with Python's exec function, and optionally making a follow-up LLM call for natural language responses.

### Multimodal RAG Implementation

The article provides detailed guidance on implementing multimodal RAG systems that handle both text and image data. Three categories of multimodal queries are identified:
- Image retrieval based on text input
- Text retrieval based on image input  
- Image retrieval based on combined text and image input

Two main approaches are presented for building multimodal retrieval systems:

**Approach 1: Multimodal Embedding Models**

Using models like Amazon Titan Multimodal Embeddings, both images and text can be embedded into a shared vector space for direct comparison. This approach is simpler and works well for finding images that match high-level descriptions or finding visually similar items. The article provides complete code examples for both ingestion (embedding images and storing in OpenSearch with k-NN vector fields) and retrieval (embedding queries and performing k-NN search).

**Approach 2: Multimodal LLM for Captioning**

This approach uses multimodal foundation models like Anthropic's Claude to generate detailed captions for images, which are then embedded using text embedding models like Amazon Titan Text Embeddings. The captions and embeddings are stored alongside the original images. This approach provides more detailed and customizable results, as captions can be guided to focus on specific aspects like color, fabric, pattern, or shape.

The article provides a comparison table evaluating both approaches across key production factors:
- Speed: Multimodal embeddings are faster for ingestion
- Cost: Multimodal embeddings are more cost-effective
- Detail: Captioning provides more detailed descriptions
- Customization: Captioning is highly customizable through prompts
- Latency: Text input latency is similar, but image input has additional latency with captioning due to the LLM call

## Technology Stack

The article describes a production stack built on AWS services:
- **Amazon Bedrock**: Hosts foundation models including Anthropic Claude (Haiku, Sonnet, Opus, Sonnet 3.5) and Amazon Titan Multimodal Embeddings
- **Amazon Titan Multimodal Embeddings**: For embedding both images and text into shared vector space
- **Amazon Titan Text Embeddings v2**: For text-only embedding when using the captioning approach
- **OpenSearch**: Used as the vector database with k-NN capabilities for similarity search
- **Python with boto3**: For orchestrating the RAG pipeline

## Critical Assessment

While this article provides valuable technical guidance and code examples, it is important to note several limitations from an LLMOps perspective:

- The case studies mentioned (oil and gas, financial analysis, etc.) are presented at a high level without specific company names, implementation timelines, or quantitative results, making it difficult to verify claims about effectiveness
- The article is published by AWS and heavily promotes AWS services, so there is inherent bias toward the AWS ecosystem
- No discussion of monitoring, observability, or ongoing maintenance of these systems in production
- Limited discussion of error handling, fallback mechanisms, or graceful degradation strategies
- No mention of testing strategies, CI/CD pipelines, or deployment practices
- Cost considerations are mentioned only briefly in the comparison table without concrete numbers

Despite these limitations, the article provides practical, production-ready code examples and architectural patterns that would be valuable for teams building RAG systems with heterogeneous data sources. The modular approach of breaking down the problem into routing, retrieval, and generation components reflects good software engineering practices for production LLM systems.