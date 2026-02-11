---
title: "Large-Scale Test Framework Migration Using LLMs"
slug: "large-scale-test-framework-migration-using-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67d7f9183f2eb21fb9b6763a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:03:46.779Z"
  createdOn: "2025-03-17T10:27:36.759Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "token-optimization"
  - "cicd"
  - "continuous-integration"
  - "documentation"
  - "openai"
industryTags: "tech"
company: "AirBnB"
summary: "AirBnB successfully migrated 3,500 React component test files from Enzyme to React Testing Library (RTL) using LLMs, reducing what was estimated to be an 18-month manual engineering effort to just 6 weeks. Through a combination of systematic automation, retry loops, and context-rich prompts, they achieved a 97% automated migration success rate, with the remaining 3% completed manually using the LLM-generated code as a baseline."
link: "https://medium.com/airbnb-engineering/accelerating-large-scale-test-migration-with-llms-9565c208023b"
year: 2024
seo:
  title: "AirBnB: Large-Scale Test Framework Migration Using LLMs - ZenML LLMOps Database"
  description: "AirBnB successfully migrated 3,500 React component test files from Enzyme to React Testing Library (RTL) using LLMs, reducing what was estimated to be an 18-month manual engineering effort to just 6 weeks. Through a combination of systematic automation, retry loops, and context-rich prompts, they achieved a 97% automated migration success rate, with the remaining 3% completed manually using the LLM-generated code as a baseline."
  canonical: "https://www.zenml.io/llmops-database/large-scale-test-framework-migration-using-llms"
  ogTitle: "AirBnB: Large-Scale Test Framework Migration Using LLMs - ZenML LLMOps Database"
  ogDescription: "AirBnB successfully migrated 3,500 React component test files from Enzyme to React Testing Library (RTL) using LLMs, reducing what was estimated to be an 18-month manual engineering effort to just 6 weeks. Through a combination of systematic automation, retry loops, and context-rich prompts, they achieved a 97% automated migration success rate, with the remaining 3% completed manually using the LLM-generated code as a baseline."
---

## Overview

AirBnB completed one of their first large-scale, LLM-driven code migrations in 2024, successfully converting nearly 3,500 React component test files from the Enzyme testing framework to React Testing Library (RTL). This case study provides valuable insights into how LLMs can be operationalized for automated code transformation tasks at enterprise scale, demonstrating both the potential and the practical engineering challenges of deploying LLMs for production workloads.

The migration was necessitated by the evolution of React testing practices. AirBnB had adopted Enzyme in 2015, but by 2020, the framework's deep access to component internals no longer aligned with modern React testing approaches. While the company had adopted RTL for new test development, a substantial legacy codebase remained that couldn't simply be deleted without creating significant gaps in code coverage. The fundamental differences between the two frameworks meant that a simple find-and-replace approach was infeasible—the migration required understanding test intent and rewriting tests while preserving their semantic meaning and coverage.

## Technical Architecture

The LLM-powered migration system was architected as a production pipeline with several key components that demonstrate mature LLMOps practices:

### State Machine Pipeline Design

The team modeled the migration as a state machine, breaking down the process into discrete, per-file steps that could be parallelized and tracked independently. Each file moved through stages of validation, and when a check failed, the LLM was invoked to fix it. The main steps included:

- Enzyme to RTL refactor
- Jest test validation and fixes
- Lint and TypeScript compilation fixes
- Final completion marking

This step-based approach provided significant operational benefits. It enabled progress tracking across the entire migration, allowed the team to identify and improve failure rates for specific steps, and made it simple to rerun individual files or steps when needed. Critically, the modular design allowed hundreds of files to be processed concurrently, which proved essential for both quickly migrating simple files and iteratively addressing the long tail of complex cases.

### Retry Loops with Dynamic Prompting

Rather than relying solely on sophisticated prompt engineering, the team discovered that brute force retries with dynamic prompting proved highly effective. Each step was configured to run up to a configurable number of attempts, with the LLM receiving updated context on each retry including the validation errors and the most recent version of the file.

This approach reflects a pragmatic LLMOps insight: for many tasks, simple retry mechanisms with error feedback can outperform more complex prompt engineering strategies. The team found that many simple-to-medium complexity test files could be successfully migrated within 10 attempts, with some completing after just a few retries.

### Rich Context Injection

For more complex files with intricate test state setups or excessive indirection, the team found that maximizing relevant context in prompts was the key differentiator. By the end of the migration, prompts had expanded to between 40,000 and 100,000 tokens, incorporating multiple sources of context:

- The source code of the component under test
- The test file being migrated
- Validation failures from the current step
- Related tests from the same directory (to maintain team-specific patterns)
- General migration guidelines and common solutions
- Manually written few-shot examples
- Examples of existing, well-written, passing test files from the same project

The team pulled in as many as 50 related files per prompt. Importantly, they noted that the success driver was less about perfecting the prompt structure and more about selecting the *right* related files—finding nearby files, good examples from the same project, and filtering dependencies for files relevant to the component being tested.

## Systematic Long-Tail Improvement

After the initial bulk run achieved 75% success, the team faced nearly 900 files that failed validation. To tackle this systematically, they built two key features into their migration tooling:

### Migration Status Tracking

Files were stamped with automatically-generated comments recording the status of each migration step, including metrics like the number of tests passed, failed, and skipped. This provided visibility into common issues the scripts were facing and helped identify patterns in failures.

### Targeted Re-execution

The tooling supported re-running single files or path patterns filtered by the specific step where they were stuck. This enabled rapid iteration on prompt and script improvements.

### Sample, Tune, Sweep Methodology

The team developed a systematic "sample, tune, sweep" feedback loop for improving their automation:

- Run all remaining failing files to identify common issues
- Select a sample of 5-10 files exemplifying a common issue
- Update prompts and scripts to address that issue
- Re-run against the sample to validate the fix
- Repeat by running against all remaining files

This breadth-first approach allowed the team to aggressively chip away at remaining files without getting stuck on the most difficult cases. After 4 days of running this loop, they pushed completion from 75% to 97%, with just under 100 files remaining. Many of these long-tail files had been retried 50-100 times by this point, suggesting a practical ceiling for what automation could achieve.

## Results and Evaluation

The migration achieved impressive results:

- 75% of target files successfully migrated in the initial 4-hour bulk run
- 97% completion after 4 days of systematic prompt tuning
- The remaining 3% completed through manual intervention, using the LLM-generated baselines as starting points
- Total time: 6 weeks versus the original estimate of 1.5 years of manual engineering work

The team reports that the total cost—including LLM API usage and engineering time—proved far more efficient than the original manual migration estimate. While specific API costs weren't disclosed, one reader comment noted interest in understanding the LLM cost breakdown.

## Critical Considerations

Several aspects of this case study warrant balanced consideration:

**Validation Approach**: The primary validation criteria appear to be automated checks (Jest tests passing, lint checks, TypeScript compilation). One reader comment raised an important question about whether test success was the only criterion and how the team validated that test intent remained the same. This is a valid concern for any automated code transformation—passing tests don't necessarily guarantee semantic equivalence.

**Applicability**: This migration was particularly well-suited for LLM automation because it involved a well-defined source and target format, with clear validation criteria (tests passing). Not all code migrations may be as amenable to this approach.

**Human Oversight**: The team retained human oversight throughout, with manual intervention required for the final 3% of files. This hybrid approach—automation for the bulk of work with human finishing—represents a pragmatic model for LLM-assisted code transformation.

## Key LLMOps Insights

This case study offers several transferable insights for LLMOps practitioners:

- **State machine architectures** work well for complex, multi-step LLM workflows, enabling parallelization, progress tracking, and targeted reruns
- **Retry loops with dynamic prompting** can be surprisingly effective and may outperform more sophisticated prompt engineering for certain tasks
- **Context selection** may matter more than prompt structure—choosing the right related files proved more impactful than prompt phrasing
- **Systematic iteration** with breadth-first approaches helps avoid getting stuck on edge cases while steadily improving overall success rates
- **Hybrid human-AI workflows** remain practical—knowing when to switch from automation to manual intervention is valuable

The migration represents a notable production use of LLMs for internal developer tooling, demonstrating how LLMs can accelerate large-scale technical debt reduction when paired with robust automation infrastructure.