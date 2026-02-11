---
title: "Automated Performance Optimization with GenAI-Powered Code Analysis"
slug: "automated-performance-optimization-with-genai-powered-code-analysis"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694add0364d67fc640f831a1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:49.032Z"
  createdOn: "2025-12-23T18:18:43.466Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "multi-agent-systems"
  - "cost-optimization"
  - "latency-optimization"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "monitoring"
  - "open-source"
industryTags: "tech"
company: "Uber"
summary: "Uber developed PerfInsights to address unsustainable compute costs from inefficient Go services, where traditionally manual performance optimization required deep expertise and days or weeks of effort. The system combines runtime CPU/memory profiling with GenAI-powered static analysis to automatically detect performance antipatterns in Go code, using LLM juries and rule-based validation (LLMCheck) to reduce hallucinations and false positives from over 80% to the low teens. Since deployment, PerfInsights has generated hundreds of merged optimization diffs, reduced antipattern detection time by 93% (from 14.5 hours to under 1 hour per issue), eliminated approximately 3,800 hours of manual engineering effort annually, and achieved a 33.5% reduction in codebase antipatterns over four months while delivering measurable compute cost savings."
link: "https://www.uber.com/en-GB/blog/perfinsights/?uclick_id=0a73d271-32e7-4b77-9697-a587a4c8d9fe"
year: 2025
seo:
  title: "Uber: Automated Performance Optimization with GenAI-Powered Code Analysis - ZenML LLMOps Database"
  description: "Uber developed PerfInsights to address unsustainable compute costs from inefficient Go services, where traditionally manual performance optimization required deep expertise and days or weeks of effort. The system combines runtime CPU/memory profiling with GenAI-powered static analysis to automatically detect performance antipatterns in Go code, using LLM juries and rule-based validation (LLMCheck) to reduce hallucinations and false positives from over 80% to the low teens. Since deployment, PerfInsights has generated hundreds of merged optimization diffs, reduced antipattern detection time by 93% (from 14.5 hours to under 1 hour per issue), eliminated approximately 3,800 hours of manual engineering effort annually, and achieved a 33.5% reduction in codebase antipatterns over four months while delivering measurable compute cost savings."
  canonical: "https://www.zenml.io/llmops-database/automated-performance-optimization-with-genai-powered-code-analysis"
  ogTitle: "Uber: Automated Performance Optimization with GenAI-Powered Code Analysis - ZenML LLMOps Database"
  ogDescription: "Uber developed PerfInsights to address unsustainable compute costs from inefficient Go services, where traditionally manual performance optimization required deep expertise and days or weeks of effort. The system combines runtime CPU/memory profiling with GenAI-powered static analysis to automatically detect performance antipatterns in Go code, using LLM juries and rule-based validation (LLMCheck) to reduce hallucinations and false positives from over 80% to the low teens. Since deployment, PerfInsights has generated hundreds of merged optimization diffs, reduced antipattern detection time by 93% (from 14.5 hours to under 1 hour per issue), eliminated approximately 3,800 hours of manual engineering effort annually, and achieved a 33.5% reduction in codebase antipatterns over four months while delivering measurable compute cost savings."
---

## Overview

Uber's PerfInsights represents a sophisticated production LLMOps system designed to automate performance optimization of Go services at scale. The system emerged from a 2024 hackathon project and evolved into a production-ready tool that addresses a critical business problem: the top 10 Go services at Uber were consuming multi-million dollars in compute spend monthly as of March 2024. Traditional performance tuning required specialized compiler and runtime expertise, with optimization cycles taking days to weeks per service. PerfInsights transforms this manual, expert-dependent process into an automated, scalable practice accessible to general engineering teams.

The case study provides valuable insights into building reliable GenAI-powered developer tools in production, with particular emphasis on validation strategies, prompt engineering techniques, and integration patterns that enable LLMs to operate reliably in high-stakes engineering workflows. While the source material makes strong claims about impact, the technical architecture and validation approaches described offer genuine lessons for production LLMOps practitioners.

## System Architecture and Pipeline Design

PerfInsights operates through a two-stage pipeline that intelligently combines traditional profiling with GenAI-powered analysis. The first stage leverages Uber's fleet-wide profiler to collect CPU and memory profiles from production services during peak traffic periods. The system identifies the top 30 most expensive functions based on flat CPU usage, reflecting an empirical observation that these functions account for the majority of compute consumption. Additionally, when the Go runtime's memory allocation function (runtime.mallocgc) exceeds 15% of CPU time, the system triggers memory profile analysis to identify allocation inefficiencies.

A critical architectural decision involves aggressive static filtering before any LLM processing occurs. The system excludes open-source dependencies and internal runtime functions, focusing analysis exclusively on service-owned code. This pre-filtering dramatically constrains the search space and reduces noise in downstream GenAI analysis—a key design pattern for production LLMOps systems where managing LLM context and reducing false positives is essential.

The second stage employs GenAI-driven antipattern detection using a curated catalog of performance issues informed by Uber's Go Foundations team's historical optimization work. These patterns align with Uber's Go style guide and represent the most common efficiency problems encountered across services, including unbounded memory allocations, redundant loop computations, and inefficient string operations. The system passes full source code of identified hotpath functions along with the antipattern catalog to an LLM for analysis, combining profiling context with pattern awareness to enable precise detection.

## Prompt Engineering Strategy

The case study provides extensive detail on prompt engineering evolution, offering practical insights into production prompt optimization. Initial single-shot LLM attempts produced inconsistent, unreliable results with significant hallucinations and non-runnable code generation. The team systematically addressed these issues through several targeted strategies.

Few-shot prompting emerged as a crucial technique for improving detection accuracy. The team provides a concrete example where the system incorrectly detected case-insensitive string comparisons that didn't exist in the code. Adding few-shot examples demonstrating both positive and negative cases for the antipattern substantially improved precision. This reflects a fundamental LLMOps principle: domain-specific examples significantly improve model performance on specialized tasks.

The team also discovered that explicitly specifying the model's role and audience—framing both the LLM and the user as Go experts—focused responses on advanced, relevant details appropriate for expert-level users. Additionally, they incorporated prompts asking the model to test its own results for reliability and ensure suggested fixes are runnable, adding a self-reflection layer that improved output quality.

Several tactical prompt writing strategies proved effective: using specific positive instructions rather than negative phrasing (avoiding "don't" constructions); creating separate prompts per antipattern to preserve context and decompose complex tasks; separating detection and validation into distinct prompts; and incorporating explicit incentives/penalties for correct/incorrect answers. The team also requests confidence scores with each response, finding this prompting technique encourages more thoughtful model reasoning.

A critical architectural decision involves managing token limits. The team emphasizes that high input token limits were essential for passing large Go functions without truncation. Small adjustments in prompt phrasing and contextual cues, particularly encoding explicit antipattern definitions and Go-specific idioms, dramatically influenced accuracy and contributed to the eventual 80% reduction in false positives.

## Validation Architecture: LLM Juries and LLMCheck

PerfInsights' validation pipeline represents sophisticated LLMOps engineering, implementing two complementary systems to establish developer trust. The first component, LLM juries, employs an ensemble of multiple language models to independently assess whether antipatterns are present and whether suggested optimizations are valid. This multi-model consensus approach mitigates common hallucinations such as incorrectly detecting loop invariants or misinterpreting control structures. The ensemble strategy reflects a key production LLMOps pattern: avoiding single-model dependency for critical decisions where accuracy is paramount.

The second validation layer, LLMCheck, implements domain-specific rule-based validators that catch false positives missed by LLM juries. The framework addresses specific hallucination patterns observed in practice, including detecting antipatterns that don't exist, confusing maps with slices, identifying loop variables in for-statements as loop invariants, and detecting loop invariants that are actually outside loops. LLMCheck provides several production benefits: it evaluates highly specific conditional projects rather than generic patterns; it's extensible for adding validators across various LLM-based projects; and it provides standardized metrics tracking reductions in LLM response errors during prompt tuning.

The dual-validation strategy (ensemble models plus rule-based checking) dramatically improved precision, reducing false positives from over 80% initially to the low teens. This validation architecture exemplifies mature LLMOps practice: recognizing that LLMs alone cannot achieve production-grade reliability for critical developer tools, and systematically layering validation approaches that combine statistical consensus with deterministic verification.

## Production Integration and Operational Patterns

PerfInsights integrates into Uber's engineering infrastructure through multiple touchpoints. Validated suggestions flow directly into Optix, Uber's continuous code optimization tool, enabling automated downstream code transformation. This integration has produced hundreds of merged diffs in Uber's Go monorepo, demonstrating genuine production adoption rather than experimental deployment.

The system provides dashboards powered by LLMCheck that give teams visibility into detection accuracy, error patterns, and antipattern frequency. This observability layer enables continuous improvement of the system and builds developer trust through transparency. The metrics tracking includes failure rates and signals for potential model drift—critical operational capabilities for production LLM systems.

The case study emphasizes that PerfInsights transformed performance tuning from a reactive, expert-led task into a proactive, continuous discipline embedded in CI/CD pipelines and day-to-day workflows. Optimization opportunities are surfaced regularly as part of normal development cycles rather than only when performance crises occur. This integration pattern reflects mature LLMOps: embedding AI-assisted tooling into existing developer workflows rather than requiring separate, disruptive processes.

## Impact Assessment and Critical Evaluation

The reported impact metrics are substantial, though readers should approach vendor-reported numbers with appropriate skepticism. The system claims to reduce antipattern detection time by 93%, from 14.5 hours to under 1 hour per issue. Over four months (February to June), validated antipattern detections decreased from 265 to 176 daily averages—a 33.5% reduction indicating improving codebase health. Projecting annually, the team estimates this prevents approximately 3,800 hours of manual engineering effort that would otherwise be required to address 267 antipatterns.

Historical context provides some credibility to these claims: the team documents that five critical antipatterns previously required two engineers (including a Principal Engineer) for a full month (approximately 320 hours); eleven antipatterns consumed a four-person Go expert team for a week (approximately 160 hours); and a dedicated Go expert spent six months full-time on optimization projects (approximately 960 hours). These examples total over 1,400 hours for a handful of cases, suggesting the manual approach was indeed resource-intensive.

The system has generated hundreds of merged optimization diffs, with the first significant cost-saving diff serving as a breakthrough moment that unlocked broader adoption. While specific cost savings numbers are mentioned as "multi-million dollars" in monthly compute spend, the text doesn't provide precise attribution of savings to PerfInsights interventions, making it difficult to validate the direct financial impact.

From an LLMOps perspective, the more credible achievement is the hallucination reduction from over 80% to the low teens through systematic validation engineering. This demonstrates that with sufficient investment in validation infrastructure, LLMs can achieve production-grade reliability for specialized code analysis tasks. However, readers should note that achieving this required substantial engineering effort: curated antipattern catalogs, extensive prompt engineering, ensemble validation, and custom rule-based checking frameworks.

## Technical Limitations and Tradeoffs

While the case study presents PerfInsights as transformative, several limitations and tradeoffs warrant consideration. The system is explicitly designed for Go services and relies on Go-specific profiling infrastructure, antipattern catalogs, and validation rules. While the authors claim the design is "language-agnostic," adapting PerfInsights to other languages would require substantial re-engineering of the antipattern catalog, validation rules, and potentially the profiling integration.

The approach depends on high-quality production profiling data from Uber's fleet-wide profiler infrastructure during peak traffic. Organizations without mature profiling capabilities or sufficient production traffic to generate representative profiles may struggle to replicate this approach. The static filtering strategy that constrains analysis to the top 30 functions and service-owned code is both a strength (reducing noise) and a limitation (potentially missing optimization opportunities in less-frequently-called functions that still contribute meaningfully to costs).

The validation infrastructure, while effective, adds operational complexity and latency. Running multiple LLM models for jury-based validation increases compute costs and response times compared to single-model approaches. The rule-based LLMCheck framework requires ongoing maintenance as new antipattern detectors are added and as the underlying LLMs evolve, potentially exhibiting different hallucination patterns.

From a developer experience perspective, the system generates optimization suggestions that still require human review and decision-making before merging. While automation reduces detection time dramatically, engineers must still evaluate whether suggested optimizations are appropriate for their specific context, don't introduce bugs, and align with other engineering considerations. The "hundreds of merged diffs" suggest significant manual review overhead at scale.

## Key LLMOps Lessons and Patterns

Several generalizable LLMOps patterns emerge from this case study. First, aggressive upstream filtering and problem space constraint before applying LLMs can dramatically improve reliability and reduce costs. PerfInsights' profiling-based function filtering and static exclusion of irrelevant code demonstrates this principle effectively.

Second, validation layering is essential for production reliability when LLM output directly influences production systems. The combination of ensemble models and domain-specific rule-based checking provides complementary strengths: statistical consensus catches errors individual models make, while deterministic rules catch systematic hallucination patterns.

Third, prompt engineering remains critical for specialized domain tasks. The detailed evolution from single-shot prompts to few-shot examples with explicit role framing, confidence scoring, and self-testing instructions illustrates that achieving production-grade performance requires systematic prompt optimization informed by failure analysis.

Fourth, observability and metrics tracking are non-negotiable for production LLM systems. LLMCheck's dashboards tracking detection accuracy, error patterns, and model drift enable continuous improvement and build organizational trust in AI-assisted tooling. Without this transparency, adoption would likely remain limited to early enthusiasts.

Fifth, integration into existing developer workflows rather than standalone tools drives adoption. PerfInsights' connection to Optix and CI/CD pipelines means developers encounter optimization suggestions as part of normal work rather than requiring separate processes. This integration pattern is likely as important as the technical capabilities for driving real-world impact.

Finally, the importance of demonstrable wins for adoption is emphasized: the first major cost-saving diff served as a "breakthrough moment" that unlocked broader usage. For LLMOps initiatives, early concrete successes that stakeholders can observe directly appear critical for gaining the organizational support needed for continued investment and refinement.

## Model Selection and Infrastructure Considerations

The case study mentions that high input token limits were critical for passing large Go functions without truncation, but doesn't specify which LLM(s) are used, model versions, hosting infrastructure, or inference optimization techniques. This omission makes it difficult to assess computational costs, latency characteristics, or reproducibility of the approach. The jury-based validation implies running multiple model inferences per detected antipattern, which could be computationally expensive at scale.

The integration with Uber's existing profiling infrastructure and monorepo suggests significant infrastructure investment beyond the LLM components themselves. Organizations considering similar approaches should account for the prerequisite infrastructure: production profiling systems, code analysis tooling, automated code transformation capabilities, and dashboarding for observability.

## Conclusion and Broader Implications

PerfInsights demonstrates that LLMs can be successfully deployed in production for specialized code analysis tasks when surrounded by appropriate validation infrastructure, domain-specific engineering, and workflow integration. The system addresses a genuine business problem (unsustainable compute costs) with measurable impact (reduced detection time, improved codebase health, hundreds of merged optimizations).

However, achieving this required substantial engineering investment: curated antipattern catalogs, extensive prompt engineering, custom validation frameworks, ensemble model deployment, observability infrastructure, and integration with existing developer tools. The case study is most valuable for demonstrating that production-grade LLMOps is achievable but requires treating LLMs as components within larger systems rather than standalone solutions.

Organizations considering similar initiatives should focus on the validation architecture and integration patterns as much as the LLM capabilities themselves. The reduction of false positives from 80% to low teens came primarily from validation engineering rather than better models. The adoption success came from workflow integration and demonstrable wins rather than technical sophistication alone. These insights represent the practical reality of production LLMOps beyond the capabilities of foundation models themselves.