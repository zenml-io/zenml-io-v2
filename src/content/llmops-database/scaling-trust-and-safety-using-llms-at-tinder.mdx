---
title: "Scaling Trust and Safety Using LLMs at Tinder"
slug: "scaling-trust-and-safety-using-llms-at-tinder"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "677b9f73ee17ecccce06f36b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:53:32.660Z"
  createdOn: "2025-01-06T09:16:35.280Z"
llmopsTags:
  - "content-moderation"
  - "fraud-detection"
  - "regulatory-compliance"
  - "realtime-application"
  - "high-stakes-application"
  - "fine-tuning"
  - "prompt-engineering"
  - "few-shot"
  - "model-optimization"
  - "token-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "mistral"
  - "fastapi"
  - "vllm"
  - "hugging-face"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "Tinder"
summary: "Tinder implemented a comprehensive LLM-based trust and safety system to combat various forms of harmful content at scale. The solution involves fine-tuning open-source LLMs using LoRA (Low-Rank Adaptation) for different types of violation detection, from spam to hate speech. Using the Lorax framework, they can efficiently serve multiple fine-tuned models on a single GPU, achieving real-time inference with high precision and recall while maintaining cost-effectiveness. The system demonstrates superior generalization capabilities against adversarial behavior compared to traditional ML approaches."
link: "https://www.youtube.com/watch?v=kwnCvA9l-TY"
seo:
  title: "Tinder: Scaling Trust and Safety Using LLMs at Tinder - ZenML LLMOps Database"
  description: "Tinder implemented a comprehensive LLM-based trust and safety system to combat various forms of harmful content at scale. The solution involves fine-tuning open-source LLMs using LoRA (Low-Rank Adaptation) for different types of violation detection, from spam to hate speech. Using the Lorax framework, they can efficiently serve multiple fine-tuned models on a single GPU, achieving real-time inference with high precision and recall while maintaining cost-effectiveness. The system demonstrates superior generalization capabilities against adversarial behavior compared to traditional ML approaches."
  canonical: "https://www.zenml.io/llmops-database/scaling-trust-and-safety-using-llms-at-tinder"
  ogTitle: "Tinder: Scaling Trust and Safety Using LLMs at Tinder - ZenML LLMOps Database"
  ogDescription: "Tinder implemented a comprehensive LLM-based trust and safety system to combat various forms of harmful content at scale. The solution involves fine-tuning open-source LLMs using LoRA (Low-Rank Adaptation) for different types of violation detection, from spam to hate speech. Using the Lorax framework, they can efficiently serve multiple fine-tuned models on a single GPU, achieving real-time inference with high precision and recall while maintaining cost-effectiveness. The system demonstrates superior generalization capabilities against adversarial behavior compared to traditional ML approaches."
---

## Overview

This case study comes from a presentation at the AI Engineer World's Fair by a senior AI engineer at Tinder who has worked on trust and safety (T&S) for five years. Tinder, as the world's largest dating app, faces an enormous challenge in detecting and mitigating various forms of harmful content and behavior on their platform. The presentation covers both the problems that generative AI creates for trust and safety teams and, more importantly, the opportunities it presents for building more effective detection systems.

Trust and safety at scale involves preventing risk, reducing risk, detecting harm, and mitigating harm. The presentation focuses primarily on the detection aspect, where Tinder encounters many types of violative behavior including social media links in profiles (relatively minor but prevalent), hate speech, harassment, and sophisticated scams like "pig butchering" (low prevalence but high harm).

## The Challenge: Generative AI as Both Problem and Opportunity

The speaker acknowledges that generative AI creates significant problems for trust and safety teams. Content pollution becomes easier as bad actors can rapidly generate misinformation, propaganda, and spam. Deep fake technology lowers the barrier for impersonation and catfishing. Perhaps most concerning, organized spam and scam operations can now rapidly create profiles by generating both text and images, which renders traditional detection methods based on similarity matching or hashing increasingly ineffective.

However, the presentation pivots to emphasize the tremendous opportunities that LLMs provide. Major AI labs have already done the heavy lifting of pre-training and open-sourcing powerful language models. These models come with latent semantic capability and often global language coverage out of the box. Even simple few-shot prompting with models like Llama 3 or Mistral can effectively detect various violations.

## Training Data Creation

Creating the training dataset is described as "often the hardest part" of the process, partly because the subsequent steps have become remarkably streamlined. For fine-tuning, only hundreds to thousands of examples are required (compared to training from scratch), which necessitates creating a high-quality dataset.

The data format follows the GPT-style paradigm of text-in, text-out. The input is potentially violating text wrapped by some prompt, and the output is a classification label or extracted characters representing the violation. An example given involves detecting users who indicate they are underage in their written bio.

Tinder employs a hybrid approach to dataset creation that the speaker considers particularly effective:
- Rather than generating purely synthetic examples (which risks not resembling true data distribution), they use GPT-4 with clever prompting to make predictions on internal analytics data
- This allows them to mine examples for training sets while getting around alignment restrictions built into commercial models
- The cost scales inversely with the true prevalence of the harm being detected, but remains relatively negligible
- Heuristics can be used to restrict LLM calls to more likely candidates, further reducing costs
- Final examples undergo manual verification to fix mislabeled data and make judgment calls on ambiguous cases

## Why Fine-tuning Over API-based Detection

The speaker addresses why they don't simply use GPT-4 or similar APIs directly in production. There are two fundamental reasons:

**Scale**: Tinder has huge real-time volume of profile interactions. Hitting OpenAI APIs at that frequency doesn't scale in terms of cost, latency, or throughput.

**Maintainability**: By fine-tuning their own models, Tinder maintains full control over model weights. They can re-fine-tune when production performance inevitably degrades without worrying about changes in the underlying base model. For classification tasks specifically, they gain access to the output probability distribution, enabling confidence scores similar to traditional ML models.

## Fine-tuning Infrastructure and Tools

The open-source ecosystem has made fine-tuning remarkably accessible. The speaker notes that Hugging Face libraries reduce implementation to "a few hundred lines of code without really needing to understand anything about deep learning or Transformers." They've had success building training pipelines in notebooks, and there are libraries that abstract fine-tuning to just config files (Axolotl, Ludwig, LLaMA Factory). Managed solutions like H2O Studio and Predibase provide additional UI and dataset management support for rapid experimentation.

Parameter-efficient fine-tuning (PEFT), specifically LoRA (Low-Rank Adaptation), is described as critical to their approach. LoRA freezes the base model weights and learns only megabytes of additional weights. This enables:
- Quick fine-tuning on one or a few GPUs
- Rapid experimentation cycles
- Use of larger base models (PEFT on larger models tends to outperform full fine-tunes of smaller models for classification)

They've also had success with QLoRA, which enables fine-tuning even the largest models on a single GPU.

## Production Serving with LoRAX

In production, Tinder uses LoRAX, an open-source framework developed by Predibase that allows efficient serving of thousands of fine-tuned models on a single GPU. The key insight is that a fine-tuned LoRA adapter is only a few megabytes in size. LoRAX exploits this by shuffling and batching adapters and requests efficiently.

The speaker emphasizes a profound implication: "the marginal cost of serving a new adapter on the same base model is virtually zero." This means they can train adapters for the many different types of trust and safety violations (hate speech, promotion, catfishing, pig butchering scams, etc.) and serve all of them on one or a small set of GPUs without horizontal scaling concerns. Incorporating a new adapter is as simple as storing the weights on a file system and modifying requests to the LoRAX client.

Performance metrics on 7 billion parameter models show tens of QPS at approximately 100 milliseconds latency on A10 GPUs. For higher-frequency domains, they employ additional optimizations:
- Gating requests with heuristics (e.g., for detecting social media in profiles, only making predictions on bios containing non-dictionary words)
- Exploring cascade classification through distillation, where smaller base model adapters optimized for recall filter requests before calling larger model adapters

## Production Optimizations for Classification

The speaker notes an important advantage for classification and extraction tasks: while LLM generation is computationally expensive due to autoregressive token-by-token output, classification tasks require only one or a few tokens, keeping time-to-prediction low.

Compared to traditional NLP models, they're seeing massive improvements in precision and recall due to the higher latent semantic capability of modern LLMs. They achieve near 100% recall on simpler tasks like social handle detection and significant improvements over baseline on more semantically complex tasks.

## Generalization and Adversarial Robustness

One of the most significant benefits highlighted is improved generalization performance. In trust and safety, model performance typically degrades quickly due to the adversarial nature of automated fraud—when a rule blocks one spam wave, bad actors change behavior to circumvent it. Traditional ML models require constant retraining.

LLMs significantly slow this degradation curve. Bad actors use intentional typos, mix letters and numbers, and employ innuendos to avoid detection, but LLMs are much better at making sense of these variations. This means adapter-based models get stale less quickly than traditional ML models, providing better long-term defense against harm.

## Development Velocity

The speaker claims that by fine-tuning rather than training from scratch, combined with strong open-source library support, they've accelerated model development from months to weeks. This is a significant operational improvement for trust and safety teams that need to respond quickly to emerging threats.

## Future Directions

Tinder is exploring non-textual modalities, specifically mentioning pre-trained visual language models like LLaVA for explicit image detection. The overall vision is to rapidly train adapters for detecting harm along the "long tail" of T&S violations by:
- Creating high-quality datasets with T&S operations and policy experts using AI-in-the-loop
- Automating training and retraining pipelines for fine-tuning adapters
- Leveraging LoRAX to slot in new adapters for inference with low marginal cost

## Critical Assessment

While the presentation makes compelling technical points, it's worth noting a few caveats. The performance metrics cited (tens of QPS, ~100ms latency) are specific to their hardware and use case, and may not generalize to all deployment scenarios. The claim of near 100% recall on "simpler tasks" should be contextualized—social handle detection is relatively straightforward compared to nuanced violations like harassment or grooming.

The speaker's emphasis on the adversarial advantage of LLMs is well-founded, but it remains to be seen how well this holds up as adversaries themselves begin using LLMs to craft more sophisticated evasions. Additionally, the hybrid data creation process involving GPT-4 introduces dependencies on third-party models for training data quality, which could be a consideration for teams concerned about supply chain risks.

Overall, this case study represents a well-architected approach to deploying LLMs for content moderation at scale, with practical insights on the entire pipeline from data creation through production serving.