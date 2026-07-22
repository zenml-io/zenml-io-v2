---
title: "Cost-Efficient LLM Routing with Online Learning and Thompson Sampling"
slug: "cost-efficient-llm-routing-with-online-learning-and-thompson-sampling"
draft: false
llmopsTags:
  - "data-analysis"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "redis"
  - "openai"
  - "google-gcp"
industryTags: "finance"
company: "Ramp"
summary: "Ramp built an internal LLM gateway processing trillions of tokens daily to centralize AI usage across internal development and external products. To optimize costs while maintaining reliability, they developed a dynamic, failure-aware routing system using Thompson Sampling and exponentially-weighted moving averages (EWMA) to learn real-time latency and failure distributions across different models and service tiers. This approach enabled intelligent routing that considers both model preference and performance characteristics, ultimately achieving over 25% cost savings while simultaneously reducing error rates across their LLM workloads."
link: "https://builders.ramp.com/post/thompson-sampling-model-routing"
year: 2026
seo:
  title: "Ramp: Cost-Efficient LLM Routing with Online Learning and Thompson Sampling - ZenML LLMOps Database"
  description: "Ramp built an internal LLM gateway processing trillions of tokens daily to centralize AI usage across internal development and external products. To optimize costs while maintaining reliability, they developed a dynamic, failure-aware routing system using Thompson Sampling and exponentially-weighted moving averages (EWMA) to learn real-time latency and failure distributions across different models and service tiers. This approach enabled intelligent routing that considers both model preference and performance characteristics, ultimately achieving over 25% cost savings while simultaneously reducing error rates across their LLM workloads."
  canonical: "https://www.zenml.io/llmops-database/cost-efficient-llm-routing-with-online-learning-and-thompson-sampling"
  ogTitle: "Ramp: Cost-Efficient LLM Routing with Online Learning and Thompson Sampling - ZenML LLMOps Database"
  ogDescription: "Ramp built an internal LLM gateway processing trillions of tokens daily to centralize AI usage across internal development and external products. To optimize costs while maintaining reliability, they developed a dynamic, failure-aware routing system using Thompson Sampling and exponentially-weighted moving averages (EWMA) to learn real-time latency and failure distributions across different models and service tiers. This approach enabled intelligent routing that considers both model preference and performance characteristics, ultimately achieving over 25% cost savings while simultaneously reducing error rates across their LLM workloads."
notion:
  pageId: "3a5f8dff-2538-8063-a025-fa5eacce322d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-22T07:30:00.000Z"
  lastEditedTime: "2026-07-22T07:30:00.000Z"
  publishedAt: "2026-07-22T07:39:36Z"
---

## Overview

Ramp, a financial technology company, has built a sophisticated internal LLM gateway that serves as the centralized infrastructure for all AI usage across their organization, processing trillions of tokens per day. This case study describes their implementation of an intelligent routing system that dynamically selects between different LLM models and service tiers based on real-time performance characteristics. The system demonstrates a mature approach to LLMOps in production, where cost optimization must be balanced against reliability requirements, latency constraints, and caller-specific preferences.

The problem they faced was multifaceted: operating at scale with a centralized gateway requires high reliability and efficiency, but also presents opportunities for systematic cost optimization. Their initial observation came from analyzing latency patterns across OpenAI's different service tiers (default vs. flex), where they noticed that the flex tier didn't always exhibit the expected higher latency. Further insights from customer conversations revealed that latency patterns varied significantly based on time of day, with flex tier performance degrading during business hours (9am-5pm) but remaining comparable to standard tiers outside those hours. This variability meant that any optimization strategy would need to be adaptive and learn patterns dynamically rather than relying on static rules.

## Technical Architecture and Approach

Ramp's solution centers on an LLM gateway that acts as a single point of orchestration for all AI requests. This centralization provides several advantages: it enables organized attribution of AI spend across the organization, creates opportunities for systematic optimization, and ensures consistent reliability practices across all use cases. The gateway design reflects a thoughtful consideration of production requirements, with reliability explicitly prioritized as the top concern.

The routing system embodies three core principles that guide decision-making. First, reliability is paramount—while their products are designed to be robust to LLM failures (which can occur due to provider outages, rate limiting, server-side errors, etc.), they still aim to minimize failures wherever possible. Second, latency is treated as a key component of reliability, but its importance is highly context-dependent: background automations are latency-insensitive, while user-facing features with loading spinners make latency degradation as painful as outright failures. Third, callers express model preferences through priority ordering, such as an SMS agent preferring Claude Opus 4.8 for its stylistic output but accepting GPT 5.6 as a fallback.

## Implementation Details

The routing algorithm combines two complementary statistical approaches to make intelligent decisions. For failure detection, they use an exponentially-weighted moving average (EWMA) of failure rates, considering only genuine provider-side failures to avoid penalizing models for caller errors like invalid requests. This provides a responsive but smoothed view of model reliability that can quickly detect issues like rate limiting while avoiding overreaction to transient problems.

For latency optimization, they employ Thompson Sampling, a sophisticated online learning technique that optimally balances exploration (gathering information about model performance) and exploitation (using known-good options). The implementation uses a conjugate Normal-Inverse-Gamma (NIG) prior on the unknown mean and variance of log-latency. This Bayesian approach is particularly elegant because it allows efficient online updates using pooled sufficient statistics stored in Redis. The update equations incorporate both prior beliefs and new observations, with parameters updating based on sample count, sample mean, and deviation statistics.

When routing a request, the system samples from the learned distributions to estimate the probability of a "bad outcome" for each candidate model. This probability combines two components: the direct failure probability from the EWMA, plus the conditional probability of missing the deadline given that the request doesn't fail outright. By sampling the latency distribution parameters and calculating the area under the curve beyond the deadline, they obtain a complete risk profile. This is then combined with the relative cost of each model to produce a score, allowing the system to sort candidates and attempt them in optimal order with appropriate fallbacks.

## Real-World Results and Performance

The initial deployment targeted an LLM reranker use case with a tight 6-second deadline. They expanded the preference list from two options (Gemini 3.1 Flash Lite Standard and GPT 5.4 Nano Standard) to five options including flex and priority tiers. The deployment timing proved fortuitous—it coincided with a period of high rate limiting on Gemini 3.1 Flash Lite, providing an immediate test of the system's adaptive capabilities. The routing system correctly detected the degraded performance and rerouted traffic to GPT 5.4 Nano, then automatically reverted back to Gemini once it recovered.

Interestingly, the system made a non-obvious optimization by routing to GPT 5.4 Nano Flex rather than Standard during the rerouting period. Analysis revealed that during this time window, latencies were nearly identical between the two tiers (median 1.73s vs 1.84s, p95 6.22s vs 6.34s), both well under the 6-second timeout. Since flex was half the price with equivalent performance, choosing it was indeed optimal—a decision that might not have been made by simpler heuristic approaches.

Across a broader experiment, the system achieved over 25% cost savings while simultaneously reducing error rates by 0.09 percentage points. This simultaneous improvement in both dimensions validates the core hypothesis that intelligent, adaptive routing can find efficiency gains without sacrificing reliability. They subsequently implemented a streaming-equivalent version and deployed it to Ramp Inspect, their most significant streaming use case, achieving 30% savings in that context.

## Critical Assessment and Considerations

This case study represents a sophisticated and thoughtful approach to production LLMOps, with several noteworthy strengths. The use of Thompson Sampling demonstrates statistical rigor and an understanding of the exploration-exploitation tradeoff that simpler approaches might miss. The conjugate prior approach enables efficient online learning without requiring batch processing or complex infrastructure. The centralized gateway architecture provides leverage for optimizations that benefit the entire organization. The explicit consideration of caller-specific requirements (latency sensitivity, model preferences) shows maturity in understanding that different use cases have different needs.

However, readers should consider several caveats when evaluating these results. The claimed cost savings of "more than 25%" are impressive, but the case study doesn't provide detailed baseline information or discuss what assumptions went into these calculations. Were they comparing against a naive strategy of always using the most expensive tier? The actual optimization space available depends heavily on the initial routing strategy. The simultaneous reduction in error rate, while presented as a clear win, is small (0.09 percentage points) and the statistical significance isn't discussed—this could be within normal variance.

The system's reliance on sufficient statistics and online learning means it needs adequate traffic volume to learn effectively. Use cases with low request volumes might not benefit as much, or might take longer to converge to optimal strategies. The case study doesn't discuss cold-start problems or how the system performs when new models or tiers are introduced. The Redis dependency for storing pooled statistics introduces operational complexity and a potential point of failure, though this is likely manageable for a company operating at Ramp's scale.

The approach also assumes that latency and failure patterns are relatively stable within the learning window. If patterns change very rapidly or unpredictably, the online learning might lag behind reality. The Normal-Inverse-Gamma prior assumes log-latencies follow a particular distribution, which may not hold perfectly in practice, though it's likely a reasonable approximation. The system's focus on provider-side failures is sensible, but distinguishing between provider failures and other types of errors isn't always straightforward—misclassification could lead to suboptimal learning.

## Broader LLMOps Implications

This case study illustrates several important principles for operating LLMs in production at scale. First, centralization of LLM infrastructure through a gateway pattern provides significant operational leverage, enabling organization-wide optimizations and consistent practices. Second, treating LLM selection as an online learning problem rather than a static configuration allows systems to adapt to changing conditions automatically. Third, sophisticated statistical methods can deliver tangible business value—the Thompson Sampling approach isn't just academically interesting, it demonstrably improved both cost and reliability metrics.

The work also highlights the importance of observability and measurement in LLMOps. Ramp's ability to optimize their system stemmed from careful observation of latency patterns across service tiers and times of day. Without good instrumentation and analysis, these opportunities would remain invisible. The integration of multiple factors—failure rates, latency distributions, deadlines, costs, and caller preferences—into a unified routing decision demonstrates the complexity of real-world production systems, where simple heuristics often leave significant value on the table.

For organizations considering similar approaches, the key takeaway is that intelligent routing can provide genuine wins, but requires investment in infrastructure, instrumentation, and algorithmic sophistication. The specific technique (Thompson Sampling with conjugate priors) may not be necessary for all situations—simpler multi-armed bandit approaches or even well-tuned heuristics might suffice for smaller scales or less demanding requirements. However, the general principle of adaptive, measurement-driven routing is broadly applicable and represents an important pattern in mature LLMOps practices.

The case study also implicitly demonstrates the value of service tier diversity from providers like OpenAI and Google Vertex AI. The availability of flex, standard, and priority tiers creates optimization opportunities that wouldn't exist with a single tier. This suggests that provider pricing and service tier strategies materially impact customers' ability to optimize costs, and that sophisticated customers like Ramp can leverage this complexity to their advantage while less sophisticated users might simply pay more for guaranteed performance.
