---
title: "LLM-Powered Voice Assistant for Restaurant Operations and Personalized Alcohol Recommendations"
slug: "llm-powered-voice-assistant-for-restaurant-operations-and-personalized-alcohol-recommendations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693164c8ea52e254e18270b6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:33:12.958Z"
  createdOn: "2025-12-04T10:39:04.413Z"
llmopsTags:
  - "fraud-detection"
  - "customer-support"
  - "content-moderation"
  - "classification"
  - "chatbot"
  - "realtime-application"
  - "regulatory-compliance"
  - "legacy-system-integration"
  - "poc"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "system-prompts"
  - "a2a"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "scaling"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "openai"
  - "anthropic"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash implemented two major LLM-powered features during their 2025 summer intern program: a voice AI assistant for verifying restaurant hours and personalized alcohol recommendations with carousel generation. The voice assistant replaced rigid touch-tone phone systems with natural language conversations, allowing merchants to specify detailed hours information in advance while maintaining backward compatibility with legacy infrastructure through factory patterns and feature flags. The alcohol recommendation system leveraged LLMs to generate personalized product suggestions and engaging carousel titles using chain-of-thought prompting and a two-stage generation pipeline. Both systems were integrated into production using DoorDash's existing frameworks, with the voice assistant achieving structured data extraction through prompt engineering and webhook processing, while the recommendations carousel utilized the company's Carousel Serving Framework and Discovery SDK for rapid deployment."
link: "https://careersatdoordash.com/blog/part-4-doordash-2025-summer-intern-projects/"
year: 2025
seo:
  title: "Doordash: LLM-Powered Voice Assistant for Restaurant Operations and Personalized Alcohol Recommendations - ZenML LLMOps Database"
  description: "DoorDash implemented two major LLM-powered features during their 2025 summer intern program: a voice AI assistant for verifying restaurant hours and personalized alcohol recommendations with carousel generation. The voice assistant replaced rigid touch-tone phone systems with natural language conversations, allowing merchants to specify detailed hours information in advance while maintaining backward compatibility with legacy infrastructure through factory patterns and feature flags. The alcohol recommendation system leveraged LLMs to generate personalized product suggestions and engaging carousel titles using chain-of-thought prompting and a two-stage generation pipeline. Both systems were integrated into production using DoorDash's existing frameworks, with the voice assistant achieving structured data extraction through prompt engineering and webhook processing, while the recommendations carousel utilized the company's Carousel Serving Framework and Discovery SDK for rapid deployment."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-voice-assistant-for-restaurant-operations-and-personalized-alcohol-recommendations"
  ogTitle: "Doordash: LLM-Powered Voice Assistant for Restaurant Operations and Personalized Alcohol Recommendations - ZenML LLMOps Database"
  ogDescription: "DoorDash implemented two major LLM-powered features during their 2025 summer intern program: a voice AI assistant for verifying restaurant hours and personalized alcohol recommendations with carousel generation. The voice assistant replaced rigid touch-tone phone systems with natural language conversations, allowing merchants to specify detailed hours information in advance while maintaining backward compatibility with legacy infrastructure through factory patterns and feature flags. The alcohol recommendation system leveraged LLMs to generate personalized product suggestions and engaging carousel titles using chain-of-thought prompting and a two-stage generation pipeline. Both systems were integrated into production using DoorDash's existing frameworks, with the voice assistant achieving structured data extraction through prompt engineering and webhook processing, while the recommendations carousel utilized the company's Carousel Serving Framework and Discovery SDK for rapid deployment."
---

## Overview

This case study documents two distinct LLM-powered production systems developed during DoorDash's 2025 summer internship program. The first project focuses on replacing traditional interactive voice response (IVR) systems with an AI-powered voice assistant for verifying restaurant operating hours, while the second implements LLM-based personalized recommendations for alcohol products with automatically generated carousel titles. Both projects demonstrate practical approaches to integrating generative AI capabilities into existing production infrastructure while maintaining reliability, backward compatibility, and operational safety.

## Voice AI Assistant for Restaurant Hour Verification

### Business Problem and Context

DoorDash's original system for verifying merchant availability relied on automated robocalls using touch-tone (DTMF) technology. Merchants received calls asking them to "Press 1 for yes, 2 for no, 3 for special hours." This approach had significant limitations: it could only capture simple yes/no responses, couldn't gather detailed scheduling information in advance, and had to be executed on the day in question (such as the morning of a holiday). This prevented DoorDash from proactively collecting precise schedules ahead of time, forcing reactive rather than proactive operations management.

The vision was to enable merchants to respond in natural language with statements like "We're closing at 4 PM instead of 9 PM next Monday because of Labor Day," allowing calls to be scheduled well in advance with precise hours captured for system updates.

### Architecture and Design Patterns

The engineering approach prioritized backward compatibility and incremental rollout through careful architectural abstraction. The team created a flexible multi-provider architecture using the factory pattern to decouple the scheduler from any specific vendor implementation. At the core is the **RobocallCreator interface**, which defines standard methods like `createVoiceCallCheckOptOut()` and `createVoiceCall()` that both legacy DTMF systems and new AI voice agents implement.

A **RobocallCreatorFactory** makes runtime decisions about which implementation to use based on feature flags and store-specific configurations. This factory pattern serves as the enforcement point for policy and safety, centralizing provider selection and ensuring deterministic fallback to legacy robocalls when needed. The architecture allows DoorDash to route 1% of stores to the AI path on Monday and roll back to 0% on Tuesday if issues arise, all without touching downstream systems.

The design extends further with a **VoiceAIAgentClientFactory** that abstracts specific AI providers (starting with Vapi, with planned support for Twilio and Amazon Connect). This double abstraction—first between legacy and AI systems, then between AI providers—creates a highly flexible foundation that reduces vendor lock-in and blast radius while preserving operational stability.

### Prompt Engineering for Structured Data Extraction

The critical challenge in production LLM deployment was converting open-ended conversational data into reliable, machine-actionable structured output. The team treated prompt design as a user interface problem, crafting prompts that guide merchants through a structured dialogue while maintaining natural conversation flow.

The voice agent persona "Alex" follows a specific flow: introduction, asking whether the store is open regular hours/closed/special hours, following up for specific times when applicable, and confirming by repeating information back. Critically, the prompt ensures the assistant always returns a **digits** field compatible with the old IVR flow (values 1, 2, or 3) plus normalized opening and closing timestamps when applicable. This dual output format preserves backward compatibility while enabling new capabilities.

To reduce errors, the prompt design enforces a confirm-and-repeat step where the assistant verbalizes back the understood schedule for merchant confirmation. The system also normalizes various time formats (5 PM, 17:00, etc.) into a consistent schema before webhook processing. This combination of guided conversation, explicit confirmation, and normalization produces dependable inputs for automated store hour updates.

### Webhook Processing and Business Logic

Webhooks serve as the bridge between conversation and business action. The webhook handler is designed to be idempotent, schema-driven, and strict about preconditions. The data model extracts structured data from the AI provider's response, focusing only on essential fields: digits (the numeric choice), opening time, closing time, call status, and phone number.

The `processStructuredData` function validates inputs and performs exactly one business mutation: creating special hours for the current day when conditions are met (either digits equals "3" or both opening and closing times are present). After the mutation, it publishes a status event for observability. This intentional separation between validation, mutation, and event publishing makes the system easy to extend later for features like multi-day ranges or holiday templates without changing the voice agent contract.

The webhook design protects data integrity by avoiding partial writes when data is insufficient, while still publishing status events for observability. This makes failures visible via Kafka while protecting source-of-truth systems from incomplete or malformed inputs.

### Integration with Existing Systems

A key success factor was reusing existing event models and infrastructure. The voice AI path publishes the same **VoiceCallStatusUpdateEvent** that the legacy system uses, meaning alerting, dashboards, and consumer services required no changes. The scheduler continues to drive call creation, but the provider implementation behind the interface differs based on feature flag configuration.

By preserving the old contract—particularly status updates and the semantics of the "digits" field—the rest of DoorDash's ecosystem remains unaware of whether a call was DTMF-driven or a natural language conversation. This design choice dramatically reduced rollout risk and kept the change high-leverage with minimal cross-team coordination overhead.

### End-to-End Production Flow

In production, the flow operates as follows: the scheduler picks the provider via factory based on configuration, the voice agent "Alex" conducts a natural language conversation with the merchant, Vapi sends structured response data to the webhook endpoint, the webhook interprets the response and triggers special hours updates in MenuDataService, and finally Kafka events notify downstream systems to keep stores appropriately open or closed. Feature flags provide kill switches at multiple levels, and instrumentation monitors cache hit rates, fallbacks, and end-to-end latency.

## LLM-Powered Personalized Alcohol Recommendations

### Business Context and Opportunity

DoorDash's Alcohol Landing Page previously featured only ranked store lists, store carousels, and category tiles, with no personalized item-level recommendations. This gap limited product discovery for customers. The goal was to introduce personalized alcohol recommendations by leveraging LLMs to power in-app item carousels that could scale personalization in a domain historically lacking the data density required for traditional recommendation systems.

### LLM Recommendation Pipeline Architecture

The recommendation pipeline takes a user's order history and search terms as input, uses semantic search to surface real, orderable products from the DoorDash catalog, and writes results to a database. The system generates item-level alcohol recommendations that align with user preferences while providing human-interpretable explanations like "Why You'll Like This" for email notifications.

LLMs enable meaningful suggestions in the alcohol domain by using learned representations of beverage categories and attributes to generalize from limited user behavior. This is particularly valuable for alcohol, where many users have sparse purchase histories compared to food orders, making traditional collaborative filtering approaches less effective.

### Framework Integration and Carousel Development

The in-app carousel was built using three DoorDash frameworks: the Carousel Serving Framework (CSF), Discovery SDK, and Vertical Landing Page (VLP) Layout Framework. CSF is a page-agnostic system for defining new carousel types, allowing the team to create a carousel type and content fetcher that retrieves recommendation data from the database without rebuilding presentation logic.

CSF integrates with the Discovery SDK, which defines how products (carousels, banners, other components) are assembled into the final feed. This separation allows each feature to maintain its own latency budget. The alcohol recommendations carousel defines a product service added as a dependency to the New Verticals Destination Pipeline powering the VLP. The Layout Framework then maps the alcohol recommendations placement type to the appropriate carousel configuration for correct UI positioning.

This framework approach, combined with server-driven UI, enables engineers to rapidly create new carousel types while focusing on content rather than presentation. Built-in observability from Discovery SDK and CSF provides job-level metrics and error logs that simplify debugging and iteration.

### Two-Stage Carousel Title Generation

Beyond generating recommendations, the system uses LLMs to create engaging carousel titles through a sophisticated two-stage pipeline designed to balance creativity with accuracy.

In the **candidate generation stage**, the LLM proposes 3-5 short titles (3-5 words each) based on recommended items. To reduce irrelevant or misleading titles, the team introduced a chain-of-thought-style prompt where the LLM first summarizes the beverage categories in the carousel (red wines, beers, seltzers, etc.), then creates a title capturing them all (such as "Smooth Reds & Easy Sips"). This intermediate reasoning step prevents the model from generating misleading titles like "Unwinding with Wine" when the carousel includes diverse drink types beyond wine.

The **title judge and re-rank stage** addresses the observation that the first suggested title wasn't always the most natural or accurate. A second LLM call evaluates the generated candidates, filters out overly editorial or generic titles, and re-ranks the remaining options. This approach reliably produces stronger, more contextually accurate titles that better represent the actual carousel content.

### Production Deployment and Testing

The alcohol recommendation email launched to production, and early employee testing of the alcohol recommendations carousel demonstrated the viability of LLM-driven personalization in the Alcohol VLP. The system grounds recommendations in user order history while pairing them with interpretable, engaging carousel titles to make discovery feel intuitive and delightful.

From an LLMOps perspective, this implementation highlights several important patterns: using intermediate reasoning steps (chain-of-thought) to improve output quality, employing multi-stage generation with specialized evaluation steps, and integrating LLM-generated content into existing serving infrastructure through well-defined framework abstractions.

## Cross-Cutting LLMOps Themes and Lessons

### Abstraction and Flexibility

Both projects demonstrate the value of abstraction layers in production LLM systems. The voice assistant uses factory patterns to abstract providers, while the recommendations system uses framework abstractions to separate content generation from presentation. These abstractions enable experimentation, reduce blast radius when issues occur, and allow teams to iterate on LLM behavior without disrupting dependent systems.

### Prompt Engineering as Interface Design

The case study reinforces that prompts are the UI of AI systems. The voice assistant treats prompts as conversation guides that must produce structured outputs compatible with downstream systems. The recommendation titles use prompts that include explicit reasoning steps to improve output quality. Both examples show that production prompt engineering requires careful consideration of both user experience (natural conversation, engaging titles) and system requirements (structured data, accuracy constraints).

### Incremental Rollout and Safety

Feature flags appear prominently in both systems, enabling gradual rollout and quick rollback when needed. The voice assistant can route different percentages of stores to AI versus legacy systems, while monitoring metrics at each stage. This approach to deployment risk management is essential for production LLM systems where behavior can be less deterministic than traditional software.

### Reusing Existing Infrastructure

Both projects succeeded by integrating into existing infrastructure rather than requiring wholesale system redesign. The voice assistant publishes the same Kafka events as the legacy system, while the recommendations carousel uses established serving frameworks. This pragmatic approach reduces coordination overhead, accelerates time-to-production, and leverages existing observability and reliability patterns.

### Observability and Metrics

The voice assistant includes instrumentation for cache hit rates, fallbacks, and latency, while the recommendations system benefits from built-in CSF and Discovery SDK metrics. Clear signals into performance errors are emphasized as critical for effective troubleshooting and debugging in production LLM systems.

### Solving Concrete Problems vs. Overgeneralization

The recommendations project explicitly calls out the importance of solving concrete problems (alcohol product recommendations) rather than building overly general systems prematurely. This focus enables deeper problem-specific optimization, such as the tailored two-stage title generation pipeline that addresses specific failure modes observed in the alcohol recommendation domain.

## Technical Evaluation and Balanced Assessment

The case study presents successful implementations but should be viewed with appropriate context. The voice assistant's backward compatibility approach is technically sound and demonstrates mature software engineering practices, though the text doesn't provide quantitative metrics on accuracy, latency, or error rates in production. Claims about the system's reliability would be strengthened by specific success rate data, transcription accuracy metrics, or failure mode analysis.

The alcohol recommendations system similarly lacks detailed performance metrics. While the framework integration is described clearly, the case study doesn't provide data on recommendation quality, user engagement with generated carousels, or A/B test results comparing LLM-generated titles to human-written alternatives. The two-stage title generation pipeline is intuitively appealing but would benefit from quantitative evaluation of how often the judge-and-rerank stage actually improves title quality over using just the first-stage output.

Both projects were summer intern efforts, which is impressive but also suggests they represent initial implementations rather than mature, fully-optimized production systems. The voice assistant mentions "early employee testing" and the recommendations system launched email notifications with in-app carousel testing, indicating these are early-stage deployments whose long-term performance remains to be validated.

The factory pattern approach for the voice assistant is architecturally solid but adds complexity. The double abstraction (legacy vs. AI, then specific AI providers) makes sense for flexibility but introduces indirection that can complicate debugging and add latency. The text doesn't discuss the operational costs of maintaining multiple provider integrations or the complexity of keeping prompts and webhook logic synchronized across different AI vendors.

For the recommendations system, relying on LLMs for both recommendations and title generation introduces dependencies on external model providers with potential cost, latency, and reliability implications not discussed in the case study. The two-stage title generation means two LLM calls per carousel, which could impact latency budgets and inference costs at scale.

Overall, these implementations demonstrate thoughtful approaches to integrating LLMs into production e-commerce infrastructure with appropriate emphasis on safety, observability, and backward compatibility. The engineering patterns shown—factory abstractions, structured prompting, webhook-based integration, framework reuse—represent solid LLMOps practices. However, the case study would be more compelling with quantitative performance data, cost analysis, failure mode discussion, and longer-term production learnings beyond the initial internship project timeframe.