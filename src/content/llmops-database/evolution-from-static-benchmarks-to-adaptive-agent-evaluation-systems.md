---
title: "Evolution from Static Benchmarks to Adaptive Agent Evaluation Systems"
slug: "evolution-from-static-benchmarks-to-adaptive-agent-evaluation-systems"
draft: false
llmopsTags:
  - "prompt-engineering"
  - "rag"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "evals"
  - "monitoring"
  - "wandb"
industryTags: "tech"
company: "Comet"
summary: "Vincent from Comet presents a paradigm shift in how organizations should approach LLM evaluation, arguing that traditional static benchmarks are insufficient for modern agentic AI systems. The core problem identified is \"eval calcification\" where static evaluation datasets become increasingly misaligned with dynamically evolving AI agents and changing user behavior patterns. The proposed solution involves treating evaluations themselves as adaptive, self-optimizing systems that leverage telemetry, trace data, and intent-based outcomes rather than fixed test sets. This approach enables continuous online evaluation, self-curation of test suites from production traces, and telemetry-in-the-loop corrections, allowing agents to self-heal and adapt to the 20% of unpredictable user interactions that static benchmarks miss. Results from Comet's research and work with major companies like Uber, Netflix, and UK banks demonstrate the practical need for this shift as AI applications become more intentful and personalized."
link: "https://www.youtube.com/watch?v=4VhbYlfC7Gs"
year: 2025
seo:
  title: "Comet: Evolution from Static Benchmarks to Adaptive Agent Evaluation Systems - ZenML LLMOps Database"
  description: "Vincent from Comet presents a paradigm shift in how organizations should approach LLM evaluation, arguing that traditional static benchmarks are insufficient for modern agentic AI systems. The core problem identified is \"eval calcification\" where static evaluation datasets become increasingly misaligned with dynamically evolving AI agents and changing user behavior patterns. The proposed solution involves treating evaluations themselves as adaptive, self-optimizing systems that leverage telemetry, trace data, and intent-based outcomes rather than fixed test sets. This approach enables continuous online evaluation, self-curation of test suites from production traces, and telemetry-in-the-loop corrections, allowing agents to self-heal and adapt to the 20% of unpredictable user interactions that static benchmarks miss. Results from Comet's research and work with major companies like Uber, Netflix, and UK banks demonstrate the practical need for this shift as AI applications become more intentful and personalized."
  canonical: "https://www.zenml.io/llmops-database/evolution-from-static-benchmarks-to-adaptive-agent-evaluation-systems"
  ogTitle: "Comet: Evolution from Static Benchmarks to Adaptive Agent Evaluation Systems - ZenML LLMOps Database"
  ogDescription: "Vincent from Comet presents a paradigm shift in how organizations should approach LLM evaluation, arguing that traditional static benchmarks are insufficient for modern agentic AI systems. The core problem identified is \"eval calcification\" where static evaluation datasets become increasingly misaligned with dynamically evolving AI agents and changing user behavior patterns. The proposed solution involves treating evaluations themselves as adaptive, self-optimizing systems that leverage telemetry, trace data, and intent-based outcomes rather than fixed test sets. This approach enables continuous online evaluation, self-curation of test suites from production traces, and telemetry-in-the-loop corrections, allowing agents to self-heal and adapt to the 20% of unpredictable user interactions that static benchmarks miss. Results from Comet's research and work with major companies like Uber, Netflix, and UK banks demonstrate the practical need for this shift as AI applications become more intentful and personalized."
notion:
  pageId: "35ff8dff-2538-806a-adc5-c229f40d6c84"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-13T06:08:00.000Z"
  lastEditedTime: "2026-05-13T06:08:00.000Z"
  publishedAt: "2026-05-13T06:14:59Z"
---

## Overview

This case study centers on Comet's evaluation research and their work with enterprise clients including Uber, Netflix, and UK banking institutions. Vincent, who works in evaluation research at Comet, presents a fundamental critique of how the industry approaches LLM evaluation in production environments. The core thesis is that the AI industry has inherited static evaluation methodologies from traditional software engineering but these approaches are fundamentally mismatched to the dynamic, adaptive nature of modern agentic AI systems.

The presentation addresses a critical gap in LLMOps: while traditional software engineering has evolved practices like chaos engineering and observability for testing dynamic systems, the AI evaluation space remains overly focused on static benchmarks and handcrafted test sets. This creates what Vincent terms "eval calcification" where evaluation approaches harden and become increasingly disconnected from the reality of production AI behavior.

## The Problem: Static Evaluations for Dynamic Systems

The fundamental problem identified is that AI applications, particularly agentic systems, are inherently non-static but are being evaluated as if they were static software. Traditional evaluation approaches in the AI space have consisted of several layers: static benchmarks that test compliance or capability on fixed question sets, handcrafted evaluation datasets painstakingly tuned before deployment, and offline evaluation cycles that run through predetermined test cases. However, these approaches miss the chaos engineering component that modern software development relies on to understand system behavior under unpredictable conditions.

Vincent draws a comparison to traditional software engineering practices which include unit tests written from initial examples, manual regression suites to catch unfavorable interactions, CI/CD pipelines for deployment verification, and critically, chaos engineering combined with observability for understanding emergent behaviors. The AI evaluation space has analogues to the first three but lacks the equivalent of chaos engineering, leaving organizations without tools to understand where their systems can be stretched or where they might fail unexpectedly.

The problem becomes more acute as AI systems evolve through distinct phases. The prompt engineering era involved what Vincent colorfully describes as "doom scrolling wordsmith instructions" where developers would iterate on prompts hoping for improvements without systematic understanding. This gave way to context engineering with retrieval-augmented generation and tool calling, which made evaluations somewhat more tractable by allowing systems to be decomposed into testable components like individual MCP tools. However, the emerging era of intent engineering, where models are sophisticated enough to self-optimize based on high-level intent and personalize experiences, makes traditional evaluation approaches increasingly inadequate.

The core issue is that when agents adapt to individual users and contexts, how can an organization know that one user's experience differs appropriately from another's? How can static benchmarks capture the diversity of personalized agent behaviors? Vincent argues that this creates an urgent need for evaluation approaches that can match the dynamism of the systems being evaluated.

## The Solution: Malleable Evaluations and Adaptive Systems

The proposed solution involves a fundamental reconceptualization of what evaluation means in the context of production LLM systems. Rather than treating evaluations as static datasets or fixed test suites, organizations should treat them as adaptive, living systems that evolve alongside the agents they evaluate.

This approach has several key components that distinguish it from traditional evaluation methodologies:

**Intent-Based Outcomes:** Instead of defining evaluations as specific input-output pairs where a particular user question must produce a specific answer, evaluations should be framed around higher-level intent and outcomes. This includes defining acceptable ranges for ambiguous agent behaviors, specifying desired personality characteristics, and establishing rubrics similar to how art or creative work is evaluated in educational contexts. The focus shifts from "did the agent produce this exact output" to "did the agent achieve this intended outcome in an acceptable manner."

**Self-Curating Test Suites from Traces:** One of the most innovative aspects of the proposed approach is using production trace data to automatically generate and update evaluation suites. The logic is straightforward but powerful: if 80% of agent interactions follow similar patterns, those patterns should inform the baseline evaluation suite. However, when user behavior shifts, when customer demographics change, or when new use patterns emerge, those shifts should automatically trigger updates to the evaluation criteria. Rather than requiring manual curation when the world changes, the system should detect distributional shifts in traces and adapt evaluation suites accordingly. This creates a feedback loop where production usage continuously informs evaluation criteria.

**Online Always-On Evaluation:** Moving away from periodic offline evaluation cycles, the proposed approach involves continuous evaluation running in production. Once agents are capable of performing evaluations and trace data is being collected, there's no technical reason evaluation must be a periodic batch process. Always-on evaluation enables real-time detection of issues, faster feedback loops, and the ability to catch the 20% of edge cases that static benchmarks miss because they emerge from unexpected user behaviors.

**Telemetry-in-the-Loop:** Perhaps the most forward-looking component is the concept of telemetry-in-the-loop where agentic harnesses are aware of their own operational telemetry including errors, costs, performance metrics, and other operational signals. When a harness can observe that it's encountering errors or operating outside acceptable parameters, it can self-correct without human intervention. Vincent references a paper on this concept and notes it's already emerging in frameworks like Open Claw where the harness can adapt itself, create new skills, and modify its behavior based on operational feedback. This extends beyond evaluation into self-healing systems, but the evaluation component is critical: the agent needs telemetry to know when self-correction is needed.

## Technical Implementation and Research

The technical foundation for this approach draws on several research directions and practical implementations. Vincent references a paper on adaptive testing for LLM evaluations that questions why benchmarks should be static when the applications being tested are dynamic. The concept of selective testing and being more intelligent about what gets tested when represents an important shift from comprehensive static benchmarks to targeted adaptive evaluation.

The presentation also references auto-optimization research, particularly work by Andrej Karpathy on auto-research systems. The principle is straightforward: given a goal or target and a reward signal, systems can iteratively tune and optimize themselves. Vincent suggests applying this not just to agent behavior but to evaluation itself. Rather than starting with a fixed dataset and comparing outputs, the evaluation process should define the desired end state and let the system optimize toward that objective, with the evaluation machinery itself being part of the optimization loop.

Comet's work with clients across diverse industries including ride-sharing platforms like Uber, streaming services like Netflix, and regulated financial institutions in the UK has provided real-world validation for these concepts. While Vincent notes that Comet's complete implementation of this adaptive evaluation system is still in development, the research and client work have demonstrated the practical necessity of moving beyond static benchmarks.

## The Open Claw Framework

A concrete example of these principles in action is the Open Claw framework, which Vincent is a core contributor to. Open Claw represents a harness that can modify itself, where the testing and operational framework is not fixed but adapts based on the agent's needs. If the agent needs to create new skills or modify its behavior, the harness can accommodate and adapt rather than requiring manual reconfiguration. This represents a practical implementation of the principle that not just agents but their operational and evaluation infrastructure should be dynamic.

## The 80/20 Problem and Edge Cases

A critical insight from the presentation is what might be called the 80/20 problem in agent evaluation. Vincent argues that organizations can potentially handle the 80% of user interactions that follow predictable patterns with more traditional evaluation approaches, perhaps enhanced with intent-based rubrics and better measurement frameworks. However, it's the 20% of unpredictable, edge-case interactions that pose the real operational risk and have the potential to cause serious business problems.

Someone using an agent in an unexpected way, asking questions outside the anticipated domain, or triggering interactions between components that weren't anticipated in testing represents the greatest risk. Static benchmarks, by definition, cannot capture these edge cases because they emerge from the long tail of user behavior in production. The solution is to have evaluation systems that can monitor for distributional shifts, detect anomalous interaction patterns, and either flag them for review or enable self-correction through telemetry-in-the-loop mechanisms.

## Broader Context and Industry Trends

Vincent addresses the somewhat provocative claim circulating in the AI community that "evals are dead" or that "observability is dead." His counterargument is that these capabilities are more important than ever, but they need to evolve beyond their current forms. As models become more capable, as evidenced by their ability to solve complex puzzles like ARC-AGI-2 and ARC-AGI-3 that are challenging even for humans, and as agentic systems become more intentful and personalized, the need to understand what these systems are doing in production becomes more urgent, not less.

The challenge is that traditional evaluation methodologies don't scale to the complexity of modern agentic systems. Organizations want to understand what's happening inside the different layers of their agentic applications precisely because there's uncertainty and concern about security, reliability, and behavior. The solution isn't to abandon evaluation but to make it as sophisticated and adaptive as the systems being evaluated.

## Evolution of AI Development Paradigms

The presentation traces an evolution through three distinct paradigms in AI development, each with different evaluation implications:

The prompt engineering era focused on iterating on instructions to large language models, trying to find the right combination of words and phrasing to elicit desired behaviors. Evaluation in this era was relatively straightforward because the system was essentially stateless and each prompt could be tested in isolation.

The context engineering era introduced retrieval-augmented generation, tool calling, and multi-step reasoning. This made systems more complex but also more decomposable for evaluation purposes. An organization could test whether a specific MCP tool was functioning correctly, whether retrieval was finding relevant documents, and whether tool selection was appropriate. The ability to break agentic systems into components made evaluation more tractable.

The emerging intent engineering era represents a qualitative shift. Models are now capable enough to understand high-level intent, self-optimize toward objectives, and personalize experiences. Code generation is cheap, tokens are plentiful and fast, and models can solve complex problems that require pattern recognition and reasoning. In this environment, systems will naturally differentiate their behavior across users and contexts. Evaluating such systems requires understanding not just whether they work but whether they're achieving intended outcomes across a diverse population of users and use cases.

## Practical Implications for LLMOps

For organizations operating LLM systems in production, this case study suggests several concrete implications:

Evaluation infrastructure should be treated as first-class production systems, not just development-time tools. Just as modern software requires sophisticated observability and monitoring in production, LLM applications require continuous evaluation that runs alongside production traffic.

Organizations should invest in trace collection and analysis infrastructure that can detect distributional shifts in user behavior, identify emerging interaction patterns, and flag anomalies that might indicate issues or new use cases.

The concept of a fixed, versioned evaluation dataset should be supplemented with dynamically generated evaluation criteria derived from production traces. While static benchmarks may still have value for regression testing and comparing model versions, they're insufficient for understanding production behavior.

Evaluation systems themselves should leverage LLM capabilities. If agents are sophisticated enough to perform complex reasoning and pattern recognition, they're sophisticated enough to help evaluate other agents or even themselves given appropriate frameworks and guard rails.

Organizations should develop frameworks for intent-based evaluation that can handle ambiguity and variation in agent outputs. This requires moving beyond exact-match comparisons to rubric-based assessment, similar to how human performance is evaluated in contexts where multiple valid solutions exist.

## Research and Academic Context

Vincent positions this work within the broader academic and research context where conferences remain heavily focused on benchmark creation. While benchmarks serve important purposes for comparing models and tracking progress, an over-fixation on static benchmarks can distract from the real challenges of operating LLM systems in production environments where user needs and behaviors constantly evolve.

The presentation draws on research from universities and Comet's own research initiatives, though specific papers are mentioned without detailed citation. The adaptive testing research represents one stream of work addressing these challenges, and Vincent's own telemetry-in-the-loop paper represents another contribution to this emerging body of work.

## Limitations and Honest Assessment

It's important to note that Vincent explicitly acknowledges this is work in progress. The complete implementation of Comet's adaptive evaluation system is not yet finished and was expected to be completed in the weeks following the presentation. The presentation is positioned as a conceptual framework and research direction rather than a fully realized product, which is an honest and valuable acknowledgment.

The presentation is also light on specific metrics, quantitative results, or detailed case studies from client engagements. While organizations like Uber, Netflix, and UK banks are mentioned as clients where this work has been applied, there are no concrete details about specific implementations, performance improvements, or operational metrics demonstrating the superiority of adaptive evaluation approaches over static benchmarks.

The framework is also quite abstract and conceptual. While principles like "intent-based outcomes" and "self-curating test suites" are compelling, the presentation doesn't provide detailed implementation guidance, specific architectural patterns, or code-level examples that would enable other organizations to adopt these approaches.

## Conclusion and Future Directions

This case study represents an important contribution to the ongoing evolution of LLMOps practices, particularly around evaluation and quality assurance for production LLM systems. The central insight that evaluation methodologies must match the dynamism of the systems being evaluated is well-founded and addresses a real gap in current practice.

The proposed shift from static benchmarks to adaptive, agent-driven evaluation systems that leverage production telemetry and traces represents a coherent vision for how evaluation might evolve. However, the approach remains largely conceptual and requires further development and validation to demonstrate practical superiority over existing methods.

For organizations struggling with the limitations of static benchmarks, particularly in contexts where user behavior is evolving or where agents personalize behavior, the principles outlined here offer valuable directions for exploration. The emphasis on telemetry, continuous evaluation, and treating evaluation infrastructure as adaptive systems aligns well with broader trends in production ML operations and site reliability engineering.
