---
title: "Production Quality Assurance for Real-Time Executive AI Answers"
slug: "production-quality-assurance-for-real-time-executive-ai-answers"
draft: false
llmopsTags:
  - "question-answering"
  - "data-analysis"
  - "realtime-application"
  - "high-stakes-application"
  - "unstructured-data"
  - "rag"
  - "agent-based"
  - "chunking"
  - "error-handling"
  - "fallback-strategies"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "NarrateAI"
summary: "NarrateAI provides a conversational agentic AI assistant that helps more than 4,000 AWS executive leaders answer business-intelligence questions during live business reviews. To address hallucinated metrics, slow validation, API throttling, and inconsistent presentation, the system combines adaptive retrieval and analysis routing, cross-account and multi-model Amazon Bedrock failover, paragraph-level streaming evaluation, parallel specialist evaluators, and a two-stage numerical grounding check. AWS reports approximately 13-second median time to first evaluated content, approximately 99% numerical accuracy, a 86.8% latency reduction versus sequential post-generation evaluation, and sustained availability in its six-month deployment and load tests; these results are deployment-specific and should be independently validated for other workloads."
link: "https://aws.amazon.com/blogs/machine-learning/narrateai-production-ready-llm-quality-assurance-on-amazon-bedrock/"
year: 2026
seo:
  title: "NarrateAI: Production Quality Assurance for Real-Time Executive AI Answers - ZenML LLMOps Database"
  description: "NarrateAI provides a conversational agentic AI assistant that helps more than 4,000 AWS executive leaders answer business-intelligence questions during live business reviews. To address hallucinated metrics, slow validation, API throttling, and inconsistent presentation, the system combines adaptive retrieval and analysis routing, cross-account and multi-model Amazon Bedrock failover, paragraph-level streaming evaluation, parallel specialist evaluators, and a two-stage numerical grounding check. AWS reports approximately 13-second median time to first evaluated content, approximately 99% numerical accuracy, a 86.8% latency reduction versus sequential post-generation evaluation, and sustained availability in its six-month deployment and load tests; these results are deployment-specific and should be independently validated for other workloads."
  canonical: "https://www.zenml.io/llmops-database/production-quality-assurance-for-real-time-executive-ai-answers"
  ogTitle: "NarrateAI: Production Quality Assurance for Real-Time Executive AI Answers - ZenML LLMOps Database"
  ogDescription: "NarrateAI provides a conversational agentic AI assistant that helps more than 4,000 AWS executive leaders answer business-intelligence questions during live business reviews. To address hallucinated metrics, slow validation, API throttling, and inconsistent presentation, the system combines adaptive retrieval and analysis routing, cross-account and multi-model Amazon Bedrock failover, paragraph-level streaming evaluation, parallel specialist evaluators, and a two-stage numerical grounding check. AWS reports approximately 13-second median time to first evaluated content, approximately 99% numerical accuracy, a 86.8% latency reduction versus sequential post-generation evaluation, and sustained availability in its six-month deployment and load tests; these results are deployment-specific and should be independently validated for other workloads."
notion:
  pageId: "3e9f8dff-2538-8021-baf0-c9471111a288"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:20:00.000Z"
  lastEditedTime: "2026-09-28T08:20:00.000Z"
  publishedAt: "2026-09-28T08:23:34Z"
---

## Overview

NarrateAI is an AWS conversational business-intelligence assistant used by more than 4,000 AWS executive leaders to ask data questions during live business reviews. The production requirement is unusually strict: an answer must be fast enough to use in a meeting, numerically reliable enough to support management decisions, available during concurrent global usage, and formatted professionally without requiring manual rewriting. The case study focuses on the real-time conversational layer of a broader two-layer architecture. An automated narrative-generation layer handles batch processing, while a conversational AI interface handles interactive questions.

The central lesson is that selecting a capable LLM is not sufficient for production reliability. NarrateAI addresses model and application failure modes with a coordinated quality-assurance pipeline built on Amazon Bedrock and Bedrock AgentCore. The design adaptively routes queries according to retrieved data volume, distributes inference across model-account quota spaces when capacity is constrained, evaluates responses while they stream, applies multiple specialized checks, and escalates numerical validation from inexpensive deterministic matching to more expensive semantic verification only when needed. AWS reports approximately 99% numerical accuracy, a median time to first evaluated content of 13.2 seconds, and an 86.8% reduction in latency compared with waiting for a complete response and then evaluating it. These figures are reported by the implementation team for its production environment and should not be treated as universal benchmarks.

## Problem and production constraints

Executive questions can range from a focused request such as quarterly team attainment to a broad analysis spanning hundreds of retrieved document sections. A single-pass prompt is efficient when the context fits, but large inputs can exceed the model context window and cause truncation or degraded synthesis. Conversely, always using a multi-pass process wastes latency and inference cost on the roughly 90% of queries that reportedly do not require it.

The application also has several independent reliability risks. Amazon Bedrock requests can be throttled during peak review periods, and retrying the same request with exponential backoff can leave users waiting. A response can be delivered successfully while still containing a fabricated or misapplied revenue figure. Sequential quality checks improve validation but delay all visible content until generation and evaluation finish. Finally, subjective wording and informal formatting can undermine the credibility of an answer intended for direct use in a business review. NarrateAI therefore treats availability, responsiveness, grounding, and presentation quality as separate but interconnected operational concerns.

## Adaptive analysis pipeline

NarrateAI first retrieves sections from enterprise knowledge documents and estimates the aggregate volume of the retrieved material. A calibrated threshold determines whether the query follows a fast path or a normal path. On the fast path, all sections are concatenated within the permitted context and processed with one LLM call. On the normal path, sections are packed into multiple batches using a greedy first-fit strategy that preserves section priority and document boundaries. Each batch is analyzed in parallel, after which a consolidation call synthesizes the partial analyses and resolves conflicts.

This routing is implemented as three conceptual phases. Mode-Aware Consolidation prepares the context and selects the route. Bifurcated Analysis performs either one complete analysis or parallel batch analyses. Conditional Consolidation is invoked only for the multi-batch route. The stated production distribution is approximately 90% fast-path queries and 10% complex queries. With four batches typical of the normal path, the blended cost is reported as approximately 1.4 LLM invocations per query, or a 72% reduction relative to always using the multi-pass strategy. Fast-path latency is typically under 25 seconds, while complex queries reportedly take approximately 50–75 seconds. The threshold must be recalibrated for different document sizes, query distributions, and model context limits; the reported savings depend on the workload rather than being an intrinsic property of the technique.

## Capacity and model failover

To reduce user-visible throttling, the system treats each model-account combination as an independent Amazon Bedrock quota space. A configuration with three models and three AWS accounts creates nine candidate capacity spaces. The custom provider built with the Strands Agents SDK attempts the highest-ranked model first and uses account-level randomization to reduce hot-spotting. If a request encounters a throttling or quota-related exception, the provider immediately tries another model-account combination rather than waiting through a conventional backoff sequence.

The implementation detects `ThrottlingException`, `ServiceQuotaExceededException`, and `TooManyRequestsException`. AWS STS `AssumeRole` obtains credentials for other accounts, with the source reporting an additional 100–200 milliseconds for that operation. Model ranking allows the system to preserve preferred quality and speed under normal conditions, while account distribution expands the available quota pool. The approach can improve resilience without adding application servers, but it introduces operational dependencies: multiple accounts and roles must be governed securely, model availability can vary by AWS Region, and falling back to a lower-ranked model may change response quality or behavior. Randomized distribution is a simple load-balancing mechanism, not a guarantee that every quota space remains equally available.

During a six-month production deployment, the authors report reduced user-visible throttling across more than 4,000 users. Locust load testing reportedly sustained streaming requests from more than 100 concurrent users without failed requests in the tested configuration. The evidence demonstrates the behavior of this deployment and test scenario, but the source does not provide a full traffic profile, confidence intervals, comparison with provisioned throughput, or independent verification of “every request” availability claims.

## Streaming evaluation architecture

The system avoids holding an entire response until quality checks finish. A producer receives tokens from the Amazon Bedrock streaming API and accumulates them into paragraph-sized units, using configurable boundaries such as double newlines. Completed paragraphs are placed into a bounded FIFO queue. A consumer removes paragraphs, runs the configured evaluators, applies corrections when appropriate, and streams approved content to the user in multi-word chunks. A sentinel marks completion, while the bounded queue provides backpressure when evaluation is slower than generation.

This producer-consumer design exploits paragraph independence. The first paragraph incurs generation and evaluation delay, but subsequent paragraphs can be evaluated while later text is generated. Deterministic checks reportedly take tens of milliseconds, whereas paragraphs requiring LLM-based numerical verification take approximately two seconds. The source reports median evaluation times of approximately 79 milliseconds for paragraphs needing only deterministic checks and approximately 2,025 milliseconds for those requiring numerical verification. When evaluation falls behind, queue backpressure limits uncontrolled growth rather than dropping content.

Across 1,000 production queries and approximately 10,439 paragraphs, using Anthropic Claude Sonnet on Amazon Bedrock, the reported median time to first content was 13.2 seconds for parallel streaming. Unevaluated streaming was 11.8 seconds, implying a 1.4-second overhead in the measured setup. Sequential post-generation evaluation had a reported median of 100.2 seconds. These measurements are environment-specific and combine generation, retrieval, model behavior, and evaluator performance; they should not be interpreted as a general guarantee for all Bedrock models or response lengths.

## Composite evaluation and correction

NarrateAI uses multiple evaluators rather than relying on one generic quality score. Amazon Bedrock Guardrails screen incoming queries, while outgoing paragraphs pass through checks for subjective language, informal formatting, and numerical accuracy. The shared evaluator interface returns pass/fail status, detected issues, and suggested corrections. Evaluators run in parallel, so the slowest triggered check determines the evaluation delay. The design can be extended with domain-specific checks such as toxicity, compliance, or currency-format validation, provided the additional work does not make the consumer permanently slower than the producer.

The reference evaluators include `WeaselWordEvaluator`, which uses regular expressions to identify subjective language; `EmojiEvaluator`, which detects conversational emoji; and `DataAccuracyEvaluator`, which handles numerical grounding. Associated correctors remove subjective adjectives, strip emoji, or annotate suspected fabrication with an “LLM Reasoning” label. Corrections are sequenced so that text edits occur before character removal and annotation. A paragraph with a critical violation can be rejected, while a correctable issue is transformed before delivery.

The source states that nearly one quarter of flagged paragraphs triggered at least two evaluators simultaneously. That observation supports the value of multidimensional checking, although the case study does not specify the absolute number of flagged paragraphs, false-positive rates, or human-acceptance rates. Those measures would be important before deploying automatic correction in a higher-risk domain.

## Numerical grounding cascade

Numerical hallucination is treated as the highest-risk failure mode because a response may look fluent and objective while still reporting the wrong business figure. The `DataAccuracyEvaluator` uses a hierarchical cascade. First, regular expressions extract metrics from both the retrieved source material and the generated answer. Exact matching checks whether response values occur in the source set. Values without a source match are classified as unverified, allowing obvious fabrications to be detected cheaply.

For values that do match, the system compares a response context window with the corresponding source context using `SequenceMatcher`. High-similarity cases can pass without another model call. Low-similarity cases are escalated to a `ContextualDataAgent` for semantic verification, which is intended to catch context errors such as applying a revenue figure to a cost question, using a rate from the wrong quarter, or conflating business units. This separation is important because exact matching can show that a number exists in the corpus without proving that it was used in the correct semantic context.

Reported timing is approximately 0.3 milliseconds for exact matching, 1.7 milliseconds for string comparison, and 1,758 milliseconds for LLM-based verification. The case study says 87% of metrics passed the first stage and 30% of those proceeded to the expensive semantic check, yielding an estimated average cost of approximately 812 milliseconds per metric and a 54% reduction compared with monolithic LLM verification. The claimed approximately 99% numerical accuracy is based on the authors’ testing and production measurements; the text does not define the evaluation dataset, annotation methodology, error taxonomy, or whether accuracy means exact value correctness, contextual correctness, or both.

## Results, tradeoffs, and assessment

The integrated architecture reportedly streams evaluated responses with a median first-content time of approximately 13 seconds, achieves approximately 99.3% numerical accuracy in the described deployment, reduces evaluation latency by 86.8% versus sequential post-processing, and maintained availability across the observed six-month deployment. Adaptive routing lowers average inference work, failover reduces exposure to quota contention, and streaming evaluation prevents quality assurance from becoming a full-response serialization bottleneck.

The tradeoffs are substantial. Parallel batch analysis can increase total complexity and may produce conflicts that consolidation must resolve. Cross-account failover requires careful identity, security, cost, and regional governance and can change model behavior during degradation. Streaming evaluation exposes users to partial output and therefore requires conservative buffering and clear handling of rejected or corrected paragraphs. Deterministic matching is fast but incomplete, while semantic verification is slower and itself depends on another LLM. Automatic corrections can improve presentation but may alter meaning if evaluators or correction prompts are wrong. A production implementation should therefore monitor evaluator latency, queue depth, fallback frequency, model and account selection, rejection and correction rates, grounding errors, token usage, and user feedback.

Overall, NarrateAI presents a credible set of LLMOps patterns for an enterprise assistant whose main risk is not merely generation failure but confidently delivering a wrong business answer. Its strongest contribution is the composition of routing, capacity management, streaming validation, and layered grounding rather than any single AWS feature. The reported results are promising, but they are vendor-authored and tightly tied to the stated environment. Teams adopting the design should reproduce the benchmarks on their own documents and queries, establish independent accuracy and false-positive evaluations, and validate security and governance controls before allowing generated answers to drive consequential decisions.
