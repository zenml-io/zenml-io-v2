---
title: "Building Agentic Workflows with Temporal for Data Infrastructure at Scale"
slug: "building-agentic-workflows-with-temporal-for-data-infrastructure-at-scale"
draft: false
llmopsTags:
  - "data-analysis"
  - "data-cleaning"
  - "chatbot"
  - "code-generation"
  - "content-moderation"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "evals"
  - "few-shot"
  - "semantic-search"
  - "embeddings"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "cicd"
  - "orchestration"
  - "devops"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "elasticsearch"
  - "langchain"
  - "openai"
  - "google-gcp"
  - "amazon-aws"
  - "anthropic"
industryTags: "e-commerce"
company: "Instacart"
summary: "Instacart runs 56 million workflows per day on self-hosted Temporal clusters to support mission-critical operations, and has evolved this infrastructure to support agentic AI workflows. The company faced the challenge of building reliable, durable LLM-based applications at scale while managing the non-deterministic nature of AI models. By treating LLM calls as Temporal activities and agent state as workflows, Instacart developed three core design patterns: human-in-the-loop workflows for config generation and metadata enrichment, ensemble evaluation systems for LLM quality assurance, and batch inference pipelines for large-scale data processing. These patterns leverage Temporal's primitives including signals, child workflows, and retry policies to provide the durability and reliability needed for production AI systems. The approach has enabled use cases ranging from automatic table description generation for thousands of database objects to real-time evaluation of internal chatbot conversations, all while maintaining full auditability and compliance."
link: "https://www.youtube.com/watch?v=PU1WWPCvSWY"
year: 2026
seo:
  title: "Instacart: Building Agentic Workflows with Temporal for Data Infrastructure at Scale - ZenML LLMOps Database"
  description: "Instacart runs 56 million workflows per day on self-hosted Temporal clusters to support mission-critical operations, and has evolved this infrastructure to support agentic AI workflows. The company faced the challenge of building reliable, durable LLM-based applications at scale while managing the non-deterministic nature of AI models. By treating LLM calls as Temporal activities and agent state as workflows, Instacart developed three core design patterns: human-in-the-loop workflows for config generation and metadata enrichment, ensemble evaluation systems for LLM quality assurance, and batch inference pipelines for large-scale data processing. These patterns leverage Temporal's primitives including signals, child workflows, and retry policies to provide the durability and reliability needed for production AI systems. The approach has enabled use cases ranging from automatic table description generation for thousands of database objects to real-time evaluation of internal chatbot conversations, all while maintaining full auditability and compliance."
  canonical: "https://www.zenml.io/llmops-database/building-agentic-workflows-with-temporal-for-data-infrastructure-at-scale"
  ogTitle: "Instacart: Building Agentic Workflows with Temporal for Data Infrastructure at Scale - ZenML LLMOps Database"
  ogDescription: "Instacart runs 56 million workflows per day on self-hosted Temporal clusters to support mission-critical operations, and has evolved this infrastructure to support agentic AI workflows. The company faced the challenge of building reliable, durable LLM-based applications at scale while managing the non-deterministic nature of AI models. By treating LLM calls as Temporal activities and agent state as workflows, Instacart developed three core design patterns: human-in-the-loop workflows for config generation and metadata enrichment, ensemble evaluation systems for LLM quality assurance, and batch inference pipelines for large-scale data processing. These patterns leverage Temporal's primitives including signals, child workflows, and retry policies to provide the durability and reliability needed for production AI systems. The approach has enabled use cases ranging from automatic table description generation for thousands of database objects to real-time evaluation of internal chatbot conversations, all while maintaining full auditability and compliance."
notion:
  pageId: "373f8dff-2538-803e-844b-efa83df48ba0"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:19:00.000Z"
  lastEditedTime: "2026-06-02T07:19:00.000Z"
  publishedAt: "2026-06-04T08:03:34Z"
---

## Overview

Instacart has developed a comprehensive approach to building production-scale agentic AI workflows using Temporal as the core orchestration platform. The company has been running Temporal in production since 2021, initially brought in when it was still a relatively young open-source project. Over nearly five years, Instacart has scaled to running approximately 56 million workflows per day across 45 different namespaces, with one of their largest namespaces processing close to 200,000 actions per second. This infrastructure supports mission-critical production workflows that execute with every customer order on the Instacart platform.

The evolution from traditional workflow orchestration to agentic AI workflows began at the end of 2022 with the emergence of ChatGPT, and accelerated in mid-2023 when OpenAI released their chat completions API. Multiple teams across Instacart began exploring how to integrate this revolutionary technology into their products and internal workflows. The data infrastructure organization, recognizing the need for durable, reliable execution of non-deterministic LLM calls, developed a mental model that treats LLM calls as Temporal activities and agent state as workflows. This thesis has proven robust as both the scale and complexity of their AI applications has increased over time.

## Infrastructure Architecture

Instacart runs Temporal on self-hosted clusters within AWS using a sophisticated architecture that has evolved over years of production experience. The deployment uses ECS tasks to run dockerized applications, with core Temporal services deployed in their own secured, isolated ECS cluster. This allows for more appropriate and granular resource sizing of the cluster. Each core service is dockerized and embedded into Instacart's own runtime, abstracted through internal libraries.

Access to the core Temporal services is exposed through an Application Load Balancer for both the UI and API endpoints, as well as internal admin services. The persistence layer uses Cassandra, with Elasticsearch provided through external vendors. The architecture is designed for high availability and redundancy at the cluster layer itself, running across multiple clusters.

For internal developers building applications on Temporal, Instacart has heavily abstracted the infrastructure complexity. Developers primarily concern themselves with writing Temporal workers, which they deploy in their own ECS clusters based on organizational boundaries. Teams like ads, core infrastructure, and customer-facing applications deploy workers within their own ECS clusters as ECS tasks. Workers can be implemented in any programming language that Temporal supports, with very granular networking and security connections granted into the Temporal ECS cluster using narrow-scope roles.

The infrastructure is heavily automated using Terraform, with the abstraction evolved to the point where deploying production-ready workers takes just a few lines of Terraform code. This configuration doesn't just deploy workers, but includes a complete set of alerts, monitoring artifacts, and dashboards as first-class citizens. The Terraform modules embed best practices for managing Temporal workers, allowing developers to focus on getting task queues right, properly distributing work across task queues, and implementing core workflow and business logic rather than infrastructure concerns.

## Use Cases Across Instacart

Temporal workflows are deeply integrated throughout Instacart's customer-facing and internal operations. When a customer places an order or opens the app, ads displayed involve Temporal workflows running behind the scenes. The moment an order is placed, payment reconciliation logic, ordering workflows, batching of orders, shipping to shoppers, and logistics and fulfillment all run through Temporal. Every Instacart order triggers multiple Temporal actions in the backend.

Beyond customer-facing workflows, internal teams heavily rely on Temporal. The entire CI/CD stack now runs on Temporal. A comprehensive data quality check system spanning multiple database systems runs all checks built on top of Temporal. More recently, LLM and agentic workflows have become major users of Temporal, spanning both user-facing and internal applications, finding particular value in the durability and reliability that Temporal provides as a platform.

## Core Thesis for Agentic Workflows

The fundamental thesis that Instacart developed centers on leveraging Temporal's core primitives to handle the unique challenges of LLM-based applications. LLM calls, while increasingly powerful, remain non-deterministic and can hallucinate, though hallucination rates have decreased over time. These calls require wrapping with retries, specific policies, health checks, heartbeats, and other reliability mechanisms.

The mental model treats the LLM call as a Temporal activity, with the workflow representing the agent state. This conceptual framework has proven increasingly valuable as scale and complexity have grown. Key Temporal primitives that provide particular value for agentic workflows include:

The event history provides complete observability into the entire workflow execution. Sophisticated retry policies can be wrapped around activities to handle the unreliable nature of external LLM API calls. Heartbeats and configurable timeouts ensure workflows don't hang indefinitely. The ability to fork workflows enables moving beyond simple single-loop patterns to more complex orchestrations with child workflows. Workflow patching allows safe evolution of workflow definitions over time. Signals and updates enable injection of external inputs, allowing workflows to pick up from specific points, which is particularly valuable for human-in-the-loop patterns.

While Temporal is not the only way engineers build agents at Instacart, with some teams using OpenAI's agent SDK or Google's ADK stack, the goal has been to demonstrate the value of using Temporal for production-scale, large-scale workflows by leveraging these primitives.

## Design Pattern: Human-in-the-Loop

The human-in-the-loop pattern represents one of the most prominent design patterns for agentic workflows at Instacart. This pattern gives an agent narrow, bounded work to perform, but keeps a human in the process to approve changes before they're committed. This maintains confidence in outputs while providing auditability and compliance.

A primary use case involves generating descriptions for database tables and columns. Instacart heavily uses dbt as a platform for transformations on Snowflake, and dbt has become increasingly good at surfacing metadata. However, many tables historically lacked proper descriptions, making it difficult for data engineers and analysts to understand what tables and columns represent. Not all engineers consistently add good descriptions as a practice.

The agentic workflow provides enough context to an LLM to generate a good first-pass description of what a table does, including examining upstream and downstream tables. When a data engineer visits one of Instacart's internal data portals and searches for a particular table, they see recommendations for possible descriptions for columns and tables. They have the ability to approve, disapprove, or suggest changes directly in the portal. Once changes are finalized, a pull request is created. The PR goes through its own approval process, and upon merge, the loop closes with full audit trails: who made the change, what the LLM originally generated, how it was overridden, and when it entered source code after running through CI checks.

This simple pipeline demonstrates the pattern's broader applicability. Additional use cases include generating configuration changes based on infrastructure analysis. The system might analyze workloads and suggest lowering CPU configurations or memory reservations to save costs on overprovisioned resources. Rather than asking teams to perform their own analysis following runbooks, the system creates PRs with proposed changes, performs testing through child workflows as part of the overall audit workflow, and ships changes once reviewed and approved.

A more sophisticated application of this pattern involves eval generation for domain-specific chatbots. Instacart has internal chatbot agents that perform analytics on internal data around cost optimization or business intelligence, backed by internal data warehouses through a semantic layer. All conversations are traced and land in LLM observability trace providers. A workflow audits all conversations over a defined period, compares them against existing evals that judge system quality, and suggests new evals or modifications to existing ones based on actual usage patterns. This creates a feedback loop mechanism that maintains system health before users encounter problems with unanswerable questions. This is particularly important for systems built for non-technical users like revenue operations or business development teams, where engineers may not intuitively know what kinds of questions will be asked.

Temporal signals are the key primitive enabling human-in-the-loop workflows with durability and reliability. Signals allow workflows to wait for human approval for days or months if needed. The level of customization available with signals and timers, including the ability for workflows to wake up and check for updates, and then proceed based on whether updates are confirmed by humans to approve or disapprove, enables further processing within the context of the same workflow. Integration with observability tools and auditing/compliance systems ensures every change goes through proper human and programmatic checks.

## Design Pattern: Ensemble Evaluation

Evaluation has evolved to become as important as durable agentic workflow execution itself. Given the non-deterministic nature of LLMs, constant testing is required to ensure answer quality and reduce hallucination rates. Academic research has increasingly focused on this topic, with practitioners discussing not just simple evals but domain-specific judges, combinations of deterministic and non-deterministic checks, and judges that sit on top to determine if the LLM performed adequately against a targeted specification.

Many teams don't stop at running a single judge, instead implementing ensemble evaluation models. One Instacart system runs an ensemble eval using Gemini, Claude, and OpenAI agents simultaneously. Based on heuristics, results can be combined using averaging, minimum, or maximum strategies across the judges depending on the specific use case. Running multiple evals through multiple judges and multiple LLM models at once creates a complex orchestration challenge.

From first principles, this is a quintessential Temporal problem: a workflow starts, spins up child workflows for scorers, scorers return answers, those answers go to LLM judges which may themselves be multiple child workflows, judges return results and record a final response that gets logged. This loop can run as part of live LLM conversations or as offline sync depending on latency and cost requirements.

Temporal primitives like child workflows, workflow patching, and the ability to patch workflows enable development of these critical LLM workflows with greater durability, reliability, and safety. One internal chatbot at Instacart runs both live evaluation and batch offline evaluation twice daily. During live conversations, at every turn the system fires off evaluations by taking the request and response context, parsing meaningful information, and running it through deterministic and non-deterministic checks.

Non-deterministic checks are particularly important because they must complete within latency bounds. Sending eval calls to advanced reasoning models might take several seconds, which may not meet latency requirements, so smaller mini models are used instead. Some checks can be performed at runtime in a more deterministic fashion, such as semantic keyword matching, regex matching, or PII checking. As conversations happen, asynchronous Temporal workflows fire off with tight latency bounds. The system cannot perform all checks in this loop, so it's selective. Results go to a judge that performs scoring and returns a value determining whether to show the response to the end user.

If latency bounds aren't met, the system can employ strategies seen in popular consumer-facing chat applications where the LLM gives a response but quickly retracts it, stating lack of confidence in the answer. This represents a typical use case when thinking from first principles about what's required when building agentic applications that need to scale live evaluation capabilities.

Offline evaluation represents larger-scale, time-intensive processing that constitutes a typical Temporal use case, running comprehensive evaluation suites that wouldn't be feasible in real-time conversation flows.

## Design Pattern: Batch Inference

Batch inference represents a traditional data infrastructure problem adapted for LLM workflows: processing millions of rows where work needs to be done on subsets. The pattern spins out child workflows for different batches, where each child workflow can have its own retry semantics. Use cases include generating scoring, performing data cleanup, or applying enrichment. Once all child workflows complete and all batches finish processing, results are collected. Within child workflow logic, LLM calls can perform enrichment, model scoring, or other AI-enhanced processing.

This represents pure scale challenges around large-scale data processing. While teams historically used Airflow for such workflows, when LLMs are involved, reliability and durability become paramount, which is where Temporal provides particular advantages over traditional data orchestration tools.

Instacart uses batch inference patterns for several applications. Shadow mode traffic checks compare yesterday's traffic patterns with today's to detect anomalies or changes. Embedding generation processes large batches of data and sends results to other systems, with LLMs in between performing semantic understanding before shipping final outputs. These are purely offline batch processing use cases that benefit from Temporal's reliability guarantees.

## Operational Challenges and Lessons

Running agentic workflows at scale presents significant operational challenges beyond the workflow layer itself. When implementing fanout patterns with batch inference and many child workflows, teams encountered rate limiting issues with AI gateways. Having thousands or even millions of LLM calls going out in parallel requires careful orchestration.

Addressing these challenges involves a tricky balancing act considering latency requirements, cost considerations, and infrastructure capacity. Solutions include choosing larger retry policies, redesigning batching strategies, adjusting the amount of context sent to models, and making thoughtful choices about model selection and architecture. The problem spans from infrastructure to application layers.

One principle that helped significantly is treating monitoring as a first-class citizen. For LLM workflows specifically, metrics are among the first items discussed when reviewing engineering design documents and workflow designs. This upfront focus on observability enables teams to quickly identify and address issues before they impact production workloads.

The challenge of getting started with Temporal for agentic workflows, particularly when selling the approach to managers or decision-makers, benefits from an incremental approach. Instacart started with a single workflow, the dataset description generation use case, and proved it at scale. Once one use case delivered value impacting a broad audience, it became easier to justify further investment in the Temporal infrastructure and the tooling that sits on top to integrate with the broader agentic stack.

## Infrastructure-as-Code and Developer Experience

Instacart's heavy reliance on infrastructure-as-code through Terraform has been critical to scaling Temporal adoption. The evolution of Terraform modules to the point where deploying production-grade workers requires only a few lines of configuration dramatically lowers the barrier to entry for teams wanting to leverage Temporal for their agentic workflows.

Developers receive not just deployed workers with ready access to Temporal clusters and orchestration capabilities, but a complete package including alerts, monitoring artifacts, dashboards, and embedded best practices. This abstraction allows developers to focus on the logic of their agentic applications rather than infrastructure concerns, while still ensuring production-readiness from an infrastructure perspective.

The abstraction extends to providing customizations, runbooks, and recommendations for managing Temporal workers, with best practices encoded directly into Terraform modules. Teams can deploy workers within their own managed ECS clusters with appropriate resource sizing, while benefiting from organizational knowledge about operating Temporal at scale.

## Integration with Broader AI Infrastructure

The agentic workflows built on Temporal integrate with Instacart's broader AI infrastructure stack. Internal chatbots abstract away different LLM models, not just OpenAI or Claude but also open-source models and offerings from Google. The first major AI application at Instacart was an internal chatbot using the chat completions API, initially following a simple request-response pattern before evolving toward more streamable interfaces and eventually agent-based architectures.

The evolution from simple request-response loops to streaming interfaces to cloud-based, continuously-running agents mirrors the broader industry trajectory. Temporal's primitives for handling this evolution, particularly signals and updates, enable reliable workflow progression as agent capabilities become more sophisticated.

Integration with LLM observability trace providers ensures that all agent interactions are captured, enabling both real-time monitoring and post-hoc analysis. This traceability feeds back into eval generation workflows, creating continuous improvement loops for agent quality.

## Key Takeaways and Production Learnings

Instacart's experience demonstrates that durability becomes critical when running large-scale workflows involving LLMs. The guarantees Temporal provides around reliability, scalability, and durability are essential for complex agentic workflows, particularly those that impact revenue or require high levels of trust. While these guarantees were valuable for traditional workflows, they become even more critical when non-deterministic LLM calls are involved.

Primitives like signals, child workflows, and workflow updates that were important for non-agent workflows become even more critical with agents and LLMs. They unlock the possibility of building more varied and sophisticated agentic workflows. From an agentic development perspective and mental model standpoint, these primitives feel like they should be core components of any agentic SDK. The core infrastructure and platform layer can sit at Temporal, but from a pure development experience, these primitives naturally align with how engineers think about building agent applications.

The approach of wrapping LLM capabilities with Temporal's reliability guarantees while leveraging primitives like signals for human approval, child workflows for parallel evaluation, and retry policies for handling API failures provides a robust foundation for production AI systems. This architecture has enabled Instacart to scale from initial chatbot experiments to running millions of agentic workflows daily across diverse use cases, all while maintaining the auditability, compliance, and reliability required for mission-critical applications.
