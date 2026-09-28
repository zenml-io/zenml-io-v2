---
title: "Governed Self-Service AI Agents for a Regulated Insurance Broker"
slug: "governed-self-service-ai-agents-for-a-regulated-insurance-broker"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "regulatory-compliance"
  - "chatbot"
  - "question-answering"
  - "summarization"
  - "data-analysis"
  - "structured-output"
  - "unstructured-data"
  - "legacy-system-integration"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "cost-optimization"
  - "token-optimization"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "serverless"
  - "scaling"
  - "open-source"
  - "security"
  - "compliance"
  - "reliability"
  - "scalability"
  - "orchestration"
  - "monitoring"
  - "postgresql"
  - "redis"
  - "cache"
  - "amazon-aws"
industryTags: "insurance"
company: "MRH Trowe"
summary: "MRH Trowe needed to give employees practical access to generative AI without exposing sensitive insurance and client information through unmanaged tools. It deployed a centrally governed platform combining LibreChat, Strands Agents, Amazon Bedrock AgentCore, AWS networking and identity controls, and multiple storage and retrieval services. The first production agent converts Microsoft Teams meeting transcripts into structured minutes while enforcing employee-level access and German data residency. The environment reached approximately 400 employees in its first month, with reported infrastructure and token costs of about $14 per seat per month, although the source provides limited independent evidence about productivity gains, response quality, or the effectiveness of the proposed future cost reductions."
link: "https://aws.amazon.com/blogs/machine-learning/how-mrh-trowe-enabled-secure-self-service-ai-agents-in-financial-services/"
year: 2026
seo:
  title: "MRH Trowe: Governed Self-Service AI Agents for a Regulated Insurance Broker - ZenML LLMOps Database"
  description: "MRH Trowe needed to give employees practical access to generative AI without exposing sensitive insurance and client information through unmanaged tools. It deployed a centrally governed platform combining LibreChat, Strands Agents, Amazon Bedrock AgentCore, AWS networking and identity controls, and multiple storage and retrieval services. The first production agent converts Microsoft Teams meeting transcripts into structured minutes while enforcing employee-level access and German data residency. The environment reached approximately 400 employees in its first month, with reported infrastructure and token costs of about $14 per seat per month, although the source provides limited independent evidence about productivity gains, response quality, or the effectiveness of the proposed future cost reductions."
  canonical: "https://www.zenml.io/llmops-database/governed-self-service-ai-agents-for-a-regulated-insurance-broker"
  ogTitle: "MRH Trowe: Governed Self-Service AI Agents for a Regulated Insurance Broker - ZenML LLMOps Database"
  ogDescription: "MRH Trowe needed to give employees practical access to generative AI without exposing sensitive insurance and client information through unmanaged tools. It deployed a centrally governed platform combining LibreChat, Strands Agents, Amazon Bedrock AgentCore, AWS networking and identity controls, and multiple storage and retrieval services. The first production agent converts Microsoft Teams meeting transcripts into structured minutes while enforcing employee-level access and German data residency. The environment reached approximately 400 employees in its first month, with reported infrastructure and token costs of about $14 per seat per month, although the source provides limited independent evidence about productivity gains, response quality, or the effectiveness of the proposed future cost reductions."
notion:
  pageId: "3e9f8dff-2538-802f-8cb7-f457e875cf6b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:14:00.000Z"
  lastEditedTime: "2026-09-28T08:14:00.000Z"
  publishedAt: "2026-09-28T08:25:42Z"
---

## Overview

MRH Trowe is a Germany-focused commercial and industrial insurance broker operating across Germany, Switzerland, and Austria. As employee demand for generative AI increased, teams were beginning to experiment with separate tools, creating risks around sensitive client data, inconsistent access controls, fragmented administration, and unpredictable spending. The company wanted employees to build and use agents with limited technical expertise, while retaining centralized governance appropriate for a regulated financial-services environment.

MRH Trowe addressed this by creating a shared production platform rather than deploying isolated chatbots. The platform combines the open-source Strands Agents SDK for agent development, Amazon Bedrock AgentCore for managed runtime execution, and LibreChat as the employee-facing interface. The initial production use case retrieves an employee’s Microsoft Teams meeting and transcript, then generates structured minutes containing the date, participants, agenda, discussion topics, and action items. The deployment reportedly provided access to approximately 400 employees during its first month and incurred infrastructure-and-token costs of about $14 per seat per month. These are useful operational indicators, but the source does not provide an independently verified productivity baseline, quality evaluation, error rate, latency distribution, or evidence that the meeting-minutes workflow consistently produces reliable records.

## Problem and operational requirements

The central challenge was to make AI broadly available without allowing ungoverned access to internal systems and confidential insurance information. A conventional chat interface would primarily expose general-purpose model knowledge and would not, by itself, provide the contextual grounding, tool access, multi-step orchestration, or authorization boundaries needed for business workflows. MRH Trowe therefore required a system that could answer questions using internal data, connect to institutional repositories and business systems, execute multi-step tasks, and remain manageable as adoption expanded.

The organization also had to address practical LLMOps concerns. Different teams needed the ability to create or request new agents without repeatedly modifying the core chat application. Administrators needed a way to control which users could access specific models and endpoints, monitor token consumption and cost, and avoid shadow AI deployments. Data protection and regional processing were particularly important: the described implementation keeps the agents, models, and data in the AWS Europe (Frankfurt) Region, subject to the availability and configuration of the selected services and models.

## Architecture and production serving

The solution is deployed in a single AWS account and uses a VPC-based architecture. Employees connect from the corporate network through a transit-gateway design and a zero-trust provider. An internal Application Load Balancer routes traffic to the private application tier, keeping the described access path off the public internet. This network design reduces exposure, but it should not be interpreted as a complete security assessment: the source does not describe all firewall rules, secrets management, audit-log retention, threat detection, or disaster-recovery procedures.

The application tier runs LibreChat as containerized services on Amazon Elastic Container Service with AWS Fargate. In addition to the main LibreChat service, the deployment includes a retrieval-augmented generation API and MeiliSearch for fast text search without vectorizing the indexed data. LibreChat provides the user-facing experience and several governance functions, including user management, access controls, token budgets, conversation organization, multi-model support, and a customizable branded interface. Supporting services include Amazon DocumentDB with MongoDB compatibility for users, sessions, and conversations; Amazon ElastiCache for caching and session state; Amazon RDS for PostgreSQL as the relational and vector store for documents uploaded to the LibreChat RAG API; Amazon OpenSearch Service as the vector store for Bedrock retrieval over Confluence content; Amazon EFS for MeiliSearch indexes; and Amazon S3 for uploaded files and chat artifacts.

Agents are developed with Strands Agents and hosted on the Amazon Bedrock AgentCore runtime. LibreChat invokes them through custom endpoints backed by Amazon API Gateway and AWS Lambda. This separation is operationally significant: new agents can be made available in LibreChat without updating or taking down the main chat application. Agent teams can therefore deploy individual agent applications independently, while the shared interface, identity integration, and administrative controls remain centralized. AgentCore is described as providing compute- and filesystem-level isolation for each agent session and supporting a consumption-based operating model. The source presents these capabilities as key reasons for selecting the service, but it does not provide detailed isolation test results, service-level objectives, or a comparison with alternative runtimes.

A simplified request path is:

- An employee selects an agent in LibreChat and submits a request.
- LibreChat authenticates the employee through Microsoft Entra ID and applies administrator-configured access-control lists for models and endpoints.
- LibreChat calls the relevant API Gateway endpoint, using an API key or, where supported, an on-behalf-of authentication flow.
- AWS Lambda assumes an IAM role and invokes the Strands agent on AgentCore Runtime.
- The agent reasons over the request, calls authorized tools and data sources, and returns the result to LibreChat within the governed session.

## Identity, authorization, and data protection

The meeting-minutes agent is designed to perform actions as the signed-in employee rather than as a broadly privileged service account. LibreChat passes the authenticated identity to the agent server-side, and the identity cannot be supplied or overridden in the chat prompt. Consequently, the agent is intended to retrieve only the employee’s own calendar and meeting transcript data. This is an important control for a workflow involving personal calendars and internal meeting content, though the case study does not document negative authorization tests, delegated-permission configuration, or how access is handled when a user changes roles or leaves the organization.

The stated data-residency design keeps processing in AWS Europe (Frankfurt), including the agents, selected foundation models, and data used by the workflow. Private connectivity, Microsoft Entra ID authentication, Active Directory group-based roles, LibreChat ACLs, IAM roles, and AgentCore session isolation create multiple control layers. Centralizing the service also gives the organization a common place to manage model access, token budgets, agents, and usage. These mechanisms support a regulated deployment, but “secure” and “compliant” are not automatic outcomes of using the named services. MRH Trowe would still need appropriate configuration, logging, retention policies, vendor and model risk reviews, prompt and output controls, incident response, and human oversight for consequential insurance work. The source does not state whether generated meeting minutes are automatically approved, stored as authoritative records, or reviewed by employees before reuse.

## Retrieval and agent use cases

The first production agent demonstrates tool-using orchestration rather than simple question answering. An employee asks in German for a recent meeting with a specified participant. The agent searches the employee’s calendar, obtains the corresponding transcript, and produces a structured summary. The workflow combines identity-aware system access, retrieval of unstructured transcript content, model-based summarization, and formatting into a business-ready artifact. It turns a manual post-meeting activity into a one-line request, although the source does not quantify time saved or compare the generated summaries with human-authored minutes.

The platform also supports retrieval over uploaded documents and Confluence content. PostgreSQL is used as the vector store for the LibreChat RAG API, while OpenSearch stores vectors for Bedrock retrieval over Confluence-ingested content. MeiliSearch is used for text search in part of the application and, according to the description, avoids vectorizing that data. The architecture therefore supports multiple retrieval paths rather than forcing every source into one index. That flexibility can be useful, but it increases operational complexity around ingestion schedules, document permissions, chunking, embedding-model changes, freshness, duplicate content, and retrieval evaluation. The case study does not report grounding accuracy, citation coverage, retrieval recall, or hallucination rates.

A later “talk to your data” use case is intended to support analyses such as cross-sell and upsell reviews by combining CRM data with publicly available information. This extends the platform from personal productivity into business analysis and raises additional concerns about source provenance, authorization across CRM records, data quality, potentially sensitive inferences, and the need to distinguish model-generated suggestions from validated commercial decisions. The described architecture establishes a foundation for the use case but does not supply results demonstrating its business value or analytical reliability.

## Adoption, observability, and cost management

MRH Trowe paired the technical rollout with organizational change. It ran use-case workshops, developed a power-user community, and used adoption data to identify workflows that could be shared more widely. A usage dashboard tracks unique users, token consumption by model, unique chats, and cost per user. These measurements are valuable LLMOps signals because model choice, prompt length, retrieval context, and agent-tool usage can materially affect both quality and cost. LibreChat token budgets provide an additional guardrail against unexpected consumption.

The reported initial cost was approximately $14 per seat per month for infrastructure and tokens. The post describes a potential infrastructure reduction of approximately 40 percent through right-sizing and scheduled scaling, but this is a planned or projected optimization rather than a demonstrated production result. Per-seat cost can also obscure variation between light and heavy users, model-specific pricing, retrieval and storage expenses, idle capacity, and the cost of operating the surrounding AWS services. A robust financial review would segment usage by model, agent, request type, and workload, and would track both infrastructure cost and the value or time saved by each workflow.

The planned Data and AI Community of Practice aims to have 10–15 agents created and maintained by subject-matter experts by the end of 2026. This model may accelerate domain-specific experimentation, but it introduces an agent lifecycle-management requirement. Each agent needs an owner, documented purpose, approved data sources and tools, access policy, prompt and model version, test cases, monitoring, rollback process, and retirement criteria. The source emphasizes the ability to add agents independently, but it does not describe a formal evaluation gate or production change-management process.

## Results and tradeoffs

The reported outcome is a centrally governed AI environment made available to roughly 400 employees in the first month, with a working meeting-transcription workflow, regional processing in Germany, identity-aware access to employee data, and usage and cost visibility. The combination of open-source components and managed AWS runtime services gives MRH Trowe flexibility in the user interface and agent framework while reducing the need to operate all runtime infrastructure itself. Model choice and multi-model support also reduce dependence on a single model provider at the application layer, although the deployment remains substantially dependent on AWS services and regional availability.

The tradeoff is a relatively complex platform. DocumentDB, ElastiCache, PostgreSQL, OpenSearch, EFS, S3, ECS, Fargate, Lambda, API Gateway, networking services, identity systems, LibreChat, Strands, and AgentCore each add configuration and operational responsibilities. Multiple databases and retrieval mechanisms can improve fit for different workloads, but they also expand the security boundary and the number of components that must be monitored and kept consistent. Open-source software can improve control and customization, while requiring MRH Trowe to manage integration, patching, support, and compatibility risks.

Overall, the case is a credible example of putting identity-aware, tool-using agents into production inside a regulated insurance organization. Its strongest evidence concerns deployment scale, architecture, and reported cost. Its weaker areas are conventional LLM quality and safety measurements: no task-success rate, latency target, hallucination measurement, retrieval benchmark, user-satisfaction score, incident history, or independently validated return-on-investment figure is provided. The platform appears to establish a practical LLMOps foundation, but continued success will depend on disciplined evaluation, least-privilege access, monitoring, human review for sensitive outputs, and lifecycle governance as the number of agents and data sources grows.
