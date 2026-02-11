---
title: "Scaling and Optimizing Self-Hosted LLMs for Developer Documentation"
slug: "scaling-and-optimizing-self-hosted-llms-for-developer-documentation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3fd627280fabc45e033b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:40:28.887Z"
  createdOn: "2024-11-21T14:12:38.083Z"
llmopsTags:
  - "amazon-aws"
  - "cost-optimization"
  - "document-processing"
  - "documentation"
  - "fastapi"
  - "guardrails"
  - "latency-optimization"
  - "mistral"
  - "model-optimization"
  - "monitoring"
  - "question-answering"
  - "rag"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "vllm"
industryTags: "tech"
company: "Various"
summary: "A tech company needed to improve their developer documentation accessibility and understanding. They implemented a self-hosted LLM solution using retrieval augmented generation (RAG), with guard rails for content safety. The team optimized performance using vLLM for faster inference and Ray Serve for horizontal scaling, achieving significant improvements in latency and throughput while maintaining cost efficiency. The solution helped developers better understand and adopt the company's products while keeping proprietary information secure."
link: "https://www.youtube.com/watch?v=886hZl5Qp7g"
year: 2023
seo:
  title: "Various: Scaling and Optimizing Self-Hosted LLMs for Developer Documentation - ZenML LLMOps Database"
  description: "A tech company needed to improve their developer documentation accessibility and understanding. They implemented a self-hosted LLM solution using retrieval augmented generation (RAG), with guard rails for content safety. The team optimized performance using vLLM for faster inference and Ray Serve for horizontal scaling, achieving significant improvements in latency and throughput while maintaining cost efficiency. The solution helped developers better understand and adopt the company's products while keeping proprietary information secure."
  canonical: "https://www.zenml.io/llmops-database/scaling-and-optimizing-self-hosted-llms-for-developer-documentation"
  ogTitle: "Various: Scaling and Optimizing Self-Hosted LLMs for Developer Documentation - ZenML LLMOps Database"
  ogDescription: "A tech company needed to improve their developer documentation accessibility and understanding. They implemented a self-hosted LLM solution using retrieval augmented generation (RAG), with guard rails for content safety. The team optimized performance using vLLM for faster inference and Ray Serve for horizontal scaling, achieving significant improvements in latency and throughput while maintaining cost efficiency. The solution helped developers better understand and adopt the company's products while keeping proprietary information secure."
---

## Overview

This case study covers a mini-summit featuring three speakers discussing different aspects of LLM production optimization. The presentations complement each other well: Matt from Fuzzy Labs covers infrastructure scaling and benchmarking, Vaibhav from Boundary presents BAML for structured output optimization, and Tom from SAS discusses combining traditional NLP with LLMs for document analysis. Together, they provide a comprehensive view of LLMOps challenges and solutions across different layers of the stack.

## Fuzzy Labs: Self-Hosted RAG System for Developer Documentation

### Business Context and Problem

Fuzzy Labs, a UK-based MLOps consultancy, worked with an unnamed tech company (described as a hardware and software platform provider) that faced a significant challenge: their technical documentation was difficult to navigate, and developers struggled to understand their products. The business goal was to improve developer experience and grow their developer community.

The customer had specific requirements that shaped the technical approach:
- Self-hosted infrastructure was mandatory due to proprietary documentation that couldn't be shared with third parties
- The customer wanted to build internal LLM capabilities and learn from the process
- The system needed to handle production-scale traffic with good response times

### Architecture Overview

The solution implemented a retrieval-augmented generation (RAG) architecture with several key components:

- **Orchestration Layer**: A Python FastAPI service handles incoming developer queries and coordinates the pipeline
- **Vector Database**: Stores embeddings of documentation for semantic retrieval
- **Model Server**: Hosts Mistral 7B Instruct on GPU instances in AWS
- **Guardrails Service**: A separate model trained to filter off-topic questions (stock prices, competitor products) and prevent harmful outputs (removing proprietary information, blocking inappropriate requests)

The guardrails component is noteworthy as it represents a second model in the system that also requires scaling considerations, demonstrating that production LLM systems often involve multiple models with different resource requirements.

### Benchmarking Philosophy and Methodology

The speaker emphasized a critical principle often attributed to Donald Knuth: "Premature optimization is the root of all evil." Before attempting any optimization, the team established a rigorous benchmarking methodology.

They used Locust, a Python-based load testing tool, to simulate different traffic scenarios:
- **Dev Testing**: Baseline representing developer usage during development
- **Typical Day**: 20 concurrent users as an educated estimate
- **Strained Day**: 30 concurrent users (50% increase)
- **High Traffic**: 50 concurrent users (simulating viral attention)
- **Failure Point**: Pushing until system breaks to understand limits

The key metrics tracked were:
- **Latency**: Total response time in seconds
- **Throughput**: Tokens output per second
- **Request Rate**: Successful requests per minute

Importantly, the team maintained scientific rigor by recording test conditions, software versions, git commits, environment details, and dataset versions for reproducibility.

### Initial Performance and Bottlenecks

Initial testing with standard Hugging Face pipelines plus FastAPI revealed severe limitations:
- Very high latency that grew quickly with additional users
- Essentially unusable for more than one user
- The system failed at surprisingly low user counts (around 5 users)

### Vertical Scaling: vLLM for Inference Optimization

The team adopted vLLM, which addresses the key bottleneck in transformer inference: GPU memory, specifically the key-value attention lookups. vLLM implements "paged attention," which the speaker describes as analogous to virtual memory for LLMs, though noting the metaphor is somewhat imprecise.

The claimed benefits of vLLM are significant:
- 24x throughput improvement over plain Hugging Face pipelines
- 2.5x improvement over Hugging Face TGI (Text Generation Inference)

In practice, Fuzzy Labs observed:
- Improved latency across all user levels
- Slower growth rate in latency as users increase
- No increase in compute costs (same number of GPUs)

### Horizontal Scaling: Ray Serve for Distributed Inference

For handling concurrent users beyond what a single server can manage, the team implemented Ray Serve, a framework developed by Anyscale and used by OpenAI, Uber, and LinkedIn.

Key capabilities of Ray Serve in this deployment:
- **Abstracted multi-server deployment**: Simplifies deploying models across multiple servers
- **Autoscaling**: Integrates with cloud provider autoscaling to dynamically adjust resources
- **GPU Sharing**: Allows multiple services (LLM, guardrails, vector embeddings) to share GPU resources efficiently

The integration between Ray Serve and vLLM was described as "pretty recent" at the time of the project and not without challenges, though the speaker expected improvements over time.

### Key Takeaways from Fuzzy Labs

The speaker emphasized that this represents a single data point in an industry still figuring out best practices for LLM deployment. The main lessons:
- Always benchmark before optimizing
- Consider both vertical (vLLM) and horizontal (Ray Serve) scaling
- Self-hosting LLMs for production requires addressing these challenges; this is one viable approach

## Boundary: BAML for Structured Output Optimization

### The Problem with Structured Outputs

Vaibhav from Boundary presented BAML (Boundary AI Markup Language), an open-source DSL for improving structured output reliability from LLMs. The core insight is that LLMs struggle with strict output formats like JSON, which requires quotes, proper comma placement, and no comments. Smaller, cheaper models particularly struggle with format compliance, leading to parsing failures even when the underlying data is correct.

### BAML's Technical Approach

BAML takes a fundamentally different approach than traditional prompt engineering or OpenAI's structured outputs:

- **Custom Parsing Algorithms**: Instead of relying on the LLM to output perfectly formatted JSON, BAML uses sophisticated parsing algorithms (described as "dynamic programming" rather than just regex) to extract structured data from less constrained LLM outputs
- **Token Reduction**: By allowing the model to skip quotation marks and other JSON syntax requirements, BAML reduces token usage by approximately 20-25%
- **No Model Modification Required**: Works with any existing model without fine-tuning
- **Local Processing**: All parsing happens locally in milliseconds, no additional LLM calls needed

### Developer Experience Features

BAML provides a VS Code extension with hot-reload capabilities that show:
- The exact prompt being sent to the model
- Raw web requests for debugging
- Real-time test execution without leaving the IDE
- Type synchronization with Python, TypeScript, Ruby, Java, Go, and Rust

The speaker emphasized that developers should be able to see the full request without abstractions, similar to how web developers wouldn't ship CSS changes without seeing them rendered.

### Benchmark Results

Boundary ran benchmarks against function calling datasets and found:
- BAML significantly outperforms function calling even on GPT-3.5 Turbo
- Comparable or better accuracy than newer models without BAML
- Lower cost due to reduced token usage
- Faster execution (though not the absolute fastest, which sacrifices accuracy)

### Advanced Capabilities

BAML supports chain-of-thought reasoning through prompt templates. The speaker demonstrated a surprisingly simple prompt pattern that enables the model to outline key details before producing structured output, improving reasoning quality while maintaining output reliability.

One customer example cited: parsing 18+ page bank statements without a single penny of error, demonstrating production-grade accuracy.

## SAS: Combining Traditional NLP with LLMs

### Text Analytics as a Pre-Processing Layer

Tom from SAS presented an approach that combines traditional NLP techniques (text analytics, information extraction) with LLMs to improve accuracy and reduce hallucinations. The key insight is that filtering and structuring data before sending to an LLM helps the model focus on relevant information.

### Public Comment Analysis Use Case

Government agencies must respond to all salient points in public comments on proposed regulations or face potential lawsuits. This creates enormous manual processing burdens—the speaker cited a health equipment services regulation that required 4,500 hours of manual processing.

### Technical Approach

The pipeline works as follows:
- **Information Extraction**: Fast rule-based models identify statements containing recommendations using patterns like "please include," "in order to determine," "it would be helpful if"
- **Statement Bucketing**: Text analytics categorize statements by topic, sentiment, and relevance
- **Targeted Summarization**: Instead of RAG over many documents, this approach gathers thousands of relevant statements into a single context and asks the LLM to summarize
- **Traceability**: Visualizations allow users to trace LLM assertions back to source statements

### Results and Validation

The approach reduced processing time from 4,500 to approximately 600 hours for one regulation. The visualization layer is crucial for validation—users can drill down from LLM summaries to specific terminology and source documents to verify accuracy.

This represents a "beyond RAG" approach where instead of retrieving a few documents based on similarity, the system retrieves thousands of pre-filtered statements that are specifically relevant to the query.

### Broader Applications

The technique has been applied to:
- Adverse event assessment (drugs, vaccines, vehicles)
- Public policy analysis
- Police narrative and crime pattern analysis
- Consumer complaint analysis
- Research analysis

## Cross-Cutting Themes

Several themes emerged across all three presentations:

**The importance of benchmarking**: All speakers emphasized measuring before optimizing and maintaining traceability to understand what's actually happening in production systems.

**Complementary techniques**: The presentations showed how infrastructure optimization (vLLM, Ray Serve), output formatting (BAML), and pre-processing (text analytics) can work together to create more robust production systems.

**Cost consciousness**: GPU costs are significant, and all approaches aimed to maximize efficiency—whether through better GPU utilization, reduced token counts, or filtering data before expensive LLM calls.

**The industry is early**: The Fuzzy Labs speaker explicitly noted that best practices are still evolving and what works today may change next year, reflecting the rapid evolution of LLMOps practices.

**Self-hosting considerations**: While managed APIs offer convenience, self-hosting remains important for data privacy, learning, and cost control, but brings significant engineering challenges that require specialized tooling.