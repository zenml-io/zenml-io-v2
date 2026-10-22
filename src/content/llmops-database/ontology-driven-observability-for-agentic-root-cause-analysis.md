---
title: "Ontology-Driven Observability for Agentic Root-Cause Analysis"
slug: "ontology-driven-observability-for-agentic-root-cause-analysis"
draft: false
llmopsTags:
  - "data-integration"
  - "data-analysis"
  - "structured-output"
  - "unstructured-data"
  - "realtime-application"
  - "question-answering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "memory"
  - "error-handling"
  - "fallback-strategies"
  - "monitoring"
  - "databases"
  - "reliability"
  - "scalability"
industryTags: "media-entertainment"
company: "Netflix"
summary: "Netflix built an ontology-backed knowledge graph to unify observability data and operational knowledge across applications, incidents, deployments, telemetry, and incident discussions. The system uses RDF, OWL, SHACL, SPARQL, sequential enrichment pipelines, correlation analysis, and internal agentic AI to turn noisy and inconsistently named data into typed, queryable triples. Its AutoRCA system presents engineers with ranked, evidence-backed hypotheses, reducing the manual effort required to reconstruct context during incidents. The approach improves consistency and context availability, but the source describes the system as early, with sometimes incorrect hypotheses and no formal quantitative results for investigation-time reduction or diagnostic accuracy."
link: "https://netflixtechblog.com/ontology-driven-observability-building-an-end-to-end-knowledge-graph-at-netflix-scale-421392cf5adf"
year: 2026
seo:
  title: "Netflix: Ontology-Driven Observability for Agentic Root-Cause Analysis - ZenML LLMOps Database"
  description: "Netflix built an ontology-backed knowledge graph to unify observability data and operational knowledge across applications, incidents, deployments, telemetry, and incident discussions. The system uses RDF, OWL, SHACL, SPARQL, sequential enrichment pipelines, correlation analysis, and internal agentic AI to turn noisy and inconsistently named data into typed, queryable triples. Its AutoRCA system presents engineers with ranked, evidence-backed hypotheses, reducing the manual effort required to reconstruct context during incidents. The approach improves consistency and context availability, but the source describes the system as early, with sometimes incorrect hypotheses and no formal quantitative results for investigation-time reduction or diagnostic accuracy."
  canonical: "https://www.zenml.io/llmops-database/ontology-driven-observability-for-agentic-root-cause-analysis"
  ogTitle: "Netflix: Ontology-Driven Observability for Agentic Root-Cause Analysis - ZenML LLMOps Database"
  ogDescription: "Netflix built an ontology-backed knowledge graph to unify observability data and operational knowledge across applications, incidents, deployments, telemetry, and incident discussions. The system uses RDF, OWL, SHACL, SPARQL, sequential enrichment pipelines, correlation analysis, and internal agentic AI to turn noisy and inconsistently named data into typed, queryable triples. Its AutoRCA system presents engineers with ranked, evidence-backed hypotheses, reducing the manual effort required to reconstruct context during incidents. The approach improves consistency and context availability, but the source describes the system as early, with sometimes incorrect hypotheses and no formal quantitative results for investigation-time reduction or diagnostic accuracy."
notion:
  pageId: "400f8dff-2538-81bf-bf73-e34bbfb373a6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-21T10:57:00.000Z"
  lastEditedTime: "2026-10-21T10:57:00.000Z"
  publishedAt: "2026-10-22T13:36:02Z"
---

## Overview

Netflix describes an early production-oriented system for investigating failures across an extremely large and heterogeneous technology estate. The underlying problem is not a lack of observability data: Netflix reports handling more than 2 billion requests and upwards of 38 million real-time logging events per second on an ordinary day, while a major live event in November 2024 reached roughly 65 million concurrent streams. The problem is that the relevant context is distributed across telemetry, alerting, incident-management, deployment, on-call, and collaboration systems. These systems use different names and definitions for the same operational entities, leaving engineers to reconstruct relationships manually. In the example presented, a roughly four-hour investigation is dominated by assembling context rather than by difficult computation.

Netflix’s solution is an Observability Ontology implemented as a knowledge graph. The graph provides a shared semantic contract for applications, services, incidents, deployments, teams, signals, and operational reasoning. Raw and semi-structured inputs are transformed into validated, typed RDF triples, after which correlation logic and a multi-agent AutoRCA system can query the same vocabulary. The intended result is not autonomous incident resolution today; it is a graph-backed set of ranked hypotheses that gives an engineer a useful starting picture while preserving the evidence behind each claim. The article reports meaningful architectural progress, but it does not provide controlled benchmarks, accuracy measurements, or a quantified reduction in mean time to resolution.

## Problem and operational context

A user-facing regression, such as an additional 1.5 seconds of home-screen rendering latency, can originate in many layers. Potential causes include a client release, an experiment rollout, infrastructure load shedding, or a downstream service several hops away returning bad GraphQL data. Metrics, events, logs, and traces—the MELT signals—each reveal part of the situation, but none alone expresses the complete chain from user impact to root cause. Engineers must also consult alert history, incident severity, responder rotations, deployment records, and prior discussions in Slack.

The systems involved are internally coherent but poorly aligned with one another. Atlas knows applications and time series, Radar knows alerts and thresholds, incident.io knows incidents and responders, PagerDuty knows rotations, and Spinnaker knows deployments. The same entity may be called an application, service, or cluster in different tools, with additional variation from casing, suffixes, and historical renames. The article therefore frames end-to-end observability primarily as a data-modeling and identity problem, rather than simply a dashboard or data-volume problem.

## Semantic architecture

The Observability Ontology is a formal agreement about entity types, properties, and relationships. Its atomic representation is a subject-predicate-object triple, such as an application being owned by a team, deployed in a region, or affected by a particular incident. This allows a question such as which incidents affected applications owned by a team in a region to be expressed as one graph query instead of a manual join across multiple products.

Netflix uses W3C standards: RDF for the data model, OWL for the ontology, SHACL for validation, and SPARQL for querying. The graph is stored in QuipuDB, described as a homegrown distributed quad store based on the Rust embedded key-value database redb. Each harvest also produces a complete Turtle serialization, which makes graph state human-readable and suitable for archival and diff-based debugging. The ontology is divided into twelve operational namespaces, although the article does not enumerate all of them in the supplied text.

Identity governance is a central design decision. Netflix deliberately avoids a generic Service type because that term has different meanings across its tools. Applications resolve to exactly one ops:Application type and are validated against a software catalog containing roughly 49,000 entries before being created. Unvalidated strings, such as usernames or dependency names inferred from topology, cannot automatically become applications. Dependency edges are also capped in both directions so that highly popular services do not overwhelm the graph with reverse dependencies. These controls reduce false joins and graph pollution, both of which are particularly dangerous when downstream agents use the graph as context.

## LLM and enrichment pipeline

The system uses stochastic components where interpretation is necessary. LLMs summarize incident discussions, fuzzy matching helps resolve names, and a probabilistic engine proposes causal or correlational chains. Rather than allowing these components to write unconstrained prose directly into a decision workflow, Netflix constrains them through the ontology and a sequence of enrichment stages. Enrichers read noisy inputs and emit typed triples under a narrow contract. Common invariants include an RDF type for every entity, a single URI naming convention, and catalog validation for applications.

The article’s core LLMOps idea is that a type system and validation pipeline can convert uncertain model output into a deterministic downstream interface. A model may generate a free-form interpretation, but its accepted result must fit permitted categories and predicates, for example a discussion thread classified as an incident with a Boolean incident-related property. The graph query then returns the same facts consistently, even though the model-assisted extraction that produced them may not be reproducible token for token.

The enrichment stages are executed sequentially: the graph is loaded, one enrichment adds triples, and the updated graph is saved before the next stage proceeds. This sacrifices some wall-clock speed but removes a class of race conditions and lets later enrichers build on earlier results. Calls to external systems are best-effort, so a slow metrics, logs, events, or incident API should degrade graph completeness rather than block the entire harvest. The source says Netflix is working toward representing more of those systems directly in the ontology, including metrics and alerts.

Incident conversations are treated as a particularly valuable source. A Slack channel can contain discarded hypotheses, successful mitigations, explanations, and knowledge held by a subject-matter expert. Netflix converts this reasoning from an ephemeral 200-message conversation involving many people and services into structured triples. This is broader than conventional telemetry ingestion: the graph attempts to preserve human interpretation as operational knowledge, not only record what machines emitted.

## Correlation and agentic RCA

The correlation engine reads thirteen signal types, including log errors, metric anomalies, slow and failed traces, alerts, incidents, deployments, configuration changes, experiments, autoscaling, commits, end-to-end bottlenecks, and error patterns. It searches for paths between signals, assigning higher prior weight to ordered relationships that are plausibly causal, such as a deployment preceding a log error or a configuration change preceding a metric anomaly. Candidate chains are scored using temporal proximity and severity within a ten-minute window, and chains below 0.6 confidence are discarded.

The engine is explicitly positioned as a hypothesis generator rather than an authority. A chain’s confidence and the graph records supporting it are retained so that an engineer or an agent can inspect the basis for the claim. The example of a 0.87 chain is therefore not presented as proof of causality; it is a high-scoring proposition for review. This evidence-preserving design is important because temporal correlation, even with domain-specific priors, can still produce false causal explanations.

AutoRCA sits above the graph as an internal agentic AI system composed of specialist agents coordinated around an investigation question. The ontology functions as the interface between specialists: one agent can write findings about an ops:Application, while another reads those triples without requiring direct knowledge of the first agent or its implementation. This reduces the need for every specialist to understand every upstream data source and creates a common vocabulary for multi-agent handoffs.

The described knowledge flywheel has four conceptual stages: observe signals, enrich the graph with typed facts, infer patterns, and adapt by feeding established patterns back into detection rules. For example, repeated incidents may eventually support insights about particular deployment or timeout patterns. However, the article presents these examples as the intended compounding behavior, not as independently validated predictive performance. Claims such as a percentage of incidents associated with a deployment should therefore be understood as graph-derived operational insights whose quality depends on extraction accuracy, entity identity, coverage, and causal methodology.

## Production controls, results, and tradeoffs

The strongest production-safety feature is constrained structure. Ontology validation, SHACL-style checks, authoritative catalogs, stable URIs, confidence values, evidence retention, ordered processing, and best-effort integrations all limit how erroneous model output can affect consumers. The system also keeps humans responsible for weighing evidence and writing or approving fixes. Netflix explicitly acknowledges that ranked hypotheses are sometimes wrong, so the system is positioned as decision support rather than an unattended remediation service.

The principal reported benefit is reduced context-assembly effort: engineers begin an investigation with a cross-system picture that previously could take an hour or two to assemble. The article does not state a measured average, percentile, accuracy rate, cost reduction, or incident-resolution improvement, so those benefits should not be treated as experimentally established. Nor does it specify the LLM models, prompts, token budgets, retrieval strategy, or offline evaluation methodology. Consequently, the case is more useful as an architecture and governance pattern than as a reproducible performance benchmark.

There are substantial tradeoffs. Sequential enrichment improves consistency and composability but increases latency. Best-effort dependencies preserve pipeline availability but can yield incomplete context. A shared ontology makes integration easier, yet ontology design, versioning, identity resolution, and validation become ongoing organizational responsibilities. Confidence thresholds can reduce noise while discarding useful low-confidence leads. Graph-derived causal chains may be persuasive without being genuinely causal, which is why evidence and human review remain necessary. Storing incident reasoning can improve institutional memory but also raises questions about access control, sensitive operational information, retention, and provenance that the source does not discuss.

## Future direction

Netflix describes automated remediation and eventually proactive self-healing infrastructure as future possibilities, including targeted rollbacks or traffic shifts attached to sufficiently confident diagnoses. Those capabilities are not reported as currently autonomous or reliable. The proposed integration with Upper, Netflix’s domain-modeling language within its Unified Data Architecture, would connect operational concepts such as applications, alerts, deployments, and incidents with broader machine-readable domain models. The planned proof of concept for modeling incidents in Upper is an evolution path rather than a demonstrated production result.

Overall, this case illustrates a pragmatic LLMOps pattern: use LLMs and probabilistic systems for extraction, summarization, matching, and hypothesis generation, but place them inside a deterministic, typed, auditable data pipeline. The knowledge graph does not eliminate uncertainty or replace experienced responders. Its value is to make cross-system context explicit, reusable, and inspectable so that agents can reason over a controlled operational vocabulary and humans can challenge the resulting hypotheses.
