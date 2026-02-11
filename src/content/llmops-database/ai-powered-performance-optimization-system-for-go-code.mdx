---
title: "AI-Powered Performance Optimization System for Go Code"
slug: "ai-powered-performance-optimization-system-for-go-code"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6880a1e164084f274258a3e6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:16:45.370Z"
  createdOn: "2025-07-23T08:48:33.042Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "data-analysis"
  - "prompt-engineering"
  - "few-shot"
  - "cost-optimization"
  - "multi-agent-systems"
  - "evals"
  - "error-handling"
  - "cicd"
  - "monitoring"
  - "devops"
  - "continuous-integration"
  - "continuous-deployment"
  - "open-source"
industryTags: "tech"
company: "Uber"
summary: "Uber developed PerfInsights, a production system that combines runtime profiling data with generative AI to automatically detect performance antipatterns in Go services and recommend optimizations. The system addresses the challenge of expensive manual performance tuning by using LLMs to analyze the most CPU-intensive functions identified through profiling, applying sophisticated prompt engineering and validation techniques including LLM juries and rule-based checkers to reduce false positives from over 80% to the low teens. This has resulted in hundreds of merged optimization diffs, significant engineering time savings (93% reduction from 14.5 hours to 1 hour per issue), and measurable compute cost reductions across Uber's Go services."
link: "https://www.uber.com/en-NL/blog/perfinsights/"
year: 2025
seo:
  title: "Uber: AI-Powered Performance Optimization System for Go Code - ZenML LLMOps Database"
  description: "Uber developed PerfInsights, a production system that combines runtime profiling data with generative AI to automatically detect performance antipatterns in Go services and recommend optimizations. The system addresses the challenge of expensive manual performance tuning by using LLMs to analyze the most CPU-intensive functions identified through profiling, applying sophisticated prompt engineering and validation techniques including LLM juries and rule-based checkers to reduce false positives from over 80% to the low teens. This has resulted in hundreds of merged optimization diffs, significant engineering time savings (93% reduction from 14.5 hours to 1 hour per issue), and measurable compute cost reductions across Uber's Go services."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-performance-optimization-system-for-go-code"
  ogTitle: "Uber: AI-Powered Performance Optimization System for Go Code - ZenML LLMOps Database"
  ogDescription: "Uber developed PerfInsights, a production system that combines runtime profiling data with generative AI to automatically detect performance antipatterns in Go services and recommend optimizations. The system addresses the challenge of expensive manual performance tuning by using LLMs to analyze the most CPU-intensive functions identified through profiling, applying sophisticated prompt engineering and validation techniques including LLM juries and rule-based checkers to reduce false positives from over 80% to the low teens. This has resulted in hundreds of merged optimization diffs, significant engineering time savings (93% reduction from 14.5 hours to 1 hour per issue), and measurable compute cost reductions across Uber's Go services."
---

## Overview

PerfInsights represents a sophisticated production deployment of large language models for automated code optimization at Uber. Originally conceived during Uber's Hackdayz 2024 event, the system evolved into a production-ready platform that addresses the substantial challenge of performance optimization in Go services. The business case was compelling - Uber's top 10 Go services alone accounted for multi-million dollar compute costs in March 2024, making systematic performance optimization a critical operational necessity.

The system demonstrates several key LLMOps principles including strategic integration of LLMs with traditional profiling tools, sophisticated prompt engineering techniques, ensemble validation methods, and continuous monitoring for model performance. What distinguishes this case study is its focus on production reliability and developer trust rather than just technical novelty.

## Technical Architecture and LLM Integration

PerfInsights employs a two-stage pipeline that strategically combines traditional systems monitoring with AI-powered analysis. The first stage leverages Uber's existing fleet-wide profiler to collect CPU and memory profiles during peak traffic periods. This profiling data undergoes intelligent filtering to identify the top 30 most expensive functions based on flat CPU usage, with additional memory analysis triggered when runtime.mallocgc exceeds 15% of CPU time.

The LLM integration occurs in the second stage, where the system passes full source code of identified hotpath functions along with a curated catalog of performance antipatterns to large language models for analysis. This approach is noteworthy because it constrains the LLM's analysis scope to functions that profiling data has already identified as performance-critical, rather than attempting to analyze entire codebases blindly.

The antipattern catalog itself represents domain expertise encoded for LLM consumption, informed by Uber's Go Foundations team's historical optimization work and aligned with Uber's Go style guide. This demonstrates a key LLMOps practice of encoding institutional knowledge into AI systems rather than relying solely on pre-trained model knowledge.

## Prompt Engineering and Model Optimization

The case study provides detailed insights into production prompt engineering challenges and solutions. Initial single-shot LLM approaches produced inconsistent results with high variability between runs, significant hallucinations, and non-executable code suggestions. The team systematically addressed these issues through several prompt engineering strategies.

Few-shot prompting emerged as a critical technique for improving model accuracy. The team discovered that including illustrative examples in prompts enabled better generalization to unfamiliar cases. They provide a specific example where incorrect detection of case-insensitive string comparisons was resolved by adding few-shot examples that demonstrated the correct pattern recognition.

Role specification proved important for output quality, with the team finding that explicitly defining the model as a "Go expert" and specifying the expert-level audience improved response relevance and accuracy. The team also implemented output quality controls by instructing models to test their suggestions for runnability and reliability.

The prompt design philosophy emphasized several production-oriented principles: using specific, positive instructions rather than negative commands, employing one prompt per antipattern to preserve context, separating detection and validation prompts, and implementing explicit incentive structures for correct responses. Confidence scoring was integrated to encourage more thoughtful model responses.

## Validation and Quality Assurance

PerfInsights implements a sophisticated multi-layer validation system that addresses the critical LLMOps challenge of ensuring AI system reliability in production environments. The validation pipeline combines two complementary approaches: LLM juries and LLMCheck, a custom rule-based validation framework.

The LLM jury system employs multiple language models to independently assess each detected antipattern and validate suggested optimizations. This ensemble approach specifically targets common LLM hallucinations such as incorrectly detecting loop invariants or misinterpreting control structures. The ensemble method represents a practical application of consensus-based validation in production LLM systems.

LLMCheck provides a second validation layer through domain-specific rule-based validators. This hybrid approach acknowledges that while LLMs excel at pattern recognition, they can still produce specific types of errors that rule-based systems can catch more reliably. Examples include confusing data structure types, incorrectly identifying loop invariants outside of loops, or misclassifying loop variables as invariants.

The validation framework includes standardized metrics tracking that enables continuous monitoring of detection accuracy and model performance over time. This monitoring capability proved crucial for identifying and responding to model drift, with the team reporting dramatic improvements in precision - reducing false positives from over 80% to the low teens through iterative validation improvements.

## Production Integration and Operational Considerations

The system demonstrates sophisticated production integration patterns, connecting with Uber's existing development infrastructure including continuous integration pipelines and automated optimization tools. Validated suggestions flow directly into Optix, Uber's continuous code optimization tool, enabling automated application of performance improvements.

The integration approach illustrates key LLMOps principles around system composition rather than replacement. Rather than attempting to replace existing profiling and optimization infrastructure, PerfInsights augments these systems with AI-powered analysis capabilities. The static filtering stage, which excludes open-source dependencies and runtime functions, demonstrates how domain knowledge can be used to optimize LLM input and reduce noise.

Dashboard integration provides engineering teams with visibility into detection accuracy, error patterns, and antipattern frequency. This transparency layer proved essential for building developer trust in AI-assisted tooling and enabling rapid iteration based on user feedback.

## Quantified Results and Business Impact

The case study provides substantial quantitative evidence of the system's production effectiveness. Over four months of operation, the system reduced antipattern detection from 265 to 176 instances, representing a 33.5% improvement in codebase health. The team projects this improvement translates to approximately 267 fewer antipatterns annually.

Engineering efficiency gains were particularly significant, with the system reducing time required to detect and fix performance issues from 14.5 hours to approximately 1 hour - a 93% time reduction. Historical manual optimization efforts required substantial expert time, with examples including 320 hours for 5 critical antipatterns and 160 hours for 11 unique antipatterns.

The system has generated hundreds of merged optimization diffs, indicating successful production adoption and measurable code improvements. The business case appears validated through both compute cost reductions and engineering productivity gains, though specific dollar figures are not disclosed beyond the initial multi-million dollar baseline.

## Lessons Learned and LLMOps Best Practices

The case study articulates several key insights relevant to production LLM deployment. Prompt engineering and model selection emerge as critical factors, with the team emphasizing the importance of high input token limits to avoid function truncation and the dramatic impact of small prompt modifications on accuracy.

The "unsung hero" role of static filtering represents an important LLMOps insight - aggressive pre-processing to constrain AI system scope can be more valuable than attempting to handle broader problem spaces. By focusing LLM analysis on profiling-identified performance hotspots, the system achieves better results with less computational overhead.

Validation pipeline development proved essential for moving beyond prototype to production deployment. The combination of quantitative accuracy tracking and qualitative feedback mechanisms enabled continuous system improvement and developer confidence building.

The importance of demonstrating clear wins early in deployment cycles emerges as a key adoption factor. The team notes that landing initial significant performance improvements was crucial for unlocking broader adoption and feedback loops.

## Critical Assessment

While the case study presents impressive results, several areas warrant balanced consideration. The system's effectiveness appears heavily dependent on the quality of the curated antipattern catalog, which represents encoded domain expertise that may not generalize across different organizations or programming languages without significant adaptation.

The validation overhead, while necessary for production reliability, introduces complexity and computational costs that may limit scalability. The dual validation system (LLM juries plus rule-based checking) represents a significant engineering investment that smaller organizations might find challenging to replicate.

The success metrics focus heavily on engineering efficiency and code health improvements, with limited discussion of actual runtime performance gains or compute cost reductions achieved through the implemented optimizations. While the system identifies optimization opportunities efficiently, the ultimate business value depends on the actual performance impact of applied changes.

The case study also reflects Uber's specific infrastructure and scale, with fleet-wide profiling capabilities and dedicated optimization teams that may not be representative of typical organizational contexts. The transferability of the approach to smaller engineering organizations or different technology stacks remains an open question.

Overall, PerfInsights represents a sophisticated and apparently successful application of LLMOps principles to a well-defined production problem, with particularly strong examples of validation strategy, prompt engineering, and system integration approaches that could inform similar AI system deployments in other domains.