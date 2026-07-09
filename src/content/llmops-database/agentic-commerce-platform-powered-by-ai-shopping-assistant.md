---
title: "Agentic Commerce Platform Powered by AI Shopping Assistant"
slug: "agentic-commerce-platform-powered-by-ai-shopping-assistant"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "content-moderation"
  - "summarization"
  - "multi-modality"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "multi-agent-systems"
  - "agent-based"
  - "evals"
  - "few-shot"
  - "system-prompts"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "guardrails"
  - "fastapi"
  - "databases"
  - "google-gcp"
industryTags: "e-commerce"
company: "Woolworths"
summary: "Woolworths, Australia's largest retailer serving millions of customers weekly, partnered with Google Cloud to transform their digital shopping assistant \"Olive\" from a basic support bot into an advanced agentic commerce platform using Gemini Enterprise for Customer Experience. The solution addresses fragmented customer experiences, disconnected systems, and the growing expectation for intelligent, conversational shopping journeys. By implementing a shopping agent that understands natural language, multimodal inputs (text, voice, images), and complex planning tasks like meal planning and budget optimization, Woolworths achieved higher conversion rates, larger basket sizes, and increased revenue per visitor while maintaining trust through comprehensive evaluation frameworks including eight autonomous judge agents that validate responses at scale."
link: "https://www.youtube.com/watch?v=MVf5yXw7euk&list=PLFZU5nT4APFA&index=154"
year: 2026
seo:
  title: "Woolworths: Agentic Commerce Platform Powered by AI Shopping Assistant - ZenML LLMOps Database"
  description: "Woolworths, Australia's largest retailer serving millions of customers weekly, partnered with Google Cloud to transform their digital shopping assistant \"Olive\" from a basic support bot into an advanced agentic commerce platform using Gemini Enterprise for Customer Experience. The solution addresses fragmented customer experiences, disconnected systems, and the growing expectation for intelligent, conversational shopping journeys. By implementing a shopping agent that understands natural language, multimodal inputs (text, voice, images), and complex planning tasks like meal planning and budget optimization, Woolworths achieved higher conversion rates, larger basket sizes, and increased revenue per visitor while maintaining trust through comprehensive evaluation frameworks including eight autonomous judge agents that validate responses at scale."
  canonical: "https://www.zenml.io/llmops-database/agentic-commerce-platform-powered-by-ai-shopping-assistant"
  ogTitle: "Woolworths: Agentic Commerce Platform Powered by AI Shopping Assistant - ZenML LLMOps Database"
  ogDescription: "Woolworths, Australia's largest retailer serving millions of customers weekly, partnered with Google Cloud to transform their digital shopping assistant \"Olive\" from a basic support bot into an advanced agentic commerce platform using Gemini Enterprise for Customer Experience. The solution addresses fragmented customer experiences, disconnected systems, and the growing expectation for intelligent, conversational shopping journeys. By implementing a shopping agent that understands natural language, multimodal inputs (text, voice, images), and complex planning tasks like meal planning and budget optimization, Woolworths achieved higher conversion rates, larger basket sizes, and increased revenue per visitor while maintaining trust through comprehensive evaluation frameworks including eight autonomous judge agents that validate responses at scale."
notion:
  pageId: "398f8dff-2538-80a5-a79c-ce9edd37d4ac"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T14:20:00.000Z"
  lastEditedTime: "2026-07-09T14:20:00.000Z"
  publishedAt: "2026-07-09T14:23:41Z"
---

## Overview

Woolworths represents a compelling case study in deploying agentic AI at scale in a production e-commerce environment. As a 100-year-old company and Australia's largest retailer with 54% e-commerce market share and millions of weekly customers, Woolworths faced the challenge of evolving from fragmented, disconnected shopping experiences to unified, intelligent customer journeys. Their partnership with Google Cloud led to the transformation of their digital assistant "Olive" into a comprehensive shopping agent using Gemini Enterprise for Customer Experience platform.

The implementation demonstrates sophisticated LLMOps practices across multiple dimensions: API integration, multimodal interaction design, comprehensive evaluation frameworks using autonomous judge agents, and careful attention to grounding and trustworthiness in a production retail environment where accuracy, compliance, and food safety are critical concerns.

## Problem Context and Evolution

Woolworths identified that modern customer experiences were fundamentally broken in most retail contexts. Systems were fragmented, data was siloed, shopping experiences were disconnected from support, and customers had to perform excessive manual work translating their intent into exact keywords, starting over when moving between channels, and navigating complex product catalogs without intelligent assistance. Meanwhile, consumer expectations had already shifted dramatically as customers became accustomed to using AI for complex questions with natural language, comparing options conversationally, and expecting faster answers with better recommendations.

The company recognized that simply "sprinkling AI at the edges of broken systems" would not suffice. Instead, they needed to fundamentally redefine how customers discover, decide, buy, and engage using AI to create unified journeys where context persists, personalization actually improves, and AI helps customers make progress rather than just responding to queries.

## AI Journey and Technology Stack

Woolworths progressed through multiple waves of AI adoption before reaching their current agentic implementation. In the deterministic AI wave, they deployed Dialogflow at massive scale, deflecting approximately 70% of customer service inquiries and handling millions of contacts. This proved especially critical during COVID when e-commerce grew exponentially but they maintained service levels and customer satisfaction scores with the same number of contact center representatives.

In the predictive AI wave, they leveraged their large loyalty program to process trillions of data points weekly, generating 150 million unique personalized offers each week for a population of only 30 million, demonstrating sophisticated use of customer data for personalization at scale.

For generative AI, they implemented use cases like automated call wrapping that saves three minutes per contact across millions of interactions, along with marketing content and image generation. Their broader Google Cloud infrastructure includes compute resources, BigQuery for their data lake, Vertex AI for AI applications, and recently Gemini Enterprise rolled out across the entire organization, resulting in approximately 9,000 agents built by non-technical employees within weeks or months.

## Agentic Commerce Implementation

The shopping agent implementation represents a shift from product-based journeys involving search, browse, and add-to-cart sequences to mission-based journeys where complex requests can be handled through single prompts. The platform supports genuinely complex queries like "I want healthy dinners for a week for my picky toddler and two adults" or "I'm looking for a sofa for my small apartment but I still want it to be elevated."

### Multimodal Capabilities

The shopping agent is deeply multimodal, supporting text input, bidirectional voice interaction, and image upload with fluid movement between modes. In the demonstration, image upload of a pasta dish resulted in accurate recipe identification and automatic ingredient listing for cart addition. This multimodality recognizes that shopping contexts vary and customers may prefer different interaction modes at different moments.

### Integration Architecture

The technical architecture integrates multiple existing systems through API-based tool access. The shopping agent connects to search platform APIs, product detail APIs, and personalization services as tools, allowing the agent to access accurate, current data while maintaining consistency with existing systems. This approach proved relatively straightforward to implement, with the entire system reaching production within approximately three months.

Critically, the implementation maintains consistency with Woolworths' design system, so product cards and interface elements rendered by the agent match the look and feel of their website and app, ensuring brand coherence and familiarity for users.

### Core Capabilities and Use Cases

The agent demonstrates several sophisticated capabilities in production:

The system handles complex planning and reasoning tasks, understanding nuanced queries and asking intelligent follow-up questions. It presents products visually with real-time pricing, suggests complementary accessories to build fuller baskets rather than single items, and most importantly, can execute actions including adding products to cart, refining choices, and supporting the entire journey from top-of-funnel discovery through checkout within the same conversational experience.

Key use cases prioritized for initial implementation include meal planning where customers can request complete meal solutions, smart baskets leveraging the fact that approximately 80% of grocery purchases are repeat items, in-store assistance for their 1,000+ stores across Australia and New Zealand, and customer service integration.

Particularly compelling examples from the live demonstration include requesting organic alternatives to suggested products, asking for cheaper product options in response to cost-of-living concerns with automatic savings calculation, and B2B use cases like generating week-long meal plans for 40 children at childcare centers with automatic quantity calculation based on serving sizes.

### Grounding and Context Management

All responses are grounded within Woolworths' company data, ensuring that recipe suggestions, ingredient lists, and product recommendations operate strictly within their catalog and context. This grounding builds trust by ensuring the agent never suggests unavailable products or makes claims inconsistent with the company's actual offerings.

The agent maintains context throughout the conversation, allowing for natural follow-up queries without re-establishing context, and can seamlessly transition between different types of requests within a single session.

## Evaluation Framework and Quality Assurance

One of the most sophisticated aspects of Woolworths' LLMOps implementation is their comprehensive evaluation framework using autonomous judge agents. Recognizing that agentic systems have effectively infinite possible interactions that cannot be captured in deterministic test scenarios, they built a panel of eight specialized judge agents that emulate Olive and use LLMs to evaluate Olive at scale.

### Judge Agent Architecture

Each judge agent has a specific mission and skill set designed to validate particular aspects of the shopping agent's performance:

The Number Cruncher judge uses a golden dataset to recalculate every mathematical claim made by the agent, validating best unit prices, item prices, ingredient quantities, recipe serving sizes, and other numerical outputs to ensure accuracy. This is critical in a retail environment where pricing errors could erode trust or violate regulations.

The Product Detective judge ensures products served by the agent accurately reflect official product descriptions. This is particularly important given the complex regulatory environment around grocery retail including risk management, legal compliance, food safety, and food compliance requirements. The Product Detective embeds these compliance requirements and scans for anomalies that could create liability.

The Goal Judge evaluates whether the agent successfully accomplished the user's stated mission. For example, if a user requests a basket within a $20 budget for dinner tonight and the agent returns a $25 basket, the goal is not met and the system immediately alerts the team to the failure. This ensures the agent actually solves the user's problem as specified rather than providing plausible but ultimately unhelpful responses.

### Evaluation Methodology

The judges employ several technical approaches. They use algorithmic rubrics to systematically evaluate agent responses against defined criteria. They leverage golden datasets containing known-correct information to compare agent outputs. They handle pure mathematical validation that LLMs can reliably verify. This multi-layered approach provides confidence that the agent performs correctly across diverse scenarios without requiring exhaustive manual testing of every possible interaction.

The evaluation framework proved essential for scaling the agentic commerce solution across Woolworths' large customer base where trust, accuracy, and compliance are non-negotiable. The ability to validate infinite use cases autonomously enables rapid iteration and confident deployment.

## Guiding Principles and Design Philosophy

Woolworths established six core principles that guide development and serve as validation criteria for incremental progress:

The solution must be simple, avoiding unnecessary complexity in user interactions. It must be deeply customer-centric, prioritizing user needs over technical elegance. Trustworthiness is paramount, achieved through data grounding and validation. The personality should be friendly and approachable, reflected in Olive's cheerful persona. The agent must be knowledgeable, providing accurate and comprehensive information. Finally, experiences should be delightful, creating positive emotional responses rather than mere functional adequacy.

These principles provide a framework for decision-making throughout development and help maintain focus on delivering genuine value rather than technical novelty.

## Production Deployment and Measurement

The shopping agent was deployed initially to all 200,000 Woolworths staff as an internal launch, allowing for real-world testing with a motivated user base before broader customer rollout. The demonstration showed a genuinely live production system, not a staged demo, including a moment where totals did not display as expected, illustrating the reality of production systems.

### Success Metrics

Woolworths measures success through several key metrics. Conversion rate improvement is the most important business metric, determining whether the agent actually drives completed purchases. Engagement percentage with Olive indicates whether customers find the agent valuable enough to use. They employ A/B testing comparing experiences with and without the agent to measure impacts on conversion rate, average basket size, and revenue per visitor.

Beyond business metrics, they track whether the solution meets evolving consumer expectations for intelligent, conversational experiences, recognizing that falling behind on customer experience innovation creates strategic risk even if short-term business metrics remain acceptable.

### Infrastructure and Platform Integration

The implementation sits within the broader Gemini Enterprise for Customer Experience ecosystem, which unifies shopping, search, and customer support into a single intelligent interface. The AI commerce search product serves as the foundation for product discovery, understanding deep user intent, retrieving appropriate products, and personalizing discovery. CX Agent Studio enables building personalized, multimodal support agents that retain context throughout the customer journey.

Support agents work across multiple channels including website, call center, in-store interactions, phone calls, and messaging platforms, providing consistent experiences regardless of touchpoint. The platform architecture allows automatic handoff between the AI agent, human agents, and external specialized agents while maintaining a unified user interface, so customers never experience jarring transitions or need to repeat context.

The technical architecture combines three key elements: Woolworths' proprietary brand knowledge, brand voice, product knowledge, and customer data; the advanced reasoning and intelligence of Gemini models; and real-time web search grounding from Google Search and other Google products. This synthesis produces experiences that feel deeply relevant, accurate, and completely bespoke to Woolworths while leveraging state-of-the-art AI capabilities.

## Challenges and Limitations

While the presentation is naturally positive given the conference context and partnership nature, several challenges and limitations are evident or acknowledged. The user experience design challenge of merging search and chat experiences remains ongoing, indicating this is not yet fully solved. The demonstration showed that the agent sometimes requires multiple prompts to complete tasks that users might expect to happen automatically, suggesting the "send me dinner tonight" vision of fully autonomous shopping is still aspirational.

The three-month development timeline is presented as rapid but also indicates significant engineering effort was required despite platform support. The need for eight specialized judge agents to ensure quality suggests the inherent unpredictability and evaluation challenges of agentic systems remain significant operational concerns.

The focus on grounding within company data, while a strength for accuracy and trust, may limit the agent's ability to provide broader assistance or recommendations that could benefit customers. The reliance on existing APIs means the agent's capabilities are constrained by the underlying systems' data quality and completeness.

## Strategic Implications and Future Direction

Woolworths' implementation represents a significant commitment to agentic AI, with clear conviction that 2026 is the critical adoption year and that organizations failing to engage with agentic AI now risk falling significantly behind. This aligns with broader industry perspectives that the technology has reached production readiness after being premature in previous years.

Future development plans include completing the entire end-to-end shopping journey using the agent, weaving the agent more deeply into the entire digital experience across platforms, leveraging proactive basket recommendations based on repeat purchase patterns (approximately 80% of groceries), and optimizing for on-demand delivery scenarios where small basket sizes and 30-minute delivery windows create urgency that suits conversational commerce.

The B2B grocery business represents a particularly strong use case where childcare centers and other institutional buyers need systematic meal planning and automated ordering, suggesting agentic approaches may actually be more immediately valuable for B2B scenarios than consumer retail.

## LLMOps Maturity Assessment

This case study demonstrates relatively mature LLMOps practices across several dimensions. The comprehensive evaluation framework using autonomous judge agents represents sophisticated thinking about quality assurance for non-deterministic systems. The API-based integration architecture provides appropriate separation of concerns and maintainability. The deliberate progression through AI maturity waves shows strategic thinking about capability building rather than jumping to the newest technology without foundation.

The deployment approach using internal staff as initial users provides valuable real-world testing with lower risk. The measurement framework combining business metrics, user engagement, and A/B testing demonstrates data-driven decision-making. The articulation of clear principles provides governance and decision-making frameworks.

However, challenges remain around fully autonomous experiences, seamless UX integration of conversational and traditional interfaces, and scaling the evaluation and compliance frameworks as capabilities expand. The reliance on a major platform provider creates both advantages in terms of capability access and potential concerns around flexibility and vendor dependency.

Overall, Woolworths' implementation represents a substantive production deployment of agentic AI in a challenging domain with significant compliance requirements, demonstrating that careful attention to evaluation, grounding, and incremental capability building can enable successful large-scale LLM applications in production e-commerce environments.
