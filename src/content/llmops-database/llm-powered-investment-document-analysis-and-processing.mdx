---
title: "LLM-Powered Investment Document Analysis and Processing"
slug: "llm-powered-investment-document-analysis-and-processing"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3baccde8495fec10598b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:40:59.025Z"
  createdOn: "2024-11-21T13:54:52.263Z"
llmopsTags:
  - "amazon-aws"
  - "classification"
  - "document-processing"
  - "documentation"
  - "error-handling"
  - "human-in-the-loop"
  - "langchain"
  - "load-balancing"
  - "microsoft-azure"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "scaling"
  - "security"
  - "system-prompts"
industryTags: "finance"
company: "AngelList"
summary: "AngelList transformed their investment document processing from manual classification to an automated system using LLMs. They initially used AWS Comprehend for news article classification but transitioned to OpenAI's models, which proved more accurate and cost-effective. They built Relay, a product that automatically extracts and organizes investment terms and company updates from documents, achieving 99% accuracy in term extraction while significantly reducing operational costs compared to manual processing."
link: "https://www.youtube.com/watch?v=qhGaS1SGkKI"
year: 2023
seo:
  title: "AngelList: LLM-Powered Investment Document Analysis and Processing - ZenML LLMOps Database"
  description: "AngelList transformed their investment document processing from manual classification to an automated system using LLMs. They initially used AWS Comprehend for news article classification but transitioned to OpenAI's models, which proved more accurate and cost-effective. They built Relay, a product that automatically extracts and organizes investment terms and company updates from documents, achieving 99% accuracy in term extraction while significantly reducing operational costs compared to manual processing."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-investment-document-analysis-and-processing"
  ogTitle: "AngelList: LLM-Powered Investment Document Analysis and Processing - ZenML LLMOps Database"
  ogDescription: "AngelList transformed their investment document processing from manual classification to an automated system using LLMs. They initially used AWS Comprehend for news article classification but transitioned to OpenAI's models, which proved more accurate and cost-effective. They built Relay, a product that automatically extracts and organizes investment terms and company updates from documents, achieving 99% accuracy in term extraction while significantly reducing operational costs compared to manual processing."
---

## Overview

This case study comes from a podcast interview with Tebow, an engineering lead at AngelList, discussing how the investment platform evolved its machine learning infrastructure from traditional ML approaches to LLM-powered solutions. AngelList is a platform that connects startups with investors, handling investment documents, company news tracking, and portfolio management for venture capital funds and individual investors.

The conversation provides an excellent window into the pragmatic decisions involved in transitioning from custom-trained ML models to LLM-based systems, and the subsequent productization of internal AI capabilities into a customer-facing product called Relay.

## The Journey from Traditional ML to LLMs

Tebow joined AngelList approximately two years before the interview as one of the first engineers with machine learning experience. The organization had no data scientists, research scientists, or dedicated ML competency when he arrived. The culture emphasized autonomy, with employees encouraged to act as "founders of their one-person startup."

### Initial ML Implementation

The first ML use case was news article classification to route relevant articles to investor dashboards for companies they had invested in. This was implemented using AWS Comprehend with a custom-trained model. Key challenges with this approach included:

- **Cost inefficiency**: The minimum deployment for a custom Comprehend model was approximately $1,000 per month for a single server with no serverless option
- **Limited flexibility**: The off-the-shelf classification couldn't handle more nuanced extraction tasks like identifying acquirer vs. acquiree in acquisition news
- **Development time**: The initial system took about two months to deploy

### The LLM Transition

The team was able to deprecate the entire Comprehend-based system and rewrite it using OpenAI in a single day. The new approach used simple prompts with GPT-3 (later upgraded to GPT-3.5 and GPT-4) to:

- Classify whether news articles were relevant (raising money, exits, product launches)
- Extract structured information like acquisition parties
- Filter appropriately (e.g., only caring about company raises, not VC fund raises)

The benefits were immediate: lower costs (pay-per-request vs. always-on server), automatic quality improvements as OpenAI released better models, and the ability to add nuanced extraction through prompt modifications rather than model retraining.

## Technical Architecture

### Document Processing Pipeline

The production system uses LangChain as the orchestration library. The pipeline follows this flow:

- Documents come in via email or upload
- Classification prompt determines document type
- Based on classification, appropriate extraction prompts are applied
- For investment documents, advanced prompts parse legal terms, valuations, caps, and other structured data
- Legal language is analyzed to flag potential issues requiring investor attention
- Extracted data becomes metadata attached to documents in the customer portal

### Hallucination Prevention

A critical aspect of their approach is the inherent verifiability of their use case. Since they're doing data extraction from source documents (not generation), they can always cross-reference extracted information against the original text. This makes their domain particularly well-suited for LLM applications because:

- Ground truth exists in the source documents
- Extracted entities can be verified as present in the source
- Historical documents in their database provide validation sets (documents are matched to structured data that has been double and triple-checked by users and operations teams)

The team claims 99% accuracy on extraction tasks, validated through extensive back-testing against their historical document corpus.

## Prompt Engineering and Iteration

The team acknowledged that prompt engineering remains somewhat "artisanal" in their current process. They built an internal system that maintains human-in-the-loop capabilities where operators can:

- Upload documents
- Apply prompts and get outputs
- Review results immediately
- Iterate on prompt improvements

While they don't yet have fully structured regression testing (where new prompts are automatically validated against known-good outputs), this is on their roadmap. The eventual goal is an automated test suite that can validate prompt changes don't introduce regressions, even if it's computationally expensive.

A strategic decision was to put prompt engineering in the hands of domain experts rather than solely engineers. Since prompts are natural language, lawyers and operations staff who understand the business domain can iterate on prompts directly. This provides higher leverage than having engineers attempt to encode domain knowledge.

## Infrastructure and Scaling Challenges

The biggest operational challenges weren't model quality but rather scaling API access. Key issues included:

- Getting access to GPT-4 and GPT-4-32k endpoints
- Securing higher rate limits for production volume
- Finding the right contacts at OpenAI for enterprise support

### Multi-Provider Strategy

To address reliability and scaling concerns, AngelList implemented a dual-provider approach:

- **Azure OpenAI**: More robust, consistent responses, familiar cloud environment for provisioning resources, easier rate limit increases
- **OpenAI Direct API**: Direct access to latest models, existing relationship

They load balance between both providers, providing fallback capability if either experiences issues. The team noted that Azure was more operationally mature and stable compared to direct OpenAI API access.

## Product Evolution: Relay

The internal document extraction capabilities were productized into Relay, a customer-facing tool launched publicly. Relay allows investors to:

- Forward investment documents via email to a dedicated address
- Automatically extract investment terms (company, investor, amount, valuation, cap, etc.)
- Track company updates over time
- Identify companies that haven't sent updates (potential red flags)
- View all investments in a unified dashboard

The product offers a free tier (5 documents per month) to allow users to experience the value proposition directly.

## Strategic Philosophy on Build vs. Buy

The team articulated a deliberate 70/30 strategy:

- **70% effort**: Apply LLMs to known workflows currently requiring human input, focusing on breadth and quick wins without over-optimizing for cost
- **30% effort**: Explore new capabilities, including potentially training custom models on proprietary data

Their rationale for sticking with OpenAI rather than exploring alternatives like Anthropic or Cohere was focused prioritization. Adding another provider would increase system complexity without clear benefit since they weren't hitting roadblocks with OpenAI's capabilities. The time saved is better spent building new features with known-working infrastructure.

However, they recognize future scenarios requiring more control:

- Training customer-specific model layers on their data
- Per-customer models for personalized experiences (e.g., natural language queries over a user's investment portfolio)
- Cost optimization as usage scales

## Key Lessons for LLMOps Practitioners

The case study highlights several practical insights:

**Start with verifiable use cases**: Document extraction where outputs can be validated against source material is an ideal LLM application because hallucinations are detectable.

**Value over optimization**: The team deliberately chose breadth of application over cost optimization initially. As costs for AI inference continue to decrease, getting features to market matters more than premature optimization.

**Embrace managed services initially**: Despite eventual limitations, starting with OpenAI's API allowed rapid iteration. The complexity of self-hosted models can be deferred until scale demands it.

**Domain experts should own prompts**: Moving prompt engineering to lawyers and business experts rather than keeping it solely with engineers increases velocity and quality.

**Build fallback infrastructure early**: Multi-provider routing between Azure OpenAI and direct OpenAI APIs provides both reliability and scaling headroom.

**Human-in-the-loop remains valuable**: Even at 99% accuracy, having review processes and the ability for humans to validate edge cases maintains quality and builds trust in the system.

The interview presents a refreshingly pragmatic view of LLMOps: focus on delivering value to users, defer complexity until it's necessary, and maintain clear connections to ground truth data to ensure reliability.