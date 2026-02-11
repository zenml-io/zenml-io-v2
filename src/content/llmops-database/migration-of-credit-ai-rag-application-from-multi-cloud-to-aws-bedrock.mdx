---
title: "Migration of Credit AI RAG Application from Multi-Cloud to AWS Bedrock"
slug: "migration-of-credit-ai-rag-application-from-multi-cloud-to-aws-bedrock"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69315ea7b888a08a935c125d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:32:42.775Z"
  createdOn: "2025-12-04T10:12:55.059Z"
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "summarization"
  - "classification"
  - "high-stakes-application"
  - "structured-output"
  - "regulatory-compliance"
  - "realtime-application"
  - "chatbot"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "reranking"
  - "chunking"
  - "cost-optimization"
  - "latency-optimization"
  - "multi-agent-systems"
  - "agent-based"
  - "evals"
  - "error-handling"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "microservices"
  - "cicd"
  - "serverless"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "elasticsearch"
  - "langchain"
  - "cache"
  - "anthropic"
  - "cohere"
  - "amazon-aws"
  - "openai"
industryTags: "finance"
company: "Octus"
summary: "Octus, a leading provider of credit market data and analytics, migrated their flagship generative AI product Credit AI from a multi-cloud architecture (OpenAI on Azure and other services on AWS) to a unified AWS architecture using Amazon Bedrock. The migration addressed challenges in scalability, cost, latency, and operational complexity associated with running a production RAG application across multiple clouds. By leveraging Amazon Bedrock's managed services for embeddings, knowledge bases, and LLM inference, along with supporting AWS services like Lambda, S3, OpenSearch, and Textract, Octus achieved a 78% reduction in infrastructure costs, 87% decrease in cost per question, improved document sync times from hours to minutes, and better development velocity while maintaining SOC2 compliance and serving thousands of concurrent users across financial services clients."
link: "https://www.youtube.com/watch?v=Dz6JZZCss4w"
year: 2025
seo:
  title: "Octus: Migration of Credit AI RAG Application from Multi-Cloud to AWS Bedrock - ZenML LLMOps Database"
  description: "Octus, a leading provider of credit market data and analytics, migrated their flagship generative AI product Credit AI from a multi-cloud architecture (OpenAI on Azure and other services on AWS) to a unified AWS architecture using Amazon Bedrock. The migration addressed challenges in scalability, cost, latency, and operational complexity associated with running a production RAG application across multiple clouds. By leveraging Amazon Bedrock's managed services for embeddings, knowledge bases, and LLM inference, along with supporting AWS services like Lambda, S3, OpenSearch, and Textract, Octus achieved a 78% reduction in infrastructure costs, 87% decrease in cost per question, improved document sync times from hours to minutes, and better development velocity while maintaining SOC2 compliance and serving thousands of concurrent users across financial services clients."
  canonical: "https://www.zenml.io/llmops-database/migration-of-credit-ai-rag-application-from-multi-cloud-to-aws-bedrock"
  ogTitle: "Octus: Migration of Credit AI RAG Application from Multi-Cloud to AWS Bedrock - ZenML LLMOps Database"
  ogDescription: "Octus, a leading provider of credit market data and analytics, migrated their flagship generative AI product Credit AI from a multi-cloud architecture (OpenAI on Azure and other services on AWS) to a unified AWS architecture using Amazon Bedrock. The migration addressed challenges in scalability, cost, latency, and operational complexity associated with running a production RAG application across multiple clouds. By leveraging Amazon Bedrock's managed services for embeddings, knowledge bases, and LLM inference, along with supporting AWS services like Lambda, S3, OpenSearch, and Textract, Octus achieved a 78% reduction in infrastructure costs, 87% decrease in cost per question, improved document sync times from hours to minutes, and better development velocity while maintaining SOC2 compliance and serving thousands of concurrent users across financial services clients."
---

## Overview

Octus is a leading provider of data, news, information, analytics, and workflow products for the credit market, serving as essentially a "Bloomberg of credit." With over 10 years in operation and clients spanning investment banks, investment managers, law firms, and advisory firms across Americas, Europe, and Asia, Octus launched Credit AI in 2023 as the first generative AI product in the trade market industry. Credit AI (and its next-generation version Credit AI Vault) provides a RAG-based system that enables users to ask natural language questions over millions of FIDOC steel documents, transcripts, and Octus intelligence data, delivering rapid insights with source citations for audit readiness.

The company faced a significant challenge: Credit AI was initially built on a multi-cloud architecture with OpenAI models hosted on Azure while the rest of Octus's product portfolio and data infrastructure resided on AWS. This created operational complexity, data shuttling overhead, scalability bottlenecks, and increased costs. The presentation at AWS re:Invent detailed their comprehensive migration journey from this fragmented multi-cloud setup to a unified AWS architecture centered on Amazon Bedrock, providing valuable lessons on productionizing and migrating generative AI applications at scale.

## The Challenge: Multi-Cloud Complexity and Production Scaling

The initial Credit AI architecture utilized OpenAI models (which were not available on AWS at launch time in 2023) while maintaining all other Octus products and data services on AWS. This created several critical challenges that are common to many organizations running generative AI in production:

**Scalability limitations** emerged as a primary concern. Octus was self-hosting embedding models on dedicated GPU instances, which became bottlenecks as user load increased. The GPU infrastructure was difficult to scale elastically and presented single points of failure—when an embedding instance went down, the entire pipeline became unavailable. This architecture could not support the multi-tenant isolation requirements that clients demanded, as dedicating separate GPU instances per client would have been prohibitively expensive.

**Operational complexity** stemmed from managing RAG pipeline components across clouds. The team had to maintain chunking infrastructure, embedding model instances, vector databases, and orchestration logic while also shuttling data between AWS and Azure. This required expertise in multiple cloud platforms and made monitoring, debugging, and maintaining the system significantly more difficult. The presentation emphasized that "52% of companies report fragmented tooling and vibe-based evaluation," meaning they were "duct taping different tools, applications, and cloud providers" without end-to-end observability.

**Cost concerns** were significant, with the company running infrastructure across two clouds and managing dedicated GPU instances for embeddings. The presenter noted that approximately half the audience admitted to spending more on AI infrastructure than originally budgeted, and Octus was no exception. Managing self-hosted embedding models and maintaining parallel infrastructure created unnecessary expenses.

**Latency and user experience** issues arose from the distributed architecture. Users expected sub-second response times for their queries, but the complex data flows and external service calls introduced delays. The system was also using third-party tools like TrueLens for hallucination detection, which added additional latency through external API calls.

**Security and compliance** requirements added another layer of complexity. As a SOC2-compliant platform serving sophisticated financial services customers, Octus needed physical data isolation between clients, comprehensive audit trails, zero-downtime deployments, and the ability to handle private client documents securely. Managing these requirements across multiple clouds increased the attack surface and compliance burden.

## Non-Negotiable Requirements

Before embarking on the migration, Octus established a set of non-negotiable requirements that would guide all architectural decisions. The presentation emphasized that these requirements apply to any software architecture but are often overlooked when organizations focus solely on the "coolest" AI technology:

- **Scalability**: Ability to handle increased development speed, reduced complexity management, improved response times, and growth in concurrent users (from POC levels of ~10 users to thousands in production)
- **Cost optimization**: Minimize infrastructure costs and achieve better cost per question metrics
- **Performance**: Sub-second latency for user queries to ensure good user experience
- **Reliability**: Zero downtime deployments and high availability to meet SOC2 SLA obligations
- **Development velocity**: Ability to iterate quickly and deliver features faster as AI space and customer demands evolve
- **Unified architecture**: Reduce operational overhead by consolidating cloud infrastructure where feasible

The presentation made an important distinction between POC and production requirements. In POC, you might test with hundreds of documents, accept whatever latency you get, have up to 10 users, not worry about infrastructure quality, accept "good enough" accuracy, and skip comprehensive security/compliance considerations. In production, you're dealing with millions of documents, need sub-second latency, serve thousands of concurrent users, require high availability and disaster recovery, must achieve 99%+ accuracy, implement full SOC2/legal/governance controls, and need fully automated CI/CD pipelines with comprehensive monitoring.

## Solution Architecture: Migration to Amazon Bedrock

The migration centered on adopting Amazon Bedrock as the managed service foundation for the RAG pipeline, eliminating the need to self-host and manage embedding models, vector databases, and LLM infrastructure. The final architecture consisted of two main workflows:

### Data Ingestion Workflow

The data ingestion pipeline was designed as an event-driven architecture to handle new documents and updates efficiently:

**Document extraction and validation** begins when new documents arrive in Amazon S3, triggering an AWS Lambda function. This Lambda performs initial validation on document types and sizes, extracting relevant metadata from each document. The metadata strategy proved crucial for later retrieval optimization.

**Text extraction via Amazon Textract** follows, where the validated documents are sent to Amazon Textract to extract text, structure, and information while preserving document layout and relationships between content elements. This structured extraction is particularly important for complex financial documents with tables, multiple columns, and intricate formatting.

**Storage and chunking** occurs next, with extracted content stored in S3 in a separate prefix from source documents, maintaining data lineage with timestamps and metadata. Amazon Bedrock's knowledge base then chunks these documents according to configured strategies (discussed in detail below).

**Embedding generation** uses Cohere embedding models (accessible through Bedrock) to generate vector representations of chunks, capturing semantic meaning. These embeddings are stored in Amazon OpenSearch Service for efficient similarity search during retrieval.

### Query and Answer Workflow

The Q&A flow demonstrates sophisticated orchestration and multiple optimization techniques:

**User interface and routing** starts with the web application hosted on AWS Fargate, which scales automatically based on traffic—addressing the scalability non-negotiable requirement. Initial user validation occurs at this layer, ensuring proper authentication and authorization.

**Streaming and orchestration** uses Amazon MSK (Managed Streaming for Apache Kafka) to handle inter-service communication while maintaining high throughput and efficiency for query inputs. A dedicated orchestration layer manages the query cycle, making calls to different services and integrating with the RAG pipeline.

**Retrieval process** begins when a user query is sent to the Cohere embedding model (via Bedrock) to generate query vectors. These vectors are used to search the OpenSearch vector database for relevant document chunks. The system employs multiple retrieval optimization techniques including hybrid search (combining semantic and text-based search), metadata filtering, and reranking.

**Safety and quality controls** are enforced through Amazon Bedrock Guardrails, which provides content filtering, topic controls, PII protection, hallucination detection, and relevancy checks—all built into the pipeline without external API calls.

**Response generation** sends the retrieved context along with the original query to the LLM (Anthropic Claude or other models available on Bedrock) to generate the final response, which is returned to the user with citations to source documents.

## Critical Design Decisions and Optimizations

The presentation devoted significant attention to the iterative design decisions that transformed the initial architecture into a production-ready, high-performance system:

### Chunking Strategy Evolution

Chunking strategy proved to be one of the most critical design decisions, as it directly impacts retrieval quality. Octus tested three approaches:

**Fixed-size chunking** was tried first, as it's the simplest approach. It works well for small, uniform documents but showed poor results for Octus's long, complex financial documents. The main problem was that fixed chunks could split content mid-sentence, mid-paragraph, or mid-table, destroying semantic coherence and context.

**Hierarchical chunking** showed more promise by implementing a two-layer structure: smaller "child chunks" for precise matching and larger "parent chunks" for context. When users asked queries, both child and parent chunks were sent to the LLM, providing both precision and context. However, this approach hit a technical limitation: the Cohere embedding model had a 512-token limit, and the larger parent chunks exceeded this limit, causing processing failures.

**Semantic chunking** ultimately provided the best results and became the production choice. This approach uses a large language model to identify natural breakpoints within documents by analyzing semantics and understanding relationships between sections and paragraphs. The LLM divides documents at logical boundaries such as section ends or topic switches. While this approach has an associated cost (requiring LLM inference for every document during ingestion), Octus determined the cost was justified by the significantly improved retrieval quality. The presentation emphasized that "there is no one-size-fits-all" solution—chunking strategy must be tailored to document types, and a strategy for support documents cannot be the same as one for 200-page financial documents.

### Embedding Model Selection

Moving from self-hosted embedding models on dedicated GPUs to Cohere embedding models via Amazon Bedrock delivered multiple benefits:

**Performance improvements** came from Cohere's superior retrieval results on complex financial documents and its ability to understand relationships between different entities in financial contexts. The model also provided multilingual capabilities needed to serve Octus's global customer base across Americas, Europe, and Asia.

**Operational transformation** was dramatic. Previously, embedding instances were bottlenecks and single points of failure. The managed service eliminated concerns about model upgrades, CUDA errors, instance management, and scaling. The presentation noted this "increased their throughput by 10x, and from a bottleneck, it became a non-issue." This also enabled the multi-tenant architecture that was previously impossible with dedicated GPU infrastructure.

**Cost and scalability** improved significantly by eliminating the need to provision and maintain dedicated GPU instances, which were expensive and difficult to scale elastically.

### Multi-Tenant Architecture and Isolation

Octus's clients include sophisticated financial institutions that often want to bring their own private data into the system. This created strict requirements for data isolation:

**Physical separation** was implemented through separate knowledge bases per client, rather than relying on client IDs or logical filters within a shared knowledge base. This provides clear physical boundaries that satisfy both customer security demands and auditor requirements for compliance.

**Access management** required several innovative components that the Octus engineering team built:
- **Authorization and access management**: Real-time checks when users log in determine which knowledge bases they can access
- **Fine-grained document access control**: Users may have access to a knowledge base but not all documents within it, requiring document-level permission enforcement
- **Global identifier service**: Financial entities can be referenced multiple ways (e.g., "ABC Corp", "ABC Corporation", ticker symbol "ABC"), and this service manages cross-references to ensure queries about ABC return relevant information regardless of how the entity is mentioned in documents

This multi-tenant architecture would not have been feasible with self-hosted embedding infrastructure, as dedicating GPU instances per client would have been prohibitively expensive. The managed Bedrock service made it economically viable.

### Guardrails and Safety Controls

Amazon Bedrock Guardrails provided integrated safety controls that replaced external service dependencies:

**Content filtering** uses rules-based filtering to block inappropriate content, specific topics, and particular query types. For financial compliance, this includes preventing PII leakage and ensuring no inappropriate content reaches users.

**Hallucination controls and relevancy checks** were previously handled by a third-party application (TrueLens) that required external API calls, adding latency and cost. By using Guardrails built into the Bedrock pipeline, the system eliminated these external calls, reduced token usage, and improved response time and performance.

**Single-call efficiency** meant that instead of making multiple calls across different services for safety checks, everything happens in one integrated pipeline, simplifying architecture and improving performance.

### Advanced Retrieval Optimizations

As the system matured, Octus implemented several advanced RAG techniques:

**Hybrid search** combines semantic search (based on meaning) with traditional text-based keyword search, then merges results to improve recall and precision. This addresses cases where semantic search alone might miss exact terminology matches that users expect.

**Metadata filtering** leverages the extensive metadata extracted during document ingestion. The system can automatically identify relevant metadata based on queries and filter results to only include documents matching that metadata, significantly improving result relevance.

**Reranking** addresses a common RAG challenge where initial retrieval returns many marginally relevant chunks. Previously, Octus hosted a separate reranking model, adding infrastructure complexity. Amazon Bedrock Knowledge Base provides out-of-the-box integration with reranking models that score retrieved chunks based on relevance to the prompt, sort them, and potentially reduce the number passed to the LLM. This improves both accuracy and performance.

**Query reformulation** handles complex user queries by breaking them down into simpler sub-queries, running retrieval in parallel for each sub-query, aggregating results, and providing the combined context to the LLM. This prevents "content dilution" that can occur when complex queries are used directly for retrieval.

## Data Strategy Foundation

The presentation emphasized that "your AI is as good as the data behind it," and Octus had invested significantly in unified data architecture that proved crucial for Credit AI's success:

**Data collection and standardization** begins with "as-reported" data from various sources (third-party data, internally prepared data). A master data management system centralizes data collection and provides unified identifier lookups through a reference data service. This is critical in financial services where different identifier types (CUSIP, ISIN, etc.) must be mapped to enable joining datasets.

**Document centralization** ensures all documents are ingested through a standardized pipeline, providing consistency and enabling comprehensive document-level metadata.

**ETL pipelines** (primarily using AWS Glue with other technologies for complex cases) transform as-reported data structures into normalized data suitable for application consumption.

**Unified API layer** provides consistent data access for all applications, including Credit AI. This creates economy of scale, consistency, reliability, and better monitoring by having a single data access layer rather than each engineer writing custom queries.

This investment in data architecture, made across the entire Octus platform, delivered significant dividends for Credit AI by ensuring clean, well-structured, comprehensively tagged data that the RAG system could effectively search and retrieve.

## Migration Approach and Implementation

The actual migration was executed with careful planning to minimize risk and ensure zero downtime:

**Infrastructure as code** using Terraform ensured all infrastructure could be version-controlled, reviewed, and deployed consistently across environments.

**CI/CD pipeline integration** provided automated build, test, and deployment workflows. This was critical for maintaining velocity during migration while ensuring quality.

**Parallel operation** meant running the old and new architectures simultaneously, performing A/B testing to validate responses, accuracy, performance, and user experience before cutting over traffic.

**Security and compliance validation** included comprehensive security scanning using tools like Wiz for cloud security posture management, ensuring the new architecture met all SOC2 and regulatory requirements before serving production traffic.

**Monitoring and alerting** used Datadog for observability and PagerDuty for alerting, ensuring the team had full visibility into system health and could respond quickly to any issues. The presentation emphasized that these "are not just specific to Credit AI, that's across the board, but it's very important to call it out because when you look at a Gen AI product, focus is always on the LLM and the coolest technology but not necessarily on all other things that you have to have in place for it to scale in production."

## Results and Impact

The migration delivered impressive quantitative results that validated the architectural approach:

**Cost reduction of 78%** in overall infrastructure costs came from eliminating self-managed GPU instances, gaining economy of scale by leveraging shared AWS services already used for other Octus products, and using managed services that scale efficiently.

**Cost per question decreased by 87%**, demonstrating dramatic improvement in unit economics that makes the service more sustainable as it scales.

**Document sync time improved from hours to minutes** due to the ability to scale embeddings elastically with Amazon Bedrock rather than being constrained by fixed GPU instance capacity.

**Development velocity increased** because engineers no longer needed to manage RAG pipeline complexity, GPU infrastructure, or multi-cloud orchestration. They could focus on building features that customers wanted.

**Reduced maintenance overhead** from consolidating from multi-cloud to unified AWS architecture meant monitoring one infrastructure instead of two, simplifying operations.

**Improved user experience** through better latency, the ability to support private documents (enabled by multi-tenant architecture), and faster feature delivery.

The presentation noted that these results addressed all the non-negotiable requirements: scalability, cost reduction, response performance, SLA compliance, simplified architecture, and increased focus on high-value customer features.

## Lessons Learned and Best Practices

The presenters shared several valuable lessons from the migration experience:

**Clear requirements from day one** helped maintain focus throughout the migration. Having well-defined non-negotiable requirements prevented scope creep and ensured decisions aligned with business objectives.

**Strong AWS support** through solution architects was crucial during both POC and production migration phases. The ability to quickly de-risk unknowns through collaborative POC work (completed in about two weeks with "very promising results") built confidence in the approach.

**Constantly evolving landscape** presents ongoing challenges. Even when staying "10 steps ahead," the industry moves fast, and "you're constantly catching up." The solution is to simplify architecture in ways that enable quick iteration and adaptation.

**POC-to-production gap** requires careful planning. As the presentation emphasized, POC proves feasibility with hundreds of documents and ~10 users, but production requires different thinking about scale (millions of documents, thousands of users), latency (sub-second vs. "we can tune it later"), reliability (high availability, disaster recovery), quality (99%+ accuracy), compliance (SOC2, security, governance), and operations (full CI/CD, monitoring, alerting).

**Best practices for RAG applications** were summarized memorably as "Dancing coconuts":
- **Chunking**: Use meaningful chunking strategies appropriate to your document types
- **Optimize**: Implement parsing strategies, hybrid search, reranking, and caching for common queries
- **Cache**: Store results for frequent queries to reduce vector database hits
- **Observability**: Log everything—user experience, model responses, quality metrics
- **Never go blind**: Build comprehensive monitoring and alerting
- **Update**: Perform incremental updates to vector stores to avoid stale data and stale answers
- **Test**: Test repeatedly and thoroughly
- **Scale**: Increase load gradually and understand your application's break points

## Future Roadmap

Octus is focusing on two main themes going forward:

**Agentic workflows and agentic AI** represent the next evolution, with Octus having already launched "Covenant AI" for deep research on covenant agreements, now in production.

**API-based interactions** are seeing increasing demand from customers who want to integrate Credit AI capabilities into their own workflows and applications. This requires focus on MCP (Model Context Protocol) server design and implementation, which is "a new space for all of us."

## AWS Programs for Migration Support

The presentation concluded with information about AWS programs available to support similar migrations:

**For POC phase**: Demo Squad program and Gen AI Innovation Center provide custom demos, advisory services, and validation of use cases and outcomes.

**For advanced phases** (piloting, deploying, production): AWS Professional Services and partner network offer consulting, funding options, and technical capabilities.

**Migration Acceleration Program (MAP)** provides structured support through discovery, preparation, validation, execution, and post-production phases, including security/compliance validation, data strategy assessment, technology solution validation, and go-to-market support.

**Migration complexity patterns** were categorized:
- Simple endpoint swap (1-4 weeks): Switching external LLM API endpoints to Amazon Bedrock
- Advanced workloads (1-3 months): Migrating fine-tuned or custom models using Bedrock's custom import or model distillation features
- Full stack (varies): Complete application migration including multi-region support, agents, and complex orchestration

**Model evaluation capabilities** in Bedrock help organizations select the right model for their use case by testing multiple models for quality, speed, and cost before finalizing selection.

## Critical Assessment

While the presentation provides valuable insights into a real-world Gen AI migration, it's important to maintain balanced perspective:

**Positive aspects**: The case study demonstrates genuine production deployment with real customers and measurable results. The cost savings (78% infrastructure, 87% per-question) are substantial if accurate. The architectural approach of using managed services to reduce operational overhead is sound, and the emphasis on production concerns (security, compliance, monitoring) beyond just model performance is valuable.

**Vendor context**: This is an AWS re:Invent presentation promoting AWS services, particularly Amazon Bedrock. While the results appear legitimate, they should be viewed as one data point rather than universal truth. The 78% cost reduction includes factors specific to Octus's situation (multi-cloud consolidation, elimination of dedicated GPUs) that may not apply elsewhere.

**Generalizability questions**: Organizations already unified on a single cloud, already using managed services, or with different document types may see different results. The multi-tenant architecture requirements and complex financial documents make this a somewhat specialized case.

**Limited technical depth**: While the presentation covers many topics, some areas lack detail that would help others replicate the approach, such as specific chunking configurations, reranking parameters, embedding dimensions, vector search parameters, or detailed cost breakdowns.

**Migration complexity**: The presentation acknowledges that migrating production systems is harder than building new POCs, but may understate the organizational, process, and cultural challenges beyond technical architecture.

**Model lock-in considerations**: While Bedrock provides access to multiple models, organizations should consider the portability implications of building deeply on managed service abstractions.

Overall, this represents a substantive case study of production Gen AI migration with measurable benefits, providing valuable patterns and lessons learned, while acknowledging that specific results will vary based on organizational context and requirements.