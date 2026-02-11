---
title: "Building an Enterprise LLMOps Stack: Lessons from Doordash"
slug: "building-an-enterprise-llmops-stack-lessons-from-doordash"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ba9586de633ddcc6566"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:41:41.426Z"
  createdOn: "2024-11-21T13:54:49.490Z"
llmopsTags:
  - "api-gateway"
  - "cache"
  - "compliance"
  - "cost-optimization"
  - "databases"
  - "devops"
  - "documentation"
  - "embeddings"
  - "fallback-strategies"
  - "fine-tuning"
  - "high-stakes-application"
  - "latency-optimization"
  - "model-optimization"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "rag"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
industryTags: "e-commerce"
company: "Doordash"
summary: "The ML Platform team at Doordash shares their exploration and strategy for building an enterprise LLMOps stack, discussing the unique challenges of deploying LLM applications at scale. The presentation covers key components needed for production LLM systems, including gateway services, prompt management, RAG implementations, and fine-tuning capabilities, while drawing insights from industry leaders like LinkedIn and Uber's approaches to LLMOps architecture."
link: "https://www.youtube.com/watch?v=OiyP8uUI1OU"
year: 2023
seo:
  title: "Doordash: Building an Enterprise LLMOps Stack: Lessons from Doordash - ZenML LLMOps Database"
  description: "The ML Platform team at Doordash shares their exploration and strategy for building an enterprise LLMOps stack, discussing the unique challenges of deploying LLM applications at scale. The presentation covers key components needed for production LLM systems, including gateway services, prompt management, RAG implementations, and fine-tuning capabilities, while drawing insights from industry leaders like LinkedIn and Uber's approaches to LLMOps architecture."
  canonical: "https://www.zenml.io/llmops-database/building-an-enterprise-llmops-stack-lessons-from-doordash"
  ogTitle: "Doordash: Building an Enterprise LLMOps Stack: Lessons from Doordash - ZenML LLMOps Database"
  ogDescription: "The ML Platform team at Doordash shares their exploration and strategy for building an enterprise LLMOps stack, discussing the unique challenges of deploying LLM applications at scale. The presentation covers key components needed for production LLM systems, including gateway services, prompt management, RAG implementations, and fine-tuning capabilities, while drawing insights from industry leaders like LinkedIn and Uber's approaches to LLMOps architecture."
---

## Overview

This case study is derived from a conference presentation by Hailu, who leads the ML Platform team at Doordash. The presentation focuses on exploring the LLMOps stack landscape and developing a strategy for building Doordash's own GenAI infrastructure. Rather than presenting a completed solution, this talk offers valuable insights into the thought process and considerations involved in designing an enterprise-scale LLMOps stack, drawing from industry reference architectures and learnings from other major tech companies.

The presentation opens with a humorous quote from Cassie (likely Cassie Kozyrkov, former Chief Decision Scientist at Google) about the state of enterprise GenAI implementation in 2023, suggesting that while everyone talks about implementing GenAI at scale, few actually know how to do it properly. The speaker expresses optimism that the ML community will figure this out in the coming years, similar to how MLOps matured over time.

## Key Challenges in LLM Application Development and Deployment

The speaker references a well-known blog post that highlights the unique challenges of building and deploying LLM applications across five dimensions. While not all dimensions are covered in detail, particular emphasis is placed on inference and serving challenges. The speaker notes that approximately a dozen startups have emerged specifically to address the inference hosting problem, mentioning Titan ML as one example.

For companies supporting high-scale QPS (queries per second) use cases, cost and latency become particularly important considerations. This is especially relevant for Doordash given their scale of operations in the food delivery space, where real-time responsiveness is critical.

## Proprietary vs Open-Source LLMs

A significant architectural consideration discussed is the need to support both proprietary LLMs (like those from OpenAI or Anthropic) and open-source LLMs. The speaker emphasizes that the infrastructure requirements differ significantly between these two approaches:

- Proprietary LLMs require API integration, cost management for API calls, and consideration of data privacy when sending data to external providers
- Open-source LLMs require more substantial infrastructure for hosting, but offer greater control over data and potentially lower costs at scale

Interestingly, the speaker mentions that in some use cases, one type might serve as a backup for the other for reliability or performance reasons. In other scenarios, both might be used simultaneously for the same use case. This hybrid approach adds complexity to the stack design but provides flexibility and resilience.

The speaker notes that open-source LLMs have become increasingly accessible and are particularly attractive for enterprise use cases where companies want to fine-tune models with their own domain-specific data. This is especially relevant for companies handling sensitive data where sending information to external API providers may not be acceptable.

## Application Architecture Types

The presentation references three main application architecture types that were also discussed in an earlier Databricks presentation at the same conference:

- **Prompt Engineering**: Described as the most foundational requirement for any GenAI ops. The speaker emphasizes the importance of prompt management, including versioning, release management, testing, and evaluation. Guardrails are mentioned as a potential tool for some of these areas.

- **RAG (Retrieval-Augmented Generation)**: Key components include vector databases, embedding models, and pipelines for continuously updating embeddings. This architecture requires careful consideration of data freshness and retrieval quality.

- **Fine-tuning**: The focus here is on making the process easy and cost-efficient. This includes automation around templates, training workflows, and evaluation pipelines.

## Reference Architecture Components

The speaker references a well-known reference architecture diagram (likely from a16z or similar) that lays out the components of an LLMOps stack in a thorough and thoughtful manner. One component specifically highlighted is the LLM cache component, which is particularly interesting for high QPS use cases, especially those making calls to vendor LLMs. The cache serves dual purposes: cost reduction and latency improvement. However, the speaker notes that this requires a specialized cache implementation, not a typical key-value cache, since LLM responses are not deterministic and semantic similarity must be considered.

At a higher level of abstraction, the speaker identifies several pillars or component categories that help organize thinking about the stack and inform team structure for building it out.

## Industry Examples: LinkedIn and Uber

The presentation examines LLMOps implementations from two major tech companies:

### LinkedIn's Approach (Ray Summit 2023)

LinkedIn's stack includes several notable components:
- **Gateway**: Now becoming an obvious requirement for stacks supporting both proprietary and open-source LLMs. The gateway provides a unified interface and enables routing, monitoring, and control.
- **Playground**: Designed to promote innovation and experimentation among teams
- **Trust and Responsible AI**: A significant focus given LinkedIn's brand and user base
- **Internally Hosted Models**: Given LinkedIn's handling of sensitive professional data and PII, most use cases likely rely on internally hosted models rather than external APIs. The speaker notes this is an important consideration for companies in similar spaces.

### Uber's Approach (Scale Conference July 2023)

Uber is described as one of the companies at the front of the pack in terms of platform development, driven by their scale and diverse set of use cases. Their architecture shows the Uber Gen platform as an extension built on top of their existing LLMs platform, demonstrating how GenAI capabilities can be layered onto existing ML infrastructure.

Key component areas in Uber's stack include:
- Training and tuning infrastructure
- Inference systems
- Observability tooling

## Strategic Approach to Stack Development

Rather than advocating for building every component from a reference architecture, the speaker emphasizes a pragmatic, use-case-driven approach. The key insight is that the specific use cases an organization needs to support should determine which components to build and in what order. Not every box in a reference architecture needs to be implemented, and the depth of implementation for each component should be driven by actual needs.

The speaker emphasizes three core principles for evaluating any LLMOps stack:

- **Velocity**: How quickly can teams build GenAI applications using the platform? The stack should enable rapid development and iteration.
- **Friction**: What is the barrier to entry? The focus should be on automation and tooling to minimize friction for development teams.
- **Cost**: Given that LLMs require GPUs for both fine-tuning and inference, cost management must be a first-class concern built into the stack itself, not an afterthought.

## Critical Assessment

It's worth noting that this presentation is primarily an exploration and strategy discussion rather than a post-implementation case study. While the speaker provides valuable insights into how Doordash is thinking about their LLMOps stack, specific implementation details, metrics, or results are not shared. The learnings are largely drawn from industry reference architectures and other companies' approaches rather than Doordash's own production deployments.

The presentation reflects the state of enterprise GenAI adoption in late 2023, when many organizations were still in the planning and early implementation phases. The acknowledgment that "nobody really knows how to do it" is refreshingly honest and reflects the reality that even well-resourced tech companies were still figuring out best practices for LLM deployment at scale.

The emphasis on supporting both proprietary and open-source LLMs is particularly relevant and forward-looking, as organizations increasingly recognize the need for flexibility in their AI infrastructure. The discussion of using one as a backup for the other demonstrates sophisticated thinking about reliability and resilience in production LLM systems.

## Conclusion

This presentation provides a valuable window into the strategic thinking required when designing an enterprise LLMOps stack. While not a traditional case study with implemented solutions and measurable outcomes, it offers practical guidance on component identification, prioritization, and the importance of letting use cases drive architecture decisions. The emphasis on velocity, friction, and cost as guiding principles provides a useful framework for organizations embarking on similar journeys.