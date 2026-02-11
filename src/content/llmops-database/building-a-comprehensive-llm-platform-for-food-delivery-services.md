---
title: "Building a Comprehensive LLM Platform for Food Delivery Services"
slug: "building-a-comprehensive-llm-platform-for-food-delivery-services"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3fd660f3e4d9932afe28"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:37:52.570Z"
  createdOn: "2024-11-21T14:12:38.330Z"
llmopsTags:
  - "content-moderation"
  - "customer-support"
  - "error-handling"
  - "fine-tuning"
  - "guardrails"
  - "latency-optimization"
  - "model-optimization"
  - "monitoring"
  - "multi-modality"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "semantic-search"
  - "structured-output"
  - "system-prompts"
industryTags: "e-commerce"
company: "Swiggy"
summary: "Swiggy implemented various generative AI solutions to enhance their food delivery platform, focusing on catalog enrichment, review summarization, and vendor support. They developed a platformized approach with a middle layer for GenAI capabilities, addressing challenges like hallucination and latency through careful model selection, fine-tuning, and RAG implementations. The initiative showed promising results in improving customer experience and operational efficiency across multiple use cases including image generation, text descriptions, and restaurant partner support."
link: "https://bytes.swiggy.com/reflecting-on-a-year-of-generative-ai-at-swiggy-a-brief-review-of-achievements-learnings-and-13a9671dc624"
year: 2024
seo:
  title: "Swiggy: Building a Comprehensive LLM Platform for Food Delivery Services - ZenML LLMOps Database"
  description: "Swiggy implemented various generative AI solutions to enhance their food delivery platform, focusing on catalog enrichment, review summarization, and vendor support. They developed a platformized approach with a middle layer for GenAI capabilities, addressing challenges like hallucination and latency through careful model selection, fine-tuning, and RAG implementations. The initiative showed promising results in improving customer experience and operational efficiency across multiple use cases including image generation, text descriptions, and restaurant partner support."
  canonical: "https://www.zenml.io/llmops-database/building-a-comprehensive-llm-platform-for-food-delivery-services"
  ogTitle: "Swiggy: Building a Comprehensive LLM Platform for Food Delivery Services - ZenML LLMOps Database"
  ogDescription: "Swiggy implemented various generative AI solutions to enhance their food delivery platform, focusing on catalog enrichment, review summarization, and vendor support. They developed a platformized approach with a middle layer for GenAI capabilities, addressing challenges like hallucination and latency through careful model selection, fine-tuning, and RAG implementations. The initiative showed promising results in improving customer experience and operational efficiency across multiple use cases including image generation, text descriptions, and restaurant partner support."
---

## Overview

Swiggy, one of India's largest food delivery and quick commerce platforms, published a detailed retrospective on their first year of generative AI adoption in early 2024. The case study provides valuable insights into how a large-scale e-commerce company approaches the integration of LLMs and generative AI models into production systems, covering organizational structure, technical implementations, risk management, and lessons learned.

The initiative began in early 2023 with the establishment of a dedicated generative AI task force comprising members from Data Science, Engineering, and Strategy teams. This cross-functional approach allowed the company to evaluate over 30 startups, founders, VCs, and large corporations in the generative AI space, while also conducting internal hackathons to crowdsource ideas. This organizational structure is a notable LLMOps practice—establishing dedicated teams to drive adoption while maintaining close collaboration with business stakeholders.

## Risk Framework and Prioritization

A particularly mature aspect of Swiggy's approach was their use of a Demand-Risk framework for prioritizing generative AI initiatives. This framework categorizes use cases along two axes: demand (sustainable business value) and risk (likelihood and impact of inaccuracies). Use cases in the high-demand, low-risk quadrant—such as catalog enrichment and review summarization—were prioritized for early development, while higher-risk applications like resolution-focused chatbots and process automation were approached more cautiously.

The team explicitly identified several key risks and limitations that are central to LLMOps considerations:

- **Latency Requirements**: Different applications have vastly different latency needs. Search queries require responses in approximately 100ms, while chatbots may tolerate up to 3 seconds. This distinction drove architectural decisions about when to use GPT APIs versus custom models.

- **Hallucination Mitigation**: The team acknowledged hallucination as a "real problem" that required extensive internal user testing and guardrailing to ensure result quality.

- **Data Security and Privacy**: Ensuring PII is masked and protected from unauthorized access was a primary concern.

- **Guardrails for User Input**: Implementing measures to prevent out-of-context, harmful, or off-domain queries.

- **Data Usage Agreements**: Establishing agreements with API providers (OpenAI) to ensure data is not used for training without permission.

## Technical Implementations

### Image-Based Catalog Enrichment

Swiggy deployed Stable Diffusion pipelines for generating food imagery, which significantly influences user ordering behavior. They explored three approaches: Text2Image, Image2Image, and Image Blending. A key finding was that off-the-shelf Text2Image models performed well for standard items like burgers and pizza but struggled with Indian dishes due to training data limitations.

To address this, the team fine-tuned Stable Diffusion v1.5 using LoRA (Low-Rank Adaptation) specifically for Indian dish categories such as dosa, curry, biryani, and Indian breads. Custom LoRA checkpoints were trained for different dish families (e.g., biryani, fried rice, and rice formed a visually similar class). This approach produced images that adhered more closely to internal standards, such as generating single-item images with food items centered.

Additionally, a custom outpainting pipeline was developed to adjust aspect ratios of thumbnail images (from 1:1 to 1.75:1) without distortion—a practical application of inpainting techniques for production use cases.

### Text-Based Catalog Enrichment

For generating dish descriptions, Swiggy deployed a customized text generation pipeline augmented with a configuration module that provides additional metadata—including internal taxonomy for dish mapping and example descriptions across dish families. Notably, they implemented a human-in-the-loop process where agents sanity-check descriptions and provide feedback for improvement. This hybrid approach acknowledges the limitations of fully automated generation while still achieving significant efficiency gains.

### Review Summarization

Using GPT-4 with customized prompts, the team developed a system to generate 2-3 line summaries from collections of restaurant and dish reviews. An internal evaluation metric was implemented to establish quality and customer acceptability. In A/B testing involving over 2,000 restaurants, they observed improvements in funnel metrics and reductions in cancellations and claims, attributed to enhanced expectation management. This represents one of the more concrete ROI demonstrations in the case study.

### Restaurant Partner Support (RAG Pipeline)

A particularly detailed implementation involves a RAG (Retrieval-Augmented Generation) pipeline for the Partner App's Help Centre. Restaurant owners often need quick answers to operational questions about managing their stores, but existing FAQs were dense and time-consuming to navigate. The LLM-powered bot allows users to input queries directly and retrieves relevant answers without manual search.

The implementation supports responses in both Hindi and English via WhatsApp, addressing a wide range of questions based on standard operating procedure (SOP) documents. This multilingual, multi-channel deployment demonstrates practical considerations for serving diverse user bases.

### Neural Search

The team developed a neural search model to enable natural language queries beyond traditional keyword-based search. The approach uses language models to encode query context, understand intent, and retrieve relevant dishes in real-time. However, the text acknowledges challenges—Swiggy's vast database of dishes from numerous restaurants across India creates significant complexity, and the initial version required pivoting toward an improved model. This honest assessment of partial failures is valuable for understanding real-world LLMOps challenges.

### Content Flywheel (Video Generation)

An innovative application involved generating 30-second videos from collages of social media brand images. Images are processed through a Stable Diffusion-based pipeline that removes text and artifacts before creating short videos. This addresses the problem of decision fatigue among users who spend 10-20 minutes selecting items.

## Platform Engineering

A significant portion of the effort went into platformizing generative AI capabilities. The Data Science Platform (DSP) team created a middle layer for generative AI that enables:

- Onboarding of native Python code and ML models
- Integration with vector databases
- GenAI API integration with external providers
- Model observability, versioning, logging, and security governance

This middle layer abstracts generative AI-specific elements from engineering teams, allowing them to focus on business logic. It provides central governance, protects against violations such as exposing confidential information, and implements performance optimizations to reduce latency. The centralized approach ensures consistency and reduces duplicate work across teams.

## Lessons Learned

The case study offers several candid lessons that are valuable for LLMOps practitioners:

- **Iteration Time**: It took 3-4 months of iterations and experiments to identify high-ROI items. Managing inbound requests (both internal and external) was crucial for focusing on the right projects.

- **Stakeholder Management**: Setting expectations with stakeholders is necessary for continued sponsorship. Demos that "wow" audiences in hackathons do not necessarily translate to real-world products that generate value.

- **Model Selection**: For non-real-time use cases, GPT was identified as ideal given the cost-quality tradeoff—"almost impossible to beat GPT with custom models." However, customized LLMs are better for real-time use cases that must meet quality requirements within strict latency constraints.

- **Governance Challenges**: Using GPT directly from OpenAI quickly led to governance difficulties, prompting a move to third-party API providers.

- **Limited Traction for Conversational Interfaces**: Despite industry hype, the team did not see significant pull for customer-facing conversational interfaces like chatbots for food ordering or table reservations.

- **Patience Required**: Many generative AI models require time and multiple iterations to ensure sustained ROI.

## Critical Assessment

While the case study provides valuable insights, readers should note that it is a company blog post and naturally presents the work in a positive light. Some claimed improvements (like funnel metrics and reduced cancellations) lack specific quantitative details. The acknowledgment that neural search required pivoting after initial challenges suggests that not all initiatives succeeded as planned.

The focus on Indian dishes as a unique challenge for image generation models is a legitimate concern that highlights the importance of dataset representation and fine-tuning for specific domains. The decision to build internal platforms rather than relying entirely on external services reflects a mature understanding of governance and operational requirements at scale.

Overall, this case study represents a realistic view of enterprise generative AI adoption—combining genuine successes with honest acknowledgment of challenges and failed experiments.