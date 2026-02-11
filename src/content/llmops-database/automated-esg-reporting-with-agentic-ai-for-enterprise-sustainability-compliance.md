---
title: "Automated ESG Reporting with Agentic AI for Enterprise Sustainability Compliance"
slug: "automated-esg-reporting-with-agentic-ai-for-enterprise-sustainability-compliance"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68513683f9b2b37c0a3eadf2"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:11:49.789Z"
  createdOn: "2025-06-17T09:33:55.658Z"
llmopsTags:
  - "regulatory-compliance"
  - "document-processing"
  - "data-analysis"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "agent-based"
  - "multi-agent-systems"
  - "langchain"
  - "serverless"
  - "postgresql"
  - "docker"
  - "load-balancing"
  - "microservices"
  - "fastapi"
  - "orchestration"
  - "security"
  - "compliance"
  - "anthropic"
  - "amazon-aws"
industryTags: "consulting"
company: "Gardenia Technologies"
summary: "Gardenia Technologies partnered with AWS to develop Report GenAI, an automated ESG reporting solution that helps organizations reduce sustainability reporting time by up to 75%. The system uses agentic AI on Amazon Bedrock to automatically pre-fill ESG disclosure reports by integrating data from corporate databases, document stores, and web searches, while maintaining human oversight for validation and refinement. Omni Helicopters International successfully reduced their CDP reporting time from one month to one week using this solution."
link: "https://aws.amazon.com/blogs/machine-learning/how-gardenia-technologies-helps-customers-create-esg-disclosure-reports-75-faster-using-agentic-generative-ai-on-amazon-bedrock?tag=soumet-20"
year: 2025
seo:
  title: "Gardenia Technologies: Automated ESG Reporting with Agentic AI for Enterprise Sustainability Compliance - ZenML LLMOps Database"
  description: "Gardenia Technologies partnered with AWS to develop Report GenAI, an automated ESG reporting solution that helps organizations reduce sustainability reporting time by up to 75%. The system uses agentic AI on Amazon Bedrock to automatically pre-fill ESG disclosure reports by integrating data from corporate databases, document stores, and web searches, while maintaining human oversight for validation and refinement. Omni Helicopters International successfully reduced their CDP reporting time from one month to one week using this solution."
  canonical: "https://www.zenml.io/llmops-database/automated-esg-reporting-with-agentic-ai-for-enterprise-sustainability-compliance"
  ogTitle: "Gardenia Technologies: Automated ESG Reporting with Agentic AI for Enterprise Sustainability Compliance - ZenML LLMOps Database"
  ogDescription: "Gardenia Technologies partnered with AWS to develop Report GenAI, an automated ESG reporting solution that helps organizations reduce sustainability reporting time by up to 75%. The system uses agentic AI on Amazon Bedrock to automatically pre-fill ESG disclosure reports by integrating data from corporate databases, document stores, and web searches, while maintaining human oversight for validation and refinement. Omni Helicopters International successfully reduced their CDP reporting time from one month to one week using this solution."
---

## Company and Use Case Overview

Gardenia Technologies, a data analytics company specializing in sustainability solutions, partnered with the AWS Prototyping and Cloud Engineering (PACE) team to address a critical pain point in corporate sustainability reporting. The challenge stems from the growing complexity and burden of Environmental, Social, and Governance (ESG) reporting requirements, where 55% of sustainability leaders cite excessive administrative work in report preparation, and 70% indicate that reporting demands inhibit their ability to execute strategic initiatives.

The solution, called Report GenAI, represents a sophisticated implementation of agentic AI in production that automates the labor-intensive process of ESG data collection and report generation. The system addresses the fundamental challenge that organizations face when dealing with frameworks like the EU Corporate Sustainability Reporting Directive (CSRD), which comprises 1,200 individual data points, or voluntary disclosures like the CDP with approximately 150 questions covering climate risk, water stewardship, and energy consumption.

## Technical Architecture and LLMOps Implementation

Report GenAI demonstrates a comprehensive serverless architecture built on AWS services, showcasing several key LLMOps patterns and practices. The system is architected around six core components that work together to create a scalable, production-ready agentic AI solution.

The central component is an agent executor that leverages Amazon Bedrock's foundation models, specifically Anthropic's Claude Sonnet 3.5 and Haiku 3.5, to orchestrate complex ESG reporting tasks. The agent uses the Reason and Act (ReAct) prompting technique, which enables large language models to generate both reasoning traces and task-specific actions in an interleaved manner. This approach allows the system to break down complex reporting requirements, plan optimal sequences of actions, and iterate on responses until they meet quality standards.

The LLMOps implementation showcases sophisticated prompt engineering and model orchestration through the LangChain framework. The system uses Pydantic for schema enforcement through ReportSpec definitions, ensuring that outputs conform to specific reporting standards like CDP or TCFD. This demonstrates a mature approach to output validation and structured generation that is crucial for production LLM applications.

The multi-modal data integration capabilities represent another significant LLMOps achievement. The system integrates three distinct data access patterns: a text-to-SQL tool for structured data analysis, a RAG tool for unstructured document retrieval, and a web search tool for public information gathering. This hybrid approach addresses the reality that ESG data exists across multiple formats and sources within enterprise environments.

## Data Processing and Embedding Pipeline

The embedding generation pipeline demonstrates production-ready LLMOps practices for document processing and knowledge base creation. The system uses Amazon Step Functions for orchestration, Amazon Textract for document text extraction, and Amazon Titan Text Embeddings for vectorization. While Amazon Bedrock Knowledge Bases could have provided an end-to-end solution, Gardenia Technologies chose a custom implementation to maintain full control over design choices including text extraction approaches, embedding model selection, and vector database configuration.

The RAG implementation uses an in-memory Faiss index as a vector store, with persistence on Amazon S3 and on-demand loading. This design choice reflects the intermittent usage patterns typical of ESG reporting, where high utilization occurs during quarterly or annual reporting periods followed by lower usage. The architecture demonstrates thoughtful consideration of cost optimization and resource management in production LLM deployments.

## Production Deployment and Scalability

The deployment architecture showcases serverless-first design principles throughout the stack. The user interface runs on Amazon ECS Fargate with auto-scaling capabilities, while the core processing logic operates on AWS Lambda functions. This approach provides automatic scaling to handle the spiky usage patterns inherent in ESG reporting workflows, where demand surges during reporting periods and remains low between cycles.

Authentication and authorization are handled through Amazon Cognito, demonstrating proper security practices for enterprise LLM applications. The system implements VPC endpoints and encrypted S3 buckets for data security, with Amazon RDS instances deployed within Gardenia's VPC for relational data storage. This architecture ensures compliance with data residency requirements while maintaining strict access controls through private network connectivity.

## Evaluation and Quality Assurance

The evaluation framework represents a sophisticated approach to LLM quality assurance in production environments. Report GenAI implements a dual-layer validation system that combines human expertise with AI-powered assessment. The human-in-the-loop approach allows ESG experts to review and validate AI-generated responses, providing primary quality control for regulatory compliance and organizational context accuracy.

The AI-powered quality assessment uses state-of-the-art LLMs on Amazon Bedrock as "LLM judges" to evaluate response accuracy, completeness, consistency, and mathematical correctness. This automated evaluation operates by analyzing original questions, reviewing generated responses with supporting evidence, comparing against retrieved data sources, and providing confidence scores with detailed quality assessments.

The evaluation system operates at multiple levels, including high-level question response evaluation and sub-component assessment for RAG, SQL search, and agent trajectory modules. Each component has separate evaluation sets with specific metrics, demonstrating a mature approach to production LLM monitoring and quality assurance.

## Real-World Impact and Performance

The production deployment with Omni Helicopters International provides concrete validation of the system's effectiveness. OHI reduced their CDP reporting time from one month to one week, representing a 75% reduction in effort. This case study demonstrates the system's ability to handle real-world complexity while maintaining the quality standards required for regulatory compliance.

The interactive chat interface enables experts to verify factual accuracy, validate calculation methodologies, confirm regulatory compliance, and flag discrepancies. The AI reasoning module provides transparency into the agent's decision-making process, showing not only what answers were generated but how the agent arrived at those conclusions. This transparency is crucial for building trust in production LLM applications, particularly in regulated environments.

## Technical Challenges and Solutions

The system addresses several key challenges in production LLM deployment. The text-to-SQL component includes SQL linters and error-correction loops for robustness, acknowledging that LLMs can generate syntactically incorrect queries. The multi-source data integration requires careful prompt engineering to ensure the agent selects appropriate tools and data sources for different types of questions.

The intermittent usage patterns required careful architectural decisions around resource management and cost optimization. The choice to use in-memory vector stores with S3 persistence, rather than always-on vector databases, reflects practical considerations for production deployments with irregular usage patterns.

## Model Management and Evolution

The system design anticipates model evolution and upgrading, with the capability to swap foundation models as more capable or cost-effective options become available on Amazon Bedrock. The recent availability of Amazon Nova models is specifically mentioned as an example of how the system can evolve to incorporate newer capabilities.

This forward-looking approach to model management demonstrates mature LLMOps thinking about the lifecycle of LLM-powered applications. The abstraction layers provided by Amazon Bedrock and LangChain enable model switching without requiring significant architectural changes, reducing the operational burden of keeping pace with rapidly evolving foundation model capabilities.

The case study represents a comprehensive example of production LLMOps implementation, showcasing sophisticated agent orchestration, multi-modal data integration, robust evaluation frameworks, and practical solutions to the challenges of deploying LLM-powered applications in regulated enterprise environments.