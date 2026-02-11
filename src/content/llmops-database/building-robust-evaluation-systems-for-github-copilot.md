---
title: "Building Robust Evaluation Systems for GitHub Copilot"
slug: "building-robust-evaluation-systems-for-github-copilot"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68272637d4aaf646088c023f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:09:04.853Z"
  createdOn: "2025-05-16T11:49:11.637Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "system-prompts"
  - "few-shot"
  - "fastapi"
  - "postgresql"
  - "monitoring"
  - "cicd"
  - "microsoft-azure"
  - "openai"
industryTags: "tech"
company: "Github"
summary: "This case study explores how Github developed and evolved their evaluation systems for Copilot, their AI code completion tool. Initially skeptical about the feasibility of code completion, the team built a comprehensive evaluation framework called \"harness lib\" that tested code completions against actual unit tests from open source repositories. As the product evolved to include chat capabilities, they developed new evaluation approaches including LLM-as-judge for subjective assessments, along with A/B testing and algorithmic evaluations for function calls. This systematic approach to evaluation helped transform Copilot from an experimental project to a robust production system."
link: "https://www.youtube.com/watch?v=LwLxlEwrtRA&t=747s"
year: 2023
seo:
  title: "Github: Building Robust Evaluation Systems for GitHub Copilot - ZenML LLMOps Database"
  description: "This case study explores how Github developed and evolved their evaluation systems for Copilot, their AI code completion tool. Initially skeptical about the feasibility of code completion, the team built a comprehensive evaluation framework called \"harness lib\" that tested code completions against actual unit tests from open source repositories. As the product evolved to include chat capabilities, they developed new evaluation approaches including LLM-as-judge for subjective assessments, along with A/B testing and algorithmic evaluations for function calls. This systematic approach to evaluation helped transform Copilot from an experimental project to a robust production system."
  canonical: "https://www.zenml.io/llmops-database/building-robust-evaluation-systems-for-github-copilot"
  ogTitle: "Github: Building Robust Evaluation Systems for GitHub Copilot - ZenML LLMOps Database"
  ogDescription: "This case study explores how Github developed and evolved their evaluation systems for Copilot, their AI code completion tool. Initially skeptical about the feasibility of code completion, the team built a comprehensive evaluation framework called \"harness lib\" that tested code completions against actual unit tests from open source repositories. As the product evolved to include chat capabilities, they developed new evaluation approaches including LLM-as-judge for subjective assessments, along with A/B testing and algorithmic evaluations for function calls. This systematic approach to evaluation helped transform Copilot from an experimental project to a robust production system."
---

## Overview

This case study comes from a discussion with two former GitHub Copilot engineers—John Bryman and Sean Simster—who share their experiences building evaluation systems for one of the first and most successful commercial AI coding assistants. The conversation provides a rare behind-the-scenes look at how GitHub developed, tested, and shipped LLM-powered features at scale, starting from the early days of Copilot's code completion feature through to the later chat functionality.

John Bryman joined GitHub in 2019, initially working on search before moving to data science and eventually the Copilot team where he worked on code completions and web chat. Sean Simster worked at GitHub for three years starting just after Copilot's beta launch, taking over offline evaluation work and prototyping the first version of Copilot Chat. Both left GitHub around mid-2024.

## The Evaluation Framework

The speakers describe a taxonomy of four distinct evaluation approaches they employed at GitHub Copilot:

### Verifiable Evaluations (Harness Lib)

The core of Copilot's offline evaluation system was called "harness lib," a verifiable code completion evaluation framework. This represented one of the most innovative aspects of their LLMOps approach—the idea that while you cannot simply look at generated code and know if it's correct, you can execute it and verify its correctness through existing test suites.

The process for creating test samples involved several steps. The team would gather a large set of open-source repositories, specifically focusing on Python and JavaScript due to the ability to easily run tests in these languages. They would run the existing tests and keep only the repositories where all tests passed. Using code coverage tools, they associated functions with their corresponding unit tests. Candidate functions had to meet specific criteria: at least one unit test, a certain percentage of lines covered, no more than a certain number of lines (to avoid tasks that were too difficult for early Copilot), and a docstring.

When running evaluations, they would "melon baller" scoop out the implementation of a function while preserving the function name, signature, docstring, and surrounding context. Copilot would then attempt to regenerate the function body, and the team would run the unit tests to verify correctness. By doing this across many functions and repositories, they could measure directional improvement as models and prompts evolved.

An important consideration was ensuring that test repositories were not included in the model's training data. In the early days, GitHub had close collaboration with OpenAI and could obtain lists of what went into training, allowing them to select repositories created after the training data cutoff. The team noted that this constraint meant newer, often smaller repositories were used, which didn't always perfectly represent production traffic patterns—a limitation they acknowledged but never fully resolved.

The modular nature of harness lib was emphasized. Evaluations were often developed in notebooks for experimentation and exploration before being converted to Python scripts for more formal regression testing. Some eventually moved into Azure pipelines for automated execution. This flexibility allowed for two distinct personas on the team: those focused on shipping decisions who needed reliable, repeatable metrics, and those doing experimental work exploring new model capabilities or prompt strategies.

### A/B Testing (Ship Room)

When changes were ready to go live, the team relied on A/B testing with production traffic. They would start with a small percentage (around 10%) of traffic and gradually ramp up while monitoring key metrics.

The primary metrics were remarkably focused:
- **Completion acceptance rate**: How often users accepted the suggested ghost text
- **Characters retained**: Accounting for users who would mindlessly accept completions and then edit them afterward
- **Latency**: If suggestions arrived too late, they were effectively useless

Beyond these key metrics, they tracked "high tens, maybe even low hundreds" of guardrail metrics. These included variations like characters retained after a certain number of minutes. Guardrail metrics weren't hard pass/fail criteria but rather signals for diagnosing issues when key metrics behaved unexpectedly.

The team described interesting trade-offs they discovered. Optimizing for acceptance rate alone could lead to many tiny completions that degraded the user experience. Sometimes maximizing one metric would tank another, requiring careful investigation. When such anomalies occurred, the team's data scientists would dig into logs to understand root causes, sometimes delaying launches by a week while they investigated.

One counterintuitive finding was that users often didn't want Copilot to write too much code at once. Users would reluctantly accept long completions, delete half, and get a better completion for the remaining portion. This led to experiments with shorter completions and letting users "tab their way through" solutions incrementally, rather than attempting to one-shot complete implementations.

### LLM-as-Judge for Chat

When ChatGPT emerged and GitHub began developing Copilot Chat, the evaluation approach had to evolve significantly. Sean Simster, who prototyped the first version of Copilot Chat, described backing into LLM-as-judge out of necessity rather than initial design.

The realization was that while code completion could be evaluated by execution, conversational programming required evaluating the entire conversation experience. Users cared not just about the code output but whether the assistant seemed to be listening and providing productive feedback. Additionally, many chat interactions didn't produce code at all—users asking "explain how this code works" or "why use this API instead of that one" required different evaluation approaches.

The initial attempt was traditional human evaluation through side-by-side comparisons in Label Studio. Evaluators would compare baseline responses (like ChatGPT) against Copilot Chat responses and judge which was better. However, this was slow, expensive, and required detailed guidelines explaining what "better" meant.

To scale this, Sean tried having GPT-4 perform the judgments. Early attempts failed because models at the time weren't as good at following system instructions. The model might get distracted by irrelevant criteria, like commenting on brace placement style rather than the actual quality of generated unit tests.

The breakthrough came from making the judge prompt extremely specific and granular. Rather than asking "which response is better at writing unit tests," the prompt would include explicit criteria like "Does it have a test for passing in null values? Does it have a test for passing in an empty list?" This level of specificity made the LLM-as-judge reliable enough that evaluators could quickly verify the judgments.

The team acknowledged they would have liked more extensive validation of alignment between human judgment and the LLM judge, but the fast-moving nature of AI product development at the time meant shipping with "gut feelings" about what users would want, then iterating based on production telemetry.

An important conceptual insight emerged: the generative task (solving a user's coding problem from scratch) is much harder than the verification task (checking whether a solution meets a detailed list of requirements). This asymmetry is why LLM-as-judge can work even when the judge model has similar capabilities to the model being evaluated.

### Algorithmic Evaluation for Tool Use

As models gained function-calling capabilities, the team developed algorithmic evaluations for tool use. Given a context, user message, and available tools, they could verify whether the correct tool was called with the correct parameters.

At the time John left, GitHub Copilot's web interface had around 5-6 tools, roughly doubling since then. The team used confusion matrices to visualize which tools were being called correctly and which were being confused with each other. This approach helped identify when tools had too much overlap, requiring clearer differentiation so the orchestrator model could make better routing decisions.

## Data Infrastructure and Caching

The team stored evaluation data in SQL databases—function locations, file offsets, and other metadata about test candidates didn't need to be recomputed for each evaluation run. For online experiments, they leveraged Azure's existing tooling for AB experiment analysis and statistical soundness assessment.

For offline evaluations, there wasn't extensive dashboarding; results were typically simple lists of metrics that informed shipping decisions. The ship room process involved weekly meetings where teams would review experiment results and make launch decisions.

## Key Lessons and Reflections

The speakers offered several insights from their experience:

**When to start evaluating**: Both agreed that having evals is important for any product, but there's a point where pure "vibe checking" early prototypes is sufficient. The purpose of evaluation is to build products, not to have evaluations for their own sake. You shouldn't let the lack of an eval block you from building something innovative.

**Cross-language generalization**: Interestingly, even though harness lib only ran on Python and JavaScript, acceptance rates for other languages like Haskell or Visual Basic were roughly similar, suggesting the evaluation approach generalized reasonably well.

**Organizational structure**: Having engineers who were also users of the product (coding in the languages they were evaluating) made the evaluation process more efficient. The tight feedback loop between building features and evaluating them helped the team quickly diagnose issues.

**Evolution of guardrails**: Many guardrail metrics emerged from past incidents—things that broke in production, took a week to investigate, and revealed a metric that would have caught the problem earlier. This represents the organic accumulation of institutional knowledge about what can go wrong.

**Relationship with OpenAI**: The speakers noted that early collaboration with OpenAI was very close, with regular calls including senior leadership. Over time, as ChatGPT became a priority, the relationship became more arm's length, making it harder to get information like training data composition.

This case study demonstrates a mature, multi-layered approach to LLMOps that evolved alongside the product capabilities. The progression from execution-based verification for code completion to subjective LLM-as-judge for conversational AI reflects the broader industry's journey in evaluation methodology, and GitHub Copilot's early experimentation with these techniques helped establish patterns that are now widely adopted.