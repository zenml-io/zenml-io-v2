---
title: "Building a Rust-Based AI Agentic Framework for Multimodal Data Quality Monitoring"
slug: "building-a-rust-based-ai-agentic-framework-for-multimodal-data-quality-monitoring"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6880a0d13245f9e2db24dddf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:16:40.285Z"
  createdOn: "2025-07-23T08:44:01.281Z"
llmopsTags:
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "unstructured-data"
  - "regulatory-compliance"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "fine-tuning"
  - "cost-optimization"
  - "latency-optimization"
  - "human-in-the-loop"
  - "system-prompts"
  - "open-source"
  - "monitoring"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "documentation"
  - "compliance"
  - "openai"
  - "anthropic"
  - "hugging-face"
industryTags: "tech"
company: "Zectonal"
summary: "Zectonal, a data quality monitoring company, developed a custom AI agentic framework in Rust to scale their multimodal data inspection capabilities beyond traditional rules-based approaches. The framework enables specialized AI agents to autonomously call diagnostic function tools for detecting defects, errors, and anomalous conditions in large datasets, while providing full audit trails through \"Agent Provenance\" tracking. The system supports multiple LLM providers (OpenAI, Anthropic, Ollama) and can operate both online and on-premise, packaged as a single binary executable that the company refers to as their \"genie-in-a-binary.\""
link: "https://zectonal.medium.com/why-we-built-our-ai-agentic-framework-in-rust-from-the-ground-up-9a3076af8278"
year: 2024
seo:
  title: "Zectonal: Building a Rust-Based AI Agentic Framework for Multimodal Data Quality Monitoring - ZenML LLMOps Database"
  description: "Zectonal, a data quality monitoring company, developed a custom AI agentic framework in Rust to scale their multimodal data inspection capabilities beyond traditional rules-based approaches. The framework enables specialized AI agents to autonomously call diagnostic function tools for detecting defects, errors, and anomalous conditions in large datasets, while providing full audit trails through \"Agent Provenance\" tracking. The system supports multiple LLM providers (OpenAI, Anthropic, Ollama) and can operate both online and on-premise, packaged as a single binary executable that the company refers to as their \"genie-in-a-binary.\""
  canonical: "https://www.zenml.io/llmops-database/building-a-rust-based-ai-agentic-framework-for-multimodal-data-quality-monitoring"
  ogTitle: "Zectonal: Building a Rust-Based AI Agentic Framework for Multimodal Data Quality Monitoring - ZenML LLMOps Database"
  ogDescription: "Zectonal, a data quality monitoring company, developed a custom AI agentic framework in Rust to scale their multimodal data inspection capabilities beyond traditional rules-based approaches. The framework enables specialized AI agents to autonomously call diagnostic function tools for detecting defects, errors, and anomalous conditions in large datasets, while providing full audit trails through \"Agent Provenance\" tracking. The system supports multiple LLM providers (OpenAI, Anthropic, Ollama) and can operate both online and on-premise, packaged as a single binary executable that the company refers to as their \"genie-in-a-binary.\""
---

## Company Overview and Use Case

Zectonal is a software company specializing in characterizing and monitoring multimodal datasets for defects, errors, poisoned data, and other anomalous conditions that deviate from defined baselines. Their core mission is to detect and prevent bad data from polluting data lakes and causing faulty analysis in business intelligence and AI decision-making tools. The company has developed what they call "Zectonal Deep Data Inspection" - a set of proprietary algorithms designed to find anomalous characteristics inside multimodal files in large data stores, data pipelines, or data lakes at sub-second speeds.

The company's journey into LLMOps began with a simple GPT-3 chat interface for answering basic questions about data formats and structures. However, they recognized early on that the real value would come from leveraging AI's yet-to-emerge capabilities to enhance their core data quality monitoring functionality. This vision led them to develop a sophisticated AI agentic framework built entirely in Rust.

## Technical Architecture and LLMOps Implementation

### Rust-Based Agentic Framework

Zectonal made the strategic decision to build their AI agentic framework in Rust rather than using existing Python-based solutions like LangChain or LlamaIndex. This choice was driven by several factors: their previous negative experiences with Python's performance limitations (particularly the Global Interpreter Lock), the need for blazing fast performance when processing large datasets, and Rust's memory safety guarantees that eliminate entire classes of runtime bugs and vulnerabilities.

The framework operates as a single compiled binary executable that the company calls their "genie-in-a-binary." This approach provides several advantages for production deployment: simplified distribution, consistent performance across environments, and the ability to maintain what they term "Agent Provenance" - a complete audit trail of all agent communications and decision-making processes.

### Function Tool Calling Architecture

The core innovation in Zectonal's LLMOps approach is their implementation of LLM function tool calling to replace traditional rules-based analysis. Instead of pre-defining rules for when to execute specific diagnostic algorithms, they allow LLMs to dynamically decide which function tools to call based on the characteristics of the data being analyzed. This represents a significant scaling improvement as the number of supported data sources and file codecs has grown.

The framework supports what they call "needle-in-a-haystack" algorithms - specialized diagnostic capabilities designed to detect anomalous characteristics within multimodal files. For example, the system can detect malformed text inside a single cell in a spreadsheet with millions of rows and columns at sub-second speed, and can analyze similar files flowing through data pipelines continuously on a 24/7 basis.

### Multi-Provider LLM Support

One of the key architectural decisions was to build an extensible framework that supports multiple LLM providers rather than being locked into a single vendor. The system currently integrates with:

- **OpenAI APIs**: Leveraging their Assistants API and structured outputs capabilities, with particular success using GPT-4o and GPT-4o-mini models
- **Anthropic APIs**: Supporting Claude Sonnet models and their function tool calling capabilities
- **Ollama**: For on-premise deployment scenarios where data cannot leave the customer's environment

This multi-provider approach allows Zectonal to implement what they call "hybrid best-of-breed" deployments, where different agents can run on different platforms based on cost, performance, and security requirements.

### Agent Provenance and Audit Trails

A critical aspect of Zectonal's LLMOps implementation is their "Agent Provenance" system - comprehensive tracking of agent communications from initial tasking to completion. This system addresses a common enterprise concern about AI transparency and auditability. The provenance tracking captures:

- Which agents and function tools were called for each task
- The decision-making process that led to specific tool selections
- Real-time progress updates visible in their user interface
- Subjective and objective metrics for each interaction, including intent and confidence scores

This audit capability has proven essential for debugging agent behavior, optimizing prompts and function tool descriptions, and fine-tuning models more efficiently. The company notes that one of their first observations when deploying AI agents was how "chatty" they are when communicating amongst themselves, making this tracking capability crucial for both operational and cost management purposes.

### Production Challenges and Solutions

The company has encountered and addressed several typical LLMOps challenges:

**Cost Management**: Token-based billing for LLM services creates unpredictable costs that are difficult to budget and forecast. Zectonal has developed configuration options and fine-tuning techniques to mitigate token usage, though they note that cost forecasting remains "no science, all art." They're working toward an equilibrium where some highly specialized agents run on premium LLM services while others operate on-premise via Ollama to optimize costs.

**Error Detection and Reliability**: Unlike traditional software where wrong function calls would typically result in clear errors, LLM-driven function calling can fail silently when the wrong tool is selected. Zectonal found that existing Python frameworks relied too heavily on human intuition to detect these issues, which they recognized as non-scalable. Their Rust framework includes better mechanisms for detecting when inappropriate tools have been called.

**Model Provider Dependencies**: The rapid evolution of LLM capabilities means constant adaptation. The company tracks the Berkeley Function Calling Leaderboard daily and has had to adapt to changes like OpenAI's transition from "function calling" to "tool calling" terminology and the introduction of structured outputs.

### Advanced Capabilities and Future Directions

**Autonomous Agent Creation**: Zectonal is experimenting with meta-programming concepts applied to AI agents - autonomous agents that can create and spawn new agents based on immediate needs without human interaction. This includes scenarios where agents might determine that a specialized capability is needed (such as analyzing a new file codec) and automatically create both new agents and the tools they need to operate.

**Dynamic Tool Generation**: The system includes agents specifically designed to create new software tools, enabling a form of "meta AI programming" where tools can create other tools. This capability raises interesting questions about governance, security, and the potential for diminishing returns as agent populations grow.

**Utility Function Optimization**: The company is developing a general-purpose utility function for their agents based on the rich data collected through Agent Provenance. This includes metrics for intent, confidence, and other factors that can be used to reward useful information and penalize poor performance.

### Deployment and Operations

The production system is designed for both cloud and on-premise deployment scenarios. Zectonal deliberately chose not to be a SaaS product, instead providing software that customers can deploy in their own environments. This decision was based on their experience selling to Fortune 50 companies and their concerns about data liability and security breaches associated with external hosting.

The single binary deployment model simplifies operations significantly compared to typical Python-based ML deployments that require complex dependency management. The system can analyze data flowing through pipelines continuously, processing files every few seconds on a 24/7 basis while maintaining the performance characteristics necessary for real-time monitoring.

### Technical Lessons and Insights

Several key insights emerge from Zectonal's LLMOps implementation:

**Language Choice Impact**: The decision to use Rust rather than Python for their AI infrastructure has provided significant advantages in terms of performance, reliability, and deployment simplicity. While Python remains dominant in the AI/ML space, Rust's characteristics make it particularly well-suited for production AI systems that require high performance and reliability.

**Framework vs. Library Approach**: Rather than assembling existing tools, building a custom framework allowed Zectonal to optimize for their specific use cases and requirements, particularly around audit trails and multi-provider support.

**Hybrid Deployment Strategy**: The ability to support both cloud-based and on-premise LLM providers has proven crucial for enterprise adoption, allowing customers to balance performance, cost, and security requirements.

**Observability Requirements**: The need for comprehensive monitoring and audit trails in production AI systems is critical, particularly for enterprise use cases where transparency and explainability are essential for adoption and compliance.

This case study demonstrates how a thoughtful approach to LLMOps architecture, with careful consideration of performance, security, auditability, and deployment flexibility, can enable sophisticated AI capabilities while meeting enterprise requirements for reliability and transparency.