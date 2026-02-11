---
title: "AI-Powered Vehicle Information Platform for Dealership Sales Support"
slug: "ai-powered-vehicle-information-platform-for-dealership-sales-support"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693be28bc4ee4b7993661465"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:35:58.389Z"
  createdOn: "2025-12-12T09:38:19.441Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "document-processing"
  - "data-analysis"
  - "high-stakes-application"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "multi-agent-systems"
  - "chunking"
  - "system-prompts"
  - "mcp"
  - "evals"
  - "few-shot"
  - "error-handling"
  - "human-in-the-loop"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "langchain"
  - "llama-index"
  - "mistral"
  - "argilla"
  - "wandb"
  - "fastapi"
  - "amazon-aws"
  - "anthropic"
industryTags: "automotive"
company: "Toyota"
summary: "Toyota Motor North America (TMNA) and Toyota Connected built a generative AI platform to help dealership sales staff and customers access accurate vehicle information in real-time. The problem was that customers often arrived at dealerships highly informed from internet research, while sales staff lacked quick access to detailed vehicle specifications, trim options, and pricing. The solution evolved from a custom RAG-based system (v1) using Amazon Bedrock, SageMaker, and OpenSearch to retrieve information from official Toyota data sources, to a planned agentic platform (v2) using Amazon Bedrock AgentCore with Strands agents and MCP servers. The v1 system achieved over 7,000 interactions per month across Toyota's dealer network, with citation-backed responses and legal compliance built in, while v2 aims to enable more dynamic actions like checking local vehicle availability."
link: "https://www.youtube.com/watch?v=lp_tXtr_aL4"
year: 2025
seo:
  title: "Toyota: AI-Powered Vehicle Information Platform for Dealership Sales Support - ZenML LLMOps Database"
  description: "Toyota Motor North America (TMNA) and Toyota Connected built a generative AI platform to help dealership sales staff and customers access accurate vehicle information in real-time. The problem was that customers often arrived at dealerships highly informed from internet research, while sales staff lacked quick access to detailed vehicle specifications, trim options, and pricing. The solution evolved from a custom RAG-based system (v1) using Amazon Bedrock, SageMaker, and OpenSearch to retrieve information from official Toyota data sources, to a planned agentic platform (v2) using Amazon Bedrock AgentCore with Strands agents and MCP servers. The v1 system achieved over 7,000 interactions per month across Toyota's dealer network, with citation-backed responses and legal compliance built in, while v2 aims to enable more dynamic actions like checking local vehicle availability."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-vehicle-information-platform-for-dealership-sales-support"
  ogTitle: "Toyota: AI-Powered Vehicle Information Platform for Dealership Sales Support - ZenML LLMOps Database"
  ogDescription: "Toyota Motor North America (TMNA) and Toyota Connected built a generative AI platform to help dealership sales staff and customers access accurate vehicle information in real-time. The problem was that customers often arrived at dealerships highly informed from internet research, while sales staff lacked quick access to detailed vehicle specifications, trim options, and pricing. The solution evolved from a custom RAG-based system (v1) using Amazon Bedrock, SageMaker, and OpenSearch to retrieve information from official Toyota data sources, to a planned agentic platform (v2) using Amazon Bedrock AgentCore with Strands agents and MCP servers. The v1 system achieved over 7,000 interactions per month across Toyota's dealer network, with citation-backed responses and legal compliance built in, while v2 aims to enable more dynamic actions like checking local vehicle availability."
---

## Overview

This case study documents Toyota Motor North America (TMNA) and Toyota Connected's development of an enterprise-scale generative AI platform designed to provide vehicle information to dealership sales staff and customers. The presentation, delivered at AWS re:Invent, provides a detailed technical walkthrough of both their production RAG-based system (version 1) and their planned transition to an agentic platform (version 2) using Amazon Bedrock AgentCore.

The collaboration between TMNA and Toyota Connected represents a mature approach to enterprise LLMOps, with Bryan Landes (AWS Solutions Architect supporting Toyota for 7.5 years), Stephen Ellis (TMNA Enterprise AI team), and Stephen Short (Toyota Connected Senior Engineer) presenting different perspectives on the platform engineering, business strategy, and technical implementation.

## Business Context and Problem Statement

The core business problem emerged from a shift in customer behavior. Modern car buyers arrive at dealerships highly researched, having consumed YouTube reviews, online forums, and detailed vehicle comparisons. When these informed customers ask specific questions about vehicle features, trim differences, or technical specifications (such as the differences between Supra models), sales staff often couldn't provide immediate, authoritative answers. This led to customers pulling out their phones to search Google during sales conversations, creating an awkward dynamic and potentially lost sales opportunities.

TMNA's Enterprise AI team was formed as a center of excellence with a unique structure where almost all team members are engineers rather than traditional business analysts. This engineering-heavy composition enabled them to build AI accelerators and what they call "AI teammates" - systems designed to augment human capabilities rather than replace them, in line with Toyota's policy of keeping teammates at the center of all work.

## Technical Architecture - Version 1 (Production RAG System)

Version 1 represents a sophisticated RAG implementation currently serving Toyota's entire dealer network with over 7,000 interactions per month. The architecture spans multiple AWS accounts with careful separation of concerns.

### Request Flow and Authentication

When a front-end client initiates a request, it routes through the TMNA Enterprise AI account, passing through Route 53 with an attached Web Application Firewall (WAF). Lambda@Edge handles authentication and authorization using Entra ID (formerly Azure Active Directory). Once authenticated, requests flow to an "intent router" deployed on Amazon ECS. This intent router's primary responsibility is identifying which vehicle the user is asking about to determine which data to retrieve.

Before any LLM inference occurs, all requests immediately route through "Prompt Guard," an in-house solution built by Toyota's cybersecurity team to identify and block malicious activities such as prompt injection attacks. This security-first approach demonstrates the mature governance applied to production LLM systems.

The intent router establishes a WebSocket connection with the front end and initializes conversation tracking using DynamoDB. After vehicle identification (which does use an external LLM call), the request transfers to Toyota Connected's main account via the internet through CloudFlare (with another WAF) and hits an API Gateway.

### RAG Application Infrastructure

The RAG application code runs within an Amazon EKS (Elastic Kubernetes Service) cluster in Toyota Connected's Shared Services account, maintained by their cloud engineering team to handle scaling and traffic management. All logs forward to Datadog for observability.

The RAG inference process involves several sophisticated steps:

**Embedding Generation with Conversational Context**: The system uses Amazon SageMaker to generate embeddings not just for the current query but also for the previous five turns of conversation. A weighted average algorithm applies more preference to recent conversation turns while maintaining contextual awareness. This approach addresses the challenge of maintaining conversation continuity without overwhelming the context window.

**Semantic Search**: Generated embeddings perform semantic search against an OpenSearch Serverless vector database, retrieving 30 documents per vehicle queried. These documents serve as the primary source of truth, ensuring responses rely on official Toyota data rather than LLM world knowledge.

**LLM Inference with Streaming**: Amazon Bedrock hosts the Anthropic models used for inference. The system sends the assistant prompt along with retrieved documents to generate responses. Critically, the system performs post-processing on the streaming output to meet business requirements around legal disclaimers and image handling.

**Compliance and Logging**: After inference completes, messages push to an SQS queue, which triggers a Lambda function to export logs to MongoDB for compliance reporting requirements. The response then buffers back to TMNA via webhook, updates the DynamoDB conversation history, and streams to the front-end client.

An important architectural principle is that the RAG application is completely stateless from Toyota Connected's perspective. All conversation management happens in the Enterprise AI account, which allows for cleaner separation of concerns and easier scaling.

### Data Processing and ETL Pipeline

One of the most complex aspects of the system is transforming raw vehicle data into a format suitable for RAG. The raw data consists of large JSON objects with internal mappings for trim codes, MSRP information, descriptions, titles, and other fields - plus critical disclaimer codes that must be preserved exactly as written for legal compliance.

The ETL pipeline utilizes AWS Step Functions to orchestrate a series of AWS Glue scripts across a dedicated data account:

**Extract Phase**: Scripts pull all supported vehicle data from Toyota API servers (covering model years 2023-2026) and push to S3.

**Transform Phase**: This is the heaviest portion, processing up to 30 vehicles concurrently for maximum throughput. The scripts chunk the JSON data and then use Amazon Bedrock to generate natural language summarizations of each chunk. For example, a JSON object representing a single vehicle feature gets translated into readable prose that includes trim availability, pricing, and descriptions.

Because LLM output is non-deterministic, the team implemented data quality checks to verify the accuracy of these summarizations, particularly for critical information like pricing details and trim availabilities. This validation step is crucial for maintaining trust in a production system.

**Embedding and Publishing**: Another script generates embeddings of the natural language summarizations, ties them to the raw data (which is preserved for citation purposes), and publishes to S3.

**Load Phase**: An Amazon EventBridge event triggers Lambda functions on dev, stage, and prod accounts. These Lambdas retrieve configuration from AWS Systems Manager Parameter Store, create a new timestamped index in OpenSearch, configure an OpenSearch ingest pipeline to read from the transform output, and ingest the data.

### Evaluation and Quality Assurance

Before any newly ingested data becomes active, Toyota runs it through a comprehensive evaluation pipeline orchestrated via GitLab Runners. TMNA counterparts provided a "golden set" of question-answer pairs for one vehicle, validated by subject matter experts. This golden data set serves as the foundation for generating synthetic test sets for all vehicles.

The evaluation system invokes the deployed RAG application with test questions, then uses a "council of LLMs" approach to assess responses against defined metrics measuring system performance and data quality. Only after this evaluation passes does an index alias switch to point to the newly created index, enabling zero-downtime data updates.

The council of LLMs approach for evaluation is noteworthy - rather than relying on a single model's judgment, multiple LLMs assess response quality, likely providing more robust and less biased evaluations.

### Legal Compliance and Stream Splitting

Legal requirements posed significant technical challenges. Every response must include contextually relevant disclaimers taken from a controlled vocabulary - the disclaimer text is immutable and cannot be altered by the LLM. Similarly, vehicle image URLs and metadata must remain unchanged.

Toyota's engineers solved this with an innovative "stream splitting" approach. The system prompt includes extensive examples (in-context learning) training the model to split its output into three distinct streams:

- **Main Output Stream**: The natural language response shown to users
- **Disclaimer Codes Stream**: A list of disclaimer code citations the LLM believes should be surfaced
- **Image IDs Stream**: Image identifiers the LLM wants to include

The implementation uses specific delimiters in the streaming output, with code that monitors the invoke_model response stream and switches state based on delimiter detection. After the LLM completes inference, Toyota maps the disclaimer codes and image IDs to their immutable legal text and image URLs without the LLM ever touching this content. This elegant solution maintains legal compliance while leveraging LLM reasoning about relevance.

Toyota built a compliance analysis system that categorizes incoming questions and measures how well responses adhere to legal guidelines about how the assistant should behave. Results feed into MongoDB, backing a compliance reporting dashboard shared with legal teams to monitor production performance.

### Observability and Monitoring

The production system uses Datadog extensively for observability, with logs forwarded from the EKS cluster. The team tracks conversation histories in DynamoDB for the Enterprise AI side, while compliance data lives in MongoDB for reporting. This multi-database approach reflects different data access patterns and compliance requirements.

## Platform Engineering and Enterprise Strategy

Stephen Ellis from TMNA provided valuable context on their enterprise AI strategy. The Enterprise AI team follows a unique organizational structure that's "diagonal" across the organization rather than a traditional horizontal center of excellence. Their workflow moves through distinct phases:

**Exploration**: Novel use cases with brand new technology that hasn't been done before.

**Experimentation and Education**: Working with IT teams to bring capabilities into business as usual. An example given was contract analysis - analysts were manually reviewing 300,000 contracts at a rate of 30,000 per year. A gen AI solution reduced time by 15-17 hours per user while discovering contract compliance issues and expiring clauses the company was missing, leading to significant savings.

**Enablement**: Once capabilities are proven, they democratize them across different groups. Ellis categorizes most use cases into three types: taking data and doing analysis, taking content and generating new content, or distilling disparate content into unified sources for different audiences.

**Adoption**: Engaging with business users while emphasizing that there's no perfect version - the key is getting something done quickly and improving based on learnings. This philosophy contrasts with traditional manufacturing approaches that want to de-risk and plan perfectly before execution. In gen AI, perfect planning means falling behind daily.

The team follows a "build, configure, buy" approach. Because they started with engineers and research scientists, they built capabilities from day one (starting as soon as ChatGPT API became available). Once they've built and defined working requirements, they look for products that can be configured to fit existing platforms. Finally, if those products mature into SaaS platforms or are delivered by trusted partners, they buy rather than maintain in-house solutions where Toyota isn't the expert.

For new AI/ML projects, teams submit ideas through an AI/ML governance board that evaluates whether solutions, vendors, or technologies comply with existing standards. When standards don't exist, they help shape new ones. After governance approval, the Enterprise AI team builds prototypes, sets up productionalization plans, and supports authorization. For teams with existing full stacks, they hand off prototypes and enable new technology rather than maintaining ongoing operations.

## Agentic Platform Strategy - Version 2 (Planned)

Stephen Short detailed the planned evolution to an agentic platform, driven by several factors:

**Data Stillness Problem**: Every time upstream vehicle data changes (which happens frequently during new model year rollouts), the entire ETL pipeline must run, followed by evaluation. This creates lag between data updates and system availability.

**Limited Capabilities**: Version 1 can answer questions but cannot perform actions like checking local dealership inventory for specific vehicles.

**Scalability and Maintenance**: The complex ETL pipeline creates significant infrastructure overhead.

Early experiments with the Strands SDK and MCP (Model Context Protocol) servers revealed that modern LLMs can connect directly to data sources, potentially eliminating the traditional RAG pipeline entirely while enabling actions and advanced reasoning. However, moving from proof-of-concept demos to production presents challenges around authentication, authorization, auto-scaling, and guaranteeing context and session isolation in multi-agent systems.

### Amazon Bedrock AgentCore Architecture

Toyota selected Amazon Bedrock AgentCore as their platform for version 2, specifically because it addresses production concerns:

**AgentCore Runtime**: Firecracker VM-based solution providing isolation by default, serverless scaling, and low infrastructure overhead.

**AgentCore Identity**: Tackles the complexities of inbound and outbound authentication in multi-agent, multi-MCP systems.

**AgentCore Memory**: Simplifies conversation management and enables novel use cases.

**AgentCore Gateway**: Managed service for deploying MCP servers.

**AgentCore Observability**: Supports OpenTelemetry by default, integrating with Toyota's existing Datadog infrastructure.

The planned architecture involves an "orchestrator" (replacing the intent router) that integrates with an "agent registry" - a mapping of authenticated clients to available agents. When front-end requests arrive, the orchestrator consults the registry to route to appropriate agents, with Bedrock handling what previously required external LLM calls.

Toyota Connected plans to deploy multiple Strands agents in AgentCore Runtime:

**Product Expert Agent**: Essentially agentifies version 1 capabilities, answering questions about vehicle specifications, pricing, trim options, and accessories.

**Product Support Agent**: Services customer inquiries about their specific vehicles, expanding beyond the information-only capabilities of version 1.

Each agent couples with MCP servers providing necessary tools. The Product Support MCP Server will use AgentCore Gateway, which Toyota believes is a perfect fit. However, the Product Expert MCP Server requires response caching to be a responsible consumer of Toyota's APIs - a hard requirement.

### Innovative Use of AgentCore Memory for Distributed Caching

Stephen Short demonstrated particularly creative LLMOps engineering by using AgentCore Memory as a distributed cache. The approach involves:

- Creating a decorator that can be applied to any MCP server tool call
- Concatenating the function signature and invocation parameters to create a SHA-256 hash as a caching key
- Using AgentCore Memory's event metadata to store and retrieve cached responses

The implementation required using the low-level client rather than the high-level client, as only the low-level client supports filtering based on event metadata. The code invokes the GMDP client's list_events function with metadata filters checking if the cache key matches.

For memory to act as a shared cache across different MCP server sessions, specific configuration is needed (actor ID and session ID or agent ID must be statically coded). This enables memory to function as a distributed cache accessible by any agent, solving the response caching requirement while leveraging managed infrastructure.

This creative repurposing of AgentCore Memory demonstrates sophisticated LLMOps thinking - identifying capabilities in platform services that can solve problems in non-obvious ways.

### Timeline and Expectations

Toyota Connected targets a Q1 2026 launch for version 2. By eliminating the ETL pipeline and connecting agents directly to data sources via MCP servers, they expect to solve the data stillness issues plaguing version 1 while enabling new action-oriented capabilities. The move to AgentCore substantially reduces infrastructure overhead compared to maintaining custom agent orchestration, authentication, and scaling systems.

## Broader AWS and Toyota Relationship

Bryan Landes provided context on the seven-year AWS-Toyota partnership. When he joined the Toyota account in 2018, their AWS footprint was "very small." His team works not just with North America but also Toyota Motor Corporation in Japan, Toyota Connected in Japan, Woven by Toyota, and Toyota Racing Development (which uses SageMaker to predict NASCAR race outcomes).

Landes emphasized the importance of deeply embedded customer relationships where account teams are constantly engaging, learning, and building together. Toyota pushes AWS services daily, discovering new workload types continuously. There are approximately 47 different AI/ML use cases across Toyota entities.

The presentation referenced Toyota's adoption of platform engineering principles with internal development platforms (IDPs) that democratize AI tooling across the organization. The concept is that one centralized platform enables DevOps at scale, building features and capabilities for developers, data scientists, and business users. Toyota has four or five such platforms depending on organizational structure.

The IDP approach allows deployment of agents at scale with confined governance, identity, and guardrails, preventing security teams from "freaking out" while enabling self-service across different organizational units (legal, HR, etc.). Landes mentioned Cisco and Spotify as other companies following similar patterns.

## Critical Assessment and LLMOps Maturity

This case study demonstrates exceptionally mature LLMOps practices:

**Strengths:**

- **Security-first approach**: Mandatory Prompt Guard checks before any inference demonstrates serious security considerations
- **Comprehensive evaluation**: Golden data sets, synthetic test generation, council of LLMs evaluation, and zero-downtime deployments show production rigor
- **Legal compliance integration**: Stream splitting for immutable disclaimers and continuous compliance monitoring address real enterprise requirements
- **Observability**: Multi-layer logging to Datadog and MongoDB with compliance dashboards provides operational visibility
- **Stateless architecture**: Clear separation between stateful conversation management and stateless RAG application enables better scaling
- **Iterative approach**: Building v1 first, learning from production, then planning v2 based on real limitations is textbook product development
- **Creative engineering**: Using AgentCore Memory as distributed cache shows deep technical understanding

**Areas of Concern:**

- **Complexity**: The v1 architecture is extremely complex with multiple account boundaries, numerous services, and intricate data flows. While separation of concerns is valuable, this introduces operational overhead and potential failure points.
- **ETL burden**: The data quality validation requirement for LLM-generated summarizations adds significant pipeline complexity. While necessary for accuracy, it raises questions about whether the natural language transformation approach is optimal.
- **Evaluation methodology**: While sophisticated, the "council of LLMs" evaluation isn't described in detail. How are disagreements resolved? What metrics specifically are measured? These details matter for reproducibility.
- **Version 2 timeline**: Q1 2026 target for replacing a production system serving 7,000+ monthly interactions is ambitious. The move from RAG to pure agentic approaches with direct data access represents significant architectural change with potential for unexpected issues.
- **Vendor lock-in**: Heavy reliance on AWS-specific services (AgentCore, Bedrock, SageMaker, OpenSearch) creates switching costs, though this may be acceptable given the partnership depth.

**Notable LLMOps Practices:**

- **Multi-stage deployment**: Separate dev, stage, and prod environments with automated promotion via EventBridge
- **Index aliasing**: Zero-downtime data updates through index aliases demonstrates database operations maturity
- **Weighted conversation context**: The five-turn weighted average for embeddings is more sophisticated than simple context window management
- **Post-processing controls**: Stream splitting to enforce immutable content shows understanding of LLM limitations
- **GitLab Runner orchestration**: Using CI/CD infrastructure for evaluation pipelines integrates ML operations with software development practices

The fact that Toyota is presenting this at re:Invent and plans to use AgentCore for v2 suggests strong AWS partnership, but the presentation maintains credibility by openly discussing challenges like the data stillness problem and infrastructure overhead rather than only highlighting successes.

## Scaling and Production Considerations

The case study touches on several production scaling aspects:

- **Concurrent processing**: ETL can handle 30 vehicles concurrently, showing parallelization considerations
- **Traffic numbers**: 7,000+ monthly interactions across entire dealer network suggests moderate but not extreme scale
- **Response caching**: Hard requirement for v2 indicates cost and rate limiting concerns with Toyota APIs
- **WebSocket connections**: Real-time streaming to front ends rather than request-response pattern
- **Multi-tenancy**: Agent registry mapping authenticated clients to available agents suggests multi-tenant architecture

The relatively modest interaction numbers (7,000/month is roughly 10 interactions per hour averaged) suggest this isn't yet a massively scaled system, though dealer usage patterns likely show significant peaks. The infrastructure complexity may be more about governance, compliance, and multi-account organization than pure scale requirements.

## Future Directions and Industry Implications

The transition from RAG to agentic approaches reflects broader industry trends. Toyota's experience suggests that:

- **RAG has limitations**: Data staleness in traditional RAG with preprocessed embeddings is a real problem for rapidly changing data
- **MCP is gaining traction**: Using MCP servers for data access rather than preprocessing into vector databases represents a shift in architecture patterns
- **Platform services matter**: AgentCore's value proposition around handling authentication, isolation, and scaling addresses real pain points that prevent agentic system productionalization
- **Compliance drives complexity**: Much of the architectural complexity stems from legal and security requirements rather than pure technical constraints

The automotive industry's specific needs - frequent data updates during model year rollouts, strict legal disclaimer requirements, multi-stakeholder audiences (dealers, customers, internal staff) - make this a particularly challenging domain for generative AI deployment. Toyota's solutions offer lessons for other heavily regulated industries with similar constraints.

The emphasis on "AI teammates" rather than automation aligns with Toyota's manufacturing philosophy and may offer a more sustainable approach to AI adoption than pure replacement narratives. The 15-17 hour per user time savings in contract analysis, combined with discovery of compliance issues, exemplifies how augmentation can provide value beyond simple efficiency gains.