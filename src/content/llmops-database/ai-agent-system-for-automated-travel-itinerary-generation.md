---
title: "AI Agent System for Automated Travel Itinerary Generation"
slug: "ai-agent-system-for-automated-travel-itinerary-generation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b1d0bace0103f9b63d28c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:49:47.084Z"
  createdOn: "2024-12-12T17:27:39.141Z"
llmopsTags:
  - "chatbot"
  - "structured-output"
  - "rag"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "langchain"
  - "fastapi"
  - "monitoring"
  - "databases"
  - "databricks"
  - "meta"
industryTags: "consulting"
company: "Aimpoint Digital"
summary: "Aimpoint Digital developed an AI agent system to automate travel itinerary generation, addressing the time-consuming nature of trip planning. The solution combines multiple RAG frameworks with vector search for up-to-date information about places, restaurants, and events, using parallel processing and optimized prompts to generate personalized itineraries within seconds. The system employs Databricks' Vector Search and LLM capabilities, with careful attention to evaluation metrics and prompt optimization."
link: "https://www.databricks.com/blog/aimpoint-digital-ai-agent-systems"
year: 2024
seo:
  title: "Aimpoint Digital: AI Agent System for Automated Travel Itinerary Generation - ZenML LLMOps Database"
  description: "Aimpoint Digital developed an AI agent system to automate travel itinerary generation, addressing the time-consuming nature of trip planning. The solution combines multiple RAG frameworks with vector search for up-to-date information about places, restaurants, and events, using parallel processing and optimized prompts to generate personalized itineraries within seconds. The system employs Databricks' Vector Search and LLM capabilities, with careful attention to evaluation metrics and prompt optimization."
  canonical: "https://www.zenml.io/llmops-database/ai-agent-system-for-automated-travel-itinerary-generation"
  ogTitle: "Aimpoint Digital: AI Agent System for Automated Travel Itinerary Generation - ZenML LLMOps Database"
  ogDescription: "Aimpoint Digital developed an AI agent system to automate travel itinerary generation, addressing the time-consuming nature of trip planning. The solution combines multiple RAG frameworks with vector search for up-to-date information about places, restaurants, and events, using parallel processing and optimized prompts to generate personalized itineraries within seconds. The system employs Databricks' Vector Search and LLM capabilities, with careful attention to evaluation metrics and prompt optimization."
---

## Summary

Aimpoint Digital, a data analytics consulting firm, partnered with Databricks to build an AI agent system designed to automate the generation of personalized travel itineraries. The motivation stems from research indicating that travelers spend over 5 hours planning trips, visiting approximately 270 web pages before finalizing their activities—a process that can begin as early as 45 days before the trip. The goal was to reduce this planning burden to under 30 seconds by leveraging generative AI and Retrieval-Augmented Generation (RAG) frameworks deployed on the Databricks Data Intelligence Platform.

This case study provides valuable insights into building production-ready AI agent systems, covering architecture decisions, data management strategies, evaluation methodologies, and prompt optimization techniques. While the blog presents the solution favorably (as it is published on Databricks' platform), the technical details provided offer genuine value for understanding LLMOps practices in multi-RAG agent systems.

## Problem Context and Motivation

The core problem addressed is the inefficiency of travel planning. Standalone LLM tools like ChatGPT can generate travel itineraries, but they suffer from two critical limitations that make them unsuitable for production travel applications. First, there is the "recency issue"—LLMs are trained on static datasets and lack awareness of recent changes such as restaurant closures or new attractions. For example, an LLM trained in December 2023 would not know about a restaurant that closed in July 2024. Second, LLMs are prone to hallucination, potentially generating plausible-sounding but entirely fictional recommendations.

These limitations motivated the use of RAG architectures that augment LLM responses with current, verified information from regularly updated vector databases.

## Architecture Design

The solution implements a multi-RAG AI agent system with three parallel retrievers, each serving a specific content domain: places of interest, restaurants, and events. This design reflects the evolution of GenAI architectures from single-LLM reliance to systems integrating multiple interacting components. The blog references research from June 2024 showing that multi-agent LLM systems with predefined roles outperform standalone models on various benchmarks.

The user query workflow begins by collecting traveler parameters including destination city and country, dates of travel, travel purpose (business, leisure, recreation), travel companions (friends, partner, solo), and budget. These inputs are converted to vectors using an embedding model and used to query the three Vector Search Indices simultaneously.

The parallel retrieval approach is architecturally significant for several reasons. It enables independent scaling of each content domain, allows for specialized indexing strategies per domain, and reduces latency by executing retrievals concurrently rather than sequentially. The number of retrieved matches scales with trip length—approximately three places or events and three restaurant recommendations (breakfast, lunch, dinner) per day.

## Vector Search and Data Infrastructure

The solution utilizes Databricks Mosaic AI Vector Search with two Vector Search Indexes deployed to standalone endpoints. The current implementation includes approximately 500 restaurants in Paris, with plans to scale to nearly 50,000 citywide. This scalability consideration is important for production systems that need to support expansion to hundreds of European cities.

A notable data engineering pattern is the use of Delta tables with Change Data Feed enabled for all source tables containing raw information about attractions, restaurants, and events. This configuration ensures that any modifications to the raw data automatically propagate to the Vector Search Indices without manual intervention—a critical capability for maintaining data freshness in production. The blog mentions that vector databases are updated nightly, addressing the recency issue that plagues static LLM training data.

The source table schema is referenced but not fully detailed, though the architecture diagram indicates structured storage of place, restaurant, and event metadata alongside vectorized embeddings.

## LLM Serving and Guardrails

For the final synthesis step, where retrieved recommendations are combined into a cohesive itinerary, the system uses open-source LLMs including DBRX Instruct and Meta-Llama-3.1-405b-Instruct. These models are served on Databricks using Provisioned Throughput Endpoints, which provide dedicated capacity for consistent latency and throughput characteristics essential for production workloads.

The system incorporates built-in guardrails to prevent misuse of the AI agent system, though specific guardrail implementations are not detailed. This is an important production consideration for any customer-facing AI application, particularly one that generates travel recommendations where inappropriate or harmful content could have real-world consequences.

## Evaluation Framework

The case study outlines a comprehensive evaluation strategy covering both retrieval quality and response quality.

For retrieval evaluation, the team uses standard information retrieval metrics including Precision at k (measuring how many items within the top k retrieved documents are relevant), Recall at k (measuring the fraction of relevant results retrieved relative to total relevant documents in the population), and NDCG at k (Normalized Discounted Cumulative Gain, which incorporates a logarithmic penalty for correctly retrieved documents that rank lower in similarity). These metrics are implemented using MLFlow's evaluation capabilities.

For response quality evaluation, the team employs an LLM-as-a-Judge approach—an automated method for evaluating AI agent responses without requiring ground truth labels for every output. The LLM judge requires three key inputs: a clear metric definition specifying what aspect of responses to evaluate, a well-defined rubric with scoring guidelines (1-5 scale with clear professionalism criteria), and few-shot examples of itineraries at varying quality levels to guide the judge's assessments.

The blog includes examples of LLM-judged responses with justifications, demonstrating how this approach enables scalable quality monitoring in production. This automated evaluation is particularly valuable for production systems where manual review of every response is impractical.

## Prompt Optimization with DSPy

One of the more technically interesting aspects of the case study is the use of DSPy for prompt optimization. DSPy is described as a "state-of-the-art package" that uses an LLM-as-a-judge in conjunction with custom-defined metrics to evaluate responses against ground truth datasets.

The custom evaluation metric used for prompt optimization assessed three dimensions: whether the itinerary is complete and matches traveler requirements, whether the traveler can reasonably commute between places via public transportation, and whether the response uses polite and cordial language.

The team observed that DSPy-optimized prompts were more precise and focused on outcomes, with extraneous language eliminated. However, the blog appropriately notes that the quality of optimized prompts depends significantly on both the custom metric definition and the quality of ground truths—a realistic acknowledgment of the technique's dependencies.

## Tool Calling Considerations

The blog includes a candid discussion of an alternative architectural approach using tool calling, where an LLM dynamically determines which RAG tools to invoke based on traveler preferences. For example, if a traveler is not interested in events, the Events RAG would be skipped, potentially improving latency.

However, the team found that itineraries generated using tool calling were less consistent, and the orchestrating LLM occasionally made errors in tool selection. This led them to maintain a fixed invocation sequence, which produced more reliable results. This is a valuable production insight—while dynamic tool calling offers theoretical flexibility, the reliability of fixed pipelines may be preferable for certain use cases. The blog acknowledges that LLM-based tool calling is still an emerging research area with significant development potential.

## Production Considerations and Limitations

While the case study presents the solution favorably, several production realities are worth noting. The solution received "overwhelmingly positive feedback from stakeholders" during development, but the blog does not provide quantitative metrics on actual user satisfaction or production deployment outcomes. The 30-second itinerary generation time is mentioned as a target but is not validated with production latency measurements.

The scalability claims—currently 500 restaurants with plans for 50,000—represent future aspirations rather than proven capabilities. Similarly, the mention of supporting "hundreds of European cities" is positioned as a design goal rather than current reality.

Future development directions mentioned include deeper integrations with dynamic pricing tools, enhanced contextual understanding of travel preferences, and support for real-time itinerary adjustments, suggesting the current system has limitations in these areas.

## Key LLMOps Takeaways

This case study demonstrates several important LLMOps patterns. The multi-RAG architecture with parallel retrieval shows how to decompose complex generation tasks into domain-specific retrieval components. The use of Change Data Feed with Delta tables illustrates how to maintain data freshness without manual intervention—critical for production systems where stale data degrades user experience.

The dual-layer evaluation strategy combining retrieval metrics (Precision, Recall, NDCG) with LLM-as-a-Judge for response quality provides a model for comprehensive quality monitoring. The DSPy-based prompt optimization demonstrates systematic approaches to improving prompt engineering beyond manual iteration.

Finally, the honest assessment of tool calling limitations reflects mature engineering judgment—choosing reliability over theoretical elegance when production consistency is paramount. The decision to use open-source models (DBRX, Llama 3.1-405b) on dedicated infrastructure (Provisioned Throughput Endpoints) with guardrails represents a considered approach to balancing capability, cost, and safety for production GenAI applications.