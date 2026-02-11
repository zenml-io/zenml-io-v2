---
title: "Building an AI API Gateway for Streamlined GenAI Service Development"
slug: "building-an-ai-api-gateway-for-streamlined-genai-service-development"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67e567f737dfa2bcfeac48d1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:04:47.090Z"
  createdOn: "2025-03-27T15:00:07.061Z"
llmopsTags:
  - "unstructured-data"
  - "structured-output"
  - "multi-modality"
  - "caption-generation"
  - "prompt-engineering"
  - "rag"
  - "semantic-search"
  - "system-prompts"
  - "api-gateway"
  - "security"
  - "documentation"
  - "amazon-aws"
  - "microsoft-azure"
  - "google-gcp"
  - "openai"
industryTags: "e-commerce"
company: "DeliveryHero"
summary: "DeliveryHero's Woowa Brothers division developed an AI API Gateway to address the challenges of managing multiple GenAI providers and streamlining development processes. The gateway serves as a central infrastructure component to handle credential management, prompt management, and system stability while supporting various GenAI services like AWS Bedrock, Azure OpenAI, and GCP Imagen. The initiative was driven by extensive user interviews and aims to democratize AI usage across the organization while maintaining security and efficiency."
link: "https://tech.deliveryhero.com/generative-ai-services-easy-start-with-the-gateway/"
year: 2025
seo:
  title: "DeliveryHero: Building an AI API Gateway for Streamlined GenAI Service Development - ZenML LLMOps Database"
  description: "DeliveryHero's Woowa Brothers division developed an AI API Gateway to address the challenges of managing multiple GenAI providers and streamlining development processes. The gateway serves as a central infrastructure component to handle credential management, prompt management, and system stability while supporting various GenAI services like AWS Bedrock, Azure OpenAI, and GCP Imagen. The initiative was driven by extensive user interviews and aims to democratize AI usage across the organization while maintaining security and efficiency."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-api-gateway-for-streamlined-genai-service-development"
  ogTitle: "DeliveryHero: Building an AI API Gateway for Streamlined GenAI Service Development - ZenML LLMOps Database"
  ogDescription: "DeliveryHero's Woowa Brothers division developed an AI API Gateway to address the challenges of managing multiple GenAI providers and streamlining development processes. The gateway serves as a central infrastructure component to handle credential management, prompt management, and system stability while supporting various GenAI services like AWS Bedrock, Azure OpenAI, and GCP Imagen. The initiative was driven by extensive user interviews and aims to democratize AI usage across the organization while maintaining security and efficiency."
---

## Overview

Woowa Brothers, operating under the DeliveryHero umbrella, embarked on an initiative to build an AI API Gateway as the foundational infrastructure for their generative AI platform. The AI Platform Team recognized that as Gen AI adoption grew rapidly across the organization, they needed centralized infrastructure to manage the increasing complexity of multiple AI providers, fragmented prompts, and scattered invocation logic. This case study provides insights into the early stages of building LLMOps infrastructure at a large food delivery technology company.

## Business Context and Problem Statement

The rise of generative AI solutions brought two significant changes that influenced Woowa Brothers' approach. First, Gen AI technologies democratized AI capabilities, allowing employees without specialized ML knowledge to leverage these tools through simple prompts. Second, businesses could now develop and launch AI-based services quickly without investing excessive time into building custom models or fine-tuning pre-trained deep learning models.

As Woowa Brothers increasingly adopted Gen AI technologies, they observed a steady increase in both the number of employees using these tools and the number of services applying them. Notably, Gen AI considerations were being factored in even at the initial planning stages of new services. A practical example mentioned is the out-painting feature used for quality improvement of menu images, where the system extends the background of menu images that are overly zoomed-in.

However, this organic growth led to fragmentation. The prompts and invocation logic of existing Gen AI-based services were scattered across different teams and services, with no centralized management of credentials or prompts. The organization was already using multiple Gen AI providers including AWS Bedrock, Azure OpenAI, and GCP Imagen, which added complexity to the operational landscape.

## Discovery Process and Requirements Gathering

The AI Platform Team took a structured approach to identifying priorities. They conducted interviews with employees actively using Gen AI to understand challenges and identify essential features. This user-centered approach involved AI platform developers, data scientists, and project managers, ensuring diverse perspectives were captured.

The interviews revealed six key themes that the platform needed to address:

- **API Gateway**: Identified as a core infrastructure component that would minimize repetitive development tasks while enhancing system stability and security
- **Experimental Feedback**: A mechanism for collecting and incorporating user feedback to continuously improve Gen AI output quality
- **Hybrid Search**: An advanced search system combining Lexical Search with Semantic Search, suggesting RAG-related use cases
- **LLM Serving**: Infrastructure to efficiently operate, manage, and provide in-house or open-source LLMs
- **Prompt Experiment**: An experimental environment supporting effective prompt development and optimization
- **RAG Pipeline**: A standardized pipeline to improve Gen AI response quality by incorporating external knowledge

## Technical Decision: Prioritizing the API Gateway

After consolidating feedback from various stakeholders, the team made the strategic decision to prioritize the development of an API Gateway. This decision was driven by several factors.

The multi-provider landscape was a critical consideration. With Woowa Brothers already using AWS Bedrock, Azure OpenAI, and GCP Imagen, there was a clear need for a unified abstraction layer that could manage interactions with different providers. Without such a layer, each team would need to implement their own integration logic, leading to code duplication, inconsistent error handling, and security concerns around credential management.

The team also recognized the dependency chain in their roadmap. Before they could effectively build RAG Pipelines, Prompt Experiment tools, and Experiment Feedback systems, they needed a central Hub to manage credentials and prompts. The fragmented state of existing Gen AI-based services made it clear that foundational infrastructure was the prerequisite for more advanced capabilities.

The API Gateway was designed to serve several core functions. It would provide centralized credential management, ensuring that API keys and access tokens for various providers were securely stored and managed in one place rather than scattered across different codebases. It would also enable prompt management, giving teams a way to version, store, and retrieve prompts in a standardized manner. Additionally, the gateway would enhance system stability by providing consistent error handling, retry logic, and fallback mechanisms across all Gen AI invocations.

## LLMOps Considerations and Infrastructure Design

From an LLMOps perspective, this case study illustrates several important patterns and considerations for organizations scaling their Gen AI usage.

The multi-provider strategy is notable. By using AWS Bedrock, Azure OpenAI, and GCP Imagen, Woowa Brothers avoids vendor lock-in and can leverage the strengths of different platforms. However, this approach requires robust abstraction layers to manage the complexity, which is exactly what the API Gateway aims to provide.

The phased roadmap demonstrates mature thinking about LLMOps infrastructure. Rather than trying to build everything at once, the team identified dependencies and prioritized foundational components. The recognition that prompt management and credential management must precede more advanced features like RAG pipelines and experimentation tools shows an understanding of how these systems build upon each other.

The emphasis on minimizing repetitive development tasks speaks to a key LLMOps concern: developer productivity. When multiple teams are building Gen AI features, having standardized libraries and APIs prevents wheel reinvention and ensures consistent quality across the organization.

The focus on system stability and security reflects the production-grade requirements of LLMOps. Unlike experimentation environments, production Gen AI systems must handle failures gracefully, protect sensitive credentials, and provide reliable service to end users.

## Future Directions

While the case study focuses primarily on the API Gateway development, it hints at an ambitious roadmap for the AI platform. The planned features include:

- **RAG Pipeline**: Standardized infrastructure for retrieval-augmented generation, which would allow services to enhance LLM responses with external knowledge sources
- **Prompt Experiment**: Tooling for systematic prompt development and optimization, suggesting A/B testing or evaluation frameworks for prompts
- **Hybrid Search**: Combining traditional lexical search with semantic search, which is essential for effective RAG implementations
- **LLM Serving**: Infrastructure for hosting and serving in-house or open-source LLMs, indicating plans to potentially reduce dependence on external providers
- **Experimental Feedback**: Systems for collecting user feedback and using it to improve Gen AI outputs, suggesting plans for RLHF or similar optimization approaches

## Critical Assessment

It's worth noting that this case study represents early-stage work, with the primary focus on infrastructure development rather than production results. The text does not provide quantitative metrics on improvements in developer productivity, system reliability, or cost savings that resulted from the gateway implementation.

The comparison to existing solutions like Kong (mentioned at the end of the text, though cut off) suggests the team evaluated commercial options before deciding to build custom infrastructure. This build-versus-buy decision is common in LLMOps, though the full rationale is not provided in the available text.

The practical example of menu image out-painting demonstrates real-world Gen AI application, but the connection between this specific feature and the API Gateway infrastructure is not explicitly detailed. It serves more as an illustration of the types of Gen AI applications being developed rather than a direct result of the gateway project.

Overall, this case study provides valuable insights into the early-stage thinking and infrastructure priorities of a large technology organization building LLMOps capabilities. The emphasis on centralization, multi-provider support, and foundational infrastructure before advanced features reflects mature engineering practices, though the full impact and results of these efforts remain to be seen as the platform evolves.