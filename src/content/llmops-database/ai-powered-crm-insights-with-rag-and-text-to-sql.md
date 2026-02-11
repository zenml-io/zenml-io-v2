---
title: "AI-Powered CRM Insights with RAG and Text-to-SQL"
slug: "ai-powered-crm-insights-with-rag-and-text-to-sql"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "690892acd9498870027f92c7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:38.962Z"
  createdOn: "2025-11-03T11:31:56.620Z"
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "data-analysis"
  - "summarization"
  - "chatbot"
  - "structured-output"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "evals"
  - "agent-based"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "serverless"
  - "api-gateway"
  - "databases"
  - "monitoring"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "orchestration"
  - "scaling"
  - "security"
  - "compliance"
  - "guardrails"
  - "documentation"
  - "open-source"
  - "elasticsearch"
  - "postgresql"
  - "anthropic"
  - "amazon-aws"
  - "meta"
  - "microsoft-azure"
industryTags: "finance"
company: "TP ICAP"
summary: "TP ICAP faced the challenge of extracting actionable insights from tens of thousands of vendor meeting notes stored in their Salesforce CRM system, where business users spent hours manually searching through records. Using Amazon Bedrock, their Innovation Lab built ClientIQ, a production-ready solution that combines Retrieval Augmented Generation (RAG) and text-to-SQL approaches to transform hours of manual analysis into seconds. The solution uses Amazon Bedrock Knowledge Bases for unstructured data queries, automated evaluations for quality assurance, and maintains enterprise-grade security through permission-based access controls. Since launch with 20 initial users, ClientIQ has driven a 75% reduction in time spent on research tasks and improved insight quality with more comprehensive and contextual information being surfaced."
link: "https://aws.amazon.com/blogs/machine-learning/how-tp-icap-transformed-crm-data-into-real-time-insights-with-amazon-bedrock?tag=soumet-20"
year: 2025
seo:
  title: "TP ICAP: AI-Powered CRM Insights with RAG and Text-to-SQL - ZenML LLMOps Database"
  description: "TP ICAP faced the challenge of extracting actionable insights from tens of thousands of vendor meeting notes stored in their Salesforce CRM system, where business users spent hours manually searching through records. Using Amazon Bedrock, their Innovation Lab built ClientIQ, a production-ready solution that combines Retrieval Augmented Generation (RAG) and text-to-SQL approaches to transform hours of manual analysis into seconds. The solution uses Amazon Bedrock Knowledge Bases for unstructured data queries, automated evaluations for quality assurance, and maintains enterprise-grade security through permission-based access controls. Since launch with 20 initial users, ClientIQ has driven a 75% reduction in time spent on research tasks and improved insight quality with more comprehensive and contextual information being surfaced."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-crm-insights-with-rag-and-text-to-sql"
  ogTitle: "TP ICAP: AI-Powered CRM Insights with RAG and Text-to-SQL - ZenML LLMOps Database"
  ogDescription: "TP ICAP faced the challenge of extracting actionable insights from tens of thousands of vendor meeting notes stored in their Salesforce CRM system, where business users spent hours manually searching through records. Using Amazon Bedrock, their Innovation Lab built ClientIQ, a production-ready solution that combines Retrieval Augmented Generation (RAG) and text-to-SQL approaches to transform hours of manual analysis into seconds. The solution uses Amazon Bedrock Knowledge Bases for unstructured data queries, automated evaluations for quality assurance, and maintains enterprise-grade security through permission-based access controls. Since launch with 20 initial users, ClientIQ has driven a 75% reduction in time spent on research tasks and improved insight quality with more comprehensive and contextual information being surfaced."
---

## Overview

TP ICAP, a financial services firm, developed ClientIQ, an AI-powered CRM assistant that demonstrates sophisticated LLMOps practices for bringing large language models into production. The company's Innovation Lab built this solution to address the challenge of extracting insights from tens of thousands of vendor meeting records accumulated in their Salesforce CRM over many years. The solution showcases multiple production-ready LLMOps patterns including intelligent query routing, hybrid RAG approaches, automated evaluation pipelines, and enterprise security integration.

## Business Context and Problem Space

The core problem TP ICAP faced is common in enterprise settings: rich qualitative data trapped in CRM systems that is underutilized despite containing valuable information about product offerings, integration discussions, relationship insights, and strategic direction. Business users were spending hours manually searching through records, knowing relevant information existed but unable to efficiently locate it. This represents a classic use case for LLM-powered solutions, though one that requires careful production engineering to handle the scale, security requirements, and accuracy expectations of an enterprise environment.

Rather than adopting their CRM's built-in AI assistant, TP ICAP made the strategic decision to build a custom solution. This choice reflects a common LLMOps tradeoff: off-the-shelf solutions may offer faster initial deployment but custom solutions can provide better cost-effectiveness, tighter integration with existing systems, and more precise alignment with specific requirements. The team partnered with AWS and leveraged managed services to accelerate development while maintaining control over the implementation details.

## Architecture and Technical Implementation

ClientIQ's architecture demonstrates several production LLMOps patterns. The system uses a serverless, event-driven architecture built on AWS services. The frontend is a React application hosted in Amazon S3, accessible only within the organization's network through an internal Application Load Balancer. Real-time communication happens through WebSocket connections via Amazon API Gateway, which connects to Lambda functions for processing. This architecture choice reflects considerations around scalability, cost, and latency that are central to production LLM deployments.

The system implements intelligent query routing as a core capability. When a user submits a query, an LLM first analyzes it to determine the optimal processing path. Queries are routed to one of two workflows: a RAG workflow for insights from unstructured meeting notes (handling questions like "Was topic A discussed with AnyCompany in the last 14 days?") or a SQL generation workflow for analytical queries over structured data (handling questions like "Get me a report on meeting count per region for last 4 weeks"). This bifurcated approach recognizes that different types of queries require different processing strategies, and attempting to force all queries through a single pathway would compromise either performance or accuracy.

## Model Selection and Management

TP ICAP's approach to model selection demonstrates mature LLMOps thinking. Rather than standardizing on a single model, they experimented with different models for various tasks and selected the best model for each, balancing latency, performance, and cost. They used Anthropic's Claude 3.5 Sonnet for classification tasks and Amazon Nova Pro for text-to-SQL generation. This task-specific model selection is a best practice in production LLM systems, recognizing that different models have different strengths and that the optimal choice depends on the specific requirements of each task.

By leveraging Amazon Bedrock's fully managed infrastructure, TP ICAP avoided the operational overhead of hosting and managing model infrastructure themselves. This represents a common LLMOps pattern where organizations focus their engineering resources on application logic and domain-specific challenges rather than undifferentiated infrastructure management. The team was able to build a production-ready solution in weeks rather than months, a timeline that would be difficult to achieve with self-hosted models.

## Data Ingestion and Processing Pipeline

The data ingestion pipeline demonstrates careful attention to the challenges of keeping production LLM systems current with source data. Rather than using an off-the-shelf connector, TP ICAP developed a custom connector to interface with their highly tailored Salesforce implementation. This bespoke approach provided the flexibility needed to handle their specific data structures while remaining simple to configure and maintain. The connector uses Salesforce Object Query Language (SOQL) queries and runs daily, providing a balance between freshness and system load.

A particularly sophisticated aspect of the ingestion pipeline is the custom chunking strategy. Rather than relying on default chunking methods, TP ICAP splits data into individual CSV files, one per meeting, as part of the ingestion process. This meeting-level granularity aligns with the natural structure of their data and improves retrieval quality. Each file is automatically tagged with relevant topics from a predefined list using Amazon Nova Pro, further enhancing retrieval precision. The outputs include both the data files and matching JSON metadata files containing tags like date, division, brand, and region.

This preprocessing approach reflects an important LLMOps principle: the quality of RAG system outputs depends heavily on how data is prepared and indexed, not just on the model used for generation. The team's investment in custom chunking and automated tagging demonstrates understanding that production-grade RAG systems require thoughtful data engineering, not just model integration.

## Advanced RAG Implementation with Hybrid Search

ClientIQ's RAG implementation showcases several advanced techniques for improving retrieval quality in production systems. The solution uses Amazon Bedrock Knowledge Bases with Amazon OpenSearch Serverless as the vector store and Amazon Titan v1 for generating embeddings. However, the real sophistication lies in the hybrid search approach that combines metadata filtering with semantic search.

In a standard RAG workflow, semantic search alone can struggle with ambiguous queries. TP ICAP implemented hybrid search using manual metadata filtering capabilities in Amazon Bedrock Knowledge Bases. Documents are first pre-filtered based on metadata fields, and then semantic search is performed within the filtered results. For example, a query like "find notes from executive meetings with AnyCompany in Chicago" could be ambiguous: it might mean meetings with any AnyCompany division that took place in Chicago, or meetings with AnyCompany's division headquartered in Chicago. By pre-filtering on the "Visiting_City_C" metadata field, the system can disambiguate such queries.

The team enhanced this further by leveraging implicit metadata filtering, where Amazon Bedrock FMs automatically analyze queries to understand which values can be mapped to metadata fields and rewrite queries accordingly before retrieval. This automation reduces the engineering burden while maintaining precision. Additionally, users can manually specify filters through the application UI, giving them direct control over search scope when needed. This multi-layered approach—automated implicit filtering, programmatic manual filtering, and user-controlled filtering—provides flexibility while maintaining default behavior that works well for most queries.

## Security and Access Control Integration

One of the most challenging aspects of deploying LLM systems in enterprise environments is maintaining existing security boundaries and access controls. TP ICAP's solution to this problem demonstrates sophisticated integration between their identity management system and the LLM application. They implemented a security framework using Okta group claims mapped to specific divisions and regions. When users sign in, their group claims are attached to their session, and when they ask questions, these claims are automatically matched against metadata fields in either Athena or OpenSearch Serverless, depending on which processing path is followed.

For instance, if a user has access only to EMEA region data, documents are automatically filtered by region. In Athena, this is accomplished by adjusting the SQL query to include the filter. In Amazon Bedrock Knowledge Bases, an additional metadata field filter for "region=EMEA" is added to the hybrid search. Results that don't match the user's permission tags are filtered out, ensuring users only access data they're authorized to see. This unified security model maintains consistency between Salesforce permissions and ClientIQ access controls, preserving data governance across systems.

The team also developed a custom administrative interface for Salesforce admins to manage permissions, using Okta's APIs to add or remove users from groups. This integration demonstrates that production LLM systems in enterprise settings must be tightly coupled with existing identity and access management infrastructure, not treated as standalone applications with separate permission models.

## Automated Evaluation and Quality Assurance

TP ICAP's approach to evaluation represents LLMOps best practices for ensuring consistent quality and performance in production systems. They developed a comprehensive evaluation strategy using Amazon Bedrock Evaluations that involves three phases. First, they created ground truth by working closely with stakeholders and testing teams to develop 100 representative question-answer pairs mirroring real-world interactions. This ground truth set provides a stable benchmark for comparing different configurations.

Second, they implemented programmatic RAG evaluation in their development environment. They triggered evaluations in Amazon Bedrock Evaluations to process the ground truth data and run comprehensive assessments. This allowed them to evaluate different chunking strategies (including default and custom chunking), test different embedding models for retrieval, and compare foundation models for generation using a range of inference parameters. The ability to systematically compare configurations is essential for making data-driven optimization decisions rather than relying on anecdotal evidence or intuition.

Third, they implemented metric-driven optimization by tracking specific dimensions generated by Amazon Bedrock evaluation reports. For retrieval, they monitored content relevance and content coverage. For generation, they tracked response relevance, factual accuracy, retrieval precision, and contextual comprehension. They also evaluated responsible AI metrics. By defining clear target metrics and iterating until reaching performance goals, the team established objective quality standards for their production system.

Perhaps most importantly, they integrated RAG evaluation directly into their CI/CD pipeline, so every deployment automatically validates that changes don't degrade response quality. This continuous evaluation approach is a hallmark of mature LLMOps practices, treating model and retrieval quality as first-class concerns in the deployment process, just as traditional software engineering treats functional correctness and performance. The automated testing gives the team confidence to iterate quickly while maintaining consistently high standards.

## Production Operations and Scalability

The serverless architecture using Lambda functions, SQS queues, and SNS topics demonstrates attention to operational concerns like scalability and reliability. The event-driven design allows the system to handle variable load without manual intervention. Lambda functions consume messages from SQS for scalable processing, and the use of message queues provides buffering and retry capabilities that are essential for production systems.

The WebSocket-based real-time communication provides a responsive user experience while maintaining efficient resource utilization compared to polling-based approaches. The connection handler logs tracking data to DynamoDB, enabling monitoring and analytics on system usage patterns. These operational details may seem mundane compared to the AI components, but they're essential for a system that users rely on daily.

## Business Outcomes and Measured Impact

The measurable business outcomes provide validation of the technical approach. Following the initial launch with 20 users, the solution drove a 75% reduction in time spent on research tasks. This quantified productivity gain demonstrates clear ROI and justifies continued investment. Stakeholders reported improvement in insight quality, with more comprehensive and contextual information being surfaced. This qualitative feedback suggests the system isn't just faster but also more effective than manual approaches.

The success has prompted plans to evolve ClientIQ into a more intelligent virtual assistant capable of handling broader, more complex tasks across multiple enterprise systems. This evolution path is typical of successful LLM deployments: starting with a focused use case, proving value, and then expanding scope based on demonstrated success.

## Critical Assessment and Considerations

While this case study presents a successful implementation, several considerations deserve mention for balanced assessment. The case study is co-authored by AWS and TP ICAP and published on the AWS blog, which naturally emphasizes the positive aspects and the role of AWS services. Some claims, such as the 75% time reduction, are presented without detailed methodology, making it difficult to fully assess the rigor of the measurement.

The decision to build a custom solution rather than use the CRM's built-in AI assistant is presented as straightforwardly beneficial for customization and cost, but this overlooks the ongoing maintenance burden of custom solutions. The long-term total cost of ownership should account for continued development, updates to handle model evolution, and staffing requirements for support.

The reliance on managed AWS services like Amazon Bedrock provides ease of deployment but also creates vendor lock-in and limits portability. Organizations considering similar implementations should consider the implications of tight coupling to a specific cloud provider's AI services.

The evaluation approach, while sophisticated, is based on 100 question-answer pairs. Depending on the diversity of actual usage patterns, this may or may not provide comprehensive coverage of edge cases and failure modes. The case study doesn't discuss how the ground truth set is maintained and expanded as the system evolves and new usage patterns emerge.

The security model based on metadata filtering is elegant but requires careful governance to ensure metadata is consistently and correctly applied to all documents. Any gaps in metadata tagging could create either security vulnerabilities (users accessing data they shouldn't) or availability issues (users unable to access data they should).

Despite these considerations, the case study represents a solid example of production LLMOps practices, demonstrating thoughtful architectural decisions, systematic evaluation, and attention to enterprise requirements like security and scalability. The measured outcomes and plans for expansion suggest genuine business value beyond marketing claims.