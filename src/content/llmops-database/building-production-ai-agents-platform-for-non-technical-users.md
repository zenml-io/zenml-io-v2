---
title: "Building Production AI Agents Platform for Non-Technical Users"
slug: "building-production-ai-agents-platform-for-non-technical-users"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68762f0c4e314907699f8a48"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:13:49.233Z"
  createdOn: "2025-07-15T10:35:56.015Z"
llmopsTags:
  - "customer-support"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "fallback-strategies"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "fastapi"
  - "langchain"
  - "openai"
  - "anthropic"
industryTags: "tech"
company: "Zapier"
summary: "Zapier developed Zapier Agents, an AI-powered automation platform that allows non-technical users to build and deploy AI agents for business process automation. The company learned that building production AI agents is challenging due to the non-deterministic nature of AI and unpredictable user behavior. They implemented comprehensive instrumentation, feedback collection systems, and a hierarchical evaluation framework including unit tests, trajectory evaluations, and A/B testing to create a data flywheel for continuous improvement of their AI agent platform."
link: "https://www.youtube.com/watch?v=blrovBxxN9o"
year: 2025
seo:
  title: "Zapier: Building Production AI Agents Platform for Non-Technical Users - ZenML LLMOps Database"
  description: "Zapier developed Zapier Agents, an AI-powered automation platform that allows non-technical users to build and deploy AI agents for business process automation. The company learned that building production AI agents is challenging due to the non-deterministic nature of AI and unpredictable user behavior. They implemented comprehensive instrumentation, feedback collection systems, and a hierarchical evaluation framework including unit tests, trajectory evaluations, and A/B testing to create a data flywheel for continuous improvement of their AI agent platform."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-agents-platform-for-non-technical-users"
  ogTitle: "Zapier: Building Production AI Agents Platform for Non-Technical Users - ZenML LLMOps Database"
  ogDescription: "Zapier developed Zapier Agents, an AI-powered automation platform that allows non-technical users to build and deploy AI agents for business process automation. The company learned that building production AI agents is challenging due to the non-deterministic nature of AI and unpredictable user behavior. They implemented comprehensive instrumentation, feedback collection systems, and a hierarchical evaluation framework including unit tests, trajectory evaluations, and A/B testing to create a data flywheel for continuous improvement of their AI agent platform."
---

## Overview of Zapier Agents Platform

Zapier, known for its automation software connecting various applications through workflows, developed Zapier Agents as a more "agentic alternative" to their traditional automation platform. The system allows users to describe what they want to accomplish, and the platform proposes tools and triggers to automate business processes. However, the company discovered that building effective AI agents for production use is significantly more complex than initial prototypes might suggest.

The core challenge Zapier faced was the dual non-determinism problem: AI models are inherently non-deterministic, but users are even more unpredictable in how they interact with AI systems. This creates a fundamental engineering challenge that differs substantially from traditional software development, where deterministic inputs produce predictable outputs.

## Key Insights on Production AI Development

The Zapier team emphasized that the initial prototype represents only the beginning of the development process. Unlike traditional software where the main work happens before deployment, AI agent development requires building what they call a "data flywheel" after shipping to users. This flywheel consists of collecting user feedback, understanding usage patterns and failures, building evaluations, improving features, attracting more users, encountering new failure modes, and continuing the cycle of improvement.

The company discovered that many developers underestimate the complexity of production AI systems. While it's relatively straightforward to create a working prototype using libraries like LangChain, pulling some examples, tweaking prompts, and adding tools, the reality of production deployment involves significantly more complexity and ongoing maintenance.

## Instrumentation and Data Collection Strategy

Zapier implemented comprehensive instrumentation as the foundation of their LLMOps approach. They emphasize recording much more than just completion calls in their traces, including tool calls, errors from tool calls, and pre and post-processing steps. This detailed logging makes debugging failures much easier and enables reproducible evaluations.

The company structures their logged data to match runtime formats, making it seamless to convert traces into evaluation runs. This approach provides particular value for tool calls that produce side effects, as they can be mocked during evaluation while maintaining realistic test conditions.

## Feedback Collection Methodology

Zapier developed a sophisticated approach to collecting both explicit and implicit feedback from users. They found that traditional thumbs up/down buttons generate limited responses, so they implemented contextual feedback requests. For example, after an agent completes a test run, they display a feedback call-to-action asking "Did this run do what you expected?" This simple change resulted in a significant increase in feedback submissions.

The company also mines user interactions for implicit feedback signals. Strong positive indicators include users enabling an agent after testing it, copying model responses, and successful task completion. Negative signals include users telling agents to stop, sending follow-up messages that rephrase previous requests, and expressions of frustration (including cursing, which they found surprisingly common).

Zapier experimented with using LLMs to detect and categorize user frustrations, creating weekly reports for their team. However, this required extensive tuning to ensure the LLM understood what frustration means in their specific product context.

## LLMOps Tooling and Infrastructure

The company employs a hybrid approach to LLMOps tooling, both purchasing existing solutions and building custom internal tools. They particularly emphasize the value of custom tooling development, noting that with modern AI-assisted coding tools like Cursor and Claude, building internal tooling has become much easier and provides significant long-term benefits.

Custom tooling allows Zapier to understand their data within their specific domain context and creates functionality to convert any failure case into an evaluation with minimal friction. This "one-click eval creation" capability became an essential part of their workflow, enabling rapid iteration and improvement.

## Evaluation Framework and Testing Pyramid

Zapier developed a hierarchical evaluation framework resembling the testing pyramid concept from traditional software development. At the base are unit test-like evaluations that predict the next state from the current state. These are useful for simple assertions like checking if the next state is a specific tool call, verifying tool call parameters, or confirming the presence of specific keywords.

Unit test evaluations serve as the starting point because they're easiest to implement and help build the discipline of examining data, identifying problems, creating reproducible evaluations, and focusing on fixes. However, the company discovered limitations with over-relying on unit tests, particularly when evaluating new models that might achieve the same goals through different approaches.

In the middle of their testing pyramid are trajectory evaluations, which allow agents to run to completion while grading not just the end state but all tool calls and artifacts generated throughout the process. These evaluations provide better coverage of multi-turn interactions but are more complex to implement, especially when dealing with tools that cause side effects.

At the top of the pyramid are A/B tests with staged rollouts, which Zapier considers the ultimate evaluation method since they reflect real user satisfaction rather than laboratory metrics.

## Advanced Evaluation Techniques

Zapier experimented with using reasoning models to analyze failures, finding that when provided with trace outputs, inputs, and instructions, these models can effectively identify root causes of failures or direct attention to interesting aspects of runs that might reveal problems.

They also developed rubrics-based scoring using LLM-as-a-judge techniques, where each evaluation run includes human-crafted rubrics describing what the LLM should focus on when scoring. This approach provides more nuanced and context-appropriate evaluations than generic scoring methods.

## Model Comparison and Deployment Strategy

The company faced challenges when stronger models performed worse on their internal benchmarks, which they attributed to over-indexing on fine-grained unit test evaluations. They solved this by using reasoning models to compare different model performances, providing insights like Claude being more decisive while Gemini tends to be more verbose and sometimes generates malformed JSON.

This experience led them to understand that different models have different approaches to achieving the same goals, and unit test evaluations can unfairly penalize alternative but valid solution paths. This insight drove their development of trajectory evaluations that better capture overall system performance.

## Production Deployment and Monitoring

For production deployment, Zapier emphasizes that trajectory evaluations require careful consideration of tool side effects. Rather than mocking environments, they create synthetic copies of user environments to maintain realistic testing conditions while avoiding unintended consequences like sending emails on behalf of customers.

The company divides their evaluation datasets into two categories: regression datasets to ensure changes don't break existing functionality, and aspirational datasets containing extremely challenging scenarios that push the boundaries of system capabilities.

## Philosophy and Best Practices

Zapier advocates against obsessing over metrics, following the principle that "when a good metric becomes a target, it ceases to be a good metric." They emphasize that achieving 100% scores on evaluation datasets likely indicates the dataset isn't challenging enough rather than perfect system performance.

The ultimate goal, according to Zapier, is user satisfaction rather than maximizing laboratory metrics. This philosophy drives their emphasis on A/B testing as the final validation method, where they route small percentages of traffic to new models or prompts while monitoring feedback, activation rates, and user retention.

## Technical Architecture and Implementation

While the transcript doesn't provide extensive technical implementation details, it's clear that Zapier's system involves complex orchestration of multiple components including LLM calls, database interactions, tool calls, and REST API calls. Each component can be a source of failure, requiring sophisticated tracing and monitoring to understand cascading failures.

The company's approach to building this infrastructure reflects a mature understanding of production AI systems, recognizing that the complexity extends far beyond the initial model deployment to encompass comprehensive monitoring, evaluation, and continuous improvement processes.

## Lessons Learned and Future Directions

Zapier's experience highlights several key lessons for organizations building production AI systems. The importance of comprehensive instrumentation from the beginning, the value of both explicit and implicit feedback collection, the need for hierarchical evaluation frameworks, and the critical role of A/B testing in validating real-world performance.

The company's journey illustrates the evolution from simple prototypes to sophisticated production systems, emphasizing that success in AI product development requires sustained investment in evaluation infrastructure, continuous monitoring, and iterative improvement based on real user feedback rather than laboratory metrics alone.