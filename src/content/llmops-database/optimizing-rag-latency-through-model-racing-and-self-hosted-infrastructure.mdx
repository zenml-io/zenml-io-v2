---
title: "Optimizing RAG Latency Through Model Racing and Self-Hosted Infrastructure"
slug: "optimizing-rag-latency-through-model-racing-and-self-hosted-infrastructure"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908964a3a0b49d28742d680"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:25:03.880Z"
  createdOn: "2025-11-03T11:47:22.696Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "question-answering"
  - "rag"
  - "embeddings"
  - "latency-optimization"
  - "fallback-strategies"
  - "semantic-search"
  - "prompt-engineering"
  - "error-handling"
  - "fastapi"
  - "monitoring"
  - "microservices"
  - "scaling"
  - "hugging-face"
industryTags: "tech"
company: "ElevenLabs"
summary: "ElevenLabs faced significant latency challenges in their production RAG system, where query rewriting accounted for over 80% of RAG latency due to reliance on a single externally-hosted LLM. They redesigned their architecture to implement model racing, where multiple models (including self-hosted Qwen 3-4B and 3-30B-A3B models) process queries in parallel, with the first valid response winning. This approach reduced median RAG latency from 326ms to 155ms (a 50% improvement), while also improving system resilience by providing fallbacks during provider outages and reducing dependency on external services."
link: "https://elevenlabs.io/blog/engineering-rag"
year: 2025
seo:
  title: "ElevenLabs: Optimizing RAG Latency Through Model Racing and Self-Hosted Infrastructure - ZenML LLMOps Database"
  description: "ElevenLabs faced significant latency challenges in their production RAG system, where query rewriting accounted for over 80% of RAG latency due to reliance on a single externally-hosted LLM. They redesigned their architecture to implement model racing, where multiple models (including self-hosted Qwen 3-4B and 3-30B-A3B models) process queries in parallel, with the first valid response winning. This approach reduced median RAG latency from 326ms to 155ms (a 50% improvement), while also improving system resilience by providing fallbacks during provider outages and reducing dependency on external services."
  canonical: "https://www.zenml.io/llmops-database/optimizing-rag-latency-through-model-racing-and-self-hosted-infrastructure"
  ogTitle: "ElevenLabs: Optimizing RAG Latency Through Model Racing and Self-Hosted Infrastructure - ZenML LLMOps Database"
  ogDescription: "ElevenLabs faced significant latency challenges in their production RAG system, where query rewriting accounted for over 80% of RAG latency due to reliance on a single externally-hosted LLM. They redesigned their architecture to implement model racing, where multiple models (including self-hosted Qwen 3-4B and 3-30B-A3B models) process queries in parallel, with the first valid response winning. This approach reduced median RAG latency from 326ms to 155ms (a 50% improvement), while also improving system resilience by providing fallbacks during provider outages and reducing dependency on external services."
---

## Overview

ElevenLabs, an AI audio technology company, published a technical case study detailing how they optimized their production Retrieval-Augmented Generation (RAG) system to achieve 50% latency reduction. The case study focuses on conversational AI agents that operate over large enterprise knowledge bases, where RAG is integrated directly into the request pipeline and runs on every query rather than being selectively triggered as an external tool.

The core problem they faced was that their query rewriting step, which is essential for collapsing dialogue history into precise, self-contained queries, was creating a significant performance bottleneck. This step alone accounted for more than 80% of their total RAG latency, primarily because they relied on a single externally-hosted LLM. The solution involved implementing a model racing architecture with multiple parallel models and intelligent fallbacks, combined with self-hosted infrastructure.

## Technical Architecture and Problem Context

ElevenLabs' RAG system operates with a specific architecture that distinguishes it from many other implementations. Rather than treating RAG as an optional external tool that gets selectively invoked, they've integrated it directly into their request pipeline so that it executes on every query. This design decision ensures consistent accuracy across all user interactions but creates heightened sensitivity to latency issues.

The RAG pipeline consists of several key steps. First, the system performs query rewriting to handle conversational context. Since most user requests reference prior dialogue turns, the system must transform vague or contextual queries into precise, self-contained statements. For example, if a user asks "Can we customize those limits based on our peak traffic patterns?" the system rewrites this to "Can Enterprise plan API rate limits be customized for specific traffic patterns?" This transformation converts ambiguous references like "those limits" into explicit queries that retrieval systems can effectively process.

After query rewriting, the system embeds the rewritten query and retrieves the most relevant information from the knowledge base. Finally, this retrieved context is passed to the LLM to generate the response. The case study notes that for very small knowledge bases, it might be simpler to pass everything directly into the prompt, but as knowledge bases grow larger, RAG becomes essential for maintaining accuracy without overwhelming the model with excessive context.

## The Latency Bottleneck

The original architecture relied on a single externally-hosted LLM for the query rewriting step. This created a hard dependency on that specific model's speed and availability. The median latency for the RAG component was 326ms, with the 75th percentile at 436ms and the 95th percentile at 629ms. Since query rewriting accounted for over 80% of this latency, it represented the primary optimization target.

Beyond the absolute latency numbers, there were additional concerns with this architecture. External LLM providers can experience variable performance during peak demand hours, and provider outages could potentially disrupt the entire conversational flow. Since ElevenLabs runs RAG on every query rather than selectively, any latency or availability issues with query rewriting would directly impact the user experience across all interactions.

## The Model Racing Solution

ElevenLabs redesigned their query rewriting architecture around the concept of model racing. In this approach, each query is sent to multiple models simultaneously, including their self-hosted Qwen 3-4B and 3-30B-A3B models alongside external providers. The first valid response from any model "wins" and is used for the subsequent retrieval step.

This architecture provides several advantages from an LLMOps perspective. First, it reduces the median case latency by allowing faster models or less-loaded endpoints to provide responses quickly. Second, it creates natural redundancy that improves system resilience. The case study mentions that when one of their LLM providers experienced an outage, conversations continued seamlessly on their self-hosted models without user-visible disruption.

The system also includes an intelligent fallback mechanism. If no model responds within one second, the system falls back to using the user's raw message directly for retrieval, bypassing the query rewriting step entirely. While this may produce less precise retrieval results since the query won't be as well-formed, it ensures that conversations continue flowing rather than stalling or timing out. This represents a pragmatic engineering tradeoff that prioritizes availability and user experience over perfect accuracy in edge cases.

## Self-Hosted Infrastructure Strategy

A critical component of this solution is ElevenLabs' use of self-hosted models. They deployed Qwen 3-4B and 3-30B-A3B models on their own infrastructure specifically for query rewriting tasks. The case study notes that since they already operate this infrastructure for other services, the additional compute cost for query rewriting is negligible.

Self-hosted models provide several operational benefits in this context. They offer more predictable latency characteristics compared to external APIs, which can experience variable performance during peak demand. They eliminate network round-trip time to external providers. They provide complete control over model availability and capacity planning. And importantly for model racing architectures, they reduce the marginal cost of running multiple parallel inference requests.

The choice of Qwen models is interesting from a technical perspective. These are open-source models that can be self-hosted, and they're available in different size variants (4B and 30B parameters in this case). The use of multiple model sizes suggests they may be optimizing for different tradeoffs—smaller models likely provide faster inference with potentially slightly lower quality, while larger models offer better accuracy at higher latency.

## Performance Impact and Results

The implementation of model racing with self-hosted infrastructure delivered significant latency improvements. Median RAG latency dropped from 326ms to 155ms—a reduction of 52% that aligns with their "50% faster" claim. The 75th percentile improved from 436ms to 250ms (43% reduction), and the 95th percentile dropped from 629ms to 426ms (32% reduction).

These results show that the benefits are most pronounced in the median and lower percentile cases, which makes sense given the architecture. When models respond quickly, the racing approach allows the system to benefit from the fastest response. At higher percentiles, the improvement is smaller but still substantial, likely representing cases where multiple models are slower or where the fallback mechanism engages.

With median RAG latency now at 155ms, the overhead of running RAG on every query becomes negligible from a user experience perspective. For conversational agents, sub-200ms latency for the retrieval and context preparation step leaves plenty of room in the latency budget for the actual LLM generation, which typically dominates total response time.

## Critical Assessment and LLMOps Considerations

While the case study presents impressive results, there are several aspects worth examining critically from an LLMOps perspective.

First, the actual cost implications of model racing deserve scrutiny. The case study claims the additional compute cost is "negligible" since they already operate the infrastructure for other services. However, running multiple models in parallel on every query inherently multiplies compute costs for the query rewriting step. Even if infrastructure amortization helps, there's still the marginal cost of additional GPU utilization. Organizations considering this approach should carefully model their actual cost structures, as what's negligible at one scale might become significant at another.

Second, the model racing approach introduces operational complexity. The system must now manage multiple model endpoints, handle partial failures gracefully, implement the racing logic itself, and monitor the relative performance of different models. This is more complex than calling a single external API, though the benefits in terms of latency and resilience may well justify this complexity.

Third, the fallback strategy of using raw user messages when query rewriting fails or times out is pragmatic but comes with quality tradeoffs. The case study acknowledges this may produce "less precise" results. In production, it would be important to monitor how often this fallback is triggered and whether it leads to degraded user experiences or increased rates of unhelpful responses. There's a risk that optimizing purely for latency could occasionally sacrifice accuracy.

Fourth, the choice to run RAG on every query rather than selectively is interesting. Many systems use the LLM to determine whether retrieval is needed for a given query, which can save costs and latency for queries that don't benefit from external knowledge. ElevenLabs' decision suggests their use case involves knowledge bases that are almost always relevant, but this architecture choice wouldn't generalize to all scenarios.

Finally, regarding the self-hosted Qwen models, the case study doesn't provide details on model fine-tuning or adaptation. Query rewriting is a specific task that might benefit from fine-tuning on domain-specific conversation patterns. If they're using base models without adaptation, there could be additional opportunities for improvement. Conversely, if they have fine-tuned these models, that represents additional engineering effort not fully detailed in the case study.

## Broader LLMOps Lessons

This case study illustrates several important principles for LLMOps practitioners working with latency-sensitive applications.

The concept of model racing represents an interesting pattern for production systems where latency is critical. By parallelizing inference across multiple models or endpoints, systems can achieve better tail latency characteristics and improved resilience. This pattern is particularly viable when marginal inference costs are low (as with self-hosted infrastructure) or when the business value of latency reduction justifies the additional compute expense.

The hybrid approach of combining self-hosted and externally-hosted models provides a middle ground between fully outsourced and fully in-house LLM infrastructure. This allows organizations to benefit from the best external models while maintaining fallbacks and reducing dependency on any single provider. For critical production systems, this redundancy can be valuable even before considering latency benefits.

The integration of intelligent fallbacks demonstrates pragmatic engineering for production AI systems. Rather than failing when components are slow or unavailable, the system degrades gracefully by falling back to simpler approaches. This principle—having multiple tiers of response quality based on what's feasible given system state—is broadly applicable to production LLM systems.

The case study also highlights the importance of profiling and identifying bottlenecks in multi-stage LLM pipelines. By measuring that query rewriting accounted for over 80% of RAG latency, they could focus optimization efforts where they would have the most impact. Many RAG systems may have similar hidden bottlenecks that could be addressed with appropriate instrumentation and analysis.

## Implementation and Operational Considerations

From an implementation perspective, building a model racing system requires careful attention to several technical details not fully covered in the case study. The system must handle concurrent API calls efficiently, potentially using async programming patterns. It needs logic to determine what constitutes a "valid" response that can win the race—presumably some validation that the query rewriting was successful and produced a usable output.

The monitoring and observability requirements are also more complex. The system should track which models win races most frequently, the latency distribution for each model, the frequency of timeout fallbacks, and potentially the quality differences between responses from different models. This observability is essential for understanding whether the racing strategy is working as intended and for capacity planning.

Model versioning and updates become more complex with multiple models in play. If ElevenLabs updates their self-hosted Qwen models or if external providers update their models, they need to ensure consistency or at least acceptable quality across all models in the race. Gradual rollouts and A/B testing become more intricate when multiple models are simultaneously serving production traffic.

The case study mentions a one-second timeout before falling back to raw queries, which suggests they've carefully tuned this threshold based on their latency requirements. This timeout represents a tradeoff between waiting for potentially better query rewrites and maintaining responsive user experiences. Different applications would likely require different timeout values based on their specific latency budgets and quality requirements.

## Conclusion

ElevenLabs' case study demonstrates a sophisticated approach to optimizing RAG latency in production through model racing and hybrid infrastructure. The 50% latency reduction they achieved is substantial and directly impacts user experience for their conversational agents. The architecture shows mature LLMOps practices including redundancy for resilience, intelligent fallbacks for reliability, and careful optimization of the most significant bottlenecks.

However, the approach also involves tradeoffs in terms of operational complexity, compute costs, and potential quality variations that organizations should carefully consider. The success of this architecture likely depends on specific characteristics of their use case, including the consistent relevance of their knowledge bases, the availability of self-hosted infrastructure, and user expectations around response latency. While the core principles are broadly applicable, implementation details would need to be adapted to different operational contexts and requirements.