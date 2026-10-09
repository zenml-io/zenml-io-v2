---
title: "A Shared Evaluation and Tracing Framework for Production AI Agents"
slug: "a-shared-evaluation-and-tracing-framework-for-production-ai-agents"
draft: false
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "summarization"
  - "classification"
  - "structured-output"
  - "unstructured-data"
  - "rag"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "elasticsearch"
  - "monitoring"
  - "databases"
  - "security"
  - "anthropic"
industryTags: "tech"
company: "Elastic"
summary: "Elastic consolidated fragmented evaluation practices for production AI agents used in cybersecurity, observability, enterprise chat, retrieval, and query generation. Its shared framework combines trace-based analysis, deterministic and domain-specific checks, RAG metrics, and LLM-as-a-judge evaluations, while keeping bespoke datasets and calibration with product and domain experts. The approach improves reuse, regression detection, and troubleshooting across teams, but the case study reports no aggregate quality, latency, cost, or release-frequency metrics, and emphasizes that the framework cannot replace expert-created test data, human review, or careful evaluator calibration."
link: "https://www.infoq.com/presentations/elastic-ai-agent-evaluations"
year: 2026
seo:
  title: "Elastic: A Shared Evaluation and Tracing Framework for Production AI Agents - ZenML LLMOps Database"
  description: "Elastic consolidated fragmented evaluation practices for production AI agents used in cybersecurity, observability, enterprise chat, retrieval, and query generation. Its shared framework combines trace-based analysis, deterministic and domain-specific checks, RAG metrics, and LLM-as-a-judge evaluations, while keeping bespoke datasets and calibration with product and domain experts. The approach improves reuse, regression detection, and troubleshooting across teams, but the case study reports no aggregate quality, latency, cost, or release-frequency metrics, and emphasizes that the framework cannot replace expert-created test data, human review, or careful evaluator calibration."
  canonical: "https://www.zenml.io/llmops-database/a-shared-evaluation-and-tracing-framework-for-production-ai-agents"
  ogTitle: "Elastic: A Shared Evaluation and Tracing Framework for Production AI Agents - ZenML LLMOps Database"
  ogDescription: "Elastic consolidated fragmented evaluation practices for production AI agents used in cybersecurity, observability, enterprise chat, retrieval, and query generation. Its shared framework combines trace-based analysis, deterministic and domain-specific checks, RAG metrics, and LLM-as-a-judge evaluations, while keeping bespoke datasets and calibration with product and domain experts. The approach improves reuse, regression detection, and troubleshooting across teams, but the case study reports no aggregate quality, latency, cost, or release-frequency metrics, and emphasizes that the framework cannot replace expert-created test data, human review, or careful evaluator calibration."
notion:
  pageId: "3f4f8dff-2538-8006-9107-fcc0a7d02169"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:46:00.000Z"
  lastEditedTime: "2026-10-09T08:46:00.000Z"
  publishedAt: "2026-10-09T08:52:28Z"
---

## Overview

Elastic operates production AI agents on top of Elasticsearch for several related but materially different use cases. Examples include Attack Discovery agents that inspect security logs for possible attacks, enterprise chatbots that answer questions using proprietary data stored in Elastic, agents that generate Elastic’s ES|QL queries, and other security and observability workflows. The underlying production problem is not simply generating an answer: teams must determine whether an agent retrieved the right information, selected appropriate tools, produced syntactically valid output, avoided hallucinations, and continued to behave acceptably after changes.

Elastic initially addressed these needs with siloed evaluation suites. Individual teams created their own datasets, metrics, tracing arrangements, and evaluators, often using different technologies and storage locations. The company subsequently developed a shared evaluation framework that standardizes reusable capabilities while preserving use-case-specific logic. It combines trace collection, code-based checks, RAG evaluation, LLM-based grading, and composite release scores. The reported result is a more repeatable way to create and run evaluations, although the presentation does not provide quantitative evidence of overall accuracy improvements, reduced costs, or faster delivery. The strongest evidence is operational: teams can reuse infrastructure, add production failures to regression datasets, inspect intermediate agent behavior, and avoid rebuilding common evaluation machinery.

## Production Use Cases and Risks

Elastic’s products provide search and retrieval infrastructure, and its internal agents use Elasticsearch data as a foundation. In the cybersecurity scenario, customers may ingest extremely large volumes of logs and need help filtering them and identifying relevant evidence during an incident. Attack Discovery uses agents to identify possible attacks rather than requiring analysts to manually inspect all logs. The evaluation challenge is asymmetric: false positives can create alert fatigue, while false negatives can hide attacks. Elastic therefore uses security-specific scenarios created with analysts and researchers, including both attack and benign cases.

The enterprise chatbot scenario is different. It retrieves documentation or other proprietary content and answers questions such as how to configure a domain in Google Workspace. The chatbot may combine keyword search, vector search, and tool calls. Another class of agent generates ES|QL, so correctness includes valid syntax and appropriate query behavior, not merely semantic similarity to a reference response. These differences explain why Elastic did not attempt to force every team into one identical dataset or metric set.

The production risks described include hallucinated attack findings on benign data, invented product identifiers or MITRE tactics, incomplete or irrelevant answers, poor retrieval, invalid query syntax, incorrect tool selection, and regressions hidden by looking only at the final response. An update can make an agent more aggressive and cause it to report attacks where none exist. Such behavior is precisely the kind of regression that requires representative benign examples and domain-aware checks rather than a generic response-quality score.

## Tracing and Observability

Elastic treats detailed tracing as a foundation for evaluation and debugging. Teams experimented with LangSmith, Phoenix, Elastic Observability, and other tools, partly because the LLM and agent observability ecosystem was changing quickly and partly because existing application observability did not always expose LLM-specific information. The choice also depends on existing organizational infrastructure, data-storage arrangements, and the willingness to operate another system. Some application telemetry remained in established observability platforms, while LLM-specific traces could be stored in specialized systems or other tools.

A useful trace records more than the final answer. For a chatbot, it can include the user request, the decision to use keyword or vector search, the tools invoked, the queries sent, retrieved documents, intermediate agent steps, token usage, latency, and the final response. This allows evaluation at multiple levels. A final answer can be wrong because the model reasoned incorrectly, because it queried the wrong index, because retrieval returned poor evidence, or because a deterministic post-processing step failed. Without intermediate traces, these causes are difficult to distinguish and harder to fix.

Tracing also supports feedback-driven regression testing. When users provide negative feedback, such as a thumbs-down signal, the corresponding scenario can be added to a future test dataset. This turns production failures into durable test cases rather than isolated incidents. Elastic notes that privacy, customer consent, and restricted-industry requirements may prevent collection of complete traces. In those situations, teams must rely on redacted data, proxy signals, explicit feedback, or indirect telemetry, much as traditional recommendation systems use clickstream and other imperfect signals.

## Shared Evaluation Architecture

The shared framework imports different dataset types through a standardized schema. A chatbot dataset may contain questions, expected answers, retrieval contexts, or query scenarios. A cybersecurity dataset may contain logs, attack conditions, benign conditions, expected alert identifiers, and security-taxonomy labels. The framework runs an agent or task against these inputs, applies relevant evaluators, and stores the results in Elastic or other participating tools.

The reusable building blocks include trace-based evaluators for token usage, latency, tool calls, and execution performance; common RAG evaluators; standard metrics such as precision, recall, factuality, and semantic similarity; LLM-as-a-judge components; and custom evaluators for specialized product behavior. The framework can run locally and report scores in a developer’s terminal, which makes evaluation part of ordinary development rather than an entirely separate data-science activity. Production-like runs are implemented in TypeScript using Playwright-based testing and a customized framework called Scout. Scout loads datasets, runs the TypeScript agents, collects traces, and executes evaluations.

There was an implementation mismatch during the transition. Data-science evaluations were initially written in Python, while the production agents were implemented in TypeScript. Running a Python approximation of a TypeScript production workflow risked differences between what was tested and what users actually exercised. Elastic later translated shared evaluation tooling into TypeScript, with software-engineering review and assistance from tools such as Claude and Cursor. This improved alignment with production, but the case study does not claim that every organization should port all Python evaluation code. Starting in Python can still be pragmatic when it enables early experimentation, particularly before production architecture and evaluation requirements stabilize.

## Evaluation Methods

Elastic uses hybrid evaluation rather than treating one metric as authoritative. Deterministic or programmatic checks are used where correctness is explicit. Examples include validating ES|QL syntax, checking whether generated code works, confirming that a required product ID is present, matching alert IDs, and checking whether predicted MITRE tactics are valid. These checks are relatively inexpensive, fast, reproducible, and resistant to some forms of language-model bias.

RAG-oriented evaluation includes retrieval relevance, semantic similarity, response relevance, response completeness, and factuality. Security evaluations use precision and recall for alert identification and may check whether the output remains within the expected security taxonomy. Chatbot evaluations may compare responses against known answers or documentation. These metrics are not interchangeable: a security detector’s false-positive behavior and an enterprise assistant’s completeness have different operational implications.

LLM-as-a-judge is used for ambiguous or open-ended dimensions such as coherence, style, tone, and broad response quality. It can scale evaluation across natural-language outputs and can provide an explanation for a score. However, Elastic reports several limitations. Results can vary across runs, graders may be insufficiently granular for JSON, YAML, identifiers, or query syntax, and a model may fail to recognize internal product facts. There is also a risk of evaluator bias when the same model family is used for generation and grading; the presentation cites observations that Llama-based graders may favor Llama-based outputs. For these reasons, model-based grading is paired with deterministic checks, tool validation, trace inspection, and domain-specific metrics rather than used alone.

## Release Decisions and Governance

Evaluation results are retained at both granular and aggregate levels. Teams may calculate a weighted composite score, giving more importance to criteria such as factuality, and compare it with a threshold. A release generally needs to clear the threshold and may also need to improve relative to a prior version. Engineers can inspect precision, recall, factuality, retrieval, and tool-call results instead of relying only on the flattened score. Manual product use and exploratory checks remain part of the final review, so the release process is described as rigorous but not fully automated.

The shared framework does not own everything. Domain experts and product teams remain responsible for creating representative scenarios, defining positive and negative behavior, deciding what constitutes a meaningful regression, and calibrating automated evaluators against human judgments. Cybersecurity scenarios may require analysts to construct realistic virtual machines, identity-provider environments, or other test conditions. Automatically generated examples can help scale a dataset, but Elastic emphasizes anchoring them in real expertise and user needs. A technically sophisticated framework with poorly chosen data or unstable judges can produce precise-looking but untrustworthy scores.

## Results, Tradeoffs, and Lessons

The main reported benefit is reuse across teams: common trace handling, dataset loading, metrics, and evaluator execution can be shared while bespoke security or product logic remains local. This reduces duplicated engineering effort and makes it easier to investigate regressions introduced by agent, model, retrieval, or tool changes. It also provides a common language for leadership and product teams asking how agents perform. Nevertheless, there are no published aggregate benchmark results in the source, and claims about improved quality or productivity should therefore be treated as qualitative rather than measured outcomes.

Elastic’s experience favors an incremental operating model. Early teams may begin with a small test set—roughly 20 to 50 records is suggested as a practical starting point—rather than waiting for a comprehensive evaluation platform. Ad hoc tools and separate tracing systems can be acceptable while use cases are exploratory. Once several agents reach production, shared tracing and at least one repeatable evaluation suite become increasingly important for troubleshooting, release decisions, and cross-team consistency.

The principal tradeoff is standardization versus domain fidelity. Abstracting common mechanics is valuable, but abstracting data creation, product judgment, or evaluator calibration can remove the context that makes a score meaningful. Elastic also found that consolidation is organizational as well as technical: earlier communication between teams could have reduced duplicated frameworks and access arrangements. Finally, customer data constraints limit observability. Structured feedback mechanisms, including explicit ratings or simpler external forms when full traces cannot be collected, provide a practical way to maintain evaluation signals without assuming unrestricted access to production data.
