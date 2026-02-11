---
title: "Optimizing Agent Behavior and Support Operations with LangSmith Testing and Observability"
slug: "optimizing-agent-behavior-and-support-operations-with-langsmith-testing-and-observability"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed5ebc20b1c131f7226"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:35:09.817Z"
  createdOn: "2024-11-21T14:08:21.429Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "error-handling"
  - "fine-tuning"
  - "langchain"
  - "monitoring"
  - "multi-agent-systems"
  - "openai"
  - "prompt-engineering"
  - "realtime-application"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "Podium"
summary: "Podium, a communication platform for small businesses, implemented LangSmith to improve their AI Employee agent's performance and support operations. Through comprehensive testing, dataset curation, and fine-tuning workflows, they achieved a 98.6% F1 score in response quality and reduced engineering intervention needs by 90%. The implementation enabled their Technical Product Specialists to troubleshoot issues independently and improved overall customer satisfaction."
link: "https://blog.langchain.dev/customers-podium/"
year: 2024
seo:
  title: "Podium: Optimizing Agent Behavior and Support Operations with LangSmith Testing and Observability - ZenML LLMOps Database"
  description: "Podium, a communication platform for small businesses, implemented LangSmith to improve their AI Employee agent's performance and support operations. Through comprehensive testing, dataset curation, and fine-tuning workflows, they achieved a 98.6% F1 score in response quality and reduced engineering intervention needs by 90%. The implementation enabled their Technical Product Specialists to troubleshoot issues independently and improved overall customer satisfaction."
  canonical: "https://www.zenml.io/llmops-database/optimizing-agent-behavior-and-support-operations-with-langsmith-testing-and-observability"
  ogTitle: "Podium: Optimizing Agent Behavior and Support Operations with LangSmith Testing and Observability - ZenML LLMOps Database"
  ogDescription: "Podium, a communication platform for small businesses, implemented LangSmith to improve their AI Employee agent's performance and support operations. Through comprehensive testing, dataset curation, and fine-tuning workflows, they achieved a 98.6% F1 score in response quality and reduced engineering intervention needs by 90%. The implementation enabled their Technical Product Specialists to troubleshoot issues independently and improved overall customer satisfaction."
---

## Overview

Podium is a communication platform designed to help small businesses connect with customers across multiple channels including phone, text, email, and social media. Their target customers are typically high-touch businesses such as automotive dealers, jewelers, and bike shops that are often understaffed yet need to respond quickly to customer inquiries. Podium's data suggests that responding within 5 minutes yields a 46% higher lead conversion rate compared to responding in an hour. To address this challenge, Podium developed "AI Employee," an agentic application that engages customers, schedules appointments, and helps close sales.

This case study, published in August 2024, illustrates how Podium evolved their LLMOps practices from basic LangChain framework usage for single-turn interactions to a comprehensive testing and observability approach using LangSmith. The evolution was driven by increasing complexity in their agentic use cases across diverse customer domains.

## Technical Challenges

The primary challenge Podium faced was gaining visibility into their complex AI agent interactions. Each customer inquiry involved 20-30 LLM calls, making it difficult to understand the customer journey and diagnose issues when things went wrong. Without proper observability, their engineering team struggled to:

- Understand why specific agent behaviors occurred
- Identify the root cause of customer-reported issues
- Determine whether problems stemmed from bugs, missing context, misaligned instructions, or LLM limitations
- Create balanced datasets for model improvement

A specific behavioral issue highlighted in the case study was the agent's inability to recognize when conversations had naturally ended, leading to awkward repeated goodbyes that degraded user experience.

## Testing Lifecycle Implementation

Podium implemented a comprehensive testing approach across the agentic development lifecycle, which represents a mature LLMOps practice worth examining in detail.

**Baseline Dataset Curation** forms the foundation of their testing strategy. The team creates initial datasets representing basic use cases and requirements for the agent. This baseline serves as the starting point for all subsequent testing and development work.

**Offline Evaluation** is conducted using the curated dataset before shipping to production. This pre-deployment testing ensures the agent meets basic performance requirements before being exposed to real users.

**Feedback Collection** happens through two channels. First, user-provided feedback captures direct input from people interacting with the agent. Second, online evaluation employs LLMs to self-evaluate and monitor response quality in real-time, flagging potential issues for investigation. This dual approach ensures both subjective user experience and objective quality metrics are captured.

**Optimization** occurs through multiple techniques: prompt tuning to refine the prompts guiding agent responses, retrieval tuning to adjust mechanisms used to generate responses, and model fine-tuning using traced data to further specialize the model for specific tasks.

**Ongoing Evaluation** combines offline evaluation methods like backtesting and pairwise comparisons with continuous dataset curation. The team expands their test datasets with new scenarios and edge cases for regression testing, ensuring new changes don't negatively impact existing capabilities.

## Model Distillation and Fine-Tuning

One of the more technically interesting aspects of this case study is Podium's use of model distillation. To address the conversation ending detection problem, the team adopted a strategy of upgrading to a larger model and then curating its outputs to train a smaller model. This approach leverages the quality of larger models while maintaining the cost and latency benefits of smaller ones.

LangSmith's automatic capture of model inputs and outputs in traces made this process significantly easier. The team could easily curate datasets from production traces without building custom logging infrastructure.

The team also enriched their traces with metadata including customer profiles, business types, and other business-relevant parameters. By grouping traces using specific identifiers, they could aggregate related traces during data curation, creating higher-quality and more balanced datasets that helped avoid overfitting during fine-tuning.

Pairwise evaluations were used to compare results from the fine-tuned model against the original larger model, providing a rigorous assessment of the distillation effectiveness. The results were significant: F1 scores improved from 91.7% to 98.6%, exceeding their quality threshold of 98%.

## Observability for Customer Support

A particularly valuable LLMOps pattern demonstrated in this case study is the democratization of observability beyond the engineering team. Podium's Technical Product Specialists (TPS), who typically handle customer support, were given access to LangSmith traces to troubleshoot issues in real-time.

The TPS team can now categorize issues into four types, each with different remediation paths:

- **Application bugs**: Orchestration failures like integration failures requiring engineering intervention
- **Incomplete context**: Missing information needed to answer questions, remediated by TPS adding content
- **Misaligned instructions**: Business requirement issues affecting agent behavior, remediated by TPS through the content authoring system
- **LLM issues**: Model producing unexpected or incorrect information despite having necessary context, requiring engineering intervention

The LangSmith Playground feature enables the support team to edit system outputs and determine if simple configuration changes can resolve issues without engineering involvement. This capability is a significant operational improvement, as before LangSmith, troubleshooting often required calling in engineers to review inputs and outputs, then rewrite and refactor code.

The claimed 90% reduction in engineering intervention represents a substantial operational efficiency gain, though it's worth noting this figure comes from a vendor case study and may reflect ideal conditions. Nevertheless, the underlying principle of enabling non-engineering staff to diagnose and resolve LLM-related issues through proper observability is a sound LLMOps practice.

## Results and Business Impact

The quantitative results reported include:

- F1 score improvement from 91.7% to 98.6% (a 7.5% improvement)
- 90% reduction in engineering intervention for troubleshooting
- Improved efficiency for the support team in resolving issues independently
- Improved customer satisfaction scores for both support interactions and AI-powered services

It should be noted that this case study is published by LangChain, the vendor providing the LangSmith product, so the results should be viewed with appropriate context. The specific metrics like the 90% reduction in engineering intervention are self-reported and may not be independently verified.

## Architecture and Tool Stack

Podium's technical stack includes:

- **LangChain**: Initially used for single-turn interactions, now the foundation framework
- **LangSmith**: Primary observability and testing platform for traces, dataset curation, and evaluation
- **LangGraph**: Recently integrated for agent orchestration, reportedly reducing complexity while increasing controllability

The evolution from LangChain for basic interactions to the full LangSmith observability suite to LangGraph for complex orchestration represents a typical maturation path for organizations building production LLM applications.

## Key LLMOps Takeaways

This case study illustrates several important LLMOps practices:

The importance of **comprehensive tracing** in agentic applications cannot be overstated. With 20-30 LLM calls per interaction, understanding agent behavior without proper observability is essentially impossible. The ability to enrich traces with business metadata and group related traces significantly enhances debugging and dataset curation capabilities.

**Continuous feedback loops** between production data and model improvement are essential for agentic applications. Podium's approach of collecting user feedback, running online evaluations, and continuously updating test datasets represents a mature MLOps practice applied to LLM systems.

**Model distillation** offers a practical path to balancing quality and efficiency. By using larger models to generate training data for smaller models, teams can achieve production-suitable latency and cost while maintaining high quality.

**Democratizing observability** to non-engineering teams can dramatically reduce operational burden. When support staff can diagnose and resolve issues independently, engineering resources can focus on development rather than firefighting.

Finally, the **structured categorization of issues** (bugs, missing context, misaligned instructions, LLM issues) provides a useful framework for triaging problems in LLM-powered applications and determining appropriate remediation paths.