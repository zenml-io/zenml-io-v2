---
title: "AI-Powered Root Cause Analysis Assistant for Race Day Operations"
slug: "ai-powered-root-cause-analysis-assistant-for-race-day-operations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67b5fca349484ecb164871b2"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:00:48.934Z"
  createdOn: "2025-02-19T15:45:39.897Z"
llmopsTags:
  - "high-stakes-application"
  - "realtime-application"
  - "question-answering"
  - "rag"
  - "agent-based"
  - "prompt-engineering"
  - "error-handling"
  - "fallback-strategies"
  - "fastapi"
  - "monitoring"
  - "databases"
  - "cicd"
  - "reliability"
  - "postgresql"
  - "redis"
  - "elasticsearch"
  - "langchain"
  - "amazon-aws"
  - "anthropic"
industryTags: "automotive"
company: "Formula 1"
summary: "Formula 1 developed an AI-driven root cause analysis assistant using Amazon Bedrock to streamline issue resolution during race events. The solution reduced troubleshooting time from weeks to minutes by enabling engineers to query system issues using natural language, automatically checking system health, and providing remediation recommendations. The implementation combines ETL pipelines, RAG, and agentic capabilities to process logs and interact with internal systems, resulting in an 86% reduction in end-to-end resolution time."
link: "https://aws.amazon.com/blogs/machine-learning/how-formula-1-uses-generative-ai-to-accelerate-race-day-issue-resolution?tag=soumet-20"
year: 2025
seo:
  title: "Formula 1: AI-Powered Root Cause Analysis Assistant for Race Day Operations - ZenML LLMOps Database"
  description: "Formula 1 developed an AI-driven root cause analysis assistant using Amazon Bedrock to streamline issue resolution during race events. The solution reduced troubleshooting time from weeks to minutes by enabling engineers to query system issues using natural language, automatically checking system health, and providing remediation recommendations. The implementation combines ETL pipelines, RAG, and agentic capabilities to process logs and interact with internal systems, resulting in an 86% reduction in end-to-end resolution time."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-root-cause-analysis-assistant-for-race-day-operations"
  ogTitle: "Formula 1: AI-Powered Root Cause Analysis Assistant for Race Day Operations - ZenML LLMOps Database"
  ogDescription: "Formula 1 developed an AI-driven root cause analysis assistant using Amazon Bedrock to streamline issue resolution during race events. The solution reduced troubleshooting time from weeks to minutes by enabling engineers to query system issues using natural language, automatically checking system health, and providing remediation recommendations. The implementation combines ETL pipelines, RAG, and agentic capabilities to process logs and interact with internal systems, resulting in an 86% reduction in end-to-end resolution time."
---

## Overview

Formula 1 (F1), the premier motorsport racing organization, partnered with Amazon Web Services (AWS) to develop a generative AI-powered Root Cause Analysis (RCA) assistant designed to accelerate the resolution of operational IT issues during live race events. The high-stakes nature of F1 races demands near-perfect operational efficiency, as IT issues affecting services like the web API system can cascade to downstream products such as F1 TV, which provides live coverage and real-time telemetry to fans worldwide.

Before implementing the AI solution, F1's IT engineers faced a cumbersome manual troubleshooting process. Issues like network degradation or slow API response times required investigations spanning multiple teams—development, operations, infrastructure, and networking. Due to event schedules and change freeze periods, resolving a critical issue could take up to three weeks. The case study cites a specific recurring web API issue that consumed approximately 15 full engineer days to resolve through iterative log reviews, anomaly inspections, and fix implementations across several events.

The collaboration with AWS's Prototyping team spanned a 5-week prototype phase, aiming to demonstrate feasibility by replicating and automating the manual troubleshooting process for two candidate systems. The team documented real-life issues, creating flowcharts that outlined the troubleshooting process, involved teams and systems, required live checks, and log investigation requirements for each scenario.

## Technical Architecture and LLMOps Implementation

The RCA assistant is built on Amazon Bedrock, AWS's managed service for foundation models, utilizing an agentic RAG (Retrieval Augmented Generation) architecture. This approach combines the reasoning capabilities of large language models with the ability to query business data sources and interact with internal and external systems.

### Data Pipeline and ETL Processing

A critical component of the solution is the data preparation pipeline, which transforms raw log data into formats optimized for the AI assistant. Raw logs from various sources are centralized into an Amazon S3 bucket. An Amazon EventBridge schedule checks this bucket hourly for new files and triggers ETL pipelines built using AWS Glue and Apache Spark.

The data transformation follows a three-step process designed to improve chatbot accuracy and cost efficiency:

**Data Standardization**: Logs consumed from different sources arrive in varying formats, schemas, column names, and timestamp formats. The pipeline standardizes this data to a unified format, enabling Amazon Bedrock Knowledge Bases to ingest data consistently. This standardization helps the chat assistant understand the data more thoroughly, improving output accuracy.

**Data Filtering**: To enhance performance, the pipeline removes unnecessary data columns that the chat assistant won't use. For example, while HTTP request headers are included in logs, the assistant only needs specific fields like host and user agent. This filtering reduces the volume of data before ingestion into the knowledge base, lowering costs in the embeddings process since less data requires transformation and tokenization into the vector database.

**Data Aggregation**: Since users only need minute-level granularity when identifying problems, the pipeline aggregates data at the minute level. For instance, 60 API response time data points per minute are condensed to a single aggregated event containing attributes like maximum request fulfillment time. This focusing helps the assistant identify high response times while reducing the data volume to analyze.

Transformed logs are stored in a separate S3 bucket, and another EventBridge schedule feeds these into Amazon Bedrock Knowledge Bases, which provides an end-to-end managed RAG workflow capability.

### Agentic Architecture with Amazon Bedrock Agents

The solution leverages Amazon Bedrock Agents to streamline workflows and automate repetitive tasks. Agents use the reasoning capability of foundation models to break down user-requested tasks into multiple steps, create orchestration plans based on provided instructions, and execute those plans by invoking company APIs and accessing knowledge bases.

Amazon Bedrock Agents facilitates interaction with both internal systems (databases, Amazon EC2 instances) and external systems (Jira for issue tracking, Datadog for application monitoring). When a user asks a question, the agent considers available tools and knowledge bases, autonomously creates an execution plan, receives documents from the knowledge base and responses from tool APIs, consolidates the information, and feeds it to the LLM to generate the final response.

The model choice for this implementation was Anthropic's Claude 3 Sonnet (the latest model at the time of development), selected for its informative and comprehensive answers and ability to understand diversified questions. The case study notes that Claude can correctly interpret user input date formats in various forms (e.g., "2024-05-10" or "10th May 2024"), which is important for log query scenarios.

### Security Considerations and Guardrails

A notable aspect of this implementation is the attention to security, particularly around preventing LLM hallucinations and prompt injection attacks. The system evaluates health through a series of controlled checks, including AWS Boto3 API calls (such as `describe_security_groups` to determine if an IP address is allowed to access a system) and SQL queries (like `sys.dm_os_schedulers` to query database system metrics).

Critically, agents are not allowed to create their own database queries or system health checks dynamically. Instead, a series of pre-defined, controlled SQL queries and API checks were implemented following the principle of least privilege (PoLP). The implementation also validates input and output schemas using AWS Lambda Powertools' BedrockAgentResolver with OpenAPI specifications. This approach mitigates potential risks from hallucinations or prompt injection attacks that could otherwise lead to unauthorized data access or SQL injection vulnerabilities.

The code example provided shows explicit functions per health check, with databases KMS-encrypted and behind private subnets, connections using least-privileges principles and AWS Secrets Manager for credential management.

### Deployment and Frontend

The chat application is hosted in AWS Fargate for Amazon Elastic Container Service (Amazon ECS), providing scalability and reliability to handle variable loads without compromising performance. This serverless container approach aligns with modern cloud-native deployment practices.

The frontend chat assistant UI was developed using Streamlit, a Python-based framework providing simple yet powerful application widgets. Users can test Amazon Bedrock agent iterations by providing or replacing the agent ID and alias ID. The interface displays the full conversation history with a clear option to reset conversations.

Responses from the LLM application consist of two parts: the final response based on user questions displayed on the left, and the trace of LLM agent orchestration plans and executions on the right (hidden by default for a clean interface but available for inspection to verify correct tool invocations and document retrievals).

## Results and Impact

According to the case study, the solution delivers significant improvements:

- Engineers receive responses within 5-10 seconds on specific queries
- Initial triage time reduced from more than a day to less than 20 minutes
- End-to-end time to resolution reduced by up to 86%
- The specific recurring web API issue that previously took 15 engineer days was resolved within 3 days, including deployments and testing over a race weekend

The system routes issues to the correct team for resolution, allowing teams to focus on other high-priority tasks like building new products to enhance the race experience. The assistant can quickly identify root causes and provide remediation recommendations even when multiple issues are present, with particularly challenging issues automatically escalated to the F1 engineering team.

## Critical Assessment

While the reported results are impressive, some caveats merit consideration. The 86% reduction in resolution time and the specific case study of 15 days reduced to 3 days are cited without detailed methodology on how these figures were calculated. The comparison between "engineer days" and "calendar days" in different contexts makes direct comparisons challenging.

Additionally, this case study comes from an AWS blog post, which inherently serves a marketing purpose for AWS services. The solution heavily leverages AWS's managed services ecosystem (Bedrock, EventBridge, Glue, S3, Fargate, ECS), which represents both a strength (integration and managed infrastructure) and a consideration (vendor lock-in to AWS ecosystem).

The 5-week prototype timeline is noteworthy, though production deployment timelines and ongoing operational requirements are not discussed. The case study also doesn't address ongoing maintenance, model updates, or how the system handles edge cases where the AI might provide incorrect root cause analysis.

That said, the technical architecture is well-documented and represents a solid implementation of agentic RAG for enterprise IT operations. The attention to security guardrails and the principle of least privilege in agent tool access demonstrates mature thinking about production AI safety. The availability of a general-purpose version of the chat application on GitHub provides some transparency and allows others to experiment with similar solutions.