---
title: "Building a Conversational Shopping Assistant with Multi-Modal Search and Agent Architecture"
slug: "building-a-conversational-shopping-assistant-with-multi-modal-search-and-agent-architecture"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "674f21b2a4edb95e2d55d466"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:46:21.166Z"
  createdOn: "2024-12-03T15:20:18.939Z"
llmopsTags:
  - "chatbot"
  - "multi-modality"
  - "unstructured-data"
  - "realtime-application"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "scaling"
  - "guardrails"
  - "fastapi"
  - "elasticsearch"
  - "openai"
industryTags: "e-commerce"
company: "OLX"
summary: "OLX developed \"OLX Magic\", a conversational AI shopping assistant for their secondhand marketplace. The system combines traditional search with LLM-powered agents to handle natural language queries, multi-modal searches (text, image, voice), and comparative product analysis. The solution addresses challenges in e-commerce personalization and search refinement, while balancing user experience with technical constraints like latency and cost. Key innovations include hybrid search combining keyword and semantic matching, visual search with modifier capabilities, and an agent architecture that can handle both broad and specific queries."
link: "https://www.youtube.com/watch?v=yU_2fBUv4u8"
year: 2023
seo:
  title: "OLX: Building a Conversational Shopping Assistant with Multi-Modal Search and Agent Architecture - ZenML LLMOps Database"
  description: "OLX developed \"OLX Magic\", a conversational AI shopping assistant for their secondhand marketplace. The system combines traditional search with LLM-powered agents to handle natural language queries, multi-modal searches (text, image, voice), and comparative product analysis. The solution addresses challenges in e-commerce personalization and search refinement, while balancing user experience with technical constraints like latency and cost. Key innovations include hybrid search combining keyword and semantic matching, visual search with modifier capabilities, and an agent architecture that can handle both broad and specific queries."
  canonical: "https://www.zenml.io/llmops-database/building-a-conversational-shopping-assistant-with-multi-modal-search-and-agent-architecture"
  ogTitle: "OLX: Building a Conversational Shopping Assistant with Multi-Modal Search and Agent Architecture - ZenML LLMOps Database"
  ogDescription: "OLX developed \"OLX Magic\", a conversational AI shopping assistant for their secondhand marketplace. The system combines traditional search with LLM-powered agents to handle natural language queries, multi-modal searches (text, image, voice), and comparative product analysis. The solution addresses challenges in e-commerce personalization and search refinement, while balancing user experience with technical constraints like latency and cost. Key innovations include hybrid search combining keyword and semantic matching, visual search with modifier capabilities, and an agent architecture that can handle both broad and specific queries."
---

## Overview

OLX, a global leader in online classifieds and secondhand marketplaces, developed "OLX Magic" — a conversational AI shopping assistant designed to transform the e-commerce experience. The presentation, delivered by two colleagues (one joining from Portugal), outlines how the company built and deployed an agentic AI system to help users discover and purchase products ranging from small items like toys to high-value goods like cars and real estate. The case study provides valuable insights into the practical challenges of deploying LLM-powered agents in a production e-commerce environment.

## Problem Context

The team identified several emerging trends in e-commerce that motivated the development: new interaction interfaces beyond traditional apps, experiential shopping (experiencing before buying), ecosystem-aware recommendations, hyper-personalization, omnipresent commerce (shopping on any digital platform), and AI agents that can execute tasks on behalf of users. For a secondhand marketplace specifically, the challenge is particularly complex because product listings are created by real users who don't always fill in complete information, making traditional filter-based search inadequate for many use cases.

## Technical Architecture

### Agentic AI Core

At the heart of OLX Magic is an AI agent capable of understanding user intent in natural language, autonomously performing tasks, and responding appropriately. The architecture includes several key components:

**Model Router**: The system uses a combination of best-in-class commercial LLMs and internally fine-tuned models, selected based on the specific use case. This hybrid approach allows the team to balance capability with cost and latency.

**Tool Access**: The agent has access to multiple tools including web search (for product research questions not in the catalog), text search, visual search, and URL parsing. The agent generates a plan based on user input and calls these tools accordingly.

**Request Handling**: The system handles requests across a spectrum from very specific ("show me Dyson v15") to very broad ("find me a gift for my mother's birthday"). For broad requests, the agent generates a plan that includes clarifying questions to iteratively refine the search. When sufficient information is gathered, it triggers parallel calls to search tools to present comprehensive results.

### Hybrid Search System

A key insight shared was that "your shopping assistant is only as good as your search." The team emphasized hybrid search as a critical enabler, combining keyword matching with semantic search. They provided a compelling example: searching for "aquamarine blouse" with traditional keyword matching returns only one result (the single product with those exact keywords), while semantic search understands the meaning and returns blouses of similar blue colors. Hybrid search combines both approaches for optimal results.

### Visual Search Capabilities

The system supports multimodal inputs including text, images, and voice. Visual search allows users to upload an image of a product they like and find similar items in the OLX catalog. Beyond simple visual similarity matching, the system supports "modifiers" — users can upload an image of a blue dress and specify they want it in red, and the agent will apply this transformation to the visual search results. This works for various attributes including color, shape, and sleeve length.

### Retrieval and Ranking

The presentation mentions that underneath the LLM layer, they maintain traditional ML components including learning-to-rank (LTR) frameworks. The generative AI serves primarily as a "presentation layer" for understanding user intent and presenting results, while core search relevance still relies on established retrieval and ranking systems.

## Production Challenges and Solutions

### Latency Management

Agent-based systems involve many calls under the hood, resulting in response times of 5-10 seconds compared to traditional search latency of 300-500 milliseconds. To address this, the team implemented streaming responses to alleviate perceived latency. They also introduced "instant results" — showing immediate traditional search results while waiting for the more sophisticated agent-powered responses, keeping users engaged during the wait.

### Guardrails and Security

Initially, the team was more permissive with guardrails, but they discovered users attempting to use Magic for requests unrelated to shopping on OLX. The guardrails implementation relies heavily on prompt engineering tailored to the OLX context, combined with their own abstraction framework and best-in-class models. They also encountered issues with false positives — for example, when users upload an image without accompanying text, the guardrails would sometimes incorrectly block the request. This required ongoing iteration and expanding test scenarios.

### Evaluation Approaches

The team uses multiple evaluation techniques including LLM-as-a-judge and human-in-the-loop evaluation. These methods were specifically applied to the search system and helped gain insights to guide development. For ongoing monitoring, they revisit conversations offline to evaluate what went right and wrong, and conduct heavy testing before deploying changes live.

### Cost and ROI

While LLM calls are becoming cheaper, agents make many such calls, making cost management a significant concern. The team explicitly called out cost and ROI as an ongoing challenge requiring attention.

### Scalability

All tools that the agent calls need to be scalable to support the entire traffic volume. The presenters acknowledged this as a "hard engineering problem to solve."

## UX Learnings and Iteration

Perhaps the most valuable insights from this case study relate to user experience learnings from production deployment:

**Conversational Interface Limitations**: The team learned that "you don't need a ChatGPT for everything." User interviews revealed that sometimes users just want to type "yellow jersey" and see results immediately without follow-up questions. Conversational interfaces are powerful for search refinement but not universally preferred.

**Design for Non-Technical Users**: Most users are not familiar with ChatGPT or similar tools. The team initially used onboarding cards (common in AI chat interfaces), but found very few customers used them. They shifted to clearer strategies with higher uptake.

**Discoverability of Features**: With a chat interface, users need to discover capabilities that aren't immediately visible. For example, the "smart compare" feature was available via typed commands, but users didn't know about it. Adding an explicit button made the feature accessible.

**User Behavior Shift**: When analyzing production usage, the team observed that about one-third of users are beginning to write in natural language with context, while two-thirds still use keyword-style queries without context. This represents an ongoing behavioral adoption journey.

Based on these learnings, the team iterated to a second version of Magic that brings the experience closer to familiar patterns. This version uses a familiar search bar (albeit more powerful), includes sorting and filtering UI elements users expect, and introduces concepts like "smart groups" for exploration. The refinement flow allows users to type natural language constraints (e.g., "only in Warsaw under 500 zloty") which appear as traditional-looking filter chips that can be removed individually.

## Key Features in Production

The deployed system includes several notable features:

**Multi-turn Conversations**: Users can refine searches iteratively, changing requirements like shoe size or budget as they explore options.

**Smart Compare**: Side-by-side product comparisons with AI-generated summaries and recommendations based on user priorities.

**Contextual Tags**: The system identifies features important to the user and highlights relevant information in listings without requiring clicks.

**Smart Groups**: Groups of complementary items (e.g., showing chargers when searching for smartwatches) balancing exploration and exploitation.

**Image Search with Modifiers**: Visual search that can be modified with text instructions (e.g., "find this but in red").

**Unconventional Filters**: For secondhand marketplaces where attributes like "heart rate monitor" may not be structured data but exist in descriptions, the LLM can surface these as filterable attributes.

## Integration and Cold Start

The product is AB tested through integration with the main OLX platform. Users see a button at the bottom of their regular search that, when clicked, transfers their entire search context to Magic and pre-prompts it with relevant results. This addresses the cold start problem identified with onboarding cards by giving users an immediate head start.

## Monetization Considerations

The presenters noted that new AI-powered experiences demand new monetization models. Traditional e-commerce monetization approaches don't directly apply, and this remains an active area of work.

## Results and Impact

The team tracks conversion across different features and categories. Product comparison was highlighted as particularly powerful — a relatively simple LLM implementation that generates strong user engagement and positive feedback. The presentation confirmed the product was launching for broader testing, indicating confidence in the system's production readiness.

## Key Takeaways for LLMOps Practitioners

This case study demonstrates several important principles for deploying LLM agents in production: the value of combining LLMs with traditional ML systems rather than replacing them entirely; the importance of iterating based on real user behavior rather than assumed preferences; the ongoing challenges of latency, cost, and guardrails that don't have one-time solutions; and the need to make AI capabilities accessible through familiar UI patterns rather than assuming users will adapt to chat-centric interfaces.