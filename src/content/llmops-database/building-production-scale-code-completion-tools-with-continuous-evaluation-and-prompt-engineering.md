---
title: "Building Production-Scale Code Completion Tools with Continuous Evaluation and Prompt Engineering"
slug: "building-production-scale-code-completion-tools-with-continuous-evaluation-and-prompt-engineering"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ba5b5eb6ca8ec861597"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:39:22.420Z"
  createdOn: "2024-11-21T13:54:45.558Z"
llmopsTags:
  - "cicd"
  - "code-generation"
  - "continuous-deployment"
  - "continuous-integration"
  - "devops"
  - "error-handling"
  - "fine-tuning"
  - "guardrails"
  - "hugging-face"
  - "latency-optimization"
  - "microservices"
  - "model-optimization"
  - "monitoring"
  - "open-source"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "scaling"
  - "system-prompts"
industryTags: "tech"
company: "Gitlab"
summary: "Gitlab's ModelOps team developed a sophisticated code completion system using multiple LLMs, implementing a continuous evaluation and improvement pipeline. The system combines both open-source and third-party LLMs, featuring a comprehensive architecture that includes continuous prompt engineering, evaluation benchmarks, and reinforcement learning to consistently improve code completion accuracy and usefulness for developers."
link: "https://www.youtube.com/watch?v=fOVkb_d6wvA"
year: 2023
seo:
  title: "Gitlab: Building Production-Scale Code Completion Tools with Continuous Evaluation and Prompt Engineering - ZenML LLMOps Database"
  description: "Gitlab's ModelOps team developed a sophisticated code completion system using multiple LLMs, implementing a continuous evaluation and improvement pipeline. The system combines both open-source and third-party LLMs, featuring a comprehensive architecture that includes continuous prompt engineering, evaluation benchmarks, and reinforcement learning to consistently improve code completion accuracy and usefulness for developers."
  canonical: "https://www.zenml.io/llmops-database/building-production-scale-code-completion-tools-with-continuous-evaluation-and-prompt-engineering"
  ogTitle: "Gitlab: Building Production-Scale Code Completion Tools with Continuous Evaluation and Prompt Engineering - ZenML LLMOps Database"
  ogDescription: "Gitlab's ModelOps team developed a sophisticated code completion system using multiple LLMs, implementing a continuous evaluation and improvement pipeline. The system combines both open-source and third-party LLMs, featuring a comprehensive architecture that includes continuous prompt engineering, evaluation benchmarks, and reinforcement learning to consistently improve code completion accuracy and usefulness for developers."
---

## Overview

This case study comes from a presentation by an engineering manager at GitLab who leads the Model Ops group. The team embarked on a journey to build code completion tools called "GitLab Suggestions" over approximately 6-7 months. The presentation provides insights into their LLMOps architecture, evaluation frameworks, and continuous improvement processes for deploying LLMs in production for code generation use cases.

## The Problem and Use Case

Code completion tools are fundamentally important to developers, using AI as assistance in decision-making to help developers write code faster and more effectively. The presenter frames the core challenge around three key metrics that any code completion LLM output should satisfy:

- **Honest**: Is the code consistent with facts? This goes beyond just evaluating whether code is syntactically correct—it asks whether the suggestion is honest to the developer who is using it.
- **Harmless**: Does the code avoid causing harm or introducing problems?
- **Helpful**: Does it actually accomplish the goal of the coder, enabling them to write more usable code faster?

The presentation focuses primarily on the "helpful" dimension—ensuring that code completions actually aid developers in achieving their goals. A key insight shared is that for many LLMs (other than ChatGPT), whether they are third-party or open-source, organizations don't necessarily have access to the training data to judge quality. This creates a fundamental challenge: how do you take these third-party or open-source LLMs and make them write code that is better than what an average coder could produce?

## LLM Selection Fundamentals

When choosing raw LLMs for code completion, the presenter outlines several factors to consider:

- **Objective alignment**: Understanding that the goal is code completions, code generation, and recommendations for developers
- **Parameters and training data**: Getting a sense of how much data (how much of the internet) has gone into building the model
- **Evaluation benchmarks**: Understanding what benchmarks already exist for the chosen LLMs
- **Model weights flexibility**: For open-source models, understanding what kind of tuning frameworks can be applied
- **Cost considerations**: An important practical factor in production deployments
- **Latency**: Critical for developer experience in code completion scenarios

The presenter makes an important observation that assessing quality is extremely difficult without evaluating at scale, which leads into the discussion of their evaluation architecture.

## Multi-Model Architecture

A key architectural decision is that in this world of LLMs, you're not just choosing one model—you're choosing many based on the factors discussed. The GitLab architecture includes both open-source pre-trained LLMs that can be further tuned with additional data, and third-party LLMs.

The full architecture flows from left to right, starting with data ingestion. Additional data is used to enhance pre-trained LLMs, downloaded from sources like Hugging Face. This involves downloading raw datasets, pre-processing, and tokenizing data, which then moves into an environment for training and tuning with checkpoint layers.

Two engines run in parallel within this architecture:

The **Prompt Engine** processes every piece of code a developer writes through a "prompt library" or "prompt DB." This engine deconstructs code into tokens, understands what was finally committed, and develops a scoring mechanism for ranking outputs. This ranking considers whether the output represents good, average, or less experienced developer understanding.

A **Gateway** layer includes prompt engine post-processing and a validator that calls different models based on the user input—routing to either third-party models or their own pre-trained models as appropriate.

## Continuous Evaluation at Scale

The presenter emphasizes moving beyond manual spreadsheet-based prompt evaluation to automated, scaled continuous evaluation. The evaluation loop includes:

- Prompt input processing
- Tokenization
- Similarity assessment based on developer patterns
- Storage and evaluation
- Using insights to inform output quality

A concrete example provided involves analyzing a historic database of code to understand token completion patterns. The team observed that different developers (developer one, developer two, developer three) write the same code in different ways with different parameters and evaluation styles. They run algorithms based on code commits and similarity to agree on what constitutes an "actual agreeable developer output."

This agreed-upon output becomes the benchmark against which LLM outputs (whether open-source, third-party, or tuned) are evaluated. The evaluation uses techniques based on objective review, scoring similarities (the presenter mentions Pearson correlation as one option), examining both the prompt and the code output.

The beauty of this approach, as emphasized by the presenter, is having this evaluation process run as microservice engines that can operate in an infinite loop on an instantaneous basis. Rather than manually reviewing prompts in spreadsheets, this architecture enables continuous background evaluation that keeps dialing up code completion usefulness across all the key metrics.

## Reinforcement Learning and Serving

The serving layer implements what the presenter calls reinforcement learning. From the evaluation engine, the system knows what the actual shortfalls are and what the LLMs are producing. The next step is identifying prompt templates or prompt tunings that can be applied instantaneously.

Key components of the serving layer include:

- **Prompt Validator**: Rates outputs in real-time
- **Rate Limiter**: Manages throughput and user experience
- **Version-Based Control**: Each component can be a microservice connected through CI/CD

When the prompt validator cannot achieve the desired output quality, requests can be routed to fine-tuning of the models in a continuous loop. This entire system is version-controlled, enabling the team to track changes and improvements over time.

The presenter draws an analogy to Amazon's recommendation engine—constantly dialing up accuracy of usability through continuous feedback loops. The journey might start with raw LLMs providing a 10% acceptance rate for coders, then through continuous evaluation benchmarking and prompt refincement via reinforcement learning, the accuracy steadily improves.

## Continuous Training Pipeline

The full loop integrates training data and completion data continuously. With code completion use cases, there will always be coders writing code, which means there's always new data available. This data can be continuously added for:

- Evaluation purposes
- Prompt inference
- Ranking and understanding outputs
- Improving the three decision framework metrics (honest, harmless, helpful)

This creates a virtuous cycle where more usage leads to more data, which leads to better evaluation, which leads to better prompts and fine-tuning, which leads to better code completion accuracy.

## Key Takeaways and Honest Assessment

The presenter concludes with a philosophical note: "In this day and age of LLMs, data is still the oil. It is very difficult to imagine that with sufficient data there will remain things that only humans can do."

It's worth noting that while this presentation provides valuable architectural insights, it is somewhat light on specific quantitative results or metrics. The presenter mentions starting with a 10% acceptance rate as an example but doesn't share concrete numbers about where GitLab's code completion tools ended up in terms of accuracy or developer adoption.

The presentation also represents a relatively early-stage journey (6-7 months at the time of the talk), so some of the continuous improvement mechanisms described may have been aspirational or in development rather than fully proven at scale. However, the architectural patterns and evaluation frameworks described represent sound engineering practices for LLMOps in production code completion scenarios.

The emphasis on moving beyond manual evaluation to automated, scaled evaluation pipelines is particularly valuable advice for teams building similar systems. The multi-model approach with routing and the concept of continuous prompt engineering through microservices represents a mature architecture for production LLM deployments.