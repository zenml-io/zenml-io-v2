---
title: "GenAI Agent for Partner-Guest Messaging in Travel Accommodation"
slug: "genai-agent-for-partner-guest-messaging-in-travel-accommodation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69286afb9f12e4c58db4312f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-01T11:07:45.646Z"
  lastUpdated: "2025-11-27T15:55:05.081Z"
  createdOn: "2025-11-27T15:15:07.068Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "error-handling"
  - "evals"
  - "kubernetes"
  - "fastapi"
  - "langchain"
  - "postgresql"
  - "monitoring"
  - "microservices"
  - "api-gateway"
  - "databases"
  - "guardrails"
  - "security"
  - "openai"
industryTags: "e-commerce"
company: "Booking"
summary: "Booking.com developed a GenAI agent to assist accommodation partners in responding to guest inquiries more efficiently. The problem addressed was the manual effort required by partners to search for and select response templates, particularly during busy periods, which could lead to delayed responses and potential booking cancellations. The solution is a tool-calling agent built with LangGraph and GPT-4 Mini that autonomously decides whether to suggest a predefined template, generate a custom response, or refrain from answering. The system retrieves relevant templates using semantic search with embeddings stored in Weaviate, accesses property and reservation data via GraphQL, and implements guardrails for PII redaction and topic filtering. Deployed as a microservice on Kubernetes with FastAPI, the agent processes tens of thousands of daily messages and achieved a 70% increase in user satisfaction in live pilots, along with reduced follow-up messages and faster response times."
link: "https://booking.ai/building-a-genai-agent-for-partner-guest-messaging-f54afb72e6cf"
year: 2025
seo:
  title: "Booking: GenAI Agent for Partner-Guest Messaging in Travel Accommodation - ZenML LLMOps Database"
  description: "Booking.com developed a GenAI agent to assist accommodation partners in responding to guest inquiries more efficiently. The problem addressed was the manual effort required by partners to search for and select response templates, particularly during busy periods, which could lead to delayed responses and potential booking cancellations. The solution is a tool-calling agent built with LangGraph and GPT-4 Mini that autonomously decides whether to suggest a predefined template, generate a custom response, or refrain from answering. The system retrieves relevant templates using semantic search with embeddings stored in Weaviate, accesses property and reservation data via GraphQL, and implements guardrails for PII redaction and topic filtering. Deployed as a microservice on Kubernetes with FastAPI, the agent processes tens of thousands of daily messages and achieved a 70% increase in user satisfaction in live pilots, along with reduced follow-up messages and faster response times."
  canonical: "https://www.zenml.io/llmops-database/genai-agent-for-partner-guest-messaging-in-travel-accommodation"
  ogTitle: "Booking: GenAI Agent for Partner-Guest Messaging in Travel Accommodation - ZenML LLMOps Database"
  ogDescription: "Booking.com developed a GenAI agent to assist accommodation partners in responding to guest inquiries more efficiently. The problem addressed was the manual effort required by partners to search for and select response templates, particularly during busy periods, which could lead to delayed responses and potential booking cancellations. The solution is a tool-calling agent built with LangGraph and GPT-4 Mini that autonomously decides whether to suggest a predefined template, generate a custom response, or refrain from answering. The system retrieves relevant templates using semantic search with embeddings stored in Weaviate, accesses property and reservation data via GraphQL, and implements guardrails for PII redaction and topic filtering. Deployed as a microservice on Kubernetes with FastAPI, the agent processes tens of thousands of daily messages and achieved a 70% increase in user satisfaction in live pilots, along with reduced follow-up messages and faster response times."
---

## Overview

Booking.com, one of the world's largest online travel accommodation platforms, implemented a GenAI agent to streamline communication between accommodation partners (hotels, rentals, etc.) and guests. The use case centers on the approximately 250,000 daily partner-guest message exchanges that occur on the platform. Prior to this solution, partners manually managed guest inquiries using predefined response templates, which required searching for and selecting appropriate templates. This manual process became particularly challenging during high-volume periods, leading to delayed responses that could result in booking cancellations and lost revenue for partners.

The team built an autonomous GenAI agent that assists partners by automatically analyzing guest inquiries and taking one of three actions: surfacing an existing partner-created template, generating a custom free-text response when no template exists but sufficient data is available, or refraining from answering when information is insufficient or the topic is restricted (such as refund requests). This human-in-the-loop approach maintains accuracy and trust while significantly accelerating response times.

## Technical Architecture

The solution is built as a microservice architecture deployed on Kubernetes, leveraging Python for its rich ecosystem of AI libraries and frameworks. At the core of the agent is LangGraph, an open-source agentic framework that enables autonomous reasoning about tasks and tool selection. The system uses OpenAI's GPT-4 Mini as the underlying language model, accessed through Booking.com's internal LLM gateway that provides additional safety layers including prompt-injection detection.

The agent follows a carefully orchestrated workflow. When a guest message arrives, the system first applies guardrail mechanisms to protect both partners and guests. This includes redacting personally identifiable information (PII) from incoming messages and checking whether the inquiry topic belongs to a "do not answer" category. If the message passes these initial checks, the LLM determines which tools are relevant for addressing the query.

The architecture employs a pre-selection strategy where tools are identified based on the query context before execution. Once relevant tools are identified, they run concurrently to minimize latency, gathering their outputs efficiently. The LLM then performs a reasoning step over the collected results to generate the final response. This design avoids unnecessary tool calls and keeps token usage and operational costs efficient—a critical consideration for production LLM systems at scale.

The microservice itself is built with FastAPI, providing a modern, high-performance web framework for handling requests. All tools used by the agent are hosted on a central Model Context Protocol (MCP) server, also running on Kubernetes, which centralizes tool management and enables consistent access patterns.

## Tool Ecosystem

The agent has access to three primary tools, each serving a specific purpose in the response generation pipeline:

**Response Template Retrieval Tool**: This tool performs semantic search over partner-created response templates to find the most relevant matches for a guest's inquiry. The implementation uses embedding-based similarity search, converting guest messages into vector representations and performing k-nearest-neighbors (kNN) search to retrieve the eight closest template matches. The system applies a similarity threshold to filter out weak matches, ensuring only relevant templates are considered. After evaluating several embedding models, the team selected MiniLM based on its superior recall@k performance on real-world data. The embeddings are stored and indexed in Weaviate, a vector database that provides fast semantic search capabilities. Importantly, template updates are streamed in real-time via Kafka, ensuring the index always reflects the latest partner content without requiring batch updates or manual refreshes.

**Property Details Tool**: This tool retrieves property-specific information by translating the agent's information needs into GraphQL queries against Booking.com's backend systems. This allows the agent to access details like amenities, policies, location information, and other property characteristics that might be relevant for answering guest questions.

**Reservation Details Tool**: This tool provides reservation-level context including room type, check-in and check-out dates, number of travelers, and other booking-specific information. This context is crucial for generating accurate, personalized responses that address the specific circumstances of each guest's reservation.

The combination of these tools enables the agent to construct responses that are both contextually aware and grounded in factual data from Booking.com's systems, reducing the risk of hallucination or providing outdated information.

## Evaluation Strategy

Booking.com implemented a comprehensive, multi-layered evaluation approach that combines manual review, automated assessment, and operational monitoring. This rigorous evaluation methodology reflects the high stakes of customer-facing AI systems where inaccurate or inappropriate responses could damage trust and business outcomes.

The team constructed a representative dataset of guest messages paired with actual partner replies and relevant contextual data (property details, reservation information, etc.). This dataset captured both template-based and free-text responses, reflecting the diversity of real-world partner-guest communication patterns. Using the SuperAnnotate platform, they conducted multiple rounds of manual annotation to assess the quality of AI-generated responses. Crucially, they performed systematic error analysis to identify recurring failure patterns such as missing context, overly generic phrasing, or factual inaccuracies. This error analysis informed targeted improvements to prompts, tool selection logic, and the overall agent architecture.

To scale evaluation across rapid development cycles, the team introduced an "LLM-as-a-Judge" approach. This automated evaluation system enabled comparison of different agent architectures, LLM backends, and prompt variations without requiring manual review of every iteration. This accelerated experimentation and allowed for continuous assessment of the impact of prompt modifications—a key capability for iterating on LLM-based systems.

The evaluation dataset also proved valuable for benchmarking embedding models for retrieval quality. The comparison between MiniLM and E5-Small revealed that MiniLM offered the most balanced performance and efficiency for English content, making it the default choice. However, E5-Small demonstrated superior performance on non-English content, leading to a multilingual optimization strategy that combines language detection with embedding model selection to maintain retrieval quality across different locales. This nuanced approach to model selection reflects the global nature of Booking.com's operations and the importance of multilingual support.

For production monitoring, the team integrated Arize, an AI observability platform that enables inspection of sampled traces, monitoring of agent behavior, and early identification of potential issues. This operational visibility is essential for maintaining system reliability and quickly detecting degradation in response quality. Additionally, the system collects in-tool user feedback and leverages controlled experiments to validate model performance in real production conditions, ensuring that offline evaluation metrics translate to actual business impact.

## Deployment and Scale

The system runs as a microservice on Kubernetes, providing the scalability and reliability required for production AI systems. The Kubernetes deployment enables seamless scaling to handle varying load patterns, important given the cyclical nature of travel bookings and the corresponding variations in messaging volume. The FastAPI framework provides high-performance request handling while the internal LLM gateway adds critical safety mechanisms before any data reaches the model.

Currently, the agent handles tens of thousands of guest messages daily out of the approximately 250,000 total daily partner-guest exchanges on the platform. For supported topics, the system can suggest or send a reply within minutes, a significant improvement over manual template selection. The human-in-the-loop design means that partners review and approve suggested responses, maintaining quality control while benefiting from the speed of automated suggestion generation.

## Results and Impact

In live pilot deployments, the agent achieved a 70% increase in user satisfaction compared to the previous manual process. The system also reduced follow-up messages and accelerated response times, indicating that the quality of initial responses improved such that guests required less clarification. Partners reported spending less time on repetitive questions and noted more consistent communication quality across their guest interactions.

Critically, the system includes confidence-based decision-making: when confidence is low or a message falls outside policy boundaries, the agent refrains from suggesting a response. This design choice prioritizes accuracy and trust over automation rate, reflecting a mature approach to production LLM deployment where not all queries should be automated.

## Challenges and Learnings

The team identified several key challenges and learnings through the development process. One primary challenge was balancing speed, cost, and robustness in the agentic system. Complex multi-step reasoning with LLMs can quickly become expensive in both latency and compute costs. The team emphasized that efficiency must be considered from the outset of system design, not as an afterthought. Their approach of pre-selecting tools based on query context before execution, and running tools concurrently where possible, demonstrates architectural choices made specifically to optimize this balance.

The data quality challenges were also significant. Inconsistent data quality across different properties, gaps in response template coverage, and the need to support many languages all required careful handling. The real-time template synchronization via Kafka and the multilingual embedding model strategy were both responses to these data challenges.

The team also recognized that many guest messages are actually requests for action rather than questions—things like modifying bookings or arranging special services. Handling these well will require deeper contextual understanding and longer-term partner memory, suggesting a direction for future development where the agent moves from being primarily a smart responder to a more capable operational assistant.

## Future Directions

Looking ahead, Booking.com is exploring personalization capabilities to adapt the agent's tone and style to match each individual partner's unique voice. The goal extends beyond faster replies to communication that feels effortless, natural, and aligned with how partners already engage with their guests. This suggests future work on partner-specific fine-tuning or more sophisticated prompt engineering that captures individual communication patterns.

The acknowledgment that many messages are action requests points to a potential evolution toward more transactional capabilities, where the agent could potentially initiate booking modifications or service arrangements rather than just providing information. This would represent a significant expansion of the agent's scope and would likely require additional safety mechanisms and approval workflows.

## Critical Assessment

This case study presents a thoughtful, well-architected approach to production LLM deployment that demonstrates several best practices. The human-in-the-loop design appropriately balances automation benefits with quality control, the multi-layered evaluation strategy combines offline and online metrics, and the architectural choices around tool pre-selection and concurrent execution reflect cost-consciousness often missing from early LLM deployments.

However, the case study is notably promotional and lacks certain details that would provide a fuller picture. Specific metrics like latency, cost per interaction, false positive/negative rates for the guardrails, or template retrieval precision/recall are not provided. The 70% user satisfaction improvement is mentioned but without baseline figures or details about sample sizes and statistical significance. The claim about "tens of thousands of messages daily" out of 250,000 total suggests the system handles perhaps 10-20% of overall volume, which, while substantial, indicates there's still significant room for coverage expansion.

The reliance on GPT-4 Mini through OpenAI's API represents a dependency on external providers and associated costs, though the internal LLM gateway provides some abstraction. The multilingual challenge is acknowledged but the current solution (language-based embedding model selection) is relatively simple and may not fully address the complexities of truly global operations across many languages with varying data quality.

The evaluation approach using LLM-as-a-Judge is increasingly common but can have its own biases and limitations, particularly if the judge model has similar biases to the production model. The case study doesn't discuss how they validate the judge's assessments or handle disagreements between human and automated evaluations.

Overall, this represents a mature, production-grade LLM deployment with thoughtful engineering and evaluation practices. The emphasis on efficiency, safety, and human oversight demonstrates lessons learned from earlier, more naive approaches to LLM productionization. The roadmap toward greater personalization and transactional capabilities suggests continued investment in this technology.