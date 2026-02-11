---
title: "Multi-Agent Web Research System with Dynamic Task Generation"
slug: "multi-agent-web-research-system-with-dynamic-task-generation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "687629cb914cef42c3e16cef"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:13:42.041Z"
  createdOn: "2025-07-15T10:13:31.620Z"
llmopsTags:
  - "question-answering"
  - "data-analysis"
  - "unstructured-data"
  - "structured-output"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "token-optimization"
  - "semantic-search"
  - "cost-optimization"
  - "langchain"
  - "monitoring"
  - "api-gateway"
  - "fastapi"
  - "open-source"
  - "documentation"
  - "anthropic"
industryTags: "tech"
company: "Exa"
summary: "Exa evolved from providing a search API to building a production-ready multi-agent web research system that processes hundreds of research queries daily, delivering structured results in 15 seconds to 3 minutes. Using LangGraph for orchestration and LangSmith for observability, their system employs a three-component architecture with a planner that dynamically generates parallel tasks, independent research units with specialized tools, and an observer maintaining full context across all components. The system intelligently balances between search snippets and full content retrieval to optimize token usage while maintaining research quality, ultimately providing structured JSON outputs specifically designed for API consumption."
link: "https://blog.langchain.com/exa/"
year: 2025
seo:
  title: "Exa: Multi-Agent Web Research System with Dynamic Task Generation - ZenML LLMOps Database"
  description: "Exa evolved from providing a search API to building a production-ready multi-agent web research system that processes hundreds of research queries daily, delivering structured results in 15 seconds to 3 minutes. Using LangGraph for orchestration and LangSmith for observability, their system employs a three-component architecture with a planner that dynamically generates parallel tasks, independent research units with specialized tools, and an observer maintaining full context across all components. The system intelligently balances between search snippets and full content retrieval to optimize token usage while maintaining research quality, ultimately providing structured JSON outputs specifically designed for API consumption."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-web-research-system-with-dynamic-task-generation"
  ogTitle: "Exa: Multi-Agent Web Research System with Dynamic Task Generation - ZenML LLMOps Database"
  ogDescription: "Exa evolved from providing a search API to building a production-ready multi-agent web research system that processes hundreds of research queries daily, delivering structured results in 15 seconds to 3 minutes. Using LangGraph for orchestration and LangSmith for observability, their system employs a three-component architecture with a planner that dynamically generates parallel tasks, independent research units with specialized tools, and an observer maintaining full context across all components. The system intelligently balances between search snippets and full content retrieval to optimize token usage while maintaining research quality, ultimately providing structured JSON outputs specifically designed for API consumption."
---

## Company and Use Case Overview

Exa represents a fascinating evolution in the search and research technology space, demonstrating how companies can progressively advance from simple API services to sophisticated agentic systems. The company began with a foundational search API, evolved to an answers endpoint that combined LLM reasoning with search results, and ultimately developed their most ambitious product: a deep research agent capable of autonomous web exploration to find structured information for users.

This progression reflects broader industry trends where LLM applications are becoming increasingly agentic and long-running over time. The case study illustrates how research-related tasks have evolved from simple Retrieval-Augmented Generation (RAG) implementations to sophisticated Deep Research systems, mirroring similar transformations in coding applications that have shifted from auto-complete to question-answering and now to asynchronous, long-running coding agents.

The transition also highlights how framework adoption evolves with architectural complexity. While Exa's original answers endpoint operated without frameworks, their shift to a more complex deep-research architecture led them to reevaluate their tooling choices and ultimately select LangGraph as their framework of choice. This pattern reflects a common trend where LangGraph becomes increasingly valuable as system architectures grow more sophisticated.

## Technical Architecture and LLMOps Implementation

Exa's deep research agent employs a sophisticated multi-agent architecture built entirely on LangGraph, consisting of three primary components that work in concert to deliver comprehensive research results. The system's design demonstrates advanced LLMOps principles through its careful balance of autonomy, coordination, and observability.

The **Planner** component serves as the system's orchestration layer, analyzing incoming research queries and dynamically generating multiple parallel tasks based on query complexity. This dynamic approach represents a significant departure from rigid workflow systems, allowing the architecture to scale from simple single-task queries to complex, multi-faceted research requiring numerous parallel investigations. The planner's ability to adapt task generation based on query requirements demonstrates sophisticated prompt engineering and query analysis capabilities.

The **Tasks** component represents independent research units that operate with specialized tools and reasoning capabilities. Each task receives specific instructions, a required output format (always JSON schema), and access to specialized Exa API tools. This modular approach allows for parallel execution while maintaining consistency in output format, a critical requirement for API-based consumption. The task isolation ensures that each research unit can operate independently while contributing to the overall research objective.

The **Observer** component maintains full context across all planning, reasoning, outputs, and citations, providing system-wide visibility and coordination. This component represents a sophisticated approach to context management in multi-agent systems, ensuring that while individual tasks operate independently, the overall system maintains coherence and can provide comprehensive, well-cited research outputs.

## Context Engineering and Token Optimization

One of the most sophisticated aspects of Exa's LLMOps implementation is their intentional context engineering approach. While the observer maintains full visibility across all components, individual tasks only receive the final cleaned outputs from other tasks, not intermediate reasoning states. This design choice reflects deep understanding of context management in production LLM systems, balancing information sharing with token efficiency and system clarity.

The system's approach to content handling demonstrates advanced token optimization strategies. Rather than automatically crawling full page content, the system first attempts reasoning on search snippets, significantly reducing token usage while preserving research quality. Only when snippet-level reasoning proves insufficient does the agent request full content. This intelligent content tiering is powered by the Exa API's capabilities and represents a sophisticated approach to balancing cost, speed, and quality in production LLM systems.

This search snippet versus full results strategy illustrates how successful LLMOps implementations require careful consideration of resource utilization. The system's ability to dynamically adjust its information consumption based on reasoning requirements demonstrates mature understanding of production LLM economics and performance optimization.

## Structured Output and API Design

Unlike many research systems that produce unstructured reports, Exa's agent maintains structured JSON output at every level, with output formats specifiable at runtime. This design choice was driven by their specific use case requirements, as they designed their system specifically for API consumption rather than direct consumer interaction. The emphasis on structured output reflects understanding that API consumers require reliable, parseable results for downstream integration.

The structured output generation utilizes function calling capabilities, ensuring consistent formatting regardless of query complexity or research depth. This approach demonstrates sophisticated prompt engineering and output formatting techniques that are essential for production API services. The runtime configurability of output formats provides flexibility for different use cases while maintaining the consistency required for automated processing.

## Observability and Production Monitoring

Exa's implementation of LangSmith for observability represents a critical aspect of their LLMOps strategy. The team identified observability, particularly around token usage, as one of the most critical features for their production deployment. This visibility into token consumption, caching rates, and reasoning token usage proved essential for informing production pricing models and ensuring cost-effective performance at scale.

The observability implementation provides insights into system performance that extend beyond basic monitoring to include economic factors critical for API business models. Understanding token usage patterns, caching effectiveness, and reasoning costs allows for informed decisions about pricing, resource allocation, and system optimization. This comprehensive approach to observability demonstrates mature LLMOps practices that consider both technical performance and business viability.

## Production Performance and Scalability

The system processes hundreds of research queries daily, delivering structured results in 15 seconds to 3 minutes depending on complexity. This performance profile demonstrates successful scaling of agentic systems in production environments, with response times that balance thoroughness with user experience requirements. The variable response time based on complexity reflects the system's intelligent resource allocation and task generation capabilities.

The production deployment handles real customer queries with impressive speed and reliability, indicating robust error handling, resource management, and quality assurance processes. The system's ability to maintain consistent performance across varied query types and complexities demonstrates mature LLMOps practices including proper load balancing, resource allocation, and system monitoring.

## Framework Integration and Technical Choices

Exa's choice of LangGraph for orchestration reflects careful evaluation of framework options for complex agentic systems. The team's transition from framework-less implementation to LangGraph adoption illustrates how architectural complexity drives tooling decisions in LLMOps. LangGraph's coordination capabilities proved essential for managing the multi-agent interactions and maintaining system coherence.

The integration demonstrates how successful LLMOps implementations require careful selection of frameworks that can support complex workflows while providing necessary observability and control. The combination of LangGraph for orchestration and LangSmith for observability creates a comprehensive platform for managing sophisticated agentic systems in production.

## Lessons and Best Practices

The case study reveals several key insights for teams building similar systems in production environments. The emphasis on observability from the system's inception demonstrates the importance of monitoring and measurement in LLMOps implementations. Token tracking and system visibility are presented as critical for production deployment, reflecting the economic realities of LLM-based services.

The focus on structured output and API design considerations highlights the importance of understanding target use cases and designing systems accordingly. The distinction between consumer-facing research tools and API-based services drove fundamental architectural decisions that impact everything from output formatting to user experience design.

The dynamic task generation approach represents a sophisticated alternative to rigid workflows, allowing systems to scale naturally with query complexity while maintaining resource efficiency. This flexibility demonstrates advanced understanding of how to balance system capabilities with operational constraints in production environments.

## Industry Impact and Future Implications

Exa's implementation provides a compelling example of how to build production-ready agentic systems that deliver real business value. The system's success in processing hundreds of daily queries while maintaining performance and cost efficiency demonstrates the viability of sophisticated multi-agent systems in commercial applications.

The case study illustrates the maturation of LLMOps practices, showing how companies can successfully navigate the transition from simple API services to complex agentic systems. The emphasis on observability, structured output, and economic considerations reflects industry-wide learning about the requirements for successful production LLM deployments.

The technical choices and architectural patterns demonstrated by Exa's system provide valuable insights for other organizations considering similar implementations, particularly around framework selection, context engineering, and the balance between system sophistication and operational requirements.