---
title: "Building Production FinOps AI Agents with Amazon Bedrock AgentCore"
slug: "building-production-finops-ai-agents-with-amazon-bedrock-agentcore"
draft: false
llmopsTags:
  - "data-analysis"
  - "chatbot"
  - "agent-based"
  - "prompt-engineering"
  - "semantic-search"
  - "memory"
  - "cost-optimization"
  - "latency-optimization"
  - "kubernetes"
  - "docker"
  - "langchain"
  - "postgresql"
  - "monitoring"
  - "serverless"
  - "orchestration"
  - "guardrails"
  - "api-gateway"
  - "amazon-aws"
  - "databricks"
industryTags: "tech"
company: "nOps"
summary: "nOps, an AI-powered cloud optimization platform managing over $4 billion in cloud spend, faced challenges scaling their FinOps AI agent \"Clara\" due to API-centric infrastructure that caused high latency, operational complexity, and innovation drag. They transitioned to Amazon Bedrock AgentCore with Databricks Lakehouse Metric Views and Lakebase, replacing their Kubernetes-based LangChain/LangGraph orchestration with a managed agent runtime. This resulted in a 75% reduction in time-to-production (from 10-12 months to 4 months), improved response quality metrics (81.7% correctness, up 145%), reduced tool failure rates from 7.49% to 0.92%, and simplified infrastructure while enabling 4-6 production-ready agents to run on a shared runtime."
link: "https://aws.amazon.com/blogs/machine-learning/how-nops-shipped-finops-agents-75-faster-with-amazon-bedrock-agentcore/"
year: 2026
seo:
  title: "nOps: Building Production FinOps AI Agents with Amazon Bedrock AgentCore - ZenML LLMOps Database"
  description: "nOps, an AI-powered cloud optimization platform managing over $4 billion in cloud spend, faced challenges scaling their FinOps AI agent \"Clara\" due to API-centric infrastructure that caused high latency, operational complexity, and innovation drag. They transitioned to Amazon Bedrock AgentCore with Databricks Lakehouse Metric Views and Lakebase, replacing their Kubernetes-based LangChain/LangGraph orchestration with a managed agent runtime. This resulted in a 75% reduction in time-to-production (from 10-12 months to 4 months), improved response quality metrics (81.7% correctness, up 145%), reduced tool failure rates from 7.49% to 0.92%, and simplified infrastructure while enabling 4-6 production-ready agents to run on a shared runtime."
  canonical: "https://www.zenml.io/llmops-database/building-production-finops-ai-agents-with-amazon-bedrock-agentcore"
  ogTitle: "nOps: Building Production FinOps AI Agents with Amazon Bedrock AgentCore - ZenML LLMOps Database"
  ogDescription: "nOps, an AI-powered cloud optimization platform managing over $4 billion in cloud spend, faced challenges scaling their FinOps AI agent \"Clara\" due to API-centric infrastructure that caused high latency, operational complexity, and innovation drag. They transitioned to Amazon Bedrock AgentCore with Databricks Lakehouse Metric Views and Lakebase, replacing their Kubernetes-based LangChain/LangGraph orchestration with a managed agent runtime. This resulted in a 75% reduction in time-to-production (from 10-12 months to 4 months), improved response quality metrics (81.7% correctness, up 145%), reduced tool failure rates from 7.49% to 0.92%, and simplified infrastructure while enabling 4-6 production-ready agents to run on a shared runtime."
notion:
  pageId: "3bcf8dff-2538-8038-bcfe-f13f8b46e4ca"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-14T06:39:00.000Z"
  lastEditedTime: "2026-08-14T06:39:00.000Z"
  publishedAt: "2026-08-14T06:54:15Z"
---

## Overview

nOps is a cloud financial operations (FinOps) platform that helps customers optimize their cloud spending across AWS, Google Cloud Platform, and Microsoft Azure. The company manages over $4 billion in cloud spend for its customers, focusing on commitment optimization through Reserved Instances and AWS Savings Plans. This case study details how nOps reimagined their AI-powered analytics agent "Clara" by transitioning from a self-managed, API-centric architecture to a production-ready system built on Amazon Bedrock AgentCore. The migration represents a significant shift in their LLMOps approach, moving from orchestration frameworks like LangChain/LangGraph running on Kubernetes to a fully managed agent runtime with purpose-built data infrastructure.

The case study is particularly valuable from an LLMOps perspective because it demonstrates the practical challenges of operating conversational AI agents at scale in a multi-tenant enterprise SaaS environment, and how architectural choices around orchestration, data access patterns, and infrastructure management directly impact both development velocity and production quality metrics.

## The Problem: Scaling AI Agents Beyond API-Centric Infrastructure

Before the migration, nOps had successfully launched Clara as their FinOps AI agent, but the initial architecture revealed structural limitations as they scaled. The original implementation ran on Kubernetes with Amazon Bedrock for model invocation, LangChain/LangGraph for orchestration, and tool wrappers around web APIs. While this allowed for rapid initial delivery, several production challenges emerged that are common in LLMOps deployments.

The primary issues centered around response latency and consistency. When Clara needed to answer analytical questions, it relied on API-based data access patterns that required passing large context windows to the LLM. This increased both latency (time to first response) and reduced answer consistency, as the agent had to reconstruct business logic and context on every invocation rather than querying a governed semantic layer. The team noted that "API-shaped data and large context windows increased turn latency," which is a critical concern for conversational user experiences where users expect near-real-time responses.

System complexity became another bottleneck as the product expanded. The architecture involved multiple orchestration layers (LangChain/LangGraph), observability systems, Kubernetes infrastructure management, and custom tool wrappers. This operational overhead consumed engineering resources that could have been directed toward product innovation. The case study highlights "innovation drag" as engineering time shifted from building new features to maintaining infrastructure, a common challenge when teams build custom LLM orchestration rather than leveraging managed services.

A fundamental architectural mismatch existed between the data access pattern and the analytical workload. Clara's answers were tied to API responses designed for transactional product features, not for analytical queries. This meant that complex financial calculations—like "True Customer Cost" which factors in Enterprise Discount Programs, Private Pricing Agreements, Reserved Instance amortization, and Savings Plan effective costs—had to be recalculated on every query, embedded in prompts, or encoded in tool logic. This created a maintenance burden and increased the risk of inconsistencies between what Clara reported and what appeared in the nOps dashboard.

## Solution Architecture: Agent-Native Infrastructure

The redesigned architecture centers on three core components: Amazon Bedrock AgentCore for runtime and orchestration, Databricks Lakehouse Metric Views for governed analytics semantics, and Databricks Lakebase for durable application state. This represents a shift from a general-purpose orchestration framework to a purpose-built agent platform.

### Agent Runtime Layer

Amazon Bedrock AgentCore serves as the managed agent runtime, providing built-in memory, orchestration, guardrails, and the flexibility to use any framework or model. nOps chose to build on the Strands framework within AgentCore, which gave them the freedom to evolve model choices without switching services. This allows the team to focus on domain logic rather than infrastructure concerns like scaling, request routing, and worker management.

Critically, nOps adopted a single-agent architecture rather than a multi-agent router pattern. Clara runs as one Strands-based agent with direct access to multiple tools: canvas operations, query execution, datasource discovery, and workflow orchestration. This design choice avoids the latency and error-propagation overhead of agent-to-agent handoffs while keeping tool dispatch deterministic. In production LLMOps, multi-agent systems can introduce complexity around routing reliability, error handling across agent boundaries, and debugging conversation flows. The single-agent approach simplifies these concerns while still providing rich functionality through well-designed tools.

The architecture emphasizes streaming responses, which is essential for user experience in conversational AI applications. A custom merge layer sits between the Strands async stream and the Server-Sent Event (SSE) output to the frontend, handling three production concerns simultaneously. First, it maintains heartbeats to keep connections alive during long tool executions, preventing timeout failures. Second, it implements a text buffer with word-boundary-aware flushing that coalesces small model token deltas into readable chunks, reducing UI flicker that can make streaming responses feel jittery or unprofessional. Third, it interleaves real-time canvas update events from a widget-poll worker into the same stream, allowing the UI to update dashboards and visualizations as Clara generates insights. This demonstrates sophisticated production engineering around the streaming experience that goes beyond simply exposing an LLM's token stream.

### Memory and Context Management

Clara uses AgentCore's built-in memory capabilities with three distinct strategies: semantic facts, user preferences, and canvas summaries. This multi-faceted approach to memory represents a thoughtful LLMOps pattern for maintaining context in production conversational systems. Semantic facts capture organizational context such as account structures, cost allocation conventions, and business-specific terminology. User preferences inform layout choices, default aggregations, and chart types, allowing Clara to personalize responses based on how individual users interact with data. Canvas summaries preserve the analytical thread across sessions, enabling users to resume work without re-explaining context after browser refreshes or between work sessions.

An important architectural decision is that sessions are scoped by canvas (the persistent analytical artifact) rather than ephemeral HTTP sessions. This means conversation context persists across browser refreshes and reconnections, which is critical for real-world usage where users may be interrupted or need to share insights with colleagues. This level of session management goes beyond typical chatbot implementations and reflects the requirements of a production enterprise application.

### Security and Multi-Tenancy

For tenant isolation and security, nOps implements Amazon Bedrock Guardrails as a standalone pre-check on raw user prompts before the agent is invoked. This enforces cross-tenant data access policies and prompt-attack detection, preventing users from accessing data they shouldn't see and defending against prompt injection attempts. A tenant policy layer then sanitizes outbound stream chunks and widget events, redacting internal identifiers before they reach the frontend. This defense-in-depth approach to security is essential in multi-tenant SaaS applications where LLMs might inadvertently leak information across tenant boundaries if not properly constrained.

### Data Layer: Semantic Analytics vs. Raw SQL

One of the most significant architectural improvements is the shift from API-based data access to a governed semantic layer using Databricks Lakehouse Metric Views. This represents a fundamental change in how Clara reasons about data and generates insights.

The case study provides a concrete example comparing the old "Raw SQL MCP approach" to the new "Metric View MCP approach." When a user asks "Show my true AWS Cost for the last 30 days by account," the old system required the LLM to understand and generate complex SQL that manually calculated business logic across AWS pricing programs and commitment-based discounts, then joined and normalized values before grouping by account. The SQL involved multiple COALESCE statements, LEFT JOINs, subtractions for discounts and credits, additions for RI and Savings Plan effective costs, and filtering for charge types—all of which had to be reconstructed on every query.

With Metric Views, the same question maps to a simple query against a predefined measure called `true_customer_cost` with a dimension `account_name` and time range filter. The business logic is pre-modeled in the metric view, complete with detailed comments and synonyms that make it discoverable and understandable to the LLM. This provides several LLMOps advantages: one governed definition ensures consistency between chat answers and dashboard outputs, simpler tool logic reduces prompt complexity and error rates, and the semantic layer acts as a contract between the data team and the AI application.

The case study notes that Metric Views include metadata formatted for LLM consumption, including display names, comments explaining business semantics, and custom synonym fields that nOps has co-opted to send key-value pairs for additional context to the frontend. This demonstrates an emerging pattern in LLMOps where data infrastructure is explicitly designed to be LLM-friendly, with metadata that improves discoverability and reduces the cognitive load on the model.

### Durable State and Async Workflows

Databricks Lakebase (serverless PostgreSQL) stores durable product objects including sessions, canvases, widgets, and query/chart specifications. This allows insights generated in conversational interactions to be promoted into persistent, shareable analytics artifacts. Users can ask Clara to create a visualization, and that visualization becomes a saved widget on a canvas that can be shared with teammates, embedded in reports, or updated automatically.

For long-running analytics workflows, nOps introduced an asynchronous execution path that demonstrates production-grade LLMOps architecture. When Clara triggers a heavy analytical process—such as computing savings opportunities across thousands of cloud resources—the system uses workflow workers, Amazon DynamoDB for job tracking, Amazon SNS and SQS for notifications, and Amazon API Gateway WebSocket push to update the UI in real time. This decouples the conversational interaction from the compute-intensive backend work, allowing Clara to remain responsive while background jobs complete. The user receives updates pushed via WebSocket as the analysis progresses, maintaining engagement without blocking the conversation thread.

### Infrastructure Deployment

The entire runtime infrastructure (agent runtime, memory, guardrails, queues, and worker functions) is defined in a single AWS CDK stack, enabling infrastructure-as-code practices that are essential for production LLMOps. This allows the team to version control their infrastructure, reproduce environments consistently, and deploy changes through standard CI/CD pipelines.

The interaction layer uses a Vercel-hosted Next.js application with a Backend-for-Frontend (BFF) pattern that invokes Amazon Bedrock AgentCore. Importantly, the case study notes that "users can invoke the same workflows manually that Clara calls through Strands tools." This design principle ensures that the agent isn't performing "magic" operations that users can't understand or reproduce—instead, Clara automates workflows that are also available through the standard UI. This transparency is valuable for user trust and debugging, and it ensures that the AI-powered features are grounded in the actual product capabilities.

## Results and Production Metrics

The case study provides specific quantitative metrics that are valuable for understanding the real-world impact of the architectural changes, though as with any vendor-provided metrics, these should be interpreted with appropriate context.

### Development Velocity

The team achieved a 75% reduction in time-to-production, from 10-12 months to 4 months, after replacing their self-managed Amazon EKS stack with managed Amazon Bedrock AgentCore. This is attributed to eliminating infrastructure maintenance overhead and allowing developers to focus on product features rather than Kubernetes operations, monitoring, scaling, and orchestration framework updates. The team now runs 4-6 production-ready agents across a shared runtime, suggesting that the platform provides good multi-tenancy and resource isolation.

### Response Quality

Correctness score improved to 81.7%, up 145% from approximately 65% in the previous version. Helpfulness score reached 79.4%, up 138% over the prior period. These metrics suggest that the combination of governed semantic data access and improved orchestration led to more accurate and useful responses. However, the case study doesn't detail the evaluation methodology—how correctness and helpfulness are measured, whether these are human evaluations or automated metrics, and what specific failure modes were reduced. Tool failure rate decreased from 7.49% to 0.92%, which is a significant improvement in reliability. This reduction likely stems from better tool calling methods in the new architecture and more reliable data access patterns.

### Operational Efficiency

The case study claims a 75% time reduction for manual analysis, from approximately 2 hours to 30 minutes for Customer Success Managers and Solutions Architects. This represents a productivity gain for internal users who previously had to manually analyze cloud spend data. The streaming responses and push-based workflow completion reduced daily manual effort across customer success, solutions architecture, and account executive teams, though specific quantitative metrics for these roles aren't provided.

### Infrastructure Simplification

The migration removed the LangGraph/LangChain orchestration layer entirely, replacing it with AgentCore runtime, AgentCore memory, and built-in request routing and observability. This represents a significant simplification, eliminating the need to maintain and version-pin orchestration frameworks, implement custom observability, and manage the complexity of multi-layer abstractions. The team reports this freed engineering resources to focus on product differentiation rather than infrastructure maintenance.

## Critical Analysis and LLMOps Considerations

While the case study presents impressive results, there are several considerations worth noting from an LLMOps perspective.

First, this is a vendor case study published by AWS, so the narrative naturally emphasizes the benefits of AWS services. The comparison is between a self-managed Kubernetes deployment with open-source frameworks and a fully managed AWS service, so some of the gains likely come from the managed service model itself rather than unique capabilities of Bedrock AgentCore. Organizations evaluating similar migrations should consider whether other managed agent platforms (Azure AI Agent Service, Google Cloud Vertex AI Agents, or managed LangChain deployments) might offer similar benefits.

Second, the case study doesn't deeply explore the tradeoffs of the single-agent architecture versus multi-agent approaches. While avoiding agent-to-agent handoff overhead is presented as purely positive, multi-agent systems can provide benefits like specialized expertise, parallel processing, and clearer separation of concerns. The optimal architecture likely depends on the specific use case, and nOps' choice reflects their particular requirements around FinOps analytics workflows.

Third, the migration from API-based data access to Databricks Metric Views represents a significant investment in data infrastructure that goes beyond just changing the agent platform. Organizations attempting similar improvements would need to invest in building a governed semantic layer, which requires collaboration between data engineering, analytics, and AI teams. This is valuable work, but it's not automatically provided by switching to a managed agent service.

Fourth, the evaluation metrics (correctness, helpfulness) are reported without detailed methodology. Production LLMOps requires robust evaluation frameworks with clear definitions of what constitutes a correct or helpful response, ideally with human evaluation on representative samples and adversarial test cases. The improvement percentages are impressive, but without understanding the evaluation approach, it's difficult to assess how well these gains would generalize to other use cases or whether they reflect fundamental improvements versus measurement differences.

Fifth, the case study doesn't discuss cost implications. Managed services like Bedrock AgentCore trade infrastructure management effort for service fees. While the team saved engineering time, organizations should evaluate the total cost of ownership including service costs, data transfer, and the investment in rebuilding the architecture.

## Key LLMOps Patterns Demonstrated

Despite these caveats, the case study illustrates several valuable LLMOps patterns for production AI applications:

**Streaming with production polish**: The custom merge layer that handles heartbeats, word-boundary-aware buffering, and event interleaving demonstrates that production streaming experiences require more than just exposing an LLM's token stream. Attention to these details significantly impacts perceived responsiveness and professional polish.

**Multi-faceted memory strategies**: Using separate memory strategies for semantic facts, user preferences, and canvas summaries shows a thoughtful approach to context management that goes beyond simple conversation history. Different types of information have different persistence and scope requirements.

**Canvas-scoped sessions**: Tying session context to persistent analytical artifacts rather than ephemeral HTTP sessions reflects the requirements of real work tools, where users need to pause and resume analysis across multiple interactions.

**Semantic layer for consistency**: Using governed metric definitions as the interface between AI and data ensures that conversational insights match dashboard outputs, which is critical for user trust in enterprise applications. Designing data infrastructure to be LLM-friendly with rich metadata is an emerging best practice.

**Security as a multi-layer concern**: Implementing guardrails at the prompt level and tenant policy sanitization at the output level demonstrates defense-in-depth for multi-tenant AI applications. Security cannot be an afterthought when LLMs have broad access to data.

**Async workflows for heavy compute**: Decoupling conversational interaction from compute-intensive work through async workflows, job tracking, and WebSocket push maintains responsiveness while enabling complex analytics. This pattern is essential when LLM agents trigger long-running processes.

**Tool transparency**: Ensuring that agent-callable tools map to user-accessible workflows builds trust and makes the system more debuggable. Users can understand and verify what the agent did rather than treating it as a black box.

**Infrastructure as code for reproducibility**: Defining the entire agent runtime in a CDK stack enables version control, environment reproduction, and CI/CD integration, which are fundamental to reliable production deployments.

## Conclusion

The nOps case study demonstrates a successful migration from self-managed LLM orchestration to a managed agent platform, with measurable improvements in development velocity, response quality, and operational efficiency. The architectural shift from API-based data access to a governed semantic layer represents a significant advancement in how their AI agent reasons about financial data. The production engineering around streaming, memory management, multi-tenancy, and async workflows illustrates the complexity of deploying conversational AI in enterprise SaaS environments.

While the case study is presented from a vendor perspective and some benefits stem from the managed service model rather than unique platform capabilities, it provides valuable insights into the practical challenges and solutions for production LLMOps. Organizations building similar analytical AI agents can learn from nOps' approach to data layer design, security, session management, and the tradeoffs between orchestration complexity and managed platform constraints. The emphasis on streaming polish, semantic data access, and tool transparency reflects a mature understanding of what it takes to deliver production-quality AI experiences that users trust and rely upon for critical business decisions.
