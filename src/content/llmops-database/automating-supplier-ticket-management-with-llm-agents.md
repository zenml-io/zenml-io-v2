---
title: "Automating Supplier Ticket Management with LLM Agents"
slug: "automating-supplier-ticket-management-with-llm-agents"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ada698cbf51555477c0ff"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:46.686Z"
  createdOn: "2025-12-23T18:07:37.195Z"
llmopsTags:
  - "customer-support"
  - "classification"
  - "chatbot"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "langchain"
  - "databases"
  - "api-gateway"
  - "monitoring"
  - "orchestration"
  - "open-source"
  - "reliability"
  - "google-gcp"
industryTags: "e-commerce"
company: "Wayfair"
summary: "Wayfair developed Wilma, an LLM-based ticket automation system, to automate the manual triage of supplier support tickets in their SupportHub JIRA-based system. The solution uses LangGraph to orchestrate LLM calls and tool interactions for intent classification, language detection, and supplier ID lookup through a ReAct agent with BigQuery access. The system achieved better-than-human performance with 93% accuracy on question type identification (vs. 75% human accuracy), 98% on language detection, and 88% on supplier ID identification, while reducing processing time and allowing associates to focus on higher-value work."
link: "https://www.aboutwayfair.com/careers/tech-blog/automating-supplier-ticket-management-with-llm-agents-lessons-from-the-field"
year: 2025
seo:
  title: "Wayfair: Automating Supplier Ticket Management with LLM Agents - ZenML LLMOps Database"
  description: "Wayfair developed Wilma, an LLM-based ticket automation system, to automate the manual triage of supplier support tickets in their SupportHub JIRA-based system. The solution uses LangGraph to orchestrate LLM calls and tool interactions for intent classification, language detection, and supplier ID lookup through a ReAct agent with BigQuery access. The system achieved better-than-human performance with 93% accuracy on question type identification (vs. 75% human accuracy), 98% on language detection, and 88% on supplier ID identification, while reducing processing time and allowing associates to focus on higher-value work."
  canonical: "https://www.zenml.io/llmops-database/automating-supplier-ticket-management-with-llm-agents"
  ogTitle: "Wayfair: Automating Supplier Ticket Management with LLM Agents - ZenML LLMOps Database"
  ogDescription: "Wayfair developed Wilma, an LLM-based ticket automation system, to automate the manual triage of supplier support tickets in their SupportHub JIRA-based system. The solution uses LangGraph to orchestrate LLM calls and tool interactions for intent classification, language detection, and supplier ID lookup through a ReAct agent with BigQuery access. The system achieved better-than-human performance with 93% accuracy on question type identification (vs. 75% human accuracy), 98% on language detection, and 88% on supplier ID identification, while reducing processing time and allowing associates to focus on higher-value work."
---

## Overview and Business Context

Wayfair's case study describes the development and deployment of Wilma, an LLM-powered automation system designed to handle supplier ticket triage in their SupportHub platform. The company recognizes suppliers (manufacturers who list products on Wayfair) as customers requiring dedicated support. Prior to Wilma, supplier associates manually performed repetitive triage tasks including reviewing unstructured ticket information, querying databases, and populating structured fields such as supplier ID, primary question type, and preferred language. While acknowledging that some supplier associate work requires skill and expertise, Wayfair identified this triage work as "boring rote work" suitable for automation to reduce response times, lower costs, and improve accuracy.

The case study provides valuable insights into production LLM deployment, particularly around architectural decisions, observability practices, and the evolution from pure agentic systems to hybrid workflow approaches. The blog post was published in October 2025, representing relatively recent production experience with LLM agent systems at scale in an e-commerce environment.

## Technical Architecture and Implementation

Wayfair built an event-driven architecture for Wilma that integrates multiple components. When suppliers email Wayfair, a new ticket is created in SupportHub (their JIRA-based ticketing system), triggering a webhook that publishes an event to a Pub/Sub topic. A Pub/Sub consumer listens for new ticket creation events and invokes a LangGraph graph that orchestrates the entire automation workflow.

The core processing pipeline consists of four main steps. First, an LLM performs intent classification to identify the question type from 81 possible categories. Second, another LLM call identifies the supplier's preferred language. Third, and most complex, a ReAct agent with BigQuery access determines the supplier ID through iterative reasoning and querying. Finally, the system uses the JIRA API to update the ticket with the populated structured fields.

The supplier ID lookup represents the most sophisticated component of the system. The ReAct (reasoning and acting) agent receives a high-level task—"Identify the supplier ID given the information on the ticket"—along with access to a BigQuery tool. The agent demonstrates iterative problem-solving capabilities, as illustrated in their example where it first attempts to look up a supplier ID using a SKU from the ticket description, receives no results, reasons that it should try a different approach, and then successfully queries using the supplier's email address instead.

## Evolution from Agentic to Hybrid Architecture

The case study provides particularly valuable insights into the architectural evolution of the system, offering a balanced perspective on pure agentic versus workflow-based approaches. Initially, Wayfair adopted what they acknowledge as a "naive" fully agentic approach with multiple specialized agents coordinated by a supervisor agent. This design included a ticket management agent for SupportHub interactions, a classification agent for question type and language identification, and a supplier ID agent for database lookups. Each agent had the necessary tools, with a supervisor agent responsible for coordination.

This agentic approach offered advantages in simplicity of design and ease of extension. However, the team observed critical failure modes in production. Communication failures occurred when one agent provided information that another agent would ignore. Coordination problems emerged when the supervisor unnecessarily invoked agents multiple times. One specific example highlighted the brittleness: the classification agent correctly identified the language and passed it to the supervisor, which forwarded it to the ticket management agent, but that agent then used its own "judgment" to incorrectly decide not to call the JIRA API to update the ticket. This illustrates a key challenge in multi-agent systems where each agent's autonomy can lead to inconsistent behavior and unreliable execution.

To address these issues, Wayfair pivoted to a workflow approach with explicitly defined sequences of LLM and function calls rather than relying on agent-based orchestration. This workflow approach proved much more reliable, easier to debug, and more cost-effective by reducing unnecessary LLM calls. However, the team discovered that the rigid workflow struggled with edge cases. For instance, when a supplier email address contained a typo (e.g., "supplier@acme.con" instead of "supplier@acme.com"), the workflow would fail on the first lookup attempt, while the agentic approach had the intelligence to recognize the error, hypothesize about potential typos, and retry with variations.

The final production architecture represents a thoughtful hybrid approach that balances determinism with intelligent error handling. Wayfair implemented a workflow structure where one specific node—the supplier ID lookup—is itself a ReAct agent with BigQuery tool access. This design provides deterministic guarantees about the overall order of operations while allowing the embedded agent to try different querying strategies and reformulate queries based on observed results. This architecture choice exemplifies mature LLMOps thinking, recognizing that neither pure workflows nor pure agentic systems are optimal for all tasks within a complex automation pipeline.

## Performance and Business Impact

The system achieved impressive performance metrics that exceed human baseline performance in the triage tasks. Wilma correctly identifies question types 93% of the time across 81 possible categories, compared to only 75% accuracy for human associates. Language detection reaches 98% accuracy, and supplier ID identification achieves 88% accuracy. Beyond accuracy improvements, the system reduces ticket processing time and enables supplier associates to shift focus from manual data entry to complex problem-solving and high-value supplier interactions.

It's worth noting that the case study presents these metrics favorably without detailed discussion of error modes, false positive rates, or how the 7-12% error cases are handled in production. A balanced assessment would consider whether the remaining errors create downstream problems, how human oversight is maintained, and what fallback mechanisms exist when the system fails. The blog post doesn't address these operational considerations, which are critical for production LLM systems.

## Observability and Production Operations

Wayfair emphasizes the critical importance of observability for complex LLM execution graphs. They selected Arize as their observability platform, using it both during pre-launch development and for post-launch debugging. The team found that purpose-built UI for navigating and searching traces proved "much more effective than looking at raw output logs" once execution graphs become complicated. This represents a mature understanding that LLM system complexity requires specialized tooling beyond traditional logging and monitoring.

The observability implementation includes both reactive and proactive capabilities. For reactive debugging, the team uses Arize's trace visualization to understand multi-step execution flows. For proactive monitoring, they configured alerts for anomalous shifts in key metrics including token usage and latency. This dual approach to observability—supporting both troubleshooting and ongoing performance monitoring—reflects production-grade LLMOps practices.

However, the case study doesn't detail what specific metrics they track beyond token usage and latency, how they established baseline thresholds for anomaly detection, or how they handle alert fatigue. The discussion of observability, while highlighting its importance, remains somewhat high-level without diving into specific dashboards, metric definitions, or operational runbooks that would provide deeper insights into their production operations.

## Technology Stack and Integration

The technology choices reveal a modern cloud-native stack. LangGraph serves as the orchestration framework for LLM and tool calls, providing the graph abstraction for defining complex workflows. Google Cloud Pub/Sub handles event distribution in their event-driven architecture. BigQuery serves as the data warehouse that the ReAct agent queries to look up supplier information. JIRA provides the underlying ticketing platform through its API. Arize delivers observability and monitoring capabilities. The case study doesn't specify which LLM provider or models they use, which would be valuable information for understanding cost, latency, and capability tradeoffs.

The event-driven architecture using Pub/Sub allows for asynchronous processing and decoupling between ticket creation and automation execution. This design choice supports scalability and reliability, as the automation system can process tickets independently of the ticketing system's availability. The webhook-to-Pub/Sub-to-consumer pattern represents a standard cloud architecture for event processing at scale.

## Broader Context and Future Direction

Wayfair positions this ticket triage system as one instance of a broader LLM-based automation strategy across the company. They mention having additional systems deployed, including one that monitors customer-supplier interactions and flags when Wayfair associate intervention is needed. This suggests a systematic approach to identifying repetitive, rule-based human tasks suitable for LLM automation across various business functions including finance, logistics, and customer service.

The team signals plans to tackle increasingly complex problems as models improve and their expertise deepens. They specifically tease an upcoming blog post about applying LLM agents to credit disputes, which they describe as "complex and high stakes." This progression from relatively straightforward triage tasks to higher-stakes decision-making reflects common maturity curves in LLMOps adoption, where organizations start with lower-risk applications before moving to more critical use cases.

## Critical Assessment and Limitations

While the case study provides valuable technical insights, it adopts a predominantly positive framing that warrants balanced consideration. The performance metrics are impressive but presented without discussing error analysis, confusion matrices, or how the 7-12% failure cases manifest in production. Questions remain about how the system handles ambiguous cases, what happens when the supplier ID agent exhausts its querying strategies without finding a match, and whether human review mechanisms exist for low-confidence predictions.

The observability discussion, while emphasizing its importance, lacks operational depth about incident response, how they debug specific failure modes, or what metrics proved most valuable versus those that seemed important initially but turned out to be noise. The cost discussion is limited to noting that the workflow approach required fewer LLM calls than the fully agentic approach, without providing actual cost figures, token usage statistics, or ROI analysis.

The architectural evolution story—from pure agents to workflows to hybrid—provides genuine value for practitioners, but the case study doesn't discuss version management, A/B testing strategies, or how they safely deployed these significant architectural changes to a production system handling actual supplier tickets. The transition between architectures presumably involved risk, rollback capabilities, and careful validation that aren't described.

The case study also doesn't address data privacy considerations around supplier information, how they handle personally identifiable information in tickets, what data retention policies apply to LLM interactions, or whether they use fine-tuned models trained on proprietary Wayfair data versus general-purpose models with prompt engineering.

## LLMOps Maturity Indicators

Despite these gaps, the case study demonstrates several indicators of mature LLMOps practices. The event-driven architecture supports scalability and loose coupling. The investment in specialized observability tooling (Arize) rather than relying on generic logging shows understanding of LLM-specific operational needs. The willingness to iterate on architectural approaches and move away from an initially "naive" design demonstrates pragmatic engineering rather than dogmatic adherence to any particular paradigm.

The hybrid workflow-agent architecture represents sophisticated systems thinking, recognizing that different subtasks within a larger automation pipeline may benefit from different levels of autonomy and determinism. The use of LangGraph for orchestration provides a structured framework for managing complexity rather than ad-hoc chaining of LLM calls. The focus on comparing system performance to human baselines establishes clear success criteria and demonstrates that automation delivers measurable improvements rather than simply replacing humans at lower quality.

The integration with existing enterprise systems (JIRA, BigQuery) shows ability to deploy LLMs within complex organizational contexts rather than building isolated proof-of-concepts. The acknowledgment that some work requires "skill and knowledge" while other work is "boring rote work" demonstrates thoughtful analysis of which tasks are truly suitable for automation versus those that benefit from human expertise.

Overall, Wayfair's Wilma case study illustrates a production LLM system deployed at scale within a large e-commerce organization, with particular value in its honest discussion of architectural evolution and the tradeoffs between agentic and workflow-based approaches. While the case study could benefit from more critical examination of limitations and operational details, it provides practical insights for organizations building similar LLM-powered automation systems.