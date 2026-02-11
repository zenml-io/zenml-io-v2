---
title: "PerfInsights: AI-Powered Performance Optimization for Go Services"
slug: "perfinsights-ai-powered-performance-optimization-for-go-services"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad732bf2b322a9db8ca1e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:19.987Z"
  createdOn: "2025-12-23T17:53:54.047Z"
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "prompt-engineering"
  - "few-shot"
  - "multi-agent-systems"
  - "error-handling"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "monitoring"
  - "open-source"
  - "devops"
industryTags: "tech"
company: "Uber"
summary: "Uber developed PerfInsights to address the unsustainable compute costs of their Go services, where the top 10 services alone accounted for multi-million dollars in monthly compute spend. The solution combines runtime profiling with GenAI-powered static analysis to automatically detect performance antipatterns in Go code, validate findings through LLM juries and rule-based checking (LLMCheck), and generate optimization recommendations. Results include a 93% reduction in time required to detect and fix performance issues (from 14.5 hours to 1 hour), over 80% reduction in false positives, hundreds of merged optimization diffs, and a 33.5% reduction in detected antipatterns over four months, translating to approximately 3,800 hours of engineering time saved annually."
link: "https://www.uber.com/en-IN/blog/perfinsights/"
year: 2025
seo:
  title: "Uber: PerfInsights: AI-Powered Performance Optimization for Go Services - ZenML LLMOps Database"
  description: "Uber developed PerfInsights to address the unsustainable compute costs of their Go services, where the top 10 services alone accounted for multi-million dollars in monthly compute spend. The solution combines runtime profiling with GenAI-powered static analysis to automatically detect performance antipatterns in Go code, validate findings through LLM juries and rule-based checking (LLMCheck), and generate optimization recommendations. Results include a 93% reduction in time required to detect and fix performance issues (from 14.5 hours to 1 hour), over 80% reduction in false positives, hundreds of merged optimization diffs, and a 33.5% reduction in detected antipatterns over four months, translating to approximately 3,800 hours of engineering time saved annually."
  canonical: "https://www.zenml.io/llmops-database/perfinsights-ai-powered-performance-optimization-for-go-services"
  ogTitle: "Uber: PerfInsights: AI-Powered Performance Optimization for Go Services - ZenML LLMOps Database"
  ogDescription: "Uber developed PerfInsights to address the unsustainable compute costs of their Go services, where the top 10 services alone accounted for multi-million dollars in monthly compute spend. The solution combines runtime profiling with GenAI-powered static analysis to automatically detect performance antipatterns in Go code, validate findings through LLM juries and rule-based checking (LLMCheck), and generate optimization recommendations. Results include a 93% reduction in time required to detect and fix performance issues (from 14.5 hours to 1 hour), over 80% reduction in false positives, hundreds of merged optimization diffs, and a 33.5% reduction in detected antipatterns over four months, translating to approximately 3,800 hours of engineering time saved annually."
---

## Overview

PerfInsights represents a sophisticated production deployment of LLM technology at Uber, addressing the critical business problem of escalating compute costs in their Go service infrastructure. The system emerged from an internal hackathon (Uber Hackdayz 2024) and evolved into a production-ready tool that fundamentally transforms performance optimization from a specialist-driven, weeks-long endeavor into an automated, hours-long process accessible to general engineering teams.

The business context is significant: in March 2024 alone, Uber's top 10 Go services consumed multi-million dollars in compute resources, creating an unsustainable cost trajectory. Traditional performance optimization required deep expertise in compilers, runtimes, and profiling techniques, making it prohibitively expensive and non-scalable across Uber's engineering organization. PerfInsights addresses this by democratizing performance optimization through intelligent automation.

## Technical Architecture and Pipeline

PerfInsights operates through a two-stage pipeline that cleverly combines traditional profiling techniques with modern LLM capabilities. The architecture demonstrates a sophisticated understanding of how to constrain and guide LLM behavior for production reliability.

**Stage 1: Profiling-Based Function Filtering**

The system begins with runtime observability data rather than jumping directly to LLM analysis. PerfInsights leverages Uber's fleet-wide profiler, which collects CPU and memory profiles daily during peak traffic periods across production services. This grounding in actual production behavior is critical—it ensures that optimization efforts target real-world performance bottlenecks rather than theoretical issues.

The filtering logic identifies the top 30 most expensive functions based on flat CPU usage, operating on the empirical observation that these functions account for the majority of CPU consumption. Additionally, the system monitors the _runtime.mallocgc_ function (Go's memory allocation routine); if this accounts for more than 15% of CPU time, it triggers memory profile analysis to uncover allocation inefficiencies.

Static filtering then removes open-source dependencies and internal runtime functions from consideration. This pre-processing step is crucial for the LLM stage—it dramatically reduces noise and constrains the search space to service-owned code where teams have agency to make changes. This filtering represents a key LLMOps principle: don't ask the LLM to do work that deterministic systems can handle more reliably.

**Stage 2: GenAI-Driven Antipattern Detection**

The core detection engine relies on a curated catalog of performance antipatterns derived from Uber's Go Foundations team's historical optimization work and the company's Go style guide. This catalog reflects institutional knowledge about common inefficiencies: unbounded memory allocations, redundant loop computations, inefficient string operations, and similar issues.

The system passes full source code of identified hotpath functions along with the antipattern catalog to an LLM for analysis. The choice to pass "full source codes" is significant—early iterations revealed that high input token limits were critical for analyzing large Go functions without truncation. This contextual completeness enables the LLM to understand control flow, data dependencies, and structural patterns that might be missed with fragmented code snippets.

## Prompt Engineering Strategy

The case study provides valuable insights into the prompt engineering practices that made PerfInsights production-ready. Initial single-shot LLM detection produced inconsistent results with high hallucination rates and non-runnable code suggestions. The team implemented several targeted strategies:

**Few-Shot Prompting**: Including illustrative examples in prompts improved the model's ability to generalize correctly. The case study provides a concrete example where the system incorrectly detected case-insensitive string comparison antipatterns when none existed. Adding few-shot examples showing both positive and negative cases resolved the false positive issue.

**Role and Audience Specification**: Explicitly positioning the model as a "Go expert" addressing expert-level users helped focus responses on advanced, relevant details appropriate to the domain.

**Output Quality Requirements**: Prompts explicitly instruct the model to test its results for reliability and ensure suggested fixes produce runnable code. This self-verification step improves output quality before external validation.

**Prompt Construction Tactics**: The team identified several specific practices that improved reliability:
- Using specific, positive instructions rather than negative phrasing (avoiding "don't")
- One prompt per antipattern to conserve context and simplify the task
- Separate prompts for detection versus validation phases
- Incentivizing correct answers and penalizing incorrect ones within the prompt structure

**Confidence Scoring**: Requesting confidence levels for each response encourages the model to engage in more thoughtful reasoning about its conclusions.

These prompt engineering practices demonstrate mature LLMOps thinking: systematic iteration, measurement of specific failure modes, and targeted interventions rather than generic prompt improvements.

## Validation Pipeline: LLM Juries and LLMCheck

PerfInsights distinguishes itself through a robust two-layer validation system that addresses the fundamental challenge of LLM reliability in production contexts.

**LLM Juries**

Rather than trusting a single model's output, PerfInsights employs an ensemble of LLMs that independently assess whether an antipattern exists and whether the suggested optimization is valid. This jury-based approach mitigates common hallucinations such as incorrectly detecting loop invariants or misinterpreting control structures. The ensemble method represents a pragmatic acknowledgment that while individual LLMs are fallible, consensus across multiple models provides stronger signal.

**LLMCheck: Rule-Based Validation**

Even with LLM juries, certain systematic errors persist. The team developed LLMCheck, a framework of domain-specific, rule-based validators that catch specific failure modes:
- Detecting antipatterns that don't actually exist in the code
- Confusing maps with slices and vice versa
- Identifying loop invariants that are actually declared outside the loop
- Misidentifying loop control variables as loop invariants

LLMCheck provides several critical benefits in the LLMOps context:
- **Domain-Specificity**: Evaluates highly specific, conditional projects rather than generic quality metrics
- **Extensibility**: Validators can be added for new antipatterns or failure modes as they emerge
- **Observability**: Tracks standardized metrics on detection accuracy, failure rates, and potential model drift

This dual-validation strategy (ensemble LLMs plus rule-based checking) reduced false positives from over 80% to the low teens—a dramatic improvement that enabled production deployment. The approach demonstrates sophisticated thinking about validation hierarchies: use LLMs for pattern recognition where they excel, but apply deterministic validation where specific rules can be codified.

## Production Integration and Downstream Tooling

PerfInsights integrates into Uber's existing engineering infrastructure through several touchpoints. Validated suggestions flow directly into Optix, Uber's continuous code optimization tool, creating an automated workflow from detection to implementation. This integration has produced hundreds of merged diffs in Uber's Go monorepo, demonstrating that the system generates actionable, trustworthy recommendations that pass code review.

The system provides dashboards powered by LLMCheck data, giving teams visibility into detection accuracy, error patterns, and antipattern frequency. This observability infrastructure is crucial for production LLM systems—it enables teams to monitor model performance over time, detect drift, and respond to emerging failure modes.

Integration into CI/CD pipelines transforms performance optimization from a reactive, crisis-driven activity into a continuous, proactive discipline. Optimization opportunities surface regularly in the development workflow rather than only when services experience performance degradation.

## Measured Impact and Results

The case study provides specific quantitative outcomes that illustrate PerfInsights' business value:

**Code Health Improvement**: Static analysis validated through LLMCheck showed measurable improvement over four months. In February, the system averaged 265 validated antipattern detections, with a single-day peak of 500. By June, this dropped to 176—a 33.5% reduction indicating a cleaner codebase with fewer performance antipatterns being introduced.

**Engineering Time Savings**: The impact on engineering productivity is substantial. Historical manual optimization efforts included:
- 5 critical antipatterns requiring two engineers (including a Principal Engineer) for a full month (~320 hours)
- 11 antipatterns consuming a four-person Go expert team for a week (~160 hours)
- Six months of full-time work by a dedicated Go expert (~960 hours)

These examples alone represent over 1,400 hours for a handful of cases. Projecting the observed reduction of 89 antipatterns over four months annually yields approximately 267 antipatterns addressed. Handling this volume manually would consume approximately 3,800 hours. PerfInsights reduced the per-issue time from 14.5 hours to approximately 1 hour of tool runtime—a 93.10% time savings.

**False Positive Reduction**: Hallucination rates dropped by more than 80% through the combination of prompt engineering, LLM juries, and LLMCheck validation. This improvement was essential for building developer trust and achieving production adoption.

**Cost Impact**: While specific dollar figures aren't provided for compute savings, the case study references "5 digits saving diff" as a breakthrough moment that demonstrated tangible business value and accelerated adoption.

## Critical Assessment and LLMOps Lessons

While the case study presents impressive results, balanced assessment suggests several considerations:

**Claims Requiring Context**: The text originates from Uber's engineering blog and naturally emphasizes successes. The "multi-million dollars in compute spend" for the top 10 services provides scale context but doesn't specify how much PerfInsights has actually reduced costs. The 93% time savings calculation assumes manual effort would scale linearly with antipattern count, which may not reflect reality—some antipatterns are significantly more complex than others.

**Validation Strategy Strengths**: The dual-layer validation approach (LLM juries + LLMCheck) represents genuine innovation in production LLM deployment. The willingness to acknowledge initial failure modes (>80% false positives) and systematically address them demonstrates mature engineering practice. The emphasis on rule-based validation for known failure patterns shows appropriate skepticism about LLM reliability.

**Prompt Engineering Insights**: The specific prompt engineering tactics shared (few-shot examples, role specification, positive instructions, confidence scoring) provide valuable practical guidance. The acknowledgment that "high input token limits were critical" points to infrastructure requirements that may not be obvious when designing LLM systems.

**Static Filtering as Foundation**: The decision to use traditional profiling and static analysis to constrain the problem space before invoking LLMs is architecturally sound. This prevents the LLM from wasting capacity on noise and focuses it on high-value analysis. The principle generalizes: production LLM systems should use deterministic preprocessing to create focused contexts.

**Model Selection Not Detailed**: The case study doesn't specify which LLM(s) power PerfInsights or why those were selected. For practitioners evaluating similar systems, understanding model choice, hosting approach (cloud API vs. self-hosted), latency characteristics, and cost per analysis would be valuable.

**Language-Agnostic Claims**: The text mentions "PerfInsights' power lies in its language-agnostic design, allowing it to read, understand, and optimize functions across various programming languages." However, the entire case study focuses exclusively on Go, and the antipattern catalog is explicitly Go-specific. This claim appears aspirational rather than demonstrated, which is appropriate for a blog post but should be noted.

**Continuous Monitoring**: The LLMCheck dashboards tracking detection accuracy and model regression represent essential infrastructure for production LLM systems. The ability to quantify improvement and respond to feedback with evidence enabled the transition from prototype to trusted production tool.

## Broader LLMOps Implications

PerfInsights exemplifies several important patterns for production LLM deployment:

**Hybrid Intelligence**: The system succeeds by combining LLM capabilities (pattern recognition, code understanding) with traditional techniques (profiling, static analysis, rule-based validation). Neither approach alone would achieve the same results.

**Validation Hierarchies**: Using multiple validation layers (ensemble models + domain-specific rules) addresses LLM unreliability systematically. This pattern applies broadly to high-stakes LLM applications.

**Observability First**: Building dashboards and metrics into the system from the beginning enabled data-driven iteration and earned developer trust. Production LLM systems require instrumentation that tracks not just throughput but accuracy, failure modes, and drift.

**Developer Experience Focus**: The emphasis on building trust through early wins, clear communication of confidence levels, and integration with existing workflows (Optix, CI/CD) reflects understanding that technical capability alone doesn't drive adoption.

**Institutional Knowledge Encoding**: The curated antipattern catalog based on the Go Foundations team's experience represents a successful approach to encoding expert knowledge in a form that LLMs can leverage. This pattern—capturing institutional expertise as structured inputs to LLMs rather than expecting LLMs to generate novel expertise—appears more reliable for production systems.

PerfInsights demonstrates that GenAI can deliver significant production value when deployed with appropriate constraints, validation, and integration into existing engineering workflows. The system's success stems not from LLM capabilities alone but from thoughtful system design that positions LLMs within a broader architecture of profiling, filtering, validation, and automation.