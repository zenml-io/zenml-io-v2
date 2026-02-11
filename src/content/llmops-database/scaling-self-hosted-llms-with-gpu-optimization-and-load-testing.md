---
title: "Scaling Self-Hosted LLMs with GPU Optimization and Load Testing"
slug: "scaling-self-hosted-llms-with-gpu-optimization-and-load-testing"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bae36b504b74d9fc7fa"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:39:15.835Z"
  createdOn: "2024-11-21T13:54:54.729Z"
llmopsTags:
  - "cost-optimization"
  - "document-processing"
  - "embeddings"
  - "latency-optimization"
  - "microsoft-azure"
  - "model-optimization"
  - "monitoring"
  - "question-answering"
  - "rag"
  - "reliability"
  - "scalability"
  - "scaling"
  - "vllm"
industryTags: "tech"
company: "Fuzzy Labs"
summary: "Fuzzy Labs helped a tech company improve their developer documentation and tooling experience by implementing a self-hosted LLM system using Mistral-7B. They tackled performance challenges through systematic load testing with Locust, optimized inference latency using vLLM's paged attention, and achieved horizontal scaling with Ray Serve. The solution improved response times from 11 seconds to 3 seconds and enabled handling of concurrent users while efficiently managing GPU resources."
link: "https://www.youtube.com/watch?v=nPn42_EXB5U"
year: 2024
seo:
  title: "Fuzzy Labs: Scaling Self-Hosted LLMs with GPU Optimization and Load Testing - ZenML LLMOps Database"
  description: "Fuzzy Labs helped a tech company improve their developer documentation and tooling experience by implementing a self-hosted LLM system using Mistral-7B. They tackled performance challenges through systematic load testing with Locust, optimized inference latency using vLLM's paged attention, and achieved horizontal scaling with Ray Serve. The solution improved response times from 11 seconds to 3 seconds and enabled handling of concurrent users while efficiently managing GPU resources."
  canonical: "https://www.zenml.io/llmops-database/scaling-self-hosted-llms-with-gpu-optimization-and-load-testing"
  ogTitle: "Fuzzy Labs: Scaling Self-Hosted LLMs with GPU Optimization and Load Testing - ZenML LLMOps Database"
  ogDescription: "Fuzzy Labs helped a tech company improve their developer documentation and tooling experience by implementing a self-hosted LLM system using Mistral-7B. They tackled performance challenges through systematic load testing with Locust, optimized inference latency using vLLM's paged attention, and achieved horizontal scaling with Ray Serve. The solution improved response times from 11 seconds to 3 seconds and enabled handling of concurrent users while efficiently managing GPU resources."
---

## Overview

This case study comes from a presentation by Matt Squire, CTO and co-founder of Fuzzy Labs, an MLOps consultancy based in Manchester, UK. The talk provides a candid, practitioner-focused perspective on the challenges of scaling self-hosted large language models for production use. Squire openly acknowledges that the field is still evolving and that "no one really knows enough about running large language model applications in production at scale yet."

The customer in this case is a technology company (not explicitly named, but hinted to be in the Microsoft ecosystem based on a Steve Ballmer reference) that sells development tools and libraries to developers. Their core challenge was that their technical documentation was difficult to navigate, and developers struggled to understand how to accomplish specific tasks using the customer's products. The question posed to Fuzzy Labs was: could a large language model help developers more easily find information and get guidance on using these libraries?

A critical constraint was that this needed to be a self-hosted solution rather than using an external API service. The motivations for self-hosting were typical of enterprise scenarios: ownership of the technology stack (important for investment or acquisition scenarios), control over data and where it flows, fine control over system behavior, and in some cases ideological commitment to open source.

## Initial Architecture

The system Fuzzy Labs built was a relatively standard retrieval-augmented generation (RAG) architecture, though with some important production-ready components:

**Model Server**: A Python web service built on FastAPI, running on GPU instances orchestrated through Kubernetes. The initial implementation used Hugging Face inference pipelines, which Squire notes is "basically what most people are going to be doing when they first try to build a RAG-based application." They chose the Mistral 7B instruction-tuned model in a quantized version.

**Guardrails Service**: Because this was a public-facing system, the customer required comprehensive guardrails. This component included multiple models for different safety checks: filtering inappropriate questions and responses, ensuring questions stayed on-topic, detecting toxic or discriminatory language, and filtering personally identifiable information (PII). Squire emphasizes that this guardrails component "is actually quite a complex piece of software in its own right that has a bunch of different models within it making these decisions independent of the large language model."

**Vector Database**: They used ChromaDB for storing text chunks from the documentation. While Squire acknowledges this "maybe that's a questionable choice," he notes that the vector database scalability wasn't the first bottleneck they encountered. The dataset was relatively modest—a few million text chunks, which he characterizes as "not a large amount of data in practice" for 2024.

**Orchestration Service**: A coordinator service responsible for managing the flow between user requests, guardrails checking, vector database retrieval, and model inference.

## Performance Requirements and User Experience

The system needed to serve developers who would have high expectations for responsiveness. Use cases included questions like "how do I run an FFT on my data?" or more complex scenarios like "I have some code, can you show me a way to do this more optimally using your platform?" There was even consideration of integrating this into developer environments, where fast response times would be essential.

The core requirements were:
- Fast response times for a good user experience
- Support for hundreds or potentially thousands of concurrent user sessions
- Cost efficiency, since GPUs are expensive

Squire makes an important business point here: if you're too cheap with GPUs, you can't support the scale users need; if you throw money at the problem with unlimited GPUs, you run out of budget. The balance between these constraints is a key tension in LLMOps.

## Benchmarking Methodology

Before attempting any optimization, the team established a benchmarking framework—an approach Squire emphasizes with Donald Knuth's famous quote about premature optimization being "the root of all evil."

They used **Locust**, a Python-based load testing tool, to simulate traffic across different scenarios:
- Developer testing: 10 concurrent users (overkill for internal testing, but a reasonable target)
- Typical day: 20 concurrent users
- System under strain: 30 concurrent users (e.g., near deadlines when developers are "hammering the system")
- Spike: 50 concurrent users (unexpected high load)
- Failure: Keep increasing until the system breaks to find the ceiling

Three key metrics were tracked:
- **Latency**: Total time to get a response (either for the whole system or per component)
- **Throughput**: LLM-specific metric measuring tokens output per second
- **Request rate**: Successful user requests served per unit time (with emphasis on "successful"—a system handling 2 requests per minute with 25% failure rate isn't truly achieving that throughput)

Crucially, they also tracked experiment metadata: which release was deployed, when the test ran, who ran it, the specific git commit, and the vector database dataset version. They kept this simple with a spreadsheet rather than building complex infrastructure, which Squire notes "just did the job just fine."

## Baseline Performance (The Problem)

The initial results with FastAPI and Hugging Face pipelines were sobering:
- Even at 1 concurrent user: 11 second latency
- Request rate: approximately 7 requests per minute
- This didn't even meet the developer testing scenario, let alone real user requirements

More concerning was the growth rate as users increased: latency jumped from 11 seconds → 40 seconds → 65 seconds. The system broke down "very early on" during initial testing—the failure threshold was around 5-10 concurrent users.

## Optimization Step 1: vLLM for Latency Improvement

The first optimization focused on latency for a single server instance before considering horizontal scaling. The key insight was that LLM inference is "massively bottlenecked by memory"—specifically, the patterns of GPU memory access during inference.

The attention mechanism requires an enormous number of key-value lookups for every token. **vLLM**, developed by a group that introduced "paged attention," addresses this by improving memory access and caching patterns. Squire likens this to "what virtual memory did for traditional computing a few decades ago, but specifically for large language model inference."

vLLM's claims are substantial: 24x improvement over Hugging Face pipelines and 2.5x improvement over Hugging Face TGI (Text Generation Inference), which is Hugging Face's own high-performance inference solution.

Results after implementing vLLM:
- Latency dropped from 11 seconds to approximately 3 seconds at 1 user
- More importantly, the growth rate improved dramatically: 3 seconds at 1 user, still 3 seconds at 2 users, 28 seconds instead of 65 at higher load
- Approximately 10x throughput improvement
- Crucially, vLLM required no additional compute hardware—it slots into the existing infrastructure

## Optimization Step 2: Ray Serve for Horizontal Scaling

While vLLM dramatically improved single-server performance, it's still fundamentally one server. The next bottleneck was concurrency—supporting many simultaneous users.

The solution was **Ray Serve**, a model serving framework built by Anyscale and used by companies like OpenAI, Uber, and LinkedIn. Ray Serve provides:

**Multi-server deployment**: The ability to deploy the model across many servers, enabling horizontal scaling.

**Autoscaling**: Automatically scaling up and down GPU resources in response to traffic changes. This is essential because manually monitoring and adjusting infrastructure isn't sustainable, and paying for peak capacity continuously is wasteful.

**GPU sharing**: An interesting capability that proved valuable for the guardrails models. The PII detection model, the on-topic/off-topic classifier, and potentially the embedding model for the vector database can all share GPU resources without requiring separate hardware for each "auxiliary model."

The combination of vLLM and Ray Serve gave them "essentially sub-second inference for a large language model" while supporting "as many users as we're willing to scale the hardware to support."

## Key Lessons Learned

Squire summarizes several important takeaways from this project:

**Always benchmark first**: Measure performance before attempting optimization. Without baseline measurements, you can't know if changes are improvements.

**Latency vs. scale are different problems requiring different solutions**: Latency optimization (vLLM) is about making a single inference faster. Scaling (Ray Serve) is about supporting more concurrent users. Both are necessary but address different constraints.

**Infrastructure complexity is real**: Horizontal scaling requires significant infrastructure to support and is expensive. You want to maximize utilization of hardware you have, scale only when needed, and scale back down otherwise.

**LLM-specific tooling is necessary**: While scalability patterns are familiar from general software engineering, the specific tools for LLMs are specialized. Standard web application scaling patterns don't directly apply.

**Don't optimize prematurely**: If you're building a proof of concept to answer "can I do this with an LLM?", you probably don't need any of this infrastructure. This level of engineering is only necessary when you're moving from prototype to production, especially for public-facing systems.

## Broader Observations

Squire makes several observations about the current state of the field that are worth noting. He observes that LLM inference constraints feel like "going back 10 years" in terms of what's realistic from a throughput and latency standpoint compared to modern web applications. This is a useful framing for setting expectations.

He also notes the proliferation of database-like tools in the MLOps space—feature stores, vector databases, and various other specialized data stores—and suggests they serve different purposes. Vector stores are optimized for fast similarity retrieval, while feature stores are about sharing computed features across training, experimentation, and inference environments.

The presentation also touches on the decision between self-hosting and using managed LLM APIs. For research projects or early prototypes, managed services or local development may be sufficient. The infrastructure investment described here only makes sense when you're genuinely productionizing a system for real users.

## Technical Stack Summary

The final production architecture combined:
- Mistral 7B (quantized, instruction-tuned)
- vLLM for optimized inference with paged attention
- Ray Serve for autoscaling and multi-server deployment
- FastAPI for the API layer
- ChromaDB for vector storage
- Kubernetes for container orchestration
- Multiple guardrail models for safety (PII detection, toxicity, topic relevance)
- Locust for load testing and benchmarking

This stack enabled Fuzzy Labs to take the system from breaking at 5-10 concurrent users to supporting production traffic with sub-second response times, ultimately allowing them to release the system to real public users.