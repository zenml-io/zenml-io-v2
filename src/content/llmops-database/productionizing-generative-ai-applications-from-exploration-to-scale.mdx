---
title: "Productionizing Generative AI Applications: From Exploration to Scale"
slug: "productionizing-generative-ai-applications-from-exploration-to-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d0a3acd24a6fb0fb4a0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:39:13.159Z"
  createdOn: "2024-11-21T14:00:42.493Z"
llmopsTags:
  - "cost-optimization"
  - "customer-support"
  - "devops"
  - "documentation"
  - "error-handling"
  - "fine-tuning"
  - "guardrails"
  - "high-stakes-application"
  - "latency-optimization"
  - "model-optimization"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "structured-output"
  - "translation"
industryTags: "tech"
company: "LinkedIn"
summary: "A LinkedIn product manager shares insights on bringing LLMs to production, focusing on their implementation of various generative AI features across the platform. The case study covers the complete lifecycle from idea exploration to production deployment, highlighting key considerations in prompt engineering, GPU resource management, and evaluation frameworks. The presentation emphasizes practical approaches to building trust-worthy AI products while maintaining scalability and user focus."
link: "https://www.youtube.com/watch?v=v21fCCuVMQg"
year: 2023
seo:
  title: "LinkedIn: Productionizing Generative AI Applications: From Exploration to Scale - ZenML LLMOps Database"
  description: "A LinkedIn product manager shares insights on bringing LLMs to production, focusing on their implementation of various generative AI features across the platform. The case study covers the complete lifecycle from idea exploration to production deployment, highlighting key considerations in prompt engineering, GPU resource management, and evaluation frameworks. The presentation emphasizes practical approaches to building trust-worthy AI products while maintaining scalability and user focus."
  canonical: "https://www.zenml.io/llmops-database/productionizing-generative-ai-applications-from-exploration-to-scale"
  ogTitle: "LinkedIn: Productionizing Generative AI Applications: From Exploration to Scale - ZenML LLMOps Database"
  ogDescription: "A LinkedIn product manager shares insights on bringing LLMs to production, focusing on their implementation of various generative AI features across the platform. The case study covers the complete lifecycle from idea exploration to production deployment, highlighting key considerations in prompt engineering, GPU resource management, and evaluation frameworks. The presentation emphasizes practical approaches to building trust-worthy AI products while maintaining scalability and user focus."
---

## Overview

This case study comes from a conference talk by Fizan, a senior product manager at LinkedIn, who shares practical insights from building and deploying generative AI features at scale on the LinkedIn platform. The talk, titled "Beyond the Lab: Bringing LLMs to Your Users," focuses on the end-to-end process of productionizing generative AI use cases, drawing from real-world experience building features that serve millions of users on the professional networking platform.

The speaker's background spans machine learning engineering and product management, with previous experience at Yahoo working on large-scale ML platforms and MLOps. This dual perspective of both technical implementation and product strategy provides valuable insights into the operational challenges of deploying LLMs in production environments.

## Use Cases Discussed

The talk references several LinkedIn generative AI features that the speaker worked on, including:

- **Post rewriting and polishing tools**: Helping users improve their written content, particularly valuable for English as a second language speakers or those who need assistance expressing their ideas more effectively in written form
- **Job fit evaluation**: AI-powered tools that help users assess their qualifications for specific roles and provide guidance on better positioning themselves for job opportunities
- **Creator AI experiences**: Various generative AI features designed to enhance the creator experience on the platform

These represent substantial production deployments serving LinkedIn's large user base, making the operational insights particularly valuable.

## Three-Stage Framework for GenAI Productionization

The speaker presents a structured framework divided into three stages: Explore, Build, and Measure.

### Stage 1: Exploration and User Research

A key theme throughout the talk is maintaining user-centricity despite the exciting capabilities of LLMs. The speaker emphasizes that "LLMs are just a tool" and the core focus should remain on solving user pain points. This is a refreshingly grounded perspective in an industry that sometimes leads with technology rather than user needs.

The talk advocates for "modified user experience research" that goes beyond traditional pain point identification to explore new AI-driven interaction patterns. The speaker notes that while chatbots are common, they are not the only way to integrate generative AI—there are many ways to embed GenAI features into existing products. This is an important operational consideration as it affects architecture, latency requirements, and user expectations.

The speaker shares that LinkedIn conducted user experience research in January 2023 that helped validate key assumptions about product direction. This research helped the team decide between different approaches and ultimately saved significant development time by avoiding paths that wouldn't resonate with users.

During prototyping, the recommendation is to experiment broadly with both large and small models, including open-source options, without being too prescriptive early on. This exploratory phase allows teams to challenge assumptions about user behavior and discover unexpected opportunities.

### Stage 2: Building and GPU Resource Management

A significant portion of the talk addresses the practical realities of GPU capacity budgeting, which the speaker identifies as one of the most critical resource constraints for AI products today. Several key decisions during the build phase directly impact GPU requirements.

**Prompt Engineering vs. Fine-Tuning Decision**: The speaker presents a clear preference for prompt engineering over model fine-tuning for most use cases, citing several advantages:

- Faster time to market
- Lower technical barrier to entry
- Significantly fewer GPU resources required
- Sufficient quality for the majority of production use cases

The speaker references a Microsoft research paper called "Power of Prompting" which demonstrated that GPT-4 with careful prompt engineering could outperform MedPaLM 2 (a model specifically optimized for medical questions) on medical question answering tasks. This is a compelling example of prompt engineering's potential.

More directly relevant to LLMOps practitioners, the speaker shares LinkedIn's own experience: when comparing GPT-3.5 Turbo and GPT-4, they found that with sufficient investment in prompt engineering, the smaller GPT-3.5 Turbo model could perform at par with—and sometimes better than—GPT-4 for their specific use cases. This has significant implications for cost optimization and latency in production systems.

The recommendation is nuanced: "First build a good experience, then worry about GPU cost." While this might seem contradictory to cost-consciousness, the reasoning is that foundational models are rapidly improving and becoming cheaper. The speaker points to GPT-4 Turbo being three times cheaper than the original GPT-4 while offering a four times larger context window and better performance. The advice is to optimize for user experience first, with the expectation that model costs will decrease over time.

**Prompt Iteration and Evaluation Framework**: This is perhaps the most operationally significant section of the talk. The speaker emphasizes that prompt engineering requires rigorous iteration, noting that while demos may look impressive on the first few data points, problems emerge at scale—hallucinations and edge cases become apparent when prompts are used across tens of thousands or millions of users.

The key recommendation is to treat prompts like machine learning models with proper evaluation frameworks. This means:

- Removing subjectivity from output evaluation by establishing clear, quantifiable criteria
- Setting up a comprehensive evaluation framework that serves as the "loss function" for prompt optimization
- Evaluating new prompt versions against consistent rules and datasets (a validation dataset approach)
- Measuring gaps after each iteration and improving prompts accordingly

The speaker provides a concrete example using an Expedia article generation use case to illustrate evaluation criteria development. For generating travel articles like "10 Things You Can Only Buy in Spain," evaluation dimensions might include:

- Article length conforming to specified formats
- Language matching the local language of the target country
- Article structure following defined templates
- Interest diversity ensuring content appeals to various user types (not just food enthusiasts or adventure seekers)
- Price diversity in recommendations

The speaker strongly emphasizes that there is "no shortcut" to building effective prompts—this disciplined approach to prompt evaluation is essential and is being adopted by both small startups and large enterprises.

### Stage 3: Measuring Success and Building Trust

The final stage focuses on post-launch operations, with particular emphasis on user trust in the age of generative AI. The speaker notes that trust is "more important than ever" because AI now generates content that represents the brand to users.

**Trust-Building Strategies**:

The talk uses ChatGPT's content policy response as an example of good trust-building design—when potentially problematic prompts are submitted, the system clearly explains policy violations while actively soliciting feedback and explaining the company's positions. This transparency builds user confidence.

Key trust-building recommendations for production GenAI systems include:

- **Protecting against hallucinations**: When models output nonsensical content, user trust erodes and retention suffers. This is identified as a critical operational concern that can make or break product adoption.

- **Prioritizing data differentiation**: Since many products use similar foundational models, differentiation increasingly comes from unique data assets and personalized experiences. This suggests that operational focus should include data pipelines and personalization infrastructure alongside model optimization.

- **Adaptive feedback mechanisms**: Actively promoting inclusion rather than merely avoiding bias, and communicating these adaptations back to users to reinforce trust.

**Launch and Scaling Considerations**:

The speaker emphasizes that learnings should be the primary focus at launch. With new tools solving old problems, assumptions may break and teams should be prepared to pivot based on user behavior. Measuring adoption through funnel analysis helps identify bottlenecks and understand where users drop off.

The recommended progression is: find product-market fit first, then scale (addressing GPU costs and serving millions of users), and finally monetize. Premature optimization is explicitly warned against—build a good experience first, then address scalability.

## Key LLMOps Takeaways

The talk provides several actionable insights for practitioners deploying LLMs in production:

The prompt engineering approach is validated as sufficient for most production use cases, with fine-tuning reserved for niche applications with very small margins of error. This has significant implications for team composition, infrastructure requirements, and time-to-market.

Treating prompt development with the same rigor as ML model development—complete with evaluation frameworks, validation datasets, and systematic iteration—is presented as best practice across the industry, from startups to large enterprises like LinkedIn.

GPU cost optimization should follow, not precede, user experience optimization. The rapidly improving economics of foundational models means that today's cost constraints may be less relevant as products scale.

Trust and hallucination prevention are identified as critical operational concerns that directly impact user retention and product success. These should be designed into systems from the start, not treated as afterthoughts.

The user research conducted in early 2023 highlights the importance of validating assumptions before committing to specific technical approaches, particularly given the novel interaction patterns that generative AI enables.