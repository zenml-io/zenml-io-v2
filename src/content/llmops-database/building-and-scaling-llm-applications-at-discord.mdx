---
title: "Building and Scaling LLM Applications at Discord"
slug: "building-and-scaling-llm-applications-at-discord"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3aa104669dea50a2f79a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:39:17.542Z"
  createdOn: "2024-11-21T13:50:25.830Z"
llmopsTags:
  - "chatbot"
  - "compliance"
  - "content-moderation"
  - "cost-optimization"
  - "devops"
  - "error-handling"
  - "fallback-strategies"
  - "fine-tuning"
  - "guardrails"
  - "latency-optimization"
  - "microsoft"
  - "model-optimization"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "realtime-application"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "structured-output"
industryTags: "tech"
company: "Discord"
summary: "Discord shares their comprehensive approach to building and deploying LLM-powered features, from ideation to production. They detail their process of identifying use cases, defining requirements, prototyping with commercial LLMs, evaluating prompts using AI-assisted evaluation, and ultimately scaling through either hosted or self-hosted solutions. The case study emphasizes practical considerations around latency, quality, safety, and cost optimization while building production LLM applications."
link: "https://discord.com/blog/developing-rapidly-with-generative-ai"
year: 2024
seo:
  title: "Discord: Building and Scaling LLM Applications at Discord - ZenML LLMOps Database"
  description: "Discord shares their comprehensive approach to building and deploying LLM-powered features, from ideation to production. They detail their process of identifying use cases, defining requirements, prototyping with commercial LLMs, evaluating prompts using AI-assisted evaluation, and ultimately scaling through either hosted or self-hosted solutions. The case study emphasizes practical considerations around latency, quality, safety, and cost optimization while building production LLM applications."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-llm-applications-at-discord"
  ogTitle: "Discord: Building and Scaling LLM Applications at Discord - ZenML LLMOps Database"
  ogDescription: "Discord shares their comprehensive approach to building and deploying LLM-powered features, from ideation to production. They detail their process of identifying use cases, defining requirements, prototyping with commercial LLMs, evaluating prompts using AI-assisted evaluation, and ultimately scaling through either hosted or self-hosted solutions. The case study emphasizes practical considerations around latency, quality, safety, and cost optimization while building production LLM applications."
---

## Overview

Discord, the popular communication platform serving hundreds of millions of users, published a detailed engineering blog post describing their methodology for developing and deploying generative AI features. This case study provides a practical framework for how a large-scale consumer technology company approaches LLMOps, from initial ideation through full production deployment. The post, authored by Shannon Phu, a Senior Machine Learning Engineer on Discord's Applied Machine Learning team, offers insights into the tradeoffs and decision-making processes involved in bringing LLM-powered features to production.

The case study is notable for its transparency about the iterative nature of LLM development and its balanced treatment of commercial versus self-hosted model options. While it doesn't detail specific features that were built using this process, it provides a generalizable framework that reflects real production experience at scale.

## Identifying Use Cases for Generative AI

Discord begins by emphasizing that generative AI should be treated as a tool that must be carefully matched to appropriate problems. They highlight three categories of challenges where generative AI is particularly well-suited:

- Analysis, interpretation, or review of unstructured content (especially text) at scale
- Tasks requiring massive scaling that would be prohibitive with limited human resources
- Problems that are challenging for rules-based or traditional machine learning approaches

This framing is important from an LLMOps perspective because it establishes clear criteria for when to pursue LLM-based solutions versus other approaches. The emphasis on unstructured content and scale suggests Discord is likely applying these techniques to content moderation, user support, or similar text-heavy operations.

## Product Requirements Definition

Before prototyping, Discord defines several key dimensions that influence model selection and system design:

**Latency** is considered in terms of how fast the system must respond to user input. For a real-time communication platform like Discord, this is critical for user-facing features.

**Task Complexity** involves assessing the level of understanding required from the LLM and whether the input context is highly domain-specific. This influences whether off-the-shelf models will suffice or fine-tuning is necessary.

**Prompt Length** determines how much context must be provided, which impacts token costs and model selection based on context window requirements.

**Quality** establishes the acceptable level of accuracy for generated content, which must be balanced against latency requirements.

**Safety** addresses the importance of sanitizing user input and preventing harmful content generation or prompt injection attacks—particularly critical for a consumer platform like Discord.

**Language Support** considers which languages the application must support, relevant for Discord's global user base.

**Estimated QPS** (queries per second) forecasts the throughput requirements for full-scale deployment, which directly impacts infrastructure planning and cost projections.

Discord explicitly acknowledges the tension between quality and latency, noting that more capable models typically operate more slowly. They present this as a tradeoff that can be addressed either by accepting higher costs (more compute capacity) or by using smaller models with some quality degradation.

## Prototyping and Prompt Engineering

Discord's prototyping approach favors starting with advanced commercial LLMs like GPT-4 to quickly validate ideas before investing in infrastructure. The rationale is pragmatic: if state-of-the-art foundational models cannot adequately solve a problem, the problem may not be addressable with current generative AI technology. This "fail fast" approach prevents wasted engineering effort on infrastructure for problems that aren't tractable.

The core technical challenge at the prototyping stage is developing effective prompts. Discord describes an iterative process of refining prompt wording, but notes that after many adjustments it becomes difficult to tell whether changes are improving results. This motivates their use of systematic evaluation.

### AI-Assisted Evaluation

A key contribution of this case study is Discord's description of their AI-assisted evaluation methodology. This technique uses a best-in-class LLM (such as GPT-4) to automatically evaluate the outputs of the inference model. Discord draws an analogy to the actor-critic algorithm from reinforcement learning, where the "critic" (GPT-4) evaluates how well the "actor" (the inference model) performed.

The evaluation setup involves two separate prompts:
- A task prompt passed to the inference model being evaluated
- A critic prompt passed to a more advanced model for evaluation

To streamline evaluation, Discord designs critic prompts that request simple yes/no answers or numerical ratings, making the process more automatable and reducing the need for manual review of every output.

This approach allows rapid iteration on prompt design with quantitative feedback, though it's worth noting that AI-assisted evaluation has its own limitations—the critic model's judgments may not always align with human preferences, and the technique may miss subtle quality issues that humans would catch.

## Launch and Learn: A/B Testing and Metrics

Once prompt quality reaches acceptable levels, Discord deploys features through limited releases (A/B tests) to gather real-world performance data. The metrics they track fall into several categories:

**User satisfaction metrics** include direct user feedback, engagement measures, and identification of problematic responses such as incorrect answers or hallucinations causing strange user experiences.

**System health metrics** encompass response latency, throughput (tokens per second), and error rates. Discord notes that LLMs sometimes struggle to generate consistently structured output, which is crucial for downstream parsing and service integration.

**Cost metrics** focus on tokens per second consumption during limited release, which enables forecasting of full-scale launch costs.

This combination of user-facing and operational metrics provides a comprehensive view of whether a feature is production-ready. Discord emphasizes that if metrics indicate issues, the team iterates on the system rather than proceeding to full deployment.

## Production Architecture

Discord describes their high-level architecture for LLM applications, which consists of several key components:

**Prompt preparation** converts inputs into prompts that have been tested and evaluated against a robust set of examples.

**LLM inference server** is the core component responsible for generating responses. For prototyping, this may be a commercial API like OpenAI's GPT endpoints.

**Content safety filters** are applied to inference server outputs before they reach users. Discord works with Legal and Safety teams to implement mitigations and can leverage both in-house and third-party trust and safety ML models to detect inappropriate content.

This architecture reflects Discord's emphasis on user experience, privacy, and safety—essential considerations for a consumer platform serving diverse communities including minors.

## Self-Hosted LLM Considerations

Discord provides a thoughtful treatment of the tradeoffs between commercial LLM APIs and self-hosted solutions. Commercial LLMs offer access to state-of-the-art models without infrastructure setup burden, but costs can scale quickly. Privacy considerations may also favor in-house processing.

For self-hosted solutions, Discord mentions open-source models like Llama and Mistral as capable of producing high-quality results even for complex tasks. However, they note that domain-specific or complex tasks may still require fine-tuning to achieve excellent performance. Their recommendation is to start with smaller models and scale up only if quality requirements demand it.

The infrastructure requirements for self-hosted LLMs include:
- Dedicated model servers (using frameworks like Triton or vLLM)
- Powerful GPUs for robust inference
- Configuration tuning for high throughput and low latency

Discord notes that optimal server configuration is task-specific, depending on models, input/output token lengths, and batching strategies for maximizing throughput.

## Critical Assessment

While Discord's framework is well-structured and reflects genuine production experience, several aspects merit critical consideration:

The case study is light on specific quantitative results or concrete examples of features built using this methodology. Without knowing what Discord actually shipped using these processes, it's difficult to assess how well the framework works in practice.

The discussion of AI-assisted evaluation is valuable but doesn't address potential limitations such as evaluator model bias, the cost of using GPT-4 for evaluation at scale, or cases where critic judgments diverge from human preferences.

The treatment of self-hosted models acknowledges tradeoffs but doesn't provide specifics on when Discord chooses one approach over the other, or what cost savings they've actually achieved.

Despite these limitations, the case study provides a useful template for organizations developing their own LLMOps practices, with particular value in its systematic approach to requirements definition, evaluation, and the staged progression from prototype to production deployment.