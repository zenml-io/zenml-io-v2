---
title: "Post-Training Data Curation and RL Environments for Production LLMs"
slug: "post-training-data-curation-and-rl-environments-for-production-llms"
draft: false
llmopsTags:
  - "code-generation"
  - "question-answering"
  - "classification"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "fine-tuning"
  - "prompt-engineering"
  - "reinforcement-learning"
  - "rlhf"
  - "few-shot"
  - "instruction-tuning"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "system-prompts"
  - "langchain"
  - "pytorch"
  - "fastapi"
  - "monitoring"
  - "orchestration"
  - "open-source"
  - "compliance"
  - "guardrails"
  - "scaling"
  - "google-gcp"
  - "microsoft-azure"
  - "anthropic"
industryTags: "finance"
company: "Bespoke Labs"
summary: "Bespoke Labs, an applied data research lab, addresses the critical bottleneck of high-quality data and reinforcement learning environments for post-training large language models in enterprise and frontier lab settings. Their approach involves systematic data curation pipelines for both reasoning models and autonomous agents, demonstrated through open-source projects like Open Thoughts and practical enterprise deployments. The company successfully deployed a post-trained model for Intuit's Credit Karma app to generate compliant credit card recommendations, achieving improvements in compliance metrics, latency reduction, and cost efficiency while enabling the enterprise to own and customize their models independently of frontier model updates."
link: "https://www.youtube.com/watch?v=ewtOo0scUh0"
year: 2026
seo:
  title: "Bespoke Labs: Post-Training Data Curation and RL Environments for Production LLMs - ZenML LLMOps Database"
  description: "Bespoke Labs, an applied data research lab, addresses the critical bottleneck of high-quality data and reinforcement learning environments for post-training large language models in enterprise and frontier lab settings. Their approach involves systematic data curation pipelines for both reasoning models and autonomous agents, demonstrated through open-source projects like Open Thoughts and practical enterprise deployments. The company successfully deployed a post-trained model for Intuit's Credit Karma app to generate compliant credit card recommendations, achieving improvements in compliance metrics, latency reduction, and cost efficiency while enabling the enterprise to own and customize their models independently of frontier model updates."
  canonical: "https://www.zenml.io/llmops-database/post-training-data-curation-and-rl-environments-for-production-llms"
  ogTitle: "Bespoke Labs: Post-Training Data Curation and RL Environments for Production LLMs - ZenML LLMOps Database"
  ogDescription: "Bespoke Labs, an applied data research lab, addresses the critical bottleneck of high-quality data and reinforcement learning environments for post-training large language models in enterprise and frontier lab settings. Their approach involves systematic data curation pipelines for both reasoning models and autonomous agents, demonstrated through open-source projects like Open Thoughts and practical enterprise deployments. The company successfully deployed a post-trained model for Intuit's Credit Karma app to generate compliant credit card recommendations, achieving improvements in compliance metrics, latency reduction, and cost efficiency while enabling the enterprise to own and customize their models independently of frontier model updates."
notion:
  pageId: "3b4f8dff-2538-809a-b518-fe8e6c29841a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:32:00.000Z"
  lastEditedTime: "2026-08-06T11:32:00.000Z"
  publishedAt: "2026-08-06T11:45:09Z"
---

## Overview

Bespoke Labs operates as an applied data research lab with a mission to provide enterprises and frontier labs with high-quality data and reinforcement learning environments for post-training needs. The company was founded by Mahesh Satyimi, who previously worked as a researcher and engineer at Google DeepMind. The fundamental thesis driving their work is that while compute resources, base models, and post-training infrastructure are relatively well-defined and accessible through various providers like Fireworks, Tinker, and Slime World, the primary bottleneck for successful LLM deployment in production remains access to high-quality data and RL environments for post-training.

The presentation covers both open-source research contributions and practical enterprise deployment, with a particular focus on the evolution from models that "know" things to autonomous agents that "do" things. The key insight is that achieving long-horizon autonomy in agents requires improving reliability, and post-training represents one of the most powerful levers available for this purpose.

## The Data Bottleneck in Production LLM Systems

A central theme emphasized is that data quality represents the primary constraint in post-training workflows, whether for supervised fine-tuning or reinforcement learning. In this context, RL environments are conceptualized as a specialized form of data with a different structural shape. While computational resources and model architectures are increasingly commoditized, both enterprises and frontier labs struggle with accessing and curating appropriate training data. This challenge is particularly acute for enterprises lacking in-house data science capabilities, but even frontier labs with established infrastructure face ongoing needs for high-quality RL environments.

The company positions itself uniquely by combining data curation with actual post-training work, allowing them to understand researcher needs from both sides. This dual perspective proves valuable because data curators can better optimize their work by understanding what actually moves metrics on deployed models.

## Open Thoughts: Reasoning Data Curation Pipeline

One of the major open-source contributions is Open Thoughts, both a reasoning dataset and a research paper developed in collaboration with Stanford, UC Berkeley, and University of Washington. The project originated as Bespoke Stratos following the release of DeepSeek, when the team identified a significant gap in publicly available high-quality reasoning data. While frontier labs had proprietary access to such data, the broader community lacked these resources.

The curation pipeline for Open Thoughts follows a systematic multi-stage process. It begins with source questions drawn from various existing datasets that contain prompt-response pairs, focusing on extracting prompts. The critical question becomes how to mix these sources optimally when targeting a specific dataset size, such as 10,000 samples. The mixing strategy employs LLMs to assess question quality and hardness, followed by filtering steps.

Answer generation utilizes teacher models, which can include existing reasoning models like DeepSeek, Qwen-based models, or Gemini. The pipeline also supports generating multiple answers per question or single answers, with various filtering stages applied to the generated responses. The systematic approach involves running ablations at each stage to identify what works before proceeding to the next phase.

The research established clear scaling laws demonstrating that as dataset size increases, model performance on benchmarks like AIME and LiveCodeBench improves consistently. This scalability validation was crucial for establishing the recipe's viability. The work has seen substantial adoption, with Microsoft's CTO publicly referencing it and John Schulman noting that teams at xAI have been using it internally.

## Counterintuitive Findings from Reasoning Data Curation

Several surprising insights emerged from the Open Thoughts work that challenge conventional assumptions about data curation. Perhaps most notably, sampling multiple answers per question proved significantly more effective than the alternative approach of using more unique questions with single answers each. For instance, answering one question 16 different ways outperformed having 16 different questions answered once each. The hypothesized explanation is that diverse reasoning traces for the same problem provide valuable variety in how reasoning unfolds, which benefits the fine-tuning process since the reasoning traces themselves are used during training.

Another counterintuitive finding is that stronger models do not always make better teachers. The relationship between model capability and teaching effectiveness is more nuanced than simply selecting the most powerful available model. Additionally, while synthetic question generation and question answering techniques worked well, answer filtering and certain other refinement approaches did not contribute meaningful improvements. These findings suggest that effective data curation requires empirical validation rather than relying solely on theoretical assumptions about what should work.

## Open Thoughts Agents: Trajectory and Environment Curation

Following the reasoning model work, Bespoke Labs extended their approach to autonomous agents with Open Thoughts Agents, focusing on curating both data and RL environments for training agent systems rather than pure reasoning models. The methodology mirrors the reasoning data pipeline but adapts to the specific requirements of agent training.

The pipeline again involves selecting sources like Stack Exchange and other relevant datasets, determining optimal mixing strategies, filtering, generating rollouts rather than simple answers, and selecting appropriate teacher models. Similar scaling laws were established to validate that increasing dataset size correlated with improved agent performance metrics.

The findings from agent data curation largely paralleled the reasoning model insights. Stronger models again failed to consistently serve as better teachers, with specific Qwen models outperforming Claude models in certain contexts. Sampling multiple answers continued to provide benefits, while synthetic rewriting and task augmentation, despite initial expectations, did not yield significant improvements.

A particularly important observation for practical deployment is that supervised fine-tuning contributed the majority of performance gains even in agent contexts. Reinforcement learning, while helpful for extracting the final few percentage points of improvement, proved computationally intensive. For many enterprise use cases, SFT alone delivers sufficient results, suggesting that the full complexity of RL infrastructure may not always be necessary for production deployments.

## Production Deployment: Intuit Credit Karma Case Study

The presentation includes a concrete example of post-training deployment in a production enterprise environment with Intuit's Credit Karma application. The app features a recommendation system that explains why specific credit cards are being suggested to users. While prompting a large language model can generate these explanations, the critical challenge lies in ensuring compliance with financial regulations.

The initial approach of using long lists of compliance rules in prompts created severe latency problems, making the user experience unacceptable. The solution involved curating specialized training data and performing post-training on a smaller model. However, the team encountered a specific technical challenge related to data imbalance. The dataset contained highly skewed distributions of certain values, particularly 0% APR offers, causing the fine-tuned model to hallucinate these specific numbers inappropriately in other contexts.

The breakthrough came from developing a specialized curation recipe that incorporated structural tags in the training data rather than using plain language throughout. These tags helped the model focus on the form and structure of compliant responses rather than memorizing specific numerical values. This approach draws interesting parallels to broader challenges in LLM systems around preventing hallucination and ensuring factual accuracy.

The production deployment resulted in measurable improvements across multiple dimensions. Compliance metrics improved, addressing the primary regulatory concern. Latency decreased significantly by eliminating the need for extensive compliance rules in prompts. Throughput increased, enabling the system to handle more user requests. Cost reduction was achieved by using a smaller, specialized model rather than continuously calling expensive frontier models. Perhaps most strategically important, Intuit gained ownership of their model, insulating them from frontier model updates, pricing changes, and dependency on external providers.

## Curator: Open-Source Tooling for Data Curation

To support the data curation workflows, Bespoke Labs developed Curator, an open-source tool designed to simplify the process of generating reasoning data. The tool integrates with Hugging Face datasets, allowing users to start with existing prompt collections, or supports custom workflows where enterprises have collected their own interaction logs and want to generate responses for fine-tuning.

Curator provides integrations with inference providers like Tinker and Fireworks, streamlining the process of generating large-scale synthetic data using teacher models. The tool was originally developed to support the Open Thoughts project and has since been made available to the broader community. It represents the productization of the data curation methodologies discovered through research, making these techniques accessible to organizations without deep data science expertise.

## Emerging Architecture for Agent Post-Training Systems

The presentation concludes with a vision for a comprehensive reference architecture supporting the full lifecycle of RL environment creation and agent post-training. This architecture consists of three primary layers, each addressing distinct operational concerns.

The top layer focuses on RL environment management, including how to build these environments, measure their quality through appropriate metrics, and track different versions over time as environments evolve. This layer provides the interface between the domain problems being solved and the underlying infrastructure.

The middle layer handles compute orchestration and sandbox infrastructure. For agent training, the system must spin up isolated sandboxes for generating rollouts, particularly important when dealing with long-horizon tasks. Advanced features include checkpointing mechanisms that allow pausing execution and potentially rolling back to earlier states when needed. This orchestration layer manages the complex logistics of running many parallel agent experiments.

The bottom layer encompasses the actual post-training methods, including both supervised fine-tuning and reinforcement learning implementations. Interestingly, this layer also incorporates prompt optimization techniques, specifically mentioning JAPA, a method that uses LLMs themselves to optimize prompts based on reflection. This approach has proven effective for updating system prompts and agent harnesses, representing a complementary technique to fine-tuning that may be more appropriate for certain production scenarios.

## Critical Analysis and LLMOps Implications

While the presentation demonstrates genuine technical achievements, particularly the Credit Karma deployment with measurable production impact, certain claims warrant careful consideration. The assertion that data represents the primary bottleneck may oversimplify a more complex landscape where different organizations face different constraints. For some enterprises, computational resources, engineering expertise, or evaluation methodologies may be equally limiting factors.

The open-source contributions, while valuable, are presented within the context of a company offering commercial services in this space. The scaling laws demonstrated on benchmarks from the previous year may not fully reflect current state-of-the-art performance or generalize across all domains. The counterintuitive findings about teacher model selection and answer sampling strategies, while interesting, may be specific to the particular datasets, model families, and evaluation benchmarks used.

The emphasis on SFT delivering most gains with RL providing only marginal improvements has significant implications for production LLMOps. It suggests that many organizations may be overinvesting in complex RL infrastructure when simpler fine-tuning approaches would suffice. However, this finding may also reflect the relative maturity of SFT tooling compared to RL environments, or specific characteristics of the tasks being optimized.

The Credit Karma case study demonstrates genuine production value but represents a relatively constrained use case focused on compliance and formatting rather than fundamental capability improvements. The solution using structural tags to prevent hallucination of specific values is clever but also highlights ongoing challenges in controlling LLM outputs precisely. The cost and latency improvements, while valuable, come with the tradeoff of maintaining custom models and associated infrastructure.

The proposed reference architecture appears comprehensive but also represents significant engineering complexity that may be challenging for smaller organizations to implement. The convergence with other approaches mentioned suggests emerging consensus around necessary components, but also indicates this remains an evolving rather than settled domain.

From an LLMOps perspective, the work highlights several enduring challenges in production LLM systems: the tension between frontier model capabilities and customization needs, the difficulty of ensuring compliance and reliability, the tradeoffs between prompt engineering and fine-tuning approaches, and the operational complexity of maintaining specialized models versus relying on general-purpose APIs. The emphasis on systematic data curation with empirical validation through ablation studies provides a valuable methodology that extends beyond this specific company's approach to represent best practices for production LLM development more broadly.
