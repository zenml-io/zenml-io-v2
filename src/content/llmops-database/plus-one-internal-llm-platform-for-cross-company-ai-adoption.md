---
title: "Plus One: Internal LLM Platform for Cross-Company AI Adoption"
slug: "plus-one-internal-llm-platform-for-cross-company-ai-adoption"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed4f4bf92f64a03402e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:38:58.245Z"
  createdOn: "2024-11-21T14:08:20.084Z"
llmopsTags:
  - "cache"
  - "code-generation"
  - "content-moderation"
  - "cost-optimization"
  - "data-analysis"
  - "document-processing"
  - "documentation"
  - "embeddings"
  - "fine-tuning"
  - "guardrails"
  - "human-in-the-loop"
  - "monitoring"
  - "multi-agent-systems"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "translation"
industryTags: "tech"
company: "Prosus"
summary: "Prosus developed Plus One, an internal LLM platform accessible via Slack, to help companies across their group explore and implement AI capabilities. The platform serves thousands of users, handling over half a million queries across various use cases from software development to business tasks. Through careful monitoring and optimization, they reduced hallucination rates to below 2% and significantly lowered operational costs while enabling both technical and non-technical users to leverage AI capabilities effectively."
link: "https://www.youtube.com/watch?v=PcTbBxOeL4g"
year: 2023
seo:
  title: "Prosus: Plus One: Internal LLM Platform for Cross-Company AI Adoption - ZenML LLMOps Database"
  description: "Prosus developed Plus One, an internal LLM platform accessible via Slack, to help companies across their group explore and implement AI capabilities. The platform serves thousands of users, handling over half a million queries across various use cases from software development to business tasks. Through careful monitoring and optimization, they reduced hallucination rates to below 2% and significantly lowered operational costs while enabling both technical and non-technical users to leverage AI capabilities effectively."
  canonical: "https://www.zenml.io/llmops-database/plus-one-internal-llm-platform-for-cross-company-ai-adoption"
  ogTitle: "Prosus: Plus One: Internal LLM Platform for Cross-Company AI Adoption - ZenML LLMOps Database"
  ogDescription: "Prosus developed Plus One, an internal LLM platform accessible via Slack, to help companies across their group explore and implement AI capabilities. The platform serves thousands of users, handling over half a million queries across various use cases from software development to business tasks. Through careful monitoring and optimization, they reduced hallucination rates to below 2% and significantly lowered operational costs while enabling both technical and non-technical users to leverage AI capabilities effectively."
---

## Overview

Prosus, a large technology investment group serving approximately two billion users through various portfolio companies in education (Brainly), food delivery (iFood), finance, e-commerce (Stack Overflow), and other sectors, embarked on a comprehensive journey to understand and deploy generative AI across their organization. The presentation, given by Paul from the Prosus AI team, details their experience building and operating "Plus One," an internal Slack-based AI assistant that provides a unified interface to multiple large language models and generative AI capabilities.

The Prosus AI team's mission is to help portfolio companies understand where machine learning and now generative AI can be applied "bigger, better, faster." This case study represents approximately 12-18 months of experimentation and production deployment, with the explicit goal of answering fundamental questions about whether these models provide real value or are merely "parlor tricks," which use cases make sense, whether to build or buy models, and what it takes to deploy at scale for hundreds of millions of users.

## The Plus One Platform

Plus One operates as a unified interface within Slack, making AI capabilities accessible to all employees across the Prosus group of companies. The platform aggregates multiple LLMs and other generative models, allowing users to interact naturally with various AI capabilities including image generation (using open-source models), audio transcription, code review and documentation, document summarization (including internal Google Docs), and general question-answering.

The design philosophy behind Plus One is significant from an LLMOps perspective. By integrating into Slack, the platform creates what the presenter calls "social quality control" - team members can see AI responses and provide immediate feedback or corrections, adding a human-in-the-loop layer that operates organically within existing workflows. This design decision reflects a sophisticated understanding of how to deploy AI safely in enterprise contexts where answer accuracy matters.

Over the course of approximately one year, thousands of users submitted over half a million questions to Plus One. This massive dataset of real-world usage patterns provided invaluable insights into how different teams and roles actually use LLM capabilities in professional contexts.

## Usage Pattern Analysis

One of the most interesting findings from the Plus One deployment was the analysis of who uses what kinds of AI capabilities. The team discovered that software development tasks dominated, partially due to the technical nature of the portfolio companies and the early-adopter tendencies of product and tech teams. However, a roughly 50/50 split emerged between engineering and non-engineering users.

Perhaps more surprising was the "democratization of skills" effect observed. Non-engineers were frequently asking technical questions - finance analysts seeking help building forecasting models, marketing teams asking about complex Excel formulas. Conversely, engineers heavily utilized writing and communication capabilities for documenting code and communicating user impact of pull requests.

User feedback consistently highlighted three key benefits: working faster (pure productivity), being able to do more types of tasks (capability expansion), and getting "unstuck" faster (reduced friction). The team conducted specific productivity studies that corroborated these self-reported benefits, aligning with broader industry research on LLM productivity impacts.

## Hallucination Reduction Journey

A significant portion of the case study focuses on the ongoing battle against hallucinations. The team implemented a clever feedback mechanism using four emoji reactions: thumbs up, thumbs down, heart, and what they lovingly call the "Pinocchio emoji" for hallucinations. This lightweight feedback collection system proved effective for gathering signal on model performance at scale.

The hallucination rate started at approximately 10% of responses and was reduced to below 2% through a multi-pronged approach. First, they categorized the types of hallucinations to understand root causes: users asking about internal information the models couldn't access, questions about recent events, and general factual inaccuracies. Each category required different solutions.

The team employed several strategies to address these issues. Prompt engineering helped set appropriate expectations and constraints. For internal information queries, they implemented Retrieval Augmented Generation (RAG) to connect models to internal knowledge bases like Confluence. This allowed proper attribution to sources in responses, building user trust.

However, the presenter is notably candid about RAG challenges. Building an effective RAG pipeline is "very hard and context-specific." Key decisions include the information retrieval strategy, choice of embeddings (which differs significantly between text documentation and code), whether to use hybrid search, chunk sizing, and how to structure prompts with retrieved context. These hyperparameters are highly sensitive to specific use cases, and the team spent considerable effort finding optimal configurations for different contexts.

## Cost Optimization at Scale

Cost management emerged as a critical concern for deploying LLMs at Prosus's scale. The presentation shows a graph demonstrating cost reduction over time for specific tasks, achieved through multiple strategies.

The most straightforward approach involves intelligent model selection - choosing smaller, cheaper models when they suffice for the task. Fine-tuning models for specific use cases can also improve efficiency. More efficient prompting and answer generation techniques help reduce token usage. The team also carefully evaluates large context versus small context models based on use case requirements.

A particularly insightful observation concerns tokenization economics for non-English languages. Since many commercial LLMs charge per token, and tokenizers were primarily trained on English data, non-English languages often require significantly more tokens to represent the same content. The example shown demonstrates that Spanish text requires roughly double the tokens compared to equivalent English text - effectively a "non-English token tax." Similarly, code (Python in the example) requires more than double the tokens compared to English prose with the same character count.

This finding has significant implications for organizations operating globally, as Prosus does across nearly 100 countries. The presenter notes that while changing tokenizers isn't straightforward when using pre-trained commercial models, being aware of these economics and potentially selecting models with more efficient tokenization for target languages can substantially impact costs at scale.

## Model Routing Architecture

To address the interplay between cost, quality, and latency (particularly capacity constraints), Plus One implements intelligent model routing. The system dynamically routes requests to different model endpoints based on these three dimensions. When capacity is constrained, latency becomes effectively infinite, so routing decisions must account for current system state.

This architecture allows the platform to make real-time trade-offs based on the specific requirements of each request and the current availability of resources. It represents a sophisticated production pattern that goes beyond simple API calls to commercial models.

## Agents: Promising but Brittle

The presentation includes candid assessment of agent-based systems. Plus One implemented agents for specific tasks like data analysis, where users can upload Excel sheets and have the system generate charts through a Python execution environment.

However, the team's conclusion is that agents remain in "early days." When they work, the experience is described as "phenomenal" and "magical." But the production reality is that agents are "very brittle" - highly sensitive to model updates, extremely prompt-sensitive, and prone to compounding errors when executing multi-step tasks. The non-deterministic behavior of underlying models compounds across agent steps, creating inconsistent user experiences where the same query rarely produces the same result twice.

This honest assessment provides valuable guidance for teams considering agent deployments: expect significant engineering effort to achieve production reliability.

## Business Use Case Discovery

Beyond productivity improvements, Plus One served as a discovery mechanism for business-specific applications. A compelling example comes from iFood, the Brazilian food delivery company. Users discovered that LLMs could reliably extract ingredients and quantities from menu item descriptions - a task previously requiring custom training data collection and model fine-tuning.

The example shows a Portuguese query about chicken stroganoff ingredients, with the model providing structured JSON output of ingredients and quantities. This data enrichment capability scales across tens of millions of menu items, enabling better food discovery and filtering (vegetarian, allergen identification, etc.) without the traditional ML pipeline overhead.

## Production Deployments Across Portfolio

Several portfolio companies have launched public-facing products based on learnings from Plus One experimentation. Brainly (K-12 education platform) uses LLMs to help students get answers to questions. Good (online education) created AI tutoring capabilities. iFood developed conversational food ordering in Portuguese. Stack Overflow launched Overflow AI for developer Q&A.

Each of these deployments serves millions or hundreds of millions of users, validating that the techniques developed through Plus One experimentation can scale to production consumer products.

## Key Lessons and Honest Assessments

The presentation concludes with synthesized learnings that provide valuable guidance for LLMOps practitioners. On finding value, productivity improvements are consistently measurable and achievable today with existing tools. However, there's important advice about balancing "candy versus vegetables" - resisting the temptation to chase flashy novel applications while ignoring more mundane but valuable improvements to existing workflows.

A crucial observation: POCs are easy, but shipping products at scale in a cost-effective way with measurable metric impact is genuinely hard. Many promising demonstrations fail to translate into production value.

On the technical side, the presenter advises against premature fine-tuning - prompt engineering and model selection can often suffice for initial experimentation. RAG is valuable but difficult to implement in a generalizable way across different content types. Fundamental challenges remain unsolved: models lack up-to-date information, exhibit non-deterministic behavior affecting reliability, and have capabilities we don't fully understand.

The human-in-the-loop philosophy permeates the entire approach. For user-facing applications at scale, especially in sensitive domains like education, humans continuously verify quality. Plus One's Slack integration inherently creates team-based quality control. The platform is explicitly designed to operate "in a human context with other team members" rather than autonomously executing tasks.

This case study represents a mature, honest assessment of LLMOps in a large enterprise context, notable for its candid acknowledgment of both successes and ongoing challenges.