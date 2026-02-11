---
title: "Optimizing Security Threat Investigation with Multi-Model LLM Strategy"
slug: "optimizing-security-threat-investigation-with-multi-model-llm-strategy"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a8c139ebae4344299049f2"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:55.551Z"
  createdOn: "2025-02-09T14:52:41.536Z"
llmopsTags:
  - "high-stakes-application"
  - "regulatory-compliance"
  - "realtime-application"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "cost-optimization"
  - "latency-optimization"
  - "elasticsearch"
  - "fastapi"
  - "monitoring"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "Trellix"
summary: "Trellix implemented an AI-powered security threat investigation system using multiple foundation models on Amazon Bedrock to automate and enhance their security analysis workflow. By strategically combining Amazon Nova Micro with Anthropic's Claude Sonnet, they achieved 3x faster inference speeds and nearly 100x lower costs while maintaining investigation quality through a multi-pass approach with smaller models. The system uses RAG architecture with Amazon OpenSearch Service to process billions of security events and provide automated risk scoring."
link: "https://aws.amazon.com/blogs/machine-learning/trellix-lowers-cost-increases-speed-and-adds-delivery-flexibility-with-cost-effective-and-performant-amazon-nova-micro-and-amazon-nova-lite-models?tag=soumet-20"
year: 2025
seo:
  title: "Trellix: Optimizing Security Threat Investigation with Multi-Model LLM Strategy - ZenML LLMOps Database"
  description: "Trellix implemented an AI-powered security threat investigation system using multiple foundation models on Amazon Bedrock to automate and enhance their security analysis workflow. By strategically combining Amazon Nova Micro with Anthropic's Claude Sonnet, they achieved 3x faster inference speeds and nearly 100x lower costs while maintaining investigation quality through a multi-pass approach with smaller models. The system uses RAG architecture with Amazon OpenSearch Service to process billions of security events and provide automated risk scoring."
  canonical: "https://www.zenml.io/llmops-database/optimizing-security-threat-investigation-with-multi-model-llm-strategy"
  ogTitle: "Trellix: Optimizing Security Threat Investigation with Multi-Model LLM Strategy - ZenML LLMOps Database"
  ogDescription: "Trellix implemented an AI-powered security threat investigation system using multiple foundation models on Amazon Bedrock to automate and enhance their security analysis workflow. By strategically combining Amazon Nova Micro with Anthropic's Claude Sonnet, they achieved 3x faster inference speeds and nearly 100x lower costs while maintaining investigation quality through a multi-pass approach with smaller models. The system uses RAG architecture with Amazon OpenSearch Service to process billions of security events and provide automated risk scoring."
---

# Trellix Wise: Multi-Model LLM Strategy for Cybersecurity Threat Investigation

## Overview

Trellix is a major cybersecurity company formed in 2022 from the merger of McAfee Enterprise and FireEye, serving over 53,000 customers worldwide. Their product, Trellix Wise, is an AI-powered platform that automates threat investigation and assigns risk scores to security events. The platform addresses a critical challenge in cybersecurity: security teams face an expanding universe of threats but are constrained by talent and budget limitations. Tasks that previously required multiple analysts working for hours can now be completed in seconds through automated investigation.

This case study, published in February 2025, describes how Trellix optimized their LLM-powered investigation pipeline by adopting a multi-model strategy using Amazon Nova Micro alongside Anthropic's Claude Sonnet on Amazon Bedrock. While the case study originates from an AWS blog post (and should be read with appropriate skepticism regarding vendor claims), it provides valuable insights into practical LLMOps considerations around cost optimization, model selection, and production deployment strategies.

## Technical Architecture

Trellix Wise is built on Amazon Bedrock and employs a sophisticated architecture combining multiple AWS services. The platform uses Amazon OpenSearch Service to store billions of security events collected from monitored environments. A critical architectural decision was leveraging OpenSearch Service's built-in vector database capability, which enabled straightforward implementation of a Retrieval Augmented Generation (RAG) architecture integrated with Amazon Bedrock Knowledge Bases.

The threat investigation workflow consists of multiple stages:

- **Data Collection Stage**: Retrieval of event-related information for analysis through one or more inference calls
- **Analysis Stage**: Processing collected data using insights from custom-built ML models
- **Risk Scoring Stage**: Assignment of risk scores to each event based on the analysis

Each security event passes through these automated, proprietary investigation steps, resulting in a risk score that allows analysts to determine whether human follow-up is necessary. The platform presents results through a dashboard where analysts can dive deeper into investigation results.

## Multi-Model Strategy and Cost Optimization

With growing adoption of Trellix Wise, the team needed to address cost and speed optimization. A key insight was recognizing that not all stages in the investigation workflow require the same level of model capability. Claude Sonnet, while accurate, represents a more expensive and slower option for certain tasks.

The Trellix team evaluated Amazon Nova Micro for the data collection stage of their pipeline, identifying two key advantages based on their testing:

- **Speed**: Amazon Nova Micro can process 3-5 inferences in the same time as a single Claude Sonnet inference
- **Cost**: The cost per inference is claimed to be almost 100 times lower

The team developed an interesting approach to leverage these advantages: rather than relying on a single inference from a larger model, they run multiple inferences with Amazon Nova Micro. While individual model responses showed higher variability than larger models, running multiple passes enables achieving a more exhaustive response-set for data collection. The team reports this approach delivers a 30-fold cost reduction while maximizing the completeness of retrieval data.

## Hallucination Mitigation Strategies

A critical concern when using smaller, faster models is the increased risk of hallucinations or inaccurate responses. The Trellix team addressed this through several mechanisms:

- **Proprietary Prompt Engineering**: Response limitations are enforced through custom prompt engineering techniques
- **Reference Data Constraints**: Pre-built use-case specific scaffolding incorporating proprietary data, processes, and policies constrains the response space
- **Multiple Inference Passes**: Running multiple inferences allows cross-validation and more comprehensive coverage

The priority in the data collection stage was explicitly to maximize completeness of retrieval data while minimizing hallucinations. By constraining what types of responses the model can provide, the team limited the potential for inaccuracies even when using a smaller model.

## Evaluation and Testing Approach

The case study highlights an important LLMOps lesson: standardized benchmarks are not sufficient when evaluating models for specific use cases. The Trellix team recognized this early in their generative AI journey and developed a custom evaluation approach.

They created a test harness that replicated their information gathering workflows, allowing detailed evaluation of multiple models before making production decisions. The evaluation focused on three key metrics:

- Response completeness
- Cost per inference
- Speed of inference

This custom evaluation validated the benefits of their multi-model approach before moving into production. The approach was first deployed in a limited pilot environment, with detailed evaluations ongoing as part of a phased rollout into production. This phased approach represents a best practice for production LLM deployments, allowing for careful monitoring and adjustment before full-scale deployment.

## Additional Model Adoption

Beyond Amazon Nova Micro for the main investigation pipeline, the Trellix professional services team also adopted Amazon Nova Lite for different purposes. They found Amazon Nova Lite to be a strong model for code generation and code understanding, now using it to speed up custom solution delivery workflows. This demonstrates how organizations can benefit from maintaining a portfolio of models suited to different tasks.

## Key LLMOps Takeaways

Several important LLMOps principles emerge from this case study:

**Model Selection Based on Task Requirements**: Not every task requires the largest, most capable model. By analyzing their workflow stages, Trellix identified where smaller models could provide adequate quality at significantly lower cost and higher speed.

**Platform Flexibility**: Access to a broad range of models through Amazon Bedrock accelerated the team's ability to experiment and adopt new models. This highlights the value of LLM platforms that provide access to multiple model providers.

**Custom Evaluation Over Benchmarks**: The recognition that standardized benchmarks don't capture use-case-specific performance led to development of custom test harnesses replicating actual workflows.

**Phased Rollout**: The deployment followed a careful phased approach with limited pilots before full production rollout, representing a mature approach to production LLM deployment.

**RAG Architecture Integration**: Leveraging OpenSearch Service's vector database capabilities alongside Amazon Bedrock Knowledge Bases simplified implementation and reduced time to production.

## Critical Assessment

While the case study presents compelling numbers (3x speed improvement, 100x cost reduction, 30x overall cost improvement), these should be considered with appropriate skepticism given the source is an AWS marketing blog. The specific metrics likely represent best-case scenarios, and real-world performance may vary based on workload characteristics.

Additionally, the claim that multiple passes with a smaller model can achieve equivalent or better results than a single pass with a larger model is intriguing but would benefit from more rigorous public validation. The approach relies heavily on proprietary prompt engineering and data constraints, which may limit its generalizability to other use cases.

Nevertheless, the core insight—that multi-model strategies can optimize cost and speed while maintaining quality through careful workflow analysis and appropriate safeguards—represents a valuable and increasingly common pattern in production LLM systems. The emphasis on custom evaluation, phased deployment, and hallucination mitigation through architectural constraints reflects mature LLMOps practices.