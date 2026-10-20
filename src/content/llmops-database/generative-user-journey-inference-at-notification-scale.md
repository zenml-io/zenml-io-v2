---
title: "Generative User-Journey Inference at Notification Scale"
slug: "generative-user-journey-inference-at-notification-scale"
draft: false
llmopsTags:
  - "structured-output"
  - "multi-modality"
  - "fine-tuning"
  - "prompt-engineering"
  - "knowledge-distillation"
  - "embeddings"
  - "semantic-search"
  - "model-optimization"
  - "token-optimization"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "system-prompts"
  - "evals"
  - "reinforcement-learning"
  - "rlhf"
  - "vllm"
  - "scaling"
  - "load-balancing"
  - "microservices"
  - "open-source"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "nvidia"
industryTags: "tech"
company: "Pinterest"
summary: "Pinterest replaced a multi-stage keyword-clustering pipeline for identifying users’ longer-term goals with a fine-tuned 4-billion-parameter Qwen model that converts chronological activity logs into ranked, localized journey names. The system uses carefully specified prompts, synthetic data distilled from frontier models, structured-output validation, safety filtering, fallback behavior, and GPU-optimized serving through NVIDIA Dynamo and vLLM. Compared with the legacy system, Pinterest reports better consolidation, specificity, multilingual support, and noise removal; an initial US and Canada experiment showed 1.1% higher email click-through and 1.3% higher push opens, although the company notes that latent user intent has no definitive ground-truth label and that several proposed extensions remain experimental."
link: "https://medium.com/pinterest-engineering/from-activity-to-intent-generating-user-journeys-with-llms-9652b9417626"
year: 2026
seo:
  title: "Pinterest: Generative User-Journey Inference at Notification Scale - ZenML LLMOps Database"
  description: "Pinterest replaced a multi-stage keyword-clustering pipeline for identifying users’ longer-term goals with a fine-tuned 4-billion-parameter Qwen model that converts chronological activity logs into ranked, localized journey names. The system uses carefully specified prompts, synthetic data distilled from frontier models, structured-output validation, safety filtering, fallback behavior, and GPU-optimized serving through NVIDIA Dynamo and vLLM. Compared with the legacy system, Pinterest reports better consolidation, specificity, multilingual support, and noise removal; an initial US and Canada experiment showed 1.1% higher email click-through and 1.3% higher push opens, although the company notes that latent user intent has no definitive ground-truth label and that several proposed extensions remain experimental."
  canonical: "https://www.zenml.io/llmops-database/generative-user-journey-inference-at-notification-scale"
  ogTitle: "Pinterest: Generative User-Journey Inference at Notification Scale - ZenML LLMOps Database"
  ogDescription: "Pinterest replaced a multi-stage keyword-clustering pipeline for identifying users’ longer-term goals with a fine-tuned 4-billion-parameter Qwen model that converts chronological activity logs into ranked, localized journey names. The system uses carefully specified prompts, synthetic data distilled from frontier models, structured-output validation, safety filtering, fallback behavior, and GPU-optimized serving through NVIDIA Dynamo and vLLM. Compared with the legacy system, Pinterest reports better consolidation, specificity, multilingual support, and noise removal; an initial US and Canada experiment showed 1.1% higher email click-through and 1.3% higher push opens, although the company notes that latent user intent has no definitive ground-truth label and that several proposed extensions remain experimental."
notion:
  pageId: "3f7f8dff-2538-812f-a4f6-e001ccbffb4b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-12T08:30:00.000Z"
  lastEditedTime: "2026-10-12T08:30:00.000Z"
  publishedAt: "2026-10-20T14:47:22Z"
---

## Overview

Pinterest uses a production LLM system to infer the longer-term goals, or “journeys,” behind a user’s activity. A journey is more specific than a durable interest or a single clicked item: “summer dresses” is an interest, while preparing for a particular summer wedding is a journey. The output feeds notification personalization and retrieval, allowing Pinterest to recommend content related to a project or intention rather than simply reacting to the most recent interaction.

The system replaced an earlier multi-stage pipeline based on keyword extraction, text embeddings, hierarchical clustering, separate naming and ranking models, diversification, and heuristic journey-stage classification. Pinterest now frames the task as generation: a model reads a semi-static user profile and a compact chronological activity log, then emits a ranked JSON list of short journey names. A fine-tuned 4-billion-parameter Qwen student model is the production default. The reported benefits include better consolidation of related activity, more specific names, reduced incidental noise, and multilingual output. The approach is operationally significant because it combines model distillation, prompt and schema controls, safety filtering, resilient inference, large-scale GPU serving, caching, and downstream recommendation integration.

## Problem and legacy system

Pinterest’s personalization problem is longer-horizon than next-item recommendation. A cabinet click, a backsplash search, and a countertop save may collectively indicate a kitchen renovation, while an isolated celebrity click or meme interaction may not represent a meaningful goal. The company’s original journey system extracted terms from search queries, Pin annotations, and owned-board content; embedded and clustered those terms; selected representative names; ranked and diversified the resulting clusters; and used heuristics to distinguish evergreen, ongoing, and ended journeys.

That architecture was useful as a cold-start solution and remains available as a fallback. Pinterest reports that it improved email click rate by 88%, push open rate by 32%, and positive survey feedback by 23% compared with interest-based notifications. However, the stages could compound errors. Related components of one project could be fragmented into separate journeys, noisy or generic clusters could produce labels such as “Art” or “Shopping,” and a few incidental interactions could displace a genuinely important goal. The LLM system is intended to make consolidation, naming, ranking, and some noise handling a single contextual decision rather than a chain of locally optimized transformations.

## Generative formulation and prompt controls

The production input contains a user profile, owned-board names, and up to 150 activity events from a 360-day lookback. The activity is grouped by date and action to reduce token use and expose bursts of behavior. Actions are reduced to a small vocabulary such as search, save, like, click, comment, and dislike, with the prompt explicitly communicating their relative evidential strength. Searches and saves are treated as stronger signals than comments, likes, or clicks, while dislikes are retained because negative interactions can indicate that a topic should be suppressed.

The model is instructed to return up to approximately twelve distinct journeys, normally one to five words each, in the user’s locale. The intended ranking policy combines engagement strength, repeated support, recency, coherence, and specificity. It is also told not to merge unrelated subjects, to discount one-off outliers and noisy automatically generated tags, and to permit an empty result when the evidence does not support a journey. This last behavior is important: the system prefers no journey-specific notification to an invented generic label.

Pinterest uses temperature zero, disables reasoning tokens for online inference, and caps the output at 300 tokens. These settings favor deterministic and replayable behavior and reduce serving cost, though they do not guarantee semantic correctness. The output is parsed defensively: non-string values are discarded, names are deduplicated case-insensitively, and the first occurrence is retained. The company explicitly treats prompt changes as production launches because the prompt now contains much of the ranking policy, negative-signal logic, and safety behavior that had previously been distributed across model weights, thresholds, and pipeline stages.

## Model development and distillation

Frontier models were used as teachers to generate synthetic examples pairing activity histories with high-quality target journeys. Pinterest found that teacher quality improved when the teacher could use additional reasoning tokens before producing its final structured response, even though reasoning is disabled in the cost-sensitive student serving path. The resulting examples were used for supervised fine-tuning of open-weight Qwen3 models at 0.6B, 1.7B, 4B, and 8B parameters, with LoRA adapters used to update a smaller set of parameters rather than the complete model.

The reported training experience suggests that example selection mattered more than simply increasing the volume of similar data. Quality improved quickly during the first few thousand examples and then largely plateaued; diverse, difficult examples, particularly consolidation and multilingual cases, were more valuable. The smaller models offered better speed but weaker relevance and consistency on difficult cases. Pinterest selected the 4B model as the best reported balance between quality and throughput. This is a practical distillation pattern: frontier-model capability is converted into a domain-specific student that can be run repeatedly over a very large user population, but the student remains bounded by the teacher’s judgments and by the quality and coverage of the synthetic data.

## Production serving and data flow

Journey inference is primarily a batch workload with online-shaped latency requirements. Pinterest performs full refreshes when the algorithm changes and daily incremental inference for recently active or otherwise eligible users. The resulting ranked journey list is stored per user and read by notification serving at send time. Each journey name becomes a retrieval query; embedding-based retrieval finds relevant Pins, existing Pin-ranking models further rank them, and notification logic applies fatigue, explicit negative feedback, channel selection, and send-or-not decisions.

The serving stack places NVIDIA Dynamo in front of vLLM decode workers running on L40S GPUs. The frontend and decode workers scale independently. Pinterest reports using PagedAttention to reduce key-value-cache waste, continuous batching to reuse GPU slots as sequences finish, prefix caching for the long shared system prompt, chunked prefill, KV-cache-aware routing, and a cap on concurrent sequences per worker. In the reported deployment, a cluster on the order of 100 GPUs sustained approximately 775 end-to-end requests per second, with median latency around 1.2 seconds and p95 latency around 3.0 seconds. These figures are company-reported operational measurements rather than an independently reproduced benchmark.

The batch workflow is sharded into small jobs with bounded concurrency. A slow response back-pressures one shard rather than blocking the entire fan-out. Pinterest also records each user’s last inference time and skips users processed within the previous couple of days, based on the assumption that journeys generally do not change hour by hour. This freshness-aware scheduling is an important LLMOps optimization: avoiding unnecessary recomputation can provide more value than adding hardware. Failed decodes are retried for the affected user, and a valid empty JSON list is treated as a successful result rather than as an error.

## Safety, privacy, and failure handling

The system applies filtering at multiple points. Input keywords pass through a notification content filter before entering the prompt, and generated journey names pass through that filter plus generative content-safety filters. The model is instructed not to infer or target sensitive topics such as health conditions, politics, religion, sexual orientation, gender identity, or race. Profile inputs are minimized, ages are bucketed, and users under 18 in the EEA, Switzerland, and the UK are not currently eligible according to the described policy and legal constraints.

These controls reduce but do not eliminate the risks of inferring sensitive attributes from seemingly innocuous behavior. The design’s strongest protection is the combination of input minimization, explicit prohibitions, output filtering, and downstream suppression, but the case study does not provide a formal error rate for sensitive-inference prevention. The fallback to the clustering system and the allowance for empty output also provide operational safeguards against turning uncertain model behavior into an automatic notification.

## Evaluation and reported results

There is no direct ground-truth dataset for a user’s latent goal, so Pinterest evaluates the system at several levels. Same-user qualitative comparisons place legacy clustering and LLM outputs side by side, including both successes and misses such as over-generalization or under-generation. A separate language model evaluates sampled outputs for relevance to visible context, evidence support, diversity, and granularity. The support criterion is especially important: a fluent journey that is not supported by the supplied activity is considered a failure, even if it might attract a click.

An initial online experiment in the United States and Canada used the clustering system as the control and reported a 1.1% lift in email click-through and a 1.3% lift in push opens, along with multiple statistically significant sitewide engagement and retention gains. Pinterest says a later multilingual international rollout replicated the direction and that shipping both experiments increased daily, weekly, and monthly active users. The article does not provide experiment population sizes, confidence intervals, absolute baselines, or a detailed breakdown of possible notification-volume changes, so these results should be read as reported directional evidence rather than a complete independent assessment of causal impact.

## Extensions and tradeoffs

Pinterest is experimenting with semantic IDs to make Pin representations more compact than tags. An RQ-VAE encodes each Pin into five levels of 11 bits, packed into a 64-bit integer and expanded into special tokens at prompt-building time. Because a general-purpose model does not inherently understand those tokens, continued pre-training interleaves semantic-ID sequences with Pin titles and tags before supervised fine-tuning teaches the journey-generation task. The proposed benefit is lower token usage and a shared item language for recommenders and LLMs; the cost is substantially lower interpretability during debugging. A fallback ladder keeps tag prompts for users or events without enough semantic-ID coverage, and literal search text is always retained because it is considered the highest-fidelity signal.

The team is also testing safety-filtered offsite signals such as visits, add-to-carts, sign-ups, and checkouts. These remain secondary to onsite searches and saves, are used mainly when onsite activity is sparse, have capped prompt space, and are not allowed to rank offsite-only journeys at the top. Other experiments include multi-granularity journeys, jointly generated notification copy, and preference optimization using explicit Yes/No feedback plus implicit saves, clicks, and hides. Because feedback is pointwise while the model emits a ranked list, the proposed training process first optimizes individual journey preferences and then uses feedback-as-edit examples to restore list-level ranking, diversity, and formatting behavior.

Overall, the case demonstrates a mature production pattern for generative personalization: use a smaller fine-tuned model instead of an expensive general model, make the prompt an explicit policy surface, validate structured outputs, design for empty and failed results, filter both inputs and outputs, and integrate model inference with retrieval and downstream business rules. The main unresolved tradeoffs are teacher dependence, limited ground truth for intent, possible evaluator-model bias, inference cost at very large scale, loss of interpretability with semantic IDs, and the difficulty of translating individual user feedback into reliable ranked-list optimization.
