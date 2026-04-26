---
title: "coSTAR: Automated Testing and Refinement Framework for Production AI Agents"
slug: "costar-automated-testing-and-refinement-framework-for-production-ai-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "poc"
  - "agent-based"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "error-handling"
  - "multi-agent-systems"
  - "cicd"
  - "monitoring"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "documentation"
  - "open-source"
  - "databricks"
  - "openai"
industryTags: "tech"
company: "Databricks"
summary: "Databricks developed coSTAR (coupled Scenario, Trace, Assess, Refine), a comprehensive automated testing and refinement methodology for deploying AI agents at scale. The problem they faced was a slow, manual \"run, review, fix, repeat\" development loop that took two weeks to verify changes, was prone to regressions, and lacked confidence in agent quality. The solution leveraged MLflow to build a framework analogous to traditional software testing, using LLM-based agentic judges as the test suite and coding assistants to automatically refine agents until tests pass. This methodology reduced verification time from two weeks to hours, enabled higher development velocity, and now runs in production to catch issues on live traffic while also serving as CI/CD regression tests for infrastructure dependencies."
link: "https://www.databricks.com/blog/costar-how-we-ship-ai-agents-databricks-fast-without-breaking-things"
year: 2026
seo:
  title: "Databricks: coSTAR: Automated Testing and Refinement Framework for Production AI Agents - ZenML LLMOps Database"
  description: "Databricks developed coSTAR (coupled Scenario, Trace, Assess, Refine), a comprehensive automated testing and refinement methodology for deploying AI agents at scale. The problem they faced was a slow, manual \"run, review, fix, repeat\" development loop that took two weeks to verify changes, was prone to regressions, and lacked confidence in agent quality. The solution leveraged MLflow to build a framework analogous to traditional software testing, using LLM-based agentic judges as the test suite and coding assistants to automatically refine agents until tests pass. This methodology reduced verification time from two weeks to hours, enabled higher development velocity, and now runs in production to catch issues on live traffic while also serving as CI/CD regression tests for infrastructure dependencies."
  canonical: "https://www.zenml.io/llmops-database/costar-automated-testing-and-refinement-framework-for-production-ai-agents"
  ogTitle: "Databricks: coSTAR: Automated Testing and Refinement Framework for Production AI Agents - ZenML LLMOps Database"
  ogDescription: "Databricks developed coSTAR (coupled Scenario, Trace, Assess, Refine), a comprehensive automated testing and refinement methodology for deploying AI agents at scale. The problem they faced was a slow, manual \"run, review, fix, repeat\" development loop that took two weeks to verify changes, was prone to regressions, and lacked confidence in agent quality. The solution leveraged MLflow to build a framework analogous to traditional software testing, using LLM-based agentic judges as the test suite and coding assistants to automatically refine agents until tests pass. This methodology reduced verification time from two weeks to hours, enabled higher development velocity, and now runs in production to catch issues on live traffic while also serving as CI/CD regression tests for infrastructure dependencies."
notion:
  pageId: "34ef8dff-2538-81b8-a8c8-d72d866818e6"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:52:00.000Z"
  lastEditedTime: "2026-04-26T09:52:00.000Z"
  publishedAt: "2026-04-26T10:07:10Z"
---

## Overview

Databricks built and deployed multiple production AI agents across their platform, ranging from customer-facing features like Genie Code (covering data engineering, trace analysis, and machine learning capabilities) to open-source projects like the MLflow Assistant and internal engineering workflows for on-call support and automated code reviews. These agents perform complex, long-running tasks including generating thousands of lines of code and creating new data and AI assets. The challenge they faced was typical of many organizations moving AI agents from development to production: without comprehensive automated testing, they were essentially "coding without tests," leading to slow iteration cycles, regression-prone releases, and lack of confidence in quality.

The coSTAR methodology represents Databricks' systematic approach to solving this LLMOps challenge by drawing a direct analogy to traditional software development practices. The framework name stands for coupled **S**cenario, **T**race, **A**ssess, **R**efine, and it operates as two mirrored loops that work in tandem: one loop refines the agent implementation using trusted judges, while the other loop refines the judges themselves by aligning them with human expert judgment.

## The Core Problem: Non-Deterministic Testing Challenges

The early development process at Databricks mirrored what many teams experience: engineers would run an agent, manually review its output, spot flaws, instruct a coding assistant to fix issues, and repeat. This manual QA approach failed for several compounding reasons that make agent testing structurally different from testing deterministic functions.

First, non-determinism means the same agent implementation with identical inputs can produce different outputs across runs, making traditional assertion-based testing impossible. Tests must evaluate properties of outputs rather than exact matches. Second, slow feedback loops are endemic to agent testing—a single execution can take tens of minutes, eliminating the rapid iteration that sub-second test suites enable in traditional development. Third, cascading errors complicate diagnosis: a bad decision at step 3 might only surface as a failure at step 7, burying the root cause several steps back in the execution trace. Finally, subjective quality assessments are unavoidable—questions like "is this feature engineering code appropriate?" or "does this data cleaning approach make sense?" depend on domain expertise rather than objective ground truth.

These constraints fundamentally shaped the coSTAR design, as the team needed to build not just a test runner but an automated optimization methodology for stochastic, long-running, multi-step processes where "correct" is inherently a judgment call.

## The Architecture: Software Testing Analogy

The brilliance of coSTAR lies in mapping agent development directly onto familiar software development concepts. Traditional source code maps to agent implementation (prompts, foundation model choices, tools). The test suite becomes LLM judges. Test fixtures (setup, input, expected output) translate to scenario definitions. The test runner/harness becomes the trace capture system that executes agents and records their behavior. Test correctness verification maps to judge alignment with human experts. The coding assistant that fixes code until tests pass becomes the agent refinement loop. CI/CD running all tests on every change translates directly to CI/CD for agents, and production monitoring uses the same judges on live traffic.

This isn't merely a metaphor—it's the literal architecture of the system built on MLflow.

## Scenario Definitions: Test Fixtures for Agents

Scenario definitions serve as structured test fixtures that bundle initial state setup, user prompts, and expected outcomes in one place. Databricks maintains suites of scenarios covering common cases, edge cases, and known past failures across different agents. Each scenario is portable, allowing the same test to run against different agent implementations or versions.

The team showed an example scenario for testing a Data Analyst agent against messy datasets, structured to include setup conditions, the input prompt, and success criteria. The scenario suite grows organically over time as production failures get converted into regression tests, following the same best practice that every production bug should become a test case. The deliberate structure matters because agent runs are expensive (minutes per execution), requiring thoughtful selection of what to test while maintaining portability across implementations.

## Trace Capture: The Flight Recorder

To execute the test suite, Databricks uses a harness that sends each scenario's prompt to the agent under test (AUT) and captures execution as an MLflow trace—a structured log of every tool call, intermediate output, and artifact the agent produces. The trace functions as a flight recorder, preserving everything the agent did in sequence for post-execution inspection.

A critical architectural decision was decoupling execution from scoring. The test harness produces traces as a separate step from judge scoring. By persisting traces, the team can iterate on judges without re-running expensive scenarios. Adjusting a threshold means re-scoring recorded traces in seconds. Adding a new judge means running it against every trace ever collected. Suspecting a judge is wrong means comparing verdicts against recordings and debugging offline. One expensive agent run generates data reused many times, including candidates for the Golden Set used later for judge alignment.

## Agentic Judges: The Test Suite

Judges operate on traces to evaluate properties of execution: did the agent produce valid code? Did output meet quality thresholds? Did the agent follow the right process? This differs fundamentally from traditional unit tests because agent output is non-deterministic and rich, making exact output assertions useless.

Rather than using the standard "LLM-as-a-Judge" approach of feeding entire traces to models (expensive, fragile, and hard to debug—especially when traces can be thousands of lines long), Databricks developed **agentic judges**: judges that are themselves agents equipped with tools to explore traces selectively. Like well-written tests that call specific functions and check specific return values, agentic judges call specific tools on traces and check specific properties.

Databricks shared several concrete judge examples across their agents. A **skill invocation judge** explores traces to verify whether the agent invoked skills targeted by scenarios, ensuring skill purposes are clear to the AUT. A **best-practices judge** checks whether output follows Databricks official documentation. An **outcome judge** inspects traces for output assets and asserts properties—for example, identifying where feature engineering code was authored and evaluating appropriateness for the task.

The outcome judge is particularly interesting because it tackles subjective quality head-on. Good feature engineering depends on domain expertise that LLMs can't get right out of the box. While it's tempting to encode complete criteria in prompts ("prefer median imputation over mean for skewed distributions, always scale features before distance-based models..."), this becomes laborious and brittle. Humans find it easier to look at examples and say "this is good/bad" than write complete specifications—this is exactly why alignment techniques work, as covered in the judge refinement loop.

The full test suite for a single agent includes judges across several categories. **Deterministic checks** require no LLM: syntax/linting on generated code, output schema validation (do expected tables exist with correct column types?), and tool sequence linting (did the agent read error logs before trying fixes, or skip straight to code editing?). **LLM-based checks** handle judgment calls requiring context understanding: code diff guidelines (did the agent change unrelated lines or introduce deprecated APIs?), and best practice adherence (does generated code follow domain conventions?). **Operational metrics** don't pass/fail individually but track health over time: token usage (high counts often signal struggling, retrying, or backtracking), tool call counts and failure ratios (spikes indicate problems), and latency (wall-clock completion time).

The operational metrics deserve emphasis because while they don't gate releases like pass/fail judges, they're critical for cost management and early warning. If token usage doubles after a change, something went wrong even if all judges pass—the agent is likely doing unnecessary work.

## Test Suite Evolution and Coverage

Test suites don't get authored comprehensively upfront—they evolve iteratively. They begin with simplest checks providing signal: does output exist? Does it parse? Structural checks follow: correct schema, columns, types? Only later come end-to-end data validation judges verifying correct results when executed. This mirrors how test suites mature in traditional software, starting with smoke tests, adding unit tests as failure modes emerge, building toward end-to-end coverage over time.

The key enabler is infrastructure supporting cheap addition of new judges, allowing test suites to grow alongside agents. Databricks feeds production failures back into eval scenarios, expanding coverage over time, though test suite growth remains slower than desired until scenario generation becomes automated.

## Judge Alignment: Testing the Tests

A critical insight in the coSTAR framework is that flaky or incorrect test suites that greenlight bad code ship bugs with confidence. Similarly, judges approving poor outcomes create false security. This drives the second loop of coSTAR: using the same scenarios and traces that drive agent refinement to also drive judge refinement, with human expert scores as ground truth.

This matters because unlike traditional testing where test correctness can be verified by inspection, LLM judges are stochastic and can drift in how they interpret natural-language criteria. The team needs continuous verification and alignment with human experts.

The alignment process starts by curating a Golden Set of typically dozens of examples of agent outputs that engineers manually assessed. This becomes ground truth that judges must agree with. Databricks then leverages MLflow's alignment capabilities (powered by techniques like GEPA and MemAlign) to automatically refine judges against the Golden Set. This is structurally the same STAR loop used to refine the AUT itself, but with the assess step performed by human experts and the refine step applied to the judge rather than the agent.

This coupled loop architecture—one loop earning trust in judges, one using that trust to refine agents—makes automated refinement meaningful rather than just fast.

## Automated Refinement: Closing the Loop

With judges aligned against human expert judgment through the judge loop, the agent loop becomes trustworthy. A coding assistant treats the agent as its codebase and judges as its test suite, reading failures, diagnosing root causes, patching the agent, and re-running everything. Engineers remain reviewers and final arbiters of proposed changes, but automated iteration saves considerable human effort in analyzing and improving agents.

Databricks shared a concrete example from the Data Analyst agent. In the **red** phase, the initial version ran against the scenario suite and the best-practices judge flagged a discrepancy: the agent generated code for logical views differently from official recommendations. While not affecting correctness, this had implications for maintenance and deployment of generated code—an insidious regression hard to catch manually. In the **green** phase, the coding assistant analyzed judge feedback and identified the gap: the agent used a skill that wasn't prescriptive about view types (temporary vs permanent). After adding relevant guidance to the skill, tests passed successfully and the change was verified to introduce no other regressions based on other test scenarios.

## Infrastructure Regression Testing

An important insight is that judges test more than just agent implementation—they guard against regressions in the entire stack of dependencies. Agents call MCP (Model Context Protocol) tools providing standardized interfaces for data access, code execution, environment setup, and more. These tools have independent development teams and release cycles.

When a tool changes implementation (stderr format changes in code execution tools, null handling changes in data access tools), the agent hasn't changed but agent behavior can break. Because Databricks runs judges on every nightly build, they act as regression tests against the full stack. When tool teams ship changes causing agents to fail judges, errors get caught immediately before reaching customers. Critically, judge failures indicate what broke (the specific quality dimension that regressed), making it easier to triage whether root causes lie in agents or dependencies.

This provides the same value that integration tests offer in traditional software: guarding contracts between code and dependencies. The only difference is that "code" is an agent and "dependencies" are MCP tools.

## Production Monitoring: Eval in Production

A particularly valuable extension of the testing analogy is running the same judges on production traffic. In traditional software, testing doesn't stop at CI—production gets monitored for error rates, latency percentiles, and business metrics on live traffic, with test logic often reappearing as health checks and alerts.

Databricks does the same with judges designed to score any agent conversation, not just eval scenarios. Running them (or sampled subsets) on real production conversations provides multiple benefits. **Early warning on drift** means if judge pass rates drop on production conversations, something changed—perhaps model upgrades degraded quality or user prompts shifted in ways agents handle poorly. The team sees issues in judge scores before user complaints. **Real-world signal for the test suite** means production conversations flagged as failures become candidates for new eval scenarios, closing the loop between production and development so test suites grow organically from real failures. **Cost monitoring at the agent level** tracks token usage and tool call counts on production conversations, since quality-neutral changes that triple cost still represent regressions.

The key insight is that the same scoring infrastructure (judges, metrics, recorded traces) serves double duty—build it once for eval and production monitoring comes as a side effect.

## Results and Impact

Databricks has adopted the coSTAR methodology across several released agents including Genie Code capabilities (Data Engineering, Machine Learning, Trace analysis), internal developer productivity agents, and customer-facing agents like AI Dev Kit and the open-source MLflow Assistant. The tangible benefits include verification time reduction from two weeks to hours compared to manual evals, enabling higher development velocity. Test suites have grown to hundreds of scenarios per agent, increasing confidence in catching regressions. Integration tests have flagged infrastructure dependency changes preventing production regressions, including TODO management behavior changes in underlying models, latency impacts, and model changes.

MLflow has been instrumental as a GenAI testing platform, helping engineers standardize on the methodology, accelerate test development, and share best practices across teams.

## Limitations and Open Challenges

Databricks is transparent about current limitations, mapping them to familiar testing problems. **Scenario generation remains manual**—while scoring, alignment, and optimization are automated, generating scenarios requires human effort to craft realistic initial state, meaningful prompts, and correct expectations. This bottleneck limits test suite size, and narrow test suites enable the next problem. **The coding assistant can overfit** when test suites don't cover enough cases, engineering agent implementations that ace specific inputs but fail on novel ones (the agent equivalent of passing unit tests but breaking in production). Databricks mitigates this by feeding production failures back into eval and expanding coverage, but until scenario generation automates, test suites grow slower than desired.

**Judge alignment is expensive**, requiring domain experts to manually grade outputs—the exact bottleneck they're trying to eliminate. It's not one-time: as agents evolve, judges need recalibration. The team is investigating active learning for judge alignment: measuring judge uncertainty and identifying specific examples where judges are underspecified and human labels would resolve ambiguity, rather than asking experts to grade random samples. **Multi-step failures are hard to attribute**—when agents fail at step 7 of 10-step pipelines, was the root cause at step 7 or step 3? Judges catch symptoms but coding assistants sometimes patch wrong steps. Better causal tracing remains active work.

**Novel failure modes slip through** since coSTAR optimizes within dimensions judges cover. New failure classes that no judge checks for remain invisible, like bugs in code that no test exercises. coSTAR improves within test suites but can't expand them autonomously—humans must notice new failure modes and add judges.

## LLMOps Best Practices and Takeaways

The coSTAR case study demonstrates several critical LLMOps principles. The fundamental insight is that agent development has a testing problem—without automated evaluation, teams are coding without tests and will face deserved regressions. The architectural choice to give judges tools rather than full traces matters: agentic judges calling targeted tools resemble focused unit tests, while dumping full traces into judges resembles dumping program state into assertions and doesn't scale.

Testing the tests is essential because LLM judges are stochastic and must be aligned against human-graded golden sets the same way test suites get validated against specifications. Closing the loop is where real value emerges: the full coSTAR loop of trusted scenarios, recorded traces, aligned judges, and coding assistants that refine agents until tests pass. Evaluation without automated refinement is only half the story.

Building infrastructure once for monitoring everywhere means the same judges validating in eval can monitor production—one investment, two returns. The coupling is critical: refining agents is only as reliable as the judges driving refinement. coSTAR's two coupled loops—one earning trust in judges, one using that trust to refine agents—make automated refinement meaningful rather than merely fast.

This case study represents a mature, production-tested approach to LLMOps that moves beyond ad-hoc evaluation toward systematic, automated testing and refinement practices that scale across multiple agents and teams.
