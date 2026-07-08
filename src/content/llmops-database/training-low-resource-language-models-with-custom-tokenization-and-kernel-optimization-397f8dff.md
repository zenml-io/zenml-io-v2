---
title: "Training Low-Resource Language Models with Custom Tokenization and Kernel Optimization"
slug: "training-low-resource-language-models-with-custom-tokenization-and-kernel-optimization-397f8dff"
draft: false
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "fine-tuning"
  - "token-optimization"
  - "model-optimization"
  - "pytorch"
  - "monitoring"
  - "scaling"
  - "devops"
  - "triton"
  - "open-source"
  - "amazon-aws"
  - "meta"
  - "hugging-face"
industryTags: "telecommunications"
company: "Azercell Telecom LLC"
summary: "Azercell Telecom LLC, Azerbaijan's leading telecommunications provider, collaborated with AWS Generative AI Innovation Center to build production-ready Azerbaijani language models on Amazon SageMaker AI for telecom use cases and customer-facing chatbots. The challenge was adapting foundation models to a morphologically rich, low-resource language with limited training data. Through a three-stage pipeline involving custom tokenizer development, continued pre-training with distributed training optimizations, and LoRA fine-tuning, the team achieved a 2× improvement in encoding efficiency, 23% higher training throughput, and 58% lower peak GPU memory usage. The resulting framework scales from the 1B parameter proof-of-concept to larger models while maintaining production-ready infrastructure that Azercell now operates independently."
link: "https://aws.amazon.com/blogs/machine-learning/training-azerbaijani-language-models-on-amazon-sagemaker-ai/"
year: 2026
seo:
  title: "Azercell Telecom LLC: Training Low-Resource Language Models with Custom Tokenization and Kernel Optimization - ZenML LLMOps Database"
  description: "Azercell Telecom LLC, Azerbaijan's leading telecommunications provider, collaborated with AWS Generative AI Innovation Center to build production-ready Azerbaijani language models on Amazon SageMaker AI for telecom use cases and customer-facing chatbots. The challenge was adapting foundation models to a morphologically rich, low-resource language with limited training data. Through a three-stage pipeline involving custom tokenizer development, continued pre-training with distributed training optimizations, and LoRA fine-tuning, the team achieved a 2× improvement in encoding efficiency, 23% higher training throughput, and 58% lower peak GPU memory usage. The resulting framework scales from the 1B parameter proof-of-concept to larger models while maintaining production-ready infrastructure that Azercell now operates independently."
  canonical: "https://www.zenml.io/llmops-database/training-low-resource-language-models-with-custom-tokenization-and-kernel-optimization-397f8dff"
  ogTitle: "Azercell Telecom LLC: Training Low-Resource Language Models with Custom Tokenization and Kernel Optimization - ZenML LLMOps Database"
  ogDescription: "Azercell Telecom LLC, Azerbaijan's leading telecommunications provider, collaborated with AWS Generative AI Innovation Center to build production-ready Azerbaijani language models on Amazon SageMaker AI for telecom use cases and customer-facing chatbots. The challenge was adapting foundation models to a morphologically rich, low-resource language with limited training data. Through a three-stage pipeline involving custom tokenizer development, continued pre-training with distributed training optimizations, and LoRA fine-tuning, the team achieved a 2× improvement in encoding efficiency, 23% higher training throughput, and 58% lower peak GPU memory usage. The resulting framework scales from the 1B parameter proof-of-concept to larger models while maintaining production-ready infrastructure that Azercell now operates independently."
notion:
  pageId: "397f8dff-2538-80f9-97ee-da072279726a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:02:00.000Z"
  lastEditedTime: "2026-07-08T20:02:00.000Z"
  publishedAt: "2026-07-08T20:10:46Z"
---

## Overview and Business Context

Azercell Telecom LLC undertook an ambitious project to develop Azerbaijani large language models for production deployment in telecommunications use cases, specifically targeting customer-facing chatbots. This case study represents a significant LLMOps challenge: adapting foundation models to a morphologically rich, low-resource language where existing training blueprints and pre-trained models are scarce or nonexistent. The collaboration with AWS Generative AI Innovation Center spanned six weeks and resulted in a production-ready framework that Azercell now operates independently.

The business motivation centers on providing localized AI capabilities for Azerbaijan's telecommunications market, where off-the-shelf English-centric models fail to produce coherent outputs in Azerbaijani. The case study demonstrates practical LLMOps at scale, moving from foundation model adaptation through to deployment-ready conversational AI systems. Notably, the team validated their approach on a 1B parameter model (Llama 3.2 1B) while designing the infrastructure to scale to larger architectures through configuration changes rather than re-architecture.

## Technical Architecture and LLMOps Pipeline

The solution implements a three-stage sequential pipeline where each stage produces artifacts feeding into the next, representing a modular LLMOps architecture. This modularity allows independent optimization of each component while maintaining end-to-end reproducibility.

**Stage 1: Custom Tokenizer Development** addresses the fundamental challenge that standard English-optimized tokenizers fragment Azerbaijani's morphologically rich word forms. The team trained custom tokenizers using Byte-Level Byte-Pair Encoding (BBPE) from the Hugging Face tokenizers library, experimenting with vocabulary sizes from 50,000 to 100,000 tokens. The BBPE approach starts from raw bytes rather than predefined character sets, providing full coverage of Azerbaijani-specific characters without manual alphabet engineering. The final 100,000-token vocabulary achieved a fertility score of 1.59 tokens per word, compared to 3.22 for the baseline Llama 3.2 tokenizer—effectively a 2× improvement in encoding efficiency. This improvement has direct production implications: with Llama 3.2's 128,000-token context window, the custom tokenizer enables processing approximately 80,000 words versus 40,000 with the baseline, doubling the effective context capacity.

Critically, the team validated that improved encoding efficiency didn't sacrifice model quality by comparing Bits-Per-Byte (BPB) metrics rather than perplexity, since BPB normalizes for vocabulary differences by measuring prediction quality at the byte level. The custom tokenizer achieved 0.5795 BPB versus 0.6830 for the baseline, confirming superior compression without quality degradation—an important validation step often overlooked in custom tokenization projects.

**Stage 2: Continued Pre-Training (CPT)** adapts the foundation model to understand Azerbaijani using approximately 2.5 billion tokens. The LLMOps focus here centers on maximizing GPU utilization and training throughput while establishing distributed training infrastructure that scales beyond the current 1B parameter model. The team benchmarked on both ml.p4d.24xlarge (8× NVIDIA A100 GPUs) and ml.p5.48xlarge (8× NVIDIA H100 GPUs) instances, implementing two key optimizations:

PyTorch Fully Sharded Data Parallel (FSDP) distributes model parameters, gradients, and optimizer states across GPUs, dynamically gathering only what's needed during computation. This contrasts with standard Distributed Data Parallel (DDP) which replicates the full model on each GPU. FSDP reduced per-GPU model state memory from 9.23 GB to 1.17 GB on ml.p4d.24xlarge, freeing substantial headroom for larger batch sizes. The distributed setup was validated on the 1B model specifically so that scaling to models like Llama 3.1 8B requires only configuration changes, not pipeline re-architecture—a crucial LLMOps design principle for production systems.

Liger Kernels provide memory-efficient, Triton-based implementations of common LLM operations, fusing multiple operations into single GPU kernel launches to reduce intermediate memory allocations. Integration required minimal code changes (a single function call patches the model before instantiation), and the kernels work seamlessly with PyTorch FSDP. The team validated correct execution using PyTorch Profiler to confirm fused operations in execution traces. The combination of FSDP and Liger Kernels delivered substantial improvements: on ml.p4d.24xlarge, maximum batch size per GPU increased from 2 (DDP baseline) to 14 (FSDP + Liger)—a 7× improvement. On ml.p5.48xlarge, peak GPU memory dropped 58% (from 64 GB to 27 GB) and per-GPU throughput increased 23% (from 63,771 to 78,319 tokens/second).

The CPT training configuration demonstrates production-oriented parameter choices. The context window was set to 2,048 tokens because over 90% of training samples fell below this length after tokenization, though the infrastructure supports up to the model's native 128,000-token limit. Training followed a two-phase approach: Phase 1 froze the model backbone and trained only the embedding layer for 5,000 steps (approximately 3.2 hours) with a learning rate of 0.0032, adapting new token representations to the model's existing internal space without disrupting pre-trained knowledge. Phase 2 unfroze all parameters for 15,000 steps (approximately 11.9 hours) with a lower learning rate of 0.0024 to preserve embedding adaptation gains. With an effective batch size of 224 (14 per GPU × 16 GPUs) and 2,048-token context, each training step processed approximately 450,000 tokens, yielding an estimated per-epoch time of 4.3 hours on ml.p4d.24xlarge.

**Stage 3: Supervised Fine-Tuning with LoRA** transforms the pre-trained model into a conversational assistant. After CPT, the model can predict Azerbaijani tokens fluently but lacks conversational structure—given a question, it generates plausible continuations rather than helpful answers. Low-Rank Adaptation (LoRA) addresses this efficiently by freezing pre-trained weights and training small low-rank decomposition matrices injected into attention and feed-forward layers. Instead of updating full weight matrices, LoRA trains two smaller matrices whose product approximates the full update, reducing trainable parameters to a small fraction of the total.

The LoRA configuration used rank 64, alpha 28, dropout 0.05, targeting query/key/value/output projections and gate/up/down projections, with a maximum sequence length of 1,024 tokens. This compact footprint enabled fine-tuning on a single ml.g5.8xlarge instance (1× NVIDIA A10G GPU), completing in minutes—a stark contrast to the multi-GPU requirements of CPT. Fine-tuning used approximately 2,000 single-turn Azerbaijani question-answer pairs with Hugging Face's SFTTrainer and a learning rate of 1e-4 (higher than CPT's rates because LoRA adapters are randomly initialized and benefit from stronger gradient updates).

The training employed a Llama-style chat template with assistant-only loss masking, where the model is penalized only for predicting assistant response tokens and end-of-turn tokens while excluding user prompts and template delimiters from the loss. This focuses learning capacity on generating appropriate responses rather than memorizing user input patterns—a critical detail for production conversational systems.

## Infrastructure and LLMOps Tooling

The training infrastructure leverages Amazon SageMaker AI training jobs launched from Amazon SageMaker Unified Studio, with each job provisioning fresh Amazon EC2 instances and terminating after completion. This pay-per-use model eliminates idle cluster costs, a significant LLMOps consideration for organizations without continuous training workloads. Training data and model artifacts are stored in Amazon S3, training metrics are tracked with TensorBoard in Amazon SageMaker AI, and system metrics are captured through Amazon CloudWatch.

The custom training scripts support configurable context windows, BFloat16 mixed precision, cosine learning rate scheduling with AdamW optimizer, and automatic checkpointing to Amazon S3 for fault tolerance. This production-oriented design includes comprehensive observability through TensorBoard integration for training loss curves and validation metrics, combined with CloudWatch for infrastructure metrics like GPU utilization and memory consumption.

The solution builds on open-source tooling including PyTorch, Hugging Face Transformers, and Liger Kernels, avoiding vendor lock-in while leveraging AWS's managed infrastructure. This hybrid approach—open-source frameworks on managed infrastructure—represents a pragmatic LLMOps pattern that balances flexibility with operational simplicity.

## Results and Production Validation

The framework delivered measurable improvements across multiple dimensions critical to production LLM deployment. The custom tokenizer's 2× encoding efficiency improvement has direct implications for production systems: it effectively doubles the Azerbaijani content that fits within the model's context window, enabling richer conversational context and more comprehensive retrieval-augmented generation scenarios.

The memory and throughput optimizations—23% higher training throughput and 58% lower peak GPU memory usage—translate to faster iteration cycles and reduced training costs. The 7× increase in maximum batch size on ml.p4d.24xlarge (from 2 to 14 tokens per GPU) means substantially higher GPU utilization from the same hardware investment. For organizations training multiple model variants or conducting frequent fine-tuning, these efficiency gains compound across the development lifecycle.

The production-ready infrastructure provides validated configurations across ml.p4d.24xlarge and ml.p5.48xlarge instances, giving Azercell flexible scaling options as requirements evolve. The distributed training setup's design principle—scaling to larger models through configuration changes rather than re-architecture—reduces operational risk and technical debt as the team moves from the 1B proof-of-concept to larger production models.

Quality validation demonstrates clear improvements over the baseline. The off-the-shelf Llama 3.2 1B produces repetitive, incoherent output when prompted in Azerbaijani, a common failure mode for underrepresented languages. The provided example shows the baseline model drifting into circular, semantically empty text about "learning a new language to learn a new language." The fine-tuned model produces concise, semantically coherent responses that demonstrate genuine Azerbaijani language understanding, completing the prompt "Learning a new language not only expands communication opportunities" with "but also creates new friendships and connections."

## Critical Assessment and LLMOps Considerations

While the case study presents compelling technical achievements, several considerations warrant balanced assessment. The proof-of-concept uses a 1B parameter model with approximately 2.5 billion training tokens and 2,000 fine-tuning examples—relatively modest scale compared to contemporary production LLM deployments. The team acknowledges this explicitly, positioning the 1B model as validation for infrastructure that will scale to larger models. However, the actual production performance on larger models remains to be demonstrated, and scaling challenges often emerge non-linearly.

The custom tokenizer's 2× efficiency improvement is substantial, but the comparison baseline (Llama 3.2's English-optimized tokenizer) represents an expected failure case rather than a competitive alternative. A more informative comparison would benchmark against multilingual tokenizers or other low-resource language tokenization strategies. The BPB validation (0.5795 vs 0.6830) confirms quality preservation, but downstream task performance metrics beyond the single qualitative example would strengthen the evaluation.

The memory and throughput optimizations combine multiple techniques (FSDP, Liger Kernels, instance upgrades), making it difficult to isolate individual contributions. The 23% throughput improvement and 58% memory reduction on ml.p5.48xlarge represent the cumulative effect of FSDP plus Liger Kernels, but the text doesn't fully separate the incremental benefit of each optimization. For practitioners evaluating whether to adopt Liger Kernels, understanding its standalone contribution would be valuable.

The fine-tuning dataset of 2,000 question-answer pairs is relatively small, raising questions about production coverage and generalization. The case study doesn't discuss dataset curation methodology, domain coverage, or validation beyond the single example. For a production chatbot serving telecommunications use cases, understanding how the model handles edge cases, domain-specific terminology, and conversation repair would be critical.

The cost analysis is notably absent. While the case study mentions pay-per-use economics eliminating idle cluster costs, it doesn't provide actual training costs, cost-per-token metrics, or total cost of ownership projections. For organizations evaluating similar projects, understanding whether the efficiency gains justify the engineering investment would be valuable context.

## Operational Maturity and Knowledge Transfer

A notable strength of this engagement is the emphasis on knowledge transfer and operational independence. The case study explicitly states that "Azercell now operates the framework independently," suggesting successful handoff from the AWS team to internal operators. The six-week collaboration timeline implies focused, intensive engagement rather than prolonged dependency.

The modular architecture design—where tokenizer improvements benefit every subsequent training stage and CPT configurations transfer across fine-tuning tasks—demonstrates production-oriented thinking. This modularity reduces the cost of experimentation and enables iterative refinement without full pipeline reruns.

The validation across multiple instance types (ml.p4d.24xlarge, ml.p5.48xlarge, ml.g5.8xlarge) provides operational flexibility, allowing cost-performance tradeoffs based on workload requirements. The staged approach (expensive distributed training for CPT, cheap single-GPU training for LoRA fine-tuning) demonstrates understanding of where to invest compute resources.

## Broader Implications for Low-Resource Language LLMOps

This case study offers valuable insights for organizations working with low-resource or morphologically complex languages. The emphasis on custom tokenization as a first-order optimization—rather than an afterthought—represents best practice often overlooked in LLM adaptation projects. The quantitative validation of tokenization efficiency through fertility scores and BPB metrics provides a replicable evaluation framework.

The kernel-level optimizations (Liger Kernels) demonstrate that production LLM systems can benefit from looking beyond standard framework defaults. The minimal integration cost (single function call) and compatibility with distributed training frameworks (PyTorch FSDP) suggest that such optimizations should be evaluated more routinely.

The two-phase CPT approach—freezing the backbone for embedding adaptation before full training—represents a thoughtful technique for vocabulary extension that balances adaptation speed with knowledge preservation. This pattern may generalize to other domain adaptation scenarios beyond low-resource languages.

The case study's transparency about scale (1B parameters, 2.5B tokens, 2,000 fine-tuning examples) and explicit acknowledgment that distributed training "wasn't required for this 1B-scale proof-of-concept" but "will be essential as Azercell scales to larger models" demonstrates intellectual honesty about the current state versus future requirements.

Overall, this case study represents a solid example of production-oriented LLMOps for low-resource language adaptation, with particular strengths in infrastructure design, optimization validation, and knowledge transfer. The primary limitations center on limited downstream evaluation, absent cost analysis, and the gap between the current 1B proof-of-concept and stated production requirements for larger models. Organizations pursuing similar projects should view this as a validated starting point rather than a complete production deployment, with substantial additional work required for robust evaluation, safety testing, and operational monitoring.
