---
title: "AI-Powered Wealth Management Assistant for Financial Advisors"
slug: "ai-powered-wealth-management-assistant-for-financial-advisors"
draft: false
llmopsTags:
  - "high-stakes-application"
  - "regulatory-compliance"
  - "question-answering"
  - "summarization"
  - "chatbot"
  - "data-analysis"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "evals"
  - "latency-optimization"
  - "cost-optimization"
  - "postgresql"
  - "redis"
  - "cache"
  - "cicd"
  - "monitoring"
  - "api-gateway"
  - "serverless"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "databases"
  - "amazon-aws"
  - "openai"
  - "cohere"
industryTags: "finance"
company: "Altruist"
summary: "Altruist, a custodian and wealth management platform, developed Hazel, an AI assistant specialized for financial advisors. The problem addressed was that advisors spend 45% of their time on operational work across 8-10 different software tools, reducing time spent with clients. Hazel combines general-purpose LLMs with domain-specific knowledge to provide tax planning, financial planning, and investment analysis capabilities. After 10 weeks of production deployment, advisors reported saving an average of $5,900 in taxes per client (roughly $500,000 annually across a typical advisor's client base) while reclaiming 5 hours per week, with tax plans generated in 10 minutes that previously took a full day."
link: "https://www.youtube.com/watch?v=jMGBeCMh4TM"
year: 2026
seo:
  title: "Altruist: AI-Powered Wealth Management Assistant for Financial Advisors - ZenML LLMOps Database"
  description: "Altruist, a custodian and wealth management platform, developed Hazel, an AI assistant specialized for financial advisors. The problem addressed was that advisors spend 45% of their time on operational work across 8-10 different software tools, reducing time spent with clients. Hazel combines general-purpose LLMs with domain-specific knowledge to provide tax planning, financial planning, and investment analysis capabilities. After 10 weeks of production deployment, advisors reported saving an average of $5,900 in taxes per client (roughly $500,000 annually across a typical advisor's client base) while reclaiming 5 hours per week, with tax plans generated in 10 minutes that previously took a full day."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-wealth-management-assistant-for-financial-advisors"
  ogTitle: "Altruist: AI-Powered Wealth Management Assistant for Financial Advisors - ZenML LLMOps Database"
  ogDescription: "Altruist, a custodian and wealth management platform, developed Hazel, an AI assistant specialized for financial advisors. The problem addressed was that advisors spend 45% of their time on operational work across 8-10 different software tools, reducing time spent with clients. Hazel combines general-purpose LLMs with domain-specific knowledge to provide tax planning, financial planning, and investment analysis capabilities. After 10 weeks of production deployment, advisors reported saving an average of $5,900 in taxes per client (roughly $500,000 annually across a typical advisor's client base) while reclaiming 5 hours per week, with tax plans generated in 10 minutes that previously took a full day."
notion:
  pageId: "397f8dff-2538-804a-9aef-ebba5ec5da80"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:04:00.000Z"
  lastEditedTime: "2026-07-08T20:04:00.000Z"
  publishedAt: "2026-07-08T20:07:49Z"
---

## Overview

Altruist is a wealth management custodian founded in 2018 that has rapidly grown to become the fourth largest custodian by number of advisors served in the United States, currently serving over 6,000 financial advisors. The company positions itself as the "Shopify for advisors," providing not just custodial services but a complete software stack for running advisory businesses. In response to the operational burden facing financial advisors, who typically spend 45% of their time working across 8-10 different software tools from a landscape of over 550 available solutions, Altruist developed Hazel, a vertical AI assistant specialized for wealth management professionals.

The broader context for this product includes a significant intergenerational wealth transfer occurring in the industry, where 60-70% of heirs leave their parents' advisors, combined with a projected shortage of financial advisors by 2034 according to McKinsey research. Altruist's vision for Hazel is to empower the "AI-native advisor" by returning significant time to advisors while simultaneously supercharging the advisor-client relationship, allowing advisors to focus on the uniquely human aspects of financial advice such as goal-setting, coaching, and legacy planning that cannot be easily optimized by AI alone.

## Technical Architecture and Infrastructure

Altruist built Hazel on an AWS-based architecture with multiple layers of sophistication. The foundation consists of standard AWS services including firewall management, IAM for access control, Systems Manager, and secrets key rotation. At the core is a Server-Sent Events (SSE) based real-time streaming chatbot that enables advisors to interact with Hazel through conversational interfaces.

The proprietary intelligence layer represents the heart of Hazel's capabilities. This layer includes three key components: multi-step reasoning capabilities that break down complex user queries into multiple sub-queries or tasks, context management for maintaining conversation state and relevant information, and multi-model routing that selects the optimal model or combination of models for each specific task. This routing capability is particularly important as it allows Altruist to leverage the strengths of different foundation models for different types of queries rather than being locked into a single provider.

For semantic search and retrieval, Altruist uses AWS OpenSearch combined with embedding models from both Amazon Titan and Cohere. This hybrid approach to embeddings suggests they are either experimenting with different embedding strategies or using ensemble methods to improve retrieval quality. The data layer consists of AWS S3 for object storage, PostgreSQL for structured data, and ElastiCache with Redis for session management and caching of streaming chat sessions.

On average, Hazel connects to 30-40 different tools per advisor, integrating across custodian information systems, tax planning tools, email systems, and numerous other specialized financial planning instruments. This extensive integration work represents a significant engineering challenge in wealth management where data is often siloed across disparate systems.

## Data Ingestion and Integration

One of the four major technical challenges Altruist identified was handling both structured and unstructured data. Structured data exists in databases and includes account information, transaction histories, and portfolio positions. Unstructured data includes conversations between advisors and clients, uploaded documents like tax returns, and various forms of communication. The challenge was creating a unified system that could reason across both types of data to provide holistic financial insights.

The tax planning product launched 10 weeks before this presentation demonstrates this capability: advisors can upload tax documents, and within minutes Hazel captures key insights about potential tax savings opportunities. This requires sophisticated document understanding, extraction of relevant financial information, and reasoning about tax optimization strategies across multiple dimensions.

## Evaluation and Quality Assurance

Perhaps the most impressive aspect of Altruist's LLMOps approach is their rigorous evaluation and benchmarking framework, which they explicitly state is integrated into their CI/CD pipeline. Altruist works closely with financial advisors, including in-house advisors, to build comprehensive datasets that reflect the top use cases advisors encounter across tax planning, financial planning, and investment analysis. These datasets form the foundation of their evaluation process.

As they iterate on their harnesses and experiment with different approaches, each version is scored against this evaluation dataset across multiple metrics including accuracy, completeness, and other internally developed scores. Critically, no version is deployed to production until it meets specific benchmark thresholds that guarantee a minimum level of accuracy and fidelity. This disciplined approach ensures that Hazel maintains high quality outputs despite the rapid pace of innovation in foundation models.

Altruist provided a concrete example of this evaluation process in action: when a major foundation model provider released a new version of their model, Altruist ran it through their evaluation framework within minutes. Despite the new model offering half the latency of the previous version, it regressed on several accuracy and completeness benchmarks, so Altruist chose not to deploy it to production. This demonstrates the value of having robust evaluation frameworks that can objectively assess model performance rather than simply chasing the latest releases.

The evaluation system also includes online monitoring with sampled scoring happening in real-time as advisors use the product. This allows them to detect regressions or issues as they occur in production, with alerts being sent to their monitoring system through DataDog.

## Enterprise Security and Compliance

Operating in the regulated financial services industry, particularly as a custodian holding client assets, Altruist faced significant compliance and security requirements. The fact that Hazel was deployed within Altruist itself and is used by hundreds of Altruist employees was presented as validation that the product met stringent internal security and compliance standards.

Key security measures include zero data retention agreements with all AI model providers in their stack, ensuring that sensitive financial data never persists with third-party LLM providers. The system is SOC 2 certified and implements encryption both at rest and in transit. Role-based access controls allow advisors to configure Hazel access permissions appropriately among their team members. These measures are critical for maintaining client confidentiality and meeting regulatory requirements in wealth management.

## Multi-Agent Architecture and Specialized AI

Altruist explicitly describes building specialized AI agents on top of their search and retrieval infrastructure that convert data into actionable outcomes. The initial agent focused on tax planning, with the presentation mentioning that a holistic financial planning agent was planned for launch in July. This suggests a modular agent architecture where different agents specialize in different domains of financial advice, all sharing common infrastructure for data retrieval, model routing, and evaluation.

The approach of combining general-purpose intelligence from foundation models with domain-specific knowledge and tools is central to Altruist's strategy. Rather than trying to fine-tune models on financial data, they appear to be using a RAG-based approach where general-purpose models are provided with relevant context and connected to specialized financial planning tools and knowledge bases. This allows them to leverage rapid improvements in foundation models while maintaining control over the domain-specific reasoning and outputs.

## Production Results and Impact

The production metrics Altruist shared are notable, though as with any vendor presentation, they should be considered with appropriate skepticism. According to their data from the first 10 weeks of production deployment, advisors using Hazel for tax planning saved an average of $5,900 in taxes per client. Given that a typical advisor serves about 100 households, this translates to approximately $500,000 in annual tax savings across an advisor's entire client base.

From an efficiency perspective, advisors reported saving 5 hours per week, which accumulates to roughly 30 days per year. The time to generate a tax plan was reduced to 10 minutes with Hazel compared to what could previously take a full day of advisor time. One specific example mentioned an advisor who runs an outsourced tax management business and typically completes 50-100 tax plans per month. For a particularly complex client with multiple businesses, this advisor had allocated a full day but completed the analysis in 5 minutes using Hazel.

The product launch generated significant market and media attention, with coverage in Bloomberg, Wall Street Journal, and CNBC. Altruist claimed there was a $150 billion market impact across major wealth management companies, suggesting the launch fundamentally repriced how the market values AI in wealth management, though the specifics of this claim are somewhat vague and difficult to independently verify.

## Critical Assessment and Tradeoffs

While the results Altruist presents are impressive, several considerations warrant balanced assessment. First, the claimed tax savings and time reductions come from early adopters during the first 10 weeks of deployment, which may not be representative of long-term average usage. Early adopters are often more technically sophisticated and may achieve better results than typical users. Additionally, the most dramatic improvements may come from addressing previously neglected opportunities, with diminishing returns over time as the low-hanging fruit is harvested.

The approach of using multi-model routing and maintaining flexibility across multiple foundation model providers is strategically sound but adds operational complexity. Altruist must manage relationships with multiple vendors, handle different API specifications, and maintain evaluation frameworks that can assess models fairly across different providers. However, this complexity appears justified given the rapid pace of innovation in foundation models and the risk of being locked into a single provider that may fall behind.

The integration challenge of connecting to 30-40 tools per advisor is substantial and represents ongoing maintenance burden as these third-party systems evolve their APIs and data formats. This is likely a significant engineering cost that isn't reflected in the presentation but is critical for production reliability.

The emphasis on evaluation and not deploying models that regress on benchmarks is commendable and represents mature LLMOps practices. However, this conservative approach may mean Altruist misses out on improvements in other dimensions not captured by their evaluation framework. Benchmarks can only measure what they're designed to measure, and there's always a risk that important capabilities or improvements exist outside the evaluation scope.

From a product strategy perspective, the focus on vertical AI specialized for wealth management is well-justified given the domain complexity, regulatory requirements, and integration challenges. A general-purpose AI assistant would struggle to deliver the same value without deep financial planning knowledge and tight integration with custodian data. However, this specialization also limits the addressable market and requires Altruist to build and maintain significant AI expertise in-house rather than relying primarily on third-party solutions.

The architectural decision to build on AWS appears sound given the availability of managed services for key components like OpenSearch, but it does create vendor lock-in at the infrastructure level. The use of SSE for streaming responses is appropriate for the conversational interface but requires careful handling of connection management and error recovery in production.

Overall, Altruist's approach to LLMOps demonstrates mature practices around evaluation, security, and production deployment in a regulated industry. The emphasis on CI/CD integration for evaluations, zero data retention with model providers, and real-time monitoring represents solid production engineering. The multi-agent architecture with specialized agents for different financial planning domains appears to be a scalable approach that allows incremental deployment of new capabilities. While the specific performance claims should be viewed with appropriate caution, the underlying technical approach appears well-thought-out for the challenges of deploying LLMs in production for mission-critical financial advice.
