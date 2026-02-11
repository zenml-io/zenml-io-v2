---
title: "Evolving ML Infrastructure for Production Systems: From Traditional ML to LLMs"
slug: "evolving-ml-infrastructure-for-production-systems-from-traditional-ml-to-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6792a05e85eca492a816828c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:57:45.635Z"
  createdOn: "2025-01-23T20:02:38.953Z"
llmopsTags:
  - "question-answering"
  - "classification"
  - "structured-output"
  - "unstructured-data"
  - "realtime-application"
  - "regulatory-compliance"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "cicd"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "documentation"
  - "security"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "elasticsearch"
  - "langchain"
  - "wandb"
  - "microsoft-azure"
  - "amazon-aws"
  - "meta"
  - "openai"
industryTags: "tech"
company: "Doordash"
summary: "A comprehensive overview of ML infrastructure evolution and LLMOps practices at major tech companies, focusing on Doordash's approach to integrating LLMs alongside traditional ML systems. The discussion covers how ML infrastructure needs to adapt for LLMs, the importance of maintaining guard rails, and strategies for managing errors and hallucinations in production systems, while balancing the trade-offs between traditional ML models and LLMs in production environments."
link: "https://www.youtube.com/watch?v=zDAVzvp-Cyo&t=387s"
year: 2025
seo:
  title: "Doordash: Evolving ML Infrastructure for Production Systems: From Traditional ML to LLMs - ZenML LLMOps Database"
  description: "A comprehensive overview of ML infrastructure evolution and LLMOps practices at major tech companies, focusing on Doordash's approach to integrating LLMs alongside traditional ML systems. The discussion covers how ML infrastructure needs to adapt for LLMs, the importance of maintaining guard rails, and strategies for managing errors and hallucinations in production systems, while balancing the trade-offs between traditional ML models and LLMs in production environments."
  canonical: "https://www.zenml.io/llmops-database/evolving-ml-infrastructure-for-production-systems-from-traditional-ml-to-llms"
  ogTitle: "Doordash: Evolving ML Infrastructure for Production Systems: From Traditional ML to LLMs - ZenML LLMOps Database"
  ogDescription: "A comprehensive overview of ML infrastructure evolution and LLMOps practices at major tech companies, focusing on Doordash's approach to integrating LLMs alongside traditional ML systems. The discussion covers how ML infrastructure needs to adapt for LLMs, the importance of maintaining guard rails, and strategies for managing errors and hallucinations in production systems, while balancing the trade-offs between traditional ML models and LLMs in production environments."
---

## Overview

This case study is derived from a fireside chat between Hugo Bowne-Anderson and Faras Hammad, an ML leader at Doordash with extensive experience at Netflix, Meta, Uber, and Yahoo. The conversation provides valuable insights into how production ML systems are evolving to incorporate LLMs while maintaining traditional ML approaches, offering a practitioner's perspective on the real challenges and opportunities in LLMOps.

The discussion is particularly valuable because Faras brings a breadth of experience across multiple major tech companies, each with distinct approaches to ML infrastructure. This allows for comparative analysis of different infrastructure philosophies and how they're adapting to the generative AI era.

## Context: ML Infrastructure Across Major Tech Companies

Before diving into LLM-specific topics, Faras provides essential context about how different companies approach ML infrastructure, which directly impacts their ability to adopt LLMs:

**Uber's Michelangelo Platform**: Uber took a highly constrained approach where all model training was done via UI, with only three model architecture choices (tree-based, logistic regression, and LSTMs). This was optimized for rapid deployment and domain experts without deep ML knowledge, allowing city operations teams to quickly build models using their domain expertise.

**Netflix's Approach**: Netflix took the opposite philosophy, keeping teams small and specialized while giving data scientists full freedom to use whatever tools they preferred. The platform (including Metaflow) abstracted away infrastructure concerns while allowing complete flexibility in modeling choices. This approach would make it easier to adopt new paradigms like LLMs.

**Meta's Scale-Driven Architecture**: Meta's infrastructure is designed around the challenge of having dozens or hundreds of engineers proposing changes to the same model. The developer experience involves many checks and balances, which can slow down experimentation but is necessary at their scale.

These different philosophies directly impact how easily each organization can integrate LLMs, with more flexible architectures being better positioned for the paradigm shift.

## LLM Integration: Setting Realistic Expectations

A central theme of the discussion is the need for realistic expectations when integrating LLMs into production systems. Faras emphasizes several key points:

**High Error Rates are Inherent**: LLMs have significant error rates not just in content accuracy but also in output format consistency. Organizations must design systems that account for this variability rather than treating LLMs as reliable oracles. The transcript references Andre Karpathy's observation that LLMs "hallucinate 100% of the time" and sometimes those hallucinations coincide with ground truth.

**Design for Error Tolerance**: The discussion highlights that RLHF and DPO have optimized LLMs to "seem helpful as opposed to be accurate." This is a fundamental architectural characteristic, not a bug to be fixed. Production systems must be designed with this understanding.

**Risk-Based Deployment**: Faras recommends deploying LLMs first in low-risk scenarios where the cost of errors is minimal. An example given is using LLMs to add tags to restaurants or products, where mislabeling a long-tail item has limited business impact. As confidence grows, LLMs can be extended to higher-risk applications with appropriate guard rails.

## The Coexistence Model: LLMs and Traditional ML

The discussion presents a nuanced view of how LLMs will coexist with traditional ML rather than replacing it:

**Cost Considerations**: LLMs are orders of magnitude more expensive to run than tree-based models or simpler neural networks. For many use cases, particularly those requiring high throughput and low latency, traditional models remain the practical choice.

**Explainability Requirements**: Some use cases require high degrees of interpretability that LLMs cannot provide. Regulated industries or high-stakes decisions may need to rely on more traditional approaches.

**Ensemble Approaches**: A promising pattern is using LLMs alongside traditional models in ensemble architectures. Traditional models can act as guard rails for LLM outputs, or LLM outputs can serve as input features to more robust traditional models. This hybrid approach leverages the generative capabilities of LLMs while maintaining predictability and control.

**Bootstrapping with LLMs**: LLMs excel at bootstrapping new ML applications. An organization might start with an LLM for a new use case, then fine-tune it, and eventually train a specialized traditional model once sufficient labeled data is generated. The LLM serves as a bridge to more efficient production systems.

## Infrastructure Challenges for LLM Production

The conversation identifies several significant infrastructure challenges when productionizing LLMs:

**Breaking the "Train on Platform" Assumption**: Many existing ML platforms were built with the assumption that they only serve models trained on that platform. This creates massive disadvantages in the LLM era where organizations need to rapidly adopt open-source foundation models. Platforms must support "bring your own model" patterns.

**Changed Call Patterns**: Traditional ML serving follows a transactional pattern: content goes to a model, the serving layer calls a feature store, and a score comes back. LLMs break this pattern entirely. There's no direct equivalent to a feature store; instead, there are RAG architectures, context windows, and prompts. These require fundamentally different infrastructure.

**New Storage Requirements**: The discussion touches on the need for new types of stores beyond traditional feature stores. Potential new infrastructure components include prompt management stores, context window stores, dataset stores for fine-tuning, and evaluation stores. These shared resources across an organization mirror how feature stores emerged to address shared feature computation needs.

**Latency vs. Creativity Trade-offs**: Traditional ML platforms are often hyper-optimized for serving millions of queries per second, which requires constraints. LLM use cases often require more creative, flexible access patterns that these constraints don't accommodate. Organizations must rethink their serving infrastructure to support both paradigms.

## The Role of Open Source in LLMOps

A significant insight from the discussion is how open source is reshaping the ML landscape:

**Open Source Outpacing Big Tech**: Faras argues that open source is now outpacing traditional big tech companies in ML innovation. The sheer number of contributors and experiments in the open source community creates a pace of innovation that internal teams at large companies cannot match.

**Democratization of ML**: Five years ago, serious ML work required being at a large company with substantial compute resources and data. Today, open-source tools and foundation models enable individuals and small teams to build sophisticated ML applications. An individual with AWS credits and Metaflow can potentially move faster than teams at large companies burdened with legacy systems.

**Building for Flexibility**: Given the rapid pace of open-source innovation, production systems must be designed for change. The Metaflow philosophy of separating user code from infrastructure code allows rapid evolution as new tools and models become available.

## Knowledge Graphs: A Complementary Technology

The discussion includes an interesting perspective on knowledge graphs as a technology that complements LLMs:

**Deriving Facts vs. Predicting Tokens**: Knowledge graphs can derive new facts from existing relationships with certainty, while LLMs are probabilistic token predictors. The example given is that knowing Malia is Barack Obama's daughter and Sasha is Malia's sister allows deriving with confidence that Sasha is Barack Obama's daughter.

**Addressing LLM Weaknesses**: Knowledge graphs can address specific weaknesses in LLMs, such as the inability to reliably track family relationships. The Tom Cruise's mother example illustrates how LLMs can fail at relationships that knowledge graphs handle naturally.

## Organizational Considerations for LLMOps

The discussion touches on organizational structures that support successful ML and LLMOps:

**Embedded vs. Centralized Data Science**: Faras discusses the trade-offs between centralized data science teams acting as internal consultants versus embedded data scientists who build domain expertise. For LLMOps success, domain knowledge is crucial because understanding what data is relevant and what metrics matter is often more important than raw ML expertise.

**Cross-Functional Collaboration**: Physical proximity between infrastructure and data science teams (as seen at Bloomberg's London office) fosters the incidental conversations that improve collaboration. Platform engineers should use their own products, and data scientists should involve platform partners early in projects.

**Shared Language for Testing**: A significant challenge is developing shared understanding between software engineers and ML practitioners around concepts like testing. Software engineers expect tests to pass 100% of the time, while ML practitioners expect statistical evaluation where 100% pass rates would be suspicious. LLMOps requires developing new shared vocabulary around evaluation.

## Looking Forward: Predictions and Cautions

Faras offers some cautious predictions for the future of LLMOps:

**The Trough of Despair**: Within the next one to two years, the limitations of current LLMs will become more widely understood, potentially leading to an over-correction in expectations. Organizations should prepare for a period where LLM hype gives way to more realistic assessments.

**Continued Coexistence**: Traditional ML models will continue to be used alongside LLMs. Tree-based models and simpler architectures will remain dominant for many production use cases due to their cost, speed, and interpretability advantages.

**Design for Change**: The single most important principle is designing systems that can evolve quickly. The pace of change in AI means that today's best practices may be obsolete within months. Flexible infrastructure that can pivot rapidly will be essential for long-term success.

This discussion provides a grounded, practitioner's perspective on LLMOps that balances enthusiasm for new capabilities with hard-earned wisdom about the realities of production ML systems.