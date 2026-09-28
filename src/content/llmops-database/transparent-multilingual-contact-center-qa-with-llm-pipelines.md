---
title: "Transparent Multilingual Contact Center QA with LLM Pipelines"
slug: "transparent-multilingual-contact-center-qa-with-llm-pipelines"
draft: false
llmopsTags:
  - "customer-support"
  - "classification"
  - "summarization"
  - "speech-recognition"
  - "data-analysis"
  - "structured-output"
  - "unstructured-data"
  - "regulatory-compliance"
  - "embeddings"
  - "prompt-engineering"
  - "system-prompts"
  - "human-in-the-loop"
  - "evals"
  - "guardrails"
  - "security"
  - "compliance"
  - "scalability"
  - "amazon-aws"
industryTags: "tech"
company: "DiDi"
summary: "DiDi International Business Group replaced an opaque third-party contact center quality-assurance solution with a self-owned system built on Amazon Bedrock. The production system processes Spanish and Portuguese live-chat and phone conversations across ride-hailing, food-delivery, and financial-services operations through separate intent-verification, compliance-evaluation, and Voice of Customer pipelines. Its design emphasizes precise context management, dynamically assembled prompts, structured model outputs, deterministic post-validation, privacy controls, and human review. DiDi reports that intent-verification accuracy increased from 38% to 86%, compliance-scoring accuracy exceeded 90%, and VOC analysis reduced work that previously took hours to a process completed in minutes; however, the source does not provide independent benchmarks, sample sizes, operating costs, or detailed error analyses."
link: "https://aws.amazon.com/blogs/machine-learning/how-didi-built-intelligent-contact-center-qa-with-amazon-bedrock/"
year: 2026
seo:
  title: "DiDi: Transparent Multilingual Contact Center QA with LLM Pipelines - ZenML LLMOps Database"
  description: "DiDi International Business Group replaced an opaque third-party contact center quality-assurance solution with a self-owned system built on Amazon Bedrock. The production system processes Spanish and Portuguese live-chat and phone conversations across ride-hailing, food-delivery, and financial-services operations through separate intent-verification, compliance-evaluation, and Voice of Customer pipelines. Its design emphasizes precise context management, dynamically assembled prompts, structured model outputs, deterministic post-validation, privacy controls, and human review. DiDi reports that intent-verification accuracy increased from 38% to 86%, compliance-scoring accuracy exceeded 90%, and VOC analysis reduced work that previously took hours to a process completed in minutes; however, the source does not provide independent benchmarks, sample sizes, operating costs, or detailed error analyses."
  canonical: "https://www.zenml.io/llmops-database/transparent-multilingual-contact-center-qa-with-llm-pipelines"
  ogTitle: "DiDi: Transparent Multilingual Contact Center QA with LLM Pipelines - ZenML LLMOps Database"
  ogDescription: "DiDi International Business Group replaced an opaque third-party contact center quality-assurance solution with a self-owned system built on Amazon Bedrock. The production system processes Spanish and Portuguese live-chat and phone conversations across ride-hailing, food-delivery, and financial-services operations through separate intent-verification, compliance-evaluation, and Voice of Customer pipelines. Its design emphasizes precise context management, dynamically assembled prompts, structured model outputs, deterministic post-validation, privacy controls, and human review. DiDi reports that intent-verification accuracy increased from 38% to 86%, compliance-scoring accuracy exceeded 90%, and VOC analysis reduced work that previously took hours to a process completed in minutes; however, the source does not provide independent benchmarks, sample sizes, operating costs, or detailed error analyses."
notion:
  pageId: "3e9f8dff-2538-8000-8625-fa560537f79b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:15:00.000Z"
  lastEditedTime: "2026-09-28T08:15:00.000Z"
  publishedAt: "2026-09-28T08:25:12Z"
---

## Overview

DiDi International Business Group built a production contact center quality-assurance system for its Customer Experience organization, which handles Spanish- and Portuguese-language live-chat and phone interactions across ride-hailing, food delivery, and financial services. The project addressed the limitations of an existing third-party QA product whose decisions were difficult to inspect or adapt, while manual review was too limited to provide comprehensive coverage. DiDi and AWS implemented three related LLM pipelines on Amazon Bedrock: intent verification, compliance evaluation, and Voice of Customer (VOC) analysis.

The central engineering lesson in the case study is that model performance depended more on controlling the context supplied to each call than on repeatedly refining a single prompt. The production design therefore separates tasks, dynamically assembles only the relevant business and language rules, uses structured outputs, and combines probabilistic model judgments with deterministic programmatic checks. DiDi reports intent-verification accuracy improving from 38% to 86%, average compliance-scoring accuracy exceeding 90%, and VOC analysis compressing hours of manual summarization into minutes. These are vendor-published production-validation claims rather than independently audited results: the source does not state the evaluation-set size, labeling methodology, confidence intervals, latency, token consumption, or total cost of ownership.

## Problem and operating context

DiDi operates across 14 countries and regions and serves tens of millions of users through three international business lines. Its CX team processes a large volume of multilingual customer contacts. QA judgments affect compliance audits, agent coaching, service improvement, and the prioritization of operational issues. The prior third-party system was described as opaque, limiting the team’s ability to understand why a judgment had been made or to reconstruct an audit trail. Expanding manual spot-checking was constrained by throughput and cost.

The problem was also combinatorial. Language, business line, contact reason, and compliance criteria interact, so a change in standards could require changes across many separate procedures or prompts. Standards changed frequently, creating a risk that old and new rules would be applied inconsistently during transitions. Finally, emerging issues were difficult to detect proactively because operations staff had to read and tally tickets manually before they could identify a trend.

The replacement system was intended to provide greater ownership and transparency, not merely to add a generative interface. Amazon Bedrock supplied access to multiple foundation models through a common API, allowing the team to select models per pipeline without redesigning the entire integration. The source also cites private connectivity through Amazon VPC endpoints powered by AWS PrivateLink, encryption in transit and at rest, IAM-based access control, and Amazon Bedrock Guardrails for protections such as sensitive-information redaction and contextual grounding checks. These controls establish a platform boundary, but the case study does not describe a complete threat model, retention policy, model-specific security assessment, or an independent privacy audit.

## Architecture and production workflow

Chat and phone data enter through channel-specific ingestion paths. Phone interactions are first represented as speech-to-text transcripts, while chat data is normalized from its native format. A preprocessing layer converts both channels into a common conversation schema and fans the records out to the three downstream pipelines. The outputs are structured results that operations teams can query and visualize.

Each pipeline is specialized rather than asking one general-purpose model call to perform every task. This limits irrelevant context, makes the expected output more predictable, and allows deterministic processing to be placed around generative steps. The design also attaches a reasoning chain to judgments for human review. In practice, the reasoning is an explanation generated by the model and should not automatically be treated as a faithful account of the model’s internal process; it is better understood as an auditable rationale that reviewers can compare with the transcript and the applicable rules.

## Intent verification

Representatives assign contact-reason labels from a hierarchical CR Tree, including broad categories and progressively more detailed subcategories. The system checks whether the assigned contact reason is reasonable given the conversation and recommends a different classification when the label is incorrect. It also examines tickets marked “Other” to find taxonomy gaps and suggest potential new labels.

An initial design supplied the entire taxonomy and the conversation in one call. According to the case study, this produced only 38% accuracy because the model compared the current label against every possible alternative. Even when the assigned label was defensible, the presence of a slightly more specific alternative encouraged the model to mark it as wrong. The team concluded that the issue was context management rather than wording alone.

The revised design uses task and information isolation. “Other” tickets follow a dedicated three-level path: the system first checks sibling categories, then the wider tree, and finally identifies a possible coverage gap if no suitable label exists. Standard labels use two phases. In the first, the model sees the current label and the conversation, but not the full set of alternatives, and decides whether the current label is reasonable. Only failed verification cases proceed to a classification phase in which the full CR Tree, along with the earlier reasoning, is supplied to recommend an alternative with a confidence score and rationale. DiDi reports that this two-level design raised intent-verification accuracy from 38% to 86% in production validation. The source does not explain whether accuracy is measured equally across languages, business lines, hierarchical depths, or difficult “Other” cases.

## Compliance evaluation

The evaluation pipeline scores multiple compliance items and extracts business insights for each ticket in a single LLM call. Instead of maintaining a separate prompt for every language and business-line combination, the system stores language context, business context, criterion definitions, and pass/fail rules as external configuration. At runtime, a common template dynamically injects the applicable values. Adding a criterion, language, or business line is therefore primarily a configuration change rather than a code rewrite, although configuration governance and regression testing remain important operational responsibilities.

The example implementation uses the Amazon Bedrock Converse API and constructs a JSON schema whose fields correspond to the configured checklist. Bedrock Tool Use is forced through a named output tool so that the model returns schema-constrained JSON. Each criterion includes a score and reasoning field, and inference is configured with a maximum token limit and temperature of zero. Structured output reduces parsing failures and simplifies downstream storage, but it does not guarantee that the judgment is correct, that the reasoning is grounded, or that every criterion was interpreted consistently.

The system adds deterministic post-validation for rules that can be computed directly. For example, spelling errors are checked against the agent’s own messages rather than accepted solely from the model’s tally, and thresholds are applied to the verified count. Response-wait times and other computable facts are calculated in code and injected into the prompt instead of being inferred by the LLM. This hybrid pattern is a significant LLMOps control: the model handles semantic interpretation, while code handles arithmetic, counting, timing, and other reproducible checks. The reported average compliance-scoring accuracy exceeded 90%, but the article does not define the metric in detail or compare it with a human-review baseline.

## VOC analysis

The VOC pipeline is triggered on demand for a selected batch and time window. Rather than placing thousands of conversations into one context window, it uses three stages. First, each conversation is independently processed to extract fields such as issue type, sentiment, resolution outcome, and root cause. These calls can be parallelized, although the source provides no throughput, concurrency, or rate-limit details.

Second, an embedding model identifies semantically similar issue descriptions and merges synonymous expressions. Frequency ranking then surfaces the most common clusters. This stage relies on embedding distance and statistical ranking rather than additional free-form generation, which makes clustering more reproducible and easier to inspect than asking an LLM to summarize the entire batch directly. Third, a language model generates a report from the selected high-frequency clusters, including an executive summary, pain-point analysis, and recommended actions.

The article gives a cancellation-fee surge in Latin American markets as an example. DiDi states that the pipeline identified root causes and trigger scenarios within minutes, whereas manual reading and summarization had previously taken hours. This demonstrates an operational acceleration claim, but not necessarily an equivalent quality level: the source does not report cluster precision, recall, missed low-frequency issues, reviewer acceptance, or how recommendations are validated before action.

## Safety, governance, and evaluation considerations

The system applies Bedrock Guardrails to mask personally identifiable information before model processing and to flag responses that fail contextual-grounding checks. Private networking, encryption, and IAM are presented as controls for sensitive contact-center data. These measures are useful foundations for production deployment, but the case study does not specify which PII categories are detected, how masking affects classification accuracy, or how false positives and false negatives are monitored.

The design also retains human review by attaching rationales to results and exposing structured outputs to operations teams. Deterministic checks provide another safeguard against common failure modes. Nevertheless, important production practices are not documented in the source: model and prompt versioning, canary deployment, rollback procedures, drift monitoring, calibration of confidence scores, escalation thresholds, reviewer disagreement handling, and ongoing evaluation after QA standards change. A mature implementation would need regression datasets for each language and business line, tests for taxonomy changes, monitoring for transcription errors, and cost and latency observability across each pipeline stage.

## Results and tradeoffs

The reported benefits are substantial: intent verification rose from 38% to 86%, compliance scoring exceeded 90% accuracy, and large-scale VOC summarization moved from hours of manual effort to minutes. Owning the architecture also gives DiDi more control over taxonomies, compliance definitions, model selection, auditability, and future integration than the previous closed product reportedly provided.

The tradeoff is increased engineering and operational responsibility. DiDi must maintain configuration, taxonomy quality, prompt templates, model integrations, schema contracts, post-validation logic, privacy controls, and evaluation datasets. A single dynamic template reduces duplication but can make changes affect many combinations at once, so configuration changes require version control and regression testing. Multi-stage VOC processing can improve scale and context control but introduces additional model calls, embedding choices, aggregation assumptions, and opportunities for errors to propagate. The reported results should therefore be treated as encouraging evidence from DiDi’s validation rather than a guarantee that the same architecture or metrics will transfer to other contact centers. DiDi plans to extend the system to more business lines and languages and to integrate the pipelines for deeper analysis, making continued monitoring and comparative evaluation particularly important.
