---
title: "AI-Powered Client Services Assistant for Post-Trade Services"
slug: "ai-powered-client-services-assistant-for-post-trade-services"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "677e3ae26335b7987498b1bf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:54:35.715Z"
  createdOn: "2025-01-08T08:44:18.911Z"
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "error-handling"
  - "api-gateway"
  - "databases"
  - "monitoring"
  - "security"
  - "compliance"
  - "fastapi"
  - "serverless"
  - "amazon-aws"
  - "microsoft-azure"
  - "anthropic"
industryTags: "finance"
company: "London Stock Exchange Group"
summary: "London Stock Exchange Group developed a client services assistant application using Amazon Q Business to enhance their post-trade customer support. The solution leverages RAG techniques to provide accurate and quick responses to complex member queries by accessing internal documents and public rulebooks. The system includes a robust validation process using Claude v2 to ensure response accuracy against a golden answer dataset, delivering responses within seconds and improving both customer experience and staff productivity."
link: "https://aws.amazon.com/blogs/machine-learning/london-stock-exchange-group-uses-amazon-q-business-to-enhance-post-trade-client-services?tag=soumet-20"
year: 2025
seo:
  title: "London Stock Exchange Group: AI-Powered Client Services Assistant for Post-Trade Services - ZenML LLMOps Database"
  description: "London Stock Exchange Group developed a client services assistant application using Amazon Q Business to enhance their post-trade customer support. The solution leverages RAG techniques to provide accurate and quick responses to complex member queries by accessing internal documents and public rulebooks. The system includes a robust validation process using Claude v2 to ensure response accuracy against a golden answer dataset, delivering responses within seconds and improving both customer experience and staff productivity."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-client-services-assistant-for-post-trade-services"
  ogTitle: "London Stock Exchange Group: AI-Powered Client Services Assistant for Post-Trade Services - ZenML LLMOps Database"
  ogDescription: "London Stock Exchange Group developed a client services assistant application using Amazon Q Business to enhance their post-trade customer support. The solution leverages RAG techniques to provide accurate and quick responses to complex member queries by accessing internal documents and public rulebooks. The system includes a robust validation process using Claude v2 to ensure response accuracy against a golden answer dataset, delivering responses within seconds and improving both customer experience and staff productivity."
---

## Overview

London Stock Exchange Group (LSEG), through its London Clearing House (LCH) division, developed a generative AI-powered assistant to support their client services team in handling B2B queries related to post-trade products and services. The LCH Group operates as a multi-asset class clearing house providing risk management across OTC and listed interest rates, fixed income, FX, credit default swaps, equities, and commodities. This case study represents an interesting example of deploying LLMs in a highly regulated financial services environment where accuracy and trust are paramount.

The core business problem was straightforward: as LCH's business grew, their client services team needed to answer complex member queries requiring reference to detailed service documentation, policy documents, and rulebooks. Questions such as "What is the eligible collateral at LCH?" or "Can members clear NIBOR IRS at LCH?" required agents to search through multiple documentation sources, which was time-consuming and potentially error-prone. The goal was to improve both customer experience and employee productivity by enabling faster, more accurate information retrieval.

## Technical Architecture and LLMOps Implementation

### Technology Selection and Ideation

The LCH team went through a structured evaluation process, conducting cross-functional workshops to examine different LLM approaches including prompt engineering, RAG, and custom model fine-tuning. They evaluated options like Amazon SageMaker and SageMaker Jumpstart, weighing trade-offs between development effort and model customization capabilities. Amazon Q Business was ultimately selected for several key reasons:

- Built-in enterprise search web crawler capability
- Ease of deployment without requiring direct LLM deployment and management
- Ability to provide clear source attribution and citations, which was critical for building user trust in a regulated environment
- Minimal technical knowledge required to build and maintain the solution

This selection process highlights an important LLMOps consideration: sometimes managed services that abstract away LLM complexity can be more appropriate than custom deployments, particularly when the organization prioritizes maintainability and quick updates over deep customization.

### Knowledge Base and Data Source Integration

The solution leverages multiple data sources through Amazon Q Business connectors:

- An S3 bucket storing and indexing internal LCH documents, including product FAQ PDFs
- A web crawler indexing the public-facing LCH website and rulebooks
- CRM software integration for customer relationship data
- Internal knowledge repositories used by the client services team

This multi-source approach using RAG allows the system to provide comprehensive answers by combining information from different sources while maintaining the ability to cite specific sources for each response. The citation capability is particularly important in financial services where verifiability of information is essential for regulatory compliance and building user trust.

### Custom User Interface and API Architecture

Rather than using Amazon Q Business's built-in web experience, LCH opted for a custom frontend application. This decision gave them more control over the user experience and allowed integration with their existing workflows. The architecture includes:

- Frontend application hosted on Amazon ECS, built using an open-source application framework
- Amazon API Gateway REST API endpoint for backend communication
- Multiple AWS Lambda functions handling different responsibilities:
  - An authorizer Lambda function for generating temporary AWS credentials and authenticating access to the Amazon Q Business API
  - A ChatSync Lambda function for initiating conversations through the Amazon Q Business ChatSync API
  - A Validator Lambda function for response accuracy verification

The identity and access management layer uses SAML 2.0 IAM federation with a third-party identity provider, allowing LCH users to authenticate using their existing enterprise credentials while maintaining granular control over who can access the Amazon Q Business application.

### Evaluation and Validation System

Perhaps the most interesting LLMOps aspect of this implementation is the validation system designed to ensure response accuracy. This represents a thoughtful approach to building trust in AI-generated content in a regulated environment:

- The team created a "golden answers" knowledge base stored in S3, consisting of approximately 100 questions and answers about product FAQs and rulebooks, collected from their live agents
- This golden answer set serves as a benchmark for evaluating AI-generated response accuracy and reliability
- The Validator Lambda function retrieves data from DynamoDB and sends it to Amazon Bedrock
- Anthropic's Claude v2 model is used to compare Amazon Q Business responses against the golden answers
- The system returns a score for each question-answer pair plus an aggregate total score for admin review

This approach to evaluation is notable because it uses one LLM (Claude v2) to validate the outputs of another system (Amazon Q Business), creating a form of automated quality assurance. While this introduces its own considerations about LLM-as-judge reliability, it provides a scalable way to monitor system accuracy over time.

### Performance and Results

The case study reports that the Amazon Q Business application returns answers within a few seconds per question. Testing verified high factual accuracy of responses, though specific accuracy percentages are not provided. The expectation is that the system saves time for each live agent on each question by providing quick and correct responses.

It's worth noting that this is an AWS blog post co-authored with LSEG employees, so there may be some optimistic framing of results. The case study doesn't provide detailed metrics on:
- Exact accuracy rates from the validation system
- Quantified time savings per query
- User adoption rates or satisfaction scores
- Handling of edge cases or queries outside the knowledge base scope

## Deployment Strategy and Future Plans

LCH followed a phased rollout approach rather than a big-bang deployment, which is a prudent strategy for AI systems in regulated environments. This allowed for thorough testing and quality verification before broader exposure.

Future plans mentioned include:
- Integration with existing email and CRM interfaces
- Expansion to additional use cases and functions within LSEG

The phased approach and integration roadmap suggest this is positioned as part of a broader enterprise AI strategy rather than an isolated point solution.

## Key LLMOps Takeaways

This case study illustrates several important LLMOps patterns:

The use of managed RAG services can significantly reduce operational complexity while still providing enterprise-grade functionality. By choosing Amazon Q Business, LCH avoided the need to directly manage LLM deployments, embedding models, vector databases, and retrieval pipelines.

Citation and source attribution are critical for building trust in LLM outputs, particularly in regulated industries. The ability to trace answers back to specific documents allows users to verify information and builds confidence in the system.

Evaluation systems using golden answer benchmarks provide a scalable way to monitor LLM system accuracy. Using another LLM for scoring creates an automated quality assurance loop, though organizations should consider the limitations of LLM-as-judge approaches.

Identity management and access control integration is essential for enterprise deployments. The SAML 2.0 federation approach allows seamless integration with existing enterprise identity infrastructure.

Custom frontends provide flexibility for workflow integration even when using managed backend services. This allows organizations to tailor the user experience while leveraging managed AI capabilities.

The regulated nature of financial services introduces unique requirements around verifiability, auditability, and accuracy that shape the entire implementation approach, from technology selection through deployment strategy.