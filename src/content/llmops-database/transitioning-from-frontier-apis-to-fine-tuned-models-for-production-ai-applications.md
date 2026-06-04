---
title: "Transitioning from Frontier APIs to Fine-Tuned Models for Production AI Applications"
slug: "transitioning-from-frontier-apis-to-fine-tuned-models-for-production-ai-applications"
draft: false
llmopsTags:
  - "fine-tuning"
  - "prompt-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "agent-based"
  - "evals"
  - "vllm"
  - "serverless"
  - "open-source"
  - "scaling"
industryTags: "tech"
company: "Modal"
summary: "Modal, a serverless compute platform, observes a growing trend where AI companies transition from using frontier API models to fine-tuning custom models as their products mature and specialize. The problem centers on the limitations of frontier APIs including inability to customize beyond prompt engineering, poor cost economics at scale, and rigid latency/throughput constraints that don't match specific business requirements. The solution involves leveraging serverless compute platforms combined with open-source training libraries to make fine-tuning accessible without requiring massive infrastructure investments. Companies like Intercom and Decagon have achieved significant results, with Intercom beating frontier API performance at one-fifth the cost, demonstrating that fine-tuning enables businesses to optimize for their specific domain rather than general-purpose performance."
link: "https://www.youtube.com/watch?v=HvZXAOZ3iv8"
year: 2026
seo:
  title: "Modal: Transitioning from Frontier APIs to Fine-Tuned Models for Production AI Applications - ZenML LLMOps Database"
  description: "Modal, a serverless compute platform, observes a growing trend where AI companies transition from using frontier API models to fine-tuning custom models as their products mature and specialize. The problem centers on the limitations of frontier APIs including inability to customize beyond prompt engineering, poor cost economics at scale, and rigid latency/throughput constraints that don't match specific business requirements. The solution involves leveraging serverless compute platforms combined with open-source training libraries to make fine-tuning accessible without requiring massive infrastructure investments. Companies like Intercom and Decagon have achieved significant results, with Intercom beating frontier API performance at one-fifth the cost, demonstrating that fine-tuning enables businesses to optimize for their specific domain rather than general-purpose performance."
  canonical: "https://www.zenml.io/llmops-database/transitioning-from-frontier-apis-to-fine-tuned-models-for-production-ai-applications"
  ogTitle: "Modal: Transitioning from Frontier APIs to Fine-Tuned Models for Production AI Applications - ZenML LLMOps Database"
  ogDescription: "Modal, a serverless compute platform, observes a growing trend where AI companies transition from using frontier API models to fine-tuning custom models as their products mature and specialize. The problem centers on the limitations of frontier APIs including inability to customize beyond prompt engineering, poor cost economics at scale, and rigid latency/throughput constraints that don't match specific business requirements. The solution involves leveraging serverless compute platforms combined with open-source training libraries to make fine-tuning accessible without requiring massive infrastructure investments. Companies like Intercom and Decagon have achieved significant results, with Intercom beating frontier API performance at one-fifth the cost, demonstrating that fine-tuning enables businesses to optimize for their specific domain rather than general-purpose performance."
notion:
  pageId: "373f8dff-2538-8077-9eda-fa387749d7aa"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T19:48:00.000Z"
  lastEditedTime: "2026-06-02T19:48:00.000Z"
  publishedAt: "2026-06-04T08:02:35Z"
---

## Overview

Ben Cohan, a forward-deployed machine learning engineer at Modal, presents insights into an emerging pattern in AI application development where companies increasingly transition from using frontier API models to fine-tuning custom models as their products mature. Modal is a general-purpose serverless compute platform that provides foundational building blocks like serverless functions and hardened sandboxes for code execution. Through work with a diverse range of AI applications spanning physics simulations, quantum chemistry, voice processing, LLMs, agents, and large-scale reinforcement learning, Modal has observed that companies pursuing product differentiation and specialization eventually need to move beyond the constraints of frontier APIs.

The core thesis presented is that fine-tuning represents a critical inflection point in the lifecycle of AI products, enabling companies to achieve better performance, lower costs, and customization aligned with specific business logic. However, this transition historically required substantial infrastructure investments and expertise. The emergence of serverless compute platforms combined with accessible open-source training libraries is making fine-tuning significantly more approachable without requiring companies to manage entire training clusters or employ dedicated infrastructure teams.

## The Model Spectrum and Trade-offs

Cohan frames the decision space as a spectrum between two extremes. On one end are frontier APIs, which have undeniably unlocked unprecedented acceleration in AI application development. These APIs allow teams to build sophisticated applications exceptionally quickly without managing infrastructure. However, they come with fundamental limitations that become problematic as products scale and specialize.

The customization ceiling of frontier APIs is effectively limited to prompt engineering techniques. While creative approaches like instructing models to respond in compressed formats can reduce token consumption, these optimizations don't fundamentally address scalability challenges when a startup experiences 100x or 1000x growth. Furthermore, frontier APIs offer minimal ability to customize for specific latency or throughput requirements, which becomes critical when companies secure large enterprise contracts with strict performance SLAs. Perhaps most importantly, frontier APIs cannot be optimized for custom metrics that encapsulate specific business logic unique to each company's value proposition.

On the opposite end of the spectrum is fully custom model training, which traditionally required companies to provision and manage large GPU clusters. This approach necessitates isolating training resources from production workloads, often requiring infrastructure engineers or forcing AI engineers and data scientists to spend significant time on infrastructure concerns rather than model development. While this provides maximum customization and control, it comes with massive operational responsibility for the entire stack.

Modal positions serverless compute platforms as an emerging middle ground that provides algorithm-level control while abstracting away cluster management complexity. This approach aims to retain the fast iteration cycles characteristic of frontier APIs while enabling the customization benefits of self-hosted training.

## Signals for When Fine-Tuning Makes Sense

The presentation outlines several indicators that suggest a company may benefit from transitioning to fine-tuned models. Cost economics represent a primary signal: if optimization techniques like compressed output formats still result in API costs exceeding customer revenue, the unit economics don't scale sustainably. Similarly, when companies plateau on evaluation metrics despite prompt engineering efforts, fine-tuning offers a path to breakthrough performance improvements.

Latency and throughput constraints also signal readiness for custom models. Enterprise contracts often impose specific performance requirements that cannot be met with shared frontier API infrastructure, making dedicated fine-tuned models served on controlled infrastructure necessary.

However, Cohan emphasizes that data maturity is a prerequisite for successful fine-tuning. The classic principle of garbage in, garbage out remains valid. Companies without systematic data collection processes and mature evaluation frameworks should focus on building those foundations before investing in training. The encouraging insight is that companies that have already built production AI products likely possess most of what they need to begin fine-tuning, even if they haven't formalized it yet.

## Data and Evaluation Infrastructure

A key insight emphasized is that companies building agent-based applications already have the fundamental components needed for training custom models. If a company has built an agent harness for orchestrating LLM interactions, that same infrastructure can support reinforcement learning where models learn through practice how to provide the specific service the company offers. Similarly, if a company is already evaluating product performance and collecting data on what works and what doesn't, that evaluation data can serve directly as training data for supervised fine-tuning.

This framing repositions fine-tuning not as a distant, complex undertaking but as a natural evolution of existing product development practices. The infrastructure investments companies make in building robust evaluation systems and data collection pipelines serve dual purposes: improving current products and laying groundwork for future model customization.

## Technical Implementation Accessibility

Cohan challenges the perception that model training requires extensive infrastructure expertise or massive codebases. Modern open-source libraries have dramatically simplified implementation, with supervised fine-tuning achievable in approximately 300 lines of Python code. This represents a stark contrast to earlier eras when machine learning practitioners had to implement gradient calculations and linear algebra operations manually.

The presentation includes code snippets demonstrating that once data is curated and access to a serverless platform is established, teams can begin training quickly. Modal's examples repository provides reference implementations that teams can adapt to their specific needs.

## Reinforcement Learning at Scale

Reinforcement learning emerges as a particularly compelling use case for serverless infrastructure. While many recent machine learning graduates didn't study RL extensively during their education, modern libraries have made it accessible, again requiring only hundreds rather than thousands of lines of code to implement.

RL training involves models practicing extensively through rollouts, which are massively parallel evaluation processes. Modal's unified APIs for both sandboxes and GPU containers enable impressive scaling, with customers reportedly running 50,000 to 100,000 sandboxes simultaneously for RL training. This embarrassingly parallel workload maps naturally to serverless architectures where compute can be provisioned on-demand and terminated immediately when no longer needed.

The serverless model is particularly well-suited for hyperparameter tuning workflows, which traditionally required careful cluster resource management. With on-demand provisioning, teams can fan out to numerous parallel containers, terminating unpromising experiments immediately without concern for wasted cluster time. This creates an almost evolutionary algorithm for hyperparameter optimization where promising configurations continue while others are culled quickly.

## Model Serving and Production Deployment

Training represents only part of the production lifecycle; models must also be served efficiently. Cohan notes that what frontier APIs handle under the hood can be replicated by companies serving their own fine-tuned models. Tools like vLLM, SG Lang, and Triton Inference Server enable sophisticated model serving with relatively modest code investments. Custom inference workflows can be implemented in pure Python.

Serverless platforms provide auto-scaling capabilities that match inference capacity to incoming traffic patterns, similar to how frontier APIs handle load management. This means companies fine-tuning their own models can achieve similar operational characteristics to managed APIs while maintaining full control over model behavior, costs, and performance optimization.

## Real-World Results and Validation

The presentation cites specific examples of companies achieving significant improvements through fine-tuning. Intercom reported beating frontier API performance at one-fifth the cost, demonstrating substantial economic benefits. Pentress claimed improvements of orders of magnitude, though specific metrics weren't detailed. Decagon's perspective is highlighted as particularly insightful: frontier labs optimize their models to perform well across all possible use cases, while individual companies need models optimized specifically for their unique business logic and customer value proposition.

This fundamental misalignment between general-purpose optimization and domain-specific excellence provides the strategic rationale for fine-tuning. Companies seeking competitive differentiation need models that excel at their particular domain rather than models that perform adequately across everything.

## Strategic Recommendations and Timeline

Cohan emphasizes that the recommendation is not for all companies to immediately begin training models, but rather to recognize that fine-tuning should be considered on a much shorter timeline than many teams assume. Rather than viewing custom model training as something to pursue in a decade, companies should consider whether it might make sense within six months to a year.

This requires proactive preparation: developing robust evaluation frameworks, implementing systematic data collection, and understanding the signals that indicate readiness for fine-tuning. Companies should identify in advance what conditions would indicate that the time has come to invest in custom models, ensuring they can act decisively when those conditions materialize.

## Critical Assessment and Considerations

While the presentation makes compelling points about the accessibility and benefits of fine-tuning, it's important to note that this is fundamentally a promotional talk for Modal's serverless platform. The framing naturally emphasizes how Modal addresses pain points in the training-to-serving lifecycle. Companies should evaluate whether serverless infrastructure truly represents the optimal approach for their specific circumstances or whether managed training services, dedicated clusters, or continued use of frontier APIs might be more appropriate.

The cited results from companies like Intercom are impressive but lack detailed context about data volumes, specific use cases, and the engineering effort required to achieve those results. The claim that fine-tuning can be accomplished in 300 lines of code, while technically true for basic implementations, may understate the complexity of data curation, evaluation design, hyperparameter optimization, and ongoing model maintenance required for production systems.

The presentation also doesn't deeply explore scenarios where frontier APIs remain the superior choice. For many applications, especially those requiring extremely broad general knowledge or those without sufficient domain-specific training data, frontier models will continue to provide better results than fine-tuned alternatives. The decision to fine-tune should be based on rigorous analysis of specific business requirements rather than following industry trends.

That said, the core observation about an emerging pattern toward fine-tuning among mature AI products appears valid and reflects broader industry movement toward specialized models. The decreasing barriers to entry for model training do represent a genuine shift in what's operationally feasible for small to medium-sized teams. The emphasis on building evaluation infrastructure and data collection systems as foundational investments provides valuable guidance regardless of whether companies ultimately pursue fine-tuning through Modal or alternative approaches.

The serverless model for training workloads does offer genuine advantages for certain use cases, particularly hyperparameter search and reinforcement learning with extensive rollouts. The ability to scale to tens of thousands of parallel containers on-demand addresses real pain points in these workflows that dedicated cluster approaches handle less elegantly. However, for sustained training of very large models, dedicated infrastructure may still provide better economics and performance.

Overall, this presentation captures an important inflection point in LLMOps practice where fine-tuning transitions from an advanced technique requiring specialized infrastructure teams to a standard practice accessible to product-focused AI teams. The strategic advice to prepare proactively by investing in evaluation and data infrastructure represents sound guidance for companies building production AI systems, regardless of specific infrastructure choices.
