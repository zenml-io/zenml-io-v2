---
title: "Production AI Framework for Retail Banking Chatbot"
slug: "production-ai-framework-for-retail-banking-chatbot"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "fallback-strategies"
  - "evals"
  - "semantic-search"
  - "vector-search"
  - "crewai"
  - "langchain"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "orchestration"
  - "guardrails"
  - "documentation"
  - "open-source"
  - "databricks"
industryTags: "finance"
company: "Databricks"
summary: "A retail banking institution was struggling with a chatbot that failed to scale from demo to production, receiving 20,000 customer calls per month with 60% being simple queries that could be automated. The organization had spent $85K over 6 months on a failed POC that lacked proper observability, evaluation systems, and governance. By implementing a comprehensive five-pillar framework focused on evaluation-first development, distributed tracing, data foundation, multi-agent orchestration, and governance, the team successfully deployed a production-grade AI agent. The key innovation was selecting the model only in week seven of an eight-week POC, after establishing evaluation pipelines and success metrics. Post-launch, the system achieved the target deflection rates with 85% accuracy and enabled rapid diagnosis and resolution of production issues such as outdated policy documents in the vector database."
link: "https://www.youtube.com/watch?v=ObTPqBGsEbA"
year: 2026
seo:
  title: "Databricks: Production AI Framework for Retail Banking Chatbot - ZenML LLMOps Database"
  description: "A retail banking institution was struggling with a chatbot that failed to scale from demo to production, receiving 20,000 customer calls per month with 60% being simple queries that could be automated. The organization had spent $85K over 6 months on a failed POC that lacked proper observability, evaluation systems, and governance. By implementing a comprehensive five-pillar framework focused on evaluation-first development, distributed tracing, data foundation, multi-agent orchestration, and governance, the team successfully deployed a production-grade AI agent. The key innovation was selecting the model only in week seven of an eight-week POC, after establishing evaluation pipelines and success metrics. Post-launch, the system achieved the target deflection rates with 85% accuracy and enabled rapid diagnosis and resolution of production issues such as outdated policy documents in the vector database."
  canonical: "https://www.zenml.io/llmops-database/production-ai-framework-for-retail-banking-chatbot"
  ogTitle: "Databricks: Production AI Framework for Retail Banking Chatbot - ZenML LLMOps Database"
  ogDescription: "A retail banking institution was struggling with a chatbot that failed to scale from demo to production, receiving 20,000 customer calls per month with 60% being simple queries that could be automated. The organization had spent $85K over 6 months on a failed POC that lacked proper observability, evaluation systems, and governance. By implementing a comprehensive five-pillar framework focused on evaluation-first development, distributed tracing, data foundation, multi-agent orchestration, and governance, the team successfully deployed a production-grade AI agent. The key innovation was selecting the model only in week seven of an eight-week POC, after establishing evaluation pipelines and success metrics. Post-launch, the system achieved the target deflection rates with 85% accuracy and enabled rapid diagnosis and resolution of production issues such as outdated policy documents in the vector database."
notion:
  pageId: "383f8dff-2538-8066-bd42-f7c39198f73a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-18T16:26:00.000Z"
  lastEditedTime: "2026-06-18T16:26:00.000Z"
  publishedAt: "2026-06-19T11:08:44Z"
---

## Overview

This case study presents a comprehensive production AI framework developed through hands-on experience deploying generative AI systems in regulated industries, particularly focusing on a retail banking chatbot implementation. The presenter, a technical lead for data and AI at Databricks with prior experience at AWS, shares lessons learned from taking AI demos to production across B2B software and financial services organizations. The core problem addressed is the common pattern where organizations rush to choose models and build features in controlled environments, only to face significant challenges when deploying to production due to lack of observability, evaluation systems, and governance structures.

The specific case study centers on a retail banking client that was handling approximately 20,000 customer calls per month, with about 60% being simple queries like account balance checks and overdraft questions that could reasonably be automated. The organization had already invested $85K over six months in a failed proof-of-concept before engaging with the Databricks team. The failures stemmed from three critical gaps: an observability gap where teams couldn't trace AI decisions, an evaluation gap where success metrics were undefined or unmeasurable, and a governance gap where accountability for failures was unclear.

## The Five-Pillar Framework

The solution introduces a five-pillar framework that fundamentally reorders how AI projects should be approached, with evaluation coming first rather than model selection. This represents a significant departure from the typical pattern where organizations immediately debate between GPT, Claude, or other models before establishing how success will be measured.

**Pillar One: Evaluation as Specification**

The evaluation pillar treats measurement as the specification for the AI system, requiring teams to define success with concrete numbers before writing any code. For the retail banking chatbot, this meant establishing that the AI agent should handle 60% of simple user queries with 85% accuracy and specific latency targets. The team built an evaluation dataset by collecting 200 real cases of how human agents answered customer questions, capturing not just the answers but also how agents handled gray areas and edge cases. 

The evaluation architecture consists of three distinct layers. The first layer handles deterministic checks using traditional approaches like regular expressions for format validation and classic ML models for named entity recognition, PII detection, and intent classification. These are cheap, well-understood operations that should be executed first to filter out obvious issues. The second layer addresses non-deterministic semantic evaluation, primarily through LLM-as-judge implementations where a secondary LLM evaluates the primary model's responses against criteria like groundedness, safety, and relevance. The third layer covers behavioral evaluation, examining patterns like tool calling behavior, API call efficiency, and whether agents are getting stuck in loops. This behavioral layer proved critical in identifying that the agent was making three database calls instead of one to retrieve account balance information, a problem invisible to semantic evaluation but expensive at production scale.

The evaluation system is designed as a living, automated pipeline. User questions and AI responses are continuously captured, compared against the evaluation dataset, and automatically rated. When ratings fall below defined thresholds, human review is triggered. Critically, when issues are identified and resolved, the test case is added to the evaluation dataset, creating a continuously expanding test suite that captures institutional knowledge about edge cases and failure modes.

**Pillar Two: Observability and Distributed Tracing**

The observability pillar focuses on capturing every decision an AI agent makes through distributed tracing. The case study provides a detailed example of a customer requesting an overdraft fee waiver. With proper tracing enabled, the team could observe the complete decision chain: intent classification with confidence scores and latency, database API calls to retrieve customer account details, RAG queries to vector databases for policy document retrieval, reasoning steps, final guardrail checks, and response generation.

This level of visibility proved essential not only for debugging but also for regulatory compliance. In regulated industries like banking, regulators increasingly mandate the ability to explain every AI decision. Without tracing infrastructure, when customers dispute AI-generated responses, organizations have no way to investigate what happened and must resort to blanket concessions to maintain customer satisfaction.

The tracing infrastructure also enables online monitoring with automated fallback strategies. When the system detects patterns like duplicate API calls or failing service connections in production, it can apply circuit breaker patterns, retry logic with limits, or escalate to human operators. The case study mentions implementing Agent Evaluation Framework where traces can be automatically analyzed by LLM-as-judge systems to detect quality degradation before it significantly impacts customer experience.

**Pillar Three: Data Foundation Strategy**

The data foundation pillar represents where the team typically spends 60% of project time, reflecting the reality that enterprise data was built for human consumption rather than agent querying. The pillar divides data concerns into two categories: question data and tracking data.

Question data encompasses all information needed for the AI to generate responses, including pre-training data, post-training data, and API-accessible databases. The critical insight is that agents are far less forgiving than human users when encountering data quality issues. Where a human might notice incorrect information in a report and request a correction, an agent will confidently serve wrong answers based on stale or incorrect data. This became apparent in the case study when customer satisfaction scores dropped a few weeks post-launch because the bank had updated interest rate policies and communicated the changes to customers via email and mobile app notifications, but the updated policy documents were not embedded in the vector database. The agent continued serving answers based on outdated policies until the tracing and evaluation systems detected the drop in customer satisfaction and traced it to stale embeddings.

Tracking data refers to the observability and tracing information discussed in pillar two, but from a data strategy perspective. With hundreds of agents potentially running across an enterprise, organizations need a comprehensive strategy for collecting, structuring, and serving tracing data. The Databricks approach involves creating a centralized layer that ingests traces regardless of which framework agents use (LangChain, CrewAI, or others) or which cloud platform they run on. This centralized tracing data is then served to multiple consumers: operational dashboards for first-line support, SQL interfaces for business analysts, custom UIs built through coding agents, and automated evaluation systems running LLM-as-judge models.

The technical implementation leverages Databricks' open-source foundations including Apache Spark for distributed processing, Delta Lake for bringing database-like ACID properties to cloud storage, and MLflow for experiment tracking and model management. Unity Catalog sits as a governance layer providing centralized permissions, data sharing via Delta Sharing, and critically for AI applications, metadata tagging and discovery capabilities. When table and column descriptions are properly tagged in Unity Catalog (including PII tags), AI agents can leverage this context when querying tables, improving both accuracy and compliance.

**Pillar Four: Multi-Agent Orchestration**

The orchestration pillar addresses the exponential complexity increase when moving from single agents to multiple coordinated agents. While a single agent requires minimal orchestration thinking, deploying five agents introduces numerous coordination patterns, inter-agent communication protocols, dependency management, and state synchronization challenges.

The framework describes three primary orchestration patterns. The orchestrator-worker pattern employs a central orchestrator that controls all work distribution, routing requests to specialized agents based on their capabilities. This centralized control provides a single point for logging and debugging, making it easier to trace failures. The choreography pattern takes a decentralized approach where autonomous agents communicate through a message bus, listening for events relevant to their responsibilities. This pattern suits parallel, independent workflows like mortgage application processing where one agent handles customer details while another simultaneously processes approval requirements, reducing overall latency by eliminating orchestrator round-trips. The human-in-the-loop pattern triggers human intervention when agent confidence scores fall below defined thresholds, ensuring quality control for critical decisions.

The case study references a separate deep-dive video covering advanced topics like state management across distributed agents, fault tolerance patterns including saga pattern for multi-step transaction rollback, compensation patterns for correcting partial failures, and circuit breaker patterns for preventing cascade failures when downstream services are degraded.

**Pillar Five: Governance and Compliance**

The governance pillar extends beyond data governance to encompass AI-specific concerns around regulatory compliance, audit trails, change management, and incident response. The retail banking implementation detected 47 PII breaches during the testing phase by applying pre-validation checks using named entity recognition and traditional pattern matching.

Prompt versioning receives particular emphasis, with the framework treating prompts as code requiring formal change management. Rather than allowing quick commits with minimal messages, the governance model requires detailed commit messages explaining what failure triggered the prompt change, what specific issues the new version addresses, and what behavior changes are expected. This discipline proves essential when investigating production incidents and understanding the evolution of system behavior.

Model change management addresses the challenge of model provider upgrades. When providers like OpenAI or Anthropic release new model versions, enterprises cannot simply assume improved benchmark scores translate to better performance on their specific use cases and data. The evaluation dataset built in pillar one becomes the testing ground for new models, allowing teams to quantify performance changes before upgrading production systems. This also supports risk mitigation by maintaining the flexibility to switch between model providers based on empirical testing rather than vendor claims.

## Production Incident Response Playbook

A critical artifact from the framework is the production incident playbook defining the response sequence when failures occur. The workflow begins with detection through evaluation dashboards monitoring key metrics. Diagnosis uses distributed tracing to identify root causes. Containment leverages prompt versioning to roll back problematic changes, implements circuit breakers to isolate failures, or deflects traffic to human agents. The fix phase references the test case library and LLM-as-judge reports to understand what went wrong and implement corrections. Finally, new test cases are added to the evaluation dataset, ensuring the system learns from each incident.

The banking case study demonstrates this playbook in action during the policy document incident. Evaluation dashboards detected dropping customer satisfaction scores through negative feedback. Tracing systems allowed investigators to examine specific interactions where customers expressed dissatisfaction. The diagnosis revealed that the agent was retrieving outdated policy documents from the vector database because new embeddings had not been generated after a policy update. The containment strategy could have involved temporarily deflecting policy-related queries to human agents while the underlying data was fixed. The resolution involved regenerating embeddings with current policy documents and adding test cases to the evaluation suite that would catch future policy update delays.

Integration with existing IT Service Management (ITSM) systems ensures that production alerts reach appropriate personnel through established channels rather than requiring new notification infrastructure. This integration also helps protect downstream systems through coordinated incident response.

## Implementation Timeline and Model Selection

The eight-week POC timeline for the banking chatbot illustrates the evaluation-first approach in practice. Weeks one and two focused entirely on building the evaluation layer: collecting 200 cases of human agent interactions, defining success metrics including the 60% deflection rate and 85% accuracy target, and creating the automated evaluation pipeline. Weeks three and four addressed the data foundation, establishing API connections to customer databases with appropriate security, setting up distributed storage for tracing data, and implementing trace collection systems. Only in weeks seven and eight did the team begin discussing models, and at that point, the decision was rapid because they could empirically test different models against the evaluation dataset and calculate accuracy scores.

This contrasts sharply with the previous failed POC where the organization spent weeks debating model selection upfront without the infrastructure to objectively measure performance differences on their specific use cases.

## Cost Management and Practical Considerations

The framework acknowledges practical cost considerations, particularly around behavioral evaluation in layer three. Running comprehensive tool-calling and workflow analysis against a large evaluation dataset becomes expensive as the dataset grows to hundreds or thousands of test cases. The solution involves implementing graduated testing in continuous integration pipelines, where prompt changes trigger testing against a small subset of the evaluation data, with full dataset testing reserved for merges to the main branch. This balances thorough testing with manageable costs.

## Technology Stack and Tooling

While the case study is presented by Databricks and naturally features their technology stack, the framework principles are vendor-agnostic. The specific Databricks implementation uses MLflow for experiment tracking and providing out-of-box LLM-as-judge capabilities, Unity Catalog for data governance and metadata management that aids agent querying, Delta Lake for reliable data management at scale, and Agent Bricks as an integrated platform for production AI applications. The framework also mentions compatibility with multiple agent frameworks like LangChain and CrewAI, and deployment across AWS, Azure, and Google Cloud.

## Critical Success Factors and Lessons Learned

Three key lessons emerged from production deployments. First, the test case library must be treated as a living system with governance around categorization. As the dataset grows, organizing test cases by category (security, authentication, product knowledge, etc.) becomes essential for maintaining the ability to trace failures back to specific test scenarios. Without this organization, the evaluation dataset becomes difficult to navigate and maintain.

Second, prompt versioning requires discipline beyond typical Git commit practices. Detailed commit messages explaining the context and intent of changes prove invaluable when investigating incidents weeks or months later. Third, behavioral evaluation costs can spiral without controls, necessitating the graduated testing approach in CI/CD pipelines.

## Regulatory and Audit Considerations

The framework places significant emphasis on regulatory compliance, reflecting the speaker's experience in financial services where AI explainability is increasingly mandated. The audit trail capabilities enabled by comprehensive tracing address regulatory requirements while also providing operational benefits for debugging and optimization. The PII detection capabilities operating at the deterministic evaluation layer (layer one) provide a first line of defense that caught 47 breaches during testing, preventing potential regulatory violations and reputational damage.

## Business Outcomes and Validation

Six weeks post-launch, the retail banking chatbot met its operational targets for accuracy, deflection rate, response time, and customer satisfaction. More importantly, when customer satisfaction scores dropped due to the policy document issue, the evaluation and tracing infrastructure enabled rapid root cause analysis and resolution. Without these systems, the team would have had no visibility into why customer satisfaction was declining and no systematic way to diagnose and fix the underlying data freshness problem.

The framework has been implemented across multiple customer organizations in different industries, validating its applicability beyond the specific banking case study. The speaker offers downloadable artifacts including the production incident playbook, evaluation checklists, and guides for setting up tracing with open-source technologies, suggesting a mature, reusable methodology rather than a one-off implementation.
