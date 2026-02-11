---
title: "Large Language Models in Production Round Table Discussion: Latency, Cost and Trust Considerations"
slug: "large-language-models-in-production-round-table-discussion-latency-cost-and-trust-considerations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f405c7fb25e79f733e2fc"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:37:29.411Z"
  createdOn: "2024-11-21T14:14:52.129Z"
llmopsTags:
  - "api-gateway"
  - "cost-optimization"
  - "data-analysis"
  - "document-processing"
  - "fine-tuning"
  - "high-stakes-application"
  - "latency-optimization"
  - "meta"
  - "model-optimization"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "scaling"
  - "security"
industryTags: "tech"
company: "Various"
summary: "A panel of experts from various companies and backgrounds discusses the challenges and solutions of deploying LLMs in production. They explore three main themes: latency considerations in LLM deployments, cost optimization strategies, and building trust in LLM systems. The discussion includes practical examples from Digits, which uses LLMs for financial document processing, and insights from other practitioners about model optimization, deployment strategies, and the evolution of LLM architectures."
link: "https://www.youtube.com/watch?v=rpjLTHrl-S4"
year: 2023
seo:
  title: "Various: Large Language Models in Production Round Table Discussion: Latency, Cost and Trust Considerations - ZenML LLMOps Database"
  description: "A panel of experts from various companies and backgrounds discusses the challenges and solutions of deploying LLMs in production. They explore three main themes: latency considerations in LLM deployments, cost optimization strategies, and building trust in LLM systems. The discussion includes practical examples from Digits, which uses LLMs for financial document processing, and insights from other practitioners about model optimization, deployment strategies, and the evolution of LLM architectures."
  canonical: "https://www.zenml.io/llmops-database/large-language-models-in-production-round-table-discussion-latency-cost-and-trust-considerations"
  ogTitle: "Various: Large Language Models in Production Round Table Discussion: Latency, Cost and Trust Considerations - ZenML LLMOps Database"
  ogDescription: "A panel of experts from various companies and backgrounds discusses the challenges and solutions of deploying LLMs in production. They explore three main themes: latency considerations in LLM deployments, cost optimization strategies, and building trust in LLM systems. The discussion includes practical examples from Digits, which uses LLMs for financial document processing, and insights from other practitioners about model optimization, deployment strategies, and the evolution of LLM architectures."
---

## Overview

This case study is derived from a roundtable discussion featuring multiple experts discussing the practical challenges and solutions for deploying large language models (LLMs) in production environments. The panel includes Rebecca (Research Engineer at Facebook AI Research focusing on NLP robustness), David (VP at Unusual Ventures with extensive MLOps experience), Honest (ML Engineer at Digits, a fintech company), and James (CEO of Bountiful, building monitoring and testing tools for foundation model workflows). The discussion is moderated by Diego Oppenheimer, who brings experience from DataRobot and Algorithmia.

The conversation provides valuable insights into real-world LLM deployments, covering everything from foundational concepts to specific production challenges around cost, latency, and trust. This is particularly valuable as it represents multiple perspectives: a researcher, a practitioner actively deploying LLMs, a VC seeing many companies attempt deployment, and a tooling provider.

## Key Definitions and Context

Rebecca provides important historical context, positioning large language models as an evolution of transfer learning rather than an entirely new paradigm. She traces the progression from statistical models in the 1990s through deep learning in 2010, the Transformer architecture in 2017, and BERT in 2018. The exponential scaling has moved from BERT Large (340 million parameters) to GPT-2 (1.5 billion), T5 (11 billion), and GPT-3 (175 billion parameters).

A key insight shared is that the "large" in LLMs may be somewhat misleading—the discussion references the "Chinchilla paper" which demonstrated that models must be "Chinchilla optimal," meaning training data must scale proportionally with parameter count. Many first-generation large models were actually undertrained, and smaller models trained on more data (like the Llama models from Meta) can outperform larger undertrained models.

The panel identifies several characteristics that make LLMs unique for production: they can be accessed via natural language (no-code interface), they are general rather than task-specific, and they don't suffer from traditional ML cold-start problems—you can begin working with them without pre-training data.

## Production Complexity Tiers

David provides an extremely useful framework for thinking about LLM production complexity in three tiers:

**Tier 1** represents the simplest applications—essentially UI wrappers that make a single API call to OpenAI or similar providers. Examples include Jasper and Copy.ai for text completion, or sales tools like Reggie and Autobound for generating sales copy. These require minimal infrastructure and were the first to achieve production success.

**Tier 2** involves incorporating external information about the world or about users into the models. This requires building infrastructure, databases, and integrations. Examples include ChatGPT (which requires conversation context), Mem (which reads historical documents and emails for personalized completion), and aptEdge (which connects to Jira, Zendesk, and Slack for customer service). Most companies are still building at this tier, which David describes as a "sea of engineering work" that people are finally completing.

**Tier 3** represents true model complexity—chaining calls, building agents that parse responses and call models iteratively, fine-tuning models, or implementing RLHF. This requires ML engineering expertise and remains challenging for most teams. David notes there's "a big difference when you give an LLM the keys to the car versus the autopilot."

James adds that his company is observing very large companies being built in Tier 2 complexity, noting that Jasper (a Tier 1 example) became an enormous company, and a second wave of companies is now emerging in Tier 2.

## Digits Case Study: Self-Hosted LLMs for Financial Data

Honest provides the most detailed production case study from Digits, a fintech company providing real-time bookkeeping for business owners and accountants. They use LLMs for multiple purposes including text generation and custom embeddings.

**Decision Process**: When evaluating whether to use OpenAI's API versus self-hosting, Digits considered several factors:

- **Privacy concerns**: As a financial services company handling sensitive data, sending data to external APIs would require changes to customer agreements and represents a significant burden
- **Latency**: Self-hosting allows models to sit close to infrastructure, reducing network overhead
- **Scale**: Processing close to 100 million transactions per day makes API calls economically and logistically challenging
- **Customization opportunity**: Self-hosting enables quantization, pruning, and domain-specific fine-tuning

**Technical Approach**: Digits uses a teacher-student approach where larger models are used to train smaller, domain-specific models. The process involves:

- Starting with open-source models (they published a blog post about their implementation)
- Fine-tuning for their specific domain
- Applying quantization to reduce model size
- Using XLA optimizations
- Profiling with tools like NVIDIA profilers
- Eventually running condensed models on CPU (achieving significant cost savings vs GPU)

Honest notes that their latency improved by "orders of magnitude" from initial deployment through optimization, and the domain-specific focus was the "biggest latency saver."

**Hallucination Mitigation**: For text generation use cases, Digits implements multiple layers of protection:
- NSFW filtering with strict thresholds (even slight ratings result in sample rejection)
- Pattern matching against known hallucination patterns
- Human-in-the-loop validation where accountants review generated content before sending to clients

## Cost-Quality-Latency Triangle

James introduces the "cost-quality-latency triangle" framework for thinking about LLM applications. Different use cases prioritize different vertices:

- **Latency-first**: Code copilots must maintain user flow state, accepting potentially lower quality for faster responses
- **Quality-first**: Legal or medical applications may accept higher latency and cost for accuracy
- **Cost-first**: High-volume batch processing may optimize for cost over speed

A real example shared: one founder's workflow involves seven different model instances (four fine-tuned Babbage, plus embeddings models), initially taking 15 seconds end-to-end. Through optimization (fine-tuning smaller models instead of using large ones), this was reduced to 3.5 seconds—still potentially too slow for some use cases.

## Latency Challenges

The panel agrees latency is significantly underappreciated. Current state-of-the-art in "lab environments" is around 29 milliseconds, but production deployments often accumulate much more latency through workflow chaining.

Rebecca explains the fundamental architectural constraint: Transformers are optimized for training (parallel processing of all tokens) but not for sequential inference. RNN-based encoding would be faster for inference, but Transformers have become dominant since 2017. She points to "State Space Models" from Stanford (the "Hungry Hungry Hippos" paper) as potential future architectures that might address this, though they currently underperform Transformers.

The discussion acknowledges that truly real-time use cases (sub-15ms) are currently out of reach for most LLM applications, though this may change rapidly.

## Trust and Hallucinations

The panel discusses "hallucinations"—outputs that aren't factually accurate. Rebecca notes this has existed in language models for years but matters more now that models are used for real-world tasks. The panel discusses several mitigation approaches:

- **Retrieval-Augmented Generation (RAG)**: Using external knowledge bases combined with retrieval to ground model outputs in verifiable sources (as Bing does by generating queries, retrieving results, and then summarizing)
- **Reference tracking**: Returning citations or sources for claims made by the model
- **Use case selection based on "affordance"**: Some use cases have high tolerance for errors (fashion recommendations) while others have low tolerance (medical diagnosis)

## Open Source Ecosystem

The discussion emphasizes the growing open-source LLM ecosystem beyond OpenAI. James recommends Discord servers for Eleuther AI, Cohere AI, and Lion as resources for understanding open-source alternatives. The panelists note that while open-source models aren't as accessible as APIs (requiring fine-tuning and engineering work), they offer portability and privacy benefits for use cases that can't send data to external APIs.

## Key Takeaways for LLMOps Practitioners

The discussion surfaces several important considerations for teams deploying LLMs:

- Most developers building on LLMs are software engineers, not ML engineers, which creates a gap when moving to Tier 3 complexity
- Cost analysis should happen upfront (back-of-envelope calculations on tokens, inferences, and margins)
- The barrier from "write a prompt" to "fine-tune a 13 billion parameter model" remains significant and intimidating
- Production systems need monitoring across the full workflow, not just individual model calls
- Privacy and data handling requirements may force self-hosting even when APIs would be easier
- Domain-specific fine-tuning offers the largest latency savings but requires ML expertise

The roundtable represents a snapshot of a rapidly evolving field—multiple panelists explicitly reserve the right to "eat their words" as the technology progresses.