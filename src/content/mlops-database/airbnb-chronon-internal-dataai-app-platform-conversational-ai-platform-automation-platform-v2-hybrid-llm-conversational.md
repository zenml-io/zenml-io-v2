---
title: "Automation Platform v2 Hybrid LLM Conversational AI with Guardrails, Context Management, and LLM Observability"
slug: "airbnb-chronon-internal-dataai-app-platform-conversational-ai-platform-automation-platform-v2-hybrid-llm-conversational"
draft: false
mlopsTags:
  - "metadata-store"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "deployment"
  - "model-evaluation"
  - "serving"
industryTags: "other"
company: "Airbnb"
companySlug: "airbnb"
platformName: "Chronon / Internal Data+AI App Platform / Conversational AI Platform"
contentType: "blog"
summary: "Airbnb evolved its Automation Platform from version 1, which supported conversational AI through static predefined workflows, to version 2, which powers LLM-based applications at scale. The v1 platform suffered from inflexibility and poor scalability, requiring manual workflow creation for every scenario. Version 2 introduces a hybrid architecture that combines LLM-powered conversational capabilities with traditional workflows, implementing Chain of Thought reasoning, sophisticated context management, and a guardrails framework. This platform enables customer support agents to work more efficiently by providing natural language interactions while maintaining production-level requirements around latency, accuracy, and safety. The architecture supports developers through integrated tooling including playgrounds, LLM-oriented observability, and managed execution environments."
link: "https://medium.com/airbnb-engineering/automation-platform-v2-improving-conversational-ai-at-airbnb-d86c9386e0cb"
year: 2024
seo:
  title: "Airbnb: Automation Platform v2 Hybrid LLM Conversational AI with Guardrails, Context Management, and LLM Observability - ZenML MLOps Database"
  description: "Airbnb evolved its Automation Platform from version 1, which supported conversational AI through static predefined workflows, to version 2, which powers LLM-based applications at scale. The v1 platform suffered from inflexibility and poor scalability, requiring manual workflow creation for every scenario. Version 2 introduces a hybrid architecture that combines LLM-powered conversational capabilities with traditional workflows, implementing Chain of Thought reasoning, sophisticated context management, and a guardrails framework. This platform enables customer support agents to work more efficiently by providing natural language interactions while maintaining production-level requirements around latency, accuracy, and safety. The architecture supports developers through integrated tooling including playgrounds, LLM-oriented observability, and managed execution environments."
  canonical: "https://www.zenml.io/mlops-database/airbnb-chronon-internal-dataai-app-platform-conversational-ai-platform-automation-platform-v2-hybrid-llm-conversational"
  ogTitle: "Airbnb: Automation Platform v2 Hybrid LLM Conversational AI with Guardrails, Context Management, and LLM Observability - ZenML MLOps Database"
  ogDescription: "Airbnb evolved its Automation Platform from version 1, which supported conversational AI through static predefined workflows, to version 2, which powers LLM-based applications at scale. The v1 platform suffered from inflexibility and poor scalability, requiring manual workflow creation for every scenario. Version 2 introduces a hybrid architecture that combines LLM-powered conversational capabilities with traditional workflows, implementing Chain of Thought reasoning, sophisticated context management, and a guardrails framework. This platform enables customer support agents to work more efficiently by providing natural language interactions while maintaining production-level requirements around latency, accuracy, and safety. The architecture supports developers through integrated tooling including playgrounds, LLM-oriented observability, and managed execution environments."
mlops:
  source: "sqlite"
  entryId: 213
  sourceUrl: "https://medium.com/airbnb-engineering/automation-platform-v2-improving-conversational-ai-at-airbnb-d86c9386e0cb"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.618225"
  lastUpdated: "2026-04-14T19:56:02.735376"
---

## Problem Context

Airbnb's Automation Platform v1 was designed to support conversational AI products like chatbots through predefined, step-by-step workflows that could be designed and managed by product engineering and business teams. While this approach worked for traditional conversational systems, it encountered fundamental limitations that became increasingly problematic as AI capabilities advanced.

The platform faced two critical challenges that motivated the rebuild to version 2. First, the system lacked flexibility because AI products were forced to follow predefined and usually rigid processes. This meant that conversational experiences couldn't adapt dynamically to user needs or handle unexpected conversational flows. Second, the platform struggled with scalability—not in terms of computational resources, but in terms of development velocity and use case coverage. Product creators needed to manually create workflows and tasks for every possible scenario, then repeat this labor-intensive and error-prone process for any new use case that emerged. This manual approach created bottlenecks in deployment and made it difficult to expand conversational AI across Airbnb's diverse customer support needs.

The emergence of large language models presented both an opportunity and a challenge. Early experiments demonstrated that LLM-powered conversations could provide more natural and intelligent conversational experiences than human-designed workflows. Customers could engage in natural dialogue, ask open-ended questions, and explain issues in detail, while the LLM could accurately interpret queries and capture nuanced information from ongoing conversations. However, LLM applications were still relatively new and faced production readiness concerns including latency issues and hallucinations. Airbnb recognized that fully relying on LLMs for large-scale, diverse experiences serving millions of customers was premature, especially for sensitive workflows like claims processing that required strict data validation. The strategic decision was to build a hybrid platform that could leverage benefits from both traditional workflow-based approaches and LLM-powered interactions.

## Architecture & Design

Automation Platform v2 introduces a layered architecture designed specifically to support LLM applications while maintaining compatibility with traditional workflow-based systems. The platform orchestrates the complete lifecycle of LLM interactions, from receiving user inquiries through context assembly, prompt generation, LLM inference, tool execution, and response delivery.

The high-level request flow demonstrates how the system processes a customer inquiry. When a user asks a question like "where is my next reservation?", the platform first collects relevant contextual information including previous chat history, user ID, and user role. It then loads and assembles the prompt using the inquiry and collected context before sending it to the LLM. The LLM response may request tool execution, such as making a service call to fetch the user's most recent reservation. The platform handles this tool execution, saves the response into the current context, and sends the updated context back to the LLM. The second LLM response then provides a complete sentence describing the reservation location. Finally, the platform returns the LLM response and records the conversation round for future reference.

The architecture consists of several major component groups. The LLM workflow system implements reasoning patterns, with Chain of Thought as the primary framework. Context Management handles the assembly and retrieval of all information needed for effective LLM decision-making. The Guardrails Framework provides safety mechanisms to monitor communications and ensure helpful, relevant, and ethical outputs. Tool Management handles registration, publishing, execution, and observability of the actions available to the LLM. Developer tooling includes a playground feature that bridges the gap between development and production tech stacks, allowing prompt writers to iterate freely. LLM-oriented observability provides detailed insights into each interaction including latency and token usage.

## Technical Implementation

The Chain of Thought workflow represents the core implementation of LLM reasoning on the platform. This approach uses the LLM as a reasoning engine to determine which tools to use and in what order. Tools serve as the LLM's interface to the real world, enabling it to check reservation status, verify listing availability, or perform other concrete actions. The platform cleverly reuses actions and workflows from Automation Platform v1 as tools in the Chain of Thought framework, leveraging their unified interface and managed execution environment.

The Chain of Thought workflow follows a specific execution pattern. It begins by preparing context for the LLM, including the prompt, contextual data, and historical conversations. It then enters a reasoning loop that asks the LLM for reasoning, executes any LLM-requested tools, and processes the tool outcomes. This loop continues until a final result is generated. Three high-level components power this workflow: the CoT IO handler assembles prompts, prepares contextual data, collects user input, and performs general data processing before sending requests to the LLM; the Tool Manager prepares tool payloads with LLM input and output, manages tool execution, and offers quality-of-life features like retry logic and rate limiting; and the LLM Adapter allows developers to add customized logic facilitating integration with different types of LLMs.

Context Management ensures the LLM has access to all necessary and relevant information for optimal decision-making. This includes historical interactions with the LLM, the intent of customer support inquiries, current trip information, and more. For specialized use cases like offline evaluation, the system supports point-in-time data retrieval through configuration. Given the large volume of available contextual information, developers can either statically declare needed context (such as customer name) or specify dynamic context retrievers (such as relevant help articles related to the customer's questions). The Context Management architecture includes two major components: Context Loaders that connect to different sources and fetch relevant context based on customizable fetching logic, and the Runtime Context Manager that maintains runtime context, processes context for each LLM call, and interacts with context storage systems.

The Guardrails Framework addresses the inherent risks of LLM outputs including hallucinations and jailbreak attempts. This safeguarding mechanism monitors all communications with the LLM to ensure outputs are helpful, relevant, and ethical. The architecture enables engineers from different teams to create reusable guardrails that execute in parallel during runtime and leverage different downstream tech stacks. For example, content moderation guardrails call various LLMs to detect violations in communication content, while tool guardrails use rules to prevent problematic executions such as updating listings with invalid configurations.

## Scale & Performance

While the blog post focuses primarily on architectural patterns rather than detailed performance metrics, it does provide context about the scale of operations. The platform is designed to serve millions of Airbnb customers across diverse customer support scenarios. The system must handle both high-volume conversational interactions and sensitive operations like claims processing that require strict validation.

The architecture emphasizes production-level requirements including latency optimization and accuracy guarantees. The decision to maintain a hybrid approach between LLM-powered conversations and traditional workflows reflects careful consideration of performance trade-offs. For scenarios requiring rapid, deterministic responses or strict data validation, traditional workflows continue to provide superior guarantees compared to pure LLM approaches.

The Tool Manager incorporates quality-of-life features including retry logic and rate limiting, suggesting the platform handles significant load and must manage external API interactions carefully. The parallel execution capability in the Guardrails Framework indicates the system is optimized to minimize latency overhead from safety checks.

## Trade-offs & Lessons

Airbnb's approach to LLM application development demonstrates sophisticated thinking about the maturity curve of generative AI technologies. Rather than rushing to replace all conversational systems with pure LLM implementations, the team built a platform that strategically combines LLM capabilities with traditional workflow-based approaches. This hybrid strategy acknowledges that while LLMs excel at natural language understanding and flexible conversation, they aren't yet suitable for all production scenarios, particularly those involving sensitive data or requiring strict validation.

The decision to reuse actions and workflows from Automation Platform v1 as tools in the Chain of Thought framework shows excellent architectural judgment. This approach provided immediate value by giving the LLM access to a rich set of capabilities without requiring engineers to rebuild functionality. The unified interface and managed execution environment from v1 translated directly into the tool paradigm, accelerating development while maintaining operational safety.

The platform's emphasis on developer experience through tooling like playgrounds and detailed observability reflects lessons learned about the iterative nature of prompt engineering and LLM application development. By providing environments where prompt writers can experiment freely and detailed visibility into production behavior, the platform reduces the friction in moving from experimentation to deployment.

The Guardrails Framework architecture, which allows different teams to create reusable guardrails executing in parallel with different tech stacks, demonstrates pragmatic engineering. Rather than forcing all safety checks through a single mechanism, the platform allows guardrails to be implemented using the most appropriate technology—whether that's calling other LLMs for content moderation or using rule-based systems for tool validation.

The Context Management system's support for both static declaration and dynamic retrieval shows careful attention to different use cases. Statically declared context provides predictability and performance, while dynamic context retrieval enables more sophisticated applications that can adapt to user queries. Supporting point-in-time data retrieval for offline evaluation demonstrates the platform was built with the full ML lifecycle in mind, not just production serving.

Looking forward, Airbnb acknowledges that LLM application architecture remains a rapidly evolving domain. The team plans to continue evolving with transformative technologies, exploring additional AI agent frameworks beyond Chain of Thought, expanding tool capabilities, and investigating LLM application simulation. This commitment to ongoing evolution, rather than treating the v2 platform as a final state, reflects realistic expectations about the pace of innovation in this space.

The blog post demonstrates that successful LLM platform engineering requires balancing innovation with pragmatism. The platform needed to enable cutting-edge LLM applications while maintaining production reliability, provide flexibility while ensuring safety, and support rapid experimentation while offering production-grade observability. Airbnb's Automation Platform v2 achieves this balance through thoughtful architecture that treats LLMs as powerful but not infallible components in a larger system designed for customer support excellence.
