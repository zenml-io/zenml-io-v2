---
title: "Training Low-Resource Language Models with Custom Tokenization and Kernel Optimization"
slug: "training-low-resource-language-models-with-custom-tokenization-and-kernel-optimization"
draft: false
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "fine-tuning"
  - "token-optimization"
  - "model-optimization"
  - "pytorch"
  - "triton"
  - "monitoring"
  - "open-source"
  - "scalability"
  - "amazon-aws"
  - "hugging-face"
  - "meta"
  - "nvidia"
industryTags: "telecommunications"
company: "Azercell"
summary: "Azercell Telecom, Azerbaijan's leading telecommunications provider, partnered with AWS Generative AI Innovation Center to build an Azerbaijani large language model for telecom use cases and customer-facing chatbots. The challenge was adapting foundation models to a morphologically rich, low-resource language with limited training data. Over six weeks, they developed a three-stage production-ready framework on Amazon SageMaker AI: custom tokenizer development, continued pre-training with distributed training optimizations, and supervised fine-tuning with LoRA. The solution achieved 2× improved encoding efficiency through custom tokenization, 23% higher training throughput and 58% lower peak GPU memory usage through FSDP and Liger Kernel optimizations, and produced coherent Azerbaijani conversational responses where the base model failed."
link: "https://aws.amazon.com/blogs/machine-learning/training-azerbaijani-language-models-on-amazon-sagemaker-ai/"
year: 2026
seo:
  title: "Azercell: Training Low-Resource Language Models with Custom Tokenization and Kernel Optimization - ZenML LLMOps Database"
  description: "Azercell Telecom, Azerbaijan's leading telecommunications provider, partnered with AWS Generative AI Innovation Center to build an Azerbaijani large language model for telecom use cases and customer-facing chatbots. The challenge was adapting foundation models to a morphologically rich, low-resource language with limited training data. Over six weeks, they developed a three-stage production-ready framework on Amazon SageMaker AI: custom tokenizer development, continued pre-training with distributed training optimizations, and supervised fine-tuning with LoRA. The solution achieved 2× improved encoding efficiency through custom tokenization, 23% higher training throughput and 58% lower peak GPU memory usage through FSDP and Liger Kernel optimizations, and produced coherent Azerbaijani conversational responses where the base model failed."
  canonical: "https://www.zenml.io/llmops-database/training-low-resource-language-models-with-custom-tokenization-and-kernel-optimization"
  ogTitle: "Azercell: Training Low-Resource Language Models with Custom Tokenization and Kernel Optimization - ZenML LLMOps Database"
  ogDescription: "Azercell Telecom, Azerbaijan's leading telecommunications provider, partnered with AWS Generative AI Innovation Center to build an Azerbaijani large language model for telecom use cases and customer-facing chatbots. The challenge was adapting foundation models to a morphologically rich, low-resource language with limited training data. Over six weeks, they developed a three-stage production-ready framework on Amazon SageMaker AI: custom tokenizer development, continued pre-training with distributed training optimizations, and supervised fine-tuning with LoRA. The solution achieved 2× improved encoding efficiency through custom tokenization, 23% higher training throughput and 58% lower peak GPU memory usage through FSDP and Liger Kernel optimizations, and produced coherent Azerbaijani conversational responses where the base model failed."
notion:
  pageId: "373f8dff-2538-8004-bf5e-e044fe57b216"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:01:00.000Z"
  lastEditedTime: "2026-06-02T07:01:00.000Z"
  publishedAt: "2026-06-02T07:10:54Z"
---

## Overview

Azercell Telecom LLC, Azerbaijan's leading telecommunications provider, embarked on an ambitious project to develop a production-ready large language model tailored specifically for the Azerbaijani language. This case study represents a significant LLMOps challenge: adapting foundation models to low-resource, morphologically complex languages where existing training blueprints and readily available datasets don't exist. Working with the AWS Generative AI Innovation Center over a six-week period, Azercell established a complete training pipeline on Amazon SageMaker AI that addresses the unique challenges of underrepresented languages while maximizing computational efficiency.

The business motivation centers on enabling telecom-specific use cases and powering customer-facing chatbots in Azerbaijani. However, standard foundation models trained predominantly on English and other high-resource languages perform poorly on Azerbaijani, often producing repetitive, incoherent output. The project required building infrastructure that could handle the full lifecycle from data preparation through deployment, with particular emphasis on efficient tokenization for morphologically rich languages and memory-optimized training at scale.

## Technical Architecture and Pipeline Design

The solution implements a three-stage sequential pipeline where each stage produces artifacts that feed into the next. This modular architecture allows for independent optimization of each component and supports iterative improvement without requiring full pipeline reruns.

**Stage 1: Custom Tokenizer Development** addresses the fundamental challenge that standard English-optimized tokenizers fragment Azerbaijani words excessively. Azerbaijani is morphologically rich, meaning single words encode grammatical information through suffixes that English would express using multiple separate words. For example, "kitablardan" (meaning "from the books") contains grammatical markers for plurality and the ablative case all within a single word form. Standard tokenizers trained on English split such words into multiple subword tokens, which effectively reduces the amount of actual content that fits within a model's fixed-size context window.

The team evaluated three distinct approaches: using baseline English-optimized tokenizers directly, extending existing vocabularies with Azerbaijani tokens, and training custom monolingual tokenizers from scratch. They implemented Byte-Level Byte-Pair Encoding (BBPE), which starts from raw bytes rather than predefined character sets, providing complete coverage of Azerbaijani-specific characters without manual alphabet definitions. The algorithm iteratively merges the most frequent byte pairs into vocabulary entries. Experiments varied vocabulary size from 50,000 to 100,000 tokens to balance competing concerns: vocabularies that are too small fragment words excessively, while vocabularies that are too large dilute training signal across rare tokens.

The custom tokenizer was trained using the Hugging Face tokenizers library with the same configuration parameters as the native Llama 3.2 tokenizer, varying only the vocabulary size. After systematic evaluation, they selected a 100,000-token vocabulary as optimal. A critical validation step ensured that improved encoding efficiency didn't come at the cost of modeling quality. Rather than comparing perplexity directly (which would be biased by vocabulary differences), they measured Bits-Per-Byte (BPB), which normalizes for vocabulary by measuring prediction quality at the byte level. The custom tokenizer achieved 0.5795 BPB on the validation set compared to 0.6830 for the baseline, confirming improved efficiency without quality degradation.

The practical impact is substantial. Encoding efficiency is quantified through "fertility score"—the average number of tokens per word, where lower values indicate more efficient encoding. The baseline Llama 3.2 tokenizer averaged 3.22 tokens per Azerbaijani word, while the custom monolingual tokenizer achieved 1.59—a 2× improvement in encoding efficiency. Given Llama 3.2's 128,000-token context window, this translates to approximately 40,000 words with the baseline tokenizer versus 80,000 words with the optimized version, effectively doubling the content the model can consider at once. This has direct implications for downstream applications like document understanding and multi-turn conversations.

**Stage 2: Continued Pre-Training (CPT)** adapts the base Llama 3.2 1B foundation model to understand Azerbaijani language patterns. While the 1B parameter scale didn't strictly require distributed training, the team deliberately designed and validated distributed training infrastructure so that scaling to larger models (such as Llama 3.1 8B or beyond) would require only configuration changes rather than architectural redesign.

The primary bottleneck for this stage is GPU memory utilization. A model's memory footprint includes not just the weights themselves, but also gradients, optimizer states, and activations—components that can exceed 100 GB for larger models in mixed precision. The team benchmarked two instance types: ml.p4d.24xlarge (8× NVIDIA A100 GPUs) and ml.p5.48xlarge (8× NVIDIA H100 GPUs), implementing two complementary optimization approaches.

First, they implemented Fully Sharded Data Parallel (FSDP) from PyTorch, which addresses the fundamental limitation of standard Distributed Data Parallel (DDP) approaches. DDP replicates the complete model on each GPU, which severely limits achievable batch sizes and model scales. FSDP instead shards parameters, gradients, and optimizer states across GPUs, dynamically gathering only what's needed during each computation step. This approach reduced per-GPU model state memory from 9.23 GB to 1.17 GB on ml.p4d.24xlarge instances, freeing substantial headroom for larger batch sizes.

Second, they integrated Liger Kernels—memory-efficient, Triton-based implementations of common LLM operations. Liger Kernels fuse multiple operations into single GPU kernel launches, reducing intermediate memory allocations while producing numerically equivalent results to standard implementations. Integration required minimal code changes: a single function call patches the model with optimized kernels before instantiation. Importantly, Liger Kernels work seamlessly with PyTorch FSDP without requiring modifications to the distributed training setup. The team validated correct execution using PyTorch Profiler, confirming that fused operations appeared correctly in execution traces.

The cumulative impact of these optimizations is substantial. On ml.p4d.24xlarge instances, the full optimization stack delivered a 7× increase in maximum batch size over DDP (from 2 to 14 samples per GPU). On ml.p5.48xlarge instances, adding Liger Kernels to FSDP enabled batch sizes of 18 per GPU (versus 10 with FSDP alone and 4 with DDP), while reducing peak GPU memory by 58% (from 64 GB to 27 GB) and increasing per-GPU throughput by 23% (from 63,771 to 78,319 tokens per second).

The pre-training corpus totaled approximately 2.5 billion tokens when encoded with the custom Azerbaijani tokenizer. Training used a 2,048-token context window, chosen because over 90% of training samples fell below this length, though the configuration supports the model's full 128,000-token native limit. The training script supports BFloat16 mixed precision, cosine learning rate scheduling with AdamW optimizer, and automatic checkpointing to Amazon S3 for fault tolerance.

When new tokens are added to a model's vocabulary (as required for the custom tokenizer), CPT follows a two-phase approach. Phase 1 freezes the model backbone and trains only the embedding layer for 5,000 steps with a learning rate of 0.0032. This adapts the new token representations to the model's existing internal representation space without disrupting pre-trained knowledge. Phase 2 unfreezes all parameters for full training over 15,000 steps with a learning rate of 0.0024. The lower learning rate in the full-training phase preserves knowledge acquired during embedding adaptation. Training ran on two ml.p4d.24xlarge instances (16 NVIDIA A100 GPUs total) with batch size 14 per GPU, yielding an effective batch size of 224. Each step processed approximately 450,000 tokens, with estimated per-epoch time of 4.3 hours on this configuration. Phase 1 required approximately 3.2 hours while Phase 2 took approximately 11.9 hours.

**Stage 3: Supervised Fine-Tuning with LoRA** transforms the pre-trained model from a next-token predictor into a conversational assistant. After CPT, the model can fluently predict the next Azerbaijani token given context, but has no concept of conversational structure—given a question, it generates plausible continuations rather than helpful answers.

Low-Rank Adaptation (LoRA) addresses this efficiently by freezing the pre-trained weights and training small low-rank decomposition matrices injected into the model's attention and feed-forward layers. Instead of updating a full weight matrix, LoRA trains two smaller matrices whose product approximates the full update, reducing trainable parameters to a small fraction of the total. The configuration used rank 64, alpha 28, dropout 0.05, targeting query, key, value, and output projections in attention layers plus gate, up, and down projections in feed-forward layers, with maximum sequence length 1,024.

This compact footprint meant fine-tuning ran on a single ml.g5.8xlarge instance (1× NVIDIA A10G GPU), completing in minutes rather than hours. Fine-tuning used approximately 2,000 single-turn Azerbaijani question-answer pairs with Hugging Face's SFTTrainer and learning rate 1e-4—higher than CPT's learning rates because LoRA adapters are randomly initialized and benefit from stronger gradient updates.

Training employed a Llama-style chat template with assistant-only loss masking: the model is penalized only for predicting the assistant's response tokens and the end-of-turn token, while user prompts and template delimiters are excluded from the loss computation. This focuses the model's learning capacity on generating appropriate responses rather than memorizing user input patterns.

## Infrastructure and Operational Considerations

The training pipeline runs entirely as Amazon SageMaker AI training jobs launched from Amazon SageMaker Unified Studio. Each job points to a custom training script and provisions fresh Amazon EC2 instances on demand, terminating after completion. This pay-per-use model eliminates idle cluster costs—a significant operational advantage compared to maintaining persistent training infrastructure.

Training data and model artifacts are stored in Amazon S3, with automatic checkpointing providing fault tolerance. Training metrics are tracked with TensorBoard integrated into Amazon SageMaker AI, while system-level metrics (GPU utilization, memory usage, throughput) are captured through Amazon CloudWatch. This observability stack proved essential for identifying bottlenecks and validating optimization impacts.

The modular architecture allows each stage to be optimized independently. Tokenizer improvements benefit every subsequent training stage, and CPT configurations transfer across fine-tuning tasks. This design supports experimentation and iterative refinement without requiring full pipeline reruns.

## Results and Production Readiness

The framework delivered measurable improvements across multiple dimensions. The 2× encoding efficiency improvement through custom tokenization effectively doubles the Azerbaijani content that fits within context windows—a benefit that compounds across all downstream tasks. The BPB validation (0.5795 versus 0.6830) confirms this came without sacrificing modeling quality.

Memory and throughput optimizations enable training larger models or using larger batch sizes on the same hardware. The 58% reduction in peak GPU memory and 23% throughput improvement on ml.p5.48xlarge instances translate directly to reduced training costs and faster iteration cycles. The 7× batch size increase on ml.p4d.24xlarge demonstrates that the optimization approach scales across different GPU architectures.

The production-ready infrastructure with validated configurations across multiple instance types gives Azercell a flexible foundation that scales as requirements grow. The distributed training setup designed for the 1B model transfers to larger architectures with only configuration changes, not code rewrites.

Qualitative evaluation demonstrates clear improvements in language generation quality. The off-the-shelf Llama 3.2 1B produces repetitive, incoherent output when prompted in Azerbaijani—a common failure mode for underrepresented languages. For example, given the prompt "Learning a new language not only expands communication opportunities…", the base model generates circular, repetitive text that restates the prompt multiple times without adding meaningful content. The fine-tuned model produces concise, semantically coherent completions: "Learning a new language not only expands communication opportunities but also creates new friendships and connections." This demonstrates genuine Azerbaijani language understanding rather than surface-level pattern matching.

## Critical Assessment and Limitations

While this case study presents impressive technical achievements, several aspects warrant balanced consideration. The text originates from an AWS blog post, which inherently emphasizes successes and AWS service capabilities. Independent validation of the claimed metrics would strengthen confidence in the results.

The training corpus of 2.5 billion tokens is relatively modest by modern LLM standards, though appropriate for a 1B-parameter model and a low-resource language. Scaling to competitive performance levels with larger models will require substantially more data, which may not be readily available for Azerbaijani. The case study doesn't address data collection, cleaning, and quality assurance processes, which typically consume significant effort in production LLMOps.

The evaluation approach relies heavily on a single metric (BPB) for tokenizer validation and qualitative examples for fine-tuning assessment. More comprehensive evaluation would include task-specific benchmarks, human evaluation protocols, and systematic comparison against baselines across multiple dimensions. The single qualitative example shown could represent cherry-picked success rather than typical performance.

The claim that distributed training wasn't "required" for the 1B model but was implemented anyway for future scalability is sensible engineering, but also means the distributed training benefits weren't actually necessary for this specific use case. The memory and throughput improvements are real, but readers should recognize that simpler configurations might have sufficed for the immediate requirements.

The LoRA fine-tuning used only 2,000 question-answer pairs, which is quite limited. While parameter-efficient fine-tuning can work with smaller datasets, the diversity and coverage of conversational patterns that can be learned from this volume is inherently constrained. Production chatbot applications typically require substantially larger and more diverse fine-tuning datasets.

The case study doesn't address several critical LLMOps concerns: model versioning and governance, A/B testing infrastructure, monitoring and observability in production deployment, handling model drift over time, or compliance and safety considerations. The focus is exclusively on the training pipeline, which is only one component of a complete LLMOps solution.

## Broader Implications for Low-Resource Languages

Despite these limitations, this case study provides valuable insights for practitioners working with low-resource or morphologically complex languages. The systematic approach to tokenizer optimization, the validation methodology comparing BPB rather than perplexity, and the specific technical choices (BBPE algorithm, vocabulary size selection, fertility score as an evaluation metric) offer a replicable template.

The emphasis on modular pipeline design and infrastructure that scales with configuration changes rather than code rewrites represents mature LLMOps engineering. The choice to implement distributed training before strictly necessary, validating it on smaller models where debugging is easier, demonstrates forward-thinking architecture that reduces technical debt.

The integration of Liger Kernels with minimal code changes and the significant memory/throughput improvements achieved suggest this optimization approach deserves broader adoption, though practitioners should verify compatibility with their specific model architectures and validate correctness through profiling.

The two-phase approach to continued pre-training (freezing backbone while adapting embeddings, then full fine-tuning with lower learning rate) represents a principled method for vocabulary extension that balances adaptation to new tokens with preservation of existing knowledge. This technique should transfer to other language adaptation scenarios.

Azercell now operates this framework independently, having internalized the capability during the six-week collaboration. The framework supports expanded use cases, larger corpora, and scaled architectures, suggesting successful knowledge transfer from the AWS team to the customer organization—a critical but often overlooked aspect of LLMOps projects.
