---
title: "Building a Secure and Scalable LLM Gateway for Enterprise GenAI Adoption"
slug: "building-a-secure-and-scalable-llm-gateway-for-enterprise-genai-adoption"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a8c090455a8af26a36083e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:00:00.879Z"
  createdOn: "2025-02-09T14:49:52.699Z"
llmopsTags:
  - "multi-modality"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "code-interpretation"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "error-handling"
  - "fastapi"
  - "api-gateway"
  - "security"
  - "monitoring"
  - "open-source"
  - "amazon-aws"
  - "openai"
  - "cohere"
industryTags: "finance"
company: "Wealthsimple"
summary: "Wealthsimple developed a comprehensive LLM platform to enable secure and productive use of generative AI across their organization. They started with a basic gateway for audit trails, evolved to include PII redaction, self-hosted models, and RAG capabilities, while focusing on user adoption and security. The platform now serves over half the company with 2,200+ daily messages, demonstrating successful enterprise-wide GenAI adoption while maintaining data security."
link: "https://www.infoq.com/articles/gen-ai-productivity-tools/"
year: 2024
seo:
  title: "Wealthsimple: Building a Secure and Scalable LLM Gateway for Enterprise GenAI Adoption - ZenML LLMOps Database"
  description: "Wealthsimple developed a comprehensive LLM platform to enable secure and productive use of generative AI across their organization. They started with a basic gateway for audit trails, evolved to include PII redaction, self-hosted models, and RAG capabilities, while focusing on user adoption and security. The platform now serves over half the company with 2,200+ daily messages, demonstrating successful enterprise-wide GenAI adoption while maintaining data security."
  canonical: "https://www.zenml.io/llmops-database/building-a-secure-and-scalable-llm-gateway-for-enterprise-genai-adoption"
  ogTitle: "Wealthsimple: Building a Secure and Scalable LLM Gateway for Enterprise GenAI Adoption - ZenML LLMOps Database"
  ogDescription: "Wealthsimple developed a comprehensive LLM platform to enable secure and productive use of generative AI across their organization. They started with a basic gateway for audit trails, evolved to include PII redaction, self-hosted models, and RAG capabilities, while focusing on user adoption and security. The platform now serves over half the company with 2,200+ daily messages, demonstrating successful enterprise-wide GenAI adoption while maintaining data security."
---

## Overview

Wealthsimple is a Canadian financial services platform focused on democratizing financial access. Following the release of ChatGPT in November 2022, the company recognized both the potential and the risks of generative AI adoption in a regulated financial services environment. Rather than banning employee use of LLMs (as many companies did due to data security concerns), Wealthsimple embarked on building a comprehensive internal LLM platform that would enable productivity while safeguarding sensitive financial data. This case study documents their two-year journey from 2023 through 2024, providing practical lessons for organizations seeking to operationalize LLMs at enterprise scale.

The company organized their GenAI efforts into three primary streams: employee productivity tools, operational optimization for client experience, and the underlying LLM platform infrastructure. This case study primarily focuses on the employee productivity and platform infrastructure aspects, which laid the foundation for production deployments.

## LLM Gateway Architecture

The cornerstone of Wealthsimple's LLM infrastructure is their LLM gateway, which they developed and open-sourced. The gateway serves as a centralized proxy layer between internal users and various LLM providers, addressing security, reliability, and optionality concerns.

The initial version of the gateway focused on maintaining an audit trail, tracking what data was being sent externally, which provider received it, and who sent it. This was critical for a financial services company where inadvertent data sharing could have serious compliance and security implications. The gateway architecture allowed employees to select from different models through a dropdown interface for conversational use, while production systems could interact programmatically through an API endpoint that handled retry and fallback mechanisms.

The gateway's multi-provider design proved prescient as the LLM landscape evolved. Initially supporting OpenAI and Cohere, the platform expanded to include Gemini (particularly valued for its 1-million-token context window) and eventually Amazon Bedrock. This provider-agnostic approach allowed the company to avoid vendor lock-in and take advantage of improvements across the ecosystem.

## Driving Adoption: Carrots and Sticks

Wealthsimple encountered the classic enterprise adoption challenge: building the infrastructure is only half the battle. Their philosophy of "making the right way the easy way" guided their adoption strategy, with emphasis on incentives over enforcement.

The primary incentives included free usage (the company absorbed all API costs), centralized access to multiple LLM providers, and improved reliability through retry and fallback mechanisms. The team also worked with OpenAI to increase rate limits, addressing early reliability issues with OpenAI's servers.

The "sticks" were notably soft, primarily consisting of "nudge mechanisms" that would send Slack reminders when employees visited external LLM providers directly. However, the team later discovered this approach was ineffective—the same people were repeatedly nudged and became conditioned to ignore the reminders. By 2024, they removed these nudge mechanisms entirely, recognizing that platform improvements were far stronger drivers of behavioral change than enforcement mechanisms.

## PII Redaction Model

A significant technical investment was the development of an in-house PII redaction model, shipped in June 2023. This model could detect and redact potentially sensitive information (such as telephone numbers) before requests were sent to external LLM providers. The model addressed the fundamental tension in financial services between leveraging external AI capabilities and protecting customer data.

However, the PII redaction approach introduced a meaningful user experience tradeoff. Users reported that the redaction model was not always accurate, which interfered with the relevancy of LLM responses. More fundamentally, many employees needed to work with actual PII data to do their jobs effectively—redaction prevented them from getting useful answers about the data they were analyzing.

This tension between security and usability became a key driver for the next phase of infrastructure development: self-hosted models.

## Self-Hosted Open Source Models

To resolve the PII redaction usability challenges, Wealthsimple invested in self-hosting open source LLMs. Using llama.cpp, a quantized framework for running LLMs locally, they built infrastructure to run models within their own cloud environment. This architecture eliminated the need for PII redaction entirely when using self-hosted models, since data never left their controlled infrastructure.

The self-hosted approach represented a meaningful shift in the build-versus-buy calculus for LLM operations. While external providers offered superior model capabilities, the ability to process sensitive data without redaction provided substantial value for certain use cases. This hybrid approach—external providers with PII redaction for general use cases, self-hosted models for sensitive data workflows—became a core architectural pattern.

## RAG and Semantic Search

Wealthsimple introduced a semantic search capability as their first RAG (Retrieval-Augmented Generation) API, enabling developers and end users to build applications grounded against company-specific context. Despite intuitive appeal and user requests for grounding capabilities, initial adoption was surprisingly low.

The team recognized that the RAG API alone was insufficient—the gap was in experimentation and feedback loops. Users needed easier ways to iterate on GenAI products and understand whether their implementations were working effectively. This insight led to the next infrastructure investment.

## Data Applications Platform

To address the experimentation gap, Wealthsimple built an internal data applications platform using Python and Streamlit. This technology choice was deliberate: Streamlit was already familiar to their data scientists, reducing the learning curve for building proof-of-concept applications.

The platform proved remarkably successful at accelerating innovation. Within just two weeks of launch, seven applications were running on the platform. Two of these proof-of-concept applications eventually made it into production, demonstrating the value of reducing friction in the experimentation-to-production pipeline. The platform effectively served as an internal incubator for GenAI use cases.

## Boosterpack: Knowledge Base Personal Assistant

At the end of 2023, Wealthsimple launched Boosterpack, an internal tool designed to provide employees with a personal assistant grounded against Wealthsimple-specific context. Users could upload documents to create knowledge bases (either private or shared), then use chat functionality to ask questions about the content. The system included reference links to knowledge sources, enabling fact-checking and further reading.

Initial expectations for Boosterpack were high, but adoption results were mixed. The team discovered a critical lesson about tool proliferation: by creating a separate tool for knowledge-grounded conversations, they had inadvertently fragmented the user experience. Users now had two different places to get their GenAI needs met, which proved detrimental to both adoption and productivity. Most users stuck with a single tool regardless of the available options, suggesting that consolidation should be prioritized over feature expansion.

## Evolution in 2024: From Hype to Pragmatism

The transition from 2023 to 2024 marked a significant shift in Wealthsimple's GenAI strategy. The team reflected on their journey using Gartner's hype cycle framework, recognizing that 2023 represented the "peak of inflated expectations" while 2024 brought a more sobering assessment as they descended into the "trough of disillusionment."

Rather than continuing to chase state-of-the-art models (which changed every few weeks), the team pivoted to focusing on higher-level trends and platform improvements. This strategic shift emphasized sustainable value over technological novelty.

One significant trend they embraced was multimodal inputs. The ability to upload images or PDFs and have LLMs drive conversations from those inputs proved remarkably popular. Within weeks of launching multimodal support, nearly one-third of end users were leveraging these features at least weekly. A particularly common use case involved employees sending screenshots of error messages for troubleshooting—behavior that would be an antipattern when communicating with human developers but worked seamlessly with LLMs.

## Build vs. Buy Evolution: Amazon Bedrock Adoption

Wealthsimple's approach to build versus buy evolved significantly over their two-year journey. In 2023, they chose to build capabilities internally to develop confidence and know-how in deploying LLM technologies at scale. By 2024, their requirements had matured to prioritize security, privacy, price, and time to market.

This evolution led them to adopt Amazon Bedrock, AWS's managed service for foundational LLMs. While there was significant overlap between Bedrock's capabilities and their internal tooling, the decision to adopt reflected a more pragmatic approach to resource allocation. The internal expertise they had developed in 2023 made them confident in their ability to evaluate and integrate managed services effectively.

## API Design and Standards

A painful lesson emerged around API design. The initial LLM gateway API was designed without consideration for emerging industry standards, which created significant integration headaches. Because OpenAI's API specifications became the de facto standard, Wealthsimple had to rewrite substantial code from LangChain and other libraries that expected OpenAI-compatible APIs.

In September 2024, they shipped v2 of their API, mirroring OpenAI's specifications. This experience underscored the importance of following open standards in the rapidly maturing GenAI ecosystem, where interoperability with existing tools and frameworks provides substantial leverage.

## Usage Patterns and Productivity Impact

After two years of deployment, Wealthsimple achieved significant adoption metrics: over 2,200 daily messages across their LLM tools, nearly one-third of the company as weekly active users, and over half as monthly active users. Surveys and user interviews indicated that nearly everyone who used LLMs reported significant productivity improvements.

Usage concentrated in three primary categories: programming (debugging, code generation, and general programming support), content generation and augmentation (writing assistance, style changes, and content completion), and information retrieval (research and document parsing). Programming-related usage accounted for nearly half of all interactions.

## Key Lessons for LLMOps Practitioners

Several practical lessons emerged from Wealthsimple's experience. First, tools are most valuable when injected into existing workflows—the movement of information between platforms is a significant detractor. Second, even as tool proliferation increases, users tend to consolidate around single tools, suggesting that platform consolidation should be prioritized. Third, user behavior often surprises builders regardless of stated preferences, emphasizing the importance of usage analytics over survey data.

The team also learned that not all GenAI bets pay off, and organizations should be deliberate about strategy and focus on business alignment rather than chasing every new capability. Platform improvements proved to be stronger drivers of behavioral change than enforcement mechanisms, supporting a product-led growth approach to internal tool adoption.

## Looking Forward

Wealthsimple positions themselves as entering the "slope of enlightenment" in the Gartner hype cycle as they head into 2025. The foundations developed for employee productivity are now paving the way for client-facing applications, with the internal tools serving as building blocks for production GenAI at scale. This progression from internal experimentation to external deployment represents a common pattern for organizations maturing their LLMOps capabilities.