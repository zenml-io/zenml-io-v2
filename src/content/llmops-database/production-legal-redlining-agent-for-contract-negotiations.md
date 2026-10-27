---
title: "Production Legal Redlining Agent for Contract Negotiations"
slug: "production-legal-redlining-agent-for-contract-negotiations"
draft: false
llmopsTags:
  - "document-processing"
  - "classification"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "structured-output"
  - "unstructured-data"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "memory"
  - "chunking"
  - "system-prompts"
  - "token-optimization"
  - "evals"
  - "databases"
  - "redis"
  - "langchain"
  - "api-gateway"
  - "cache"
  - "monitoring"
  - "guardrails"
  - "compliance"
industryTags: "legal"
company: "Uber"
summary: "Uber developed a Microsoft Word-integrated Legal Redlining Agent to reduce repetitive work in high-volume contract negotiations while keeping lawyers responsible for final decisions. The system combines document-diff analysis, intent detection, retrieval of rules and historical lawyer feedback, risk assessment, tone-focused generation, and agentic clause modification in a Python and LangGraph backend. Uber reports a reduction of more than 20% in average contract review time and 91% accuracy for AI-generated decisions, although these figures are company-reported and the system remains an assistive tool requiring lawyer review, particularly for novel or high-risk clauses."
link: "https://www.uber.com/gb/en/blog/building-ubers-redlining-agent/"
year: 2026
seo:
  title: "Uber: Production Legal Redlining Agent for Contract Negotiations - ZenML LLMOps Database"
  description: "Uber developed a Microsoft Word-integrated Legal Redlining Agent to reduce repetitive work in high-volume contract negotiations while keeping lawyers responsible for final decisions. The system combines document-diff analysis, intent detection, retrieval of rules and historical lawyer feedback, risk assessment, tone-focused generation, and agentic clause modification in a Python and LangGraph backend. Uber reports a reduction of more than 20% in average contract review time and 91% accuracy for AI-generated decisions, although these figures are company-reported and the system remains an assistive tool requiring lawyer review, particularly for novel or high-risk clauses."
  canonical: "https://www.zenml.io/llmops-database/production-legal-redlining-agent-for-contract-negotiations"
  ogTitle: "Uber: Production Legal Redlining Agent for Contract Negotiations - ZenML LLMOps Database"
  ogDescription: "Uber developed a Microsoft Word-integrated Legal Redlining Agent to reduce repetitive work in high-volume contract negotiations while keeping lawyers responsible for final decisions. The system combines document-diff analysis, intent detection, retrieval of rules and historical lawyer feedback, risk assessment, tone-focused generation, and agentic clause modification in a Python and LangGraph backend. Uber reports a reduction of more than 20% in average contract review time and 91% accuracy for AI-generated decisions, although these figures are company-reported and the system remains an assistive tool requiring lawyer review, particularly for novel or high-risk clauses."
notion:
  pageId: "405f8dff-2538-8112-bb70-f4bae11d9bb1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-26T14:47:00.000Z"
  lastEditedTime: "2026-10-26T14:47:00.000Z"
  publishedAt: "2026-10-27T13:50:20Z"
---

## Overview

Uber built a Legal Redlining Agent (LRA) to support lawyers handling thousands of contract negotiations each year. The core problem was not that legal review lacked structure, but that lawyers repeatedly performed similar work: interpreting common counterparty edits, applying established legal positions, drafting explanations, and proposing fallback language. Uber embedded the assistant directly in Microsoft Word so that lawyers could review suggestions without moving contract text between systems. The agent identifies tracked changes, interprets the counterparty’s likely intent, retrieves relevant rules and prior decisions, assesses risk, recommends an action, and drafts comments or modifications for lawyer review.

The system is best understood as a human-in-the-loop production assistant rather than an autonomous legal decision-maker. Uber says that the tool produced a more than 20% reduction in average contract review time and 91% accuracy in AI-generated decisions. Those results are reported by Uber, and the source does not define the evaluation population, baseline, error taxonomy, or whether accuracy was measured uniformly across contract types. The stated design nevertheless includes several practical LLMOps controls: deterministic rules for non-negotiable policies, retrieval-grounded generation, detailed interaction logging, time-weighted feedback retrieval, domain-expert prompt ownership, runtime quality checks, and mandatory lawyer acceptance or modification of outputs.

## Problem and Product Design

Contract negotiations are high-stakes because an incorrect interpretation or poorly worded response can create commercial, compliance, or legal risk. At the same time, many negotiations contain recurring clauses, repeatable redlines, and established reasoning patterns. Uber’s objective was therefore to automate the repeatable first pass while preserving lawyer judgment for exceptions and complex decisions.

The user experience is a React and TypeScript Microsoft Word task-pane add-in. It uses the Office JavaScript API to inspect tracked changes, identify externally introduced edits, highlight clauses, and apply approved modifications. The add-in presents a recommendation for each relevant change, including an intended action such as accept, reject, or modify, an explanation directed to the counterparty, and a risk level. Lawyers can accept, reject, or edit the recommendation before it becomes part of the response. This workflow keeps accountability and review in the existing legal process instead of requiring adoption of a separate web application.

The Word integration introduced operational constraints. Office API calls can be slow, some tracked-change document structures can trigger crashes, and deleted tracked text may be returned as an empty string. Uber addressed these limitations with caching, minimized round trips, defensive loading strategies, and application-managed text state for accurate diff display. These details illustrate an important production concern: the quality of an LLM feature depends on reliable document and workflow integration as much as on model quality.

## Evolution of the LLM System

Uber’s first implementation was a conventional retrieval-augmented generation design. Legal playbooks and examples of previous negotiation turns were embedded and semantically retrieved alongside a new counterparty change, after which an LLM generated a decision. This approach exposed several weaknesses. The text used as the retrieval key did not always correspond well to the material being retrieved, producing unreliable matches. Generated responses often had an unsuitable tone, ranging from defensive to excessively accommodating. The system also generalized poorly outside scenarios explicitly represented in the playbooks, sometimes producing effectively random responses for novel negotiations.

The second iteration made lawyer feedback a central runtime data source. Initially, Uber recorded only a decision such as accept, reject, or modify, together with the original text, redline, and a negative-feedback signal. The feedback became substantially more useful when the system captured the expected action, lawyer comments, and the final text that the lawyer actually used. This allowed the application to connect a counterparty’s intent with precise, domain-approved language rather than learning only from a coarse success or failure label.

At runtime, the system searches a feedback store containing thousands of prior interactions. Metadata filtering and similarity search narrow the candidate set to roughly 20 documents, after which another LLM-based filtering stage checks whether candidates align with the user’s and counterparty’s intent. The selected examples are used as dynamic few-shot context for the decision and counterparty comment. Uber also prunes feedback data to improve retrieval quality and preserve a labeled dataset that can be used to track regressions.

Historical examples are not treated as equally current. Uber uses exponential decay weighting, with a currently stated half-life of 365 days, so recent decisions receive more influence than older ones. The sampling process also seeks a balanced distribution of agreeing and disagreeing examples. This is a form of retrieval-time adaptation rather than model fine-tuning: the underlying model is not retrained for every new decision, but the prompt context changes as lawyers provide feedback. The design is intended to respond to changing legal positions and reduce the risk of concept drift, although the source does not provide an independent measurement of how well the decay strategy achieves that goal.

## Tone, Modification, and Policy Controls

Tone was treated as a separate generation problem. Uber added a final LLM call to revise the linguistic style of generated comments. Early versions oscillated between adversarial and overly agreeable language. The legal team then controlled the substantive content of a three-part prompt structure: an objective, a preferred style, and conversation-starting examples. The objective used a pessimistic reflection approach that assumed the draft contained the previously observed tone problems and instructed the model to correct them. Uber reports that a single pass was sufficient for its use case, avoiding the latency and token cost of multi-step reflection loops.

This process established a practical ownership boundary: engineers designed the prompt structure and execution path, while legal subject-matter experts defined the desired voice, style, and examples. That arrangement improves domain alignment, but it also creates a governance requirement for versioning, reviewing, and testing prompt changes because a prompt update can alter production behavior even when the model is unchanged.

For MODIFY decisions, Uber moved beyond unconstrained text generation. The agent uses historical feedback and rules to draft compromise language intended to preserve contract-defined terms and the company’s broader risk position. This is important because direct generation of replacement clauses can hallucinate terms or drift from the source contract. The workflow still presents the result as a draft for lawyer approval rather than as an automatically binding amendment.

Uber also introduced a rules database. Lawyers can select important text in a source template and associate it with a rule containing Uber’s position, fallback positions, and an example response. When a modified sentence is detected, the system searches a rules index; a high-confidence match is injected into the context. A final LLM verification step checks that the generated result conforms to the retrieved specification. Deterministic rules act as hard guardrails for non-negotiable policies, while probabilistic feedback retrieval handles negotiable strategy and tone. This hybrid architecture is a meaningful safety tradeoff: it limits model discretion where policy is fixed, while retaining flexibility where legal judgment varies.

## Architecture and Runtime Operations

The client is intentionally thin. A Python backend orchestrates the AI workflow, and LangGraph parallelizes independent operations such as intent detection, risk assessment, and policy lookup. OpenSearch provides vector storage and retrieval. The rules index stores policy representations associated with target sentences, while the feedback index stores historical negotiation interactions. Uber states that it uses nomic-embed-text-v15 embeddings and embeds feedback around the counterparty’s intention rather than only the raw wording, helping retrieve semantically similar changes expressed in different language.

A distinctive retrieval optimization comes from the fact that negotiations begin with a known source contract. Uber segments contracts using delimiters such as semicolons, periods, and newlines, then anchors feedback and rules to the original source sentence. When the same source sentence appears across negotiation rounds, it provides a stable key for ingestion and retrieval. Similarity search remains useful for subtle document changes, but the common source text improves symmetry between stored and query embeddings and reduces the risk of retrieving unrelated legal material.

Redis stores session state for follow-up questions about a document. The system also runs continuous LLM-as-a-judge evaluations for retrieved-context quality and adherence to company rules, represented by the stated document_quality_metric and rule_adherence_metric. These checks provide monitoring signals, but the source does not explain their judge prompts, calibration, thresholds, correlation with lawyer assessments, or handling of judge bias. Consequently, they should be viewed as operational indicators rather than definitive proof of legal correctness.

## Results, Tradeoffs, and Limitations

Uber reports more than 20% lower average contract review time and 91% accuracy in AI-generated decisions after launching with its Legal team, with a lawyer also describing time savings from comment suggestions. The system was piloted with Legal in 2025 after development beginning in early 2024 and was recognized as part of Uber Legal’s winning submission for a March 9, 2026 legal technology award. These are useful adoption and outcome signals, but the public description does not establish a controlled comparison, specify the number or difficulty of reviewed contracts, distinguish recommendation accuracy from final legal quality, or quantify override rates and harmful errors.

The principal strengths are workflow fit, explicit human review, a separation between hard rules and learned preferences, and a feedback dataset that records the lawyer’s final wording and rationale. The principal risks are retrieval errors, prompt or model regressions, stale or conflicting legal feedback, inappropriate tone, hallucinated modification language, and overconfidence in LLM-generated risk assessments. Time decay can help with changing policy but may also down-weight older precedents that remain legally important. LLM-as-a-judge monitoring can identify problems at scale but should not replace lawyer review or curated evaluations.

The case demonstrates that production legal GenAI required iterative product and data design rather than a single successful RAG prompt. Uber’s next direction is harness engineering, including agentic harnesses such as Claude Code and OpenCode with skills, alongside possible legal ontologies and knowledge graphs. Those efforts could improve structured representation of legal concepts and relationships, but they introduce additional governance, integration, and evaluation work. Overall, LRA’s most transferable LLMOps lesson is to combine domain-controlled rules, traceable retrieval, continuously captured expert feedback, conservative human approval, and monitoring with an interface that fits the professional workflow.
