---
title: "Building a Property Question-Answering Chatbot to Replace 8-Hour Email Responses with Instant AI-Powered Answers"
slug: "building-a-property-question-answering-chatbot-to-replace-8-hour-email-responses-with-instant-ai-powered-answers"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad9549fb8ccf2e663595a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:19.327Z"
  createdOn: "2025-12-23T18:03:00.583Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "question-answering"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "multi-agent-systems"
  - "agent-based"
  - "evals"
  - "system-prompts"
  - "fastapi"
  - "api-gateway"
  - "microservices"
  - "monitoring"
  - "guardrails"
  - "openai"
industryTags: "e-commerce"
company: "Agoda"
summary: "Agoda, an online travel platform, developed the Property AMA (Ask Me Anything) Bot to address the challenge of users waiting an average of 8 hours for property-related question responses, with only 55% of inquiries receiving answers. The solution leverages ChatGPT integrated with Agoda's Property API to provide instant, accurate answers to property-specific questions through a conversational interface deployed across desktop, mobile web, and native app platforms. The implementation includes sophisticated prompt engineering with input topic guardrails, in-context learning that fetches real-time property data, and a comprehensive evaluation framework using response labeling and A/B testing to continuously improve accuracy and reliability."
link: "https://medium.com/agoda-engineering/how-we-built-agodas-property-ama-bot-to-simplify-travel-decisions-b861c7ec7ff1"
year: 2024
seo:
  title: "Agoda: Building a Property Question-Answering Chatbot to Replace 8-Hour Email Responses with Instant AI-Powered Answers - ZenML LLMOps Database"
  description: "Agoda, an online travel platform, developed the Property AMA (Ask Me Anything) Bot to address the challenge of users waiting an average of 8 hours for property-related question responses, with only 55% of inquiries receiving answers. The solution leverages ChatGPT integrated with Agoda's Property API to provide instant, accurate answers to property-specific questions through a conversational interface deployed across desktop, mobile web, and native app platforms. The implementation includes sophisticated prompt engineering with input topic guardrails, in-context learning that fetches real-time property data, and a comprehensive evaluation framework using response labeling and A/B testing to continuously improve accuracy and reliability."
  canonical: "https://www.zenml.io/llmops-database/building-a-property-question-answering-chatbot-to-replace-8-hour-email-responses-with-instant-ai-powered-answers"
  ogTitle: "Agoda: Building a Property Question-Answering Chatbot to Replace 8-Hour Email Responses with Instant AI-Powered Answers - ZenML LLMOps Database"
  ogDescription: "Agoda, an online travel platform, developed the Property AMA (Ask Me Anything) Bot to address the challenge of users waiting an average of 8 hours for property-related question responses, with only 55% of inquiries receiving answers. The solution leverages ChatGPT integrated with Agoda's Property API to provide instant, accurate answers to property-specific questions through a conversational interface deployed across desktop, mobile web, and native app platforms. The implementation includes sophisticated prompt engineering with input topic guardrails, in-context learning that fetches real-time property data, and a comprehensive evaluation framework using response labeling and A/B testing to continuously improve accuracy and reliability."
---

## Overview and Business Context

Agoda, a major online travel accommodation platform, faced a significant customer experience challenge with their property information access system. While their property pages contained comprehensive information about accommodations, users struggled to quickly find specific answers to common questions like "Does this hotel offer free breakfast?" or "Is there a bar in the hotel?" The existing Customer Messaging platform allowed users to contact properties directly, but this system had critical limitations: only 55% of questions received responses from properties, and the average response time was 8 hours. This delay created friction in the booking decision process and negatively impacted user experience.

To address these challenges, Agoda developed the Property AMA (Ask Me Anything) Bot, their first production AI chatbot designed to provide instant, accurate responses to property-related questions. The case study claims the bot reduced response times from 8 hours to seconds, though it's important to note that this comparison is somewhat misleading as it contrasts the bot's instant responses with the previous human-mediated email system rather than demonstrating equivalent quality improvements.

## Technical Architecture

The Property AMA Bot employs a three-layer architecture that integrates frontend client technology, backend API orchestration, and LLM-powered natural language processing.

### Frontend Layer: AIDE Chatbot Client

The chatbot client, named AIDE, serves as the user-facing component responsible for interpreting user queries and managing the conversational interface. Agoda made a strategic architectural decision to build AIDE as an NPM package library and micro-frontend (MFE), enabling reusability across different deployment contexts. This design allows the same chatbot component to be rendered consistently across Agoda's website, mobile web view, and native applications, ensuring a uniform user experience across all platforms. The micro-frontend approach demonstrates production-ready thinking about scale and maintainability, allowing different teams to integrate the chatbot without duplicating development effort.

### Backend Layer: LLM API Orchestration

At the core of the system sits the LLM API, which functions as an orchestration layer between the chatbot client, Agoda's internal services, and ChatGPT (OpenAI's language model). When a user submits a question, the LLM API performs several critical functions: it receives the query from the client, fetches relevant context from Agoda's Property API (PAPI) to retrieve current property information, constructs prompts that combine the user question with property-specific data, sends this enriched prompt to ChatGPT for processing, and returns the generated response to the client.

This architecture demonstrates a key LLMOps pattern: rather than relying solely on the LLM's pre-trained knowledge, the system dynamically retrieves fresh, property-specific data from Agoda's production databases. This approach, similar to Retrieval-Augmented Generation (RAG) patterns, ensures responses are based on current, accurate information rather than potentially outdated training data. The integration with Property API means the bot can access real-time details about amenities, policies, and facilities for each specific property.

### LLM Layer: ChatGPT Integration

Agoda chose to use ChatGPT (OpenAI's commercial API) as their language model, which represents a common production pattern of leveraging third-party foundation models rather than training custom models. While the case study doesn't specify which version of ChatGPT (GPT-3.5, GPT-4, etc.) they deployed, the choice to use a commercial API reflects practical LLMOps tradeoffs: faster time to market and reduced infrastructure complexity in exchange for API costs and dependency on external services.

## Prompt Engineering Strategy

The case study provides valuable insight into Agoda's prompt engineering approach, which they identify as "key to making the P-AMA chatbot work effectively." Their prompt structure includes nine distinct components designed to control the bot's behavior and ensure appropriate responses:

The prompt components include defining the bot's role and reference context, establishing the knowledge base it should draw from, specifying what actions to take based on different prompt types, handling out-of-scope queries appropriately, preventing disclosure of system information, ensuring adherence to instructions, managing unsupported questions, providing response guidelines for consistency, and avoiding external referrals. This comprehensive prompt structure demonstrates production-level thinking about edge cases and potential failure modes.

A particularly important feature is their use of in-context learning. The system fetches relevant property data from the Property API and includes this information directly in the prompt sent to ChatGPT. This technique allows the model to generate responses that are both contextually accurate and specific to the queried property, without requiring fine-tuning or model retraining. The in-context learning approach represents a pragmatic LLMOps strategy that balances accuracy with operational simplicity.

## Guardrails and Safety Mechanisms

Agoda implemented a sophisticated two-stage prompt execution system to handle inappropriate or out-of-scope queries. The case study highlights a critical production concern: ensuring the bot behaves like a "professional customer service chatbot" and only answers appropriate property-related questions.

The system executes two distinct prompts for each user query. First, an "input topic guardrail" prompt checks whether the user's question falls within allowed topics based on a predefined topic list. This guardrail acts as a classification step to determine if the question is relevant to property information that the bot should answer. Second, if the guardrail check passes, the system executes the main "answer queries" prompt that generates a response based on property data provided as context.

This two-stage approach addresses several important scenarios: customers asking questions completely unrelated to the property, customers asking questions the bot cannot reliably answer, and attempts by the bot to fabricate information not provided in the context. The guardrail mechanism represents a practical safety pattern in LLMOps, preventing the bot from generating responses outside its intended scope and reducing the risk of hallucinations or inappropriate answers.

The case study acknowledges these challenges explicitly, noting: "Our Property AMA bot should answer on behalf of Agoda. We want this bot to act like a professional customer service chatbot." This framing suggests awareness of the reputation risks associated with deploying LLMs in customer-facing applications, though the specific implementation details of the topic list and guardrail prompts are not disclosed.

## Evaluation Framework

Agoda developed a comprehensive evaluation strategy combining systematic response labeling and A/B testing to measure and improve chatbot performance. This dual-pronged approach reflects mature LLMOps practices that go beyond simple accuracy metrics.

### Response Labeling System

The data science team implemented a systematic response labeling methodology where chatbot responses are classified into four distinct categories. While the case study mentions that responses are organized into "clear categories based on their relevance and accuracy," it notes that "responses are classified into four distinct labels" without specifying what those labels are in the provided text. The visual diagram in the original article presumably shows these labels, but the text itself doesn't enumerate them.

This labeling system serves multiple purposes: it provides quantitative metrics for prompt quality, enables systematic comparison between different prompt versions, identifies patterns in failure modes, and guides iterative improvements to prompts and system architecture. The case study reports that "after multiple iterations and refinements," they achieved their current performance statistics, though the specific metrics aren't fully detailed in the excerpt provided.

The systematic labeling approach demonstrates production-level thinking about LLM evaluation. Rather than relying on anecdotal assessment of chatbot quality, Agoda established a repeatable measurement framework that allows data-driven optimization. The mention of "multiple iterations" suggests they used this evaluation system to progressively improve performance through prompt refinement.

### A/B Testing Integration

Beyond offline evaluation, Agoda integrated the chatbot with their "in-house experimentation platform" to conduct A/B tests in production. This allows them to compare different prompts or model configurations while measuring business-critical outcomes including bookings, user engagement, and other unspecified metrics.

The A/B testing approach represents sophisticated LLMOps practice that connects technical performance to business value. Rather than optimizing for purely technical metrics like response accuracy in isolation, Agoda can measure whether prompt changes actually improve end-user behavior and business outcomes. This methodology addresses a common challenge in production LLM systems: ensuring that technical improvements translate to real-world value.

The case study notes they can "measure key metrics such as bookings, user engagement, and other business-critical outcomes to evaluate the success or failure of each prompt." This connection between prompt engineering and business metrics demonstrates mature MLOps thinking applied to LLM systems, where technical components are continuously validated against actual product goals rather than proxy metrics.

## Production Deployment and Scale

The chatbot deployment spans multiple platforms, demonstrating Agoda's commitment to broad accessibility. The system is "accessible across platforms, including desktop, mobile web, and the Agoda app," ensuring consistent functionality regardless of how users access Agoda's services. The micro-frontend architecture mentioned earlier enables this multi-platform deployment without requiring separate implementations for each platform.

While the case study doesn't provide specific metrics on usage volume, response latency, or infrastructure details, the emphasis on "instant" responses suggests they achieved acceptable latency for real-time conversational interaction. The claim of reducing response time "from 8 hours to seconds" primarily reflects the shift from asynchronous email-based communication to synchronous chat, rather than specific technical optimizations to the LLM inference pipeline.

The case study doesn't discuss important production considerations such as cost management (OpenAI API costs per query), rate limiting, failover mechanisms if the ChatGPT API is unavailable, or monitoring/observability infrastructure. These omissions are common in promotional case studies but represent critical concerns for real-world LLMOps implementations.

## Critical Assessment and Limitations

While the case study presents an impressive implementation, several aspects warrant balanced evaluation. The dramatic "8 hours to seconds" claim compares fundamentally different interaction models (asynchronous property responses vs. synchronous chatbot) rather than like-for-like improvements. A more meaningful comparison would benchmark response accuracy and user satisfaction between property-provided answers and bot-generated responses.

The case study acknowledges that only 55% of questions received property responses previously, but doesn't clarify whether the bot can successfully answer all questions or if some still require human intervention. The guardrail system explicitly filters out unsupported questions, suggesting the bot has defined limitations, though the scope of these limitations isn't quantified.

The reliance on ChatGPT (a third-party commercial API) introduces dependencies and potential risks not discussed in the case study: ongoing API costs that scale with usage, potential latency or availability issues with OpenAI's infrastructure, data privacy considerations when sending property information to external services, and lack of control over the underlying model's behavior or future changes to the API.

The evaluation framework, while sophisticated, focuses primarily on technical metrics and business outcomes without detailed discussion of failure modes, edge cases, or systematic bias testing. The case study doesn't address how the system handles ambiguous questions, multi-lingual support (relevant for international travel), or situations where property information might be incomplete or contradictory.

## Future Directions: AI Agents

Agoda outlines ambitious plans to expand beyond the current Property AMA Bot through "AI Agents" architecture. They envision introducing a "ManagerAgent" that orchestrates multiple specialized agents, each handling specific tasks related to different Agoda products including bookings, flights, activities, and accommodations. This represents an evolution toward more complex multi-agent systems where different LLM-powered components collaborate to handle broader user requests.

The proposed architecture emphasizes "plug-and-play flexibility," allowing agents to be "easily added or swapped" like building blocks. This modular design would theoretically enable rapid adaptation to new challenges and opportunities. However, the case study provides only high-level vision rather than concrete implementation details or timelines for this multi-agent system.

The multi-agent direction reflects broader industry trends toward agentic AI systems, though implementing such architectures in production introduces significant additional complexity around agent coordination, consistency across agents, debugging multi-agent interactions, and ensuring coherent user experiences when multiple agents are involved in a single conversation. The case study doesn't address these challenges, presenting the multi-agent future primarily as an aspirational roadmap.

## LLMOps Maturity Assessment

Agoda's Property AMA Bot demonstrates several markers of production-ready LLMOps implementation: systematic prompt engineering with clear component structure, integration with existing production data sources for context enrichment, multi-platform deployment through reusable frontend architecture, comprehensive evaluation combining offline labeling and online A/B testing, safety mechanisms through input guardrails, and iterative improvement processes based on measured performance.

However, the case study also reveals areas where details are sparse: specific model versions and configurations used, infrastructure and scaling considerations, cost management strategies, monitoring and observability approaches, handling of edge cases and failure modes, and concrete quantitative results beyond the headline "8 hours to seconds" claim.

Overall, the implementation represents a pragmatic, business-focused approach to deploying LLMs in production for a specific, well-scoped use case. Rather than pursuing cutting-edge research or custom model development, Agoda leveraged commercial APIs (ChatGPT) combined with solid engineering practices around prompt design, guardrails, and evaluation to deliver measurable business value. This approach reflects realistic LLMOps strategy for many organizations: start with focused use cases, use established foundation models, invest in prompt engineering and integration rather than model training, and establish measurement frameworks to validate business impact.