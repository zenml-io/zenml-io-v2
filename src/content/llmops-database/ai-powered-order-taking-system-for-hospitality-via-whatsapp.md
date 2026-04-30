---
title: "AI-Powered Order Taking System for Hospitality via WhatsApp"
slug: "ai-powered-order-taking-system-for-hospitality-via-whatsapp"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "realtime-application"
  - "structured-output"
  - "legacy-system-integration"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "rag"
  - "human-in-the-loop"
  - "latency-optimization"
  - "few-shot"
  - "system-prompts"
  - "evals"
  - "error-handling"
  - "cost-optimization"
  - "fastapi"
  - "cache"
  - "databases"
  - "api-gateway"
  - "monitoring"
  - "orchestration"
  - "redis"
  - "anthropic"
  - "openai"
industryTags: "other"
company: "AITropos"
summary: "AITropos built AI employees for the hospitality industry, focusing specifically on automated order taking for restaurants, hotels, bakeries, and quick-service restaurants. The company developed a conversational AI system that operates through WhatsApp, allowing customers to place orders through natural conversation without leaving their messaging app. The system integrates with point-of-sale systems, manages inventory checks, handles delivery logistics, and processes payments while maintaining response times fast enough that customers often believe they're interacting with a human. After extensive testing with thousands of automated conversations and continuous human oversight during onboarding, the system achieves high accuracy in order taking, with the primary KPI being the percentage of items correctly identified in customer orders."
link: "https://www.youtube.com/watch?v=fFDGEgzcL80"
year: 2026
seo:
  title: "AITropos: AI-Powered Order Taking System for Hospitality via WhatsApp - ZenML LLMOps Database"
  description: "AITropos built AI employees for the hospitality industry, focusing specifically on automated order taking for restaurants, hotels, bakeries, and quick-service restaurants. The company developed a conversational AI system that operates through WhatsApp, allowing customers to place orders through natural conversation without leaving their messaging app. The system integrates with point-of-sale systems, manages inventory checks, handles delivery logistics, and processes payments while maintaining response times fast enough that customers often believe they're interacting with a human. After extensive testing with thousands of automated conversations and continuous human oversight during onboarding, the system achieves high accuracy in order taking, with the primary KPI being the percentage of items correctly identified in customer orders."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-order-taking-system-for-hospitality-via-whatsapp"
  ogTitle: "AITropos: AI-Powered Order Taking System for Hospitality via WhatsApp - ZenML LLMOps Database"
  ogDescription: "AITropos built AI employees for the hospitality industry, focusing specifically on automated order taking for restaurants, hotels, bakeries, and quick-service restaurants. The company developed a conversational AI system that operates through WhatsApp, allowing customers to place orders through natural conversation without leaving their messaging app. The system integrates with point-of-sale systems, manages inventory checks, handles delivery logistics, and processes payments while maintaining response times fast enough that customers often believe they're interacting with a human. After extensive testing with thousands of automated conversations and continuous human oversight during onboarding, the system achieves high accuracy in order taking, with the primary KPI being the percentage of items correctly identified in customer orders."
notion:
  pageId: "352f8dff-2538-80c1-9885-cf5e3aa0bd70"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T15:28:00.000Z"
  lastEditedTime: "2026-04-30T15:28:00.000Z"
  publishedAt: "2026-04-30T15:32:27Z"
---

## Overview

AITropos represents a compelling case study in building production-grade LLM systems for a highly specialized vertical application. Founded by CEO Santi Maruri and CTO Juan Ao, both with over 15 years of experience in hospitality software, the company addresses a critical operational challenge in the restaurant and hotel industry: automated order taking. The founders spent two years exploring hundreds of ideas before settling on this specific use case, recognizing that while many companies provide chatbots for information retrieval, true order taking represents both the hardest and most valuable application of conversational AI in hospitality.

The company's core insight was identifying order taking as a uniquely challenging problem that requires bridging the non-deterministic world of human conversation with the deterministic requirements of point-of-sale systems. Their solution focuses primarily on quick-service restaurants, hotels, and other hospitality venues where customers prioritize efficiency over human interaction, deliberately avoiding contexts where human touch is essential to the experience.

## Technical Architecture and LLMOps Approach

The AITropos system employs a sophisticated agent-based architecture built around tool calling rather than model context protocol or pure retrieval-augmented generation, a deliberate choice driven by latency requirements. Juan Ao emphasized that tools provide the fastest and most efficient method for agents to interact with external systems, as MCP would introduce additional steps that could impact response time. The system does incorporate RAG for knowledge bases and information preloading, but tool calling remains the primary interaction pattern.

The architecture centers on a webhook-based pipeline that receives messages from WhatsApp's API and triggers a complex orchestration of parallel and sequential processes. One of the most significant engineering challenges was optimizing this pipeline for speed. The team moved from sequential processing to aggressive parallelization, identifying which operations could run concurrently without dependencies. For example, when a customer orders multiple products, the system searches for all items simultaneously rather than sequentially, dramatically reducing response time.

A particularly innovative aspect of their architecture is what Juan describes as a dual system prompt approach. The agent receives a main system prompt that remains constant, but also gets an "immediate system prompt" that updates dynamically based on the most recent message and conversation context. This updated prompt is injected before the agent processes each turn, providing relevant information without requiring tool calls. The implementation uses smaller, faster agents that run in parallel with the main conversation flow to anticipate what information might be needed. For instance, one micro-agent analyzes incoming messages to build product search queries, executing searches and pulling information into the context before the main agent even decides it needs that data. Similarly, they pre-emptively search their knowledge base and inject relevant results, though they acknowledge this approach can sometimes introduce noise that confuses the agent.

## Tool Design and System Integration

The agent has access to a carefully designed set of tools that abstract away the complexity of multiple backend systems. Key tools include order creation and product addition with support for modifiers, recipe variations, and comments; product search and availability checking; knowledge base querying; geolocation validation for delivery zones; and payment link generation. Critically, these tools are provider-agnostic. When generating payment links, for example, the tool internally routes to whichever payment provider the venue uses, keeping the agent logic clean and consistent across different restaurant configurations.

The tools handle sophisticated business logic that varies by point-of-sale system. Restaurant orders are notoriously complex data structures with products that can have variations, modifiers for size, extra items, promotional bundles with special pricing, and different data models across POS systems. Juan noted that POS systems remain "an unsolved problem" with each restaurant requiring custom implementations, creating enormous variance in data structures. The AITropos tools normalize this complexity, translating the agent's structured output into the specific format required by each integrated system.

Database infrastructure also proved critical for performance. The team experimented with different database engines and caching strategies to minimize query latency. They made architectural decisions about when to interact directly with POS systems versus maintaining an internal representation of the order, ultimately choosing to build orders in their own fast system before pushing completed orders to the external POS integration.

## Prompt Engineering and Conversational Design

Santi Maruri takes primary responsibility for prompt engineering, spending significant time crafting prompts that make the agent communicate like a real person. The company has developed what Juan calls a "prompt composer framework" that dynamically injects prompt fragments based on venue configuration. Rather than maintaining monolithic prompts, they compose prompts from modular pieces, allowing the same agent to adapt to different restaurant types, menu structures, and business rules.

There's a constant back-and-forth between Santi's prompt work and Juan's systems implementation. They regularly review whether logic currently embedded in prompts should be moved into deterministic code. As Santi noted, they often use the prompt as an MVP testing ground for new features, implementing business logic through natural language instructions. Once they validate that customers need and use a feature, they refactor it into proper system-level code, reducing the agent's cognitive load and improving reliability.

Juan is developing a concept he calls "conversational driven design," analogous to business-driven or test-driven development. The idea is that the desired conversation outcome drives all architectural decisions. Rather than designing the system first and fitting conversations into it, they start with the conversation experience they want customers to have and build the system to support that interaction pattern.

## Evaluation and Quality Assurance

AITropos has developed a rigorous multi-layered evaluation approach that balances automated testing with human oversight. Their primary KPI is deceptively simple: what percentage of items did the agent identify correctly? While conversational quality matters, the team recognizes that correct order taking is the only metric that truly matters to customers.

Before any agent reaches production, it undergoes thousands of test conversations. The company built a customer simulation agent specifically for this purpose. This synthetic customer agent engages in extended order-taking conversations with the production agent, attempting to replicate real customer behavior including edge cases and difficult scenarios. After each conversation, another evaluation agent analyzes the transcript to determine whether the order was captured correctly, checking that all items, modifiers, variations, and special instructions match what the simulated customer requested. After thousands of runs, yet another agent performs meta-analysis on the errors, identifying patterns and systematic failures.

Santi mentioned that their first testing runs revealed a huge error rate, but iterative improvement through this testing pipeline has reduced errors to rare occurrences. The approach reflects a broader LLMOps pattern where agents test agents, creating automated quality assurance pipelines that scale beyond what human testing could achieve.

Despite sophisticated automation, human oversight remains central to their production workflow, especially during customer onboarding. When bringing a new restaurant online, team members including Santi, Juan, and contracted freelancers audit conversations manually, often working late into the night reviewing orders as they come in. They've built alerting systems where an evaluation agent continuously monitors live conversations and sends email alerts when it detects potential problems, allowing human operators to take over mid-conversation if necessary.

This human-in-the-loop approach isn't about correcting customer-facing errors after the fact, but about real-time intervention during conversations. If a human operator spots the agent misunderstanding an order, they can seamlessly take over the WhatsApp conversation, correct the order, then let the agent resume. This creates a safety net that maintains customer experience even when the agent encounters novel situations. Critically, the team then investigates these interventions, identifies the root cause, implements fixes, and automates the solution so the same error doesn't recur.

The onboarding period has decreased from three months to just a few weeks as the company has accumulated domain knowledge. For new restaurant types, onboarding takes longer because the system must learn the menu structure, product relationships, and business rules. However, for familiar categories like pizzerias, they can deploy much faster because they already understand how those businesses operate. This demonstrates how production LLM systems accumulate transferable knowledge over time, reducing deployment friction for similar use cases.

## Latency Optimization and Performance Engineering

One of the most striking aspects of this case study is the relentless focus on latency. Juan recounted how Santi constantly pushed for faster response times, comparing the experience to a scene from the Spotify documentary where the founder repeatedly demands faster song loading. This obsession with speed stems from a crucial insight: customers will only perceive the agent as human-like if response times feel natural for a messaging conversation.

Agents are typically used for long-running tasks where multi-second delays are acceptable, but order taking requires near-real-time interaction. The team achieved this through multiple optimization strategies including parallelization of independent operations like product searches, caching frequently accessed data, pre-computation of likely needed information through micro-agents, strategic database selection and optimization, and minimizing external API calls by maintaining internal state.

Interestingly, they also introduced deliberate delays to prevent responses that feel unnaturally fast, which would immediately signal to users that they're interacting with AI. This attention to the psychology of conversation timing shows sophisticated thinking about the human aspects of LLMOps beyond pure technical performance.

## Model Selection and Dependency Management

The team uses multiple models in their architecture with different roles. They rely on cutting-edge models from providers like Anthropic for the main conversational agent, while using smaller, faster models for micro-agents that perform specific tasks like query generation and information retrieval. Juan shared a pivotal moment when the system wasn't performing adequately on order building, particularly struggling with the complex data structures POS systems require. Santi expressed doubt about whether the solution was even possible. The very same day, their model provider released a new, smarter model. Juan simply swapped in the new model without changing any other code, and the system began working as intended.

This experience shaped their philosophy about building on the frontier of AI capabilities. They explicitly build for the models coming out in six months rather than what's available today, trusting that continuous model improvements will lift their product's performance over time. However, Juan cautioned against relying solely on model improvements. Teams must also invest in proper engineering, architectural decisions, and optimization to control costs and ensure the system would work well even with less capable models.

The team actively tracks developments across the AI landscape. Juan mentioned following emerging technologies like Inception's Mercury diffusion language models, which can correct previous tokens rather than being purely autoregressive. This forward-looking approach to model research ensures they're aware of architectural possibilities before they become mainstream, allowing rapid adoption when new capabilities become available. Their production system has experienced the common LLMOps challenge of running out of API credits, at which point development grinds to a halt since they rely heavily on AI for coding assistance. They joked about checking Twitter and being the first to notice when LLM providers experience downtime.

## Integration Challenges and Business Logic

A major challenge in this domain is the heterogeneity of restaurant operations and POS systems. Each venue has different menu structures, pricing rules, modifier options, promotional logic, delivery zones, and operational hours. POS systems all implement these concepts differently with incompatible data models. The AITropos system must absorb this complexity, presenting a consistent interface to the agent while handling all backend variations through configuration rather than custom code.

The agent can handle sophisticated scenarios like orders scheduled for future dates requiring different stock checks, delivery address validation using geolocation APIs like Google Places, payment processing through multiple providers, order modifications after initial placement but before payment, and customer service including handling complaints and generating alerts to restaurant staff. The system even supports sending attachments through WhatsApp, like PDF menus or food photos, depending on how venues configure their knowledge base.

The conversational interface removes friction from the ordering process. Customers don't need to install restaurant-specific apps or navigate complex menu structures on small screens. They simply message the restaurant through WhatsApp, already installed on their phone, and have a natural conversation. The agent guides them through the ordering process while still allowing freedom to ask questions, change their mind, or make modifications at any point. This flexibility differentiates the experience from rigid app-based or kiosk-based ordering systems.

## Production Realities and Pragmatic Tradeoffs

The founders demonstrated refreshing honesty about the realities of production LLM systems. They acknowledged that their agent sometimes makes mistakes, though these are rare and usually caught either by human monitors during onboarding or by customers reviewing their order before payment. When errors occur post-delivery, the agent can handle complaints and customer service interactions, capturing feedback and alerting the venue.

They also showed pragmatism in their marketing positioning. While they call their product "AI employees," they're considering changing this framing because AI isn't actually their product—high-quality service delivery is. The system sometimes requires human intervention, and that's acceptable as long as the overall customer experience remains excellent. Their goal is to pass what they call the "Turing test" for order taking, making customers feel they're speaking with a human. They report significant success, with customers sending thank-you messages and food photos, explicitly praising the attentive service, unaware they were interacting with AI.

The case study also illustrates practical founder-level involvement in LLMOps. Both Santi and Juan regularly spend lunch and dinner hours watching live conversations, observing how the agent handles different scenarios, and messaging each other excitedly when the agent elegantly solves a difficult problem. This hands-on engagement reflects the reality that production LLM systems, especially in their early stages, require continuous monitoring and refinement by people who deeply understand both the technology and the domain.

## Strategic Positioning and Future Direction

AITropos has made deliberate choices about where to deploy their technology. They focus on contexts where customers value efficiency over human interaction, like quick-service restaurants, room service, poolside ordering, and high-volume venues where finding a human server is challenging. They explicitly avoid contexts where human interaction is central to the experience, recognizing that their solution isn't universally applicable across hospitality.

The company currently operates in Argentina where WhatsApp is described as "the operating system of Latin America," but their architecture is channel-agnostic. They can easily connect to iMessage, SMS, or other messaging platforms, with plans to expand to Mexico, the United States, and Spain. The WhatsApp-first approach makes sense in their initial markets but positions them to adapt as they enter regions with different messaging preferences.

Their immediate challenge is scaling the business. They've proven the technology works reliably across different venue types and are now focused on customer acquisition and reducing onboarding time. The evolution from three-month to few-week onboarding cycles demonstrates learning curve effects, with each new customer type teaching them reusable patterns that accelerate future deployments. This suggests they're building a scalable playbook rather than doing fully custom implementations.

## Lessons for LLMOps Practitioners

This case study offers several valuable lessons for teams building production LLM applications. First, the importance of finding a specific, high-value use case rather than trying to solve everything. AITropos spent two years exploring ideas before committing to order taking, and even then, they initially built something different before pivoting based on customer feedback. Domain expertise proved crucial, with both founders bringing 15+ years of hospitality software experience that informed their understanding of the problem space and facilitated integrations.

Second, the critical nature of latency optimization for conversational applications. The obsessive focus on speed, including parallelization, caching, pre-computation, and strategic tool design, was essential to creating a human-like experience. Teams building similar systems should treat response time as a first-class concern rather than an optimization to address later.

Third, the value of layered evaluation combining automated testing with human oversight. The agent-testing-agent approach allows scale while human monitoring during onboarding catches edge cases and enables continuous improvement. The willingness to intervene in real-time conversations creates a safety net that maintains quality while the system learns.

Fourth, the pragmatic approach to prompt engineering versus system implementation. Using prompts as MVPs for new features, then refactoring successful features into code, provides a rapid iteration cycle while managing technical debt. The prompt composer framework shows how to maintain consistency across configurations without duplicating prompt logic.

Finally, the forward-looking model strategy of building for capabilities that don't quite exist yet, trusting that model improvements will arrive. This requires staying current with research and maintaining flexible architecture that can swap models easily. However, it must be balanced with proper engineering so the system remains cost-effective and doesn't rely entirely on having the most expensive, capable models to function.
