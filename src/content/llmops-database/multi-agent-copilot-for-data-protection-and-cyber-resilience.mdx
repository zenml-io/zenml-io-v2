---
title: "Multi-Agent Copilot for Data Protection and Cyber Resilience"
slug: "multi-agent-copilot-for-data-protection-and-cyber-resilience"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6950f6972b58c640b33b485c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-28T10:51:50.676Z"
  createdOn: "2025-12-28T09:21:27.522Z"
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "chatbot"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "monitoring"
  - "api-gateway"
  - "orchestration"
  - "documentation"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "Druva"
summary: "Druva, a data security solutions provider, collaborated with AWS to develop a generative AI-powered multi-agent copilot to simplify complex data protection operations for enterprise customers. The system leverages Amazon Bedrock, multiple LLMs (including Anthropic Claude and Amazon Nova models), and a sophisticated multi-agent architecture consisting of a supervisor agent coordinating specialized data, help, and action agents. The solution addresses challenges in managing comprehensive data security across large-scale deployments by providing natural language interfaces for troubleshooting, policy management, and operational support. Initial evaluation results showed 88-93% accuracy in API selection depending on the model used, with end-to-end testing achieving 3.3 out of 5 scores from expert evaluators during early development phases. The implementation promises to reduce investigation time from hours to minutes and enables 90% of routine data protection tasks through conversational interactions."
link: "https://aws.amazon.com/blogs/machine-learning/harnessing-the-power-of-generative-ai-druvas-multi-agent-copilot-for-streamlined-data-protection?tag=soumet-20"
year: 2025
seo:
  title: "Druva: Multi-Agent Copilot for Data Protection and Cyber Resilience - ZenML LLMOps Database"
  description: "Druva, a data security solutions provider, collaborated with AWS to develop a generative AI-powered multi-agent copilot to simplify complex data protection operations for enterprise customers. The system leverages Amazon Bedrock, multiple LLMs (including Anthropic Claude and Amazon Nova models), and a sophisticated multi-agent architecture consisting of a supervisor agent coordinating specialized data, help, and action agents. The solution addresses challenges in managing comprehensive data security across large-scale deployments by providing natural language interfaces for troubleshooting, policy management, and operational support. Initial evaluation results showed 88-93% accuracy in API selection depending on the model used, with end-to-end testing achieving 3.3 out of 5 scores from expert evaluators during early development phases. The implementation promises to reduce investigation time from hours to minutes and enables 90% of routine data protection tasks through conversational interactions."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-copilot-for-data-protection-and-cyber-resilience"
  ogTitle: "Druva: Multi-Agent Copilot for Data Protection and Cyber Resilience - ZenML LLMOps Database"
  ogDescription: "Druva, a data security solutions provider, collaborated with AWS to develop a generative AI-powered multi-agent copilot to simplify complex data protection operations for enterprise customers. The system leverages Amazon Bedrock, multiple LLMs (including Anthropic Claude and Amazon Nova models), and a sophisticated multi-agent architecture consisting of a supervisor agent coordinating specialized data, help, and action agents. The solution addresses challenges in managing comprehensive data security across large-scale deployments by providing natural language interfaces for troubleshooting, policy management, and operational support. Initial evaluation results showed 88-93% accuracy in API selection depending on the model used, with end-to-end testing achieving 3.3 out of 5 scores from expert evaluators during early development phases. The implementation promises to reduce investigation time from hours to minutes and enables 90% of routine data protection tasks through conversational interactions."
---

## Overview and Business Context

Druva, a leading provider of data security and cyber resilience solutions, has developed a generative AI-powered multi-agent copilot in collaboration with AWS to transform how enterprise customers interact with complex data protection systems. This case study represents a production implementation of agentic AI systems designed to address real operational challenges in managing large-scale data security infrastructure. The business motivation stems from the increasing complexity of comprehensive data security, where enterprises must track high volumes of data and metrics to identify cyber threats, while simultaneously managing backup operations, policy configurations, and incident response across distributed systems.

The use case provided in the blog post illustrates the practical value proposition: a global financial services company managing over 500 servers across multiple regions currently spends hours manually checking logs when backups fail. The envisioned solution allows users to simply ask "Why did my backups fail last night?" and receive instant analysis identifying that a specific policy update caused conflicts in European data centers, along with remediation guidance. This transformation from hours-long manual investigations to minute-scale AI-powered responses represents the core operational improvement the system aims to deliver.

## Technical Architecture and Multi-Agent Design

The solution employs a sophisticated multi-agent architecture built on Amazon Bedrock, demonstrating a production-grade approach to orchestrating multiple specialized AI agents. At the center of the architecture is a **supervisor agent** that serves as the central coordination component, responsible for overseeing conversation flow, delegating tasks to specialized sub-agents, and maintaining seamless communication between components. This supervisor pattern is a common approach in production multi-agent systems to manage complexity and ensure coherent user experiences.

The system includes three specialized sub-agents, each with distinct responsibilities:

- The **data agent** handles information retrieval by interacting with GET APIs to fetch data such as scheduled backup jobs, backup status, and other operational details. This agent focuses on read-only operations that provide users with current system state information.

- The **help agent** provides guidance on best practices, step-by-step instructions, and troubleshooting tips by drawing upon an extensive knowledge base containing API documentation, user manuals, and FAQs. This agent represents the retrieval-augmented generation (RAG) component of the system, leveraging Amazon Bedrock Knowledge Bases to deliver context-specific assistance.

- The **action agent** handles critical operations by interacting with POST API endpoints to execute actions like initiating backup jobs or modifying data protection policies. The separation of this agent from the data agent reflects sound production practices around safety and control, as write operations carry higher risk than read operations.

The architecture incorporates Amazon Bedrock AgentCore Runtime and Amazon Bedrock AgentCore Gateway for robust agent orchestration and management, providing the infrastructure necessary to coordinate these multiple agents in production scenarios.

## Dynamic API Selection and Semantic Routing

A particularly sophisticated aspect of the implementation is the dynamic API selection process, which represents a critical production challenge when building systems that must interact with large numbers of backend APIs. Both the data agent and action agent are equipped with this capability, which uses semantic search over API documentation stored in Bedrock Knowledge Bases.

The workflow operates as follows: when an input query is received, the system performs semantic search to retrieve the top K relevant APIs from the knowledge base. This semantic search capability enables context-aware API selection rather than relying on rigid keyword matching or manual routing rules. Once candidate APIs are identified, the agent prompts the LLM to parse these candidates and finalize API selection along with the required parameters. This two-stage approach—semantic retrieval followed by LLM-based reasoning—balances efficiency with accuracy, as the semantic search narrows the solution space before the more computationally expensive LLM reasoning occurs.

The knowledge base contains comprehensive information about available APIs, their functionalities, and optimal usage patterns. This approach to dynamic tool selection demonstrates a practical pattern for production LLM systems that must interface with complex backend systems: rather than hardcoding API routing logic, the system embeds API knowledge in a retrievable format and uses LLM reasoning to make context-aware decisions.

## Human-in-the-Loop Safety Mechanisms

The architecture incorporates explicit human-in-the-loop controls, particularly for critical actions. The system includes a user feedback node where users can provide additional information or explicit approvals before the copilot performs sensitive operations like modifying policies or initiating backup jobs. This design reflects mature production thinking around AI safety and control, recognizing that while AI can accelerate operations, certain high-stakes actions require explicit human authorization.

This approach balances automation with control, allowing the system to handle routine inquiries and information retrieval autonomously while ensuring human oversight for operations that could have significant business impact if executed incorrectly.

## Evaluation Methodology and Model Selection

The case study provides detailed insight into the evaluation process, which focuses on assessing performance at multiple levels of granularity. The evaluation methodology follows standard software engineering practices adapted for AI systems:

- **Unit testing** validates individual components in isolation, including individual agents, data extraction capabilities, and API selection accuracy
- **Integration testing** validates communication and data flow between components
- **System testing** executes end-to-end scenarios simulating real-world user workflows

A particularly informative aspect of the case study is the detailed model selection analysis for the dynamic API selection component. The team tested multiple models from both the Amazon Nova family and Anthropic Claude family, benchmarking against ground truth created using Claude Sonnet 3.7. This represents sound LLM engineering practice: establishing ground truth with a strong model, then evaluating whether smaller, faster, or cheaper models can achieve acceptable performance for production deployment.

The findings reveal important tradeoffs in production model selection. Smaller models like Nova Lite and Claude Haiku 3 achieved perfect accuracy in selecting the correct API, but struggled with parameter parsing—extracting and formatting the specific parameters required to actually invoke the API correctly. When parameter parsing was included in the accuracy calculation, overall API selection accuracy dropped to 81% for Nova Micro, 88% for Nova Lite, and 93% for Nova Pro. Claude Haiku 3, Haiku 3.5, and Sonnet 3.5 showed comparable performance at 91-92% accuracy.

The team identified Nova Pro as providing an optimal tradeoff between accuracy and latency, with average response time just over one second. In contrast, Sonnet 3.5 had eight-second latency, though the team noted this was partly due to more verbose output (291 tokens on average versus 86 tokens for Nova Pro). The observation that prompt optimization could potentially reduce Sonnet 3.5's verbosity and thus latency demonstrates practical LLMOps thinking about system optimization.

This detailed model comparison illustrates a critical production consideration: the "best" model depends on specific task requirements and operational constraints. For a component like API selection that sits in the critical path of every user interaction, latency matters significantly, and a model with 93% accuracy and one-second latency may be preferable to one with 92% accuracy and eight-second latency, even if the latter produces more comprehensive outputs.

## End-to-End System Evaluation

For end-to-end system testing, the team engaged human subject matter experts familiar with the system to assess performance based on completeness, accuracy, and relevance. Across 11 challenging questions during initial development, the system achieved average scores of 3.3 out of 5 across these dimensions. The team characterized this as "solid performance considering the evaluation was conducted in the early stages of development."

This approach to evaluation reflects mature thinking about AI system assessment. While the 3.3/5 score might seem modest, the team appropriately contextualizes this as early-stage performance and emphasizes the importance of human expert evaluation for complex systems where automated metrics may not capture all aspects of quality. The use of human evaluators who are domain experts ensures that evaluation accounts for nuances in data protection workflows that might be missed by generic evaluation frameworks.

However, from a critical LLMOps perspective, the case study would benefit from more detail about evaluation methodology. The text doesn't specify the scoring rubric used, how many evaluators assessed each response, whether inter-rater reliability was measured, or what specific aspects of "completeness, accuracy, and relevance" were assessed. The small sample size of 11 questions, while reasonable for early development, raises questions about statistical significance and coverage of the full operational scenario space. Production deployments would benefit from larger-scale evaluation with more detailed methodology disclosure.

## Claimed Business Impact and Critical Assessment

The blog post makes several specific claims about business impact and operational improvements:

- 90% of routine data protection tasks executable through natural language interactions
- Reduction in average time-to-resolution for data security issues by up to 70%
- Acceleration of backup troubleshooting from hours to minutes

From a balanced assessment perspective, these claims should be viewed with appropriate skepticism. The case study is written as a collaboration between Druva and AWS and serves promotional purposes for both organizations. The blog post is dated November 14, 2025, but uses language suggesting the system is still in development ("Druva is developing," "aims to redefine," "will provide") rather than fully deployed in production. The evaluation results presented are from "initial development phase," not production deployment with actual customers.

The specific quantitative claims (90% of tasks, 70% reduction in time-to-resolution) are not backed by detailed methodology or data in the blog post. It's unclear whether these represent actual measured outcomes from pilot deployments, projections based on limited testing, or aspirational goals. The example of reducing investigation time "from hours to minutes" for the financial services company is presented as a hypothetical scenario ("they could simply ask") rather than a documented case.

This doesn't mean the technology is ineffective—the architectural approach is sound and the evaluation methodology shows rigor—but readers should distinguish between demonstrated capabilities (93% API selection accuracy with Nova Pro, 3.3/5 expert ratings in early testing) and projected business impact claims that may not yet be validated at production scale.

## Production Considerations and Scalability

The case study identifies "scalable and efficient operations" as a key opportunity, noting that the AI-powered solution can handle large volumes of customer inquiries simultaneously. This is an important production consideration, as multi-agent systems with multiple LLM calls can face scalability challenges. The use of Amazon Bedrock provides managed infrastructure that can help address scalability, but the case study doesn't provide specific performance metrics around throughput, concurrent user handling, or infrastructure costs.

The dynamic API selection approach, while sophisticated, adds complexity and latency to every user interaction. Each query requires semantic search over the knowledge base, retrieval of top K APIs, and LLM reasoning to finalize selection. This pipeline must execute reliably at scale, and the one-second latency reported for Nova Pro represents only the API selection component, not the full end-to-end interaction time including agent coordination and actual API execution.

## Knowledge Management and RAG Implementation

The system uses Amazon Bedrock Knowledge Bases to store API documentation, user manuals, and FAQs that power the help agent and inform the dynamic API selection process. This represents a practical application of RAG patterns in production, where up-to-date documentation is embedded and made semantically searchable. The case study doesn't detail the knowledge base construction process, embedding model selection, chunking strategies, or update procedures, but these would be critical considerations for production deployment.

As Druva's APIs evolve, documentation changes, and new features are added, the knowledge base must be maintained to ensure the system continues providing accurate guidance. The blog post doesn't address knowledge base versioning, update frequency, or validation processes to ensure retrieved information remains current and accurate.

## Conclusion and Production Readiness Assessment

This case study demonstrates a technically sophisticated approach to building multi-agent LLM systems for enterprise operations, with thoughtful architectural decisions around agent specialization, dynamic tool selection, human-in-the-loop controls, and systematic evaluation. The detailed model selection analysis provides valuable insights into practical tradeoffs in production model deployment.

However, the system appears to be in development or early deployment stages rather than fully production-proven. The evaluation is limited in scope (11 questions, early development phase), business impact claims are not fully substantiated, and the blog post uses future-oriented language suggesting ongoing development. The technology foundations are solid and the approach is sound, but organizations considering similar implementations should focus on the demonstrated technical capabilities (architecture patterns, model selection methodology, evaluation frameworks) rather than the projected business outcomes, which remain to be validated at production scale with diverse customer workloads.

The case study is most valuable as a reference architecture for building multi-agent systems with AWS Bedrock, demonstrating how to structure agent responsibilities, implement dynamic tool selection, and approach systematic evaluation. It represents meaningful progress in applying LLMs to complex operational domains, while acknowledging through its early-stage evaluation results that significant development work remains to achieve production-grade performance across the full range of customer scenarios.