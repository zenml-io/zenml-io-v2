---
title: "Production AI Deployment: Lessons from Real-World Agentic AI Systems"
slug: "production-ai-deployment-lessons-from-real-world-agentic-ai-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "697393bd419ead212b699c14"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-01-23T16:05:42.818Z"
  createdOn: "2026-01-23T15:29:01.540Z"
llmopsTags:
  - "healthcare"
  - "chatbot"
  - "question-answering"
  - "classification"
  - "document-processing"
  - "poc"
  - "high-stakes-application"
  - "structured-output"
  - "unstructured-data"
  - "realtime-application"
  - "regulatory-compliance"
  - "rag"
  - "fine-tuning"
  - "prompt-engineering"
  - "few-shot"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "system-prompts"
  - "evals"
  - "token-optimization"
  - "error-handling"
  - "instruction-tuning"
  - "monitoring"
  - "cicd"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "langchain"
  - "llama-index"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "scaling"
  - "postgresql"
  - "databricks"
  - "openai"
  - "meta"
industryTags: "healthcare"
company: "Databricks / Various"
summary: "This case study presents lessons learned from deploying generative AI applications in production, with a specific focus on Flo Health's implementation of a women's health chatbot on the Databricks platform. The presentation addresses common failure points in GenAI projects including poor constraint definition, over-reliance on LLM autonomy, and insufficient engineering discipline. The solution emphasizes deterministic system architecture over autonomous agents, comprehensive observability and tracing, rigorous evaluation frameworks using LLM judges, and proper DevOps practices. Results demonstrate that successful production deployments require treating agentic AI as modular system architectures following established software engineering principles rather than monolithic applications, with particular emphasis on cost tracking, quality monitoring, and end-to-end deployment pipelines."
link: "https://www.youtube.com/watch?v=mMQq-KDKEbA"
year: 2026
seo:
  title: "Databricks / Various: Production AI Deployment: Lessons from Real-World Agentic AI Systems - ZenML LLMOps Database"
  description: "This case study presents lessons learned from deploying generative AI applications in production, with a specific focus on Flo Health's implementation of a women's health chatbot on the Databricks platform. The presentation addresses common failure points in GenAI projects including poor constraint definition, over-reliance on LLM autonomy, and insufficient engineering discipline. The solution emphasizes deterministic system architecture over autonomous agents, comprehensive observability and tracing, rigorous evaluation frameworks using LLM judges, and proper DevOps practices. Results demonstrate that successful production deployments require treating agentic AI as modular system architectures following established software engineering principles rather than monolithic applications, with particular emphasis on cost tracking, quality monitoring, and end-to-end deployment pipelines."
  canonical: "https://www.zenml.io/llmops-database/production-ai-deployment-lessons-from-real-world-agentic-ai-systems"
  ogTitle: "Databricks / Various: Production AI Deployment: Lessons from Real-World Agentic AI Systems - ZenML LLMOps Database"
  ogDescription: "This case study presents lessons learned from deploying generative AI applications in production, with a specific focus on Flo Health's implementation of a women's health chatbot on the Databricks platform. The presentation addresses common failure points in GenAI projects including poor constraint definition, over-reliance on LLM autonomy, and insufficient engineering discipline. The solution emphasizes deterministic system architecture over autonomous agents, comprehensive observability and tracing, rigorous evaluation frameworks using LLM judges, and proper DevOps practices. Results demonstrate that successful production deployments require treating agentic AI as modular system architectures following established software engineering principles rather than monolithic applications, with particular emphasis on cost tracking, quality monitoring, and end-to-end deployment pipelines."
---

## Overview and Context

This case study comes from a presentation by Natasha, a Staff AI Engineer at Databricks, who works with large-scale enterprises to move proof-of-concept GenAI applications into production. The presentation draws on real-world deployment experiences, with Flo Health serving as the primary example. Flo Health is a women's health provider offering an application where women can track their menstrual cycles and receive support through pregnancy journeys, serving over 80 million monthly active users. The company implemented a conversational AI system allowing users to chat with their health data and receive tailored recommendations. The broader context emphasizes that while many companies have created GenAI demos since ChatGPT's release in late 2022, only a small fraction have successfully built systems that run safely, reliably, and generate business value in production.

## Core LLMOps Philosophy and Approach

The presentation strongly advocates for treating agentic AI as a system architecture problem rather than purely an AI problem. A critical distinction is made between autonomy and determinism in agent design. While autonomous agents might have free choice to select from many tools and MCP servers, most real-world use cases actually benefit from deterministic, sequenced steps. Even retrieval augmented generation is positioned as a form of simple agent with predetermined steps: first retrieval, then text generation.

The core philosophy emphasizes that production AI is fundamentally about applying established software engineering principles. This includes modularity over monoliths, where each feature such as a retrieval step should be separated out into its own component for easier maintenance and evolution. The presentation stresses that production is fundamentally different from research, requiring focus on versioning, monitoring, rollbacks, observability, and service level agreements rather than just which LLM to use or chasing the latest model releases.

## Common Failure Points in GenAI Projects

Three primary failure modes are identified for GenAI projects attempting to reach production. First, teams focus excessively on use cases while neglecting constraints. Constraints include budget considerations such as whether infrastructure can support 20,000 daily users, technical limitations like security guidelines or regional deployment restrictions common with European customers, and clear functional requirements. Without addressing these constraints upfront, projects are doomed regardless of technical merit.

Second, teams tend to over-trust the LLM while under-engineering the system around it. This manifests as giving too much autonomy to language models, allowing them to "go wild and hallucinate" rather than carefully guiding inputs through structured steps to produce reliable outputs. The recommendation is to clearly define each component and step in the system architecture.

Third, human and project management failures occur when teams rush to create extensive feature lists without first establishing a clear happy path and minimum viable product. The emphasis should be on getting an end-to-end slice working quickly in a minimalistic way, then building DevOps practices around it before adding additional features.

## Flo Health Implementation Details

Flo Health's implementation leveraged Databricks' Agent Bricks platform, which represents an end-to-end automated approach to GenAI deployment. The system handles data ingestion into a vector store, automatically fine-tunes open source models including Llama, generates synthetic data for training, uses LLM judges for evaluation, and provides serving endpoints. This represents what the presentation calls "autoML for GenAI."

The Flo Health team specifically employed tower techniques combining LLM judges with synthetic data generation to improve open source models through fine-tuning. This approach allowed them to double their medical accuracy and safety metrics while maintaining relatively low costs, enabling delivery to a broader audience. The emphasis on fine-tuning open source models rather than relying solely on proprietary APIs reflects a strategic decision balancing quality, cost, privacy, and security concerns particularly important in the healthcare domain.

The success factors highlighted include having access to unified data platforms where all data sources connect into one system, making insights more accessible. Previously, Flo Health operated with a fragmented data stack that made finding insights across sealed data sources difficult. The unified platform approach enabled more effective use of the data for various purposes across the organization.

## Quality Management and Evaluation

Quality management is presented as a critical but often poorly handled aspect of production LLMOps. The fundamental challenges include LLM unpredictability due to their non-deterministic nature as token simulators, unpredictable user inputs that may request out-of-scope information, vaguely defined quality metrics, and numerous moving pieces creating room for error. A concrete example is provided where introducing a new component caused a 10% quality drop that required extensive debugging using LLM traces.

The evaluation framework must address multiple quality issues including factual incorrectness, tool misuse by agents, lack of safety guardrails, malformed outputs when structured data is expected, and missing reasoning steps. The presentation strongly advocates for the MLflow suite, particularly its LLM judges and custom judges where teams can define specific measurement criteria. These judges automatically catch mistakes, assign scores, drive autocorrection, and gather training data from user interactions for potential fine-tuning improvements.

Different types of GenAI applications require different evaluation approaches. Text generation applications benefit from LLM judges, semantic search applications have their own metrics, and classification scenarios can use traditional classification metrics. Being very clear about the final output format enables appropriate metric selection.

The human-in-the-loop aspect is emphasized for the proof-of-concept to pilot transition phase. Exposing prototypes to actual users with simple feedback mechanisms like thumbs up/thumbs down buttons plus text boxes for explanation creates valuable testing and improvement data. This feedback collection becomes part of continuous quality monitoring where automated judges run over user queries and LLM responses to evaluate whether outputs follow established guardrails.

## Observability and Tracing

Observability is positioned as a frequently missing layer in production deployments, using the metaphor of security cameras in a store or monitoring a Ferrari in a garage. For LLM agents specifically, tracing becomes crucial for understanding which steps contribute how much latency and what inputs and outputs flow between steps. The presentation showcases MLflow tracing as an exemplar, noting it is fully open source and platform-agnostic, not requiring Databricks.

The tracing interface displays a tree structure showing the decomposition of a RAG application through each step, with the ability to click through to see retrieved documents, inputs, outputs, and most importantly, latency breakdowns. This proves essential when debugging applications with unacceptable latency such as 30 seconds, enabling identification of whether bottlenecks arise from the LLM, retriever, embedding model, or other components.

Beyond tracing, observability encompasses tool success and failure statistics, cost tracking to prevent surprise cloud bills, and usage pattern analysis. Understanding when peak traffic occurs enables appropriate scaling up during high demand and scaling down during quieter periods. Cost tracking is particularly important for high-traffic applications using pay-per-token models, where provisioned throughput may provide a cost ceiling.

Integration with frameworks like LangChain, LangGraph, DSPy, and LlamaIndex is noted, with these frameworks working well with tracing systems including MLflow and alternatives like Langfuse. The automatic capture of inputs and outputs through platforms like Databricks Lakehouse Monitoring reduces the burden on developers to manually instrument observability.

## System Architecture and Components

The comprehensive system architecture presented spans from data preparation through deployment and governance. It begins with data and feature pipelines, which are foundational since most use cases include retrieval components. This involves ETL processing, feature tables, bronze-silver-gold level transformations, and orchestration jobs that land data into vector stores.

The model serving layer offers multiple approaches including using pre-provisioned endpoints from providers like OpenAI, Databricks' Foundation Model API providing managed infrastructure for various foundation models, bringing custom models, or training and serving proprietary models. This managed service approach removes scalability concerns from the development team.

Evaluation components include both managed services with built-in LLM judges continuously improved by research teams and custom evaluation frameworks like Ragas. The human-in-the-loop feedback collection creates a testing and improvement cycle as projects transition from proof of concept to pilot deployments.

Deployment follows two primary patterns: real-time serving via APIs for interactive applications, and batch processing for scenarios like nightly document classification jobs that write outputs to tables or dashboards. The critical and often most problematic phase involves DevOps practices for moving applications from development through staging to production environments. This includes version control systems, CI/CD pipelines, infrastructure provisioning where cloud capacity chasing often becomes a significant time sink, and governance controls for access management to applications and data.

## DevOps and Production Readiness

The presentation identifies DevOps as the hardest part of production deployment, where most infrastructure problems surface. The staging concept for moving applications across environments requires robust version control and CI/CD pipelines. Cloud capacity provisioning is specifically called out as a time-consuming challenge.

The recommended workflow emphasizes getting an end-to-end slice working minimally and quickly, then immediately building DevOps practices around it before adding features. This differs from typical development patterns where deployment concerns are addressed later. Only after establishing this minimum viable product with proper deployment infrastructure should teams expand with additional features.

Infrastructure cost management requires firm understanding of pricing mechanisms across different components including vector stores and foundation models. Teams need clear visibility into costs to avoid surprising cloud bills, particularly when serving high-traffic applications. The choice between pay-per-token and provisioned throughput models significantly impacts cost predictability.

Governance may seem boring but proves essential in enterprise contexts. User role management controls who can access applications and outputs, preventing unauthorized access to sensitive information like proprietary text classification results. Properly assigning roles across the organization ensures appropriate access control.

## Continuous Monitoring and Improvement

The final layer involves continuous monitoring analogous to model monitoring in classical machine learning, adapted for the unique characteristics of unstructured GenAI data. Continuous judges run over user queries and LLM responses, evaluating adherence to guardrails and expected behavior. This provides ongoing visibility into system health without manual intervention.

The iteration cycle uses metrics from both observability systems and continuous quality monitoring. Unlike classical ML where data drift monitoring tracked how training data diverged from production data over time, GenAI monitoring focuses on ongoing evaluation of unstructured outputs against defined quality criteria.

This continuous evaluation enables teams to detect degradation early, understand when new features impact quality negatively, and maintain confidence in production behavior over time. The automated nature of this monitoring reduces manual overhead while providing the rigor necessary for enterprise production systems.

## Practical Recommendations and Success Factors

The presentation concludes with a synthesis of building blocks for successful agentic AI deployment. After validating a use case and establishing a business case, teams must clearly define constraints including technical requirements like deployment regions and functional requirements around user load and budget. These constraints should be documented before significant development begins.

The end-to-end slice approach recommends minimalistic initial implementation that proves the full pipeline works, then iterative addition of features only after DevOps infrastructure is established. Planning with feasibility means maintaining firm cost understanding across all infrastructure components to prevent budget overruns.

Engineering for reliability requires stable tools and deterministic steps rather than autonomous LLM behavior. This deterministic approach provides more confidence in application behavior and easier debugging when issues arise. The modular system design treats components as separable features that can be independently modified and tested.

Iterating with metrics involves both observability metrics for system health and continuous quality monitoring for output correctness. This data-driven improvement cycle enables teams to make informed decisions about feature additions, model changes, and architectural modifications while maintaining quality standards.

The overall message is that successful production deployment of agentic AI systems requires treating them as serious software engineering efforts with appropriate architecture, monitoring, evaluation, and deployment practices rather than as experimental prototypes or research projects. The technologies and frameworks exist to support this production readiness, but teams must apply disciplined engineering practices to leverage them effectively.