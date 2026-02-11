---
title: "Building Production Security Features with LangChain and LLMs"
slug: "building-production-security-features-with-langchain-and-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6776632bfb9688d2eebbce78"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:51:18.247Z"
  createdOn: "2025-01-02T09:58:03.400Z"
llmopsTags:
  - "high-stakes-application"
  - "question-answering"
  - "structured-output"
  - "regulatory-compliance"
  - "rag"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "multi-agent-systems"
  - "langchain"
  - "elasticsearch"
  - "monitoring"
  - "fastapi"
  - "openai"
  - "prompt-engineering"
industryTags: "tech"
company: "Elastic"
summary: "Elastic developed three security-focused generative AI features - Automatic Import, Attack Discovery, and Elastic AI Assistant - by integrating LangChain and LangGraph into their Search AI Platform. The solution leverages RAG and controllable agents to expedite labor-intensive SecOps tasks, including ES|QL query generation and data integration automation. The implementation includes LangSmith for debugging and performance monitoring, reaching over 350 users in production."
link: "https://www.elastic.co/blog/building-automatic-import-attack-discovery-langchain?ref=blog.langchain.dev"
year: 2024
seo:
  title: "Elastic: Building Production Security Features with LangChain and LLMs - ZenML LLMOps Database"
  description: "Elastic developed three security-focused generative AI features - Automatic Import, Attack Discovery, and Elastic AI Assistant - by integrating LangChain and LangGraph into their Search AI Platform. The solution leverages RAG and controllable agents to expedite labor-intensive SecOps tasks, including ES|QL query generation and data integration automation. The implementation includes LangSmith for debugging and performance monitoring, reaching over 350 users in production."
  canonical: "https://www.zenml.io/llmops-database/building-production-security-features-with-langchain-and-llms"
  ogTitle: "Elastic: Building Production Security Features with LangChain and LLMs - ZenML LLMOps Database"
  ogDescription: "Elastic developed three security-focused generative AI features - Automatic Import, Attack Discovery, and Elastic AI Assistant - by integrating LangChain and LangGraph into their Search AI Platform. The solution leverages RAG and controllable agents to expedite labor-intensive SecOps tasks, including ES|QL query generation and data integration automation. The implementation includes LangSmith for debugging and performance monitoring, reaching over 350 users in production."
---

## Overview

Elastic Security has developed a suite of AI-powered features designed to accelerate security operations and facilitate migration from legacy SIEM (Security Information and Event Management) systems. This case study examines how Elastic partnered with LangChain to build and deploy three production capabilities: Automatic Import, Attack Discovery, and Elastic AI Assistant. The integration represents a significant example of LLMOps in the cybersecurity domain, demonstrating how orchestration frameworks and observability tools can be leveraged to deliver generative AI features at scale.

According to the published account, the deployment has reached over 350 users in production, though it's worth noting that this figure comes from a LangChain founding engineer quote within what is essentially a joint marketing piece between the two companies. While the technical architecture described appears sound, readers should consider that this content is promotional in nature and may not represent a fully objective assessment of the implementation's success or challenges.

## Technical Architecture and LangChain Integration

The Elastic Security implementation relies on two primary components from the LangChain ecosystem:

**LangChain and LangGraph Open Source**: These libraries provide the foundation for building context-aware reasoning applications. LangGraph, specifically described as a "controllable agent orchestration framework," powers the end-to-end generation workflows for all three features. The choice of LangGraph suggests that Elastic needed more structured control over agent behavior than what basic LangChain chains might provide—a common requirement in production systems where reliability and predictability are paramount.

**LangSmith**: This observability platform is used for detailed tracing, debugging, performance tracking, and cost estimation. The article includes a screenshot showing LangSmith visualizing a trace of an ES|QL generation workflow, demonstrating the practical application of tracing in understanding LLM request flows. This observability component is crucial for LLMOps, as it provides visibility into what can otherwise be opaque LLM interactions.

## ES|QL Query Generation Workflow

One of the primary use cases highlighted is enabling the Elastic AI Assistant to generate ES|QL queries from natural language input. ES|QL is Elastic's piped query language for threat hunting and detection, and the goal was to reduce the learning curve for users who would otherwise need to master complex query syntax.

The technical implementation employs retrieval augmented generation (RAG) to provide rich context to the underlying LLM. The workflow uses a modified version of the native Elasticsearch LangChain vector store component as part of the generation graph, leveraging Elastic's Search AI Platform to retrieve vectorized content necessary for query formulation. This is a practical example of how companies can use their own search infrastructure in conjunction with LangChain's abstractions.

The workflow is implemented as a LangGraph graph, which allows for more complex state management and conditional logic compared to simple sequential chains. This architecture enables multi-step reasoning where the system can retrieve relevant documentation, process the user's natural language input, and generate syntactically correct ES|QL queries.

## Automatic Import Feature

The Automatic Import feature uses LangGraph to generate complete integration packages from sample data. The article describes this as enabling users to "simply and quickly build stateful workflows," which suggests that the feature can take example log data or event formats and automatically create the necessary configuration for ingesting that data type into Elastic.

While the article includes a visual representation of the graph that powers Automatic Import, it doesn't provide extensive technical details about the specific nodes or decision points in this workflow. What is clear is that the stateful nature of LangGraph is leveraged to manage the multi-step process of analyzing sample data, determining schema, and generating integration configurations.

## Attack Discovery

Attack Discovery is mentioned as one of the three capabilities but receives less detailed coverage in this technical blog. The feature is described as having "the ability to identify and describe attacks," which implies some form of threat intelligence synthesis or alert correlation powered by LLM reasoning. The use of LangChain presumably provides context-aware analysis of security events to surface potential attack patterns.

## LLMOps Considerations

Several important LLMOps practices are evident or implied in this case study:

**Model Flexibility**: A notable aspect of the implementation is that Elastic Security users can integrate with their LLM of choice. The combination of Elastic's open inference API and LangChain's chat model ecosystem enables this flexibility. This is a significant architectural decision for enterprise deployments, as it allows customers to use their preferred LLM provider (whether for cost, compliance, or capability reasons) while still benefiting from the same application logic.

**Observability and Debugging**: The use of LangSmith for tracing represents a mature approach to LLMOps. The ability to get "a complete breakdown of requests to large language models" is essential for debugging issues in production, understanding where latency occurs, and optimizing prompts or retrieval strategies. Cost estimation is also mentioned, which is critical for enterprises managing LLM API spend.

**Complementary Observability Offering**: Interestingly, Elastic also positions its Observability product as a solution for monitoring LangChain applications through OpenTelemetry integration. This creates a somewhat circular ecosystem where Elastic uses LangSmith to monitor its own LangChain-based features, while also offering its observability tools to other LangChain users.

## Production Deployment Scale

The claim of reaching "over 350 users" in production provides some indication of scale, though this is a relatively modest number for an enterprise security product. It's unclear whether this represents early adopter usage, a specific customer segment, or internal testing. The phrasing comes from a LangChain representative, which suggests it may be highlighting partnership success rather than overall product adoption.

## Considerations and Limitations

As with any vendor-produced case study, some balance is warranted:

- The content is jointly produced by Elastic and LangChain, so it naturally emphasizes the benefits of their partnership
- No challenges, failures, or lessons learned are discussed, which would provide a more complete picture of the implementation experience
- Specific metrics around accuracy, latency, or user satisfaction are not provided
- The disclaimer at the end notes that features and timing "remain at Elastic's sole discretion" and that "features or functionality not currently available may not be delivered on time or at all"

The architecture described—using RAG with a vector store, LangGraph for workflow orchestration, and LangSmith for observability—represents current best practices in LLMOps. However, the actual effectiveness of these features in real security operations contexts would require independent validation.

## Broader Ecosystem Integration

The case study highlights how Elastic is positioning itself within the broader AI development ecosystem. By supporting multiple LLM providers through their inference API, using standard LangChain abstractions, and offering OpenTelemetry-based observability for LangChain applications, Elastic appears to be building a comprehensive platform for AI-powered security analytics that can integrate with various enterprise AI strategies.

The partnership model with LangChain represents a common pattern in the LLMOps space, where application developers leverage specialized orchestration and observability tools rather than building these capabilities from scratch. This allows teams to focus on domain-specific logic while benefiting from community-developed and tested infrastructure components.