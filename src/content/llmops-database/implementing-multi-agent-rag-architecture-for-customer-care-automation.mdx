---
title: "Implementing Multi-Agent RAG Architecture for Customer Care Automation"
slug: "implementing-multi-agent-rag-architecture-for-customer-care-automation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "678a84dfa64d33231d6a24a6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:55:51.766Z"
  createdOn: "2025-01-17T16:27:11.983Z"
llmopsTags:
  - "customer-support"
  - "healthcare"
  - "rag"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "langchain"
  - "fastapi"
  - "documentation"
  - "monitoring"
  - "guardrails"
  - "reliability"
  - "openai"
industryTags: "healthcare"
company: "Doctolib"
summary: "Doctolib evolved their customer care system from basic RAG to a sophisticated multi-agent architecture using LangGraph. The system employs a primary assistant for routing and specialized agents for specific tasks, incorporating safety checks and API integrations. While showing promise in automating customer support tasks like managing calendar access rights, they faced challenges with LLM behavior variance, prompt size limitations, and unstructured data handling, highlighting the importance of robust data structuration and API documentation for production deployment."
link: "https://medium.com/doctolib/part-2-from-rag-to-agents-doctolibs-journey-to-revolutionize-customer-care-6b14da40f5ae"
year: 2024
seo:
  title: "Doctolib: Implementing Multi-Agent RAG Architecture for Customer Care Automation - ZenML LLMOps Database"
  description: "Doctolib evolved their customer care system from basic RAG to a sophisticated multi-agent architecture using LangGraph. The system employs a primary assistant for routing and specialized agents for specific tasks, incorporating safety checks and API integrations. While showing promise in automating customer support tasks like managing calendar access rights, they faced challenges with LLM behavior variance, prompt size limitations, and unstructured data handling, highlighting the importance of robust data structuration and API documentation for production deployment."
  canonical: "https://www.zenml.io/llmops-database/implementing-multi-agent-rag-architecture-for-customer-care-automation"
  ogTitle: "Doctolib: Implementing Multi-Agent RAG Architecture for Customer Care Automation - ZenML LLMOps Database"
  ogDescription: "Doctolib evolved their customer care system from basic RAG to a sophisticated multi-agent architecture using LangGraph. The system employs a primary assistant for routing and specialized agents for specific tasks, incorporating safety checks and API integrations. While showing promise in automating customer support tasks like managing calendar access rights, they faced challenges with LLM behavior variance, prompt size limitations, and unstructured data handling, highlighting the importance of robust data structuration and API documentation for production deployment."
---

## Overview

Doctolib, a European healthcare technology company known for its medical appointment booking platform, embarked on a journey to revolutionize their customer care services using LLM-based solutions. This case study (Part 2 of a series) documents their evolution from a basic Retrieval-Augmented Generation (RAG) system to a more sophisticated agentic architecture. The work represents an experimental proof-of-concept (POC) rather than a fully deployed production system, with the team openly acknowledging the challenges that remain before achieving production readiness.

The core motivation for moving beyond RAG was to handle more complex customer support tasks that require multi-step reasoning, tool execution, and the ability to perform actions on behalf of users—capabilities that go beyond simple document retrieval and response generation.

## Technical Architecture

### Framework Selection and Rationale

The team evaluated several emerging agentic frameworks including CrewAI, AutoGen, and LangGraph. They ultimately selected **LangGraph**, a multi-agent framework built on top of LangChain, for several reasons:

- Greater flexibility for development while maintaining security guardrails for sensitive operations
- Simpler implementation of user interaction flows
- Clearer documentation compared to alternatives
- Easy integration with the broader LangChain ecosystem, which accelerated development

LangGraph models interactions as **cyclical graphs** composed of nodes and branches. Each node represents a computation or processing step, which can be either an LLM-based agent or a deterministic function. These graphs enable advanced workflows with multiple loops and conditional logic, making them suitable for complex agent orchestration.

### Multi-Agent Orchestration Design

The architecture implements a hierarchical multi-agent system with two types of LLM agents:

**Root Assistant (Primary Assistant):** This agent serves as the entry point for user interactions. Its responsibilities include greeting users, engaging in conversation until a clear query emerges, and routing the user to the appropriate specialized assistant. The routing mechanism is based on an ML classification model.

**Specialized Assistants:** Each specialized assistant handles a fixed scope of one or two use cases. This design decision was intentional—by limiting the scope, prompt size, and number of associated tools for each agent, the team aimed to reduce pressure on individual agents and improve their reliability. Specialization enables better performance because agents can focus on their domain expertise.

### Tool Architecture

Each specialized assistant has access to several categories of tools:

- **Data Fetching Tools:** These retrieve contextual information about the user or their query, with the tool documentation specifying which Doctolib database resources are relevant to the user's question.

- **FAQ Search Tool:** This is essentially the RAG system from the original implementation, now integrated as one tool among many that agents can invoke.

- **Execution Tools (Sensitive):** These tools automate customer support back-end actions required to resolve user issues. They are classified as "sensitive" because they require explicit user validation before execution. The system includes a fact-checking step as a safety net to ensure that tool arguments are properly filled by the specialized assistant before execution.

- **Task Completion Tools:** These signal when a task is complete or canceled, allowing the conversation to loop back to the root assistant.

### Example Use Case

The article provides a concrete demonstration: a user wants to grant their secretary access to their calendar/agenda. The flow proceeds as follows:

- The user query is routed to the specialized agent handling agenda rights issues
- The agent asks clarifying questions about the user's name and specific agenda
- A tool is invoked to fetch additional context data from Doctolib's systems
- Before executing the access grant, arguments are validated and the user is asked for explicit confirmation
- The action is then executed on the user's behalf

## Production Challenges and LLMOps Considerations

The team is commendably transparent about the challenges they face in bringing this system to production. These challenges offer valuable insights for practitioners working on similar agentic systems.

### Agent Behavior Variance

One of the most significant issues is the non-deterministic nature of LLM models, which leads to inconsistent agent behavior. Specific problems include agents not invoking the correct tool at the right moment and agents not executing tools with properly specified parameters. This unpredictability is especially problematic when prompts become large. The team's mitigation strategy involves reducing the expected tasks from individual LLMs and limiting their degrees of freedom—essentially keeping agents focused and constrained.

### Prompt Size and Positional Attention Bias

Agentic architectures require feeding extensive information through the LLM prompt, including tool descriptions, execution details, and message history. This leads to very large prompts, which are susceptible to the "Lost in the Middle" problem—LLMs tend to pay less attention to information in the middle of long contexts. The more information provided, the less likely the LLM is to follow guidelines consistently.

### Unstructured Data Processing

Enriching context around user questions requires agents to extract useful information from unstructured data and interpret it correctly. This task is difficult for models to perform consistently, adding another layer of complexity to reliable system operation.

## Data Quality and Documentation Requirements

The team emphasizes that the effectiveness of agentic systems hinges on the quality, completeness, and relevance of underlying data. They identify several key requirements:

**Functional Data Structuration:** Creating a clear and exhaustive data referential for all scopes and categories the system handles. This includes defining the prompt, context information, tool definitions, and available data tables for each specialized assistant. The goal is to break down user queries into manageable use cases with specific context data, instructions, and definitions that guide the LLM through small, manageable tasks.

**API Documentation Quality:** To execute actions on behalf of users, the system requires well-documented APIs. The quality of the agentic system depends directly on the quality of code documentation. The team envisions using OpenAPI specifications to directly feed their system, creating a new paradigm where code documentation becomes a valuable data source for the AI system itself.

**Data Governance:** Strong governance over key data assets is essential, ensuring datasets remain up-to-date and semantics are harmonized across the organization.

## Remaining Challenges for Production Deployment

The article honestly outlines significant challenges that remain before this can become a reliable production AI product:

**Evaluation Complexity:** The system comprises many interconnected components that need individual evaluation to identify performance bottlenecks. The team mentions frameworks like Literal and LangSmith as potential tools for understanding error root causes. However, comprehensive evaluation of multi-agent systems remains an unsolved challenge in the field.

**Production Deployment Dependencies:** Deploying the framework requires strong collaboration and synchronization across multiple teams including design, feature teams, product management, and ML platform teams. LangGraph is described as a new and evolving library with few real production use cases to reference. Achieving the required robustness level for production confidence is an ongoing effort.

**Organizational Change:** Making the system scalable requires smart design, team synchronization, and excellent data structuration and documentation. This necessitates organizational change across the company to develop and maintain properly governed data assets.

## Critical Assessment

While the case study presents promising concepts and an interesting architectural approach, it's important to note several caveats:

- This is described as a POC (proof of concept), not a production system. The actual production readiness and real-world performance remain unproven.
- The team does not provide quantitative metrics on system performance, accuracy, or user satisfaction.
- The challenges described (behavior variance, evaluation complexity, production dependencies) are significant and common across the industry—solving them is non-trivial.
- The reliance on LangGraph, described as a "new and moving library" with few production examples, introduces technology risk.

That said, the transparency about challenges and limitations adds credibility to the case study. The architectural decisions—particularly the specialized agent approach to reduce complexity and the sensitive tool validation pattern—represent thoughtful design choices that could inform similar implementations elsewhere.

## Key Takeaways for LLMOps Practitioners

The Doctolib case study offers several valuable lessons:

- **Specialization reduces complexity:** Breaking down agentic systems into focused, specialized components can help manage the inherent unpredictability of LLM behavior.
- **Safety guardrails are essential:** For systems that execute real actions, implementing validation steps and "sensitive tool" classifications provides necessary safety nets.
- **Documentation becomes code:** In agentic systems, the quality of API documentation and data governance directly impacts system capability and reliability.
- **Evaluation is hard:** Multi-component LLM systems require sophisticated evaluation strategies that go beyond single-model metrics.
- **Organizational readiness matters:** Deploying agentic systems requires cross-functional collaboration and potentially significant organizational changes around data governance and documentation practices.