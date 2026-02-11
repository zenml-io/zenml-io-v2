---
title: "Building an Enterprise AI Productivity Platform: From Slack Bot to Integrated AI Workforce"
slug: "building-an-enterprise-ai-productivity-platform-from-slack-bot-to-integrated-ai-workforce"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6889c78b3fdcead342369e93"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:17:48.674Z"
  createdOn: "2025-07-30T07:19:39.740Z"
llmopsTags:
  - "customer-support"
  - "content-moderation"
  - "chatbot"
  - "code-generation"
  - "data-analysis"
  - "document-processing"
  - "summarization"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "few-shot"
  - "system-prompts"
  - "evals"
  - "api-gateway"
  - "monitoring"
  - "databases"
  - "microservices"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "elasticsearch"
  - "documentation"
  - "security"
  - "guardrails"
  - "openai"
  - "anthropic"
  - "meta"
  - "google-gcp"
industryTags: "tech"
company: "Toqan"
summary: "Proess (previously called Prous) developed Toqan, an internal AI productivity platform that evolved from a simple Slack bot to a comprehensive enterprise AI system serving 30,000+ employees across 100+ portfolio companies. The platform addresses the challenge of enterprise AI adoption by providing access to multiple LLMs through conversational interfaces, APIs, and system integrations, while measuring success through user engagement metrics like daily active users and \"super users\" who ask 5+ questions per day. The solution demonstrates how large organizations can systematically deploy AI tools across diverse business functions while maintaining security and enabling bottom-up adoption through hands-on training and cultural change management."
link: "https://www.youtube.com/watch?v=AKZxUMWrTNA"
year: 2025
seo:
  title: "Toqan: Building an Enterprise AI Productivity Platform: From Slack Bot to Integrated AI Workforce - ZenML LLMOps Database"
  description: "Proess (previously called Prous) developed Toqan, an internal AI productivity platform that evolved from a simple Slack bot to a comprehensive enterprise AI system serving 30,000+ employees across 100+ portfolio companies. The platform addresses the challenge of enterprise AI adoption by providing access to multiple LLMs through conversational interfaces, APIs, and system integrations, while measuring success through user engagement metrics like daily active users and \"super users\" who ask 5+ questions per day. The solution demonstrates how large organizations can systematically deploy AI tools across diverse business functions while maintaining security and enabling bottom-up adoption through hands-on training and cultural change management."
  canonical: "https://www.zenml.io/llmops-database/building-an-enterprise-ai-productivity-platform-from-slack-bot-to-integrated-ai-workforce"
  ogTitle: "Toqan: Building an Enterprise AI Productivity Platform: From Slack Bot to Integrated AI Workforce - ZenML LLMOps Database"
  ogDescription: "Proess (previously called Prous) developed Toqan, an internal AI productivity platform that evolved from a simple Slack bot to a comprehensive enterprise AI system serving 30,000+ employees across 100+ portfolio companies. The platform addresses the challenge of enterprise AI adoption by providing access to multiple LLMs through conversational interfaces, APIs, and system integrations, while measuring success through user engagement metrics like daily active users and \"super users\" who ask 5+ questions per day. The solution demonstrates how large organizations can systematically deploy AI tools across diverse business functions while maintaining security and enabling bottom-up adoption through hands-on training and cultural change management."
---

Proess, a large global technology group with approximately 100 portfolio companies including major brands like Swiggy, iFood, and Delivery Hero, developed Toqan as an internal AI productivity platform to drive enterprise-wide AI adoption. The initiative began as an experimental Slack bot that provided early access to large language models even before ChatGPT's public release, eventually evolving into a comprehensive AI platform serving over 30,000 employees across the organization.

The technical architecture of Toqan represents a sophisticated approach to enterprise LLMOps, built around the principle of making multiple AI models accessible through various interfaces. The platform initially operated through Slack integration but expanded to include web interfaces and API access, allowing teams to experiment with and deploy AI capabilities across different use cases. The system architecture supports what they term "agentic systems" - AI agents capable of tool calling and multi-step reasoning, which power both the Toqan interface and various consumer-facing applications across their portfolio companies.

One of the most significant technical challenges addressed by the Toqan team relates to the evolution from intent-based routing to agent-based systems. The original implementation used intent detection models that required fine-tuning and training whenever new capabilities were added, creating a bottleneck for scaling functionality. The transition to agent-based architecture using tool calling capabilities eliminated this constraint, allowing for more flexible expansion of system capabilities without requiring model retraining. This architectural decision reflects a broader trend in enterprise AI systems toward more flexible, extensible agent frameworks.

The platform's approach to model management demonstrates sophisticated LLMOps practices around model versioning and experimentation. Rather than locking into a single model provider, Toqan continuously swaps different models in and out, allowing the organization to evaluate performance across various tasks and use cases. This approach provides valuable data on which models perform best for specific enterprise applications while maintaining flexibility to adapt to the rapidly evolving AI landscape.

Measurement and evaluation represent critical components of their LLMOps implementation. The team tracks three primary productivity metrics: total number of users who have tried Toqan (targeting 80% adoption per company), frequency of usage patterns, and identification of "super users" who ask more than five questions per day. This last metric serves as their north star, similar to Facebook's early strategy of getting users to seven friends for retention. The emphasis on converting casual users to power users reflects an understanding that AI tool adoption follows a characteristic curve where regular usage leads to dependency and advocacy.

The platform also measures API adoption for non-productivity use cases, tracking both API call volumes and the number of individual use cases leveraging the underlying "Toqan engine." This dual measurement approach allows them to assess both direct user productivity gains and the platform's effectiveness as infrastructure for building AI-powered features across their portfolio companies.

From a deployment and infrastructure perspective, Toqan addresses several critical enterprise AI challenges. The system handles file processing, data analysis capabilities, and integration with existing enterprise systems like GitHub, Jira, and Google Workspace. The team emphasizes system reliability and resilience, noting that early versions frequently failed due to file loading issues, timeouts, or library conflicts. Improving this "first touch point" reliability proved crucial for user adoption, as initial failures often led to user abandonment.

The evolution toward system integrations represents perhaps the most ambitious aspect of their LLMOps implementation. The team is developing what they call "AI workforce" capabilities, where users can configure specialized AI agents that integrate with enterprise systems to complete complex, multi-step workflows. This approach moves beyond simple conversational AI toward AI agents that can create, transform, and move information between systems - essentially automating "jobs to be done" rather than just providing chat-based assistance.

Their integration strategy involves user-level authentication systems that allow individuals to connect their personal accounts (Gmail, Google Drive, etc.) to create customized AI agents with appropriate permissions and access. This approach addresses the significant challenge of enterprise AI systems needing to operate within existing security and access control frameworks while maintaining user-specific context and capabilities.

Memory and learning systems represent another sophisticated aspect of their LLMOps implementation. Unlike consumer AI systems that focus on personalization, Toqan's memory system is designed to learn task execution patterns and improve consistency in tool calling. For example, the system learns specific parameters like a user's manager's name and email address to avoid repeatedly asking for the same information. This approach to memory focuses on operational efficiency rather than conversational personalization.

The team's approach to user experience and adoption represents a critical LLMOps consideration often overlooked in technical implementations. They discovered that traditional "ask me anything" interfaces led to user frustration and abandonment. Instead, they developed onboarding flows that guide users through specific, known-working capabilities before encouraging broader experimentation. This UX-focused approach to AI deployment includes live webinars, hands-on training sessions, and community building through Slack channels with over 1,300 active users.

Cultural change management emerges as perhaps the most significant challenge in their enterprise AI deployment. The team identifies organizational culture and leadership support as primary determinants of adoption success across portfolio companies. Companies with strong top-down support for AI experimentation and clear policies encouraging AI tool usage showed significantly higher adoption rates than those without such cultural foundations.

The technical roadmap for Toqan includes sophisticated agent configuration capabilities where users can create specialized AI employees for specific workflows. These agents would combine multiple tool integrations, custom knowledge bases, and learned behavioral patterns to automate complex business processes. The vision extends toward enabling domain experts to function as "architects" who design and monitor AI-powered workflows rather than executing tasks manually.

From an evaluation and quality assurance perspective, the team emphasizes building reliable systems before focusing on user experience polish. Their development philosophy prioritizes getting functionality working end-to-end, then gathering user feedback, then iterating on usability. This approach reflects practical LLMOps considerations around resource allocation and technical debt management in rapidly evolving AI systems.

The Toqan case study illustrates several critical lessons for enterprise LLMOps implementations: the importance of flexible architecture that can adapt to rapidly changing AI capabilities, the need for comprehensive measurement frameworks that track both usage and business impact, the critical role of user experience design in driving adoption, and the fundamental importance of organizational culture and change management in successful AI deployment. Their experience suggests that technical excellence alone is insufficient for enterprise AI success - successful implementations require equal attention to user experience, organizational change, and systematic approaches to evaluation and iteration.