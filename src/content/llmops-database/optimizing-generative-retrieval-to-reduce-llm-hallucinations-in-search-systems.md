---
title: "Optimizing Generative Retrieval to Reduce LLM Hallucinations in Search Systems"
slug: "optimizing-generative-retrieval-to-reduce-llm-hallucinations-in-search-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67e6475f99297beeb0a469bf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:05:04.044Z"
  createdOn: "2025-03-28T06:53:19.205Z"
llmopsTags:
  - "question-answering"
  - "structured-output"
  - "data-analysis"
  - "rag"
  - "embeddings"
  - "knowledge-distillation"
  - "semantic-search"
  - "vector-search"
  - "fastapi"
  - "elasticsearch"
  - "openai"
industryTags: "finance"
company: "Alipay"
summary: "Alipay tackled the challenge of LLM hallucinations in their Fund Search and Insurance Search systems by developing an enhanced generative retrieval framework. The solution combines knowledge distillation reasoning during model training with a decision agent for post-processing, effectively improving search quality and achieving better conversion rates. The framework addresses the critical issue of LLM-based generative retrieval systems generating irrelevant documents by implementing a multi-perspective validation approach."
link: "https://arxiv.org/pdf/2503.21098"
year: 2024
seo:
  title: "Alipay: Optimizing Generative Retrieval to Reduce LLM Hallucinations in Search Systems - ZenML LLMOps Database"
  description: "Alipay tackled the challenge of LLM hallucinations in their Fund Search and Insurance Search systems by developing an enhanced generative retrieval framework. The solution combines knowledge distillation reasoning during model training with a decision agent for post-processing, effectively improving search quality and achieving better conversion rates. The framework addresses the critical issue of LLM-based generative retrieval systems generating irrelevant documents by implementing a multi-perspective validation approach."
  canonical: "https://www.zenml.io/llmops-database/optimizing-generative-retrieval-to-reduce-llm-hallucinations-in-search-systems"
  ogTitle: "Alipay: Optimizing Generative Retrieval to Reduce LLM Hallucinations in Search Systems - ZenML LLMOps Database"
  ogDescription: "Alipay tackled the challenge of LLM hallucinations in their Fund Search and Insurance Search systems by developing an enhanced generative retrieval framework. The solution combines knowledge distillation reasoning during model training with a decision agent for post-processing, effectively improving search quality and achieving better conversion rates. The framework addresses the critical issue of LLM-based generative retrieval systems generating irrelevant documents by implementing a multi-perspective validation approach."
---

## Overview

This case study from Alipay presents a production-focused approach to addressing one of the most significant challenges in deploying LLM-based generative retrieval systems: hallucination. Alipay, the major Chinese fintech platform, operates Fund Search and Insurance Search as essential search scenarios within their broader Alipay Search infrastructure. These search systems are tasked with providing users with relevant fund and insurance products based on their queries, which are often diverse and incorporate complex, nuanced intentions.

The research team at Alipay recognized that while LLM-based generative retrieval (GR) has revolutionized document retrieval by leveraging the strong reasoning capabilities and ability to handle complex tasks that large language models provide, it suffers from a critical flaw in practical applications: the tendency to generate documents that are irrelevant to the query. This hallucination problem severely challenges the credibility and reliability of GR systems in production environments where user trust and conversion are paramount business metrics.

## Technical Context and Problem Statement

To understand the significance of this work, it's important to appreciate the evolution of document retrieval approaches. Traditional document retrieval methods include sparse retrieval (SR) and dense retrieval (DR). Sparse retrieval focuses on building compact inverted indices with term matching metrics such as TF-IDF, BM25, or query likelihood. Dense retrieval, on the other hand, trains dual-encoders to generate dense semantic embeddings for both queries and documents, subsequently retrieving the most relevant documents by embedding similarity.

However, these traditional approaches are limited by what the researchers describe as the "embedding space bottleneck" and missing fine-grained interaction between query-document (q-d) pairs. Generative retrieval emerged as a paradigm shift, employing sequence-to-sequence encoder-decoder architectures to retrieve documents by directly generating their identifiers (DocIDs). With the rise of large language models such as GPT, LLaMA, and Qwen, LLM-based GR has attracted significant research attention and industrial adoption.

The key advantage of LLM-based GR is that it memorizes candidate documents within its model parameters, effectively leveraging the capabilities of LLMs for document retrieval. However, the hallucination problem—where the model generates plausible-looking but incorrect or irrelevant document identifiers—represents a significant obstacle to production deployment, particularly in high-stakes financial services applications where incorrect search results can lead to user confusion and reduced conversion.

## Proposed Framework and LLMOps Architecture

The Alipay team proposes an optimized GR framework designed specifically to alleviate retrieval hallucination. The framework consists of two main components that work together to improve retrieval precision:

**Knowledge Distillation Reasoning in Model Training**: The first component involves using LLMs to assess and reason over GR-retrieved query-document pairs during the training phase. The reasoning data generated by the LLMs is then distilled as transferred knowledge to the GR model. This approach leverages the strong reasoning capabilities of larger LLMs to improve the performance of the deployed GR model. This is a form of knowledge distillation where the teacher model (the larger LLM used for reasoning) imparts its knowledge to the student model (the production GR model) through the intermediate representation of reasoning data.

**Decision Agent for Post-Processing**: The second component is a decision agent that serves as a post-processing layer. This agent extends the GR-retrieved documents through a separate retrieval model and then selects the most relevant documents from multiple perspectives to produce the final generative retrieval result. This multi-perspective selection approach helps filter out hallucinated results that might have been generated by the GR model.

The combination of these two approaches—improving the model through distilled reasoning knowledge and adding a verification/selection layer through the decision agent—represents a defense-in-depth strategy for hallucination mitigation that is particularly valuable for production deployments.

## Production Validation and Results

The research team validated their framework through both offline experiments on real-world datasets and online A/B tests on the actual Fund Search and Insurance Search systems in Alipay. The paper claims "superiority and effectiveness" in improving search quality and conversion gains, though specific quantitative results are not detailed in the provided excerpt.

The use of online A/B testing is particularly noteworthy from an LLMOps perspective, as it demonstrates that the framework has been validated not just in controlled experimental conditions but in actual production traffic with real users. A/B testing is a critical component of responsible LLMOps practices, allowing teams to measure the real-world impact of model changes before full deployment.

## LLMOps Considerations and Lessons

Several LLMOps considerations emerge from this case study:

**Hallucination as a Production Risk**: The case study underscores that hallucination is not merely an academic concern but a critical production risk that "severely challenges credibility in practical applications." For financial services applications like Fund Search and Insurance Search, incorrect results can lead to user confusion, reduced trust, and lower conversion rates.

**Multi-Stage Mitigation Strategies**: Rather than relying on a single approach to address hallucination, the Alipay team implements a multi-stage strategy that addresses the problem at both training time (through knowledge distillation) and inference time (through the decision agent). This layered approach is consistent with best practices in LLMOps for mitigating risks associated with LLM outputs.

**Knowledge Distillation for Production Models**: The use of larger LLMs to assess and reason about query-document pairs, with subsequent distillation of this knowledge to the production model, represents a practical approach to leveraging the capabilities of large models while maintaining deployment efficiency. This technique allows the production system to benefit from the reasoning capabilities of larger models without the latency and cost implications of serving those models directly.

**Post-Processing for Quality Control**: The decision agent serves as a quality control mechanism that can catch and filter hallucinated results before they reach users. This pattern of using post-processing agents or models as guardrails is increasingly common in production LLM deployments.

**Domain-Specific Challenges**: The case study highlights that user queries in Fund Search and Insurance Search are "often diverse, incorporating complex and nuanced intentions," which requires the retrieval model to possess reasoning ability. This underscores that domain-specific challenges may require tailored solutions rather than generic LLM deployments.

## Critical Assessment

While the case study presents a compelling framework for hallucination mitigation, several aspects warrant careful consideration:

The provided excerpt does not include specific quantitative results from the offline experiments or online A/B tests, making it difficult to assess the magnitude of improvements achieved. Claims of "superiority and effectiveness" should be evaluated against concrete metrics when available.

The computational cost and latency implications of the proposed framework are not discussed in the excerpt. The addition of knowledge distillation during training and a decision agent during inference may have significant resource implications that are important for production deployments.

The framework appears to be specifically designed for the generative retrieval paradigm and may not generalize to other LLM deployment scenarios. Organizations considering similar approaches should evaluate the applicability to their specific use cases.

## Conclusion

This Alipay case study represents a significant contribution to the LLMOps literature by addressing the practical challenge of hallucination in production LLM-based generative retrieval systems. The combination of knowledge distillation during training and decision agent-based post-processing provides a framework that other organizations can consider when deploying LLM-based retrieval systems, particularly in high-stakes domains like financial services where accuracy and credibility are paramount.