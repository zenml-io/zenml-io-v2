---
title: "Cost Optimization and Performance Panel Discussion: Strategies for Running LLMs in Production"
slug: "cost-optimization-and-performance-panel-discussion-strategies-for-running-llms-in-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f405ce531d1c2ecb89ca6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:41:20.625Z"
  createdOn: "2024-11-21T14:14:52.196Z"
llmopsTags:
  - "cost-optimization"
  - "customer-support"
  - "knowledge-distillation"
  - "latency-optimization"
  - "model-optimization"
  - "monitoring"
  - "open-source"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "scaling"
industryTags: "tech"
company: "Various"
summary: "A panel discussion featuring experts from Neva, Intercom, Prompt Layer, and OctoML discussing strategies for optimizing costs and performance when running LLMs in production. The panel explores various approaches from using API services to running models in-house, covering topics like model compression, hardware selection, latency optimization, and monitoring techniques. Key insights include the trade-offs between API usage and in-house deployment, strategies for cost reduction, and methods for performance optimization."
link: "https://www.youtube.com/watch?v=wxq1ZeAM9fc"
year: 2023
seo:
  title: "Various: Cost Optimization and Performance Panel Discussion: Strategies for Running LLMs in Production - ZenML LLMOps Database"
  description: "A panel discussion featuring experts from Neva, Intercom, Prompt Layer, and OctoML discussing strategies for optimizing costs and performance when running LLMs in production. The panel explores various approaches from using API services to running models in-house, covering topics like model compression, hardware selection, latency optimization, and monitoring techniques. Key insights include the trade-offs between API usage and in-house deployment, strategies for cost reduction, and methods for performance optimization."
  canonical: "https://www.zenml.io/llmops-database/cost-optimization-and-performance-panel-discussion-strategies-for-running-llms-in-production"
  ogTitle: "Various: Cost Optimization and Performance Panel Discussion: Strategies for Running LLMs in Production - ZenML LLMOps Database"
  ogDescription: "A panel discussion featuring experts from Neva, Intercom, Prompt Layer, and OctoML discussing strategies for optimizing costs and performance when running LLMs in production. The panel explores various approaches from using API services to running models in-house, covering topics like model compression, hardware selection, latency optimization, and monitoring techniques. Key insights include the trade-offs between API usage and in-house deployment, strategies for cost reduction, and methods for performance optimization."
---

## Overview

This panel discussion, moderated by Lina (an ML engineer), brings together four practitioners working with LLMs in production across different domains. The panelists include Daniel, a research scientist at Neeva (an ad-free private search solution using LLMs for summarization, semantic retrieval, and query generation); Mario, a staff engineer at Intercom who helped ship one of the early GPT-4 powered customer service chatbots; Jared, co-founder of Prompt Layer (a platform for managing production LLM applications with prompt versioning, monitoring, and performance tracking); and Luis, co-founder of OctoML (offering automated model deployment and optimization across different hardware). The discussion centers on the practical challenges of cost optimization, latency reduction, and monitoring for LLM applications in production.

## Cost Considerations and Optimization Strategies

The panel opened with a frank discussion about the economic realities of running LLMs at scale. Daniel from Neeva explained that while foundational model APIs (like OpenAI) are excellent for rapid prototyping and product validation, they become prohibitively expensive at scale. He gave a concrete example: if you want to run summarization on billions of documents in a web index, the API costs make this impossible, necessitating a move to self-hosted, smaller models.

Daniel outlined the hardware cost thresholds that guide Neeva's decisions. The golden threshold for them is whether a model can run on a single A10 GPU rather than requiring an A100. On AWS, eight A100s cost around $40/hour, while an A10 spot instance can be obtained for just $0.30/hour—a difference of more than 100x. Moving to CPU inference changes the economics even further, enabling processing of billions of items cost-effectively. For their semantic search use case, Neeva runs small query encoders (30-100 million parameters) directly on CPU, co-located with the retrieval system, which dramatically simplifies the production architecture.

The top cost optimization techniques recommended by the panelists were:

- **Model selection and optimization**: Luis from OctoML emphasized picking a model that does exactly what you need (not more), optimizing it as much as possible, and then selecting the lowest-cost hardware that meets your latency/throughput requirements.

- **Structured pruning and knowledge distillation**: Daniel explained how they take large models and systematically remove portions until they fit on target hardware. He gave a specific example of serving a FLAN-T5 11B parameter model on an A10 GPU, which physically cannot fit until at least 60% of the weights are removed through structured pruning. Knowledge distillation is then used to recover quality. At his previous role at Neural Magic, they achieved 30-50x improvements on text classification through aggressive distillation from large teacher models to small student models.

- **Simple pre-filtering**: Mario from Intercom pointed out that when using external APIs, a simple classifier before the LLM call can determine whether calling the LLM is even necessary. Not all tasks require the full power of an LLM, and detecting these cases early saves both cost and latency.

- **Reducing output length**: Mario noted that since API costs are often tied to output tokens, prompting the model to be more concise or return structured outputs can meaningfully reduce costs.

An important counterpoint was raised regarding team costs. Daniel shared an anecdote about a fintech company that needed business classification. Building an in-house ML system would require hiring ML engineers and infrastructure, costing $500-600K/year minimum. For their use case (only 10,000 examples per day), using an API without an ML team was actually more cost-efficient, even if the model was 70% accurate rather than 99%. The cost calculus shifts dramatically based on scale.

## Reliability and Control

A major factor driving the move to self-hosted models was API reliability. Daniel mentioned that while OpenAI advertises 99% uptime, their actual experience was significantly worse, with frequent outages of 15+ minutes that left them unable to serve users. Mario confirmed similar experiences at Intercom. This unreliability was "the impetus to bring this in-house" for Neeva.

Beyond reliability, self-hosting provides control over latency optimization. When using external APIs, improvements require waiting for the provider. When self-hosted, the team can optimize every aspect of the serving stack. Daniel noted they achieved 400ms response times for 20B parameter models compared to 3+ seconds from external APIs—not because of any algorithmic improvement, but simply by eliminating network round-trips and external orchestration overhead.

## Latency Optimization

The panel provided detailed technical strategies for reducing latency in production systems.

Daniel walked through Neeva's summarization latency optimization journey. They started with an external LLM taking about 3 seconds per item (30 seconds for a batch of 10). Moving to a self-hosted T5-large model on an A10 still took 8 seconds naively. The key optimizations were:

- **Faster Transformers library**: Simply switching from native PyTorch serving to NVIDIA's Faster Transformers library reduced latency from 8 seconds to 1.8 seconds—a 4x improvement with no model changes.

- **Asymmetric encoder-decoder pruning**: Since the encoder runs once to produce contextual representations while the decoder runs iteratively for each output token, they heavily compressed the decoder while preserving encoder capacity. They went from 24 layers on each side to 24 encoder layers and only 4 decoder layers.

- **Combined effect**: After applying Faster Transformers and compression, they achieved ~300ms per batch of 10—a 100x improvement from the original 30 seconds, making it feasible to generate summaries for their entire web index for around $20,000 total.

Luis from OctoML emphasized the importance of using optimized kernels and binaries specific to your hardware target. The best serving libraries (TensorRT, TVM, etc.) vary by hardware, and automating this selection can provide significant gains without any model modifications. OctoML's platform helps automate this hardware-specific optimization.

For those still using external APIs, Mario pointed out the constraints are much tighter. Options include:
- Negotiating dedicated capacity from providers for better latency/throughput characteristics
- Pre-filtering to avoid unnecessary API calls
- Streaming tokens directly to users (though this prevents content moderation before display)
- Managing user expectations through UX (showing "typing" indicators)

The panel discussed an important insight about batch sizing: when doing greedy token-by-token decoding, all sequences in a batch are limited by the longest sequence due to padding. Research from University of Washington found that in machine translation, up to 70% of tokens in batches were effectively useless padding tokens. This means high variability in output length severely impacts batching efficiency, and smaller batch sizes can paradoxically improve overall throughput for variable-length generation tasks.

## Monitoring and Evaluation

The panel identified three main approaches to monitoring LLM quality in production:

- **End-user feedback**: Direct thumbs up/down signals or behavioral proxies (refreshing, closing the page) provide the ultimate source of truth but require sufficient user engagement.

- **Human evaluation (MTurk-style)**: Hiring human annotators to evaluate outputs is reliable but expensive and slow. Mario noted that if you need GPT-4-level labeling quality, even the labeling step becomes expensive.

- **Synthetic evaluation (Critic modeling)**: Using LLMs to evaluate LLM outputs. Daniel shared that GPT-4 as an evaluator achieves accuracy within one label on a seven-point scale—comparable to trained human judges from MTurk. However, he warned about positional bias: when comparing two outputs, the model shows systematic preference for items presented first. The recommendation is to evaluate items individually rather than pairwise, and use weak supervision to derive comparative rankings if needed.

Jared from Prompt Layer noted their platform helps users understand which prompts are expensive and identify failure cases in production. Their thesis is that rather than trying to understand which prompts are "good," it's more effective to focus on identifying what's failing—which users are getting bad results, where the chatbot is being rude, etc.

Daniel shared a practical monitoring insight: tail latencies can reveal important edge cases. They discovered massive latency spikes caused by unexpectedly long documents hitting their sliding window—the fix was simply truncating after 10,000 tokens. Monitoring outliers often reveals simple fixes for significant problems.

## Trade-offs and Practical Guidance

The panel offered balanced advice for teams at different stages:

- **For teams building version one**: Jared recommended starting with GPT-4 or similar powerful models to validate the use case before worrying about optimization. Get something working first.

- **As you scale**: Move to smaller, specialized models through distillation. The iteration cycle lengthens (minutes to days/weeks for prompt changes vs. retraining), but costs become manageable.

- **Team sizing**: Daniel mentioned that at Neeva, roughly 10 people work directly with models, with about 4 people focused on the compression and optimization work.

- **Open source models**: Luis emphasized that for well-defined tasks (question answering, summarization, etc.), open source models can provide orders of magnitude cost savings compared to paying the "OpenAI or Cohere tax."

The overall message was pragmatic: understand your use case, start simple with powerful but expensive models, measure what matters, and optimize deliberately as you scale. The field is nascent, tooling is still being built, and best practices continue to evolve.