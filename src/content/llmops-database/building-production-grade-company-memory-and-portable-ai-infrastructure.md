---
title: "Building Production-Grade Company Memory and Portable AI Infrastructure"
slug: "building-production-grade-company-memory-and-portable-ai-infrastructure"
draft: false
llmopsTags:
  - "question-answering"
  - "data-analysis"
  - "visualization"
  - "code-interpretation"
  - "chatbot"
  - "unstructured-data"
  - "rag"
  - "embeddings"
  - "memory"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "agent-based"
  - "human-in-the-loop"
  - "cost-optimization"
  - "evals"
  - "databases"
  - "postgresql"
  - "security"
  - "compliance"
  - "reliability"
  - "scalability"
  - "open-source"
  - "openai"
  - "anthropic"
industryTags: "tech"
company: "Various"
summary: "Several AI companies are addressing different production challenges that emerge when LLM systems move beyond small prototypes: retrieval over rapidly changing enterprise data, strict customer-cloud deployment requirements, and the loss of organizational knowledge across disconnected tools. The proposed solutions combine event-based memory, entity graphs, raw-document links, database-aware retrieval, sandboxed code execution, and provider-agnostic interfaces. Reported results include processing approximately 100 terabytes of knowledge, state-of-the-art performance on selected memory benchmarks, substantially lower retrieval costs when using less expensive models, support for deployment across multiple cloud environments, and a shared workspace in which company context is continuously captured. These claims are promising but are presented primarily as vendor demonstrations and should be validated against an organization’s own data, security model, workloads, and evaluation criteria."
link: "https://www.youtube.com/watch?v=dS_VDa620VM"
year: 2026
seo:
  title: "Various: Building Production-Grade Company Memory and Portable AI Infrastructure - ZenML LLMOps Database"
  description: "Several AI companies are addressing different production challenges that emerge when LLM systems move beyond small prototypes: retrieval over rapidly changing enterprise data, strict customer-cloud deployment requirements, and the loss of organizational knowledge across disconnected tools. The proposed solutions combine event-based memory, entity graphs, raw-document links, database-aware retrieval, sandboxed code execution, and provider-agnostic interfaces. Reported results include processing approximately 100 terabytes of knowledge, state-of-the-art performance on selected memory benchmarks, substantially lower retrieval costs when using less expensive models, support for deployment across multiple cloud environments, and a shared workspace in which company context is continuously captured. These claims are promising but are presented primarily as vendor demonstrations and should be validated against an organization’s own data, security model, workloads, and evaluation criteria."
  canonical: "https://www.zenml.io/llmops-database/building-production-grade-company-memory-and-portable-ai-infrastructure"
  ogTitle: "Various: Building Production-Grade Company Memory and Portable AI Infrastructure - ZenML LLMOps Database"
  ogDescription: "Several AI companies are addressing different production challenges that emerge when LLM systems move beyond small prototypes: retrieval over rapidly changing enterprise data, strict customer-cloud deployment requirements, and the loss of organizational knowledge across disconnected tools. The proposed solutions combine event-based memory, entity graphs, raw-document links, database-aware retrieval, sandboxed code execution, and provider-agnostic interfaces. Reported results include processing approximately 100 terabytes of knowledge, state-of-the-art performance on selected memory benchmarks, substantially lower retrieval costs when using less expensive models, support for deployment across multiple cloud environments, and a shared workspace in which company context is continuously captured. These claims are promising but are presented primarily as vendor demonstrations and should be validated against an organization’s own data, security model, workloads, and evaluation criteria."
notion:
  pageId: "3f4f8dff-2538-8073-a3cf-cb8e07e67342"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T06:40:00.000Z"
  lastEditedTime: "2026-10-09T06:40:00.000Z"
  publishedAt: "2026-10-20T14:47:55Z"
---

## Overview

This case study brings together three related production patterns for GenAI systems. The first is a multi-dimensional retrieval and memory architecture for enterprise agents that must answer questions across frequently changing documents, conversations, operational systems, and business databases. The second is a portable infrastructure architecture for AI applications that need secure, observable execution environments in different customer clouds. The third is a company-context workspace that continuously captures organizational knowledge from everyday work rather than relying on employees to manually maintain a wiki. Across all three patterns, the central LLMOps lesson is that model intelligence alone is not enough: reliable production behavior depends on the surrounding context, retrieval, permissions, execution, evaluation, and deployment harness.

The approaches are positioned as alternatives to simple vector RAG, one-off integrations, and model-specific application code. They may be useful at enterprise scale, but the strongest performance and business-impact claims are not independently substantiated in the material. The benchmark results, cost comparisons, and productivity improvements should therefore be treated as reported results rather than universal outcomes.

## Problem: RAG and organizational context at scale

A conventional RAG pipeline typically chunks files, generates embeddings, stores them in a vector database, retrieves the top-k similar passages, and supplies those passages to an LLM or agent. This is a reasonable design for a small, relatively stable corpus such as product documentation, website content, or marketing material. It is also a useful starting point for prototypes, where a Markdown file committed to Git may be simpler and more maintainable than a full retrieval stack.

The limitations become more significant when the corpus reaches millions of documents, changes continuously, spans multiple systems, or contains information whose meaning depends on time and relationships. Similarity search can retrieve semantically related text without correctly identifying the relevant version, business entity, or historical state. Basic vector stores also tend to obscure document changes unless the application implements versioning explicitly, and updates may require re-embedding large portions of the corpus. These operations can create increasing ingestion cost and operational complexity.

The proposed architecture distinguishes among several retrieval needs. A relatively static, word-oriented document corpus can continue to use vector RAG. A constantly changing personal or organizational knowledge base may benefit from an “LLM wiki” concept in which documents are linked and updated as relationships are inferred. Large enterprises with real-time data, multiple schemas, and sources such as CRM systems, meeting notes, analytics platforms, logs, repositories, and cloud documents require more than nearest-neighbor retrieval alone.

## Multi-dimensional memory architecture

The architecture presented for Parkle treats incoming information as events. Updates from logs, GitHub pull requests, Google Docs, meeting notes, CRM records, and other sources are normalized into an event-oriented timeline. This preserves temporal information, allowing an agent to distinguish what happened recently from what happened earlier rather than treating all text as an undifferentiated collection of passages.

An entity graph is built over the event stream. Nodes represent relevant entities and concepts, while typed edges represent different relationship meanings. The design includes five edge types and confidence scores intended to indicate the strength of inferred relationships. This makes it possible to answer questions involving relationships among people, projects, systems, and business concepts, rather than only matching the words used in a query.

The system also retains links to raw documents and conversation history. The graph and derived memory can identify where relevant information is likely to exist, while the raw source provides a path to inspect or cite the underlying evidence. This separation is important for production systems: a generated graph should not become the only authoritative copy of company information. Maintaining source references can improve auditability, debugging, and user trust, although the quality of citations still depends on ingestion, entity resolution, access control, and retrieval accuracy.

A specialized data-agent workflow connects business language to structured data. It first analyzes business context and definitions, then samples database rows and collects schemas, and finally uses an agent to associate business concepts with tables, columns, and rows. At query time, the agent traverses the knowledge graph, retrieves relevant business context and database elements, writes SQL, executes it in a code sandbox, analyzes the result, and generates a chart or other response. A sample workflow asks for a cohort heat map based on account-opening month and subsequent transaction activity.

The sandbox is an important operational boundary. SQL and other generated code can be executed against connected data without exposing the execution state permanently in the conversational context; the described implementation discards results after the session. In a real deployment, this pattern would still require careful controls around network access, query permissions, resource limits, sensitive data handling, audit logs, and failure recovery.

## Evaluation and model economics

The architecture is reported to have gone through five iterations, with approximately 100 terabytes of knowledge processed over twelve months. It is also reported to achieve state-of-the-art accuracy on LongMemEval, LOCOMO, and BIRD, where BIRD is described as a text-to-SQL and business-analytics-oriented benchmark. These results indicate an emphasis on long-term memory, conversational recall, and structured business querying, but benchmark scores alone do not establish production reliability. Evaluation should also include freshness, citation correctness, temporal reasoning, permission leakage, SQL safety, schema changes, latency, and behavior on an organization’s own representative questions.

A key economic claim is that the retrieval and memory harness can remain relatively stable while the underlying model changes. The presentation reports only a three-percentage-point performance difference between a higher-cost OpenAI model and a lower-cost DeepSeek model in one comparison, alongside a twenty-fold cost spread and a claimed 95% cost reduction. The practical implication is that a well-designed retrieval, memory, and tool-use layer may allow an organization to route different tasks to different models instead of rebuilding the application whenever model providers change.

This is a useful LLMOps hypothesis, but it has boundaries. Model substitution can affect tool-call reliability, structured-output compliance, latency, safety behavior, multilingual performance, and the ability to reason over complex graphs or SQL results. Cost comparisons also depend on token volume, caching, indexing costs, infrastructure, retries, and evaluation overhead. A production routing policy should therefore combine quality gates with cost and latency budgets rather than assuming that model capability is fully interchangeable.

## Portable execution infrastructure for AI applications

Alara serves customers in semiconductor, battery, and advanced-materials research and must operate on confidential, proprietary data. Its stated deployment requirements include keeping customer data within the customer’s cloud, deploying the application into whichever cloud infrastructure the customer uses, and making all actions observable and reproducible. These constraints make hosted sandbox services difficult to adopt as a universal dependency.

The company describes “infinite churn” as the situation in which an application spends more time adapting to infrastructure providers than delivering product value. Sandbox providers, vector databases, observability systems, agent-tracing tools, and model APIs can all change quickly, encouraging repeated migrations. Alara reportedly moved among several sandbox approaches, including E2B and an open-source microVM-oriented alternative, before adopting a provider-agnostic design philosophy.

The proposed plug-and-play architecture isolates infrastructure behind a small interface. For a sandbox, common operations include starting and stopping an environment, taking and restoring a filesystem snapshot, executing a command, uploading a file, and downloading a file. Application-level code calls this interface, while provider-specific adapters implement the operations for Modal, E2B, or another environment. The same design can be applied to model providers, vector databases, observability tools, and agent tracing.

This approach reduces lock-in and makes customer-specific deployment more manageable. It also creates a clear separation between business logic and infrastructure, which can improve testing and code review. The tradeoff is additional upfront engineering and the risk of designing an abstraction that is too weak for provider-specific capabilities. A common interface may hide important differences in isolation strength, startup latency, filesystem semantics, networking, GPU support, persistence, and auditability. Adapter-level conformance tests and security testing are therefore essential.

## Continuously learned company context

A separate company-context system, PromQL, treats a shared workspace as a living knowledge layer rather than merely a chatbot or manually curated wiki. It collects context from work threads, connected databases and SaaS services, people’s expertise and working patterns, and artifacts produced by employees and agents. The intended result is an organizational memory that grows through normal usage without requiring every employee to author documentation.

The system is designed to be model-independent so that the organization can change among models such as Claude, Codex, or lower-cost open-weight alternatives without losing accumulated context. This is consistent with the broader argument that model weights provide general intelligence while persistent memory provides organization-specific experience. In LLMOps terms, the company is attempting to make context, permissions, tool connections, and learned relationships portable across model changes.

Demonstrations include recording changes in customer contacts, applying internal development practices to code changes, generating a preview link for a pull request, and enabling a marketing employee to create an event-evaluation dashboard. The system also supports personal planning use cases. These examples suggest a move from question answering toward agent-assisted work, in which the agent can create artifacts and coordinate tasks rather than only return text.

Trust and authorization are treated as core runtime concerns. Access is governed through scopes, claims, tokens, and delegated identity. An agent receives the permissions of the person invoking it, and another participant can contribute their own permissions in the same thread when a task requires finance or sales access. This is preferable to embedding broad API keys in prompts, but delegated access introduces risks involving confused deputies, cross-user data exposure, stale permissions, and excessive tool authority. Every action should be logged with the requesting identity, effective permissions, retrieved sources, tool calls, and resulting artifact.

## Results, limitations, and production lessons

The combined case provides a coherent set of LLMOps practices: use simple files for small prototypes, choose vector RAG for stable document question answering, add temporal and relational memory for changing enterprise knowledge, preserve links to source evidence, isolate generated code in controlled sandboxes, abstract volatile infrastructure behind interfaces, and make identity and permissions part of every agent turn. It also emphasizes that continuous usage can generate valuable feedback and context without a separate manual training phase.

However, the reported outcomes require independent validation. “State-of-the-art” benchmark performance may not transfer to a company’s terminology, schemas, historical changes, or access rules. Automatically inferred graphs can contain incorrect entities and relationships, while continuously learning systems can compound bad assumptions unless corrections, provenance, confidence thresholds, and rollback mechanisms are available. Shared workspaces can improve discoverability but may also capture sensitive information unintentionally or create excessive context that increases latency and cost.

A responsible rollout would begin with narrowly scoped, read-only use cases and representative evaluation sets. It should measure answer correctness, retrieval recall, freshness, citation quality, SQL validity, task completion, latency, cost per successful task, and unauthorized-access rates. Human approval should remain in the loop for destructive actions, financial decisions, production changes, and external communications. With those controls, the architectures described here offer practical ways to make LLM applications more portable, context-aware, and maintainable as models and infrastructure continue to evolve.
