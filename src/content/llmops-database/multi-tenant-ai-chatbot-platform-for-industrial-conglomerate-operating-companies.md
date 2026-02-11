---
title: "Multi-Tenant AI Chatbot Platform for Industrial Conglomerate Operating Companies"
slug: "multi-tenant-ai-chatbot-platform-for-industrial-conglomerate-operating-companies"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693062f33e7d8c977575bf9c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:31:50.314Z"
  createdOn: "2025-12-03T16:18:59.125Z"
llmopsTags:
  - "chatbot"
  - "healthcare"
  - "document-processing"
  - "question-answering"
  - "code-generation"
  - "data-analysis"
  - "multi-modality"
  - "poc"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "multi-agent-systems"
  - "chunking"
  - "mcp"
  - "postgresql"
  - "elasticsearch"
  - "fastapi"
  - "docker"
  - "kubernetes"
  - "serverless"
  - "cicd"
  - "monitoring"
  - "api-gateway"
  - "databases"
  - "microservices"
  - "orchestration"
  - "devops"
  - "documentation"
  - "security"
  - "guardrails"
  - "scalability"
  - "langchain"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "tech"
company: "Capgemini"
summary: "Capgemini and AWS developed \"Fort Brain,\" a centralized AI chatbot platform for Fortive, an industrial technology conglomerate with 18,000 employees across 50 countries and multiple independently-operating subsidiary companies (OpCos). The platform addressed the challenge of disparate data sources and siloed chatbot development across operating companies by creating a unified, secure, and dynamically-updating system that could ingest structured data (RDS, Snowflake), unstructured documents (SharePoint), and software engineering repositories (GitLab). Built in 8 weeks as a POC using AWS Bedrock, Fargate, API Gateway, Lambda, and the Model Context Protocol (MCP), the solution enabled non-technical users to query live databases and documents through natural language interfaces, eliminating the need for manual schema remapping when data structures changed and providing real-time access to operational data across all operating companies."
link: "https://www.youtube.com/watch?v=L6J5TsZcPt4"
year: 2025
seo:
  title: "Capgemini: Multi-Tenant AI Chatbot Platform for Industrial Conglomerate Operating Companies - ZenML LLMOps Database"
  description: "Capgemini and AWS developed \"Fort Brain,\" a centralized AI chatbot platform for Fortive, an industrial technology conglomerate with 18,000 employees across 50 countries and multiple independently-operating subsidiary companies (OpCos). The platform addressed the challenge of disparate data sources and siloed chatbot development across operating companies by creating a unified, secure, and dynamically-updating system that could ingest structured data (RDS, Snowflake), unstructured documents (SharePoint), and software engineering repositories (GitLab). Built in 8 weeks as a POC using AWS Bedrock, Fargate, API Gateway, Lambda, and the Model Context Protocol (MCP), the solution enabled non-technical users to query live databases and documents through natural language interfaces, eliminating the need for manual schema remapping when data structures changed and providing real-time access to operational data across all operating companies."
  canonical: "https://www.zenml.io/llmops-database/multi-tenant-ai-chatbot-platform-for-industrial-conglomerate-operating-companies"
  ogTitle: "Capgemini: Multi-Tenant AI Chatbot Platform for Industrial Conglomerate Operating Companies - ZenML LLMOps Database"
  ogDescription: "Capgemini and AWS developed \"Fort Brain,\" a centralized AI chatbot platform for Fortive, an industrial technology conglomerate with 18,000 employees across 50 countries and multiple independently-operating subsidiary companies (OpCos). The platform addressed the challenge of disparate data sources and siloed chatbot development across operating companies by creating a unified, secure, and dynamically-updating system that could ingest structured data (RDS, Snowflake), unstructured documents (SharePoint), and software engineering repositories (GitLab). Built in 8 weeks as a POC using AWS Bedrock, Fargate, API Gateway, Lambda, and the Model Context Protocol (MCP), the solution enabled non-technical users to query live databases and documents through natural language interfaces, eliminating the need for manual schema remapping when data structures changed and providing real-time access to operational data across all operating companies."
---

## Overview

This case study presents the development of "Fort Brain," an enterprise AI chatbot platform built by Capgemini and AWS for Fortive, a large industrial technology conglomerate. Fortive operates as a holding company with multiple independent operating companies (OpCos) across three main business pillars: intelligent operating solutions (facilities and asset management), precision technologies (electronic test and measurement, including Fluke), and healthcare solutions (infection prevention and surgical asset management). With 18,000 employees operating in 50 countries, Fortive faced the challenge of standardizing AI capabilities across organizationally independent subsidiaries, each with their own IT departments, data architectures, and varying levels of technical maturity.

The project originated from Fortive's innovation hub called "the Fort" and aimed to replace a previous static chatbot implementation with a dynamic, scalable, and secure platform that could serve all operating companies. The key business driver was eliminating the operational burden of manually remapping database schemas and retraining models whenever data structures changed, while providing a familiar and fast user experience that could deliver answers in seconds rather than minutes. The solution needed to accommodate three distinct data source categories: structured databases (SQL, PostgreSQL, Oracle, RDS, Snowflake), unstructured documents (SharePoint, Jira, Confluence, S3), and software engineering repositories (GitLab, Bitbucket, GitHub).

## Technical Architecture and LLMOps Implementation

The architecture follows a serverless approach centered on AWS Bedrock for foundational model capabilities, with careful attention to multi-tenancy, security, and data segregation. The platform uses AWS Fargate to host containerized web applications that provide the user interface, delivered through CloudFront with Web Application Firewall (WAF) for security and content delivery. This containerization approach offers deployment flexibility without the operational overhead of managing container orchestration infrastructure.

The backend orchestration layer relies on API Gateway and Lambda functions to handle request routing and context injection. The Lambda functions pass user requests to a multi-agent architecture built on Amazon Bedrock. The first agent, referred to as the SQL query agent, performs prompt preprocessing and determines which data source needs to be queried based on the user's natural language input. This agent adds semantic meaning to requests and routes them appropriately. A second set of agents, called action group agents, handle the actual interaction with specific data sources.

A critical architectural decision that enables the "dynamic versus static" capability is the implementation of Model Context Protocol (MCP) servers. MCP is described as a standard for connecting AI models to tools and data sources, going beyond simple querying to enable bidirectional interaction with external systems. For the POC, MCP servers were implemented to connect to GitHub repositories and PostgreSQL databases, allowing the system to query live data without requiring knowledge base updates or reindexing. This means a sales manager could ask about yesterday's sales results and receive current data immediately, rather than waiting for a weekly batch update cycle. The MCP approach also supports actions beyond querying, including starting workflows, committing code to Git repositories, and adding rows to databases.

For unstructured document access, the team implemented Amazon Bedrock Knowledge Bases connected to SharePoint, using OpenSearch as the vector database for efficient retrieval. The architecture uses embeddings to enable semantic search across document collections. Due to POC time constraints, the team initially used Bedrock's web crawler connector rather than the native SharePoint connector, though they plan to migrate to the native connector in future iterations to properly handle security requirements and organizational access controls.

## Infrastructure as Code and Deployment

The project adhered to strict infrastructure-as-code principles using AWS CDK and Terraform. The team mandated that no manual AWS console access should be used, requiring all infrastructure changes to flow through code in deployment pipelines. GitHub served as the source code repository for the entire project. AWS Glue handled data processing tasks, while Amazon Bedrock Knowledge Base managed the knowledge base creation and learning processes. This approach ensures reproducibility, version control, and the ability to rapidly deploy the platform for different operating companies.

## Multi-Tenancy and Governance

A fundamental requirement was maintaining strict data segregation across operating companies. Each OpCo's data remains isolated, with governance and security controls enforced centrally by the platform while allowing individual OpCos to maintain operational independence. The platform provides a unified web interface where users from different operating companies can add new data sources and configure chatbots without requiring deep AWS expertise. This democratization of AI capabilities was particularly important given the varying levels of technical maturity across Fortive's IT organizations.

The user interface simplifies the process of connecting new data sources through a workflow-based approach. Users can select their data source type, provide connection details, and the platform handles the ingestion, indexing, and agent configuration automatically. This abstraction shields OpCo teams from the underlying complexity of Bedrock, MCP server configuration, vector database management, and prompt engineering.

## Model Selection and Prompt Engineering

While the transcript doesn't extensively detail specific model selection criteria, the use of Amazon Bedrock indicates the team leveraged foundation models available through that service. The agentic implementation suggests prompt engineering occurred at multiple levels: at the SQL query agent level for intent classification and routing, at the action group agent level for generating appropriate queries or commands for specific data sources, and potentially within the Bedrock Knowledge Base for document retrieval and synthesis.

The system provides transparency in its operations by returning not just answers but also the SQL queries generated to retrieve structured data. This feature serves dual purposes: it helps users refine their natural language prompts to get more precise results, and it provides explainability and trust by showing how the system interpreted and executed their request. This transparency is particularly valuable in production LLM systems where users need to understand and validate outputs.

## Performance and User Experience

Performance was a critical success criterion, with the team emphasizing the need to respond to queries in seconds rather than minutes to maintain conversational flow. The serverless architecture with Lambda and API Gateway enables automatic scaling to handle varying loads across multiple operating companies. The use of vector databases (OpenSearch) for unstructured data retrieval ensures fast semantic search, while the MCP servers provide low-latency access to live structured data without the overhead of batch processing or knowledge base updates.

## POC Results and Timeline

The proof of concept was completed in approximately 8 weeks, successfully demonstrating functionality across all three data source types: structured databases (Amazon RDS), unstructured documents (SharePoint via web crawler), and software engineering repositories (GitLab). The rapid development timeline was enabled by the serverless architecture, managed services like Bedrock, and the team's infrastructure-as-code approach. The POC successfully proved to Fortive leadership that the platform could deliver quick wins, provide dynamic data access, and scale across operating companies, securing investment for continued development.

## Challenges and Architectural Decisions

The team encountered several notable challenges during development. The rapid pace of AWS innovation created a timing issue: Amazon Bedrock Agent Core reached general availability midway through the 8-week development cycle. Rather than disrupt the development schedule and re-architect, the team made the pragmatic decision to continue with their existing agentic implementation and plan migration to Agent Core in a future iteration. This highlights a key consideration in production LLM systems: balancing the desire to use the latest capabilities against the need to deliver working solutions on schedule.

Another challenge involved security and access controls for SharePoint integration. The decision to use the web crawler connector rather than the native SharePoint connector for the POC was driven by time constraints around security reviews and organizational access permissions. This represents a common tradeoff in enterprise LLM implementations where proper security integration can require significant coordination with information security teams and may involve lengthy approval processes.

The transition from static to dynamic data access represented a fundamental architectural shift. The previous iteration of Fort Brain required manual schema remapping and model retraining whenever database structures changed, creating operational overhead and delays. The MCP-based approach eliminates this burden by querying live data sources directly and adapting to schema changes automatically, though this comes with its own tradeoffs around query performance, error handling, and the need for robust connection management.

## Future Roadmap and AWS QuickSight Integration

The team outlined several planned enhancements beyond the initial POC. The immediate priority is expanding the number of supported data source types to include Oracle databases, Jira, Confluence, and other systems commonly used across Fortive's operating companies. Each new data source type will require implementing appropriate MCP servers or Bedrock connectors while maintaining the platform's ease of use.

Migration to Amazon Bedrock Agent Core is planned to simplify the agentic architecture and leverage AWS-managed orchestration capabilities. The native SharePoint connector will replace the web crawler to properly handle enterprise security requirements and permissions.

A particularly interesting addition to the roadmap is AWS Q Developer (referred to as "Quiro" in the transcript), which became generally available shortly after the POC completion. The team demonstrated several compelling use cases for incorporating Q Developer into the development lifecycle:

- **Test Data Generation**: Using natural language prompts to Q Developer to automatically generate sample databases with realistic schemas and data for testing, reducing what previously took weeks to a matter of minutes.

- **MCP Server Generation**: Automating the creation of MCP server code to connect to new data sources, dramatically accelerating the process of adding new data source types to the platform.

- **Automated Testing**: Generating test scripts and queries to validate that the Fort Brain platform correctly handles various question types and returns accurate results, potentially replacing significant manual QA effort.

- **Complex Query Generation**: Demonstrating Q Developer's ability to translate business questions into sophisticated SQL queries, which could enhance the platform's query generation capabilities or serve as a benchmark for evaluating the existing agents' performance.

These Q Developer integrations represent a meta-level application of LLMs to accelerate the development and maintenance of an LLM-based platform, potentially creating significant efficiency gains in the development lifecycle itself.

## Critical Assessment and Balanced Perspective

While the case study presents an impressive 8-week delivery timeline and demonstrates solid architectural principles, several aspects warrant balanced consideration. The presentation comes from the implementation team (Capgemini and AWS) and naturally emphasizes successes while potentially understating challenges. The POC addressed three data source types, but scaling to the full range of data sources across all OpCos remains unproven in production. The complexity of maintaining MCP servers for numerous data source types, handling connection failures, managing rate limits, and ensuring consistent performance across different backend systems will likely present ongoing operational challenges.

The multi-tenant architecture's security and isolation guarantees are described at a high level but the implementation details around how data segregation is enforced, how access controls are managed across OpCos, and how the platform prevents data leakage between tenants aren't fully specified. In enterprise LLM deployments, these details are critical and often more complex than initially apparent.

The transparency feature of showing SQL queries to users is valuable but could also expose security concerns if not properly sanitized, and may overwhelm non-technical users with implementation details they don't need. The claim of "seconds not minutes" response time is encouraging but would benefit from specific performance metrics, especially under realistic concurrent load from multiple operating companies.

The rapid obsolescence of architectural decisions (Agent Core releasing mid-development) illustrates the challenge of building production LLM systems in a rapidly evolving ecosystem. While the team's decision to proceed with their existing architecture was pragmatic, it does mean the platform will require refactoring to stay current with best practices, creating ongoing technical debt.

The dependence on AWS services creates vendor lock-in, which may or may not align with Fortive's long-term multi-cloud strategy. The use of proprietary services like Bedrock, while offering faster time to market, makes migration to alternative providers challenging if business requirements or cost structures change.

Despite these considerations, the project demonstrates sound LLMOps practices including infrastructure as code, serverless architectures for scalability, multi-agent systems for complex orchestration, and thoughtful attention to user experience and operational efficiency. The platform addresses real enterprise needs around centralizing AI capabilities, maintaining governance, and democratizing access to AI across organizations with varying technical capabilities. The roadmap showing integration of newer AWS services like Q Developer indicates the team is thinking strategically about evolving the platform rather than treating the POC as a one-time delivery.