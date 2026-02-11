---
title: "Unlocking Patient Population Insights Using Smart Subgroups and LLMs"
slug: "unlocking-patient-population-insights-using-smart-subgroups-and-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "679c8c7509fd4f8c2d9c6f23"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:04.015Z"
  createdOn: "2025-01-31T08:40:21.739Z"
llmopsTags:
  - "healthcare"
  - "data-analysis"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "semantic-search"
  - "kubernetes"
  - "postgresql"
  - "elasticsearch"
  - "amazon-aws"
  - "anthropic"
industryTags: "healthcare"
company: "Aetion"
summary: "Aetion developed a system to help healthcare researchers discover patterns in patient populations using natural language queries. The solution combines unsupervised machine learning for patient clustering with Amazon Bedrock and Claude 3 LLMs to enable natural language interaction with the data. This allows users unfamiliar with real-world healthcare data to quickly discover patterns and generate hypotheses, reducing analysis time from days to minutes while maintaining scientific rigor."
link: "https://aws.amazon.com/blogs/machine-learning/how-aetion-is-using-generative-ai-and-amazon-bedrock-to-unlock-hidden-insights-about-patient-populations?tag=soumet-20"
year: 2025
seo:
  title: "Aetion: Unlocking Patient Population Insights Using Smart Subgroups and LLMs - ZenML LLMOps Database"
  description: "Aetion developed a system to help healthcare researchers discover patterns in patient populations using natural language queries. The solution combines unsupervised machine learning for patient clustering with Amazon Bedrock and Claude 3 LLMs to enable natural language interaction with the data. This allows users unfamiliar with real-world healthcare data to quickly discover patterns and generate hypotheses, reducing analysis time from days to minutes while maintaining scientific rigor."
  canonical: "https://www.zenml.io/llmops-database/unlocking-patient-population-insights-using-smart-subgroups-and-llms"
  ogTitle: "Aetion: Unlocking Patient Population Insights Using Smart Subgroups and LLMs - ZenML LLMOps Database"
  ogDescription: "Aetion developed a system to help healthcare researchers discover patterns in patient populations using natural language queries. The solution combines unsupervised machine learning for patient clustering with Amazon Bedrock and Claude 3 LLMs to enable natural language interaction with the data. This allows users unfamiliar with real-world healthcare data to quickly discover patterns and generate hypotheses, reducing analysis time from days to minutes while maintaining scientific rigor."
---

## Overview

Aetion is a healthcare technology company that provides real-world evidence software to biopharma companies, payors, and regulatory agencies. Their platform transforms real-world patient data into actionable evidence for evaluating the safety, effectiveness, and value of medical interventions. The company serves top pharmaceutical companies, regulatory agencies including the FDA and EMA, and operates across the US, Canada, Europe, and Japan.

The case study describes how Aetion developed the Smart Subgroups Interpreter, a generative AI feature within their Discover product that allows users to interact with patient population clusters using natural language. This represents a practical application of LLMs in a production healthcare analytics environment, where the goal is to democratize access to complex patient data insights.

## Problem Statement

Real-world patient data contains a wealth of information about patient characteristics, outcomes, and treatment effectiveness. However, researchers traditionally need deep familiarity with complex datasets and must express queries in structured formats to extract meaningful insights. This creates barriers for users who may not have extensive technical expertise with the underlying data structures, and many valuable patterns and trends can remain undiscovered as a result.

Aetion's challenge was to make patient population analysis more accessible by enabling natural language interaction with clustered patient data, reducing the time and expertise required to generate hypotheses and evidence from real-world data.

## Technical Architecture and LLM Integration

The Smart Subgroups Interpreter combines unsupervised machine learning with generative AI in a multi-step pipeline deployed on AWS infrastructure.

### Data Processing Pipeline

The workflow begins with users defining a patient population using the Aetion Measure Library (AML), which standardizes variable definitions using scientifically validated algorithms. The Aetion Evidence Platform (AEP) then computes over 1,000 AML features for each patient across categories including diagnoses, therapies, and procedures. These features are stored in Amazon S3 with AWS KMS encryption.

The Smart Subgroups component trains a topic model using these patient features to determine optimal cluster numbers and assign patients to clusters. A trained classification model identifies the most distinctive features within each cluster, and their prevalences are used to describe cluster characteristics. This component is deployed as a Kubernetes job that runs on demand.

### LLM Selection and Integration

Aetion selected Amazon Bedrock as their LLM platform due to its model selection from multiple providers, security posture, extensibility, and ease of use. Within Amazon Bedrock, they chose Anthropic's Claude 3 Haiku specifically for its speed and what they describe as a "satisfactory intelligence level" for their use case. This choice reflects a pragmatic production consideration: balancing model capability with latency requirements for interactive user experiences.

The solution architecture includes:
- Amazon S3 and Amazon Aurora for data persistence and exchange
- Amazon Bedrock with Claude 3 Haiku for cluster name generation and query answering
- Kubernetes on AWS (EKS) for application deployment and scaling
- Transport Layer Security 1.2 for data encryption in transit

### Prompt Engineering Approach

The system uses what Aetion describes as "composite prompt engineering techniques" to generate responses. This involves versioned prompt templates that combine multiple information sources:

- **Descriptive feature expansion**: AML features are enriched with human-readable descriptions. For example, the feature "Benign Ovarian Cyst" is expanded to explain that it "covers different types of cysts that can form in or on a woman's ovaries, including follicular cysts, corpus luteum cysts, endometriosis, and unspecified ovarian cysts."

- **Statistical context injection**: The prompts include the top feature prevalences for each subgroup. For instance: "In Smart Subgroup 1 the relative prevalence of 'Cornea and external disease (EYE001)' is 30.32%. In Smart Subgroup 1 the relative prevalence of 'Glaucoma (EYE003)' is 9.94%..."

This approach represents a form of structured data augmentation in prompts, where domain-specific scientific knowledge and computed statistics are systematically injected into the LLM context to enable accurate, domain-relevant responses.

### User Interaction Patterns

The system supports several types of natural language queries:
- Requests for cluster names (e.g., automatically generating labels like "Cataract and Retinal Disease" or "Inflammatory Skin Conditions")
- Questions about cluster characteristics (e.g., "What are the most common characteristics for patients in the cataract disorders subgroup?")
- Comparative analysis queries (e.g., "Compare the prevalence of cardiovascular diseases or conditions among the 'Dulaglutide' group vs the overall population")

The LLM responses cite relevant subgroup statistics, grounding the natural language output in the underlying data.

## Production Deployment Considerations

Several LLMOps practices are evident in this implementation:

### Infrastructure Choices

The use of Kubernetes for deployment enables scalability and portability across environments. Running the clustering component as on-demand Kubernetes jobs suggests an event-driven architecture that scales resources based on user requests rather than maintaining constant compute capacity.

### Versioned Prompt Templates

The explicit mention of "versioned prompt templates" indicates that Aetion treats prompts as managed artifacts, likely enabling iteration, testing, and rollback capabilities. This is a mature LLMOps practice that recognizes prompts as critical components of the production system.

### Security Architecture

Healthcare data requires stringent security controls. The architecture incorporates:
- AWS KMS encryption for data at rest in S3
- TLS 1.2 encryption for data in transit
- The managed security posture of Amazon Bedrock (cited as a selection criterion)

### Integration with Existing Platform

The LLM capability is embedded within Aetion's broader Evidence Platform rather than deployed as a standalone application. This integration pattern, referred to as "AetionAI," represents an approach where generative AI enhances existing workflows rather than replacing them. Users can move from AI-powered exploration in Discover to rigorous causal inference analysis in Aetion Substantiate.

## Outcomes and Claims

Aetion reports that the Smart Subgroups Interpreter enables users unfamiliar with real-world data to discover patterns using natural language. The claimed benefit is reducing the time to generate decision-grade evidence from days to minutes, without requiring support staff.

It's worth noting that these outcomes are self-reported by Aetion and AWS in what is essentially a promotional blog post. The claims about time savings (from days to minutes) should be understood as marketing assertions rather than independently verified metrics. Additionally, the term "decision-grade evidence" is Aetion's own terminology and may carry specific meaning within their product framework that differs from clinical or regulatory definitions.

## Technical Observations

The architecture demonstrates several interesting patterns for healthcare LLM applications:

The combination of unsupervised learning (clustering) with LLMs for interpretation represents a hybrid approach where traditional ML handles the analytical heavy lifting while the LLM serves as an interface layer. This division of labor may provide more reliable results than asking an LLM to perform the clustering analysis directly.

The feature expansion technique—where coded medical features are enriched with detailed descriptions before being sent to the LLM—addresses the challenge of domain-specific terminology and provides the model with sufficient context to generate medically meaningful responses.

The choice of Claude 3 Haiku over more capable models in the Claude family suggests optimization for latency in an interactive use case. This is a practical production trade-off that many organizations face when deploying LLMs in user-facing applications.

## Limitations and Considerations

The case study does not address several important LLMOps concerns:
- Evaluation methodology for LLM response quality
- Guardrails or validation for medical accuracy of generated content
- Handling of edge cases or uncertain queries
- User feedback mechanisms for continuous improvement
- Monitoring and observability for the LLM components

These gaps may simply reflect the scope of the blog post rather than actual limitations of the implementation, but they represent areas that production healthcare AI systems typically need to address carefully.