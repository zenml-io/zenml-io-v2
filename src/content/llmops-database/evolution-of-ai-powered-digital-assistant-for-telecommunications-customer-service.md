---
title: "Evolution of AI-Powered Digital Assistant for Telecommunications Customer Service"
slug: "evolution-of-ai-powered-digital-assistant-for-telecommunications-customer-service"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "multi-agent-systems"
  - "agent-based"
  - "error-handling"
  - "human-in-the-loop"
  - "guardrails"
industryTags: "telecommunications"
company: "BT"
summary: "BT Group's consumer division developed Amy, an AI-powered digital assistant designed to handle customer service across broadband, mobile, and TV products. Starting from a basic routing chatbot in 2021, the team evolved the system through multiple generations, partnering with Sprinklr in 2024 after ChatGPT's launch reshaped their vendor assessment. The implementation combines traditional NLU-based intent recognition with generative AI capabilities including semantic routing and grounded knowledge retrieval, while maintaining strict controls around authentication, guardrails, and preventing hallucination. The team is now building toward \"agentic AI\" with an agent-based architecture that provides tools and skills rather than rigid conversational flows, aiming to shift customer interactions from the current 1 million weekly voice calls toward digital channels while also providing AI-powered assistance to human customer service agents."
link: "https://www.youtube.com/watch?v=4orLY_8QLAg"
year: 2026
seo:
  title: "BT: Evolution of AI-Powered Digital Assistant for Telecommunications Customer Service - ZenML LLMOps Database"
  description: "BT Group's consumer division developed Amy, an AI-powered digital assistant designed to handle customer service across broadband, mobile, and TV products. Starting from a basic routing chatbot in 2021, the team evolved the system through multiple generations, partnering with Sprinklr in 2024 after ChatGPT's launch reshaped their vendor assessment. The implementation combines traditional NLU-based intent recognition with generative AI capabilities including semantic routing and grounded knowledge retrieval, while maintaining strict controls around authentication, guardrails, and preventing hallucination. The team is now building toward \"agentic AI\" with an agent-based architecture that provides tools and skills rather than rigid conversational flows, aiming to shift customer interactions from the current 1 million weekly voice calls toward digital channels while also providing AI-powered assistance to human customer service agents."
  canonical: "https://www.zenml.io/llmops-database/evolution-of-ai-powered-digital-assistant-for-telecommunications-customer-service"
  ogTitle: "BT: Evolution of AI-Powered Digital Assistant for Telecommunications Customer Service - ZenML LLMOps Database"
  ogDescription: "BT Group's consumer division developed Amy, an AI-powered digital assistant designed to handle customer service across broadband, mobile, and TV products. Starting from a basic routing chatbot in 2021, the team evolved the system through multiple generations, partnering with Sprinklr in 2024 after ChatGPT's launch reshaped their vendor assessment. The implementation combines traditional NLU-based intent recognition with generative AI capabilities including semantic routing and grounded knowledge retrieval, while maintaining strict controls around authentication, guardrails, and preventing hallucination. The team is now building toward \"agentic AI\" with an agent-based architecture that provides tools and skills rather than rigid conversational flows, aiming to shift customer interactions from the current 1 million weekly voice calls toward digital channels while also providing AI-powered assistance to human customer service agents."
notion:
  pageId: "3b8f8dff-2538-80e1-8cf4-d6ec0bc5a910"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:15:00.000Z"
  lastEditedTime: "2026-08-10T15:15:00.000Z"
  publishedAt: "2026-08-10T15:22:45Z"
---

## Overview

BT Group's consumer division, which encompasses the EE brand, has undertaken a multi-year journey to build Amy, an AI-powered digital assistant serving customers across broadband, mobile, and TV products. The engineering team, led by Kenny Dilly who has nine years of chatbot experience starting with RBS's Cora assistant, set an ambitious vision: to create "the most personal and intelligent digital assistant in the world." This case study provides a detailed look at how a large telecommunications provider has evolved from basic rule-based chatbots through traditional NLU systems to contemporary generative AI implementations, while navigating the operational challenges of deploying LLMs in a highly regulated, high-stakes customer service environment.

The evolution spans from 2021 when Amy first launched through 2024 when the team partnered with Sprinklr as their core platform, and into ongoing work developing agentic AI capabilities. The presentation offers valuable insights into the practical challenges of LLMOps in enterprise settings, including the critical importance of authentication, guardrails, grounding, and controlled experimentation when deploying generative AI at scale.

## Initial Implementation and Technical Foundations

The first generation of Amy launched in 2021 represented a relatively basic implementation built on existing EE technology. The system functioned primarily as a routing platform designed to direct customers to human agents as quickly as possible while gathering context about the contact reason. The team characterized this early version as having "limited intelligence" and "limited automation," essentially serving as an enhanced interactive voice response system rather than a truly intelligent assistant.

This initial platform was built on legacy software that the team determined would not support their long-term vision. The system relied on traditional intent classification approaches, mapping customer utterances to predefined intents through natural language understanding models that required extensive training on example phrases. The conversational flows were highly linear and deterministic, presenting customers with fixed option sets and guiding them through rigid decision trees rather than enabling natural conversation.

A critical foundational element that has persisted through all iterations is the emphasis on authentication and authorization. The team recognized early that personalization depends fundamentally on knowing who you're talking to and being able to securely access that customer's information. This authentication layer became the foundation for all subsequent AI capabilities, enabling the system to provide personalized responses and take actions on behalf of verified customers.

## Vendor Selection and Platform Migration

The team initiated a request for proposal process in 2023 to identify a new platform partner that could support their vision. However, the landscape shifted dramatically when ChatGPT launched in November 2022, fundamentally changing the scope of their vendor assessment. The emergence of large language models and generative AI capabilities meant that the team needed to completely reevaluate what was possible and what criteria should guide their platform selection.

After evaluating multiple software companies through 2023, the team selected Sprinklr as their technology partner in 2024. This partnership provided several key capabilities that represented a step change from their previous platform. The Sprinklr integration enabled richer media content, significantly improved natural language understanding that the team described as a "step change in understanding," and the ability to extend beyond pure service journeys into sales support and order fulfillment.

The platform migration also enabled the team to layer generative AI capabilities on top of their existing traditional AI foundation rather than completely replacing their proven intent-based systems. This hybrid approach represents a pragmatic LLMOps strategy that leverages the deterministic reliability of traditional NLU where appropriate while selectively applying generative AI where its capabilities offer clear advantages.

## Hybrid Architecture: Traditional AI and Generative AI

The production architecture combines traditional AI and generative AI in a complementary fashion. The traditional AI layer uses natural language understanding to convert customer utterances into intents, enabling the system to handle well-defined use cases through trained models. These flows are linear and deterministic, with accuracy depending on the quality of training phrases and the ongoing refinement of the brain or intent classification model.

The generative AI layer enhances this foundation in specific, controlled ways. One key application is semantic routing, where LLMs provide a fallback understanding mechanism when the trained NLU models fail to classify a customer query with sufficient confidence. Rather than immediately escalating to a human agent, the system can leverage an LLM's broader language understanding to interpret the customer's intent and route appropriately.

Another critical generative AI application is what the team calls "Amy answers," which implements a retrieval-augmented generation pattern. When the system hasn't been explicitly trained to handle a particular query, it can perform a search over grounded content sources—specifically EE's existing knowledge base and support documentation—and use an LLM to generate a response based strictly on retrieved information. This grounding strategy is central to the team's approach to preventing hallucination.

## LLMOps Challenges and Control Mechanisms

The team articulates several significant challenges specific to operating generative AI in a large enterprise telecommunications context. The fundamental issue they identify is the non-deterministic nature of LLM outputs, which creates risks in customer-facing applications where consistency, accuracy, and appropriateness are critical. This has led them to implement multiple layers of controls and adopt a cautious, experimental approach to deployment.

Authentication requirements are particularly strict: the team only allows generative AI features for authenticated customers whose identity has been verified. They do not expose these capabilities to unauthenticated users or individuals who aren't existing customers. This dramatically reduces the attack surface and limits the potential for abuse while also enabling personalization based on verified customer data.

Guardrails represent another critical control layer. The team implements both input and output guardrails to monitor for offensive content, inappropriate requests, or problematic generated responses. These guardrails function as safety filters that can block requests or prevent responses from being shown to customers when they violate defined policies or quality standards.

The grounding strategy is perhaps the most important technical control. The team explicitly grounds all generative AI responses in EE's existing content and knowledge base, preventing the models from fabricating information or attempting to answer questions outside their domain of expertise. They characterize this as ensuring "the data is fully grounded in our content" and preventing the models from "hallucinating and trying to find answers to the solutions it doesn't know the answers to." This represents a recognition that unrestricted LLM generation is inappropriate for customer service contexts where accuracy and trustworthiness are paramount.

The team also defines explicit use case boundaries, specifically avoiding generative AI in high-risk scenarios such as bereavement cases. This risk-based approach to deployment recognizes that not all customer service interactions are appropriate for AI handling, particularly those involving sensitive emotional contexts or complex edge cases where empathy and human judgment are essential.

Testing and experimentation are ongoing operational requirements given the non-deterministic nature of the technology. The team emphasizes the need for "continual testing" to validate that guardrails are functioning properly and that the system is producing appropriate outputs. This suggests an LLMOps practice that includes regular evaluation, monitoring of production outputs, and iterative refinement of prompts, retrieval mechanisms, and guardrail configurations.

## Agentic AI Architecture

The next evolution the team is pursuing represents a shift from traditional chatbot architectures to what they term "agentic AI." They define this as "autonomous artificial intelligence systems designed to achieve specific goals with minimal human supervision," essentially enabling "machines talking to machines." The goal is to move away from rigid, flow-driven conversation designs toward more flexible, task-oriented agents that can leverage tools and skills to accomplish customer objectives.

The team references Model Context Protocol as representing the future of AI integration, likening it to "USB-C for AI." However, they express significant security concerns about MCP for large organizations like BT, characterizing it as "giving the bank robbers the keys to the vault" due to the broad access it would grant. Instead, they're building agents within their own framework that provides more controlled access to systems and data.

This agent-based architecture conceptually resembles "training an employee" rather than building a chatbot. Each agent is given a role definition describing its purpose as a virtual assistant, a description of its capabilities, and access to specific tools and knowledge sources. For example, an agent might be equipped with the ability to query billing APIs to compare month-over-month bill differences, a common customer question. Different agents can be configured with different personas appropriate for different customer segments—for instance, an EE-branded bot versus a BT-branded bot might have different tones and emphases while sharing underlying capabilities.

The agent architecture provides access to several categories of tools. Internal APIs enable agents to retrieve personalized customer data and perform account queries, always authenticated to ensure security. Robotic process automation systems allow agents to execute tasks on behalf of customers with minimal supervision when appropriate. Website search capabilities enable information retrieval. Specialized LLMs provide domain-specific understanding or generation capabilities. Guided flows maintain structured conversation patterns where appropriate. Knowledge base articles serve as grounded information sources. Product catalogs enable sales and recommendation capabilities for mobile devices and other offerings.

This multi-tool approach represents a sophisticated LLMOps architecture that goes beyond simple question-answering to enable complex task completion. The agent identifies the customer's topic or goal, selects the most appropriate tools and tasks from its available repertoire, orchestrates API calls and searches as needed, and synthesizes a response or completes an action. This orchestration layer is central to making agentic AI functional in production environments.

## Channel Expansion and Voice Integration

A significant strategic focus for the team is expanding beyond text-based digital channels into voice. Their data shows that voice remains the dominant customer contact channel, handling approximately 1 million conversations per week, while messaging accounts for only about 150,000 weekly contacts. This represents a massive opportunity to shift customers toward digital experiences that can leverage AI automation more effectively than traditional phone-based customer service.

The team has developed a digital IVR experience that parallels their traditional voice IVR but provides a visual, app-based interface. The initial launch of this digital IVR was limited in capability, functioning primarily as a routing solution similar to the early versions of Amy. They're now rebuilding this digital IVR on the same foundations as the enhanced Amy, providing access to personal information, skills, and tools that enable both self-service and assisted service in the customer's channel of choice.

This omnichannel strategy recognizes that different customers have different preferences and that the goal isn't to force everyone into a single channel but rather to provide high-quality AI-enhanced experiences across multiple touchpoints. The underlying agent architecture and tools can support both text-based chat in apps and web interfaces as well as voice interactions, with the same personalization, authentication, and capability set available regardless of channel.

## AI for Customer Service Agents

Beyond customer-facing AI, the team is also building AI tools to enhance the effectiveness of human customer service agents or guides. These include message summarization capabilities that help guides quickly understand the context of a customer interaction, and guided prompts that suggest effective responses or next actions. This represents a recognition that AI doesn't have to replace human agents entirely but can instead augment their capabilities, enabling them to handle interactions more efficiently and effectively.

This dual focus on both customer-facing automation and agent assistance tools reflects a mature LLMOps strategy that seeks efficiency gains across the entire customer service operation. By improving guide productivity and effectiveness, the organization can handle more volume with existing staff while also improving customer experience through faster, more informed responses.

## Lessons and Practical Advice

The team offers several key takeaways based on their multi-year journey. First, they emphasize that modern AI systems are more than chatbots—they're digital assistants that should be considered a distinct digital channel alongside web and mobile apps. This framing elevates the strategic importance and sets appropriate expectations for capabilities and investment.

Second, they caution against waiting for perfect technology, noting that "the tech will never be perfect" and is "continually evolving." Their approach has been to adopt what's available at any given point in time and build with it, learning and iterating as the technology improves. This pragmatic stance is particularly relevant for LLMOps given the rapid pace of foundation model development and the emergence of new techniques and tools.

Third, they explicitly state that "AI won't solve all your problems, but it can definitely help." This balanced perspective is notable given that the presentation is about their AI initiatives. They acknowledge limitations and encourage realistic expectations while affirming that there are genuine efficiency gains and value returns from thoughtful AI adoption. This suggests they've encountered challenges and limitations firsthand and want others to approach LLM deployments with appropriate caution and incremental strategies.

## Critical Assessment

While the presentation provides valuable insights into BT's LLMOps journey, several aspects warrant balanced consideration. The team's emphasis on controls, authentication, and guardrails is appropriate and well-reasoned, but the presentation doesn't provide quantitative metrics on actual customer satisfaction, containment rates, or cost savings achieved through these AI implementations. Claims about creating "the most personal and intelligent digital assistant in the world" represent aspirational vision rather than demonstrated achievement, and the competitive landscape includes many other organizations pursuing similar capabilities.

The security concerns raised about Model Context Protocol, while understandable from a risk management perspective, may also reflect organizational conservatism that could slow adoption of emerging standards and interoperability frameworks. Building entirely proprietary agent frameworks provides control but potentially at the cost of missing out on ecosystem benefits and shared learnings from standardized approaches.

The hybrid traditional AI and generative AI architecture is pragmatic and appropriate, but it also adds complexity to the system that must be managed over time. Maintaining both intent-based NLU models and LLM-based understanding requires different skill sets, different training and evaluation processes, and careful orchestration to determine which approach handles which queries. The operational overhead of this dual approach should be weighed against the benefits.

The presentation also doesn't deeply address some common LLMOps challenges such as prompt versioning, model selection and updating strategies, latency and cost optimization for LLM calls, or specific evaluation frameworks used to assess quality. The acknowledgment of "continual testing" is appropriate but leaves open questions about what specific metrics and methodologies guide their evaluation of generative AI components.

Overall, BT's approach appears measured and appropriate for a large enterprise in a regulated industry where customer trust and data security are paramount. The emphasis on grounding, authentication, and selective deployment represents responsible LLMOps practices, though it may also mean they progress more slowly than organizations willing to take greater risks. The evolution from basic routing to agentic AI over a multi-year period reflects the realistic timelines required to build production-grade LLM systems in complex enterprise environments.
