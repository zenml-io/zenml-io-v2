---
title: "Quantitative Framework for Production LLM Evaluation in Security Applications"
slug: "quantitative-framework-for-production-llm-evaluation-in-security-applications"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a26440e23b7f5b3aa8a359"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:30.278Z"
  createdOn: "2025-02-04T19:02:24.750Z"
llmopsTags:
  - "high-stakes-application"
  - "regulatory-compliance"
  - "chatbot"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "error-handling"
  - "human-in-the-loop"
  - "langchain"
  - "elasticsearch"
  - "monitoring"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "amazon-aws"
  - "microsoft-azure"
  - "hugging-face"
industryTags: "tech"
company: "Elastic"
summary: "Elastic developed a comprehensive framework for evaluating and improving GenAI features in their security products, including an AI Assistant and Attack Discovery tool. The framework incorporates test scenarios, curated datasets, tracing capabilities using LangGraph and LangSmith, evaluation rubrics, and a scoring mechanism to ensure quantitative measurement of improvements. This systematic approach enabled them to move from manual to automated evaluations while maintaining high quality standards for their production LLM applications."
link: "https://www.elastic.co/blog/elastic-security-generative-ai-features"
year: 2025
seo:
  title: "Elastic: Quantitative Framework for Production LLM Evaluation in Security Applications - ZenML LLMOps Database"
  description: "Elastic developed a comprehensive framework for evaluating and improving GenAI features in their security products, including an AI Assistant and Attack Discovery tool. The framework incorporates test scenarios, curated datasets, tracing capabilities using LangGraph and LangSmith, evaluation rubrics, and a scoring mechanism to ensure quantitative measurement of improvements. This systematic approach enabled them to move from manual to automated evaluations while maintaining high quality standards for their production LLM applications."
  canonical: "https://www.zenml.io/llmops-database/quantitative-framework-for-production-llm-evaluation-in-security-applications"
  ogTitle: "Elastic: Quantitative Framework for Production LLM Evaluation in Security Applications - ZenML LLMOps Database"
  ogDescription: "Elastic developed a comprehensive framework for evaluating and improving GenAI features in their security products, including an AI Assistant and Attack Discovery tool. The framework incorporates test scenarios, curated datasets, tracing capabilities using LangGraph and LangSmith, evaluation rubrics, and a scoring mechanism to ensure quantitative measurement of improvements. This systematic approach enabled them to move from manual to automated evaluations while maintaining high quality standards for their production LLM applications."
---

## Overview

Elastic, a company known for Elasticsearch and security solutions, has developed several GenAI-powered features for their security product line. This case study focuses on how their Security GenAI and Security ML teams built a robust evaluation framework to ensure quality improvements in their production LLM applications. The company emphasizes that they are operating these GenAI features "at scale" for enterprise users, distinguishing their work from proof-of-concept implementations. They were recognized as #2 in the Top 5 LangGraph Agents in Production 2024 by LangChain and named GenAI Infrastructure and Data Partner of the Year by AWS.

The three main GenAI features discussed are: **Elastic AI Assistant for Security** (a chatbot for security queries, ES|QL generation, and alert context), **Attack Discovery** (automated alert analysis to identify and prioritize active attacks), and **Automatic Import** (custom integration creation from sample log lines). The case study primarily focuses on the evaluation and improvement methodology rather than the features themselves.

## The Evolution from Manual to Automated Evaluation

The journey began with the release of Elastic AI Assistant in June 2023. Initially, the team used a hands-on, largely manual approach for evaluation. For the natural language-to-ES|QL generation functionality, they created spreadsheets filled with realistic queries that a security analyst might use in a SOC (Security Operations Center). Each query was manually input into the AI Assistant, with responses recorded and compared to expected outputs.

While this manual approach was effective for initial validation, it was time-intensive and did not scale well as the product evolved. The introduction of LangSmith marked a turning point, enabling the team to trace and debug with greater efficiency. LangSmith's evaluation capabilities allowed them to build the first iteration of their internal evaluation framework, supporting automated evaluations based on configurable parameters including lists of LLMs and input datasets.

## Attack Discovery Evaluation Challenges

Evaluating Attack Discovery presented unique challenges that highlight the complexity of assessing LLM outputs in specialized domains. Two key factors made this particularly difficult. First, the input consists of sets of alerts representing one or more malicious attack scenarios, meaning that creating realistic input alerts was essential to properly assess performance. Second, determining the ideal output required genuine cybersecurity expertise, as the goal is to explain malicious attacks chronologically in a narrative style accessible to security analysts of varying experience levels.

Early evaluations relied heavily on manual review from Elastic's security experts, who also provided the engineering team with realistic alert sets for testing. This human-in-the-loop approach was necessary given the domain-specific nature of the outputs.

## Components of the Evaluation Framework

The mature evaluation framework consists of five key components that work together to provide quantitative assurance of improvement.

### Test Scenarios and Curated Test Datasets

The team developed diverse test scenarios covering various attack types that users might encounter. Initial validation used datasets from detonated malware samples hosted on the ohmymalware.com project. Over time, they expanded to cover scenarios including living-off-the-cloud attacks, various advanced persistent threats (APTs), and well-known vulnerabilities like the Log4j vulnerability from 2021. Some scenarios originated from work presented at AWS re:Invent 2024 by the Elastic Security Labs team.

For each scenario, they created expected responses. Rather than purely human-written outputs, they ran scenarios through various LLMs with a human-in-the-loop to determine if results met their quality criteria. The evaluation criteria included whether the output was clear to read from a user standpoint and whether the LLM summary was accurate enough.

When outputs met quality standards, they were added to the curated test dataset. The integration with LangSmith simplified this process, as the UI provides functionality to add existing outputs from traces directly to a dataset. While creating initial scenarios was time-consuming and LLM output variance made selection of curated examples challenging, this investment was deemed essential for knowing whether improvements actually enhanced the product.

### Tracing Infrastructure

The team uses LangGraph to design and run their AI Agent workflows, while LangSmith provides tracing capabilities along with tools for creating test datasets and running evaluations. The high-level workflow captures the entire path from user request to generated response. Elasticsearch serves as the vector database powering the RAG (retrieval augmented generation) functionality.

For users to enable AI Assistant and Attack Discovery, an LLM connector is required, with support for all major providers. This multi-provider approach necessitates a robust way to compare performance across different LLM backends.

### Evaluation Rubrics

Rubrics define the "desired behavior" of LLM outputs and contain multiple items, each responsible for checking a subset of desired behaviors. Examples include checking whether the response is written in plain language or whether it contains certain required elements.

For Attack Discovery, the rubric prompts include items such as evaluating whether the "summaryMarkdown" field values in the submission are at least partially similar to the expected response (regardless of order) and summarize the same incidents. Another rubric item checks whether the "title" field values mention the same incidents as expected responses.

The team uses an LLM evaluator to check if responses satisfy the rubric in real-time as part of the generation flow. If the output is not good enough, it triggers the generator LLM to regenerate a response. This "LLM-as-judge" pattern allows for automated evaluation at scale while maintaining quality standards.

Importantly, the rubric prompts themselves can be treated as prompts to improve upon. The team mentions tightening up the wording of rubrics as an improvement, then rerunning the framework to confirm better performance.

### Scoring Mechanism

The scoring mechanism creates a final score based on defined behaviors. Teams can weight certain rubrics higher by multiplying scores by a weight factor. Elastic set a threshold of 85% accuracy, dropping any prompt that fell below this threshold. The scoring mechanism is flexible and can be implemented in any program of choice.

The team uses tools like Seaborn in Python to generate heatmaps of prompt evaluation results, providing visual insight into performance across different configurations.

## Practical Applications and Insights

The framework enables several practical capabilities for the development team. They can determine at a glance whether a new prompt is performing better, and specifically on which rubric items it improves or regresses. They can identify which LLM performs best at specific tasks and which LLM achieves the highest score according to their scoring mechanism.

For LLM model selection, the framework produces a recommended LLM matrix as an outcome of testing. This is particularly valuable given the multi-provider support in their product, allowing them to make data-driven recommendations to users.

The results are summarized in easily understandable tables that also help with troubleshooting and tweaking the scoring mechanism, making it easy to identify what might have gone wrong in specific evaluations.

## Critical Assessment

While Elastic presents a thorough approach to GenAI evaluation, several points warrant consideration. The case study is primarily a marketing piece that showcases their methodology and partnerships (LangChain, AWS). The claim of being #2 in Top 5 LangGraph Agents in Production is notable but the specifics of that ranking methodology are not detailed.

The framework described represents good practice for production LLM applications: systematic dataset creation, tracing, rubric-based evaluation, and threshold-based quality gates. However, the actual results (accuracy numbers, user satisfaction metrics, reduction in false positives) are not shared, making it difficult to assess the quantitative impact of these improvements.

The 85% accuracy threshold mentioned as a quality gate is interesting but raises questions about what happens in the 15% of cases where accuracy falls short in production. The regeneration loop (where outputs are regenerated if they fail the rubric) is a reasonable approach but could introduce latency concerns not addressed in the article.

The reliance on LLM-as-judge for evaluation introduces its own challenges, including potential biases in the evaluator model and the need to validate that the judge LLM is actually capturing the quality dimensions that matter to end users. The team acknowledges that evaluator LLMs and rubric prompts can be evaluated quantitatively as well, showing awareness of this limitation.

Overall, this case study provides a valuable template for teams building production LLM applications, particularly in specialized domains requiring expert evaluation. The emphasis on quantitative measurement and systematic improvement processes reflects mature LLMOps practices, even if specific performance metrics are not disclosed.