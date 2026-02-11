---
title: "Building and Scaling a Production Generative AI Assistant for Professional Networking"
slug: "building-and-scaling-a-production-generative-ai-assistant-for-professional-networking"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d1676926fb748c0088d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:38:37.040Z"
  createdOn: "2024-11-21T14:00:54.843Z"
llmopsTags:
  - "api-gateway"
  - "cache"
  - "databases"
  - "embeddings"
  - "error-handling"
  - "fine-tuning"
  - "latency-optimization"
  - "microservices"
  - "microsoft-azure"
  - "monitoring"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "structured-output"
  - "token-optimization"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn developed a generative AI-powered experience to enhance job searches and professional content browsing. The system uses a RAG-based architecture with specialized AI agents to handle different query types, integrating with internal APIs and external services. Key challenges included evaluation at scale, API integration, maintaining consistent quality, and managing computational resources while keeping latency low. The team achieved basic functionality quickly but spent significant time optimizing for production-grade reliability."
link: "https://www.linkedin.com/blog/engineering/generative-ai/musings-on-building-a-generative-ai-product"
year: 2024
seo:
  title: "LinkedIn: Building and Scaling a Production Generative AI Assistant for Professional Networking - ZenML LLMOps Database"
  description: "LinkedIn developed a generative AI-powered experience to enhance job searches and professional content browsing. The system uses a RAG-based architecture with specialized AI agents to handle different query types, integrating with internal APIs and external services. Key challenges included evaluation at scale, API integration, maintaining consistent quality, and managing computational resources while keeping latency low. The team achieved basic functionality quickly but spent significant time optimizing for production-grade reliability."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-a-production-generative-ai-assistant-for-professional-networking"
  ogTitle: "LinkedIn: Building and Scaling a Production Generative AI Assistant for Professional Networking - ZenML LLMOps Database"
  ogDescription: "LinkedIn developed a generative AI-powered experience to enhance job searches and professional content browsing. The system uses a RAG-based architecture with specialized AI agents to handle different query types, integrating with internal APIs and external services. Key challenges included evaluation at scale, API integration, maintaining consistent quality, and managing computational resources while keeping latency low. The team achieved basic functionality quickly but spent significant time optimizing for production-grade reliability."
---

## Overview

LinkedIn developed a generative AI-powered assistant designed to reimagine how members search for jobs and browse professional content on the platform. Published in April 2024, this case study offers a candid look at the engineering challenges and solutions involved in building a production LLM-based product over a six-month development period. The team set out to create an experience that could turn every feed post and job listing into a "springboard" for deeper exploration—allowing users to get information faster, assess their fit for jobs, connect dots across professional content, and receive personalized career advice.

The product works by presenting users with starter questions alongside content they're viewing. When a user clicks on a question like "What are some examples of accessibility driving business value in tech companies?", the system routes the query to an appropriate AI agent, retrieves relevant information from internal and external sources, and crafts a synthesized response decorated with relevant attachments like article links or member profiles.

## Architecture and Pipeline Design

The system follows a Retrieval Augmented Generation (RAG) pattern, which the team reports was surprisingly straightforward to implement in its basic form. The pipeline consists of three main steps:

**Routing** determines whether a query is in scope and which specialized AI agent should handle it. Examples of agents include job assessment, company understanding, and post takeaways. The team used smaller, more efficient models for this classification task, building development sets and fitting them through prompt engineering and in-house models.

**Retrieval** is a recall-oriented step where the selected AI agent decides which services to call and how. This includes LinkedIn's internal services (People Search, company data, skills information, courses) as well as external APIs like Bing. The team implemented Embedding-Based Retrieval (EBR) powered by an in-memory database, which they describe as a "poor man's fine-tuning" approach to inject response examples directly into prompts.

**Generation** is a precision-oriented step that filters through the retrieved data and produces the final response. This step uses larger, more capable models and proved to follow the 80/20 rule—achieving 80% quality quickly but requiring the majority of development time to push toward the remaining 20%.

The team emphasizes that their fixed three-step pipeline worked well, with the routing and retrieval steps being more tractable due to their classification nature, while generation required significant creative effort to improve quality toward production standards.

## Organizational Structure for Development

To accelerate development across multiple teams, LinkedIn adopted a divide-and-conquer approach with independent agents developed by different teams. However, they recognized that this parallelization came at the cost of fragmentation, making it challenging to maintain a uniform user experience when subsequent interactions might be handled by different models, prompts, or tools.

Their solution involved organizing into a small "horizontal" engineering pod responsible for common components (the hosting service, evaluation tooling, global prompt templates for identity/conversation history/jailbreak defense, shared UX components, and a server-driven UI framework for releasing changes without client updates) alongside several "vertical" engineering pods with autonomy over their specific agents (personalized post summarization, job fit assessment, interview tips, etc.).

Sharing prompt templates—particularly identity definitions—along with UX templates and instrumentation helped maintain consistency across the fragmented agent ecosystem.

## Evaluation Challenges

Evaluation emerged as one of the most significant challenges in the development process. The team breaks down the challenges into three areas:

**Developing guidelines** proved difficult because the product had nuanced requirements. For example, a job assessment agent couldn't simply tell users they're a "terrible fit"—responses needed to be factual but also empathetic, recognizing that users might be contemplating career changes into fields where they don't currently have a strong fit. Ensuring these nuances were consistent across annotators was critical for reliable scoring.

**Scaling annotation** moved from an initial ad-hoc approach (with everyone on the team pitching in) to a more principled process. LinkedIn's internal linguist team built tooling and processes to evaluate up to 500 daily conversations, measuring overall quality score, hallucination rate, Responsible AI violations, coherence, style, and other metrics. This became the team's main signpost for understanding trends, iterating on prompts, and determining production readiness.

**Automatic evaluation** remains a work in progress but is described as the "holy grail." Without it, engineers are limited to eyeballing results and testing on limited example sets, with a 1+ day delay to get metrics. The team is building model-based evaluators to estimate quality metrics and enable faster experimentation, with some success on hallucination detection specifically.

The evaluation workflow spans three levels with different tradeoffs: fast, coarse evaluations by engineers for directional metrics; annotators providing more granular feedback with roughly a one-day turnaround; and member feedback providing scale but with some metrics taking 3+ days per change.

## API Integration via Skills

LinkedIn has extensive unique data about people, companies, skills, and courses that isn't part of LLM training data. To leverage this data, the team developed a "skills" abstraction that wraps internal RPC APIs in an LLM-friendly format. Each skill includes:

- A human (and LLM) friendly description of what the API does and when to use it
- Configuration to call the RPC API (endpoint, input/output schemas)
- LLM-friendly input and output schemas using primitive types and JSON schema style descriptions
- Business logic to map between LLM-friendly schemas and actual RPC schemas

The prompts ask the LLM to select which skill to use (planning) and output the parameters for invocation (function calling). The team chose YAML over JSON for structured output because it's less verbose and consumes fewer tokens.

A significant challenge emerged when approximately 10% of LLM responses contained parameters in incorrect formats—either invalid per the schema or not even valid YAML. Rather than implementing a standard re-prompting approach (which would add latency and consume GPU capacity), the team built a custom defensive YAML parser. By analyzing common mistakes, they wrote code to detect and patch these errors before parsing, and modified prompts to include hints about common mistakes. This reduced errors to approximately 0.01%.

The team is working toward a unified skill registry to dynamically discover and invoke APIs and agents packaged as LLM-friendly skills across their generative AI products.

## Quality Consistency Challenges

The team achieved 80% of their target experience within the first month but then spent an additional four months attempting to push past 95% completion. They underestimated the difficulty of detecting and mitigating hallucinations and observed quality scores that initially shot up but quickly plateaued.

The authors note that for products tolerating higher error rates, building with generative AI is "refreshingly straightforward"—but this creates unattainable expectations. The initial rapid pace created a false sense of being "almost there," which became discouraging as improvement rates slowed significantly for each subsequent 1% gain.

The development process is described as feeling like a departure from "principled" ML, more akin to tweaking rules in expert systems. While evaluation became increasingly sophisticated, "training" remained mostly prompt engineering, which the team characterizes as "more of an art than a science." They are actively working on fine-tuning LLMs to make the pipeline more data-driven.

## Capacity and Latency Management

The team faced constant tradeoffs around capacity and perceived latency:

**Quality vs Latency**: Techniques like Chain of Thought (CoT) effectively improve quality and reduce hallucinations but require generating tokens the member never sees, increasing perceived latency.

**Throughput vs Latency**: With large generative models, TimeToFirstToken (TTFT) and TimeBetweenTokens (TBT) increase with utilization, sometimes linearly for TBT. The team could achieve 2-3x the TokensPerSecond by sacrificing these metrics but initially had to keep them tightly bounded.

**Cost**: GPU clusters are expensive and scarce. Early in development, the team even had to set timetables for when it was acceptable to test the product to avoid locking out developers.

**End-to-end streaming**: Since full answers can take minutes to complete, all requests stream to reduce perceived latency. Streaming is implemented end-to-end within the pipeline—for example, the LLM response deciding which APIs to call is progressively parsed, and API calls are fired as soon as parameters are ready without waiting for the full LLM response. The final synthesized response streams all the way to the client using real-time messaging infrastructure with incremental processing for trust and Responsible AI classification.

**Async non-blocking pipeline**: Since LLM calls can take a long time, the team built a fully async non-blocking pipeline to avoid wasting resources on I/O-blocked threads.

The authors share a specific incident where these factors interacted unexpectedly: they initially only bounded TTFT since it mapped directly to member latency for their initial product. When Chain of Thought became prominent in prompts, they neglected that TBT would hurt much more—for a 200-token reasoning step, even a 10ms TBT increase means an extra 2 seconds of latency. This caused one of their public ramps to trigger alerts when some tasks hit timeouts, requiring rapid capacity increases.

The team is working on moving simpler tasks to in-house fine-tuned models, developing more predictable deployment infrastructure for LLM deployments, and reducing wasted tokens at every step.

## Honest Assessment

This case study is notably candid about challenges, which adds credibility to the findings. The team explicitly acknowledges that building with generative AI "wasn't all smooth sailing" and shares specific pain points around the gap between initial rapid progress and the difficulty of achieving production-quality results. The 80/20 dynamic—where the last 20% of quality takes most of the effort—is a recurring theme that resonates with common LLMOps experiences.

The characterization of prompt engineering as "more of an art than a science" and the comparison to "tweaking rules in expert systems" provides honest insight into the current state of LLM development practices. The team's ongoing work on fine-tuning and automated evaluation suggests they view prompt engineering as a transitional approach rather than a long-term solution.