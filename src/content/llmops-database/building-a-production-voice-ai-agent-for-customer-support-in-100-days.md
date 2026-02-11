---
title: "Building a Production Voice AI Agent for Customer Support in 100 Days"
slug: "building-a-production-voice-ai-agent-for-customer-support-in-100-days"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "687e00524d0b52697fc05bdf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:15:53.140Z"
  createdOn: "2025-07-21T08:54:42.521Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "realtime-application"
  - "rag"
  - "prompt-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "human-in-the-loop"
  - "fallback-strategies"
  - "fastapi"
  - "monitoring"
  - "openai"
industryTags: "tech"
company: "Intercom"
summary: "Intercom developed Finn Voice, a voice AI agent for phone-based customer support, in approximately 100 days. The solution builds on their existing text-based AI agent Finn, which already served over 5,000 customers with a 56% average resolution rate. Finn Voice handles phone calls, answers customer questions using knowledge base content, and escalates to human agents when needed. The system uses a speech-to-text, language model, text-to-speech architecture with RAG capabilities and achieved deployment across several enterprise customers' main phone lines, offering significant cost savings compared to human-only support."
link: "https://www.youtube.com/watch?v=HOYLZ7IVgJo"
year: 2025
seo:
  title: "Intercom: Building a Production Voice AI Agent for Customer Support in 100 Days - ZenML LLMOps Database"
  description: "Intercom developed Finn Voice, a voice AI agent for phone-based customer support, in approximately 100 days. The solution builds on their existing text-based AI agent Finn, which already served over 5,000 customers with a 56% average resolution rate. Finn Voice handles phone calls, answers customer questions using knowledge base content, and escalates to human agents when needed. The system uses a speech-to-text, language model, text-to-speech architecture with RAG capabilities and achieved deployment across several enterprise customers' main phone lines, offering significant cost savings compared to human-only support."
  canonical: "https://www.zenml.io/llmops-database/building-a-production-voice-ai-agent-for-customer-support-in-100-days"
  ogTitle: "Intercom: Building a Production Voice AI Agent for Customer Support in 100 Days - ZenML LLMOps Database"
  ogDescription: "Intercom developed Finn Voice, a voice AI agent for phone-based customer support, in approximately 100 days. The solution builds on their existing text-based AI agent Finn, which already served over 5,000 customers with a 56% average resolution rate. Finn Voice handles phone calls, answers customer questions using knowledge base content, and escalates to human agents when needed. The system uses a speech-to-text, language model, text-to-speech architecture with RAG capabilities and achieved deployment across several enterprise customers' main phone lines, offering significant cost savings compared to human-only support."
---

## Overview

Intercom's development of Finn Voice represents a significant LLMOps case study in deploying voice AI agents for customer support at enterprise scale. The company, known for its customer service platform and messenger product, evolved from a messaging-focused company to a comprehensive customer service platform before launching their text-based AI agent Finn two years prior. Building on the success of their text-based agent, which achieved over 5,000 customers and resolution rates averaging 56% (with some customers reaching 70-80%), Intercom embarked on extending their AI capabilities to voice interactions.

The business case for voice AI in customer support is compelling from multiple perspectives. Voice remains the preferred channel for urgent or sensitive issues, with over 80% of support teams still using phone support and over one-third of global customer service interactions happening via phone. The economic incentives are substantial, with traditional human phone support costing $7-12 per call in the US, while voice AI agents can reduce this cost by at least 5x. Beyond cost savings, voice AI agents provide 24/7 availability, eliminate wait times, remove the need for complex IVR menus, and support multiple languages.

## Technical Architecture and LLMOps Implementation

The technical foundation of Finn Voice follows a traditional speech-to-text, language model, text-to-speech (STT-LM-TTS) pipeline architecture. While the team considered voice-to-voice models that process audio directly without intermediate text conversion, they opted for the more controllable STT-LM-TTS approach despite potential latency tradeoffs. This architectural decision reflects a key LLMOps principle of prioritizing control and observability over theoretical performance gains.

The system incorporates several critical LLMOps components:

**RAG (Retrieval-Augmented Generation)** forms the core knowledge processing capability, enabling the agent to answer questions based on help articles and knowledge base content. This component was leveraged from their existing text-based Finn system, demonstrating effective reuse of LLMOps infrastructure across modalities.

**Real-time API integration** from OpenAI served as both the initial rapid prototyping solution and a component in the evolved architecture. This choice enabled quick iteration and testing while maintaining the flexibility to evolve the stack as requirements became clearer.

**Telephony integration** required seamless connection to existing phone infrastructure. Intercom benefited from having an existing native phone support product, allowing them to leverage established telephony capabilities rather than building from scratch.

## Production Conversation Design Challenges

The transition from text to voice required significant rethinking of conversation design, highlighting key LLMOps considerations for voice applications. Three critical differences emerged between text and voice interactions:

**Latency management** proved crucial for maintaining natural conversation flow. While users tolerate multi-second delays in text chat, voice interactions require sub-second response times to avoid awkward silences. For simple queries, the team achieved approximately 1-second response times. For complex queries requiring 3-4 seconds, they implemented dynamic filler words and phrases ("let me look into this for you") to maintain engagement while processing responses in the background.

**Response length optimization** required breaking down longer responses into digestible chunks. Unlike text interfaces where users can skim content, voice requires sequential listening. The system chunks complex multi-step responses and requests user confirmation before proceeding to subsequent steps, particularly effective for troubleshooting scenarios.

**User behavior adaptation** revealed interesting insights about human-AI voice interaction patterns. Users initially interacted with the system like traditional IVR systems, using single-word commands and yes/no responses. However, as conversations progressed and users heard natural language responses, they began using full sentences themselves. This behavioral observation highlights the importance of designing AI agents that model desired interaction patterns.

## LLMOps Workflow Integration

A critical insight from the deployment was that successful production voice AI requires seamless integration with existing support team workflows, not just technical performance. The majority of customer feedback focused on workflow integration rather than model performance, latency, or voice quality. This finding underscores a key LLMOps principle: production AI systems must solve organizational and operational problems, not just technical ones.

**Escalation paths** required careful configuration to ensure smooth handoffs from AI to human agents. The system needed to understand when to escalate and route calls appropriately to the right team members.

**Context handoff** mechanisms generate transcript summaries after each AI agent call, providing human agents with comprehensive context about prior interactions. This capability prevents customers from having to repeat information and enables more effective human intervention when needed.

These workflow integrations proved essential for moving from demonstration to production deployment at enterprise scale, representing a significant portion of the development effort despite being less technically glamorous than the core AI capabilities.

## Evaluation and Monitoring Strategy

The LLMOps evaluation strategy combines multiple approaches to ensure production reliability:

**Manual and automated evaluation** processes include test conversation sets run against major code changes. The team evolved from manual spreadsheet-based testing to automated evaluation systems, demonstrating the typical LLMOps maturation path from ad-hoc testing to systematic evaluation frameworks.

**Internal tooling development** proved critical for troubleshooting production issues. The team built specialized web applications for reviewing logs, transcripts, and recordings, enabling rapid diagnosis when customers reported problems. This investment in observability tooling represents a core LLMOps practice for maintaining production systems.

**Resolution rate tracking** serves as the primary success metric, defined as either user confirmation that their issue was resolved or user disconnection after hearing at least one answer without calling back within 24 hours. This outcome-focused metric aligns with business value rather than purely technical metrics.

**LLM-as-a-judge evaluation** represents an experimental approach where another language model analyzes call transcripts to identify improvement opportunities. This meta-evaluation approach demonstrates advanced LLMOps techniques for automated quality assessment.

## Production Economics and Pricing Models

The cost structure for voice AI agents ranges from 3-20 cents per minute, with variation depending on query complexity and provider selection. This pricing represents the underlying infrastructure costs that LLMOps teams must consider when designing production systems.

Two dominant pricing models emerge in the market:

**Usage-based pricing** (per minute or per call) offers predictability but doesn't capture quality variations or align provider incentives with customer outcomes.

**Outcome-based pricing** charges only for successful resolutions, better aligning provider and customer incentives while reducing customer risk. However, this model requires providers to absorb costs for lengthy unresolved calls, creating different risk profiles.

The speaker predicts market convergence toward outcome-based pricing due to better incentive alignment, reflecting broader trends in AI service monetization toward value-based rather than usage-based models.

## Key LLMOps Insights and Lessons

The Finn Voice development reveals several critical LLMOps insights for production voice AI systems:

**Rapid iteration capability** enabled shipping meaningful functionality within four weeks through the "Finn Voice playground" testing environment. This approach prioritized customer feedback integration over perfect initial implementations.

**MVP scoping** focused on three core experiences: testing, deploying, and monitoring agent behavior. This prioritization reflects mature LLMOps thinking about essential production capabilities.

**Cross-modal knowledge transfer** demonstrated how existing LLMOps infrastructure (RAG systems, knowledge bases, evaluation frameworks) can be leveraged across different interaction modalities, reducing development time and maintaining consistency.

**Production-first mindset** emphasized that voice AI deployment is "not just a model problem" but requires consideration of use cases, conversation design, tooling development, workflow integration, and trust building with support teams.

The case study illustrates that successful LLMOps for voice AI requires balancing technical performance with practical deployment considerations, emphasizing the importance of treating AI deployment as a comprehensive product and organizational challenge rather than purely a technical implementation.