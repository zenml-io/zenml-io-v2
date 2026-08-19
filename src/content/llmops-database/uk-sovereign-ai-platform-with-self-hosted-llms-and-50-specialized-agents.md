---
title: "UK-Sovereign AI Platform with Self-Hosted LLMs and 50+ Specialized Agents"
slug: "uk-sovereign-ai-platform-with-self-hosted-llms-and-50-specialized-agents"
draft: false
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "content-moderation"
  - "question-answering"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "chatbot"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "vllm"
  - "postgresql"
  - "docker"
  - "microservices"
  - "guardrails"
  - "documentation"
  - "security"
  - "compliance"
  - "databases"
  - "monitoring"
  - "meta"
  - "amazon-aws"
  - "hugging-face"
industryTags: "tech"
company: "OneAdvanced"
summary: "OneAdvanced, a UK-based enterprise software provider serving over 10,000 customers in regulated industries including healthcare, legal, and public sector, needed to deploy AI capabilities while ensuring strict UK data sovereignty requirements. The company built a production AI solution by self-hosting Llama 4 Maverick and Llama Guard 4 models on Amazon SageMaker AI infrastructure in the London region, orchestrating over 50 specialized agents using Strands Agents SDK on Amazon ECS, and implementing a RAG pipeline backed by Amazon Aurora PostgreSQL with pgvector. The solution went from prototype to production through an AWS advisory engagement, deployed over 50 agents in three weeks, and has been serving customers in production since July 2025, achieving its performance targets while maintaining complete UK data residency and earning ISO 42001 certification for AI governance."
link: "https://aws.amazon.com/blogs/machine-learning/how-oneadvanced-deployed-over-50-ai-agents-on-uk-sovereign-aws/"
year: 2026
seo:
  title: "OneAdvanced: UK-Sovereign AI Platform with Self-Hosted LLMs and 50+ Specialized Agents - ZenML LLMOps Database"
  description: "OneAdvanced, a UK-based enterprise software provider serving over 10,000 customers in regulated industries including healthcare, legal, and public sector, needed to deploy AI capabilities while ensuring strict UK data sovereignty requirements. The company built a production AI solution by self-hosting Llama 4 Maverick and Llama Guard 4 models on Amazon SageMaker AI infrastructure in the London region, orchestrating over 50 specialized agents using Strands Agents SDK on Amazon ECS, and implementing a RAG pipeline backed by Amazon Aurora PostgreSQL with pgvector. The solution went from prototype to production through an AWS advisory engagement, deployed over 50 agents in three weeks, and has been serving customers in production since July 2025, achieving its performance targets while maintaining complete UK data residency and earning ISO 42001 certification for AI governance."
  canonical: "https://www.zenml.io/llmops-database/uk-sovereign-ai-platform-with-self-hosted-llms-and-50-specialized-agents"
  ogTitle: "OneAdvanced: UK-Sovereign AI Platform with Self-Hosted LLMs and 50+ Specialized Agents - ZenML LLMOps Database"
  ogDescription: "OneAdvanced, a UK-based enterprise software provider serving over 10,000 customers in regulated industries including healthcare, legal, and public sector, needed to deploy AI capabilities while ensuring strict UK data sovereignty requirements. The company built a production AI solution by self-hosting Llama 4 Maverick and Llama Guard 4 models on Amazon SageMaker AI infrastructure in the London region, orchestrating over 50 specialized agents using Strands Agents SDK on Amazon ECS, and implementing a RAG pipeline backed by Amazon Aurora PostgreSQL with pgvector. The solution went from prototype to production through an AWS advisory engagement, deployed over 50 agents in three weeks, and has been serving customers in production since July 2025, achieving its performance targets while maintaining complete UK data residency and earning ISO 42001 certification for AI governance."
notion:
  pageId: "3c1f8dff-2538-8002-8782-fdf5ff23e91a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T08:55:00.000Z"
  lastEditedTime: "2026-08-19T08:55:00.000Z"
  publishedAt: "2026-08-19T09:15:49Z"
---

## Overview

OneAdvanced is a UK-based enterprise software provider serving over 10,000 customers across heavily regulated industries including healthcare, legal services, education, and public sector organizations. The company faced a critical challenge in deploying AI capabilities: their customers handle extremely sensitive data such as patient records, legal case files, and compliance documentation, which requires strict data residency guarantees within the UK's legal and regulatory framework. As CTO Andrew Henderson emphasized, data sovereignty is a "hard requirement" for many of their customers, particularly those in the public sector and highly regulated industries.

The company's initial prototyping with Amazon Bedrock showed promising results within a two-week sprint, demonstrating capabilities like chat completion, agents for querying UK statute law, Snowflake data integration, and chart generation. However, to meet their sovereignty requirements, OneAdvanced needed to host models exclusively in their own UK-based AWS accounts with absolute certainty that no data would leave the UK. At the time of implementation, the specific models they wanted to use—Llama 4 Maverick and Llama Guard 4—were not yet available through AWS managed services in the UK region. This necessitated a self-hosting approach where OneAdvanced would deploy, serve, and scale these models while building a production-grade solution encompassing content moderation, document retrieval, agent orchestration, and a no-code agent builder for non-technical users.

## Model Deployment and Infrastructure

OneAdvanced's model serving infrastructure represents a significant LLMOps undertaking focused on self-hosted open-weight models. They deployed Llama 4 Maverick (specifically the `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8` variant) and Llama Guard 4 (`meta-llama/Llama-Guard-4-12B`) using vLLM on Amazon SageMaker AI endpoints. The infrastructure runs on `p5.48xlarge` GPU instances in the London (`eu-west-2`) region, utilizing Hugging Face models with AWS Deep Learning Containers.

The choice of P5 instances was driven by the need to support longer context windows. OneAdvanced targets context lengths of 120K to 128K tokens to enable use cases like large document analysis and multi-turn conversations with extensive history. During the AWS advisory engagement, load testing with vLLM on P5 instances validated that the infrastructure could handle their throughput requirements. The company initially started on `p4d.24xlarge` instances and migrated to `p5.48xlarge` for production workloads, also taking advantage of reserved instance discounts on GPU compute to manage costs.

The deployment of Llama Guard 4 replaced an earlier implementation using Llama Guard 3, which OneAdvanced abandoned after observing high false rejection rates. The guard model runs serially before the main inference model, screening user inputs for harmful content before any inference begins. This architecture ensures that inappropriate or harmful queries are caught at the earliest possible stage, protecting both the system and end users.

## Agent Orchestration at Scale

One of the most distinctive aspects of OneAdvanced's LLMOps implementation is their extensive agent library. The company deployed over 50 task-specific agents spanning healthcare, legal, HR, marketing, logistics, and other domains. Examples include a Care Incident Response assistant, Clinical Safety Bulletin generator, scheme of work generator for education, operational scenario simulation, performance review assistant, Document Comparison tool, and an AWS Architect Agent. Remarkably, OneAdvanced went from their first agent to over 50 agents in only three weeks, with most individual agents being built in less than a day.

Before settling on their agent framework, OneAdvanced evaluated several options including LangChain, LangGraph, and others. They ultimately chose Strands Agents SDK based on several factors: Strands takes a model-first approach with no rigid workflow definitions, it supports turn-taking and interview-style interactions naturally, and it allowed OneAdvanced to move quickly from concept to deployed agent. As Principal Software Engineer Nick Heap explained, Strands stood out as the clear frontrunner because its comprehensive suite of tools not only met their requirements but also offered a future-proof solution that closely aligned with their in-house vision.

Each agent is defined with a system prompt, a set of tools from a shared library, and an optional structured input form. Agents are containerized and deployed on Amazon ECS, with runtime configuration stored in Amazon DynamoDB. Users can browse the agent catalog and select the agent that fits their specific task. This architecture provides flexibility and scalability, allowing OneAdvanced to rapidly deploy new agents without requiring infrastructure changes.

The company also built a no-code agent builder that enables non-developers to create and configure agents through a visual interface. Users can define the agent's persona, design input forms with drag-and-drop fields, write system prompts with references to form fields using an @ syntax to inject form values, and select from a library of available tools. This design democratizes agent creation, making it accessible to product managers, clinicians, and business analysts without requiring them to write code.

Agents draw from a shared tool library that includes calculator, chart creation, file content reader, mermaid diagram generator, organization and personal knowledge search, spreadsheet query with Snowflake integration, text file query, UK statute law search, and web search (which is opt-in per organization and per user query). This composable tool approach means that agents can combine multiple capabilities in a single interaction—for example, querying a Snowflake database and then generating a chart from the results.

OneAdvanced also employs sub-agents and advanced agentic patterns to maintain context window efficiency across complex interactions. A notable design pattern is the interview-style agent, where agents like the Strategic Thinking assistant ask structured questions before providing advice: "Question 1 of 3: What specific pain points does your AI solution aim to address?" This approach builds context through turn-taking rather than expecting users to provide everything upfront, producing better outcomes than open-ended prompts while managing the context window more efficiently.

## RAG Pipeline and Document Retrieval

The RAG system gives agents access to both personal and organization-level document collections, a critical capability for enterprise use cases. Users upload documents through a file management interface into either a personal space or a shared organization space on Amazon S3. The document processing pipeline converts uploaded documents to markdown format and chunks them into 2,048-token segments before embedding them into pgvector for vector similarity search. For longer documents that exceed the chunk size, recursive summarization handles the content appropriately.

For embeddings, OneAdvanced uses the `intfloat/multilingual-e5-large-instruct` model, chosen for its strong multilingual support and instruction-following capabilities. Rather than adopting an off-the-shelf RAG framework, OneAdvanced built their own retrieval system, internally called "Llamadex," giving them full control over the pipeline and allowing them to customize it to their specific needs. They initially chose pgvector for its simplicity and the speed it offered in getting to production. However, as the solution matures, OneAdvanced is reviewing this strategy to evaluate alternatives that might better serve their scaling needs.

When an agent needs to answer a question grounded in uploaded documents, it calls the appropriate retrieval tool—either "Personal knowledge search" or "Organization knowledge search"—which queries pgvector and returns relevant chunks along with source references. Users can see exactly which documents were used to generate a response, supporting transparency and trust in the system's outputs. This citation capability is particularly important in regulated industries where auditability and explainability are critical.

## Security, Compliance, and Responsible AI

Security and responsible AI considerations run through every layer of OneAdvanced's implementation, a direct consequence of serving customers who handle sensitive data daily in sectors like healthcare and legal services. The entire infrastructure runs in the London AWS Region with strict guarantees that no user data leaves the UK. No user queries or responses are retained or used for model training, addressing a common concern in enterprise AI deployments.

Uploaded documents in personal and organization spaces are fully isolated and not readable even by OneAdvanced staff, providing strong privacy guarantees. Llama Guard 4 screens user inputs for harmful content before they reach the main model, implementing content moderation at the infrastructure level. Privacy controls are customizable at organizational levels, allowing different customers to configure the system according to their specific requirements. On the infrastructure side, Amazon GuardDuty provides threat detection on the Amazon S3 document storage layer.

OneAdvanced holds ISO 42001 certification for AI governance—a certification they report being among the first organizations in the UK and Europe to achieve. They are also a signatory to the EU AI Pact, reflecting a proactive approach to responsible AI across their products and operations. These certifications and commitments demonstrate that OneAdvanced views compliance and responsible AI not as afterthoughts but as core requirements embedded in their LLMOps practices.

## Evaluation and Quality Assurance

OneAdvanced has recently implemented an evaluation framework using LLM-as-a-judge with sentiment analysis for continuous quality improvement. This approach allows them to monitor the quality of agent responses over time and identify areas where prompts or agent configurations need refinement. Their roadmap includes backend systems to help users refine their prompts, improving the quality of interactions through guidance rather than requiring users to become prompt engineering experts.

The company is also planning to run parallel LLM models during version transitions to maintain stability for end users. This blue-green deployment approach for model versions would allow them to validate new model versions against production traffic before fully cutting over, reducing the risk of degraded user experiences during model updates.

## Production Results and Business Outcomes

Through the AWS advisory engagement, OneAdvanced went from prototype to production on their UK-sovereign AI solution. The solution has been running in production since July 2025, serving customers for over a year at the time of the blog post publication in August 2026. The deployment met its target performance metrics, though specific quantitative metrics are not detailed in the case study.

OneAdvanced publicly launched this as "the UK's first private sovereign AI for business," with guarantees that no user data is retained, trained on, or logged. The AWS advisory engagement received a 5/5 customer satisfaction score, with Head of Integration Alex Savage noting: "We really appreciate and enjoyed the engagement. We learned a lot which helped us launch a unique offering to the market powered and supported by our strategic partner."

The ability to deploy over 50 agents in three weeks, with most agents built in less than a day, demonstrates the operational efficiency of their LLMOps approach. This rapid agent development capability allows OneAdvanced to quickly respond to customer needs across different sectors and use cases without requiring extensive engineering effort for each new agent.

## Critical Assessment and Tradeoffs

While this case study presents a successful deployment, it's important to consider the tradeoffs inherent in OneAdvanced's approach. Self-hosting models on GPU infrastructure requires significant upfront investment and ongoing operational expertise compared to using managed services. The company needed to build capabilities in model serving, load balancing, monitoring, and GPU resource management that would be provided automatically by managed services like Amazon Bedrock.

The choice of pgvector for the RAG pipeline, while pragmatic for getting to production quickly, is explicitly noted as an area under review. This suggests that the initial implementation may face scaling challenges or limitations that OneAdvanced is looking to address. The recursive summarization approach for long documents, while practical, may lose important context or nuance compared to more sophisticated chunking strategies.

The case study emphasizes the speed of agent deployment but provides limited detail on the quality assurance processes used to validate these agents before production deployment. While the LLM-as-a-judge evaluation framework is mentioned as a recent addition, it's unclear what testing and validation processes were in place during the initial rapid deployment phase.

The serial execution of Llama Guard 4 before the main model adds latency to every request, though this is likely an acceptable tradeoff for the content safety guarantees it provides. The case study does not provide specific latency or throughput metrics, making it difficult to assess the performance implications of this architecture.

Despite these considerations, OneAdvanced's implementation demonstrates a thoughtful approach to LLMOps in a highly constrained environment where data sovereignty requirements precluded simpler alternatives. Their ability to move from prototype to production, deploy dozens of specialized agents, achieve ISO 42001 certification, and serve customers in production for over a year indicates a mature and well-executed LLMOps strategy.
